define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NetworkConfiguration = (function () {
        function NetworkConfiguration() {
        }
        return NetworkConfiguration;
    }());
    NetworkConfiguration.metadata = {
        name: "EMAExtension.IntegrationServiceEnvironment.IntegrationServiceEnvironmentProperties.NetworkConfiguration",
        properties: {
            "peeredVirtualNetworks": null,
            "virtualNetworkAddressSpace": null
        },
        entityType: true
    };
    exports.NetworkConfiguration = NetworkConfiguration;
    MsPortalFx.Data.Metadata.setTypeMetadata(NetworkConfiguration.metadata.name, NetworkConfiguration.metadata);
    var IntegrationServiceEnvironmentProperties = (function () {
        function IntegrationServiceEnvironmentProperties() {
        }
        return IntegrationServiceEnvironmentProperties;
    }());
    IntegrationServiceEnvironmentProperties.metadata = {
        name: "EMAExtension.IntegrationServiceEnvironment.IntegrationServiceEnvironmentProperties",
        properties: {
            "provisioningState": null,
            "integrationServiceEnvironmentId": null,
            "networkConfiguration": { itemType: NetworkConfiguration.metadata.name }
        },
        entityType: true
    };
    exports.IntegrationServiceEnvironmentProperties = IntegrationServiceEnvironmentProperties;
    MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationServiceEnvironmentProperties.metadata.name, IntegrationServiceEnvironmentProperties.metadata);
    var IntegrationServiceEnvironment = (function () {
        function IntegrationServiceEnvironment() {
        }
        return IntegrationServiceEnvironment;
    }());
    IntegrationServiceEnvironment.metadata = {
        name: "EMAExtension.IntegrationServiceEnvironment.IntegrationServiceEnvironment",
        properties: {
            "name": null,
            "type": null,
            "id": null,
            "location": null,
            "properties": { itemType: IntegrationServiceEnvironmentProperties.metadata.name }
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.IntegrationServiceEnvironment = IntegrationServiceEnvironment;
    MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationServiceEnvironment.metadata.name, IntegrationServiceEnvironment.metadata);
});
