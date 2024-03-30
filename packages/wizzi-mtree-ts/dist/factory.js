'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizzifyFolder = exports.createContextFromFile = exports.loadContexts = exports.createJsonWizziFactoryAndJsonFs = exports.createFsWizziFactory = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = __importDefault(require("@wizzi/factory"));
const utils_1 = require("@wizzi/utils");
const repo_1 = __importDefault(require("@wizzi/repo"));
// const packi.packiFilePrefix = 'json:/';
function ensurePackiFilePrefix(filePath) {
    return filePath.startsWith(utils_1.packi.filePrefix) ? filePath : utils_1.packi.filePrefix + filePath;
}
function createFsWizziFactory(globalContext, extraPlugins, callback) {
    console.log("[33m%s[0m", 'extraPlugin', extraPlugins);
    factory_1.default.fsFactory({
        repo: { storeKind: "filesystem" },
        plugins: extraPlugins,
        globalContext: globalContext || {}
    }, callback);
}
exports.createFsWizziFactory = createFsWizziFactory;
function createJsonWizziFactoryAndJsonFs(packiFiles, extraPlugins, extraMetaPlugins, callback) {
    const jsonDocuments = [];
    console.log('createJsonWizziFactoryAndJsonFs', __filename);
    Object.keys(packiFiles).map((value) => {
        if (packiFiles[value].type === 'CODE' && packiFiles[value].contents && packiFiles[value].contents.length > 0) {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath,
                content: packiFiles[value].contents
            });
        }
    });
    repo_1.default.JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
        if (err) {
            return callback(err, null);
        }
        if (jsonFs == undefined) {
            return callback(err, null);
        }
        factory_1.default.jsonFactory({
            jsonFs: jsonFs,
            plugins: extraPlugins,
            metaPlugins: extraMetaPlugins
        }, (err, wf) => {
            if (err || !wf) {
                return callback(err, null);
            }
            callback(null, {
                wf: wf,
                jsonFs: jsonFs
            });
        });
    });
}
exports.createJsonWizziFactoryAndJsonFs = createJsonWizziFactoryAndJsonFs;
;
function loadContexts(contextFiles, plugins, checker, callback) {
    contextFiles.map(contextFile => {
        checker.checkFile(contextFile, contextFile);
    });
    if (!checker.isValid()) {
        return callback(null, {
            __is_checkerError: true
        });
    }
    const progressiveContext = {};
    function doLoadContext(ndx) {
        const contextFile = contextFiles[ndx];
        if (!contextFile) {
            console.log('progressiveContext', progressiveContext, __filename);
            return callback(null, progressiveContext);
        }
        createContextFromFile(checker.values[contextFile], progressiveContext, plugins, (err, context) => {
            if (err) {
                return callback(err, {});
            }
            const fileBasename = path_1.default.basename(contextFile);
            const contextName = fileBasename.split('.')[0];
            progressiveContext[contextName] = context;
            checker.checkNotNullOrUndefined(context, contextName, {
                message: "loaded context from " + contextFile
            });
            doLoadContext(ndx + 1);
        });
    }
    doLoadContext(0);
}
exports.loadContexts = loadContexts;
function createContextFromFile(filePath, previousContext, extraPlugins, callback) {
    const fInfo = utils_1.fSystem.fileInfoByPath(filePath);
    if (fInfo.isIttfDocument) {
        if (fInfo.schema == 'json') {
            createFsWizziFactory({}, extraPlugins, (err, wf) => {
                if (err) {
                    return callback(err, null);
                }
                wf.loadModelAndGenerateArtifact(filePath, {
                    modelRequestContext: previousContext || {},
                    artifactRequestContext: {}
                }, "json/module", (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    if (result == undefined) {
                        throw new Error("");
                    }
                    console.log('result', result, __filename);
                    callback(null, JSON.parse(result));
                });
            });
        }
        else {
            callback({
                __is_error: true,
                message: 'Wizzi schema of context file ' + filePath + ' not managed'
            }, null);
        }
    }
    else {
        if (fInfo.extension == 'json') {
            utils_1.fSystem.vfile({ storeName: 'filesystem' }, (err, vfileImpl) => {
                if (err) {
                    return callback(err, null);
                }
                vfileImpl.read(filePath, (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, JSON.parse(result));
                });
            });
        }
        else {
            callback({
                __is_error: true,
                message: 'Mime type of context file ' + filePath + ' not managed'
            }, null);
        }
    }
}
exports.createContextFromFile = createContextFromFile;
function wizzifyFolder(wf, sourceFolder, destFolder, callback) {
    // console.log('wizzifyFolder.sourceFolder', sourceFolder, __filename);
    // console.log('wizzifyFolder.destFolder', destFolder, __filename);
    utils_1.fSystem.vfile({ storeName: 'filesystem' }, (err, vfileImpl) => {
        vfileImpl.getFiles(sourceFolder, {
            deep: true,
            documentContent: false
        }, (err, files) => {
            if (err) {
                return callback(err, null);
            }
            // console.log('wizzifyFolder.sourceFiles', files.length, __filename);
            function run(i) {
                if (!files[i]) {
                    return callback(null, null);
                }
                var sourcePath = files[i].fullPath;
                try {
                    var wizzifyName = getWizzifyExtension(sourcePath);
                    if (!wf.canWizzify(wizzifyName)) {
                        console.log(i + 1, '/', files.length, sourcePath, 'has no wizzifier', __filename);
                        return vfileImpl.copyFile(sourcePath, path_1.default.join(destFolder, files[i].relPath), (err, result) => {
                            if (err) {
                                console.log("[31m%s[0m", 'copying file', sourcePath);
                                console.log("[31m%s[0m", err);
                                return run(i + 1);
                            }
                            console.log(i + 1, '/', files.length, sourcePath, 'copied', __filename);
                            return run(i + 1);
                        });
                    }
                    var destPath = path_1.default.join(destFolder, files[i].relPath + '.ittf');
                    vfileImpl.read(sourcePath, (err, content) => {
                        wf.getWizziIttfFromText(content, wizzifyName, (err, result) => {
                            if (err) {
                                console.log("[31m%s[0m", 'on file', sourcePath);
                                console.log("[31m%s[0m", err);
                                return process.nextTick(() => run(i + 1));
                            }
                            vfileImpl.write(destPath, result, (err, vfileImpl) => {
                                console.log('Done. Wizzify file', destPath, __filename);
                                return process.nextTick(() => run(i + 1));
                            });
                        });
                    });
                }
                catch (ex) {
                    console.log("[31m%s[0m", 'in file', sourcePath, 'message', ex.message);
                    process.nextTick(() => run(i + 1));
                }
            }
            run(0);
        });
    });
}
exports.wizzifyFolder = wizzifyFolder;
function getWizzifyExtension(sourcePath) {
    return path_1.default.extname(sourcePath).substring(1);
}
//# sourceMappingURL=factory.js.map