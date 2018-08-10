define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EditWorkflowEditScopeType = "EMAExtension.Metadata.EditWorkflowEditScopeType";
    exports.EditLogicAppEditScopeType = "EMAExtension.Metadata.EditLogicAppEditScopeType";
    var httpActionMetadata = {
        name: "EMAExtension.Metadata.HttpAction",
        idProperties: ["uniqueName"],
        properties: {
            name: {
                isArray: false
            },
            uniqueName: {
                isArray: false
            }
        }
    };
    var recurrenceMetadata = {
        name: "EMAExtension.Metadata.Recurrence",
        idProperties: ["uniqueName"],
        properties: {
            name: {
                isArray: false
            },
            uniqueName: {
                isArray: false
            }
        }
    };
    var microserviceStepMetadata = {
        name: "EMAExtension.Metadata.MicroserviceStep",
        idProperties: ["uniqueName"],
        properties: {
            isLoading: {
                isArray: false
            },
            isExistingMicroservice: {
                isArray: false
            },
            packageId: {
                isArray: false
            },
            galleryPackageId: {
                isArray: false
            },
            apiAppId: {
                isArray: false
            },
            name: {
                isArray: false
            },
            uniqueName: {
                isArray: false
            },
            resourceId: {
                isArray: false
            },
            icon: {
                isArray: false
            },
            brandColor: {
                isArray: false
            },
            documentationLink: {
                isArray: false
            },
            friendlyName: {
                isArray: false
            },
            hasDynamicSwagger: {
                isArray: false
            },
            isAuthenticationRequired: {
                isArray: false
            }
        }
    };
    var httpActionsMetadata = {
        name: "EMAExtension.Metadata.HttpActions",
        properties: {
            actions: {
                itemType: httpActionMetadata.name,
                isArray: true
            }
        }
    };
    var microserviceSettingsMetadata = {
        name: "EMAExtension.Metadata.MicroserviceSettings",
        properties: {
            settings: {
                itemType: microserviceStepMetadata.name,
                isArray: true
            }
        }
    };
    var recurrencesMetadata = {
        name: "EMAExtension.Metadata.Recurrences",
        properties: {
            triggers: {
                itemType: recurrenceMetadata.name,
                isArray: true
            }
        }
    };
    var editWorkflowEditScopeMetadata = {
        entityType: true,
        name: exports.EditWorkflowEditScopeType,
        idProperties: ["id"],
        properties: {
            id: {
                isArray: false
            },
            isUpdated: {
                isArray: false
            },
            httpActions: {
                itemType: httpActionsMetadata.name,
                isArray: false
            },
            microservices: {
                itemType: microserviceSettingsMetadata.name,
                isArray: false
            },
            recurrences: {
                itemType: recurrencesMetadata.name,
                isArray: false
            },
            workflowDefinition: {
                itemType: EMAExtension.DataModels.WorkflowDefinitionType,
                isArray: false,
                trackEdits: true
            }
        }
    };
    var editLogicAppEditScopeMetadata = {
        entityType: true,
        name: exports.EditLogicAppEditScopeType,
        idProperties: ["id"],
        properties: {
            id: {
                isArray: false
            },
            logicApp: {
                isArray: false
            },
            editableContent: {
                isArray: false
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(httpActionMetadata.name, httpActionMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(httpActionsMetadata.name, httpActionsMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(recurrenceMetadata.name, recurrenceMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(recurrencesMetadata.name, recurrencesMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(microserviceStepMetadata.name, microserviceStepMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(microserviceSettingsMetadata.name, microserviceSettingsMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.EditWorkflowEditScopeType, editWorkflowEditScopeMetadata);
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.EditLogicAppEditScopeType, editLogicAppEditScopeMetadata);
});
