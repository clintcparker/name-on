/**
 * @file Source code generated by PDL compiler.
 * @version 999.999.999.999
 * @sdkversion 5.0.302.1192
 * @schemaversion 1.0.0.2
 */
/// <reference path="../../TypeReferences.d.ts" />
/// <amd-dependency path="../../Workflow/ViewModels/WorkflowPart" />
define(["require", "exports", "../../Workflow/ViewModels/WorkflowPart"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.part = {
            "styleSheets": [],
            "name": "WorkflowPart",
            "viewModel": "Workflow$WorkflowPart",
            "partKind": 22,
            "canUseOldInputVersions": false,
            "inputs": [
                "id"
            ],
            "bindings": [
                {
                    "property": "id",
                    "valuesFrom": [
                        {
                            "referenceType": 1,
                            "property": "id"
                        }
                    ]
                }
            ],
            "details": [
                {
                    "blade": "WorkflowResourceBlade",
                    "selectableBindings": [
                        {
                            "property": "id",
                            "valuesFrom": [
                                {
                                    "referenceType": 0,
                                    "property": "content.id"
                                }
                            ]
                        }
                    ]
                }
            ],
            "initialSize": 2,
            "assetType": "Workflow",
            "assetIdInputProperty": "id",
            "permissions": [
                {
                    "permissionType": 0,
                    "assetType": "Workflow",
                    "assetId": {
                        "sourceType": 0,
                        "property": "id"
                    },
                    "action": "Microsoft.Logic/workflows/read"
                }
            ]
        };
    })(Main || (Main = {}));
    return Main;
});