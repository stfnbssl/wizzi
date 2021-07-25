/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\tests\ittfTree\asisLoader.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var asIsLoader = require('../../lib/ittfTree/asIsLoader');

describe("asIsLoader", function() {
    it("should load an ittf tree as is", function(done) {
        asIsLoader(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {
            file: file
         }, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log("result" + " " + util.inspect(result, { depth: null } ))
            expect(result).to.be.an('object');
            done();
        })
    });
});
