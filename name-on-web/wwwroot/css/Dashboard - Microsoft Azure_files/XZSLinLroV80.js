define("Shared/Utilities/StringHelpers",["require","exports","o"],(function(n,t,i){"use strict";function u(n,t,i){return n===1?t:i}function f(n,t){n=n||"";t=t||"";var i=n.toLowerCase(),r=t.toLowerCase();return i<r?-1:i>r?1:0}function e(n,t){return n<t?-1:n>t?1:0}function r(n){return!n||!n.trim()}function o(n,t){return r(n)?t:n}function s(n){return r(n)?"":n.charAt(0).toUpperCase()+n.slice(1)}i.defineProperty(t,"__esModule",{value:!0});t.singularPlural=u;t.caseInsensitiveComparison=f;t.caseSensitiveComparison=e;t.isNullOrWhiteSpace=r;t.getValueWithDefault=o;t.capitalizeFirstChar=s}))