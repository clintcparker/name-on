define("HubsExtension/ServicesHealth/Models/ServicesHealthModels",["require","exports","f"],(function(n,t,i){"use strict";var r;return (function(n){function r(n,t,i,r,u){return{sortCode:n,mapIconImage:t||s,gridIconName:i||"error",gridIcon:r||o,iconSizeName:u||"large"}}var e=i.Base,t=e.Images.StatusBadge,u=t.Outline,o=t.Error(),s=u.Error(),f;n.KnownSeverityInfo={healthy:r(0,u.Success(),"healthy",t.Success(),"normal"),information:r(1,u.Info(),"information",t.Info(),"normal"),warning:r(2,u.Warning(),"warning",t.Warning(),"normal"),error:r(3),critical:r(4)};f=(function(){function n(){}return n})();n.ServiceHealthItem=f})(r||(r={})),r}));
define("HubsExtension/ServicesHealth/ServicesHealthCommon",["require","exports","f","i","o","ko","HubsExtension/ServicesHealth/Models/ServicesHealthModels","HubsExtension/ServicesHealth/ServicesHealthClientStrings","HubsExtension/_generated/ExtensionDefinition"],(function(n,t,i,r,u,f,e,o,s){"use strict";function ot(n){var t=ut(n,(function(n,t,i){i[t.gridIconName]=t.gridIcon}),{});return t["##DEFAULT##"]=g.Unknown(),t}function k(n,t,u,f){return i.isFeatureEnabled("servicenotificationsblade")?r.ViewModels.getBladeSelection(l.name,"ServiceNotificationsBlade",{queryInputs:{subscriptions:(t||[]).slice(0,20).join(";"),category:"ServiceHealth",timeRange:"PT24H"}}):r.ViewModels.getBladeSelection(w?p.name:l.name,w?p.Blades.ActivityLogBlade.name:l.Blades.EventsBrowseBlade.name,{queryInputs:{query:{subscriptions:(t||[]).slice(0,20).join(";"),resourceGroupId:"all",resourceId:"all",resourceType:"all",operationNames:"all",category:"ServiceHealth",levels:"1;2;3;4",timeSpan:"1",startTime:u,endTime:f,caller:"all",queryName:"Service Health",queryId:"ServiceHealthQuery",searchString:""}}})}function st(n,t,i){var r=new tt(n);return i&&(r.events.itemClick=function(n){var r=t.getServicesHealthLoadMetadata(),u;r&&(u=k(n,r.subscriptionIds,r.startTime,r.endTime),u&&i(u))}),r}function ht(n,t,i){var u=[{itemKey:"displayName",activatable:f.observable(!0),format:y.HtmlBindings,formatOptions:{htmlBindingsTemplate:et,htmlBindingsType:h.HtmlBindingsType.Default}},{itemKey:"gridIconName",width:f.observable("24px"),format:y.SvgIconLookup,formatOptions:{svgIconLookup:b}},],e={selectableRow:{selectionMode:1,activateOnSelection:f.observable(!0),linkProvider:function(n,t){if(t.isMatsGlobal&&c)return f.observable({uri:c})}}},r=new it(n,f.observableArray(),h.Extensions.SelectableRow,e);return r.columns=f.observableArray(u),r.showHeader=!1,r.noRowsMessage(rt.loadingMessage),r.selectableData.activatedItems.subscribe(n,(function(n){var f,r,u;n.length>0&&(f=n[0].isMatsGlobal&&c,f||(r=t.getServicesHealthLoadMetadata(),r&&(u=k(n[0],r.subscriptionIds,r.startTime,r.endTime),u&&i(u))))})),r}var b;u.defineProperty(t,"__esModule",{value:!0});var a=i.Base,v=i.ViewModels,d=a.Images.Polychromatic,g=a.Images.StatusBadge,nt=v.Controls.Visualization.Map,tt=nt.ViewModel,h=v.Controls.Lists.Grid,y=h.Format,it=h.ViewModel,l=s.External.Microsoft_Azure_Monitoring,p=s.External.Microsoft_Azure_ActivityLog,rt=o.ServiceHealth,w=i.isFeatureEnabled("activitylogextension"),ut=i.forEachKey,c=(i.getEnvironmentValue("hubsLinks")||{}).azureStatus,ft=c?"<!-- ko if: settings.item.isMATSGlobal -->\n                            <div class='msportalfx-gridcolumn-assetsvg-linkicon'>\n                                <div class='msportalfx-gridcolumn-assetsvg-linkicon-icon' data-bind='image: MsPortalFx.Base.Images.Hyperlink()'><\/div>\n                            <\/div>\n                        <!-- /ko -->":"",et="<span data-bind='text: value'><\/span>"+ft;b=ot(e.KnownSeverityInfo);t.areaIcon=d.Globe();t.createMap=st;t.createGrid=ht}));
define("HubsExtension/ServicesHealth/ViewModels/ServiceHealthBlade",["require","exports","f","HubsExtension/ServicesHealth/ServicesHealthClientStrings"],(function(n,t,i,r){"use strict";var u;return (function(n){var u=i.ViewModels.Blade,t=r.ServiceHealth,f=(function(n){function i(){var i=n.call(this)||this;return i.title(t.title),i.subtitle(t.assetName),i}return __extends(i,n),i})(u);n.ServiceHealthBlade=f})(u||(u={})),u}));
define("HubsExtension/ServicesHealth/ViewModels/ServiceHealthListPart",["require","exports","ko","HubsExtension/ServicesHealth/ServicesHealthClientStrings","HubsExtension/ServicesHealth/ServicesHealthCommon"],(function(n,t,i,r,u){"use strict";var f;return (function(n){var t=r.ServiceHealth,f=(function(){function n(n,r,f){var o=this,e;this.dynamicBladeSelection=i.observable();this._grid=this.serviceHealthGrid=u.createGrid(n,f,this.dynamicBladeSelection);this._grid.noRowsMessage(t.loadingMessage);e=this._gridView=f.createGridView(n,i.observable(5));i.reactor(n,(function(){o._grid.items(e.items())}))}return n.prototype.onInputsSet=function(){var n=this;return this._gridView.fetch().then((function(){n._grid.noRowsMessage(t.noEvents)}))},n})();n.ServiceHealthListPart=f})(f||(f={})),f}));
define("HubsExtension/_generated/Blades/ServicesHealth.css",["require","exports"],(function(){"use strict";return".ext-blademap{padding-bottom:20px}.ext-servicespart-columnaligned{display:flex;align-items:center;flex-direction:column;justify-content:center;height:100%;text-align:center}.ext-servicespart-rowaligned{display:flex;align-items:center;flex-direction:row;justify-content:center;height:100%;text-align:center}.ext-servicespart-smallicon{width:30px;height:30px}.ext-servicespart-largeicon{width:50px;height:50px}.ext-servicespart-smallleftmargin{margin-left:5px}.ext-servicespart-largetopmargin{margin-top:20px}.ext-servicespart-linkicon{width:10px;height:10px;display:inline-block}.ext-sevicespart-description{width:100%;max-width:260px}.ext-servicespart-linktext:hover{text-decoration:underline}"}));
define("HubsExtension/_generated/Blades/ServicesHealthBlade",["require","exports","o","HubsExtension/_generated/Blades/ServicesHealth.css","HubsExtension/ServicesHealth/ViewModels/ServiceHealthBlade","HubsExtension/ServicesHealth/ViewModels/ServiceHealthListPart"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});t.blade={name:"ServicesHealthBlade",entryPoint:{module:"HubsExtension/ServicesHealth/ViewModels/ServiceHealthBlade","export":"ServiceHealthBlade"},viewModelName:"ServicesHealth$ServiceHealthBlade",lenses:[{name:"Lens",partInstances:[{name:"List",inline:{viewModel:"ServicesHealth$ServiceHealthListPart",partKind:0,inputs:[],bindings:[],details:[{invocationInputArguments:[{valuesFrom:[{referenceType:0,property:"content.dynamicBladeSelection"}]}]}],initialSize:8,supportedSizes:[8],htmlTemplateInline:{file:"ServiceHealthListPart.html",content:'<div data-bind="pcGrid: serviceHealthGrid"><\/div>'},styleSheets:[{file:"Blades/ServicesHealth.css",content:r}]}}]}],width:0,locked:!0,pinnedPart:"ServicesHealthPart",pinnable:!0,style:2,attributes:0}}))