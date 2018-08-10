define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RunHistoryRetentionType;
    (function (RunHistoryRetentionType) {
        RunHistoryRetentionType[RunHistoryRetentionType["Default"] = 0] = "Default";
        RunHistoryRetentionType[RunHistoryRetentionType["Custom"] = 1] = "Custom";
    })(RunHistoryRetentionType = exports.RunHistoryRetentionType || (exports.RunHistoryRetentionType = {}));
    exports.metadata = {
        name: "EMAExtension.Workflow.RunHistoryRetention",
        entityType: true,
        properties: {
            runHistoryRetentionType: {
                itemType: "RunHistoryRetentionType",
                isArray: false,
                trackEdits: true
            },
            runHistoryRetentionInDays: {
                itemType: "System.Number",
                isArray: false,
                trackEdits: true
            }
        }
    };
    MsPortalFx.Data.Metadata.setTypeMetadata(exports.metadata.name, exports.metadata);
});
