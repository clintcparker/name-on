define("Core/TypeScript/Shared/TFS.ServiceDefinition",["require","exports","o","$"],(function(n,t,i,r){"use strict";var f,u;i.defineProperty(t,"__esModule",{value:!0}),(function(n){n[n.Project=0]="Project";n[n.VersionControl=1]="VersionControl"})(f=t.ServiceType||(t.ServiceType={}));u=(function(){function n(){}return n.register=function(n,t){var i=n.toString();if(this._serviceMap.hasOwnProperty(i)&&this._serviceMap[i].state()==="resolved")throw new Error("Service is already registered.");this._serviceMap.hasOwnProperty(i)?this._serviceMap[i].resolve(t):this._serviceMap[i]=r.Deferred().resolve(t)},n._getService=function(n){var t=r.Deferred(),i=n.toString();return this._serviceMap[i]||(this._serviceMap[i]=r.Deferred()),this._serviceMap[i].then((function(n){n().then((function(n){t.resolve(n)}),(function(){t.reject()}))}),(function(){t.reject()})),t.promise()},n})();u._serviceMap={};t.Service=u}))