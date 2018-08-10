define(["require", "exports", "../../_generated/Svg"], function (require, exports, Svg) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkflowPart = (function (_super) {
        __extends(WorkflowPart, _super);
        function WorkflowPart(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.id = ko.observable();
            _this.icon(Svg.Content.EMAExtension.Images.logicApps);
            _this._workflowView = dataContext.workflow.entityCache.createView(container);
            return _this;
        }
        WorkflowPart.prototype.onInputsSet = function (inputs, partSettings) {
            var id = inputs.id, descriptor = MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(id);
            this.id(id);
            this.assetName(descriptor.resource);
            return this._workflowView.fetch(id.toUpperCase());
        };
        return WorkflowPart;
    }(MsPortalFx.ViewModels.AssetPart));
    exports.WorkflowPart = WorkflowPart;
});
