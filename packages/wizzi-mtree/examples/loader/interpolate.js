/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.10
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\examples\loader\interpolate.js.ittf
*/
'use strict';
var Context = require('../../lib/jswizzi/jsWizziContext');
var ip = require('../../lib/loader/ittfInterpolate');
var ctx = new Context();
ctx.setValue('name', 'stefi');
var result = ip('dark-light-icon${ \'(\' } &md )', ctx);
console.log('result', result, __filename);
