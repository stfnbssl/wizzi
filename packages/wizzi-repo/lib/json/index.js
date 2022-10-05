/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\json\index.js.ittf
*/
'use strict';
var async = require('async');
var md = {};
module.exports = md;
var Collection = require('../utils/collection');
md.directoryTree = require('./directoryTree');
md.JsonFs = require('./fs/fsjson');
md.DocumentManager = require('./fs/documentmanager');
//
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
