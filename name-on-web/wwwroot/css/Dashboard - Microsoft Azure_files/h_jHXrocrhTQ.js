define("Licenses/Constants",["require","exports","o"],(function(n,t,i){"use strict";i.defineProperty(t,"__esModule",{value:!0});t.LicensesOverviewResourceTag="licensing_overview";t.topQueryValue=20;t.maxGroupsWithErrorsQueryTopValue=100;t.groupsWithErrorsQueryTopValue=25;t.provisioningStatus={disabled:"disabled",success:"success"};t.memberTypes={user:1,group:2};t.licenseAssignmentTypes={direct:1,inherited:2,directAndInherited:3};t.productNames={aadPremium:"AAD",ems:"EMS"};t.licenseAssignmentStatusType={active:"active",activeWithError:"activewitherror",error:"error"};t.licenseAssignmentErrorType={none:"none",mutuallyExclusiveViolation:"mutuallyexclusiveviolation",countViolation:"countviolation",otherViolation:"other",dependencyViolation:"dependencyviolation",prohibitedUsageLocationViolation:"prohibitedinusagelocationviolation",uniquenessViolation:"uniquenessviolation"};t.groupLicenseProcessingStatuses={unknown:"Unknown",ready:"Ready",queued:"Queued",processing:"Processing"};t.groupType={security:"security",mailEnabledSecurity:"mailenabledsecurity"};t.licensesGridItemKeys={name:"displayName",userName:"upn",state:"state",enabledServices:"enabledPlans",assignmentPaths:"assignment",accountSkuName:"accountSkuName",productName:"name",consumedUnits:"consumedUnits",availableUnits:"availableUnits",warningUnits:"warningUnits"};t.licensesCommandKeys={add:"Add",tryBuy:"TryBuy"}}))