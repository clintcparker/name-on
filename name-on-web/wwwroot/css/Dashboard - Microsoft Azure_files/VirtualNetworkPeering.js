define(["require", "exports", "./AddressSpace"], function (require, exports, AddressSpace_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteVirtualNetwork = (function () {
        function RemoteVirtualNetwork() {
        }
        return RemoteVirtualNetwork;
    }());
    RemoteVirtualNetwork.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.RemoteVirtualNetwork",
        properties: {
            "id": null
        },
        entityType: true
    };
    exports.RemoteVirtualNetwork = RemoteVirtualNetwork;
    MsPortalFx.Data.Metadata.setTypeMetadata(AddressSpace_1.AddressSpace.metadata.name, AddressSpace_1.AddressSpace.metadata);
    var VirtualNetworkPeeringProperties = (function () {
        function VirtualNetworkPeeringProperties() {
        }
        return VirtualNetworkPeeringProperties;
    }());
    VirtualNetworkPeeringProperties.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.VirtualNetworkPeeringProperties",
        properties: {
            "provisioningState": null,
            "peeringState": null,
            "remoteVirtualNetwork": { itemType: RemoteVirtualNetwork.metadata.name },
            "remoteAddressSpace": { itemType: AddressSpace_1.AddressSpace.metadata.name },
            "routeServiceVips": null,
            "allowVirtualNetworkAccess": null,
            "allowForwardedTraffic": null,
            "allowGatewayTransit": null,
            "useRemoteGateways": null,
        },
        entityType: true
    };
    exports.VirtualNetworkPeeringProperties = VirtualNetworkPeeringProperties;
    MsPortalFx.Data.Metadata.setTypeMetadata(VirtualNetworkPeeringProperties.metadata.name, VirtualNetworkPeeringProperties.metadata);
    var VirtualNetworkPeering = (function () {
        function VirtualNetworkPeering() {
        }
        return VirtualNetworkPeering;
    }());
    VirtualNetworkPeering.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.VirtualNetworkPeering",
        properties: {
            "name": null,
            "id": null,
            "etag": null,
            "properties": { itemType: VirtualNetworkPeeringProperties.metadata.name }
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.VirtualNetworkPeering = VirtualNetworkPeering;
    MsPortalFx.Data.Metadata.setTypeMetadata(VirtualNetworkPeering.metadata.name, VirtualNetworkPeering.metadata);
});
