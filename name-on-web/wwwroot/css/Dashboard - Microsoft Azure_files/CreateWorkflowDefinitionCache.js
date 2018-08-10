define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CreateWorkflowDefinitionCache = (function () {
        function CreateWorkflowDefinitionCache() {
            var _this = this;
            this._workflowPromises = {};
            // An object cache for storing Create Workflow edit scopes.
            this.WorkflowDefinitionCache = new MsPortalFx.Data.ObjectCache({
                "supplyValue": function (editScopeId, lifetime) {
                    _this._registerOnSet(editScopeId, lifetime);
                    return _this._workflowPromises[editScopeId].promise;
                },
                "serializeKey": function (key) {
                    return key;
                }
            });
        }
        /*
         * Puts an edit scope in an object cache, registering it for disposal after its container goes away.
         *
         * @arg {WorkflowDataModel} editScope - The edit scope to put in the object cache.
         * @arg {string} editScopeId - The edit scope's unique ID to use as the object cache key.
         * @arg {FxBase.LifetimeManager} lifetime - What dictates when the edit scope is removed from memory.
         */
        CreateWorkflowDefinitionCache.prototype.publishWorkflow = function (editScope, editScopeId, lifetime) {
            this._registerOnSet(editScopeId, lifetime);
            this._workflowPromises[editScopeId].resolve(editScope);
        };
        CreateWorkflowDefinitionCache.prototype._registerOnSet = function (editScopeId, lifetime) {
            var _this = this;
            if (!this._workflowPromises[editScopeId]) {
                this._workflowPromises[editScopeId] = Q.defer();
                lifetime.registerForDispose({
                    "dispose": function () {
                        delete _this._workflowPromises[editScopeId];
                    }
                });
            }
        };
        return CreateWorkflowDefinitionCache;
    }());
    exports.CreateWorkflowDefinitionCache = CreateWorkflowDefinitionCache;
});
