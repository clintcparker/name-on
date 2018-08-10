define("Extensions/Hubs/PillList",["require","exports","f","o","ko"],(function(n,t,i,r,u){"use strict";var f;return (function(n){var t=i.ViewModels.Controls.Base.ViewModel,f=(function(n){function t(t,i){var r=n.call(this,t)||this,f;if(r.controlType=123,r.disabled=u.observable(!1),i.items)f=2;else if(i.item)f=1;else throw new Error("Unhandled options");return r._msPortalFxPrivates={type:f,options:i},r}return __extends(t,n),r.defineProperty(t.prototype,"item",{get:function(){return this._msPortalFxPrivates.type===1?this._msPortalFxPrivates.options.item:null},enumerable:!0,configurable:!0}),r.defineProperty(t.prototype,"items",{get:function(){return this._msPortalFxPrivates.type===2?this._msPortalFxPrivates.options.items:null},enumerable:!0,configurable:!0}),t})(t);n.ViewModel=f})(f||(f={})),f}));
define("Fx/Composition/PartReferences",["require","exports","f"],(function(n,t,i){"use strict";var r;return (function(n){var t=(function(n){function t(t,i,r){return n.call(this,t,i,r)||this}return __extends(t,n),t})(i.Composition.PartReference);n.PartReference=t})(r||(r={})),r}));
define("FxInternal/Controls/Accordion",["require","exports","f","o","ko"],(function(n,t,i,r,u){"use strict";var e;r.defineProperty(t,"__esModule",{value:!0});var o=i.ViewModels.Controls.Base.ViewModel,f=i.initObservable,s=(function(n){function t(t,r){var u=n.call(this,t)||this,o,e;return u.controlType=127,u.canExpandMultipleSections=r.canExpandMultipleSections,u.canCollapseAllSections=r.canCollapseAllSections,u.disabled=f(r.disabled,!1),u.visible=f(r.visible,!0),u.cssClass=f(r.cssClass,""),u.ariaLabel=f(r.ariaLabel,""),u.sections=i.initObservableArray(r.sections),u.canCollapseAllSections||(o=u.sections().every((function(n){return!n.expanded()})),o&&u.sections()[0].expanded(!0)),u.canExpandMultipleSections||(e=!0,u.sections().filter((function(n){return!!n.expanded()})).forEach((function(n){e?e=!1:n.expanded(!1)}))),u}return __extends(t,n),t})(o);t.ViewModel=s;e=(function(){function n(n,t){this.expanded=f(t&&t.expanded,!1);this.title=f(t&&t.title);Q.isPromiseAlike(t.content)?(this.content=u.observable(null),t.content.then(this.content)):this.content=u.isObservable(t.content)?t.content:u.observable(t.content)}return n})();t.Section=e}));
define("Fx/Controls/Accordion",["require","exports","o","FxInternal/Controls/Accordion"],(function(n,t,i,r){"use strict";function u(n,t){return new r.ViewModel(n,t)}function f(n,t){return new r.Section(n,t)}i.defineProperty(t,"__esModule",{value:!0});t.create=u;t.createSection=f}));
define("FxInternal/Controls/CheckBox",["require","exports","o","FxInternal/Controls/Base/FormsBase"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});var u=(function(n){function t(t,i){var r=n.call(this,t,i)||this;return i=i||{},r.controlType=7,r.inlineLabel=i.labelOnRight||i.inlineLabel||!1,r}return __extends(t,n),t})(r.ViewModel);t.ViewModel=u}));
define("Fx/Controls/CheckBox",["require","exports","f","o","ko","FxInternal/Controls/CheckBox"],(function(n,t,i,r,u,f){"use strict";function e(n,t){var r;return u.ignoreDependencies((function(){t=t||{};t=i.extend2(t,{disabled:i.initObservable(t.disabled,!1),ariaLabel:i.initObservable(t.ariaLabel,""),visible:i.initObservable(t.visible,!0),cssClass:i.initObservable(t.cssClass,"")});r=new f.ViewModel(n,t)})),r}r.defineProperty(t,"__esModule",{value:!0});t.create=e}));
define("FxInternal/Controls/Toolbars.FeedbackButton",["require","exports","f","o"],(function(n,t,i,r){"use strict";function u(){return new i.ViewModels.Toolbars.OpenLinkButton({label:i.Resources.Strings.Toolbar.FeedbackButton.title,icon:i.Base.Images.Feedback(),uri:"#menu/feedback",target:"_self"})}r.defineProperty(t,"__esModule",{value:!0});t.create=u}));
define("FxInternal/Data/GroupProjection",["require","exports","f","FxInternal/Data/BaseProjection"],(function(n,t,i,r){"use strict";return (function(n){function t(t){var r=n.call(this,t)||this;return r._groupBy=i.initObservable(t.groupBy,""),r._getGroupId=t.getGroupId,r._getGroup=t.getGroup,r._mapItem=t.mapItem,r._sortOrder=t.sortOrder,r._compare=t.compare,r.refresh(),r}return __extends(t,n),t.prototype.refresh=function(){var n=this._source.peek(),t,r,u;this._groupBy()?(u=this._groupItems(n),this._replace(u)):(t=this._sortOrder(),r=n,t&&t.length&&(r=i.stableSort(n,this._compare)),this._replace(r))},t.prototype._update=function(){this.refresh()},t.prototype._groupItems=function(n){var t=this,f={},u=[],e=this._groupBy(),s,r;n.forEach((function(n){var i=t._getGroupId(e,n),o=t._mapItem(i,n),r=f[i];r||(u.push(i),r=f[i]=[]);r.push(o)}));var h=!1,o=this._sortOrder(),c=1;return o&&o.length&&(s=o.filter((function(n){return n.property.name===e})),s.length?s[0].direction===0&&(c=0):h=!0),u.sort(i.compare),c===0&&u.reverse(),r=[],u.forEach((function(n){var s=t._getGroup(e,n),c=t._mapItem(n,null,s),u,o;r.push(c);u=f[n];o=u;h&&(o=i.stableSort(u,t._compare));r=r.concat(o)})),r},t})(r)}));
define("FxInternal/Data/GroupNavigator",["require","exports","f","o","a","ko","FxInternal/Data/FilterProjection","FxInternal/Data/PageProjection","FxInternal/Data/MapProjection","FxInternal/Data/GroupProjection"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";var p=i.Base,w=i.Errors.CanceledError,b=p.Promises,c=b.makeCancelable,a=i.initValue,k=i.initObservableArray,l,v,y;return (function(n){function t(n,t,r){var u=0;return n&&n.length&&n.some((function(n){var e=f.utils.unwrapObservablePath(t,n.property.name),o=f.utils.unwrapObservablePath(r,n.property.name);return f.isObservable(e)&&(e=e.peek()),f.isObservable(o)&&(o=o.peek()),u=i.compare(e,o),u&&n.direction===0&&(u=-u),u!==0})),u}n.compare=t})(l||(l={})),v="No group",y=(function(){function n(n,t){this._ltm=n.createChildLifetime();this._currentRequest=null;this._getId=t.getId;this._getModel=t.getModel;this._sourceItems=k(t.sourceItems);this._initialQueryParams=null;this._totalItems=f.observable(0);this._startIndex=f.observable(0);this._pageSize=f.observable();this._canLoadMore=f.observable(!0);this._items=f.observableArray();this._filtered=f.observableArray();this._mappedItems=f.observableArray();this._groupedItems=f.observableArray();this._paged=f.observableArray();this._projectionLifetime=null;this._filterProjection=null;this._pageProjection=null;this._mapProjection=null;this._groupProjection=null;this.properties=a(t.properties,[]);this.allowedFilterExpressions={};this.searchText=t.searchText||f.observable();this.sortOrder=t.sortOrder||f.observableArray();this.filterExpression=t.filterExpression||f.observable();this.selectedProperties=t.selectedProperties||f.observableArray();this.search=t.search;this.filter=t.filter;this.compare=t.compare;this._autoRefresh=a(t.autoRefresh,!0);this.groupBy=i.initObservable(t.groupBy,null);this._getGroupId=t.getGroupId;this._getGroup=t.getGroup;this._inputParamsPromise=Q(t.inputParams);this.items=this._items;this.totalItems=this._totalItems;this.startIndex=this._startIndex;this.pageSize=this._pageSize;this.canLoadMore=this._canLoadMore}return r.defineProperty(n.prototype,"initialized",{get:function(){var n=this;return this._inputParamsPromise.then((function(t){n._initialize(t)}))},enumerable:!0,configurable:!0}),r.defineProperty(n.prototype,"sourceItems",{get:function(){return this._sourceItems},enumerable:!0,configurable:!0}),n.prototype.refresh=function(){var t=this,n=this._beginRequest();return c(this.initialized,n).then((function(){return t._refresh(n)})).finally((function(){t._endRequest(n)}))},n.prototype.loadAll=function(){var t=this,n=this._beginRequest();return c(this.initialized,n).then((function(){return t._load(n)})).finally((function(){t._endRequest(n)}))},n.prototype.loadPage=function(n,t){var i=this,r=this._beginRequest();return c(this.initialized,r).then((function(){return i._validateBounds(n,t),i._load(r,n,t)})).finally((function(){i._endRequest(r)}))},n.prototype._initialize=function(n){n===void 0&&(n={});this._initialQueryParams=n;n.searchText&&this.searchText(n.searchText);n.filterExpression&&this.filterExpression(n.filterExpression);n.sortOrder&&this.sortOrder(n.sortOrder);n.selectedProperties&&this.selectedProperties(n.selectedProperties);n.groupBy&&this.groupBy(n.groupBy)},n.prototype._setProjections=function(){this._projectionLifetime&&this._projectionLifetime.dispose();this._projectionLifetime=this._ltm.createChildLifetime();this._setFilterProjection();this._setMapProjection();this._setGroupProjection();this._setPageProjection()},n.prototype._setFilterProjection=function(){var n=this;this._filterProjection=new e({lifetime:this._projectionLifetime,source:this._sourceItems,destination:this._filtered,autoRefresh:this._autoRefresh,filter:function(t){return n._filterFunc(t)}})},n.prototype._setMapProjection=function(){var n=this;this._mapProjection=new s({lifetime:this._projectionLifetime,source:this._filtered,destination:this._mappedItems,autoRefresh:this._autoRefresh,mapping:function(t){return n._map(t)}})},n.prototype._setGroupProjection=function(){var n=this;this._groupProjection=new h({lifetime:this._projectionLifetime,source:this._mappedItems,destination:this._groupedItems,autoRefresh:this._autoRefresh,groupBy:this.groupBy,getGroupId:function(t,i){return n._getGroupIdWrapper(t,i)},getGroup:function(t,i){return n._getGroupWrapper(t,i)},mapItem:function(t,i,r){return n._mapItem(t,i,r)},sortOrder:this.sortOrder,compare:function(t,i){return n._compareData(t,i)}})},n.prototype._setPageProjection=function(){this._pageProjection=new o({lifetime:this._projectionLifetime,source:this._groupedItems,destination:this._items,autoRefresh:this._autoRefresh,startIndex:this._startIndex,pageSize:this._pageSize,totalCount:this._totalItems})},n.prototype._validateBounds=function(n,t){if(n===null||n===undefined||n===NaN)throw new Error("skip must be a number");if(t===null||t===undefined||t===NaN)throw new Error("take must be a number");if(n<0)throw new Error("skip must be greater than or equal to zero");if(t<=0)throw new Error("take must be greater than zero");},n.prototype._compareData=function(n,t){var i=this.compare||l.compare;return i(this.sortOrder.peek(),n.data.peek(),t.data.peek())},n.prototype._filterFunc=function(n){if(this.filter&&!this.filter(n))return!1;var t=this.searchText.peek();return(t&&(t=t.trim()),t&&t.length&&this.search&&!this.search(t,n))?!1:!0},n.prototype._beginRequest=function(){return this._currentRequest&&(this._currentRequest.cancel(new w("Canceled for new request")),this._currentRequest=null),this._currentRequest=new i.Base.Promises.CancelationToken},n.prototype._endRequest=function(n){this._currentRequest===n&&(this._currentRequest=null)},n.prototype._load=function(n,t,i){var r=this;return c(this.initialized,n).then((function(){r._projectionLifetime||r._setProjections();r._pageProjection.loadPage(t,i)}))},n.prototype._refresh=function(n){var t=this;return c(this.initialized,n).then((function(){t._autoRefresh?t._filterProjection.refresh():(t._filterProjection&&t._filterProjection.refresh(),t._mapProjection&&t._mapProjection.refresh(),t._groupProjection&&t._groupProjection.refresh(),t._pageProjection&&t._pageProjection.refresh())}))},n.prototype._createItems=function(n,t){var i=this;if(t&&t.length!==n.length)throw new Error("Data model count must match data item count.");return n.map((function(n,r){var u=i._getId(n);if(f.isObservable(u))throw new Error("id can not be observable.");return{id:u,data:f.observable(t&&t[r])}}))},n.prototype._updateItems=function(n,t){if(n.length!==t.length)throw new Error("Data model count must match data item count.");for(var i=0;i<t.length;i++)n[i].data(t[i])},n.prototype._map=function(n){var r=this,t=[],i;return n&&n.length&&(this._getModel?(i=this._getModel(n),Q.isPromiseAlike(i)?(t=this._createItems(n),Q(i).then((function(n){r._updateItems(t,n)}))):t=this._createItems(n,i)):t=this._createItems(n,n)),t},n.prototype._getGroupIdWrapper=function(n,t){var i;if(this._getGroupId){if(i=this._getGroupId(n,t.data()),!i)throw new Error("A unique group id must be provided for each item");return i}return i=t.data()[n],i=f.toJS(i),(i?i:v).toLocaleUpperCase()},n.prototype._getGroupWrapper=function(n,t){return this._getGroup?this._getGroup(n,t):t},n.prototype._mapItem=function(n,t,r){return t?{id:t.id,data:t.data,groupId:n,groupHeader:!1}:{id:i.getUniqueIdGenerator(n),data:f.observable(r),groupId:n,groupHeader:!0}},n})(),y}))