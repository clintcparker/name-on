define(["require", "exports", "../Models/AccessControlConfigurationFormData", "EMA/ClientResources/ClientResources", "../Constants", "../CORS/CorsConstants", "../Models/EditWorkflowEditScope", "../../Common/Utilities/ResourceUtility", "../Models/RunHistoryRetention", "../Models/RuntimeConfiguration", "../Utilities/Utilities", "../DataModels/WorkflowDataModel", "../Models/WorkflowSettingsFormData", "../Utilities/WorkflowUtility"], function (require, exports, AccessControlConfigurationFormDataRef, ClientResources, Constants, CorsConstants_1, EditWorkflowEditScope, ResourceUtility_1, RunHistoryRetentionRef, RuntimeConfigurationRef, Utilities, WorkflowDataModelRef, WorkflowSettingsFormDataRef, WorkflowUtilityRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowUtility = WorkflowUtilityRef.WorkflowUtility;
    var AccessControlType = AccessControlConfigurationFormDataRef.AccessControlType;
    var FxData = MsPortalFx.Data;
    var RunHistoryRetentionType = RunHistoryRetentionRef.RunHistoryRetentionType;
    var WorkflowType = EMAExtension.DataModels.WorkflowType;
    var WorkflowData = (function () {
        function WorkflowData(powerAppsData) {
            var _this = this;
            this._putAccessKeysTemplateUri = "{0}/accessKeys/default";
            this._postAccessKeysTemplateUri = "{0}/accessKeys/default/list";
            this._postRegenerateAccessKeyTemplateUri = "{0}/regenerateAccessKey";
            this._postValidateTemplateUri = "{0}/validate";
            this._generateUpgradedDefinitionTemplateUri = "{0}/generateUpgradedDefinition";
            this._getWorkflowExpandProperties = ["properties/connectionParameters", "properties/swagger"];
            this._getWorkflowUri = "{0}&$expand={1}";
            // TODO: Make client private and fix all the external callers.
            this.client = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowType, MsPortalFx.getEnvironmentValue("emaApiVersion"));
            this._integrationAccountsClient = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.integrationAccountType, MsPortalFx.getEnvironmentValue("integrationAccountRPApiVersion"));
            this.queryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowType,
                sourceUri: function () {
                    return _this.client.getTemplatedListInSubscriptionUri();
                },
                supplyData: ExtensionCore.Csm.supplyDataWithSubscriptionIdsParallel
            });
            this.entityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: WorkflowType,
                sourceUri: function (workflowId) {
                    return _this.client.getResourceUri(workflowId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                serializeParams: function (workflowId) {
                    return workflowId;
                },
                poll: false // NOTE(shimedh): Even if the documentation says that if not specified defaults to false, it still polls. Need to explicitly set it to false.
            });
            this.integrationAccountEditScopeCache = MsPortalFx.Data.EditScopeCache.createNew({
                "entityTypeName": EMAExtension.DataModels.IntegrationAccountResourcePropertiesType,
                "supplyExistingData": function (workflowId, lifetime) {
                    var deferred = Q.defer(), workflowEntityView = _this.entityCache.createView(lifetime);
                    workflowEntityView.fetch(workflowId)
                        .then(function () {
                        var workflow = workflowEntityView.item;
                        if (!workflow) {
                            deferred.reject(ClientResources.Workflow.IntegrationAccountPicker.notFound);
                        }
                        else {
                            var integrationAccount = MsPortalFx.Data.Metadata.createEmptyObject(EMAExtension.DataModels.IntegrationAccountResourcePropertiesType);
                            if (workflow.peek().properties.peek().integrationAccount) {
                                integrationAccount.id(workflow.peek().properties.peek().integrationAccount.peek().id.peek());
                                integrationAccount.name(workflow.peek().properties.peek().integrationAccount.peek().name.peek());
                            }
                            // the location of the workflow is needed to find all the integration accounts in the same region.
                            integrationAccount.location(workflow.peek().location.peek());
                            deferred.resolve(integrationAccount);
                        }
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                "saveEditScopeChanges": function (workflowId, integrationAccountEditScope, edits, lifetime) {
                    var savedPromise = Q.defer(), workflowEntityView = _this.entityCache.createView(lifetime);
                    workflowEntityView.fetch(workflowId)
                        .then(function () {
                        var workflow = workflowEntityView.item;
                        if (!workflow) {
                            savedPromise.reject(ClientResources.Workflow.IntegrationAccountPicker.notFound);
                        }
                        else {
                            var modifiedWorkflow = ko.toJS(workflow);
                            modifiedWorkflow.properties.integrationAccount = {
                                id: integrationAccountEditScope.root.id.peek(),
                                name: integrationAccountEditScope.root.name.peek()
                            };
                            _this.saveWorkflow(workflowId, modifiedWorkflow)
                                .then(function () {
                                _this.entityCache.refresh(workflowId, lifetime).finally(function () {
                                    savedPromise.resolve({
                                        action: MsPortalFx.Data.AcceptEditScopeChangesAction.AcceptClientChanges
                                    });
                                });
                            })
                                .catch(function (error) {
                                savedPromise.reject(error);
                            });
                        }
                    }, function (error) {
                        savedPromise.reject(error);
                    });
                    return savedPromise.promise;
                }
            });
            this.integrationAccountsQueryCache = new MsPortalFx.Data.QueryCache({
                "entityTypeName": EMAExtension.DataModels.IntegrationAccountResourcePropertiesType,
                "sourceUri": function (subscriptionId) {
                    return _this._integrationAccountsClient.getListInSubscriptionUri(subscriptionId);
                },
                "supplyData": function (httpMethod, uri, headers, data, params) {
                    return _this.getIntegrationAccounts(uri);
                },
                "poll": false
            });
            this.editWorkflowEditScopeCache = MsPortalFx.Data.EditScopeCache.createNew({
                "entityTypeName": EditWorkflowEditScope.EditWorkflowEditScopeType,
                "supplyExistingData": function (workflowId, lifetime) {
                    var deferred = Q.defer(), view = _this.entityCache.createView(lifetime);
                    view.fetch(workflowId).then(function () {
                        var definition = view.item().properties().definition();
                        if (!definition.hasOwnProperty("triggers")) {
                            definition.triggers = ko.observable({});
                        }
                        deferred.resolve({
                            "id": view.item().id,
                            "isUpdated": ko.observable(false),
                            "httpActions": ko.observable(new WorkflowDataModelRef.HttpActions()),
                            "microservices": ko.observable(new WorkflowDataModelRef.MicroserviceSettings()),
                            "recurrences": ko.observable(new WorkflowDataModelRef.Recurrences()),
                            "workflowDefinition": ko.observable(definition)
                        });
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                "refreshEditScope": function (workflowId, lifetime) {
                    var view = _this.entityCache.createView(lifetime);
                    return view.fetch(workflowId);
                }
            });
            this.editLogicAppEditScopeCache = MsPortalFx.Data.EditScopeCache.createNew({
                entityTypeName: EditWorkflowEditScope.EditLogicAppEditScopeType,
                supplyExistingData: function (logicAppPlainContent, lifetime) {
                    try {
                        var logicApp = JSON.parse(logicAppPlainContent);
                        var connectionReferences = Utilities.findPropertyIgnoreCase(Constants.SchemaPropertyKeys.ConnectionsKey, logicApp.properties.parameters);
                        var editableContent = (_a = {
                                definition: logicApp.properties.definition
                            },
                            _a[Constants.SchemaPropertyKeys.ConnectionsKey] = connectionReferences ? connectionReferences : undefined,
                            _a);
                        var originalParameters = logicApp.properties.parameters;
                        delete originalParameters[Constants.SchemaPropertyKeys.ConnectionsKey];
                        logicApp.properties.definition = null;
                        logicApp.properties.parameters = {};
                        return Q.resolve({
                            id: ko.observable(logicApp.id),
                            logicApp: ko.observable(JSON.stringifyOrdered(logicApp)),
                            editableContent: ko.observable(JSON.stringifyOrdered(editableContent)),
                            originalParameters: ko.observable(JSON.stringifyOrdered(originalParameters))
                        });
                    }
                    catch (error) {
                        return Q.reject(error);
                    }
                    var _a;
                },
                saveEditScopeChanges: function (logicAppId, logicAppEditScope, edits) {
                    try {
                        var logicApp = WorkflowUtility.getLogicAppFromFormData(logicAppEditScope.root);
                        return _this.saveWorkflow(logicApp.id, logicApp)
                            .then(function () {
                            return {
                                action: MsPortalFx.Data.AcceptEditScopeChangesAction.AcceptClientChanges
                            };
                        });
                    }
                    catch (error) {
                        return Q.reject(error);
                    }
                }
            });
            this.accessControlEditScopeCache = FxData.EditScopeCache.createNew({
                entityTypeName: AccessControlConfigurationFormDataRef.metadata.name,
                supplyExistingData: function (workflowId, lifetime) {
                    workflowId = workflowId.toUpperCase();
                    var entityView = _this.entityCache.createView(lifetime);
                    _this.entityCache.forceRemove(workflowId);
                    return Q(entityView.fetch(workflowId)).then(function () {
                        var accessControl;
                        var accessControlType = AccessControlType.Any;
                        if (entityView.item().properties().accessControl) {
                            accessControl = entityView.item().properties().accessControl();
                            if (accessControl.triggers && accessControl.triggers()) {
                                if (accessControl.triggers().allowedCallerIpAddresses().length > 0) {
                                    accessControlType = AccessControlType.SpecificIPRanges;
                                }
                                else {
                                    accessControlType = AccessControlType.LogicAppsOnly;
                                }
                            }
                        }
                        else {
                            accessControl = {
                                triggers: ko.observable({
                                    allowedCallerIpAddresses: ko.observableArray([])
                                }),
                                contents: ko.observable({
                                    allowedCallerIpAddresses: ko.observableArray([])
                                }),
                                actions: ko.observable({
                                    allowedCallerIpAddresses: ko.observableArray([])
                                })
                            };
                        }
                        if (!accessControl.triggers) {
                            accessControl.triggers = ko.observable({
                                allowedCallerIpAddresses: ko.observableArray([])
                            });
                        }
                        if (!accessControl.contents) {
                            accessControl.contents = ko.observable({
                                allowedCallerIpAddresses: ko.observableArray([])
                            });
                        }
                        if (!accessControl.actions) {
                            accessControl.actions = ko.observable({
                                allowedCallerIpAddresses: ko.observableArray([])
                            });
                        }
                        return {
                            accessControlType: ko.observable(accessControlType),
                            accessControl: ko.observable(accessControl)
                        };
                    });
                },
                saveEditScopeChanges: function (workflowId, editScope, edits, lifetime, dataToUpdate) {
                    try {
                        var entityView_1 = _this.entityCache.createView(lifetime);
                        workflowId = workflowId.toUpperCase();
                        _this.entityCache.forceRemove(workflowId);
                        return Q(entityView_1.fetch(workflowId)).then(function () {
                            var logicApp = ko.toJS(entityView_1.item.peek());
                            var accessControl = editScope.root.accessControl();
                            var accessControlType = editScope.root.accessControlType();
                            var triggersEdits = editScope.getEntityArrayWithEdits(accessControl.triggers().allowedCallerIpAddresses);
                            var contentsEdits = editScope.getEntityArrayWithEdits(accessControl.contents().allowedCallerIpAddresses);
                            var updatedTriggers = ko.toJS(triggersEdits.arrayWithEdits);
                            var updatedContents = ko.toJS(contentsEdits.arrayWithEdits);
                            logicApp.properties.accessControl = _this.updateLogicAppAccessControlConfiguration(logicApp, updatedTriggers, updatedContents, accessControlType);
                            return _this.saveWorkflow(workflowId, logicApp).then(function () {
                                return {
                                    action: FxData.AcceptEditScopeChangesAction.AcceptClientChanges
                                };
                            });
                        });
                    }
                    catch (error) {
                        return Q.reject(error);
                    }
                }
            });
            this.workflowSettingsEditScopeCache = FxData.EditScopeCache.createNew({
                entityTypeName: WorkflowSettingsFormDataRef.metadata.name,
                supplyExistingData: function (workflowId, lifetime) {
                    workflowId = workflowId.toUpperCase();
                    var workflowEntityView = _this.entityCache.createView(lifetime);
                    _this.entityCache.forceRemove(workflowId);
                    return workflowEntityView.fetch(workflowId).then(function () {
                        var workflow = workflowEntityView.item();
                        var workflowSettings = MsPortalFx.Data.Metadata.createEmptyObject(WorkflowSettingsFormDataRef.metadata.name);
                        _this._initializeExistingDataForIntegrationAccount(workflow, workflowSettings);
                        _this._initializeExistingDataForAccessControl(workflow, workflowSettings);
                        _this._initializeExistingDataForRuntimeConfiguration(workflow, workflowSettings);
                        return workflowSettings;
                    });
                },
                saveEditScopeChanges: function (workflowId, workflowSettingsEditScope, edits, lifetime, dataToUpdate) {
                    try {
                        var workflowEntityView_1 = _this.entityCache.createView(lifetime);
                        workflowId = workflowId.toUpperCase();
                        _this.entityCache.forceRemove(workflowId);
                        return Q(workflowEntityView_1.fetch(workflowId)).then(function () {
                            var workflow = workflowEntityView_1.item();
                            var modifiedWorkflow = ko.toJS(workflow);
                            if (workflowSettingsEditScope.root.integrationAccountResourceProperties().id()) {
                                modifiedWorkflow.properties.integrationAccount = {
                                    id: workflowSettingsEditScope.root.integrationAccountResourceProperties().id()
                                };
                            }
                            if (!modifiedWorkflow.properties.runtimeConfiguration) {
                                modifiedWorkflow.properties.runtimeConfiguration = {};
                            }
                            var workflowOptions = modifiedWorkflow.properties.runtimeConfiguration.operationOptions;
                            if (workflowSettingsEditScope.root.runtimeConfiguration().throughputMode() === Constants.RuntimeConfigurationThroughputMode.HighThroughput) {
                                modifiedWorkflow.properties.runtimeConfiguration.operationOptions = _this._addOperationOption(workflowOptions, Constants.RuntimeConfigurationThroughputMode.HighThroughput);
                            }
                            else {
                                if (workflowOptions) {
                                    modifiedWorkflow.properties.runtimeConfiguration.operationOptions = _this._removeOperationOption(workflowOptions, Constants.RuntimeConfigurationThroughputMode.HighThroughput);
                                }
                                if (modifiedWorkflow.properties.runtimeConfiguration.operationOptions === undefined) {
                                    delete modifiedWorkflow.properties.runtimeConfiguration.operationOptions;
                                }
                            }
                            var workflowLifeTime = modifiedWorkflow.properties.runtimeConfiguration.lifetime;
                            if (workflowSettingsEditScope.root.runtimeConfiguration().runHistoryRetention().runHistoryRetentionType() === RunHistoryRetentionType.Custom) {
                                modifiedWorkflow.properties.runtimeConfiguration.lifetime = {
                                    unit: Constants.RunHistoryRetention.Unit,
                                    count: workflowSettingsEditScope.root.runtimeConfiguration().runHistoryRetention().runHistoryRetentionInDays()
                                };
                            }
                            else {
                                if (workflowLifeTime) {
                                    delete modifiedWorkflow.properties.runtimeConfiguration.lifetime;
                                }
                            }
                            if (Object.keys(modifiedWorkflow.properties.runtimeConfiguration).length === 0) {
                                delete modifiedWorkflow.properties.runtimeConfiguration;
                            }
                            var accessControl = workflowSettingsEditScope.root.accessControlConfiguration().accessControl();
                            var accessControlType = workflowSettingsEditScope.root.accessControlConfiguration().accessControlType();
                            var triggersEdits = workflowSettingsEditScope.getEntityArrayWithEdits(accessControl.triggers().allowedCallerIpAddresses);
                            var contentsEdits = workflowSettingsEditScope.getEntityArrayWithEdits(accessControl.contents().allowedCallerIpAddresses);
                            var updatedTriggers = ko.toJS(triggersEdits.arrayWithEdits);
                            var updatedContents = ko.toJS(contentsEdits.arrayWithEdits);
                            modifiedWorkflow.properties.accessControl = _this.updateLogicAppAccessControlConfiguration(modifiedWorkflow, updatedTriggers, updatedContents, accessControlType);
                            return _this.saveWorkflow(workflowId, modifiedWorkflow).then(function () {
                                return {
                                    action: FxData.AcceptEditScopeChangesAction.AcceptClientChanges
                                };
                            });
                        });
                    }
                    catch (error) {
                        return Q.reject(error);
                    }
                }
            });
            this._powerAppsData = powerAppsData;
        }
        WorkflowData.prototype.getWorkflowWithExpand = function (workflowId) {
            return ExtensionCore.Net.get(this._getWorkflowUri.format(this.client.getResourceUri(workflowId), this._getWorkflowExpandProperties.toString()));
        };
        WorkflowData.prototype.getIntegrationAccounts = function (uri, integrationAccountsList) {
            var _this = this;
            if (!integrationAccountsList) {
                integrationAccountsList = new Array();
            }
            return ResourceUtility_1.ResourceUtility.getResourceInfoInBatch(uri).then(function (response) {
                response.value.forEach(function (account) { integrationAccountsList.push(account); });
                if (response.nextLink) {
                    return _this.getIntegrationAccounts(response.nextLink, integrationAccountsList);
                }
                else {
                    return integrationAccountsList;
                }
            });
        };
        ;
        WorkflowData.prototype.saveWorkflow = function (resourceUri, workflow) {
            var _this = this;
            return this.client.put(resourceUri, workflow).then(function () {
                var workflowId = workflow.id.toUpperCase();
                // NOTE(shimedh): We don't need to do forceRemove here since we have manually updated the definition in LogicAppsDesignerBlade.
                _this.entityCache.refreshAll(function (id) {
                    return MsPortalFx.ViewModels.Services.ResourceTypes.compareResourceId(id, workflowId);
                });
            }).catch(function (error) {
                FxBase.Diagnostics.Log.writeEntry(2 /* Error */, "Ema.Client.workflow", "Failed when saving workflow definition: " + resourceUri);
                return Q.reject(error);
            });
        };
        WorkflowData.prototype.validateWorkflow = function (resourceUri, workflow, location, existingLogicApp) {
            if (location === void 0) { location = ""; }
            if (existingLogicApp === void 0) { existingLogicApp = true; }
            var validateEndpoint = this._postValidateTemplateUri.format(resourceUri);
            if (!existingLogicApp && location) {
                var descriptor = MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(resourceUri);
                validateEndpoint = "/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Logic/locations/{2}/workflows/{3}/validate"
                    .format(descriptor.subscription, descriptor.resourceGroup, location, descriptor.resource);
            }
            return this.client.post(validateEndpoint, workflow).then(function () {
                return {
                    valid: true,
                    message: null
                };
            }).catch(function (error) {
                var errorMessage = ClientResources.Workflow.Definition.Validation.unknownError;
                if (error.message) {
                    errorMessage = error.message;
                }
                else if (error.responseJSON && error.responseJSON.error && error.responseJSON.error.message) {
                    errorMessage = error.responseJSON.error.message;
                }
                return {
                    valid: false,
                    message: errorMessage
                };
            });
        };
        WorkflowData.prototype.exportToPowerApps = function (workflowId, environmentName, connectorName, swagger) {
            var _this = this;
            var triggerName = this._getTriggerNameFromSwagger(swagger);
            swagger = $.extend(true, swagger, {});
            this._updateSwagger(swagger);
            return this._getAdditionalRequestParameters(workflowId, triggerName).then(function (additionalRequestParameters) {
                return _this._powerAppsData.createCustomConnector(connectorName, environmentName, swagger, additionalRequestParameters);
            });
        };
        WorkflowData.prototype._getTriggerNameFromSwagger = function (swagger) {
            if (swagger && swagger.paths) {
                var keys = Object.keys(swagger.paths);
                if (keys.length === 1) {
                    var segments = keys[0].split("/");
                    if (segments.length > 1) {
                        return segments[1];
                    }
                }
            }
            return undefined;
        };
        WorkflowData.prototype._updateSwagger = function (swagger) {
            var parameters = ["sv", "sp", "sig", "api-version"];
            var paths = swagger.paths;
            for (var _i = 0, _a = Object.keys(paths); _i < _a.length; _i++) {
                var pathKey = _a[_i];
                var path = paths[pathKey];
                for (var _b = 0, _c = Object.keys(path); _b < _c.length; _b++) {
                    var methodKey = _c[_b];
                    var method = path[methodKey];
                    method.parameters = method.parameters.filter(function (parameter) { return parameters.indexOf(parameter.name) === -1; });
                }
            }
        };
        WorkflowData.prototype._getAdditionalRequestParameters = function (workflowId, triggerName) {
            return this.client.action("{0}/triggers/{1}".format(workflowId, triggerName), "listCallbackUrl")
                .then(function (result) {
                var additionalRequestParameters = {};
                for (var _i = 0, _a = Object.keys(result.queries); _i < _a.length; _i++) {
                    var key = _a[_i];
                    additionalRequestParameters[key] = {
                        location: "Query",
                        value: result.queries[key]
                    };
                    if (key === "sig") {
                        additionalRequestParameters[key].kind = "Secure";
                    }
                }
                return additionalRequestParameters;
            });
        };
        WorkflowData.prototype.isWorkflowNameAvailable = function (subscriptionId, resourceGroup, workflowName) {
            return this.client.listInResourceGroup(subscriptionId, resourceGroup).then(function (workflows) {
                return !workflows.some(function (workflow) {
                    return StringEx.equals(workflow.name, workflowName, StringComparison.IgnoreCase);
                });
            });
        };
        WorkflowData.prototype.upgradeLogicAppDefinitionV3 = function (resourceUri) {
            var upgradeDefintionEndpoint = this._generateUpgradedDefinitionTemplateUri.format(resourceUri);
            return this.client.post(upgradeDefintionEndpoint, {
                targetSchemaVersion: Constants.SCHEMA.GA_PREVIEW_20160401.VERSION
            });
        };
        WorkflowData.prototype.regenerateAccessKey = function (workflowId, keyType) {
            var endpoint = this._postRegenerateAccessKeyTemplateUri.format(workflowId);
            return this.client.post(endpoint, { keyType: keyType });
        };
        WorkflowData.prototype.listSwagger = function (workflowId) {
            return this.client.action(workflowId, "listSwagger");
        };
        WorkflowData.prototype.updateLogicAppAccessControlConfiguration = function (logicApp, updatedTriggersRanges, updatedContentsRanges, triggerAccessControlType) {
            var updatedTriggersSetting;
            var updatedContentsSetting = {
                allowedCallerIpAddresses: updatedContentsRanges
            };
            switch (triggerAccessControlType) {
                case AccessControlType.Any:
                    updatedTriggersSetting = undefined;
                    break;
                case AccessControlType.LogicAppsOnly:
                    updatedTriggersSetting = {
                        allowedCallerIpAddresses: []
                    };
                    break;
                default:
                    updatedTriggersSetting = {
                        allowedCallerIpAddresses: updatedTriggersRanges
                    };
                    break;
            }
            var updatedActionsSetting = updatedTriggersSetting;
            if (updatedContentsRanges.length === 0) {
                updatedContentsSetting = undefined;
            }
            var originalAccessControl = logicApp.properties.accessControl;
            if (originalAccessControl) {
                var originalTriggersSetting = originalAccessControl.triggers;
                var originalActionsSetting = originalAccessControl.actions;
                if (JSON.stringifyOrdered(originalTriggersSetting) !== JSON.stringifyOrdered(originalActionsSetting)) {
                    updatedActionsSetting = originalActionsSetting;
                }
            }
            return {
                triggers: updatedTriggersSetting,
                contents: updatedContentsSetting,
                actions: updatedActionsSetting
            };
        };
        WorkflowData.prototype._initializeExistingDataForIntegrationAccount = function (workflow, workflowSettings) {
            var integrationAccount = MsPortalFx.Data.Metadata.createEmptyObject(EMAExtension.DataModels.IntegrationAccountResourcePropertiesType);
            if (workflow.properties.peek().integrationAccount) {
                integrationAccount.id(workflow.properties.peek().integrationAccount.peek().id.peek());
                integrationAccount.name(workflow.properties.peek().integrationAccount.peek().name.peek());
            }
            // the location of the workflow is needed to find all the integration accounts in the same region.
            integrationAccount.location(workflow.location.peek());
            workflowSettings.integrationAccountResourceProperties(integrationAccount);
        };
        WorkflowData.prototype._initializeExistingDataForAccessControl = function (workflow, workflowSettings) {
            var accessControl;
            var accessControlType = AccessControlType.Any;
            if (workflow.properties().accessControl) {
                accessControl = workflow.properties().accessControl();
                if (accessControl.triggers && accessControl.triggers()) {
                    if (accessControl.triggers().allowedCallerIpAddresses().length > 0) {
                        accessControlType = AccessControlType.SpecificIPRanges;
                    }
                    else {
                        accessControlType = AccessControlType.LogicAppsOnly;
                    }
                }
            }
            else {
                accessControl = {
                    triggers: ko.observable({
                        allowedCallerIpAddresses: ko.observableArray([])
                    }),
                    contents: ko.observable({
                        allowedCallerIpAddresses: ko.observableArray([])
                    }),
                    actions: ko.observable({
                        allowedCallerIpAddresses: ko.observableArray([])
                    })
                };
            }
            if (!accessControl.triggers) {
                accessControl.triggers = ko.observable({
                    allowedCallerIpAddresses: ko.observableArray([])
                });
            }
            if (!accessControl.contents) {
                accessControl.contents = ko.observable({
                    allowedCallerIpAddresses: ko.observableArray([])
                });
            }
            if (!accessControl.actions) {
                accessControl.actions = ko.observable({
                    allowedCallerIpAddresses: ko.observableArray([])
                });
            }
            workflowSettings.accessControlConfiguration({
                accessControlType: ko.observable(accessControlType),
                accessControl: ko.observable(accessControl)
            });
        };
        WorkflowData.prototype._initializeExistingDataForRuntimeConfiguration = function (workflow, workflowSettings) {
            var runtimeConfiguration;
            var workflowPropertiesRuntimeConfiguration = workflow.properties.peek().runtimeConfiguration && workflow.properties.peek().runtimeConfiguration.peek();
            if (workflowPropertiesRuntimeConfiguration) {
                runtimeConfiguration = MsPortalFx.Data.Metadata.createEmptyObject(RuntimeConfigurationRef.metadata.name);
                if (workflowPropertiesRuntimeConfiguration.operationOptions) {
                    var workflowOperationOptions = workflowPropertiesRuntimeConfiguration.operationOptions.peek();
                    if (workflowOperationOptions && workflowOperationOptions.search(Constants.RuntimeConfigurationThroughputMode.HighThroughput) >= 0) {
                        runtimeConfiguration.throughputMode = ko.observable(Constants.RuntimeConfigurationThroughputMode.HighThroughput);
                    }
                    else {
                        runtimeConfiguration.throughputMode = ko.observable(Constants.RuntimeConfigurationThroughputMode.HighAvailability);
                    }
                }
                else {
                    runtimeConfiguration.throughputMode = ko.observable(Constants.RuntimeConfigurationThroughputMode.HighAvailability);
                }
                if (workflowPropertiesRuntimeConfiguration.lifetime) {
                    runtimeConfiguration.runHistoryRetention = ko.observable({
                        runHistoryRetentionType: ko.observable(RunHistoryRetentionType.Custom),
                        runHistoryRetentionInDays: workflowPropertiesRuntimeConfiguration.lifetime.peek().count
                    });
                }
                else {
                    runtimeConfiguration.runHistoryRetention = ko.observable({
                        runHistoryRetentionType: ko.observable(RunHistoryRetentionType.Default),
                        runHistoryRetentionInDays: ko.observable(Constants.RunHistoryRetention.DefaultDays)
                    });
                }
            }
            if (!runtimeConfiguration) {
                runtimeConfiguration = {
                    throughputMode: ko.observable(Constants.RuntimeConfigurationThroughputMode.HighAvailability),
                    runHistoryRetention: ko.observable({
                        runHistoryRetentionType: ko.observable(RunHistoryRetentionType.Default),
                        runHistoryRetentionInDays: ko.observable(Constants.RunHistoryRetention.DefaultDays)
                    })
                };
            }
            workflowSettings.runtimeConfiguration(runtimeConfiguration);
        };
        WorkflowData.prototype._removeOperationOption = function (operationOptions, operationOption) {
            var separator = Constants.Separator.OptionsSeparator;
            var options = operationOptions.split(separator);
            for (var i = 0; i < options.length; i++) {
                if (StringEx.equals(options[i], operationOption, StringComparison.IgnoreCase)) {
                    options.splice(i, 1);
                    if (options.length === 0) {
                        return undefined;
                    }
                    else if (options.length === 1) {
                        return options.toString();
                    }
                    else {
                        return options.join(separator);
                    }
                }
            }
            if (operationOptions === null || operationOptions === "") {
                return undefined;
            }
            else {
                return operationOptions;
            }
        };
        WorkflowData.prototype._addOperationOption = function (operationOptions, operationOption) {
            if (operationOptions === undefined) {
                return Constants.RuntimeConfigurationThroughputMode.HighThroughput;
            }
            var separator = Constants.Separator.OptionsSeparator;
            var options = operationOptions.split(separator);
            if (options.indexOf(operationOption) === -1) {
                options.push(operationOption);
            }
            if (options.length > 1) {
                return options.join(separator);
            }
            else {
                return options.toString();
            }
        };
        return WorkflowData;
    }());
    exports.WorkflowData = WorkflowData;
});
