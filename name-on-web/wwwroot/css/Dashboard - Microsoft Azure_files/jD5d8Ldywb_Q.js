define("Shared/Constants",["require","exports","o"],(function(n,t,i){"use strict";var e,o,r,u,f;i.defineProperty(t,"__esModule",{value:!0});t.sdkResourceProvider="Microsoft.BotService";t.rootResource="botServices";t.appInsightsLocationQuery="{0}/subscriptions/{1}/providers/microsoft.insights?api-version=2016-06-01";t.ServerFarmResourceUriFromSubscriptionTemplate="{0}/subscriptions/{1}/providers/Microsoft.Web/serverfarms?api-version=2016-03-01&detailed=true";t.webSiteHostNameAvailableTemplate="{0}/subscriptions/{1}/providers/Microsoft.Web/ishostnameavailable/{2}?api-version=2015-08-01";t.webSitePublishingCredentialTemplate="{0}{1}/config/publishingcredentials/list?api-version=2016-08-01";t.webSiteMetadataTemplate="{0}{1}/config/metadata/list?api-version=2016-08-01";t.webResourceProvider="Microsoft.Web";t.sitesResourceType=t.webResourceProvider+"/sites";t.serverFarmsResourceType=t.webResourceProvider+"/serverfarms";t.georegionsResourceType=t.webResourceProvider+"/georegions";t.appServiceApiVersion="2016-03-01";t.publicWebAppDnsSuffix=".azurewebsites.net";t.MSAPortalEndpoint="https://aka.ms/msaappid/";t.maxDeploymentNameLength=64;t.maxStorageAccountNameLength=24;t.minAppNameLength=2;t.maxAppNameLength=60;t.maxResourceGroupLength=90;e={isOnPrem:function(){return!1}};o=(function(){function n(){}return n})();o.dynamic="dynamic";o.classic="classic";t.ServerFarmTypes=o;r=(function(){function n(){}return n})();r.storageConnectionString="DefaultEndpointsProtocol=https;AccountName={0};AccountKey={1}";r.storageAccountUriFormat="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Storage/storageAccounts/{2}";r.dashboardLink="https://{0}.scm.azurewebsites.net/AzureJobs/#/functions";r.ACRWebhookApiVersion="2017-06-01-preview";r.NotificationHubApiVersion="2014-09-01";r.AntaresApiVersion="2016-03-01";r.PowerAppsApiVersion="2016-11-01";r.AntaresAugust2016ApiVersion="2016-03-01";r.ManagedHostingEnvironmentAPIVersion="2016-03-01";r.ASEv2APIVersion="2016-09-01";r.AseApiVersion="2015-02-01";r.ArmApiVersion=e.isOnPrem()?"2016-06-01":"2016-07-01";r.domainApiVersion="2016-04-01";r.redisApiVersion="2016-04-01";r.ApiHubApiVersion="2015-08-01-preview";r.StorageApiVersion="2015-05-01-preview";r.AutoScaleVersion="2015-08-01";r.tip1PowerAppsVersion="2015-08-01-alpha";r.tip2PowerAppsVersion="2015-08-01-beta";r.docDbApiVersion="2015-04-08";r.SqlApiVersion="2014-04-01-preview";r.DomainRegistrationVersion="2015-04-01";r.BotServiceApiVersion="2017-12-01";r.ExtensionName="WebsitesExtension";r.Controller="Websites";r.UrlPath="/api/{0}/{1}";r.Website="Website";r.SslCertificate="SslCertificate";r.IlbCertificate="InternalLoadBalancingASE";r.ClusterSettingName="DefaultSslCertificateThumbprint";r.WebsiteWithDatabase="WebsiteWithDatabase";r.locationsApi="/subscriptions/{0}/providers/{1}?api-version={2}";r.resourceGroupUriFormat="/subscriptions/{0}/resourceGroups/{1}";r.WebsiteResourceUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/sites/{2}";r.WebsiteSlotResourceUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/sites/{2}/slots/{3}";r.ServerFarmResourceUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/serverfarms/{2}";r.ServerFarmResourceUriFromSubscriptionTemplate="{0}/subscriptions/{1}/providers/Microsoft.Web/serverfarms?api-version=2016-03-01&detailed=true";r.ServerFarmResourceHealthPermissionTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/sites/{2}/providers/Microsoft.ResourceHealth/availabilityStatuses/current";r.vnetUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Network/virtualNetworks/{2}";r.hostingEnvironmentUriTemplate="/subscriptions/{0}/resourcegroups/{1}/providers/Microsoft.Web/hostingEnvironments/{2}";r.managedHostingEnvironmentUriTemplate="/subscriptions/{0}/resourcegroups/{1}/providers/Microsoft.Web/managedHostingEnvironments/{2}";r.deploymentLocationQuery="{0}/subscriptions/{1}/providers/Microsoft.Web/deploymentLocations?api-version=2016-03-01";r.resourceDataQuery="{0}/subscriptions/{1}/providers/{2}?api-version="+(e.isOnPrem()?"2016-06-01":"2016-09-01");r.resourceHealthQuery="{0}/{1}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2015-01-01";r.lightweightAseQuery="{0}/subscriptions/{1}/resources?$Filter=resourceType eq 'Microsoft.Web/hostingEnvironments'&api-version="+(e.isOnPrem()?"2016-06-01":"2016-09-01");r.listServicePrincipal="https://management.azure.com/providers/Microsoft.PowerApps/actions/admin/listServicePrincipal?api-version=2015-08-01-preview";r.hostingEnvironmentQueryUriTemplate="{0}/subscriptions/{1}/providers/Microsoft.Web/hostingEnvironments?api-version={2}";r.sqlServerResourceUriTemplate="{0}/subscriptions/{1}/resourceGroups/{2}/providers/Microsoft.Sql/servers/{3}?api-version=2014-04-01-preview";r.sqlLocationCapabilities="/subscriptions/{0}/providers/Microsoft.Sql/locations/{1}/capabilities?api-version={2}";r.notificationHubUriFormat="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.NotificationHubs/namespaces/{2}/notificationHubs/{3}";r.componentsResourceUriTemplate="{0}/subscriptions/{1}/resources?$Filter=resourceType eq 'microsoft.insights/components'&api-version=2015-01-01";r.componentsLocationResourceUriTemplate="{0}/subscriptions/{1}/providers/microsoft.insights?api-version=2016-06-01";r.autoscaleResourceUriTemplate="{0}/subscriptions/{1}/providers/microsoft.insights/autoscalesettings?api-version=2015-04-01";r.ilbCertificateResourceUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/certificates";r.docDbUriFormat="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.DocumentDB/databaseAccounts/{2}";r.apiHubApisFormat="/subscriptions/{0}/providers/Microsoft.Web/locations/{1}/managedApis";r.apiHubApiFormat="/subscriptions/{0}/providers/Microsoft.Web/locations/{1}/managedApis/{2}";r.apiHubAllConnectionsFormat="/subscriptions/{0}/providers/Microsoft.Web/connections";r.apiHubConnectionsFormat="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/connections";r.apiHubConnectionFormat="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/connections/{2}";r.DynamicAspLocationQuery="{0}/subscriptions/{1}/providers/Microsoft.Web/georegions?sku=Dynamic&api-version=2016-03-01";r.PremiumV2AspLocationQuery="{0}/subscriptions/{1}/providers/Microsoft.Web/georegions?sku=PremiumV2&api-version=2016-03-01";r.linuxAspLocationQuery="{0}/subscriptions/{1}/providers/Microsoft.Web/georegions?linuxWorkersEnabled=true&api-version=2016-03-01";r.purchasedDomainUpdateUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.DomainRegistration/domains/{2}?api-version={3}";r.purchasedDomainRenewUriTemplate="/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.DomainRegistration/domains/{2}/renew";r.hostNameAvailableUriTemplate="{0}//subscriptions/{1}/providers/Microsoft.Web/ishostingenvironmentnameavailable?name={2}&api-version={3}";r.appNameAvailableUriTemplate="/subscriptions/{0}/providers/Microsoft.Web/ishostnameavailable/{1}";r.appNameFQDNAvailableUriTemplate=r.appNameAvailableUriTemplate+"?isFQDN=true";r.ListWebJobsQuery="{0}/subscriptions/{1}/resourceGroups/{2}/providers/Microsoft.Web/sites/{3}/webjobs?api-version=2016-03-01";r.GetWebJobQuery="{0}/{1}/{2}webjobs/{3}?api-version=2016-03-01";r.ListSlotWebJobs="{0}/subscriptions/{1}/resourceGroups/{2}/providers/Microsoft.Web/sites/{3}/slots/{4}/webjobs?api-version=2016-03-01";r.ValidateApiUriFormat="/subscriptions/{0}/resourcegroups/{1}/providers/Microsoft.Web/validate";r.checkNameAvailability="/subscriptions/{0}/providers/{1}/checkNameAvailability";r.validateTemplate="/subscriptions/{0}/resourcegroups/{1}/providers/Microsoft.Resources/deployments/{2}/validate";r.migrateMySql="{0}/migratemysql";r.migrateMySqlOp="{0}/migratemysql/status";r.migrateMySqlPoll="{0}/operationresults/{1}";r.resourcesInRG="/resources?api-version={0}&$filter=(subscriptionId eq '{1}') and (resourcegroup eq '{2}')";t.Asset=r;u=(function(){function n(){}return n})();u.DomainProvider="Microsoft.DomainRegistration";u.WebProvider="Microsoft.Web";u.CognitiveServices="Microsoft.CognitiveServices";u.CognitiveAccountsCreateLocations="locations/accountsCreationSettings";u.OrcasDB="Microsoft.DBforMySQL";u.OrcasPostgre="Microsoft.DBforPostgreSQL";u.InsightsProvider="microsoft.insights";u.ClearDBProvider="SuccessBricks.ClearDB";u.SQLProvider="Microsoft.Sql";u.SQLServerProvider=u.SQLProvider+"/servers";u.StorageProvider="Microsoft.Storage";u.ClassicNetworkProvider="Microsoft.ClassicNetwork";u.NetworkProvider="Microsoft.Network";u.OrcasResourceType=u.OrcasDB+"/servers";u.AppResourceType=u.WebProvider+"/sites";u.AspResourceType=u.WebProvider+"/serverfarms";u.ASEResourceType=u.WebProvider+"/hostingEnvironments";u.VNETResourceType=u.NetworkProvider+"/virutalnetworks";u.ClassicVNETResourceType=u.ClassicNetworkProvider+"/virutalnetworks";u.SearchProvider="Microsoft.Search";u.SearchServiceProvider=u.SearchProvider+"/searchServices";u.CacheProvider="Microsoft.Cache";u.RedisCacheProvider=u.CacheProvider+"/redis";u.ServiceBusProvider="Microsoft.Relay";u.HybridConnectionsResourceType=u.ServiceBusProvider+"/namespaces";t.ResourceTypes=u;f=(function(){function n(){}return n})();f.v2vnet="v2";f.v1vnet="v1";f.components="components";f.recommendSpecIds=[];f.galleryFreeSubMenuId="free";f.webHostingPlanLinkUri="http://go.microsoft.com/fwlink/?LinkId=526397";f.storageLinkUri="https://aka.ms/azure/bots/create/storage";f.upgradeSubscriptionUrlFormat="https://{0}/Subscriptions/Statement?subscriptionId={1}&isRdfeId=true&launchOption=upgrade";f.cspHiddenCategory="hidden_csp";f.galleryProdHost="https://gallery.azure.com";f.galleryTestHost="https://df.gallery.azure-test.net";f.galleryFeedFormat="/Microsoft.Gallery/galleryitems/?api-version=2015-04-01&{0}";f.supportedLinuxRegions=["West US","West Europe","Southeast Asia"];f.windows="windows";f.linux="linux";f.linuxPackageName="AppSvcLinux";f.generatedNameTemplate="App-";f.websiteProvider="Microsoft.Web";f.AppServicePlanResourceType="AppServicePlan";t.Create=f;t.LearnMoreLinks={editSdkOnline:"//aka.ms/azure/bots/edit/sdk",functionEditor:"//aka.ms/azure/bots/edit/functions",downloadZip:"//aka.ms/azure/bots/download/zip",continuousDeployment:"//aka.ms/azure/bots/continuous-deployment",manageAppId:"//aka.ms/azure/bots/manageappid",migration:"//aka.ms/azure/bots/migration",botPricing:"//aka.ms/azure/bots/pricing"};t.WebSiteBlades={continuousIntegration:"ContinuousDeploymentListBlade",appSettings:"SiteConfigSettingsFrameBlade",appOverview:"AppsOverviewBlade",functionEditor:"FunctionsIFrameBlade"};t.LuisPolicyLinks={licensing:"http://www.microsoft.com/{0}/Licensing/product-licensing/products.aspx",disableLink:"https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account"};t.LuisHostNames={EU:"westeurope.api.cognitive.microsoft.com",US:"westus.api.cognitive.microsoft.com",AU:"australiaeast.api.cognitive.microsoft.com"}}));
define("Shared/LogMessageCode",["require","exports","o"],(function(n,t,i){"use strict";var u,r;i.defineProperty(t,"__esModule",{value:!0}),(function(n){n[n.UnknownError=0]="UnknownError";n[n.FailedDeletingBot=1]="FailedDeletingBot";n[n.FailedClosingBladeDuringDelete=2]="FailedClosingBladeDuringDelete";n[n.FailedQueryingServerFarms=3]="FailedQueryingServerFarms";n[n.FailedCreatingConvergedApp=4]="FailedCreatingConvergedApp";n[n.FailedCreatingLuisApp=5]="FailedCreatingLuisApp";n[n.FailedGettingAuthorizationToken=6]="FailedGettingAuthorizationToken";n[n.FailedGettingWebAppLocations=7]="FailedGettingWebAppLocations";n[n.FailedGettingAppInsightsLocations=8]="FailedGettingAppInsightsLocations";n[n.FailedGettingStorageAccountLocations=9]="FailedGettingStorageAccountLocations";n[n.FailedGettingServicePlans=10]="FailedGettingServicePlans";n[n.FailedGettingsResourceEntity=11]="FailedGettingsResourceEntity";n[n.FailedRefreshingResourceEntity=12]="FailedRefreshingResourceEntity";n[n.FailedPatchingResourceEntity=13]="FailedPatchingResourceEntity";n[n.FailedGettingKuduPostDeployScript=14]="FailedGettingKuduPostDeployScript";n[n.FailedUpdatingKuduTimestamp=15]="FailedUpdatingKuduTimestamp";n[n.FailedExecutingKuduPostDeployScript=16]="FailedExecutingKuduPostDeployScript";n[n.FailedFindingKuduFile=17]="FailedFindingKuduFile";n[n.FailedGetFunctionKey=18]="FailedGetFunctionKey";n[n.FailedPatchBotService=19]="FailedPatchBotService";n[n.FailedPrepareSrcZip=20]="FailedPrepareSrcZip";n[n.FailedEnsurePrepareSrc=21]="FailedEnsurePrepareSrc";n[n.FailedFetchPublishingCredentials=22]="FailedFetchPublishingCredentials";n[n.FailedUploadingKuduFile=23]="FailedUploadingKuduFile";n[n.FailedToStartBotBuild=24]="FailedToStartBotBuild";n[n.FailedToGetFunctionEndpoint=25]="FailedToGetFunctionEndpoint";n[n.FailedToCheckBotDeploymentStatus=26]="FailedToCheckBotDeploymentStatus";n[n.FailedToGetFunctionMasterKey=27]="FailedToGetFunctionMasterKey";n[n.FailedToGetBotAppInsightSettings=28]="FailedToGetBotAppInsightSettings";n[n.FailedToPingBotEndpoint=29]="FailedToPingBotEndpoint";n[n.FailedBotNotRunningAfterBuild=30]="FailedBotNotRunningAfterBuild";n[n.FailedToGetBotServiceResource=31]="FailedToGetBotServiceResource";n[n.FailedToGetKuduSettings=32]="FailedToGetKuduSettings";n[n.FailedToGetWebAppMetaData=33]="FailedToGetWebAppMetaData";n[n.FailedToGetCognitiveServiceProviderInfo=34]="FailedToGetCognitiveServiceProviderInfo";n[n.FailedToValidateName=35]="FailedToValidateName";n[n.FailedToFetchLuisApps=36]="FailedToFetchLuisApps";n[n.FailedToPatchLuisAppIds=37]="FailedToPatchLuisAppIds";n[n.FailedKuduCommand=38]="FailedKuduCommand";n[n.FailedKuduDelete=39]="FailedKuduDelete";n[n.FailedPreDeploymentTasks=40]="FailedPreDeploymentTasks";n[n.FailedGettingConnectionSettings=41]="FailedGettingConnectionSettings";n[n.FailedFetchingLuisApp=42]="FailedFetchingLuisApp"})(u=t.LogMessageCode||(t.LogMessageCode={}));r=(function(){function n(n){if(!n)throw new Error("logger must be defined");this._logger=n}return n.prototype.LogErrorIfFirst=function(n,t,i){return this._capturedError||(this._capturedError=n||"<Undefined error>",this._logger.error(t||"<empty>",i,this._capturedError)),Q.reject(this._capturedError)},n})();t.ChainedPromiseErrorHandler=r}));
define("Shared/Utils",["require","exports","f","o"],(function(n,t,i,r){"use strict";function v(){return window.fx.environment.armEndpoint}function f(n){for(var r,i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];return r=n,i.reduce((function(n,t){return n[t]}),n)}function y(n){return n.toLowerCase().replace(s,"")}function p(n){var t=n.match(h);return t?t[1]:null}function w(n){var t=n.match(c);return t.length==6?{subscriptionId:t[1],resourceGroupName:t[2],resourceTypeNamespace:t[3],type:t[4],name:t[5]}:null}function b(n){return"/subscriptions/"+n.subscriptionId+"/resourceGroups/"+n.resourceGroupName+"/providers/"+n.resourceTypeNamespace+"/"+n.type+"/"+n.name}function k(){var n=i.getFeatureValue("env");switch(n){case"scratch":case"ppe":case"prod":return n}return"prod"}function d(n,t,r){var u=function(n,t){return typeof t=="string"?f(n,t):t(n)};return n.reduce((function(n,f){var e={},o=u(f,t),s=u(f,r);return e[o]=s,i.extend(n,e)}),{})}function g(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return t.first((function(n){return n}))}function u(n){for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];return i.reduce((function(n,t){return n?n[t]:undefined}),n)}function nt(n){return f(e,n)}function tt(n){return typeof n=="string"}function it(n){return typeof n=="function"}function rt(n){return typeof n=="boolean"}function ut(n){return n.match(l)!==null}function ft(n,t){return n.reduce((function(n,i){return t(n)<t(i)?i:n}),null)}function et(n,t){return n.length>t?n.substr(0,t):n}function a(n){return u(n,"Error","Message")&&u(n,"Error","Code")}function ot(n){var t=u(n,"jqXHR","responseJSON");return t&&a(t)?t:null}function st(n){var t=n.jqXHR;return t&&t.status===0&&t.statusText==="timeout"}var e,o,s,h,c,l;r.defineProperty(t,"__esModule",{value:!0});e={scratch:"//scratch.botframework.com",ppe:"//ppe.botframework.com",prod:"//dev.botframework.com",bcdr:"//bcdr.botframework.com"};t.getCSMManagementEndpoint=v;o=(function(){function n(){}return n.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){var t=Math.random()*16|0,i=n==="x"?t:t&3|8;return i.toString(16)}))},n.newShortGuid=function(){return"xxxxxxxx-yxxx".replace(/[xy]/g,(function(n){var t=Math.random()*16|0,i=n==="x"?t:t&3|8;return i.toString(16)}))},n.newTinyGuid=function(){return"yxxx".replace(/[xy]/g,(function(n){var t=Math.random()*16|0,i=n==="x"?t:t&3|8;return i.toString(16)}))},n.newCustomGuid=function(n){return n>0?"x".repeat(n).replace(/[xy]/g,(function(n){var t=Math.random()*16|0,i=n==="x"?t:t&3|8;return i.toString(16)})):""},n})();t.Guid=o;t.getResource=f;s=/\s/g;t.compactLocationName=y;h=/Microsoft\.BotService\/botServices\/(.+)$/;t.botIdFromResourceId=p;c=/\/subscriptions\/([a-f0-9-]+)\/resourceGroups\/([^\/]+)\/providers\/([^\/]+)\/([^\/]+)\/([^\/]+)/;t.parseArmResourceId=w;t.formatResourceId=b;t.getBotEnv=k;t.objectfy=d;t.firstTruthy=g;t.evalPath=u;t.getBotFrameworkHost=nt;t.isString=tt;t.isFunction=it;t.isBoolean=rt;l=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;t.isGuid=ut;t.findMax=ft;t.truncateString=et;t.isApiException=a;t.asApiException=ot;t.isRequestTimeout=st}))