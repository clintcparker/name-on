define(["require", "exports", "./Data/IntegrationServiceEnvironmentData"], function (require, exports, IntegrationServiceEnvironmentData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataContext = (function () {
        function DataContext(VirtualNetworkData) {
            this.VirtualNetworkData = VirtualNetworkData;
            this.integrationServiceEnvironmentData = new IntegrationServiceEnvironmentData_1.IntegrationServiceEnvironmentData();
        }
        return DataContext;
    }());
    exports.DataContext = DataContext;
});
