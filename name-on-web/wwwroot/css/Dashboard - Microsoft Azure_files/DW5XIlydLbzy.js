define("_generated/Less/MsPortalImpl.Controls/Controls/Lists/List.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxc-list.azc-list.azc-list-selectable .azc-list-item[aria-selected=true]{position:relative}.fxc-list.azc-list.azc-list-selectable .azc-list-item[aria-selected=true] .fxc-list-selectedOverlay-corner{position:absolute;border-bottom:34px solid transparent;border-right:34px solid #00bcf2;top:0;right:0;width:0;height:0}.fxc-list.azc-list.azc-list-selectable .azc-list-item[aria-selected=true] .fxc-list-selectedOverlay-check{position:absolute;top:0;right:0;width:34px;height:34px;fill:#fff}.fxc-list.azc-list.azc-list-selectable.fxc-list-activateonselected .azc-list-list>.azc-list-item:not([aria-disabled=true]):hover{cursor:pointer}")}));
define("_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".azc-listView{overflow:hidden;padding:5px 0 0 5px}.azc-listView ul{margin:0;padding:0}.azc-listView-item{padding:0;margin:0 5px 5px 0;list-style-type:none;display:inline-block;font-size:10px;overflow:hidden;vertical-align:top}.azc-listView-empty{font-size:10px}.azc-listView-outlined .azc-listView-item:focus{outline-offset:0}")}));
define("_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.FocusableExtension.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".azc-listView-focusable.azc-listView-outlined .azc-listView-item.fxs-portal-focus{outline-color:#00bcf2;outline-width:1px}.azc-listView-focusable.azc-listView-outlined .azc-listView-item.fxs-portal-focus:focus{outline-style:dashed}.azc-listView-focusable.azc-listView-outlined .azc-listView-item.fxs-portal-focus:hover{outline-style:solid}")}));
define("_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.GroupableExtension.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,'.azc-listView-group{margin:0 0 20px}.azc-listView-group:last-child{margin:0}.azc-listView-groupheader{margin:0 5px 5px 0;font-family:az_ea_font,"Segoe UI",wf_segoe-ui_semibold,"Segoe UI Semibold","Segoe WP Semibold","Segoe WP",Tahoma,Arial,sans-serif;font-weight:600;font-size:12px}')}));
define("_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.SelectableExtension.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".azc-listView-selectable.azc-listView-outlined .azc-listView-item.fxs-portal-activated{outline-width:2px;outline-style:solid}.azc-listView-selectable.azc-listView-outlined .azc-listView-item.fxs-portal-activated:focus{outline-style:dashed}")}));
define("Viva.Controls/Controls/Lists/List1/Viva.List",["require","exports","f","o","ko","$","Viva.Controls/Util/Viva.TemplateEngine","Viva.Controls/Controls/Base/Viva.ExtensibleControl","MsPortalImpl.Controls/Controls/Base/WidgetBindingHandler","_generated/Less/MsPortalImpl.Controls/Controls/Lists/List.css","_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.css","_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.FocusableExtension.css","_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.GroupableExtension.css","_generated/Less/Viva.Controls/Controls/Lists/Viva.ListView.SelectableExtension.css"],(function(n,t,i,r,u,f,e,o,s){"use strict";var h;return (function(n){var c="azc-listView",l="<!-- ko template: 'body' --><!-- /ko -->",a="<!-- ko template: {name:'listOrEmpty',data:{itemViews:$ctl.itemViews}} --><!-- /ko -->",v="<div data-bind='visible:$data.itemViews().length'><!-- ko template: 'list' --><!-- /ko --><\/div><div data-bind='visible:!$data.itemViews().length'><!-- ko template: 'empty' --><!-- /ko --><\/div>",y="<div class='azc-listView-empty' data-bind='text:$vm.noItemsMessage'><\/div>",p="<ul class='azc-listView-list' data-bind='attr:{\"aria-disabled\":$disabled},foreach:$data.itemViews'><!-- ko context: {$disabled:metadata.disabled} --><!-- ko template: 'listItem' --><!-- /ko --><!-- /ko --><\/ul>",w='<li aria-level=1 class=\'azc-listView-item fxs-portal-hover azc-br-muted\' data-bind=\'visible:!ko.unwrap($data.metadata.hidden),attr:{title:$data.tooltip(),"aria-label":($data.ariaLabel()||"").trim()||undefined,"aria-disabled":$disabled,"aria-describedby":$data.metadata.describedById,"aria-hidden":ko.unwrap($data.metadata.hidden)?"true":"false" }\'><!-- ko template: \'itemContainer\' --><!-- /ko --><\/li>',b="<!-- ko template: {name:'item',data:item} --><!-- /ko -->",k="<!-- ko text: $data.toString?$data.toString():null --><!-- /ko -->",d=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),t})(o.Extension),t,h;n.Extension=d;t=(function(n){function t(t){var i=n.call(this,t)||this;return i.items=u.observableArray(),i.events=f.noop,i.plugins={},i.outlineStyle=u.observable(!0),i}return __extends(t,n),t})(o.ViewModel);n.ViewModel=t;h=(function(n){function f(i,r,f){var o=this;return f=f||{},f.viewModelType=f.viewModelType||t,o=n.call(this,i,r,f)||this,o.templateEngine=new e.HtmlTemplateEngine,o._itemViews=o.options.items.map(o.ltm,(function(n,t){var i=u.ignoreDependencies((function(){var i=o._createItemView(t);return o.options.filterText&&o.options.filterKey&&(i.metadata.hidden=u.computed(n,[o.options.filterText,o.options.filterKey],(function(n,t){return t&&n&&!~(u.unwrap(i.item[t])||"").toLowerCase().indexOf(n.toLowerCase())}))),i}));return n.registerForDispose((function(){o._disposeItemView(i)})),i})),o._extensionTrigger("beforeCreate"),o._setTemplates(),o.element.addClass(c).html(l),o.options.outlineStyle.subscribeAndRun(o.ltm,(function(n){return o.element.toggleClass("azc-listView-outlined",n)})),o._extensionTrigger("beforeAttachEvents"),o._extensionTrigger("afterAttachEvents"),o._bindDescendants(),o._extensionTrigger("afterCreate"),o}return __extends(f,n),f.prototype.dispose=function(){this._extensionTrigger("beforeDestroy");this._extensionTrigger("beforeDetachEvents");this._extensionTrigger("afterDetachEvents");this._cleanElement(c,"azc-listView-outlined");n.prototype.dispose.call(this);this._extensionTrigger("afterDestroy")},r.defineProperty(f.prototype,"itemViews",{get:function(){return this._itemViews},enumerable:!0,configurable:!0}),f.prototype.getItemView=function(n){return i.find(this._itemViews(),(function(t){return t.item===n}))},r.defineProperty(f.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),f.prototype._setTemplates=function(){this._extensionTrigger("beforeSetTemplates",this.templateEngine);this.templateEngine.setTemplate({body:a,listOrEmpty:v,list:p,empty:y,listItem:w,itemContainer:b,item:this.options.itemTemplate||k});this.templateEngine.getHtmlTemplate("listItem").addAttribute("li","data-bind",["keyedCss:{ listItem: $data.cssClass}"]);this._extensionTrigger("afterSetTemplates",this.templateEngine)},f.prototype._createItemView=function(n){var t={item:n,cssClass:n.cssClass||u.observable(""),ariaLabel:u.isObservable(n.ariaLabel)?n.ariaLabel:u.observable(n.ariaLabel),tooltip:u.isObservable(n.tooltip)?n.tooltip:u.observable(n.tooltip),metadata:i.extend({disabled:u.observable(!1),describedById:u.observable(null)},n.metadata)};return this._extensionTrigger("initializeItemView",t),t},f.prototype._disposeItemView=function(n){this._extensionTrigger("removeItemView",n)},f})(o.Widget);n.Widget=h;u.bindingHandlers.azcListView=s.getBindingHandler(h)})(h||(h={})),h}));
define("Viva.Controls/Controls/Lists/List1/Viva.List.Focusable",["require","exports","f","o","ko","MsPortalImpl/Base/JQueryHelper","Viva.Controls/Util/Viva.Util","Viva.Controls/Controls/Lists/List1/Viva.List"],(function(n,t,i,r,u,f,e,o){"use strict";var s;return (function(n){function w(n,t){var i=n.get(0);n.find(":focus").length===0&&(t&&e.setFocusToFirstFocusableChild(n)||(i.focus(),i.focus()))}function t(n){return f.filterVisible(n,c)}var a=window,v="attr:{'data-listView-focusable':true}",y="attr:{tabindex:metadata.tabIndex}, keyedCss:{ listTabIndex: $disabled()?'':'fxs-portal-focus'}",s=".azc-listView-item",c=s+"[data-listView-focusable=true]:not([aria-disabled=true])",p=i.disposeDisposable,h,l;(function(n){n[n.LastFocused=0]="LastFocused";n[n.All=1]="All"})(h=n.TabMode||(n.TabMode={}));l=(function(n){function i(t){var i=n.call(this)||this;return i._disposables=[],i._activeItem=u.observable(),i._options=t=t||{},t.tabMode=t.tabMode||h.LastFocused,i}return __extends(i,n),r.defineProperty(i.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),i.prototype.afterCreate=function(){var n=this;u.computed(this.ltm,(function(){var o=n._widget.itemViews(),i=n._activeItem(),e,f,s,r;if(i&&(r=i.metadata,(o.indexOf(i)<0||[r.disabled,r.hidden].some(u.utils.peekObservable))&&n._activeItem(i=null)),!i)for(e=0;e<o.length;e++)if(f=o[e],f&&f.metadata&&f.metadata.selected&&f.metadata.selected()){n._setActiveItem(i=f);break}i||(s=t(n._widget.element[0])[0],s&&n._setActiveItem(i=u.dataFor(s)));i&&(r=i.metadata,[r.disabled,r.hidden].forEach(u.unwrap))})).extend({rateLimit:{timeout:50,method:"notifyWhenChangesStop"}})},i.prototype.afterSetTemplates=function(n){n.getHtmlTemplate("listItem").addAttribute("li","data-bind",[v,y])},i.prototype.initializeItemView=function(n){var i=this,t=n.metadata;t.focused||(t.focused=u.observable(!1));t.tabIndex=u.pureComputed((function(){var r=i.options.tabMode,f=i._widget.$disabled(),e=n.metadata.disabled(),o=t.focused(),u=null;return r!==h.All&&(r!==h.LastFocused||!o)||f||e||(u=0),u}))},i.prototype.getOrder=function(){return 10},i.prototype.afterAttachEvents=function(){var n=this;this._disposables.push(this._widget.element.setEvents(["click.azcListView.focusable",c,function(t){var i=$(this).closest(s);n._focusItem(i,u.dataFor(i[0]),!0,t)}],["focusin.azcListView.focusable",c,function(){var t=$(this).closest(s);n._setActiveItem(u.dataFor(t[0]))}],["keydown.azcListView.focusable",function(t){var r=$(t.target).filter(s),i;if(r.length===1){switch(t.which){case 38:i=n._findPreviousAboveFocusable(r);t.preventDefault();break;case 37:i=n._findPreviousFocusable(r);t.preventDefault();break;case 40:i=n._findNextBelowFocusable(r);t.preventDefault();break;case 39:i=n._findNextFocusable(r);t.preventDefault()}i&&i.length>0&&n._focusItem(i,u.dataFor(i[0]),!1,t)}}]))},i.prototype.beforeDestroy=function(){p(this._disposables);this._disposables=[];this._activeItem(null);this._widget.element.removeClass("fxs-portal-focus")},i.prototype.getName=function(){return i.Name},i.prototype._findPreviousFocusable=function(n){var u=n[0],r=t(this._widget.element[0]),i;if(u)for(i=r.length-1;i>=0;i--)if(u===r[i]&&i>0)return $(r[i-1]);return $(r[r.length-1])},i.prototype._findPreviousAboveFocusable=function(n){var e=n[0],f=t(this._widget.element[0]),i,r,h,o,c,l,u,s;if(e)for(c=e.offsetTop,l=e.offsetLeft,i=0;i<f.length;i++)u=c-f[i].offsetTop,u>0&&(!r||u<=o)&&(s=Math.abs(f[i].offsetLeft-l),(!r||u<o||s<h)&&(r=$(f[i]),h=s,o=u));return r?r:this._findPreviousFocusable(n)},i.prototype._findNextFocusable=function(n){var u=n[0],r=t(this._widget.element[0]),i;if(u)for(i=0;i<r.length;i++)if(u===r[i]&&i<r.length-1)return $(r[i+1]);return $(r[0])},i.prototype._findNextBelowFocusable=function(n){var e=n[0],f=t(this._widget.element[0]),i,r,h,o,c,l,u,s;if(e)for(c=e.offsetTop,l=e.offsetLeft,i=0;i<f.length;i++)u=f[i].offsetTop-c,u>0&&(!r||u<=o)&&(s=Math.abs(f[i].offsetLeft-l),(!r||u<o||s<h)&&(r=$(f[i]),h=s,o=u));return r?r:this._findNextFocusable(n)},i.prototype._focusItem=function(n,t,i,r){var f=$(n),u;t&&f[0]!==a.document.activeElement&&(this._setActiveItem(t),w(f,i),u={focused:t.item},this._widget.trigger("itemFocus",e.cloneEvent(r,"itemFocus"),u),this._widget.options.events("focus",u))},i.prototype._setActiveItem=function(n){var t=this._activeItem();n&&n!==t&&(t&&t.metadata.focused(!1),this._activeItem(n),n.metadata.focused(!0))},i})(o.Extension);l.Name="azc-listView-focusable";n.FocusableExtension=l})(s||(s={})),s}));
define("Viva.Controls/Controls/Lists/List1/Viva.List.Selectable",["require","exports","f","o","ko","$","Viva.Controls/Controls/Lists/List1/Viva.List.Focusable","Viva.Controls/Util/Viva.Util","Viva.Controls/Controls/Lists/List1/Viva.List","MsPortalImpl/Resources/ImplScriptResources"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";var c;return (function(n){var v=window,y="attr:{'data-listView-selectable':true}",p="keyedCss: {listSelected: $vm.plugins.selectable._itemSelected(metadata) ? 'fxs-portal-activated' : ''}, attr:{ 'aria-selected': $vm.plugins.selectable._itemSelected(metadata).toString(), 'aria-describedby': $vm.plugins.selectable._itemAriaDesc(metadata) }",l=".azc-listView-item",a=l+"[data-listView-selectable=true]:not([aria-disabled=true])",w="<!-- ko template: {name:'item',data:item} --><!-- /ko --><!-- ko if: metadata.selected() --><!-- ko template: 'selectedOverlay' --><!-- /ko --><!-- /ko -->",t,c;(function(n){n[n.Single=0]="Single";n[n.Multiple=1]="Multiple"})(t=n.SelectionMode||(n.SelectionMode={}));c=(function(n){function s(t){var r=n.call(this)||this;return r._options=f.extend(r._getDefaultOptions(),t),r._selectedIndicatorId=i.getUniqueId(),r}return __extends(s,n),r.defineProperty(s.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),s.prototype.getSelected=function(){return this.options.selectedItems()},s.prototype.select=function(n,t,i){this._select(n,t,i)},s.prototype.unselect=function(n){n.metadata.selected(!1);this.options.selectedItems.remove(n.item)},s.prototype.afterSetTemplates=function(n){n.getHtmlTemplate("listItem").addAttribute("li","data-bind",[y,p]);this.options.selectedOverlayTemplate&&n.setTemplate({itemContainer:w,selectedOverlay:this.options.selectedOverlayTemplate})},s.prototype.initializeItemView=function(n){var t=n.metadata,i=this.options.selectedItems.peek().indexOf(n.item)>=0;t.selected?t.selected(i):t.selected=u.observable(i)},s.prototype.removeItemView=function(n){this.options.selectedItems.remove(n.item)},s.prototype.afterAttachEvents=function(){var n=this,t=function(t){n._changeSelection(this,t,t.ctrlKey)};this._ltm.registerForDispose(this._widget.element.setEvents(["click.azcListView.selectable",a,t,],["dblclick.azcListView.selectable",a,t,],["keydown.azcListView.selectable",function(t){(t.which===13||t.which===32)&&f(t.target).is(l)&&t.target===v.document.activeElement&&(n._changeSelection(t.target,t,t.ctrlKey),t.preventDefault())},]))},s.prototype.afterCreate=function(){var n=this;this.options.selectedItems.subscribeArrayChanges(this._ltm,(function(t){var i=n._widget.getItemView(t);i&&n.select(i,!0,!1)}),(function(t){var i=n._widget.getItemView(t);i&&n.unselect(i)}));this._widget.element.append(f("<div class='fxs-hide-accessible-label' aria-hidden='true'><\/div>").attr("id",this._selectedIndicatorId).text(h.Controls.ListView.selected));this._widget.itemViews().forEach((function(t){t.metadata.selected(n.options.selectedItems.indexOf(t.item)>=0)}))},s.prototype.getOrder=function(){return 20},s.prototype.getDependencies=function(){return[new e.FocusableExtension]},s.prototype.beforeDestroy=function(){this._widget.element.removeClass("fxs-portal-activated").attr({"aria-selected":null,"aria-describedby":null})},s.prototype.getName=function(){return s.Name},s.prototype._changeSelection=function(n,t,i){var f=u.dataFor(n),r=this._select(f,i,i);this._widget.trigger("itemSelect",o.cloneEvent(t,"itemSelect"),r);this._widget.options.events("select",r)},s.prototype._getDefaultOptions=function(){return{selectionMode:t.Single,selectedItems:u.observableArray(),selectedOverlayTemplate:null}},s.prototype._select=function(n,i,r){var e=this,f,u={selected:[],unselected:[]};return this.options.selectedItems().forEach((function(o){var s=o===n.item,h,c;f=f||s;h=i&&e.options.selectionMode===t.Multiple?!s||s&&!r:s&&!r;h?s&&n.metadata.selected(!0):(c=e._widget.getItemView(o),c&&c.metadata.selected(h),u.unselected.push(o))})),u.unselected.length&&this.options.selectedItems.removeAll(u.unselected),f||(n.metadata.selected(!0),u.selected.push(n.item),this._options.selectedItems.push(n.item)),u},s.prototype._itemAriaDesc=function(n){var t=[n.describedById()||""];return n.selected()&&t.push(this._selectedIndicatorId),t.join(" ").trim()||null},s.prototype._itemSelected=function(n){return!!(!this._widget.$disabled()&&n.selected())},s})(s.Extension);c.Name="azc-listView-selectable";n.SelectableExtension=c})(c||(c={})),c}));
define("Viva.Controls/Controls/Lists/List1/Viva.List.ContextMenu",["require","exports","o","ko","Viva.Controls/Controls/Lists/List1/Viva.List.Selectable","Viva.Controls/Util/Viva.Util","Viva.Controls/Controls/Lists/List1/Viva.List"],(function(n,t,i,r,u,f,e){"use strict";var o;return (function(n){var o=".azc-listView-item[data-listView-selectable=true]:not([aria-disabled=true])",t=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return __extends(t,n),i.defineProperty(t.prototype,"options",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.afterAttachEvents=function(){var n=this._widget;this._ltm.registerForDispose(n.element.setEvents(["contextmenu.azcListView.contextMenu",o,function(t){if(t.which!==3||!t.ctrlKey){var i=r.dataFor(this);i.metadata.selected()||n._extensionTrigger("select",i);n.trigger("listViewContextMenu",f.cloneEvent(t,"listViewContextMenu"),i,t.target)}}]))},t.prototype.getDependencies=function(){return[new u.SelectableExtension]},t.prototype.getName=function(){return t.Name},t})(e.Extension);t.Name="azc-listView-contextMenu";n.ContextMenuExtension=t})(o||(o={})),o}));
define("Viva.Controls/Controls/Lists/List1/Viva.List.Groupable",["require","exports","f","o","ko","Viva.Controls/Controls/Lists/List1/Viva.List"],(function(n,t,i,r,u,f){"use strict";var e;return (function(n){function e(n){return i.isNullOrUndefined(n)?n:u.toJS(n)}function t(n){var t=e(n);return t!==undefined&&t!==null&&t.toString?t.toString()||"":""}function l(n,i){var r=[],u={};return i.forEach((function(i){var o=i.item[n],f=t(o);f&&!u[f]&&(r.push({value:e(o)}),u[f]=!0)})),r}function a(n,i,r){var f=[],u;return i===0?f=n:(u=n.map((function(n){return e(n.value)})),r?u.sort(r):u.sort(),i===2&&u.reverse(),u.forEach((function(i){var r=t(i);n.forEach((function(n){r===t(n.value)&&f.push(n)}))}))),f}function v(n,r,u,f){n.itemViews().forEach((function(n){var e,o=t(n.item[u]);o&&(e=i.find(r,(function(n){return o===t(n.value)})));n.metadata.groupId(e?e.value:"");n.metadata.describedById(e?e.groupHeaderId:f)}))}var h="<!-- ko if: $ctl.itemViews().length > 0 --><div role='list'><!-- ko foreach: $vm.plugins.groupable.groups --><section role='listitem' aria-level=1 class='azc-listView-group' data-bind='attr: {\"aria-label\":$vm.plugins.groupable.getGroupAriaLabel($data)}, visible: $vm.plugins.groupable.groupHasVisibleItems($data.groupMembers = $vm.plugins.groupable.getItemViewsByGroup(value))'><div class='azc-listView-groupheader azc-br-muted'><!-- ko template: 'groupHeaderTemplate' --><!-- /ko --><\/div><!-- ko template: {name:'listOrEmpty',data:{itemViews:$data.groupMembers}} --><!-- /ko --><\/section><!-- /ko --><!-- ko if: $vm.plugins.groupable.getItemViewsByGroup('')().length --> <section role='listitem' aria-level=1 class='azc-listView-group' data-bind='attr: {\"aria-label\":$vm.plugins.groupable.getGroupAriaLabel()}'><div class='azc-listView-groupheader azc-br-muted'><!-- ko template: {name:'noGroupHeaderTemplate'} --><!-- /ko --><\/div><!-- ko template: {name:'list',data:{itemViews:$vm.plugins.groupable.getItemViewsByGroup('')}} --><!-- /ko --><\/section><!-- /ko --><\/div><!-- /ko --><!-- ko ifnot: $ctl.itemViews().length --> <!-- ko template: 'empty' --><!-- /ko --><!-- /ko -->",o="<div class='azc-listView-groupheader-text' data-bind='text:$vm.plugins.groupable.valueOrDefaultHeader(value),attr:{id:groupHeaderId,\"aria-label\":$vm.plugins.groupable.getGroupAriaLabel($data)}'><\/div>",c="<div class='azc-listView-groupheader-text' data-bind='text:$vm.plugins.groupable.options.noGroupLabel,attr:{id:$vm.plugins.groupable.groupIdForUnassigned,\"aria-label\":$vm.plugins.groupable.getGroupAriaLabel()}'><\/div>",s=(function(n){function f(t){var r=n.call(this)||this;return r._groupItemViews={},r.groupIdForUnassigned=i.getUniqueId(),r._options=i.extend({groupKey:u.observable(""),headerTemplate:o,groups:null,noGroupLabel:"",noGroupAriaLabel:"",order:u.observable(0),sortFunction:null},t),r}return __extends(f,n),r.defineProperty(f.prototype,"groups",{get:function(){return this._groups()},enumerable:!0,configurable:!0}),r.defineProperty(f.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),f.prototype.afterSetTemplates=function(n){n.getHtmlTemplate("listItem").addAttribute(null,"aria-level",["2"]);n.setTemplate({body:h,noGroupHeaderTemplate:c,groupHeaderTemplate:this.options.headerTemplate||o})},f.prototype.beforeCreate=function(){var n=this;this._groups=u.computed(this.ltm,(function(){var r=n.options.groups?n.options.groups():null,t=r||l(n.options.groupKey(),n._widget.itemViews());return t.forEach((function(n){return n.groupHeaderId=i.getUniqueId()})),v(n._widget,t,n.options.groupKey(),n.groupIdForUnassigned),a(t,n.options.order(),n.options.sortFunction)})).extend({deferred:!0})},f.prototype.beforeDestroy=function(){i.disposeDisposable(this._groups,this._groupsComputed)},f.prototype.initializeItemView=function(n){var t=n.metadata;t.groupId||(t.groupId=u.observable(""))},f.prototype.getItemViewsByGroup=function(n){var o=this,f,e;if(i.isNullOrUndefined(n))throw new Error("groupId cannot be null or undefined when fetching group items.");return f=this._groupItemViews,this._groupsComputed||(this._groupsComputed=u.computed(this.ltm,(function(){var n=o._widget.itemViews();n.forEach((function(n){return u.unwrap(n.metadata.groupId)}));u.ignoreDependencies((function(){var i={};r.keys(f).forEach((function(n){return i[n]=[]}));n.forEach((function(n){var r=t(n.metadata.groupId);(i[r]||(i[r]=[])).push(n)}));r.keys(i).forEach((function(n){return f[n]?f[n](i[n]):f[n]=u.observableArray(i[n])}))}))})).extend({deferred:!0})),e=t(n),f[e]||(f[e]=u.observableArray())},f.prototype.groupHasVisibleItems=function(n){return!!n().filter((function(n){return!u.unwrap(n.metadata.hidden)})).length},f.prototype.getGroupAriaLabel=function(n){n=n||{value:null};var t=(u.unwrap(n.ariaLabel)||"").trim();return t||(i.isNullOrUndefined(n.value)?this.options.noGroupAriaLabel||this.options.noGroupLabel:n.value)||undefined},f.prototype.valueOrDefaultHeader=function(n){return i.isNullOrUndefined(n)?this.options.noGroupLabel:n},f.prototype.getName=function(){return f.Name},f})(f.Extension);s.Name="azc-listView-groupable";n.GroupableExtension=s})(e||(e={})),e}));
define("_generated/Less/MsPortalImpl.Controls/Controls/Lists/ListView.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxc-listView.azc-listView.azc-listView-selectable .azc-listView-item[aria-selected=true]{position:relative}.fxc-listView.azc-listView.azc-listView-selectable.fxc-list-activateonselected .azc-listView-list>.azc-listView-item:not([aria-disabled=true]):hover{cursor:pointer}")}));
define("MsPortalImpl.Controls/Controls/Lists/List1/ListView",["require","exports","f","o","ko","$","MsPortalImpl/UI/Commands/UI.Commands.Base","MsPortalImpl.Controls/Controls/Base/Loadable","Viva.Controls/Controls/Lists/List1/Viva.List","Viva.Controls/Controls/Lists/List1/Viva.List.Selectable","Viva.Controls/Controls/Lists/List1/Viva.List.Groupable","Viva.Controls/Controls/Lists/List1/Viva.List.ContextMenu","_generated/Less/MsPortalImpl/Parts/Parts.Properties.css","_generated/Less/MsPortalImpl.Controls/Controls/Lists/ListView.css"],(function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";var a;return (function(n){var f=i.ViewModels.Controls.Lists,t=f.ListView.Extensions,e=jQuery,a="fxc-listView",v="fxc-list-activateonselected",y="listViewContextMenu",p=(function(n){function i(t,i,r){var u=n.call(this,t,i,r)||this;return u.element.addClass(a),u._initializeWidgets(),u}return __extends(i,n),i.prototype.dispose=function(){this._checkExistsOrRegisterDestroyId(n.prototype.dispose)||(this.element.removeClass(a),n.prototype.dispose.call(this))},r.defineProperty(i.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),i.prototype._initializeWidgets=function(){var tt=this,o=this.options,g=this.element,b=o.extensions,n=o.extensionOptions||{},i=n.selectable,nt=b&t.Selectable,a=this.ltm,p,r,e,w,k,d;if(i&&i.activateOnSelected&&g.addClass(v),r=new s.ViewModel(this.vmBasicOption),r.populateFromObject({disabled:o.disabled,events:o.events,items:o.items,itemTemplate:this.sanitizeTemplate(o.itemTemplate),noItemsMessage:o.noItemsMessage,outlineStyle:o.outlineStyle}),nt&&(e=u.observableArray(),i&&(w=i.selection,w&&(d=function(n,t){var r=w.selectableItems().first((function(t){return t.data===n}));r&&(k=!0,r.isSelected(t),k=!1,i.activateOnSelected&&r.isActivated(t))},e.subscribeArrayChanges(a,(function(n){return d(n,!0)}),(function(n){return d(n,!1)})),u.computed(a,(function(){w.selectableItems().forEach((function(n){var i=n.isSelected(),t;k||(t=e.peek().indexOf(n.data),i&&t<0?e.push(n.data):!i&&t>=0&&e.splice(t,1))}))})),w.selectedItems.subscribe(a,(function(){p&&(p.resolve(),p=null)}))),i.selectionMode===f.ListView.SelectionMode.Single&&(e.subscribe(a,(function(n){n&&n[0]&&i.selectedItem(n[0])})),i.selectedItem.subscribeAndRun(a,(function(n){if(n){var t=e();t.length===1&&t[0]===n||e.splice(0,t.length,n)}else e.removeAll()})))),r.extensions.push(r.plugins.selectable=new h.SelectableExtension(i&&{selectionMode:i.selectionMode,selectedItems:e}))),b&t.ContextMenu){if(!nt)throw new Error("The list view context menu extension depends on the selection extension, but selection is not enabled.");a.registerForDispose(g.setEvents([y,function(n,t){return(p=Q.defer()).promise.then((function(){tt._triggerRightClickEvent(n,t.item);p=null})),t.metadata.selected()&&p.resolve(),n.preventDefault(),n.stopPropagation(),!0}]));r.extensions.push(new l.ContextMenuExtension)}b&t.Groupable&&r.extensions.push(r.plugins.groupable=new c.GroupableExtension(n.groupable&&{groupKey:n.groupable.groupKey,groups:n.groupable.groups,headerTemplate:this.sanitizeTemplate(n.groupable.headerTemplate),noGroupLabel:n.groupable.noGroupLabel,noGroupAriaLabel:n.groupable.noGroupAriaLabel,order:n.groupable.order,sortFunction:null}));b&t.Filterable&&n.filterable&&(r.filterText=n.filterable.filterText,r.filterKey=n.filterable.filterKey);this._widgets.push(new s.Widget(this.element,r))},i.prototype._triggerRightClickEvent=function(n,t){var i=e.Event("rightclick");return i.clientX=t.clientX,i.clientY=t.clientY,e(n.target).trigger(i,this._getCommandRightClickEventArgs(t)),!0},i.prototype._getCommandRightClickEventArgs=function(n){var r=this.options.extensionOptions.selectable.selection,t=n.commandGroup,i=n.commandGroupOwner,u=r.selectedItems().firstIndex((function(n){return n.commandGroup!==t&&n.commandGroupOwner!==i}));return u!==-1&&(t=null,i=null),{entityType:1,commandGroup:t,commandGroupOwner:i,viewModel:n,listData:{selectableSet:r,deleteRowCommandTitle:null,markForDelete:null}}},i})(o.Widget);n.Widget=p})(a||(a={})),a}))