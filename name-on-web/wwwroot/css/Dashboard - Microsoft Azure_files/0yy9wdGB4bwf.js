define("Policies/Utilities/StringHelpers",["require","exports","f","o"],(function(n,t,i,r){"use strict";function o(n,t,i){return n===1?t:i}function s(n,t){n=n||"";t=t||"";var i=n.toLowerCase(),r=t.toLowerCase();return i<r?-1:i>r?1:0}function h(n,t){return n<t?-1:n>t?1:0}function c(n,t){return n=n.toLowerCase(),e(n,t)}function e(n,t){return t=t.toLowerCase(),t.indexOf(n)}function u(n){return!n||!n.trim()}function l(n,t){return u(n)?t:n}function f(){return i.newGuid()}function a(n){return n?n+f():f()}function v(n){return u(n)?"":n.charAt(0).toUpperCase()+n.slice(1)}function y(n){return i.isNullOrUndefined(n)||i.isNullOrWhiteSpace(n)}r.defineProperty(t,"__esModule",{value:!0});t.singularPlural=o;t.caseInsensitiveComparison=s;t.caseSensitiveComparison=h;t.indexOfCaseInsensitive=c;t.indexOfCaseInsensitiveFast=e;t.isNullOrWhiteSpace=u;t.getValueWithDefault=l;t.createGuid=f;t.createDuid=a;t.capitalizeFirstChar=v;t.noIdPassed=y}))