/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\packiUtils.js.ittf
    utc time: Fri, 23 Feb 2024 04:14:45 GMT
*/
'use strict';

const file = require('@wizzi/utils').file;
const vfile = require('@wizzi/utils').vfile;
const verify = require('@wizzi/utils').verify;
const costants = require('../costants');

const mdDisplayName = "wizzi.services.packiUtils";

const {
    packiFilePrefix, 
    packiFilePrefixExtract, 
    metaProductionTempFolder, 
    metaProductionWizziFolder
 } = costants;

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
    filterFolder = filterFolder || '';
    const packiFiles = {};
    jsonFs.toFiles({
        removeRoot: packiFilePrefixExtract
     }, (err, files) => {
    
        if (err) {
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
