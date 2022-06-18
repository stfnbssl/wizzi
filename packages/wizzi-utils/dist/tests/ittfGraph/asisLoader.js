/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\tests\ittfGraph\asisLoader.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var verify = require('../../lib/helpers/verify');

var asIsLoader = require('../../lib/ittfGraph/asIsLoader');

describe("asIsLoader", function() {
    it("should load an ITTF Document as is", function(done) {
        vfile(function(err, vfileImpl) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            asIsLoader(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {
                clean_remove: true, 
                file: vfileImpl
             }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(result).to.be.an('object');
                done();
            })
        })
    });
});
