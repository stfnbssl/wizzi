/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\tests\jswizzifier\index.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');
var file = require('wizzi-utils').file;

var expect = require('expect.js');
var thisPackage = require('../../index');

var simpleSource = file.read(path.join(__dirname, 'data', 'simple.tests.js'));

describe("the js wizzifier", function() {
    
    it("should wizzify a js file", function(done) {
        var ittfExpected = 'module \n    kind jsfile\n    function alfa\n        param beta\n        param gamma\n';
        thisPackage.jswizzifier.getWizziIttf(simpleSource, {}, function(err, ittf) {
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
