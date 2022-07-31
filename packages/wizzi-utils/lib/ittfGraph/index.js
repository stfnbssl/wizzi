/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfGraph\index.js.ittf
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
