/// <reference path="../TypeReferences.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents the data layer for querying Subscriptions from Hubs extension.
     */
    var SubscriptionsData = (function () {
        function SubscriptionsData() {
            var _this = this;
            this.subscriptions = ko.pureComputed(function () {
                var list = _this._subscriptionList();
                return list || [];
            });
            this._subscriptionList = ko.observable();
        }
        SubscriptionsData.prototype.fetchSubscriptions = function () {
            var _this = this;
            if (!this._loadPromise) {
                this._loadPromise = MsPortalFx.Azure.getAllSubscriptions().then(function (subscriptions) {
                    _this._subscriptionList(subscriptions);
                });
            }
            return this._loadPromise;
        };
        return SubscriptionsData;
    }());
    exports.SubscriptionsData = SubscriptionsData;
});
