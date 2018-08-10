define(["require", "exports", "../CORS/CorsConstants", "../Utilities/Utilities", "../Utilities/WorkflowUtility", "../../Common/Utilities/ResourceUtility"], function (require, exports, CorsConstants_1, Utilities, WorkflowUtilityRef, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowUtility = WorkflowUtilityRef.WorkflowUtility;
    var WorkflowHistoryType = EMAExtension.DataModels.WorkflowHistoryType;
    var WorkflowRunRecordType = EMAExtension.DataModels.WorkflowRunRecordType;
    var WorkflowHistoryData = (function () {
        function WorkflowHistoryData() {
            var _this = this;
            this.client = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowHistoryType, MsPortalFx.getEnvironmentValue("emaApiVersion"));
            this.queryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowHistoryType,
                sourceUri: function (workflowId) {
                    return _this.client.getListUri(workflowId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                processServerResponse: function (response) {
                    var result = ExtensionCore.Data.processValueArrayServerResponse(response);
                    result.navigationMetadata = {
                        continuationToken: response.nextLink
                    };
                    return result;
                }
            });
            this.entityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: WorkflowHistoryType,
                sourceUri: function (workflowHistoryId) {
                    return _this.client.getResourceUri(workflowHistoryId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch
            });
            this.navigatorCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowRunRecordType,
                sourceUri: function (query) {
                    if (!!query.link) {
                        return query.link;
                    }
                    else if (query.status || query.top || (query.startTime && query.startTimeOperator)) {
                        return _this.client.getListUri(query.id, Utilities.getQueryParameters(query.status, query.startTime, query.startTimeOperator, query.top));
                    }
                    return _this.client.getListUri(query.id);
                },
                navigation: {
                    loadByContinuationToken: function (suppliedQueryView, query, reset, filter) {
                        query.link = reset ? "" : (suppliedQueryView.metadata() ? suppliedQueryView.metadata().continuationToken : "");
                        return suppliedQueryView.fetch(query);
                    }
                },
                processServerResponse: function (response) {
                    var result = ExtensionCore.Data.processValueArrayServerResponse(response);
                    result.data = _this._mapData(result.data);
                    result.navigationMetadata = {
                        continuationToken: response.nextLink
                    };
                    return result;
                },
                poll: true
            });
            this.getMdmMetricHistoryCache = new MsPortalFx.Data.QueryCache({
                sourceUri: function (data) {
                    return WorkflowUtility.getMdmMetricHistoryAbsoluteUri(data);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                processServerResponse: function (response) {
                    return ExtensionCore.Data.processValueArrayServerResponse(response);
                },
                httpMethod: "GET",
                poll: false
            });
        }
        WorkflowHistoryData.prototype.resubmit = function (triggerHistoryId) {
            var resubmitUri = CorsConstants_1.CorsConstants.resubmitTemplateUri.format(triggerHistoryId);
            return this.client.post(resubmitUri);
        };
        WorkflowHistoryData.prototype.cancelRun = function (runId) {
            var cancelRunUri = CorsConstants_1.CorsConstants.cancelRunTemplateUri.format(runId);
            return this.client.post(cancelRunUri);
        };
        WorkflowHistoryData.prototype._mapData = function (items) {
            return items.map(function (item) {
                return {
                    id: item.id,
                    identifier: item.name,
                    duration: WorkflowUtility.getRunDurationForRunsPageableGrid(item.properties),
                    startTime: new Date(item.properties.startTime),
                    status: item.properties.status
                };
            });
        };
        return WorkflowHistoryData;
    }());
    exports.WorkflowHistoryData = WorkflowHistoryData;
});
