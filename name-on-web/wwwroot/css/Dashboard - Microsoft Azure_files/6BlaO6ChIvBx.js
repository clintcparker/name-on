define("HubsExtension/_generated/HtmlTs/BrowseGrid2/BrowseBlades/Templates/TagColumn",["require","exports"],(function(){"use strict";return function(){return'<!-- ko if: value --><div data-bind="pcControl:value"><\/div><!-- /ko -->'}}));
define("HubsExtension/BrowseGrid2/BrowseGrid2Startup",["require","exports","f","i","o","ko","FxHubs/HubsSettingsSchema","HubsExtension/Browse/BrowseClientStrings","HubsExtension/Common/UserSettingsHelper","HubsExtension/_generated/HtmlTs/BrowseGrid2/BrowseBlades/Templates/TagColumn"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";function p(n,t){return(n+(t?"|"+t:"")).toLowerCase()}function w(n,t){var i=n.get(t);return i||(i=f.observable(),n.set(t,i)),i}function b(n,t,i){return w(n,p(t,i))}function rt(){return c?Q():Q(s.UserSettingsHelper.readSettings([l])).then((function(n){i.forEachKey(n[l],(function(n,t){var i=n.toLowerCase(),r=w(a,i);r(t)}));c=!0}))}function ut(n,t){var u,r,e,s;if(!c)throw new Error("Columns not initialized, call initialColumns() first");return u=p(n,t),r=k.get(u),r||(e=y(n,t),s=v(n,t),r=f.pureComputed((function(){var t=e(),r=s(),n;return r?(n=[],r.forEach((function(r){var s;if(r.visible){var u=r.id,f=void 0,e=t.first((function(n){return n.id===u}));e&&(f=i.extend2(e,{visible:!0}));!e&&u.startsWith("tags.")&&(s=u.substr(5),f={id:u,name:o.chooserTagColumnNameFormat.format(s),format:tt,visible:!0});f&&n.push(f)}})),t.forEach((function(t){if(t.visible){var i=r.first((function(n){return n.id===t.id}));i||n.push(t)}})),n):t.filter((function(n){return n.visible}))})),r.extend({deferred:!0}),k.set(u,r)),r}function v(n,t){if(!c)throw new Error("Columns not initialized, call initialColumns() first");return b(a,n,t)}function ft(n,t,i){var o,e,r;if(!c)throw new Error("Columns not initialized, call initialColumns() first");o=v(n,t);e=i&&i.map((function(n){return{id:n.id,visible:n.visible}}));o(e);r=u.create(null);r[l]=u.create(null);a.forEach((function(n,t){r[l][t]=f.unwrap(n)}));s.UserSettingsHelper.writeSettings(r);nt.trace({action:i?"BrowseSetColumns":"BrowseResetColumns",source:"ColumnChooser",data:{resourceType:n,scopeResourceType:t,columns:i?e:null}})}function y(n,t){if(!c)throw new Error("Columns not initialized, call initialColumns() first");return b(it,n,t)}function et(n,t,i){if(!c)throw new Error("Columns not initialized, call initialColumns() first");y(n,t)(i)}u.defineProperty(t,"__esModule",{value:!0});var d=r.ViewModels,g=d.Controls.Lists,nt=i.Base.Diagnostics.Telemetry,l=e.Keys.browseColumnsSettings,tt=new g.Grid2.Formatters.HtmlTemplate({template:h()});var c=!1,a=new i.Map,k=new i.Map,it=new i.Map;t.initializeColumns=rt;t.getVisibleBrowseColumns=ut;t.getPersistedBrowseColumns=v;t.setPersistedBrowseColumns=ft;t.getDefaultBrowseColumns=y;t.setDefaultBrowseColumns=et}));
define("HubsExtension/Tags/TagsStartup",["require","exports","f","i","o","ko","HubsExtension/Tags/TagsClientStrings","HubsExtension/_generated/ExtensionDefinition","HubsExtension/ArmHelpers/ArmApisStartup","HubsExtension/Common/HubsObservables"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";function g(n,t,i,r){var u=i.errors,o;if(u&&u.length)return o=n.createChildLifetime(),r(new k.ViewModel(o,null,!1,{image:f.observable(i.completeFailure?c.Images.StatusBadge.Failed():c.Images.StatusBadge.Warning()),text:f.observable((i.completeFailure?e.ResourceTagsListPart.completeFailureMessage:e.ResourceTagsListPart.partialFailureMessage)+"\n\n"+u.join("\n"))})),t&&t.dispose(),o;r(undefined);t&&t.dispose()}function l(n,t,i){var r=e.compoundFormat.format(n,t);return{lowerCaseKey:(n+":"+t).toLowerCase(),name:n,value:t,compound:r,commandGroup:i?o.CommandGroupNames.tagItemCommandGroup:undefined,resourceId:i}}function nt(n,t){var i=n.name.localeCompare(t.name);return i?i:(n.value||"").localeCompare(t.value||"")}function y(n){var t=[];return n.forEach((function(n){return n.forEach((function(n){return t.push(n)}))})),t}function p(n){return!s.isHiddenTag(n)}function w(n,t,i,f){var o=[],c=[];return s.callBatchWithContinuation(u.keys(n),i,(function(t){var i=n[t.api],u=r.Azure.buildSimplifiedError(t&&t.reason&&t.reason.jqXHR||t).status;c.push(h.getSubscription(i).then((function(n){var t=n&&n.displayName||i;switch(u){case 404:o.push(e.Common.subscriptionNotFound.format(t));break;case 401:case 403:o.push(e.Common.subscriptionUnauthorized.format(t));break;default:o.push(e.Common.subscriptionError.format(t))}})))}),!1,v("Tags."+t),{responseIsArrayType:!0}).then((function(){return Q.all(c).then((function(){return f(o)}))}))}function tt(n,t,r){var f=new i.Map,o=i.extendArrayIntoMap(u.create(null),n,(function(n){return s.subscriptionTagsApi(n)}),i.identity);return w(o,"allTags",(function(n){return n.forEach((function(n){var t=n.tagName,u=t.toLowerCase(),e;r?s.isHiddenTag(t)||(e=f.get(u)||new i.Map,e.has("")||e.set("",l(t,null)),f.set(u,e)):n.values.forEach((function(n){if(p(t,n.tagValue)){var r=f.get(u)||new i.Map,e=n&&n.tagValue,o=(e||"").toLowerCase();r.has(o)||r.set(o,l(t,e));f.set(u,r)}}))})),!0}),(function(i){var r=y(f).sort(nt),o=t&&n.length>1&&r.length>t,u;return o&&r.splice(t),u={tagItems:r,errors:i,completeFailure:i.length===n.length},o&&u.errors.push(e.Common.moreThanMaximumAllTags.format(t)),u}))}function it(n){var r,t;return a.isResourceGroupId(n)?r=Q(s.resourceGroupApi(n)):a.isResourceId(n)&&(r=s.resourceApi(n)),t=new i.Map,r.then((function(r){return s.call(r,"GET",undefined,v("Tags.resourceForTags"),!1).then((function(r){i.forEachKey(r.tags,(function(r,u){if(p(r,u)){var e=r.toLowerCase(),f=t.get(e)||new i.Map,o=(u||"").toLowerCase();f.has(o)||f.set(o,l(r,u,n));t.set(e,f)}}));return{tagItems:y(t)}})).catch((function(t){return d.warning("Error getting tags for resource id {0}. Error: {1}".format(n,t.responseText)),Q.reject(t)}))}))}function rt(n,t,r){var f=[],e=i.extendArrayIntoMap(i.extendArrayIntoMap(u.create(null),r,(function(i){return s.resourceGroupsWithTagApi(i,n,t)}),i.identity),r,(function(i){return s.resourcesWithTagApi(i,n,t)}),i.identity);return w(e,"allResources",(function(n){return f.push.apply(f,n.filter((function(n){return!!n.id})).map((function(n){return n.id}))),!0}),(function(n){return{resources:f.sort(),errors:n,completeFailure:n.length===r.length}}))}u.defineProperty(t,"__esModule",{value:!0});var c=i.Base,b=c.Diagnostics,k=i.ViewModels.Controls.InfoBox,a=i.ViewModels.Services.ResourceTypes,d=b.createLog(n),v=s.makeResourceManagerTelemetry;t.handleSubscriptionErrors=g;t.getAllTags=tt;t.getResourceTags=it;t.getResourcesWithTag=rt}));
define("HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/BrowseBase",["require","exports","f","i","o","ko","Fx/Controls/Button","Fx/Controls/DropDown","FxInternal/Controls/InfoBox","Fx/Controls/RadioButtons","FxHubs/RpcEndPoints","HubsExtension/Browse/BrowseClientStrings","HubsExtension/ResourceMap/ResourceMapClientStrings","HubsExtension/_generated/ExtensionDefinition","HubsExtension/Common/BrowseCuration","HubsExtension/Common/HubsObservables","HubsExtension/ArtBrowse/ArtBrowseHelper","HubsExtension/ResourceMap/ResourceMapCommon","HubsExtension/Tags/TagsStartup","HubsExtension/BrowseGrid2/BrowseGrid2Startup"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p,w,b,k,d){"use strict";function kt(n){return new et.Forms.CheckBox.ViewModel(n,{inlineLabel:!0,label:f.observable(l.showAll),infoBalloonContent:f.observable(l.showAllInfo),defaultValue:f.observable(!1)})}var ht;u.defineProperty(t,"__esModule",{value:!0});var g=i.Base,pt=g.Diagnostics,ut=g.Images,ft=g.Diagnostics.Telemetry,et=i.ViewModels,wt=et.Toolbars.Toolbar,it=et.Services.ResourceTypes,ct=g.Constants.Shell,lt=r.Rpc.client,nt=l.Browse,tt=l.TagsFilter,at=pt.createLog(n),ot=!i.isFeatureEnabled("decouplesubs")&&!i.isFeatureEnabled("mgsubs"),vt=i.isFeatureEnabled("tagsfilter"),rt=v.BladeNames.resources,yt=0,st,bt=(function(){function n(n){this.vm=new ht(n);this.icon=this.vm.icon;this.title=this.vm.title;this.subtitle=this.vm.subtitle;this.contentState=this.vm.contentState;this.contentStateDisplayText=this.vm.contentStateDisplayText}return n.prototype.addResource=function(){this.vm.addResource()},n.prototype.processInputs=function(n,t){var i=this;return d.initializeColumns().then((function(){return i.vm.processInputs(n,t)}))},n.prototype.refresh=function(n){return this.vm.refresh(n)},n})();t.BrowseBase=bt;ht=(function(){function t(n){var t=this;this.title=f.observable("");this.subtitle=f.observable("");this.scope=f.observable("");this.contentState=f.observable(0);this.contentStateDisplayText=f.observable("");this.showTagsFilter=f.observable(vt);this.showGroupBy=f.observable(!0);this.infoBox=f.observable(null);this.newBrowseInfoBox=f.observable(null);this.countMessage=f.observable("");this.isEmptyGrid=f.observable();this.createButton=f.observable();this.linkIcon=ut.Hyperlink();this.showAdd=f.observable();this.showAllCheckBox=f.observable();this._includeHiddenTypes=f.observable();this.toolbar=new wt(n);this._container=n;this._gridLifetime=n.createChildLifetime();this._resourceType="";this._primaryDataTelemetryMarker=ft.start({source:rt,action:"BrowseGrid2LoadPrimaryData"});this._supplementalDataTelemetryMarker=ft.start({source:rt,action:"BrowseGrid2LoadSupplementalData"});this.gridViewModel=f.observable();this.resourceFilter=new i.Azure.ResourceFilter.ViewModel(n,{actionHandler:this.gridViewModel,showTextFilter:f.observable(!0),showSubscriptionFilter:f.observable(!1),isPersistentSubscriptionFilter:ot,showSubscriptionSummary:f.observable(!1),showTenantLevelSubscriptionSummary:f.observable(!1),textFilterPlaceholder:f.observable(l.browseFilterLabel)});this.tagsDropDown=o.create(n,{items:[],multiselect:!0,filter:!0,filterPlaceholder:tt.placeholderText,customFilter:function(){return Q([])},suppressDirtyBehavior:!0,ariaLabel:f.observable(tt.tagsLabel)});this.groupBy=o.create(n,{items:f.observableArray(),suppressDirtyBehavior:!0,ariaLabel:f.observable(l.GroupBy.label)});this.emptyBrowse={icon:f.observable(ut.Polychromatic.ResourceDefault()),text:f.observable(l.NoResources.default),description:f.observable(l.emptyDescription),links:f.observable([]),createButtonText:f.observable(l.CreateResources.default)};this.showAllCheckBox.subscribe(n,(function(i){i&&i.value.subscribe(n,(function(n){t._includeHiddenTypes(n);t.refresh()}))}))}return t.prototype.addResource=function(){this._container.openBladeAsync(this._browseConfig.getAddBlade(),{asSubJourney:!0})},t.prototype._initializeTagsDropDown=function(n,t,r){var e=this,v=h.create(n,{items:[{text:tt.allLabel,value:!1},{text:tt.anyLabel,value:!0},],value:!1}),g=function(n,t){return{text:n,values:t.map((function(t){return{name:n,value:t}}))}},a=[],b=f.observable(),d=f.observable(!1),nt=function(n,t){return(t||"").length===0||(n.name||"").toLowerCase().indexOf((t||"").toLowerCase())!==-1||typeof n.value!="boolean"&&(n.value||"").toLowerCase().indexOf((t||"").toLowerCase())!==-1},y=function(n){if(e.tagsDropDown.isPopUpOpen()&&s){e.tagsDropDown.suppressSelectedUpdate(!0);var f=i.getUniqueId(),o={text:{htmlTemplate:'<div class="ext-hubs-browse-tags-header-container"><div data-bind="pcControl: tagsOperatorPicker" width="100%"><\/div>'+('<div><button class="ext-hubs-browse-tags-text-button msportalfx-text-primary" role="button" data-bind="click: handleClearAllClick, clickBubble: false, text: clearFiltersText" aria-controls="'+f+'"><\/button><\/div>')+'<!-- ko if: moreResults --><div class="ext-hubs-browse-tags-text-more msportalfx-text-default" data-bind="text: moreResultsText"><\/div><!-- /ko --><\/div>',viewModel:{tagsOperatorPicker:v,clearFiltersText:tt.clearFiltersLabel,moreResults:d,moreResultsText:tt.moreResultsLabel,handleClearAllClick:function(){return e.tagsDropDown.value([])}}}},r=[o,],t=0,u=!1;a.forEach((function(f){var o,s;f.values&&(o=[],o.push.apply(o,f.values.filter((function(t){return nt(t,n)}))),o.length>100-t&&(o=o.slice(0,100-t),u=!0),o.length&&(t+=o.length,s={text:i.encodeHtml(f.text),children:o.map((function(n){return{text:i.encodeHtml(n.value||""),value:n,selectedItemOverride:e.tagsDropDown.multiItemDisplayText}}))},r.push(s)))}));d(u);e.tagsDropDown.items(r);e.tagsDropDown.suppressSelectedUpdate(!1)}},s,o,c,p,w;this.tagsDropDown.filterString.subscribe(n,(function(n){return y(n)}));t.subscribeAndRun(n,(function(){s=!1;c=null;o&&o.dispose();o=null;e.tagsDropDown.items([{text:l.loading}])}));p={matchAnyTags:!1,tagItems:[]};this.tagsDropDown.isPopUpOpen.subscribe(n,(function(f){f?s||c?y(""):(o&&o.dispose(),o=n.createChildLifetime(),a.splice(0,a.length),c=i.Base.Promises.cancelOnDispose(o,k.getAllTags(t().map((function(n){return n.subscriptionId})))).then((function(n){s=!0;var t=u.create(null);n.tagItems.forEach((function(n){var i=n.name.toLowerCase(),r;t[i.toLowerCase()]||(t[i]={tagName:n.name,valuesMap:u.create(null),tagValues:[]});r=(n.value||"").toLowerCase();t[i].valuesMap[r]||(t[i].valuesMap[r]=n.value,t[i].tagValues.push(n.value))}));i.forEachKey(t,(function(n,t){a.push(g(t.tagName,t.tagValues))}));y(e.tagsDropDown.filterString())}))):c&&c.then((function(){var f=i.makeArray(e.tagsDropDown.value()||[]),t=new i.Map,u=[],n;f.forEach((function(n){var i=n.name.toLowerCase(),r;t.has(i)||(r={name:n.name,values:[]},t.set(i,r),u.push(r));t.get(i).values.push(n.value)}));n={matchAnyTags:v.value(),tagItems:u};JSON.stringify(n)!==JSON.stringify(p)&&(r(n),p=n)}))}));w=function(){var n=b()||[],t;n.length!==0&&s?n.length===1?(t=n[0].value||"",e.tagsDropDown.multiItemDisplayText(l.tagLabel.format(i.encodeHtml(n[0].name),i.encodeHtml(t)))):e.tagsDropDown.multiItemDisplayText(tt.multipleTagsText.format(n.length)):e.tagsDropDown.multiItemDisplayText("No filter")};this.tagsDropDown.value.subscribeAndRun(n,(function(){b(i.makeArray(e.tagsDropDown.value()));w()}));v.value.subscribeAndRun(n,(function(){w()}))},t.prototype.processInputs=function(t,r){var o=this,h=t.resourceType||g.Constants.ResourceTypes.AllResources;return(h!==this._resourceType||t.kind!==this._kindFilter)&&(this._resourceType=h,this._kindFilter=t.kind),this._includeHiddenTypes(t.includeHiddenTypes||!1),this.resourceFilter.context(rt+" "+h),g.Promises.cancelOnDispose(this._container,(function(){return y.getExcludedResourceTypes()})).then((function(v){var ht=o._container,pt=o._gridLifetime=ht.createChildLifetime(),y,d=o.resourceFilter,gt;d.selectedSubscriptionId(t.selectedSubscriptionId);gt=t.filter;gt&&d.filterText(gt);var k=t.scope||t.listScope,wt={resourceType:h,resourceFilter:d,selectedTags:f.observable(),toolbar:o.toolbar,container:ht,contentState:o.contentState,contentStateDisplayText:o.contentStateDisplayText,loadDataTelemetryEventMarker:o._primaryDataTelemetryMarker,scope:k,listScope:t.listScope,allowOperations:!(r&&r.disallowOperations),onRefresh:r&&r.onRefresh,includeTypes:o._includeHiddenTypes,excludedTypesFromBrowse:v},ni=function(){vt&&o._initializeTagsDropDown(o._gridLifetime,d.selectedSubscriptions,wt.selectedTags)},tt=o.emptyBrowse,ti={title:l.learnMore,uri:i.getEnvironmentValue("hubsLinks").emptyBrowseLink},ii=it.isSubscriptionId(k),bt=!1,dt;switch(h.toLowerCase()){case b.allResourcesTypeKey:dt=i.require(n.normalize("../BrowseConfigurations/All")).then((function(n){y=new n.BrowseAllConfiguration(pt,wt);o.title(l.AssetTypeNames.AllResource.plural);bt=!k;d.showSubscriptionFilter(bt);d.showSubscriptionSummary(!k);d.showTypeFilter(!0);d.showLocationFilter(!0);d.showResourceGroupFilter(!k||ii);tt.links([ti]);o.showAllCheckBox(kt(ht));ni();i.isFeatureEnabled("artbrowse")&&!k&&d.selectedSubscriptions.subscribeAndRun(o._container,(function(){w.checkArtStatusForSelectedSubscriptions().then((function(n){n.length?o.newBrowseInfoBox(null):o.newBrowseInfoBox(new s.ViewModel(o._container,{text:nt.artBrowse,image:ut.Polychromatic.Info(),canClose:!0,onCloseClickCallback:function(){o.newBrowseInfoBox(null)},onClick:new et.ClickableLink(f.observable("#blade/HubsExtension/ArtBrowseBlade/resourceType/Microsoft.Resources%2Fresources"),f.observable("_self"))}))}))}))}));break;case b.resourceGroupsTypeKey:dt=i.require(n.normalize("../BrowseConfigurations/ResourceGroup")).then((function(n){y=new n.BrowseResourceGroupConfiguration(pt,wt);o.title(a.AssetTypeNames.ResourceGroup.plural);bt=!k;d.showSubscriptionFilter(bt);d.showSubscriptionSummary(!k);d.showLocationFilter(!0);tt.links([ti]);ni()}));break;case b.recentResourcesTypeKey:dt=i.require(n.normalize("../BrowseConfigurations/Recent")).then((function(n){y=new n.BrowseRecentConfiguration(pt,wt);o.title(l.AssetTypeNames.RecentResource.plural);o.showGroupBy(!1);o.showTagsFilter(!1)}));break;default:dt=i.require(n.normalize("../BrowseConfigurations/Resource")).then((function(n){y=new n.BrowseResourceConfiguration(o._gridLifetime,i.extend2(wt,{titleObservable:o.title,infoBox:o.infoBox,supplementalDataTelemetryEventMarker:o._supplementalDataTelemetryMarker,kindFilter:t.kind,isCollapsible:!(r&&r.isNonCollapsible)}));ni()}))}return g.Promises.cancelOnDispose(o._container,dt).then((function(){var n,t,v,h;y.groupByItems.subscribeAndRun(pt,o.groupBy.items);o.groupBy.value("");o._browseConfig=y;y.assetTypeInfo.subscribeAndRun(ht,(function(n){n&&(tt.icon(n.icon),tt.text(l.NoResources.base.format(n.compositeDisplayName.lowerPlural)),n.description&&tt.description(n.description),n.links&&n.links.length&&tt.links(n.links),tt.createButtonText(l.CreateResources.type.format(n.compositeDisplayName.lowerSingular)))}));n=o.gridViewModel;f.reactor(ht,(function(){var t=y.itemCount(),i=y.loaded();i&&(o.isEmptyGrid(t===0),n()&&!n().loading()&&(!o.createButton()&&y.addSupported&&o.createButton(e.create(ht,{text:tt.createButtonText,visible:o.showAdd,onClick:function(){return o.addResource()}})),o.showAdd(y.addSupported)))}));t=o.subtitle;k?(ii?i.tryImmediateResolve(p.getSubscription(it.parseSubscriptionDescriptor(k).subscription),(function(n){t(n.uniqueDisplayName)})):it.isResourceGroupId(k)?t(it.parseResourceGroupDescriptor(k).resourceGroup):it.isResourceId(k)?t(it.parseResourceDescriptor(k).resource):(at.error("Unhandled scope type, should be subscription ID, resource group ID or resource ID"),k=null),o.scope(k)):g.Security.getUserInfo().then((function(n){o.scope()||t(n.uniqueDirectoryName)}));y.createGridViewModel();y.gridViewModel.loadingMessage(l.loading);y.populateCommandBar();o._items=y._items;n(y.gridViewModel);n().selection.activatedIds.subscribeArrayDeletes(pt,(function(n){ft.trace({action:"BrowseItemDeactivated",source:rt,data:{assetId:f.unwrap(n)}})}));o.groupBy.value.subscribe(pt,(function(n){y.groupBy(n);ft.trace({action:"BrowseGroupByUpdated",source:rt+" "+o._resourceType,data:{groupBy:n}})}));f.reactor(pt,(function(){var n=y.selectedItemsCount(),t=y.itemCount(),r=y.moreDataOnServer(),i=nt.countMessage.format(t);r&&n?i=nt.selectedIncompleteCountMessage.format(n,t):r?i=nt.incompleteCountMessage.format(t):n&&(i=nt.selectedCountMessage.format(n,t));o.countMessage(i)}));var r=1,w={storageKeys:[r],storageType:yt},a=u.create(null);return a[r]="true",v={storageType:yt,storageSettings:a},c.BrowserStorageSettings.readBrowserStorageSettingsEndpoint.invoke(lt,ct,w).then((function(n){if(!ot&&i.isFeatureEnabled("showdecoupleinfobox")&&!n[r]){var t="<span>"+nt.decoupleBehaviourMessage.format("<a class='ext-hubs-decouplesubs-link' href='"+i.getEnvironmentValue("hubsLinks").learnDecoupleSubs+"' target='_blank'>"+nt.clickHere+"<\/a>")+"<\/span>";st||(st=p.getSubscriptions());st.then((function(n){n.length>1&&bt&&!ot&&o.infoBox(new s.ViewModel(ht,{image:f.observable(ut.Polychromatic.Info()),text:f.observable(t),canClose:!0,onCloseClickCallback:function(){o.infoBox(null);c.BrowserStorageSettings.writeBrowserStorageSettingsEndpoint.invoke(lt,ct,v).catch((function(n){at.error("Caught exception when invoking RPC to write to storage settings: "+n)}))}}))}))}})),h=y.loadData(),h&&g.Promises.cancelOnDispose(o._container,i.wrap(h)).then((function(){var n=y.assetTypeWithKind;n&&tt.text(l.NoResources.base.format(n))&&tt.createButtonText(l.CreateResources.type.format(n))}))}))}))},t.prototype.refresh=function(n){return this._browseConfig.refresh(n)},t})();t.BrowseViewModel=ht}));
define("HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/BrowseBlade",["require","exports","f","o","HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/BrowseBase"],(function(n,t,i,r,u){"use strict";var e,f,o;r.defineProperty(t,"__esModule",{value:!0});e=i.Base;f=(function(n){function t(t){var i=n.call(this,t)||this;return i._container=t,i.commandBar=i.vm.toolbar,i}return __extends(t,n),t.prototype.onInputsSet=function(n){var t="Browse_"+n.resourceType;return t=n.kind?t+"_"+n.kind:t,this._container.helpContentUri(t),this.processInputs(n)},t})(u.BrowseBase);t.BrowseBlade=f;o=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.onInputsSet=function(n){n.resourceType=e.Constants.ResourceTypes.RecentResources;var t="Browse_"+n.resourceType;return t=n.kind?t+"_"+n.kind:t,this._container.helpContentUri(t),this.processInputs(n)},t})(f);t.BrowseRecentsBlade=o}));
define("HubsExtension/_generated/Blades/HubsExtensionBrowseStyles.css",["require","exports"],(function(){"use strict";return".ext-hubs-browse-container{display:-webkit-flex;display:flex;flex-direction:column;height:100%}.ext-hubs-browse-filters{display:-webkit-flex;display:flex;flex-wrap:nowrap}.ext-hubs-browse-infobox{-webkit-flex:0 0 auto;flex:0 0 auto;margin-top:15px;padding-bottom:10px}.ext-hubs-browse-resourcefilter{-webkit-flex:0 0 68%;flex:0 0 68%;align-self:flex-start}.ext-hubs-browse-tagfilter{-webkit-flex:0 0 16%;flex:0 0 16%;align-self:flex-end;padding-bottom:10px;padding-right:10px;min-width:0}.ext-hubs-browse-groupby{-webkit-flex:0 0 16%;flex:0 0 16%;align-self:flex-end;padding-bottom:10px;min-width:0}.ext-hubs-browse-section{display:-webkit-flex;display:flex}.ext-hubs-browse-count{-webkit-flex:0 0 auto;flex:0 0 auto;margin-top:5px;padding-right:20px}.ext-hubs-browse-showall{-webkit-flex:0 0 auto;flex:0 0 auto;margin-top:5px;overflow:hidden}.ext-hubs-browse-grid-parent{-webkit-flex:1 1 auto;flex:1 1 auto;position:relative}.ext-hubs-browse-grid{position:absolute;top:0;bottom:0;left:0;right:0}.ext-hubs-browse-columns-grid{padding:10px 25px 0}.ext-hubs-browse-empty{margin:inherit auto;display:-webkit-flex;display:flex;flex-direction:column;align-items:center;justify-content:center}.ext-hubs-browse-emptytitle{font-size:15px}.ext-hubs-browse-emptytext{text-align:center;max-width:680px;padding-bottom:15px;font-size:12px}.ext-hubs-browse-links{max-width:680px;padding-bottom:17px;font-size:12px;-webkit-flex-wrap:wrap;flex-wrap:wrap}.ext-hubs-browse-link{padding-left:10px}.ext-hubs-browse-svg{width:10px;height:10px;display:inline-block}.ext-hubs-browse-emptyicon{height:100px;width:100px;padding-top:40px;padding-bottom:20px;opacity:.4}.ext-hubs-browse-hidegrid{flex:none;height:60px;position:relative}.ext-hubs-browse-tags-text-button{margin:4px 0;padding:0;border:0;cursor:pointer}.ext-hubs-browse-tags-text-more{font-weight:normal}.ext-hubs-browse-tags-header-container{border-bottom:1px solid}.ext-hubs-browse-tags-value-any{font-style:italic;font-weight:bold}a.ext-hubs-browse-link:hover{text-decoration:underline}"}));
define("HubsExtension/_generated/Blades/Resources",["require","exports","o","HubsExtension/_generated/Blades/HubsExtensionBrowseStyles.css","HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/BrowseBlade"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});t.blade={name:"Resources",entryPoint:{module:"HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/BrowseBlade","export":"BrowseBlade"},optionalInputs:["resourceType","selectedSubscriptionId","filter","scope","kind"],viewModelName:"BrowseGrid2$BrowseBlade",lenses:[],width:1,pinnedPart:"BrowseBaseResourcesPinnedPart",pinnable:!0,initialDisplayState:2,toolbar:{source:{valuesFrom:[{referenceType:0,property:"content.commandBar"}]}},templateBlade:{partSize:9,htmlTemplateInline:{file:"Browse.html",content:'<div class="ext-hubs-browse-container" data-bind="with: vm"> <!-- ko if: newBrowseInfoBox() --> <div class="ext-hubs-browse-infobox" data-bind="pcControl: newBrowseInfoBox"><\/div> <!-- /ko --> <!-- ko if: infoBox() --> <div class="ext-hubs-browse-infobox" data-bind="pcControl: infoBox"><\/div> <!-- /ko --> <div class="ext-hubs-browse-filters"> <div class="ext-hubs-browse-resourcefilter" data-bind="pcControl: resourceFilter"><\/div> <!-- ko if: showTagsFilter() --> <div class="ext-hubs-browse-tagfilter msportalfx-hideonactivated" data-bind="pcControl: tagsDropDown"><\/div> <!-- /ko --> <!-- ko if: showGroupBy() --> <div class="ext-hubs-browse-groupby msportalfx-hideonactivated" data-bind="pcControl: groupBy"><\/div> <!-- /ko --> <\/div> <div class="ext-hubs-browse-section msportalfx-hideonactivated"> <div class="ext-hubs-browse-count" data-bind="text: countMessage"><\/div> <!-- ko if: showAllCheckBox() --> <div class="ext-hubs-browse-showall" data-bind="pcControl: showAllCheckBox"><\/div> <!-- /ko --> <\/div> <!-- work around chrome bug where children in a flex layout don\'t pick up the right height --> <div data-bind="css: {\'ext-hubs-browse-grid-parent\': !isEmptyGrid(), \'ext-hubs-browse-hidegrid\': isEmptyGrid() }"> <div class="ext-hubs-browse-grid" data-bind="pcControl: gridViewModel"><\/div> <\/div> <div class="ext-hubs-browse-empty msportalfx-font-semilight" data-bind="visible: isEmptyGrid()"> <div class="ext-hubs-browse-emptyicon msportalfx-svg-disabled" data-bind="image: emptyBrowse.icon"><\/div> <h2 class="ext-hubs-browse-emptytitle" data-bind="text: emptyBrowse.text"><\/h2> <div class="ext-hubs-browse-emptytext"> <span data-bind="text: emptyBrowse.description"><\/span> <!-- ko if: emptyBrowse.links().length === 1 --> <a target="_blank" data-bind="attr: { href: emptyBrowse.links()[0].uri || emptyBrowse.links()[0].Uri }"> <span data-bind="text: emptyBrowse.links()[0].title || emptyBrowse.links()[0].Title"><\/span> <span class="ext-hubs-browse-svg msportalfx-fill" data-bind="image: linkIcon"><\/span> <\/a> <!-- /ko --> <\/div> <div class="ext-hubs-browse-links" data-bind="foreach: emptyBrowse.links(), visible: emptyBrowse.links().length > 1"> <a class="ext-hubs-browse-link" target="_blank" data-bind="attr: { href: $data.uri || $data.Uri }"> <span data-bind="text:$data.title || $data.Title"><\/span> <span class="ext-hubs-browse-svg msportalfx-fill" data-bind="image: $root.linkIcon"><\/span> <\/a> <\/div> <div data-bind="pcControl: createButton()"><\/div> <\/a> <\/div>'},styleSheets:[{file:"Blades/HubsExtensionBrowseStyles.css",content:r}]},activationStyle:{width:0},attributes:0}}))