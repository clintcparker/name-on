define(["require", "exports", "Fx/Ajax"], function (require, exports, Batch) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowType = EMAExtension.DataModels.WorkflowType;
    var WorkflowBatchedData = (function () {
        function WorkflowBatchedData() {
            this._putAccessKeysTemplateUri = "{0}/accessKeys/default";
            this._postAccessKeysTemplateUri = "{0}/accessKeys/default/list";
            this._postRegenerateAccessKeyTemplateUri = "{0}/regenerateAccessKey";
            this._postValidateTemplateUri = "{0}/validate";
            this._generateUpgradedDefinitionTemplateUri = "{0}/generateUpgradedDefinition";
            this._getWorkflowExpandProperties = ["properties/connectionParameters", "properties/swagger"];
            this._getWorkflowUri = "{0}&$expand={1}";
            this.batchedQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: WorkflowType,
                serializeParams: function (resourceIds) {
                    return resourceIds.join(",");
                },
                supplyData: function (httpMethod, uri, headers, data, params) {
                    var batchRequestsArray = [];
                    var endpoint = MsPortalFx.getEnvironmentValue("csmManagementServiceUri") + "/batch?api-version=" + MsPortalFx.getEnvironmentValue("armApiVersion");
                    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                        var resourceId = params_1[_i];
                        batchRequestsArray.push({
                            uri: resourceId + "?api-version=" + MsPortalFx.getEnvironmentValue("emaApiVersion"),
                            type: "GET"
                        });
                    }
                    ;
                    return Batch.batchMultiple({
                        batchRequests: batchRequestsArray,
                        endpoint: endpoint
                    }).then(function (batchResponse) {
                        return batchResponse.responses;
                    });
                },
                processServerResponse: function (responses) {
                    return {
                        data: responses.map(function (response) { return response.content; })
                    };
                }
            });
        }
        return WorkflowBatchedData;
    }());
    exports.WorkflowBatchedData = WorkflowBatchedData;
});
