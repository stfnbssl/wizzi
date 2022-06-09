/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\tests\all\jswizzi\contextData.js.ittf
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

var contextData = require('../../../lib/jswizzi/contextData');

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

describe("contextData", function() {
    var cd;
    var values;
    var alfa, beta, gamma, sigma;
    var alfa_d, beta_d, gamma_d, sigma_d;
    before(function() {
        cd = new contextData('evalContext', 'f1');
    });
    it("should set and get values", function() {
        cd.setValue('alfa', 10);
        cd.setValue('beta', 'annie');
        alfa_d = cd.isDeclared('alfa');
        expect(alfa_d).to.be(true);
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta_d = cd.isDeclared('beta');
        expect(beta_d).to.be(true);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
        var asterix_d = cd.isDeclared('asterix');
        expect(asterix_d).to.be(false);
        values = cd.getValues();
        expect(values).to.be.an('object');
        expect(Object.keys(values).length).to.be(2);
    });
    it("should push a first time and set and get values", function() {
        cd.push();
        values = cd.getValues();
        expect(values).to.be.an('object');
        expect(Object.keys(values).length).to.be(0);
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
        cd.setValue('gamma', 30);
        values = cd.getValues();
        expect(values).to.be.an('object');
        expect(Object.keys(values).length).to.be(1);
        gamma = cd.getValue('gamma');
        expect(gamma).to.be.a('number');
        expect(gamma).to.be(30);
    });
    it("should push a second time and set and get values", function() {
        cd.push();
        values = cd.getValues();
        expect(values).to.be.an('object');
        expect(Object.keys(values).length).to.be(0);
        cd.setValue('sigma', 40);
        values = cd.getValues();
        expect(values).to.be.an('object');
        expect(Object.keys(values).length).to.be(1);
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
        gamma = cd.getValue('gamma');
        expect(gamma).to.be.a('number');
        expect(gamma).to.be(30);
        sigma = cd.getValue('sigma');
        expect(sigma).to.be.a('number');
        expect(sigma).to.be(40);
    });
    it("should pop a first time and set and get values", function() {
        cd.pop();
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
        gamma = cd.getValue('gamma');
        expect(gamma).to.be.a('number');
        expect(gamma).to.be(30);
        sigma_d = cd.isDeclared('sigma');
        expect(sigma_d).to.be(false);
    });
    it("should pop a second time and set and get values", function() {
        cd.pop();
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
        sigma_d = cd.isDeclared('sigma');
        expect(sigma_d).to.be(false);
        gamma_d = cd.isDeclared('gamma');
        expect(gamma_d).to.be(false);
    });
    it("should pop a third time and set and get values", function() {
        cd.pop();
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
    });
});
