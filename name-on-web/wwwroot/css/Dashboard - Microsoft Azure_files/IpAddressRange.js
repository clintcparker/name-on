define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metadata = {
        name: "EMAExtension.Metadata.IpAddressRange",
        entityType: true,
        properties: {
            addressRange: {
                isArray: false,
                trackEdits: true,
                itemType: "System.String"
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
