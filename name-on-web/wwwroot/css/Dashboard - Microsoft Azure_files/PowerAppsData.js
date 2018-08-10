define(["require", "exports", "../DataModel/Environment", "../Constants"], function (require, exports, EnvironmentRef, ConstantsRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Environment = EnvironmentRef.Environment;
    var Constants = ConstantsRef.Constants;
    var PowerAppsData = (function () {
        function PowerAppsData() {
            this.environmentQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: Environment.metadata.name,
                sourceUri: function () {
                    return Constants.DataUriTemplate.listEnvironment.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), MsPortalFx.getEnvironmentValue("powerAppsApiVersion"));
                },
                processServerResponse: function (response) {
                    var result = response.value.map(function (resource) {
                        var environment = resource.properties;
                        environment.name = resource.name;
                        return environment;
                    });
                    return {
                        data: result
                    };
                },
                poll: false
            });
        }
        PowerAppsData.prototype.createCustomConnector = function (connectorName, environmentName, swagger, additionalRequestParameters) {
            var body = {
                properties: {
                    displayName: connectorName,
                    environment: {
                        name: environmentName
                    },
                    openApiDefinition: swagger,
                    backendService: {
                        serviceUrl: "https://" + swagger.host + swagger.basePath
                    },
                    additionalRequestParameters: additionalRequestParameters
                }
            };
            var url = Constants.DataUriTemplate.createCustomConnector.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), MsPortalFx.getEnvironmentValue("powerAppsApiVersion"));
            return Q(ExtensionCore.Net.post(url, body));
        };
        return PowerAppsData;
    }());
    exports.PowerAppsData = PowerAppsData;
});
