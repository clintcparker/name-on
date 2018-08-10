define(["require", "exports", "../Constants", "../CORS/CorsConstants", "../Utilities/Utilities", "../../Common/Utilities/ResourceUtility"], function (require, exports, Constants, CorsConstants_1, Utilities, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowVersionType = EMAExtension.DataModels.WorkflowVersionType;
    var WorkflowVersionData = (function () {
        function WorkflowVersionData() {
            var _this = this;
            this.client = new ExtensionCore.Cors.CsmResourceClient(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowVersionType, MsPortalFx.getEnvironmentValue("emaApiVersion"));
            this.entityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: WorkflowVersionType,
                sourceUri: function (workflowVersionId) {
                    return _this.client.getResourceUri(workflowVersionId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch
            });
            this.queryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowVersionType,
                sourceUri: function (workflowId) {
                    return _this.client.getListUri(workflowId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                processServerResponse: ExtensionCore.Data.processValueArrayServerResponse
            });
            this.navigatorCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowVersionType,
                sourceUri: function (query) {
                    if (!!query.link) {
                        return query.link;
                    }
                    return _this.client.getListUri(query.workflowId);
                },
                supplyData: ResourceUtility_1.ResourceUtility.supplyDataInBatch,
                navigation: {
                    loadByContinuationToken: function (suppliedQueryView, query, reset, filter) {
                        if (Utilities.isNullOrEmptyObject(query) && reset) {
                            suppliedQueryView.metadata({ continuationToken: null, totalItemCount: 0 });
                            return Q();
                        }
                        else {
                            var link = reset ? "" : (suppliedQueryView.metadata() ? suppliedQueryView.metadata().continuationToken : "");
                            return suppliedQueryView.fetch({
                                link: link,
                                workflowId: query.workflowId
                            });
                        }
                    }
                },
                processServerResponse: function (response) {
                    var result = ExtensionCore.Data.processValueArrayServerResponse(response);
                    result.data = _this._transformData(result.data);
                    result.navigationMetadata = {
                        continuationToken: response.nextLink
                    };
                    return result;
                }
            });
        }
        WorkflowVersionData.prototype._transformData = function (items) {
            return items.map(function (item) {
                return {
                    id: item.id,
                    version: item.name,
                    createdTime: new Date(item.properties.createdTime),
                    changedTime: new Date(item.properties.changedTime),
                    schema: item.properties.definition[Constants.SchemaPropertyKeys.SchemaKey],
                    title: item.name
                };
            });
        };
        return WorkflowVersionData;
    }());
    exports.WorkflowVersionData = WorkflowVersionData;
});
