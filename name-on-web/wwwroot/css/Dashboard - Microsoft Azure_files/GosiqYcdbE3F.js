define("Viva.Controls/Controls/Base/Viva.ItemList",["require","exports","i","o","ko","MsPortalImpl/Base/Base.KeyboardHelper","Viva.Controls/Util/Viva.TemplateEngine","Viva.Controls/Util/Viva.Util","Viva.Controls/Controls/Base/Viva.ValidatableControl"],(function(n,t,i,r,u,f,e,o,s){"use strict";var h;return (function(n){function w(n,i,f){var o=n,e=i,s=function(n){var i;e.hasOwnProperty(n)&&(i=e[n],i!==undefined&&(o[n]=u.isObservable(i)?i:t(i)))},h=f||r.keys(e)||[];h.forEach(s)}var a=jQuery,c="azc-itemList",v='<ul class=\'azc-input\' data-bind=\'foreach: data.values, attr: { "aria-disabled": $disabled, role: $ctl._roleGroup, "aria-labelledby": data.label }\'><!-- ko template: { name: "itemTemplate", context: { $disabled: disabled, $tabIndex: _tabindex } } --><!-- /ko --><\/ul>',y='<li data-bind=\'text: text, attr: { role: $ctl._role, "aria-checked": $ctl._ariaSelected($data), "aria-disabled": $disabled, disabled: $disabled, tabindex: $tabIndex }, css: { "azc-itemlist-selected": selected()}\' />',t=u.observable,p=0,b=(function(){function n(n,r,u,f){this._destroyIds=[];this._ltm=new i.TriggerableLifetimeManager;this.text=t();this.value=t();this.selected=t(u||!1);this.disabled=t(f||!1);this.ariaLabel=t();this._tabindex=t(-1);this.text(n);this.value(r)}return n.prototype._checkExistsOrRegisterDestroyId=function(n){return o.existsOrRegisterId(this._destroyIds,n)},n.prototype.isDestroyed=function(){return this._destroyIds.length>0},n.prototype.dispose=function(){this._checkExistsOrRegisterDestroyId(null)||this._ltm&&(this._ltm.dispose(),this._ltm=null)},n.prototype.populateFromObject=function(n){w(this,n,["text","value","selected","disabled","ariaLabel"])},n})(),h,l;n.ItemValue=b;h=(function(n){function t(t){var i=n.call(this,t)||this;return i.label=null,i.values=u.observableArray(),i}return __extends(t,n),t})(s.ViewModel);n.ViewModel=h;l=(function(n){function t(t,i,r){var u=this;return r=r||{},r.viewModelType=r.viewModelType||h,u=n.call(this,t,i,r)||this,u.templateEngine=new e.StringTemplateEngine,u._setName(),u._setRole(),u.templateEngine.setTemplate("itemTemplate",u._attachItemTemplate()),u.element.addClass(c).html(v),u._attachEvents(),u._bindDescendants(),u.options.values.map(u.ltm,(function(n,t){n.registerForDispose(t)})),u}return __extends(t,n),t.prototype.dispose=function(){this._checkExistsOrRegisterDestroyId(n.prototype.dispose)||(this._cleanElement(c),n.prototype.dispose.call(this))},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._getElementToFocus=function(){return this.widget().find("li[tabindex=0]")[0]||null},t.prototype._setName=function(){var n=this.options;n.name||(n.name="__azc-itemList"+p++)},t.prototype._setRole=function(){this._role="item";this._roleGroup="itemList"},t.prototype._attachItemTemplate=function(){return y},t.prototype._set=function(n){n.selected(!0)},t.prototype._isSameValue=function(n,t){return n===t||n!==undefined&&n!==null&&t!==undefined&&t!==null&&n.text===t.text&&n.value===t.value},t.prototype._initializeSubscriptions=function(t){var i=this;n.prototype._initializeSubscriptions.call(this,t);t.values.subscribe(this.ltm,(function(){i._valueChangedSubscriber(t.value())}));this._createPerItemSubscriptions(this.options.values());this.options.values.subscribe(this.ltm,(function(n){i._createPerItemSubscriptions(n)}));t.value.subscribeAndRun(this.ltm,(function(n){i._valueChangedSubscriber(n)}));t.disabled.subscribeAndRun(this.ltm,(function(n){i._widgetDisabledSubscriber(n)}))},t.prototype._valueChangedSubscriber=function(n){var t=this;n&&(n.selected()||n.selected(!0));this.options.values().forEach((function(i){i!==n&&t._unselectItemValue(i)}));n?n._tabindex(0):this._setUnselectedTabIndex()},t.prototype._widgetDisabledSubscriber=function(n){var t=this.options.value(),i=this.element;n?(i.attr("aria-disabled",!0),t&&t._tabindex(-1)):(i.removeAttr("aria-disabled"),this.options.value.notifySubscribers(t))},t.prototype._createPerItemSubscriptions=function(n){var t=this;this._itemltm&&this._itemltm.dispose();this._itemltm=this.ltm.createChildLifetime();n.forEach((function(n){n.selected.subscribeAndRun(t._itemltm,t._itemSelectedSubscriber(n),t);n.disabled.subscribeAndRun(t._itemltm,t._itemDisabledSubscriber(n),t)}))},t.prototype._itemSelectedSubscriber=function(n){return function(t){t?this.options.value(n):n===this.options.value()&&this.options.value(null)}},t.prototype._itemDisabledSubscriber=function(n){return function(t){var i;t?(n._tabindex(-1),n===this.options.value()&&this.options.value(null)):(i=n.selected(),i&&n.selected.notifySubscribers(i))}},t.prototype._attachEvents=function(){var n=this;this.ltm.registerForDispose(this.element.setEvents(["click.itemList","li",function(t){var i=u.dataFor(this);n.$disabled()||i.disabled()||i.selected()||(n._clicked(i),t.stopPropagation())}],["focusin.itemList","li",function(){var t,i;n.element.find("[aria-checked=true]").length||(t=n.options.values(),i=u.dataFor(this),t.forEach((function(n){i!==n&&n._tabindex(-1)})))}],["focusout.itemList","li",function(){n.element.find("[aria-checked=true]").length||n._setUnselectedTabIndex()}],["keydown.itemList","li",function(t){var u=a(this),i,r,o=u.parent().find("li"),s=f.getModifierKeys(t),e=!1;if(s===0)switch(t.which){case 13:case 32:u.click();e=!0;break;case 37:case 38:for(i=u.index()-1;i>=0;i--)if(r=o.eq(i),!n._isItemDisabled(r)){r.click().focus();break}e=!0;break;case 39:case 40:for(i=u.index()+1;i<=n.options.values().length;i++)if(r=o.eq(i),!n._isItemDisabled(r)){r.click().focus();break}e=!0}return!e}]))},t.prototype._clicked=function(n){this._set(n)},t.prototype._isItemDisabled=function(n){return n.attr("aria-disabled")==="true"},t.prototype._setUnselectedTabIndex=function(){var n=0,f=this.options.values().length,t=f-1,r=!1,u=!1,i=this.options.values();if(!this.$disabled())for(n=0;n<=t;n++,t--)if(r||i[n].disabled()||(i[n]._tabindex(0),r=!0),u||i[t].disabled()||(i[t]._tabindex(0),u=!0),r&&u)break},t.prototype._unselectItemValue=function(n){n.disabled()||(n.selected(!1),n._tabindex(-1))},t.prototype._ariaSelected=function(n){return n.selected().toString()},t.prototype._ariaLabel=function(n){return(n.ariaLabel()||"").trim()||undefined},t})(s.Widget);n.Widget=l})(h||(h={})),h}))