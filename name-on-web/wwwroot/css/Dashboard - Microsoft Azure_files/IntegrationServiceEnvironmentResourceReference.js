define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntegrationServiceEnvironmentResourceReference = (function () {
        function IntegrationServiceEnvironmentResourceReference() {
        }
        return IntegrationServiceEnvironmentResourceReference;
    }());
    IntegrationServiceEnvironmentResourceReference.metadata = {
        name: "EMAExtension.IntegrationServiceEnvironment.IntegrationServiceEnvironmentResourceReference",
        properties: {
            "name": null,
            "type": null,
            "id": null
        },
        entityType: true,
        idProperties: ["id"]
    };
    exports.IntegrationServiceEnvironmentResourceReference = IntegrationServiceEnvironmentResourceReference;
    MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationServiceEnvironmentResourceReference.metadata.name, IntegrationServiceEnvironmentResourceReference.metadata);
});
