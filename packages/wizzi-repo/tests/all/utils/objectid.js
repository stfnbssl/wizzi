/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\utils\objectid.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var ObjectId = require('../../../lib/utils/objectId');

describe("utils.objectId", function() {
    it("should create an objectId", function() {
        var id = new ObjectId;
        // loog 'ObjectId.id', id
        expect(id).to.be.an('object');
        expect(id.toString().length).to.be.a('number');
        expect(id.toString().length).to.be(24);
    });
});