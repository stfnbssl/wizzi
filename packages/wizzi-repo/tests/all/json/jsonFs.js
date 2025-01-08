/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\json\jsonFs.js.ittf
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

var JsonFs = require('../../../lib/json/fs/jsonFs');

describe("json.jsonFs", function() {
    
    var jsonFs = new JsonFs();
    var hellotxt_item = null;
    describe("insert a filesystem item", function() {
        it("should insert a root folder", function(done) {
            jsonFs.insertItem({
                parentId: null, 
                basename: 'c:', 
                dirname: null, 
                kind: 0
             }, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('insertItem.r', err, r);
                expect(r.insertedCount).to.be.a('number');
                expect(r.insertedCount).to.be(1);
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('FSITEM_INSERTED');
                expect(r.item).to.be.an('object');
                expect(r.item.path).to.be.a('string');
                expect(r.item.path).to.be('c:');
                expect(r.item._id).to.be.an('object');
                done();
            })
        });
        it("should get an existing item", function(done) {
            jsonFs.getItem({
                parentId: null, 
                basename: 'c:'
             }, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('getItem.r', err, r);
                expect(r).to.be.an('object');
                expect(r.parentId).to.be(null);
                expect(r.basename).to.be.a('string');
                expect(r.basename).to.be('c:');
                done();
            })
        });
        it("should say the item already exists", function(done) {
            jsonFs.insertItem({
                parentId: null, 
                basename: 'c:', 
                dirname: null, 
                kind: 0
             }, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'insertItem.r', err, r
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('FSITEM_EXISTS');
                expect(r.item).to.be.an('object');
                expect(r.item.path).to.be.a('string');
                expect(r.item.path).to.be('c:');
                done();
            })
        });
        it("should insert a root child", function(done) {
            jsonFs.getItem({
                parentId: null, 
                basename: 'c:'
             }, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                jsonFs.insertItem({
                    parentId: r.parentId, 
                    basename: 'hello.txt', 
                    dirname: r.basename, 
                    kind: 1
                 }, function(err, r) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    // loog 'insertItem.r', err, r
                    expect(r.insertedCount).to.be.a('number');
                    expect(r.insertedCount).to.be(1);
                    expect(r.code).to.be.a('string');
                    expect(r.code).to.be('FSITEM_INSERTED');
                    expect(r.item).to.be.an('object');
                    expect(r.item.path).to.be.a('string');
                    expect(r.item.path).to.be('c:/hello.txt');
                    hellotxt_item = r.item;
                    done();
                })
            })
        });
    });
    describe("update a filesystem item", function() {
        it("should update a root child", function(done) {
            hellotxt_item.basename = 'hello2.txt';
            jsonFs.updateItem(hellotxt_item, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'updateItem.r', err, r
                // tobe_number( r.n, 1 )
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('FSITEM_UPDATED');
                done();
            })
        });
    });
    describe("update a filesystem item", function() {
        it("should write a document content", function(done) {
            hellotxt_item.basename = 'hello2.txt';
            jsonFs.writeDocument(hellotxt_item._id, 'hello world', function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog 'writeFile.r', err, r
                // tobe_number( r.n, 1 )
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('DOCUMENT_WRITTEN');
                done();
            })
        });
    });
    describe("delete a filesystem item", function() {
        it("should delete a root child", function(done) {
            jsonFs.deleteItem(hellotxt_item._id, function(err, r) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                // loog '*********************** deletedItem.r', err, r
                expect(r.deletedCount).to.be.a('number');
                expect(r.deletedCount).to.be(1);
                expect(r.code).to.be.a('string');
                expect(r.code).to.be('FSITEM_DELETED');
                done();
            })
        });
    });
});