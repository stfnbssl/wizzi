/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\tests\mocks\index.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var mocks = require('../../lib/mocks');

describe("mocks", function() {
    it("should get FactoryWizziObject", function() {
        var hr = mocks.getFactoryWizziObject();
        expect(hr.loadMTree).not.to.be(null);
    });
});
