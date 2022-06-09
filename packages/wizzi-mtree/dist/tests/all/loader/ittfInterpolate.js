/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\tests\all\loader\ittfInterpolate.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var createStoreFactory = require('wizzi-repo').createStoreFactory;
function getFSDocumentStore(callback) {
    createStoreFactory({
        kind: 'filesystem'
    }, function(err, storeFacory) {
        if (err) {
            return callback(err);
        }
        return storeFacory(callback);
    })
}

var Context = require('../../../lib/jswizzi/jsWizziContext');
var ip = require('../../../lib/loader/ittfInterpolate');
var errors = require('../../../lib/jswizzi/errors');

function evaluate(uri, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
    };
    MTreeBrickProvider.createFromUri(uri, loadContext, function(err, provider) {
        var mTree = provider.getPrimaryMTreeBrick();
        mixer(mTree, provider, function(err, mixedModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            appender(mixedModel, function(err, appendedModel) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                evaluator(appendedModel, loadContext, callback)
            })
        })
    })
}

describe("ittfInterpolate", function() {
    var ctx = new Context();
    beforeEach(function() {
        ctx.clear();
        ctx.set_GlobalContext();
    });
    it("interpolate a single var", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('My name is $' + '{name}.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('My name is stefi.');
    });
    it("interpolate a single var + an empty var", function() {
        ctx.setValue('name', 'stefi');
        ctx.setValue('hobby', '');
        var result = ip('My name is $' + '{name} and hobby $' + '{hobby}.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('My name is stefi and hobby .');
    });
    it("escaped interpolation", function() {
        ctx.setValue('name', 'stefi');
        ctx.setValue('hobby', 'walking');
        var result = ip('My name is \\$' + '\\{name} and hobby $' + '{hobby}.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('My name is $' + '{name} and hobby walking.');
    });
    it("strange template string", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello *{ $a $ {} a$ ok.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello *{ $a $ {} a$ ok.');
    });
    it("not closed var delimiter", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello ${a', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello ${a');
    });
    it("ending dollar", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello $', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello $');
    });
    it("double dollar", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello $' + '$ ok', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello $' + '$ ok');
    });
    it("interpolated can manage methods on values", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello $' + '{ _.capitalize(name); }.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello Stefi.');
    });
    it("access a member property of an object", function() {
        var obj = {
            a: 'stefi'
        };
        ctx.setValue('obj', obj);
        var result = ip('Hello $' + '{ obj.a }.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello stefi.');
    });
    it("access a not existent member property of an object", function() {
        var obj = {
            a: 'stefi'
        };
        ctx.setValue('obj', obj);
        var result = ip('Hello $' + '{ obj.b }.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello .');
    });
    it("access a not existent member property of an object after accesing an existent one", function() {
        var obj = {
            a: 'stefi'
        };
        ctx.setValue('obj', obj);
        var result = ip('Hello $' + '{ obj.a }.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello stefi.');
        result = ip('Hello $' + '{ obj.b }.', ctx);
        // log 'result', result
        expect(result).to.be.a('string');
        expect(result).to.be('Hello .');
    });
});
