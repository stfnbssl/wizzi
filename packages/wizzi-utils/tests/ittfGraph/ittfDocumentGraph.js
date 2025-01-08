/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\ittfGraph\ittfDocumentGraph.js.ittf
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

var ittfDocumentGraph = require('../../lib/ittfGraph/ittfDocumentGraph');

describe("ittfDocumentGraph", function() {
    it("should load an ittf document, as is, into an IttfDocumentGraph instance class", function(done) {
        ittfDocumentGraph.createFrom(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {}, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            expect(result.name).to.be.a('string');
            expect(result.name).to.be('alfa');
            expect(result.children).to.be.an('array');
            expect(result.children.length).to.be(2);
            expect(result.children[0].name).to.be.a('string');
            expect(result.children[0].name).to.be('$$');
            expect(result.children[0].value).to.be.a('string');
            expect(result.children[0].value).to.be('beta');
            expect(result.children[1].name).to.be.a('string');
            expect(result.children[1].name).to.be('gamma');
            expect(result.children[1].children).to.be.an('array');
            expect(result.children[1].children.length).to.be(1);
            done();
        })
    });
    it("should load an evaluated mTree object into an IttfDocumentGraph instance class", function(done) {
        ittfDocumentGraph.createFrom({
            nodes: [
                {
                    n: 'alfa', 
                    children: [
                        {
                            n: '$$', 
                            v: 'beta'
                         }, 
                        {
                            n: 'gamma', 
                            children: [
                                {
                                    n: 'a'
                                 }
                            ]
                         }
                    ]
                 }
            ]
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            expect(result.name).to.be.a('string');
            expect(result.name).to.be('alfa');
            expect(result.children).to.be.an('array');
            expect(result.children.length).to.be(2);
            expect(result.children[0].name).to.be.a('string');
            expect(result.children[0].name).to.be('$$');
            expect(result.children[0].value).to.be.a('string');
            expect(result.children[0].value).to.be('beta');
            expect(result.children[1].name).to.be.a('string');
            expect(result.children[1].name).to.be('gamma');
            expect(result.children[1].children).to.be.an('array');
            expect(result.children[1].children.length).to.be(1);
            done();
        })
    });
    it("should load a tree structure of named-value nodes into an IttfDocumentGraph instance class", function(done) {
        ittfDocumentGraph.createFrom({
            name: 'alfa', 
            children: [
                {
                    name: '$$', 
                    value: 'beta'
                 }, 
                {
                    name: 'gamma', 
                    children: [
                        {
                            name: 'a'
                         }
                    ]
                 }
            ]
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            expect(result.name).to.be.a('string');
            expect(result.name).to.be('alfa');
            expect(result.children).to.be.an('array');
            expect(result.children.length).to.be(2);
            expect(result.children[0].name).to.be.a('string');
            expect(result.children[0].name).to.be('$$');
            expect(result.children[0].value).to.be.a('string');
            expect(result.children[0].value).to.be('beta');
            expect(result.children[1].name).to.be.a('string');
            expect(result.children[1].name).to.be('gamma');
            expect(result.children[1].children).to.be.an('array');
            expect(result.children[1].children.length).to.be(1);
            done();
        })
    });
    it("should parse a node value containing an interpolation", function(done) {
        ittfDocumentGraph.createFrom({
            name: 'alfa', 
            children: [
                {
                    name: 'beta', 
                    value: 'i am:${name}.'
                 }
            ]
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            expect(result.name).to.be.a('string');
            expect(result.name).to.be('alfa');
            expect(result.children).to.be.an('array');
            expect(result.children.length).to.be(1);
            expect(result.children[0].name).to.be.a('string');
            expect(result.children[0].name).to.be('beta');
            expect(result.children[0].getValueParsed()).to.be.an('array');
            expect(result.children[0].getValueParsed().length).to.be(3);
            expect(result.children[0].getValueParsed()[0].t).to.be.a('number');
            expect(result.children[0].getValueParsed()[0].t).to.be(0);
            expect(result.children[0].getValueParsed()[0].v).to.be.a('string');
            expect(result.children[0].getValueParsed()[0].v).to.be('i am:');
            expect(result.children[0].getValueParsed()[1].t).to.be.a('number');
            expect(result.children[0].getValueParsed()[1].t).to.be(1);
            expect(result.children[0].getValueParsed()[1].v).to.be.a('string');
            expect(result.children[0].getValueParsed()[1].v).to.be('name');
            expect(result.children[0].getValueParsed()[2].t).to.be.a('number');
            expect(result.children[0].getValueParsed()[2].t).to.be(0);
            expect(result.children[0].getValueParsed()[2].v).to.be.a('string');
            expect(result.children[0].getValueParsed()[2].v).to.be('.');
            done();
        })
    });
});