var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("VersionControl/TypeScript/TFS.VersionControl.Data",["require","exports","f","o","$","Core/TypeScript/Generated/TFS.VersionControl.Common","VersionControl/TypeScript/TFS.VersionControl.ClientServices","Core/TypeScript/TFS.Azure","Core/TypeScript/TFS.Data.Cache","Core/TypeScript/TFS.Data","Core/TypeScript/TFS.ObjectModel","Core/TypeScript/TFS.Message"],(function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";function w(n,t){return{accountId:n,projectId:t}}function g(){return a||(a=s.createQueryCache(new b)),a}function y(n,t,i,r){var f=u.Deferred(),e=g().createView(n),s=e.fetch(w(t,i)),o=s;return r===h.LoadBehavior.ForceRefresh&&(o=e.refresh()),o.then((function(){f.resolve(e.items)}),(function(){f.reject()})),f.promise()}function it(n,t,i,r,f){var o=function(n){return n.id()===r},e=u.Deferred();return y(n,t,i,f).then((function(n){var t=n().first(o);t?e.resolve(t):e.reject()}),(function(){e.reject()})),e.promise()}function rt(n,t,i,r,f){var o=function(n){return n.name()===r},e=u.Deferred();return y(n,t,i,f).then((function(n){var t=n().first(o);t?e.resolve(t):e.reject()}),(function(){e.reject()})),e.promise()}function ut(){return v||(v=s.createQueryCache(new p)),v}var b,k,d,a,p,nt,tt,v;r.defineProperty(t,"__esModule",{value:!0});t.createRepositoriesSetDescriptor=w;b=(function(n){function t(){return n.call(this,"repository",36e5)||this}return __extends(t,n),t.prototype.createNewContext=function(){return{needsDefaultBranch:!1}},t.prototype.getDataSetName=function(n){return this.getTypeName()+"-"+n.accountId+"-"+n.projectId},t.prototype.getMergeInfo=function(){return{typeName:this.getTypeName(),id:"id"}},t.prototype.getData=function(n){var t=u.Deferred(),i=function(i){var r=c.TfsTeamProjectCollection.getConnection(i).getService(e.GitClientService,!1);r.beginGetProjectRepositories(n.projectId,(function(n){t.resolve(n)}),t.reject)};return o.awaitTfsContext(n).then(i,t.reject),t.promise()},t.prototype.postProcessData=function(n,t,i){i.needsDefaultBranch=!1;for(var r=0;r<n.length;r++)n[r].defaultBranch=n[r].defaultBranch||"",n[r].teamProjectUri=n[r].teamProjectUri||"",n[r].defaultBranch===""&&(i.needsDefaultBranch=!0)},t.prototype.getMessagesToSubscribeTo=function(){return[l.MessageTypes.Repository,l.MessageTypes.Commit]},t.prototype.shouldRefreshForMessage=function(n,t,i,r){switch(t.messageType){case l.MessageTypes.Repository:return this._shouldRefreshForRepository(t,i);case l.MessageTypes.Commit:return this._shouldRefreshForCommit(t,i,r)}},t.prototype._shouldRefreshForRepository=function(n,t){var i=l.Utils.getMessagePropertyValue(n,"projectId");return n.accountId===t.accountId&&i===t.projectId},t.prototype._shouldRefreshForCommit=function(n,t,i){var r=l.Utils.getMessagePropertyValue(n,"projectId"),u=i.needsDefaultBranch;return i.needsDefaultBranch=!1,n.accountId===t.accountId&&r===t.projectId&&u},t})(s.ContextAwareLoadable);k=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t})(i.Data.QueryCache);t.RepositoryQueryCache=k;d=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t})(i.Data.QueryView);t.RepositoryQueryView=d;a=null;t.getRepositoryQueryCache=g;t.getRepositories=y;t.getRepositoryById=it;t.getRepositoryByName=rt;p=(function(n){function t(){return n.call(this,"repositoryHistory",36e5)||this}return __extends(t,n),t.prototype.getDataSetName=function(n){var t="";return t=n.repositoryId&&n.projectName&&n.version?this.getTypeName()+"-"+n.accountId+"-"+n.projectName+"-"+n.repositoryId+"-"+n.version:n.repositoryId&&n.projectName?this.getTypeName()+"-"+n.accountId+"-"+n.projectName+"-"+n.repositoryId:n.projectName?this.getTypeName()+"-"+n.accountId+"-"+n.projectName:this.getTypeName()+"-"+n.accountId,n.serverItem&&(t=t+"-"+n.serverItem),n.isShelvesets&&(t=t+"-shelvesets-"+(n.authoredBy||"")),t},t.prototype.getMergeInfo=function(){return{typeName:this.getTypeName(),id:"id",properties:[{name:"changeList",mergeInfo:{typeName:"historyChangeList",id:"version",properties:[{name:"changes",mergeInfo:{typeName:"historyChanges",id:"sourceServerItem"}},{name:"notes",mergeInfo:{typeName:"historyNotes",id:"name"}}]}}]}},t.prototype.getData=function(n){var t=u.Deferred(),i,r;return n.isShelvesets&&n.repositoryId?(t.resolve([]),t.promise()):(i=function(i){var r,o=c.TfsTeamProjectCollection.getConnection(i.getTfsContext()),s;r=n.repositoryId?o.getService(e.GitClientService,!1):o.getService(e.TfvcClientService,!1);n.isShelvesets?r.beginGetShelvesets(n.authoredBy||i.getTfsContext().getCurrentIdentity().uniqueName,(function(n){for(var i,r=u.map(n,(function(n){return{changeList:n,itemChangeType:f.VersionControlChangeType.None,serverItem:""}})),e=0;e<r.length;e++)i=r[e],i.id=i.changeList.shelvesetName+";"+i.changeList.ownerId,i.changeList.sortDateSerialized=i.changeList.sortDate?i.changeList.sortDate.getTime():-1,i.changeList.creationDateSerialized=i.changeList.creationDate?i.changeList.creationDate.getTime():-1;t.resolve(r)}),t.reject):(s={itemPath:n.serverItem?n.serverItem:i.getRootPath(),itemVersion:n.version,top:250},r.beginGetHistory(i,s,(function(n){for(var i,r=0;r<n.results.length;r++)i=n.results[r],i.changeList.commitId?i.id=i.changeList.commitId.full:i.changeList.changesetId&&(i.id=i.changeList.changesetId),i.changeList.sortDateSerialized=i.changeList.sortDate?i.changeList.sortDate.getTime():-1,i.changeList.creationDateSerialized=i.changeList.creationDate?i.changeList.creationDate.getTime():-1;t.resolve(n.results)}),t.reject))},r=function(t){e.beginGetContext(t,n.projectName,n.repositoryId,i)},o.awaitTfsContext(n).then(r,t.reject),t.promise())},t.prototype.getMessagesToSubscribeTo=function(){return[l.MessageTypes.Commit,l.MessageTypes.Checkin,l.MessageTypes.Shelveset]},t.prototype.shouldRefreshForMessage=function(n,t,i){switch(t.messageType){case l.MessageTypes.Checkin:return this._shouldRefreshForCheckin(t,i);case l.MessageTypes.Commit:return this._shouldRefreshForCommit(t,i);case l.MessageTypes.Shelveset:return this._shouldRefreshForShelveset(t,i);default:return!1}},t.prototype._shouldRefreshForCheckin=function(n,t){return n.accountId===t.accountId&&!t.isShelvesets},t.prototype._shouldRefreshForShelveset=function(n,t){return n.accountId===t.accountId&&t.isShelvesets},t.prototype._shouldRefreshForCommit=function(n,t){var i=l.Utils.getMessagePropertyValue(n,"projectId"),r=l.Utils.getMessagePropertyValue(n,"repositoryId");return i===t.projectId&&r===t.repositoryId},t})(s.ContextAwareLoadable);t.LoadableRepositoryHistory=p;nt=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t})(i.Data.QueryCache);t.RepositoryHistoryQueryCache=nt;tt=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t})(i.Data.QueryView);t.RepositoryHistoryQueryView=tt;v=null;t.getRepositoryHistoryQueryCache=ut}))