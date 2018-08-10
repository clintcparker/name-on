define(["require", "exports", "Fx/Ajax", "../Constants", "../../_generated/ExtensionDefinition", "../DataModels/CustomConnector"], function (require, exports, Batch, Constants, ExtensionDefinition, CustomConnectorRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CustomConnector = CustomConnectorRef.CustomConnector;
    var CsmResourceClient = ExtensionCore.Cors.CsmResourceClient;
    var CustomConnectorData = (function () {
        function CustomConnectorData() {
            var _this = this;
            this._client = new CsmResourceClient(Constants.webProvider, Constants.customConnectorType, MsPortalFx.getEnvironmentValue("customConnectorApiVersion"));
            this.customConnectorEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: CustomConnector.metadata.name,
                sourceUri: function (customConnectorId) {
                    return _this._client.getResourceUri(customConnectorId);
                },
                poll: false // NOTE(shimedh): Even if the documentation says that if not specified defaults to false, it still polls. Need to explicitly set it to false.
            });
            this.availableLocationsCache = new MsPortalFx.Data.QueryCache({
                sourceUri: function (subscriptionId) {
                    return Constants.availableLocationsTemplate.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), subscriptionId, MsPortalFx.getEnvironmentValue("csmApiVersion"));
                },
                processServerResponse: function (response) {
                    var locations;
                    for (var _i = 0, _a = response.resourceTypes; _i < _a.length; _i++) {
                        var resourceType = _a[_i];
                        if (StringEx.equals(resourceType.resourceType, Constants.customConnectorType, StringComparison.IgnoreCase)) {
                            locations = resourceType.locations;
                        }
                    }
                    return {
                        data: locations
                    };
                },
                poll: false
            });
            this.batchedQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: CustomConnector.metadata.name,
                serializeParams: function (resourceIds) {
                    return resourceIds.join(",");
                },
                supplyData: function (httpMethod, uri, headers, data, params) {
                    var batchRequestsArray = [];
                    var endpoint = MsPortalFx.getEnvironmentValue("csmManagementServiceUri") + "/batch?api-version=" + MsPortalFx.getEnvironmentValue("armApiVersion");
                    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                        var resourceId = params_1[_i];
                        batchRequestsArray.push({
                            uri: resourceId + "?api-version=" + MsPortalFx.getEnvironmentValue("customConnectorApiVersion"),
                            type: "GET"
                        });
                    }
                    ;
                    return Batch.batchMultiple({
                        batchRequests: batchRequestsArray,
                        endpoint: endpoint
                    }).then(function (batchResponse) {
                        return batchResponse.responses;
                    });
                },
                processServerResponse: function (responses) {
                    return {
                        data: responses.map(function (response) { return response.content; })
                    };
                }
            });
        }
        CustomConnectorData.prototype.isCustomConnectorNameAvailable = function (subscriptionId, resourceGroup, customConnectorName) {
            return this._client.listInResourceGroup(subscriptionId, resourceGroup).then(function (customConnectors) {
                return !customConnectors.some(function (customConnector) {
                    return StringEx.equals(customConnector.name, customConnectorName, StringComparison.IgnoreCase);
                });
            });
        };
        CustomConnectorData.prototype.deleteCustomConnector = function (resourceId) {
            var operationPromise = this._client.delete(resourceId).then(function () {
                MsPortalFx.UI.AssetManager.notifyAssetDeleted(ExtensionDefinition.AssetTypeNames.customConnector, resourceId);
            }).catch(function (error) {
                FxBase.Diagnostics.Log.writeEntry(2 /* Error */, "Ema.Client.customConnector", "Failed when trying to delete custom connector: " + resourceId);
                return Q.reject(error);
            });
            ExtensionCore.UI.Notifications.createNotificationFromPromise({
                notificationDefinition: ExtensionDefinition.NotificationDefinitions.DeleteCustomConnector,
                promise: operationPromise,
                assetId: resourceId,
                properties: {
                    "customConnectorName": name
                }
            });
            return operationPromise;
        };
        return CustomConnectorData;
    }());
    exports.CustomConnectorData = CustomConnectorData;
});
