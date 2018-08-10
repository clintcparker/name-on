var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/ViewModels/VmssContinuousIntegration/ConfigureTeamServicesBladeViewModel",["require","exports","f","o","ko","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources"],(function(n,t,i,r,u,f){"use strict";r.defineProperty(t,"__esModule",{value:!0});var e=(function(n){function t(t,i,r){var e=n.call(this)||this;return e.title(f.configureTeamServicesLabel),e._dataContext=r,e._dataContext.chooseSourceBladeState(null),e._dataContext.chooseSourceBladeStateMessage(""),u.reactor(t,(function(){var n=e._dataContext.chooseSourceBladeState(),t=e._dataContext.chooseSourceBladeStateMessage();e.contentState(n);e.contentStateDisplayText(t)})),e}return __extends(t,n),t.prototype.onInputsSet=function(){return Q.resolve("")},t})(i.ViewModels.Blade);t.ConfigureTeamServicesBladeViewModel=e}));__extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/ViewModels/VmssContinuousIntegration/ConfigureTeamServicesPartViewModel",["require","exports","f","o","ko","$","Core/TypeScript/TFS.Core","Core/TypeScript/TFS.Service","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources","ReleaseManagement/TypeScript/Models/ContinuousIntegrationModel","ReleaseManagement/TypeScript/Utilities/ValidationUtils","ReleaseManagement/TypeScript/Utilities/ReleaseManagementUtils","ReleaseManagement/TypeScript/Utilities/Utils"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a){"use strict";r.defineProperty(t,"__esModule",{value:!0});var v=i.Base.Diagnostics.Telemetry,y=(function(n){function t(t,r,f){var e=n.call(this,t)||this;return e._accountsFetched=!1,e._optionLoading={text:u.observable(s.loadingText),value:null},e._optionNoDataFound={text:u.observable(""),value:null},e._dataContext=f,e._container=t,e._accountsFetched=!1,e.helpText=u.observable(""),e.parameterProvider=new i.ViewModels.ParameterProvider(t,{mapIncomingDataForEditScopeAsync:function(n){return e.mapIncomingDataForEditScopeAsync(n)},mapOutgoingDataForCollector:function(n){return e._returnAccountConfiguration(n)}}),e.editScope=e.parameterProvider.editScope,e._initializeForm(),e.isFormValid=u.pureComputed((function(){return e.accountConfigSection.valid()})),e}return __extends(t,n),t.prototype._initializeForm=function(){var n=this,t,r,f,e;this.isVsts=u.observable(!0);this.configureCD=u.observable(s.configureCD);this.configureCDSubText=u.observable(s.configureCDSubText);t={label:u.observable(s.visualStudioTeamServiceAccountText),infoBalloonContent:u.observable(s.configureCDSubText),infoBalloonLinkContent:u.observable(new i.ViewModels.Controls.Balloon.Link("Learn more here.","https://go.microsoft.com/fwlink/?linkid=834361")),options:u.observableArray([{text:u.observable(s.createNew),value:!0},{text:u.observable(s.useExisting),value:!1}]),validations:u.observableArray([new i.ViewModels.RequiredValidation])};this.createOrSelectAccountControl=new i.ViewModels.Forms.OptionsGroup.ViewModel(this._container,this,"createNewAccount",t);r=new i.ViewModels.Forms.TextBox.ViewModel(this._container,this,"ciAccount",{label:u.observable(s.accountNameLabel),subLabel:u.observable(".visualstudio.com"),emptyValueText:u.observable("Enter Account Name"),validations:u.observableArray([new i.ViewModels.RequiredValidation,new i.ViewModels.CustomValidation("",function(t){return n.validateAccountName(t)})])});this.chooseLocationControl=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"location",{label:u.observable(s.locationLabel),validations:u.observableArray([new i.ViewModels.RequiredValidation])});this.selectAccountControl=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"selectedAccount",{label:u.observable(s.accountNameLabel),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation])});this.selectAccountControl.value.subscribe(this._container,(function(t){t!=null&&(n._currentAccount=t,n._setupProjectsDropDown(n._optionLoading),n._updateProjects(t))}));this.selectProjectControl=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"selectedProject",{label:u.observable(s.projectNameLabel),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation,new i.ViewModels.CustomValidation(s.requireAdditionalPermissions,function(t){return!!n.selectAccountControl.value()&&!!t?n._hasValidPermissions(n.selectAccountControl.value(),t):Q({valid:!1,message:""})})])});this.selectProjectControl.value.subscribe(this._container,(function(t){n._currentProject=t}));f={style:u.observable(3),children:u.observableArray([])};this.accountConfigSection=new i.ViewModels.Forms.Section.ViewModel(this._container,f);e={style:u.observable(3),children:u.observableArray([this.createOrSelectAccountControl])};this.createOrSelectAccountSection=new i.ViewModels.Forms.Section.ViewModel(this._container,e);this.createOrSelectAccountControl.value.subscribe(this._container,(function(t){var i=[n.createOrSelectAccountControl,r,n.chooseLocationControl],u=[n.createOrSelectAccountControl,n.selectAccountControl,n.selectProjectControl];n._updateAccounts();n._updateLocations();n.createOrSelectAccountSection.children(t?i:u)}));this.isVsts.subscribe(this._container,(function(){}));this.accountConfigSection.children([this.createOrSelectAccountSection]);this.sections.push(this.accountConfigSection)},t.prototype._hasValidPermissions=function(n,t){var r=this,i=Q.defer();return c.ValidationUtils.getVstsPermissions(n,t).then((function(n){t.id()===r._currentProject.id()&&i.resolve({valid:n.hasPermissions,message:n.message})}),(function(){i.resolve({valid:!0,message:s.failedToValidatePermissions})})),i.promise},t.prototype._updateAccounts=function(){var n=this,t=this._incomingTeamServicesConfiguration;this._incomingTeamServicesConfiguration=t;this._dataContext.rmUtils.getVSTSAccounts().then((function(t){var i;if(n._accountsFetched=!0,t&&t.length>0){var h=t.length,r=t[0],f=n._incomingTeamServicesConfiguration&&n._incomingTeamServicesConfiguration.selectedAccount?n._incomingTeamServicesConfiguration.selectedAccount().name():t[0].name(),o=[];for(i=0;i<h;i++)o.push({text:u.observable(t[i].name()),value:t[i]}),f&&e.StringUtils.ignoreCaseComparer(t[i].name(),f)===0&&(r=t[i]);n.selectAccountControl.options(o);n.selectAccountControl.value(r);n.createOrSelectAccountControl.disabled(n.isVsts());n.selectAccountControl.disabled(n.isVsts());n.selectProjectControl.disabled(n.isVsts())}else n._optionNoDataFound.text(s.noAccountsFound),v.trace({source:"ConfigureTeamServicesPartViewModel",action:"NoAccountsFound"}),n._setupAccountsDropDown(n._optionNoDataFound)}))},t.prototype._updateLocations=function(){var n=this,t=a.ResourceUriHelper.getSubscriptionIdFromUri(this._dataContext.currentResourceUri);this._dataContext.rmUtils.getSubscriptionSupportedRegionWithTFSRegion(t).then((function(t){var i;if(t&&t.length>0){var h=t.length,r=t[0],f=n._incomingTeamServicesConfiguration&&n._incomingTeamServicesConfiguration.location?n._incomingTeamServicesConfiguration.location():null,o=[];for(i=0;i<h;i++)o.push({text:u.observable(t[i].displayName),value:t[i]}),f&&e.StringUtils.ignoreCaseComparer(t[i].regionCode,f.regionCode)===0&&(r=t[i]);n.chooseLocationControl.options(o);n.chooseLocationControl.value(r)}else n._optionNoDataFound.text(s.noRegionsFound),v.trace({source:"ConfigureTeamServicesPartViewModel",action:"NoRegionsFound"}),n._setupRegionsDropDown(n._optionNoDataFound)}))},t.prototype.mapIncomingDataForEditScopeAsync=function(n){var r=f.Deferred(),t={},i;return t.displayName="Central US",t.id="centralus",t.regionCode="CUS",i={ciAccount:n&&n.ciAccount?n.ciAccount:u.observable(""),createNewAccount:n&&n.createNewAccount?n.createNewAccount:u.observable(!1),selectedAccount:n&&n.selectedAccount?n.selectedAccount:u.observable(null),selectedProject:n&&n.selectedProject?n.selectedProject:u.observable(null),location:n&&n.location?n.location:u.observable(t),sourceProviderType:n&&n.sourceProviderType?n.sourceProviderType:u.observable(h.ProviderType.VSTS)},this._incomingTeamServicesConfiguration=n,this._optionalFeatures=n.optionalFeatures||[],this.isVsts(i.sourceProviderType()===h.ProviderType.VSTS),this._isFeatureEnabled(h.LinuxWebAppFeature)?this.helpText(s.linuxWebAppInformationDetailsForTeamServices):this._isFeatureEnabled(h.VmssFeature)&&this.helpText(s.vmssInformationDetailsForTeamServices),this._setupAccountsDropDown(this._optionLoading),this._setupRegionsDropDown(this._optionLoading),r.resolve(i),r.promise()},t.prototype._returnAccountConfiguration=function(n){return n},t.prototype._setupAccountsDropDown=function(n){this.selectAccountControl.options([]);var t=[];t.push(n);this.selectAccountControl.options(t);this.selectAccountControl.clearValidation()},t.prototype._setupRegionsDropDown=function(n){this.chooseLocationControl.options([]);var t=[];t.push(n);this.chooseLocationControl.options(t);this.chooseLocationControl.clearValidation()},t.prototype._setupProjectsDropDown=function(n){this.selectProjectControl.options([]);var t=[];t.push(n);this.selectProjectControl.options(t);this.selectProjectControl.value(n.value);this.selectProjectControl.clearValidation()},t.prototype._getProjects=function(n,t){var i=f.Deferred();return this._dataContext.rmUtils.getProjects(this._container,t).then((function(n){i.resolve({accountName:t,projects:n})})),i.promise()},t.prototype._updateProjects=function(n){var t=this,r;i.isNullOrUndefined(n)||(r=this._getProjects(this._container,n.name()),r.then((function(n){var i,o,r;if(n.accountName===t._currentAccount.name())if(i=n.projects,i&&i.length>0){i=i.stableSort((function(n,t){return e.StringUtils.ignoreCaseComparer(n.name(),t.name())}));var c=i.length,h=i[0],f="";for(t._incomingTeamServicesConfiguration&&t._incomingTeamServicesConfiguration.selectedProject&&t._incomingTeamServicesConfiguration.selectedProject()&&(f=t._incomingTeamServicesConfiguration.selectedProject().name()),o=[],r=0;r<c;r++)o.push({text:u.observable(i[r].name()),value:i[r]}),f&&i[r].name()===f&&(h=i[r]);t.selectProjectControl.options(o);t.selectProjectControl.value(h)}else t._optionNoDataFound.text(s.noProjectsFound),v.trace({source:"ConfigureTeamServicesPartViewModel",action:"NoProjectsFound"}),t._setupProjectsDropDown(t._optionNoDataFound)})))},t.prototype.validateAccountName=function(n){var t=Q.defer(),i=new o.AccountManager;return i.beginValidateAccountName(n,(function(n){t.resolve(n)}),(function(n){t.reject(n.message)})),t.promise},t.prototype._isFeatureEnabled=function(n){return i.findIndex(this._optionalFeatures,(function(t){return t.toUpperCase()===n.toUpperCase()}))>=0||l.ReleaseManagementUtils.isFeatureEnabled(n)},t})(i.ViewModels.Forms.Form.ViewModel);t.ConfigureTeamServicesPartViewModel=y}));
define("_generated/Blades/ConfigureTeamServicesBlade",["require","exports","_generated/Blades/VersionControl.css","ReleaseManagement/TypeScript/ViewModels/VmssContinuousIntegration/ConfigureTeamServicesBladeViewModel","ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/ChooseSourceActionBar","ReleaseManagement/TypeScript/ViewModels/VmssContinuousIntegration/ConfigureTeamServicesPartViewModel"],(function(n,t,i){"use strict";var r;return (function(n){n.blade={name:"ConfigureTeamServicesBlade",viewModelName:"ReleaseManagement$ConfigureTeamServicesBladeViewModel",lenses:[{name:"ConfigureTeamServicesLens",partInstances:[{name:"ConfigureTeamServicesPart",inline:{styleSheets:[{file:"Blades/VersionControl.css",content:i}],viewModel:"ReleaseManagement$ConfigureTeamServicesPartViewModel",partKind:0,inputs:[],bindings:[],details:[],initialSize:9,supportedSizes:[9],htmlTemplateInline:{file:"VmssTeamServices.html",content:'<div class="msportalfx-form msportalfx-form-full"> <div data-bind=\'html: helpText\'><\/div> <br/> <div data-bind="formElement: accountConfigSection"/> <\/div>'}},parameterProvider:!0}]}],width:0,locked:!0,actionBar:{name:"genericActionBar",actionBarKind:6,viewModel:"ReleaseManagement$ChooseSourceActionBar",bindings:[{property:"valid",valuesFrom:[{referenceType:0,property:"content.isFormValid",part:"ConfigureTeamServicesPart"}]}]},attributes:0}})(r||(r={})),r}))