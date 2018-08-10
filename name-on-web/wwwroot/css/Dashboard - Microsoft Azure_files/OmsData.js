define(["require", "exports", "../../Workflow/CORS/CorsConstants", "../../Common/Utilities/ResourceUtility"], function (require, exports, CorsConstants_1, ResourceUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OmsData = (function () {
        function OmsData() {
            var _this = this;
            this.omsWorkspacesCache = new MsPortalFx.Data.QueryCache({
                sourceUri: function (subscriptionId) {
                    return CorsConstants_1.CorsConstants.omsWorkspacesTemplate.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), subscriptionId, MsPortalFx.getEnvironmentValue("omsApiVersion"));
                },
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return _this._getOmsWorkspaces(uri);
                },
                poll: false
            });
        }
        OmsData.prototype._getOmsWorkspaces = function (uri, workSpaces) {
            var _this = this;
            if (workSpaces === void 0) { workSpaces = []; }
            return ResourceUtility_1.ResourceUtility.getResourceInfoInBatch(uri).then(function (response) {
                response.value.forEach(function (workSpace) {
                    if (StringEx.equals(workSpace.type, "Microsoft.OperationalInsights/workspaces", StringComparison.IgnoreCase)) {
                        workSpaces.push({
                            id: workSpace.id,
                            name: workSpace.name,
                            location: workSpace.location
                        });
                    }
                });
                return response.nextLink ? _this._getOmsWorkspaces(response.nextLink, workSpaces) : workSpaces;
            });
        };
        return OmsData;
    }());
    exports.OmsData = OmsData;
});
