define("MsPortalImpl/Base/Base.Router.Blade",["require","exports","f","i","o","ko","MsPortalImpl/Base/Base.Router","MsPortalImpl/UI/Compositions/UI.Composition.PropertyBinding","MsPortalImpl/Services/Services.PortalIdentity"],(function(n,t,i,r,u,f,e,o,s){"use strict";function y(n,t,r,u,o,s,l,a){var y=p(t,r,u),v,w;if(a||y)return(v=typeof l,w=f.unwrap(l),y)?e.getGalleryDeepLink(y,undefined,t.name,u):v==="string"&&(h.isResourceId(l)||h.isResourceGroupId(l)||h.isSubscriptionId(l))?c(n,l,undefined,o):l&&v==="object"&&l.id&&i.keysLength(l)===1&&h.isResourceId(l.id)?c(n,l.id,undefined,o):(v==="string"||v==="number")&&s?e.getAssetDeepLink(n,{name:t.name},s,w,undefined):e.getBladeDeepLink(t,r.name,undefined,u,!0,o)}function c(n,t,i,r){var e=encodeURI(t),u,f;return r&&(e+="/"+r),u=n.get(s.SignedInUser).getSignedInUserTenant(),f=new l.UriBuilder(i),f.fragment=(u&&"@"+u+"/")+"resource"+e,f.toString()}function p(n,t,i){var h=null,c=n.name===v.Marketplace,l=t.name===a.BladeNames.Hubs.CreateHubBlade,e,f,u,s;if(i){if(c&&l)return typeof i.package=="function"?i.package():null;if(e=o.getModelValue(i,"_provisioningContext.marketplaceItem.launchingContext.galleryItemId").value,e)return e;f=i.internal_bladeCallerParams&&i.internal_bladeCallerParams();u=void 0;f?u=o.getModelValue(f.providerConfig&&r.fromSerializableObject(f.providerConfig),"provisioningConfig.galleryCreateOptions.galleryItem").value:(s=i["collectorBindingInternals-inputs"],s&&(u=(((s._latestValue||{}).options||{}).galleryOptions||{}).galleryItem));h=u&&u.id&&u.version&&u.id.replace("."+u.version,"")}return h}u.defineProperty(t,"__esModule",{value:!0});var l=i.Base,a=l.Constants,v=a.ExtensionNames,h=i.ViewModels.Services.ResourceTypes;t.getDeepLink=y;t.getResourceDeepLink=c}))