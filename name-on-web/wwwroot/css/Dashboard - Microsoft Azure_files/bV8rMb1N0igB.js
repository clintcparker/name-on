define("_generated/Less/MsPortalImpl/Parts/Parts.Asset.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,'.fxs-part-assetpart-type,.fxs-tilesize-mini .fxs-part-assetpart-assetName{font-family:az_ea_font,"Segoe UI",wf_segoe-ui_semibold,"Segoe UI Semibold","Segoe WP Semibold","Segoe WP",Tahoma,Arial,sans-serif;font-weight:600;font-size:10px;line-height:10px;text-transform:uppercase}.fxs-part-assetpart-status,.fxs-tilesize-mini .fxs-part-assetpart-type{display:none}.fxs-part-assetpart{white-space:normal;height:100%;width:100%;text-align:left}.fxs-part-assetpart-assetName,.fxs-part-assetpart-type{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.fxs-part-assetpart img,.fxs-part-assetpart svg{height:30px;width:30px}.fxs-part-assetpart-type{margin:3px 0}.fxs-tilesize-mini .fxs-part-assetpart-outer{text-align:center}.fxs-tilesize-mini .fxs-part-assetpart-inner{margin-top:7px}.fxs-tilesize-mini .fxs-part-assetpart-assetName{overflow:hidden}.fxs-tilesize-mini .fxs-part-assetpart-badge .fxs-part-assetpart-icon{padding:0;border:0;position:relative;width:40px;margin:0 auto}.fxs-tilesize-small .fxs-part-assetpart img,.fxs-tilesize-small .fxs-part-assetpart svg{height:21px;width:21px}.fxs-tilesize-normal .fxs-part-assetpart-icon,.fxs-tilesize-small .fxs-part-assetpart-icon{position:absolute;bottom:0;right:0}.fxs-tilesize-normal .fxs-part-assetpart-assetName,.fxs-tilesize-small .fxs-part-assetpart-assetName{margin:0;font-size:14px;line-height:18px}.fxs-tilesize-normal .fxs-part-assetpart-status,.fxs-tilesize-small .fxs-part-assetpart-status{display:block;position:absolute;bottom:0;font-size:12px;line-height:18px;padding-bottom:2px;margin-right:35px;max-height:15px;overflow:hidden}html[lang^=ja] .fxs-part-assetpart .fxs-part-assetpart-type,html[lang^=ja] .fxs-tilesize-mini .fxs-part-assetpart-assetName,html[lang^=ko] .fxs-part-assetpart .fxs-part-assetpart-type,html[lang^=ko] .fxs-tilesize-mini .fxs-part-assetpart-assetName,html[lang^=zh] .fxs-part-assetpart .fxs-part-assetpart-type,html[lang^=zh] .fxs-tilesize-mini .fxs-part-assetpart-assetName{font-size:11px;line-height:initial}')}));
define("MsPortalImpl/Parts/Parts.Asset",["require","exports","f","ko","MsPortalImpl/Resources/ImplScriptResources","MsPortalImpl/Parts/Parts","_generated/Less/MsPortalImpl/Parts/Parts.Asset.css"],(function(n,t,i,r,u,f){"use strict";var e;return (function(n){function l(n){if(n)try{var t=p.parseResourceDescriptor(n);return t?t.resource:null}catch(i){}return null}var v=i.Base,h=v.Images,e=h.StatusBadge.Outline,y=i.ViewModels,p=y.Services.ResourceTypes,c=i.getUniqueId(),w="<div class='fxs-part-assetpart'><div class='fxs-part-assetpart-outer'><div class='fxs-part-assetpart-badge'><div class='fxs-part-assetpart-icon' data-bind='image: icon'><\/div><\/div><div class='fxs-part-assetpart-inner'>"+("<h3 data-bind='text: inferredAssetName' class='fxs-part-assetpart-assetName msportalfx-tooltip-overflow' aria-describedby="+c+"><\/h3>")+("<div data-bind='visible: content.assetType(), text: content.assetType' class='fxs-part-assetpart-type msportalfx-tooltip-overflow' id="+c+"><\/div>")+"<div data-bind='text: statusTextOrLoadingIndicator' class='fxs-part-assetpart-status'><\/div><\/div><\/div><\/div>",b=u.AssetPart.statusTextPlaceholder,k=r.observable,o=r.pureComputed,s=r.reactor,t={},a;t[1]=e.Success;t[2]=e.Warning;t[3]=e.Error;t[5]=e.Info;t[4]=e.Update;a=(function(n){function u(){var t=n!==null&&n.apply(this,arguments)||this;return t.template=w,t}return __extends(u,n),u.prototype._getContentForBinding=function(n,u){var e=this,f=u.content,c=u.container,v=o((function(){var n=f.assetName();return n?n:l(f.assetId())})),y=k(),a=o((function(){return v()||y()})),p,w,d;return r.computed(n,(function(){e.ariaLabel(a())})),p=o((function(){var n=f.status,t=n&&n();return t?t:c.operations.inProgress()?b:null})),s(n,(function(){var n,t,r;v()||(n=f.assetType(),t=f.assetId(),n&&t&&(r=w=e._services.assetTypeService.mapAssetIdToResourceId({extensionName:e._getExtensionName(),assetType:n,assetId:t}),r.done((function(n){r===w&&y(l(n))}),i.noop)))})),d=o((function(){var n=t[f.state()],i=n?{image:n()}:null;return h.CustomImageWithBadge(f.icon(),i)})),s(n,(function(){c.contentState(f.state())})),s(n,(function(){a()&&f.icon()&&c.revealContent()})),{content:f,inferredAssetName:a,statusTextOrLoadingIndicator:p,icon:d}},u})(f.PartImpl);n.AssetPart=a})(e||(e={})),e}))