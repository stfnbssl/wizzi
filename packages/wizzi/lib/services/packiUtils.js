/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\packiUtils.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/

const file = require('@wizzi/utils').file;
const vfile = require('@wizzi/utils').vfile;
const verify = require('@wizzi/utils').verify;
const constants = require('../constants');
const JsonComponents = require('@wizzi/repo').JsonComponents;
let wizziFactory = null;

const mdDisplayName = "wizzi.services.packiUtils";

const {
    packiFilePrefix, 
    packiFilePrefixExtract, 
    metaProductionTempFolder, 
    metaProductionWizziFolder
 } = constants;

const md = module.exports = {};

md.ensurePackiFilePrefix = function(filePath) {
    return filePath.startsWith(packiFilePrefix) ? filePath : packiFilePrefix + filePath;
}
;

md.createPackifilesFromFs = function(folderPath, callback) {
    const fsFile = vfile();
    fsFile.getFiles(folderPath, {
        deep: true, 
        documentContent: true
     }, (err, files) => {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        const packiFiles = {};
        var i, i_items=files, i_len=files.length, file;
        for (i=0; i<i_len; i++) {
            file = files[i];
            packiFiles[file.relPath] = {
                type: 'CODE', 
                contents: file.content
             };
        }
        return callback(null, packiFiles);
    }
    )
}
;

md.jsonFsToPackiFiles = function(jsonFs, filterFolder, callback) {
    if (!callback) {
        callback = filterFolder;
        filterFolder = '';
    }
    filterFolder = filterFolder || '';
    const packiFiles = {};
    jsonFs.toFiles({
        removeRoot: packiFilePrefixExtract
     }, (err, files) => {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        files.forEach((file) => {
            if (verify.isEmpty(filterFolder) || file.relPath.startsWith(filterFolder + '/')) {
                const k = verify.isEmpty(filterFolder) ? file.relPath : file.relPath.substring(filterFolder.length + 1);
                packiFiles[k] = {
                    type: 'CODE', 
                    contents: file.content, 
                    generated: true
                 };
            }
        }
        )
        return callback(null, packiFiles);
    }
    )
}
;

md.writePackifiles = function(folderPath, packiFiles) {
    for (var k in packiFiles) {
        file.write(path.join(folderPath, k), packiFiles[k].contents)
    }
}
;

/**
     params
     [ metaProductions
     {
     string name
     { folderTemplates
     :ref PackiFiles
     { ittfDocumentTemplates
     :ref PackiFiles
     :optional
     { plainDocuments
     :ref PackiFiles
     :optional
     result
     {
     :ref PackiFiles
*/
md.createMetaPackifilesFromWizziHub = function(metaProductions) {
    const result = {};
    var i, i_items=metaProductions, i_len=metaProductions.length, mp;
    for (i=0; i<i_len; i++) {
        mp = metaProductions[i];
        for (var k in mp.folderTemplates) {
            var newk = 'folderTemplates/' + mp.productionName + '/' + k;
            result[newk] = mp.folderTemplates[k];
        }
        if (mp.ittfDocumentTemplates) {
            for (var k in mp.ittfDocumentTemplates) {
                var newk = 'ittfDocumentTemplates/' + mp.productionName + '/' + k;
                result[newk] = mp.ittfDocumentTemplates[k];
            }
        }
        if (mp.plainDocuments) {
            for (var k in mp.plainDocuments) {
                var newk = 'plainDocuments/' + mp.productionName + '/' + k;
                result[newk] = mp.plainDocuments[k];
            }
        }
    }
    return result;
}
;
md.createJsonWizziFactoryAndJsonFs = function(packiFiles, plugins, metaPlugins, callback) {
    const jsonDocuments = [];
    Object.keys(packiFiles).map((value) => {
        
        // loog 'createJsonWizziFactoryAndJsonFs.filePath', filePath
        if (packiFiles[value].type === 'CODE' && packiFiles[value].contents && packiFiles[value].contents.length > 0) {
            const filePath = md.ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: packiFiles[value].contents
             })
        }
    }
    )
    JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
        if (err) {
            return callback(err);
        }
        if (!wizziFactory) {
            wizziFactory = require('./wizziFactory');
        }
        // loog 'wizziFactory', wizziFactory
        wizziFactory.createFactory({
            repo: {
                storeKind: 'json', 
                storeJsonFs: jsonFs
             }, 
            plugins: plugins, 
            metaPlugins: metaPlugins || {}, 
            verbose: false
         }, (err, wf) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                wf: wf, 
                jsonFs: jsonFs
             })
        }
        )
    }
    )
}
;
md.mountToPackiFolder = function(packiFiles, packiFilesTobeMounted, folderName) {
    for (var k in packiFilesTobeMounted) {
        let basename = k;
        let prefix = '';
        if (k.startsWith(packiFilePrefix)) {
            basename = k.substring(packiFilePrefix.length);
            prefix = packiFilePrefix;
        }
        packiFiles[prefix + folderName + '/' + basename] = packiFilesTobeMounted[k];
    }
    return packiFiles;
}
;
md.unmountPackiFolder = function(packiFiles, folderName) {
    const result = {};
    for (var k in packiFiles) {
        let basename = k;
        let prefix = '';
        if (k.startsWith(packiFilePrefix)) {
            basename = k.substring(packiFilePrefix.length);
            prefix = packiFilePrefix;
        }
        if (basename.startsWith(folderName)) {
            result[prefix + basename.substring(folderName.length+1)] = packiFiles[k];
        }
    }
    return result;
}
;
md.getAddedFiles = function(packiFiles, packiFilesAfter) {
    const result = {};
    for (var k in packiFilesAfter) {
        if (!packiFiles[k]) {
            result[k] = packiFilesAfter[k];
        }
    }
    return result;
}
;