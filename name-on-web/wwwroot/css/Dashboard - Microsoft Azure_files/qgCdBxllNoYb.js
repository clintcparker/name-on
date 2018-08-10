define("HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/RecentResourceCommands",["require","exports","f","o","ko","HubsExtension/Common/RecentResources"],(function(n,t,i,r,u,f){"use strict";var e;r.defineProperty(t,"__esModule",{value:!0});var o=i.Base,s=o.Images,h=i.ViewModels,c=(function(n){function t(){var t=n.call(this)||this;return t.icon(s.Discard()),t}return __extends(t,n),t.prototype.onInputsSet=function(n){if(!n.id){this.enabled(!1);return}this._id=n.id;return},t.prototype.execute=function(){this.enabled(!1);f.getRecentsManager().removeRecent(this._id)},t})(h.Command);t.DiscardRecentResourceCommand=c;e=(function(){function n(n){this.canExecute=u.pureComputed(n)}return n.prototype.execute=function(){return f.getRecentsManager().clear()},n})();t.ClearRecentResourcesCommand=e}));
define("HubsExtension/BrowseGrid2/BrowseBlades/BrowseConfigurations/Recent",["require","exports","f","o","ko","FxInternal/Controls/Grid2/GridB","FxInternal/Data/GroupNavigator","HubsExtension/Browse/BrowseClientStrings","HubsExtension/_generated/ExtensionDefinition","HubsExtension/Common/RecentResources","HubsExtension/BrowseGrid2/BrowseBlades/ViewModels/RecentResourceCommands","HubsExtension/BrowseGrid2/BrowseBlades/BrowseConfigurations/Base"],(function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";r.defineProperty(t,"__esModule",{value:!0});var v=i.Base,y=i.ViewModels,p=y.Toolbars,a=window,w=u.utils.peekObservable,b=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.loadData=function(){return null},t.prototype.createGridViewModel=function(){var n=this;this._ltm.registerForDispose((function(){n._cancelTimer()}));this._recentExistingModelCache=new i.Map;this._lastPopulationIndex=0;var t={sourceItems:this._items,getId:function(n){return w(n.id)}},r=new e(this._ltm,t),c=this._createGridOptions({dataNavigator:r,columns:u.observableArray([l.getNameColumn(),{id:"assetTypeName",name:u.observable(o.Columns.AssetType.title),hiddenInCollapsed:!0,width:u.observable("100px")},{id:"timeStamp",name:u.observable(o.Columns.LastAccess.title),hiddenInCollapsed:!0,width:u.observable("100px")},]),selection:{dynamicSelectionProvider:function(t,i){return i.dynamicBladeSelectionPromise()||i.dynamicBladeSelectionPromise(n._getSelectionPromise(i,i.assetTypeInformation)),i.dynamicBladeSelectionPromise().then((function(t){n._logActivation(i.id,t)})),i.dynamicBladeSelectionPromise()},pinProvider:this._getPinProvider(),activationMode:2,commandGroupProvider:function(){return Q([{id:s.CommandGroupNames.recentResourceBrowseGrid2Commands},])},activationContainer:this._container},resizing:{resizeToPercent:u.observable(!0)},ariaLabel:o.Aria.recentsDescription,getRowAriaLabel:function(n){return o.Aria.rowDescription.format(n.name,o.AssetTypeNames.AllResource.lowerSingular)}});this.gridViewModel=new f.ViewModel(this._ltm,c);this.gridViewModel.noRowsMessage(o.NoResources.base.format(o.AssetTypeNames.RecentResource.lowerPlural));this._recentsView=h.getRecentsManager().recentsList;this._recentsView.subscribeAndRun(this._ltm,(function(){return n._populate()}));this._resourceTypeName=o.AssetTypeNames.RecentResource.lowerPlural;this._createFilteringComputed();this._refreshTimer=a.setTimeout((function(){n._recentsView().forEach((function(t){var i=n._recentExistingModelCache.get(t.key);i&&i.timeStamp(new Date(t.timeStamp).toRelativeString())}))}),6e4)},t.prototype._populate=function(){var n=this,t=this._recentsView()||[],r,f;this._resourceInstanceMap=new i.Map;r=++this._lastPopulationIndex;r>=this._lastPopulationIndex&&(f=t.map((function(t){var r=t.assetTypeInformation||{},o=r.compositeDisplayName&&r.compositeDisplayName.singular,e=n._recentExistingModelCache.get(t.key),f;return e?(e.timeStamp(new Date(t.timeStamp).toRelativeString()),i.clone(e)):(f={icon:u.observable(r.icon),name:t.name,isPreview:u.observable(r.isPreview),kind:u.observable(t.resourceKind),kindUseResourceMenu:u.observable(),timeStamp:u.observable(new Date(t.timeStamp).toRelativeString()),assetTypeName:u.observable(o),id:t.resourceId,extensionName:u.observable(r.extensionName),assetType:u.observable(r.assetType),assetTypeInformation:r,dynamicBladeService:u.observable(r.dynamicBladeServiceViewModel),dynamicBladeSelectionPromise:u.observable(),kindBlade:u.observable(),kindBladeExtension:u.observable(),kindPart:u.observable()},n._checkIconAndBladeFromKind(t.resourceId,f,r,!0),n._recentExistingModelCache.set(t.key,f),f)})).filter((function(t){return n._searchString()?t.name.toLowerCase().indexOf(n._searchString().toLowerCase())!==-1:!0})),this._items(f));this._hasErrors(!1);this._setContentState();this._logPrimaryDataLoadedTelemetry(t.length)},t.prototype._makeBrowseItem=function(){throw new Error("Should not have called makeBrowseItem for recent?");},t.prototype.populateCommandBar=function(){var t=this,n=new p.CommandButton;n.command=new c.ClearRecentResourcesCommand(function(){return t._items().length>0});n.icon(v.Images.Delete());n.label(o.clearRecentsCommand);this._toolbar.setItems([n])},t.prototype.refresh=function(){return this._populate(),Q()},t.prototype._cancelTimer=function(){this._refreshTimer&&a.clearTimeout(this._refreshTimer);this._refreshTimer=0},t})(l.BaseConfiguration);t.BrowseRecentConfiguration=b}))