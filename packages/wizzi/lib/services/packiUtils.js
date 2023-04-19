/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\packiUtils.js.ittf
*/
'use strict';

const file = require('@wizzi/utils').file;
const vfile = require('@wizzi/utils').vfile;
const verify = require('@wizzi/utils').verify;

const mdDisplayName = "wizzi.services.packiUtils";

const packiFilePrefix = 'json:/';
const packiFilePrefixExtract = 'json:/';
const metaProductionTempFolder = '___temp';
const metaProductionDestFolder = '.wizzi';

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
    const packiFiles = {};
    jsonFs.toFiles({
        removeRoot: packiFilePrefixExtract
     }, (err, files) => {
    
        if (err) {
            return callback(err);
        }
        files.forEach((file) => {
        
            if (verify.isEmpty(filterFolder) || file.relPath.startsWith(filterFolder + '/')) {
                const k = filterFolder ? file.relPath.substring(filterFolder.length) : file.realpath;
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
