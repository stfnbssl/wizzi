/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\tests\xmlwizzifier\index.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');
var file = require('wizzi-utils').file;

var expect = require('expect.js');
var thisPackage = require('../../index');

var simpleSource = file.read(path.join(__dirname, 'data', 'svg.tests.xml'));

describe("the xml wizzifier", function() {
    
    it("should wizzify a xml file", function(done) {
        var ittfExpected = 'a C\n    b\n';
        thisPackage.xmlwizzifier.getWizziIttf(simpleSource, {}, function(err, ittf) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log('xml ittf', ittf, __filename);
            expect(ittf).to.be.a('string');
            expect(ittf).to.be(ittfExpected);
            done();
        })
    });
});
