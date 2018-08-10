define(["require", "exports", "../CORS/CorsConstants", "../../Common/Utilities/ResourceUtility"], function (require, exports, CorsConstants_1, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowTriggerType = EMAExtension.DataModels.WorkflowTriggerType;
    var WorkflowTriggerData = (function () {
        function WorkflowTriggerData() {
            var _this = this;
            this.client = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowTriggerType, MsPortalFx.getEnvironmentValue("emaApiVersion"));
            this.entityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: WorkflowTriggerType,
                sourceUri: function (workflowTriggerId) {
                    return _this.client.getResourceUri(workflowTriggerId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch
            });
            this.queryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowTriggerType,
                sourceUri: function (workflowId) {
                    return _this.client.getListUri(workflowId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                processServerResponse: ExtensionCore.Data.processValueArrayServerResponse
            });
        }
        return WorkflowTriggerData;
    }());
    exports.WorkflowTriggerData = WorkflowTriggerData;
});
