define(["require", "exports", "../CORS/CorsConstants", "../../Common/Utilities/ResourceUtility"], function (require, exports, CorsConstants_1, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocationData = (function () {
        function LocationData() {
            this.subscriptionLocationsCache = new MsPortalFx.Data.EntityCache({
                "poll": true,
                "pollInterval": 300000,
                "sourceUri": function () {
                    return MsPortalFx.getEnvironmentValue("csmManagementServiceUri") + "/subscriptions/{subscriptionId}/locations?api-version=" + MsPortalFx.getEnvironmentValue("csmApiVersion");
                },
                "supplyData": ExtensionCore.Csm.supplyDataWithSubscriptionIdsParallelMap
            });
            this.availableLocationsCache = new MsPortalFx.Data.QueryCache({
                sourceUri: function (subscriptionId) {
                    return CorsConstants_1.CorsConstants.availableLocationsTemplate.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), subscriptionId, MsPortalFx.getEnvironmentValue("csmApiVersion"));
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                processServerResponse: function (response) {
                    var locations;
                    response.resourceTypes.forEach(function (resourceType) {
                        if (StringEx.equals(resourceType.resourceType, "workflows", StringComparison.IgnoreCase)) {
                            locations = resourceType.locations;
                        }
                    });
                    return {
                        data: locations
                    };
                },
                poll: false
            });
        }
        return LocationData;
    }());
    exports.LocationData = LocationData;
});
