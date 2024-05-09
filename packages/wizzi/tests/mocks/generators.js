/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\generators.js.ittf
    utc time: Thu, 09 May 2024 12:34:33 GMT
*/
'use strict';
var md = module.exports = {};
md.getGenerator = function(generationName) {
    if (generationName === 'tests/gen1') {
        return {
                gen: function(model, genContext, callback) {
                    genContext.write('Hello I am ' + model.wzName + ' artifact from {from}')
                    return callback(null, genContext);
                }
             };
    }
    else {
        return null;
    }
}
;
