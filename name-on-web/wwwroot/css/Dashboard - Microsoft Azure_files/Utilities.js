define(["require", "exports"], function (require, exports) {
    "use strict";
    var Utilities = (function () {
        function Utilities() {
        }
        Utilities.findPropertyIgnoreCase = function (property, properties) {
            var match = Object.keys(properties || {}).filter(function (key) {
                return StringEx.equals(property, key, StringComparison.IgnoreCase);
            }).first();
            return match ? properties[match] : null;
        };
        Utilities.isNullOrUndefined = function (value) {
            return value === null || value === undefined;
        };
        Utilities.isNullOrWhitespace = function (value) {
            return Utilities.isNullOrUndefined(value) || typeof value === "string" && value.trim() === "";
        };
        Utilities.isNullOrEmptyObject = function (value) {
            return Utilities.isNullOrUndefined(value) || (typeof value === "object" && Object.keys(value).length === 0);
        };
        Utilities.validateInputs = function (inputs) {
            var valid = true, deferred = Q.defer();
            inputs.forEach(function (input) {
                input.validate(input.validate() + 1);
            });
            window.setTimeout(function () {
                inputs.forEach(function (input) {
                    valid = valid && input.valid();
                });
                deferred.resolve(valid);
            }, 900);
            return deferred.promise;
        };
        Utilities.getQueryParameters = function (status, startTime, startTimeOperator, top) {
            var query = {};
            var filters = [];
            if (!!status) {
                filters.push("status eq '" + status + "'");
            }
            if (!!startTime && !!startTimeOperator) {
                filters.push("startTime " + startTimeOperator + " " + startTime.toISOString());
            }
            if (filters.length > 0) {
                query["$filter"] = filters.join(" and ");
            }
            if (top > 0) {
                query["$top"] = "" + top;
            }
            return query;
        };
        Utilities.padStart = function (value, targetLength, padString) {
            if (padString === void 0) { padString = " "; }
            value = String(value);
            if (!!String.prototype["padStart"]) {
                return value.padStart(targetLength, padString);
            }
            targetLength = targetLength >> 0; // concise version of Math.trunc
            if (value.length > targetLength) {
                return String(value);
            }
            padString = String(padString);
            targetLength = targetLength - value.length;
            if (targetLength > padString.length) {
                var bounds = targetLength / padString.length;
                for (var index = 0; index < bounds; index++) {
                    padString += padString;
                }
            }
            return padString.slice(0, targetLength) + value;
        };
        return Utilities;
    }());
    return Utilities;
});
