/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\errors\index.js.ittf
    utc time: Thu, 14 Mar 2024 20:24:16 GMT
*/
'use strict';
var wizziModelDomErrors = require('./wizziModelDomErrors');
var legacyErrors = require('./legacyErrors');
var md = module.exports = {};
md.WizziModelDOMNodeError = wizziModelDomErrors.WizziModelDOMNodeError;
md.NodeError = legacyErrors.NodeError;
md.getErrorLinesFromMTreeNode = legacyErrors.getErrorLinesFromMTreeNode;
md.getErrorLines = legacyErrors.getErrorLines;
