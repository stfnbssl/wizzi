/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\repo\ittfDocumentStore.js.ittf
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

describe("IttfDocumentStore", function() {
    
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
    it("should get an ittf model content", function(done) {
        store.getModelContent(path.join(__dirname, 'data', 'doc2.tests.ittf'), function(err, content) {
            expect(content).to.be.a('string');
            expect(content).to.be('tests School');
            done();
        })
    });
    it("should get an ittf model content", function(done) {
        store.documentExists(path.join(__dirname, 'data', 'doc1.tests.ittf'), function(err, result) {
            expect(result).to.be(true);
            done();
        })
    });
});