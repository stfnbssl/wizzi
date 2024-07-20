/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\json\fsimpl.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:30 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var JsonFsImpl = require('../../../lib/json/jsonFsimpl'),
    JsonFs = require('../../../lib/json/fs/jsonFs'),
    Document = require('../../../lib/json/fs/documentmanager'),
    jsonFs,
    doc;

describe("json.fsimpl", function() {
    
    var fsimpl = new JsonFsImpl(null);
    before(function(done) {
        jsonFs = new JsonFs();
        doc = new Document(jsonFs);
        done();
    });
    before(function(done) {
        fsimpl.open(function(err, notUsed) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            done();
        })
    });
    describe("fs write a file", function() {
        it("should write an hello file", function(done) {
            fsimpl.writeFile('c:/folder1/hello.js.ittf', 'Hello wizzi factory', function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'tests.mongodb.fsimpl.writeFile, result:', result
                expect(result.code).to.be.a('string');
                expect(result.code).to.be('DOCUMENT_WRITTEN');
                expect(result.item.content).to.be.a('string');
                expect(result.item.content).to.be('Hello wizzi factory');
                done();
            })
        });
        it("should read an hello file", function(done) {
            fsimpl.readFile('c:/folder1/hello.js.ittf', function(err, content) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'tests.mongodb.fsimpl.readFile, content:', content
                expect(content).to.be.a('string');
                expect(content).to.be('Hello wizzi factory');
                done();
            })
        });
        it("hello.js.ittf should be a file not a directory", function(done) {
            fsimpl.stat('c:/folder1/hello.js.ittf', function(err, stat) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'tests.mongodb.fsimpl.stat, stat:', stat
                expect(stat.isFile()).to.be(true);
                expect(stat.isDirectory()).to.be(false);
                done();
            })
        });
        it("c: should be a directory not a file", function(done) {
            fsimpl.stat('c:', function(err, stat) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'tests.mongodb.fsimpl.stat, stat:', stat
                expect(stat.isFile()).to.be(false);
                expect(stat.isDirectory()).to.be(true);
                done();
            })
        });
    });
    after(function(done) {
        fsimpl.close();
        done();
    });
    after(function(done) {
        if (typeof(fsimpl) != 'undefined') {
            fsimpl.toJson(function(err, json) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log(JSON.stringify(json, null, 2))
                done();
            })
        }
        else {
            jsonFs.toJson(function(err, json) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log(JSON.stringify(json, null, 2))
                done();
            })
        }
    });
});