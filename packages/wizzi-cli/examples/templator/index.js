/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\examples\templator\index.js.ittf
*/
'use strict';
const path = require('path');
const fs = require('fs');
const wizzi = require('wizzi');
var templator = require('../../cmds/templator');
var ctx = {
    useExpress: true
 };
templator(path.join(__dirname, 'ittf', 'express_wizzi.ittf.ittf'), path.join(__dirname, 'output', 'express_wizzi'), ctx)
templator(path.join(__dirname, 'ittf', 'templ.ittf.ittf'), path.join(__dirname, 'output', 'templ'), ctx)
