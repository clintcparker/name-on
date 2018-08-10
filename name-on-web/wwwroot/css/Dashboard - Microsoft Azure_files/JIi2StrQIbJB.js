define("ReleaseManagement/TypeScript/Models/ContinuousIntegrationModel",["require","exports","o","ko"],(function(n,t,i,r){"use strict";var o,s,h,c,u,f,e,l;i.defineProperty(t,"__esModule",{value:!0});t.TfvcFeature="Tfvc";t.ExternalGitFeature="ExternalGit";t.LocalGitFeature="LocalGit";t.LinuxWebAppFeature="LinuxWebapp";t.VmssFeature="VirtualMachineScaleSet";t.PythonFramework={Bottle:"Bottle",Django:"Django",Flask:"Flask"};t.RubyFramework={Rails:"Rails"};t.GoFramework={Simple:"Simple"};t.TaskRunner={None:"None",Gulp:"Gulp",Grunt:"Grunt"};t.WebAppFramework={AspNetWap:"AspNetWap",AspNetCore:"AspNetCore",Node:"Node",PHP:"PHP",Python:"Python",StaticWebapp:"StaticWebapp",Ruby:"Ruby",Go:"Go"};t.ImageSource={Builtin:"Built-in",Registry:"Registry"},(function(n){n[n.None=0]="None";n[n.VSTSRM=1]="VSTSRM";n[n.Kudu=2]="Kudu"})(o=t.ScmType||(t.ScmType={})),(function(n){n[n.Deployment=0]="Deployment";n[n.SlotSwap=1]="SlotSwap";n[n.CDDeploymentConfiguration=2]="CDDeploymentConfiguration";n[n.CDSlotCreation=3]="CDSlotCreation";n[n.CDTestWebAppCreation=4]="CDTestWebAppCreation";n[n.CDAccountCreated=5]="CDAccountCreated";n[n.CDDisconnect=6]="CDDisconnect";n[n.StartAzureAppService=7]="StartAzureAppService";n[n.StopAzureAppService=8]="StopAzureAppService";n[n.RestartAzureAppService=9]="RestartAzureAppService";n[n.Other=10]="Other";n[n.Sync=11]="Sync";n[n.LocalGitCdConfiguration=12]="LocalGitCdConfiguration"})(s=t.KuduLogMessageType||(t.KuduLogMessageType={})),(function(n){n[n.None=0]="None";n[n.VSTS=1]="VSTS";n[n.GitHub=2]="GitHub";n[n.BitbucketGit=3]="BitbucketGit";n[n.Tfs=4]="Tfs";n[n.ExternalGit=5]="ExternalGit";n[n.LocalGit=6]="LocalGit"})(h=t.ProviderType||(t.ProviderType={})),(function(n){n[n.Undefined=0]="Undefined";n[n.Git=1]="Git";n[n.Tfvc=2]="Tfvc"})(c=t.SourceControlType||(t.SourceControlType={}));u=(function(){function n(){this.imageConfiguration=r.observable();this.sourceConfiguration=r.observable();this.buildConfiguration=r.observable();this.teamConfiguration=r.observable();this.testEnvironmentConfiguration=r.observable();this.deploymentSlotConfiguration=r.observable();this.oAuthSetupResult=r.observable()}return n})();t.SetupCDData=u;f=(function(){function n(){this.sourceConfiguration=r.observable();this.deployConfiguration=r.observable();this.teamServicesConfiguration=r.observable();this.oAuthSetupResult=r.observable()}return n})();t.VmssSetupCDData=f;e=(function(){function n(){this.hasPermissions=!0;this.message=""}return n})();t.BuildReleasePermissions=e,(function(n){n[n.Undefined=0]="Undefined";n[n.Configured=1]="Configured";n[n.NotConfigured=2]="NotConfigured";n[n.Configuring=3]="Configuring";n[n.Disconnecting=4]="Disconnecting"})(l=t.ContinuousDeliveryStatus||(t.ContinuousDeliveryStatus={}))}))