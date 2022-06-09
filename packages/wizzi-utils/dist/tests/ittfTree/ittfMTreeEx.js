/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\tests\ittfTree\ittfMTreeEx.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var ittfMTreeEx = require('../../lib/ittfTree/ittfMTreeEx');

describe("ittfMTreeEx", function() {
    it("should load an ittf document, as is, into an IttfModelEx instance class", function(done) {
        ittfMTreeEx.createFrom(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {}, function(err, result) {
            if (err) {
                console.log('err', err);
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
    it("should load an evaluated mTree object into an IttfMOdelEx instance class", function(done) {
        ittfMTreeEx.createFrom({
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
                console.log('err', err);
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
    it("should load a tree structure of named-value nodes into an IttfMOdelEx instance class", function(done) {
        ittfMTreeEx.createFrom({
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
                console.log('err', err);
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
        ittfMTreeEx.createFrom({
            name: 'alfa', 
            children: [
                {
                    name: 'beta', 
                    value: 'i am:${name}.'
                 }
            ]
         }, function(err, result) {
            if (err) {
                console.log('err', err);
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
