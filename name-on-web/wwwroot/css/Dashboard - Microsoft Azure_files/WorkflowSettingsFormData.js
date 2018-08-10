define(["require", "exports", "./AccessControlConfigurationFormData", "./RuntimeConfiguration"], function (require, exports, AccessControlConfigurationFormDataRef, RuntimeConfigurationRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metadata = {
        name: "EMAExtension.Workflow.WorkflowSettingsFormData",
        entityType: true,
        properties: {
            accessControlConfiguration: {
                itemType: AccessControlConfigurationFormDataRef.metadata.name,
                isArray: false,
                trackEdits: true
            },
            integrationAccountResourceProperties: {
                itemType: EMAExtension.DataModels.IntegrationAccountResourcePropertiesType,
                isArray: false,
                trackEdits: true
            },
            runtimeConfiguration: {
                itemType: RuntimeConfigurationRef.metadata.name,
                isArray: false,
                trackEdits: true
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
