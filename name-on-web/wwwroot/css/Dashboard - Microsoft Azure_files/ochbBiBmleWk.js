define("Directories/DirectoriesArea",["require","exports","f","o","ko","Shared/AjaxExtensions","CommonConstants","Shared/Logger","Shared/DirectoryCache","Shared/BaseArea","Directories/Utilities/DirectoriesUtils","Directories/Constants","Directories/PassThroughAuthenticationData","Directories/ViewModels/DirectoryOverview/DirectoryWhatsNewDataGenerated"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v){"use strict";function rt(n){return d.createLogger(n)}var y,p,d;r.defineProperty(t,"__esModule",{value:!0});y=Directories.DataModels;p=Devices.DataModels;t.AreaName="Directories";d=o.createLoggerSource(t.AreaName);t.createLogger=rt;var ut=i.Base.Resources.getAppRelativeUri("/api/Directory"),w=i.Base.Resources.getAppRelativeUri("/api/Directories"),ft=i.Base.Resources.getAppRelativeUri("/api/Directories/B2C"),et=i.Base.Resources.getAppRelativeUri("/api/Directories/Properties"),ot=i.Base.Resources.getAppRelativeUri("/api/Directories/PropertiesV2"),g=i.Base.Resources.getAppRelativeUri("api/Directories/SsgmProperties/"),b=i.Base.Resources.getAppRelativeUri("api/Directories/LcmSettings"),st=i.Base.Resources.getAppRelativeUri("api/Directories/LcmGroups?policyIdentifier={0}&nextLink={1}"),ht=i.Base.Resources.getAppRelativeUri("api/Directories/IsTenantSSGMLCMTestTenant"),ct=i.Base.Resources.getAppRelativeUri("api/Directories/IsTenantPresentInSSGMLCMWhitelist"),k=i.Base.Resources.getAppRelativeUri("/api/DeviceSetting"),lt=i.Base.Resources.getAppRelativeUri("/api/Directories/DomainAvailability"),nt=i.Base.Resources.getAppRelativeUri("/api/Directories/DirectoryWhatsNew?top={0}"),at=i.Base.Resources.getAppRelativeUri("/api/Directories/RecommendedPayloads?top={0}"),vt=i.Base.Resources.getAppRelativeUri("api/Directories/ADConnectStatus"),yt=i.Base.Resources.getAppRelativeUri("api/Directories/GetSeamlessSingleSignOnDomains"),pt=i.Base.Resources.getAppRelativeUri("api/Directories/Summary"),wt=i.Base.Resources.getAppRelativeUri("/api/Users/IsUPNInAllowedDomain?userUPN={0}"),tt=i.Base.Resources.getAppRelativeUri("api/Directories/DeletionRestrictions"),bt=i.Base.Resources.getAppRelativeUri("api/LoginTenantBrandings/BannerImage/{0}"),kt=i.Base.Resources.getAppRelativeUri("api/Directories/GetPasswordSyncStatus"),dt=i.Base.Resources.getAppRelativeUri("/api/Users/Invite"),gt=i.Base.Resources.getAppRelativeUri("/api/Users/ReInvite"),it=i.Base.Resources.getAppRelativeUri("/api/Directories/FeatureSettingsProperties"),ni=(function(n){function r(r,o,h,c,d,rt,ft,ht,ct){var dt=n.call(this,t.AreaName,Directories.ErrorCodes.ErrorCodesType)||this;return dt.sharedDataContext=o,dt.usersDataContext=h,dt.groupsDataContext=c,dt.licensesDataContext=d,dt.enterpriseApplicationsDataContext=rt,dt.registeredAppsDataContext=ft,dt.reportsDataContext=ht,dt.featureConfigurationsContext=ct,dt.directoryCreatedNotifier=u.observable(),dt.directoryDeletedNotifier=u.observable(),dt.directoryEditedNotifier=u.observable(),dt.adConnectStatusEntity=new i.Data.EntityCache({entityTypeName:y.ADConnectStatusType,sourceUri:function(){return vt},poll:!1,extendEntryLifetimes:!0,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetAdConnectStatus","GetAdConnectStatus","Gets directory synchronization status for current tenant",n,t,i,r,u,e)}}),dt.seamlessSingleSignOnDomainsEntity=new i.Data.QueryCache({entityTypeName:y.SeamlessSingleSignOnDomainType,sourceUri:function(){return yt},poll:!1,extendEntryLifetimes:!0,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"SeamlessSingleSignOn","GetSeamlessSingleSignOnDomains","Retrieving the list of on-premises domains configured for seamless single sign on.",n,t,i,r,u,e)}}),dt.passwordSyncStatusEntity=new i.Data.EntityCache({sourceUri:function(){return kt},poll:!1,extendEntryLifetimes:!0,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetPasswordSync","GetPasswordSync","Get the password sync enablement status.",n,t,i,r,u,e)}}),dt.directoryEntity=new i.Data.EntityCache({entityTypeName:y.DirectoryType,extendEntryLifetimes:!0,sourceUri:function(){return ut},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetDirectory","GetDirectory","Get single directory user is signed in to",n,t,i,r,u,e)}}),dt.directoryDeletionRestrictionEntity=new i.Data.EntityCache({sourceUri:i.Data.uriFormatter(tt+"/{id}",!0),poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"ValidateDirectoryDeletionRestriction","ValidateDirectoryDeletionRestriction","Validate a directory deletion restriction",n,t,i,r,u,e)}}),dt.directoryDeletionRestrictionsQuery=new i.Data.QueryCache({entityTypeName:"string",sourceUri:function(){return tt},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"ListDirectoryDeletionRestriction","ListDirectoryDeletionRestriction","Retrieve the list of directory deletion restrictions",n,t,i,r,u,e)}}),dt.loginTenantBrandingBannerImageUriCache=new i.Data.EntityCache({sourceUri:function(n){return bt.format(n)},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.loginTenantBranding(),"GetBannerImageUri","GetBannerImageUri","Get banner image uri for scpecified locale",n,t,i,r,u,e)}}),dt.directoriesPropertiesEditScopeCache=i.Data.EditScopeCache.createNew({dataCache:dt.directoryEntity,entityTypeName:y.DirectoryType,serializeParams:function(){return"#"},saveEditScopeChanges:function(n,t){var r=t.root;return f.AuthenticatedToAdIbizaUx.trackedAjaxPerTargetObject(dt.businessScenarios.directoryManagement(),"UpdateDirectoryProperties","UpdateDirectoryProperties","Update the properties of a directory",r.objectId(),"Directory",{uri:w,type:e.httpVerbs.put,data:u.toJSON(r),contentType:e.httpContentTypes.applicationJson}).then((function(){return s.DirectoryCache.updateCachedDirectoryName(r.displayName(),r.objectId()),dt.directoryEditedNotifier.notifySubscribers(r),dt.crossAreaNotifiers.directoryEditedNotifier.notifySubscribers({}),{action:i.Data.AcceptEditScopeChangesAction.AcceptClientChanges}}))}}),dt.directoryAddScopeCache=dt._createNewDirectoryAddScope(!1),dt.directoryAddB2CScopeCache=dt._createNewDirectoryAddScope(!0),dt.passThroughAuthDataContext=new a.PassThroughAuthenticationData,dt.validateInitialDomainPrefixIsAvailableEntityCache=new i.Data.EntityCache({sourceUri:i.Data.uriFormatter(lt+"/{id}",!0),poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"ValidateInitialDomainPrefix","ValidateInitialDomainPrefix","Validate the initial domain prefix",n,t,i,r,u,e)}}),dt.directoryPropertiesEntity=new i.Data.EntityCache({entityTypeName:y.DirectoryPropertiesType,extendEntryLifetimes:!0,sourceUri:function(){return et},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetDirectoryProperties","GetDirectoryProperties","Get the properties of the current directory",n,t,i,r,u,e)}}),dt.directorySsgmPropertiesEntity=new i.Data.EntityCache({entityTypeName:y.DirectoryPropertiesType,extendEntryLifetimes:!0,sourceUri:function(){return g},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetSsgmProperties","GetSsgmProperties","Get the SSGM properties of the current directory",n,t,i,r,u,e)}}),dt.directorySsgmLcmSettingsEntity=new i.Data.EntityCache({entityTypeName:y.LifecycleSettingsType,sourceUri:function(){return b},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetSsgmLcmProperties","GetSsgmLcmProperties","Get the SSGM LCM properties of the current directory",n,t,i,r,u,e)}}),dt.getLcmSpecificGroups=new i.Data.QueryCache({entityTypeName:y.LifecycleGroupType,sourceUri:function(n){var t=encodeURIComponent(n.nextLink),i=encodeURIComponent(n.policyIdentifier);return st.format(i,t)},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetLcmGroups","GetLcmGroups","List LCM groups",n,t,i,r,u,e)},navigation:{loadByContinuationToken:function(n,t,i){return t.nextLink=i?"":n.metadata()?n.metadata().continuationToken:"",n.fetch(t)}},processServerResponse:function(n){return{data:n.groups,navigationMetadata:{continuationToken:n.nextLink}}}}),dt.deviceSettingsEntity=new i.Data.EntityCache({entityTypeName:p.DeviceSettingsType,sourceUri:function(){return k},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.deviceManagement(),"GetDeviceSettings","GetDeviceSettings","Get device settings",n,t,i,r,u,e)}}),dt.directoryUsersSummaryQuery=new i.Data.QueryCache({entityTypeName:y.UsersSummaryItemType,sourceUri:function(){return pt},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetDirectoryUsersSummary","GetDirectoryUsersSummary","List directory users and groups",n,t,i,r,u,e)}}),dt.DirectoryUserSettingsEditScopeCache=i.Data.EditScopeCache.createNew({dataCache:dt.directoryPropertiesEntity,entityTypeName:y.DirectoryPropertiesType,serializeParams:function(){return"#"},saveEditScopeChanges:function(n,t){var r=t.root,s=t.getOriginal(r),o={};return r.usersCanRegisterApps()!==s.usersCanRegisterApps()&&(o.usersCanRegisterApps=r.usersCanRegisterApps()),r.restrictNonAdminUsers()!==s.restrictNonAdminUsers()&&(o.restrictNonAdminUsers=r.restrictNonAdminUsers()),r.enableLinkedInAppFamily()!==s.enableLinkedInAppFamily()&&(o.enableLinkedInAppFamily=r.enableLinkedInAppFamily()),r.toEnableLinkedInUsers()&&r.toEnableLinkedInUsers().length>0&&(o.toEnableLinkedInUsers=r.toEnableLinkedInUsers()),r.toDisableLinkedInUsers()&&r.toDisableLinkedInUsers().length>0&&(o.toDisableLinkedInUsers=r.toDisableLinkedInUsers()),f.AuthenticatedToAdIbizaUx.trackedAjax(dt.businessScenarios.directoryManagement(),"UpdateDirectoryUserSettings","UpdateDirectoryUserSettings","Update directory user settings",{uri:ot,type:e.httpVerbs.put,data:u.toJSON(o),contentType:e.httpContentTypes.applicationJson}).then((function(){return{action:i.Data.AcceptEditScopeChangesAction.AcceptClientChanges}}))}}),dt.getFeatureSettingsPropertiesEntityCache=new i.Data.EntityCache({entityTypeName:y.FeatureSettingsPropertiesType,extendEntryLifetimes:!1,sourceUri:function(){return it},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.featuresSettings(),"GetFeaturesSettingsProperties","GetFeaturesSettingsProperties","Get the features settings properties",n,t,i,r,u,e)}}),dt.DirectoryGroupSettingsEditScopeCache=i.Data.EditScopeCache.createNew({dataCache:dt.directorySsgmPropertiesEntity,entityTypeName:y.DirectoryPropertiesType,serializeParams:function(){return"#"},saveEditScopeChanges:function(n,t){var r=t.root,s=t.getOriginal(r),o={};return r.allUsersGroupEnabled()!==s.allUsersGroupEnabled()&&(o[l.groupDirectoryOptions.allUsersGroupEnabled]=String(r.allUsersGroupEnabled())),r.securityGroupsEnabled()!==s.securityGroupsEnabled()&&(o[l.groupDirectoryOptions.usersCanCreateGroups]=String(r.securityGroupsEnabled())),r.office365GroupsEnabled()!==s.office365GroupsEnabled()&&(o[l.groupDirectoryOptions.usersCanCreateUnifiedGroups]=String(r.office365GroupsEnabled())),r.groupsInAccessPanelEnabled()!==s.groupsInAccessPanelEnabled()&&(o[l.groupDirectoryOptions.groupsInAccessPanelEnabled]=String(r.groupsInAccessPanelEnabled())),r.selfServiceGroupManagementEnabled()!==s.selfServiceGroupManagementEnabled()&&(o[l.groupDirectoryOptions.userDelegationEnabled]=String(r.selfServiceGroupManagementEnabled())),r.usersCanManageOfficeGroups()!==s.usersCanManageOfficeGroups()&&(o[l.groupDirectoryOptions.usersCanManageOfficeGroups]=r.usersCanManageOfficeGroups()),r.usersCanManageSecurityGroups()!==s.usersCanManageSecurityGroups()&&(o[l.groupDirectoryOptions.usersCanManageSecurityGroups]=r.usersCanManageSecurityGroups()),r.scopingGroupIdForManagingOfficeGroups()!==s.scopingGroupIdForManagingOfficeGroups()&&(o[l.groupDirectoryOptions.usersCanManageOfficeGroups]=r.usersCanManageOfficeGroups(),o[l.groupDirectoryOptions.scopingGroupIdForManagingOfficeGroups]=r.scopingGroupIdForManagingOfficeGroups(),o[l.groupDirectoryOptions.scopingGroupNameForManagingOfficeGroups]=r.scopingGroupNameForManagingOfficeGroups()),r.scopingGroupIdForManagingSecurityGroups()!==s.scopingGroupIdForManagingSecurityGroups()&&(o[l.groupDirectoryOptions.usersCanManageSecurityGroups]=r.usersCanManageSecurityGroups(),o[l.groupDirectoryOptions.scopingGroupIdForManagingSecurityGroups]=r.scopingGroupIdForManagingSecurityGroups(),o[l.groupDirectoryOptions.scopingGroupNameForManagingSecurityGroups]=r.scopingGroupNameForManagingSecurityGroups()),f.AuthenticatedToAdIbizaUx.trackedAjax(dt.businessScenarios.directoryManagement(),"UpdateDirectoryGroupSettings","UpdateDirectoryGroupSettings","Update directory group settings",{uri:g,type:e.httpVerbs.put,data:u.toJSON(o),contentType:e.httpContentTypes.applicationJson}).then((function(){return{action:i.Data.AcceptEditScopeChangesAction.AcceptClientChanges}}))}}),dt.DirectoryGroupLifecycleSettingsEditScopeCache=i.Data.EditScopeCache.createNew({dataCache:dt.directorySsgmLcmSettingsEntity,entityTypeName:y.LifecycleSettingsType,serializeParams:function(){return"#"},saveEditScopeChanges:function(n,t){var r=t.root;return f.AuthenticatedToAdIbizaUx.trackedAjax(dt.businessScenarios.directoryManagement(),"UpdateDirectoryGroupLifecycleSettings","UpdateDirectoryGroupLifecycleSettings","Update directory group lifecycle settings",{uri:b,type:e.httpVerbs.put,data:u.toJSON(r),contentType:e.httpContentTypes.applicationJson}).then((function(){return dt.getLcmSpecificGroups.refreshAll(),{action:i.Data.AcceptEditScopeChangesAction.AcceptClientChanges}}))}}),dt.directoryWhatsNewListQuery=new i.Data.QueryCache({entityTypeName:y.WhatsNewContentType,sourceUri:function(){return nt},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetWhatsNewIdentifiers","GetWhatsNewIdentifiers","Get content for what's new tile",n,t,i,r,u,e)}}),dt.DirectoryDeviceSettingsEditScopeCache=i.Data.EditScopeCache.createNew({dataCache:dt.deviceSettingsEntity,entityTypeName:p.DeviceSettingsType,serializeParams:function(){return"#"},saveEditScopeChanges:function(n,t){return f.AuthenticatedToAdIbizaUx.trackedAjax(dt.businessScenarios.directoryManagement(),"UpdateDirectoryDeviceSettings","UpdateDirectoryDeviceSettings","Update directory device settings",{uri:k,type:e.httpVerbs.put,data:u.toJSON(t.root),contentType:e.httpContentTypes.applicationJson})}}),dt.getWhatsNewIdentifiers=new i.Data.QueryCache({entityTypeName:y.CohortPayloadV2Type,sourceUri:function(n){return nt.format(n.top)},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetWhatsNewIdentifiers","GetWhatsNewIdentifiers","Get content for what's new tile",n,t,i,r,u,e)}}),dt.getOverviewRecommendedPayloads=new i.Data.QueryCache({entityTypeName:y.CohortPayloadContentRecommendedType,sourceUri:function(n){return at.format(n.top)},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"GetOverviewRecommendedPayloads","GetOverviewRecommendedPayloads","Get content for recommended tile",n,t,i,r,u,e)}}),dt.userIsUPNInAllowedDomainEntity=new i.Data.EntityCache({sourceUri:function(n){return wt.format(n)},poll:!1,supplyData:function(n,t,i,r,u,e){return f.AuthenticatedToAdIbizaUx.trackedSupplyData(dt.businessScenarios.directoryManagement(),"IsUpnInAllowedDomain","IsUpnInAllowedDomain","Check if UPN is in one of the verified domains",n,t,i,r,u,e)}}),dt.getWhatsNewQuery=new i.Data.QueryCache({sourceUri:function(){return i.Base.Resources.getAppRelativeUri("api/Directories/WhatsNew")},extendEntryLifetimes:!0,poll:!1,supplyData:function(n,t,i,r,u){return Q().then((function(){return v.whatsNewItems.filter((function(n){return n.date()>=u}))}))}}),dt.getWhatsNewEntity=new i.Data.EntityCache({sourceUri:function(){return i.Base.Resources.getAppRelativeUri("api/Directories/WhatsNew")},extendEntryLifetimes:!1,poll:!1,supplyData:function(n,t,r,u,f){return Q().then((function(){return i.find(v.whatsNewItems,(function(n){return n.id()===f}))}))}}),dt.crossAreaNotifiers=r,dt.featureConfigurations=ct,dt}return __extends(r,n),r.prototype.getInvitePromise=function(n,t){n.passwordProfile=null;var r={userToInvite:u.observable(n),inviteMessage:u.observable(t)};return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.userManagement(),"InviteUser","InviteUser","Invites user",{uri:i.Base.Resources.getAppRelativeUri(dt),type:e.httpVerbs.put,data:u.toJSON(r),contentType:e.httpContentTypes.applicationJson})},r.prototype.getReInvitePromise=function(n,t){n.passwordProfile=null;var r={userToInvite:u.observable(n),inviteMessage:u.observable(t)};return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.userManagement(),"ReInviteUser","ReInviteUser","Re-invites user",{uri:i.Base.Resources.getAppRelativeUri(gt),type:e.httpVerbs.put,data:u.toJSON(r),contentType:e.httpContentTypes.applicationJson})},r.prototype.setFeatureSettingsProperties=function(n,t){var i=this;return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.featuresSettings(),"SetFeaturesSettingsProperties","SetFeaturesSettingsProperties","Updates the features settings properties",{uri:it,type:e.httpVerbs.put,data:u.toJSON(n),contentType:e.httpContentTypes.applicationJson}).then((function(n){return i.getFeatureSettingsPropertiesEntityCache.applyChanges((function(n,i){i.data(t)})),n}))},r.prototype.getLcmPolicy=function(){return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.directoryManagement(),"GetLcmPolicy","GetLcmPolicy","Get LCM policy",{uri:b,type:e.httpVerbs.get})},r.prototype.isTenantPresentInSSGMLCMWhitelist=function(){return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.directoryManagement(),"IsTenantPresentInSsgmLcmWhitelist","IsTenantPresentInSsgmLcmWhitelist","Check if tenant is in SSGM LCM whitelist",{uri:ct,type:e.httpVerbs.get})},r.prototype.isTenantSSGMLCMTestTenant=function(){return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.directoryManagement(),"IsTenantSsgmLcmTestTenant","IsTenantSsgmLcmTestTenant","Check if the tenant is SSGM LCM test tenant",{uri:ht,type:e.httpVerbs.get})},r.prototype.updateDeviceSettingQuery=function(n){return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.deviceManagement(),"UpdateDeviceSettings","UpdateDeviceSettings","Update device settings",{uri:k,type:e.httpVerbs.put,data:u.toJSON(n),contentType:e.httpContentTypes.applicationJson})},r.prototype.deleteDirectory=function(){var n=this;return f.AuthenticatedToAdIbizaUx.trackedAjax(this.businessScenarios.directoryManagement(),"DeleteDirectory","DeleteDirectory","Delete a directory",{uri:w,type:e.httpVerbs.delete}).then((function(t){n.directoryDeletedNotifier(t)}))},r.prototype._createNewDirectoryAddScope=function(n){var t=this;return i.Data.EditScopeCache.createNew({supplyNewData:function(){return{companyName:u.observable(""),countryCode:u.observable(c.defaultCountryCode()),initialDomainPrefix:u.observable("")}},saveEditScopeChanges:function(r,o){var c=o.root,s,h;return n?(s="CreateB2CDirectory",h=ft):(s="CreateDirectory",h=w),f.AuthenticatedToAdIbizaUx.trackedAjax(t.businessScenarios.directoryManagement(),s,s,"Create a directory",{uri:h,type:e.httpVerbs.post,data:u.toJSON(c),contentType:e.httpContentTypes.applicationJson}).then((function(){return t.directoryCreatedNotifier(c),{action:i.Data.AcceptEditScopeChangesAction.AcceptClientChanges}}))}})},r})(h.BaseArea);t.DataContext=ni}));
define("Directories/ViewModels/ActiveDirectoryMenuBladeViewModel",["require","exports","f","o","ko","Permissions/Permission","Shared/MenuItems/AuthenticationMethods","_generated/BladeReferences","Fx/Composition/MenuBlade","CommonResources","CommonConstants","Shared/MenuItems/ConditionalAccess","Directories/DirectoriesArea","Directories/Constants","Shared/DirectoryCache","Shared/MenuItems/MfaServer","Reports/Constants","Shared/MenuItems/RiskySignIns","Shared/Utilities","Shared/MenuItems/SupportAndTroubleshoot","_generated/Svg","Shared/MenuItems/UsersAtRisk"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p,w,b,k,d,g,nt){"use strict";function ht(n,t,i,r){var u=ut?[n,t,r]:[n,t,i,r],f;return k.isTroubleShootEnabled()&&(f=d.create(c.menuIds.supportTroubleshoot,c.menuIds.troubleShootMenuId,c.menuIds.supportRequestMenuId,v.directoryTroubleshootTag),u.push(f)),u}function ot(n){return k.isIpcV2Enabled()?new o.SignInEventsV3BladeReference(n):k.isSignInsV2Enabled()?new o.SignInEventsV2BladeReference(n):new o.SignInEventsBladeReference(n)}var rt;r.defineProperty(t,"__esModule",{value:!0});var tt=i.Base.Images.Polychromatic,st=g.PortalExtension.ADExtension.Client.Directories.Images,et=c.DateRangePickerValues,it=c.menuIds.security,ut=k.isSecurityAreaEnabled(),ft=a.createLogger("ActiveDirectoryMenuBladeViewModel");t.signInsBladeReference=ot;rt=(function(){function n(){var n=this;this.title=h.loading;this.subtitle="";this._isQuickStartMenuItemEnabled=u.observable(!1);this._isUsersAndGroupsEnabled=u.observable(!1);this._isEnterpriseAppsEnabled=u.observable(!1);this._isRegisteredAppsEnabled=u.observable(!1);this._isLicensesMenuEnabled=u.observable(!1);this._isLoginTenantBrandingEnabled=u.observable(!1);this._isSelfServicePasswordResetEnabled=u.observable(!1);this._isAzureADConnectEnabled=u.observable(!1);this._isDomainNamesEnabled=u.observable(!1);this._isMobilityMenuEnabled=u.observable(!1);this._isUserSettingsEnabled=u.observable(!1);this._isDirectoryPropertiesEnabled=u.observable(!1);this._isNotificationMenuGroupEnabled=u.observable(!1);this._isPoliciesEnabled=u.observable(!1);this._isReportsEnabled=u.observable(!1);this._isSecurityMenuEnabled=u.observable(!1);this._isMultifactorAuthenticationMenuEnabled=u.observable(!1);this._isDevicesEnabled=u.observable(!1);this._isApplicationProxyTenantSettingsEnabled=u.observable(!1);this._isCompanyRelationshipsEnabled=u.observable(!1);this._currentTenantId=u.observable("");this._quickAccessMenuGroup={displayText:i.Assets.QuickAccessGroupId,id:i.Assets.QuickAccessGroupId,items:[{id:c.menuIds.overviewMenuId,displayText:h.menuItemOverview,icon:tt.Info(),supplyBladeReference:function(){return new o.ActiveDirectoryOverviewBladeReference}},{id:c.menuIds.directoryQuickStartMenuId,displayText:h.menuItemQuickStart,icon:g.PortalExtension.ADExtension.Client.Directories.Images.quickStart,supplyBladeReference:function(){return new o.ActiveDirectoryQuickStartBladeReference},visible:u.observable(k.isQuickStartEnabled()),enabled:this._isQuickStartMenuItemEnabled},{id:"AadDiagnostics",displayText:h.diagnosticsBladeTitle,icon:st.troubleshootIcon,supplyBladeReference:function(){return new o.IdentityDiagnosticsFrameBladeReference},enabled:u.observable(k.isIdentityDiagnosticsEnabled()),visible:u.observable(k.isIdentityDiagnosticsEnabled())}]};this._manageMenuGroup={displayText:h.menuGroupManage,id:c.menuIds.manageGroupID,items:[{id:c.menuIds.usersMenuId,displayText:h.menuItemUsers,icon:i.Base.Images.Person(),supplyBladeReference:function(){return new o.UsersManagementMenuBladeReference(null)},enabled:this._isUsersAndGroupsEnabled},{id:c.menuIds.groupsMenuId,displayText:h.menuItemGroups,icon:g.PortalExtension.ADExtension.Client.Groups.Images.defaultGroup_nobkg,supplyBladeReference:function(){return new o.GroupsManagementMenuBladeReference(null)},enabled:this._isUsersAndGroupsEnabled},{id:c.menuIds.companyRelationshipsMenuId,displayText:h.menuItemCompanyRelationships,icon:g.PortalExtension.ADExtension.Client.B2B.Images.organizationalRelationships,supplyBladeReference:function(){return new o.CompanyRelationshipsMenuBladeReference(null)},enabled:this._isCompanyRelationshipsEnabled,visible:u.observable(i.isFeatureEnabled("B2B"))},{id:c.menuIds.directoryRolesMenuId,displayText:h.menuItemRoles,icon:i.Base.Images.Person(),supplyBladeReference:function(){return new o.AllRolesBladeReference({adminUnitObjectId:""})},visible:u.observable(k.isRolesEnabled())},{id:c.menuIds.adminUnitMenuId,displayText:h.menuItemAdminUnit,icon:g.PortalExtension.ADExtension.Client.AdminUnit.Images.adminUnit,supplyBladeReference:function(){return new o.AdminUnitManagementBladeReference(null)},visible:u.observable(k.isAdminUnitEnabled()),enabled:u.observable(!0)},{id:c.menuIds.directoryEnterpriseAppsMenuId,displayText:h.menuItemEnterpriseApps,icon:g.PortalExtension.ADExtension.Client.ApplicationManagement.Images.enterpriseApps,supplyBladeReference:function(){return new o.StartboardApplicationsMenuBladeReference({menuId:null})},enabled:this._isEnterpriseAppsEnabled},{id:c.menuIds.devicesMenuId,displayText:h.menuItemDevices,icon:g.PortalExtension.ADExtension.Client.Groups.Images.genericDevice,supplyBladeReference:function(){return new o.DevicesMenuBladeReference({menuId:null})},enabled:this._isDevicesEnabled,visible:u.observable(k.isGlobalDeviceManagementEnabled())},{id:c.menuIds.directoryRegisteredAppsMenuId,displayText:h.menuItemRegisteredApps,icon:g.PortalExtension.ADExtension.Client.RegisteredApps.Images.registeredApps,supplyBladeReference:function(){return new o.ApplicationsListBladeReference},enabled:this._isRegisteredAppsEnabled},{id:c.menuIds.appsAppProxyMenuId,displayText:h.menuItemApplicationProxy,icon:g.PortalExtension.ADExtension.Client.ApplicationManagement.Images.appProxy,supplyBladeReference:function(){return new o.AppProxyOverviewBladeReference},enabled:this._isApplicationProxyTenantSettingsEnabled},{id:c.menuIds.licensesMenuId,displayText:h.menuItemLicenses,icon:g.PortalExtension.ADExtension.Client.Licenses.Images.licenses,supplyBladeReference:function(){return new o.LicensesMenuBladeReference},visible:u.observable(k.isLicensesFeatureEnabled()),enabled:this._isLicensesMenuEnabled},{id:c.menuIds.directoryAzureADConnectMenuId,displayText:h.menuItemAzureADConnect,icon:tt.ActiveDirectory(),supplyBladeReference:function(){return new o.DirectoriesADConnectBladeReference},enabled:this._isAzureADConnectEnabled},{id:c.menuIds.domainsMenuId,displayText:h.menuItemDomains,icon:tt.Certificate(),supplyBladeReference:function(){return new o.DomainsListBladeReference},enabled:this._isDomainNamesEnabled},{id:c.menuIds.mobilityMenuId,displayText:h.menuItemMobility,icon:g.PortalExtension.ADExtension.Client.ApplicationManagement.Images.appProvisioning,supplyBladeReference:function(){return new o.MdmAppsListBladeV2Reference},visible:u.observable(this._isMDMEnabled()),enabled:this._isMobilityMenuEnabled},{id:c.menuIds.passwordResetMenuId,displayText:h.menuItemPasswordReset,icon:tt.Key(),supplyBladeReferenceAsync:function(){return n.context.model.featureConfigurations.fetchFeatureConfigurations(n.context.container).then((function(n){return!!n&&f.isFeatureEnabledAndAvailable(n.selfServicePasswordReset)?new o.PasswordResetMenuBladeReference:new o.SsprInfoBladeReference})).catch((function(){return new o.SsprInfoBladeReference}))},visible:u.observable(k.isSSPREnabled()),enabled:this._isSelfServicePasswordResetEnabled},{id:c.menuIds.loginTenantBranding,displayText:h.menuItemLoginTenantBranding,icon:tt.JourneyHub(),supplyBladeReferenceAsync:function(){return n.context.model.featureConfigurations.fetchFeatureConfigurations(n.context.container).then((function(n){return n&&f.isFeatureEnabledAndAvailable(n.loginTenantBranding)?new o.LoginTenantBrandingBladeReference:new o.LoginTenantBrandingUpsellBladeReference})).catch((function(){return new o.LoginTenantBrandingUpsellBladeReference}))},visible:u.observable(k.isLoginTenantBrandingEnabled()),enabled:this._isLoginTenantBrandingEnabled},{id:c.menuIds.userSettingsMenuId,displayText:h.menuItemUserSettings,icon:i.Base.Images.GearAlternate(),supplyBladeReference:function(){return new o.DirectoryUserSettingsBladeReference({subtitle:h.azureActiveDirectoryExtensionName})}},{id:c.menuIds.directoryPropertiesMenuId,displayText:h.menuItemProperties,icon:tt.Controls(),supplyBladeReference:function(){return new o.DirectoriesPropertiesBladeReference},enabled:this._isDirectoryPropertiesEnabled},{id:c.menuIds.notificationsMenuId,displayText:h.menuItemNotifications,icon:g.PortalExtension.ADExtension.Client.Notifications.Images.notificationBell,supplyBladeReference:function(){return new o.NotificationsSettingsBladeReference},enabled:this._isNotificationMenuGroupEnabled,visible:u.observable(k.isNotificationsSettingsEnabled())},{id:c.menuIds.liveChatMenuId,displayText:h.menuItemsLiveChat,icon:tt.Support(),supplyBladeReference:function(){return new o.AppProxyChatBotBladeReference},enabled:u.observable(i.isFeatureEnabled("livechat")),visible:u.observable(i.isFeatureEnabled("livechat"))},{id:it.security,displayText:h.menuItemSecurity,icon:i.Base.Images.Polychromatic.SslCustomDomains(),supplyBladeReference:function(){return new o.SecurityMenuBladeReference},enabled:this._isSecurityAreaEnabled,visible:u.observable(ut)}]};this._activityMenuGroup={displayText:h.menuGroupActivity,id:c.menuIds.activityGroupID,items:[{id:c.menuIds.signInsMenuId,displayText:h.menuItemSignIns,icon:g.PortalExtension.ADExtension.Client.Users.Images.signIn,supplyBladeReference:function(){return ot({timeRangeType:et.Last7Days})},enabled:this._isReportsEnabled},{id:c.menuIds.auditMenuId,displayText:h.menuItemAudit,icon:i.Base.Images.Polychromatic.Log(),supplyBladeReference:function(){return new o.AuditEventsBladeReference({timeRangeType:et.Last1Month,activityType:w.Audit.Options.all,showExport:!0})},enabled:this._isReportsEnabled}]};this._delayedSharedContext=function(){return{model:n.context.model.sharedDataContext,lifetime:n.context.container}};this._securityMenuGroup={displayText:h.menuGroupSecurity,id:it.groupId,items:[l.delayed(this._delayedSharedContext,ft,it.conditionalAccess,u.observable(k.isPoliciesFeatureEnabled()),this._isPoliciesEnabled),p.delayed((function(){return{model:n.context.model.featureConfigurations,lifetime:n.context.container}}),c.menuIds.multifactorAuthenticationId,u.observable(k.isMFAEnabled()),this._isMultifactorAuthenticationMenuEnabled),nt.delayed(this._delayedSharedContext,ft,it.usersAtRisk,u.observable(k.isIPCEnabled()),this._isSecurityMenuEnabled),b.delayed(this._delayedSharedContext,ft,it.riskySignIns,u.observable(k.isIPCEnabled()),this._isSecurityMenuEnabled),e.create(it.authenticationMethods)]};this._menuGroups=ht(this._quickAccessMenuGroup,this._manageMenuGroup,this._securityMenuGroup,this._activityMenuGroup)}return n.prototype.onInitialize=function(){var n=this.context,t=n.container,i=n.model,r=i.getCommonSubtitle();return this.subtitle=r,this._isSecurityAreaEnabled=u.computed(t,[this._isSecurityMenuEnabled,this._isMultifactorAuthenticationMenuEnabled],(function(n,t){return ut&&(n||t)})),this._initializeMenu(),this._initializePromises(),this._initializeNotifiers(),Q.all([this._directoryNamePromise,this._directoryIdPromise])},n.prototype._initializeMenu=function(){this.viewModel=s.ViewModel2.create(this.context.container,{defaultId:c.menuIds.overviewMenuId,groups:this._menuGroups})},n.prototype._initializeNotifiers=function(){var r=this,t=this.context,n=t.container,i=t.model;i.directoryEditedNotifier.subscribe(n,(function(n){r.title=n.displayName()}));i.directoryDeletedNotifier.subscribe(n,(function(){n.unauthorized()}))},n.prototype._initializePromises=function(){var n=this;this._initializePermissionPromise();this._directoryNamePromise=y.DirectoryCache.getCachedDirectoryName().then((function(t){n.title=t}));this._directoryIdPromise=y.DirectoryCache.getCachedDirectoryId().then((function(t){n._currentTenantId(t)}))},n.prototype._initializePermissionPromise=function(){var t=this,n=[];n.push({objectType:f.TargetObjectType.TenantDetail,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.User,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.ServicePrincipal,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.Application,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.Licenses,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.Domain,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.AzureADConnect,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.MdmApplication,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.PasswordResetPolicy,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.LoginTenantBranding,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.DirectorySetting,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.NotificationsUserSettings,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.ConditionalAccess,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.Reports,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.IdentityProtection,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.MultiFactorAuthentication,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.Device,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.CompanyRelationships,actionType:f.ActionType.Read});n.push({objectType:f.TargetObjectType.ApplicationProxyTenantSettings,actionType:f.ActionType.Read});f.Permission.CheckMultiplePermissions(n,this.context.container).then((function(n){return t._applyUserRolePermissions(n),n}))},n.prototype._applyUserRolePermissions=function(n){var r,u,t;if(!i.isNullOrUndefined(n))for(r=0,u=n;r<u.length;r++)if(t=u[r],t.actionType===f.ActionType.Read)switch(t.objectType){case f.TargetObjectType.TenantDetail:this._isQuickStartMenuItemEnabled(t.hasAccess);this._isDirectoryPropertiesEnabled(t.hasAccess);break;case f.TargetObjectType.User:this._isUsersAndGroupsEnabled(t.hasAccess);break;case f.TargetObjectType.ServicePrincipal:this._isEnterpriseAppsEnabled(t.hasAccess);break;case f.TargetObjectType.Application:this._isRegisteredAppsEnabled(t.hasAccess);break;case f.TargetObjectType.Licenses:this._isLicensesMenuEnabled(t.hasAccess);break;case f.TargetObjectType.Domain:this._isDomainNamesEnabled(t.hasAccess);break;case f.TargetObjectType.AzureADConnect:this._isAzureADConnectEnabled(t.hasAccess);break;case f.TargetObjectType.MdmApplication:this._isMobilityMenuEnabled(t.hasAccess);break;case f.TargetObjectType.PasswordResetPolicy:this._isSelfServicePasswordResetEnabled(t.hasAccess);break;case f.TargetObjectType.LoginTenantBranding:this._isLoginTenantBrandingEnabled(t.hasAccess);break;case f.TargetObjectType.ConditionalAccess:this._isPoliciesEnabled(t.hasAccess);break;case f.TargetObjectType.DirectorySetting:this._isUserSettingsEnabled(t.hasAccess);break;case f.TargetObjectType.NotificationsUserSettings:this._isNotificationMenuGroupEnabled(t.hasAccess);break;case f.TargetObjectType.Reports:this._isReportsEnabled(t.hasAccess);break;case f.TargetObjectType.IdentityProtection:this._isSecurityMenuEnabled(t.hasAccess);break;case f.TargetObjectType.MultiFactorAuthentication:this._isMultifactorAuthenticationMenuEnabled(t.hasAccess);break;case f.TargetObjectType.Device:this._isDevicesEnabled(t.hasAccess);break;case f.TargetObjectType.ApplicationProxyTenantSettings:this._isApplicationProxyTenantSettingsEnabled(t.hasAccess);break;case f.TargetObjectType.CompanyRelationships:this._isCompanyRelationshipsEnabled(t.hasAccess)}},n.prototype._isTenantWhitelisted=function(n){var t=n.split(",");return(t=t.filter((function(n){return!i.isNullOrWhiteSpace(n)})),t.length>0&&(t.indexOf("*")>-1||t.indexOf(this._currentTenantId())>-1))?!0:!1},n.prototype._isMDMEnabled=function(){if(i.isFeatureEnabled("mobility"))return!0;var n=i.getEnvironmentValue("enableMDMWhitelist","");return this._isTenantWhitelisted(n)?!0:!1},n})();rt=__decorate([s.Decorator()],rt);t.ActiveDirectoryMenuBlade=rt}))