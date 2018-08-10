define(["require", "exports", "./FlowAccessControlConfigurationPolicy"], function (require, exports, FlowAccessControlConfigurationPolicyRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FlowAccessControlConfigurationPolicyMetadata = FlowAccessControlConfigurationPolicyRef.metadata;
    exports.metadata = {
        name: "EMAExtension.Metadata.FlowAccessControlConfiguration",
        entityType: true,
        properties: {
            triggers: {
                isArray: false,
                trackEdits: true,
                itemType: FlowAccessControlConfigurationPolicyMetadata.name
            },
            contents: {
                isArray: false,
                trackEdits: true,
                itemType: FlowAccessControlConfigurationPolicyMetadata.name
            },
            actions: {
                isArray: false,
                trackEdits: true,
                itemType: FlowAccessControlConfigurationPolicyMetadata.name
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
