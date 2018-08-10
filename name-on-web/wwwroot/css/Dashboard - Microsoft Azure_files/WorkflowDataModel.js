define(["require", "exports", "../CORS/CorsConstants"], function (require, exports, CorsConstants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowDataModel = (function (_super) {
        __extends(WorkflowDataModel, _super);
        function WorkflowDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.workflow = new WorkflowParameters();
            _this.properties = new Properties();
            _this.microservices = new MicroserviceSettings();
            _this.httpActions = new HttpActions();
            _this.recurrences = new Recurrences();
            _this.selectorData = {
                subscription: ko.observable()
            };
            return _this;
        }
        return WorkflowDataModel;
    }(MsPortalFx.Services.Gallery.GalleryDataModel));
    exports.WorkflowDataModel = WorkflowDataModel;
    var WorkflowParameters = (function () {
        function WorkflowParameters() {
            this.name = ko.observable();
            this.resourceGroupName = ko.observable();
            this.resourceGroupLocation = ko.observable();
            this.subscription = ko.observable();
            this.location = ko.observable();
            this.hostingPlan = ko.observable();
            this.type = ko.observable("{0}/{1}".format(CorsConstants_1.CorsConstants.provider, CorsConstants_1.CorsConstants.workflowType));
        }
        return WorkflowParameters;
    }());
    exports.WorkflowParameters = WorkflowParameters;
    var Properties = (function () {
        function Properties() {
            this.definition = ko.observable(new WorkflowDefinitionImplementation());
            this.isUpdated = ko.observable(false);
            this.galleryItemId = ko.observable();
        }
        return Properties;
    }());
    exports.Properties = Properties;
    var WorkflowDefinitionImplementation = (function () {
        function WorkflowDefinitionImplementation() {
            this.contentVersion = ko.observable("1.0.0.0");
            this.parameters = ko.observable(({}));
            this.actions = ko.observable(({}));
            this.triggers = ko.observable(({}));
            this.outputs = ko.observable(({}));
        }
        return WorkflowDefinitionImplementation;
    }());
    exports.WorkflowDefinitionImplementation = WorkflowDefinitionImplementation;
    var MicroserviceSettings = (function () {
        function MicroserviceSettings() {
            this.settings = ko.observableArray([]);
        }
        return MicroserviceSettings;
    }());
    exports.MicroserviceSettings = MicroserviceSettings;
    var MicroserviceStep = (function () {
        function MicroserviceStep() {
            this.isLoading = ko.observable(false);
            this.isExistingMicroservice = ko.observable(false);
            this.packageId = ko.observable();
            this.galleryPackageId = ko.observable();
            /*This is the id known to Api Apps. This is not Azure gallery package id.*/
            this.apiAppId = ko.observable();
            this.name = ko.observable();
            this.uniqueName = ko.observable();
            this.resourceId = ko.observable();
            this.icon = ko.observable();
            this.brandColor = ko.observable();
            this.documentationLink = ko.observable();
            this.friendlyName = ko.observable();
            this.hasDynamicSwagger = ko.observable();
            this.isAuthenticationRequired = ko.observable();
        }
        return MicroserviceStep;
    }());
    exports.MicroserviceStep = MicroserviceStep;
    var WebHostingPlanDefinition = (function () {
        function WebHostingPlanDefinition() {
            this.defaultHostingPlanName = ko.observable();
            this.defaultNewHostingPlanName = ko.observable();
            this.hostingPlanName = ko.observable();
            this.newHostingPlanName = ko.observable();
            this.isNewHostingPlan = ko.observable();
            this.sku = ko.observable();
            this.workerSize = ko.observable();
            this.location = ko.observable();
            this.hostingPlanName("webHostingPlan");
            this.isNewHostingPlan(true);
            this.sku("Standard");
            this.workerSize(0);
        }
        return WebHostingPlanDefinition;
    }());
    exports.WebHostingPlanDefinition = WebHostingPlanDefinition;
    var HttpActions = (function () {
        function HttpActions() {
            this.actions = ko.observableArray([]);
        }
        return HttpActions;
    }());
    exports.HttpActions = HttpActions;
    var HttpAction = (function () {
        function HttpAction() {
            this.name = ko.observable();
            this.uniqueName = ko.observable();
        }
        return HttpAction;
    }());
    exports.HttpAction = HttpAction;
    var Recurrences = (function () {
        function Recurrences() {
            this.triggers = ko.observableArray([]);
        }
        return Recurrences;
    }());
    exports.Recurrences = Recurrences;
    var Recurrence = (function () {
        function Recurrence() {
            this.name = ko.observable();
            this.uniqueName = ko.observable();
        }
        return Recurrence;
    }());
    exports.Recurrence = Recurrence;
});
