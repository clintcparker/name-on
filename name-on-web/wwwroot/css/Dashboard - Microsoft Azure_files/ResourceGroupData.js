define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceGroupType;
    var ResourceGroupData = (function () {
        function ResourceGroupData() {
            var _this = this;
            this._resourceGroupTemplateUri = "{0}/subscriptions/{1}/resourceGroups/{2}?api-version={3}";
            this.resourceGroupCache = new MsPortalFx.Data.EntityCache({
                "entityTypeName": ResourceGroupType,
                "sourceUri": function (resourceGroup) {
                    return _this._resourceGroupTemplateUri.format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), resourceGroup.subscriptionId, resourceGroup.resourceGroupId, MsPortalFx.getEnvironmentValue("csmApiVersion"));
                }
            });
        }
        return ResourceGroupData;
    }());
    exports.ResourceGroupData = ResourceGroupData;
});
