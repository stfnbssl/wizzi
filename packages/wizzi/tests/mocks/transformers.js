/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\transformers.js.ittf
    utc time: Thu, 18 Apr 2024 15:05:48 GMT
*/
'use strict';
var md = module.exports = {};
md.getTransformer = function(transformerName) {
    if (transformerName === 'tests/trans1') {
        return {
                trans: function(model, context, callback) {
                    model.__transformed = true;
                    model.testsName = model.wzName;
                    model.contextFrom = context.from;
                    return callback(null, model);
                }
             };
    }
    else {
        return null;
    }
}
;
