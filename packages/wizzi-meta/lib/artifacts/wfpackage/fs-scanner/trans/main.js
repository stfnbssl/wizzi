/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-meta\.wizzi\lib\artifacts\wfpackage\fs-scanner\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('wizzi-utils').verify;
var async = require('async');
var ittfScanner = require('wizzi-utils').ittfScanner;

var myname = 'model.transformer.wfpackage.fs-scanner';

var md = module.exports = {};

md.trans = function(model, ctx, callback) {
    if (verify.isFunction(callback) != true) {
        throw new Error(myname + ' a callback parameter of type function is required. In uri: ' + model.ittfDocumentUri);
    }
    if (verify.isObject(ctx) != true) {
        throw new Error(myname + ' a context parameter of type object is required. In uri: ' + model.ittfDocumentUri);
    }
    if (model.wzElement !== 'wfpackage') {
        throw new Error(myname + ' the model wzElement must be: wfpackage. Found: ' + model.wzElement + '. in uri: ' + model.ittfDocumentUri);
    }
    var transformed = {
        generatedPackages: []
     };
    var fsBaseUri = model.fsBaseUri;
    // log myname, 'fsBaseUri', fsBaseUri
    async.map(model.generatedPackages, function(item, callback) {
        var srcPath = path.join(fsBaseUri, item.sourceFolder);
        console.log(myname, 'package', item.wzName, 'srcPath', srcPath);
        ittfScanner.scanFolder(srcPath, {
            name: item.wzName, 
            gitPath: item.gitBaseUri
         }, function(err, ittf) {
            if (err) {
                return callback(err);
            }
            ittf.insertAt('version', item.version, 1)
            ittf.insertAt('title', item.title, 2)
            /**
                TODO why folderScanner.scan already sets this
                ittf.insertAt('src-cwd', srcPath, 3)*/
            transformed.generatedPackages.push(ittf)
            return callback();
        })
    }, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, transformed)
    })
}
;
