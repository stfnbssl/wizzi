/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\generators.js.ittf
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
