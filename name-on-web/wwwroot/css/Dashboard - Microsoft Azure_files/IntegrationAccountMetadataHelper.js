/// <reference path="../../TypeReferences.d.ts" />
define(["require", "exports", "../Constants"], function (require, exports, Constants) {
    "use strict";
    var MetadataHelper = (function () {
        function MetadataHelper() {
        }
        MetadataHelper.ConvertMetadataToMetadataEntityArray = function (metadata) {
            // This is used to convert from json metadata to array for the grid.
            // If the value is an object, then "[object]" must be displayed in the place of value.
            var result = [];
            if (!metadata) {
                return result;
            }
            for (var key in metadata) {
                if (metadata.hasOwnProperty(key)) {
                    var entity = MsPortalFx.Data.Metadata.createEmptyObject(IntegrationAccount.DataModels.MetadataEntityType);
                    entity.key(key);
                    var entityValue = metadata[key];
                    if (typeof entityValue === "string" ||
                        typeof entityValue === "number" ||
                        typeof entityValue === "boolean" ||
                        typeof entityValue === "undefined") {
                        // These are accepted values.
                        entity.value(entityValue);
                    }
                    else {
                        // Otherwise it is considered an object.
                        entity.valueObject(entityValue);
                        entity.value(Constants.Metadata.Object);
                    }
                    result.push(entity);
                }
            }
            return result;
        };
        MetadataHelper.ConvertMetadataEntityArrayToObject = function (metadataEntity) {
            // This is used to convert from array to json.
            // If the value is an object, it cannot be edited. So the original value is just replaced.
            var result = {};
            if (!metadataEntity) {
                return result;
            }
            metadataEntity.forEach(function (element) {
                // value() will never be empty. Hence using valueObject()
                if (!element.valueObject()) {
                    result[element.key()] = element.value();
                }
                else {
                    result[element.key()] = ko.toJS(element.valueObject);
                }
            });
            return result;
        };
        return MetadataHelper;
    }());
    return MetadataHelper;
});
