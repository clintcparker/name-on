define("WebsitesExtension/TypeScript/Networking/ViewModels/NetworkSummaryLauncherPart",["require","exports","ko","Websites/ClientResources/GeneralResources","WebsitesExtension/TypeScript/ExtensionAssets/Constants","WebsitesExtension/TypeScript/Shared/SharedArea","WebsitesExtension/TypeScript/Utility/Utility.Website","WebsitesExtension/TypeScript/Utility/Utility.WebHostingPlan","WebsitesExtension/TypeScript/Models/WebsiteResourceId","WebsitesExtension/TypeScript/VPNNetwork/VPNNetworkArea","WebsitesExtension/TypeScript/_generated/Svg"],(function(n,t,i,r,u,f,e,o,s,h,c){"use strict";var l;return (function(n){var t=r.Network,l=(function(){function n(){this.vnetStatus=i.observable("");this.vnetStatusColor=i.observable(u.Colors.black);this.vnetMessage=i.observable(t.loading);this.vnetName=i.observable("");this.showUpsell=i.observable(!1)}return n})(),a;n.NetworkSummaryDataModel=l;a=(function(){function n(r){var u=this;this.vnetLabel=i.observable(t.vnetLabelColon);this.vnetUpsellMessage=i.observable(
t.vnetUpsell);this.hybridLabel=i.observable(t.hybridConnectionsLabelColon);this.showUpsell=i.observable(!1);this.dataModel=new l;this.resourceUri=i.observable("");this.icon=i.observable(c.Content.Images.appServiceConnectivity);this._isHcv2=i.observable(!1);this._container=r;this._siteView=f.DataContext.instance.websitesData.websiteCache.createView(r);this._vpnNetworkView=h.DataContext.instance.VPNNetworkData.VPNNetworkGatewayStatusCache.createView(r,{interceptNotFound:!1});r.partTitle(t.title);i.reactor(r,(function(){n.updateVPNInfo(u.dataModel,u._siteView.item(),u._vpnNetworkView.item(),!1)}))}return n.updateVPNInfo=function(n,i,f,e){i&&(o.isStandardSKUOrHigher(i.Sku())?f&&(n.showUpsell(!1),f.Id()&&!f.GatewayStatus()&&f.VnetResourceId&&f.VnetResourceId()?(this._setVnetName(n,f),n.vnetStatusColor(u.Colors.red),n.vnetStatus(t.notFound),n.vnetMessage("")):f.GatewayStatus()&&f.VnetResourceId&&f.VnetResourceId()?(this._setVnetName(n,f),n.vnetMessage(t.vpnMessage),e?(n.vnetStatus(r.Networking.
Certificates.notInSync),n.vnetStatusColor(u.Colors.red)):f.GatewayStatus()==="Provisioned"?(n.vnetStatus(t.connected),n.vnetStatusColor(u.Colors.green)):(n.vnetStatus(t.notConnected),n.vnetStatusColor(u.Colors.orange))):(n.vnetName(""),n.vnetStatusColor(u.Colors.black),n.vnetStatus(t.notConfigured),n.vnetMessage(""))):(n.showUpsell(!0),n.vnetMessage(t.notConfigured),n.vnetName("")))},n._setVnetName=function(n,i){e.isClassicVnet(i.VnetResourceId())?n.vnetName(t.classicVnetNameTemplate.format(i.VnetName())):n.vnetName(i.VnetName())},n.prototype.onInputsSet=function(n){var i=this,t;this.resourceUri(n.resourceUri);t=s.WebsiteResourceId.fromCsmResourceId(n.resourceUri);this._container.assetName(t.Name);var o=u.EnvPartNames.NetworkSummaryLauncherPart,r=f.DataContext.instance.objectCache.incObjCount(n.resourceId,o),h=e.telemetryStartTrace(o,"getSite",r);return this._siteView.fetch(t).then((function(){e.telemetryCompleteTrace(h,r);i._container.assetName(i._siteView.item().Name());var u=e.telemetryStartTrace(
o,"getVpnNetwork",r),n={SubscriptionId:t.SubscriptionId,ResourceGroup:t.ResourceGroup,Name:t.Name,GetGatewayStatus:!0};i._vpnNetworkView.fetch(n).then((function(){e.telemetryCompleteTrace(u,r)}),(function(){n.GetGatewayStatus=!1;i._vpnNetworkView.fetch(n)}))}))},n})();n.NetworkSummaryLauncherPart=a})(l||(l={})),l}))