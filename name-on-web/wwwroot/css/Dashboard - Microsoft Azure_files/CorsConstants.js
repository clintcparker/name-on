define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CorsConstants = (function () {
        function CorsConstants() {
        }
        return CorsConstants;
    }());
    CorsConstants.provider = "Microsoft.Logic";
    CorsConstants.insightsProvider = "Microsoft.Insights";
    CorsConstants.operationsManagementProvider = "Microsoft.OperationsManagement";
    CorsConstants.webProvider = "Microsoft.Web";
    CorsConstants.workflowType = "workflows";
    CorsConstants.workflowDefinitionType = "workflowdefinition";
    CorsConstants.workflowHistoryType = "runs";
    CorsConstants.workflowHistoryOperationType = "actions";
    CorsConstants.workflowTriggerType = "triggers";
    CorsConstants.workflowTriggerHistoryType = "histories";
    CorsConstants.workflowVersionType = "versions";
    CorsConstants.locationsType = "locations";
    CorsConstants.microserviceProvider = "Microsoft.AppService";
    CorsConstants.microserviceType = "apiApps";
    CorsConstants.galleryProvider = "Microsoft.Gallery";
    CorsConstants.curationType = "curation";
    CorsConstants.recommendedServiceType = "recommended";
    CorsConstants.deploymentTemplatesType = "deploymenttemplates";
    CorsConstants.gatewayType = "gateways";
    CorsConstants.webServiceProvider = "Microsoft.Web";
    CorsConstants.hostingPlanType = "serverfarms";
    CorsConstants.regionsType = "geoRegions";
    CorsConstants.integrationAccountType = "integrationAccounts";
    CorsConstants.registerAction = "register";
    CorsConstants.omsProvider = "Microsoft.OperationalInsights";
    CorsConstants.microserviceProviderTemplate = "providers/" + CorsConstants.microserviceProvider + "/" + CorsConstants.microserviceType;
    CorsConstants.microserviceIdTemplate = "/subscriptions/{0}/resourceGroups/{1}/" + CorsConstants.microserviceProviderTemplate + "/{2}";
    CorsConstants.deploymentTemplate = "/subscriptions/{subscriptionId}/resourcegroups/{resourcegroup}/providers/" + CorsConstants.microserviceProvider + "/deploymenttemplates";
    CorsConstants.webHostingPlansForResourceGroupTemplate = "{0}/subscriptions/{1}/resourceGroups/{2}/providers/" + CorsConstants.webServiceProvider + "/serverFarms?api-version={3}";
    CorsConstants.availableLocationsTemplate = "{0}/subscriptions/{1}/providers/" + CorsConstants.provider + "?api-version={2}";
    CorsConstants.omsWorkspacesTemplate = "{0}/subscriptions/{1}/providers/" + CorsConstants.omsProvider + "/workspaces?api-version={2}";
    CorsConstants.resubmitTemplateUri = "{0}/resubmit"; // {0}: trigger history id
    CorsConstants.cancelRunTemplateUri = "{0}/cancel"; // {0}: logic app run id
    // {0} ARM endpoint, {1} is workflowId, {2} is the metric filters
    CorsConstants.getMdmMetricHistory = "{0}{1}/providers/Microsoft.Insights/metrics?api-version=2016-06-01&$filter={2}";
    exports.CorsConstants = CorsConstants;
});
