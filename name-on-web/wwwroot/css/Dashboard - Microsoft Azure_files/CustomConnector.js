define(["require", "exports", "../../IntegrationServiceEnvironment/DataModels/IntegrationServiceEnvironmentResourceReference"], function (require, exports, IntegrationServiceEnvironmentResourceReference_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CustomConnectorPropertiesBackendService = (function () {
        function CustomConnectorPropertiesBackendService() {
        }
        return CustomConnectorPropertiesBackendService;
    }());
    CustomConnectorPropertiesBackendService.metadata = {
        name: "EMAExtension.CustomConnector.Properties.BackendService",
        properties: {
            "serviceUrl": null
        },
        entityType: true
    };
    exports.CustomConnectorPropertiesBackendService = CustomConnectorPropertiesBackendService;
    MsPortalFx.Data.Metadata.setTypeMetadata(CustomConnectorPropertiesBackendService.metadata.name, CustomConnectorPropertiesBackendService.metadata);
    var CustomConnectorPropertiesApiDefinition = (function () {
        function CustomConnectorPropertiesApiDefinition() {
        }
        return CustomConnectorPropertiesApiDefinition;
    }());
    CustomConnectorPropertiesApiDefinition.metadata = {
        name: "EMAExtension.CustomConnector.Properties.ApiDefinition",
        properties: {
            "originalSwaggerUrl": null,
            "modifiedSwaggerUrl": null
        },
        entityType: true
    };
    exports.CustomConnectorPropertiesApiDefinition = CustomConnectorPropertiesApiDefinition;
    MsPortalFx.Data.Metadata.setTypeMetadata(CustomConnectorPropertiesApiDefinition.metadata.name, CustomConnectorPropertiesApiDefinition.metadata);
    var CustomConnectorProperties = (function () {
        function CustomConnectorProperties() {
        }
        return CustomConnectorProperties;
    }());
    CustomConnectorProperties.metadata = {
        name: "EMAExtension.CustomConnector.Properties",
        properties: {
            "displayName": null,
            "description": null,
            "iconUri": null,
            "apiDefinitions": { itemType: CustomConnectorPropertiesApiDefinition.metadata.name },
            "backendService": { itemType: CustomConnectorPropertiesBackendService.metadata.name },
            "runtimeUrls": { itemType: "System.String", isArray: true },
            "capabilities": { itemType: "System.String", isArray: true },
            "brandColor": null,
            "connectionParameters": null,
            "integrationServiceEnvironment": { itemType: IntegrationServiceEnvironmentResourceReference_1.IntegrationServiceEnvironmentResourceReference.metadata.name }
        },
        entityType: true
    };
    exports.CustomConnectorProperties = CustomConnectorProperties;
    MsPortalFx.Data.Metadata.setTypeMetadata(CustomConnectorProperties.metadata.name, CustomConnectorProperties.metadata);
    var CustomConnector = (function () {
        function CustomConnector() {
        }
        return CustomConnector;
    }());
    CustomConnector.metadata = {
        name: "EMAExtension.CustomConnector",
        properties: {
            "name": null,
            "type": null,
            "id": null,
            "location": null,
            "properties": { itemType: CustomConnectorProperties.metadata.name }
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.CustomConnector = CustomConnector;
    MsPortalFx.Data.Metadata.setTypeMetadata(CustomConnector.metadata.name, CustomConnector.metadata);
});
