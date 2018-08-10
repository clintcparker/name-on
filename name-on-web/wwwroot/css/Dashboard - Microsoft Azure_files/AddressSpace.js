define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AddressSpace = (function () {
        function AddressSpace() {
        }
        return AddressSpace;
    }());
    AddressSpace.metadata = {
        name: "Microsoft.Azure.EMA.VirtualNetwork.AddressSpace",
        properties: {
            "addressPrefixes": { itemType: "System.String", isArray: true }
        },
        entityType: true
    };
    exports.AddressSpace = AddressSpace;
    MsPortalFx.Data.Metadata.setTypeMetadata(AddressSpace.metadata.name, AddressSpace.metadata);
});
