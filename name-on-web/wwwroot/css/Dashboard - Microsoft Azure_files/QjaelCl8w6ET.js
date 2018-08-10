var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/Service/SecurityHttpClient",["require","exports","o","Core/TypeScript/TFS.WebApi","ReleaseManagement/TypeScript/Service/ServiceConstants"],(function(n,t,i,r,u){"use strict";i.defineProperty(t,"__esModule",{value:!0});var f=(function(n){function t(t){return n.call(this,t,!0)||this}return __extends(t,n),t.prototype.hasEditBuildDefinitionPermissions=function(n){return this._beginRequest({area:"Security",locationId:u.permissionsLocationId,routeValues:{resource:u.permissionsResource,securityNamespaceId:u.buildSecurityNameSpace,permissions:u.editBuildDefinitionBitMask},httpMethod:"GET",responseType:{fields:null},queryParams:{tokens:n},version:"3.2-preview.2"})},t.prototype.hasEditReleaseDefinitionPermissions=function(n){return this._beginRequest({area:"Security",locationId:u.permissionsLocationId,routeValues:{resource:u.permissionsResource,securityNamespaceId:u.releaseSecurityNameSpace,permissions:u.editReleaseDefinitionPermission},httpMethod:"GET",responseType:{fields:null},queryParams:{tokens:n},version:"3.2-preview.2"})},t.prototype.hasCreateProjectPermissions=function(){return this.beginRequestQ({area:"Security",locationId:u.permissionsLocationId,routeValues:{resource:u.permissionsResource,securityNamespaceId:u.teamProjectCollectionNamespaceId,permissions:u.createTeamProjectPermission},httpMethod:"GET",responseType:{fields:null},queryParams:{tokens:u.teamProjectCollectionNamespaceToken},version:"3.2-preview.2"})},t})(r.VssHttpClient);t.SecurityHttpClient=f}))