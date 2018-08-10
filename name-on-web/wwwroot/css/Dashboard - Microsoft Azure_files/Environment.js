define(["require", "exports", "./User"], function (require, exports, UserRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = UserRef.User;
    var Environment = (function () {
        function Environment() {
        }
        return Environment;
    }());
    Environment.metadata = {
        name: "Microsoft.Azure.EMA.PowerApps.Environment",
        properties: {
            "name": null,
            "azureRegionHint": null,
            "displayName": null,
            "createdTime": { itemType: "System.DateTime" },
            "createdBy": { itemType: User.metadata.name },
            "lastModifiedTime": { itemType: "System.DateTime" },
            "lastModifiedBy": { itemType: User.metadata.name },
            "provisioningState": null,
            "creationType": null,
            "environmentSku": null,
            "environmentType": null,
            "isDefault": null
        },
        entityType: true,
        idProperties: ["name"]
    };
    exports.Environment = Environment;
    MsPortalFx.Data.Metadata.setTypeMetadata(Environment.metadata.name, Environment.metadata);
});
