/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\wizziModels.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/
var path = require('path');
var md = module.exports = {};
md.getModels = function(schema, mockBaseDir) {
    // loog 'wizzi.tests.wizziModels.getModels: schema, mockBaseDir', schema, mockBaseDir
    var ret = {};
    if (schema === 'wzjob') {
        var wzjob_mock1_path = path.join(mockBaseDir, 'ittf', 'mock1.wzjob.ittf');
        ret[wzjob_mock1_path] = wzjob_mock1();
        var wzjob_mock2_path = path.join(mockBaseDir, 'ittf', 'mock2.wzjob.ittf');
        ret[wzjob_mock2_path] = wzjob_mock2();
    }
    if (schema === 'tests') {
        var tests_mock1_path = path.join(mockBaseDir, 'ittf', 'mock1.tests.ittf');
        ret[tests_mock1_path] = tests_mock1();
        var tests_mock2_path = path.join(mockBaseDir, 'ittf', 'mock2.tests.ittf');
        ret[tests_mock2_path] = tests_mock2();
    }
    return ret;
}
;
function wzjob_mock1() {
    var ret = {
        destBaseFolder: path.join(__dirname, 'result'), 
        models: [], 
        productions: [
            {
                lines: [
                    {
                        wzName: 'lib', 
                        cwdFolder: path.resolve(__dirname, '../production/ittf'), 
                        destFolder: path.join(__dirname, 'result'), 
                        artifacts: [
                            {
                                wzName: 'wzjobMock2', 
                                src: 'mock2.wzjob.ittf', 
                                isWzJob: true, 
                                modelRefs: [], 
                                transformers: []
                             }, 
                            {
                                wzName: 'artifactMock1', 
                                src: 'mock1.tests.ittf', 
                                generator: {
                                    gen: 'tests/gen1'
                                 }, 
                                modelRefs: [], 
                                transformers: []
                             }
                        ]
                     }
                ]
             }
        ]
     };
    return ret;
}
function wzjob_mock2() {
    var ret = {
        destBaseFolder: path.join(__dirname, 'result2'), 
        models: [], 
        productions: [
            {
                lines: [
                    {
                        wzName: 'lib', 
                        cwdFolder: __dirname, 
                        destFolder: path.join(__dirname, 'result2'), 
                        artifacts: [
                            {
                                wzName: 'artifactMock2', 
                                src: 'mock2.tests.ittf', 
                                generator: {
                                    gen: 'tests/gen1'
                                 }, 
                                modelRefs: [], 
                                transformers: []
                             }
                        ]
                     }
                ]
             }
        ]
     };
    return ret;
}
function tests_mock1() {
    var ret = {
        wzElement: 'tests', 
        wzName: 'mock1', 
        items: [
            {
                wzElement: 'item', 
                wzName: 'item1'
             }, 
            {
                wzElement: 'item', 
                wzName: 'item2'
             }
        ]
     };
    return ret;
}
function tests_mock2() {
    var ret = {
        wzElement: 'tests', 
        wzName: 'mock2', 
        items: [
            {
                wzElement: 'item', 
                wzName: 'item2_1'
             }, 
            {
                wzElement: 'item', 
                wzName: 'item2_2'
             }
        ]
     };
    return ret;
}