var __extends;define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Internal/CancelablePromise",["require","exports","$"],(function(n,t,i){"use strict";return (function(){function n(){}return n.createCancelablePromise=function(n){var t=this,r=i.Deferred(),e=r.promise(),u=!1,f=!1,o=i.Callbacks("once memory");return i.extend(e,{cancel:function(){return u?t:(f=!0,o.fire(),t)},canceled:function(){for(var i=[],n=0;n<arguments.length;n++)i[n]=arguments[n];return i.forEach((function(n){o.add(n)})),t}}),n.then((function(){(u=!0,f)||r.resolve.apply(this,arguments)}),(function(){(u=!0,f)||r.reject.apply(this,arguments)})),e},n})()}));define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/ErrorBase",["require","exports"],(function(){"use strict";var n=(function(){function n(n){Error.apply(this,arguments);this.name=this.constructor.prototype.name;this.message=n}return n})();return n.prototype=Error.prototype,n}));__extends=this&&this.__extends||(function(){var n=Object.setPrototypeOf||{__proto__:
[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/AbstractMethodError",["require","exports","o","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/ErrorBase"],(function(n,t,i,r){"use strict";return (function(n){function t(t,i){return n.call(this,"cannot call abstract method {1} of class {0}. Make sure it is implemented in a derived class.".format(t,i))||this}return __extends(t,n),t})(r)}));__extends=this&&this.__extends||(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}
})();define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/InvalidOperationError",["require","exports","o","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/ErrorBase"],(function(n,t,i,r){"use strict";return (function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t})(r)}));define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Data/DataViewBase",["require","exports","f","i","o","ko","$","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Internal/CancelablePromise","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/InvalidOperationError","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/AbstractMethodError"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";return (function(){function n(){var n=this;this._hasAtLeastOneReloadBeenIssuedForCurrentQuery=!1;this._data=f.observable(null);this._currentLoadPromise=f.observable(null);this._currentIsLoadingPromise=f.observable(null);this._currentRefreshPromise=
f.observable(null);this._currentIsRefreshingPromise=f.observable(null);this._onLoadedCallbacks=e.Callbacks();this._isDisposed=!1;this._isLoading=f.pureComputed((function(){return!!(n._currentLoadPromise&&n._currentIsLoadingPromise())}));this._isLoadingPromise=f.pureComputed((function(){return n._currentIsLoadingPromise()}));this._loadPromise=f.pureComputed((function(){return n._currentLoadPromise()}));this._isRefreshing=f.pureComputed((function(){return!!(n._currentRefreshPromise&&n._currentRefreshPromise())}));this._isRefreshingPromise=f.pureComputed((function(){return n._currentIsRefreshingPromise()}));this._refreshPromise=f.pureComputed((function(){return n._currentRefreshPromise()}));this._lifetimeManager=new r.TriggerableLifetimeManager}return u.defineProperty(n.prototype,"query",{get:function(){return this._query},enumerable:!0,configurable:!0}),u.defineProperty(n.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0}),u.defineProperty(n.prototype,"isLoading",{get:
function(){return this._isLoading},enumerable:!0,configurable:!0}),u.defineProperty(n.prototype,"isRefreshing",{get:function(){return this._isRefreshing},enumerable:!0,configurable:!0}),n.prototype.dispose=function(){this._isDisposed||(this._cancelCurrentLoad(),this._cancelCurrentRefresh(),this._hasAtLeastOneReloadBeenIssuedForCurrentQuery&&this._release(),this._isLoading.dispose(),this._isLoadingPromise.dispose(),this._loadPromise.dispose(),this._isRefreshing.dispose(),this._isRefreshingPromise.dispose(),this._refreshPromise.dispose(),this._isDisposed=!0,this._lifetimeManager.dispose())},n.prototype.setQuery=function(n,t){var r=!this._isQueryEqual(this._query,n),i=this._latestLoadPromise;return(r||t)&&(this._query!==undefined&&this._release(),this._query=n,this._hasAtLeastOneReloadBeenIssuedForCurrentQuery=!1,i=this.reload()),i},n.prototype.reload=function(){if(this._cancelCurrentLoad(),this._cancelCurrentRefresh(),this._query===undefined)throw new s("attempt to reload before query has been set. Make sure to call 'setQuery' before calling 'reload'.");
this._hasAtLeastOneReloadBeenIssuedForCurrentQuery&&this._release();var r=this._load(this._query),i=o.createCancelablePromise(r),t=e.Deferred(),n=this;return i.done((function(){var i=arguments[0];n._data(i);n._onLoadedCallbacks.fire(i);t.resolve()})).fail((function(){t.reject()})).always((function(){n._currentLoadPromise(null);n._currentIsLoadingPromise(null)})).canceled((function(){t.resolve();n._currentLoadPromise(null);n._currentIsLoadingPromise(null)})),this._currentLoadPromise(i),this._currentIsLoadingPromise(t.promise()),this._latestLoadPromise=i.promise(),this._hasAtLeastOneReloadBeenIssuedForCurrentQuery=!0,this._latestLoadPromise},n.prototype.refresh=function(n){var t=this;if(this._query===undefined)throw new s("attempt to refresh before query has been set. Make sure to call 'setQuery' before calling 'refresh'.");if(n&&this._cancelCurrentRefresh(),this._isLoading())return this._currentLoadPromise();if(this._isRefreshing())return this._currentRefreshPromise();var u=this._refresh(),r=o.
createCancelablePromise(u),i=e.Deferred();return r.done((function(){i.resolve()})).fail((function(){i.reject()})).always((function(){t._currentRefreshPromise(null);t._currentIsRefreshingPromise(null)})).canceled((function(){i.resolve();t._currentRefreshPromise(null);t._currentIsRefreshingPromise(null)})),this._currentRefreshPromise(r),this._currentIsRefreshingPromise(i.promise()),r.promise()},n.prototype.onLoaded=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return this._onLoadedCallbacks.add(t),this},n.prototype._load=function(){throw new h("DataViewBase","_load");},n.prototype._refresh=function(){return e.Deferred().promise()},n.prototype._release=function(){},n.prototype._isQueryEqual=function(n,t){return i.deepEquals(f.toJS(n),f.toJS(t))},n.prototype._cancelCurrentLoad=function(){this._currentLoadPromise()&&this._currentLoadPromise().cancel();this._currentLoadPromise(null);this._currentIsLoadingPromise(null)},n.prototype._cancelCurrentRefresh=function(){this._currentRefreshPromise(
)&&this._currentRefreshPromise().cancel();this._currentRefreshPromise(null);this._currentIsRefreshingPromise(null)},n})()}));__extends=this&&this.__extends||(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/ArgumentError",["require","exports","o","Websites/ClientResources/ExtensionCoreResources","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/ErrorBase"],(function(n,t,i,r,u){"use strict";return (function(n){function t(t,i){var e=this,u=i?r.reasonMessage.format(i):"",f="'{0}'. {1}".format(t,u);return n.call(this,r.Validation.invalidArgument.format(f))||this}return __extends(t,n),t})(u)}));define("WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Utilities/DateTimeUtility",
["require","exports","o","Websites/ClientResources/ExtensionCoreResources","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Polyfills/ArgumentError"],(function(n,t,i,r,u){"use strict";var f,e;i.defineProperty(t,"__esModule",{value:!0}),(function(n){n[n.Milliseconds=0]="Milliseconds";n[n.Seconds=1]="Seconds";n[n.Minutes=2]="Minutes";n[n.Hours=3]="Hours";n[n.Days=4]="Days"})(f=t.TimeUnit||(t.TimeUnit={}));e=(function(){function n(){}return n.toFriendlyDurationString=function(t,i){var u=function(n,t){var i=Math.pow(10,t);return Math.round(n*i)/i},c=n.getDuration(t,i,f.Milliseconds),e=n.getDuration(t,i,f.Seconds),o=n.getDuration(t,i,f.Minutes),s=n.getDuration(t,i,f.Hours),h=n.getDuration(t,i,f.Days);return h>=1?(h===1?r.durationDay:r.durationDays).format(u(h,2)):s>=1?(s===1?r.durationHour:r.durationHours).format(u(s,2)):o>=1?(o===1?r.durationMinute:r.durationMinutes).format(u(o,2)):e>=1?(e===1?r.durationSecond:r.durationSeconds).format(u(e,2)):(c===1?r.durationMillisecond:r.durationMilliseconds)
.format(u(c,2))},n.getDuration=function(n,t,i){var r=t-n;if(r<0)throw new u("Start time must be before end time");switch(i){case f.Milliseconds:return r;case f.Seconds:return r/1e3;case f.Minutes:return r/6e4;case f.Hours:return r/36e5;case f.Days:return r/864e5}},n.getMinutesFromXmlTimeDuration=function(n){var t,i=null;return(t=n.match(/PT([0-6]{0,1}[0-9])M/))!==null?i=parseInt(t[1],10):(t=n.match(/PT([0-2]{0,1}[0-9])H/))!==null?i=parseInt(t[1],10)*60:(t=n.match(/PT([0-2]{0,1}[0-9])H([0-6]{0,1}[0-9])M/))!==null?(i=parseInt(t[1],10)*60,i=i+parseInt(t[2],10)):(t=n.match(/P(\d+)D/))!==null?i=parseInt(t[1],10)*1440:(t=n.match(/P(\d+)DT([0-2]{0,1}[0-9])H/))!==null?(i=parseInt(t[1],10)*1440,i=i+parseInt(t[2],10)*60):(t=n.match(/P(\d+)DT([0-2]{0,1}[0-9])H([0-6]{0,1}[0-9])M/))!==null&&(i=parseInt(t[1],10)*1440,i=i+parseInt(t[2],10)*60,i=i+parseInt(t[3],10)),i},n.getXmlTimespanFromMinutes=function(n){var f,i,r,t,u;return n?(i=parseInt(n.toString(),10),t=parseInt((i/60).toString(),10),u=i%60,i>=
1440?(r=parseInt((t/24).toString(),10),t=t-r*24,f=t?u?"P{0}DT{1}H{2}M".format(r,t,u):"P{0}D{1}H".format(r,t):"P{0}D".format(r)):f=i>=60?u?"PT{0}H{1}M".format(t,u):"PT{0}H".format(t):"PT{0}M".format(i),f):""},n.roundToLowerHalfHour=function(n){var t=new Date(n.toString());return t.setMinutes((t.getMinutes()/30>>0)*30,0,0),t},n.roundToHigherHalfHour=function(t){var i=n.roundToLowerHalfHour(t);return i.setMinutes(i.getMinutes()+30,0,0),i},n})();t.DateTimeUtility=e}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Ajax",["require","exports","f","$","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Net/AjaxOld"],(function(n,t,i,r,u){"use strict";var f=(function(){function n(){}return n.getMetrics=function(n){return u.post("/api/MonitoringV2/GetMetricSelection",n)},n.getAllMetricDefinitions=function(t){var f=r.Deferred(),e;return(e=i.Data.Loader.getDataSet(t.ResourceIdentifier,!0),n._metricDefinitionsPromises[t.ResourceIdentifier])?n._metricDefinitionsPromises[t.ResourceIdentifier]:
(n._metricDefinitionsPromises[t.ResourceIdentifier]=f.promise(),u.post("/api/MonitoringV2/AllMetricDefinitions",t).always((function(){delete n._metricDefinitionsPromises[t.ResourceIdentifier]})).done((function(n){e.merge(n);f.resolve(e.data())})).fail((function(){f.reject()})),f.promise())},n.getAvailabilityConfiguration=function(n,t){return u.post("/api/Monitoring/GetAvailabilityConfiguration",{subscriptionId:n,resourceIdentifier:t})},n.updateAvailabilityConfiguration=function(n,t,i){return u.post("/api/Monitoring/UpdateAvailabilityConfiguration",{subscriptionId:n,resourceIdentifier:t,endpointConfigs:i})},n})();return f._metricDefinitionsPromises={},f}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/ExtensionAssets/Constants",["require","exports","o"],(function(n,t,i){"use strict";var u,f,o,s,r,e,h;i.defineProperty(t,"__esModule",{value:!0});u=(function(){function n(){}return n})();u.listAlertMetricsUri="api/Alerts/ListAlertMetrics";u.createOrUpdateAlertRuleUri="api/Alerts/CreateOrUpdateAlertRule";
u.getAlertRuleUri="api/Alerts/GetAlertRule";u.getAlertsSummaryUri="api/Alerts/GetAlertsSummary";u.deleteAlertRuleUri="api/Alerts/DeleteAlertRule";u.isMonitoringDisabledUri="api/Alerts/IsMonitoringDisabled";t.AlertUris=u;f=(function(){function n(){}return n})();f.ruleNameMaxLength=32;f.ruleNameRegEx="^[a-zA-Z0-9,.\\s]*$";f.ruleDescriptionMaxLength=128;f.ruleDescriptionRegEx="^[a-zA-Z0-9,.\\s]*$";f.ruleThresholdRegEx="(^\\d+(\\.\\d{1,3})?$)|(^\\.d{1,3}?$)";f.ruleAdditionalEmailsRegEx="^([a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@(?!.*\\.\\..*)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})?$|^([a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@(?!.*\\.\\..*)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})(;[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@(?!.*\\.\\..*)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})+$";t.Validations=f;o=(function(){function n(){}return n})();o.days01InHours=24;o.days07InHours=7*o.days01InHours;o.days07=7;t.TimeRange=o;s=(function(){function n(){}return n})();s.Unlimited=-1;s.UsageWarningLimit=80;s.listUsageMetricsUri="api/Monitoring/ListUsageMetrics";t.
UsageMetric=s;r=(function(){function n(){}return n})();r.Percent="Percent";r.Count="Count";r.Seconds="Seconds";r.Milliseconds="Milliseconds";r.Bytes="Bytes";r.BytesPerSecond="BytesPerSecond";r.CountPerSecond="CountPerSecond";t.MetricUnit=r;e=(function(){function n(){}return n})();e.AddAlert="AddAlertRule";e.SaveAlert="SaveAlertRule";e.EnableAlert="EnableAlertRule";e.DisableAlert="DisableAlertRule";e.DeleteAlert="DeleteAlertRule";t.NotificationEventSource=e;h=(function(){function n(){}return n})();h.metricColors=["azc-color-g0","azc-color-h0","azc-color-i0","azc-color-a1","azc-color-b1","azc-color-c1","azc-color-d1","azc-color-e1","azc-color-f1","azc-color-g1"];t.MetricChartColors=h}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Ajax/Ajax.Usage",["require","exports","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Net/AjaxOld","WebsitesExtension/TypeScript/Deprecated/Monitoring/ExtensionAssets/Constants"],(function(n,t,i,r){"use strict";return (function(){function n(){}return n.
listUsageMetrics=function(n,t){return i.post(r.UsageMetric.listUsageMetricsUri,{subscriptionId:n,resourceUri:t})},n})()}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/TimeRange",["require","exports","o","Websites/ClientResources/MonitoringResources"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});var u=(function(){function n(){}return n.AllTimeRanges=function(){return[n.ThirtyMinutes,n.SixHours,n.TwentyFourHours,n.SevenDays,n.OneHour]},n.GetMetricTimeRange=function(t){return n.AllTimeRanges().first((function(n){return n.TimeRange===t}))},n})();u.SevenDays={TimeRange:"P7D",TimeGrain:"P1D",DisplayName:"7 Days",LongFormatter:"MM/dd",ShortFormatter:"dd",DisplayNameForPartTitle:r.metricSelectorPastWeek};u.TwentyFourHours={TimeRange:"PT24H",TimeGrain:"PT1H",DisplayName:"24 Hours",LongFormatter:"ht",ShortFormatter:"h",DisplayNameForPartTitle:r.metricSelectorToday};u.SixHours={TimeRange:"PT6H",TimeGrain:"PT1H",DisplayName:"6 Hours",LongFormatter:"ht",
ShortFormatter:"h",DisplayNameForPartTitle:""};u.ThirtyMinutes={TimeRange:"PT30M",TimeGrain:"PT1M",DisplayName:"Half Hour",LongFormatter:"min",ShortFormatter:"m",DisplayNameForPartTitle:""};u.OneHour={TimeRange:"PT1H",TimeGrain:"PT5M",DisplayName:"One Hour",LongFormatter:"min",ShortFormatter:"m",DisplayNameForPartTitle:r.metricSelectorPastHour};t.MetricTimeRange=u}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/AllMetricsQueryParameter",["require","exports","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/TimeRange"],(function(n,t,i){"use strict";return (function(){function n(n,t){this.chartStartDate=null;this.ResourceIdentifier=t;this.SubscriptionId=n;this.timeRange=i.MetricTimeRange.TwentyFourHours.TimeRange;this.timeGrain=i.MetricTimeRange.TwentyFourHours.TimeGrain}return n})()}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/MetricSelectionQueryParameter",["require","exports","f"],(function(n,t,i){"use strict";return (function(){function n(
n){var t=new Date,r=i.ViewModels.Services.ResourceTypes.parseResourceDescriptor(n.ResourceUri);this.chartStartDate=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),0,0,0);this.ResourceIdentifier=n.ResourceUri;this.SubscriptionId=r.subscription;this.timeRange=n.DefaultTimeRange;this.timeGrain=n.DefaultTimeGrain;n.StartDate&&(this.chartStartDate=n.StartDate);n.EndDate&&(this.chartEndDate=n.EndDate);this.chartStartDate&&this.chartEndDate&&(this.timeRange=null);this.selection=n.GetMetricSelection(this.SubscriptionId,this.ResourceIdentifier)}return n})()}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/TimeWindow",["require","exports"],(function(){"use strict";return (function(){function n(){}return n})()}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Utilities/TimeSpanUtility",["require","exports"],(function(){"use strict";return (function(){function n(){}return n.toSeconds=function(n){var i,t=0;return n?((i=n.match(/PT([0-6]{0,1}[0-9])S/))!==null?t=
parseInt(i[1],10):(i=n.match(/PT([0-6]{0,1}[0-9])M/))!==null?t=parseInt(i[1],10)*60:(i=n.match(/PT([0-2]{0,1}[0-9])M([0-6]{0,1}[0-9])S/))!==null?(t=parseInt(i[1],10)*60,t=t+parseInt(i[2],10)):(i=n.match(/PT([0-2]{0,1}[0-9])H/))!==null?t=parseInt(i[1],10)*3600:(i=n.match(/PT([0-2]{0,1}[0-9])H([0-6]{0,1}[0-9])M/))!==null?(t=parseInt(i[1],10)*3600,t=t+parseInt(i[2],10)*60):(i=n.match(/PT([0-2]{0,1}[0-9])H([0-6]{0,1}[0-9])M([0-6]{0,1}[0-9])S/))!==null?(t=parseInt(i[1],10)*3600,t=t+parseInt(i[2],10)*60,t=t+parseInt(i[2],10)):(i=n.match(/P(\d+)D/))!==null?t=parseInt(i[1],10)*86400:(i=n.match(/P(\d+)DT([0-2]{0,1}[0-9])H/))!==null?(t=parseInt(i[1],10)*86400,t=t+parseInt(i[2],10)*3600):(i=n.match(/P(\d+)DT([0-2]{0,1}[0-9])H([0-6]{0,1}[0-9])M/))!==null?(t=parseInt(i[1],10)*86400,t=t+parseInt(i[2],10)*3600,t=t+parseInt(i[3],10)*60):(i=n.match(/P(\d+)DT([0-2]{0,1}[0-9])H([0-6]{0,1}[0-9])M([0-6]{0,1}[0-9])S/))!==null&&(t=parseInt(i[1],10)*86400,t=t+parseInt(i[2],10)*3600,t=t+parseInt(i[3],10)*60,t=
t+parseInt(i[3],10)),t):t},n.toString=function(n){var t,i,r,u;return t=parseInt(n.toString(),10),i=parseInt(t/60,10),t=t%60,r=parseInt(i/60,10),i=i%60,u=parseInt(r/24,10),r=r%24,u===0?r===0?i===0?"PT{0}S".format(t):t===0?"PT{0}M".format(i):"PT{0}M{1}S".format(i,t):i===0?t===0?"PT{0}H".format(r):"PT{0}H{1}S".format(r,t):t===0?"PT{0}H{1}M".format(r,i):"PT{0}H{1}M{2}S".format(r,i,t):r===0?i===0?t===0?"P{0}D".format(u):"P{0}DT{1}S".format(u,t):t===0?"P{0}DT{1}M".format(u,i):"P{0}DT{1}M{2}S".format(u,i,t):i===0?t===0?"P{0}DT{1}H".format(u,r):"P{0}DT{1}H{2}S".format(u,r,t):t===0?"P{0}DT{1}H{2}M".format(u,r,i):"P{0}DT{1}H{2}M{3}S".format(u,r,i,t)},n})()}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Data",["require","exports","ko","$","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/AllMetricsQueryParameter","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Data/RefCountedData","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/MetricSelectionQueryParameter",
"WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Data/DataSet","WebsitesExtension/TypeScript/Deprecated/Monitoring/Ajax","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/TimeWindow","WebsitesExtension/TypeScript/Deprecated/Monitoring/Utilities/TimeSpanUtility"],(function(n,t,i,r,u,f,e,o,s,h,c){"use strict";return (function(){function n(){}return n.getAllMetricDefinitions=function(t,i){var r=new u(t,i);return f.getRefCountedDataAsync(n.getAllMetricDefinitionsCacheKey(t,i),(function(){return s.getAllMetricDefinitions(r).then((function(n){return n}))}))},n.releaseAllMetricDefinitions=function(t,i){f.releaseRefCountedData(n.getAllMetricDefinitionsCacheKey(t,i))},n.getMetrics=function(t){return n.getMetricsFromMultipleResources(t)},n.getMetricsFromMultipleResources=function(n){var t=[];return r.each(n,(function(n,i){t.push(new e(i))})),o.getObservableDataAsync((function(){return s.getMetrics(t).then((function(n){return n.forEach((function(n){var t,r;n&&(n.StartTime&&(n.StartTime=new Date(
n.StartTime).getTime().toString()),t=new h,t.Seconds=i.observable(c.toSeconds(n.TimeGrain)),t.Milliseconds=i.observable(0),t.TotalMilliseconds=i.observable(c.toSeconds(n.TimeGrain)*1e3),t.TotalMinutes=i.observable(c.toSeconds(n.TimeGrain)/60),n.TimeGrain=t,r=n.PrimaryAggregationType,r&&AntUx.StringEx.equals(r,"Last",AntUx.StringComparison.IgnoreCase)&&(n.PrimaryAggregationType="Average"))})),n}))}))},n.releaseGetMetricsForMultipleResourceIdentifiers=function(){},n.releaseGetMetrics=function(){},n.getMetricCacheKey=function(n){return"{0}-{1}-{2}".format(n.ResourceUri,n.Name,n.DefaultTimeRange)},n.getAllMetricDefinitionsCacheKey=function(n,t){return"getAllMetricDefinitions-{0}-{1}".format(n,t)},n})()}));__extends=this&&this.__extends||(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):
(r.prototype=i.prototype,new r)}})();define("WebsitesExtension/TypeScript/Deprecated/Monitoring/DataViews/UsageDataView",["require","exports","o","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Data/DataViewBase"],(function(n,t,i,r){"use strict";return (function(n){function t(t){var i=n.call(this)||this;return i._dataContext=t,i}return __extends(t,n),t.prototype._load=function(n){return this._dataContext.listUsageMetrics(n.monitoringId.subscriptionId,n.monitoringId.resourceIdentifier).then((function(n){return{usageResults:n}}))},t.prototype._release=function(){n.prototype._release.call(this);this.query&&this._dataContext.releaseUsageMetrics(this.query.monitoringId.subscriptionId,this.query.monitoringId.resourceIdentifier)},t})(r)}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Data/DataContext",["require","exports","ko","WebsitesExtension/TypeScript/Deprecated/Monitoring/DataViews/UsageDataView","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Data/RefCountedDataSet",
"WebsitesExtension/TypeScript/Deprecated/Monitoring/Ajax/Ajax.Usage","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/TimeWindow","WebsitesExtension/TypeScript/Deprecated/Monitoring/Utilities/TimeSpanUtility"],(function(n,t,i,r,u,f,e,o){"use strict";var s=(function(){function n(){}return n.prototype.getUsageDataView=function(){return new r(this)},n.prototype.listUsageMetrics=function(n,t){var s=this._getUsageMetricsDataSetName(n,t),h={fetchData:function(){return f.listUsageMetrics(n,t)}},r;return r=u.getRefCountedDataSet(s,h),r.initialLoadPromise.then((function(){return r.dataSet.data.map((function(n){var t=new e;return t.Seconds=i.observable(o.toSeconds(n.TimeGrain)),t.Milliseconds=i.observable(0),t.TotalMilliseconds=i.observable(o.toSeconds(n.TimeGrain)*1e3),t.TotalMinutes=i.observable(o.toSeconds(n.TimeGrain)/60),{Name:n.Name,displayValue:n.DisplayValue,DisplayName:n.DisplayName,QuotaPeriod:i.observable(t),CurrentValue:n.CurrentValue,NextResetTime:n.NextResetTime,Unit:n.Unit,Limit:
n.Limit}}))}))},n.prototype.releaseUsageMetrics=function(n,t){var i=this._getUsageMetricsDataSetName(n,t);u.releaseRefCountedDataSet(i)},n.prototype._getUsageMetricsDataSetName=function(n,t){return"UsageMetrics|{0}|{1}".format(n,t)},n})();return s.instance=new s,s}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/QuerySelection",["require","exports"],(function(){"use strict";return (function(){function n(n,t,i){this.ChartGapFillingBehaviour=null;this.isLoading=!0;this.IsSelected=!0;t&&t.substring(0,1)==="/"&&(t=t.substring(1));this.Name=i;this.RelativeUri="{0}/services/monitoring/metrics/resources/{1}".format(n,t);this.StartTime=new Date}return n})()}));define("WebsitesExtension/TypeScript/Deprecated/Monitoring/Utilities/MetricUtility",["require","exports","f","a","$","Websites/ClientResources/MonitoringResources","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/TimeRange","WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Utilities/DateTimeUtility","WebsitesExtension/TypeScript/Deprecated/Monitoring/Models/QuerySelection",
"WebsitesExtension/TypeScript/Deprecated/ExtensionCore/Utilities/Formatters"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";var c;return (function(n){var t=(function(){function n(){}return n.createMetricGroupsFromMetricQuerySetting=function(n){var t=[];return n.resourceMetricSelections.forEach((function(i){var o=i.resourceUri,u=[],f=[];i.metrics.forEach((function(n){u.push(n.name);f.push(n.displayName)}));t.push(new r(o,u,f,e.MetricTimeRange.GetMetricTimeRange(n.timeRange),n.timeGrain,n.startDate,n.endDate))})),t},n.getMetricsPartTitle=function(n){var i="",t=[],r;return n!==null&&(u.each(n,(function(n,i){u.inArray(i,t)<0&&t.push(i)})),r=t.length,r===1?i=t[0]:r===2?i=f.metricDisplayNameConnector.format(t[0],t[1]):r===3?(i=f.multipleMetricDisplayNameSeperator.format(t[0],t[1]),i=f.metricDisplayNamesConnector.format({metricNames:i})):r>3&&(i=f.multipleMetricDisplayNameSeperator.format(t[0],t[1]),i=f.multipleMetricDisplayNamesConnector.format({metricNames:i,numberOfMetrics:t.length-2}))),i},n.getAllMetricNames=
function(n){var t=[];return n.forEach((function(n){n.MetricList.forEach((function(n){t.push(n)}))})),t},n.doResourcesShareSameMetric=function(n){var t=!0,i,r;return n.length>1?(r=0,n.forEach((function(n){if(n.metrics.length===1)if(r++,i){if(!AntUx.StringEx.equals(i,n.metrics[0].name,AntUx.StringComparison.IgnoreCase)){t=!1;return}}else i=n.metrics[0].name;else if(n.metrics.length>1){t=!1;return}})),t&&r<2&&(t=!1)):t=!1,t},n.getMetricIdentifier=function(n,t){return"{0}/{1}".format(n,t)},n.doesSeriesMatchMetricResponse=function(t,i){var r=n.getMetricIdentifier(i.ResourceIdentifier(),i.Name());return AntUx.StringEx.equals(t,r,AntUx.StringComparison.IgnoreCase)},n.getTimeRangeDisplayName=function(n){var i="",t;return n&&(t=e.MetricTimeRange.GetMetricTimeRange(n),t&&(i=t.DisplayNameForPartTitle)),i},n})(),r,c;n.MetricUtility=t;r=(function(){function n(n,i,r,u,f,s,h){var l,a,c;this.Name=i.join(";");this.DisplayName=t.getMetricsPartTitle(r);u?(this.MetricTimeRange=u,this.DefaultTimeRange=u.TimeRange):
(this.MetricTimeRange=e.MetricTimeRange.TwentyFourHours,this.DefaultTimeRange=this.MetricTimeRange.TimeRange);this.DefaultTimeGrain=f?f:this.MetricTimeRange.TimeGrain;this.ResourceUri=n;this.MetricList=i;this.MetricDisplayNames=r;l=this.MetricTimeRange.TimeRange;this.EndDate=h?h:o.DateTimeUtility.roundToHigherHalfHour(new Date);s?this.StartDate=o.DateTimeUtility.roundToLowerHalfHour(s):(c=new Date(this.EndDate.getTime()),a=o.DateTimeUtility.getMinutesFromXmlTimeDuration(l),c.setMinutes(-a,0,0),this.StartDate=c);u&&!h&&(this.EndDate=null)}return n.prototype.GetMetricSelection=function(n,t){var i=[];return this.MetricList.forEach((function(r){i.push(new s(n,t,r))})),i},n.PrepareGraph=function(r,u){var o=!1,s=!1,p=0,l=[],a=[],f,e=[],v,y;return(u.forEach((function(v){v.MetricList.forEach((function(y){var d=new i.ViewModels.Controls.Visualization.Chart.Series,rt=[],b,g=[],w=0,nt=0,k,tt,ut;if((k=c.GetMetricResponse(r,y,v.ResourceUri),k)&&(f=k,b=f.PrimaryAggregationType(),f[b])){if(d.name(t.getMetricIdentifier(
k.ResourceIdentifier(),k.Name())),f[b]()&&(ut=f[b]().length,f[b]().forEach((function(t,r){var c,h;typeof t=="number"&&(s=!0);p+=t;w+=t;nt+=f.Count()[r];o?(g.push(t),e[r][f.Name()]=t):(h=u[0].MetricTimeRange,g.push([n._prepareColumnLabel(f.StartTime(),f.TimeGrain(),r,!1,h.ShortFormatter,h.LongFormatter),t]),tt={time:parseInt(f.StartTime())+f.TimeGrain().TotalMilliseconds()*r},tt[f.Name()]=t,e.push(tt));t!==null&&(c=new Date(parseInt(f.StartTime())+f.TimeGrain().TotalMilliseconds()*r),rt.push(new i.ViewModels.Controls.Visualization.Chart.ChartItem(c,t)))}))),d.values(rt),a.push(d),f.Unit().toLowerCase()==="bytes"){var ft=w/nt,et=h.getFileSizeFormat(ft,"B"),ot=et.unitName,it=o?0:1;w=0;g.forEach((function(n,t){var i=h.convertDateSizeFormat(n[it],"B",ot);e[t][f.Name()]=n[it]!==null?i.value:null;n[it]=i.value;w+=i.value}))}b.toUpperCase()==="AVERAGE"&&(w=w/nt);l.push(w.toString())}}))})),s)?(v=f.FormattedUnit()?f.FormattedUnit().unitName:f.Unit(),y=n._getChartType(v),{series:a,chartType:y,tabluarData:
e,settings:l}):null},n._getChartType=function(n){var t=0;switch(n.toLowerCase()){case"count":t=4;break;case"percent":case"bytes":default:t=0}return t},n._prepareColumnLabel=function(n,t,i,r,u,f){var o=parseInt(n)+t.TotalMilliseconds()*i,e=new Date(o);return r?i<12||e.getDate()===1&&e.getHours()===11?e.toString(f):e.getHours()>11?"":e.toString(u):i===0||e.getHours()===0||e.getHours()===12?e.toString(f):e.toString(u)},n.prototype._mergeData=function(n,t){if(n.length!==t.length)throw"Arrays must be same length";for(var r=[],i=0;i<n.length;i++)r.push([].concat(n[i],t[i]));return r},n})();n.MetricGroup=r;c=(function(){function n(){}return n.getPrimaryMetricList=function(n){return n?n[n.PrimaryAggregationType()]:null},n.ParseMetricResponseByDisplayName=function(n,t){return n().first((function(n){return AntUx.StringEx.equals(n.DisplayName(),t,AntUx.StringComparison.IgnoreCase)}))},n.GetMetricResponse=function(n,t,i){return n().first((function(n){return AntUx.StringEx.equals(n.Name(),t,AntUx.StringComparison.
IgnoreCase)&&AntUx.StringEx.equals(n.ResourceIdentifier(),i,AntUx.StringComparison.IgnoreCase)}))},n.GetMetricResponseByMetricIdentifier=function(n,i){return n().first((function(n){var r=t.getMetricIdentifier(n.ResourceIdentifier(),n.Name());return AntUx.StringEx.equals(r,i,AntUx.StringComparison.IgnoreCase)}))},n.GenerateMetricDisplayName=function(n){for(var t="",i=0,i=0,r=n().length;i<r;i++)t=t+n()[i].DisplayName(),i<r-1&&(t=t+" and ");return t},n})();n.MetricResponse=c})(c||(c={})),c}));__extends=this&&this.__extends||(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();define("WebsitesExtension/TypeScript/Deprecated/Monitoring/ViewModels/Parts/QuotaSummaryPart",["require","exports","f","o","ko","$","Websites/ClientResources/MonitoringResources","WebsitesExtension/TypeScript/Deprecated/Monitoring/Utilities/MetricFormatter",
"WebsitesExtension/TypeScript/Deprecated/Monitoring/ExtensionAssets/Constants","WebsitesExtension/TypeScript/Deprecated/Monitoring/Data/DataContext"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";var c=(function(n){function t(i){var r=n.call(this,i,t._createOptions())||this;i.partTitle(e.usagePartTitleQuotas);r._dataView=h.instance.getUsageDataView();r._dataView.onLoaded(r.onDataLoaded.bind(r));return i.registerForDispose(r._dataView),r}return __extends(t,n),t.prototype.onInputsSet=function(n){var t,r,u;return(t=i.ViewModels.Services.ResourceTypes.parseResourceDescriptor(n.resourceUri),r=t.subscription,u=t.resource,this._usageMetrics=n.usageMetrics,this._container.noDataMessage(n.message),this._container.assetName(u),!!n.message)?f.Deferred().resolve():this._dataView.setQuery({monitoringId:{subscriptionId:r,resourceIdentifier:n.resourceUri}},!0)},t.prototype.onDataLoaded=function(n){var t=this;this._updateUsageResults(n.usageResults());n.usageResults.subscribe(this._container,(function(n){t.
_updateUsageResults(n)}))},t.prototype._updateUsageResults=function(n){var t=this;this._options.data.items.removeAll();n.forEach((function(n){f.inArray(n.Name(),t._usageMetrics)>=0&&t._initializeUsageItem(n)}))},t._createOptions=function(){var n=[t._columnKey,t._columnValue],i={items:u.observableArray([]),columns:u.observableArray(n)};return{data:i,showHeader:!1}},t.prototype._initializeUsageItem=function(n){this._updateUsageDisplayValue(n);this._options.data.items.push({key:n.DisplayName(),value:n.displayValue()})},t.prototype._updateUsageDisplayValue=function(n){var t=o.MetricFormatter.Format(n.CurrentValue(),n.Unit(),0),i=o.MetricFormatter.Format(n.Limit(),n.Unit()),f="{0}{1}".format(t.value,t.unitDisplayName),r="{0}{1}".format(i.value,i.unitDisplayName);n.Limit()===s.UsageMetric.Unlimited&&(r=e.usageQuotaUnlimited);n.displayValue=u.observable("{0}/{1}".format(f,r))},t})(i.ViewModels.Parts.Collection.ViewModel);return c._columnKey={name:u.observable(""),itemKey:"key"},c._columnValue={name:
u.observable(""),itemKey:"value"},c}))