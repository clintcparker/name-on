define("_generated/Less/MsPortalImpl/Controls/Controls.Essentials.css",["require","exports","o","module"],(function(n,t,i,r){"use strict";i.defineProperty(t,"__esModule",{value:!0});window.fx.injectCss(r,'.fxc-essentials .fxc-disabled{pointer-events:none;cursor:default}.fxc-essentials .msportalfx-text-primary{padding:0;border:0;cursor:pointer}.fxc-essentials-container{position:relative}.fxc-essentials-border{padding-top:14px;border-bottom:1px solid #b3b3b3}.fxc-essentials-accordion{border-bottom:1px solid #b3b3b3;height:25px;line-height:25px}.fxc-essentials-expand-icon{vertical-align:middle;width:100%}.fxt-essentials-expand-svg{transform:rotate(180deg);margin-left:-83px}.fxc-essentials-expand-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:0 0;border:0;cursor:pointer;padding-left:0;padding-right:0;width:100%}.fxc-essentials-collapse-button:hover,.fxc-essentials-item .msportalfx-text-primary:hover{background-color:rgba(0,188,242,.1)}.fxc-essentials-expand-button .fxc-essentials-accordion-text-container{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;height:23px}.fxc-essentials-expand-button .fxs-portal-text{cursor:pointer;display:inline-block;font-size:14px;margin:0 8px 0 25px;white-space:nowrap}.fxc-essentials-expand-button .azc-fill-text{display:-webkit-flex;display:flex;margin-left:6px}.fxc-essentials-expand-button .azc-fill-text>.msportalfx-essentials-caret{width:12px;height:18px;display:table-cell;vertical-align:top}.fxc-essentials-column-container{margin-bottom:4px;padding-left:25px;padding-right:5px;width:calc(100% - @{paddingWidth * 2})}.fxc-essentials-column-container:after{content:" ";clear:both;display:block}.fxc-essentials-column{box-sizing:border-box;float:left;width:50%}.fxc-essentials-column.fxc-essentials-responsive{width:100%}.fxc-essentials-column:first-child{padding-right:10px}.fxc-essentials-column[data-side=left] .fxc-essentials-item,.fxc-essentials-column[data-side=right] .fxc-essentials-item{clear:both}.fxc-essentials-column[data-side=responsive] .fxc-essentials-item{width:230px}.fxc-essentials-item{box-sizing:border-box;padding-right:15px}.fxc-essentials-item.fxc-essentials-responsive{float:left}.fxc-essentials-item .fxc-essentials-label{display:inline-block;font-size:12px;height:15px}.fxc-essentials-item .fxc-copyablelabel-textbox .azc-input,.fxc-essentials-item .fxc-essentials-value{font-size:12px;height:17px;line-height:17px}.fxc-essentials-item .fxc-essentials-value{white-space:nowrap;overflow:hidden;display:inline-block;text-overflow:ellipsis;text-align:left;max-width:100%}.fxc-essentials-item .fxs-copyfield-wrapper{height:100%}.fxc-essentials-value-icon{display:inline-block;width:17px;height:17px}.fxc-essentials-value-icon-left{margin-right:4px}.fxc-essentials-value-icon-right{margin-left:4px}.fxc-essentials-label-container,.fxc-essentials-tags-label-container{padding-top:2px;height:15px}.fxc-essentials-label-container .fxc-essentials-move,.fxc-essentials-tags-label-container .fxc-essentials-move{display:inline-block;margin-left:4px;font-size:10px}.fxc-essentials-label-container .msportalfx-text-primary,.fxc-essentials-tags-label-container .msportalfx-text-primary{display:inline;font-size:inherit}.fxc-essentials-tags-label-container{padding-bottom:2px}.fxc-essentials-value-container{position:relative;max-width:calc(100% - 25px);height:19px;padding-right:25px;float:left;clear:both}.fxc-essentials-value-container.fxs-copyfield-container.fxs-copyfield-copied .fxs-copyfield{width:24px}.fxc-essentials-tags-container{padding-left:25px;padding-right:5px;margin-bottom:4px}.fxc-essentials-tags-container-height{height:42px}.fxc-essentials-tags-list{margin-left:-5px}.fxc-essentials-viewall-button-container{clear:both;float:none;height:20px;margin-top:6px;padding-left:25px;padding-right:5px;width:calc(100% - @{paddingWidth * 2})}.fxc-essentials-viewall-button-container .fxc-essentials-viewall-button{font-size:12px}.fxc-essentials-collapse-button{cursor:pointer;width:100%;height:16px;margin:0;border:0;padding:0;display:block;position:absolute;bottom:1px;left:0;right:0}.fxc-essentials-action-image,.fxc-essentials-notags-label{display:inline-block;vertical-align:middle}.fxc-essentials-action-image{height:17px;width:17px;padding:2px 4px;opacity:.3}.fxc-essentials-action-image:hover{opacity:1}.fxc-essentials-notags-container{height:17px;margin-top:5px}')}));
define("MsPortalImpl/Controls/Controls.Essentials",["require","exports","f","o","ko","MsPortalImpl/Base/Base.Sanitization","Fx/Controls/Pill","Fx/Controls/PillCollection","MsPortalImpl.Controls/Controls/Base/ViewModelBase","MsPortalImpl.Controls/Controls/ResourceFilterHelper","MsPortalImpl/Base/Base.EventTypes","MsPortalImpl/Base/Base.KnockoutExtensions.Copy","MsPortalImpl/Resources/ImplScriptResources","_generated/Less/MsPortalImpl/Controls/Controls.Essentials.css","MsPortalImpl/Base/Base.KnockoutExtensions.Copy"],(function(n,t,i,r,u,f,e,o,s,h,c,l,a){"use strict";function ei(n){var t="";return n.lines?n.lines.forEach((function(n,i){t+=pt("fxc-link-"+p(),n,i)})):t=pt("fxc-link-"+p(),n),t}function pt(n,t,i){var r=typeof i=="number"?"$data.lines["+i+"]":"$data",e="ko.unwrap(ko.unwrap("+r+".value))",o="'"+n+"-' + $index()",s="id: "+o+", 'aria-labelledby': "+o+", 'aria-disabled': $root.$disabled, tabindex: $root.$tabIndex",h="'fxc-disabled': $root.$disabled",f=e+" === null || "+e+" === undefined ? '--' : "+e,u;switch(oi(t.onClick)){case 3:u='<button class="'+it+" "+ft+' fxs-portal-text" data-bind="click: $root._getOnClick('+r+".onClick), clickBubble: false, text: "+f+", attr: {"+s+", 'aria-describedby': $root._descId}, css: {"+h+'}"><\/button>';break;case 2:u='<a class="'+ft+' fxs-portal-text msportalfx-text-primary" href="#" '+tt+' data-bind="text: '+f+", attr: {href: $root._getOnClick("+r+".onClick).uri, target: $root._getOnClick("+r+".onClick).target, "+s+", 'aria-describedby': $root._descId}, css: {"+h+'}"><\/a>';break;case 1:default:u='<div role="text" class="'+ft+' fxs-portal-text" tabindex="0" data-bind="text: '+f+", attr: {'aria-label': "+f+", 'aria-describedby': $root._descId}\"><\/div>"}return'<div class="'+yt+'">'+("<!-- ko if: ko.unwrap("+r+".icon) && ko.unwrap("+r+".icon) !== null -->")+("<!-- ko if: ko.unwrap("+r+".icon).image && ko.unwrap("+r+".icon).image !== null -->")+("<!-- ko if: ko.unwrap("+r+".icon).position === 1 -->")+('<span class="'+nt+" "+nt+'-left" data-bind="image: ko.unwrap('+r+'.icon).image"><\/span>')+u+"<!-- /ko -->"+("<!-- ko if: ko.unwrap("+r+".icon).position === 2 -->")+u+('<span class="'+nt+" "+nt+'-right" data-bind="image: ko.unwrap('+r+'.icon).image"><\/span>')+"<!-- /ko --><!-- /ko --><!-- /ko -->"+("<!-- ko if: !ko.unwrap("+r+".icon) || ko.unwrap("+r+".icon) === null -->")+u+"<!-- /ko --><\/div>"}function oi(n){var t=u.unwrap(n);return typeof t=="function"?3:typeof t!="object"||!t.uri?1:2}function si(n){var t=(n||"").toLowerCase();return t.startsWith("hidden-")||t.startsWith("link:")}function ht(n){var t="fxc-label-"+p(),i="fxc-link-"+p(),r=n==="responsive"?ut+" "+at:ut;return'<div class="'+r+'" data-side="'+n+'" tabindex="-1" data-bind="attr: {\'aria-labelledby\': \''+t+"-' + $index()}\">"+('<div class="'+vt+'">')+('<label class="'+lt+'" data-bind="text: label, attr: {id: \''+t+"-' + $index()}\"><\/label>")+'<!-- ko if: typeof movableLabel === "string" && movableLabel.length > 0 && typeof $root._getOnClick(movableOnClick) === "function" -->'+('<span role="presentation" class="'+g+'-move">(<button class="'+it+'" data-bind="click: $root._getOnClick(movableOnClick), clickBubble: false, text: movableLabel, attr: {id: \''+i+"-' + $index(), 'aria-labelledby': '"+i+"-' + $index(), 'aria-disabled': $root.$disabled, tabindex: $root.$tabIndex}, css: {'fxc-disabled': $root.$disabled}\"><\/button>)<\/span>")+"<!-- /ko --><\/div>"+('<div data-bind="pcInnerControl: $data" data-label="'+t+'"><\/div>')+"<\/div>"}function wt(n){return h.getLocations().then((function(t){var i=(n.location||"").toLowerCase();return(t.first((function(n){return n.name.toLowerCase()===i}))||{}).displayName||n.location}))}var bt;r.defineProperty(t,"__esModule",{value:!0});var ct=i.ViewModels.Controls.DockedBalloon,w=i.ViewModels.Services.ResourceTypes,y=i.Base,p=i.getUniqueId,d=window,kt=230,b=5,tt="data-link",g="fxc-essentials",dt="fxc-essentials-container",lt="fxc-essentials-label",it="msportalfx-text-primary",gt="fxc-essentials-accordion",ni="fxc-essentials-accordion-text-container",k="fxc-essentials-accordion-toggle",rt="fxc-essentials-column",ti="fxc-essentials-column-container",at="fxc-essentials-responsive",ut="fxc-essentials-item",vt="fxc-essentials-label-container",yt="fxc-essentials-value-container",ft="fxc-essentials-value",nt="fxc-essentials-value-icon",ii="fxc-essentials-viewall-button-container",et="fxc-essentials-viewall-button",ri="fxc-essentials-expand-icon",ot="fxc-essentials-expand-button",st="fxc-essentials-collapse-button",ui="fxc-essentials-border",v=a.Controls.Essentials,fi=new y.Diagnostics.Log("MsPortalImpl/Controls/Controls.Essentials");u.bindingHandlers.pcInnerControl={init:function(){},update:function(n,t){var i=$(n);n&&i.children().length===0&&i.append(ei(t()))}};bt=(function(n){function t(t,r,f){var e=n.call(this,t,r,f)||this,o,s,h,c;return e.controlId=p(),e.viewAll=u.observable(!1).extend({notify:"always"}),e.showViewAllButton=u.observable(!1),e.showTags=u.observable(!1),e.tagsPillList=u.observable(null),e.noTags=u.observable(!1),e.editTagsIcon=y.Images.Edit(),e._staticItems={left:[],right:[]},e._descId=e.controlId+"-desc",e._ariaLive=u.observable(""),e._events=[],e._armData={resourceGroup:{value:u.observable("---"),movableOnClick:u.observable(i.noop),onClick:u.observable(i.noop)},status:{value:u.observable("---")},location:{value:u.observable("---")},subscriptionName:{value:u.observable("---"),movableOnClick:u.observable(i.noop),onClick:u.observable(i.noop)},subscriptionId:{value:u.observable("---")}},e.vm=r,o=e.vm.options,e.viewAllString=u.computed(e.ltm,(function(){return e.viewAll().toString()})),e.expandedString=u.computed(e.ltm,(function(){return(!!e.vm.expanded()).toString()})),e.collapseIcon=e._getExpandCollapseIcon(!1),e.expandIcon=e._getExpandCollapseIcon(!0),s=function(){return o.responsiveColumns?Math.floor((e.element.width()-30)/kt):2},e._columnLength=s(),h=o.resourceId,h?(c=o.hiddenBuiltInTypes&&!!~o.hiddenBuiltInTypes.indexOf(6),e.showTags(!!o.includeTags&&!c),e._processAndRender(),e.vm.resource.subscribeAndRun(e.ltm,(function(n){e._resetBuiltInValues();y.Promises.cancelOnDispose(e.ltm,(function(){return n?e._getResourceInfo(n):Q(null)})().then((function(n){return n?Q(n):e.vm.options.skipResourceFetching?Q(null):e.vm.getResourceInfo(h,e.showTags())}))).then((function(n){e.resourceData=n;e._processItems();e._updateTags()}))})),e.vm.newTags.subscribe(e.ltm,(function(n){e._updateTags(n)}))):(e._processAndRender(),e._updateTags()),!o.responsiveColumns||(e._watchBladeWidthChange=setInterval((function(){var n=s(),t;e._columnLength!==n&&(t=e.viewAll(),e._columnLength=n,e.showViewAllButton(!1),e._clearEvents(),e.element.empty(),e._processAndRender(),e.viewAll(t))}),10)),e}return __extends(t,n),t.prototype._resetBuiltInValues=function(){this._armData.resourceGroup.value("---");this._armData.resourceGroup.movableOnClick(i.noop);this._armData.resourceGroup.onClick(i.noop);this._armData.status.value("---");this._armData.location.value("---");this._armData.subscriptionName.value("---");this._armData.subscriptionName.movableOnClick(i.noop);this._armData.subscriptionName.onClick(i.noop);this._armData.subscriptionId.value("---")},t.prototype._getOnClick=function(n){var i=u.unwrap(u.unwrap(n)),t,r;return i.target?(t=i,r=u.unwrap(t.uri)||"",{uri:f.sanitizeUri(r)?r:"",target:u.unwrap(t.target),onLinkOpened:u.unwrap(t.onLinkOpened)}):i},t.prototype._getExpandCollapseIcon=function(n){return'<svg width="8" height="8" viewBox="0 0 8 8.4" focusable=\'false\' aria-hidden=\'true\' class=\'fxt-essentials-'+(n?"expand":"collapse")+'-svg\'><g data-name="Layer 2"><g data-name="Layer 1"><polygon points="4 3.7 0 7.7 0.7 8.4 4 5 7.3 8.4 8 7.7 4 3.7" /><polygon points="4 0 0 4 0.7 4.7 4 1.4 7.3 4.7 8 4 4 0" /><\/g><\/g><\/svg>'},t.prototype.dispose=function(){this._checkExistsOrRegisterDestroyId(n.prototype.dispose)||(this._watchBladeWidthChange&&(clearInterval(this._watchBladeWidthChange),this._watchBladeWidthChange=null),this._cleanElement(g),n.prototype.dispose.call(this))},t.prototype.noTagsClickHandler=function(){this._getEditTagAction()()},t.prototype._getResourceInfo=function(n){var r=this,t,u;return w.isResourceId(n.id)?(t=w.parseResourceDescriptor(n.id),wt(n).then((function(u){var f=t.subscription?i.Azure.getSubscriptionInfo(t.subscription):Q(null);return f.then((function(i){return{resourceGroupName:t.resourceGroup,resourceGroupId:w.buildResourceGroupIdFromResourceDescriptor(t),subscriptionName:i&&i.displayName,subscriptionId:i&&t.subscription,location:u,tags:r._userModifiedTags?r._userModifiedTags:n.tags,moveOptions:{resourceGroup:!0,subscription:!0}}}))}))):w.isResourceGroupId(n.id)?(u=w.parseResourceGroupDescriptor(n.id),wt(n).then((function(t){return i.Azure.getSubscriptionInfo(u.subscription).then((function(i){return{resourceGroupName:u.resourceGroup,resourceGroupId:n.id,subscriptionName:i.displayName,subscriptionId:u.subscription,location:t,tags:r._userModifiedTags?r._userModifiedTags:n.tags,moveOptions:{resourceGroup:!1,subscription:!0}}}))}))):Q(null)},t.prototype._generateTags=function(){var t=this.vm.options,u=t.hiddenChangeLink&&~t.hiddenChangeLink.indexOf(6),n="fxc-label-"+p(),r="fxc-link-"+p();return'<div class="'+ut+'" tabindex="-1" data-bind="attr: {\'aria-labelledby\': \''+n+"-tags'}\">"+('<div class="'+vt+'">')+('<label class="'+lt+'" data-bind="attr: {id: \''+n+"'}\">"+v.tags+"<\/label>")+(u?"":'<span role="presentation" class="'+g+'-move">(<button class="'+it+'" data-bind="click: $root._getEditTagAction(), clickBubble: false, attr: {id: \''+r+"', 'aria-labelledby': '"+r+"', 'aria-disabled': $root.$disabled, tabindex: $root.$tabIndex}, css: {'fxc-disabled': $root.$disabled}\">"+v.change+"<\/button>)<\/span>")+"<\/div>"+("<button class=\"msportalfx-text-primary fxc-essentials-notags-container\" data-bind=\"visible:noTags,click:noTagsClickHandler,clickBubble:false,attr:{'aria-disabled':$root.$disabled,tabindex:$root.$tabIndex},css:{'fxc-disabled':$root.$disabled}\">"+i.encodeAttribute(v.noTagsLabel)+"<\/button>")+"<!-- ko ifnot: noTags -->"+('<div class="fxc-essentials-tags-list" data-bind="pcControl: tagsPillList" data-label="'+n+'"><\/div>')+"<!-- /ko --><\/div>"},t.prototype._attachCopyableLabel=function(){for(var t=this.element.find("."+yt+" > .fxc-essentials-value"),i,u=function(n){var u=t.eq(n),f;if(!u.hasClass("fxs-copyfield-wrapper")&&u.data("copyable")!=="true"){u.data("copyable","true");l.initializeCopyBinding(u.parent()[0],(function(){return u.html()}),{hideTextbox:!0});f=r;u.on(c.default.keyup,i=function(n){var r=n.ctrlKey||n.metaKey,i,t;r&&n.keyCode===67&&(i=d.document.createRange(),i.selectNodeContents($(this).get(0)),t=d.getSelection(),t.removeAllRanges(),t.addRange(i),d.document.execCommand("copy"),$(this).focus(),f._ariaLive(t.toString()+" "+v.copiedToClipboard))});r._events.push({element:u,event:c.default.keyup,handler:i})}},r=this,n=0;n<t.length;n++)u(n)},t.prototype._renderItems=function(){return this._columnLength===2?'<div class="'+rt+'" data-bind="foreach: _layout.left" data-side="left">'+(""+ht("left"))+"<\/div>"+('<div class="'+rt+'" data-bind="foreach: _layout.right" data-side="right">')+(""+ht("right"))+"<\/div>":'<div class="'+rt+" "+at+'" data-bind="foreach: _responsiveItems" data-side="responsive">'+(""+ht("responsive"))+"<\/div>"},t.prototype._createTagsPillList=function(){this.tagsPillList()||this.tagsPillList(o.create(this.ltm,{multipleRows:!1,theme:2,ariaLabel:v.tags,items:[]}))},t.prototype._getEditTagAction=function(n){var t=this;return function(){var i={resourceId:t.vm.options.resourceId,tag:n};t.vm.openBlade(6,i)}},t.prototype._createTagPill=function(n,t,r){var u=this,o=i.encodeHtml(t+" : "+r),f=new ct.ViewModel(n);return f.type=ct.Type.Info,f.content(o),e.create(n,{showRemoveButton:!1,getKeyText:function(n){return n.key},getOperatorText:function(){return":"},getValueText:function(n){return n.value},ariaLabel:o,value:{key:t,value:r},tooltip:f,createEditor:function(){return{onClick:function(){var n={resourceId:u.vm.options.resourceId,key:t,value:r};y.Promises.cancelOnDispose(u.ltm,u.vm.openBlade(1,n))}}}})},t.prototype._getTagItems=function(){var n=this;return i.forEachKey(this.resourceData&&this.resourceData.tags,(function(t,i,r){si(t)||r.push(n._createTagPill(n.ltm,t,i))}),[])},t.prototype._updateTagsFromResourceData=function(){var n=this._getTagItems();this.tagsPillList().items(n);this.noTags(!n.length)},t.prototype._updateTags=function(n){n&&(this._userModifiedTags=n,this.resourceData.tags=n);this._createTagsPillList();this._updateTagsFromResourceData()},t.prototype._attachLinkEvents=function(){var n=this,t=function(t,i){t.removeData(tt.split("-")[1]);t.off(c.default.click+" "+c.default.keypress);n.ltm.registerForDispose(t.setEvents([c.default.click,function(){var t=n._getOnClick(i),r=t.uri,f=t.target,u=t.onLinkOpened;return r&&(window.open(r,f),u&&u(!1)),!1},],[c.default.keypress,function(t){if(t.which===13||t.which===32){var r=n._getOnClick(i),u=r.uri,e=r.target,f=r.onLinkOpened;u&&(window.open(u,e),f&&f(!0))}return!1},]))};this.element.find("["+tt+"]").each((function(){var i=this,n=u.dataFor($(this)[0]);n.lines?n.lines.forEach((function(n){t($(i),n.onClick)})):n.onClick&&t($(this),u.unwrap(n).onClick)}))},t.prototype._processAndRender=function(){var n=this,t;this._processItems();t=function(t,i,r){return r===void 0&&(r=!1),!n.vm.options.showAllItems&&(r&&t.length>n._columnLength*b||!r&&t.length>b)&&n.showViewAllButton(!0),n.vm.options.showAllItems||i||(r&&t.length>n._columnLength*b?t=t.splice(0,n._columnLength*b):!r&&t.length>b&&(t=t.splice(0,b))),t};this._columnLength===2?this._layout={left:u.computed(this.ltm,[this.vm.dynamicLeftArray,this.viewAll],(function(i,r){return t(n._staticItems.left.concat(i),r)})),right:u.computed(this.ltm,[this.vm.dynamicRightArray,this.viewAll],(function(i,r){return t(n._staticItems.right.concat(i),r)}))}:this._responsiveItems=u.computed(this.ltm,[this.vm.dynamicLeftArray,this.vm.dynamicRightArray,this.viewAll,],(function(i,r,u){return t(n._staticItems.left.concat(n._staticItems.right,i,r),u,!0)}));this.element.addClass(g);var r=~d.navigator.platform.indexOf("Mac")?v.Copy.mac:v.Copy.win,f=""+ot+(this.vm.expanded()?"":" "+k),e=""+st+(this.vm.expanded()?" "+k:"");this.showTags()&&(this._createTagsPillList(),this._updateTagsFromResourceData());this._applyTemplate('<div class="'+dt+'">'+('<div class="'+gt+'" data-bind="visible: !vm.expanded()">')+('<button title="'+i.encodeAttribute(v.Label.expand)+'" aria-label="'+i.encodeAttribute(v.Label.expand)+'" aria-controls="'+this.controlId+"\" data-bind=\"attr: {'aria-expanded': expandedString, 'aria-disabled': $disabled, disabled: $disabled, tabindex: $tabIndex}, click: _toggleExpander, clickBubble: false\" class=\""+f+'">')+('<div class="'+ni+'">')+('<div class="fxs-portal-text">'+i.encodeAttribute(v.essentials)+"<\/div>")+('<span class="'+ri+' fxs-portal-svg" data-bind="html: expandIcon"><\/span>')+"<\/div><\/button><\/div>"+('<div id="'+this.controlId+'" class="'+ti+'" aria-label="'+i.encodeAttribute(v.listProps)+'" data-bind="visible: vm.expanded">')+('<div id="'+this._descId+'" aria-hidden=\'true\' class="fxs-hide-accessible-label">'+r+"<\/div>")+"<div aria-live='polite' aria-atomic='true' class='fxs-hide-accessible-label' data-bind='text: $root._ariaLive'><\/div>"+this._renderItems()+'<\/div><!-- ko if: showTags --><div class="fxc-essentials-tags-container fxc-essentials-tags-container-height" data-bind="visible: vm.expanded() && tagsPillList()">'+this._generateTags()+"<\/div><!-- /ko -->"+('<div class="'+ii+'" data-bind="visible: vm.expanded() && showViewAllButton()">')+('<button class="'+et+' msportalfx-text-primary" role="button" aria-controls="'+this.controlId+"\" data-bind=\"attr: {'aria-disabled': $root.$disabled, 'aria-expanded': viewAllString, tabindex: $root.$tabIndex}, css: {'fxc-disabled': $root.$disabled}\">"+i.encodeAttribute(this.viewAll()?v.seeLess:v.seeMore)+"<\/button>")+"<\/div>"+('<div class="'+ui+'" data-bind="visible: vm.expanded"><\/div>')+('<button class="'+e+'" title="'+i.encodeAttribute(v.Label.collapse)+'" aria-label="'+i.encodeAttribute(v.Label.collapse)+'" aria-controls="'+this.controlId+"\" data-bind=\"visible: vm.expanded, attr: {'aria-expanded': expandedString, 'aria-disabled': $disabled, disabled: $disabled, tabindex: $tabIndex}, click: _toggleExpander, clickBubble: false\">")+'<span class="fxs-portal-svg" data-bind="html: collapseIcon"><\/span><\/button><\/div>');this._assignEvents();this._columnLength===2?u.reactor(this.ltm,[this._layout.left,this._layout.right],(function(){n._attachCopyableLabel();n._attachLinkEvents()})):u.reactor(this.ltm,[this._responsiveItems],(function(){n._attachCopyableLabel()}))},t.prototype._getResourceGroup=function(){var n=this,t=this.vm.options,s=t.hiddenChangeLink&&~t.hiddenChangeLink.indexOf(1),i=this._armData.resourceGroup,r=i.value,u=i.movableOnClick,f=i.onClick,e,o;return this.resourceData&&r()==="---"&&(r(this.resourceData.resourceGroupName),e=function(){if(n.resourceData.moveOptions&&n.resourceData.moveOptions.resourceGroup){var i={resourceId:t.resourceId,moveType:1};y.Promises.cancelOnDispose(n.ltm,n.vm.openBlade(1,i))}},o=function(){var t={resourceId:n.resourceData.resourceGroupId};y.Promises.cancelOnDispose(n.ltm,n.vm.openBlade(1,t))},u(e),f(o)),{label:v.resourceGroup,value:r,movableLabel:s?"":v.change,movableOnClick:u,onClick:f}},t.prototype._getStatus=function(){var n=this._armData.status.value;return this.resourceData&&n()==="---"&&this.vm.status.subscribeAndRun(this.ltm,n),{label:v.status,value:n}},t.prototype._getLocation=function(){var n=this._armData.location.value;return this.resourceData&&n()==="---"&&n(this.resourceData.location),{label:v.location,value:n}},t.prototype._getSubscriptionName=function(){var n=this,t=this.vm.options,s=t.hiddenChangeLink&&~t.hiddenChangeLink.indexOf(4),i=this._armData.subscriptionName,r=i.value,u=i.movableOnClick,f=i.onClick,e,o;return this.resourceData&&r()==="---"&&(r(this.resourceData.subscriptionName),e=function(){if(n.resourceData.moveOptions&&n.resourceData.moveOptions.subscription){var i={resourceId:t.resourceId,moveType:0};y.Promises.cancelOnDispose(n.ltm,n.vm.openBlade(4,i))}},o=function(){var t={resourceId:w.buildSubscriptionFromId(n.resourceData.subscriptionId)};y.Promises.cancelOnDispose(n.ltm,n.vm.openBlade(4,t))},u(e),f(o)),{label:v.subscription,value:r,movableLabel:s?"":v.change,movableOnClick:u,onClick:f}},t.prototype._getSubscriptionId=function(){var n=this._armData.subscriptionId.value;return this.resourceData&&n()==="---"&&n(this.resourceData.subscriptionId),{label:v.subscriptionId,value:n}},t.prototype._getItem=function(n){if(typeof n=="number")switch(n){case 1:return this._getResourceGroup();case 2:return this._getStatus();case 3:return this._getLocation();case 4:return this._getSubscriptionName();case 5:return this._getSubscriptionId();default:fi.error("Unknown BuiltInType is used (Illegal Access)")}return n},t.prototype._processItems=function(){var i=this,t=[],r=[],n=this.vm.options,u;switch(this.vm.optionType){case 1:u=[1,2,3,4,5,];n.hiddenBuiltInTypes&&n.hiddenBuiltInTypes.forEach((function(n){var t=u.indexOf(n);t>-1&&u.splice(t,1)}));u.forEach((function(n){t.push(i._getItem(n))}));n.additionalLeft&&(t=t.concat(n.additionalLeft));n.additionalRight&&(r=n.additionalRight);break;case 2:n.left.forEach((function(n){t.push(i._getItem(n))}));n.right.forEach((function(n){r.push(i._getItem(n))}));break;case 3:n.left.forEach((function(n){t.push(i._getItem(n))}));n.right.forEach((function(n){r.push(i._getItem(n))}))}this._staticItems.left=t;this._staticItems.right=r},t.prototype._toggleExpander=function(){var n=this.vm.expanded,t=this.vm.options.onExpanderClick,i=n();n(!i);i?this.element.findByClassName(st).removeClass(k).end().findByClassName(ot).addClass(k).focus():this.element.findByClassName(ot).removeClass(k).end().findByClassName(st).addClass(k).focus();t&&t(n())},t.prototype._applyTemplate=function(n){var t=$(n);this.element.append(t);u.applyBindings(this,t[0])},t.prototype._assignEvents=function(){var n=this,t=this.element.find("."+et),i;t.on(c.default.click,i=function(){n.viewAll(!n.viewAll());var i=t;return i.html(i.html()===v.seeMore?v.seeLess:v.seeMore),!1});this._events.push({element:t,event:c.default.click,handler:i});this.ltm.registerForDispose((function(){n._clearEvents()}))},t.prototype._clearEvents=function(){this.element.find("."+et).off(c.default.click);this._events.forEach((function(n){n.element.off(n.event,n.handler)}))},t})(s.Widget);t.Widget=bt}))