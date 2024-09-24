/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\root\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// TODO lots of clean up
// eliminate ittfDocumentGraph, asIsLoader, ittfWriter already in ittfGraph
// eliminate file, vfile already in fSystem
// features
var ittfGraph = require('./lib/ittfGraph/index');
var ittfScanner = require('./lib/ittfScanner/index');
var pretty = require('./lib/pretty/index');
var fSystem = require('./lib/fSystem/index');
var helpers = require('./lib/helpers/index');
var lorem = require('./lib/lorem/index');
var packi = require('./lib/packi/index');
var meta = require('./lib/meta/index');
var crypto = require('./lib/crypto/index');
var errors = require('./lib/errors/index');
var mocks = require('./lib/mocks/index');
//
var md = module.exports = {};
md.version = "0.8.25";
// features
md.ittfGraph = ittfGraph;
md.ittfScanner = ittfScanner;
md.pretty = pretty;
md.fSystem = fSystem;
md.crypto = crypto;
md.lorem = lorem;
md.packi = packi;
md.meta = meta;
md.helpers = helpers;
md.errors = errors;
md.mocks = mocks;
// legacy
md.ittfFinder = ittfGraph.ittfFinder;
md.ittfWriter = ittfGraph.ittfWriter;
md.asIsLoader = ittfGraph.asIsLoader;
md.IttfDocumentGraph = ittfGraph.IttfDocumentGraph;
md.fail = helpers.fail;
md.option = helpers.option;
md.config = helpers.config;
md.verify = helpers.verify;
md.node = helpers.node;
md.lineParser = helpers.lineParser;
md.requireFromString = helpers.requireFromString;
md.Coder = helpers.coder;
md.encdec = crypto;
md.file = fSystem.file;
md.vfile = fSystem.vfile;
md.uriParser = fSystem.uriParser;
md.jsonUriParser = function(uri) {
    // Dummy implementation after giving up the idea of a multi-filesystem wizzi production
    // 12/9/2022
    return {
            internalPath: uri
         };
}
;
md.fileInfoByPath = fSystem.fileInfoByPath;
// errors - legacy
md.nodeErrors = require('./lib/errors/legacyErrors');
md.exampleErrors = require('./lib/exampleErrors');