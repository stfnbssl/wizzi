/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\ittfGraph\asisLoader.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fSystem/file');
var vfile = require('../../lib/fSystem/vfile');
var verify = require('../../lib/helpers/verify');

var asIsLoader = require('../../lib/ittfGraph/asIsLoader');

describe("asIsLoader", function() {
    it("should load an ITTF Document as is", function(done) {
        vfile(function(err, vfileImpl) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            asIsLoader(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {
                clean_remove: true, 
                file: vfileImpl
             }, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                expect(result).to.be.an('object');
                done();
            })
        })
    });
});