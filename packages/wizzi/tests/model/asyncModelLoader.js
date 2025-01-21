/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\model\asyncModelLoader.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var modelInfo = require('../../lib/production/model/modelInfo').ModelInfo;
var asyncModelLoader = require('../../lib/production/model/asyncModelLoader');
var mocks = require('../mocks/misc');

describe("asyncModelLoader", function() {
    var modelPaths = {};
    var moodel_path_1 = path.join(__dirname, 'ittf', 'simple.tests.ittf');
    var moodel_path_2 = path.join(__dirname, 'ittf', 'complex.tests.ittf');
    modelPaths[moodel_path_1]  = true;
    modelPaths[moodel_path_2]  = true;
    it("shoul load a simple wizzi model", function(done) {
        var mi = new modelInfo({
            cwd: path.join(__dirname, 'ittf'), 
            src: 'simple.tests.ittf', 
            schema: 'tests'
         });
        mi.productionManager(mocks.getProductionManager(path.join(__dirname, 'ittf'), modelPaths))
        asyncModelLoader.load(mi, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            // loog 'result.keys()', Object.keys(result)
            expect(result).to.be.an('object');
            done();
        })
    });
    it("shoul load a simple json format model", function(done) {
        var mi = new modelInfo({
            cwd: path.join(__dirname, 'data'), 
            src: 'simple.tests.json', 
            format: 'json'
         });
        mi.productionManager(mocks.getProductionManager(path.join(__dirname, 'ittf'), modelPaths))
        asyncModelLoader.load(mi, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            // loog 'result.keys()', Object.keys(result)
            expect(result).to.be.an('object');
            expect(result.alfa).to.be.a('string');
            expect(result.alfa).to.be('stefi');
            done();
        })
    });
});