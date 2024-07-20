/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\json\document.js.ittf
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

var assert = require('assert'),
    JsonFs = require('../../../lib/json/fs/jsonFs'),
    Document = require('../../../lib/json/fs/documentmanager');

describe("json.fs.document", function() {
    
    var FSITEMS = 'fsitems';
    var DOCUMENTS = 'documents';
    var jsonFs, doc;
    before(function(done) {
        jsonFs = new JsonFs();
        doc = new Document(jsonFs);
        done();
    });
    describe("folder creation", function() {
        it("should create a folder", function(done) {
            doc.createFolder('c:/my/starters/darvin', function(err, f) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                console.log('should create a folder', err, f);
                expect(f.insertedCount).to.be.a('number');
                expect(f.insertedCount).to.be(1);
                done();
            })
        });
    });
    var folderPathOld = "c:/my/starters/darvin";
    var filePathOld = "c:/my/starters/darvin/hello.md";
    var filePathNew = "c:/my/newfolder/readme.md";
    var content = "Hello world";
    describe("write a file", function() {
        before(function(done) {
            doc.createFolder(folderPathOld, function(err, f) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                done();
            })
        });
        it("should write into a non existing folder", function(done) {
            doc.writeFile(filePathNew, content, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                console.log('should write a file', err, r);
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('DOCUMENT_WRITTEN');
                expect(r.item.content).to.be.a('string');
                expect(r.item.content).to.be(content);
                done();
            })
        });
    });
    var folderPath = "c:/my/hello";
    var filePath = "c:/my/hello.txt";
    var content = 'Hello';
    describe("write a file", function() {
        before(function(done) {
            doc.createFolder(folderPath, function(err, f) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                doc.writeFile(filePath, content, function(err, f) {
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    done();
                })
            })
        });
        it("should be a file item", function(done) {
            doc.isFile(filePath, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                console.log('doc.isFile', r);
                expect(r).to.be(true);
                done();
            })
        });
        it("should be a folder item", function(done) {
            doc.isFolder(folderPath, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                console.log('doc.isFolder', r);
                expect(r).to.be(true);
                done();
            })
        });
    });
    var sourceFilePath = "c:/my/from/hello.txt";
    var destFilePath = "c:/my/to/hello.txt";
    var content = 'Hello';
    describe("copy a file", function() {
        before(function(done) {
            doc.writeFile(sourceFilePath, content, function(err, f) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                done();
            })
        });
        it("copy hello from to", function(done) {
            doc.copyFile(sourceFilePath, destFilePath, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                console.log('copy hello from to', r);
                done();
            })
        });
    });
    var filePathDelete = "c:/my/starters/darvin/hello.md";
    var content = "Hello world";
    describe("delete a file", function() {
        before(function(done) {
            doc.writeFile(filePathDelete, content, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                done();
            })
        });
        it("should delete a file", function(done) {
            doc.deleteFile(filePathDelete, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                // loog 'should delete a file', err, r
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('FSITEM_DELETED');
                expect(r.deletedCount).to.be.a('number');
                expect(r.deletedCount).to.be(1);
                done();
            })
        });
    });
    var oldFolder = "c:/my/starters/darvin/test/rename/old";
    var file_1 = oldFolder + "/f1.txt";
    var file_1renamed = oldFolder + "/fr.txt";
    var content = "Hello rename file ";
    describe("rename a file", function() {
        before(function(done) {
            doc.writeFile(file_1, content + 'file 1', function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                done();
            })
        });
        it("should rename a file", function(done) {
            doc.renameFile(file_1, file_1renamed, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('doc.renameFile', r);
                doc.readFile(file_1renamed, function(err, read) {
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    console.log('doc.renameFile read', read);
                    done();
                })
            })
        });
    });
    describe("get a folder", function() {
        it("should get a folder", function(done) {
            doc.getFolder('c:/my/starters', function(err, f) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                // loog 'should get a folder', err, f
                expect(f.path).to.be.a('string');
                expect(f.path).to.be('c:/my/starters');
                done();
            })
        });
    });
    describe("folder existence test", function() {
        it("should test if a folder exists", function(done) {
            doc.isFolder('c:/my/starters', function(err, f) {
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                // loog 'should test if a folder exists', err, f
                expect(f).to.be(true);
                done();
            })
        });
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