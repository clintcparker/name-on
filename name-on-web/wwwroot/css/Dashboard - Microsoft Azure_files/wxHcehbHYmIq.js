var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("Build/TypeScript/TFS.Build.WebApi",["require","exports","o","$","Core/TypeScript/TFS.WebApi","Core/TypeScript/Generated/TFS.Build.Common"],(function(n,t,i,r,u,f){"use strict";var e,o,s;i.defineProperty(t,"__esModule",{value:!0});e=(function(){function n(){}return n})();t.QueuedBuildRequestParams=e;o=(function(){function n(){}return n})();t.BuildRequestParams=o;s=(function(n){function t(t){return n.call(this,t)||this}return __extends(t,n),t.prototype.beginGetAllDefinitions=function(n){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Definitions,version:"1.0",responseType:f.TypeInfo.BuildDefinition,responseIsCollection:!0,data:{projectName:n}})},t.prototype.beginGetControllers=function(){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Controllers,version:"1.0",responseType:f.TypeInfo.BuildController,responseIsCollection:!0})},t.prototype.beginGetBuilds=function(n){var t={projectName:n.projectName,requestedFor:n.requestedFor,definition:n.definition,$skip:n.skip,$top:n.top,ids:n.ids,minFinishTime:n.minFinishTime,quality:n.quality,status:n.status};return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Builds,version:"1.0",responseType:f.TypeInfo.Build,responseIsCollection:!0,data:t})},t.prototype.beginGetBuild=function(n){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Builds,version:"1.0",responseType:f.TypeInfo.Build,responseIsCollection:!1,routeValues:{buildId:n}})},t.prototype.beginGetBuildRequests=function(n){var t={projectName:n.projectName,requestedFor:n.requestedFor,controllerName:n.controllerName,definitionName:n.definitionName,ids:n.ids,maxCompletedAge:n.maxCompletedAge,status:n.status,$skip:n.skip,$top:n.top};return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Requests,version:"1.0",responseType:f.TypeInfo.BuildRequest,responseIsCollection:!0,data:t})},t.prototype.beginGetBuildRequest=function(n){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Requests,version:"1.0",responseType:f.TypeInfo.BuildRequest,responseIsCollection:!1,data:{requestId:n}})},t.prototype.beginGetInformationNodes=function(n,t){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Details,version:"1.0",responseType:f.TypeInfo.InformationNode,responseIsCollection:!0,routeValues:{buildId:n},data:{types:t}})},t.prototype.beginGetDeployments=function(n,t){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.AzureDeployments,version:"1.0",responseType:f.TypeInfo.BuildDeployment,responseIsCollection:!0,data:{projectName:n,definitionName:t}})},t.prototype.beginCreateDeployment=function(n,t,i,r,u,e,o,s){return this._beginRequest({httpMethod:"POST",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.AzureDeploymentDefinitions,version:"1.0",responseType:f.TypeInfo.ContinuousDeploymentDefinition,data:{subscriptionId:n,project:{Name:t},hostedServiceName:i,storageAccountName:r,webspace:u,website:e,repositoryId:o,gitBranch:s}})},t.prototype.beginDisconnectDeployment=function(n,t,i){return this._beginRequest({httpMethod:"DELETE",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.AzureDeploymentDefinitions,version:"1.0",responseType:f.TypeInfo.ContinuousDeploymentDefinition,data:{subscriptionId:n,project:{Name:t},website:i}})},t.prototype.beginCreateBuildRequest=function(n,t,i,r,u){return this._beginRequest({httpMethod:"POST",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Requests,version:"1.0",responseType:f.TypeInfo.BuildRequest,data:{definition:{id:n,name:t,url:i},priority:r,reason:u}})},t.prototype.beginCancelBuildRequest=function(n){return this._beginRequest({httpMethod:"DELETE",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Requests,version:"1.0",routeValues:{requestId:n}})},t.prototype.beginUpdateRequestStatus=function(n,t){return this._beginRequest({httpMethod:"PATCH",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Requests,version:"1.0",routeValues:{requestId:n},data:{status:t}})},t.prototype.beginUpdateBuildStatus=function(n,t){return this._beginRequest({httpMethod:"PATCH",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Builds,version:"1.0",routeValues:{buildId:n},data:{status:t}})},t.prototype.beginUpdateBuildQuality=function(n,t){return this._beginRequest({httpMethod:"PATCH",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Builds,version:"1.0",routeValues:{buildId:n},data:{quality:t}})},t.prototype.beginUpdateBuildKeepForever=function(n,t){return this._beginRequest({httpMethod:"PATCH",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Builds,version:"1.0",routeValues:{buildId:n},data:{retainIndefinitely:t}})},t.prototype.beginDeleteBuild=function(n){return this._beginRequest({httpMethod:"DELETE",area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Builds,version:"1.0",routeValues:{buildId:n}})},t.prototype.getBuildDefinition=function(n,t){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Definitions,routeValues:{project:t,definitionId:n},httpMethod:"GET",httpResponseType:"JSON",responseType:{fields:null},queryParams:{"api-version":"4.0-preview.6"}})},t.prototype.updateBuildDefinition=function(n,t,i){return this._beginRequest({area:f.BuildResourceIds.AreaName,locationId:f.BuildResourceIds.Definitions,routeValues:{project:i,definitionId:n},httpMethod:"PUT",httpResponseType:"JSON",data:t,responseType:{fields:null},queryParams:{"api-version":"4.0-preview.6"}})},t.prototype.getResponseHeaders=function(n,t){return r.grep(n.getAllResponseHeaders().split("\r\n"),(function(n){return n.substring(0,t.length)==t}))},t.prototype.getLinkHeaderValue=function(n,t){var u=new RegExp(">;rel=['|\"]"+t+"['|\"]$"),i=null;return r.each(n,(function(n,t){return t.match(u)?(i=t.substring(t.indexOf("<")+1,t.indexOf(">")),!1):!0})),i},t})(u.VssHttpClient);t.BuildHttpClient=s}))