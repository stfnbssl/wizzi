/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\fs\glob.js.ittf
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

var glob = require('../../lib/fSystem/glob');
var vfile = require('../../lib/fSystem/vfile');
var file = vfile();

describe("glob", function() {
    it("should glob a folder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1')
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2')
        file.write(path.join(__dirname, 'ittf', 'globs2', 'one', 'globbed_2_one.ittf'), 'globbed 2 one')
        glob(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(3);
            done();
        })
    });
    it("should sync glob a folder", function() {
        var result = glob(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, {
            sync: true
         });
        expect(result).to.be.an('array');
        expect(result.length).to.be(3);
    });
});