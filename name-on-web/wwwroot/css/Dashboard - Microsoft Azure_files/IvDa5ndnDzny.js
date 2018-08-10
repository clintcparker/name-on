define("Shared/SharedArea",["require","exports","f","o","Shared/AjaxExtensions","Shared/Utilities"],(function(n,t,i,r,u,f){"use strict";r.defineProperty(t,"__esModule",{value:!0});var e=Common.DataModels,o=i.Base.Resources.getAppRelativeUri("/api/Common/CurrentContext"),s=i.Base.Resources.getAppRelativeUri("api/Common/Domains/Primary"),h=i.Base.Resources.getAppRelativeUri("/api/ADPremium"),c=i.Base.Resources.getAppRelativeUri("/api/TenantSkuInfo"),l=i.Base.Resources.getAppRelativeUri("/api/BaselinePolicies/CanView"),a=(function(){function n(){var n=this;this.businessScenarios=f.getBusinessScenarios();this.getCurrentContext=new i.Data.QueryCache({entityTypeName:e.ContextDataType,sourceUri:function(){return o},poll:!1,supplyData:function(t,i,r,f,e,o){return u.AuthenticatedToAdIbizaUx.trackedSupplyData(n.businessScenarios.directoryManagement(),"GetCurrentContext","GetCurrentContext","Retrieve current context",t,i,r,f,e,o)}});this.getPrimaryDomain=new i.Data.EntityCache({entityTypeName:e.DomainType,sourceUri:function(){return s},poll:!1,supplyData:function(t,i,r,f,e,o){return u.AuthenticatedToAdIbizaUx.trackedSupplyData(n.businessScenarios.directoryManagement(),"GetPrimaryDomain","GetPrimaryDomain","Retrieve the primary domain",t,i,r,f,e,o)}});this.adPremiumQuery=new i.Data.EntityCache({entityTypeName:e.PremiumModelType,sourceUri:function(){return h},poll:!1,extendEntryLifetimes:!0,supplyData:function(t,i,r,f,e,o){return u.AuthenticatedToAdIbizaUx.trackedSupplyData(n.businessScenarios.directoryManagement(),"IsAdPremium","IsAdPremium","Check if tenant has AD premium",t,i,r,f,e,o)}});this.tenantSkuInfoQuery=new i.Data.EntityCache({entityTypeName:e.SkuInfoType,sourceUri:function(){return c},poll:!1,extendEntryLifetimes:!0,supplyData:function(t,i,r,f,e,o){return u.AuthenticatedToAdIbizaUx.trackedSupplyData(n.businessScenarios.directoryManagement(),"tenantSkuInfo","tenantSkuInfo","Check tennet SkuInfo",t,i,r,f,e,o)}});this.canViewBaselinePolicy=new i.Data.EntityCache({entityTypeName:"boolean",sourceUri:function(){return l},supplyData:function(t,i,r,f,e,o){return u.AuthenticatedToAdIbizaUx.trackedSupplyData(n.businessScenarios.policyManagement(),"CanViewBaselinePolicy","CanViewBaselinePolicy","Check if user can view baseline policies",t,i,r,f,e,o)},poll:!1})}return n})();t.DataContext=a}));
define("Shared/TelemetryHelper",["require","exports","f","o","Shared/SharedArea"],(function(n,t,i,r,u){"use strict";var o,a,v,y,p;r.defineProperty(t,"__esModule",{value:!0});var s=i.Base.Diagnostics.createLog(n),f=window.appInsights,l=i.getEnvironmentValue,h=l("aiInstrumentationEnabled"),c=l("aiInstrumentationKey"),e={},w=(function(){function n(){}return n})();t.SessionProperties=w;o=(function(){function n(){}return r.defineProperty(n,"appInsights",{get:function(){return window.appInsights},enumerable:!0,configurable:!0}),n.trackPageView=function(n,t,i,r){h&&f&&(f.trackPageView(n,t,i,r),s.verbose("appInsights.trackPageView("+n+", ...) logged to AI instance with key="+c))},n.trackEvent=function(n,t,i){h&&f&&(f.trackEvent(n,t,i),s.verbose("appInsights.trackEvent("+n+", ...) logged to AI instance with key="+c))},n.startTrackEvent=function(n){var t=new Date;return{name:n,time:t.getTime()}},n.stopTrackEvent=function(t,i,r,u){h&&f&&(f.trackEvent(t,r,n.getMeasurementsWithDuration(t,i,r,u)),s.verbose("appInsights.trackEvent("+t+", ...) logged to AI instance with key="+c))},n.trackException=function(t,i,r,u,e){h&&f&&(f.trackException(t,i,u,n.getMeasurementsWithDuration(i,r,u,e)),s.verbose("appInsights.trackException(...,"+i+") logged to AI instance with key="+c))},n.getMeasurementsWithDuration=function(n,t,i,r){var e=new Date,u=r,f;return t&&t.time&&t.name===n?(f=e.getTime()-t.time,u?u.Duration=f:u={Duration:f}):s.verbose("getMeasurementsWithDuration() failed to set event duration!"),u},n})();t.AppInsightsHelper=o;a=(function(){function n(){}return n})();t.PageViewProperties=a;v=(function(){function n(){}return n})();t.ClickEventProperties=v;y=(function(){function n(){}return n})();t.ResultEventProperties=y;p=(function(){function n(n,t){this.area=n;this.bladeName=t}return r.defineProperty(n.prototype,"prefix",{get:function(){return this.area+"."+this.bladeName+"."},enumerable:!0,configurable:!0}),n.prototype.trackPageView=function(n,t,r,u){n=i.isNullOrUndefined(n)?this.area+"."+this.bladeName:this.prefix+n;r||(r=e);o.trackPageView(n,t,r,u)},n.prototype.trackHandledError=function(n,t){var r=i.isNullOrUndefined(t),u={errorCode:r?null:t.errorCode,localizedErrorDetails:r||i.isNullOrUndefined(t.localizedErrorDetails)?null:t.localizedErrorDetails.errorDetail,clientRequestId:r?null:t.clientRequestId,userObjectId:r?null:t.userObjectId,tenantId:r?null:t.tenantId,title:n.title,status:n.status.toString(),description:n.description,clientNotificationId:n.correlationIds[0]};o.trackEvent(this.prefix+"HandledError",u)},n.prototype.trackClick=function(n,t){o.trackEvent(this.prefix+"Click",jQuery.extend({clickTargetName:n},t))},n.prototype.trackResult=function(n){typeof n=="string"&&(n={result:n});o.trackEvent(this.prefix+"Result",n)},n.prototype.trackEvent=function(n){typeof n=="string"&&(n={result:n});o.trackEvent(this.prefix+"Event",n)},n.initialize=function(){if(!window.appInsights)try{window.appInsightsUtilities.loadAISdk();f=window.appInsights}catch(n){s.error("Exception '{0}' occured while loading AppInsights SDK!".format(n.message))}if(!e.userId){var t=new u.DataContext;t.getCurrentContext.fetch({},null).then((function(n){var r=n,t=r.data();e.accountId=t.tenantId();e.userId=t.userId();e.sessionId=i.sessionId;e.effectiveLocale=l("effectiveLocale");e.externalReferrer=document.referrer.startsWith(window.location.origin)?null:document.referrer}))}},n})();t.TelemteryClient=p}))