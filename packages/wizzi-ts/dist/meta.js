/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.cli\packages\wizzi.cli\.wizzi\src\cmds\meta.js.ittf
    utc time: Fri, 26 Apr 2024 11:13:43 GMT
*/
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaPluginOptions = exports.pluginOptions = exports.writePackifiles = exports.loadMetaContext = exports.generateMeta = void 0;
const factory_1 = require("@wizzi/factory");
const utils_1 = require("@wizzi/utils");
const path_1 = __importDefault(require("path"));
const factory_2 = require("./factory");
function generateMeta(metaCtxPath, destPath, pluginsInfo, metaPluginsInfo, globalContext, callback) {
    loadMetaContext(metaCtxPath, pluginsInfo, (err, metaCtx) => {
        if (err) {
            return callback(err, null);
        }
        (0, factory_2.createJsonWizziFactoryAndJsonFs)({}, pluginsInfo, metaPluginsInfo, (err, wf_and_jsonFs) => {
            if (err) {
                return callback(err, null);
            }
            if (metaCtx) {
                metaCtx.__wz_fsc = new factory_1.FactoryServiceContext();
            }
            wf_and_jsonFs === null || wf_and_jsonFs === void 0 ? void 0 : wf_and_jsonFs.wf.executeMetaProduction({
                metaCtx: metaCtx || {},
                paths: {
                    metaProductionTempFolder: '___template',
                    metaProductionWizziFolder: '.wizzi'
                },
                globalContext: globalContext
            }, (err, wizziPackiFiles) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw err;
                }
                // loog 'wizzi.cli.meta.result.wizziPackiFiles.keys', Object.keys(wizziPackiFiles)
                if (metaCtx) {
                    metaCtx.__wz_fsc.dumpDebugObjects({
                        kind: 'packi',
                        destFolder: path_1.default.join(__dirname, 'dumps', 'packi')
                    });
                }
                writePackifiles(destPath, wizziPackiFiles);
            });
        });
    });
}
exports.generateMeta = generateMeta;
function loadMetaContext(metaCtxPath, pluginsInfo, callback) {
    (0, factory_2.createFsWizziFactory)({}, pluginsInfo, (err, wf) => {
        if (err) {
            return callback(err, null);
        }
        wf.loadModel('json', metaCtxPath, {
            mTreeBuildUpContext: {
                metaCtx: {}
            }
        }, (err, wizziModel) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, wizziModel);
        });
    });
}
exports.loadMetaContext = loadMetaContext;
function writePackifiles(folderPath, packiFiles) {
    const file = utils_1.fSystem.vfile();
    for (var k in packiFiles) {
        file.write(path_1.default.join(folderPath, k), packiFiles[k].contents);
    }
}
exports.writePackifiles = writePackifiles;
exports.pluginOptions = {
    items: [
        "./wizzi.plugin.html/index",
        "./wizzi.plugin.js/index",
        "./wizzi.plugin.css/index",
        "./wizzi.plugin.ittf/index",
        "./wizzi.plugin.json/index"
    ],
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
};
exports.metaPluginOptions = {
    items: [
        "./wizzi.meta.cloud/index",
        "./wizzi.meta.commons/index",
        "./wizzi.meta.docs/index",
        "./wizzi.meta.documents/index",
        "./wizzi.meta.js/index",
        "./wizzi.meta.js.db/index",
        "./wizzi.meta.js.express/index",
        "./wizzi.meta.js.node/index",
        "./wizzi.meta.js.vanilla/index",
        "./wizzi.meta.js.react/index",
        "./wizzi.meta.ts/index",
        "./wizzi.meta.ts.express/index",
        "./wizzi.meta.ts.nextjs/index",
        "./wizzi.meta.ts.react/index",
        "./wizzi.meta.ts.remix/index",
        "./wizzi.meta.ts.db/index",
        "./wizzi.meta.web/index",
        "./wizzi.meta.wizzi/index"
    ],
    metaPluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.metas/packages",
};
//# sourceMappingURL=meta.js.map