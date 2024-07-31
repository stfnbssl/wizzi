/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\model\asyncModelLoader.js.ittf
    utc time: Wed, 31 Jul 2024 14:38:17 GMT
*/
'use strict';

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