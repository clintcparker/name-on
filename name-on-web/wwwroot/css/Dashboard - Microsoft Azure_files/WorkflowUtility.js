define(["require", "exports", "../Constants", "../CORS/CorsConstants", "EMA/ClientResources/ClientResources", "../../_generated/ExtensionDefinition", "./Utilities", "../../_generated/BladeReferences"], function (require, exports, Constants, CorsConstants_1, ClientResources, ExtensionDefinition, Utilities, BladeReferences_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceTypes = MsPortalFx.ViewModels.Services.ResourceTypes;
    var WorkflowUtility = (function () {
        function WorkflowUtility() {
        }
        WorkflowUtility.getLocalizedFlowState = function (state) {
            if (StringEx.equals(state, "enabled")) {
                return ClientResources.Workflow.TriggerState.enabled;
            }
            else if (StringEx.equals(state, "disabled")) {
                return ClientResources.Workflow.TriggerState.disabled;
            }
            else if (StringEx.equals(state, "deleted")) {
                return ClientResources.Workflow.TriggerState.deleted;
            }
            else if (StringEx.equals(state, "suspended")) {
                return ClientResources.Workflow.TriggerState.suspended;
            }
            else {
                return state;
            }
        };
        WorkflowUtility.generateTriggerId = function (workflowId, triggerName) {
            var descriptor = ResourceTypes.parseResourceDescriptor(workflowId);
            var resourceId = this.getLogicAppIdFromDescriptor(descriptor);
            return resourceId + "/" + CorsConstants_1.CorsConstants.workflowTriggerType + "/" + triggerName;
        };
        WorkflowUtility.generateRunId = function (workflowId, runName) {
            var descriptor = ResourceTypes.parseResourceDescriptor(workflowId);
            var resourceId = this.getLogicAppIdFromDescriptor(descriptor);
            return resourceId + "/" + CorsConstants_1.CorsConstants.workflowHistoryType + "/" + runName;
        };
        WorkflowUtility.generateWorkflowVersionId = function (workflowId, versionName) {
            var descriptor = ResourceTypes.parseResourceDescriptor(workflowId);
            var resourceId = this.getLogicAppIdFromDescriptor(descriptor);
            return resourceId + "/" + CorsConstants_1.CorsConstants.workflowVersionType + "/" + versionName;
        };
        // triggerId = "{workflowId}/triggers/{triggerName}"
        WorkflowUtility.parseTriggerId = function (triggerId) {
            if (!triggerId) {
                return null;
            }
            var resourceDescriptor = ResourceTypes.parseResourceDescriptor(triggerId);
            if (resourceDescriptor && StringEx.equals(resourceDescriptor.type, CorsConstants_1.CorsConstants.workflowTriggerType, StringComparison.IgnoreCase)) {
                var workflowName = resourceDescriptor.resources[0], triggerName = resourceDescriptor.resources[1], workflowId = ResourceTypes.buildParentResourceIdFromDescriptor(resourceDescriptor);
                return $.extend(resourceDescriptor, {
                    workflowName: workflowName,
                    triggerName: triggerName,
                    workflowId: workflowId
                });
            }
            else {
                return null;
            }
        };
        WorkflowUtility.doesSupportCallbackUrl = function (triggerType) {
            return WorkflowUtility.isManualTrigger(triggerType) ||
                StringEx.equals(triggerType, WorkflowUtility.TriggerTypes.apiConnectionWebHook, StringComparison.IgnoreCase) ||
                StringEx.equals(triggerType, WorkflowUtility.TriggerTypes.httpWebHook, StringComparison.IgnoreCase);
        };
        WorkflowUtility.anyActionHasTriggerDependency = function (workflow) {
            var action, actions, actionString, definition, properties, key, regex = WorkflowUtility.isOldWorkflowSchema(workflow) ?
                /@trigger\('(.+)'\)|@triggers\(('(.+)')?\)|@[{]triggers([^}]+)[}]/g :
                /@{?(?:triggerBody|trigger|triggerOutputs)\(\s*\)}?/g;
            if (!workflow || !workflow.properties) {
                return false;
            }
            properties = ko.utils.unwrapObservable(workflow.properties);
            if (!properties) {
                return false;
            }
            definition = ko.utils.unwrapObservable(properties.definition);
            if (!definition) {
                return false;
            }
            actions = ko.utils.unwrapObservable(definition.actions) || {};
            return Object.keys(actions).some(function (key) {
                action = actions[key]();
                actionString = ko.toJSON(action);
                return !!regex.exec(actionString);
            });
        };
        WorkflowUtility.getTriggerBladeInfo = function (triggerId, triggerType) {
            return {
                extension: ExtensionDefinition.definitionName,
                detailBlade: ExtensionDefinition.BladeNames.workflowTriggerBlade,
                detailBladeInputs: {
                    triggerId: triggerId
                }
            };
        };
        WorkflowUtility.getDesignerBladeInfo = function (workflow, shouldOpenCodeView) {
            if (shouldOpenCodeView === void 0) { shouldOpenCodeView = false; }
            var bladeName, bladeInputs = {
                id: workflow.id()
            };
            bladeName = ExtensionDefinition.BladeNames.logicAppsDesignerBlade;
            if (shouldOpenCodeView) {
                bladeInputs = $.extend(true, bladeInputs, {
                    shouldOpenCodeView: shouldOpenCodeView
                });
            }
            return ko.observable({
                extension: ExtensionDefinition.definitionName,
                detailBlade: bladeName,
                detailBladeInputs: bladeInputs
            });
        };
        WorkflowUtility.getMonitorBladeInfo = function (id, runid, workflow) {
            var extension = ExtensionDefinition.definitionName;
            var detailBlade;
            var detailBladeInputs;
            if (WorkflowUtility.isWorkflowSchemaSupported(workflow)) {
                detailBlade = ExtensionDefinition.BladeNames.logicAppsMonitorBlade;
                detailBladeInputs = {
                    id: id,
                    runid: runid
                };
            }
            else {
                detailBlade = ExtensionDefinition.BladeNames.workflowRunBlade;
                detailBladeInputs = {
                    id: runid
                };
            }
            return {
                extension: extension,
                detailBlade: detailBlade,
                detailBladeInputs: detailBladeInputs
            };
        };
        WorkflowUtility.getUpgradeBladeInfo = function (workflow) {
            var bladeName, bladeInputs = {
                id: workflow.id()
            }, definition = workflow.properties().definition(), definitionSchema = definition[Constants.SchemaPropertyKeys.SchemaKey]() || "", lowerCaseSchema = definitionSchema.toLowerCase();
            if (lowerCaseSchema.indexOf(Constants.SCHEMA.GA_PREVIEW_20141201.VERSION) > -1) {
                bladeName = ExtensionDefinition.BladeNames.logicAppsV2UpdateBlade;
            }
            else if (lowerCaseSchema.indexOf(Constants.SCHEMA.GA_PREVIEW_20150801.VERSION) > -1) {
                bladeName = ExtensionDefinition.BladeNames.logicAppsV3UpdateBlade;
            }
            if (!bladeName) {
                return null;
            }
            return ko.observable({
                extension: ExtensionDefinition.definitionName,
                detailBlade: bladeName,
                detailBladeInputs: bladeInputs
            });
        };
        WorkflowUtility.getDesignerBladeReference = function (workflow, onClosedCallback, initTemplateCategory) {
            var designerBladeInputs = {
                initTemplateCategory: initTemplateCategory,
                id: workflow.id()
            };
            return new BladeReferences_1.LogicAppsDesignerBladeReference(designerBladeInputs, onClosedCallback);
        };
        WorkflowUtility.getMonitorBladeReference = function (runid, workflow, onClosedCallback) {
            if (WorkflowUtility.isWorkflowSchemaSupported(workflow)) {
                var monitorInputs = {
                    runid: runid
                };
                return new BladeReferences_1.LogicAppsMonitorBladeReference(monitorInputs, onClosedCallback);
            }
            else {
                var runInputs = {
                    id: runid
                };
                return new BladeReferences_1.WorkflowRunBladeReference(runInputs, onClosedCallback);
            }
        };
        WorkflowUtility.getUpgradeBladeReference = function (workflow, onClosedCallback) {
            var definition = workflow.properties().definition();
            var definitionSchema = definition[Constants.SchemaPropertyKeys.SchemaKey]() || "";
            var lowerCaseSchema = definitionSchema.toLowerCase();
            var inputs = {
                id: workflow.id()
            };
            var bladeReference = null;
            if (lowerCaseSchema.indexOf(Constants.SCHEMA.GA_PREVIEW_20141201.VERSION) > -1) {
                bladeReference = new BladeReferences_1.LogicAppsV2UpdateBladeReference(inputs, onClosedCallback);
            }
            else if (lowerCaseSchema.indexOf(Constants.SCHEMA.GA_PREVIEW_20150801.VERSION) > -1) {
                bladeReference = new BladeReferences_1.LogicAppsV3UpdateBladeReference(inputs, onClosedCallback);
            }
            return bladeReference;
        };
        WorkflowUtility.isWorkflowSchemaSupported = function (workflow) {
            var properties = workflow && workflow.properties && workflow.properties() || {};
            var definition = properties && properties.definition && properties.definition() || {};
            return WorkflowUtility.isSchemaSupported(definition.$schema());
        };
        WorkflowUtility.isSchemaSupported = function (schema) {
            if (!schema) {
                return false;
            }
            return [
                Constants.SCHEMA.GA_20160601.VERSION,
                Constants.SCHEMA.GA_PREVIEW_20160401.VERSION,
                Constants.SCHEMA.GA_PREVIEW_20150801.VERSION
            ].some(function (version) {
                return schema.indexOf(version) !== -1;
            });
        };
        // @deprecated Please use isWorkflowSchemaSupported() instead
        WorkflowUtility.isWorkflowSchemaVersion = function (workflow, schemaUrl) {
            var definition = workflow.properties().definition(), definitionSchema = definition[Constants.SchemaPropertyKeys.SchemaKey]() || "", definitionSchemaUrn = this._getSchemaVersionUrn(definitionSchema), oldSchemaUrn = this._getSchemaVersionUrn(schemaUrl);
            return StringEx.equals(definitionSchemaUrn, oldSchemaUrn, StringComparison.IgnoreCase);
        };
        // @deprecated Please use isWorkflowSchemaSupported() instead
        WorkflowUtility.isOldWorkflowSchema = function (workflow) {
            return WorkflowUtility.isWorkflowSchemaVersion(workflow, Constants.SCHEMA.GA_PREVIEW_20141201.URL);
        };
        WorkflowUtility.doesSchemaNeedUpgrade = function (workflow) {
            var definition = workflow.properties().definition(), definitionSchema = definition[Constants.SchemaPropertyKeys.SchemaKey]() || "";
            return definitionSchema.toLowerCase().indexOf(Constants.SCHEMA.GA_PREVIEW_20160401.VERSION) === -1 && definitionSchema.toLowerCase().indexOf(Constants.SCHEMA.GA_20160601.VERSION) === -1;
        };
        WorkflowUtility.isRunWorkflowManually = function (definition) {
            var defaultValue = false, parameters = (definition && definition.parameters && definition.parameters()) || {}, parameter;
            if (parameters.hasOwnProperty(Constants.WorkflowDefinitionParameterKey.runManually)) {
                parameter = parameters[Constants.WorkflowDefinitionParameterKey.runManually]();
                if (StringEx.equals(parameter.type(), "bool", StringComparison.IgnoreCase) && parameter.hasOwnProperty("defaultValue") && typeof parameter.defaultValue() === "boolean") {
                    return parameter.defaultValue();
                }
            }
            return defaultValue;
        };
        WorkflowUtility.isTerminalState = function (status) {
            return StringEx.equals(status, Constants.WorkflowStatus.Succeeded, StringComparison.IgnoreCase) ||
                StringEx.equals(status, Constants.WorkflowStatus.Failed, StringComparison.IgnoreCase) ||
                StringEx.equals(status, Constants.WorkflowStatus.Cancelled, StringComparison.IgnoreCase) ||
                StringEx.equals(status, Constants.WorkflowHistoryStatus.Skipped, StringComparison.IgnoreCase);
        };
        WorkflowUtility.getRunDurationForRunsGrid = function (runProperties) {
            var duration = WorkflowUtility.EmptyDurationString;
            if (WorkflowUtility.isTerminalState(runProperties.status()) && runProperties.endTime && runProperties.endTime()) {
                duration = ExtensionCore.Utilities.DateTimeUtility.toFriendlyDurationString(runProperties.startTime(), runProperties.endTime());
            }
            return duration;
        };
        WorkflowUtility.getRunDurationForRunsPageableGrid = function (runProperties) {
            var duration = WorkflowUtility.EmptyDurationString;
            if (WorkflowUtility.isTerminalState(runProperties.status) && runProperties.endTime) {
                duration = ExtensionCore.Utilities.DateTimeUtility.toFriendlyDurationString(new Date(runProperties.startTime), new Date(runProperties.endTime));
            }
            return duration;
        };
        WorkflowUtility.getLogicAppFromDefinitionWithReferencesAndSku = function (definitionWithReferencesAndSku) {
            var definition = WorkflowUtility._getLogicAppDefinition(definitionWithReferencesAndSku.definition), parameters = {};
            if (!Utilities.isNullOrEmptyObject(definitionWithReferencesAndSku.connectionReferences)) {
                parameters = (_a = {},
                    _a[Constants.SchemaPropertyKeys.ConnectionsKey] = {
                        value: definitionWithReferencesAndSku.connectionReferences
                    },
                    _a);
            }
            return {
                properties: {
                    definition: definition,
                    parameters: parameters,
                    sku: definitionWithReferencesAndSku.sku
                }
            };
            var _a;
        };
        WorkflowUtility.getLogicAppSku = function (logicApp) {
            var consumptionSku = {
                name: Constants.FlowSkuName.Consumption,
                plan: null
            };
            return logicApp.properties.sku ? logicApp.properties.sku : consumptionSku;
        };
        WorkflowUtility.getLogicAppConnections = function (logicApp) {
            var result = [];
            var connections = logicApp.properties
                && logicApp.properties.parameters
                && logicApp.properties.parameters[Constants.SchemaPropertyKeys.ConnectionsKey]
                && logicApp.properties.parameters[Constants.SchemaPropertyKeys.ConnectionsKey].value;
            if (connections) {
                var descriptor_1 = MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(logicApp.id);
                Object.keys(connections).forEach(function (key) {
                    var item = connections[key];
                    var id = Utilities.findPropertyIgnoreCase("connectionId", item);
                    var name = Utilities.findPropertyIgnoreCase("connectionName", item);
                    if (WorkflowUtility._isRelativeConnectionId(id)) {
                        id = "/subscriptions/" + descriptor_1.subscription + "/resourceGroups/" + descriptor_1.resourceGroup + id;
                    }
                    if (!name) {
                        var splitItems = id.split("/");
                        name = splitItems[splitItems.length - 1];
                    }
                    result.push({
                        id: id,
                        name: name
                    });
                });
            }
            return result;
        };
        WorkflowUtility.getLogicAppDefinitionWithReferencesAndSkuFromLogicApp = function (logicApp) {
            return {
                definition: logicApp.properties.definition,
                connectionReferences: WorkflowUtility.getConnectionReferencesFromLogicApp(logicApp),
                sku: this.getLogicAppSku(logicApp)
            };
        };
        WorkflowUtility.getConnectionReferencesFromLogicApp = function (logicApp) {
            return logicApp.properties.parameters &&
                logicApp.properties.parameters.hasOwnProperty(Constants.SchemaPropertyKeys.ConnectionsKey) &&
                logicApp.properties.parameters[Constants.SchemaPropertyKeys.ConnectionsKey] &&
                logicApp.properties.parameters[Constants.SchemaPropertyKeys.ConnectionsKey].value || {};
        };
        WorkflowUtility.isManualTrigger = function (type) {
            return StringEx.equals(type, WorkflowUtility.TriggerTypes.manual, StringComparison.IgnoreCase) || StringEx.equals(type, WorkflowUtility.TriggerTypes.request, StringComparison.IgnoreCase);
        };
        WorkflowUtility.isBatchTrigger = function (type) {
            return StringEx.equals(type, WorkflowUtility.TriggerTypes.batch, StringComparison.IgnoreCase);
        };
        WorkflowUtility.traverseAction = function (action, visitAction) {
            "use strict";
            visitAction(action);
            var nestedActions = [];
            if (action.hasOwnProperty(WorkflowUtility.ScopeProperties.actions)) {
                nestedActions = WorkflowUtility.unmap(action[WorkflowUtility.ScopeProperties.actions]);
            }
            var type = action[WorkflowUtility.ScopeProperties.type] || "";
            switch (type.toLowerCase()) {
                case WorkflowUtility.ScopeTypes.if:
                    if (action.hasOwnProperty(WorkflowUtility.ScopeProperties.elseif)) {
                        nestedActions = nestedActions.concat(WorkflowUtility.unmap(action[WorkflowUtility.ScopeProperties.elseif][WorkflowUtility.ScopeProperties.actions]));
                    }
                    if (action.hasOwnProperty(WorkflowUtility.ScopeProperties.else)) {
                        nestedActions = nestedActions.concat(WorkflowUtility.unmap(action[WorkflowUtility.ScopeProperties.else][WorkflowUtility.ScopeProperties.actions]));
                    }
                    break;
                case WorkflowUtility.ScopeTypes.switch:
                    if (action.hasOwnProperty(WorkflowUtility.ScopeProperties.cases)) {
                        Object.keys(action[WorkflowUtility.ScopeProperties.cases]).forEach(function (caseName) {
                            nestedActions = nestedActions.concat(WorkflowUtility.unmap(action[WorkflowUtility.ScopeProperties.cases][caseName][WorkflowUtility.ScopeProperties.actions]));
                        });
                    }
                    if (action.hasOwnProperty(WorkflowUtility.ScopeProperties.default)) {
                        nestedActions = nestedActions.concat(WorkflowUtility.unmap(action[WorkflowUtility.ScopeProperties.default][WorkflowUtility.ScopeProperties.actions]));
                    }
                    break;
                default:
                    break;
            }
            nestedActions.forEach(function (childAction) {
                WorkflowUtility.traverseAction(childAction, visitAction);
            });
        };
        WorkflowUtility.unmap = function (object) {
            object = object || {};
            return Object.keys(object).map(function (key) {
                return object[key];
            });
        };
        WorkflowUtility.getTriggerHistoryId = function (operation, workflowId) {
            var properties = operation.properties();
            var runName = operation.name();
            var triggerHistoryId = null;
            if (!!runName &&
                properties.hasOwnProperty("trigger") &&
                !Utilities.isNullOrEmptyObject(properties.trigger()) &&
                properties.trigger().name) {
                var trigger = properties.trigger();
                triggerHistoryId = workflowId + "/" + CorsConstants_1.CorsConstants.workflowTriggerType + "/" + trigger.name() + "/" + CorsConstants_1.CorsConstants.workflowTriggerHistoryType + "/" + runName;
            }
            return triggerHistoryId;
        };
        WorkflowUtility.getLogicAppFromFormData = function (formData) {
            var logicApp = JSON.parse(formData.logicApp());
            var editableContent = JSON.parse(formData.editableContent());
            var definition = editableContent.definition;
            var connectionReferences = Utilities.findPropertyIgnoreCase(Constants.SchemaPropertyKeys.ConnectionsKey, editableContent);
            var parameters = JSON.parse(formData.originalParameters());
            logicApp.properties.definition = definition;
            if (connectionReferences || parameters) {
                var connectionsParameter = connectionReferences ? (_a = {}, _a[Constants.SchemaPropertyKeys.ConnectionsKey] = connectionReferences, _a) : null;
                logicApp.properties.parameters = $.extend(/*deepcopy:*/ false, parameters || null, connectionsParameter);
            }
            return logicApp;
            var _a;
        };
        WorkflowUtility.getLogicAppFromLogicAppDefinitionWithReferencesAndSku = function (definitionWithReferencesAndSku, logicApp) {
            var connectionReferences = definitionWithReferencesAndSku.connectionReferences || { value: {} };
            var references = definitionWithReferencesAndSku.references;
            for (var _i = 0, _a = Object.keys(references); _i < _a.length; _i++) {
                var key = _a[_i];
                var reference = definitionWithReferencesAndSku.references[key];
                connectionReferences.value[key] = {
                    id: reference.api.id,
                    connectionId: reference.connection.id,
                    connectionName: ""
                };
            }
            var logicAppFromTemplate = $.extend(/*deepcopy:*/ false, null, logicApp);
            logicAppFromTemplate.properties.definition = $.extend(/*deepcopy:*/ false, null, definitionWithReferencesAndSku.definition);
            logicAppFromTemplate.properties.connectionParameters = {};
            if (connectionReferences) {
                var connectionsParameter = (_b = {}, _b[Constants.SchemaPropertyKeys.ConnectionsKey] = connectionReferences, _b);
                logicAppFromTemplate.properties.parameters = $.extend(/*deepcopy:*/ false, null, connectionsParameter);
            }
            return logicAppFromTemplate;
            var _b;
        };
        WorkflowUtility.getLogicAppIdFromDescriptor = function (descriptor) {
            var template = "/subscriptions/{0}/resourcegroups/{1}/providers/{2}/{3}/{4}";
            var logicAppName = descriptor.resource;
            var resourceKeys = Object.keys(descriptor.resourceMap);
            if (resourceKeys.length >= 1) {
                resourceKeys.forEach(function (key) {
                    if (StringEx.equals(key, "{0}/{1}".format(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowType), StringComparison.IgnoreCase)) {
                        logicAppName = descriptor.resourceMap[key];
                    }
                });
            }
            return template.format(descriptor.subscription, descriptor.resourceGroup, CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowType, logicAppName);
        };
        WorkflowUtility.convertWorkflowVersionToWorkflow = function (workflowVersion, state) {
            var logicApp = ko.toJS(workflowVersion);
            var descriptor = ResourceTypes.parseResourceDescriptor(workflowVersion.id());
            logicApp.type = CorsConstants_1.CorsConstants.provider + "/" + CorsConstants_1.CorsConstants.workflowType;
            logicApp.id = this.getLogicAppIdFromDescriptor(descriptor);
            logicApp.properties.state = state;
            var resourceKeys = Object.keys(descriptor.resourceMap);
            resourceKeys.forEach(function (key) {
                if (StringEx.equals(key, "{0}/{1}".format(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowType), StringComparison.IgnoreCase)) {
                    logicApp.name = descriptor.resourceMap[key];
                }
            });
            return logicApp;
        };
        WorkflowUtility.getLogicAppsCodeViewEditorConfiguration = function () {
            var jsonSchemaGAPreview = {
                fileMatch: ["*"],
                uri: Constants.SCHEMA.GA_PREVIEW_20160401.URL
            };
            var jsonSchemaGA = {
                fileMatch: ["*"],
                uri: Constants.SCHEMA.GA_20160601.URL
            };
            return {
                json: {
                    schemas: [jsonSchemaGAPreview, jsonSchemaGA]
                }
            };
        };
        WorkflowUtility.getWorkflowCategory = function (tags) {
            if (tags) {
                for (var _i = 0, _a = Object.keys(tags); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (StringEx.equals(key, Constants.WorkflowTagKeys.LogicAppsCategory, StringComparison.IgnoreCase)) {
                        return tags[key];
                    }
                }
            }
            return undefined;
        };
        WorkflowUtility.getMdmMetricHistoryAbsoluteUri = function (query) {
            var filterString = "";
            if (query.metricNames.length > 0) {
                var nameFilter = "name.value eq '" + query.metricNames[0] + "'";
                for (var i = 1; i < query.metricNames.length; i++) {
                    nameFilter += " or name.value eq '" + query.metricNames[i] + "'";
                }
                filterString = "(" + nameFilter + ") and aggregationType eq '" + query.aggregationType + "' and startTime eq " + query.startTime.toISOString() + " and endTime eq " + query.endTime.toISOString() + " and timeGrain eq duration'" + query.timegrain + "'";
            }
            return CorsConstants_1.CorsConstants.getMdmMetricHistory.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), query.workflowId, filterString);
        };
        WorkflowUtility.resolveTemplateConnectionReferences = function (connectionReferences, subscriptionId, location) {
            if (connectionReferences) {
                var result = $.extend(/* deep */ true, {}, connectionReferences);
                if (result["value"]) {
                    for (var _i = 0, _a = Object.keys(result["value"]); _i < _a.length; _i++) {
                        var key = _a[_i];
                        var reference = result["value"][key];
                        if (reference &&
                            reference.id &&
                            StringEx.startsWith(reference.id, WorkflowUtility.TemplateConnectionReferenceId, StringComparison.IgnoreCase)) {
                            reference.id = reference.id.format(subscriptionId, location);
                            reference.connectionId = reference.connectionId || "";
                            reference.connectionName = reference.connectionName || "";
                        }
                    }
                }
                return result;
            }
            return undefined;
        };
        WorkflowUtility._getSchemaVersionUrn = function (schemaVersionUri) {
            var splitItems = schemaVersionUri && schemaVersionUri.split("://");
            if (splitItems.length === 2) {
                return splitItems[1];
            }
            return schemaVersionUri;
        };
        WorkflowUtility._deleteAuthParameter = function (actionOrTrigger) {
            if (WorkflowUtility._shouldRemoveAuth(actionOrTrigger.type) && actionOrTrigger.inputs) {
                delete actionOrTrigger.inputs[Constants.SchemaPropertyKeys.AuthKey];
            }
            return actionOrTrigger;
        };
        WorkflowUtility._deleteIsPartialKey = function (trigger) {
            var schema = trigger.inputs && trigger.inputs.schema;
            if (schema && schema.properties) {
                Object.keys(schema.properties).forEach(function (key) {
                    delete trigger.inputs.schema.properties[key][Constants.SchemaPropertyKeys.ManualTriggerPartialKey];
                });
            }
            return trigger;
        };
        WorkflowUtility._getLogicAppDefinition = function (definition) {
            var updatedDefinition = $.extend(true, {}, definition), actions = updatedDefinition.actions, triggers = updatedDefinition.triggers;
            var deleteAuth = function (action) {
                WorkflowUtility._deleteAuthParameter(action);
            };
            Object.keys(updatedDefinition.actions).forEach(function (actionName) {
                var action = updatedDefinition.actions[actionName];
                WorkflowUtility.traverseAction(action, deleteAuth);
            });
            Object.keys(triggers).forEach(function (triggerKey) {
                var trigger = triggers[triggerKey];
                trigger = WorkflowUtility._deleteAuthParameter(trigger);
                if (WorkflowUtility.isManualTrigger(trigger.type)) {
                    trigger = WorkflowUtility._deleteIsPartialKey(trigger);
                }
                triggers[triggerKey] = trigger;
            });
            delete updatedDefinition.parameters[Constants.SchemaPropertyKeys.AuthParameter];
            return updatedDefinition;
        };
        WorkflowUtility._shouldRemoveAuth = function (type) {
            return StringEx.equals(type, Constants.SchemaPropertyKeys.ApiConnectionKey, StringComparison.IgnoreCase) ||
                StringEx.equals(type, Constants.SchemaPropertyKeys.ApiWebhookConnectionKey, StringComparison.IgnoreCase);
        };
        WorkflowUtility._isRelativeConnectionId = function (connectionId) {
            var regex = /^\/providers\/Microsoft.Web\/connections\/(.*)$/i;
            var matches = regex.exec(connectionId);
            return matches && matches.length > 0;
        };
        WorkflowUtility.getUniqueConnectionProviders = function (logicApp) {
            var apiIds = [], connectionParameters = logicApp && logicApp.properties && logicApp.properties.connectionParameters, connectionProviders = [];
            if (connectionParameters) {
                Object.keys(connectionParameters).forEach(function (key) {
                    var api = connectionParameters[key].api, apiId = api.id;
                    if (!apiIds.some(function (id) { return StringEx.equals(id, apiId, StringComparison.IgnoreCase); })) {
                        apiIds.push(apiId);
                        connectionProviders.push(api);
                    }
                });
            }
            return connectionProviders;
        };
        WorkflowUtility.getIntegrationServiceEnvironmentId = function (logicApp) {
            return (logicApp && logicApp.properties && logicApp.properties.integrationServiceEnvironment)
                ? logicApp.properties.integrationServiceEnvironment.id
                : undefined;
        };
        WorkflowUtility.getIntegrationAccountId = function (logicApp) {
            return (logicApp && logicApp.properties && logicApp.properties.integrationAccount)
                ? logicApp.properties.integrationAccount.id
                : undefined;
        };
        WorkflowUtility.containsPlaceholderForRequestTrigger = function (dataContext, resourceId, triggerName) {
            var triggerId = WorkflowUtility.generateTriggerId(resourceId, triggerName);
            var listCallbackUri = triggerId + "/listCallbackUrl", queryParameters = { "api-version": MsPortalFx.getEnvironmentValue("emaApiVersion") };
            return Q(dataContext.workflow.client.post(listCallbackUri, {}, queryParameters)).then(function (result) {
                return result.relativePathParameters && result.relativePathParameters.length > 0;
            });
        };
        WorkflowUtility.showUnableToRunTriggerNotification = function (description) {
            var notification = new MsPortalFx.Hubs.Notifications.ClientNotification({
                title: ClientResources.Workflow.Notification.RunWorkflow.unableToRunTriggerTitle,
                description: description,
                status: MsPortalFx.Hubs.Notifications.NotificationStatus.Error
            });
            notification.publish();
        };
        // TODO(snmakine): Task 2193199 created to do complex Recurrence Calculation in one place for Designer and LogicAppsPortal
        WorkflowUtility.getResourceStringForSchedule = function (frequency, interval, weekdays, hours, minutes) {
            var daysDesc;
            var timeDesc;
            var summary;
            var frequencyDesc;
            if (interval > 1) {
                if (StringEx.equals(frequency, Constants.RecurrenceFrequencyUnits.WEEK, StringComparison.IgnoreCase)) {
                    frequencyDesc = ClientResources.Workflow.Recurrence.Schedule.Description.everyweeks.format(interval);
                }
                else if (StringEx.equals(frequency, Constants.RecurrenceFrequencyUnits.DAY, StringComparison.IgnoreCase)) {
                    frequencyDesc = ClientResources.Workflow.Recurrence.Schedule.Description.everydays.format(interval);
                }
            }
            else {
                if (StringEx.equals(frequency, Constants.RecurrenceFrequencyUnits.WEEK, StringComparison.IgnoreCase)) {
                    frequencyDesc = ClientResources.Workflow.Recurrence.Schedule.Description.everyweek;
                }
                else if (StringEx.equals(frequency, Constants.RecurrenceFrequencyUnits.DAY, StringComparison.IgnoreCase)) {
                    frequencyDesc = ClientResources.Workflow.Recurrence.Schedule.Description.everyday;
                }
            }
            if (frequencyDesc) {
                if (weekdays && weekdays.length && StringEx.equals(frequency, Constants.RecurrenceFrequencyUnits.WEEK, StringComparison.IgnoreCase)) {
                    daysDesc = ClientResources.Workflow.Recurrence.Schedule.Description.ondaysweek.format(weekdays.join(Constants.RecurrenceFrequencyUnits.RECURRENCE_TITLE_JOIN_SEPARATOR), frequencyDesc);
                }
                else {
                    daysDesc = frequencyDesc;
                }
            }
            var projectTimes = [];
            if (hours && hours.length && minutes && minutes.length) {
                for (var hour in hours) {
                    for (var minute in minutes) {
                        projectTimes.push(hours[hour] + ":" + Utilities.padStart(minutes[minute], 2, "0"));
                    }
                }
                timeDesc = ClientResources.Workflow.Recurrence.Schedule.Description.attime.format(projectTimes.join(Constants.RecurrenceFrequencyUnits.RECURRENCE_TITLE_JOIN_SEPARATOR));
            }
            else if (hours && hours.length) {
                for (var recurrencehour in hours) {
                    projectTimes.push(hours[recurrencehour] + ":00");
                }
                timeDesc = ClientResources.Workflow.Recurrence.Schedule.Description.attime.format(projectTimes.join(Constants.RecurrenceFrequencyUnits.RECURRENCE_TITLE_JOIN_SEPARATOR));
            }
            else if (minutes && minutes.length) {
                for (var recurrenceminute in minutes) {
                    projectTimes.push("00:" + Utilities.padStart(minutes[recurrenceminute], 2, "0"));
                }
                timeDesc = ClientResources.Workflow.Recurrence.Schedule.Description.attimeeveryhour.format(projectTimes.join(Constants.RecurrenceFrequencyUnits.RECURRENCE_TITLE_JOIN_SEPARATOR));
            }
            if (timeDesc && daysDesc) {
                summary = ClientResources.Workflow.Recurrence.Schedule.Description.runfull.format(timeDesc, daysDesc);
            }
            else if (timeDesc) {
                summary = ClientResources.Workflow.Recurrence.Schedule.Description.runsimple.format(timeDesc);
            }
            else {
                summary = ClientResources.Workflow.Recurrence.Schedule.Description.runsimple.format(daysDesc);
            }
            return {
                onTime: timeDesc,
                onDays: daysDesc,
                summary: summary
            };
        };
        WorkflowUtility.getFrequencyString = function (frequencyType) {
            switch (frequencyType.toLowerCase()) {
                case Constants.RecurrenceFrequencyUnits.MONTH:
                    return ClientResources.Workflow.Summary.Frequency.months;
                case Constants.RecurrenceFrequencyUnits.WEEK:
                    return ClientResources.Workflow.Summary.Frequency.weeks;
                case Constants.RecurrenceFrequencyUnits.DAY:
                    return ClientResources.Workflow.Summary.Frequency.days;
                case Constants.RecurrenceFrequencyUnits.HOUR:
                    return ClientResources.Workflow.Summary.Frequency.hours;
                case Constants.RecurrenceFrequencyUnits.MINUTE:
                    return ClientResources.Workflow.Summary.Frequency.minutes;
                case Constants.RecurrenceFrequencyUnits.SECOND:
                    return ClientResources.Workflow.Summary.Frequency.seconds;
                default:
                    return "";
            }
        };
        WorkflowUtility.getFrequencySingular = function (frequencyType) {
            switch (frequencyType.toLowerCase()) {
                case Constants.RecurrenceFrequencyUnits.MONTH:
                    return ClientResources.Workflow.Summary.Frequency.month;
                case Constants.RecurrenceFrequencyUnits.WEEK:
                    return ClientResources.Workflow.Summary.Frequency.week;
                case Constants.RecurrenceFrequencyUnits.DAY:
                    return ClientResources.Workflow.Summary.Frequency.day;
                case Constants.RecurrenceFrequencyUnits.HOUR:
                    return ClientResources.Workflow.Summary.Frequency.hour;
                case Constants.RecurrenceFrequencyUnits.MINUTE:
                    return ClientResources.Workflow.Summary.Frequency.minute;
                case Constants.RecurrenceFrequencyUnits.SECOND:
                    return ClientResources.Workflow.Summary.Frequency.second;
                default:
                    return "";
            }
        };
        WorkflowUtility.fetchQueryDataRecursivly = function (queryView, query, result, hasMore, requestCount, maxAllowedCount, requestCountLimitation) {
            if (requestCount >= requestCountLimitation) {
                // NOTE(johnwa): if reach the request limitation, don't follow the continuation token any more, but as it exists, we should change hasMore as true always
                hasMore(true);
                return;
            }
            queryView.fetch(query).then(function () {
                var maxPushCount = maxAllowedCount - result().length;
                var items = queryView.items();
                var metadata = queryView.metadata();
                hasMore(items.length >= maxPushCount && !!metadata.continuationToken);
                result.push.apply(result, items.slice(0, maxPushCount));
                if (result().length < maxAllowedCount && metadata && metadata.continuationToken) {
                    var newQuery = {
                        link: metadata.continuationToken
                    };
                    WorkflowUtility.fetchQueryDataRecursivly(queryView, newQuery, result, hasMore, ++requestCount, maxAllowedCount, requestCountLimitation);
                }
            });
        };
        return WorkflowUtility;
    }());
    WorkflowUtility.EmptyDurationString = "--";
    WorkflowUtility.TemplateConnectionReferenceId = "/subscriptions/{0}/providers/Microsoft.Web/locations/{1}/managedApis/";
    WorkflowUtility.ScopeTypes = {
        if: "if",
        scope: "scope",
        until: "until",
        foreach: "foreach",
        switch: "switch"
    };
    WorkflowUtility.ScopeProperties = {
        actions: "actions",
        elseif: "elseif",
        else: "else",
        type: "type",
        cases: "cases",
        default: "default"
    };
    WorkflowUtility.TriggerTypes = {
        batch: "batch",
        manual: "manual",
        request: "request",
        apiConnectionWebHook: "apiconnectionwebhook",
        httpWebHook: "httpWebHook",
        apiConnection: "apiconnection"
    };
    exports.WorkflowUtility = WorkflowUtility;
});
