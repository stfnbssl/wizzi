/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\examples\loader\interpolate.js.ittf
    utc time: Wed, 03 Jul 2024 03:16:58 GMT
*/
'use strict';
var Context = require('../../lib/jswizzi/jsWizziContext');
var ip = require('../../lib/loader/ittfInterpolate');
var ctx = new Context();
ctx.setValue('name', 'stefi');
var testVar1 = "$" + "{'$'}{'$'}{'$'}{metaCtx.description}";
var result1 = ip(testVar1, ctx);
console.log('result1', result1, __filename);