/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfScanner\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var IttfFsNode = require('./ittfFsNode');
var folderScanner = require('./folderScanner');
var folderBrowse = require('./folderBrowse');
var ittfDocumentScanner = require('./ittfDocumentScanner');
var textDocumentScanner = require('./textDocumentScanner');
var md = module.exports = {};
md.IttfFsNode = IttfFsNode;
md.scanFolder = function(folderPath, options, callback) {
    folderScanner.scan(folderPath, options, callback)
}
;
md.browseFolder = function(folderPath, options, callback) {
    folderBrowse.scan(folderPath, options, callback)
}
;
md.scanIttfDocument = function(documentPath, options, callback) {
    ittfDocumentScanner.scan(documentPath, options, callback)
}
;
md.scanTextDocument = function(documentPath, options, callback) {
    ittfDocumentScanner.scan(documentPath, options, callback)
}
;