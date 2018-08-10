define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocationData = (function () {
        function LocationData() {
            this.availableLocationsCache = new MsPortalFx.Data.QueryCache({
                sourceUri: function (subscriptionId) {
                    return "{0}/subscriptions/{1}/providers/Microsoft.Logic?api-version={2}".format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), subscriptionId, MsPortalFx.getEnvironmentValue("csmApiVersion"));
                },
                processServerResponse: function (response) {
                    var locations;
                    response.resourceTypes.forEach(function (resourceType) {
                        if (StringEx.equals(resourceType.resourceType, "integrationAccounts", StringComparison.IgnoreCase)) {
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
