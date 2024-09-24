/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\generators.js.ittf
    utc time: Wed, 04 Sep 2024 02:22:38 GMT
*/
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