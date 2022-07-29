/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\errors\index.js.ittf
*/
'use strict';
var wizziModelDomErrors = require('./wizziModelDomErrors');
var legacyErrors = require('./legacyErrors');
var md = module.exports = {};
md.WizziModelDOMNodeError = wizziModelDomErrors.WizziModelDOMNodeError;
md.NodeError = legacyErrors.NodeError;
md.getErrorLinesFromMTreeNode = legacyErrors.getErrorLinesFromMTreeNode;
md.getErrorLines = legacyErrors.getErrorLines;
