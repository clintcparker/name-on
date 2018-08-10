define(["require", "exports", "../Constants", "../../Common/Utilities/ResourceUtility", "../DataModel/VirtualNetwork"], function (require, exports, Constants_1, ResourceUtility_1, VirtualNetwork_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VirtualNetworkData = (function () {
        function VirtualNetworkData() {
            var _this = this;
            this.virtualNetworkQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: VirtualNetwork_1.VirtualNetwork.metadata.name,
                sourceUri: function (subscriptionId) {
                    return Constants_1.Constants.DataUriTemplate.listVirtualNetworks.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), subscriptionId, MsPortalFx.getEnvironmentValue("virtualNetworkApiVersion"));
                },
                supplyData: function (httpMethod, uri) {
                    return _this._getVirtualNetworks(uri);
                },
                poll: false
            });
        }
        VirtualNetworkData.prototype._getVirtualNetworks = function (uri, virtualNetworksList) {
            var _this = this;
            if (virtualNetworksList === void 0) { virtualNetworksList = []; }
            return ResourceUtility_1.ResourceUtility.getResourceInfoInBatch(uri).then(function (response) {
                var value = response.value, nextLink = response.nextLink;
                virtualNetworksList = virtualNetworksList.concat(value);
                if (nextLink) {
                    return _this._getVirtualNetworks(nextLink, virtualNetworksList);
                }
                else {
                    return virtualNetworksList;
                }
            });
        };
        ;
        return VirtualNetworkData;
    }());
    exports.VirtualNetworkData = VirtualNetworkData;
});
