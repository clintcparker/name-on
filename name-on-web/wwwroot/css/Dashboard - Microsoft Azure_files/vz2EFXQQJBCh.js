define("ReleaseManagement/TypeScript/Converters/ScmToContinuousIntegrationModelConverter",["require","exports","o"],(function(n,t,i){"use strict";i.defineProperty(t,"__esModule",{value:!0});var r=(function(){function n(){}return n.convertToContinuousIntegrationRepository=function(n,t,i){var r=t?t+"/"+n.name:n.name;return{id:r,name:r,defaultBranch:n.default_branch,repoUrl:n.repo_url,sourceControlType:i}},n})();t.ScmToContinuousIntegrationModelConverter=r}));
define("ReleaseManagement/TypeScript/Models/ScmModels",["require","exports","o"],(function(n,t,i){"use strict";i.defineProperty(t,"__esModule",{value:!0});var r;(function(n){n[n.None=0]="None";n[n.Tfs=1]="Tfs";n[n.LocalGit=2]="LocalGit";n[n.GitHub=3]="GitHub";n[n.CodePlexGit=4]="CodePlexGit";n[n.CodePlexHg=5]="CodePlexHg";n[n.BitbucketGit=6]="BitbucketGit";n[n.BitbucketHg=7]="BitbucketHg";n[n.Dropbox=8]="Dropbox";n[n.ExternalGit=9]="ExternalGit";n[n.ExternalHg=10]="ExternalHg";n[n.CodePlex=11]="CodePlex";n[n.Bitbucket=12]="Bitbucket";n[n.External=13]="External";n[n.OneDrive=14]="OneDrive";n[n.VSO=15]="VSO";n[n.VSTSRM=16]="VSTSRM"})(r=t.ScmProviderType||(t.ScmProviderType={}))}))