define(["require", "exports", "../Workflow/Constants"], function (require, exports, WorkflowConstants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Validations = (function () {
        function Validations() {
        }
        return Validations;
    }());
    Validations.integrationServiceEnvironmentNameMaxLength = 80;
    Validations.vnetPeerNameMaxLength = 80;
    exports.Validations = Validations;
    var CreateBladeTemplateIds = (function () {
        function CreateBladeTemplateIds() {
        }
        return CreateBladeTemplateIds;
    }());
    CreateBladeTemplateIds.integrationServiceEnvironmentCreate = "logicApp_IntegrationServiceEnvironment";
    exports.CreateBladeTemplateIds = CreateBladeTemplateIds;
    var Regex = (function () {
        function Regex() {
        }
        return Regex;
    }());
    Regex.integrationServiceEnvironmentName = "^[0-9a-zA-Z-_.]+$";
    Regex.vnetPeerName = "^[\\da-zA-Z]$|^[\\da-zA-Z][\\da-zA-Z_\\.\\-]*[\\da-zA-Z_]$"; // Must start with letter or number. Can contain letters, numbers, underscore, period or hyphen. Must end with letter, number or underscore.
    exports.Regex = Regex;
    exports.LOCATIONS = WorkflowConstants.LOCATIONS;
    exports.integrationServiceEnvironmentType = "integrationServiceEnvironments";
    exports.logicAppsProvider = "Microsoft.Logic";
    exports.availableLocationsTemplate = "{0}/subscriptions/{1}/providers/Microsoft.Logic?api-version={2}";
});
