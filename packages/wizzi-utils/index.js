/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\root\index.js.ittf
*/
'use strict';
// TODO lots of clean up
// eliminate ittfDocumentGraph, asIsLoader, ittfWriter already in ittfGraph
// eliminate file, vfile already in fSystem
// isWebpackTarget false
// features
var ittfGraph = require('./lib/ittfGraph/index');
var ittfScanner = require('./lib/ittfScanner/index');
var pretty = require('./lib/pretty/index');
var fSystem = require('./lib/fSystem/index');
var helpers = require('./lib/helpers/index');
var lorem = require('./lib/lorem/index');
var crypto = require('./lib/crypto/index');
var errors = require('./lib/errors/index');
var mocks = require('./lib/mocks/index');
//
var md = module.exports = {};
// features
md.ittfGraph = ittfGraph;
md.ittfScanner = ittfScanner;
md.pretty = pretty;
md.fSystem = fSystem;
md.crypto = crypto;
md.lorem = lorem;
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
md.lineparser = helpers.lineparser;
md.requireFromString = helpers.requireFromString;
md.Coder = helpers.coder;
md.encdec = crypto;
md.file = fSystem.file;
md.vfile = fSystem.vfile;
md.uriParser = fSystem.uriParser;
md.fileInfoByPath = fSystem.fileInfoByPath;
// errors - legacy
md.nodeErrors = require('./lib/errors/legacyErrors');
md.exampleErrors = require('./lib/exampleErrors');
