define("MsPortalImpl/UI/UI.BladeLauncher",["require","exports","f"],(function(n,t,i){"use strict";var r;return (function(n){var t=i.ViewModels,r=t.ButtonPart,u=t.Internal.Selectable,f=(function(n){function t(t,i){var f=n.call(this)||this,r;return f._container=t,r=i&&i.container&&i.container.selectable,f._container.selectable=new u({selectedValue:r&&r.selectedValue,isSelected:!!(r&&r.isSelected)}),f}return __extends(t,n),t.prototype.onInputsSet=function(n){var i=n,t=n.detailBladeInputs;t&&t.useDelayedBlade?this._container.selectable.delayedBladeSelection({bladeWidth:t.bladeWidth,selectedValuePromise:Q(i)}):this._container.selectable.selectedValue(i)},t})(r);n.BladeLauncher=f})(r||(r={})),r}))