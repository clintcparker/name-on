define(["require", "exports", "Fx/Ajax"], function (require, exports, Ajax_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceTypes = MsPortalFx.ViewModels.Services.ResourceTypes;
    var defaultBatchAjaxSettings = {
        setAuthorizationHeader: true,
        isBackgroundTask: false,
        contentType: "application/json",
        type: "GET",
        uri: ""
    };
    var ResourceUtility = (function () {
        function ResourceUtility() {
        }
        ResourceUtility.getSubscriptionInfo = function (resourceId) {
            var descriptor = ResourceTypes.parseResourceDescriptor(resourceId);
            return MsPortalFx.Azure.getSubscriptionInfo(descriptor.subscription);
        };
        ResourceUtility.getResourceInfoInBatch = function (armResourceUri, settings) {
            var networkSettings = $.extend({}, defaultBatchAjaxSettings, settings);
            networkSettings.uri = armResourceUri;
            return Ajax_1.batch(networkSettings).then(function (result) {
                return result.content;
            });
        };
        ResourceUtility.supplyDataInBatch = function (httpMethod, uri, headers, data) {
            var netAjaxSettings = {
                type: httpMethod,
                headers: headers,
                data: data,
                uri: uri
            };
            return ResourceUtility.getResourceInfoInBatch(uri, netAjaxSettings);
        };
        ResourceUtility.supplyDataInBatchWithPollingSupport = function (httpMethod, uri, headers, data) {
            var netAjaxSettings = {
                type: httpMethod,
                headers: headers,
                isBackgroundTask: true,
                data: data,
                uri: uri
            };
            return ResourceUtility.getResourceInfoInBatch(uri, netAjaxSettings);
        };
        return ResourceUtility;
    }());
    exports.ResourceUtility = ResourceUtility;
});
