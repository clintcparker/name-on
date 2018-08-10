define("VersionControl/TypeScript/Resources/TFS.Resources.VersionControl",["require","exports","o"],(function(n,t,i){"use strict";i.defineProperty(t,"__esModule",{value:!0});t.AuthoredByFormat="Authored by {0}";t.AuthoredByProperty="Authored By";t.BinaryFileContentModified="The binary file content was modified.";t.BinaryFileContentNotChanged="The binary file content was not changed.";t.BinaryFileContentFormat="{0} contains binary content.";t.BranchAhead="{0} Ahead";t.BranchBehind="{0} Behind";t.BranchTitle="{0} Branch";t.ChangeDetailsBladeTitle="Change Details";t.ChangeListComment="Comment";t.ChangeListCommittedMessage="Changeset {0} committed successfully";t.ChangeListSummaryNoRowsMessageCommit="No work items associated with this commit";t.ChangeListSummaryNoRowsMessageChangeset="No work items associated with this changeset";t.ChangeListSummaryNoRowsMessageShelveset="No work items associated with this shelveset";t.Changeset="Changeset";t.ChangesetDetailsTitle="Changeset {0}";t.ChangesetLinkTextSimple="Changeset {0}";t.Changesets="Changesets";t.ChangesetsNoRowsMessage="There are no changesets";t.ChangesetVersionDisplayText="as of changeset {0}";t.ChangesetVersionLabel="Changeset {0}";t.ChangeTypeAdd="add";t.ChangeTypeBranch="branch";t.ChangeTypeDelete="delete";t.ChangeTypeEdit="edit";t.ChangeTypeFileType="encoding";t.ChangeTypeLock="lock";t.ChangeTypeMerge="merge";t.ChangeTypeNone="none";t.ChangeTypeProperty="property";t.ChangeTypeRename="rename";t.ChangeTypeRollback="rollback";t.ChangeTypeSourceRename="source rename";t.ChangeTypeUndelete="undelete";t.ChangeVersionDisplayText="Changeset {0}";t.ChangingDefaultRepositoryWarning="Note that some versions of Visual Studio require a repository with the same name as the team project for full Team Explorer integration.";t.ClickToDownloadMessage="Click to download this file to your computer.";t.ClickToDownloadMessageOriginal="Click to download the original file contents to your computer.";t.ClickToDownloadMessageModified="Click to download the modified file contents to your computer.";t.Code="Code";t.CodeExplorerDesc="Browse your source code, edit files, and view history";t.CodeFavorites="Code Favorites";t.ComittedByProperty="Comitted By";t.CommitBarChartTitle="Commits / {0}";t.CommitCommentPartLabel="Comment";t.CommitCommentPartValidation="A comment is required.";t.CommitCommentPartWatermark="Summarize your commit";t.CommitCommittedMessage="Commit {0} committed successfully";t.CommitDescriptionFormat="commit {0}";t.CommitDetailsLabel="Commit";t.CommitDetailsTitle="commit {0}";t.CommitFilenameColumnLabel="name";t.CommitLinkText="Commit {0}";t.CommitMessage="Commit {0}";t.CommitOwnerDisplayNameFormat="{0} <{1}>";t.Commits="Commits";t.CommitsBladeBranchTitle="Commits / {0}";t.CommitsBladeItemHistoryTitle="{0} History";t.CommitsBladeTitle="Commits";t.CommitSubTitle="Commit";t.CommitsNoRowsMessage="There are no commits";t.CommitVersionDisplayText="Commit {0}";t.ConfirmRepositoryDelete='Are you sure you want to delete the "{0}" repository? This action is unrecoverable.';t.ContentJsonParseErrorTFS="Failed to parse the file contents. This is likely caused by the file encoding type set on this file in TFS not matching the actual encoding of the file. You can use the tf checkout command on this file with the /encoding argument to change the file encoding used by TFS.";t.CreateNewRepository="Create new repository";t.DateVersionDisplayText="As of '{0}'";t.DeleteRepositoryMenuItem="Delete repository";t.DescriptionProperty="Description";t.Favorites="Favorites";t.FilesBladeSubTitle="Commit {0} ({1})";t.FilesBladeTitle="Files";t.FilesDifferInWhiteSpace="The files are different in whitespace only.";t.FilesIdentical="The files are identical.";t.Folder="Folder";t.InvalidItems="InvalidItems";t.InvalidPath="Invalid path";t.LabelVersionDisplayText="Label '{0}'";t.LatestVersionDisplayText="Latest";t.LatestVersionedItemLinkText="Latest version of {0}";t.LinkedWorkItemsLabel="Work item links";t.LoadingLabel="Loading...";t.LoadingText="Loading...";t.MergeSourceVersionDisplayText="Merge source for changeset {0}";t.NewRepositoryBlade="New Repository";t.NewRepositryWatermark="Enter a repository name...";t.NoRepositoryByIdError='No repository found in this project with id "{0}".';t.NoResults="There are no results to display.";t.NotAssignedLabel="Unassigned";t.PreviousVersionDisplayText="Previous version of {0}";t.ReadMeDefaultText="Want to include a Readme file? Add an html formatted text file named README.html to the root of your repository and your content will appear here.";t.RecentChangesetsTitle="Recent changesets";t.RecentChangesTitle="Recent changes";t.RecentCommitsTitle="Recent commits";t.RenamedFromFormat="renamed from {0}";t.Repositories="Repositories (Preview)";t.RepositoryAlreadyExists="A repository with this name already exists.";t.RepositoryName="Repository name";t.RepositoryNameInvalidCharacter="Repository name contains an invalid character.";t.RepositoryNameLabel="Name of New Repository";t.RepositoryNameValidationFailed="Failed to validate the repository name.";t.RepositryNameInvalid="Repository name is invalid.  It must be less than 65 characters and not begin with a . or _";t.Shelveset="Shelveset";t.Shelvesets="Shelvesets";t.ShelvesetAuthoredByLabel="Authored by";t.ShelvesetAuthorsListWatermark="Select a user...";t.ShelvesetsNoRowsMessage="There are no shelvesets for this user";t.ShelvesetsNotApplicableWithGit="Shelvesets are not applicable with Git";t.ShelvesetDetailsTitle="Shelveset {0}";t.ShelvesetLinkText="Shelveset {0}";t.ShelvesetVersionDisplayText="Shelveset '{0};{1}'";t.ShelvesetVersionTitle="Shelveset {0}";t.SourceItem_Discard_ConfirmTitle="Discard";t.SourceItem_Discard_ConfirmMessage="Are you sure you want to discard your changes?";t.SourceItem_LoadFailed_Message="Could not load the source item";t.TagVersionDisplayText="Tag {0}";t.TeamLabel="Team";t.TipVersionDisplayText="Tip version of {0}";t.VersionedItemLinkText="Version {0} of {1}";t.VersionSpecPathFormat="{0} ({1})";t.YouLabel="You";t.NoDataInSourceTree="This repository is empty.";t.ProjectWizardStepUseExistingRepositoryTitle="Use an existing repository";t.ProjectWizardStepUseExistingRepositorySubtitle="Got it? Use It.";t.ProjectWizardStepNoRepositories="There are no repositories available";t.ProjectWizardStepUseExistingBranchTitle="Use an existing branch";t.ProjectWizardStepUseExistingBranchSubtitle="Got it? Use It.";t.ProjectWizardStepNoBranches="There are no branches available";t.CommitFilterSearchText="Search...";t.CommitFilterAuthoredByLabel="Authored by";t.CommitFilterAuthoredByWatermark="Select a user...";t.CommitFilterDateLabel="Timeframe";t.CommitFilterDateAll="All";t.CommitFilterDateToday="Today";t.CommitFilterDate24Hours="24 Hours";t.CommitFilterDate7Days="7 Days";t.CommitFilterDate14Days="14 Days";t.CommitFilterDate28Days="28 Days";t.CommitFilterServerItemLabel="Path";t.CommitFilterServerItemText="Folder";t.CommitFilterBladeTitle="Folder";t.ChooseRepositoryBladeTitle="Select a repository";t.ChooseBranchBladeTitle="Select a branch";t.CloneInformationBladeTitle="Clone";t.CloneInformationStep1Header="Clone your repository";t.CloneInformationStep1Desc="If you are starting on an entirely new project, you can clone the empty repository to your local machine and then work locally before pushing changes back to the server.";t.CloneInformationStep2Header="From Visual Studio";t.CloneInformationStep2Desc='You can <a href="https://go.microsoft.com/fwlink/?LinkId=328678" target="_blank">clone<\/a> a repository after connecting with Team Explorer.';t.CloneInformationStep3Header="From the command line";t.CloneInformationStep3DescA="You can clone the project using the following command:";t.CloneInformationStep3DescB='Note, before you can use the command line, you will need to <a href="https://go.microsoft.com/fwlink/?LinkId=328679" target="_blank">enable basic authentication<\/a> for your account.';t.VersionControlCodeProperty="Version control: {0}";t.RepositoryCodeProperty="Repository: {0}";t.PushededByProperty="Pushed By";t.RepositoryInformationBladeSubtitle="Repository (Preview)";t.AddCodeToRepositoryToStart="Add code to your repository to get started";t.ClickToLearnHowToAddRepositoryToStart="Click here to learn how to add code to your project";t.FilterRepositoriesWatermark="Filter repositories...";t.FilterBranchesWatermark="Filter branches...";t.CodeReviewLinkText="Code review {0}"}))