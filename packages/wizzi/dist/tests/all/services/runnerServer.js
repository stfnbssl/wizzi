/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\tests\all\services\runnerServer.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var runnerServer = require('../../lib/services/runnerServer');
var mocks = require('../mocks/misc');

describe("runnerServer", function() {
    var _wizziFactory = null;
    before(function(done) {
        runnerServer.init(__dirname)
        runnerServer.instance.registerApi('SUM', function(a, b) {
            return a + b;
        })
        runnerServer.instance.registerPlugin('../mocks/plugin')
        runnerServer.instance.registerGlobalContext({
            myname: 'stefi'
         })
        runnerServer.instance.registerGlobalContext({
            hername: 'annie'
         })
        runnerServer.instance.registerGlobalContext();
        runnerServer.instance.initializeFactory('stefi', 'admin', {
            storeKind: 'filesystem', 
            test: {
                testOnlyMockBaseDir: __dirname
             }
         }, function(err, wf) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            _wizziFactory = wf;
            done();
        })
    });
    it("should use the runnerServer to load a model", function(done) {
        runnerServer.instance.loadModel('tests', path.join(__dirname, 'ittf', 'mock1.tests.ittf'), {}, function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(wizziModel).to.be.an('object');
            expect(wizziModel.wzName).to.be.a('string');
            expect(wizziModel.wzName).to.be('mock1');
            done();
        })
    });
    it("should call a SUM api function on the runnerServer", function() {
        var tot = runnerServer.instance.callApi('SUM', 2, 2);
        expect(tot).to.be.a('number');
        expect(tot).to.be(4);
    });
});
