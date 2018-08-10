define(["require", "exports", "./Data/CreateWorkflowDefinitionCache", "./Data/GalleryData", "./Data/GatewayData", "./Data/LocationData", "../Shared/Data/OmsData", "./Data/ResourceGroupData", "./Data/WorkflowBatchedData", "./Data/WorkflowData", "./Data/WorkflowHistoryData", "./Data/WorkflowHistoryOperationData", "./Data/WorkflowTriggerData", "./Data/WorkflowTriggerHistoryData", "./Data/WorkflowVersionData", "../IntegrationServiceEnvironment/Data/IntegrationServiceEnvironmentData"], function (require, exports, CreateWorkflowDefinitionCacheRef, GalleryDataRef, GatewayDataRef, LocationDataRef, OmsDataRef, ResourceGroupDataRef, WorkflowBatchedData_1, WorkflowData_1, WorkflowHistoryDataRef, WorkflowHistoryOperationData_1, WorkflowTriggerData_1, WorkflowTriggerHistoryDataRef, WorkflowVersionDataRef, IntegrationServiceEnvironmentDataRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntegrationServiceEnvironmentData = IntegrationServiceEnvironmentDataRef.IntegrationServiceEnvironmentData;
    var WorkflowTriggerHistoryData = WorkflowTriggerHistoryDataRef.WorkflowTriggerHistoryData;
    var DataContext = (function () {
        function DataContext(powerAppsData) {
            this.locationData = new LocationDataRef.LocationData();
            this.omsData = new OmsDataRef.OmsData();
            this.galleryData = new GalleryDataRef.GalleryData();
            this.gatewayData = new GatewayDataRef.GatewayData();
            this.integrationServiceEnvironmentData = new IntegrationServiceEnvironmentData();
            this.resourceGroupData = new ResourceGroupDataRef.ResourceGroupData();
            this.workflowDefinitionCache = new CreateWorkflowDefinitionCacheRef.CreateWorkflowDefinitionCache();
            this.workflowHistory = new WorkflowHistoryDataRef.WorkflowHistoryData();
            this.workflowHistoryOperation = new WorkflowHistoryOperationData_1.WorkflowHistoryOperationData();
            this.workflowTrigger = new WorkflowTriggerData_1.WorkflowTriggerData();
            this.workflowTriggerHistory = new WorkflowTriggerHistoryData();
            this.workflowVersion = new WorkflowVersionDataRef.WorkflowVersionData();
            this.workflowBatched = new WorkflowBatchedData_1.WorkflowBatchedData();
            this.powerAppsData = powerAppsData;
            this.workflow = new WorkflowData_1.WorkflowData(powerAppsData);
        }
        return DataContext;
    }());
    exports.DataContext = DataContext;
});
