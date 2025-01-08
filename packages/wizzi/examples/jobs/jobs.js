/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\examples\jobs\jobs.js.ittf
    utc time: Thu, 02 Jan 2025 12:51:30 GMT
*/
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var async = require('async');
var wizziUtils = require('@wizzi/utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var wizzi = null;
function createWizziFactory(globalContext, callback) {
    
    // The wizzi package will be a previous version from wizzi/node_modules
    if (wizzi == null) {
        wizzi = require('../../index');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsFactory({
        plugins: {
            items: [
                'wizzi-js', 
                './wizzi-web/index', 
                './wizzi-core/index'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', '..', '..')
         }, 
        globalContext: globalContext || {}
     }, callback)
}
function loadMTree(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        wf.loadMTree(ittfDocumentUri, context, callback)
    })
}
function loadWizziModel(ittfDocumentUri, context, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        wf.loadModel(fi.schema, ittfDocumentUri, {
            mTreeBuildUpContext: context, 
            globalContext: {}
         }, callback)
    })
}
function loadModelAndGenerateArtifact(ittfDocumentUri, context, artifactName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
            modelRequestContext: context, 
            artifactRequestContext: {}
         }, artifactName, callback)
    })
}
function executeWizziJob(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        wf.executeJob({
            name: path.basename(ittfDocumentUri), 
            path: ittfDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
             }), 
            modelContext: context || {}, 
            jobContext: {}
         }, callback)
    })
}
function executegenerateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        wf.generateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback)
    })
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        }
        )
    ;
}
function fileInfoByPath(filePath, baseFolder) {
    if (typeof baseFolder === 'undefined') {
        baseFolder = path.dirname(filePath);
    }
    filePath = normalize(filePath);
    var basename = path.basename(filePath);
    var dirname = path.dirname(filePath);
    var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr();
    var ss = basename.split('.');
    if (ss[ss.length-1] === 'ittf') {
        var name = ss.slice(0, ss.length-2).join('.');
        var schema = ss[ss.length-2];
        var mime = DEFAULT_MIME[schema] || schema;
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: true, 
                isFragment: filePath.indexOf('/t/') > -1, 
                schema: schema, 
                mime: mime, 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: name + '.' + mime, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + name + '.' + mime : name + '.' + mime
             };
    }
    else {
        return {
                name: ss.slice(0, ss.length-1).join('.'), 
                basename: basename, 
                isIttfDocument: false, 
                schema: null, 
                mime: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: basename, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + basename : basename
             };
    }
}
function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}
var DEFAULT_MIME = {
    css: 'css', 
    graphql: 'graphql', 
    html: 'html', 
    js: 'js', 
    json: 'json', 
    scss: 'scss', 
    text: 'text', 
    ts: 'ts', 
    xml: 'xml', 
    vtt: 'vtt', 
    vue: 'vue'
 };
executeLoadFolderModels('job_globalModels', `wzjob`, {}, function(err, notUsed) {
    if (err) {
        return callback(err);
    }
    executeFolderJobs('job_globalModels', `wzjob`, {}, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
    })
})
function executeLoadFolderModels(folder, schema, context, callback) {
    var suffix = schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf';
    var ittfPath = path.join(__dirname, 'ittf', folder);
    // loog 'executeLoadFolderModels.ittfPath,schema', ittfPath, schema
    async.mapSeries(getFiles(ittfPath,schema), function(item, callback) {
        item = item.substring(0, item.length - suffix.length);
        console.log('wizzi-core.examples.jobs.item', item, 'schema', schema);
        executeLoadModel(item, folder, schema, context, callback);
    }, function(err, result) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    })
}
function executeLoadModel(name, folder, schema, context, callback) {
    var ittfSource = path.join(__dirname, 'ittf', folder, schema === 'ittf' ? name + '.ittf' : name + '.' + schema + '.ittf');
    var jsOutput = path.join(__dirname, 'outputs', folder, name + '.g.' + schema);
    console.log('wizzi-core.examples.jobs.before-load ittfSource', ittfSource, 'schema', schema);
    loadWizziModel(ittfSource, context || {}, function(err, jsWizziModel) {
        if (err) {
            console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log("[31m%s[0m", 'err', err);
            throw new Error(err.message);
        }
        // loog 'wizzi-core.examples.index.loaded ittfSource', ittfSource, 'schema', schema
        // loog 'jsWizziModel', jsWizziModel
        if (jsWizziModel.toJson) {
            file.write(jsOutput, stringify(jsWizziModel.toJson(), null, 4))
        }
        else {
            file.write(jsOutput, stringify(jsWizziModel, null, 4))
        }
        return callback(null);
    })
}
function executeFolderJobs(folder, schema, context, callback) {
    var suffix = schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf';
    var ittfPath = path.join(__dirname, 'ittf', folder);
    async.mapSeries(getFiles(ittfPath,schema), function(item, callback) {
        item = item.substring(0, item.length - suffix.length);
        console.log('wizzi-core.examples.jobs.item', item, 'schema', schema);
        executeJob(item, folder, schema, context, callback);
    }, function(err, result) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    })
}
function executeJob(name, folder, schema, context, callback) {
    var ittfSource = path.join(__dirname, 'ittf', folder, schema === 'ittf' ? name + '.ittf' : name + '.' + schema + '.ittf');
    executeWizziJob(ittfSource, context || {}, function(err, jobResult) {
        if (err) {
            console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log("[31m%s[0m", 'err', err);
            throw new Error(err.message);
        }
        console.log('jobResult.mTrees', jobResult.productionContext.mTrees);
        console.log('jobResult.wizziModels', Object.keys(jobResult.productionContext.wizziModels));
        console.log('jobResult.globalModels', jobResult.productionContext.globalModels);
        console.log('jobResult.artifactCollections', jobResult.productionContext.artifactCollections);
        return callback(null);
    })
}