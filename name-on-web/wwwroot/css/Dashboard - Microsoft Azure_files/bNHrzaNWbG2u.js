var MsPortalImpl,MsPortalEarly;(function(n){"use strict";var t,i;try{t=window.localStorage;i=window.sessionStorage}catch(r){}n.localStorage=t;n.sessionStorage=i})(MsPortalImpl||(MsPortalImpl={})),
(function(n){function t(n,t){if(arguments.length===1)return n.sessionStorage.getItem("Redirect_BootParameters")||n.localStorage.getItem("Redirect_BootParameters");n.sessionStorage.setItem("Redirect_BootParameters",t);n.localStorage.setItem("Redirect_BootParameters",t)}n.getOrSetBootParameters=t})(MsPortalImpl||(MsPortalImpl={})),
(function(n){"use strict";var t=n.Element.prototype;t.remove=t.remove||function(){var n=this.parentNode;n&&n.removeChild(this)}})(window),
(function(n){"use strict";function f(t){t.timestamp=t.timestamp||Date.now();n.telemetryEvents.push(t)}function e(n,i,r,u,e){var o={source:"MsPortalEarly",action:u,actionModifier:"complete",data:undefined},s=t.getTimestamp();return function(){i.status>=400&&(e="Request Error");e?(r.reject(new Error(JSON.stringify({message:e,responseHeaders:i.getAllResponseHeaders(),responseText:i.responseText,status:i.status,statusText:i.statusText,uri:n}))),o.data=errorMessages,o.actionModifier="cancel"):r.resolve(i.response||i.responseText);o.duration=t.getTimestamp()-s;f(o)}}function s(n,t,r){var h=new i,f=new XMLHttpRequest,s;return r=r||{},f.open(r.method||"GET",n),r.rawAjax||["Authorization",r.authHeader,"Content-Type",r.contentType||"application/json","x-ms-client-session-id",o.sessionId,"x-ms-effective-locale",u.effectiveLocale,"x-ms-version",u.sdkVersion,].forEach((function(n){s?(n&&f.setRequestHeader(s,n),s=null):s=n})),f.onload=e(n,f,h,t),f.onerror=e(n,f,h,t,"Network Error"),f.send(r.body),h}var r=window,t=r.fx,u=t.environment,o=t.internalEnv,i;t.getTimestamp=t.getTimestamp||(function(n){if(n.now)return function(){return n.now()};var t=Date.now();return function(){return Date.now()-t}})(r.performance);n.telemetryEvents=[];n.internalTrace=f;i=(function(){function n(n,t){var i,r,u=new Promise(function(n,t){i=n;r=t});this.then=function(n,t){return u.then(n,t)};this.reject=r;this.resolve=i;typeof n=="number"&&(n===1?r(t):i(t))}return n})();n.LaterImpl=i;n.request=s})(MsPortalEarly||(MsPortalEarly={})),
(function(n){"use strict";function y(n){var t=JSON.parse(MsPortalImpl.getOrSetBootParameters(n)||n.sessionStorage.getItem("Redirect_PreviousBootParameters")||"{}");return t.environment||u.handleError("portalBootParameters is undefined"),n.sessionStorage.setItem("Redirect_PreviousBootParameters",JSON.stringify(t)),n.localStorage.removeItem("Redirect_BootParameters"),n.sessionStorage.removeItem("Redirect_BootParameters"),t}function h(n,t){try{return n()}catch(i){return t&&t(i)}}function e(n){return h((function(){var t=n.getItem(s);return n.removeItem(s),t&&JSON.parse(t)}))}function c(n,t,i){return t.forEach((function(t){Object.keys(t||{}).forEach((function(r){i.forEach((function(i){var f=i.toLowerCase(),o=f.length,e=r.toLowerCase(),u;e.indexOf(f)===0&&(u=e.substr(o),(f||u.indexOf(".")<0&&u.indexOf("_")<0)&&(n[u]=t[r]+""))}))}))})),n}function l(n,i){var u=Date.now(),f="&t="+(u-u%t.relexIntervalMs-t.relexIntervalMs);return(r.isDevelopmentMode||r.isTestMode)&&(f=""),t.relexUri+"?l="+(n||t.effectiveLocale)+f+"&jsonType="+(i||"assetTypes")}function p(t){f.trace=t||n.internalTrace;t&&n.telemetryEvents.forEach(t);n.telemetryEvents.length=0}function w(t,i,r){return r.then((function(r){if(r){var u=(r.oAuthToken||{}).authHeader,f=n.request(v,"EarlySettingsGet",{method:"POST",body:JSON.stringify(i),authHeader:u}).then((function(n){return n&&JSON.parse(n)}));i.forEach((function(n){t[n]=f.then((function(t){return t&&t[n]}))}))}}))}var i=window,u=i.fx,t=u.environment,r=u.internalEnv,s=t.bootstrapAuthorizationKey,o,f,a,v;i.performance||(i.performance={});i.performance.mark||(i.performance.mark=function(){});i.performance.measure||(i.performance.measure=function(){});u.bootParameters=u.bootParameters||y(MsPortalImpl);n.mergeFeatures=c;r.activeFlights={};Object.keys(t.allFlights).forEach((function(n){r.activeFlights[n]=Math.random()<t.allFlights[n]}));r.features=t.features=c({},[r.activeFlights,t.featuresFromConfig,t.featuresFromShellQuery],["","feature."]);o=h((function(){var r=e(MsPortalImpl.sessionStorage),u=e(MsPortalImpl.localStorage),t,f,i;return r?new n.LaterImpl(0,r):u&&n.tryFetchAccessToken?n.tryFetchAccessToken(u):(t=new n.LaterImpl,f=!!MsPortalImpl.localStorage.getItem("LastValidSessionTs")&&n.tryIFrameLogin,f?n.tryIFrameLogin(t):t.resolve(!0),i=MsPortalImpl.localStorage.clearCookies,i&&i(),t.then((function(n){if(n)return e(MsPortalImpl.sessionStorage)})))}),(function(){return new n.LaterImpl(0,null)}));t.hostingServiceEndpoint&&n.request(t.hostingServiceEndpoint+"/api/setCookie?sessionId="+r.sessionId,"HostingServiceSetCookie",{rawAjax:!0});f=u.early={trace:n.internalTrace,manifestCache:{getUri:l,promise:(function(){if(t.useCachedManifests)return n.request(l(),"EarlyManifestDownload").then((function(n){return n&&JSON.parse(n)}))})()},authBootstrapStatePromise:o};n.initializedTelemetry=p;a=t.features.inmemorysettings!=="true"&&t.features.preloadsettings!=="false";v=t.settingsBaseUri+"/Select"+t.settingsUriQuery;a&&(f.preloadSettings={},w(f.preloadSettings,["CrossTenant","DashboardInventory","Favorites","FileUpload","FirstVisited","General","HubsExtension","Part","Startboard","StartupNotifications",],o))})(MsPortalEarly||(MsPortalEarly={})),
(function(n){var t;(function(t){"use strict";function p(n,t){return(n||"").indexOf(t)!==-1}function b(n){var t=ft(n?n.obsoleteBundlesBitmask:0);return{internalEnv:f,shellRequireConfig:r.requireConfig,bootScripts:t,featuresFromShellConfig:r.featuresFromConfig,featuresFromShellQuery:o}}function k(n){for(var t=[],i=0;n;i++)n%2&&Array.isArray(c[i])&&t.push.apply(t,c[i]),n>>=1;return t}function ft(n){var i=c["*"].slice();return i.push.apply(i,k(n)),i.push.apply(i,r.postScripts),i.push.apply(i,t.patchUris),i}function et(n){var t=a.createElement("iframe");return t.classList.add("fxs-extension-frame"),t.setAttribute("tab-index","-1"),t.setAttribute("aria-hidden","true"),n||t.setAttribute("sandbox","allow-same-origin allow-scripts"),t}function ot(n,t){for(var i=0;i<n.length;i++)if(t(n[i]))return n[i]}function d(n){var a=n.extensionMetadata,p=a.name,w=n.pageVersion,rt=0,k=a.flights,s=ot(l(!a.isTestExtension&&k||{}),(function(n){return nt<(rt+=k[n])}))||a.uri,t={},v,d,y,h,it,b,c;return(ut==="true"&&p==="Microsoft_Azure_Compute"&&(s=s.replace("compute","compute-afd"),t.afd="true",t.bustcache="true"),v=s.indexOf("?"),d=v===-1?s:s.slice(0,v),s=n.isPrewarmingRequest&&a.prewarmUri||s,v>=0&&s.slice(v+1).split("&").forEach((function(n){var i=n.split("=");t[i[0]]=i[1]})),y=a.cacheability||0,h=[],r.passThroughVariables&&(h=h.concat(r.passThroughVariables)),y===0?t.sessionId=f.sessionId:y===2&&(w=r.pageVersion,h.push("configHash")),r.extensionQueryParameters&&(h=h.concat(r.extensionQueryParameters)),h.forEach((function(n){var i=r[n]||f[n];i&&(t[n]=i)})),it=p.toLowerCase(),b=it+"_",Object.keys(o).forEach((function(n){if(n.startsWith(b)){var i=n.substr(b.length);i==="clientoptimizations"&&(t[i]=o[n])}})),t.pageVersion=w,t.l=t.l||g,t.trustedAuthority=tt,t.extensionName=p,t.cacheability=y,n.reloadCount&&(t.retryAttempt=n.reloadCount,t.sessionId=f.sessionId),n.isPrewarmingRequest&&(t.environmentjson=!0,t["feature.environment"]=!0),w||(t.region=u.bootParameters.environment.region),r.traceStr&&(t.traceStr=r.traceStr),e.forceDisable?t[e.disableParameter]="true":e.forceIndex&&(t[e.indexParameter]=e.forceIndex),c=d+"?"+l(t).map((function(n){return n+"="+t[n]})).sort().join("&")+"#"+f.sessionId,/^\w+:\/\//.test(s))?c:c.startsWith("//")?i.location.protocol+c:c[0]==="/"?i.location.origin+c:i.location.origin+i.location.pathname+c}function st(n){n=n||r.featuresFromShellQuery;o=n}function ht(n){var t=JSON.stringify(b(n));return r.extensionEntryPointText+(";FxImpl.iframeInitialize("+t+");")}function ct(n){var i=n.features&&n.features.supportsprewarming==="true"||w.includes(n.name.toLowerCase());return t.browserSupportsWebWorkers&&h&&i?1:0}var i=window,u=i.fx,r=u.environment,f=u.internalEnv,e=r.cdn,c=r.extensionScripts,g=r.effectiveLocale,l=Object.keys,nt=r.features.forceflight==="true"?0:Math.random(),tt=i.location.host,o,y;st();var a=i.document,v=a.getElementById("extensionIframes"),it={};u.bootParameters.environment.extensionsMetadata.forEach((function(n){it[n.name]=n}));u.internalEnv.extensionRedirectMap=(function(){var t={},n;return(r.features.disabledextensionredirects||"").toLowerCase().split(",").forEach((function(n){t[n]=!0})),n={},u.bootParameters.environment.extensionsMetadata.forEach((function(i){var r=i.name;i.redirectTo&&!t[r.toLowerCase()]&&(n[r]=i.redirectTo)})),n})();var rt=p(i.location.search,"prewarming=true")+"",w=(r.features.prewarming||rt).toLowerCase().split(","),s=r.features.nativeperf==="true"&&i.performance,h=w[0]!=="false",ut=p(i.location.search,"afd=true")+"";t.browserSupportsWebWorkers=[i.Worker,i.fetch,i.Promise,i.Blob,].indexOf(undefined)===-1;t.patchUris=[];var lt=(function(){function t(t){var i=this,r,e,o;this.initializeReceived=new n.LaterImpl;this.telemetry={messageReceivedTimes:{}};this._bootHandler=function(n){var t=i._frame.contentWindow,r;if(n.source===t){r=i._getMessageKind(n);switch(r){case 0:t.postMessage({data:i._replyScript,kind:1},n.origin,[i._internalPort]);i.telemetry.messageReceivedTimes.bootGetV2=u.getTimestamp();i.telemetry.bootGetMessage=n.data;break;case 3:i.loadTime=(i.telemetry.messageReceivedTimes.initialized=u.getTimestamp())-i.telemetry.loadRequestedTime;i.initializeReceived.resolve(n.data.data);break;case 2:i._errorHandler(n.data)}}};this.telemetry.uriUsed=this._uri=d({extensionMetadata:t.metadata,pageVersion:t.pageVersion,reloadCount:t.retryCount});this._replyScript=ht(t.metadata);r=new MessageChannel;this._internalPort=r.port1;this.port=r.port2;this.telemetry.creationTime=u.getTimestamp();this._errorHandler=function(n){t.errorHandler({type:"ErrorLogged",error:n,timestamp:u.getTimestamp()})};this.telemetry.loadType=t.loadType;e=t.metadata.features;o=f.trace.nonsecure||e&&e.nonsecure==="true";this._frame=et(o)}return t.prototype.startLoad=function(){var t=this,n;this.telemetry.loadRequestedTime=u.getTimestamp();this._frame.setAttribute("src",this._uri);i.addEventListener("message",this._bootHandler);v.appendChild(this._frame);n=function(){i.removeEventListener("message",t._bootHandler)};this.initializeReceived.then(n,n)},t.prototype.cleanup=function(){var n=this;i.setTimeout((function(){v.removeChild(n._frame)}),1e3);this.telemetry.unloadTime=u.getTimestamp();i.removeEventListener("message",this._bootHandler)},t.prototype._getMessageKind=function(n){var t=n.data,i=t.signature;if(i===f.bootMessageSignature)return t.data?t.kind:0},t})(),at=(function(){function n(){var n=this;this._pool=[];var t=JSON.stringify(b()),u=r.extensionEntryPointText+(";FxImpl.webWorkerInitialize("+t+");"),f=URL.createObjectURL(new Blob([u],{type:"text/javascript"}));for(this._tryCreate=function(){if(n._pool.length<2){var t=new Promise(function(n){var r=i.setTimeout((function(){throw new Error("Timed out waiting for new worker to respond.");}),5e3),t=new Worker(f);t.onmessage=function(u){var f=u.data;if(f.kind===6)i.clearTimeout(r),t.onmessage=null,n(t);else throw new Error(JSON.stringify(f));}});return t.catch((function(){h=!1})),n._pool.push(t),!0}};this._tryCreate(););}return n.prototype.getWorker=function(){var t=this,n;return this._pool.length||(u.early.trace({action:"PreWarmer had empty pool on getWorker.",source:"ExtensionLoader/PreWarmer"}),this._tryCreate()),n=this._pool.pop(),n.then((function(){return i.setTimeout(t._tryCreate,3e3)})),n},n})(),vt=(function(){function t(t){var h=this,e,s,f;this.initializeReceived=new n.LaterImpl;this.telemetry={messageReceivedTimes:{}};e=this.telemetry.uriUsed=d({extensionMetadata:t.metadata,pageVersion:t.pageVersion,reloadCount:t.retryCount,isPrewarmingRequest:!0});this._errorHandler=t.errorHandler;this.loadTime=this.telemetry.loadRequestedTime=u.getTimestamp();s=new MessageChannel;this.port=s.port1;this._internalPort=s.port2;f=new URL(e);this._initializeMessage=i.fetch(e).then((function(n){return n.json()})).then((function(n){return{featuresFromShellConfig:r.featuresFromConfig,featuresFromShellQuery:o,environment:n,protocol:f.protocol,origin:f.origin,href:f.href,obsoleteScripts:k(t.metadata.obsoleteBundlesBitmask)}}));this._initializeMessage.catch((function(n){h.initializeReceived.reject({type:"EnvironmentFetchFailed",timestamp:u.getTimestamp(),error:n})}))}return t.prototype.startLoad=function(){var n=this;this._initializeMessage.then((function(t){y.getWorker().then((function(i){n._worker=i;i.onmessage=function(t){var r=t.data;r.kind===3?(i.onmessage=null,n.telemetry.messageReceivedTimes.initialized=u.getTimestamp(),n.loadTime=n.telemetry.messageReceivedTimes.initialized-n.loadTime,n.initializeReceived.resolve(r.data)):n._errorHandler({type:"ErrorLogged",error:r,timestamp:u.getTimestamp()})};i.postMessage(t,[n._internalPort])})).catch((function(){n.initializeReceived.reject({type:"WebWorkerFailed",timestamp:u.getTimestamp()})}))}))},t.prototype.cleanup=function(){var n=this;i.setTimeout((function(){n._worker.terminate()}),1e3);this.telemetry.unloadTime=u.getTimestamp()},t})(),yt=(function(){function t(t,i){this.telemetry=[];this.initializeReceived=new n.LaterImpl;this._metadata=t;this._loadType=ct(t);this._errorLogger=i}return t.prototype.setPageVersion=function(n){this._pageVersion=n},t.prototype.loadExtension=function(){var t=this,f,r,e,n,o,c;if(!this._currentContext){if(f=this.telemetry.length,r=this._metadata.name+"_ExtensionLoad",f>2){this.initializeReceived.reject({reloadCount:f,timestamp:u.getTimestamp(),type:"TooManyRefreshes"});return}e={metadata:this._metadata,pageVersion:this._pageVersion,retryCount:f,errorHandler:this._errorLogger,loadType:this._loadType};n=this._loadType===1&&h?new vt(e):new lt(e);this.shellPort=n.port;this._currentContext=n;this.telemetry.push(n.telemetry);o=function(r){i.clearTimeout(c);t._currentContext===n&&(t._errorLogger(r),t._loadType=0,n.cleanup(),t._currentContext=null,t.loadExtension())};n.initializeReceived.then((function(u){i.clearTimeout(c);s&&(s.mark(r+"End"),s.measure(r,r+"Start",r+"End"));t._currentContext===n&&(t.initializeReceived.resolve(u),t.loadTime=n.loadTime)}),o);n.startLoad();s&&s.mark(r+"Start");c=i.setTimeout((function(){o({reloadCount:f,timestamp:u.getTimestamp(),type:"InitializationTimeout"})}),9e4)}},t.prototype.unloadExtension=function(){this._currentContext&&this._currentContext.cleanup();this._currentContext=null;this.initializeReceived=new n.LaterImpl;this.telemetry=[]},t})();t.ExtensionLoader=yt;h&&t.browserSupportsWebWorkers&&(y=new at)})(t=n.ExtensionLoader||(n.ExtensionLoader={}))})(MsPortalEarly||(MsPortalEarly={})),
(function(){"use strict";function f(n,t,i){var r=u.createElement(i||"style");return r.className=n,t.appendChild(r)}var o=window,u=o.document,s=o.fx,t="Viva.Controls/Controls/",i="MsPortalImpl",r=i+".Controls/Controls/",n=".css",h=[t+"Viva.Balloon"+n,t+"Viva.Console"+n,t+"Viva.DockedBalloon"+n,t+"Viva.LogStream"+n,t+"Viva.MouseCompanion"+n,t+"Viva.Pager"+n,t+"Viva.Scrollbar"+n,t+"Viva.Settings"+n,t+"Viva.SingleSetting"+n,t+"Viva.TextStream"+n,t+"Base/Viva.Base"+n,t+"Base/Viva.ValidationPlacements"+n,t+"Forms/Viva.Button"+n,t+"Forms/Viva.CheckBox"+n,t+"Forms/Viva.DatePanel"+n,t+"Forms/Viva.DatePicker"+n,t+"Forms/Viva.DateTimePicker"+n,t+"Forms/Viva.DateTimeRangePicker"+n,t+"Forms/Viva.DropDown"+n,t+"Forms/Viva.EditableCombo"+n,t+"Forms/Viva.FileUpload"+n,t+"Forms/Viva.FileUpload2"+n,t+"Forms/Viva.FilterCombo"+n,t+"Forms/Viva.MultiLineTextBox"+n,t+"Forms/Viva.MultiSelectDropDown"+n,t+"Forms/Viva.NumericTextBox"+n,t+"Forms/Viva.OptionPicker"+n,t+"Forms/Viva.Password"+n,t+"Forms/Viva.SearchBox"+n,t+"Forms/Viva.Slider"+n,t+"Forms/Viva.Splitter"+n,t+"Forms/Viva.StringList"+n,t+"Forms/Viva.TextBox"+n,t+"Forms/Viva.TextInput"+n,t+"Forms/Viva.TimePicker"+n,t+"Lists/Viva.Grid1.ContextMenuShortcut"+n,t+"Lists/Viva.Grid1.EditableRow"+n,t+"Lists/Viva.Grid1.Filterable"+n,t+"Lists/Viva.Grid1.FocusableRow"+n,t+"Lists/Viva.Grid1.Formatters"+n,t+"Lists/Viva.Grid1.Groupable"+n,t+"Lists/Viva.Grid1.Hierarchical"+n,t+"Lists/Viva.Grid1"+n,t+"Lists/Viva.Grid1.Pageable"+n,t+"Lists/Viva.Grid1.PercentFormatter"+n,t+"Lists/Viva.Grid1.ReorderRow"+n,t+"Lists/Viva.Grid1.ResizableColumn"+n,t+"Lists/Viva.Grid1.Scrollable"+n,t+"Lists/Viva.Grid1.SelectableRowActivate"+n,t+"Lists/Viva.Grid1.SelectableRow"+n,t+"Lists/Viva.Grid1.SortableColumn"+n,t+"Lists/Viva.List"+n,t+"Lists/Viva.ListView.FocusableExtension"+n,t+"Lists/Viva.ListView.GroupableExtension"+n,t+"Lists/Viva.ListView"+n,t+"Lists/Viva.ListView.SelectableExtension"+n,t+"Lists/Viva.TreeView.FocusableExtension"+n,t+"Lists/Viva.TreeView"+n,t+"Lists/Viva.TreeView.OnDemandLoadableExtension"+n,t+"Lists/Viva.TreeView.LoadByContinuationToken"+n,t+"Toolbars/Viva.CommandButton"+n,t+"Toolbars/Viva.ToggleCommandButton"+n,t+"Toolbars/Viva.Toolbar"+n,t+"Toolbars/Viva.ToolbarButton"+n,t+"Visualization/Viva.BarGauge"+n,t+"Visualization/Viva.Chart"+n,t+"Visualization/Viva.ChartBase"+n,t+"Visualization/Viva.Donut"+n,t+"Visualization/Viva.Gauge"+n,t+"Visualization/Graph"+n,t+"Visualization/Graph.Skins"+n,t+"Visualization/Viva.Legend"+n,t+"Visualization/Viva.Map.HexagonLayoutExtension"+n,t+"Visualization/Viva.Map"+n,t+"Visualization/Viva.Metrics"+n,t+"Visualization/Viva.QuotaGauge"+n,t+"Visualization/Viva.SparkLine"+n,t+"Visualization/Viva.SvgBase"+n,t+"Visualization/Viva.UsageGauge"+n,i+"/Parts/Parts.Chart"+n,i+"/Parts/Parts.Collection"+n,i+"/Parts/Parts.CollectionSummary"+n,i+"/Parts/Parts.Donut"+n,i+"/Parts/Parts.fileSummary"+n,i+"/Parts/Parts.InfoList"+n,i+"/Parts/Parts.ButtonPart"+n,i+"/Parts/Parts.Asset"+n,i+"/Parts/Parts.QuickStart"+n,i+"/Parts/Parts.QuotaGauge"+n,i+"/Parts/Parts.Provisioning"+n,i+"/Parts/Parts.ResourceSummary"+n,i+"/Parts/Parts.SingleValueGauge"+n,i+"/Parts/Parts.Properties"+n,i+"/Parts/Parts.SpecPicker"+n,i+"/Parts/Parts.PricingTier"+n,i+"/Controls/ActionBars/Controls.ActionBarBase"+n,i+"/Controls/ActionBars/Controls.CreateActionBar"+n,i+"/Controls/ActionBars/Controls.GenericActionBar"+n,i+"/Controls/ActionBars/Controls.PickerActionBar"+n,i+"/Controls/Controls.Notice"+n,i+"/Controls/Controls.HeroBanner"+n,i+"/Controls/Controls.HotSpot"+n,i+"/Controls/Controls.FileDownloadButton"+n,i+"/Controls/Controls.Picker"+n,i+"/Controls/Controls.PickerV3"+n,i+"/Controls/Controls.Wizard"+n,i+"/Controls/Controls.InfoBox"+n,i+"/Controls/Forms/AsyncFileUpload"+n,i+"/Controls/Forms/Controls.TokenComboBox"+n,i+"/Controls/Forms/GroupDropDown"+n,r+"Base"+n,r+"Console"+n,r+"IFrame"+n,r+"DockedBalloon"+n,r+"LogStream"+n,r+"Data/QueryBuilder"+n,r+"Documents/DiscussionThread"+n,r+"Documents/Editor.DiscussionExtension"+n,r+"Documents/Editor"+n,r+"Forms/Attachment"+n,r+"Forms/CopyableLabel"+n,r+"Forms/FileUpload"+n,r+"Forms/History"+n,r+"Forms/StringList"+n,r+"Lists/Grid1.Formatters"+n,r+"Lists/Grid1.SelectableRow"+n,r+"Lists/List"+n,r+"Lists/ListView"+n,r+"Lists/Menu"+n,r+"Lists/Base2/Base"+n,r+"Lists/Grid2/GridB.ContextMenu"+n,r+"Lists/Grid2/GridB.DemandLoading"+n,r+"Lists/Grid2/GridB.Focus"+n,r+"Lists/Grid2/GridB.Formatters"+n,r+"Lists/Grid2/GridB.Grouping"+n,r+"Lists/Grid2/GridB.Hierarchical"+n,r+"Lists/Grid2/GridB.Paging"+n,r+"Lists/Grid2/GridB.Reordering"+n,r+"Lists/Grid2/GridB.Resizing"+n,r+"Lists/Grid2/GridB.Scrolling"+n,r+"Lists/Grid2/GridB.Search"+n,r+"Lists/Grid2/GridB.Selection"+n,r+"Lists/Grid2/GridB.Sorting"+n,r+"Lists/Grid2/GridB"+n,r+"Markdown"+n,r+"PartPinner"+n,r+"SearchBox"+n,r+"SimpleButton"+n,r+"SpecComparisonTable"+n,r+"TextBlock"+n,r+"Toolbars/Toolbar"+n,r+"Visualization/Chart"+n,r+"Visualization/PairedTimeline"+n,r+"Visualization/PairedTimelineBadges"+n,r+"Visualization/ProgressBar"+n,r+"Visualization/RangeSelection"+n,i+".Controls/Definitions/Common"+n,i+".Controls/Fields/DayPicker"+n,i+".Controls/Fields/DurationPicker"+n,i+".Controls/Fields/Fields"+n,i+".Controls/Fields/Section"+n,i+".Controls/Fields/Selector"+n,i+".Controls/Fields/CreatorAndSelector"+n,i+"/Widgets/Widgets.Blade"+n,i+"/Themes/Themes.Reset"+n,i+"/Themes/Themes.Blue"+n,i+"/Themes/Themes.Dark"+n,i+"/Themes/Themes.Light"+n,i+"/Themes/Themes.Azure"+n,i+"/Themes/Themes.DarkMode"+n,i+"/Themes/Themes.LightMode"+n,i+"/Themes/Themes.Universal"+n,],e=f("",u.head,"div");h.forEach((function(n){f(n,e)}));s.injectCss=function(n,t){var i=/Less\/(.*\.css)|$/.exec(n.id)[1],r=e.getElementsByClassName(i)[0]||f(i,e),o=r.styleSheet;o?o.cssText=t:r.appendChild(u.createTextNode(t))}})(MsPortalEarly||(MsPortalEarly={}))