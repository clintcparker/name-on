var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/LinuxAppServiceSetupBladeViewModel",["require","exports","f","o","ko","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources"],(function(n,t,i,r,u,f){"use strict";r.defineProperty(t,"__esModule",{value:!0});var e=(function(n){function t(t,i,r){var e=n.call(this)||this;return e.websiteResourceUri=u.observable(""),e.imageSource=u.observable(""),e.title(f.setupContinuousIntegrationBladeTitle),e._dataContext=r,e._dataContext.appServiceArmManager.clearCachedWebAppSettings(),e}return __extends(t,n),t.prototype.onInputsSet=function(n){return this.websiteResourceUri(n.websiteResourceUri),this.imageSource(n.imageSource),this._dataContext.appServiceArmManager.setWebSiteResourceUri(this.websiteResourceUri()),this._dataContext.currentResourceUri=this.websiteResourceUri(),null},t})(i.ViewModels.Blade);t.LinuxAppServiceSetupBladeViewModel=e}));__extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/LinuxAppServiceSetupPartViewModel",["require","exports","f","o","ko","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources","ReleaseManagement/TypeScript/Models/ContinuousIntegrationModel","ReleaseManagement/TypeScript/Utilities/UIValidations"],(function(n,t,i,r,u,f,e,o){"use strict";r.defineProperty(t,"__esModule",{value:!0});var s=(function(n){function t(t,i,r){var f=n.call(this,t)||this;return f.imageSource=u.observable(),f.displayTestEnvironmentSelector=u.observable(!1),f._container=t,f._dataContext=r,f._initializeFormFields(t),f.actionBar.valid(!0),f}return __extends(t,n),t.prototype._initializeFormFields=function(n){var t=this;this.actionBar=new i.ViewModels.ActionBars.GenericActionBar.ViewModel(n);this.parameterProvider=new i.ViewModels.ParameterProvider(n,{mapIncomingDataForEditScope:function(n){return t.displayTestEnvironmentSelector(!0),n},mapOutgoingDataForCollector:function(){return{buildConfiguration:u.observable(null),teamConfiguration:u.observable(t._teamServicesConfiguration),imageConfiguration:u.observable(t._imageConfiguration),sourceConfiguration:u.observable(t._buildAndDeployConfiguration),testEnvironmentConfiguration:u.observable(t._testEnvironmentConfiguration),deploymentSlotConfiguration:u.observable(t._deploymentSlotConfiguration),oAuthSetupResult:u.observable(t._oAuthSetupResult)}}});this.editScope=this.parameterProvider.editScope;this.chooseImageSelector=new i.ViewModels.Forms.Selector.ViewModel(n,this,"imageConfiguration",{label:u.observable(f.chooseImageSelectorLabel),validations:u.observableArray([new i.ViewModels.RequiredValidation(f.chooseImageSelectorValidationText),new i.ViewModels.CustomValidation("",function(n){return t._validateImage(n)})]),selectedValue:{detailBlade:"ImageSourceBlade",detailBladeInputs:{}}});this.chooseImageSelector.displayText=u.pureComputed((function(){return t.imageSource()=="Registry"?t.chooseImageSelector.value()&&t.chooseImageSelector.value().registryType&&t.chooseImageSelector.value().registryType()?t.chooseImageSelector.value().registryType():f.chooseImageSelectorValidationText:t.chooseImageSelector.value()&&t.chooseImageSelector.value().webAppFramework&&t.chooseImageSelector.value().webAppFramework()?t.chooseImageSelector.value().webAppFramework():f.configureBuildSelectorLabel}));this.chooseImageCollector=new i.ViewModels.ParameterCollector(n,{supplyInitialData:function(){return{imageConfiguration:t._imageConfiguration,optionalFeatures:[]}},receiveResult:function(n){t._imageConfiguration=n.imageConfiguration;t.chooseImageSelector.value(t._imageConfiguration)},selectable:this.chooseImageSelector.selectable});this.configureTeamServicesSelector=new i.ViewModels.Forms.Selector.ViewModel(n,this,"teamConfiguration",{label:u.observable(f.configureTeamServicesLabel),validations:u.observableArray([new i.ViewModels.RequiredValidation(f.configureTeamServicesSelectorText)]),selectedValue:{detailBlade:"ConfigureTeamServicesBlade",detailBladeInputs:{}}});this.configureTeamServicesCollector=new i.ViewModels.ParameterCollector(n,{supplyInitialData:function(){var n=t._teamServicesConfiguration;return n&&t._buildAndDeployConfiguration?n.sourceProviderType=t._buildAndDeployConfiguration.sourceProviderType:n||(n={sourceProviderType:t._buildAndDeployConfiguration?t._buildAndDeployConfiguration.sourceProviderType:u.observable(e.ProviderType.GitHub)}),n.optionalFeatures=[e.LinuxWebAppFeature],n},receiveResult:function(n){t._teamServicesConfiguration=n;t.configureTeamServicesSelector.value(t._teamServicesConfiguration)},selectable:this.configureTeamServicesSelector.selectable});this.configureTeamServicesSelector.displayText=u.pureComputed((function(){return t.configureTeamServicesSelector.value()?t.configureTeamServicesSelector.value().createNewAccount&&t.configureTeamServicesSelector.value().createNewAccount()?t.configureTeamServicesSelector.value().ciAccount&&t.configureTeamServicesSelector.value().ciAccount()?t.configureTeamServicesSelector.value().ciAccount():f.configureTeamServicesSelectorDisplayText:t.configureTeamServicesSelector.value().selectedAccount&&t.configureTeamServicesSelector.value().selectedAccount()?t.configureTeamServicesSelector.value().selectedAccount().name():f.configureTeamServicesSelectorDisplayText:f.configureTeamServicesSelectorDisplayText}));this.chooseBuildAndDeploySelector=new i.ViewModels.Forms.Selector.ViewModel(n,this,"sourceConfiguration",{label:u.observable(f.chooseSourceSelectorLabel),validations:u.observableArray([new i.ViewModels.RequiredValidation(f.chooseSourceSelectorDisplayText),new i.ViewModels.CustomValidation("",function(n){return t._validateSource(n)})]),selectedValue:{detailBlade:"ChooseSourceBlade",detailBladeInputs:{}}});this.chooseBuildAndDeploySelector.displayText=u.pureComputed((function(){return t.chooseBuildAndDeploySelector.value()?t.chooseBuildAndDeploySelector.value().sourceProviderType&&t.chooseBuildAndDeploySelector.value().sourceProviderType()?t._getDisplayText(t.chooseBuildAndDeploySelector.value().sourceProviderType()):f.chooseBuildAndDeploySelectorText:f.chooseBuildAndDeploySelectorText}));this.chooseBuildAndDeployCollector=new i.ViewModels.ParameterCollector(n,{supplyInitialData:function(){return{sourceConfiguration:t._buildAndDeployConfiguration,oAuthSetupResult:t._oAuthSetupResult,optionalFeatures:[e.LinuxWebAppFeature,e.ExternalGitFeature,e.LocalGitFeature,e.TfvcFeature]}},receiveResult:function(n){if(t._buildAndDeployConfiguration=n.sourceConfiguration,t._oAuthSetupResult=n.oAuthSetupResult,t.chooseBuildAndDeploySelector.value(n.sourceConfiguration),t._buildAndDeployConfiguration.sourceProviderType()===e.ProviderType.VSTS){var i={createNewAccount:u.observable(!1),selectedAccount:t._buildAndDeployConfiguration.account,selectedProject:t._buildAndDeployConfiguration.project,sourceProviderType:u.observable(t._buildAndDeployConfiguration.sourceProviderType())};t._teamServicesConfiguration=i;t.configureTeamServicesSelector.value(t._teamServicesConfiguration)}},selectable:this.chooseBuildAndDeploySelector.selectable});this.chooseSlotSelector=new i.ViewModels.Forms.Selector.ViewModel(n,this,"deploymentSlotConfiguration",{label:u.observable(f.chooseSlotSelectorLabel),selectedValue:{detailBlade:"SlotSettingsBlade",detailBladeInputs:{}}});this.chooseSlotSelector.displayText=u.pureComputed((function(){var n=t.chooseSlotSelector.value();if(n&&n.useSlot&&n.useSlot()){if(n.createSlot&&n.createSlot())return n.createSlotName();if(n.createSlot&&!n.createSlot())return n.selectSlotName()}return f.chooseSlotSelectorDisplayText}));this.chooseSlotCollector=new i.ViewModels.ParameterCollector(n,{supplyInitialData:function(){return t._deploymentSlotConfiguration},receiveResult:function(n){t._deploymentSlotConfiguration=n;t.chooseSlotSelector.value(n)},selectable:this.chooseSlotSelector.selectable});this.imageSource.subscribe(n,(function(n){n=="Registry"?t.chooseImageSelector.label(f.chooseImageSelectorLabel):t.chooseImageSelector.label(f.chooseBuildAndDeploySelectorLabel)}))},t.prototype.onInputsSet=function(n){return n.websiteUri&&(this.websiteUri=n.websiteUri),n.imageSource&&this.imageSource(n.imageSource),null},t.prototype._getDisplayText=function(n){var t="";switch(n){case e.ProviderType.VSTS:t="Visual Studio Team Services";break;case e.ProviderType.GitHub:t="GitHub";break;case e.ProviderType.ExternalGit:t="External Git";break;case e.ProviderType.LocalGit:t="Local Git"}return t},t.prototype._validateSource=function(n){var t=Q.defer();return n&&n.sourceProviderType&&n.sourceProviderType()&&(n.sourceProviderType()==e.ProviderType.VSTS?n.account&&n.account()&&n.project&&n.project()&&n.repository&&n.repository()&&n.branch&&n.branch()?t.resolve({valid:!0,message:""}):t.resolve({valid:!1,message:f.contentValidationText}):n.sourceProviderType()==e.ProviderType.ExternalGit?n.repositoryUrl&&n.repositoryUrl()&&n.branch&&n.branch()?n.isPrivateGitRepository&&n.isPrivateGitRepository()?n.password&&n.password()?t.resolve({valid:!0,message:""}):t.resolve({valid:!1,message:f.passwordValidationText}):t.resolve({valid:!0,message:""}):t.resolve({valid:!1,message:f.contentValidationText}):n.sourceProviderType()===e.ProviderType.LocalGit?t.resolve({valid:!0,message:""}):n.repository&&n.repository()&&n.branch&&n.branch()?t.resolve({valid:!0,message:""}):t.resolve({valid:!1,message:f.contentValidationText})),t.promise},t.prototype._validateImage=function(n){var t=Q.defer();if(n&&n.registryType&&n.registryType())if(n.registryType()==e.ImageSource.Builtin)if(n.webAppFramework&&n.webAppFramework())if(n.webAppFramework()==e.WebAppFramework.AspNetCore){if(n.startupCommand&&n.startupCommand())return o.BuiltinImageValidations.validateStartupFileForDotNetCore(n.startupCommand());t.resolve({valid:!1,message:f.startupCommandInvalidText})}else if(n.webAppFramework()==e.WebAppFramework.Node){if(n.startupCommand&&n.startupCommand())return o.BuiltinImageValidations.validateStartupFileForNode(n.startupCommand());t.resolve({valid:!0,message:""})}else t.resolve({valid:!0,message:""});else t.resolve({valid:!1,message:f.frameworkEmptyText});else t.resolve({valid:!0,message:""});else t.resolve({valid:!1,message:f.registryCannotBeNull});return t.promise},t})(i.ViewModels.Forms.Form.ViewModel);t.LinuxAppServiceSetupPartViewModel=s}));
define("_generated/Blades/LinuxAppServiceSetupBlade",["require","exports","_generated/Blades/VersionControl.css","ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/LinuxAppServiceSetupBladeViewModel","ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/LinuxAppServiceSetupPartViewModel"],(function(n,t,i){"use strict";var r;return (function(n){n.blade={name:"LinuxAppServiceSetupBlade",inputs:["websiteResourceUri","imageSource"],templateKeyInputs:["websiteResourceUri","imageSource"],viewModelName:"ReleaseManagement$LinuxAppServiceSetupBladeViewModel",lenses:[{name:"SetupLens",partInstances:[{name:"LinuxAppServiceSetupPart",inline:{styleSheets:[{file:"Blades/VersionControl.css",content:i}],viewModel:"ReleaseManagement$LinuxAppServiceSetupPartViewModel",partKind:0,inputs:["websiteUri","imageSource"],bindings:[{property:"websiteUri",valuesFrom:[{referenceType:3,property:"content.websiteResourceUri"}]},{property:"imageSource",valuesFrom:[{referenceType:3,property:"content.imageSource"}]}],details:[{selectablePath:"content.chooseImageSelector.selectable",blade:"ImageSourceBlade",parameterCollector:"content.chooseImageCollector"},{selectablePath:"content.chooseBuildAndDeploySelector.selectable",blade:"ChooseSourceBlade",parameterCollector:"content.chooseBuildAndDeployCollector"},{selectablePath:"content.configureTeamServicesSelector.selectable",blade:"ConfigureTeamServicesBlade",parameterCollector:"content.configureTeamServicesCollector"},{selectablePath:"content.chooseSlotSelector.selectable",blade:"SlotSettingsBlade",parameterCollector:"content.chooseSlotCollector"}],initialSize:9,supportedSizes:[9],htmlTemplateInline:{file:"LinuxAppServiceSetup.html",content:'<div> <div data-bind="formElement: chooseBuildAndDeploySelector"><\/div> <div data-bind="formElement: chooseImageSelector"><\/div> <div data-bind="formElement: configureTeamServicesSelector"><\/div> <!-- <div data-bind="formElement: configureTestEnvironmentSelector"><\/div> --> <div data-bind="formElement: chooseSlotSelector"><\/div> <\/div>'}},parameterProvider:!0}]}],viewModelInputs:[{property:"websiteResourceUri",valuesFrom:[{referenceType:1,property:"websiteResourceUri"}]},{property:"imageSource",valuesFrom:[{referenceType:1,property:"imageSource"}]}],width:0,locked:!0,pinnable:!1,style:3,actionBar:{name:"SetupContinuousIntegrationActionBar",actionBarKind:6,bindings:[]},attributes:0}})(r||(r={})),r}))