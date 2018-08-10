define(["require", "exports", "./Subnet", "./AddressSpace", "./VirtualNetworkPeering"], function (require, exports, Subnet_1, AddressSpace_1, VirtualNetworkPeering_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VirtualNetworkProperties = (function () {
        function VirtualNetworkProperties() {
        }
        return VirtualNetworkProperties;
    }());
    VirtualNetworkProperties.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetworkProperties",
        properties: {
            "provisioningState": null,
            "resourceGuid": null,
            "addressSpace": { itemType: AddressSpace_1.AddressSpace.metadata.name },
            "subnets": { itemType: Subnet_1.Subnet.metadata.name, isArray: true },
            "enableDdosProtection": null,
            "enableVmProtection": null,
            "virtualNetworkPeerings": { itemType: VirtualNetworkPeering_1.VirtualNetworkPeering.metadata.name, isArray: true }
        },
        entityType: true
    };
    exports.VirtualNetworkProperties = VirtualNetworkProperties;
    MsPortalFx.Data.Metadata.setTypeMetadata(VirtualNetworkProperties.metadata.name, VirtualNetworkProperties.metadata);
    var VirtualNetwork = (function () {
        function VirtualNetwork() {
        }
        return VirtualNetwork;
    }());
    VirtualNetwork.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork",
        properties: {
            "name": null,
            "type": null,
            "id": null,
            "location": null,
            "etag": null,
            "properties": { itemType: VirtualNetworkProperties.metadata.name }
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.VirtualNetwork = VirtualNetwork;
    MsPortalFx.Data.Metadata.setTypeMetadata(VirtualNetwork.metadata.name, VirtualNetwork.metadata);
});
