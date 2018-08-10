define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Constants = (function () {
        function Constants() {
        }
        return Constants;
    }());
    Constants.DataUriTemplate = {
        listEnvironment: "{0}/providers/Microsoft.PowerApps/environments?api-version={1}&$filter=minimumAppPermission eq 'CanEdit'",
        createCustomConnector: "{0}/providers/Microsoft.PowerApps/apis?api-version={1}"
    };
    exports.Constants = Constants;
});
