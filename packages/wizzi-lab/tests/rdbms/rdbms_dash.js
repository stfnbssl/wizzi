/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-lab\.wizzi\tests\rdbms\rdbms_dash.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var thisPackageIndex = require('../../index');
describe("loading the dash rdbms WizziModel", function() {
    it("should load the WizziModel", function(done) {
        thisPackageIndex.rdbms(path.join(__dirname, 'ittf', 'dash.rdbms.ittf'), {}, function(err, wizziModel) {
            // loog 'dash.rdbms.wizziModel', wizziModel
            expect(wizziModel).to.be.an('object');
            done();
        })
    });
});
