define("Reports/Utilities/ReportsUtilities",["require","exports","f","o","ko","CommonConstants","Reports/ReportsResources","MsPortalFx/Globalization","Reports/Constants","CommonConstants"],(function(n,t,i,r,u,f,e,o,s,h){"use strict";function b(){var n=c("isReportingEnabled");return n?!!n:!1}function k(n){return n===h.PremiumLevel.P1||n===h.PremiumLevel.P2}function l(n){return new Date(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0)}function d(n,t,i,r,u,s){var v=!n?e.signInEventsPrefix:n,c,l,h,a;if(c=!t?"":e.signInEventsToApplication.format(t),l=!i?"":e.signInEventsByUser.format(i),!!r){switch(r){case f.DateRangePickerValues.Last24Hours:h=e.signInEventsDateRange24Hours;break;case f.DateRangePickerValues.Last7Days:h=e.signInEventsDateRange7Days;break;case f.DateRangePickerValues.Last1Month:h=e.signInEventsDateRange1Month;break;default:h=null}!h||(h=e.signInEventsDuringTimeRange.format(h))}return a=!!u&&!!s?e.signInEventsBetweenDateTime.format(u.toString(o.DateTimeFormat.shortDatePattern),s.toString(o.DateTimeFormat.shortDatePattern)):"",v.format(l,c,!h?a:h)}function g(n,t){var i=typeof n=="string"?new Date(n.replaceAll('"',"")):n,r=typeof t=="string"?new Date(t.replaceAll('"',"")):t;return e.timeRangeTitleFormat.format(i.toLocaleDateString(o.formatCulture),r.toLocaleDateString(o.formatCulture))}function nt(n,t){if(!n||isNaN(Date.parse(n))){if(!t)return l(new Date);var i=l(new Date);return i.setDate(i.getDate()-t),i}return new Date(n)}function tt(n,t,i){var a=Date.now(),o=!1,h=new Date(a),r=l(h),e,c;switch(n){case f.DateRangePickerValues.Last24Hours:r.setDate(r.getDate()-s.Values.SingleDay);o=!0;break;case f.DateRangePickerValues.Last7Days:r.setDate(r.getDate()-s.Values.DaysInWeek);o=!0;break;case f.DateRangePickerValues.Last1Month:r.setDate(r.getDate()-s.Defaults.SignInsTimePeriodinDays);o=!0;break;default:r.setDate(r.getDate()-s.Defaults.SignInsTimePeriodinDays);o=!1}return e={startDateTime:u.observable(r),endDateTime:u.observable(h)},o||(!i||e.endDateTime(i),t?e.startDateTime(t):(c=e.endDateTime(),e.startDateTime().setDate(c.getDate()-s.Defaults.SignInsTimePeriodinDays))),e}function it(n,t){return!!t&&n.some((function(n){return n.value===t}))}function rt(n){var t=[];return!!n.city()&&n.city().trim().length>0&&t.push(n.city()),!!n.state()&&n.state().trim().length>0&&t.push(n.state()),!!n.country()&&n.country().trim().length>0&&t.push(n.country()),t.join(s.Format.joinSeparator)}function ut(n){return n.toLocaleString()}function ft(n){var t;return!!n.name()&&n.name().trim().length>0?t=n.name():!!n.userPrincipalName()&&n.userPrincipalName().trim().length>0?t=n.userPrincipalName():!!n.objectId()&&n.objectId().trim().length>0&&(t=n.objectId()),t}function et(n){var t=[],i="{0} : {1}";return!!n&&n.length>0&&n.forEach((function(n){var u,r;u=!!n.targetResourceType()&&n.targetResourceType().trim().length>0?n.targetResourceType():"";!!n.name()&&n.name().trim().length>0?r=n.name():!!n.userPrincipalName()&&n.userPrincipalName().trim().length>0?r=n.userPrincipalName():!!n.objectId()&&n.objectId().trim().length>0?r=n.objectId():!!n.servicePrincipalName()&&n.servicePrincipalName().trim().length>0&&(r=n.servicePrincipalName());r?t.push(i.format(u,r)):t.push(u)})),t.join(s.Format.joinSeparator)}function ot(n){var t=new Error;t.name=!n||!n.errorData||!n.errorData.responseJSON||!n.errorData.responseJSON.ClientData||!n.errorData.responseJSON.ClientData.errorCode?s.ReportAPIErrorCodes.Unkown:n.errorData.responseJSON.ClientData.errorCode;switch(t.name){case s.ReportAPIErrorCodes.Authentication_RequestFromNonPremiumTenantOrB2CTenant:t.message=e.noAccessForFreeTenantMessage;break;case s.ReportAPIErrorCodes.Authentication_RequestFromUnsupportedUserRole:t.message=e.noAccessForNonAdminMessage;break;default:t.message=e.errorInServerCall}return t}function st(){return c("portalUri")}function ht(){return new i.ViewModels.CustomValidation(e.customDateFutureDateMessage,function(n){var t=new Date;return t.setHours(23,59,59,99),Q({valid:n<=t,message:e.customDateFutureDateMessage})})}function ct(n){return new i.ViewModels.CustomValidation(e.customDateLastXDaysMessage.format(n),function(t){var i=new Date((new Date).getTime()-n*s.Values.DayInMs);return i.setHours(0,0,0,0),Q({valid:t>=i,message:e.customDateLastXDaysMessage.format(n)})})}function a(){return{valid:!0,message:""}}function v(n,t){return{valid:n<t,message:e.customDateStartBeforeEndMessage}}function y(n,t){return t.value()}function p(n){return n}function lt(n,t,r,u){var f,o;return n?(f=p,o=y):(f=y,o=p),new i.ViewModels.CustomValidation(e.customDateStartBeforeEndMessage,function(n){var s,h=u(),i=f(n,t),e=o(n,r);return s=h?i===undefined?a():e===undefined?a():v(i,e):v(i,e),Q(s)})}function at(n,t){return new i.ViewModels.CustomValidation(e.customDateStartBeforeEndMessage,function(){return Q({valid:n.value()<t.value(),message:e.customDateStartBeforeEndMessage})})}function vt(){return c("signInsMFAEnabled")}var c,w;r.defineProperty(t,"__esModule",{value:!0});c=i.getEnvironmentValue;t.isReportingEnabled=b;t.isPremiumUser=k;t.removeTimeComponent=l;t.generateDescription=d;t.customDateTimeTitle=g;t.getDefaultDateTime=nt;t.calculateStartAndEndDateTime=tt;t.isValidOption=it;t.getLocationAsString=rt;t.getDateTimeInLocaleFormattedString=ut;t.getActorAsString=ft;t.getTargetsAsString=et;t.processReportingAPIError=ot;t.getPortalBaseUri=st;t.futureDateTimeValidation=ht;t.withinXDaysValidation=ct;t.startBeforeEndDateValidationContract=lt;t.startBeforeEndDateValidation=at;w=(function(){function n(n){this._allOptionGroups=n?n:[];this._restrictions={}}return n.prototype.setAllOptions=function(n){this._allOptionGroups=n},n.prototype.restrict=function(n,t){var i,r;t!==s.Audit.Options.all&&t!=null&&(t.indexOf(";")>-1?(r=this._filterMultipleValues(n,t.split(";")),i=r._allOptionGroups):(i=[],this._allOptionGroups.forEach((function(r){r[n]===t&&i.push(r)}))),i.length!==0&&(this._allOptionGroups=i,!this._restrictions[n]||this._restrictions[n].indexOf(t)!==-1?this._restrictions[n]=[t]:this._restrictions[n].push(t)))},n.prototype.filter=function(t,i){var r,u;return i===s.Audit.Options.all||i==null?this:i.indexOf(";")>-1?this._filterMultipleValues(t,i.split(";")):(r=[],this._allOptionGroups.forEach((function(n){n[t]===i&&r.push(n)})),r.length===0?this:(u=new n(r),u._restrictions=this._restrictions,u))},n.prototype._filterMultipleValues=function(t,i){var r=[],u;return this._allOptionGroups.forEach((function(n){i.indexOf(n[t])>-1&&r.push(n)})),r.length===0?this:(u=new n(r),u._restrictions=this._restrictions,u)},n.prototype.getValidOptions=function(n){var t=[],i={},r;return this._allOptionGroups.forEach((function(r){var f=r[n];i[f]||t.push({text:u.observable(f),value:f});i[f]=!0})),t.length>1&&(r=this._restrictions[n]?this._restrictions[n].join(";"):s.Audit.Options.all,t.unshift({text:u.observable(e.allFilterOption),value:r})),t},n})();t.DependentFilterOptions=w;t.isMFAColumnsEnabled=vt}))