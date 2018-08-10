define(["require", "exports", "./_generated/ExtensionDefinition", "./_generated/ViewModelFactories", "./Workflow/WorkflowArea", "./IntegrationAccount/IntegrationAccountArea", "./IntegrationServiceEnvironment/IntegrationServiceEnvironmentArea", "./CustomConnector/CustomConnectorArea", "./PowerApps/Data/PowerAppsData", "./VirtualNetworks/Data/VirtualNetworkData"], function (require, exports, ExtensionDefinition, ViewModelFactories, WorkflowArea_1, IntegrationAccountArea_1, IntegrationServiceEnvironmentArea_1, CustomConnectorArea_1, PowerAppsData_1, VirtualNetworkData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Instance = (function () {
        function Instance() {
        }
        return Instance;
    }());
    exports.Instance = Instance;
    /**
     * This class provides the entry point for your extension.
     */
    var EntryPoint = (function (_super) {
        __extends(EntryPoint, _super);
        function EntryPoint() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * This method is called as your extension is loaded by the shell.
         */
        EntryPoint.prototype.initialize = function () {
            Instance.viewModelFactories = new ViewModelFactories.ViewModelFactoriesBase();
            this.viewModelFactories = Instance.viewModelFactories;
            this.initializeDataContexts();
            this.initializeRpcCalls();
        };
        /**
         * Initializes each of the data contexts used by this extension.
         */
        EntryPoint.prototype.initializeDataContexts = function () {
            var powerAppsData = new PowerAppsData_1.PowerAppsData();
            var virtualNetworkData = new VirtualNetworkData_1.VirtualNetworkData();
            var workflowDataContext = new WorkflowArea_1.DataContext(powerAppsData);
            var customConnectorDataContext = new CustomConnectorArea_1.DataContext();
            var integrationServiceEnvironmentDataContext = new IntegrationServiceEnvironmentArea_1.DataContext(virtualNetworkData);
            this.viewModelFactories.Workflow().setDataContext(workflowDataContext);
            this.viewModelFactories.IntegrationAccount().setDataContext(new IntegrationAccountArea_1.DataContext());
            this.viewModelFactories.CustomConnector().setDataContext(customConnectorDataContext);
            this.viewModelFactories.IntegrationServiceEnvironment().setDataContext(integrationServiceEnvironmentDataContext);
        };
        EntryPoint.prototype.initializeRpcCalls = function () {
        };
        EntryPoint.prototype.getDefinition = function () {
            return ExtensionDefinition.getDefinition();
        };
        return EntryPoint;
    }(MsPortalFx.Extension.EntryPointBase));
    exports.EntryPoint = EntryPoint;
    function create() {
        "use strict";
        return new EntryPoint();
    }
    exports.create = create;
});
