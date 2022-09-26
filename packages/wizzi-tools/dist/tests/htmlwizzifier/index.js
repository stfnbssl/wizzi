/*
    artifact generator: C:\Users\Stefano Bassoli\AppData\Roaming\npm\node_modules\wizzi-cli\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\tests\htmlwizzifier\index.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var thisPackage = require('../../index');

var simpleSource = path.join(__dirname, 'data', 'simple.tests.html');

describe("the js wizzifier", function() {
    
    it("should wizzify a js file", function(done) {
        var ittfExpected = 'html \n    head\n    body\n        div alfa\n';
        thisPackage.htmlWizzify(simpleSource, {}, function(err, ittf) {
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
