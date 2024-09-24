/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfGraph\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var ittfFinder = require('./ittfFinder');
var ittfWriter = require('./ittfWriter');
var asIsLoader = require('./asIsLoader/index');
var IttfDocumentGraph = require('./ittfDocumentGraph');
var md = module.exports = {};
md.ittfFinder = ittfFinder;
md.ittfWriter = ittfWriter;
md.asIsLoader = asIsLoader;
md.IttfDocumentGraph = IttfDocumentGraph;
md.createAsIsLoaderFromString = function(text, options, callback) {
    asIsLoader.createFromString(text, options, callback)
}
;
md.createIttfDocumentGraphFrom = function(mTreeOrFilepathOrContent, options, callback) {
    IttfDocumentGraph.createFrom(mTreeOrFilepathOrContent, options, callback)
}
;