/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\all\utils\objectid.js.ittf
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