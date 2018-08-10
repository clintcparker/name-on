define("Fx/Controls/FileUpload",["require","exports","f","o","ko","FxInternal/Controls/FileUpload"],(function(n,t,i,r,u,f){"use strict";function k(n){switch(n){case 2:return y;case 4:return s;case 3:return p;case 5:return w;default:return s}}function d(n,t){var i;return u.ignoreDependencies((function(){i=new f.ViewModel(n,t)})),i}var e,h,c;r.defineProperty(t,"__esModule",{value:!0});var o=2097152,l=o,a=10737418240,v=1048576,y=524288e7,s=2097152e5,p=1099511627776,w=1099511627776,b=2097152;e=(function(){function n(n){var t=i.extend({},n);this.type=0;this.contentType=t.contentType||0;this.encoding=t.encoding||null;this.maxFileSize=t.maxFileSize||o;this.chunkSize=t.chunkSize||l;this.category=t.category||null;this.uploadTarget=t.uploadTarget||null;this.notificationBlade=t.notificationBlade||null;this.resumable=i.initValue(t.resumable,!1);this.disableNotifications=i.initValue(t.disableNotifications,!1);this.resourceStrings=t.resourceStrings||null}return n})();t.FullFileUploadContext=e;h=(function(n){function t(t){var r=this,u=i.extend({},t);return r=n.call(this,u)||this,r.type=1,r.maxFileSize=a,r.chunkSize=v,r.longRunning=i.initValue(u.longRunning,!1),r}return __extends(t,n),t})(e);t.StreamFileUploadContext=h;c=(function(n){function t(t){var r=n.call(this,t)||this,u=i.extend({},t);return r.type=i.initValue(u.type,2),r.maxFileSize=i.initValue(u.maxFileSize,k(r.type)),r.chunkSize=u.chunkSize||b,r.context=i.initObservable(u.context,null),r.addFilenameToSasUri=i.initObservable(u.addFilenameToSasUri,!1),r.useDefaultFileInfoContext=i.initObservable(u.useDefaultFileInfoContext,!0),r.sasUriCommand=i.initObservable(u.sasUriCommand,null),r.useRenewSasUriCallback=i.initValue(r.useRenewSasUriCallback,!1),r}return __extends(t,n),t})(e);t.BlobStoreFileUploadContext=c;t.create=d}))