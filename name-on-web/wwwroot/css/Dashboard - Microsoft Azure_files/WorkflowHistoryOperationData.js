define(["require", "exports", "../CORS/CorsConstants", "../../Common/Utilities/ResourceUtility"], function (require, exports, CorsConstants_1, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowHistoryOperationType = EMAExtension.DataModels.WorkflowHistoryOperationType;
    var WorkflowHistoryOperationData = (function () {
        function WorkflowHistoryOperationData() {
            var _this = this;
            this.client = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowHistoryOperationType, MsPortalFx.getEnvironmentValue("emaApiVersion"));
            this.queryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowHistoryOperationType,
                processServerResponse: ExtensionCore.Data.processValueArrayServerResponse,
                sourceUri: function (historyId) { return _this.client.getListUri(historyId) + "&$top=250"; },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch
            });
            this.entityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: WorkflowHistoryOperationType,
                sourceUri: function (workflowHistoryOperationId) { return _this.client.getResourceUri(workflowHistoryOperationId); },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch
            });
        }
        return WorkflowHistoryOperationData;
    }());
    exports.WorkflowHistoryOperationData = WorkflowHistoryOperationData;
});
