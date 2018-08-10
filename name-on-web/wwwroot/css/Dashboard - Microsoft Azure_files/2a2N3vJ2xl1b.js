define("Users/Utilities/UsersUtils",["require","exports","o","ko","$","Users/UsersResources","Users/Constants"],(function(n,t,i,r,u,f,e){"use strict";function o(n){var f=new n.constructor,t,e,i;for(t in n)if(e=n[t],r.isObservable(e)){if(i=e(),u.type(i)==="object"){f[t]=r.observable(o(i));continue}f[t]=r.observable(i)}return f}function s(n){return n.constructor.toString().match(/\w+/g)[1]}function h(n){var t=null;switch(n){case e.userSourceTypes.onPrem:t=f.sourceOfAuthorityWindowsServerAD;break;case e.userSourceTypes.externalOrgId:t=f.userSourceExternalOrgID;break;case e.userSourceTypes.liveId:t=f.userSourceLiveID;break;case e.userSourceTypes.cloud:t=f.userSourceCloud;break;case e.userSourceTypes.invitedUser:t=f.userSourceInvitedUser;break;default:t=f.userSourceUknown}return t}function c(n){return n.userType()===e.userTypes.guest?f.guestUserType:n.userType()===e.userTypes.member||n.userType()===""||n.userType()===null?f.memberUserType:f.otherUserType}i.defineProperty(t,"__esModule",{value:!0});t.cloneObject=o;t.getClassName=s;t.getUserSourceOfAuthorityText=h;t.getDisplayUserTypeFromUserType=c}))