define("_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxc-actionBarBase .fxc-actionBarBase-button{position:relative;min-width:90px;margin:0 4px 0 0}")}));
define("MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase",["require","exports","f","i","o","ko","MsPortalImpl.Controls/Controls/Base/Loadable","MsPortalImpl.Controls/Fields/Base/FormValidation","MsPortalImpl/Base/Base.EventTypes","MsPortalImpl/Parts/Parts","MsPortalImpl/Base/Base.Timers","_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase.css"],(function(n,t,i,r,u,f,e,o,s,h,c){"use strict";var l;return (function(t){function rt(n,t,i){a[n]&&k.alreadyRegistered(n);a[n]={createWidget:function(n,i){return new t(n,i)},createViewModel:function(n){return new i(n)}}}function ut(n,t,i){return a[n].createWidget(t,i)}function ft(n,t){return a[t].createViewModel(n)}function d(n){return!!~i.findIndex(n,(function(n){return n.outerHTML&&!!~n.outerHTML.indexOf(tt)}))}var nt=i.Base,y=window,a=[],p="fxc-actionBarBase",tt="azc-validatableControl",w=i.isNullOrUndefined,v=!!i.trace.actionbar,l=nt.Diagnostics.createLog(n),b="",it={alreadyRegistered:b,alreadySet:b},k=r.getErrorMap(it),g;t.registerFactory=rt;t.createWidget=ut;t.createViewModel=ft;g=(function(n){function t(t,i,r){var u=n.call(this,t,i,r)||this;return u._actionInProgress=f.observable(!1),u._options=i,u.element.addClass(p),u}return __extends(t,n),t.prototype.dispose=function(){this._clearValidation();this.element.removeClass(p);n.prototype.dispose.call(this)},t.prototype.setValidationTarget=function(n){var r=this,u,t;this._validationTarget=n;$(this).trigger(s.default.fxactionbarvalidationtargetupdated);n[0].addEventListener(s.default.fxreadyforfocus,(function(){$(r).trigger(s.default.fxactionbarvalidationtargetupdated)}),!0);f.unwrap(this.options.actionButtonUri)&&(u=c.debounce(this.ltm,(function(){$(r).trigger(s.default.fxactionbarvalidationtargetmutated)}),100),t=new MutationObserver(function(n){~i.findIndex(n,(function(n){return d(n.addedNodes)||d(n.removedNodes)}))&&u()}),t.observe(n[0],{childList:!0,subtree:!0}),this.ltm.registerForDispose((function(){t.disconnect()})))},t.prototype.setIsStatusChangeAllowedCallback=function(n){this._isStatusChangeAllowed&&k.alreadySet();this._isStatusChangeAllowed=n},u.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._onValidChanged=function(n,t){var i=this;this._clearValidation();this._validChangedHandle=y.setTimeout((function(){var r,u,f;t&&(r=n&&i._actionInProgress(),v&&(u=void 0,u=n?r?"Actionbar's valid observable is set to true by extension but button will be disabled because there is an action in progress.":"Enabling button because actionbar's valid observable is set to true by extension.":"Disabling button because actionbar's valid observable is set to false by extension.",l.verbose(u)),t.disabled(!n||r));n?i._previousStatus!==3&&(f=1):f=2;i._setOutput(i._createOutput(i.options.input(),f,0))}),100)},t.prototype._validateForm=function(n,t){var i=this,r;if(this._clearValidation(),!this._validationTarget)return Q(!0);var u=o.gatherFormFields(this._validationTarget),e=u.map((function(n){return n.viewmodel})),s=u.map((function(n){return n.field}));return o.gridEnableValidation(e),r=o.performFieldValidation(s),n&&(n.disabled(!0),r.then((function(r){var o=i._actionInProgress(),u=o||!r;v&&l.verbose((r?"Validations succeeded. ":"Validation failed. ")+(o?"Another action in progress. ":"No action in progress. ")+(u?"Button is disabled.":"Button is enabled.")+(!u&&t?" But suppressButtonEnable is true.":""));u&&(i._listenForValidationsFixed=f.pureComputed((function(){return!e.some((function(n){return n.valid()===!1}))})),i._validationListenerLifetime=i.ltm.createChildLifetime(),i._listenForValidationsFixed.subscribe(i._validationListenerLifetime,(function(t){t&&(i._validationsFixed(n),i._validationListenerLifetime.dispose(),i._validationListenerLifetime=null)})));(u||!t)&&n.disabled(u);h.runFocusOnFirstInvalid(i.element.closest(".fxs-bladecontent").findByClassName("fxs-part-content"))}),(function(){var t=i._actionInProgress(),r=i.options.valid();v&&(t?l.verbose("Error getting validation results. Button will remain disabled because another action is in progress."):r?l.verbose("Error getting validation results. Enabling action bar button."):l.verbose("Error getting validation results. Button will remain disabled because actionbar's 'valid' property is set to false"));n.disabled(t||!r)}))),r},t.prototype._validationsFixed=function(n){n.disabled(!1)},t.prototype._createOutput=function(n,t,r){return w(r)&&(r=n.isLastStep?4:2),w(t)&&(t=3),{stepId:n&&n.stepId,status:t,action:r,commitId:i.getUniqueId()}},t.prototype._setOutput=function(n){var t=n.status;return this._isStatusChangeAllowed&&!this._isStatusChangeAllowed(t)?!1:(this._previousStatus=t,this.options.output(n),!0)},t.prototype._clearValidation=function(){this._validationListenerLifetime&&(this._validationListenerLifetime.dispose(),this._validationListenerLifetime=null);this._validChangedHandle&&(y.clearTimeout(this._validChangedHandle),this._validChangedHandle=null)},t})(e.Widget);t.Widget=g})(l||(l={})),l}));
define("MsPortalImpl/Controls/ActionBars/Controls.ErrorInfoBoxActionBar",["require","exports","f","o","ko","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl.Controls/Fields/Base/FormValidation"],(function(n,t,i,r,u,f,e,o){"use strict";var s;return (function(t){var v=i.Base,k=v.Diagnostics,y=i.Errors,h=v.Images.StatusBadge.Outline,a=i.ViewModels,nt=a.ActionBars,p=a.Controls,d=p.SimpleButton.ViewModel,w=p.InfoBox,l=!!i.trace.actionbar,c=k.createLog(n),s=e.ErrorInfoBoxActionBar,g=i.getEnvironmentValue("links").phoneSupport||"http://aka.ms/azurephonesupport",b;t.ErrorBoxTemplate="<!-- ko if: ko.unwrap(data.enableErrorInfoBox) && $ctl._enableErrorInfoBox() --><div data-bind='pcInfoBox: $ctl._errorInfoBox'><\/div><!-- /ko -->";b=(function(n){function t(t,i,r){var f=n.call(this,t,i,r)||this;return f._errorInfoBox=new w.ViewModel(f.ltm,!1),f._errorInfoBox.image(h.Error()),f._errorInfoBox.text(s.errorInfoBoxText),i.infoBoxSelectable&&(f._errorInfoBox.selectable=i.infoBoxSelectable),f._enableErrorInfoBox=u.observable(!1),f._actionButton=new d(f.ltm),f._actionButton.primary(!0),f.options._msPortalFxClearGroupValidationMessage((function(){f.hideInfoBox(3)})),f}return __extends(t,n),t.prototype._initializeWidgets=function(){var t=this,n,i=this.ltm;this.options.valid.subscribe(this.ltm,(function(r){if(n&&n.dispose(),r)t._actionInProgress()||t.hideInfoBox(2);else{var f=o.gatherFormFields(t._validationTarget).filter((function(n){return n.widgetviewmodel}));n=i.createChildLifetime();u.computed(n,(function(){f.some((function(n){var t=u.unwrap(n.widgetviewmodel.validationState);return t===3}))||n&&!n.isDisposed()&&(t.showInfoBox(2,s.errorInfoBoxText),n.dispose())}))}}))},t.prototype._toggleEnableInfoBox=function(n,t,i,r){if(t===2&&(this._fieldsValidSubscriptionError=n?i:null),!this._asyncValidationErrorShown||t!==2){this._enableErrorInfoBox(n);this._errorInfoBox.text(i);var u=this._errorInfoBox.selectable;u&&u.selectedValue(r);t===1&&(this._asyncValidationErrorShown=n)}},t.prototype._validationsFixed=function(t){n.prototype._validationsFixed.call(this,t);this._enableErrorInfoBox(!1)},t.prototype._validateForm=function(t){var i=this.options.groupValidation;return t&&(i&&typeof i.validate=="function"||this.options.asyncValidations.length)?(t.disabled(!0),n.prototype._validateForm.call(this,t,!0)):n.prototype._validateForm.call(this,t)},t.prototype.showInfoBox=function(n,t,i){this._toggleEnableInfoBox(!0,n,t,i)},t.prototype.hideInfoBox=function(n){n!==3?this._toggleEnableInfoBox(!1,n):this._asyncValidationErrorShown&&(this._asyncValidationErrorShown=!1,this._toggleEnableInfoBox(!!this._fieldsValidSubscriptionError,n,this._fieldsValidSubscriptionError))},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._setStepResult=function(n,t,r,f){var e=this,o;if(t===void 0&&(t=!0),r===void 0&&(r=0),n){var p=this.options.groupValidation,b=this.options.asyncValidations,k=p||b.length;if(f&&k&&l&&c.warning("Properties actionButtonUri and groupValidations or asyncValidations are incompatible; please use one or the other."),!f&&k){o=this.ltm;l&&c.verbose("Actionbar is setting actionInProgress to true while running actionbar group validation methods.");this._actionInProgress(!0);this.hideInfoBox(1);this._actionButton.loading(!0);var tt=b.concat(p||[]),d=tt.reduce((function(n,t){return t.delayExecution?n.executeLast.push(t):n.executeFirst.push(t),n}),{executeFirst:[],executeLast:[]}),it=d.executeFirst,rt=d.executeLast,v,nt=null;i.Base.Promises.cancelOnDispose(o,(function(){return Q.all(it.map((function(n){return n.validate(r)}))).then((function(n){return n.some((function(n){return!n.valid}))?n:Q.all(rt.map((function(n){return n.validate(r)}))).then((function(t){return n.concat(t)}))}))})).then((function(n){var r=i.find(n,(function(n){return!n.valid}));r?(l&&c.verbose("Actionbar group validations failed. Disabling button."),v=r.message,e._errorInfoBox.image(h.Error()),e._actionButton.disabled(!1),nt=r.blade):(l&&c.verbose("Actionbar group validations passed."),v=s.validationSuccessful,e._errorInfoBox.image(h.Success()),t&&e._setOutputAfterStepResult(!0));e._actionInProgress(!1)})).catch((function(n){y.isInstanceOfErrorType(n,y.CanceledError)||c.error(n);e._errorInfoBox=new w.LinkViewModel(o,{clickableLink:u.observable(new a.ClickableLink(u.observable(g))),image:u.observable(h.Error()),text:u.pureComputed({read:i.wrap(s.validationRejectedInfoBoxText),write:i.noop}),size:u.observable(1)})})).finally((function(){e._actionButton.loading(!1);e.showInfoBox(1,v,nt)}))}else t&&this._setOutputAfterStepResult(!0)}else this._errorInfoBox.text(s.errorInfoBoxText),this._errorInfoBox.image(h.Error()),this.showInfoBox(0,s.errorInfoBoxText)},t.prototype._setOutputAfterStepResult=function(){throw new Error("Not Implemented");},t})(f.Widget);t.Widget=b})(s||(s={})),s}));
define("_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.CreateActionBar.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxc-createActionBar{font-size:12px}.fxc-createActionBar .fxc-infoBox{margin-top:0}.fxc-createActionBar-checkbox-outer{margin-bottom:20px}.fxc-createActionBar-checkbox{display:block;margin:0 6px 0 2px}.fxs-createActionBar-dropDown{margin-bottom:20px;min-width:215px;max-width:50%}.fxc-createActionBar-eula{padding:10px 0 0 2px}.fxc-createActionBar-secondaryLink{margin-left:15px}.fxc-createActionBar-okButton{position:relative}.fxc-createActionBar-externalLink{height:10px;width:10px;position:absolute;display:inline-block;margin:5px 0 0 -30px}.fxc-createActionBar-secondaryLink-bottombanner{margin-bottom:25px}.fxc-createActionBar-secondaryLink-bottombanner .fxc-createActionBar-secondaryLink{position:absolute;bottom:0;left:0;right:0;height:25px;line-height:25px;padding:0 25px}")}));
define("MsPortalImpl/Controls/ActionBars/Controls.CreateActionBar",["require","exports","f","o","ko","$","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Controls/ActionBars/Controls.ErrorInfoBoxActionBar","MsPortalImpl/Base/Base.EventTypes","MsPortalImpl/Base/Base.SvgHelper","MsPortalImpl/Svg/Startup/Hyperlink.svg","_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.CreateActionBar.css"],(function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";var a;return (function(t){var p=i.Base,w=i.ViewModels.ActionBars.CreateActionBar,b=!!i.trace.actionbar,k=p.Diagnostics.createLog(n),f=e.ActionBarButtons,a="fxc-createActionBar",v="fxc-createActionBar-secondaryLink",d="fxc-createActionBar-secondaryLink-bottombanner",g="<!-- ko if: data.showActionBar -->{0}<!-- ko if: data.dropDown && data.dropDown() --><div class='fxs-createActionBar-dropDown' data-bind='pcControl: data.dropDown'><\/div><!-- /ko --><div class='fxc-actionbar-buttonwrapper' tabindex='-1'><div class='fxc-actionBarBase-button fxc-createActionBar-okButton' data-bind='pcControl: $ctl._actionButton'><\/div><div class='fxc-createActionBar-externalLink' data-bind='visible: $ctl._showExternalLinkAdornment'>"+c.getSvgReferenceOrFallBackToData(l).outerHTML+"<\/div><\/div>"+("<a class='"+v+"' data-bind='visible: $ctl._showSecondaryLink, text: data.secondaryLinkDisplayText, click: $ctl._secondaryLinkClickHandler' href=\"#\"><\/a>")+"<div class='fxc-createActionBar-eula' data-bind='visible: $.trim(data.eula()), sanitizedHtml: data.eula'><\/div><!-- /ko -->",y=(function(n){function t(t,i,r){var f=n.call(this,t,i,r)||this;return f._showSecondaryLink=u.observable(!1),f._initializeWidgets(),f}return __extends(t,n),t.prototype.dispose=function(){this._cleanElement(a);n.prototype.dispose.call(this)},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._initializeWidgets=function(){var n=this,t=this.options,r=this.ltm;this.element.addClass(a).html(g.format(s.ErrorBoxTemplate));this._secondaryLinkClickHandler=function(){Q(n.options.secondaryLinkTriggerValidation()?n._validateFormFields(!1,1):!0).then((function(t){t&&(n.element.trigger(h.default.fxactionbarclick,"createActionBar-secondaryLink"),n._setOutput({status:0,action:0,commitId:i.getUniqueId(),secondaryLinkClicked:n.options.secondaryLinkDisplayText()}))}))};t.triggerSelectAction.subscribe(r,(function(){n._okButtonClickHandler()}));this._actionButton.onClick=function(){n._okButtonClickHandler()};this._showExternalLinkAdornment=u.computed(r,(function(){return!!(t.actionButtonUri&&t.actionButtonUri())}));u.computed(r,(function(){var i;i=t.actionButtonLabel()===1?f.purchase:t.isProvisioningBlade()?f.create:f.ok;n._actionButton.text(i)}));t.provisionOnStartboardPart(!0);u.computed(r,(function(){n._showSecondaryLink(!!t.secondaryLinkDisplayText())}));u.computed(r,(function(){var i=!!t.secondaryLinkStyle();n.element.toggleClass(d,i);n.element.findByClassName(v).toggleClass("fxs-bg-primary-10",i)}));u.computed(r,(function(){t.eula()}));t.actionInProgress.subscribe(r,(function(t){b&&k.verbose("CreateActionBar.actionInProgress(true) by extension");n._actionInProgress(t)}));t.valid.subscribe(r,(function(t){if(t){var i=function(){n._actionInProgress()||(n._actionButton.disabled(!1),n.hideInfoBox(2))};n._validationPromise?n._validationPromise.then((function(n){return n?i():null})):i()}n._onValidChanged(t,null)}));t.disablePrimaryButton.subscribeAndRun(r,this._actionButton.disabled);this._bindDescendants()},t.prototype._okButtonClickHandler=function(){this.element.trigger(h.default.fxactionbarclick,"createActionBar-okButton");var n=this.options.actionButtonUri();if(n){window.open(n,"_blank");return}this._actionButton.disabled(!0);this._validateFormFields(!0,0)},t.prototype._validateFormFields=function(n,t){var r=this,i;return this._validationTarget?(this._validationPromise=this._validateForm(null),this._validationPromise.then((function(i){return r._validationPromise=null,r._setStepResult(i,n,t),i}))):(i=this.options.valid()!==!1,this._setStepResult(i,n,t),Q(i))},t.prototype._setOutputAfterStepResult=function(n){var t=this._createOutput(this.options.input(),n?this.options.forceInProgressStatus()?1:null:2);this._setOutput(t)},t})(s.Widget);t.Widget=y;o.registerFactory(1,y,w.ViewModel)})(a||(a={})),a}));
define("MsPortalImpl/Controls/ActionBars/Controls.DeleteActionBar",["require","exports","f","o","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Base/Base.EventTypes"],(function(n,t,i,r,u,f,e){"use strict";var o;return (function(n){var t=i.ViewModels,c=t.ActionBars,o=t.Controls.SimpleButton.ViewModel,s="fxc-deleteActionBar",l="<div class='fxc-actionBarBase-button fxc-deleteActionBar-deleteButton' data-bind='pcControl: $ctl._deleteButton'><\/div><div class='fxc-actionBarBase-button fxc-deleteActionBar-cancelButton' data-bind='pcControl: $ctl._cancelButton'><\/div>",h=(function(n){function t(t,i,r){var u=n.call(this,t,i,r)||this;return u._initializeWidgets(),u}return __extends(t,n),t.prototype.dispose=function(){this._cleanElement(s);n.prototype.dispose.call(this)},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._initializeWidgets=function(){var n=this,t,r;this.element.addClass(s).html(l);this._deleteButton=new o(this.ltm,{text:f.ActionBarButtons.deleteButton,primary:!0,onClick:function(){n.element.trigger(e.default.fxactionbarclick,"deleteActionBar-deleteButton");n._validateForm(n._deleteButton).then((function(t){t&&n.options.deleteButtonClick()}))}});this._cancelButton=new o(this.ltm,{text:f.ActionBarButtons.cancelButton,onClick:function(){n.element.trigger(e.default.fxactionbarclick,"deleteActionBar-cancelButton");n.options.cancelButtonClick()}});t=this.options.valid;r=t.subscribe(this.ltm,(function(t){n._onValidChanged(t,n._deleteButton)}));i.isNullOrUndefined(t())||r.callback(t());this._bindDescendants()},t})(u.Widget);n.Widget=h;u.registerFactory(5,h,c.DeleteActionBar.ViewModel)})(o||(o={})),o}));
define("MsPortalImpl/Controls/ActionBars/Controls.FilterActionBar",["require","exports","f","o","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Base/Base.EventTypes"],(function(n,t,i,r,u,f,e){"use strict";var o;return (function(n){var t=i.ViewModels,c=t.ActionBars,o=t.Controls.SimpleButton.ViewModel,s="fxc-filterActionBar",l="<div class='fxc-actionBarBase-button fxc-filterActionBar-updateButton' data-bind='pcControl: $ctl._updateButton'><\/div><div class='fxc-actionBarBase-button fxc-filterActionBar-resetButton' data-bind='pcControl: $ctl._resetButton'><\/div>",h=(function(n){function t(t,i,r){var u=n.call(this,t,i,r)||this;return u._initializeWidgets(),u}return __extends(t,n),t.prototype.dispose=function(){this._cleanElement(s);n.prototype.dispose.call(this)},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._initializeWidgets=function(){var n=this,t,r;this.element.addClass(s).html(l);this._updateButton=new o(this.ltm,{text:f.ActionBarButtons.update,primary:!0,onClick:function(){n.element.trigger(e.default.fxactionbarclick,"filterActionBar-updateButton");n._validateForm(n._updateButton).then((function(t){n._setOutput(n._createOutput(n.options.input(),t?null:2))&&n.options.updateButtonClick()}))}});this._resetButton=new o(this.ltm,{text:f.ActionBarButtons.reset,onClick:function(){n.element.trigger(e.default.fxactionbarclick,"filterActionBar-resetButton");n.options.resetButtonClick()}});t=this.options.valid;r=t.subscribe(this.ltm,(function(t){n._onValidChanged(t,n._updateButton)}));i.isNullOrUndefined(t())||r.callback(t());this._bindDescendants()},t})(u.Widget);n.Widget=h;u.registerFactory(4,h,c.FilterActionBar.ViewModel)})(o||(o={})),o}));
define("MsPortalImpl/Controls/ActionBars/Controls.FormActionBar",["require","exports","f","o","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Base/Base.EventTypes"],(function(n,t,i,r,u,f,e){"use strict";var o;return (function(n){var t=i.ViewModels,c=t.ActionBars,o=t.Controls.SimpleButton.ViewModel,s="fxc-formActionBar",l="<div class='fxc-actionBarBase-button fxc-formActionBar-saveButton' data-bind='pcControl: $ctl._saveButton'><\/div><div class='fxc-actionBarBase-button fxc-formActionBar-discardButton' data-bind='pcControl: $ctl._discardButton'><\/div>",h=(function(n){function t(t,i,r){var u=n.call(this,t,i,r)||this;return u._initializeWidgets(),u}return __extends(t,n),t.prototype.dispose=function(){this._cleanElement(s);n.prototype.dispose.call(this)},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._initializeWidgets=function(){var n=this,t,r;this.element.addClass(s).html(l);this._saveButton=new o(this.ltm,{text:f.ActionBarButtons.save,primary:!0,onClick:function(){n.element.trigger(e.default.fxactionbarclick,"formActionBar-saveButton");n._validateForm(n._saveButton).then((function(t){t&&n.options.saveButtonClick()}))}});this._discardButton=new o(this.ltm,{text:f.ActionBarButtons.discard,onClick:function(){n.element.trigger(e.default.fxactionbarclick,"formActionBar-discardButton");n.options.discardButtonClick()}});t=this.options.valid;r=t.subscribe(this.ltm,(function(t){n._onValidChanged(t,n._saveButton)}));i.isNullOrUndefined(t())||r.callback(t());this.$disabled.subscribeAndRun(this.ltm,(function(t){n._saveButton.disabled(t);n._discardButton.disabled(t)}));this._bindDescendants()},t})(u.Widget);n.Widget=h;u.registerFactory(3,h,c.FormActionBar.ViewModel)})(o||(o={})),o}));
define("_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.GenericActionBar.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxc-genericactionbar{font-size:12px}.fxc-genericactionbar-checkbox-outer,.fxc-genericactionbar-summary{margin-bottom:20px}.fxc-genericactionbar-checkbox{display:block;margin:0 6px 0 2px}.fxc-genericactionbar-secondaryLink-bottombanner{margin-bottom:25px}.fxc-genericactionbar-secondaryLink-bottombanner .fxc-genericactionbar-secondaryLink{position:absolute;bottom:0;left:0;right:0;height:25px;line-height:25px;margin:0;padding:0 25px}")}));
define("MsPortalImpl/Controls/ActionBars/Controls.GenericActionBar",["require","exports","f","o","ko","$","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Controls/ActionBars/Controls.ErrorInfoBoxActionBar","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Base/Base.EventTypes","_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.GenericActionBar.css"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";var c;return (function(t){var w=i.Base,c=i.ViewModels,b=c.ActionBars,k=c.Forms.CheckBox.ViewModel,l=!!i.trace.actionbar,a=w.Diagnostics.createLog(n),v="fxc-genericactionbar",y="fxc-genericactionbar-secondaryLink",d="fxc-genericactionbar-secondaryLink-bottombanner",g="<div class='fxc-genericactionbar-summary' data-bind='visible: $ctl._showActionSummary, sanitizedHtml: $ctl._actionSummaryHtml'><\/div>{0}<div class='fxc-genericactionbar-checkbox-outer' data-bind='visible: $ctl._allowToggleProvisioningLocation'><span class='fxc-genericactionbar-checkbox' data-bind='formElement: $ctl._addStartboardPartCheckBox'><\/span><\/div><div class='fxc-actionbar-buttonwrapper' tabindex='-1'><div class='fxc-actionBarBase-button fxc-genericactionbar-actionbutton' data-bind='pcControl: $ctl._actionButton'><\/div><\/div><a class='"+y+"' data-bind='visible: $ctl._showSecondaryLink, text: data.secondaryLinkDisplayText, click: $ctl._secondaryLinkClickHandler' href=\"#\"><\/a>",p=(function(n){function t(t,i,r){var f=n.call(this,t,i,r)||this;return f._actionSummaryHtml=u.observable(),f._allowToggleProvisioningLocation=u.observable(!1),f._showActionSummary=u.observable(!1),f._showSecondaryLink=u.observable(!1),f._addStartboardPartCheckBox=new k(f.ltm,{label:u.observable(s.ErrorInfoBoxActionBar.addStartboardPartLabel),inlineLabel:!0}),f._addStartboardPartCheckBox.value(!0),f._initializeWidgets(),f}return __extends(t,n),t.prototype.dispose=function(){this._actionButtonFieldRequiredReactor&&(this._actionButtonFieldRequiredReactor.dispose(),this._actionButtonFieldRequiredReactor=null);this._cleanElement(v);n.prototype.dispose.call(this)},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._initializeWidgets=function(){var t=this,e=this.options,r=this.ltm,c,p;this.element.addClass(v).html(g.format(o.ErrorBoxTemplate));this._actionButton.onClick=function(){t.element.trigger(h.default.fxactionbarclick,"genericactionbar-actionbutton");t.options.actionButtonUri()?t._setStepResult(t.options.valid(),!0,0,!0):t._validateForm(t._actionButton).then((function(n){t._setStepResult(n)}))};this._secondaryLinkClickHandler=function(){t.element.trigger(h.default.fxactionbarclick,"genericactionbar-secondaryLink");t._setOutput({status:0,action:0,commitId:i.getUniqueId(),secondaryLinkClicked:t.options.secondaryLinkDisplayText()})};u.computed(r,(function(){t._actionButton.text(e.actionButtonLabel()||s.ActionBarButtons.ok)}));u.computed(r,(function(){t._actionSummaryHtml(f.trim(e.actionSummaryHtml()));t._showActionSummary(!!t._actionSummaryHtml())}));u.computed(r,(function(){t._allowToggleProvisioningLocation(e.allowToggleProvisioningLocation())}));u.reactor(r,(function(){t._showSecondaryLink(!!e.secondaryLinkDisplayText())}));u.reactor(r,(function(){var n=!!e.secondaryLinkStyle();t.element.toggleClass(d,n);t.element.findByClassName(y).toggleClass("fxs-bg-primary-10",n)}));c=e.valid;p=c.subscribe(r,(function(n){t._onValidChanged(n,t._actionButton)}));i.isNullOrUndefined(c())||p.callback(c());r.registerForDispose(f(this).setEvents([h.default.fxactionbarvalidationtargetupdated,function(){t._actionButtonFieldRequiredReactor&&(t._actionButtonFieldRequiredReactor.dispose(),t._actionButtonFieldRequiredReactor=null);t._actionButtonFieldRequiredReactor=u.computed(r,(function(){var n=t._actionInProgress();n?(l&&a.verbose("Action bar in progress, disabling button"),t._actionButton.disabled(!0),t.showInfoBox(2,s.ErrorInfoBoxActionBar.errorInfoBoxText)):l&&a.verbose("Action bar empty selectors, disabling button")}))},]));n.prototype._initializeWidgets.call(this);this._bindDescendants();u.unwrap(e.actionButtonUri)&&r.registerForDispose(f(this).setEvents([h.default.fxactionbarvalidationtargetmutated,function(){return t._validateForm(t._actionButton,!1)},]))},t.prototype._setOutputAfterStepResult=function(){var n,t;this.options.actionButtonClick();n=u.unwrap(this.options.actionButtonUri);n&&window.open(n,"_blank",u.unwrap(this.options.actionButtonUriWindowFeatures));t=this.options.input();this._setOutput({stepId:t&&t.stepId,status:3,action:4,commitId:i.getUniqueId(),actionButtonClicked:!0,pinToStartboard:this.options.allowToggleProvisioningLocation()?this._addStartboardPartCheckBox.value():undefined})},t})(o.Widget);t.Widget=p;e.registerFactory(6,p,b.GenericActionBar.ViewModel)})(c||(c={})),c}));
define("_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.PickerActionBar.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxc-pickerActionBar .fxc-pickerActionBar-eula{padding:10px 0 0 2px;font-size:11px;line-height:11px}")}));
define("MsPortalImpl/Controls/ActionBars/Controls.PickerActionBar",["require","exports","f","o","ko","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Base/Base.EventTypes","_generated/Less/MsPortalImpl/Controls/ActionBars/Controls.PickerActionBar.css"],(function(n,t,i,r,u,f,e,o){"use strict";var s;return (function(n){var t=i.ViewModels,c=t.ActionBars,l=t.Controls.SimpleButton.ViewModel,s="fxc-pickerActionBar",a="<div class='fxc-actionBarBase-button fxc-pickerActionBar-okButton' data-bind='pcControl: $ctl._selectButton'><\/div><div class='fxc-pickerActionBar-eula' data-bind='visible: !!$ctl._eula, sanitizedHtml: $ctl._eula'><\/div>",h=(function(n){function t(t,i,r){var f=n.call(this,t,i,r)||this;return f._selectButtonText=u.observable(),f._eula=u.observable(),f._initializeWidgets(),f}return __extends(t,n),t.prototype.dispose=function(){this._cleanElement(s);n.prototype.dispose.call(this)},r.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t.prototype._initializeWidgets=function(){var t=this,n=this.options,r=this.ltm,h,f,c;this.element.addClass(s).html(a);h=function(){t.element.trigger(o.default.fxactionbarclick,"pickerActionBar-okButton");t._validateForm(t._selectButton).then((function(i){t._setOutput(t._createOutput(n.input(),i?null:2))}))};this._selectButton=new l(this.ltm,{text:this._selectButtonText,primary:!0,onClick:h});f=n.valid;c=f.subscribe(r,(function(n){t._onValidChanged(n,t._selectButton)}));i.isNullOrUndefined(f())||c.callback(f());n.triggerSelectAction.subscribe(r,(function(){h()}));u.computed(r,n.selectButtonText,(function(){var i=e.ActionBarButtons.select;n.selectButtonText&&!!n.selectButtonText()&&(i=n.selectButtonText());t._selectButtonText(i)}));u.computed(r,n.showSelectButton,(function(){t._selectButton.visible(n.showSelectButton&&!!n.showSelectButton())}));u.computed(r,n.eula,(function(){t._eula(n.eula&&n.eula())}));this._bindDescendants()},t})(f.Widget);n.Widget=h;f.registerFactory(2,h,c.PickerActionBar.ViewModel)})(s||(s={})),s}));
define("_generated/Less/MsPortalImpl/Widgets/Widgets.BladeActionBar.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,".fxs-bladeActionBar{border-top:1px solid;border-color:inherit;padding:20px 25px;overflow:hidden;position:relative}.fxs-bladeActionBar-blockUiShield{position:absolute;top:0;left:0;bottom:0;right:0}.fxc-actionbar-buttonwrapper{display:inline-block}")}));
define("MsPortalImpl/Widgets/Widgets.BladeActionBar",["require","exports","i","o","ko","MsPortalImpl/Widgets/Widgets.UIElementBase","_generated/Less/MsPortalImpl/Widgets/Widgets.BladeActionBar.css"],(function(n,t,i,r,u,f){"use strict";var e;return (function(n){var c=i.ViewModels.CompositionState,e="fxs-portal-border",t="fxs-bladeActionBar",o=t+"-content",s=t+"-blockUiShield",l="<div class='"+o+"'><\/div><div class='"+s+"' data-bind='visible: func._blockUi'><\/div>",a=(function(n){function t(t){return n.call(this,t)||this}return __extends(t,n),t})(f.ViewModel),h;n.ViewModel=a;h=(function(n){function i(i,r){var f=n.call(this,i,r)||this;return f._blockUi=u.observable(!0),f.element.addClass(t).addClass(e).html(l),f._contentElement=f.element.findByClassName(o),f._shieldElement=f.element.findByClassName(s)[0],u.applyBindings({data:f.options,func:f},f._shieldElement),f}return __extends(i,n),r.defineProperty(i.prototype,"contentElement",{get:function(){return this._contentElement},enumerable:!0,configurable:!0}),i.prototype.initialize=function(n){var t=this;u.computed(this.ltm,(function(){t._blockUi(n.state()!==c.Ready)}))},i.prototype.dispose=function(){this._shieldElement&&(u.cleanNode(this._shieldElement),this._shieldElement=null);this.element.empty().removeClass(t).removeClass(e);n.prototype.dispose.call(this)},i})(f.Widget);n.Widget=h})(e||(e={})),e}));
define("MsPortalImpl/UI/Compositions/UI.Composition.BladeActionBar",["require","exports","f","o","$","MsPortalImpl/Controls/ActionBars/Controls.ActionBarBase","MsPortalImpl/Base/Telemetry","MsPortalImpl/UI/Compositions/UI.Composition","MsPortalImpl/UI/Compositions/UI.Composition.Base","MsPortalImpl/UI/Compositions/UI.Composition.CompositionBinder","MsPortalImpl/UI/Compositions/UI.Composition.PropertyBinding","MsPortalImpl/Widgets/Widgets.BladeActionBar","MsPortalImpl/Base/Base.EventTypes","MsPortalImpl/Controls/ActionBars/Controls.CreateActionBar","MsPortalImpl/Controls/ActionBars/Controls.DeleteActionBar","MsPortalImpl/Controls/ActionBars/Controls.FilterActionBar","MsPortalImpl/Controls/ActionBars/Controls.FormActionBar","MsPortalImpl/Controls/ActionBars/Controls.GenericActionBar","MsPortalImpl/Controls/ActionBars/Controls.PickerActionBar"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a){"use strict";var v;return (function(t){function nt(n,t){var i=new u(n,t,null),r={};return n.finder.tryLocate(i.locator,r)&&(i.actionBarDefinition=r.value,i.extension=n.finder.locate(i.locator.getExtensionLocator())),i}var b=i.Base,v=b.Diagnostics,k=v.Telemetry,y=i.Extension,d=o.CompositionType,p=h.CompositionBinder,g=jQuery,w=v.createLog(n),u;t.EmptyViewModel={};u=(function(n){function u(r,u,f,e,o){var s=n.call(this,"BladeActionBar",r,u,[],f,e)||this;return s.bindings=[],s._viewModelMustBeReleased=!1,s._registrationDeferred=i.Helpers.Deferred(),s._viewModel=o||t.EmptyViewModel,s}return __extends(u,n),u.prototype.getViewModel=function(){return this._viewModel},u.prototype.getViewModelAsync=function(){var n=this;return this._registrationDeferred.then((function(){return n.getViewModel()}))},r.defineProperty(u.prototype,"eligibleForBinding",{get:function(){return!0},enumerable:!0,configurable:!0}),u.prototype.getCompositionType=function(){return d.BladeActionBar},u.prototype.dispose=function(t){this._releaseResources();n.prototype.dispose.call(this,t)},u.prototype.awaitComposed=function(){return this._registrationDeferred.promise()},u.prototype.getInputPropertyBindings=function(){return this._inputPropertyBindings},u.prototype.getDiagnosticsData=function(){return g.extend(n.prototype.getDiagnosticsData.call(this),{bindings:p.mapBindingsToFriendlyObjects(this.bindings)})},u.prototype._setupBindingsAndContent=function(n){var i="{this}-["+this.actionBarDefinition.viewModel+"]",r={bindableTarget:{viewModelName:i,viewModel:this._viewModel},inputs:this.actionBarDefinition.bindings,referenceComposition:this},t;if(this.isDisposed()){this._releaseResources();return}if(!this._viewModel){this._createErrorActionBarContent("The view model obtained from the extension was null or undefined.");return}t=p.bindViewModelInputs(r);this.bindings=t.definitionBindings;this._inputPropertyBindings=t.propertyBindings;this._actionBarControl=f.createWidget(this.actionBarDefinition.actionBarKind,this.widget.contentElement,this._viewModel.content);this._actionBarControl?(this._actionBarControl.setValidationTarget(n.element),this._attachParameterProviderCompletionBehavior(),this.widget.initialize(this._viewModel),this._registrationDeferred.resolve()):(w.error("Unable to create content control."),this._registrationDeferred.reject())},u.prototype._attachParameterProviderCompletionBehavior=function(){var n=this;this._isOnParameterProviderBlade()&&this._actionBarControl.setIsStatusChangeAllowedCallback((function(t){return t===3&&!n.isDisposed()?n.services.desktop.closeChildBlades(n.parent).successful:!0}))},u.prototype._isOnParameterProviderBlade=function(){var n=this.parent;return(n.bladeDefinition.lenses||[]).some((function(n){return(n.partInstances||[]).some((function(n){return n.parameterProvider}))}))},u.prototype._compose=function(n,t){var i=this,r;this._registrationDeferred.done((function(){t.resolve()}));n.setActionBar((function(n){return r=new l.ViewModel(i.id,i.widgetState()),i.widget=new l.Widget(n,r)}));r&&(this.widget.element.data(o.CompositionInstanceDataName,this),this.extension&&this.actionBarDefinition?this._composeActionBarContent(this.widget.ltm,n):s.QtoJ(this.services.finder.locateAsync(this.locator)).done((function(t){i.actionBarDefinition=t;i.extension=i.services.finder.locate(i.locator.getExtensionLocator());i._composeActionBarContent(i.widget.ltm,n)})).fail((function(n){i._createErrorActionBarContent(n)})),this._attachEventHandlers())},u.prototype._attachEventHandlers=function(){var n=this,i,t;if(this.widget){i=this.widget.element;t=this.services.desktop.getActiveJourney();i.on(a.default.fxactionbarclick,this._actionBarClickHandler=function(i,r){k.trace({extension:n.extension&&n.extension.name||n.locator&&n.locator.getExtensionLocator().name,source:n.locator&&n.locator.toFriendlyString(),action:e.Action.ActionBarClicked,name:r,journeyId:t&&t.id})})}},u.prototype._removeEventHandler=function(){if(this.widget){var n=this.widget.element;this._actionBarClickHandler&&(n.off(a.default.fxactionbarclick,this._actionBarClickHandler),this._actionBarClickHandler=null)}},u.prototype._composeActionBarContent=function(n,t){var i=this;this._acquireActionBarViewModel(n).then((function(n){i._viewModel=n;i._viewModelMustBeReleased=!!i.actionBarDefinition.viewModel;i._setupBindingsAndContent(t)}),(function(n){i._createErrorActionBarContent(n)}))},u.prototype._acquireActionBarViewModel=function(n){var r,u;if(this.actionBarDefinition.source){var t=this.actionBarDefinition.source.valuesFrom[0],e=this.parent,i=e.children.mapMany((function(n){return n.children})).first((function(n){return n.locator.name===t.part}));return Q(i.awaitComposed()).then((function(){var u=i.getViewModel(0),n=c.getModelValue(u,t.property),r;if(n.exists)return y.composeViewModel((function(){return n.value}),"viewModelName");r="Unable to find the view model for the action bar at '{0}' in part '{1}'.";throw new Error(r.format(t.property,i.locator.toFriendlyString()));}))}if(this.actionBarDefinition.viewModel)return this.extension.getViewModel(this.actionBarDefinition.viewModel);if(r=f.createViewModel(n,this.actionBarDefinition.actionBarKind),!r)throw new Error("Unable to create content view model.");return u=y.composeViewModel((function(){return r}),"viewModelName"),Q(u)},u.prototype._releaseResources=function(){this._removeEventHandler();this._inputPropertyBindings&&(this._inputPropertyBindings.unbind(),this._inputPropertyBindings=null);this.extension&&this._viewModel&&this._viewModelMustBeReleased&&(i.disposeViewModelProperties(this._viewModel),this.extension.releaseViewModel(this._viewModel),this._viewModel=t.EmptyViewModel)},u.prototype._createErrorActionBarContent=function(n){w.error("Error composing the blade's actionBar '"+this+"'. Details: "+n)},u})(s.Instance);t.Instance=u;t.create=nt})(v||(v={})),v}))