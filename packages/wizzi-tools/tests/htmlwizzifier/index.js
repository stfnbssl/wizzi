/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\tests\htmlwizzifier\index.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');
var file = require('wizzi-utils').file;

var expect = require('expect.js');
var thisPackage = require('../../index');

var simpleSource = file.read(path.join(__dirname, 'data', 'simple.tests.html'));

describe("the html wizzifier", function() {
    
    it("should wizzify an html file", function(done) {
        var ittfExpected = 'html \n    head\n    body\n        div alfa\n';
        thisPackage.htmlwizzifier.getWizziIttf(simpleSource, {}, function(err, ittf) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(ittf).to.be.a('string');
            expect(ittf).to.be(ittfExpected);
            done();
        })
    });
});
