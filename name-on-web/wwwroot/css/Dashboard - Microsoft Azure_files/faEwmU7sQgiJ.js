define("Shared/ThenableWrapper",["require","exports","o","$"],(function(n,t,i,r){"use strict";function f(n){var t,i;if(n.length<0)return null;for(t=n[0],i=1;i<n.length;i++)t=(function(n){return t.then((function(){return n}),(function(n){return n}))})(n[i]);return t}function e(n,t){t.forEach((function(t){t&&t.catch((function(t){n.reject(t)}))}))}i.defineProperty(t,"__esModule",{value:!0});var u=(function(){function n(n){var t=this;if(this._deferred=r.Deferred(),!n){this._deferred.resolve();return}n.then((function(){t._deferred.resolve()}),(function(n){t._deferred.reject(n)}))}return n.prototype.promise=function(){return this._deferred.promise()},n})();t.ThenableWrapper=u;t.all=f;t._setupCatchFailedPromises=e}));
define("Shared/ComponentIdService",["require","exports","f","o","a","$","Shared/InsightsTelemetry","Shared/AjaxHelper","_generated/ExtensionDefinition","Shared/Logging","Shared/QueryBase","Shared/ThenableWrapper","Shared/UrlHelper","ClientResources","Shared/ComponentIdHelper","Shared/Constants"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p){"use strict";function pt(n,t){var r=t?1:0,i={SubscriptionId:n.SubscriptionId,ResourceGroup:n.ResourceGroup,Name:n.Name,LinkedApplicationType:r};return!t||(i.LinkedApplicationResource=t),i}function k(n){var t=lt(n.id);return typeof t.ResourceGroup=="undefined"||typeof t.Name=="undefined"||typeof t.SubscriptionId=="undefined"?null:t}function wt(n){var t=k(n);return t?(n&&n.properties&&n.properties.AppId&&(t.AppId=n.properties.AppId),t):null}function bt(n){var t=null,i;return n&&n.properties&&(i=(n.location||"").replace(/\s/g,""),t={applicationType:n.properties.Application_Type,flowType:n.properties.Flow_Type,requestSource:n.properties.Request_Source,location:i.toLowerCase()},n.properties.TenantId&&(t.accountId=n.properties.TenantId),n.properties.InstrumentationKey&&(t.instrumentationKey=n.properties.InstrumentationKey),n.properties.CreationDate&&(t.creationDate=n.properties.CreationDate),n.properties.AppId&&(t.appId=n.properties.AppId),n.properties.customerId&&(t.customerId=n.properties.customerId),n.properties.SamplingPercentage&&(t.samplingPercentage=n.properties.SamplingPercentage),n.properties.HockeyAppId&&(t.hockeyAppId=n.properties.HockeyAppId),n.properties.Ver&&(t.ver=n.properties.Ver)),t}function kt(n,t,i){i===void 0&&(i=!0);var r=it(n,t,i);return r&&r.length>0?r[0]:null}function it(n,t,i){i===void 0&&(i=!0);var f=new RegExp(n,"i"),r=[],u=[];return t.forEach((function(n,t){var e=!1,o,s,i;for(o in n.tags)if(s=o,i=f.exec(s),i&&i.length>0){e=!0;break}e?r.push(t):u.push(t)})),i?r.map((function(n){return t[n]})):u.map((function(n){return t[n]}))}function rt(n,t){return nt(n,t).length>0}function nt(n,t){var u=[],i=g(n),h=RegExp("/sites/","i"),f,e,o,s,r;f=h.test(n)?i.SlotName==null?"(?:(?:^hidden-)|(?:^))link:/subscriptions/{0}/resourceGroups/[^/]*/providers/microsoft\\.web/sites/{1}$".format(i.SubscriptionId,i.Name):"(?:(?:^hidden-)|(?:^))link:/subscriptions/{0}/resourceGroups/[^/]*/providers/microsoft\\.web/sites/{1}/slots/{2}$".format(i.SubscriptionId,i.Name,i.SlotName):"hidden-link:/subscriptions/{0}/resourceGroups/[^/]*/providers/Microsoft\\.ClassicCompute/virtualMachines/{1}".format(i.SubscriptionId,i.Name);e=new RegExp(f,"i");for(o in t.tags)s=o,r=e.exec(s),r&&r.length>0&&u.push(r[0]);return u}function dt(n){for(var t in n.tags)if(t.indexOf("hidden-link:")===0||t.indexOf("link:")===0)return!0;return!1}function ut(n,t,i,r){var u=f.Deferred();return ft(n,[s.AssetTypes.ApplicationInsights.Permissions.write]).then((function(n){var s={HasPermission:n},f,o;e.logCustomEvent(e.AITelemetryConstants.RBAC,4,"Subscription access",undefined,s);n?(i&&(f=g(i),f.ResourceGroup&&f.SubscriptionId||u.reject(["Invalid input resourceId","ComponentIdService._createAndUpdateHelper"]),o=et(i),t.tags||(t.tags={}),t.tags[o]="Resource"),r&&t.tags&&nt(r,t).forEach((function(n){delete t.tags[n]})),u.resolve(t)):u.reject([p.InsufficientAIAccess,"ComponentIdService._createAndUpdateHelper: Insufficient access"])})),u.promise()}function ft(n,t){return i.Base.Security.hasPermission("/subscriptions/"+n.SubscriptionId+"/resourcegroups/"+n.ResourceGroup,t)}function et(n){return"{0}{1}".format("hidden-link:",n)}function gt(n,t,i,r,u,f){return r||(r=e.AITelemetryConstants.DefaultFlowType),u||(u=e.AITelemetryConstants.DefaultRequestSource),f||(f={applicationType:t}),{id:"",location:i,name:n,properties:{ApplicationId:n,Application_Type:t,Flow_Type:r,Request_Source:u,InstrumentationKey:null,CreationDate:(new Date).toISOString(),AppId:""},type:"",tags:f}}function ot(){return{$schema:"http://schema.management.azure.com/schemas/2014-04-01-preview/deploymentTemplate.json#",contentVersion:"1.0.0.0",parameters:{name:{type:"string"},type:{type:"string"},regionId:{type:"string"},requestSource:{type:"string"}},resources:[{name:"[parameters('name')]",type:p.FullResourceType.Components,location:"[parameters('regionId')]",apiVersion:"2014-08-01",properties:{ApplicationId:"[parameters('name')]",Application_Type:"[parameters('type')]",Flow_Type:"Redfield",Request_Source:"[parameters('requestSource')]"}}]}}function ni(n){return{properties:{template:ot(),mode:"incremental",parameters:{name:{value:n.name},regionId:{value:n.location},type:{value:n.properties.Application_Type},requestSource:{value:n.properties.Request_Source}}}}}function st(n,t){t===void 0&&(t=!1);var i=t?encodeURIComponent(n.Name):n.Name;return a.buildGraphProxyPath(n.SubscriptionId,n.ResourceGroup,p.GraphPathTemplates.Components,{componentName:i})}function ht(n,t,i,r,u){var f=st(n),e={_componentId:n,_containerName:i,_queryName:p.Queries.PutComponent};return t.ClientRequestId&&delete t.ClientRequestId,ut(n,t,r,u).then((function(n){return o.apiPut(f,e,n)}))}function ct(n,t,i,r,u){var s=f.Deferred();return ut(n,t,r).then((function(f){ti(n,f,i).then((function(n){s.resolve(n)}),(function(f){if(f&&f.status===409&&u){var h=g(r),c=a.buildGraphProxyPath(h.SubscriptionId,"",p.GraphPathTemplates.RegisterNamespace,null,!0),l={_componentId:h,_containerName:i,_queryName:p.Queries.RegisterNamespace};o.apiPost(c,l).then((function(){var i=e.AITelemetryConstants.ComponentIdService;ct(n,t,i,r,!1).then((function(n){s.resolve(n)}),(function(n){s.reject([n,"ComponentIdService.create: create component after registration"])}))}),(function(n){s.reject([n,"ComponentIdService.create: register component"])}))}else s.reject([f,"ComponentIdService.create: create component"])}))}),(function(n){s.reject(n)})),s.promise()}function ti(n,t,i){var r=f.Deferred(),s=ni(t),h=a.buildGraphProxyPath(n.SubscriptionId,n.ResourceGroup,p.GraphPathTemplates.Deployment,{deploymentName:n.Name}),c=a.buildGraphProxyPath(n.SubscriptionId,n.ResourceGroup,p.GraphPathTemplates.DeploymentStatus,{deploymentName:n.Name}),l={_componentId:n,_containerName:i,_queryName:p.Queries.DeployComponent},v={_componentId:n,_containerName:i,_queryName:p.Queries.DeployStatusComponent},e=function(u){return!u||!u.properties||!u.properties.provisioningState||u.properties.provisioningState==="Failed"?(r.reject(null),!0):u.properties.provisioningState==="Succeeded"?(ht(n,t,i).then((function(n){return r.resolve(n)}),(function(n){return r.reject(n)})),!0):!1},u=function(){setTimeout((function(){o.apiGet(c,v).then((function(t){var i,r;if(!t||!t.value){u();return}for(i=0;i<t.value.length;i++)if(r=t.value[i],r.id.indexOf(n.Name)!==-1){e(r)||u();return}u()}),(function(n){return r.reject(n)}))}),1e3)};return o.apiPut(h,l,s).then((function(n){var t=e(n);t||u()}),(function(n){return r.reject(n)})),r.promise()}function ii(n,t){var u=st(n,!0),f={_componentId:n,_containerName:t,_queryName:p.Queries.DeleteApplication,_overrideinvokeApi:!0},r=o.apiDelete(u,f);return r.then((function(){i.UI.AssetManager.notifyAssetDeleted(s.AssetTypeNames.applicationInsights,n);i.UI.AssetManager.notifyAssetDeleted(s.AssetTypeNames.applicationInsights,w(n))})),r}function d(n,t,i){var r;i===void 0&&(i=!0);r=a.buildGraphProxyPath(n,"",p.GraphPathTemplates.ComponentList);i||(r=a.buildGraphProxyPath(n,"",p.GraphPathTemplates.Resources,null,p.componentsResourceTypeQuery));var e={SubscriptionId:n,ResourceGroup:undefined,Name:undefined},u=f.Deferred(),s={_componentId:e,_containerName:t,_queryName:p.Queries.FetchComponentsForSubscription};return o.apiGetArray(r,s).then((function(n){var t=[];n&&(t=n.filter((function(n){return!!k(n)})));u.resolve(t)}),(function(n){u.reject(n)})),u.promise()}function ri(n,t,i){var r=f.Deferred();return d(n,i,!1).then((function(n){var i=n.first((function(n){return n.name.toLocaleLowerCase().localeCompare(t.toLocaleLowerCase())===0}));i?r.resolve(k(i)):r.resolve(null)}),(function(n){r.reject(n)})),r.promise()}function ui(n,t,i,r){var u=function(n){for(var i=0;i<n.length;i++)if(rt(t,n[i]))return n[i];return null};return n&&t?r?Q.fcall((function(){return u(r)})):d(n,i,!1).then(u):Q.when(null)}function fi(n,t,i,r){var u=function(n){for(var i=0;i<n.length;i++)if(n[i].properties.InstrumentationKey===t)return n[i];return null};return r?Q.fcall((function(){return u(r)})):d(n,i,!0).then(u)}function lt(n){var t=tt(n),i={Name:t.Name,SubscriptionId:t.SubscriptionId,ResourceGroup:t.ResourceGroup};return t.LinkedApplicationType!==0&&(i.Name=undefined),i}function ei(n){return typeof n=="string"?tt(n):n}function tt(n){var f;if(!i.isNullOrWhiteSpace(n))try{if(b.isResourceGroupId(n))return f=b.parseResourceGroupDescriptor(n),{SubscriptionId:f.subscription,ResourceGroup:f.resourceGroup,Name:undefined,LinkedApplicationType:-1,ResourceId:n,ResourceType:p.FullResourceType.ResourceGroup};if(b.isResourceId(n)){var t=b.parseResourceDescriptor(n),e=t.types.length===1?t.resource:t.types.reduce((function(n,i){return n.typeSoFar+=(n.typeSoFar?"/":"")+i,n.nameSoFar+=(n.nameSoFar?"/":"")+(t.resourceMap[n.typeSoFar]||""),n}),{nameSoFar:"",typeSoFar:t.provider}).nameSoFar,r=(t.provider+"/"+t.types.join("/")).toLowerCase(),u=-1;return r===p.FullResourceType.Components?u=0:r===p.FullResourceType.Workspaces?u=2:r===p.FullResourceType.WebSites&&(u=1),{SubscriptionId:t.subscription,ResourceGroup:t.resourceGroup,Name:e,LinkedApplicationType:u,ResourceId:n,ResourceType:r}}}catch(o){}return{SubscriptionId:undefined,ResourceGroup:undefined,Name:undefined}}function at(n){var t,r;if(i.isNullOrUndefined(n))return null;if(typeof n=="string")return n;if(n.LinkedApplicationType!==1&&!i.isNullOrWhiteSpace(n.ResourceId))return n.ResourceId;if(t="",n.LinkedApplicationType)switch(n.LinkedApplicationType){case 0:t=w(n);break;case 2:t=vt(n);break;case 1:r={subscription:n.LinkedApplicationResource?n.LinkedApplicationResource.SubscriptionId:n.SubscriptionId,resourceGroup:n.LinkedApplicationResource?n.LinkedApplicationResource.ResourceGroup:n.ResourceGroup,resource:n.LinkedApplicationResource?n.LinkedApplicationResource.Name:n.Name,type:p.ResourceType.Sites,provider:p.Providers.WebSitesProvider,types:[p.ResourceType.Sites],resources:[n.LinkedApplicationResource?n.LinkedApplicationResource.Name:n.Name],resourceMap:null};t=i.ViewModels.Services.ResourceTypes.buildResourceIdFromDescriptor(r)}else t=w(n);return t}function g(n){for(var i=(n+"").split("/"),u,f,r,e,t=0;t<i.length;t++)switch(i[t].toLowerCase()){case"subscriptions":t+1<i.length&&(u=i[t+1],t++);break;case"resourcegroups":t+1<i.length&&(f=i[t+1],t++);break;case"slots":t+1<i.length&&(e=i[t+1],t++);break;case"sites":t+1<i.length&&(r=i[t+1],t++)}return r=r?r:i[i.length-1],{Name:r,SubscriptionId:u,ResourceGroup:f,SlotName:e}}function w(n){return y.ComponentIdHelper.componentIdToResourceId(n)}function vt(n){return y.ComponentIdHelper.componentIdToWorkspaceId(n)}function oi(n,t,i,r,u){u===void 0&&(u=[s.AssetTypes.ApplicationInsights.Permissions.read]);var f=undefined;n&&(f=at(n),yt(f,n,t,i,r,u))}function yt(n,t,r,u,f,o){o===void 0&&(o=[s.AssetTypes.ApplicationInsights.Permissions.read]);n&&t&&e.instrumentPromise(i.Base.Security.hasPermission(n,o).then((function(n){n||(e.logCustomEvent(e.AITelemetryConstants.RBAC,u,f,t,{HasPermission:n}),r.unauthorized())})),"RBAC permission query")}function si(n,t,i){var e=[],o=undefined,r=[],s,a,u;return t&&(s=new c.QueryBase(n,i,p.Queries.LinkedWebTests),a=t.fetch(s).then((function(){var n=t.item();n&&n.forEach((function(n){return r.push(n.id)}))})),e.push(a)),u=f.Deferred(),l.all(e).then((function(){o&&r.push(o)})).then((function(){r.push(w(n));u.resolve(r.reverse())})).catch((function(t){var i=t&&t.responseText?t.responseText:t;h.errorConsole("failed to query resources: "+i,"ComponentIdService.lookupLinkedResources");u.resolve([w(n)])})),u.promise()}function hi(n,t){return!n&&!t?!0:n&&t?n.SubscriptionId===t.SubscriptionId&&n.ResourceGroup&&t.ResourceGroup&&n.ResourceGroup.toLowerCase()===t.ResourceGroup.toLowerCase()&&n.Name&&t.Name&&n.Name.toLowerCase()===t.Name.toLowerCase():!1}function ci(n){return n===p.ApplicationType.Phone||n===p.ApplicationType.Store||n===p.ApplicationType.Android||n===p.ApplicationType.Ios||n===p.ApplicationType.Uap||n===p.ApplicationType.HockeyAppBridge}function li(n){var t=!0,i,r,u;return n.length>255?(i=v.createApplicationNameTooLong,t=!1):n.charAt(n.length-1)==="."?(i=v.createApplicationNameEndsWithDot,t=!1):n.charAt(n.length-1)===" "||n.charAt(0)===" "?(i=v.createApplicationNameBeginsOrEndsWithSpace,t=!1):(r=n.match(/[*;/?:@&=+$,<>#%\ "{}|^'`\\\[\]]/g),r&&(u=r.unique().join("', '"),i=v.createApplicationNameInvalidCharacters.format(u),t=!1)),{valid:t,message:i}}r.defineProperty(t,"__esModule",{value:!0});var b=i.ViewModels.Services.ResourceTypes;t.convertToComponentIdExtended=pt;t.convertToComponentId=k;t.convertToComponentIdExtendedWithAppId=wt;t.convertToComponentMetadata=bt;t._filter=kt;t._findComponents=it;t.hasLink=rt;t.extractLinks=nt;t.hasAnyLink=dt;t.checkAccessForResourceGroup=ft;t.getLinkString=et;t.getDefaultPayloadForCreateComponent=gt;t.getArmJsonTemplate=ot;t.update=ht;t.create=ct;t.destroy=ii;t.fetchComponentsForSubscription=d;t.fetchMatchingComponentInSubscription=ri;t.fetchMonitoredApplicationsItemByLinkedResourceUriInSubscription=ui;t.fetchMonitoredApplicationsItemByIkeyInSubscription=fi;t.resourceIdToComponentId=lt;t.ensureComponentIdExtended=ei;t.resourceIdToComponentIdExtended=tt;t.componentExtendedIdToResourceId=at;t.nonAIResourceIdToNonAIComponentId=g;t.componentIdToResourceId=w;t.componentIdToWorkspaceId=vt;t.checkAIPermission=oi;t.checkRBACPermission=yt;t.lookupLinkedResources=si;t.Equal=hi;t.isDeviceType=ci;t.validateApplicationNameFormat=li}))