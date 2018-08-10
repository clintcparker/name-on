define("MsPortalImpl.Controls/Fields/CheckBoxField",["require","exports","f","o","MsPortalImpl.Controls/Fields/Base/Field","Viva.Controls/Controls/Forms/Viva.CheckBox","Viva.Controls/Controls/Base/ValidationPlacements/Viva.DockedBalloon","Viva.Controls/Controls/Base/ValidationPlacements/Viva.Css","MsPortalImpl/Widgets/Widgets.Common"],(function(n,t,i,r,u,f,e,o,s){"use strict";var h;return (function(n){var t=jQuery,h=(function(n){function u(t,i,r){return n.call(this,t,i,r)||this}return __extends(u,n),u.prototype._initializeField=function(){n.prototype._initializeField.call(this);var t=this.element;t.addClass("azc-checkBoxField").addClass("fxc-CheckBoxField").toggleClass("azc-checkBoxField-inlineLabel",this.options.inlineLabel);this.checkBoxInit();s.waitForBindings(t[0]).then((function(){var n="azc-checkbox-guid-"+i.getUniqueId();t.find("input").attr("id",n);t.find("label").attr("for",n)}))},u.prototype.dispose=function(){this._checkBoxWidget&&(this._checkBoxWidget.dispose(),this._checkBoxWidget=null,this._checkBoxViewModel=null);this._cleanElement("azc-checkBoxField","fxc-CheckBoxField","azc-checkBoxField-inlineLabel");n.prototype.dispose.call(this)},r.defineProperty(u.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),r.defineProperty(u.prototype,"validatableViewModel",{get:function(){return this._checkBoxViewModel},enumerable:!0,configurable:!0}),r.defineProperty(u.prototype,"validatableWidget",{get:function(){return this._checkBoxWidget},enumerable:!0,configurable:!0}),u.prototype.checkBoxInit=function(){var i=this.ltm,r=this._checkBoxViewModel=new f.ViewModel(this.vmBasicOption),n;r.validationPlacements.push(new o.Css(i),new e.DockedBalloon(i,e.DockedBalloon.defaultOptions));n=this._checkBoxElement=t("<div />");this.appendControl(n);this.linkCheckBoxViewModels();this._checkBoxWidget=new f.Widget(n,r);this._addWidget(this._checkBoxWidget);this.setupValidationBindings()},u.prototype.linkCheckBoxViewModels=function(){var t=this,n=this.options._msPortalFxWidgetValue;this._checkBoxViewModel.value(n()?1:0);n.subscribe(this.ltm,(function(n){var i=t.getCheckboxWidgetValue(n);t._checkBoxViewModel.value()!==i&&t._checkBoxViewModel.value(i)}));this._checkBoxViewModel.value.subscribe(this.ltm,(function(t){n()&&t===0?n(!1):n()||t!==1||n(!0)}));this.linkValidatableControlViewModels()},u.prototype.getCheckboxWidgetValue=function(n){return n?1:0},u.prototype._createLabelAndSubLabel=function(){this.options.inlineLabel?(this._attachLabelAndSubLabel({emptyLabel:!0}),this._attachLabelAndSubLabel({inhibitSubLabel:!0,inlineLabel:!0,insertLabelBefore:this._checkBoxElement,ariaLabel:this.options.ariaLabel})):this._attachLabelAndSubLabel({ariaLabel:this.options.ariaLabel})},u})(u.FieldWidget);n.Widget=h})(h||(h={})),h}))