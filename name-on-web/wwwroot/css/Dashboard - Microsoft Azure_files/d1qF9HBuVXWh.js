define("_generated/Less/MsPortalImpl/Controls/Forms/GroupDropDown.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,'.fxc-dropdown-option-label,.fxc-group-dropdown-arrow{font-family:az_ea_font,"Segoe UI",wf_segoe-ui_bold,"Segoe UI Bold","Segoe WP Bold","Segoe WP",Tahoma,Arial,sans-serif;font-weight:700}.fxc-dd-caret,.fxc-dropdown-popup svg{pointer-events:none}.fxc-dropdown-check,.fxc-dropdown-open.azc-input,.fxc-dropdown-popup{border-width:1px;border-style:solid}.fxc-group-dropdown{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;position:relative;font-size:12px;height:auto;line-height:inherit}.fxc-group-dropdown .azc-formElementContainer{position:relative}.fxc-left-label .fxc-dd-text-wrapper{min-height:23px;position:relative}.fxc-left-label .fxc-dropdown-open.azc-input{position:absolute}.fxc-dropdown-open.azc-input{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:inherit;display:block;padding:2px 20px 3px 8px;width:calc(100% - 30px);min-height:16px}.fxc-dropdown-open.azc-input input{display:none}.fxc-dropdown-option{position:relative;cursor:pointer}.fxc-dd-noresults,.fxc-dropdown-option,.fxc-dropdown-option-label{padding:4px 4px 4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fxc-dd-noresults{font-style:italic;text-align:center;opacity:.7}.fxc-dropdown-option-label{padding-bottom:0}.fxc-dropdown-option-disabled{opacity:.35}.fxc-dropdown-option-disabled,.fxc-dropdown-option-disabled .fxc-dropdown-option{cursor:default}.fxc-group-dropdown .azc-formControl .fxc-dropdown-select{opacity:1;outline:0;padding-left:0}.fxc-group-dropdown .azc-textBox-wrapper input{padding-top:3px;padding-right:20px}.fxc-dropdown-multifilter input{border-top-width:0;border-left-width:0;border-right-width:0}.fxc-dropdown-popup{width:calc(100% - 2px);position:fixed;max-height:750px;z-index:150;overflow:auto;overscroll-behavior-y:contain;-ms-scroll-chaining:none}.fxc-dropdown-hidden{visibility:hidden;left:-10000px;top:-10000px}.fxc-dropdown-open{cursor:pointer}.fxc-dropdown-placeholder{font-style:italic;opacity:.8}.fxc-dropdown-group .fxc-dropdown-option,.fxc-dropdown-group .fxc-dropdown-option-label{padding-left:15px}.fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-option,.fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-option-label{padding-left:30px}.fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-option,.fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-option-label{padding-left:45px}.fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-option,.fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-group .fxc-dropdown-option-label{padding-left:60px}.fxc-dropdown-filter:not(.fxc-dropdown-multiselect) div.azc-input{display:none!important}.fxc-dropdown-filter:not(.fxc-dropdown-multiselect) input::-ms-clear{display:none}.fxc-group-dropdown-arrow{position:absolute;height:calc(100% - 2px);width:27px;right:1px;top:1px;cursor:pointer}.fxc-dd-caret{height:13px;width:13px;position:absolute;top:calc(50% - 6px);right:7px}.fxc-dropdown-check{height:11px;width:11px;min-width:11px;padding:2px;top:calc(50% - 8px);position:absolute}.fxc-dropdown-check .fxc-dd-svg{display:none}.fxc-group-dropdown .fxc-dropdown-keynav{outline:#00bcf2 dashed 1px;outline-offset:-1px}.fxc-dd-svg{height:11px;width:11px;margin-top:-2px}.fxc-dropdown-multiselect .fxs-portal-selected .fxc-dd-svg{display:block}.fxc-dropdown-multiselect .fxc-dropdown-option>span{display:inline-block;padding-left:23px}.fxc-dropdown-selectall-all .fxc-dropdown-selectall .fxc-dropdown-check .fxc-dd-svg{display:block}.fxc-dropdown-selectall{position:relative}.fxc-dropdown-selectall span.azc-bg-muted-80-10{display:none}.fxc-dropdown-selectall-partial .fxc-dropdown-selectall .azc-bg-muted-80-10{width:9px;height:9px;position:absolute;top:8px;left:12px;display:block;padding:0}.fxc-dropdown-selectall-partial .fxc-dropdown-selectall .fxc-dd-svg,.fxc-group-dropdown .azc-dockedballoon-validation{display:none}.fxc-group-dropdown .azc-validatableControl-invalid .fxc-TextField{width:calc(100% - 13px + 1px)}.fxc-group-dropdown .azc-validatableControl-invalid .azc-input.azc-formControl{border-color:red}.fxc-group-dropdown .azc-validatableControl-invalid>.azc-dockedballoon-validation{display:block;width:13px;position:absolute;right:0;top:0;height:100%!important}.fxc-group-dropdown .azc-validatableControl-invalid .azc-dockedballoon-anchor{top:calc(50% - 12px);left:calc(50% - 2px);position:absolute}.fxc-group-dropdown .azc-validatableControl-invalid .fxc-group-dropdown-arrow{right:13px}.fxc-group-dropdown.azc-validationBelowCtrl .azc-validatableControl-invalid .fxc-TextField{width:100%}.fxc-group-dropdown.azc-validationBelowCtrl .azc-validatableControl-invalid .fxc-group-dropdown-arrow{right:1px}.fxc-dropdown-filter .azc-formElementSubLabelContainer.azc-validatableControl-invalid .azc-dockedballoon-validation{margin-right:-13px}')}));
define("MsPortalImpl/Controls/Forms/GroupDropDown",["require","exports","f","i","a","ko","$","MsPortalImpl/Base/Base.BrowserDetection","MsPortalImpl/Base/Base.EventTypes","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Interactions/Interactions.DismissHandler","MsPortalImpl/Base/Base.KeyboardHelper","MsPortalImpl.Controls/Fields/Base/LabelAndBalloonWidget","Viva.Controls/Util/Viva.TemplateEngine","MsPortalImpl.Controls/Fields/TextField","MsPortalImpl/Controls/Helpers/Validators","MsPortalImpl.Controls/Controls/Base/ViewModelBase","MsPortalImpl/Base/Base.BrowserDetection","_generated/Less/MsPortalImpl/Controls/Forms/GroupDropDown.css"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p,w,b){"use strict";var k;return (function(t){function fi(n){return n&&n.length>0&&!n.hasClass(k)}function ei(n){n.parentsUntil("."+d).each((function(){e(this).find("> ."+vt).removeClass(k)}))}function at(n){var t=[];return(f.unwrap(n)||[]).forEach((function(n){if(n.hasOwnProperty("value")&&!f.unwrap(n.disabled)){var i=f.unwrap(n.value);t.includes(i)||t.push(f.unwrap(n.value))}else n.hasOwnProperty("children")&&at(n.children).forEach((function(n){t.push(n)}))})),t}function oi(n,t){var i="";return t.some((function(t){return t.hasOwnProperty("value")&&lt(f.unwrap(t.value),n)?i=f.unwrap(t.selectedItemOverride?t.selectedItemOverride:t.text):t.hasOwnProperty("children")&&(i=oi(n,f.unwrap(t.children))),!!i.length})),i}function si(n){return i.merge.apply([],n)}function hi(n){var t=f.unwrap(n.children);return t?si(t.map(hi)):n}function bt(n){return u.isArray(n)?n:[n]}var ci=i.ViewModels.Forms.TextBox.ViewModel,di=i.ViewModels.Controls,ut=i.isNullOrUndefined,kt=i.Base,ft=kt.Images,dt=window,et="azc-formElementContainer",ot="fxc-dropdown-option-disabled",g="fxc-dropdown-option",nt="fxc-dropdown-keynav",vt="fxc-dropdown-option-label",it="fxc-dropdown-open",gt="fxc-group-dropdown",d="fxc-dropdown-popup",st="fxc-dropdown-hidden",k="fxs-display-none",yt="fxs-portal-border",ni="fxs-br-primary",ht="fxs-portal-selected",ct="msportalfx-tooltip-overflow",rt="azc-input",li="fxc-dropdown-multiselect",ti="fxc-dropdown-check",tt="fxc-dropdown-selectall",ai="fxc-dropdown-selectall-partial",vi="fxc-dropdown-selectall-all",ii="fxc-dropdown-filter",pt="fxc-dropdown-multifilter",ri="<!-- ko if: $data.children || !$data.hasOwnProperty('value') -->"+("<div class='fxc-dropdown-header' data-bind='css: {\""+ot+"\": $data.disabled}'>")+("<div class='"+vt+" "+ct+'\' data-bind="untrustedContent: text"><\/div>')+"<div role=\"tree\" class='fxc-dropdown-group' data-bind='attr: { \"aria-label\": ko.unwrap($data.ariaLabel) || $data.text }'><!-- ko foreach: $data.children --><!-- ko template: 'innerTemplate' --><!-- /ko --><!-- /ko --><\/div><\/div><!-- /ko --><!-- ko if: !$data.children && $data.hasOwnProperty('value') -->"+("<div role='treeitem' class='"+g+" "+ct+'\' data-bind=\'attr: { "aria-selected": (ko.unwrap($data.disabled) ? null : $data._selected().toString()), id: $ctl._assignId(), "aria-disabled": $data.disabled, "aria-label": ko.unwrap($data.ariaLabel) || $data.text }, css: {"'+ot+'": $data.disabled, "fxs-portal-hover": !$data.disabled, "'+ht+"\": $data._selected }'>")+"<!-- ko if: $ctl._multiselect -->"+("<div class='"+ti+" "+yt+"'><span class='fxc-dd-svg fxs-portal-svg' data-bind='image: MsPortalFx.Base.Images.Check()'><\/span><\/div>")+'<!-- /ko --><span class="fxs-portal-svg" data-bind="untrustedContent: text"><\/span><\/div><!-- /ko -->',yi="<div class='"+et+"'><label aria-live='polite' aria-atomic='true' class='fxs-hide-accessible-label' data-bind='text: $ctl._ariaLive'><\/label><div class='fxc-dd-text-wrapper' role='combobox' aria-label='combobox' aria-haspopup='tree' tabindex='-1' data-bind='attr: { id: $ctl._comboboxId, \"aria-expanded\": $data.data.isPopUpOpen().toString(), \"aria-owns\": $ctl._optionContainerId, \"aria-labelledby\": $ctl._labelId() }'><!-- ko ifnot: $ctl._filter() && !$ctl._multiselect() -->"+("<div class='azc-formControl "+rt+" "+it+" "+ct+" azc-validation-border'")+"role='textbox' data-canfocus='true' aria-autocomplete='list' aria-readonly='true' aria-multiline='false'"+("data-bind='untrustedHtml: { html: ( $data.data.loading() ? \""+i.encodeAttribute(h.dropDownLoading)+'" : $ctl._displayString), data: ($data.func ? $data.func._currentItem : $data.data) },')+'css: { "fxs-br-dirty": data.dirty(), "azc-disabled": $disabled()},attr: { id: $ctl._textboxId, tabindex: $tabIndex, "aria-disabled": $disabled(), "aria-controls": $ctl._optionContainerId, "aria-labelledby": $ctl._labelAndComboboxIds() }\'><\/div><!-- /ko --><\/div>'+("<span class='fxc-group-dropdown-arrow "+it+"'><span class='fxc-dd-caret fxs-portal-svg' data-bind='image: $ctl._icon, css: {\"msportalfx-svg-flip-vertical\" : $data.data.isPopUpOpen() && $ctl._icon() !== MsPortalFx.Base.Images.Loading.Spinner()}'><\/span><\/span>")+("<div role='tree' tabindex='-1' aria-hidden='true' aria-label='"+i.encodeAttribute(h.DropDown.optionContainer)+"' data-canfocus='true' class='"+st+" "+d+" "+yt+' azc-bg-default\' data-bind=\'attr: {"id": $ctl._optionContainerId, "aria-multiselectable": $ctl._multiselect() }\'> ')+"<!-- ko if: $ctl._multiselect() && $ctl._filter() -->"+("<div class='"+pt+"'><\/div>")+"<!-- /ko --><!-- ko if: $ctl._multiselect() && $ctl._multiselectSelectAll() && data.items && data.items() && data.items().length -->"+("<div role='treeitem' class='"+g+" "+ct+" "+tt+"' aria-label=\""+i.encodeAttribute(h.dropDownSelectAll)+'" data-bind=\'attr: { id: $ctl._assignId(), "aria-selected": $ctl._allSelected().toString(), "aria-disabled": $data.disabled }\'>')+"<span class='azc-bg-muted-80-10'><\/span>"+("<div class='"+ti+" "+yt+"'><span class='fxc-dd-svg fxs-portal-svg' data-bind='image: MsPortalFx.Base.Images.Check()'><\/span><\/div>")+("<span>"+i.encodeHtml(h.dropDownSelectAll)+"<\/span>")+"<\/div><!-- /ko --><!-- ko if: $ctl._popupOnce --><!-- ko foreach: $ctl._mapItems -->"+(""+ri)+"<!-- /ko --><!-- /ko --><!-- ko if: $ctl._showStatusMessage()--><div role='treeitem' class='fxc-dd-noresults'><span data-bind='untrustedContent: $ctl._statusMessage'><\/span><\/div><!-- /ko --><\/div><\/div>",wt=35,pi=200,ui=750,wi=200,lt=i.deepEquals,bi=kt.Diagnostics.createLog(n),ki=(function(n){function t(t,i,r){var u=n.call(this,t,i,r)||this,e;return u._displayString=f.observable(""),u._isTouch=b.isTouch,u._filterReadonly=f.observable(!1),u._icon=f.observable(ft.CaretDown()),u._pendingTimer=null,u._filter=f.observable(!1),u._filtering=!1,u._doNotFilter=!1,u._showStatusMessage=f.observable(!1),u._statusMessage=f.observable({htmlTemplate:h.Search.noResults}),u._multiselect=f.observable(!1),u._multiselectSelectAll=f.observable(!1),u._allSelected=f.observable(!1),u._labelId=f.observable(""),u._comboboxId=f.observable(""),u._labelAndComboboxIds=f.observable(""),u._optionContainerId=f.observable(""),u._textboxId=f.observable(""),u._filterTextboxId=f.observable(""),u._descendantIndex=0,u._ariaLive=f.observable(""),u._popupOnce=f.observable(!1),u._selectedValue=f.observable(),u._staleVMItems=f.observable(),u._popupGuard=!1,e=u.ltm,u._flattenItemsMap=f.computed(e,u.vm.items,(function(n){return n?si(n.map(hi)):[]})),u._flattenItemsMap.subscribeAndRun(u.ltm,(function(n){n.forEach((function(n){n._selected||(n._selected=f.observable(!1))}))})),u._setTemplate(),u._attachEvents(),u._initializeSubscriptions(),u._mapItems=f.computed(e,(function(){return u.vm.isPopUpOpen()?(u._staleVMItems(null),u.vm.items()):(u._setAttribute("aria-activedescendant",null),u._staleVMItems(u.vm.items()),u._staleVMItems())})),u}return __extends(t,n),t.prototype._setTemplate=function(){var r=this,n,t;this.element.addClass(gt+" msportalfx-form-formelement");n=new a.LabelAndBalloonWidgetHelper(this.ltm,this.vm);this._required=f.computed(this.ltm,(function(){var t=0!==r.vm.validations.filter(r.ltm,(function(n){return 1===n.type}))().length;return t||n.required()}));t=e(yi);n.appendWidgetToDom(this.element,t);n.insertLabelBefore(t);this._labelId(n.labelId);this._textboxId(n.labelId+"textbox");this._filterTextboxId(n.labelId+"filter");this._comboboxId(n.labelId+"combobox");this._optionContainerId(n.labelId+"aria");this._labelAndComboboxIds(this._labelId()+" "+this._comboboxId());this.templateEngine=new v.StringTemplateEngine;this.templateEngine.setTemplate("innerTemplate",ri);this._bindDescendants({},this.element.findByClassName(et));this._validator=new p.Validators(this.ltm,this,this.element.findByClassName(et));n.errMsgId=(n.labelId||i.getUniqueId())+"-err";this._labelElement=this.element.find(".azc-form-labelcontainer > label");this.vm.showValidationMessagesBelowControl?n.insertValidationMessageBelowControlAfter(t,this,this._validator.validationResults):n.insertValidationMessageHidden(t,this,this._validator.validationResults);n.insertSubLabelAfter(t);t.findByClassName(rt).attr("aria-describedby",n.errMsgId);this._validator.validationResults.subscribeAndRun(this.ltm,(function(n){var i=n.filter((function(n){return n.state!==0&&!n.valid})).map((function(n){return n.message})).join(" ").trim();t.findByClassName(rt).attr("aria-errormessage",i||null)}))},t.prototype._initializeSubscriptions=function(){var n=this,t=this.vm,i=this.ltm,r=this.element.find("#"+this._comboboxId()),u=function(i){n._multiselect(i);n.element.toggleClass(li,i);n._filter()?(n._removeFiltering(),n._setupFiltering()):n._updateSelected(t.value())};f.isObservable(t.multiselect)?t.multiselect.subscribeAndRun(i,(function(t){t?u(t):n._multiselect()&&u(t)})):t.multiselect&&u(!0);f.isObservable(t.selectAll)?t.selectAll.subscribeAndRun(i,(function(t){n._multiselectSelectAll(t);n._setSelectAllClass()})):t.selectAll&&(this._multiselectSelectAll(!0),this._setSelectAllClass());f.isObservable(t.filter)?t.filter.subscribeAndRun(i,(function(t){t?n._setupFiltering():n._filter()&&n._removeFiltering()})):t.filter&&this._setupFiltering();t.value.subscribeAndRun(i,(function(t){n._updateSelected(t)}));t.items.subscribe(i,(function(){n._updateSelected(t.value())}));f.isObservable(t.multiItemDisplayText)&&t.multiItemDisplayText.subscribe(i,(function(){n._setDisplayString()}));this.$disabled.subscribe(i,(function(t){t&&n._closeDropdown()}));this.vm.isPopUpOpen.subscribe(i,(function(t){n._popupGuard||(t?n._openDropdown(!0):n._closeDropdown(!0,!0))}));t.ariaLabel&&t.ariaLabel.subscribeAndRun(i,(function(t){var i=r.find("#"+n._textboxId()),u=(t||"").trim();u.length?(r.attr({"aria-labelledby":null,"aria-label":u}),i.attr({"aria-labelledby":null,"aria-label":u})):n.element.find("#"+n._labelId()).length?(r.attr("aria-labelledby",n._labelId()),i.attr("aria-labelledby",n._labelId()+" "+n._comboboxId())):(r.removeAttr("aria-labelledby aria-label"),i.attr("aria-labelledby",n._comboboxId()))}));this._required.subscribeAndRun(i,(function(t){n._setAttribute("aria-required",t)}));t.valid.subscribeAndRun(i,(function(t){n._setAttribute("aria-invalid",!t)}));t.loading.subscribeAndRun(i,(function(t){n.disabled(t);t?(n._closeDropdown(),n._icon(ft.Loading.Spinner())):n._icon(ft.CaretDown())}));this._validator.validationState.subscribe(this.ltm,(function(t){t===3?n._pendingTimer=dt.setTimeout((function(){n._icon(ft.Loading.Spinner())}),wi):(n._pendingTimer&&clearTimeout(n._pendingTimer),n._pendingTimer=null,n._icon(ft.CaretDown()))}));this.vm.statusMessage&&this.vm.statusMessage.subscribeAndRun(this.ltm,(function(t){ut(t)?n._statusMessage({htmlTemplate:h.Search.noResults}):n._statusMessage(t)}));this.vm.showStatusMessage&&this.vm.showStatusMessage.subscribeAndRun(this.ltm,(function(t){ut(t)?n._showStatusMessage(!1):n._showStatusMessage(t)}))},t.prototype._attachEvents=function(){var n=this,t,r=function(){n.vm.isPopUpOpen()?n._closeDropdown():n._openDropdown()},u=function(t){var u=n.vm,s,o,h,r,c;if(t.hasClass(tt))if(u.selectAllOverride)u.selectAllOverride();else{var l=u._msPortalFxWidgetValue,a=l(),v=at(u.items());a&&a.length===v.length?l([]):l(v)}else s=t.hasClass(ot),t.parentsUntil("."+d).each((function(){if(e(this).hasClass(ot)){s=!0;return}})),s||(o=f.unwrap(f.dataFor(t[0]).value),n._multiselect()?(h=u._msPortalFxWidgetValue(),r=[],ut(h)||(r=bt(h)),c=void 0,r&&r.length?i.isUndefined(c=i.find(r,(function(n){return i.deepEquals(n,o)})))?r.push(o):r.remove(c):r=[o],u._msPortalFxWidgetValue(r)):u._msPortalFxWidgetValue(o),n._multiselect()||(n._closeDropdown(!0),n.element.find(".fxc-dd-text-wrapper > ."+rt).focus()));n.element.trigger("fxvaluechanged")},o=function(t){var i=n.element.findByClassName(d).find("."+g+":not(."+tt+"):not(."+k+"):not(."+ot+")");(i.length===1||t&&!!i.length)&&u(e(i[0]))};this._labelElement.on("click",(function(t){e(t.target).is("a")||(t.stopPropagation(),r(),n.vm.isPopUpOpen()&&n.element.find("input").focus())}));this.ltm.registerForDispose([this.element.setEvents([s.default.touchstart,function(){n._isTouch||n._filterReadonly(!0);n._isTouch=!0},],[s.default.click,function(n){n.stopPropagation()},],[s.default.mousedown,function(n){n.stopPropagation();e(n.target).closest(".fxc-group-dropdown-arrow").length>0&&n.preventDefault()},],[s.default.mouseup,function(n){n.stopPropagation();e(n.target).closest("."+it).length>0&&(n.preventDefault(),r())},],[s.default.keydown,function(i){(i.which===38&&n.vm.isPopUpOpen()||i.which===40||i.which===18)&&(i.preventDefault(),i.stopPropagation());(i.which===13||i.which===32)&&(t=n.element.findByClassName(nt),n._filter()||e(i.target).is("a")||i.preventDefault());i.which===9&&n._filtering&&o()},],[s.default.keyup,function(i){var f=n.element.find("."+nt+":not(."+k+")"),s,h;f.length||(f=e(n.element.findByClassName(ht)[0]));switch(i.which){case 13:case 32:t&&t.length&&!t.hasClass(k)?u(t):i.which===13&&n.vm.isPopUpOpen()&&n._filtering?o(!0):e(i.target).hasClass(it)&&(n._multiselect()||r());break;case 40:s=n.element.find("."+g+":not(."+k+")").first();n._handleArrowKey(i,!0,s,f);break;case 38:h=n.element.find("."+g+":not(."+k+")").last();n._handleArrowKey(i,!1,h,f)}}]),this.element.findByClassName(d).setEvents([s.default.mouseup,function(t){t.stopPropagation();n.element.findByClassName(nt).removeClass(nt);var i=e(t.target).closest("."+g);fi(i)&&u(i)}]),e(window).setEvents(["resize."+d,function(){n._closeDropdown()},]),])},t.prototype._setAttribute=function(n,t){var r=this.element.find(this._filter()&&!this._multiselect()?".fxc-TextField input":"."+rt+"."+it);i.isNull(t)?r.removeAttr(n):r.attr(n,t);this._multiselect()&&this._filter()&&(r=this.element.find(".fxc-TextField input"),i.isNull(t)?r.removeAttr(n):r.attr(n,t))},t.prototype._updateSelected=function(n){this._selectedValue(n);var i=this._multiselect(),r=bt(n),t=null;this._flattenItemsMap().forEach((function(n){var u=r.some((function(t){return n.hasOwnProperty("value")&&lt(t,f.unwrap(n.value))}));n._selected(u);!i&&t===null&&u&&(t=n)}));this.vm.suppressSelectedUpdate()?this._currentItem=t:this._setDisplayString(t);this._multiselectSelectAll()&&this._setSelectAllClass()},t.prototype._setSelectAllClass=function(){var n;if(this._multiselectSelectAll()){var t=this.vm.value(),r=at(this.vm.items()),i=t&&t.length;this._allSelected(i===r.length);n=this._allSelected();this.element.findByClassName(tt).toggleClass(ht,n);this.element.toggleClass(vi,n);this.element.toggleClass(ai,!n&&!!i)}},t.prototype._setupFiltering=function(){var r=this,o,p,b;this.element.addClass(ii);this._filter(!0);var n=this.vm,u=this.ltm,k=!f.isObservable(n.filterPlaceholder)&&n.filterPlaceholder===""?n.placeholder:n.filterPlaceholder,t=this._textBoxViewModel=new ci(u,{emptyValueText:i.initObservable(k),valueUpdateTrigger:4,readonly:this._filterReadonly}),c=e("<div/>");this.element.find(this._multiselect()?"."+pt:"#"+this._comboboxId()).prepend(c);this._textBoxWidget=new y.Widget(c,t);c.find(".azc-text-label").removeAttr("aria-hidden");n.customFilter&&t.value.extend({rateLimit:{timeout:pi,method:"notifyWhenChangesStop"}});var w=function(t){n.isPopUpOpen()&&!r._doNotFilter&&r._filterResults(t)},v=t.value()||"",a=h.dropDownLoading;this._multiselect()||n.loading.subscribeAndRun(u,(function(n){if(n){var i=t.value();a!==i&&(v=i);t.value(a)}else t.value(v)}));t.value.subscribe(u,(function(i){if(a!==i&&(v=i,n.loading())){t.value(a);return}n.filterString()!==i&&(n.filterString(i),w(i))}));n.filterString.subscribe(u,(function(n){t.value()!==n&&(t.value(n),w(n))}));this._multiselect()||(t.valid=n.valid);o=this._textBoxDisabledLifetime;o&&o.dispose();o=this._textBoxDisabledLifetime=u.createChildLifetime();this.$disabled.subscribeAndRun(o,t.disabled);p=c.find("input");b=[27,9,16,40,38,18,112,13];p.on(s.default.mouseup,(function(){r.vm.isPopUpOpen()||r._openDropdown()})).on(s.default.keyup,(function(n){if(r.vm.isPopUpOpen()||~b.indexOf(n.which)||l.getModifierKeys(n)!==0?n.which===32?n.stopPropagation():n.which===13&&r._openDropdown():(r._openDropdown(),r._filterResults(r._textBoxViewModel.value())),n.which===112){var t=e.Event("keydown");t.which=112;r.element.trigger(t)}}));p.attr({id:this._multiselect()?this._filterTextboxId():this._textboxId(),role:"textbox","aria-readonly":!1,"aria-controls":this._optionContainerId(),autocomplete:"off","aria-required":this._required(),"aria-invalid":!n.valid(),"aria-label":h.DropDown.filterTextbox,"aria-labelledby":null,"aria-autocomplete":"list"});this._updateSelected(n.value())},t.prototype._filterResults=function(n){var i=this,u=this.element.findByClassName(d),t=0,o=u.find("."+g+":not(."+tt+")"),l=u.findByClassName(vt),s=this.vm,a=this.element.findByClassName(tt),c,v;this._filtering=!0;c=function(){var n=i.vm.showStatusMessage;(!n||ut(n()))&&i._showStatusMessage(t===0)};s.customFilter?(v=s.items(),s.customFilter(n).then((function(s){var y,p;a.toggleClass(k,!!n.length);lt(v,i.vm.items())?(l.each((function(){e(this).addClass(k)})),o.each((function(){var i=this,n=e(this),t=s&&!s.some((function(n){return lt(n,f.unwrap(f.dataFor(i).value))}));t&&ei(n);n.toggleClass(k,t)})),y=u.find("."+g+"."+k+":not(."+tt+")"),t=o.length-y.length):(s&&s.length>0&&(p=r.createError("DropDown customFilter",{data:{message:"The dropdown is unable to replace items and filter. Please use one or the other to avoid erroneous behavior."}}),bi.warning(p)),t=u.find("."+g+":not(."+tt+")").length);c(t===0);i._ariaLive(h.DropDown.filterResult.format(t,n))}))):(ut(n)||(a.toggleClass(k,!!n.length),l.each((function(){e(this).toggleClass(k,n.length>0)})),o.each((function(){var i=e(this),r=i.text().toLocaleLowerCase().indexOf(n.toLocaleLowerCase())===-1;r||(t++,ei(i));i.toggleClass(k,r)}))),c(t===0),this._ariaLive(h.DropDown.filterResult.format(t,n)))},t.prototype._removeFiltering=function(){this.element.removeClass(ii);this._filter(!1);this._textBoxDisabledLifetime&&(this._textBoxDisabledLifetime.dispose(),this._textBoxDisabledLifetime=null);this._textBoxViewModel=null;this._textBoxWidget.element.remove();this._textBoxWidget=null;this.element.find("."+rt+"."+it).attr({"aria-required":this._required(),"aria-invalid":!this.vm.valid()})},t.prototype.dispose=function(){this._checkExistsOrRegisterDestroyId(n.prototype.dispose)||(n.prototype.dispose.call(this),this._filter()&&this._removeFiltering(),this._cleanElement(gt,"msportalfx-form-formelement"))},t.prototype._handleArrowKey=function(n,t,i,r){n.preventDefault();var u=this.vm.isPopUpOpen();u?t&&n.altKey?this._closeDropdown():r.length===0?i.length>0?this._moveSelectedFromKeyboard(i):this._findNextValidItem(i,t):this._findNextValidItem(r,t):this._openDropdown()},t.prototype._findNextValidItem=function(n,t){var i=this.element.findByClassName(d).find("."+g+":not(."+k+")"),u,r;i.length&&(u=i.toArray().indexOf(n[0]),r=void 0,t?i.length>u&&(r=e(i[u+1])):r=u>0?e(i[u-1]):e(i[i.toArray().length-1]),fi(r)?this._moveSelectedFromKeyboard(r):this._findNextValidItem(r,t))},t.prototype._moveSelectedFromKeyboard=function(n){if(n&&n.length>0){this.element.findByClassName(nt).removeClass(nt);n.addClass(nt);this._setAttribute("aria-activedescendant",n.attr("id"));var i=n.outerHeight(),r=this.element.findByClassName(d),t=n.position().top,u=r.height(),f=u<t+i;(f||t<0)&&(r[0].scrollTop+=t+(f&&i-u))}},t.prototype._assignId=function(){var n=this._optionContainerId()+this._descendantIndex;return this._descendantIndex++,n},t.prototype._setDisplayString=function(n){var r,u,o,s;if(n===void 0&&(n=null),this._currentItem=n,r=f.unwrap(this.vm.placeholder),u=r,n&&(u=n.selectedItemOverride?n.selectedItemOverride:n.text),this._multiselect()){var c=f.unwrap(this.vm.multiItemDisplayText),a=this.vm.value(),v=bt(a),l=this.vm.items&&this.vm.items()||[],y=at(l),t=v.filter((function(n){return y.indexOf(n)>-1}));c?this._displayString(c.format(t.length)):t.length===1?this._displayString(oi(t[0],l)):this._displayString(h.dropDownXSelected.format(t.length));this._ariaLive(this._displayString())}else o=f.unwrap(u),this._displayString(o),this._filter()?(this._doNotFilter=!0,n?(s=e(e.parseHTML(o)).text(),this._textBoxWidget.element.find("input").val(s),this._textBoxViewModel.value(s)):this._textBoxViewModel.value(""),this._doNotFilter=!1):r.length>0&&this.element.find("."+it+".azc-formControl").toggleClass("fxc-dropdown-placeholder",i.isNullOrUndefined(n))},t.prototype._resetPopUpUIForEdge=function(n,t){o.isEdge||o.isIe11?(n.css("opacity",0),dt.setTimeout((function(){n.toggleClass(st,t).css("opacity",1)}),50)):t&&n.addClass(st)},t.prototype._openDropdown=function(n){var l=this,u,rt,y,f,h,k,ot;if(n===void 0&&(n=!1),!this.$disabled()&&(!this.vm.isPopUpOpen()||n)){this._popupGuard=!0;this._popupOnce(!0);n||this.vm.isPopUpOpen(!0);this.element.findByClassName(et).addClass(ni);var t=e(this.element.findByClassName(et)[0]).width()-2,i=this.element.findByClassName(d).removeClass(st).css({"max-height":"",width:t}).removeAttr("aria-hidden"),ct=e(document).findByClassName("fxs-sidebar-bar").width(),g=this.element.find("#"+this._comboboxId()),r=g.offset(),nt=r.left,a=e(window).width()-r.left-i.outerWidth(),tt="right",it=a,v=nt-ct;a>v&&(tt="left",it=nt,v=a);u=0;rt=i.find("[role='treeitem']");rt.each((function(){this.scrollWidth>u&&(u=this.scrollWidth)}));y=t+v-wt;u>t&&(t=u+20,t>y&&(t=y));var p="top",ut=e(window).height(),w=r.top+g.height()-e(window).scrollTop(),ft=w-wt-e(document).findByClassName("fxs-topbar").height(),b=ut-r.top-this.element.height()-wt,o=b,s={};i.height()>b&&ft>b&&(p="bottom",o=ft,w=ut-r.top);this._syncFilterPosition("bottom"===p);o>ui&&(o=ui);s[p]=w;s[tt]=it;e.extend(s,{"max-height":o,width:t});i.css(s);f=this.element.findByClassName(ht);f.length&&(f.position().top>i.height()&&(this.element.findByClassName(d)[0].scrollTop=f.position().top),this._setAttribute("aria-activedescendant",f.attr("id")));this._filter()&&(this._isTouch?(this.element.find("input").blur(),this._filterReadonly(!1)):this._multiselect()&&this.element.find("input").focus());h=function(n){return!(l.element.findByClassName("azc-formElementContainer")[0]===n)&&!e.contains(l.element.findByClassName("azc-formElementContainer")[0],n)?2:0};k={dismissFn:function(){l._closeDropdown()},shouldDismissOnFocusOutFn:h,shouldDismissOnMouseDownFn:h,shouldDismissOnMouseWheelFn:h,shouldDismissOnScroll:!this._isTouch,logName:"dropdown"};this._dismissHandleLifetime||(c.register(k,!0),ot=this._dismissHandleLifetime=this.ltm.createChildLifetime(),ot.registerForDispose((function(){c.unregister(k)})));this._resetPopUpUIForEdge(i,!1);this._popupGuard=!1}},t.prototype._closeDropdown=function(n,t){var r=this,i;(t===void 0&&(t=!1),this.vm.isPopUpOpen()||t)&&(this._popupGuard=!0,this._filtering=!1,this.vm.showStatusMessage&&ut(this.vm.showStatusMessage())&&this._showStatusMessage(!1),[ni,nt,k].forEach((function(n){r.element.findByClassName(n).removeClass(n)})),i=this.element.findByClassName(d),i[0].scrollTop=0,i.css({top:"",bottom:"",left:"",right:""}).attr("aria-hidden","true"),this._resetPopUpUIForEdge(i,!0),this._setAttribute("aria-activedescendant",null),t||this.vm.isPopUpOpen(!1),this._filter()&&(this._isTouch&&this._filterReadonly(!0),this._multiselect()?(this._textBoxWidget.element.find("input").val(""),this._textBoxViewModel.value(""),this.element.find("div."+rt+"[role='textbox']").focus()):n||this._setDisplayString(this._currentItem)),this._dismissHandleLifetime&&(this._dismissHandleLifetime.dispose(),this._dismissHandleLifetime=null),this._popupGuard=!1)},t.prototype._syncFilterPosition=function(n){var t,i;this._multiselect()&&(t=this.element.find("."+pt),t[0])&&(i=t.parent(),i.hasClass(d))&&(n?i.append(t):i.prepend(t))},t})(w.Widget);t.Widget=ki})(k||(k={})),k}))