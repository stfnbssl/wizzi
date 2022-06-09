/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\examples\jswizzi\global.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var file = require('../../tests/util/file');
var mocks = require('../../tests/loader/mocks/misc');
var mTreeLoader = require('../../tests/loader/mocks/mTreeLoader');
module.exports = function() {
    var store,
        evaluatedModel;
    console.log(1);
    store = new mocks.IttfDocumentStore();
    console.log(2);
    store.init({
        storeKind: 'filesystem'
    }, function(err, notUsed) {
        if (err) {
            console.log('err', err);
            if (err.toString()) {
                console.log('err.toString()', err.toString());
            }
            if (err.inner) {
                console.log('err.inner', err.inner);
                if (err.inner.toString) {
                    console.log('err.inner.toString()', err.inner.toString());
                }
            }
            throw new Error(err.message);
        }
        console.log(3);
        var ittfPath = path.join(__dirname, 'ittf', 'global.tests.ittf');
        console.log(4);
        mTreeLoader(store, ittfPath, function(err, result) {
            if (err) {
                console.log('err', err);
                if (err.toString()) {
                    console.log('err.toString()', err.toString());
                }
                if (err.inner) {
                    console.log('err.inner', err.inner);
                    if (err.inner.toString) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                }
                throw new Error(err.message);
            }
            console.log(5, result);
            evaluatedModel = result;
            var result = util.inspect(evaluatedModel, {
                depth: null
            });
            console.log('$global result', result);
            file.write(path.join(__dirname, 'outputs', 'global.tests.ittf'), evaluatedModel.toIttf());
        });
    });
};
