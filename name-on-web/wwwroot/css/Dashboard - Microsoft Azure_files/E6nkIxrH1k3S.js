define("Fx/Ajax",["require","exports","f","o"],(function(n,t,i,r){"use strict";function u(n,t){return(n&t)===t}function s(n){var t=n||"";return(a+"."+t).substr(0,255)}function b(n,t,a,v,y){var d=n+l,g=s(y),w=r.create(null),p={requests:[],contexts:[]},b=i.startTimer(),k=function(){var s=p.requests,a=p.contexts,v,r,l;for(p={requests:[],contexts:[]},v=function(r){var l=s.slice(r,r+20);c({isBackgroundTask:t,setAuthorizationHeader:!0,setTelemetryHeader:g,uri:d},{requests:l}).then((function(c){c.responses.forEach((function(c,l){var b=r+l,w=a[b],y=w.response,v;if(c.httpStatusCode<400)y.resolve(c);else{var p=s[b],k=w.options,d=void 0;d=u(k,16)||u(f,16)?!1:u(k,8)||u(f,8)?!0:!t&&p.httpMethod===o&&c.httpStatusCode===503;d?(v=w.uri||new h.UriBuilder(p.url),v.getAuthority()||(v.path=n+i.trimStart(v.path,"/")),Q(e.ajaxExtended({uri:v.toString(),setAuthorizationHeader:!0,setTelemetryHeader:p.requestHeaderDetails.commandName+".Slow",type:p.httpMethod})).then((function(n){var t=n.jqXHR,i={};t.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((function(n){var t=n.split(": "),r=t.shift();i[r]=t.join(": ")}));y.resolve({content:n.content,headers:i,httpStatusCode:t.status})}),(function(n){y.reject(n)}))):y.reject(c)}}))})).catch((function(n){a.slice(r,r+20).forEach((function(t){t.response.reject(n)}))}))},r=0,l=s.length;r<l;r+=20)v(r,l)};return{getResponse:function(n,t,r){var o=n.url,s=!u(r,64),f,e;if(s){if(f=w[o],f&&f.timer()<a)return f.promise}else delete w[o];return p.requests.length||(v?Q.delay(v).then(k):Q.nextTick((function(){var n=p.requests.length,t=function(){n>=Math.min(p.requests.length,20)?k():(n=p.requests.length,Q.nextTick(t))};Q.nextTick(t)}))),e=Q.defer(),p.requests.push(n),p.contexts.push({response:e,options:r,uri:t}),b()>6e4&&(i.forEachKey(w,(function(n,t){t.timer()>a&&delete w[n]})),b=i.startTimer()),s&&(w[n.url]={promise:e.promise,timer:i.startTimer()}),e.promise}}}function k(n,t){var v=n.uri||n.url,c,l,a;t||(c=new h.UriBuilder(v),t=c.getScheme()+c.getAuthority());t=i.ensureSuffix(t,"/").toLowerCase();var e=n.options||f,k=n.isBackgroundTask||u(e,4),r=y;return u(e,1)||u(f,1)?r=p:k&&(r=w),l=r.map[t],l||(l=r.map[t]=b(t,k,r.cacheDurationMs,r.bufferDurationMs,r.telemetrySuffix)),a=n.type||o,(a!==o||n.headers||u(f,64)&&!u(e,32))&&(e=e|64),l.getResponse({url:v,httpMethod:a,requestHeaderDetails:{commandName:s(n.setTelemetryHeader)},content:n.content},c,e)}function d(n){return n.batchRequests.length?c({isBackgroundTask:n.isBackgroundTask,setAuthorizationHeader:!0,setTelemetryHeader:s(n.telemetryHeader),uri:n.endpoint},{requests:n.batchRequests.map((function(n){return{url:n.uri,httpMethod:n.httpMethod||o,requestHeaderDetails:{commandName:s((n.requestHeaderDetails||{}).commandName)}}}))}):Q(null)}function c(n,t){return Q(e.postJSON(n,t))}function g(n){return Q(e.ajax(n))}function nt(n){return Q(e.ajaxExtended(n))}function tt(n){f=n.requestOptions}var f;r.defineProperty(t,"__esModule",{value:!0});var h=i.Base,e=h.Net2,l="batch?api-version=2015-11-01",a=i.getEnvironmentValue("extensionName"),o="GET",v=i.isFeatureEnabled("fasteventservice"),y={bufferDurationMs:100,cacheDurationMs:1e4,map:r.create(null),telemetrySuffix:"Batch"},p={cacheDurationMs:1e4,map:r.create(null),telemetrySuffix:"BatchNextTick"},w={bufferDurationMs:v?5e3:6e4,cacheDurationMs:6e4,map:r.create(null),telemetrySuffix:"BatchBackground"};f=66;t.batch=k;t.batchMultiple=d;t.postJSON=c;t.ajax=g;t.ajaxExtended=nt;t.initialize=tt}));
define("Fx/Base/Base.Net.Batch",["require","exports","Fx/Ajax"],(function(n,t,i){"use strict";var r;return (function(n){n.batch=i.batch;n.batchMultiple=i.batchMultiple})(r||(r={})),r}));
define("FxInternal/RpcEndpoints",["require","exports","i"],(function(n,t,i){"use strict";var r;return (function(n){n.notifyResourcesCreatedEndpoint=new i.Rpc.ActionEndPointDefinition("MsPortal.RpcEndPoints.notifyResourcesCreated")})(r||(r={})),r}));
define("Fx/NotifyResourcesCreated",["require","exports","f","i","FxInternal/RpcEndpoints"],(function(n,t,i,r,u){"use strict";var f;return (function(n){function t(n){u.notifyResourcesCreatedEndpoint.invoke(r.Rpc.client,i.Base.Constants.ExtensionNames.Hubs,n)}n.notifyResourcesCreated=t})(f||(f={})),f}))