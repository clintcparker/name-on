define("ReleaseManagement/TypeScript/Utilities/LinuxRuntimeStackUtility",["require","exports","f","o","ReleaseManagement/TypeScript/Models/ContinuousIntegrationModel","ReleaseManagement/TypeScript/Utilities/AppServiceArmApiManager","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources","AzureProject/TypeScript/Utilities/AzureProjectLogHelper","ReleaseManagement/TypeScript/Utilities/LogHelper"],(function(n,t,i,r,u,f,e,o,s){"use strict";r.defineProperty(t,"__esModule",{value:!0});var c="ResourceTemplateProviderBase|{0}",h=(function(){function n(){}return n.fetchRuntimeStackVersions=function(n){var i=this,t=Q.defer();return this._dataFetched?t.resolve():this._fetchRuntimeStackVersionsInternal(n).then((function(){i._dataFetched=!0;t.resolve()}),(function(n){t.reject(n)})),t.promise},n.getVersionsForFramework=function(n){return this._webAppFrameworkVersions[n]||[]},n.getRuntimeStackVersion=function(n){return this._versionMap[n]||null},n.getDefaultVersionForFramework=function(n){return this._defaultWebAppFrameworkVersion[n]||null},n.getDefaultMinorVersion=function(n){for(var r,t=0,i=n.minorVersions;t<i.length;t++)if(r=i[t],r.isDefault)return r.displayVersion;return n.properties.runtimeVersion.split("|")[1]},n.getDotNetCoreSDKVersion=function(n){var t=Q.defer(),s,f,r,u;if(i.isNullOrUndefined(n))t.resolve("");else if(s=n.properties.runtimeVersion.split("|")[0],s.toLowerCase()=="dotnetcore"){for(f="",r=0;r<n.minorVersions.length;r++)if(f=n.minorVersions[r].displayVersion,n.minorVersions[r].isDefault)break;u=this.runtimeToSdkMapForDotNetCore[f];i.isNullOrUndefined(u)?this._beginGetDotNetCoreSDKVersion().then((function(n){for(var e=JSON.parse(n),r=0;r<e.length;r++)if(!i.isNullOrUndefined(e[r]["version-runtime"])&&e[r]["version-runtime"].toLowerCase()==f.toLowerCase()){u=e[r]["version-sdk"];break}t.resolve(u)})).catch((function(n){t.reject(o.AzureProjectLogHelper.getDetailedError(e.failedToFetchSDKVersionsFotDotNetCore.format(n&&n.message?n.message:n),c.format("_getDotNetCoreSDKVersion")))})):t.resolve(u)}else t.resolve("");return t.promise},n._fetchRuntimeStackVersionsInternal=function(n){var t=this,i=Q.defer();return n.appServiceArmManager.beginGetRuntimeStack("Linux").then((function(n){var c,f,l,r,a,s,v,h;if(n.value){for(c=n.value,f=0;f<c.length;f++){var y=c[f].name,e=null,o=[];for(l=0;l<c[f].properties.majorVersions.length;l++){for(r=c[f].properties.majorVersions[l],a=[],s=0;s<r.minorVersions.length;s++)v={displayVersion:r.minorVersions[s].displayVersion,isDefault:r.minorVersions[s].isDefault,runtimeVersion:r.minorVersions[s].runtimeVersion},a.push(v);h={properties:{runtimeVersion:r.runtimeVersion,displayVersion:r.displayVersion,isDefault:r.isDefault},minorVersions:a};h.properties.isDefault&&(e=h);o.push(h);t._versionMap[h.properties.runtimeVersion]=h}switch(y.toLowerCase()){case"ruby":t._webAppFrameworkVersions[u.WebAppFramework.Ruby]=o;t._defaultWebAppFrameworkVersion[u.WebAppFramework.Ruby]=e;break;case"node":t._webAppFrameworkVersions[u.WebAppFramework.Node]=o;t._defaultWebAppFrameworkVersion[u.WebAppFramework.Node]=e;break;case"php":t._webAppFrameworkVersions[u.WebAppFramework.PHP]=o;t._defaultWebAppFrameworkVersion[u.WebAppFramework.PHP]=e;break;case"dotnetcore":t._webAppFrameworkVersions[u.WebAppFramework.AspNetCore]=o;t._defaultWebAppFrameworkVersion[u.WebAppFramework.AspNetCore]=e;break;case"go":t._webAppFrameworkVersions[u.WebAppFramework.Go]=o;t._defaultWebAppFrameworkVersion[u.WebAppFramework.Go]=e}}i.resolve()}else i.resolve()})),i.promise},n._beginGetDotNetCoreSDKVersion=function(){var n=Q.defer(),t="https://raw.githubusercontent.com/dotnet/core/master/release-notes/releases.json";return i.Base.Net2.ajax({uri:t,type:"GET",useRawAjax:!0}).then((function(i){s.LogHelper.LogInfo("beginGetDotNetCoreSDKVersion, OutCome: Success, csmRequest uri: {0}".format(t));n.resolve(i)}),(function(t){n.reject(o.AzureProjectLogHelper.getDetailedError(t,c.format("beginGetDotNetCoreSDKVersion")))})),n.promise},n})();h._webAppFrameworkVersions={};h._defaultWebAppFrameworkVersion={};h._versionMap={};h._appServiceArmManager=new f.AppServiceArmApiManager;h._dataFetched=!1;h.runtimeToSdkMapForDotNetCore={"1.0.5":"1.0.4","1.1.2":"1.0.4","2.0.5":"2.1.4","2.0.7":"2.1.105"};t.LinuxRuntimeStackUtility=h}))