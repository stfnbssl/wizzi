/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\tests\artifact\genContext.js.ittf
*/
'use strict';

var path = require('path');
var del = require('del');

var expect = require('expect.js');
var genContext = require('../../lib/artifact/genContext');
var StringWriter = require('../../lib/util/stringWriter');
var mocks = require('../mocks/misc');

describe("genContext", function() {
    it("should write a simple interpolated text", function() {
        var ctx = new genContext({
            options: {
                data: {}, 
                indentSpaces: 4, 
                CRLF: '\n', 
                isDebugLine: false, 
                indent: 0
            }, 
            model: null, 
            srcPath: null, 
            pman: null
        });
        ctx.write('alfa');
        ctx.w(' beta');
        ctx.a('x', 'gamma');
        ctx.w('{x}');
        ctx.a('YYY', 'tau');
        ctx.w('{YYY}');
        var result = ctx.getContent();
        expect(result).to.be.a('string');
        expect(result).to.be('alfa beta\ngamma\ntau\n');
    });
    it("should write an indented interpolated text", function() {
        var ctx = new genContext({
            options: {
                data: {}, 
                indentSpaces: 4, 
                CRLF: '\n', 
                isDebugLine: false, 
                indent: 0
            }, 
            model: null, 
            srcPath: null, 
            pman: null
        });
        ctx.write('alfa');
        ctx.w(' beta');
        ctx.a('x', 'gamma');
        ctx.indent();
        ctx.w('{x}');
        ctx.a('YYY', 'tau');
        ctx.deindent();
        ctx.w('{YYY}');
        ctx.indent(2);
        ctx.w('sigma');
        ctx.deindent(2);
        ctx.w('lambda');
        var result = ctx.getContent();
        expect(result).to.be.a('string');
        expect(result).to.be('alfa beta\n    gamma\ntau\n        sigma\nlambda\n');
    });
    it("should write an indented interpolated text with a file append", function() {
        var ctx = new genContext({
            options: {
                data: {}, 
                indentSpaces: 4, 
                CRLF: '\n', 
                isDebugLine: false, 
                indent: 0
            }, 
            model: null, 
            srcPath: null, 
            pman: null
        });
        ctx.write('alfa');
        ctx.w(' beta');
        ctx.a('x', 'gamma');
        ctx.indent();
        ctx.w('{x}');
        ctx.a('YYY', 'tau');
        ctx.deindent();
        ctx.w('{YYY}');
        ctx.indent(2);
        ctx.w('sigma');
        ctx.appendFile(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        ctx.deindent(2);
        ctx.w('lambda');
        var result = ctx.getContent();
        expect(result).to.be.a('string');
        expect(result).to.be('alfa beta\n    gamma\ntau\n        sigma\n        first one\n            second one\nlambda\n');
    });
    it("should write a file to genContext", function() {
        var ctx = new genContext({
            options: {
                data: {}, 
                indentSpaces: 4, 
                CRLF: '\n', 
                isDebugLine: false, 
                indent: 0
            }, 
            model: null, 
            srcPath: null, 
            pman: null
        });
        ctx.writeFile(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        var sw = new StringWriter();
        ctx.toStream(sw);
        var result = sw.toString();
        expect(result).to.be.a('string');
        expect(result).to.be('first one\n\tsecond one\n');
    });
    it("should append a file to genContext", function() {
        var ctx = new genContext({
            options: {
                data: {}, 
                indentSpaces: 4, 
                CRLF: '\n', 
                isDebugLine: false, 
                indent: 0
            }, 
            model: null, 
            srcPath: null, 
            pman: null
        });
        ctx.writeFile(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        var sw = new StringWriter();
        ctx.toStream(sw);
        var result = sw.toString();
        expect(result).to.be.a('string');
        expect(result).to.be('first one\n\tsecond one\n');
    });
});
