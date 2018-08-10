define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = (function () {
        function User() {
        }
        return User;
    }());
    User.metadata = {
        name: "Microsoft.Azure.EMA.PowerApps.User",
        properties: {
            "id": null,
            "type": null,
            "email": null,
            "tenantId": null,
            "userPrincipalName": null,
            "displayName": null
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.User = User;
    MsPortalFx.Data.Metadata.setTypeMetadata(User.metadata.name, User.metadata);
});
