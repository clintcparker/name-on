define(["require", "exports", "./Data/CustomConnectorData", "../IntegrationServiceEnvironment/Data/IntegrationServiceEnvironmentData"], function (require, exports, CustomConnectorData_1, IntegrationServiceEnvironmentData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataContext = (function () {
        function DataContext() {
            this.integrationServiceEnvironmentData = new IntegrationServiceEnvironmentData_1.IntegrationServiceEnvironmentData();
            this.customConnectorData = new CustomConnectorData_1.CustomConnectorData();
        }
        return DataContext;
    }());
    exports.DataContext = DataContext;
});
