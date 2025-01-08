/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\examples\loader\interpolate.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:37 GMT
*/
var Context = require('../../lib/jswizzi/jsWizziContext');
var ip = require('../../lib/loader/ittfInterpolate');
var ctx = new Context();
ctx.setValue('name', 'stefi');
var testVar1 = "$" + "{'$'}{'$'}{'$'}{metaCtx.description}";
var result1 = ip(testVar1, ctx);
console.log('result1', result1, __filename);