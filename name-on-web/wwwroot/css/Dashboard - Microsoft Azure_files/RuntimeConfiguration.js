define(["require", "exports", "./RunHistoryRetention"], function (require, exports, RunHistoryRetentionRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RunHistoryRetentionMetadata = RunHistoryRetentionRef.metadata;
    exports.metadata = {
        name: "EMAExtension.Workflow.RuntimeConfiguration",
        entityType: true,
        properties: {
            throughputMode: {
                itemType: "System.String",
                isArray: false,
                trackEdits: true
            },
            runHistoryRetention: {
                itemType: RunHistoryRetentionMetadata.name,
                isArray: false,
                trackEdits: true
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
