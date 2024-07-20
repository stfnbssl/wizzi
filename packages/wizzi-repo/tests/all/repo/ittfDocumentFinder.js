/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\repo\ittfDocumentFinder.js.ittf
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

var IttfDocumentStore = require('../../../lib/repo/ittfDocumentStore');
var IttfDocumentFinder = require('../../../lib/repo/ittfDocumentFinder');
var errors = require('../../../lib/repo/errors');

describe("ittfDocumentFinder", function() {
    
    var store = new IttfDocumentStore();
    var finder;
    
    before(function(done) {
        del.sync([__dirname + '/dummydocfinder/**'], {
            force: true
         })
        store.init({
            storeKind: 'filesystem'
         }, function(err, result) {
            // loog 'err, result', err, result
            finder = new IttfDocumentFinder(store, 'js');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: null
         }, function(err, foundUri) {
            expect(err.name).to.be('InvalidArgument');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: '/ass.fidanken.ittf'
         }, function(err, foundUri) {
            expect(err.name).to.be('InvalidArgument');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: 'ass.fidanken.ittf'
         }, function(err, foundUri) {
            expect(err.name).to.be('InvalidArgument');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: '/hello', 
            relpath: null
         }, function(err, foundUri) {
            expect(err.name).to.be('InvalidArgument');
            done();
        })
    });
    it("should get a valid uri", function(done) {
        finder.resolvePath({
            ittfDocumentUri: path.join(__dirname, 'data', 'doc1.tests.ittf'), 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: null
         }, function(err, foundUri) {
            expect(err).to.be(null);
            expect(foundUri).to.be.a('string');
            done();
        })
    });
    it("should get a valid uri for a call to a down t fragment", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: path.join(__dirname, 'data'), 
            relpath: 'frag1.tests.ittf'
         }, function(err, foundUri) {
            expect(err).to.be(null);
            expect(foundUri).to.be.a('string');
            done();
        })
    });
    it("should get a valid uri for a call to an up t fragment", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: path.join(__dirname, 'data', 'sub', 'sub'), 
            relpath: 'frag2.tests.ittf'
         }, function(err, foundUri) {
            expect(err).to.be(null);
            expect(foundUri).to.be.a('string');
            done();
        })
    });
});