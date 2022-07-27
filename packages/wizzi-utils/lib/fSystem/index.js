/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\index.js.ittf
*/
'use strict';
var file = require('./file');
var vfile = require('./vfile');
var uriParser = require('./uriParser');
var glob = require('./glob/index');
var fsUtils = require('./utils');
var md = module.exports = {};
md.file = file;
md.vfile = vfile;
md.uriParser = uriParser;
md.glob = glob;
md.fileInfoByPath = fsUtils.fileInfoByPath;
