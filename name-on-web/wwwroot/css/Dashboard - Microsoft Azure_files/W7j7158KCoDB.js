var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("VersionControl/TypeScript/TFS.VersionControl.ClientServices",["require","exports","o","a","$","Core/TypeScript/TFS.Core.Ajax","Core/TypeScript/TFS.Core","Core/TypeScript/TFS.Diag","VersionControl/TypeScript/Resources/TFS.Resources.VersionControl","Core/TypeScript/Generated/TFS.VersionControl.Common","VersionControl/TypeScript/TFS.VersionControl.WebApi","Core/TypeScript/TFS.ObjectModel","Core/TypeScript/TFS.Core.Utils","VersionControl/TypeScript/TFS.VersionControl.VersionSpecs","Core/TypeScript/TFS"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y){"use strict";function it(n,t){t===void 0&&(t=null);var i,r;return t?(i=p[t.id],i||(i=r=k.create(t,n),p[t.id]=r)):i=d.create(n),i}function rt(n,t,i,r){var e=this,u,f;i?(u=p[i],u?r.call(this,u):(f=l.TfsTeamProjectCollection.getConnection(n).getService(nt,!1),f.beginGetRepository(i,(function(t){var u=k.create(t,n);p[i]=u;r.call(e,u)})))):r.call(this,new d(n,t))}var w,p,b,k,d,g,nt,tt;i.defineProperty(t,"__esModule",{value:!0}),(function(n){n[n.TFS=0]="TFS";n[n.Git=1]="Git"})(w=t.RepositoryType||(t.RepositoryType={}));p={};t.getContext=it;t.beginGetContext=rt;b=(function(){function n(n,t,i){this._tfsContext=n;this._repositoryType=t;this._rootPath=i}return n.prototype.getRepositoryType=function(){return this._repositoryType},n.prototype.getTfsContext=function(){return this._tfsContext},n.prototype.getRootPath=function(){return this._rootPath},n.prototype.getRepositoryId=function(){return undefined},n.prototype.getClient=function(){return this._client||(this._client=this._createClient()),this._client},n.prototype._createClient=function(){return o.fail("getClient is abstract. Must be implemented in subclasses."),null},n.prototype.comparePaths=function(){return o.fail("comparePaths is abstract. Must be implemented in subclasses."),0},n.prototype.pathStartsWith=function(n,t){return(n||"").indexOf(t)===0},n})();t.RepositoryContext=b;k=(function(n){function t(t,i){var r=n.call(this,t,w.Git,"/")||this;return r._gitRepository=i,r}return __extends(t,n),t.create=function(n,i){return new t(i,n)},t.prototype.getRepository=function(){return this._gitRepository},t.prototype._createClient=function(){return l.TfsTeamProjectCollection.getConnection(this.getTfsContext()).getService(nt)},t.prototype.getGitClient=function(){return this.getClient()},t.prototype.comparePaths=function(n,t){return e.StringUtils.localeIgnoreCaseComparer(n,t)},t.prototype.getRepositoryId=function(){return this._gitRepository.id},t})(b);t.GitRepositoryContext=k;d=(function(n){function t(t,i){return i===void 0&&(i=null),n.call(this,t,w.TFS,"$/"+(i?i:""))||this}return __extends(t,n),t.create=function(n,i){return i===void 0&&(i=null),new t(n,i)},t.prototype._createClient=function(){return l.TfsTeamProjectCollection.getConnection(this.getTfsContext()).getService(tt)},t.prototype.getTfvcClient=function(){return this.getClient()},t.prototype.comparePaths=function(n,t){return e.StringUtils.localeComparer(n,t)},t.prototype.pathStartsWith=function(n,t){return(n||"").toLowerCase().indexOf((t||"").toLowerCase())===0},t})(b);t.TfVcRepositoryContext=d;g=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._getApiLocation=function(n){return this.getTfsContext().getActionUrl(n||"","versioncontrol",{area:"api"})},t.prototype._handleJsonContentError=function(n,t,i){n.xhr&&n.xhr.statusText==="parsererror"&&t.getRepositoryType()===w.TFS&&(n=new Error(s.ContentJsonParseErrorTFS));u.isFunction(i)?i.call(this,n):y.errorHandler.showError(n)},t.prototype.beginGetFileDiff=function(n,t,i,r){var u=this;f.postMvcJson(this._getApiLocation("fileDiff"),!1,{repositoryId:n.getRepositoryId()||"",diffParameters:a.stringifyMSJSON(t)},i,(function(t){u._handleJsonContentError(t,n,r)}))},t.prototype.beginGetChangeList=function(n,t,i,r,e){var o=this,s={repositoryId:n.getRepositoryId()||"",version:t,maxChanges:i};f.getMSJSON(this._getApiLocation("change"),s,(function(n){o._processChangeList(n);u.isFunction(r)&&r.call(o,n)}),e)},t.prototype.beginFetchMoreChanges=function(n,t,i,r,f){var e=this;this.beginGetChangeListChanges(n,t.version,i,t.changes?t.changes.length:0,(function(n){var f=n.results,i;t.changes=(t.changes||[]).concat(f);t.allChangesIncluded=!n.moreResultsAvailable;i=e._convertChangeCountsToObject(n.changeCounts);i&&(t.changeCounts&&u.each(t.changeCounts,(function(n,t){i[n]=(i[n]||0)+t})),t.changeCounts=i);u.isFunction(r)&&r.call(e,t)}),f)},t.prototype.beginGetChangeListChanges=function(n,t,i,r,u,e){var o={repositoryId:n.getRepositoryId()||"",version:t,maxChanges:i,skipCount:r};f.getMSJSON(this._getApiLocation("changeListChanges"),o,u,e)},t.prototype.beginGetAuthors=function(n,t,i){var r=this;y.queueRequest(this,n,"_authors",t,i,(function(t,i){f.getMSJSON(r._getApiLocation("authors"),{repositoryId:n.getRepositoryId()||""},(function(n){t(n)}),i)}))},t.prototype._processChangeList=function(n){n.changeCounts=this._convertChangeCountsToObject(n.changeCounts)},t.prototype._convertChangeCountsToObject=function(n){var t=null;return n&&(t={},u.each(n,(function(n,i){t[i.Key]=i.Value}))),t},t})(l.CollectionLevelTfsService);t.VersionControlClientServiceBase=g;nt=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.initializeTfsObject=function(t){n.prototype.initializeTfsObject.call(this,t);this._repositoriesByProject={};this._repositoriesByProjectAsync={};this._httpClient=t.getHttpClient(c.GitHttpClient)},t.prototype.beginGetAllRepositories=function(n,t){var i=this;y.queueRequest(this,this,"_collectionRepositories",n,t||y.handleError,(function(n,t){i._httpClient.beginGetAllRepositories().done((function(t){n(t)})).fail((function(){u.isFunction(t)&&t.call(i,"Error in GetAllRepositories")}))}))},t.prototype.beginGetProjectRepositories=function(n,t,i){var r=this;y.queueRequest(this,this._repositoriesByProjectAsync,n,t,i||y.handleError,(function(t,i){r._httpClient.beginGetProjectRepositories(n).done((function(i){r._repositoriesByProject[n]=i;t(i)})).fail((function(){u.isFunction(i)&&i.call(r,"Error in GetProjectRepositories")}))}))},t.prototype.beginGetRepository=function(n,t,i){var r=this;this.beginGetAllRepositories((function(f){var o;u.each(f,(function(t,i){if(i.id.toLowerCase()===(n||"").toLowerCase())return o=i,!1}));o?t.call(r,o):i?i.call(r,new Error(e.StringUtils.format(s.NoRepositoryByIdError,n))):y.handleError(new Error(e.StringUtils.format(s.NoRepositoryByIdError,n)))}),i)},t.prototype._clearCachedProjectRepositories=function(n){this._repositoriesByProject[n]=[];this._repositoriesByProjectAsync[n]=null},t.prototype.beginGetGitRefs=function(n,t,i){var r=this;y.queueRequest(this,n,"_refs",(function(n){var i=u.grep(n,(function(n){return n.isBranch})),f=u.grep(n,(function(n){return n.isTag}));t.call(r,n,i,f)}),i||y.handleError,(function(t,i){r._httpClient.beginGetGitRefs(n.id).done((function(n){t(u.map(n,(function(n){var t=n;return t.friendlyName=n.name,(n.name||"").indexOf("refs/heads/")===0?(t.friendlyName=n.name.substr(11),t.isBranch=!0):(n.name||"").indexOf("refs/tags/")===0?(t.friendlyName=n.name.substr(10),t.isTag=!0):t.friendlyName=n.name||"",t})))})).fail((function(){u.isFunction(i)&&i.call(r,"Error in GetGitRefs")}))}))},t.prototype.beginCreateCommit=function(n,t,i,r,u){var f={refUpdates:[{name:t.name,oldObjectId:t.objectId}],commits:[{comment:r,changes:[{changeType:h.VersionControlChangeType.Edit,item:{path:i},newContent:{contentType:h.ItemContentType.Base64Encoded,content:e.StringUtils.base64Encode(u)}}]}]};return this._httpClient.beginPushChanges(n.id,f)},t.prototype.beginCreateRepository=function(n,t,i,r,f){var e=this;this._httpClient.beginCreateRepository(n,t,i).done((function(t){e._clearCachedProjectRepositories(n);u.isFunction(r)&&r.call(e,t)})).fail((function(){u.isFunction(f)&&f.call(e,"Error in CreateRepository")}))},t.prototype.beginRenameRepository=function(n,t,i,r){var f=this;this._httpClient.beginRenameRepository(n.id,t).done((function(){n.name=t;u.isFunction(i)&&i.call(f,n)})).fail((function(){u.isFunction(r)&&r.call(f,"Error in RenameRepository")}))},t.prototype.beginDeleteRepository=function(n,t,i){var r=this;this._httpClient.beginDeleteRepository(n.id).done((function(){r._clearCachedProjectRepositories(n.project.id);u.isFunction(t)&&t.call(r)})).fail((function(){u.isFunction(i)&&i.call(r,"Error in DeleteRepository")}))},t.gitVersionStringToItemDescriptor=function(n){var i={},t=v.VersionSpec.parse(n);return t instanceof v.PreviousVersionSpec&&(i.versionOptions=h.GitVersionOptions.PreviousChange,t=t.version),t instanceof v.GitBranchVersionSpec?(i.versionType=h.GitVersionType.Branch,i.version=t.branchName):t instanceof v.GitCommitVersionSpec?(i.versionType=h.GitVersionType.Commit,i.version=t.commitId):t instanceof v.GitTagVersionSpec&&(i.versionType=h.GitVersionType.Tag,i.version=t.tagName),i},t.prototype.beginGetHistory=function(n,i,r,f){var h=this,o={fromDate:i.fromDate,toDate:i.toDate,fromCommitId:i.fromVersion,toCommitId:i.toVersion,itemPath:i.itemPath,excludeDeletes:i.excludeDeletes,user:i.user,$top:i.top,$skip:i.skip};i.itemVersion&&(o.itemVersion=t.gitVersionStringToItemDescriptor(i.itemVersion));i.compareVersion&&(o.compareVersion=t.gitVersionStringToItemDescriptor(i.compareVersion));this._httpClient.beginGetCommits(n.getRepositoryId(),o).done((function(n){r({moreResultsAvailable:n.hasMore,startingCommitId:n.startingCommitId,unprocessedCount:n.stillProcessing?1:0,unpopulatedCount:n.stillProcessing?1:0,results:u.map(n.commits,(function(n){var t={changeList:{comment:n.comment,commentTruncated:n.commentTruncated,owner:n.author.name,ownerDisplayName:e.StringUtils.format(s.CommitOwnerDisplayNameFormat,n.author.name,n.author.email),sortDate:n.committer.date,creationDate:n.author.date,changeCounts:n.changeCounts,version:"GC"+n.commitId}},i;return u.extend(t.changeList,{commitId:{full:n.commitId,short:n.commitId.substr(0,6)},commitTime:n.committer.date}),n.changes&&n.changes.length&&(i=n.changes[0],u.extend(t,{itemChangeType:i.changeType,serverItem:i.sourceServerItem})),t}))})})).fail((function(){u.isFunction(f)&&f.call(h,"Error in GetHistory")}))},t.prototype.beginGetItems=function(n,i,r,f,e){var o=this,s=[],h;r=r||{};h={itemDescriptors:u.map(i,(function(n){var i=t.gitVersionStringToItemDescriptor(n.version);return s.push(i),{path:n.path,version:i.version,versionOptions:i.versionOptions,versionType:i.versionType,recursionLevel:r.recursionLevel}})),includeContentMetadata:r.includeContentMetadata};this._httpClient.beginGetItems(n.getRepositoryId(),h).done((function(n){var t=[];u.each(n,(function(n,r){t.push(o._gitItemArrayToLegacyGitItem(r,i[n].version,s[n]))}));u.isFunction(f)&&f(t)})).fail((function(){u.isFunction(e)&&e.call(o,"Error in GetItems")}))},t.prototype.beginGetItem=function(n,i,r,f,e,o){var h=this,s;f=f||{recursionLevel:c.RecursionType.OneLevel};s=null;r&&(s=t.gitVersionStringToItemDescriptor(r));this._httpClient.beginGetItem(n.getRepositoryId(),i,s,f.recursionLevel,f.includeContentMetadata,!1,!1).done((function(n){var t=h._gitItemArrayToLegacyGitItem(n,r,s);u.isFunction(e)&&e(t)})).fail((function(){u.isFunction(o)&&o.call(h,"Error in GetItem")}))},t.prototype._gitItemArrayToLegacyGitItem=function(n,t,i){for(var u=n[0],f={isFolder:u.isFolder,contentMetadata:u.contentMetadata,gitObjectType:this._newToLegacyGitObjectType(u.gitObjectType),objectId:{full:u.objectId,short:u.objectId.substr(0,6)},serverItem:u.path,version:t,versionDescription:i.version?e.StringUtils.format(s.CommitDescriptionFormat,i.version.substr(0,6)):null,childItems:[]},r=1;r<n.length;r++)f.childItems.push({isFolder:n[r].isFolder,serverItem:n[r].path,gitObjectType:this._newToLegacyGitObjectType(n[r].gitObjectType),objectId:{full:n[r].objectId,short:n[r].objectId.substr(0,6)},version:t});return f},t.prototype._newToLegacyGitObjectType=function(n){switch(n){case h.GitObjectTypeNew.Bad:return h.GitObjectType.Bad;case h.GitObjectTypeNew.Blob:return h.GitObjectType.Blob;case h.GitObjectTypeNew.Commit:return h.GitObjectType.Commit;case h.GitObjectTypeNew.Ext2:return h.GitObjectType.Ext2;case h.GitObjectTypeNew.OfsDelta:return h.GitObjectType.OfsDelta;case h.GitObjectTypeNew.RefDelta:return h.GitObjectType.RefDelta;case h.GitObjectTypeNew.Tag:return h.GitObjectType.Tag;case h.GitObjectTypeNew.Tree:return h.GitObjectType.Tree}},t.prototype.beginGetPullRequests=function(n,t,i,r,f,e,o,s,h,c){var l=this,a=this._getRefName(f),v=this._getRefName(e);this._httpClient.beginGetAllPullRequests(n.getRepositoryId(),t,i,r,a,v,o,s).done((function(n){h(n)})).fail((function(){u.isFunction(c)&&c.call(l,"Error in GetPullRequests")}))},t.prototype.beginGetPullRequest=function(n,t,i,r){var f=this;this._httpClient.beginGetPullRequest(n.getRepositoryId(),t).done((function(n){i(n)})).fail((function(){u.isFunction(r)&&r.call(f,"Error in GetPullRequest")}))},t.prototype.beginCreatePullRequest=function(n,t,i,r,f,e,o,s){var h=this,c=this._getRefName(t),l=this._getRefName(i);this._httpClient.beginCreatePullRequest(n.getRepositoryId(),c,l,r,f,e).done((function(n){o(n)})).fail((function(){u.isFunction(s)&&s.call(h,"Error in CreatePullRequest")}))},t.prototype.beginUpdatePullRequest=function(n,t,i,r,f){var e=this;this._httpClient.beginUpdatePullRequest(n.getRepositoryId(),t,i).done((function(n){r(n)})).fail((function(){u.isFunction(f)&&f.call(e,"Error in UpdatePullRequests")}))},t.prototype.beginUpdatePullRequestReviewer=function(n,t,i,r,f,e){var o=this;this._httpClient.beginUpdatePullRequestReviewer(n.getRepositoryId(),t,i,r).done((function(n){f(n)})).fail((function(){u.isFunction(e)&&e.call(o,"Error in UpdatePullRequestReviewer")}))},t.prototype.beginAddPullRequestReviewer=function(n,t,i,r,f,e){var o=this;this._httpClient.beginAddPullRequestReviewer(n.getRepositoryId(),t,i,r).done((function(n){f(n)})).fail((function(){u.isFunction(e)&&e.call(o,"Error in AddPullRequestReviewer")}))},t.prototype.beginDeletePullRequestReviewer=function(n,t,i,r,f){var e=this;this._httpClient.beginDeletePullRequestReviewer(n.getRepositoryId(),t,i).done((function(n){r(n)})).fail((function(){u.isFunction(f)&&f.call(e,"Error in DeletePullRequestReviewer")}))},t.prototype.beginGetItemTextContent=function(n,i,r){var u=t.gitVersionStringToItemDescriptor(r);return u.path=i,this._httpClient.beginGetItemTextContent(n.getRepositoryId(),u)},t.prototype._getRefName=function(n){return n&&n.indexOf("refs/heads/")!==0?"refs/heads/"+n:n},t})(g);t.GitClientService=nt;tt=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.initializeTfsObject=function(t){n.prototype.initializeTfsObject.call(this,t);this._projectInfoByName={};this._httpClient=t.getHttpClient(c.TfvcHttpClient)},t.prototype.beginGetProjectInfo=function(n,t,i){var u=this,r=this._projectInfoByName[n];if(y.queuedRequestHasResult(r)){t.call(this,r);return}y.queueRequest(this,this._projectInfoByName,n,t,i||y.handleError,(function(t,i){u._httpClient.beginGetProjectInfo(n).done((function(n){t(n)})).fail((function(){i("Error")}))}))},t.prototype.beginGetProjectInfos=function(n,t){var i=this;y.queueRequest(this,this,"_cachedProjects",n,t||y.handleError,(function(n,t){i._httpClient.beginGetProjectInfos().done((function(t){n(t)})).fail((function(){t("Error")}))}))},t.prototype.beginCreateChangeset=function(n,t,i,r){var u={comment:i,changes:[{changeType:h.VersionControlChangeType.Edit,item:{path:t,version:n},newContent:{contentType:h.ItemContentType.Base64Encoded,content:e.StringUtils.base64Encode(r)}}]};return this._httpClient.beginCreateChangeset(u)},t.prototype._setProjectInfoFromViewData=function(n,t,i){this._projectInfoByName[n]=i;this._projectInfoByName[t]=i},t.prototype.beginGetHistory=function(n,t,i,r){var e=this,o={repositoryId:n.getRepositoryId()||"",searchCriteria:a.stringifyMSJSON(t)};f.postMvcJson(this._getApiLocation("history"),!1,o,(function(n){u.each(n.results,(function(n,t){e._processChangeList(t.changeList)}));t.excludeDeletes&&(n.results=u.grep(n.results,(function(n){return(n.itemChangeType&h.VersionControlChangeType.Delete)!=0?!1:!0})));u.isFunction(i)&&i.call(e,n)}),r)},t.prototype.beginGetShelvesets=function(n,t,i){f.getMSJSON(this._getApiLocation("shelvesets"),{owner:n},t,i)},t.prototype.beginGetItem=function(n,i,r,f,e,o){var h=this,l=f&&f.recursionLevel?f.recursionLevel:c.RecursionType.None,a=f&&f.includeContentMetadata,s;a?this.beginGetItems(n,[{version:r,path:i}],f,(function(n){if(u.isFunction(e)){var t;n&&n.length&&(t=n[0]);e(t)}}),o):(s=null,r&&(s=t.tfvcVersionStringToVersionDescriptor(r)),this._httpClient.beginGetItems(i,s,l).done((function(n){var i,t;n&&n.length&&(t=n[0],i={changeDate:t.changeDate,contentMetadata:h._newFileContentMetadataToLegacyFileContentMetadata(t.contentMetadata),deletionId:t.deletionId,isBranch:t.isBranch,isFolder:t.isFolder,isPendingChange:t.isPendingChange,isSymLink:t.isSymLink,serverItem:t.path,url:t.url,version:r,versionDescription:s.version},n.length>1&&(i.childItems=u.map(n.slice(1),(function(n){return{changeDate:n.changeDate,contentMetadata:h._newFileContentMetadataToLegacyFileContentMetadata(n.contentMetadata),isFolder:n.isFolder,isSymLink:n.isSymLink,serverItem:n.path,url:n.url,version:n.version?n.version.toString():"",versionDescription:s.version}}))));u.isFunction(e)&&e(i)})).fail((function(){u.isFunction(o)&&o.call(h,"Error in GetItem")})))},t.prototype.beginGetItems=function(n,i,r,f,e){var o=this,s=r&&r.recursionLevel?r.recursionLevel:c.RecursionType.None,h={includeContentMetadata:r?r.includeContentMetadata:!1,itemDescriptors:u.map(i,(function(n){var i=t.tfvcVersionStringToVersionDescriptor(n.version);return{path:n.path,version:i.version,versionOption:i.versionOption,versionType:i.versionType,recursionLevel:s}}))};return this._httpClient.beginGetItemsBatch(h).done((function(n){var t=[];u.each(n,(function(n,i){t.push(o._tfvcItemArrayToLegacyItemModel(i))}));u.isFunction(f)&&f(t)})).fail((function(){u.isFunction(e)&&e.call(o,"Error in GetItems")}))},t.prototype.beginGetItemTextContent=function(n,i,r){var f=v.VersionSpec.parse(r),u=t.versionSpecToVersionDescriptor(f),e={path:i,version:u.version,versionOption:u.versionOption,versionType:u.versionType};return this._httpClient.beginGetItemTextContent(e)},t.prototype._tfvcItemArrayToLegacyItemModel=function(n){var r=this,i,t;return n&&n.length&&(t=n[0],i={changeDate:t.changeDate,contentMetadata:this._newFileContentMetadataToLegacyFileContentMetadata(t.contentMetadata),isFolder:t.isFolder,isSymLink:t.isSymLink,serverItem:t.path,url:t.url,versionDescription:t.version?t.version.toString():null},n.length>1&&(i.childItems=u.map(n.slice(1),(function(n){return r._tfvcItemArrayToLegacyItemModel([n])})))),i},t.prototype._newFileContentMetadataToLegacyFileContentMetadata=function(n){var i,t;if(n)return n.extension&&(t=n.extension.lastIndexOf("."),i=t>-1?n.extension.substr(t+1):n.extension),{contentType:n.contentType,encoding:n.encoding,extension:i,fileName:n.fileName,isBinary:n.isBinary,isImage:n.isImage,vsLink:n.vsLink}},t.tfvcVersionStringToVersionDescriptor=function(n){var i=v.VersionSpec.parse(n);return t.versionSpecToVersionDescriptor(i)},t.versionSpecToVersionDescriptor=function(n){var i={},r;return n instanceof v.LatestVersionSpec?i.versionType=h.TfvcVersionType.Latest:n instanceof v.TipVersionSpec?(i.versionType=h.TfvcVersionType.Tip,i.version=n.version):n instanceof v.PreviousVersionSpec?(i=t.versionSpecToVersionDescriptor(n.version),i.versionOption=h.TfvcVersionOption.Previous):n instanceof v.ChangesetVersionSpec?(i.versionType=h.TfvcVersionType.Changeset,i.version=n.changeset):n instanceof v.ChangeVersionSpec?(i.versionType=h.TfvcVersionType.Change,i.version=n.changeset):n instanceof v.MergeSourceVersionSpec?(i.versionType=h.TfvcVersionType.MergeSource,i.version=n.changeset.toString(),i.versionOption=n.useRenameSource?h.TfvcVersionOption.UseRename:h.TfvcVersionOption.None):n instanceof v.ShelvesetVersionSpec?(i.versionType=h.TfvcVersionType.Shelveset,r=n,i.version=r.name+(r.owner?";"+r.owner:"")):n instanceof v.DateVersionSpec?(i.versionType=h.TfvcVersionType.Date,i.version=n.date):i.versionType=h.TfvcVersionType.Latest,i},t.prototype.beginGetPullRequests=function(){},t.prototype.beginGetPullRequest=function(){},t.prototype.beginCreatePullRequest=function(){},t.prototype.beginUpdatePullRequest=function(){},t.prototype.beginUpdatePullRequestReviewer=function(){},t.prototype.beginAddPullRequestReviewer=function(){},t.prototype.beginDeletePullRequestReviewer=function(){},t})(g);t.TfvcClientService=tt}))