{
    "wzName": "",
    "wzParent": null,
    "wzChildren": [],
    "wzElement": "module",
    "statements": [
        {
            "wzName": "sayHello",
            "wzParent": "[Circular ~]",
            "wzSourceLineInfo": {
                "row": 4,
                "col": 5,
                "sourceKey": "f1"
            },
            "wzChildren": [],
            "wzElement": "xfunction",
            "statements": [
                {
                    "wzName": "'Hello', name",
                    "wzParent": "[Circular ~.statements.0]",
                    "wzSourceLineInfo": {
                        "row": 6,
                        "col": 9,
                        "sourceKey": "f1"
                    },
                    "wzChildren": [],
                    "wzElement": "log",
                    "statements": [],
                    "wzTag": "log"
                }
            ],
            "xasync": false,
            "xgenerator": false,
            "params": [
                {
                    "wzName": "name",
                    "wzParent": "[Circular ~.statements.0]",
                    "wzSourceLineInfo": {
                        "row": 5,
                        "col": 9,
                        "sourceKey": "f1"
                    },
                    "wzChildren": [],
                    "wzElement": "stringParam",
                    "isOptional": false,
                    "restrict": null,
                    "facets": [],
                    "comments": [],
                    "wzTag": "string",
                    "isRequired": true
                }
            ],
            "wzTag": "function",
            "paramNames": [
                "name"
            ],
            "constrainedParams": [
                {
                    "wzName": "name",
                    "wzParent": "[Circular ~.statements.0]",
                    "wzSourceLineInfo": {
                        "row": 5,
                        "col": 9,
                        "sourceKey": "f1"
                    },
                    "wzChildren": [],
                    "wzElement": "stringParam",
                    "isOptional": false,
                    "restrict": null,
                    "facets": [],
                    "comments": [],
                    "wzTag": "string",
                    "isRequired": true
                }
            ],
            "hasCallbackParam": false,
            "hasOptionsCallbackParam": false
        }
    ],
    "allowedKINDS": [
        "jsfile",
        "nodejs.bin",
        "react",
        "es6"
    ],
    "KIND_JSFILE": "jsfile",
    "KIND_NODEJS_BIN": "nodejs.bin",
    "KIND_REACT": "react",
    "KIND_ES6": "es6",
    "allowedECMAS": [
        "es5",
        "es6"
    ],
    "ECMA_ES5": "es5",
    "ECMA_ES6": "es6",
    "kind": "jsfile",
    "ecma": "es5",
    "no_strict": false,
    "features": [
        {
            "wzName": "argument-check",
            "wzParent": "[Circular ~]",
            "wzSourceLineInfo": {
                "row": 5,
                "col": 9,
                "sourceKey": "f1"
            },
            "wzChildren": [],
            "allowedKINDS": [
                "argument-check"
            ],
            "KIND_ARGUMENT_CHECK": "argument-check",
            "wzElement": "feature"
        }
    ],
    "loadHistory": {
        "__type": "LoadHistory",
        "ittfDocumentDatas": {
            "f1": {
                "ittfDocumentUri": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist\\examples\\ittf\\jss\\temp.js.ittf",
                "sourceKey": "f1",
                "content": "module\r\n\tkind jsfile\r\n\r\n\tfunction sayHello\r\n        string name\r\n\t\tlog 'Hello', name\r\n"
            }
        },
        "mTreeBrickDatas": {
            "f1": {
                "ittfDocumentUri": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist\\examples\\ittf\\jss\\temp.js.ittf",
                "schema": "js",
                "sourceKey": "f1",
                "brickKey": "f1",
                "mTreeBrick": {
                    "uri": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist\\examples\\ittf\\jss\\temp.js.ittf",
                    "loadHistory": "[Circular ~.loadHistory]",
                    "frontMatter": {},
                    "nodes": [
                        {
                            "n": "module",
                            "v": "",
                            "r": 1,
                            "c": 1,
                            "s": "f1",
                            "u": "f1",
                            "parent": null,
                            "children": [
                                {
                                    "n": "kind",
                                    "v": "jsfile",
                                    "r": 2,
                                    "c": 5,
                                    "s": "f1",
                                    "u": "f1",
                                    "parent": "[Circular ~.loadHistory.mTreeBrickDatas.f1.mTreeBrick.nodes.0]",
                                    "children": []
                                },
                                {
                                    "n": "function",
                                    "v": "sayHello",
                                    "r": 4,
                                    "c": 5,
                                    "s": "f1",
                                    "u": "f1",
                                    "parent": "[Circular ~.loadHistory.mTreeBrickDatas.f1.mTreeBrick.nodes.0]",
                                    "children": [
                                        {
                                            "n": "string",
                                            "v": "name",
                                            "r": 5,
                                            "c": 9,
                                            "s": "f1",
                                            "u": "f1",
                                            "parent": "[Circular ~.loadHistory.mTreeBrickDatas.f1.mTreeBrick.nodes.0.children.1]",
                                            "children": []
                                        },
                                        {
                                            "n": "log",
                                            "v": "'Hello', name",
                                            "r": 6,
                                            "c": 9,
                                            "s": "f1",
                                            "u": "f1",
                                            "parent": "[Circular ~.loadHistory.mTreeBrickDatas.f1.mTreeBrick.nodes.0.children.1]",
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "sourceKey": "f1",
                    "brickKey": "f1",
                    "$schema": "js",
                    "mixed": false,
                    "data": {
                        "createdAt": "7/6/2019:13:8:15"
                    }
                },
                "evalContext": null
            }
        },
        "sourceCount": 1,
        "modelCount": 1,
        "nodeCount": 10,
        "callChain": []
    },
    "wzFactory": {
        "__type": "WizziFactory",
        "user": "stefi",
        "role": "admin",
        "storeKind": "filesystem",
        "fileService": {
            "fsimpl": {
                "kind": "filesystem"
            }
        },
        "storePool": {
            "wizziFactory": "[Circular ~.wzFactory]",
            "stores": [
                {
                    "storeImpl": {
                        "storeKind": "filesystem"
                    },
                    "storeKind": "filesystem"
                }
            ],
            "repoOptions": {
                "storeKind": "filesystem"
            },
            "storeKind": "filesystem",
            "fileService": {
                "fsimpl": {
                    "kind": "filesystem"
                }
            }
        },
        "pluginsManager": {
            "packagePathCache": {
                "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist": {
                    "wizzi-core/package.json": "C:\\My\\wizzi\\wizzi\\node_modules\\wizzi-core\\package.json",
                    "wizzi-web/package.json": "C:\\My\\wizzi\\wizzi\\node_modules\\wizzi-web\\package.json",
                    "./index.js": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist\\index.js"
                }
            },
            "factoryPlugins": [
                {
                    "file": {
                        "defaultEncoding": "utf8",
                        "preserveBOM": false
                    },
                    "provides": {
                        "schemas": [
                            "ittf",
                            "json",
                            "text",
                            "wfjob",
                            "wfschema",
                            "xml"
                        ],
                        "modelTransformers": [
                            "wfschema/json_docs"
                        ],
                        "artifactGenerators": [
                            "json/document",
                            "json/export",
                            "ittf/document",
                            "text/document",
                            "wfschema/factory",
                            "wfschema/model",
                            "wfschema/html_docs",
                            "xml/document",
                            "xml/export"
                        ]
                    },
                    "modelFactories": {
                        "dummy": null,
                        "js": null
                    },
                    "modelTransformers": {
                        "dummy": null
                    },
                    "artifactGenerators": {
                        "dummy": null
                    },
                    "schemaDefinitions": {},
                    "packageName": "wizzi-core",
                    "packagePath": "C:\\My\\wizzi\\wizzi\\node_modules\\wizzi-core"
                },
                {
                    "file": {
                        "defaultEncoding": "utf8",
                        "preserveBOM": false
                    },
                    "provides": {
                        "schemas": [
                            "html",
                            "css",
                            "scss",
                            "svg",
                            "md",
                            "graphql",
                            "vtt",
                            "vue"
                        ],
                        "modelTransformers": [],
                        "artifactGenerators": [
                            "html/document",
                            "css/document",
                            "scss/document",
                            "svg/document",
                            "md/document",
                            "graphql/document",
                            "vtt/document",
                            "vue/document"
                        ]
                    },
                    "modelFactories": {
                        "dummy": null,
                        "js": null
                    },
                    "modelTransformers": {
                        "dummy": null
                    },
                    "artifactGenerators": {
                        "dummy": null
                    },
                    "schemaDefinitions": {},
                    "packageName": "wizzi-web",
                    "packagePath": "C:\\My\\wizzi\\wizzi\\node_modules\\wizzi-web"
                },
                {
                    "file": {
                        "defaultEncoding": "utf8",
                        "preserveBOM": false
                    },
                    "provides": {
                        "schemas": [
                            "js",
                            "ts"
                        ],
                        "modelTransformers": [],
                        "artifactGenerators": [
                            "js/module",
                            "ts/module"
                        ]
                    },
                    "modelFactories": {
                        "dummy": null,
                        "js": {}
                    },
                    "modelTransformers": {
                        "dummy": null
                    },
                    "artifactGenerators": {
                        "dummy": null
                    },
                    "schemaDefinitions": {},
                    "packageName": "./index",
                    "packagePath": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist\\index.js"
                }
            ],
            "providedSchemas": [
                {
                    "name": "ittf"
                },
                {
                    "name": "json"
                },
                {
                    "name": "text"
                },
                {
                    "name": "wfjob"
                },
                {
                    "name": "wfschema"
                },
                {
                    "name": "xml"
                },
                {
                    "name": "html"
                },
                {
                    "name": "css"
                },
                {
                    "name": "scss"
                },
                {
                    "name": "svg"
                },
                {
                    "name": "md"
                },
                {
                    "name": "graphql"
                },
                {
                    "name": "vtt"
                },
                {
                    "name": "vue"
                },
                {
                    "name": "js"
                },
                {
                    "name": "ts"
                }
            ],
            "providedModelTransformers": [
                {
                    "name": "wfschema/json_docs"
                }
            ],
            "providedArtifactGenerators": [
                {
                    "name": "json/document"
                },
                {
                    "name": "json/export"
                },
                {
                    "name": "ittf/document"
                },
                {
                    "name": "text/document"
                },
                {
                    "name": "wfschema/factory"
                },
                {
                    "name": "wfschema/model"
                },
                {
                    "name": "wfschema/html_docs"
                },
                {
                    "name": "xml/document"
                },
                {
                    "name": "xml/export"
                },
                {
                    "name": "html/document"
                },
                {
                    "name": "css/document"
                },
                {
                    "name": "scss/document"
                },
                {
                    "name": "svg/document"
                },
                {
                    "name": "md/document"
                },
                {
                    "name": "graphql/document"
                },
                {
                    "name": "vtt/document"
                },
                {
                    "name": "vue/document"
                },
                {
                    "name": "js/module"
                },
                {
                    "name": "ts/module"
                }
            ]
        },
        "modelLoaders": {},
        "modelTransformers": {},
        "artifactGenerators": {},
        "schemaDefinitions": {},
        "globalContext": {},
        "pluginsOptions": {
            "items": [
                {
                    "packagePath": "C:\\My\\wizzi\\wizzi\\node_modules\\wizzi-core",
                    "provides": {
                        "schemas": [
                            "ittf",
                            "json",
                            "text",
                            "wfjob",
                            "wfschema",
                            "xml"
                        ],
                        "modelTransformers": [
                            "wfschema/json_docs"
                        ],
                        "artifactGenerators": [
                            "json/document",
                            "json/export",
                            "ittf/document",
                            "text/document",
                            "wfschema/factory",
                            "wfschema/model",
                            "wfschema/html_docs",
                            "xml/document",
                            "xml/export"
                        ]
                    },
                    "consumes": [],
                    "packageName": "wizzi-core"
                },
                {
                    "packagePath": "C:\\My\\wizzi\\wizzi\\node_modules\\wizzi-web",
                    "provides": {
                        "schemas": [
                            "html",
                            "css",
                            "scss",
                            "svg",
                            "md",
                            "graphql",
                            "vtt",
                            "vue"
                        ],
                        "modelTransformers": [],
                        "artifactGenerators": [
                            "html/document",
                            "css/document",
                            "scss/document",
                            "svg/document",
                            "md/document",
                            "graphql/document",
                            "vtt/document",
                            "vue/document"
                        ]
                    },
                    "consumes": [],
                    "packageName": "wizzi-web"
                },
                {
                    "packagePath": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist\\index.js",
                    "provides": {
                        "schemas": [
                            "js",
                            "ts"
                        ],
                        "modelTransformers": [],
                        "artifactGenerators": [
                            "js/module",
                            "ts/module"
                        ]
                    },
                    "consumes": [],
                    "packageName": "./index"
                }
            ],
            "pluginsBaseFolder": "C:\\My\\wizzi\\wizzi\\packages\\wizzi-js\\dist"
        },
        "store": {
            "storeImpl": {
                "storeKind": "filesystem"
            },
            "storeKind": "filesystem"
        }
    },
    "wzModelState": {}
}