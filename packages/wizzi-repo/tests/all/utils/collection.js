/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\utils\collection.js.ittf
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

var errors = require('../../../lib/utils/errors');
var ObjectId = require('../../../lib/utils/objectId');
var Collection = require('../../../lib/utils/collection');

describe("utils.collection", function() {
    var rootId = new ObjectId;
    var child_aId = new ObjectId;
    var item_root = {
        _id: rootId, 
        parentId: null, 
        path: '/'
     };
    var item_a = {
        _id: child_aId, 
        parentId: rootId, 
        path: '/a'
     };
    var item_a_1 = {
        _id: new ObjectId(), 
        parentId: child_aId, 
        path: '/a/1'
     };
    var item_a_2 = {
        _id: new ObjectId(), 
        parentId: child_aId, 
        path: '/a/1'
     };
    it("should create a collection and extract it with the toArray() async method", function(done) {
        var c = new Collection([
            item_root, 
            item_a
        ]);
        c.toArray(function(err, items) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(items).to.be.an('array');
            expect(items.length).to.be(2);
            done();
        })
    });
    it("should create a collection and insert one item without _id", function(done) {
        var c = new Collection();
        c.insertOne({}, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('object');
            expect(result.insertedCount).to.be.a('number');
            expect(result.insertedCount).to.be(1);
            expect(result.result.ok).to.be.a('number');
            expect(result.result.ok).to.be(1);
            expect(result.result.n).to.be.a('number');
            expect(result.result.n).to.be(1);
            c.toArray(function(err, items) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                expect(items).to.be.an('array');
                expect(items.length).to.be(1);
                done();
            })
        })
    });
    it("should create a collection and insert one item with _id", function(done) {
        var c = new Collection();
        c.insertOne(item_root, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('object');
            expect(result.insertedCount).to.be.a('number');
            expect(result.insertedCount).to.be(1);
            expect(result.result.ok).to.be.a('number');
            expect(result.result.ok).to.be(1);
            expect(result.result.n).to.be.a('number');
            expect(result.result.n).to.be(1);
            expect(result.insertedId).to.be.equal(rootId);
            c.toArray(function(err, items) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                expect(items).to.be.an('array');
                expect(items.length).to.be(1);
                expect(items[0]._id.toString()).to.be.equal(item_root._id.toString());
                done();
            })
        })
    });
    it("should give a Duplicated key error", function(done) {
        var c = new Collection([
            item_root
        ]);
        c.insertOne(item_root, function(err, result) {
            // loog 'err', err, 'result', result
            expect(err).to.be.a(errors.RepoCollectionError);
            expect(err.message).to.be.a('string');
            expect(err.message).to.be('Duplicated key');
            done();
        })
    });
    it("should delete one item", function(done) {
        var c = new Collection([
            item_root, 
            item_a
        ]);
        expect(c.count()).to.be.a('number');
        expect(c.count()).to.be(2);
        c.deleteOne({
            _id: item_root._id
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log(result);
            expect(result.deletedCount).to.be.a('number');
            expect(result.deletedCount).to.be(1);
            expect(result.result.n).to.be.a('number');
            expect(result.result.n).to.be(1);
            expect(result.result.ok).to.be.a('number');
            expect(result.result.ok).to.be(1);
            expect(c.count()).to.be.a('number');
            expect(c.count()).to.be(1);
            done();
        })
    });
    it("should delete many items", function(done) {
        var c = new Collection([
            item_root, 
            item_a, 
            item_a_1, 
            item_a_2
        ]);
        expect(c.count()).to.be.a('number');
        expect(c.count()).to.be(4);
        c.deleteMany({
            parentId: item_a._id
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log(result);
            expect(result.deletedCount).to.be.a('number');
            expect(result.deletedCount).to.be(2);
            expect(result.result.n).to.be.a('number');
            expect(result.result.n).to.be(2);
            expect(result.result.ok).to.be.a('number');
            expect(result.result.ok).to.be(1);
            expect(c.count()).to.be.a('number');
            expect(c.count()).to.be(2);
            done();
        })
    });
    it("should replace one item", function(done) {
        var c = new Collection([
            item_root, 
            item_a
        ]);
        item_root.newField = 20;
        c.replaceOne({
            _id: item_root._id
         }, item_root, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log(result);
            expect(result.modifiedCount).to.be.a('number');
            expect(result.modifiedCount).to.be(1);
            expect(result.upsertedCount).to.be.a('number');
            expect(result.upsertedCount).to.be(0);
            expect(result.result.ok).to.be.a('number');
            expect(result.result.ok).to.be(1);
            // scanned
            expect(result.result.n).to.be.a('number');
            expect(result.result.n).to.be(2);
            expect(result.result.nModified).to.be.a('number');
            expect(result.result.nModified).to.be(1);
            expect(result.ops).to.be.an('array');
            expect(result.ops.length).to.be(1);
            expect(c.count()).to.be.a('number');
            expect(c.count()).to.be(2);
            done();
        })
    });
    it("should replace upsert an item", function(done) {
        var c = new Collection([
            item_root
        ]);
        c.replaceOne({
            _id: item_a._id
         }, item_a, {
            upsert: true
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log(result);
            expect(result.modifiedCount).to.be.a('number');
            expect(result.modifiedCount).to.be(0);
            expect(result.upsertedCount).to.be.a('number');
            expect(result.upsertedCount).to.be(1);
            expect(result.ops).to.be.an('array');
            expect(result.ops.length).to.be(1);
            expect(c.count()).to.be.a('number');
            expect(c.count()).to.be(2);
            done();
        })
    });
    it("should give an error trying to replace a non existing item", function(done) {
        var c = new Collection([
            item_root
        ]);
        c.replaceOne({
            _id: item_a._id
         }, item_a, function(err, result) {
            expect(err).to.be.a(errors.RepoCollectionError);
            expect(err.message).to.be.a('string');
            expect(err.message).to.be('Key not found');
            done();
        })
    });
    it("should find an item by id", function(done) {
        var c = new Collection([
            item_root, 
            item_a
        ]);
        var items = c.find({
            _id: item_root._id
         });
        expect(items.count()).to.be.a('number');
        expect(items.count()).to.be(1);
        items.toArray(function(err, result) {
            if (err) {
                return callback(err);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(1);
            done();
        })
    });
    it("should find an item by path", function(done) {
        var c = new Collection([
            item_root, 
            item_a
        ]);
        var items = c.find({
            path: item_root.path
         });
        expect(items.count()).to.be.a('number');
        expect(items.count()).to.be(1);
        items.toArray(function(err, result) {
            if (err) {
                return callback(err);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(1);
            done();
        })
    });
});