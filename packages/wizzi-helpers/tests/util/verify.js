/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-helpers\.wizzi\tests\util\verify.js.ittf
    utc time: Fri, 12 Apr 2024 05:45:14 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var verify = require('../../lib/verify');

var verify = require('../../lib/verify');

describe("verify", function() {
    
    var test;
    
    it("should check valid email address", function() {
        test = verify.isEmail('bongo@');
        ;
        expect(test).to.be(false);
        test = verify.isEmail('bongo@it');
        ;
        expect(test).to.be(false);
        test = verify.isEmail('stfn.nssl@gmail.com');
        ;
        expect(test).to.be(true);
        test = verify.isEmail('stfn@do.com');
        ;
        expect(test).to.be(true);
    });
    it("should create a wzError", function() {
        var err1 = verify.error({
            name: 'ArgumentError'
         }, 'Parameter %s must be a string', 'ittfDocumentUri');
        expect(err1.toString()).to.be.a('string');
        expect(err1.toString()).to.be('ArgumentError: Parameter ittfDocumentUri must be a string');
    });
    it("should convert string values to types", function() {
        var expected;
        var result = verify.convert('', 'string');
        console.log(' "" result', result, __filename);
        expected = '';
        // strict equality
        expect(result).to.be(expected);
        result = verify.convert(null, 'string');
        console.log(' "" result', result, __filename);
        expected = '';
        // strict equality
        expect(result).to.be(expected);
        result = verify.convert('alfa', 'string');
        expected = 'alfa';
        // strict equality
        expect(result).to.be(expected);
        result = verify.convert('"alfa"', 'string', true);
        // strict equality
        expect(result).to.be(expected);
        result = verify.convert('0', 'integer');
        // strict equality
        expect(result).to.be(0);
        result = verify.convert('-10', 'integer');
        // strict equality
        expect(result).to.be(-10);
        result = verify.convert('20', 'integer');
        // strict equality
        expect(result).to.be(20);
        result = verify.convert('20.5', 'float');
        // strict equality
        expect(result).to.be(20.5);
        result = verify.convert('0.5', 'float');
        // strict equality
        expect(result).to.be(0.5);
        result = verify.convert('true', 'boolean');
        // strict equality
        expect(result).to.be(true);
        result = verify.convert('false', 'boolean');
        // strict equality
        expect(result).to.be(false);
        result = verify.convert('1990-5-12', 'date');
        expected = new Date(1990, 4, 12);
        console.log('expected', expected, __filename);
        // loose equality works for objects
        expect(result).to.eql(expected);
        result = verify.convert('1990/5/12', 'date');
        console.log('date 1990/5/12 result', result, __filename);
        expect(result.__is_error).to.be(true);
        result = verify.convert('yes', 'boolean');
        expect(result.__is_error).to.be(true);
        result = verify.convert('1.10', 'integer');
        expect(result.__is_error).to.be(true);
        result = verify.convert('alfa', 'float');
        expect(result.__is_error).to.be(true);
    });
    it("should strip an extension", function() {
        var expected;
        var result = verify.stripExtension('aaa.bbb.ccc');
        expect(result).to.be.a('string');
        expect(result).to.be('aaa.bbb');
        var result = verify.replaceExtension('aaa.bbb.ccc', 'ddd');
        expect(result).to.be.a('string');
        expect(result).to.be('aaa.bbb.ddd');
    });
    it("should verify is an object not built in", function() {
        var result = verify.isObjectNotBuiltIn(new String());
        expect(result).to.be(false);
    });
});
