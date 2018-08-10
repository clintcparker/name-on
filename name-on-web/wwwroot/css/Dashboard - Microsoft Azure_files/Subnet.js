define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NetworkSecurityGroup = (function () {
        function NetworkSecurityGroup() {
        }
        return NetworkSecurityGroup;
    }());
    NetworkSecurityGroup.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.NetworkSecurityGroup",
        properties: {
            "id": null
        },
        entityType: true
    };
    exports.NetworkSecurityGroup = NetworkSecurityGroup;
    MsPortalFx.Data.Metadata.setTypeMetadata(NetworkSecurityGroup.metadata.name, NetworkSecurityGroup.metadata);
    var IpConfiguration = (function () {
        function IpConfiguration() {
        }
        return IpConfiguration;
    }());
    IpConfiguration.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.IpConfiguration",
        properties: {
            "id": null
        },
        entityType: true
    };
    exports.IpConfiguration = IpConfiguration;
    MsPortalFx.Data.Metadata.setTypeMetadata(IpConfiguration.metadata.name, IpConfiguration.metadata);
    var SubnetProperties = (function () {
        function SubnetProperties() {
        }
        return SubnetProperties;
    }());
    SubnetProperties.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.SubnetProperties",
        properties: {
            "provisioningState": null,
            "addressPrefix": null,
            "networkSecurityGroup": { itemType: NetworkSecurityGroup.metadata.name },
            "ipConfigurations": { itemType: IpConfiguration.metadata.name, isArray: true },
            "delegations": null
        },
        entityType: true
    };
    exports.SubnetProperties = SubnetProperties;
    MsPortalFx.Data.Metadata.setTypeMetadata(SubnetProperties.metadata.name, SubnetProperties.metadata);
    var Subnet = (function () {
        function Subnet() {
        }
        return Subnet;
    }());
    Subnet.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.Subnet",
        properties: {
            "name": null,
            "id": null,
            "etag": null,
            "properties": { itemType: SubnetProperties.metadata.name }
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.Subnet = Subnet;
    MsPortalFx.Data.Metadata.setTypeMetadata(Subnet.metadata.name, Subnet.metadata);
});
