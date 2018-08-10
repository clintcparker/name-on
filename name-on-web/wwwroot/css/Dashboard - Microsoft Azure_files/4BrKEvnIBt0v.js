define("HubsExtension/ServicesHealth/ViewModels/ServicesHealthPart",["require","exports","f","ko","HubsExtension/ServicesHealth/ServicesHealthClientStrings","HubsExtension/_generated/ExtensionDefinition"],(function(n,t,i,r,u,f){"use strict";var e;return (function(n){var s=i.Base,o=s.Images,t=i.ViewModels,h=t.ButtonPart,c=f.External.Microsoft_Azure_Monitoring,e=u.ServiceHealth,l=(function(n){function u(u){var f=n.call(this)||this,s;return f.serviceHealthPartCss=r.observable(""),f.iconCss=r.observable(""),f.titleCss=r.observable(""),f.showDescription=r.observable(!1),f.description=r.observable(e.description),f.learnMore=r.observable(e.learnMore),f.learnMoreLink=r.observable(i.getEnvironmentValue("hubsLinks").serviceHealth),f.linkIcon=r.observable(o.Hyperlink()),f.dynamicBladeSelection=r.observable(),f._container=u,f.title(e.title),f.icon(o.HeartPulse()),r.reactor(u,(function(){var n=f.size();switch(n){case 0:f.serviceHealthPartCss("ext-servicespart-columnaligned");f.iconCss("ext-servicespart-smallicon");f.titleCss("");f.showDescription(!1);break;case 1:f.serviceHealthPartCss("ext-servicespart-rowaligned");f.iconCss("ext-servicespart-smallicon");f.titleCss("ext-servicespart-smallleftmargin");f.showDescription(!1);break;case 2:f.serviceHealthPartCss("ext-servicespart-columnaligned");f.iconCss("ext-servicespart-largeicon");f.titleCss("ext-servicespart-largetopmargin");f.showDescription(!1);break;case 3:case 4:case 10:case 5:f.serviceHealthPartCss("ext-servicespart-columnaligned");f.iconCss("ext-servicespart-largeicon");f.titleCss("ext-servicespart-largetopmargin");f.showDescription(!0)}})),s=i.isFeatureEnabled("azurehealth")?t.getBladeSelection("Microsoft_Azure_Health","AzureHealthBrowseBlade",{}):i.isFeatureEnabled("servicenotificationsblade")?t.getBladeSelection(c.name,"ServiceNotificationsBlade",{queryInputs:{category:"ServiceHealth",timeRange:"PT24H"}}):t.getBladeSelection(undefined,"ServicesHealthBlade",{}),u.selectable.selectedValue(s),u.isSelectable(!0),f}return __extends(u,n),u})(h);n.ServicesHealthPart=l})(e||(e={})),e}));
define("HubsExtension/_generated/Parts/ServicesHealthPart",["require","exports","o","HubsExtension/_generated/Blades/ServicesHealth.css","HubsExtension/ServicesHealth/ViewModels/ServicesHealthPart"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});t.part={viewModel:"ServicesHealth$ServicesHealthPart",entryPoint:{module:"HubsExtension/ServicesHealth/ViewModels/ServicesHealthPart","export":"ServicesHealthPart"},partKind:0,canUseOldInputVersions:!1,inputs:[],bindings:[],details:[{invocationInputArguments:[{valuesFrom:[{referenceType:0,property:"content.dynamicBladeSelection"}]}]},{invocationInputArguments:[{valuesFrom:[{referenceType:0,property:"container.selectable"}]}]}],initialSize:5,supportedSizes:[0,1,2,3,4,10,5],commandGroupReference:{name:"ServiceHealth",commands:[]},htmlTemplateInline:{file:"ServicesHealthPart.html",content:'<div data-bind="css: serviceHealthPartCss"> <div data-bind="image: icon, css: iconCss"><\/div> <div data-bind="text: title, css: titleCss"><\/div> <!-- ko if: showDescription --> <div class="ext-servicespart-largetopmargin ext-sevicespart-description"> <span data-bind="text: description"><\/span> <a target="_blank" data-bind="attr: { href: learnMoreLink }"> <span class="ext-servicespart-linktext" data-bind="text: learnMore"><\/span> <span class="ext-servicespart-linkicon msportalfx-fill" data-bind="image: linkIcon"><\/span> <\/a> <\/div> <!-- /ko --> <\/div> '},styleSheets:[{file:"Blades/ServicesHealth.css",content:r}],name:"ServicesHealthPart"}}))