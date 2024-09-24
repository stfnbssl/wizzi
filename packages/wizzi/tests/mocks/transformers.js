/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\transformers.js.ittf
    utc time: Wed, 04 Sep 2024 02:22:38 GMT
*/
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