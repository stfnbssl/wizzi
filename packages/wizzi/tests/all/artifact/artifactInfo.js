/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\all\artifact\artifactInfo.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var ProductionStep = require('../../../lib/production/step').ProductionStep;
var asyncArtifactGenerator = require('../../../lib/production/artifact/asyncArtifactGenerator');
var mocks = require('../../mocks/misc');

describe("productionStep", function() {
    var modelPaths = {};
    var moodel_path_1 = path.join(__dirname, 'ittf', 'simple.tests.ittf');
    var moodel_path_2 = path.join(__dirname, 'ittf', 'complex.tests.ittf');
    modelPaths[moodel_path_1]  = true;
    modelPaths[moodel_path_2]  = true;
    var ai;
    it("shoul create an artifact info", function(done) {
        ai = new ProductionStep({
            name: 'test_1', 
            options: {
                basedir: __dirname, 
                dotgExtensionPrefix: false
             }, 
            model: mocks.getModelInfo('mock1'), 
            contexts: null, 
            isWzJob: false, 
            transformers: [], 
            gen: {
                generator: 'js/module'
             }, 
            dest: {
                fullPath: null, 
                folder: null, 
                baseFolder: null, 
                path: null, 
                extension: null
             }
         });
        ;
        done();
    });
    it("shoul check properties", function() {
        expect(ai.isWizziFactoryJob()).to.be(false);
        expect(ai.isWizziModelArtifact()).to.be(true);
        expect(ai.isModelCollectionArtifact()).to.be(false);
        expect(ai.isCodeWriteArtifact()).to.be(false);
        expect(ai.isFinalArtifact()).to.be(false);
    });
    it("shoul get items to persist to file", function(done) {
        ai.getItemsToPersistToFile(function(err, items) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            expect(items).to.be.an('array');
            expect(items.length).to.be(1);
            done();
        })
    });
    it("shoul interpolate the path of an item of a model collection artifact", function() {
        var ipname = ai.getInterpolatePathNameContext();
        expect(ipname.__is_error).to.be(true);
    });
    it("shoul build the destination uri of the generated artifact", function() {
        var dest_uri = ai.getDestinationUri('srcPath');
    });
});