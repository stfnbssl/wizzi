/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\lib\artifacts\js\module\gen\codegen\react\class.js.ittf
*/
'use strict';
var es6_class = require('../es6/class');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.react.class';
md.gen = function(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in ' + myname + '.gen');
    }
    if (typeof callback !== 'function') {
        throw new Error('The callback parameter must be a function. In ' + myname + '.gen. Got: ' + callback);
    }
    new es6_class.gen(model, ctx, callback);
}
;