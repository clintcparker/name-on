define("Fx/Composition/FramePart",["require","exports","f","ko","Fx/Composition/PartBase"],(function(n,t,i,r,u){"use strict";var f;return (function(n){function e(n){return function(t){var i=t._fx||(t._fx={});i.itemType=5;i.options=n}}var t=r.observable,o,s,h,f,c;n.Decorator=e;n.Location=i.ViewModels.PartLocation;n.Size=u.Size,(function(n){function t(){return function(n){(n._fx||(n._fx={})).rebindable=!0}}n.Decorator=t})(o=n.Rebindable||(n.Rebindable={})),(function(n){function t(n){return function(t){(t._fx||(t._fx={})).configurableOptions=n||{}}}n.Decorator=t;n.SettingsScope=u.Configurable.SettingsScope})(s=n.Configurable||(n.Configurable={})),(function(n){function t(){return function(){}}n.Decorator=t})(h=n.ReplacesOldPart||(n.ReplacesOldPart={}));n.signature="FxFramePart";n.revealContentMessageKind="revealcontent";n.initializationCompleteMessageKind="initializationcomplete";f=(function(){function r(i,r){var e=this,o,u,f,h,s,c;this._handlers={};this._msPortalFxData={postMessage:t(),receiveMessage:t(),isFrameReady:t(!1),signature:null};this.src=r.src;o=r.signature||n.signature;u=[];this.postMessage=function(n,t){u.push({signature:o,kind:n,data:t})};f=this._msPortalFxData;f.signature=o;f.isFrameReady.subscribe(i,(function(n){if(n&&u){for(e.postMessage=function(n,t){f.postMessage({signature:o,kind:n,data:t})};u.length;)f.postMessage(u.shift());u=null}}));f.receiveMessage.subscribe(i,(function(n){(e._handlers[n.kind]||[]).slice().forEach((function(t){t(n.data)}))}));h=function(){i.revealContent();e.off(n.revealContentMessageKind,h)};this.on(n.revealContentMessageKind,h);s=Q.defer();this._readyPromise=s.promise;c=function(t){var i=t&&t.errorMessage;i?s.reject(i):s.resolve();e.off(n.initializationCompleteMessageKind,c)};this.on(n.initializationCompleteMessageKind,c)}return r.prototype.waitForFrameReady=function(){return this._readyPromise},r.prototype.on=function(n,t){(this._handlers[n]=this._handlers[n]||[]).push(t)},r.prototype.off=function(n,t){i.remove(this._handlers[n]||[],t)},r})();n.ViewModel=f,(function(n){function t(){return function(n){(n._fx||(n._fx={})).filterable=!0}}n.Decorator=t})(c=n.Filterable||(n.Filterable={}))})(f||(f={})),f}));
define("Fx/Composition/FrameBlade",["require","exports","f","Fx/Composition/BladeBase","Fx/Composition/FramePart"],(function(n,t,i,r,u){"use strict";var f;return (function(n){function e(n){return function(t){var i=t._fx||(t._fx={});i.itemType=1;i.options=n}}var t=i.noop,o,s,h,c,l,a,v,f;n.Decorator=e,(function(n){function t(){return function(n){var t=n._fx||(n._fx={});t.rebindable=!0}}n.Decorator=t})(o=n.Rebindable||(n.Rebindable={})),(function(n){function t(n){return function(t){var i=t._fx||(t._fx={});i.configurableOptions=n||{}}}n.Decorator=t;n.SettingsScope=r.Configurable.SettingsScope})(s=n.Configurable||(n.Configurable={})),(function(n){function i(){return t}n.Decorator=i})(h=n.ReturnsData||(n.ReturnsData={})),(function(n){function i(){return t}n.Decorator=i})(c=n.Pinnable||(n.Pinnable={})),(function(n){function t(){return function(n){(n._fx||(n._fx={})).doesProvisioning=!0}}n.Decorator=t})(l=n.DoesProvisioning||(n.DoesProvisioning={})),(function(n){function i(){return t}n.Decorator=i})(a=n.LegacyFeatures||(n.LegacyFeatures={})),(function(n){function i(){return t}n.Decorator=i})(v=n.ForContextPane||(n.ForContextPane={}));f=(function(n){function t(t,r){return n.call(this,t,i.extend2(r,{signature:"FxFrameBlade"}))||this}return __extends(t,n),t})(u.ViewModel);n.ViewModel=f})(f||(f={})),f}))