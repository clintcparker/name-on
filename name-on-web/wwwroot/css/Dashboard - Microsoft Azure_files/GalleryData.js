define(["require", "exports", "../CORS/CorsConstants"], function (require, exports, CorsConstants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GalleryData = (function () {
        function GalleryData() {
            var _this = this;
            // CORS client for getting gallery metadata
            this.client = new ExtensionCore.Cors.GalleryClient();
            // Query cache for getting a list of gallery items
            this.queryCache = new MsPortalFx.Data.QueryCache({
                poll: true,
                pollInterval: 300000,
                "sourceUri": function () {
                    return _this.client.getResourceUri("");
                },
                "supplyData": function () {
                    return _this._getGalleryItems(CorsConstants_1.CorsConstants.microserviceType.toLowerCase());
                }
            });
            // Query cache for getting a list of logic app template items
            this.templateQueryCache = new MsPortalFx.Data.QueryCache({
                poll: true,
                pollInterval: 300000,
                "sourceUri": function () {
                    return _this.client.getResourceUri("");
                },
                "supplyData": function () {
                    return _this._getGalleryItems("apiapps-logicapp");
                }
            });
            // Entity cache for getting the gallery item for a particular gallery item id
            this.galleryItemCache = new MsPortalFx.Data.EntityCache({
                poll: false,
                sourceUri: function (galleryItemId) {
                    return _this._getGalleryItemsUri(galleryItemId);
                }
            });
        }
        /* Remarks: Make use of entity cache to get the swagger rather than calling it everytime.*/
        /* This method is not used currently.
         * Exports an API definition for an AppService app.
         *
         * @arg {string} identity The package identity, e.g., microsoft_com.AS2Connector, microsoft_com.AS2Connector.0.1.0
         * @arg {GalleryItem[]} Gallery items.
         * @return {MsPortalFx.Base.PromiseV<any>} An API definition in Swagger 2.0 format.
         */
        GalleryData.prototype.exportApiDefinition = function (identity, galleryItems) {
            var apiApp = galleryItems.first(function (apiApp) { return StringEx.startsWith(apiApp.identity, identity, StringComparison.IgnoreCase); });
            if (!apiApp) {
                return Q();
            }
            var url = apiApp.definitionTemplates.deploymentFragmentFileUris["apiDefinition.swagger"];
            if (!url) {
                return Q();
            }
            return ExtensionCore.Net.get(url);
        };
        /*
         * Returns a list of service ids which are recommended for microservices
         *
         * @return {FxBase.PromiseV<string[]>} An array of service ids of recommended in microservices.
         */
        GalleryData.prototype.getRecommendedServices = function () {
            return this._getCurationJSON().then(function (galleryData) {
                galleryData = galleryData && galleryData["gallery"] && galleryData["gallery"].length > 0 ? galleryData["gallery"].first(function (data) { return StringEx.equals(data.id, CorsConstants_1.CorsConstants.microserviceType, StringComparison.IgnoreCase); }) : null;
                if (galleryData && galleryData["children"] && galleryData["children"].length > 0) {
                    var recommended = galleryData["children"].first(function (data) { return StringEx.equals(data.id, CorsConstants_1.CorsConstants.recommendedServiceType, StringComparison.IgnoreCase); });
                    if (recommended && recommended["items"]) {
                        return recommended.items.map(function (item) { return item.id; });
                    }
                }
                return [];
            }).catch(function () { return []; });
        };
        GalleryData.prototype._getGalleryItems = function (categoryId) {
            var queryString = {
                "api-version": MsPortalFx.getEnvironmentValue("galleryApiVersion"),
                "includePreview": "true",
                "$filter": "CategoryIds/any(c: c eq '{0}')".format(categoryId)
            }, url = this.client.getResourceUri("", queryString);
            return ExtensionCore.Net.get(url);
        };
        /*
         * Returns the curation.json JSON object.
         *
         * @return {FxBase.PromiseV<any>} - A promise with the JSON object from the curation.json file.
         */
        GalleryData.prototype._getCurationJSON = function () {
            // TO DO: Change this to default true before final release
            var testFilter = "Identity eq '20150323.18'";
            var prodFilter = "IsDefault eq true";
            var queryString = {
                "api-version": MsPortalFx.getEnvironmentValue("galleryApiVersion"),
                "$filter": testFilter
            }, baseUriTemplate = "{0}/{1}/{2}", url = baseUriTemplate.format(MsPortalFx.getEnvironmentValue("galleryServiceUri"), CorsConstants_1.CorsConstants.galleryProvider, CorsConstants_1.CorsConstants.curationType), client = new ExtensionCore.Cors.RestClient({
                baseUri: url,
                baseQueryParameters: queryString
            });
            return client.get("").then(function (curationData) {
                if (curationData && curationData.length > 0 && curationData.first().itemUri) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: curationData.first().itemUri,
                        type: "GET",
                        contentType: "application/json",
                        setAuthorizationHeader: false
                    });
                }
            }, function (error) {
                FxBase.Diagnostics.Log.writeEntry(2 /* Error */, "Ema.Client.workflow", "Failed when trying to get gallery data with url: {0}, queryString: {1}".format(url, ko.toJS(queryString)));
                return error;
            });
        };
        GalleryData.prototype._getGalleryItemsUri = function (galleryItemId) {
            var hidekeysString = "";
            var hideKeys = MsPortalFx.getFeatureValue("hidekeys");
            if (!!hideKeys) {
                hidekeysString = "&hidekeys[0]=" + hideKeys;
            }
            return MsPortalFx.getEnvironmentValue("galleryServiceUri") + "/Microsoft.Gallery/galleryitems/" + galleryItemId + "?api-version=" + MsPortalFx.getEnvironmentValue("galleryApiVersion") + "&includePreview=true" + hidekeysString;
        };
        return GalleryData;
    }());
    exports.GalleryData = GalleryData;
});
