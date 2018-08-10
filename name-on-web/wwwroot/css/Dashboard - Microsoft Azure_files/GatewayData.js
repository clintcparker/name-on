define(["require", "exports", "../CORS/CorsConstants", "../Constants"], function (require, exports, CorsConstants_1, ConstantsRef) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CsmResourceClient = ExtensionCore.Cors.CsmResourceClient;
    var GatewayType = EMAExtension.DataModels.GatewayType;
    var GatewayData = (function () {
        function GatewayData() {
            var _this = this;
            // CSM client for getting gateway metadata
            this.client = new CsmResourceClient(CorsConstants_1.CorsConstants.microserviceProvider, CorsConstants_1.CorsConstants.gatewayType, MsPortalFx.getEnvironmentValue("microserviceApiVersion"));
            // Entity cache for getting a gateway given its resource ID
            this.entityCache = new MsPortalFx.Data.EntityCache({
                "entityTypeName": GatewayType,
                "sourceUri": function (gatewayId) { return _this.client.getResourceUri(gatewayId); }
            });
            // Query cache for getting a list of gateways in the currently logged in user's subscriptions
            this.queryCache = new MsPortalFx.Data.QueryCache({
                "entityTypeName": GatewayType,
                "sourceUri": function () { return _this.client.getTemplatedListInSubscriptionUri(); },
                "supplyData": ExtensionCore.Csm.supplyDataWithSubscriptionIdsParallel
            });
        }
        /*
         * Used by OAuth code to get an array of login URL's from the gateway if any are required for authenticated API app calls
         * using the specified token to work. If none are returned, the token is sufficient to authorize the call.
         *
         * @arg {string} gateway - The gateway resource ID
         * @arg {string} token - The token returned from getToken()
         * @arg {string} apiAppName - The name of an API app, e.g., GithubCodelessSample
         * @return {Q.Promise<string[]>} An array of login URL's (if any) used to contact the Consent Server
         */
        GatewayData.prototype.getLoginsForToken = function (gateway, token, apiAppName) {
            var parameters = { "api-version": MsPortalFx.getEnvironmentValue("microserviceApiVersion") }, query = $.param(parameters), url = "{0}{1}/listLoginUris?{2}".format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), gateway, query), data = {
                "token": token,
                "apiApp": {
                    "resourceName": apiAppName
                },
                "redirectUrl": this._redirectUri
            };
            MsPortalFx.Base.Diagnostics.Log.writeEntry(0 /* Verbose */, ConstantsRef.extensionName, "Retrieving login uris from {0}...".format(url));
            return ExtensionCore.Net.post(url, data).then(function (output) {
                MsPortalFx.Base.Diagnostics.Log.writeEntry(0 /* Verbose */, ConstantsRef.extensionName, "Received login uris");
                if (output.hasOwnProperty("loginUris")) {
                    return output.loginUris.map(function (item) {
                        return item.loginUri;
                    });
                }
                else {
                    return [];
                }
            }).catch(function (reason) {
                FxBase.Diagnostics.Log.writeEntry(2 /* Error */, "Ema.Client.Gateway", "Failed when getting logins for token with url: {0}, apiAppName: {1}, reason: {2}".format(url, apiAppName, ko.toJSON(reason)));
                return Q.reject(reason);
            });
        };
        /*
         * Used by OAuth code to get a Zumo token from the gateway used for making authenticated API app calls.
         *
         * @arg {string} gateway - The gateway's resource ID
         * @arg {string} name - The token's name
         * @return {Q.Promise<string> | any} - A Zumo token
         */
        GatewayData.prototype.getToken = function (gateway, name) {
            var parameters = { "api-version": MsPortalFx.getEnvironmentValue("microserviceApiVersion") }, query = $.param(parameters), url = "{0}{1}/tokens/{2}?{3}".format(MsPortalFx.getEnvironmentValue("csmManagementServiceUri"), gateway, name, query), data = {
                "name": name
            };
            MsPortalFx.Base.Diagnostics.Log.writeEntry(0 /* Verbose */, ConstantsRef.extensionName, "Doing a PUT on token {0}...".format(url));
            return ExtensionCore.Net.put(url, data).then(function (token) {
                return token.properties.token;
            }).catch(function (reason) {
                FxBase.Diagnostics.Log.writeEntry(2 /* Error */, "Ema.Client.Gateway", "Failed when getting token with url: {0}, data: {1}, reason: {2}".format(url, ko.toJSON(data), ko.toJSON(reason)));
                return Q.reject(reason);
            });
        };
        Object.defineProperty(GatewayData.prototype, "_redirectUri", {
            // Return "" if trustedParentOrigin is *
            // We should not allow OAuth from extensions that trust everyone
            get: function () {
                var portalUri = MsPortalFx.portalUri;
                return portalUri !== "*" ? "{0}/TokenAuthorize".format(portalUri) : "";
            },
            enumerable: true,
            configurable: true
        });
        return GatewayData;
    }());
    exports.GatewayData = GatewayData;
});
