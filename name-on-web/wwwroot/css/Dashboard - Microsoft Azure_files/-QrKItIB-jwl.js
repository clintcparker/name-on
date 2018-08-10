define("ReleaseManagement/TypeScript/Converters/VstsToContinuousIntegrationModelConverter",["require","exports","o"],(function(n,t,i){"use strict";i.defineProperty(t,"__esModule",{value:!0});var r=(function(){function n(){}return n.convertToContinuousIntegrationModelRepository=function(n,t){return{id:n.id,name:n.name,defaultBranch:n.defaultBranch,repoUrl:n.remoteUrl,sourceControlType:t}},n.convertToClientGitRefContinuousIntegrationModelSourceVersion=function(n){return{id:n.objectId,name:n.name,friendlyName:n.friendlyName,isBranch:n.isBranch,isTag:n.isTag}},n.convertTfvcBranchToContinuousIntegrationModelSourceVersion=function(n){return{id:n.path,name:n.path,friendlyName:n.path,isBranch:!0,isTag:!1}},n})();t.VstsToContinuousIntegrationModelConverter=r}));
define("ReleaseManagement/TypeScript/Service/ServiceConstants",["require","exports","o"],(function(n,t,i){"use strict";i.defineProperty(t,"__esModule",{value:!0});t.azureTfsArea="AzureTfs";t.azureTfsContinuousDeploymentConfigurationLocationIdString="76e9f914-2f9a-405d-8a22-e7034cb400c5";t.azureTfsContinuousDeploymentConfigurationResourceName="ContinuousDeploymentConfiguration";t.RMArea="Release";t.SetupCDServicesLocationId="c5788899-1e84-439b-b5f9-dbc10ecffe24";t.BuildArea="build";t.BuildDefinitionLocationId="dbeaf647-6167-421a-bda9-c9327b25e2e6";t.permissionsResource="Permissions";t.permissionsLocationId="DD3B8BD6-C7FC-4CBD-929A-933D9C011C9D";t.buildSecurityNameSpace="33344D9C-FC72-4d6f-ABA5-FA317101A7E9";t.editBuildDefinitionBitMask=2048;t.releaseSecurityNameSpace="C788C23E-1B46-4162-8F5E-D7585343B5DE";t.editReleaseDefinitionPermission=2;t.serviceEndPointSecurityNameSpace="49B48001-CA20-4ADC-8111-5B60C903A50C";t.adminRightsForEndpointCreation=4;t.releaseEnvironmentTemplatesLocationId="6B03B696-824E-4479-8EB2-6644A51ABA89";t.teamProjectCollectionNamespaceId="3E65F728-F8BC-4ecd-8764-7E378B19BFA7";t.teamProjectCollectionNamespaceToken="NAMESPACE";t.createTeamProjectPermission=4;t.HostAcquisitionAreaName="HostAcquisition";t.HostAcquisitionAreaId="8E128563-B59C-4A70-964C-A3BD7412183D";t.CollectionsResourceLocationId="2BBEAD06-CA34-4DD7-9FE2-148735723A0A";t.CollectionsResourceName="Collections";t.CollectionBasedPermissionNamespaceId="307BE2D3-12ED-45C2-AACF-6598760EFCA7";t.CollectionBasedWritePermission=2;t.AccountLinkSecurityNamespaceToken="/AccountLink";t.NameAvailabilityResource="NameAvailability";t.NameAvailabilityResourceLocationId="031d6b9b-a0d4-4b46-97c5-9ddaca1aa5cd";t.CustomerIntelligenceEntryPoint={Ibiza:"Ibiza",IbizaCD:"IbizaCD",IbizaDevOps:"IbizaDevOps"}}));var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/Service/HostAcquisitionHttpClient",["require","exports","o","Core/TypeScript/TFS.WebApi","ReleaseManagement/TypeScript/Service/ServiceConstants"],(function(n,t,i,r,u){"use strict";i.defineProperty(t,"__esModule",{value:!0});var f=(function(n){function t(t){return n.call(this,t,!0)||this}return __extends(t,n),t.prototype.createCollection=function(n,t,i){return i===void 0&&(i=u.CustomerIntelligenceEntryPoint.Ibiza),this._beginRequest({httpMethod:"POST",area:u.HostAcquisitionAreaName,locationId:u.CollectionsResourceLocationId,routeValues:{resource:"collections"},queryParams:{collectionName:n,preferredRegion:t,"api-version":"4.0-preview.1"},responseType:{fields:null},data:{signupEntryPoint:i}})},t})(r.VssHttpClient);t.HostAcquisitionHttpClient=f}));
define("ReleaseManagement/TypeScript/Utilities/ReleaseManagementUtils",["require","exports","f","o","ko","$","Core/TypeScript/TFS.Azure","Core/TypeScript/TFS.Core.Ajax","Core/TypeScript/TFS.Service","Core/TypeScript/TFS.Project.Data","Core/TypeScript/TFS.Core","Core/TypeScript/Shared/VersionControl/TFS.VersionControl.Services","Core/TypeScript/TFS.ObjectModel","VersionControl/TypeScript/TFS.VersionControl.WebApi","ReleaseManagement/TypeScript/Utilities/LogHelper","Project/ProjectArea","Core/TypeScript/TFS.Azure.Context","ReleaseManagement/TypeScript/Models/ContinuousIntegrationModel","ReleaseManagement/TypeScript/Converters/VstsToContinuousIntegrationModelConverter","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources","ReleaseManagement/TypeScript/Service/HostAcquisitionHttpClient","ReleaseManagement/TypeScript/Service/ServiceConstants"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p,w,b,k,d,g,nt){"use strict";var tt,rt,it;r.defineProperty(t,"__esModule",{value:!0});tt=i.Base.Diagnostics.Telemetry;rt=(function(){function n(){}return n.setFlagToRefreshAccountList=function(){it=!0},n.refreshAccounts=function(n){if(!it)return Q();var t=Q.defer();return f.when(e.ready()).then((function(){e.setFlagToRefreshAccountList();f.when(e.refreshAccounts(n)).then((function(){it=!1;t.resolve()}))})),t.promise},n.beginGetAexLocation=function(){var n=Q.defer(),t=w.getAzureTfsContext().spsLocation;return t[t.length-1]!=="/"&&(t+="/"),o.getMSJSON(t+"_apis/ServiceDefinitions/LocationService2/"+nt.HostAcquisitionAreaId,null,(function(t){if(t&&t.locationMappings&&t.locationMappings.length>0){var i=t.locationMappings[0].location;t.locationMappings.forEach((function(n){n.accessMappingMoniker.toLowerCase()==="PublicAccessMapping".toLowerCase()&&(i=n.location)}));n.resolve(i)}else y.LogHelper.LogError("Failed to get Aex Deployment URL for account "),n.reject("Failed to get the URL for Aex service.")}),(function(t){y.LogHelper.LogError("Failed to get Aex Deployment URL for account ");n.reject(t)})),n.promise},n.getVSTSAccounts=function(t){var r=f.Deferred();return i.Base.Security.getUserInfo().then((function(f){n.refreshAccounts().done((function(){var l=f&&f.directoryId?f.directoryId:"",h=[],o=e.getUnfilteredAccounts(),n;for(i.isNullOrUndefined(o)&&r.resolve(h),n=0;n<o.length;n++)if(i.isFeatureEnabled("canmodifyextensions")&&(!!i.getFeatureValue("authTokenOverride")||!!i.getFeatureValue("bearerTokenOverride"))||o[n].accountTenantId===l||w.isMsaAccount(o[n].accountName)&&!t){var a=o[n].serviceUrls?o[n].serviceUrls[s.SubscriptionConstants.RMGuid]:"",v=o[n].serviceUrls?o[n].serviceUrls[s.SubscriptionConstants.TFSGuid]:"",y=o[n].serviceUrls?o[n].serviceUrls[s.SubscriptionConstants.SPSGuid]:"";h.push({name:u.observable(o[n].accountName),subscriptionId:u.observable(o[n].subscriptionId),id:u.observable(o[n].accountId),rmAccountUrl:u.observable(a),tfsAccountUrl:u.observable(v),spsAccountUrl:u.observable(y),resourceGroup:u.observable(o[n].resourceGroupName),geoLocation:u.observable(o[n].geoLocation)})}h=h.stableSort((function(n,t){return c.StringUtils.ignoreCaseComparer(n.name(),t.name())}));r.resolve(h)}))}),(function(n){y.LogHelper.LogError("getVSTSAccounts : getUserInfo call failed. Error:"+n)})),r.promise()},n.createVSTSAccount=function(t,r,u,f,e){f===void 0&&(f=nt.CustomerIntelligenceEntryPoint.Ibiza);var o=Q.defer();return n.beginGetAexLocation().then((function(n){var s=new g.HostAcquisitionHttpClient(n);s.createCollection(t,u,f).then((function(n){if(tt.trace({source:"createVSTSAccountUsingAex",action:"aexAccountCreationSuccessful"}),!e){var r=new i.Hubs.Notifications.ClientNotification({title:d.vstsAccountCreated,description:t,status:i.Hubs.Notifications.NotificationStatus.Success});r.publish()}o.resolve(n.name)})).catch((function(n){y.LogHelper.LogError("ReleaseManagementUtils::createVSTSAccount: Failed to create account, accountName: {0}, subscriptionId: {1}, location: {2}. Error: {3}".format(t,r,location,n&&n.message?n.message:n));tt.trace({source:"createVSTSAccountUsingAex",action:"aexAccountCreationFailed"});o.reject(d.vstsAccountCreationFailed.format(n&&n.message?n.message:n))}))}),(function(n){y.LogHelper.LogError("ReleaseManagementUtils::createVSTSAccount: Failed to get the location for AEX serivce. Error :"+n&&n.message?n.message:n);tt.trace({source:"createVSTSAccountUsingAex",action:"aexAccountCreationFailed"});o.reject(d.vstsAccountCreationFailed.format(n&&n.message?n.message:n))})),o.promise},n.getVstsAccount=function(n){var t=Q.defer();return s.AccountManager.beginGetSubscriptionAccount(n,(function(n){if(i.isNullOrUndefined(n))return t.resolve(null),t.promise;var r=n.serviceUrls?n.serviceUrls[s.SubscriptionConstants.RMGuid]:"",f=n.serviceUrls?n.serviceUrls[s.SubscriptionConstants.TFSGuid]:"";t.resolve({name:u.observable(n.accountName),subscriptionId:u.observable(n.subscriptionId),id:u.observable(n.accountId),rmAccountUrl:u.observable(r),tfsAccountUrl:u.observable(f),resourceGroup:u.observable(n.resourceGroupName),geoLocation:u.observable(n.geoLocation)})}),(function(n){t.reject(n)})),t.promise},n.getAccountCreationTemplate=function(){return JSON.stringify({$schema:"http://schema.management.azure.com/schemas/2014-04-01-preview/deploymentTemplate.json#",contentVersion:"1.0.0.0",parameters:{accountName:{type:"string"},location:{type:"string"}},variables:{},resources:[{name:"[parameters('accountName')]",type:"microsoft.visualstudio/account",location:"[parameters('location')]",apiVersion:"2014-04-01-preview",properties:{operationType:"Create",accountName:"[parameters('accountName')]"}}],outputs:{}})},n.getProjects=function(t,i){var r=f.Deferred();return h.getProjects(t,e.getAccountId(i)).done((function(n){r.resolve(n())})).fail((function(){n.logError("ReleaseManagementUtils","getProjects","failedToGetProjects","Failed to fetch Projects for account : {0}".format(i));r.reject()})),r.promise()},n.getVstsGitRepositories=function(t,i,r){var u=f.Deferred();return l.getVersionControlService().done((function(f){f.beginGetRepositories(t,i,r).done((function(n){u.resolve(n)})).fail((function(){n.logError("ReleaseManagementUtils","getVstsGitRepositories","failedToGetVstsGitRepositories","Failed to get Repos for accountId : {0}, ProjectId: {1}".format(i,r))}))})).fail((function(){y.LogHelper.LogError("Failed to getVersionControlService for accountId : {0}, ProjectId: {1}".format(i,r));u.reject()})),u.promise()},n.beginGetVstsBranches=function(t,i,r,u){var e=f.Deferred(),o=[];return r.sourceControlType===b.SourceControlType.Git?n.beginGetVstsGitRefs(t,i,r.id,u).done((function(n){n.forEach((function(n){n.isBranch&&o.push(k.VstsToContinuousIntegrationModelConverter.convertToClientGitRefContinuousIntegrationModelSourceVersion(n))}));e.resolve(o)})).fail((function(){n.logError("ReleaseManagementUtils","beginGetVstsBranches","failedToGetVstsBranches","Failed to get VSTS Git branches for accountId : {0}, projectName: {1}, respository: [id = {2}]".format(t,i,r.id));e.resolve(o)})):r.sourceControlType===b.SourceControlType.Tfvc?n.beginGetVstsTfvcBranches(t,i).done((function(n){n.forEach((function(n){o.push(k.VstsToContinuousIntegrationModelConverter.convertTfvcBranchToContinuousIntegrationModelSourceVersion(n))}));e.resolve(o)})).fail((function(){n.logError("ReleaseManagementUtils","beginGetVstsBranches","failedToGetVstsBranches","Failed to get VSTS TFVC branches for accountId : {0}, projectName: {1}, respository: [id = {2}]".format(t,i,r.id));e.resolve(o)})):e.reject({message:d.unsupportedSourceControlType.format(r.sourceControlType)}),e.promise()},n.beginGetAllGitHubBranches=function(t,i){var u=this,f=[],r=Q.defer(),e="https://api.github.com/repos/{0}/branches".format(t);return this.beginGetGitHubBranchesInternal(t,e,i).then((function(n){u.beingIterateGitHubResponse(t,n,i,null).then((function(n){r.resolve(u.gitHubBranchToISourceVersionConverter(n))}))})).catch((function(i){n.logError("ReleaseManagementUtils","beginGetAllGitHubBranches","failedToGetGitHubBranches","Failed to get branches for GitHub repository '{0}'. Details: [{1}]".format(t,JSON.stringify(i)));r.resolve(f)})),r.promise},n.beingIterateGitHubResponse=function(t,i,r,u){var l=this,f=Q.defer(),h=i.jqXHR.getResponseHeader("Link"),s,c;if(h!=null){var e=u==null?i.content:u.concat(i.content),a=h.split(/[<>,;]/),o=[];a.forEach((function(n){n=n.trim();!n||o.push(n)}));s=o.indexOf('rel="next"')-1;s>=0?(c=o[s],this.beginGetGitHubBranchesInternal(t,c,r).then((function(n){l.beingIterateGitHubResponse(t,n,r,e).then((function(n){f.resolve(n)}))})).catch((function(i){n.logError("ReleaseManagementUtils","beingIterateGitHubResponse","failedToGetGitHubBranches","Failed to get branches for GitHub repository '{0}'. Details: [{1}]".format(t,JSON.stringify(i)));f.resolve(e)}))):f.resolve(e)}else f.resolve(i.content);return f.promise},n.beginGetGitHubBranchesInternal=function(n,t,r){var u=Q.defer(),f={};return f.Authorization=r,i.Base.Net2.ajaxExtended({uri:t,type:"GET",dataType:"json",cache:!1,contentType:"application/json",setAuthorizationHeader:!1,headers:f,useRawAjax:!0}).then((function(t){y.LogHelper.LogInfo("Fetched the branches for GitHub repository '{0}' successfully".format(n));u.resolve(t)}),(function(n){u.reject(n)})),u.promise},n.gitHubBranchToISourceVersionConverter=function(n){var t=[];return n.forEach((function(n){return t.push({id:"",name:n.name,friendlyName:n.name,isBranch:!0,isTag:!1})})),t},n.beginGetVstsGitRefs=function(t,i,r,u){var o=f.Deferred();return e.awaitTfsContext({accountId:t}).done((function(e){var s=a.TfsTeamProjectCollection.getConnection(e).getHttpClient(v.GitHttpClient);s.beginGetGitRefs(r,u).done((function(n){var t=f.map(n,(function(n){var t=n;return t.friendlyName=n.name,(n.name||"").indexOf("refs/heads/")===0?(t.friendlyName=n.name.substr(11),t.isBranch=!0):(n.name||"").indexOf("refs/tags/")===0?(t.friendlyName=n.name.substr(10),t.isTag=!0):t.friendlyName=n.name||"",t}));o.resolve(t)})).fail((function(){n.logError("ReleaseManagementUtils","beginGetVstsGitRefs","failedToGetVstsGitRefs","Failed to get Repos for accountId : {0}, ProjectName: {1}, respositoryId: {2}".format(t,i,r));o.reject()}))})).fail(o.reject),o.promise()},n.beginGetVstsTfvcBranches=function(t,i){var r=f.Deferred();return e.awaitTfsContext({accountId:t}).done((function(u){var f=a.TfsTeamProjectCollection.getConnection(u).getHttpClient(v.TfvcHttpClient);f.beginGetBranches(i).done((function(n){r.resolve(n)})).fail((function(){n.logError("ReleaseManagementUtils","beginGetVstsTfvcBranches","failedToGetVstsTfvcBranches","Failed to get VSTS TFVC branches for accountId: {0}, projectName: {1}".format(t,i));r.reject()}))})).fail(r.reject),r.promise()},n.getSubscriptionSupportedRegionWithTFSRegion=function(t){var i=f.Deferred();return f.when(e.getSupportedRegionForSubscription(t),n.getTFSSupportedRegions()).done((function(t,r){i.resolve(n.mergeSubscriptionSupportedRegionWithTFSRegion(t,r))})).fail((function(){i.resolve(n._tfsSupportedRegions)})),i.promise()},n.mergeSubscriptionSupportedRegionWithTFSRegion=function(n,t){if(n==undefined||n==null||n.length==0)return t;for(var i=t.length-1;i>=0;i--)n.indexOf(t[i].displayName)<0&&t.splice(i,1);return t},n.getTFSSupportedRegions=function(){var t=f.Deferred(),i=function(){var t=[],n={};return n.displayName="Central US",n.id="centralus",n.regionCode="CUS",t[0]=n,t},r=new p.DataContext;return r.beginGetAccountRegions().done((function(r){!r||r.length<=0?t.resolve(i()):(n._tfsSupportedRegions=r,t.resolve(r))})).fail((function(){t.resolve(i())})),t.promise()},n.isFeatureEnabled=function(n){return w.isPortalFeatureEnabled(n)||i.isFeatureEnabled(n)},n.logError=function(n,t,i,r){tt.trace({source:n,action:t,name:i});y.LogHelper.LogError(r)},n.getSpsLocation=function(){var n=w.getAzureTfsContext().spsLocation;return n[n.length-1]!=="/"&&(n+="/"),n},n.getPrimaryArtifact=function(t){return n._getPrimaryArtifact(t.artifacts)},n._getPrimaryArtifact=function(n){if(!!n)for(var t=0;t<n.length;t++)if(n[t].isPrimary)return n[t];return null},n})();rt._tfsSupportedRegions=null;t.ReleaseManagementUtils=rt;it=!0}))