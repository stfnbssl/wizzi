/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\meta\index.js.ittf
    utc time: Wed, 17 Apr 2024 11:10:29 GMT
*/
'use strict';
var verify = require('../helpers/verify');
var metify = require('./metify');
var utils = require('./utils');

var md = module.exports = {};

md.metify = metify.metify;
md.wizzifyIttfNodeName = utils.wizzifyIttfNodeName;