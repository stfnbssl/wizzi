/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\json\index.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:29 GMT
*/
'use strict';
var async = require('async');
var packi = require('@wizzi/utils').packi;
var fSystem = require('@wizzi/utils').fSystem;
var md = {};
module.exports = md;
var Collection = require('../utils/collection');
md.directoryTree = require('./directoryTree');
md.JsonFs = require('./fs/jsonFs');
md.JsonFsImpl = require('./jsonFsimpl');
md.DocumentManager = require('./fs/documentmanager');
/**
     params
     { jsonFsData
     [ items
     [ documents
     jsonFsData is simply a transport (DTO)
     to get the updated jsonFsData you
     must call the toJson method of the DocumentManager instance
*/
md.createDocumentManager = function(jsonFsDataOrJsonFs) {
    if (jsonFsDataOrJsonFs && jsonFsDataOrJsonFs.classType === 'wizzi-repo.json.JsonFs') {
        return new md.DocumentManager(jsonFsDataOrJsonFs);
    }
    else {
        var jsonFsData = jsonFsDataOrJsonFs || {};
        jsonFsData.items = jsonFsData.items || [];
        jsonFsData.documents = jsonFsData.documents || [];
        return new md.DocumentManager(new md.JsonFs(jsonFsData));
    }
}
;
md.createJsonFs = function(documents, callback) {
    md.createJsonFsData(documents, function(err, jsonFsData) {
        if (err) {
            return callback(err);
        }
        var jsonFs = new md.JsonFs(jsonFsData);
        return callback(null, jsonFs);
    })
}
;
md.createJsonFsByJsonFsData = function(jsonFsData, callback) {
    var jsonFs = new md.JsonFs(jsonFsData);
    return callback(null, jsonFs);
}
;
md.createJsonFsData = function(documents, callback) {
    const doc = this.createDocumentManager();
    async.map(documents, (document, callback) => 
        doc.writeFile(document.path, document.content, callback)
    , function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        doc.toJson(callback)
    })
}
;
md.addToJsonFsData = function(jsonFsData, documents, callback) {
    const doc = this.createDocumentManager(jsonFsData);
    async.map(documents, (document, callback) => 
        doc.writeFile(document.path, document.content, callback)
    , function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        doc.toJson(callback)
    })
}
;
md.packiFilesToJsonDocuments = function(files) {
    const jsonDocuments = [];
    Object.keys(files).map((value) => {
        if (files[value].type === 'CODE' && files[value].contents && files[value].contents.length > 0) {
            const filePath = packi.ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: files[value].contents
             })
        }
    }
    )
    return jsonDocuments;
}
;
md.packiFilesToJsonFs = function(files, callback) {
    md.createJsonFs(md.packiFilesToJsonDocuments(files), function(err, jsonFs) {
        if (err) {
            return callback(err);
        }
        return callback(null, jsonFs);
    })
}
;
md.packiFilesToUtilVFileJson = function(files, callback) {
    md.packiFilesToJsonFs(files, function(err, jsonFs) {
        if (err) {
            return callback(err);
        }
        var fsimpl = new md.JsonFsImpl({});
        fsimpl.open({
            jsonFs: jsonFs
         }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            fSystem.vfile(fsimpl, function(err, _jsonfile) {
                if (err) {
                    return callback(err);
                }
                return callback(null, _jsonfile);
            })
        })
    })
}
;