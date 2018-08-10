define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Constants = (function () {
        function Constants() {
        }
        return Constants;
    }());
    Constants.DataUriTemplate = {
        listVirtualNetworks: "{0}/subscriptions/{1}/providers/Microsoft.Network/virtualNetworks?api-version={2}"
    };
    exports.Constants = Constants;
});
