/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\json\index.js.ittf
*/
'use strict';
var async = require('async');
var md = {};
module.exports = md;
var Collection = require('../utils/collection');
md.directoryTree = require('./directoryTree');
md.FsJson = require('./fs/fsjson');
md.DocumentManager = require('./fs/documentmanager');
//
md.createDocumentManager = function(fsJsonDataOrFsJson) {
    if (fsJsonDataOrFsJson && fsJsonDataOrFsJson.classType === 'wizzi-repo.json.FsJson') {
        return new md.DocumentManager(fsJsonDataOrFsJson);
    }
    else {
        var jsonFsData = fsJsonDataOrFsJson || {};
        jsonFsData.items = jsonFsData.items || [];
        jsonFsData.documents = jsonFsData.documents || [];
        return new md.DocumentManager(new md.FsJson(jsonFsData));
    }
}
;
md.createFsJson = function(documents, callback) {
    md.createJsonFsData(documents, function(err, jsonFsData) {
        if (err) {
            return callback(err);
        }
        var fsJson = new md.FsJson(jsonFsData);
        return callback(null, fsJson);
    })
}
;
md.createFsJsonByJsonFsData = function(jsonFsData, callback) {
    var fsJson = new md.FsJson(jsonFsData);
    return callback(null, fsJson);
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
