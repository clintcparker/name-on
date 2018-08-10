define(["require", "exports", "../Constants", "../../_generated/ExtensionDefinition", "../DataModels/IntegrationServiceEnvironment", "../../Common/Utilities/ResourceUtility"], function (require, exports, Constants, ExtensionDefinition, IntegrationServiceEnvironment_1, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CsmResourceClient = ExtensionCore.Cors.CsmResourceClient;
    var IntegrationServiceEnvironmentData = (function () {
        function IntegrationServiceEnvironmentData() {
            var _this = this;
            this._client = new CsmResourceClient(Constants.logicAppsProvider, Constants.integrationServiceEnvironmentType, MsPortalFx.getEnvironmentValue("integrationServiceEnvironmentApiVersion"));
            this.integrationServiceEnvironmentEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationServiceEnvironment_1.IntegrationServiceEnvironment.metadata.name,
                sourceUri: function (integrationServiceEnvironmentId) {
                    return _this._client.getResourceUri(integrationServiceEnvironmentId);
                },
                poll: false // NOTE(shimedh): Even if the documentation says that if not specified defaults to false, it still polls. Need to explicitly set it to false.
            });
            this.integrationServiceEnvironmentsQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationServiceEnvironment_1.IntegrationServiceEnvironment.metadata.name,
                sourceUri: function (subscriptionId) {
                    return _this._client.getListInSubscriptionUri(subscriptionId);
                },
                supplyData: function (httpMethod, uri) {
                    return _this.getIntegrationServiceEnvironments(uri);
                },
                poll: false
            });
            this.availableLocationsCache = new MsPortalFx.Data.QueryCache({
                sourceUri: function (subscriptionId) {
                    return Constants.availableLocationsTemplate.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), subscriptionId, MsPortalFx.getEnvironmentValue("csmApiVersion"));
                },
                processServerResponse: function (response) {
                    var locations;
                    for (var _i = 0, _a = response.resourceTypes; _i < _a.length; _i++) {
                        var resourceType = _a[_i];
                        if (StringEx.equals(resourceType.resourceType, Constants.integrationServiceEnvironmentType, StringComparison.IgnoreCase)) {
                            locations = resourceType.locations;
                        }
                    }
                    return {
                        data: locations
                    };
                },
                poll: false
            });
        }
        IntegrationServiceEnvironmentData.prototype.getIntegrationServiceEnvironments = function (uri, integrationServiceEnvironmentsList) {
            var _this = this;
            if (integrationServiceEnvironmentsList === void 0) { integrationServiceEnvironmentsList = []; }
            return ResourceUtility_1.ResourceUtility.getResourceInfoInBatch(uri).then(function (response) {
                for (var _i = 0, _a = response.value; _i < _a.length; _i++) {
                    var integrationServiceEnvironment = _a[_i];
                    integrationServiceEnvironmentsList.push(integrationServiceEnvironment);
                }
                var nextLink = response.nextLink;
                if (nextLink) {
                    return _this.getIntegrationServiceEnvironments(nextLink, integrationServiceEnvironmentsList);
                }
                else {
                    return integrationServiceEnvironmentsList;
                }
            });
        };
        ;
        IntegrationServiceEnvironmentData.prototype.isIntegrationServiceEnvironmentNameAvailable = function (subscriptionId, resourceGroup, integrationServiceEnvironmentName) {
            return this._client.listInResourceGroup(subscriptionId, resourceGroup).then(function (integrationServiceEnvironments) {
                return !integrationServiceEnvironments.some(function (integrationServiceEnvironment) {
                    return StringEx.equals(integrationServiceEnvironment.name, integrationServiceEnvironmentName, StringComparison.IgnoreCase);
                });
            });
        };
        IntegrationServiceEnvironmentData.prototype.deleteIntegrationServiceEnvironment = function (resourceId) {
            var operationPromise = this._client.delete(resourceId).then(function () {
                MsPortalFx.UI.AssetManager.notifyAssetDeleted(ExtensionDefinition.AssetTypeNames.integrationServiceEnvironment, resourceId);
            }).catch(function (error) {
                FxBase.Diagnostics.Log.writeEntry(2 /* Error */, "Ema.Client.integrationServiceEnvironment", "Failed when trying to delete isolated environment: " + resourceId);
                return Q.reject(error);
            });
            ExtensionCore.UI.Notifications.createNotificationFromPromise({
                notificationDefinition: ExtensionDefinition.NotificationDefinitions.DeleteIntegrationServiceEnvironment,
                promise: operationPromise,
                assetId: resourceId,
                properties: {
                    "integrationServiceEnvironmentName": name
                }
            });
            return operationPromise;
        };
        return IntegrationServiceEnvironmentData;
    }());
    exports.IntegrationServiceEnvironmentData = IntegrationServiceEnvironmentData;
});
