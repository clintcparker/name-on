define(["require", "exports", "EMA/ClientResources/ClientResources"], function (require, exports, ClientResources) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BodyParameterDelimiter = "||";
    exports.workflowDefinitionSchema = "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2014-12-01-preview/workflowdefinition.json#";
    exports.extensionName = "Microsoft_Azure_EMA";
    exports.uservoiceLink = "http://aka.ms/connectorfeedback";
    exports.viewConnectorsLink = "http://aka.ms/logicapps-availableapi";
    exports.throughputModeLink = "https://aka.ms/D3461u";
    exports.workflowPartName = "WorkflowPart";
    exports.galleryItemId = "Microsoft.EmptyWorkflow";
    exports.WorkflowTriggerIsNotEnabledError = "WorkflowTriggerIsNotEnabled";
    exports.WorkflowTriggerNotFoundError = "WorkflowTriggerNotFound";
    exports.customConnectorEnvFeatureFlag = "customConnectorEnv";
    var ViewMode;
    (function (ViewMode) {
        ViewMode[ViewMode["code"] = 0] = "code";
        ViewMode[ViewMode["designer"] = 1] = "designer";
        ViewMode[ViewMode["templateGallery"] = 2] = "templateGallery";
        ViewMode[ViewMode["debugView"] = 3] = "debugView";
        ViewMode[ViewMode["loading"] = 4] = "loading";
    })(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
    var WorkflowHistory = (function () {
        function WorkflowHistory() {
        }
        return WorkflowHistory;
    }());
    WorkflowHistory.flowRunsMaxLimit = 250;
    exports.WorkflowHistory = WorkflowHistory;
    var WorkflowState = (function () {
        function WorkflowState() {
        }
        return WorkflowState;
    }());
    WorkflowState.Enabled = "Enabled";
    WorkflowState.Disabled = "Disabled";
    WorkflowState.Suspended = "Suspended";
    WorkflowState.Completed = "Completed";
    WorkflowState.Deleted = "Deleted";
    WorkflowState.NotSpecified = "NotSpecified";
    exports.WorkflowState = WorkflowState;
    var WorkflowStatus = (function () {
        function WorkflowStatus() {
        }
        return WorkflowStatus;
    }());
    WorkflowStatus.None = "None";
    WorkflowStatus.Running = "Running";
    WorkflowStatus.Succeeded = "Succeeded";
    WorkflowStatus.Failed = "Failed";
    WorkflowStatus.Cancelled = "Cancelled";
    exports.WorkflowStatus = WorkflowStatus;
    var WorkflowHistoryStatus = (function () {
        function WorkflowHistoryStatus() {
        }
        return WorkflowHistoryStatus;
    }());
    WorkflowHistoryStatus.None = "None";
    WorkflowHistoryStatus.Running = "Running";
    WorkflowHistoryStatus.Succeeded = "Succeeded";
    WorkflowHistoryStatus.Failed = "Failed";
    WorkflowHistoryStatus.Cancelling = "Cancelling";
    WorkflowHistoryStatus.Cancelled = "Cancelled";
    WorkflowHistoryStatus.Paused = "Paused";
    WorkflowHistoryStatus.Pausing = "Pausing";
    WorkflowHistoryStatus.Resuming = "Resuming";
    WorkflowHistoryStatus.Resumed = "Resumed";
    WorkflowHistoryStatus.Skipped = "Skipped";
    WorkflowHistoryStatus.Aborted = "Aborted";
    WorkflowHistoryStatus.Waiting = "Waiting";
    exports.WorkflowHistoryStatus = WorkflowHistoryStatus;
    var AccessKeyTypes = (function () {
        function AccessKeyTypes() {
        }
        return AccessKeyTypes;
    }());
    AccessKeyTypes.Primary = "Primary";
    AccessKeyTypes.Secondary = "Secondary";
    exports.AccessKeyTypes = AccessKeyTypes;
    exports.SCHEMA = {
        GA_PREVIEW_20141201: {
            URL: "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2014-12-01-preview/workflowdefinition.json#",
            VERSION: "2014-12-01-preview"
        },
        GA_PREVIEW_20150801: {
            URL: "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2015-08-01-preview/workflowdefinition.json#",
            VERSION: "2015-08-01-preview"
        },
        GA_PREVIEW_20160401: {
            URL: "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-04-01-preview/workflowdefinition.json#",
            VERSION: "2016-04-01-preview"
        },
        GA_20160601: {
            URL: "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
            VERSION: "2016-06-01"
        }
    };
    var Blades = (function () {
        function Blades() {
        }
        return Blades;
    }());
    Blades.CreateWorkflowDesignerBlade = {
        detailBlade: "CreateWorkflowDesignerBlade",
        extension: "Microsoft_Azure_EMA",
        detailBladeInputs: {}
    };
    exports.Blades = Blades;
    var StepType = (function () {
        function StepType() {
        }
        return StepType;
    }());
    StepType.recurrence = "Recurrence";
    StepType.http = "Http";
    StepType.microservice = "ApiApp";
    StepType.condition = "If";
    StepType.scope = "Scope";
    StepType.until = "Until";
    StepType.foreach = "Foreach";
    StepType.switchScope = "Switch";
    exports.StepType = StepType;
    var GraphNodeRectangle = (function () {
        function GraphNodeRectangle() {
        }
        return GraphNodeRectangle;
    }());
    GraphNodeRectangle.width = 305;
    GraphNodeRectangle.height = 500;
    exports.GraphNodeRectangle = GraphNodeRectangle;
    var TemplateNodeRectangle = (function () {
        function TemplateNodeRectangle() {
        }
        return TemplateNodeRectangle;
    }());
    TemplateNodeRectangle.width = 250;
    TemplateNodeRectangle.height = 140;
    exports.TemplateNodeRectangle = TemplateNodeRectangle;
    var FlowSkuName = (function () {
        function FlowSkuName() {
        }
        return FlowSkuName;
    }());
    FlowSkuName.Free = "Free";
    FlowSkuName.Basic = "Basic";
    FlowSkuName.Standard = "Standard";
    FlowSkuName.Premium = "Premium";
    FlowSkuName.Consumption = "Consumption";
    exports.FlowSkuName = FlowSkuName;
    var FlowSkuFamily = (function () {
        function FlowSkuFamily() {
        }
        return FlowSkuFamily;
    }());
    FlowSkuFamily.B1 = "B1";
    FlowSkuFamily.B2 = "B2";
    FlowSkuFamily.B3 = "B3";
    FlowSkuFamily.D1 = "D1";
    FlowSkuFamily.F1 = "F1";
    FlowSkuFamily.S1 = "S1";
    FlowSkuFamily.S2 = "S2";
    FlowSkuFamily.S3 = "S3";
    exports.FlowSkuFamily = FlowSkuFamily;
    var NodeDefinition = (function () {
        function NodeDefinition() {
        }
        return NodeDefinition;
    }());
    NodeDefinition.startTriggerNodeId = "ema-trigger-startnode-unique-id";
    NodeDefinition.startActionNodeId = "ema-action-startnode-unique-id";
    exports.NodeDefinition = NodeDefinition;
    var WorkflowDefinitionParameterKey = (function () {
        function WorkflowDefinitionParameterKey() {
        }
        return WorkflowDefinitionParameterKey;
    }());
    WorkflowDefinitionParameterKey.runManually = "runworkflowmanually";
    exports.WorkflowDefinitionParameterKey = WorkflowDefinitionParameterKey;
    var SwaggerConstants = (function () {
        function SwaggerConstants() {
        }
        return SwaggerConstants;
    }());
    SwaggerConstants.trigger = "x-ms-scheduler-trigger";
    SwaggerConstants.summary = "x-ms-summary";
    SwaggerConstants.visibility = "x-ms-visibility";
    SwaggerConstants.defaultValue = "x-ms-scheduler-recommendation";
    SwaggerConstants.visibilityHidden = "internal";
    SwaggerConstants.visibilityAdvanced = "advanced";
    SwaggerConstants.propertyOutputs = "outputs";
    SwaggerConstants.description = "description";
    SwaggerConstants.swaggerFormat = "swagger-2.0-standard";
    exports.SwaggerConstants = SwaggerConstants;
    var PartitionKey = (function () {
        function PartitionKey() {
        }
        return PartitionKey;
    }());
    PartitionKey.serverFarms = "ServerFarms";
    exports.PartitionKey = PartitionKey;
    var Conditions = (function () {
        function Conditions() {
        }
        return Conditions;
    }());
    Conditions.falseCondition = "@bool('false')";
    exports.Conditions = Conditions;
    var AzureThemes = (function () {
        function AzureThemes() {
        }
        return AzureThemes;
    }());
    AzureThemes.Success = "msportalfx-bgcolor-j1";
    AzureThemes.Failure = "msportalfx-bgcolor-c0";
    AzureThemes.Running = "msportalfx-bgcolor-g0";
    AzureThemes.Skipped = "msportalfx-bgcolor-k0";
    AzureThemes.Aborted = "msportalfx-bgcolor-a1";
    exports.AzureThemes = AzureThemes;
    var Validations = (function () {
        function Validations() {
        }
        return Validations;
    }());
    Validations.webHostingPlanMaxLength = 40;
    Validations.webHostingPlanRestrictedName = "default";
    Validations.workflowMaxLength = 80;
    exports.Validations = Validations;
    var Regex = (function () {
        function Regex() {
        }
        return Regex;
    }());
    Regex.flowName = "^[0-9a-zA-Z-_.()]+$";
    Regex.webHostingPlanName = "^$|[a-zA-Z_0-9]+$";
    exports.Regex = Regex;
    var HelpContent = (function () {
        function HelpContent() {
        }
        return HelpContent;
    }());
    HelpContent.description = "Description";
    HelpContent.id = "ID";
    HelpContent.apiApp = "API App";
    HelpContent.type = "Type";
    exports.HelpContent = HelpContent;
    var WorkflowMetrics = (function () {
        function WorkflowMetrics() {
        }
        return WorkflowMetrics;
    }());
    WorkflowMetrics.runsSucceeded = "RunsSucceeded";
    WorkflowMetrics.runsFailed = "RunsFailed";
    WorkflowMetrics.runSuccessLatency = "RunSuccessLatency";
    WorkflowMetrics.runThrottledEvents = "RunThrottledEvents";
    WorkflowMetrics.billableTriggerExecutions = "BillableTriggerExecutions";
    WorkflowMetrics.billableActionExecutions = "BillableActionExecutions";
    WorkflowMetrics.totalBillableExecutions = "TotalBillableExecutions";
    WorkflowMetrics.triggerThrottledEvents = "TriggerThrottledEvents";
    WorkflowMetrics.actionThrottledEvents = "ActionThrottledEvents";
    exports.WorkflowMetrics = WorkflowMetrics;
    var SchemaPropertyKeys = (function () {
        function SchemaPropertyKeys() {
        }
        return SchemaPropertyKeys;
    }());
    SchemaPropertyKeys.Definition = "definition";
    SchemaPropertyKeys.SchemaKey = "$schema";
    SchemaPropertyKeys.ConnectionsKey = "$connections";
    SchemaPropertyKeys.ApiConnectionKey = "apiconnection";
    SchemaPropertyKeys.ApiWebhookConnectionKey = "apiconnectionwebhook";
    SchemaPropertyKeys.AuthKey = "authentication";
    SchemaPropertyKeys.AuthParameter = "$authentication";
    SchemaPropertyKeys.ManualTriggerPartialKey = "isPartial";
    exports.SchemaPropertyKeys = SchemaPropertyKeys;
    exports.defaultWebHostingPlanName = "ServicePlan";
    exports.defaultWebHostingPlanSku = "Standard";
    exports.omsLogicAppSolutionName = "LogicAppsManagement";
    var WorkFlowRunsGridItemKeys = (function () {
        function WorkFlowRunsGridItemKeys() {
        }
        return WorkFlowRunsGridItemKeys;
    }());
    WorkFlowRunsGridItemKeys.status = "status";
    WorkFlowRunsGridItemKeys.identifier = "identifier";
    WorkFlowRunsGridItemKeys.startTime = "startTime";
    WorkFlowRunsGridItemKeys.duration = "duration";
    exports.WorkFlowRunsGridItemKeys = WorkFlowRunsGridItemKeys;
    var WorkFlowTriggersHistoryGridItemKeys = (function () {
        function WorkFlowTriggersHistoryGridItemKeys() {
        }
        return WorkFlowTriggersHistoryGridItemKeys;
    }());
    WorkFlowTriggersHistoryGridItemKeys.callStatus = "callStatus";
    WorkFlowTriggersHistoryGridItemKeys.startTime = "startTime";
    WorkFlowTriggersHistoryGridItemKeys.fired = "fired";
    exports.WorkFlowTriggersHistoryGridItemKeys = WorkFlowTriggersHistoryGridItemKeys;
    var CreateBladeTemplateIds = (function () {
        function CreateBladeTemplateIds() {
        }
        return CreateBladeTemplateIds;
    }());
    CreateBladeTemplateIds.consumptionPlan = "logicApp_ConsumptionPlan_new";
    CreateBladeTemplateIds.consumptionPlanWithIntegrationAccount = "logicApp_ConsumptionPlan_IntegrationAccount_new";
    CreateBladeTemplateIds.consumptionPlanWithIntegrationAccountAndOmsWorkspace = "logicApp_ConsumptionPlan_IntegrationAccount_OmsWorkspaceWithSolution_new";
    CreateBladeTemplateIds.consumptionPlanAndOmsWorkspace = "logicApp_ConsumptionPlan_OmsWorkspaceWithSolution_new";
    CreateBladeTemplateIds.consumptionPlanIntegrationServiceEnvironment = "logicApp_ConsumptionPlan_IntegrationServiceEnvironment_new";
    CreateBladeTemplateIds.consumptionPlanWithIntegrationAccountAndIntegrationServiceEnvironment = "logicApp_ConsumptionPlan_IntegrationAccount_IntegrationServiceEnvironment_new";
    CreateBladeTemplateIds.consumptionPlanWithIntegrationAccountAndOmsWorkspaceAndIntegrationServiceEnvironment = "logicApp_ConsumptionPlan_IntegrationAccount_OmsWorkspaceWithSolution_IntegrationServiceEnvironment_new";
    CreateBladeTemplateIds.consumptionPlanWithOmsWorkspaceAndIntegrationServiceEnvironment = "logicApp_ConsumptionPlan_OmsWorkspaceWithSolution_IntegrationServiceEnvironment_new";
    exports.CreateBladeTemplateIds = CreateBladeTemplateIds;
    var State = (function () {
        function State() {
        }
        return State;
    }());
    State.enabled = "Enabled";
    State.disabled = "Disabled";
    exports.State = State;
    var HelpLinks = (function () {
        function HelpLinks() {
        }
        return HelpLinks;
    }());
    HelpLinks.LogicappsOms = "logicappsoms";
    exports.HelpLinks = HelpLinks;
    var DiagnosticsSetting = (function () {
        function DiagnosticsSetting() {
        }
        return DiagnosticsSetting;
    }());
    DiagnosticsSetting.on = "On";
    DiagnosticsSetting.off = "Off";
    exports.DiagnosticsSetting = DiagnosticsSetting;
    exports.LOCATIONS = {
        "eastasia": ClientResources.Location.eastAsia,
        "southeastasia": ClientResources.Location.southEastAsia,
        "centralus": ClientResources.Location.centralUs,
        "eastus": ClientResources.Location.eastUs,
        "eastus2": ClientResources.Location.eastUs2,
        "westus": ClientResources.Location.westUs,
        "westus2": ClientResources.Location.westUs2,
        "westcentralus": ClientResources.Location.westCentralUs,
        "northcentralus": ClientResources.Location.northCentralUs,
        "southcentralus": ClientResources.Location.southCentralUs,
        "northeurope": ClientResources.Location.northEurope,
        "westeurope": ClientResources.Location.westEurope,
        "japanwest": ClientResources.Location.japanWest,
        "japaneast": ClientResources.Location.japanEast,
        "brazilsouth": ClientResources.Location.brazilSouth,
        "australiaeast": ClientResources.Location.australiaEast,
        "australiasoutheast": ClientResources.Location.australiaSouthEast,
        "southindia": ClientResources.Location.southIndia,
        "centralindia": ClientResources.Location.centralIndia,
        "westindia": ClientResources.Location.westIndia,
        "canadacentral": ClientResources.Location.canadaCentral,
        "canadaeast": ClientResources.Location.canadaEast,
        "uksouth": ClientResources.Location.ukSouth,
        "ukwest": ClientResources.Location.ukWest,
        "franceCentral": ClientResources.Location.franceCentral,
        "franceSouth": ClientResources.Location.franceSouth,
        "koreaCentral": ClientResources.Location.koreaCentral,
        "koreaSouth": ClientResources.Location.koreaSouth,
        "usgovvirginia": ClientResources.Location.usGovVirginia,
        "usgoviowa": ClientResources.Location.usGovIowa,
        "usdodeast": ClientResources.Location.usDodEast,
        "usdodcentral": ClientResources.Location.usDodCentral,
        "usgovtexas": ClientResources.Location.usGovTexas,
        "usgovarizona": ClientResources.Location.usGovArizona,
        "centraluseuap": ClientResources.Location.centraluseuap,
        "eastus2euap": ClientResources.Location.eastus2euap,
        "chinaeast": ClientResources.Location.chinaeast,
        "chinanorth": ClientResources.Location.chinanorth,
        "chinaeast2": ClientResources.Location.chinaeast2,
        "chinanorth2": ClientResources.Location.chinanorth2
    };
    var PermissionDefinition = (function () {
        function PermissionDefinition() {
        }
        return PermissionDefinition;
    }());
    PermissionDefinition.workflowRunRead = "Microsoft.Logic/workflows/runs/read";
    PermissionDefinition.workflowTriggerRead = "Microsoft.Logic/workflows/triggers/read";
    exports.PermissionDefinition = PermissionDefinition;
    var Rpc = (function () {
        function Rpc() {
        }
        return Rpc;
    }());
    Rpc.designerSignature = "msladesigner";
    Rpc.monitorSignature = "mslamonitor";
    Rpc.designerHtmlPath = "Html/iframedesigner.html";
    Rpc.monitorHtmlPath = "Html/iframemonitor.html";
    exports.Rpc = Rpc;
    // NOTE(shimedh): Values are in milliseconds
    var TimeIntervals = (function () {
        function TimeIntervals() {
        }
        return TimeIntervals;
    }());
    TimeIntervals.debugViewRefresh = 5000;
    TimeIntervals.workflowTriggerHistoryPoll = 5000;
    TimeIntervals.stopPolling = 300000;
    TimeIntervals.stopDebugViewRefreshPolling = 120000;
    exports.TimeIntervals = TimeIntervals;
    var StatusCode = (function () {
        function StatusCode() {
        }
        return StatusCode;
    }());
    StatusCode.conflict = 409;
    StatusCode.requestTimeout = 408;
    StatusCode.tooManyRequests = 429;
    exports.StatusCode = StatusCode;
    var ComparisonOperator = (function () {
        function ComparisonOperator() {
        }
        return ComparisonOperator;
    }());
    ComparisonOperator.GreaterThanOrEqual = "ge";
    ComparisonOperator.LessThanOrEqual = "le";
    exports.ComparisonOperator = ComparisonOperator;
    var TimespanInMs = (function () {
        function TimespanInMs() {
        }
        return TimespanInMs;
    }());
    TimespanInMs.OneDay = 24 * 60 * 60 * 1000;
    TimespanInMs.OneMonth = 30 * 24 * 60 * 60 * 1000;
    TimespanInMs.OneMinute = 60000;
    TimespanInMs.ThreeHours = 3 * 60 * 60 * 1000;
    exports.TimespanInMs = TimespanInMs;
    var RecurrenceFrequencyUnits = (function () {
        function RecurrenceFrequencyUnits() {
        }
        return RecurrenceFrequencyUnits;
    }());
    RecurrenceFrequencyUnits.MONTH = "month";
    RecurrenceFrequencyUnits.WEEK = "week";
    RecurrenceFrequencyUnits.DAY = "day";
    RecurrenceFrequencyUnits.HOUR = "hour";
    RecurrenceFrequencyUnits.MINUTE = "minute";
    RecurrenceFrequencyUnits.SECOND = "second";
    RecurrenceFrequencyUnits.RECURRENCE_TITLE_JOIN_SEPARATOR = ",";
    exports.RecurrenceFrequencyUnits = RecurrenceFrequencyUnits;
    var WorkflowTagKeys = (function () {
        function WorkflowTagKeys() {
        }
        return WorkflowTagKeys;
    }());
    WorkflowTagKeys.LogicAppsCategory = "LogicAppsCategory";
    exports.WorkflowTagKeys = WorkflowTagKeys;
    var RuntimeConfigurationThroughputMode = (function () {
        function RuntimeConfigurationThroughputMode() {
        }
        return RuntimeConfigurationThroughputMode;
    }());
    RuntimeConfigurationThroughputMode.HighAvailability = "OptimizedForHighAvailability";
    RuntimeConfigurationThroughputMode.HighThroughput = "OptimizedForHighThroughput";
    exports.RuntimeConfigurationThroughputMode = RuntimeConfigurationThroughputMode;
    var Separator = (function () {
        function Separator() {
        }
        return Separator;
    }());
    Separator.OptionsSeparator = ",";
    exports.Separator = Separator;
    var RunHistoryRetention = (function () {
        function RunHistoryRetention() {
        }
        return RunHistoryRetention;
    }());
    RunHistoryRetention.MinimumDays = 7;
    RunHistoryRetention.MaximumDays = 90;
    RunHistoryRetention.DefaultDays = 90;
    RunHistoryRetention.Unit = "day";
    exports.RunHistoryRetention = RunHistoryRetention;
    var TriggerType = (function () {
        function TriggerType() {
        }
        return TriggerType;
    }());
    TriggerType.ApiConnection = "ApiConnection";
    TriggerType.ApiConnectionWebhook = "ApiConnectionWebhook";
    exports.TriggerType = TriggerType;
    exports.IntegrationServiceEnvironmentAndLocationDelimiter = ";";
});
