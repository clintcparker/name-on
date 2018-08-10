define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Validations = (function () {
        function Validations() {
        }
        return Validations;
    }());
    Validations.customConnectorNameMaxLength = 80;
    exports.Validations = Validations;
    var Regex = (function () {
        function Regex() {
        }
        return Regex;
    }());
    Regex.customConnectorName = "^[0-9a-zA-Z-_.]+$";
    exports.Regex = Regex;
    var CreateBladeTemplateIds = (function () {
        function CreateBladeTemplateIds() {
        }
        return CreateBladeTemplateIds;
    }());
    CreateBladeTemplateIds.blankCustomConnectorCreate = "logicApp_BlankCustomConnector";
    CreateBladeTemplateIds.blankCustomConnectorCreateWithIse = "logicApp_BlankCustomConnector_IntegrationServiceEnvironment";
    exports.CreateBladeTemplateIds = CreateBladeTemplateIds;
    var Rpc = (function () {
        function Rpc() {
        }
        return Rpc;
    }());
    Rpc.customConnectorEditSignature = "customConnectorEdit";
    Rpc.customConnectorEditHtmlPath = "Html/iframecustomconnector.html";
    exports.Rpc = Rpc;
    exports.customConnectorType = "customApis";
    exports.webProvider = "Microsoft.Web";
    exports.availableLocationsTemplate = "{0}/subscriptions/{1}/providers/Microsoft.Web?api-version={2}";
});
