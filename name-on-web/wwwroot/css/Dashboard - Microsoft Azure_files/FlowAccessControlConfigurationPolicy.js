define(["require", "exports", "./IpAddressRange"], function (require, exports, IpAddressRangeRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metadata = {
        name: "EMAExtension.Metadata.FlowAccessControlConfigurationPolicy",
        properties: {
            allowedCallerIpAddresses: {
                isArray: true,
                trackEdits: true,
                itemType: IpAddressRangeRef.metadata.name
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
