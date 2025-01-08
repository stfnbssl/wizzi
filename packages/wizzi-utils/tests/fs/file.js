/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\fs\file.js.ittf
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

var file = require('../../lib/fSystem/file');

describe("file", function() {
    it("should split a text into lines", function() {
        var text = 'alfa\nbeta\n\ngamma\n\rtheta\r\nyota\r\rsigma';
        var lines = file.splitLines(text);
        expect(lines[0]).to.be.a('string');
        expect(lines[0]).to.be('alfa');
        expect(lines[1]).to.be.a('string');
        expect(lines[1]).to.be('beta');
        expect(lines[3]).to.be.a('string');
        expect(lines[3]).to.be('gamma');
        expect(lines[4]).to.be.a('string');
        expect(lines[4]).to.be('theta');
        expect(lines[5]).to.be.a('string');
        expect(lines[5]).to.be('yota');
        expect(lines[7]).to.be.a('string');
        expect(lines[7]).to.be('sigma');
    });
    it("should split a text into lines", function() {
        var lines = file.readLines(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        // loog 'file lines', lines
        expect(lines[0]).to.be.a('string');
        expect(lines[0]).to.be('first one');
        expect(lines[1]).to.be.a('string');
        expect(lines[1]).to.be('second one');
    });
});