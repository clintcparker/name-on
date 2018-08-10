define(["require", "exports", "./FlowAccessControlConfiguration"], function (require, exports, FlowAccessControlConfigurationRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FlowAccessControlConfigurationMetadata = FlowAccessControlConfigurationRef.metadata;
    var AccessControlType;
    (function (AccessControlType) {
        AccessControlType[AccessControlType["Any"] = 0] = "Any";
        AccessControlType[AccessControlType["LogicAppsOnly"] = 1] = "LogicAppsOnly";
        AccessControlType[AccessControlType["SpecificIPRanges"] = 2] = "SpecificIPRanges";
    })(AccessControlType = exports.AccessControlType || (exports.AccessControlType = {}));
    exports.metadata = {
        name: "EMAExtension.Workflow.AccessControlConfigurationModel",
        entityType: true,
        properties: {
            accessControlType: {
                isArray: false
            },
            accessControl: {
                itemType: FlowAccessControlConfigurationMetadata.name,
                isArray: false,
                trackEdits: true
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
