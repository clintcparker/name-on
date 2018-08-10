define("Core/TypeScript/ViewModels/BaseViewModel",["require","exports","f","o","ko","$","Core/TypeScript/TFS.Diag"],(function(n,t,i,r,u,f,e){"use strict";r.defineProperty(t,"__esModule",{value:!0});var o=(function(){function n(n,t){var r=this,i;this._dataLoadedDeferred=f.Deferred();this.dataFailed=function(){r._handleDataFailed()};this._isDisposed=!1;this._containerRef=n;this._initializeObservables();this._initialize();t=t||{};i=t.containerOptions||{resolveDataLoadedInitially:!1};i.resolveDataLoadedInitially===!0&&this._dataLoadedDeferred.resolve()}return n.prototype.dispose=function(){this._isDisposed=!0;this._disposeTrace()},n.prototype.startTrace=function(n,t,r,u){var o=this,s;u||(u=this._dataLoadedDeferred);this._disposeTrace();s=f.extend({instanceId:i.newGuid(),portalElementType:n},r||{});this._trace=e.startAzureTrace(n,t,s);u.done((function(){e.completeAzureTrace(o._trace);o._trace=null})).fail((function(){e.cancelAzureTrace(o._trace);o._trace=null}))},n.prototype._disposeTrace=function(){this._trace&&(e.cancelAzureTrace(this._trace),this._trace=null)},n.prototype.dataLoaded=function(){this._dataLoadedDeferred.resolve()},n.prototype.getDataLoadedPromise=function(){return this._dataLoadedDeferred.promise()},n.prototype.onInputsSet=function(){return this._dataLoadedDeferred=f.Deferred(),null},n.prototype._handleDataFailed=function(){this._dataLoadedDeferred.reject()},n.prototype._initializeObservables=function(){},n.prototype._initialize=function(){},n.prototype.subscribe=function(n,t){return n.subscribe(this._containerRef,t)},n.prototype.computed=function(n){return u.computed(this._containerRef,n)},n})();t.BaseViewModel=o}))