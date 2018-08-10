define("Shared/Utilities/InvalidControls",["require","exports","o","ko"],(function(n,t,i,r){"use strict";function f(n,t,i){var r;t.subscribe(n,(function(t){r&&r.dispose();r=n.createChildLifetime();i(r,t)}))}function o(n,t){var i=r.observable();return e(n,t,i),i}function e(n,t,i){f(n,t,(function(n,t){var r=t.map((function(n){return n.valid}));u(n,r,i)}))}function s(n,t){var i=r.observable();return u(n,t,i),i}function u(n,t,i){r.reactor(n,t,(function(){for(var r,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];n&&n.length>0?(r=!0,n.forEach((function(n){return r=r&&n})),i(!r)):i(!0)}))}i.defineProperty(t,"__esModule",{value:!0});t.watchWithChild=f;t.watchControls=o;t.watchControlsFor=e;t.watchProperties=s;t.watchPropertiesFor=u}));
define("Shared/FilterableColumns/ColumnsAndFilters",["require","exports","f","o","ko","Shared/FilterableColumns/ColumnChooserBlade","CommonConstants","Shared/Utilities/InvalidControls"],(function(n,t,i,r,u,f,e,o){"use strict";function s(n,t){return i.findIndex(n,(function(n){return n===t}))>=0}function c(n,t,r,e){var h=u.observableArray(),a=u.observableArray(),c=r.map((function(n){var r=n.filters,t=n.column,i=t.id;if(!i||i.trim().length<=0)throw new Error("Each column must have an ID on it. name: '"+t.name+"', itemKey: '"+t.itemKey+"'.");return{id:t.id,column:t,filters:r,selectable:n.selectable,shown:n.shown}})),v=u.observableArray(),y,p=function(n){var i=c.filter((function(t){return s(n,t.id)})),t=r.filter((function(t){var i=t.column.id;return s(n,i)})),u=t.map((function(n){var t=n.column;return{id:t.id,infoBalloonText:n.infoBalloonText,name:t.name,selectable:n.selectable}}));y=t.filter((function(n){return n.shown&&!n.selectable})).map((function(n){return n.column.id}));a(i);v(u)};t.subscribe(n,p);p(t());var w=u.observableArray(),b=u.observableArray(),l=u.observableArray(),k=function(n,t){var i=t.id;return s(n,i)||s(y,i)},d=o.watchControls(n,l);u.reactor(n,[h,a],(function(n,t){var f=t.filter((function(t){return k(n,t)})),r,u;w(f.map((function(n){return n.column})));r=t.filter((function(t){var i=t.filters;return i&&(k(n,t)||i.alwaysVisible)})).map((function(n){return n.filters}));b(r);u=i.mapMany(r,(function(n){return n.controls}));l(u.map((function(n){return n.control})))}));e&&e.length>0?h(e):h(c.filter((function(n){return n.shown})).map((function(n){return n.id})));var g=f.buildColumnsButton(n,v,h,null),nt=function(n){var i=b(),t=!0;return i.forEach((function(i){t=i.express(n)&&t})),t},tt=function(){for(var r,i,n=0,t=c;n<t.length;n++)r=t[n],i=r.filters,i&&i.reset()};return{columnsCommand:g,filterList:l,invalid:d,selectedColumns:w,expressFilterState:nt,resetFilterState:tt}}function l(n,t,i){var r=t.map(n,(function(n,t){var u=t.filters,i=t.column,r=i.id;if(!r||r.trim().length<=0)throw new Error("Each column must have an ID on it. name: '"+i.name+"', itemKey: '"+i.itemKey+"'.");return{id:i.id,column:i,filters:u,selectable:t.selectable,shown:t.shown}}));return u.computed(n,[i,r],(function(n,t){return t.filter((function(t){return s(n,t.id)}))}))}function a(n,t,i){var r=u.observableArray(),f,e;return i&&i.length>0?r(i):(f=!1,e=function(n){var i,t;!f&&n&&n.length>0&&(i=r(),i&&i.length>0?f=!0:(t=n.filter((function(n){return n.shown})).map((function(n){return n.id})),t&&t.length>0&&(f=!0,r(t))))},t.subscribe(n,e),e(t())),r}function v(n,t,i,r){var e=u.observableArray(),o=function(n){var t=n.map((function(n){var t=n.column;return{id:t.id,infoBalloonText:n.infoBalloonText,name:t.name,selectable:n.selectable}}));e(t)};return t.subscribe(n,o),o(t()),f.buildColumnsButton(n,e,i,r)}function h(n,t){var i=t.id;return s(n,i)||t.shown&&!t.selectable}function y(n,t,r){var f=u.observableArray(),e=u.observableArray(),o=u.observableArray();return u.reactor(n,[r,t],(function(n,t){var s=t.filter((function(t){return h(n,t)})),r,u;f(s.map((function(n){return n.column})));r=t.filter((function(t){var i=t.filters;return i&&(h(n,t)||i.alwaysVisible)})).map((function(n){return n.filters}));e(r);u=i.mapMany(r,(function(n){return n.controls}));o(u.map((function(n){return n.control})))})),{columns:f,filters:e,controls:o}}function p(n,t){var u=t.columns,r=l(n,u,t.choosableIds),f=a(n,r,t.chosenIds),e=v(n,r,f,t.options),i=y(n,r,f),s=o.watchControls(n,i.controls),h=function(n){var r=i.filters(),t=!0;return r.forEach((function(i){t=i.express(n)&&t})),t},c=function(){for(var r,t,f=u(),n=0,i=f;n<i.length;n++)r=i[n],t=r.filters,t&&t.reset()};return{toolbar:{command:e},grid:{columns:i.columns},filter:{controls:i.controls,invalid:s,express:h,reset:c}}}function w(n,t,i,r){r===void 0&&(r=e.keystrokeWaitPeriod);t().forEach((function(t){t.value.extend({rateLimit:{timeout:r,method:e.rateLimitMethods.notifyWhenChangesStop}});t.value.subscribe(n,(function(){return i()}))}))}r.defineProperty(t,"__esModule",{value:!0});t.setupColumnsAndFilters=c;t.create=p;t.debounceFilterList=w}));
define("Shared/FilterableColumns/FilterableColumnCreator",["require","exports","f","o","ko","CommonResources","CommonConstants","Fx/Controls/DateTimePicker","Fx/Controls/DropDown","Shared/Utilities/InvalidControls","Reports/Utilities/ReportsUtilities","Shared/Utilities/StringHelpers","Reports/Utilities/ReportsUtilities"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a){"use strict";function g(n,t,r,u){return{column:n,shown:t,selectable:i.isNullOrUndefined(r)?!0:r,filters:u}}function nt(n,t,i){return i||(i=u.observable()),ft(i,n,t)}function y(n){return n.map((function(n){var t=n.text;return{text:t,ariaLabel:t,value:n.value}}))}function tt(n){var t=n.value;if(i.isArrayOrObservableArray(t))throw Error("Drop-Down does not support multiSelect: "+u.toJSON(t));return u.isObservable(t)?t:u.observable(t)}function p(n,t,i){if(!n){var r=u.unwrap(t);return i.format(r)}return n}function w(n,t,i,r,u,f){var e=n.slice();e.push(a.startBeforeEndDateValidationContract(i,r,u,f));e.push(a.futureDateTimeValidation());t(e)}function b(n,t,i,r,f,e,o){var s,h;u.isObservable(t)?(s=t,u.reactor(n,s,(function(n){w(n,i,r,f,e,o)}))):(h=u.unwrap(t),w(h,i,r,f,e,o))}function it(n,t){function ut(n){var u=c.calculateStartAndEndDateTime(o.value(),i.value(),r.value()),f=u.startDateTime(),e=u.endDateTime(),s={startDateTime:f,endDateTime:e};return t.update(n,s),!0}var k=t.dropDown,g=k.label,a=t.originalValue,l=u.observable(!1),o=s.create(n,k),nt=function(n){l(n===e.DateRangePickerValues.Custom)},v,ft,et;o.value.subscribe(n,nt);v=a();o.value(v);a.subscribe(n,o.value);nt(v);var y=t.startRange,ot=p(y.label,g,f.columnStart),w=t.endRange,st=p(w.label,g,f.columnEnd),tt=u.observableArray(),i=d(n,ot,y,tt,l),it=u.observableArray(),r=d(n,st,w,it,l),rt=u.observable(!0);return b(n,y.validations,tt,!0,i,r,rt),b(n,w.validations,it,!1,i,r,rt),l.subscribe(n,(function(n){var t=!n;i.disabled(t);r.disabled(t)})),ft=u.computed(n,l,(function(){return l?[o,i,r]:[o]})),et=h.watchControls(n,ft),{alwaysVisible:!1,express:function(n){return l()?i.valid()&&r.valid()?ut(n):!1:ut(n)},reset:function(){o.value(a());i.disabled(!0);r.disabled(!0);i.value(undefined);r.value(undefined)},controls:[{control:o},{control:i},{control:r}],invalid:et}}function v(n,t,i){if(n.valid()){var r=n.value();return r!==undefined&&r!==null&&i(t,r),!0}return!1}function k(n,t,i){if(n.valid()){var r=n.value();return r===undefined||l.isNullOrWhiteSpace(r)||i(t,r),!0}return!1}function rt(n,t){var h=y([{text:u.observable(f.columnNotSet),value:null},{text:u.observable(f.yes),value:!0},{text:u.observable(f.no),value:!1}]),e=i.clone(t),o,r;return e.items=h,o=tt(t),r=s.create(n,e),{alwaysVisible:!1,express:function(n){return v(r,n,t.update)},reset:function(){r.value(o())},controls:[{control:r}]}}function ut(n,t){var i=n.value();return{alwaysVisible:!1,express:function(i){return v(n,i,t)},reset:function(){n.value(i)},controls:[{control:n}]}}function ft(n,t,i){return{alwaysVisible:!1,express:function(n){return k(t,n,i)},reset:function(){t.value(n())},controls:[{control:t}]}}function d(n,t,r,u,f){var e=i.clone(r);return e.label=t,e.validations=u,e.visible=f,o.create(n,e)}r.defineProperty(t,"__esModule",{value:!0});t.availableColumnInfo=g;t.wrapTextBox=nt;t.buildDropDownOptions=y;t.dateRange=it;t.computeAndUpdateValue=v;t.computeAndUpdateString=k;t.yesNoDropDown=rt;t.wrapDropDown=ut}))