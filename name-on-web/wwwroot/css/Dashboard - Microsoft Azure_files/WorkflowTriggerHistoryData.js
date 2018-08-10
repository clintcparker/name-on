define(["require", "exports", "EMA/ClientResources/ClientResources", "../CORS/CorsConstants", "../Utilities/Utilities", "../../Common/Utilities/ResourceUtility"], function (require, exports, ClientResources, CorsConstants_1, Utilities, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowTriggerHistoryType = EMAExtension.DataModels.WorkflowTriggerHistoryType;
    var WorkflowTriggerRunRecordType = EMAExtension.DataModels.WorkflowTriggerRunRecordType;
    var WorkflowTriggerHistoryData = (function () {
        function WorkflowTriggerHistoryData() {
            var _this = this;
            this.client = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowTriggerHistoryType, MsPortalFx.getEnvironmentValue("emaApiVersion"));
            this.entityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: WorkflowTriggerHistoryType,
                sourceUri: function (workflowTriggerHistoryId) {
                    return _this.client.getResourceUri(workflowTriggerHistoryId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch
            });
            this.queryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowTriggerHistoryType,
                sourceUri: function (workflowTriggerId) {
                    return _this.client.getListUri(workflowTriggerId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                processServerResponse: function (response) {
                    return {
                        data: response.value,
                        navigationMetadata: {
                            continuationToken: response.nextLink
                        }
                    };
                },
                poll: false
            });
            this.navigatorCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowTriggerRunRecordType,
                sourceUri: function (query) {
                    if (!!query.link) {
                        return query.link;
                    }
                    else if (query.status || query.top || (query.startTime && query.startTimeOperator)) {
                        return _this.client.getListUri(query.workflowTriggerId, Utilities.getQueryParameters(query.status, query.startTime, query.startTimeOperator, query.top));
                    }
                    return _this.client.getListUri(query.workflowTriggerId);
                },
                navigation: {
                    loadByContinuationToken: function (suppliedQueryView, query, reset, filter) {
                        if (Utilities.isNullOrEmptyObject(query) && reset) {
                            suppliedQueryView.metadata({ continuationToken: null, totalItemCount: 0 });
                            return Q();
                        }
                        else {
                            query.link = reset ? "" : (suppliedQueryView.metadata() ? suppliedQueryView.metadata().continuationToken : "");
                            return suppliedQueryView.fetch(query);
                        }
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
        }
        WorkflowTriggerHistoryData.prototype._mapData = function (items) {
            return items.map(function (item) {
                return {
                    "id": item.id,
                    "fired": item.properties.fired ? ClientResources.Workflow.TriggerHistories.Columns.fired : "",
                    "startTime": new Date(item.properties.startTime),
                    "trigger": item.id.split("/").splice(-3, 1).pop(),
                    "callStatus": item.properties.status
                };
            });
        };
        return WorkflowTriggerHistoryData;
    }());
    exports.WorkflowTriggerHistoryData = WorkflowTriggerHistoryData;
});
