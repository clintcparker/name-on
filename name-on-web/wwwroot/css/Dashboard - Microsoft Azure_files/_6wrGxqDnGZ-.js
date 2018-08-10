var __extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/ChooseSourceBladeViewModel",["require","exports","f","o","ko","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources"],(function(n,t,i,r,u,f){"use strict";r.defineProperty(t,"__esModule",{value:!0});var e=(function(n){function t(t,i,r){var e=n.call(this)||this;return e.title(f.chooseSourceTitle),e._dataContext=r,e._dataContext.chooseSourceBladeState(null),e._dataContext.chooseSourceBladeStateMessage(""),u.reactor(t,(function(){var n=e._dataContext.chooseSourceBladeState(),t=e._dataContext.chooseSourceBladeStateMessage();e.contentState(n);e.contentStateDisplayText(t)})),e}return __extends(t,n),t.prototype.onInputsSet=function(){return null},t})(i.ViewModels.Blade);t.ChooseSourceBladeViewModel=e}));__extends=this&&this.__extends||
(function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}})();
define("ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/ChooseSourcePartViewModel",["require","exports","f","o","ko","$","ReleaseManagement/TypeScript/Utilities/ArmUtils","ReleaseManagement/TypeScript/Utilities/ReleaseManagementUtils","ReleaseManagement/TypeScript/Utilities/ValidationUtils","ReleaseManagement/TypeScript/Resources/ReleaseManagementResources","ReleaseManagement/TypeScript/Models/ContinuousIntegrationModel","ReleaseManagement/TypeScript/Models/ScmModels","ReleaseManagement/TypeScript/Converters/ScmToContinuousIntegrationModelConverter","Core/TypeScript/TFS.Core","ReleaseManagement/TypeScript/Converters/VstsToContinuousIntegrationModelConverter"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y){"use strict";r.defineProperty(t,"__esModule",{value:!0});var p=i.Base.Diagnostics.Telemetry,w=i.ViewModels.Controls.InfoBox,b=i.Base.Images,k=(function(n){function t(t,r,f){var e=n.call(this,t)||this;return e.isLoading=u.observable(!1),e.helpText=u.observable(),e.helpTextPresent=u.observable(),e._optionLoading={text:u.observable(h.loadingText),value:null},e._optionNoDataFound={text:u.observable(""),value:null},e._dataContext=f,e._container=t,e.helpTextPresent(!1),e.parameterProvider=new i.ViewModels.ParameterProvider(t,{mapIncomingDataForEditScopeAsync:function(n){return e.mapIncomingDataForEditScopeAsync(n)},mapOutgoingDataForCollector:function(n){return e._returnSourceConfiguration(n)}}),e.editScope=e.parameterProvider.editScope,e._initializeForm(),e.isFormValid=u.pureComputed((function(){return e.generalSection.valid()})),e}return __extends(t,n),t.prototype.onInputsSet=function(){return Q()},t.prototype._initializeForm=function(){var n=this,s={label:u.observable(h.sourceTypeLabel),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.chooseSourceType)])},t,r,f,e,o;this.sourceTypeDropDown=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"sourceConfiguration.sourceProviderType",s);t={label:u.observable(h.selectAccountLabel),infoBalloonContent:u.observable(h.configureCDSubText),infoBalloonLinkContent:u.observable(new i.ViewModels.Controls.Balloon.Link(h.learnMoreHere,"https://go.microsoft.com/fwlink/?linkid=834361")),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.chooseAccount)])};this.accountDropDown=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"sourceConfiguration.account",t);r={label:u.observable(h.selectProjectLabel),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.chooseProject),new i.ViewModels.CustomValidation(h.requireAdditionalPermissions,function(t){return n._sourceType==c.ProviderType.VSTS&&!!t?!n.accountDropDown.value()?Q({valid:!1,message:""}):n._hasValidPermissions(n.accountDropDown.value(),t):Q({valid:!0,message:""})})])};this.projectDropDown=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"sourceConfiguration.project",r);f={label:u.observable(h.selectRepositoryLabel),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.chooseRepo)])};this.repositoryDropDown=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"sourceConfiguration.repository",f);e={label:u.observable(h.selectBranchLabel),options:u.observableArray([]),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.chooseBranch)])};this.branchDropDown=new i.ViewModels.Obsolete.Forms.DropDown.ViewModel(this._container,this,"sourceConfiguration.branch",e);this.repositoryUrlTextBox=new i.ViewModels.Forms.TextBox.ViewModel(this._container,this,"sourceConfiguration.repositoryUrl",{label:u.observable(h.repositoryUrlTextboxLabel),infoBalloonContent:u.observable(h.repositoryUrlTextboxHelpText),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.repositoryUrlTextboxValidationText),new i.ViewModels.UriValidation(h.repositoryUrlTextboxValidationText)]),labelPosition:u.observable(i.ViewModels.Forms.LabelPosition.Top)});this.branchTextBox=new i.ViewModels.Forms.TextBox.ViewModel(this._container,this,"sourceConfiguration.branch",{label:u.observable(h.branchTextboxLabel),labelPosition:u.observable(i.ViewModels.Forms.LabelPosition.Top),infoBalloonContent:u.observable(h.branchTextboxHelpText),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.branchValidationText)])});this.isPrivateRepoOptionsGroup=new i.ViewModels.Forms.OptionsGroup.ViewModel(this._container,this,"sourceConfiguration.isPrivateGitRepository",{label:u.observable(h.isPrivateRepoOptionGroupLabel),options:u.observableArray([{text:u.observable(h.yesText),value:!0},{text:u.observable(h.noText),value:!1}])});this.usernameTextBox=new i.ViewModels.Forms.TextBox.ViewModel(this._container,this,"sourceConfiguration.username",{label:u.observable(h.usernameTextboxLabel),labelPosition:u.observable(i.ViewModels.Forms.LabelPosition.Top)});this.passwordTextBox=new i.ViewModels.Forms.PasswordBox.ViewModel(this._container,this,"sourceConfiguration.password",{label:u.observable(h.passwordTextboxLabel),labelPosition:u.observable(i.ViewModels.Forms.LabelPosition.Top),validations:u.observableArray([new i.ViewModels.RequiredValidation(h.passwordValidationText)])});this.sourceTypeDropDown.value.subscribe(this._container,(function(t){n.addSourceProviderTelemetry(t);n._sourceType=t;n._setProviderLoadingStatus(t,null,"",!1);n._setupAccountsDropDown(n._optionLoading);n._setupProjectsDropDown(n._optionLoading);n._setupRepositoryDropDown(n._optionLoading);n._setupBranchesDropDown(n._optionLoading);n.isPrivateRepoOptionsGroup.value(null);n._initializeSection();n._updateAccount()}));this.accountDropDown.value.subscribe(this._container,(function(t){t!=null&&(n._currentAccount=t,n._setupProjectsDropDown(n._optionLoading),n._setupRepositoryDropDown(n._optionLoading),n._setupBranchesDropDown(n._optionLoading),n._updateProjects())}));this.projectDropDown.value.subscribe(this._container,(function(t){t!=null&&(n._currentProject=t,n._setupRepositoryDropDown(n._optionLoading),n._setupBranchesDropDown(n._optionLoading),n._updateRepos())}));this.repositoryDropDown.value.subscribe(this._container,(function(t){t!=null&&(n._currentRepo=t,n._setupBranchesDropDown(n._optionLoading),n._updateBranches())}));this.isPrivateRepoOptionsGroup.value.subscribe(this._container,(function(t){n._sourceType===c.ProviderType.ExternalGit&&(t?n.generalSection.children([n.sourceTypeDropDown,n.repositoryUrlTextBox,n.branchTextBox,n.isPrivateRepoOptionsGroup,n.usernameTextBox,n.passwordTextBox]):n.generalSection.children([n.sourceTypeDropDown,n.repositoryUrlTextBox,n.branchTextBox,n.isPrivateRepoOptionsGroup]))}));o={style:u.observable(3),children:u.observableArray([this.sourceTypeDropDown])};this.generalSection=new i.ViewModels.Forms.Section.ViewModel(this._container,o);this.sections.push(this.generalSection)},t.prototype._hasValidPermissions=function(n,t){var r=this,i=Q.defer();return s.ValidationUtils.getVstsPermissions(n,t).then((function(n){t.id()===r._currentProject.id()&&i.resolve({valid:n.hasPermissions,message:n.message})}),(function(){i.resolve({valid:!0,message:h.failedToValidatePermissions})})),i.promise},t.prototype.addSourceProviderTelemetry=function(n){var t;n===c.ProviderType.VSTS?t=h.vstsSourceLabel:n===c.ProviderType.GitHub?t=h.gitHubSourceLabel:n===c.ProviderType.ExternalGit?t=h.externalGitSourceLabel:n===c.ProviderType.LocalGit&&(t=h.localGitSourceLabel);p.trace({source:"ChooseSourcePartViewModel",action:"Provider-"+t})},t.prototype.mapIncomingDataForEditScopeAsync=function(n){var t=f.Deferred(),i={account:n&&n.sourceConfiguration&&n.sourceConfiguration.account?n.sourceConfiguration.account:u.observable(null),branch:n&&n.sourceConfiguration&&n.sourceConfiguration.branch?n.sourceConfiguration.branch:u.observable("master"),project:n&&n.sourceConfiguration&&n.sourceConfiguration.project?n.sourceConfiguration.project:u.observable(null),repository:n&&n.sourceConfiguration&&n.sourceConfiguration.repository?n.sourceConfiguration.repository:u.observable(null),repositoryUrl:n&&n.sourceConfiguration&&n.sourceConfiguration.repositoryUrl?n.sourceConfiguration.repositoryUrl:u.observable(null),username:n&&n.sourceConfiguration&&n.sourceConfiguration.username?n.sourceConfiguration.username:u.observable(null),password:n&&n.sourceConfiguration&&n.sourceConfiguration.password?n.sourceConfiguration.password:u.observable(null),isPrivateGitRepository:n&&n.sourceConfiguration&&n.sourceConfiguration.isPrivateGitRepository?n.sourceConfiguration.isPrivateGitRepository:u.observable(null),sourceProviderType:n&&n.sourceConfiguration&&n.sourceConfiguration.sourceProviderType?n.sourceConfiguration.sourceProviderType:u.observable(c.ProviderType.VSTS)},r={sourceConfiguration:i,oAuthSetupResult:n.oAuthSetupResult,optionalFeatures:n.optionalFeatures};return this._inputSourceConfiguration=n.sourceConfiguration,this._setupOAuthResult=n&&n.oAuthSetupResult?n.oAuthSetupResult:{},this._optionalFeatures=n.optionalFeatures||[],this._isFeatureEnabled(c.VmssFeature)&&(this.helpTextPresent(!0),this.helpText(h.vmssInformationDetailsForChooseSource)),this._setupSourceTypeDropDown(),t.resolve(r),t.promise()},t.prototype._setupSourceTypeDropDown=function(){var n=[];n.push({text:u.observable(h.vstsSourceLabel),value:c.ProviderType.VSTS});n.push({text:u.observable(h.gitHubSourceLabel),value:c.ProviderType.GitHub});this._isFeatureEnabled(c.ExternalGitFeature)&&n.push({text:u.observable(h.externalGitSourceLabel),value:c.ProviderType.ExternalGit});this._isFeatureEnabled(c.LocalGitFeature)&&n.push({text:u.observable(h.localGitSourceLabel),value:c.ProviderType.LocalGit});this.sourceTypeDropDown.options(n)},t.prototype._setupAccountsDropDown=function(n){this.accountDropDown.options([]);var t=[];t.push(n);this.accountDropDown.options(t);this.accountDropDown.value(n.value);this.accountDropDown.clearValidation()},t.prototype._setupProjectsDropDown=function(n){this.projectDropDown.options([]);var t=[];t.push(n);this.projectDropDown.options(t);this.projectDropDown.value(n.value);this.projectDropDown.clearValidation()},t.prototype._setupRepositoryDropDown=function(n){this.repositoryDropDown.options([]);var t=[];t.push(n);this.repositoryDropDown.options(t);this.repositoryDropDown.value(n.value);this.repositoryDropDown.clearValidation()},t.prototype._setupBranchesDropDown=function(n){this.branchDropDown.options([]);var t=[];t.push(n);this.branchDropDown.options(t);this.branchDropDown.value(n.value);this.branchDropDown.clearValidation()},t.prototype._returnSourceConfiguration=function(n){var t={sourceConfiguration:n.sourceConfiguration,oAuthSetupResult:this._setupOAuthResult};return t.sourceConfiguration.sourceProviderType()===c.ProviderType.LocalGit&&t.sourceConfiguration.branch("refs/heads/master"),t},t.prototype._initializeSection=function(){var n=this;this._sourceType===c.ProviderType.VSTS?this.generalSection.children([this.sourceTypeDropDown,this.accountDropDown,this.projectDropDown,this.repositoryDropDown,this.branchDropDown]):this._sourceType===c.ProviderType.GitHub?(this.generalSection.children([this.sourceTypeDropDown]),this._setProviderLoadingStatus(c.ProviderType.GitHub,5,h.oAuthCollectingInfo,!0),this._setupOAuth(null).then((function(){}),(function(){n._setProviderLoadingStatus(c.ProviderType.GitHub,3,h.oAuthSetupFailed,!1)}))):this._sourceType===c.ProviderType.ExternalGit?this._inputSourceConfiguration&&this._inputSourceConfiguration.sourceProviderType&&this._inputSourceConfiguration.sourceProviderType()===c.ProviderType.ExternalGit?(this._inputSourceConfiguration.isPrivateGitRepository&&this._inputSourceConfiguration.isPrivateGitRepository()!=null&&this.isPrivateRepoOptionsGroup.value(this._inputSourceConfiguration.isPrivateGitRepository()),this._inputSourceConfiguration.branch&&this._inputSourceConfiguration.branch()&&this.branchTextBox.value(this._inputSourceConfiguration.branch())):(this.branchTextBox.value("master"),this.isPrivateRepoOptionsGroup.value(!1)):this._sourceType===c.ProviderType.LocalGit&&this.generalSection.children([this.sourceTypeDropDown])},t.prototype._updateGitHubSection=function(){var n=this,t;this._sourceType===c.ProviderType.GitHub&&(this._setupOAuthResult&&this._setupOAuthResult.UserName&&this._setupOAuthResult.SetupToken?this.generalSection.children([this.sourceTypeDropDown,this.repositoryDropDown,this.branchDropDown]):(this.authorizeGitHubInfoBox=new w.ViewModel(this._container,!1),this.authorizeGitHubInfoBox.image=u.observable(b.Polychromatic.Info()),this.authorizeGitHubInfoBox.text=u.observable(h.gitHubAuthorizationHelpText),t={label:u.observable(h.oAuthButtonLabel),buttonText:u.observable(h.oAuthButtonText),requestUrl:u.observable(this._setupOAuthResult.AuthUrl),validations:u.observableArray([new i.ViewModels.CustomValidation(h.oAuthSetupFailed,function(t){return n._setProviderLoadingStatus(c.ProviderType.GitHub,5,h.oAuthCollectingInfo,!0),n._setupOAuth(t)})])},this.authorizeGitHubButton=new i.ViewModels.Forms.OAuthButton.ViewModel(this._container,t),this.generalSection.children([this.sourceTypeDropDown,this.authorizeGitHubInfoBox,this.authorizeGitHubButton])))},t.prototype._setupOAuth=function(n){var t=this,u={ScmType:l.ScmProviderType.GitHub,CallbackUrl:n,AuthUrl:this._setupOAuthResult.AuthUrl,SourceExtension:"AzureTfsExtension"},r=Q.defer();return i.Services.Rpc.invokeCallback("WebsitesExtension","setupOAuth",u).then((function(n){n?(t._setupOAuthResult=n,n.UserName?t._fetchOAuthToken().then((function(n){n&&(t._setupOAuthResult.SetupToken=n,t._updateGitHubSection(),t._setProviderLoadingStatus(c.ProviderType.GitHub,null,"",!1),t._updateRepos(),r.resolve({valid:!0,message:""}))}),(function(n){t._setProviderLoadingStatus(c.ProviderType.GitHub,3,h.oAuthSetupFailed,!1);r.reject(n)})):(t._updateGitHubSection(),t._setProviderLoadingStatus(c.ProviderType.GitHub,null,"",!1),r.resolve({valid:!0,message:""}))):(t._setProviderLoadingStatus(c.ProviderType.GitHub,3,h.oAuthSetupFailed,!1),r.reject({valid:!1,message:h.oAuthSetupFailed}))}),(function(n){t._setProviderLoadingStatus(c.ProviderType.GitHub,3,h.oAuthSetupFailed,!1);r.reject({valid:!1,message:n})})),r.promise},t.prototype._fetchOAuthToken=function(){return e.AppServiceArmApiUtilities.beginGetGitHubToken()},t.prototype._setProviderLoadingStatus=function(n,t,i,r){this._sourceType===n&&(this._dataContext.chooseSourceBladeState(t),this._dataContext.chooseSourceBladeStateMessage(i),this.isLoading(r))},t.prototype._updateAccount=function(){var n=this,t;this.sourceTypeDropDown.value()==c.ProviderType.VSTS&&(t=this._dataContext.rmUtils.getVSTSAccounts().done((function(t){var f,i;if(t&&t.length>0){var o=t.length,e=t[0],r="";for(n._inputSourceConfiguration&&n._inputSourceConfiguration.account&&n._inputSourceConfiguration.account()&&n._inputSourceConfiguration.account().name()&&(r=n._inputSourceConfiguration.account().name()),f=[],i=0;i<o;i++)f.push({text:u.observable(t[i].name()),value:t[i]}),r&&t[i].name()===r&&(e=t[i]);n.accountDropDown.options(f);n.accountDropDown.value(e)}else n._optionNoDataFound.text(h.noAccountsFound),n._setupAccountsDropDown(n._optionNoDataFound),n.projectDropDown.options([]),n.repositoryDropDown.options([]),n.branchDropDown.options([])})))},t.prototype._getProjects=function(n,t){var i=f.Deferred();return this._dataContext.rmUtils.getProjects(this._container,t).then((function(n){i.resolve({accountName:t,projects:n})})),i.promise()},t.prototype._updateProjects=function(){var n=this,t=this._getProjects(this._container,this._currentAccount.name());t.then((function(t){var i,e,r;if(t.accountName===n._currentAccount.name())if(i=t.projects,i&&i.length>0){i=i.stableSort((function(n,t){return v.StringUtils.ignoreCaseComparer(n.name(),t.name())}));var s=i.length,o=i[0],f="";for(n._inputSourceConfiguration&&n._inputSourceConfiguration.project&&n._inputSourceConfiguration.project()&&n._inputSourceConfiguration.project().name()&&(f=n._inputSourceConfiguration.project().name()),e=[],r=0;r<s;r++)e.push({text:u.observable(i[r].name()),value:i[r]}),f&&i[r].name()===f&&(o=i[r]);n.projectDropDown.options(e);n.projectDropDown.value(o)}else n._optionNoDataFound.text(h.noProjectsFound),n._setupProjectsDropDown(n._optionNoDataFound),n.repositoryDropDown.options([]),n.branchDropDown.options([])}))},t.prototype._updateRepos=function(){var n=this;this._getRepos().then((function(t){var o=t.length,e=t[0],r="",f,i;if(n._inputSourceConfiguration&&n._inputSourceConfiguration.repository&&n._inputSourceConfiguration.repository()&&n._inputSourceConfiguration.repository().name&&(r=n._inputSourceConfiguration.repository().name),t&&o>0){for(t=t.stableSort((function(n,t){return v.StringUtils.ignoreCaseComparer(n.name,t.name)})),f=[],i=0;i<t.length;i++)f.push({text:u.observable(t[i].name),value:t[i]}),r&&t[i].name===r&&(e=t[i]);n.repositoryDropDown.options(f);n.repositoryDropDown.value(e)}else n._optionNoDataFound.text(h.noReposFound),n._setupRepositoryDropDown(n._optionNoDataFound),n.branchDropDown.options([])}))},t.prototype._getRepos=function(){var i=this,t=Q.defer(),n=[];return this._sourceType===c.ProviderType.VSTS?(this._isFeatureEnabled(c.TfvcFeature)&&this._currentProject.tfvcEnabled()&&n.push({id:"$/{0}".format(this._currentProject.name()),name:"$/{0}".format(this._currentProject.name()),defaultBranch:"",repoUrl:"",sourceControlType:c.SourceControlType.Tfvc}),this._currentProject.gitEnabled()?this._getVstsGitRepos(this._currentAccount.id(),this._currentProject.id()).then((function(r){var e=r.projectId,f=r.repos,u;if(e==i._currentProject.id()){for(u=0;u<f.length;u++)n.push(y.VstsToContinuousIntegrationModelConverter.convertToContinuousIntegrationModelRepository(f[u],c.SourceControlType.Git));t.resolve(n)}}),(function(){t.reject({valid:!1,message:h.failedToGetRepositories})})):t.resolve(n)):this._sourceType===c.ProviderType.GitHub&&(n=this._getGitHubRepos(),t.resolve(n)),t.promise},t.prototype._getVstsGitRepos=function(n,t){var i=Q.defer();return this._dataContext.rmUtils.getVstsGitRepositories(this._container,n,t).then((function(n){i.resolve({projectId:t,repos:n})})),i.promise},t.prototype._getGitHubRepos=function(){var r=[],u,t,n,f,e,i;if(this._setupOAuthResult.Organizations&&this._setupOAuthResult.Organizations!=null)for(u=this._setupOAuthResult.Organizations.length,t=0;t<u;t++)if(n=this._setupOAuthResult.Organizations[t],n&&n.Repositories)for(f=this._getOrganizationName(n),e=n.Repositories.length,i=0;i<e;i++)r.push(a.ScmToContinuousIntegrationModelConverter.convertToContinuousIntegrationRepository(n.Repositories[i],f,c.SourceControlType.Git));return r},t.prototype._getOrganizationName=function(n){var t=n.Name,i,r;return t?(i=t.indexOf("("),i<0)?t:(r=t.lastIndexOf(")"),r<0||r<i)?t:t.substring(i+1,r):null},t.prototype._updateBranches=function(){var n=this;this._getBranches().then((function(t){var f,i;if(t&&t.length>0){t=t.stableSort((function(n,t){return v.StringUtils.ignoreCaseComparer(n.friendlyName,t.friendlyName)}));var s=t.length,e=t.filter((function(n){return n.friendlyName=="master"}))[0],o=e?e.name:t[0].name,r="";for(n._inputSourceConfiguration&&n._inputSourceConfiguration.branch&&n._inputSourceConfiguration.branch()&&(r=n._inputSourceConfiguration.branch()),f=[],i=0;i<s;i++)f.push({text:u.observable(t[i].friendlyName),value:t[i].name}),r&&r===t[i].name&&(o=t[i].name);n.branchDropDown.options(f);n.branchDropDown.value(o)}else n._optionNoDataFound.text(h.noBranchesFound),n._setupBranchesDropDown(n._optionNoDataFound)}))},t.prototype._getBranches=function(){var t=this,n=Q.defer();return this._sourceType===c.ProviderType.VSTS?this._getVstsBranches(this._currentAccount.id(),this._currentProject.id(),this._currentRepo).then((function(i){var r=i.repoId,u=i.branches;r==t._currentRepo.id&&n.resolve(u)})):this._sourceType===c.ProviderType.GitHub&&this._getGitHubBranches(this._currentRepo.id).then((function(i){var r=i.repoId,u=i.branches;r==t._currentRepo.id&&n.resolve(u)})),n.promise},t.prototype._getVstsBranches=function(n,t,i){var r=Q.defer();return this._dataContext.rmUtils.beginGetVstsBranches(n,t,i).then((function(n){r.resolve({repoId:i.id,branches:n})})),r.promise},t.prototype._getGitHubBranches=function(n){var i="token {0}".format(this._setupOAuthResult.SetupToken),t=Q.defer();return this._dataContext.rmUtils.beginGetAllGitHubBranches(n,i).then((function(i){t.resolve({repoId:n,branches:i})})),t.promise},t.prototype._isFeatureEnabled=function(n){return i.findIndex(this._optionalFeatures,(function(t){return t.toUpperCase()===n.toUpperCase()}))>=0||o.ReleaseManagementUtils.isFeatureEnabled(n)},t})(i.ViewModels.Forms.Form.ViewModel);t.ChooseSourcePartViewModel=k}));
define("_generated/Blades/ChooseSourceBlade",["require","exports","f","_generated/Blades/VersionControl.css","ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/ChooseSourceBladeViewModel","ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/ChooseSourceActionBar","ReleaseManagement/TypeScript/ViewModels/ContinuousIntegration/ChooseSourcePartViewModel"],(function(n,t,i,r){"use strict";var u;return (function(n){n.blade={name:"ChooseSourceBlade",viewModelName:"ReleaseManagement$ChooseSourceBladeViewModel",lenses:[{name:"ChooseSourceLens",partInstances:[{name:"ChooseSourcePart",inline:{styleSheets:[{file:"Blades/VersionControl.css",content:r}],viewModel:"ReleaseManagement$ChooseSourcePartViewModel",partKind:0,inputs:[],bindings:[],details:[],initialSize:9,supportedSizes:[9],htmlTemplateInline:{file:"ChooseSource.html",content:'<div class="msportalfx-form msportalfx-form-full"> <div data-bind="visible: helpTextPresent()"> <div data-bind="html: helpText"><\/div> <br/> <\/div> <div data-bind="formElement: generalSection"> <\/div> <div data-bind="image: MsPortalFx.Base.Images.Loading.EllipsisSquare(), visible: isLoading()" style="width: 40px; margin: 0px auto"> <\/div> <\/div>'}},parameterProvider:!0}]}],width:0,locked:!0,actionBar:{name:"genericActionBar",actionBarKind:6,viewModel:"ReleaseManagement$ChooseSourceActionBar",bindings:[{property:"valid",valuesFrom:[{referenceType:0,property:"content.isFormValid",part:"ChooseSourcePart"}]}]},attributes:0}})(u||(u={})),u}))