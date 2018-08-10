var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("Shared/BotApi",["require","exports","f","o","ko","Shared/Utils","Shared/LogMessageCode"],(function(n,t,i,r,u,f,e){"use strict";function a(n,i,r){return o.Net2.ajax({uri:t.BotAPIs.getLuisApp.format(f.getBotFrameworkHost(n),i,h[r]),type:"GET",dataType:"json",setAuthorizationHeader:{resourceName:"self"}})}function v(n,i,r){return o.Net2.ajax({uri:t.BotAPIs.createLuisApp.format(f.getBotFrameworkHost(n),i,h[r]),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"}})}function y(n,i){return o.Net2.ajax({uri:t.BotAPIs.createMsaAppId.format(f.getBotFrameworkHost(n),i),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"}})}function p(n,i){return o.Net2.ajax({uri:t.BotAPIs.getLuisApiData.format(f.getBotFrameworkHost(n),i),setAuthorizationHeader:{resourceName:"self"},type:"GET",dataType:"json"})}function w(n,i){return o.Net2.ajax({uri:t.BotAPIs.botDirectlineSettings.format(f.getBotFrameworkHost(n),i),setAuthorizationHeader:{resourceName:"self"},type:"POST",dataType:"json"})}function b(n){return o.Net2.ajax({uri:t.BotAPIs.getLuisApps.format(f.getBotFrameworkHost(n)),setAuthorizationHeader:{resourceName:"self"},type:"GET",dataType:"json"})}function k(n,i){return o.Net2.ajax({uri:t.BotAPIs.getBot.format(f.getBotFrameworkHost(f.getBotEnv()),n),setAuthorizationHeader:{resourceName:"self"},headers:{"X-BF-TenantId":i},type:"GET",dataType:"json"})}function d(n){return o.Net2.ajax({uri:t.BotAPIs.checkBotName.format(f.getBotFrameworkHost(f.getBotEnv()),n),setAuthorizationHeader:{resourceName:"self"},type:"POST",dataType:"json"})}function g(n,i){return o.Net2.ajax({uri:t.BotAPIs.checkFeatureEnabled.format(f.getBotFrameworkHost(f.getBotEnv()),n,i),setAuthorizationHeader:{resourceName:"self"},type:"POST",dataType:"json"})}function nt(n,i){return o.Net2.ajax({uri:t.BotAPIs.checkConnectionSettingName.format(f.getBotFrameworkHost(f.getBotEnv()),n,i),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"}})}function tt(n){return Q(o.Net2.ajax({uri:t.BotAPIs.getFullConnectionSetting.format(f.getBotFrameworkHost(f.getBotEnv()),n),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"}}))}function it(n){return Q(o.Net2.ajax({uri:t.BotAPIs.deleteConnection.format(f.getBotFrameworkHost(f.getBotEnv()),n),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"}}))}function rt(n,i){return Q(o.Net2.ajax({uri:t.BotAPIs.addConnection.format(f.getBotFrameworkHost(f.getBotEnv()),n),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"},contentType:"application/json",data:u.toJSON(i)}))}function ut(n,i){return Q(o.Net2.ajax({uri:t.BotAPIs.updateConnection.format(f.getBotFrameworkHost(f.getBotEnv()),n),type:"POST",dataType:"json",setAuthorizationHeader:{resourceName:"self"},contentType:"application/json",data:u.toJSON(i)}))}function ft(n,i){return Q(o.Net2.ajax({uri:t.BotAPIs.getTestConnectionUrl.format(f.getBotFrameworkHost(f.getBotEnv()),n,i),type:"GET",dataType:"json",setAuthorizationHeader:{resourceName:"self"}}))}var o,h,s,c,l;r.defineProperty(t,"__esModule",{value:!0});o=i.Base;t.BotAPIs={getLuisApp:"{0}/api/botManager/{1}/getLuisApp?region={2}",createLuisApp:"{0}/api/botManager/{1}/createLuisApp?region={2}",createMsaAppId:"{0}/api/botApp/provisionConvergedApp?name={1}",getLuisApiData:"{0}/api/luis/app/{1}",getLuisApps:"{0}/api/luis/apps",getBot:"{0}/api/botManager/bots?id={1}",botDirectlineSettings:"{0}/api/botManager/{1}/directlineSettings",checkBotName:"{0}/api/botApp/checkBotNameAvailability?botName={1}",checkFeatureEnabled:"{0}/api/botApp/checkFeatureEnabled?botId={1}&featureId={2}",getConnectionSettingItems:"{0}/api/connectionsettings/GetConnectionSettingItems?botid={1}",getServiceProviders:"{0}/api/connectionsettings/GetServiceProviders",checkConnectionSettingName:"{0}/api/connectionsettings/CheckConnectionSettingName?botid={1}&name={2}",getFullConnectionSetting:"{0}/api/connectionsettings/GetFullConnectionSetting?id={1}",deleteConnection:"{0}/api/connectionsettings/DeleteConnection?id={1}",addConnection:"{0}/api/connectionsettings/AddConnection?botId={1}",updateConnection:"{0}/api/connectionsettings/UpdateConnection?id={1}",getTestConnectionUrl:"{0}/api/connectionsettings/GetTestConnectionUrl?botId={1}&connectionName={2}"},(function(n){n[n.US=0]="US";n[n.EU=1]="EU";n[n.AU=2]="AU"})(h=t.LuisRegions||(t.LuisRegions={}));t.getLuisApp=a;t.createLuisApp=v;t.createConvergedApp=y;t.getLuisApiKey=p;t.ensureDirectlineSettings=w;t.getLuisApps=b;t.getBot=k;t.checkBotNameAvailability=d;t.checkFeatureEnabled=g;s=(function(){function n(n,t,i,r,f){this.items=u.observableArray([]);this._host=n;this._query=t;this._method=i;this._log=r;this._sort=f}return n.prototype.fetch=function(n){return this._param=n,this._execute()},n.prototype.refresh=function(){return this._execute()},n.prototype._execute=function(){var n=this,t;return t=this._param?this._query.format(this._host,this._param):this._query.format(this._host),Q(o.Net2.ajax({uri:t,type:this._method,dataType:"json",setAuthorizationHeader:{resourceName:"self"}})).then((function(t){t||(t=[]);t.sort(n._sort);n.items(t)}),(function(t){n.items([]);n._log.error("Failed execute QueryVuiew query",e.LogMessageCode.FailedGettingConnectionSettings,t)}))},n})();t.QueryView=s;c=(function(n){function i(i){return n.call(this,f.getBotFrameworkHost(f.getBotEnv()),t.BotAPIs.getConnectionSettingItems,"GET",i,(function(n,t){return n.name.localeCompareIgnoreCase(t.name)}))||this}return __extends(i,n),i})(s);t.ConnectionSettingQueryView=c;l=(function(n){function i(i){return n.call(this,f.getBotFrameworkHost(f.getBotEnv()),t.BotAPIs.getServiceProviders,"GET",i,(function(n,t){return n.displayName.localeCompareIgnoreCase(t.displayName)}))||this}return __extends(i,n),i})(s);t.ServiceProvidersQueryView=l;t.checkConnectionSettingName=nt;t.getConnectionSetting=tt;t.deleteConnectionSetting=it;t.addConnectionSetting=rt;t.updateConnectionSetting=ut;t.getTestConnectionUrl=ft}));
define("Shared/Types",["require","exports","f","o"],(function(n,t,i,r){"use strict";r.defineProperty(t,"__esModule",{value:!0});t.botResourceType="BotProperties";t.botEndPointType="BotEndpointInfo";t.devportalBotType="DevPortalBotSubscription";t.botResource={name:t.botResourceType,idProperties:["name"],properties:{name:null,displayName:null,description:null,iconUrl:null,endpoint:null,msaAppId:null,developerAppInsightKey:null,developerAppInsightsApplicationId:null,luisAppIds:null,configuredChannels:null,enabledChannels:null}};i.Data.Metadata.setTypeMetadata(t.botResourceType,t.botResource)}));
define("Shared/Url",["require","exports","f","o","Shared/Utils"],(function(n,t,i,r,u){"use strict";function s(n){var t=e.exec(n);if(t){var i=t[1].substr(0,t[1].length-3),r=t[2],u=t[3];return{scheme:f[i],hostname:t[2],port:t[3]?parseInt(t[3].substr(1)):undefined,path:t[4],query:t[5]?o(t[5].substr(1)):undefined,format:function(){return h(this)}}}return null}function o(n){return n?u.objectfy(n.split("&").map((function(n){return n.split(/=(.+)?/,2).map((function(n,t){return t===0?n:decodeURIComponent(n)}))})),(function(n){return n[0]}),(function(n){return n[1]})):undefined}function h(n){var r="",t,e;return n.query&&(t=n.query,r=u.isString(t)?"?"+t:"?"+i.map(t,(function(n,t){return t+"="+encodeURIComponent(n)})).join("&")),e=u.isString(n.scheme)?n.scheme:f[n.scheme],e+"://"+n.hostname+(n.port===undefined?"":":"+n.port)+(n.path||"")+r}var f,e;r.defineProperty(t,"__esModule",{value:!0}),(function(n){n[n.http=0]="http";n[n.https=1]="https"})(f=t.Scheme||(t.Scheme={}));e=/^(http:\/\/|https:\/\/)([^:\/]+)(:[0-9]+){0,1}(\/[^?]*){0,1}(\?[^#]*){0,1}/;t.parseUrl=s;t.parseQuery=o}));
define("Resource/ResourceArea",["require","exports","f","i","o","ko","Shared/Constants","Shared/Utils","ClientResources","Shared/Types","Shared/BotApi","Shared/Url","Shared/LogMessageCode"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a){"use strict";function y(n){var u=f.unwrap(n.kind),r,i;if(u==="bot")return null;if(r=f.unwrap(n.id),i=f.unwrap(f.unwrap(n.properties).endpoint),i){var e=l.parseUrl(i),s=e.hostname.split(".")[0],t=o.parseArmResourceId(r);return t.resourceTypeNamespace="Microsoft.Web",t.type="sites",t.name=s,o.formatResourceId(t)}return null}function w(n){var e=f.unwrap(n.kind),o,t;if(e==="bot")return null;if(o=f.unwrap(n.id),t=f.unwrap(f.unwrap(n.properties).endpoint),t){var s=l.parseUrl(t),i=s.hostname,r=i.split("."),u=r[0],h=r.slice(1);return i.endsWith(".azurewebsites.net")?"https://"+u+".scm."+h.join("."):"https://"+u+".scm.azurewebsites.net"}return null}function b(n,t,r){var h=f.unwrap(f.unwrap(n.properties).endpoint),u=l.parseUrl(h),e=u.hostname,o,s;return u.path="/admin/functions/messages/keys",u.query={code:t},o=u.format(),s=24e4,i.Base.Net2.ajax({uri:o,type:"GET",dataType:"json",performRetry:!0,maxRetryDuration:s}).then((function(n){return Q.resolve("https://"+e+"/api/messages?code="+n.keys[0].value)}),(function(n){return r.error("failed to get function key "+e,a.LogMessageCode.FailedGetFunctionKey),Q.reject(n)}))}function k(){var t=window.location.origin,n=["https://botservice.hosting.portal.azure.net","https://hosting.onecloud.azure-test.net/"];return n.first((function(n){return n===t}))==null&&n.splice(0,0,t),n}function d(n){var r=f.unwrap(f.unwrap(n.properties).endpoint),t=l.parseUrl(r),i;return f.unwrap(n.kind)!=="function"?!!t:(i=t&&t.query&&!o.isString(t.query)?t.query.code:"NYI",i!=="NYI")}var v,p;u.defineProperty(t,"__esModule",{value:!0});v=i.Data;t.getBotWebAppReousrceId=y;t.getBotWebAppScmRoot=w;t.getFunctionBotEndpoint=b;t.extensionOrigins=k;t.isBotEndpointValid=d;p=(function(){function t(){var n=this;this.endpoint=window.fx.environment&&window.fx.environment.armEndpoint&&window.fx.environment.armEndpoint.replace(/\/$/,"");this.armVersion="api-version=2017-12-01";this.resourceEntities=new v.EntityCache({entityTypeName:h.botResourceType,sourceUri:v.uriFormatter(this.endpoint+"{id}?"+this.armVersion,!1),supplyData:this._fetchEntity.bind(this,!0,"GET")});this.botEndpointInfos=new v.EntityCache({entityTypeName:h.botEndPointType,sourceUri:function(n){return n},supplyData:function(t,i){return n._isBotEndpointRunning(i)}});this.devportalBotEntities=new v.EntityCache({entityTypeName:h.devportalBotType,sourceUri:function(n){return o.botIdFromResourceId(n)},supplyData:function(t,i){return n.user.then((function(n){return c.getBot(i,n.directoryId)}))}});this.scmEntities=new v.EntityCache({entityTypeName:"publishingCredential",sourceUri:function(n){return e.webSitePublishingCredentialTemplate.format(o.getCSMManagementEndpoint(),n.substr(1))},supplyData:this._fetchEntity.bind(this,!1,"POST")});this.resourceProviders=new v.EntityCache({entityTypeName:"resourceProviderInfo",sourceUri:function(n){return o.getCSMManagementEndpoint()+"/subscriptions/"+n.subId+"/providers/"+n.namespace+"?api-version=2014-04-01"},supplyData:this._fetchEntity.bind(this,!1,"GET")});this.appInsigtsLocations=new v.QueryCache({sourceUri:function(n){return e.appInsightsLocationQuery.format(o.getCSMManagementEndpoint(),n)},setAuthorizationHeader:!0,processServerResponse:function(n){var i=[],t;return n&&n.resourceTypes&&(t=n.resourceTypes.first((function(n){return n.resourceType===e.Create.components})),t&&(i=t.locations)),{data:i}},extendEntryLifetimes:!0});this.storageAccountsList=new v.QueryCache({sourceUri:function(n){return"{0}/subscriptions/{1}/providers/Microsoft.Storage/storageAccounts?api-version={2}".format(o.getCSMManagementEndpoint(),n,e.Asset.StorageApiVersion)},setAuthorizationHeader:!0,processServerResponse:function(n){var t=n.value;return t&&t.length&&(t=t.filter((function(n){return n.properties&&n.properties.primaryEndpoints&&n.properties.primaryEndpoints.table}))),{data:t}},extendEntryLifetimes:!0});this.webAppServicePlanLocations=new v.QueryCache({sourceUri:function(n){var t=n.sku?"sku="+n.sku+"&":"";return o.getCSMManagementEndpoint()+"/subscriptions/"+n.subId+"/providers/"+e.georegionsResourceType+"?"+t+"api-version="+e.appServiceApiVersion},setAuthorizationHeader:!0,processServerResponse:function(n){return{data:n.value.map((function(n){return n.properties}))}}});this.botSkus=new v.QueryCache({sourceUri:function(n){return o.getCSMManagementEndpoint()+"/subscriptions/"+n+"/providers/"+e.georegionsResourceType+"?sku=Dynamic&api-version="+e.appServiceApiVersion},setAuthorizationHeader:!0,processServerResponse:function(){return{data:[{name:s.Bot.Pricing.Sku.free,value:"F0",description:"10,000 messages/transactions per month"},{name:s.Bot.Pricing.Sku.basic,value:"S1",description:"10,000 messages/transactions per month"}]}}});this.serverFarms=new v.QueryCache({sourceUri:function(n){return e.ServerFarmResourceUriFromSubscriptionTemplate.format(o.getCSMManagementEndpoint(),n)},setAuthorizationHeader:!0,processServerResponse:function(n){var t=n.value;return{data:t.filter((function(n){return n&&n.id&&i.ViewModels.Services.ResourceTypes.isResourceId(n.id)&&n.kind!=="linux"})).map((function(n){var t=i.ViewModels.Services.ResourceTypes.parseResourceDescriptor(n.id),r=null;return n.properties&&n.properties.hostingEnvironmentProfile&&(r={Id:n.properties.hostingEnvironmentProfile.id,Name:n.properties.hostingEnvironmentProfile.name,Type:n.properties.hostingEnvironmentProfile.type}),{SubscriptionId:t.subscription,ResourceGroup:t.resourceGroup,Name:n.name,NumberOfWorkers:n.properties.numberOfWorkers,WorkerSize:n.properties&&n.properties.workerSize,WorkerSizeId:n.properties&&n.properties.workerSizeId,WorkerTierName:n.properties&&n.properties.workerTierName,Id:n.id,Sku:n.sku.tier,SkuFamily:n.sku.family,Status:n.properties&&n.properties.status,Location:n.location,HostingEnvironmentProfile:r,HostingEnvironmentId:n.properties&&n.properties.hostingEnvironmentId,NumberOfSites:n.properties&&n.properties.numberOfSites,WebSpace:n.properties&&n.properties.webSpace,IsLinux:n.properties&&n.properties.reserved,ComputeMode:n.properties&&n.properties.computeMode,Reserved:n.properties&&n.properties.reserved}}))}},extendEntryLifetimes:!0})}return t.prototype._fetchEntity=function(n,t,r,u,f,e){var o=this;return i.Base.Net2.ajax({uri:u,type:t,dataType:"json",traditional:!0,headers:f,contentType:"application/json",setAuthorizationHeader:!0,invokeApi:n?"api/invoke":undefined,data:e}).then((function(n){return Q.resolve(n)}),(function(n){return o.logger.error("failed to get botService resource "+u,a.LogMessageCode.FailedToGetBotServiceResource),Q.reject(n)}))},t.prototype.getWebAppMetaInfo=function(n){var t=n.startsWith("/")?n.substr(1):n;return Q(i.Base.Net2.ajax({uri:e.webSiteMetadataTemplate.format(o.getCSMManagementEndpoint(),t),type:"POST",setAuthorizationHeader:!0,dataType:"json"})).then((function(n){return Q.resolve(f.unwrap(n.properties))}))},t.prototype.getHostingEnvironment=function(n){return Q.Promise((function(t,r){i.Base.Net2.ajax({uri:""+o.getCSMManagementEndpoint()+n+"?api-version=2016-09-01",setAuthorizationHeader:!0,dataType:"json"}).then((function(n){t(n.properties)}),r)}))},t.prototype.checkSiteNameAvailability=function(n,t){return Q.Promise((function(r){i.Base.Net2.ajax({uri:e.webSiteHostNameAvailableTemplate.format(o.getCSMManagementEndpoint(),n,t),setAuthorizationHeader:!0,dataType:"json"}).then((function(n){var i=n.properties;r({valid:i,message:i?"":s.AppService.hostNameNotAvailable.format(t)})}),(function(){r({valid:!1,message:s.AppService.invalidName})}))}))},t.prototype.checkStorageNameAvailability=function(n,t){return this._validateName(e.ResourceTypes.StorageProvider,"storageAccounts",e.Asset.StorageApiVersion,n,t)},t.prototype.checkBotHandleAvailability=function(n,t){var i=this;return Q.Promise((function(n){c.checkBotNameAvailability(t).then((function(t){n({valid:t.valid,message:t.message})}),(function(t){var r=i._ajaxErrorToString(t);n({valid:!1,message:s.Bot.Validation.botIdAvailabilityCheckFailed.format(r)})}))}))},u.defineProperty(t.prototype,"LuisAppIdQueryParameter",{get:function(){return i.getFeatureValue("LuisAppId")},enumerable:!0,configurable:!0}),u.defineProperty(t.prototype,"LuisRegionQueryParameter",{get:function(){var n=i.getFeatureValue("LuisRegion");return n?n.toUpperCase():null},enumerable:!0,configurable:!0}),u.defineProperty(t.prototype,"isLuisCreateDeepLink",{get:function(){var n=this.LuisAppIdQueryParameter,t=this.LuisRegionQueryParameter;return!n||n.length===0?!1:!t||t.length===0?!1:!0},enumerable:!0,configurable:!0}),t.prototype.patchResourceEntity=function(n){var u=this,t=n.bot,e=n.properties,r=f.unwrap(t.id),s=f.toJS(t.sku),h=r.startsWith("/")?r.substr(1):r;return Q.Promise((function(n,c){i.Base.Net2.ajax({uri:""+o.getCSMManagementEndpoint()+h+"?"+u.armVersion,type:"PATCH",setAuthorizationHeader:!0,contentType:"application/json",dataType:"json",data:JSON.stringify({name:f.unwrap(t.name),type:f.unwrap(t.type),location:f.unwrap(t.location),kind:f.unwrap(t.kind),etag:f.unwrap(t.etag),sku:s,properties:e})}).then(n,(function(n){u.logger.error("patch bot service failed "+r,a.LogMessageCode.FailedPatchBotService);c(n)}))}))},t.prototype.supplyWebAppBladeReference=function(n,t){var i=y(n),u;switch(t){case e.WebSiteBlades.continuousIntegration:u={ResourceId:i,id:i};break;case e.WebSiteBlades.appSettings:u={id:i};break;case e.WebSiteBlades.appOverview:u={id:i};break;case e.WebSiteBlades.functionEditor:u={id:i,resourceId:i};break;default:return null}return new r.Composition.Selectable.PdlBladeReference(t,e.Asset.ExtensionName,{parameters:u})},t.prototype.openWebAppBlade=function(n,t,i){var r=this.supplyWebAppBladeReference(n,i);return r?t(r):Q.reject("Unknown blade name "+i)},t.prototype.getBotSpecPickerParameters=function(n){var t=f.unwrap(n.id),r=o.parseArmResourceId(t),i=f.unwrap(f.unwrap(n.sku).name);return{fromProviderToCollector:{selectedSpecId:i,selectedSpecIds:[],selectedRecommendedView:!1},fromCollectorToProvider:{entityId:t,recommendedSpecIds:[],recentSpecIds:[],selectedSpecId:i,selectRecommendedView:!1,subscriptionId:r.subscriptionId,regionId:"regionId",options:{},disabledSpecs:[]}}},t.prototype._validateName=function(n,t,r,u,h){var l=this,c=Q.defer(),v={name:h,type:n+"/"+t},y=""+o.getCSMManagementEndpoint()+e.Asset.checkNameAvailability.format(u,n)+"?api-version="+r;return i.Base.Net2.ajax({uri:y,type:"POST",data:JSON.stringify(v),setAuthorizationHeader:!0,dataType:"json",contentType:"application/json",cache:!1}).then((function(n){c.resolve({valid:f.unwrap(n.nameAvailable)||f.unwrap(n.valid||!1),message:f.unwrap(n.message)})}),(function(i){l.logger.error("failed to check name for "+n+"/"+t+" in "+u,a.LogMessageCode.FailedToValidateName,i);c.resolve({valid:!1,message:s.General.Errors.notAvailable})})),c.promise},u.defineProperty(t.prototype,"logger",{get:function(){return this._log||(this._log=i.Base.Diagnostics.createLog(n)),this._log},enumerable:!0,configurable:!0}),u.defineProperty(t.prototype,"user",{get:function(){return this._user||(this._user=i.Base.Security.getUserInfo()),this._user},enumerable:!0,configurable:!0}),t.prototype.updateBotAppInsightSettings=function(n){var s=f.unwrap(f.unwrap(n.properties).developerAppInsightsApiKey),h=f.unwrap(f.unwrap(n.properties).developerAppInsightsApplicationId),u="?api-version=2015-05-01",t,r;if(s||o.isGuid(h)||(t=o.parseArmResourceId(f.unwrap(n.id)),t.resourceTypeNamespace="microsoft.insights",t.type="components",t.name=f.unwrap(f.unwrap(n.properties).developerAppInsightsApplicationId),!t.name))return Q.resolve(null);r=o.formatResourceId(t);r.startsWith("/")&&(r=r.substr(1));var e=""+o.getCSMManagementEndpoint()+r,c=i.Base.Net2.ajax({uri:""+e+u,type:"GET",dataType:"json",setAuthorizationHeader:!0}).then((function(n){return Q.resolve(f.unwrap(f.unwrap(n.properties).AppId))})),l=e+"/apikeys"+u,a={name:"BotFrameworkAnalyticsKey",linkedReadProperties:["/"+r+"/api"]},v=i.Base.Net2.ajax({uri:l,type:"POST",dataType:"json",setAuthorizationHeader:!0,contentType:"application/json",data:JSON.stringify(a)}).then((function(n){return Q.resolve(n.apiKey)}));return Q.all([c,v]).then((function(n){var t=n[0],i=n[1];return Q.resolve({developerAppInsightsApiKey:i,developerAppInsightsApplicationId:t})}))},t.prototype._isBotEndpointRunning=function(n){var u=this,t=f.observable(n.length>0),r={endpoint:n,isActive:t};return n?i.Base.Net2.ajax({uri:n,type:"GET"}).then((function(){return t(!0),Q.resolve(r)}),(function(i){if(i.jqXHR&&i.jqXHR.status){var f=i.jqXHR.status;return f<400||f==405||f==404||f==403||f==401?t(!0):t(!1),Q.resolve(r)}return u.logger.error("Failed to ping bot endpoint "+n,a.LogMessageCode.FailedToPingBotEndpoint),Q.resolve(r)})):Q.resolve(r)},t.prototype._ajaxErrorToString=function(n){return n?n instanceof i.Errors.AjaxError&&n.jqXHR?this._statusToString(n.jqXHR.status,n.jqXHR.statusText):n:this._statusToString(undefined,undefined)},t.prototype._statusToString=function(n,t){var i=this._statusTextToFriendlyText(t);if(n!==undefined)switch(n){case 0:return this._getUnreachableErrorString(i);case 408:return i||(i=s.Errors.StatusCodeString.timedOut),this._getUnreachableErrorString(i)}return this._getServiceErrorString(n,i)},t.prototype._statusTextToFriendlyText=function(n){return!n||n==="error"?undefined:n==="timeout"?s.Errors.StatusCodeString.timedOut:n},t.prototype._getUnreachableErrorString=function(n){return n?s.Errors.BotFramework.unreachableWithError.format(s.Errors.BotFramework.errorTextPart.format(n)):s.Errors.BotFramework.unreachable},t.prototype._getServiceErrorString=function(n,t){var i;return(i=n!==undefined?t?s.Errors.BotFramework.statusCodeAndErrorTextPart.format(n,t):s.Errors.BotFramework.statusCodePart.format(n):t?s.Errors.BotFramework.errorTextPart.format(t):undefined,i)?s.Errors.BotFramework.errorInServiceWithError.format(i):s.Errors.BotFramework.errorInService},t})();t.DataContext=p}));
define("Resource/SelectBotTemplate/Models/BotTemplateModel",["require","exports","f","o","Shared/Utils","ClientResources"],(function(n,t,i,r,u,f){"use strict";function s(n,t,r){var o=i.map(t,(function(t,i){return r.map((function(r){var o=u.getResource(f.Bot.Templates,i,r);return{id:n+"_"+t+"_"+r,name:o.name,lang:t,sdkVersion:n,description:o.description,filterComposite:t+"_"+e[n]}}))}));return o.reduce((function(n,t){return n.concat(t)}),[])}function a(){var n=s(e.sdkV3,o,c),t=s(e.sdkV4,o,l);return n.concat(t)}function v(){var n=s(e.sdkV3,o,h),t=s(e.sdkV4,o,h);return n.concat(t)}var e,o;r.defineProperty(t,"__esModule",{value:!0}),(function(n){n[n.sdkV3=0]="sdkV3";n[n.sdkV4=1]="sdkV4"})(e=t.SdkVersion||(t.SdkVersion={}));o={Csharp:"C#",Node:"NodeJS"};t.ProgLangs=["C#","NodeJS"];t.langMaps={"C#":"Csharp",NodeJS:"Node"};var c=["Basic","Form","Luis","Qna","Proactive"],l=["BasicV4"],h=["Luis"];t.mockBotTemplates=a;t.getLuisBotTemplates=v}));
define("Resource/SelectPricingPlan/ViewModels/BotPricingPlanPartViewModel",["require","exports","f","o","ko","ClientResources","MsPortalFx/Globalization","_generated/Svg"],(function(n,t,i,r,u,f,e,o){"use strict";function v(){var n=e.NumberFormat.create(),t=n.format.bind(n);return{features:[{id:"freeQuota",displayValue:"10K",displayName:f.Bot.Pricing.Quota.s1Unit},{id:"overage",displayValue:"1K",displayName:f.Bot.Pricing.Quota.s1Unit},{id:"tools",displayValue:f.Bot.Pricing.tools,iconImage:i.Base.Images.Polychromatic.Toolbox()},{id:"standardChannels",displayValue:f.Bot.Pricing.standardChannels,iconImage:c.SVG.abs_channels},{id:"sla",displayValue:"99.9%",displayName:f.Bot.Pricing.sla,iconImage:i.Base.Images.Polychromatic.Monitoring()}],specs:[{id:"F0",specCode:"F0",title:f.Bot.Pricing.Sku.free,features:[{id:"tools"},{id:"standardChannels"}],promotedFeatures:[{value:"10K",unitDescription:f.Bot.Pricing.Quota.f0Unit}],colorScheme:"yellowGreen",cost:{caption:f.Bot.Pricing.Sku.free}},{id:"S1",specCode:"S1",title:f.Bot.Pricing.Sku.standard,features:[{id:"tools"},{id:"standardChannels"},{id:"sla"}],promotedFeatures:[{value:"1K",unitDescription:f.Bot.Pricing.Quota.s1Unit}],colorScheme:"mediumBlue",cost:{currencyCode:"USD",caption:f.Bot.Pricing.Currency.s1.format("USD",t(a))}}],specType:"BotService",specsToAllowZeroCost:["F0"],resourceMap:{"default":[{id:"S1",firstParty:[{id:"S1",resourceId:"b10b532c-1345-4861-8d52-86a4a0917c21",quantity:1}]},{id:"F0",firstParty:[{id:"F0",resourceId:"1e0be8c7-af14-4667-9dc8-f1687b574e9f",quantity:l}]}]}}}var s;r.defineProperty(t,"__esModule",{value:!0});var h=i.ViewModels.Controls.Lists,c=o.Content,l=1e4,a=1e3;s=(function(){function n(n){var t=this;this.input=u.observable();this.output=u.observable();this._specData=u.observable();this.selectionMode=h.ListView.SelectionMode.Single;this._specData(v());u.reactor(n,(function(){var r=t.input(),n=t._specData(),i;r&&n&&(i={specData:n},t.output(i))}))}return n})();t.BotPricingPlanPartViewModel=s}));
define("Shared/Validations",["require","exports","f","o","ClientResources","Fx/Controls/Validations","Shared/Utils","Shared/Url"],(function(n,t,i,r,u,f,e,o){"use strict";function a(){return new s.CustomValidation(u.Bot.Settings.Configuration.endpointInvalid,function(n){var i,t;return n?(t=o.parseUrl(n),i=!!t&&t.scheme===o.Scheme.https&&!!t.hostname&&t.hostname.toLowerCase()!=="localhost"&&!t.hostname.startsWith("127.")):i=!0,Q({valid:i,message:i?undefined:u.Bot.Settings.Configuration.endpointInvalid,state:i?2:1,type:21})})}function v(n){return new s.RequiredValidation(n||u.General.Errors.requiredField)}function y(n,t){return new s.MaxLengthValidation(n,t)}function p(){return l(u.Bot.Settings.Profile.displayNameInvalidCharacters)}function w(){return l(u.Bot.Settings.Profile.descriptionInvalidCharacters)}function b(){return new s.LengthRangeValidation(4,42,u.Bot.Validation.botIdInvalidLength)}function k(){return new s.RegExMatchValidation("^[-a-zA-Z0-9_]+$",u.Bot.Validation.botIdInvalidCharacters)}function d(){return c(u.Bot.Validation.appInsightsInstrumentationKeyNotGuid)}function g(){return c(u.Bot.Validation.appInsightsApplicationKeyNotGuid)}function nt(){return tt(u.ConvergedApp.Error.invalidGuid)}function h(n,t){return new s.CustomValidation(n,function(i){return t(i).then((function(t){return Q({valid:t,message:t?undefined:n,state:t?2:1})}))})}function tt(n){return h(n,(function(n){return Q(e.isGuid(n))}))}function c(n){return h(n,(function(n){return Q(!n||e.isGuid(n))}))}function l(n){return new s.NotRegExMatchValidation("[<>]",n)}r.defineProperty(t,"__esModule",{value:!0});var s=i.ViewModels;t.messagingEndpoint=a;t.required=v;t.maxLength=y;t.displayNameIsValidCharacters=p;t.descriptionIsValidCharacters=w;t.botIdLength=b;t.botIdValidCharacters=k;t.appInsightsInstrumentationKeyIsValid=d;t.appInsightsApplicationKeyIsValid=g;t.botAppIdIsValid=nt}));
define("_generated/ExtensionDefinition",["require","exports"],(function(){"use strict";var n;return (function(n){function r(){if(t.definition){var n=t.definition;return t.definition=null,n}throw new Error("Extension definition is no longer available.");}var t,u,i,f,e;(function(n){n.definition={commandsCatalog:[],name:"Microsoft_Azure_BotService",version:"1.0",hash:"47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",schemaVersion:"1.0.0.2",sdkVersion:"5.0.302.1144 (production_sdk#815a96c85e.180609-0305)",commandGroups:[],htmlTemplates:{}}})(t||(t={}));n.definitionName="Microsoft_Azure_BotService";n.getDefinition=r,(function(n){var t,i;(function(n){n.name="Microsoft_Azure_AD";var t;(function(n){var t,i,r,u;(function(n){var t,i;n.name="SelectMember",(function(n){n.collectorBindingInternals_inputs="collectorBindingInternals-inputs";n.collectorBindingInternals_errors="collectorBindingInternals-errors";n.stepInput="stepInput"})(t=n.Inputs||(n.Inputs={})),(function(n){n.collectorBindingInternals_outputs="collectorBindingInternals-outputs";n.collectorBindingInternals_commit="collectorBindingInternals-commit";n.stepOutput="stepOutput"})(i=n.Outputs||(n.Outputs={}))})(t=n.SelectMember||(n.SelectMember={})),(function(n){n.name="SelectMemberV3";var t;(function(n){n.title="title";n.subtitle="subtitle"})(t=n.Inputs||(n.Inputs={}))})(i=n.SelectMemberV3||(n.SelectMemberV3={})),(function(n){n.name="RolesListBlade";var t;(function(n){n.scope="scope"})(t=n.Inputs||(n.Inputs={}))})(r=n.RolesListBlade||(n.RolesListBlade={})),(function(n){n.name="UserAssignmentsBlade";var t;(function(n){n.scope="scope"})(t=n.Inputs||(n.Inputs={}))})(u=n.UserAssignmentsBlade||(n.UserAssignmentsBlade={}))})(t=n.Blades||(n.Blades={}))})(t=n.Microsoft_Azure_AD||(n.Microsoft_Azure_AD={})),(function(n){n.name="HubsExtension";var t;(function(n){var t,i,r,u,f,e,o,s,h,c,l,a,v,y,p,w,b,k,d,g,nt,tt,it,rt,ut,ft,et,ot,st;(function(n){n.name="ResourceGroupMapBlade";var t;(function(n){n.id="id"})(t=n.Inputs||(n.Inputs={}))})(t=n.ResourceGroupMapBlade||(n.ResourceGroupMapBlade={})),(function(n){n.name="AssignTagsBlade";var t;(function(n){n.resources="resources"})(t=n.Inputs||(n.Inputs={}))})(i=n.AssignTagsBlade||(n.AssignTagsBlade={})),(function(n){n.name="EditTagsBlade";var t;(function(n){n.resource="resource"})(t=n.Inputs||(n.Inputs={}))})(r=n.EditTagsBlade||(n.EditTagsBlade={})),(function(n){n.name="UnauthorizedAssetBlade"})(u=n.UnauthorizedAssetBlade||(n.UnauthorizedAssetBlade={})),(function(n){n.name="NotFoundAssetBlade"})(f=n.NotFoundAssetBlade||(n.NotFoundAssetBlade={})),(function(n){n.name="UnavailableAssetBlade"})(e=n.UnavailableAssetBlade||(n.UnavailableAssetBlade={})),(function(n){n.name="Resources"})(o=n.Resources||(n.Resources={})),(function(n){n.name="BrowseAllResourcesBlade"})(s=n.BrowseAllResourcesBlade||(n.BrowseAllResourcesBlade={})),(function(n){n.name="BrowseAllInMenu";var t;(function(n){n.resourceType="resourceType"})(t=n.Inputs||(n.Inputs={}))})(h=n.BrowseAllInMenu||(n.BrowseAllInMenu={})),(function(n){n.name="BrowseResourceBlade"})(c=n.BrowseResourceBlade||(n.BrowseResourceBlade={})),(function(n){n.name="BrowseInMenu";var t;(function(n){n.resourceType="resourceType"})(t=n.Inputs||(n.Inputs={}))})(l=n.BrowseInMenu||(n.BrowseInMenu={})),(function(n){n.name="BrowseInstanceLinkBlade"})(a=n.BrowseInstanceLinkBlade||(n.BrowseInstanceLinkBlade={})),(function(n){n.name="BrowseResourceGroupBlade"})(v=n.BrowseResourceGroupBlade||(n.BrowseResourceGroupBlade={})),(function(n){n.name="BrowseGroupsInMenu";var t;(function(n){n.resourceType="resourceType"})(t=n.Inputs||(n.Inputs={}))})(y=n.BrowseGroupsInMenu||(n.BrowseGroupsInMenu={})),(function(n){n.name="MapResourceGroupBlade";var t;(function(n){n.id="id"})(t=n.Inputs||(n.Inputs={}))})(p=n.MapResourceGroupBlade||(n.MapResourceGroupBlade={})),(function(n){n.name="ResourceProperties";var t;(function(n){n.id="id"})(t=n.Inputs||(n.Inputs={}))})(w=n.ResourceProperties||(n.ResourceProperties={})),(function(n){n.name="ResourceGroupPickerV3Blade"})(b=n.ResourceGroupPickerV3Blade||(n.ResourceGroupPickerV3Blade={})),(function(n){n.name="DeployToAzure"})(k=n.DeployToAzure||(n.DeployToAzure={})),(function(n){n.name="DeployFromTemplateBlade";var t;(function(n){n.internal_bladeCallerParams="internal_bladeCallerParams"})(t=n.Inputs||(n.Inputs={}))})(d=n.DeployFromTemplateBlade||(n.DeployFromTemplateBlade={})),(function(n){n.name="ParametersEditorBlade"})(g=n.ParametersEditorBlade||(n.ParametersEditorBlade={})),(function(n){n.name="ParametersFileEditorBlade"})(nt=n.ParametersFileEditorBlade||(n.ParametersFileEditorBlade={})),(function(n){n.name="TemplateEditorBlade"})(tt=n.TemplateEditorBlade||(n.TemplateEditorBlade={})),(function(n){n.name="LocationPickerV3Blade"})(it=n.LocationPickerV3Blade||(n.LocationPickerV3Blade={})),(function(n){n.name="DeploymentInputsBlade";var t;(function(n){n.id="id"})(t=n.Inputs||(n.Inputs={}))})(rt=n.DeploymentInputsBlade||(n.DeploymentInputsBlade={})),(function(n){n.name="DeploymentOutputsBlade";var t;(function(n){n.id="id"})(t=n.Inputs||(n.Inputs={}))})(ut=n.DeploymentOutputsBlade||(n.DeploymentOutputsBlade={})),(function(n){n.name="ResourceMenuBlade";var t;(function(n){n.id="id"})(t=n.Inputs||(n.Inputs={}))})(ft=n.ResourceMenuBlade||(n.ResourceMenuBlade={})),(function(n){n.name="ServicesHealthBlade"})(et=n.ServicesHealthBlade||(n.ServicesHealthBlade={})),(function(n){n.name="SettingsBlade"})(ot=n.SettingsBlade||(n.SettingsBlade={})),(function(n){n.name="SubscriptionPickerV3Blade"})(st=n.SubscriptionPickerV3Blade||(n.SubscriptionPickerV3Blade={}))})(t=n.Blades||(n.Blades={}))})(i=n.HubsExtension||(n.HubsExtension={}))})(u=n.External||(n.External={})),(function(n){var t;(function(n){n.name="BotService"})(t=n.BotService||(n.BotService={}))})(i=n.AssetTypes||(n.AssetTypes={})),(function(n){n.botService=i.BotService.name})(f=n.AssetTypeNames||(n.AssetTypeNames={})),(function(n){n.botFrameworkIFrameBlade="BotFrameworkIFrameBlade";n.botSettingsBlade="BotSettingsBlade";n.botSpeechBlade="BotSpeechBlade";n.connectionSettingBlade="ConnectionSettingBlade";n.convergedAppErrorBlade="ConvergedAppErrorBlade";n.resourceOverviewBlade="ResourceOverviewBlade";n.botBuildBlade="BotBuildBlade";n.createBlade="CreateBlade";n.appServicePlanPickerBlade="AppServicePlanPickerBlade";n.appServicePlanCreateNewBlade="AppServicePlanCreateNewBlade";n.convergedAppPickerBlade="ConvergedAppPickerBlade";n.convergedAppCreateNewBlade="ConvergedAppCreateNewBlade";n.botTemplateGalleryBlade="BotTemplateGalleryBlade";n.botPricingPlanSelectBlade="BotPricingPlanSelectBlade"})(e=n.BladeNames||(n.BladeNames={}))})(n||(n={})),n}))