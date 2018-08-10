define("Reports/ReportsArea",["require","exports","f","o","ko","Shared/AjaxExtensions","Reports/Constants","Shared/BaseArea","Reports/Utilities/ReportsUtilities"],(function(n,t,i,r,u,f,e,o,s){"use strict";var h,c;r.defineProperty(t,"__esModule",{value:!0});h=Reports.Graph.Beta;t.AreaName="Reports";c=(function(n){function r(o,c){var l=n.call(this,t.AreaName,Directories.ErrorCodes.ErrorCodesType)||this;return l.featureConfigurationsContext=o,l.sharedDataContext=c,l.signInEventsV2=new i.Data.QueryCache({entityTypeName:Reports.SignInEvents.SignInEventV2Type,serializeParams:function(n){return encodeURIComponent(u.toJSON(n))},sourceUri:function(){return r.reportingEventsV2Uri.format(e.EventNames.signInEventsV2.events)},poll:!1,navigation:{loadByContinuationToken:function(n,t,i){var u=i?"":n.metadata()?n.metadata().continuationToken:"",r;return t.nextLink(u),r=n.fetch(t).catch((function(n){return s.processReportingAPIError(n)})),i&&(r=n.refresh()),r}},supplyData:function(n,t,i,r,e){var o=u.toJSON(e);return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEvents","GetSignInEventsV2","Retrieve list of sign in events","POST",t,i,o,null,null)},processServerResponse:function(n){return{data:n.items,navigationMetadata:{continuationToken:n.nextLink}}}}),l.signInEventsListQuery=new i.Data.QueryCache({entityTypeName:h.SignInEventType,sourceUri:function(n){return r.reportingEventsUri.format(e.EventNames.signInEvents,encodeURIComponent(u.toJSON(n)))},poll:!1,navigation:{loadByContinuationToken:function(n,t,i,r){var f=i?"":n.metadata()?n.metadata().continuationToken:"";return t.searchText=u.observable(r),n.fetch({startDateTime:t.startDateTime,endDateTime:t.endDateTime,userObjectId:t.userObjectId,appId:t.appId,nextLink:u.observable(f),searchText:u.observable(r),client:t.client,appName:t.appName,userNameOrUpn:t.userNameOrUpn,signInStatus:t.signInStatus}).catch((function(n){return s.processReportingAPIError(n)}))}},processServerResponse:function(n){return{data:n.items,navigationMetadata:{continuationToken:n.nextLink}}},supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEvents","GetSignInEvents","Retrieve list of sign in events",n,t,i,r,u,e)}}),l.signInEventsRestrictedListQuery=new i.Data.QueryCache({entityTypeName:h.SignInEventRestrictedType,sourceUri:function(n){return r.reportingEventsUri.format(e.EventNames.signInEventsRestricted,encodeURIComponent(u.toJSON(n)))},poll:!1,navigation:{loadByContinuationToken:function(n,t,i,r){var f=i?"":n.metadata()?n.metadata().continuationToken:"";return t.searchText=u.observable(r),n.fetch({startDateTime:t.startDateTime,endDateTime:t.endDateTime,userObjectId:t.userObjectId,appId:t.appId,nextLink:u.observable(f),searchText:u.observable(r),client:t.client,appName:t.appName,userNameOrUpn:t.userNameOrUpn,signInStatus:t.signInStatus}).catch((function(n){return s.processReportingAPIError(n)}))}},processServerResponse:function(n){return{data:n.items,navigationMetadata:{continuationToken:n.nextLink}}},supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEventsRestricted","GetSignInEventsRestricted","Retrieve list of restricted sign in events",n,t,i,r,u,e)}}),l.applicationsUsageSummaryEventsQuery=new i.Data.QueryCache({entityTypeName:h.ApplicationsUsageSummaryEventType,sourceUri:function(n){return r.reportingEventsUri.format(e.EventNames.signInEventsApplicationSummaryData,encodeURIComponent(u.toJSON(n)))},poll:!1,processServerResponse:function(n){return{data:n.items,navigationMetadata:{continuationToken:n.nextLink}}},supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetAppUsageSummaryEvents","GetAppUsageSummaryEvents","Retrieve list of AppUsageSummary event deatils",n,t,i,r,u,e)}}),l.groupsActivitySummaryQuery=new i.Data.QueryCache({entityTypeName:h.GroupsActivitySummaryType,sourceUri:function(n){return r.groupsActivitySummaryUriTemplate.format(u.toJSON(n))},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetGroupsActivity","GetGroupsActivity","Retrieve list of GroupsActivity details",n,t,i,r,u,e)}}),l.usersActivitySummaryQuery=new i.Data.QueryCache({entityTypeName:h.UsersActivitySummaryType,sourceUri:function(n){return r.usersActivitySummaryUriTemplate.format(u.toJSON(n))},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetUsersActivity","GetUsersActivity","Retrieve list of UsersActivity details",n,t,i,r,u,e)}}),l.signInEventsSummaryQuery=new i.Data.EntityCache({entityTypeName:h.SignInEventsSummaryType,sourceUri:function(n){return r.reportingEventsUri.format(e.EventNames.signInEventsSummary,encodeURIComponent(u.toJSON(n)))},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEventsSummary","GetSignInEventsSummary","Retrieve list of SignInEventsSummary details",n,t,i,r,u,e)}}),l.servicePrincipalDetailsEntity=new i.Data.EntityCache({entityTypeName:h.ServicePrincipalType,sourceUri:function(n){return r.servicePrincipalDetailsUriTemplate.format(n.appId())},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyDataPerTargetObject(l.businessScenarios.reports(),"GetServicePrincipalDetails","GetServicePrincipalDetails","Get service principal details",u.appId(),"ServicePrincipal",n,t,i,r,u,e)}}),l.userDetailsEntity=new i.Data.EntityCache({entityTypeName:h.UserType,sourceUri:function(n){return r.userDetailsUriTemplate.format(n.userId())},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyDataPerTargetObject(l.businessScenarios.reports(),"GetUserDetails","GetUserDetails","Get user details",u.userId(),"User",n,t,i,r,u,e)}}),l.groupDetailsEntity=new i.Data.EntityCache({entityTypeName:h.GroupType,sourceUri:function(n){return r.groupDetailsUriTemplate.format(n.groupId())},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyDataPerTargetObject(l.businessScenarios.reports(),"GetGroupDetails","GetGroupDetails","Get group details",u.groupId(),"User",n,t,i,r,u,e)}}),l.appDetailsEntity=new i.Data.EntityCache({entityTypeName:ApplicationManagement.EnterpriseApplicationPropertiesType,sourceUri:function(n){return r.appDetailsUriTemplate.format(encodeURIComponent(n.objectId.toString()),encodeURI(n.appId.toString()))},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyDataPerTargetObject(l.businessScenarios.reports(),"GetAppDetails","GetAppDetails","Get application details",u.objectId,"Application",n,t,i,r,u,e)}}),l.signInEventDetailsEntity=new i.Data.EntityCache({entityTypeName:h.SignInEventType,sourceUri:function(n){return r.signInEventByIdUriTemplate.format(e.EventNames.signInEvents,encodeURIComponent(n.eventId()))},findCachedEntity:{queryCache:l.signInEventsListQuery,entityMatchesId:function(n,t){return n.id()===t.eventId()}},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEvent","GetSignInEvent","Retrieve sign in event by event ID",n,t,i,r,u,e)},extendEntryLifetimes:!0}),l.signInEventRestrictedDetailsEntity=new i.Data.EntityCache({entityTypeName:h.SignInEventRestrictedType,sourceUri:function(n){return r.signInEventByIdUriTemplate.format(e.EventNames.signInEventsRestricted,encodeURIComponent(n.eventId()))},findCachedEntity:{queryCache:l.signInEventsRestrictedListQuery,entityMatchesId:function(n,t){return n.id()===t.eventId()}},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEventRestricted","GetSignInEventRestricted","Retrieve restricted sign in event by event ID",n,t,i,r,u,e)},extendEntryLifetimes:!0}),l.auditEventsListQuery=new i.Data.QueryCache({entityTypeName:h.AuditEventType,sourceUri:function(n){return r.reportingEventsUri.format(e.EventNames.AuditEvents,encodeURIComponent(u.toJSON(n)))},poll:!1,navigation:{loadByContinuationToken:function(n,t,i,r){var f=i?"":n.metadata()?n.metadata().continuationToken:"";return n.fetch({activityType:t.activityType,actorObjectId:t.actorObjectId,targetObjectId:t.targetObjectId,startDateTime:t.startDateTime,endDateTime:t.endDateTime,nextLink:u.observable(f),searchText:u.observable(r),actor:t.actor,target:t.target,activity:t.activity,category:t.category,source:t.source,isActivityExactMatch:t.isActivityExactMatch}).catch((function(n){return s.processReportingAPIError(n)}))}},processServerResponse:function(n){return{data:n.items,navigationMetadata:{continuationToken:n.nextLink}}},supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetAuditEvents","GetAuditEvents","Retrieve list of audit events",n,t,i,r,u,e)}}),l.auditEventDetailsEntity=new i.Data.EntityCache({entityTypeName:h.AuditEventType,sourceUri:function(n){return r.signInEventByIdUriTemplate.format(e.EventNames.AuditEvents,encodeURIComponent(n.eventId()))},findCachedEntity:{queryCache:l.auditEventsListQuery,entityMatchesId:function(n,t){return n.id()===t.eventId()}},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetAuditEventDetails","GetAuditEventDetails","Retrieve audit event details",n,t,i,r,u,e)},extendEntryLifetimes:!0}),l.auditActivityTypeEntity=new i.Data.EntityCache({entityTypeName:h.AuditActivityEntityType,sourceUri:function(){return r.auditActivityTypesUri},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetAuditActivityTypes","GetAuditActivityTypes","Retrieve audit activity types",n,t,i,r,u,e)}}),l.signInRiskEvents=new i.Data.QueryCache({entityTypeName:Reports.SignInEvents.RiskEventType,serializeParams:function(n){return encodeURIComponent(u.toJSON(n))},sourceUri:function(n){return r.signInRiskEventsUri.format(encodeURIComponent(n.eventId()))},poll:!1,navigation:{loadByContinuationToken:function(n,t,i){var r=n.fetch(t).catch((function(n){return s.processReportingAPIError(n)}));return i&&(r=n.refresh()),r}},supplyData:function(n,t,i,r,e){var o=u.toJSON(e);return f.AuthenticatedToAdIbizaUx.trackedSupplyData(l.businessScenarios.reports(),"GetSignInEvents","GetSignInRiskEvents","Retrieve list of risk events for a sign-in","POST",t,i,o,null,null)},processServerResponse:function(n){return{data:n}}}),l.featureConfigurations=o,l}return __extends(r,n),r})(o.BaseArea);c.reportingEventsUri="/api/Reports/{0}?request={1}";c.reportingEventsV2Uri="/api/Reports/{0}";c.signInEventByIdUriTemplate="/api/Reports/{0}/{1}";c.signInRiskEventsUri="/api/Reports/SignInEventsV2/{0}/RiskEvents";c.groupsActivitySummaryUriTemplate="/api/Reports/GroupsActivitySummary?request={0}";c.usersActivitySummaryUriTemplate="/api/Reports/UsersActivitySummary?request={0}";c.signInEventsSummaryUriTemplate="/api/Reports/SignInEventsSummary?request={0}";c.servicePrincipalDetailsUriTemplate="api/Reports/ServicePrincipals/{0}";c.groupDetailsUriTemplate="api/Reports/Groups/{0}";c.userDetailsUriTemplate="api/Reports/Users/{0}";c.appDetailsUriTemplate="api/EnterpriseApplications/{0}/Properties?appId={1}";c.auditActivityTypesUri="api/Reports/AuditActivityTypes";t.DataContext=c}))