/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\all\services\pluginsManager_internal_1.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var pluginsManager = require('../../../lib/services/pluginsManager');

describe("pluginsManager internals 1", function() {
    
    var pluginsManagerInstance = null;
    
    before(function() {
        pluginsManagerInstance = new pluginsManager.PluginsManager();
        ;
    });
    
    it("should resolve a plugin module", function(done) {
        var pkgPath = path.resolve(__dirname, '../../mocks/plugin.js');
        pluginsManager.resolveModule(__dirname, '../../mocks/plugin', function(err, pmod) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            // loog 'pluginsManager internals 1 pmod', pmod
            expect(pmod).to.be.an('object');
            expect(pmod.createFactoryPlugin).to.be.a('function');
            expect(pmod.packagePath).to.be.a('string');
            expect(pmod.packagePath).to.be(pkgPath);
            done();
        })
    });
    
    it("should give an error trying to resolve a plugin package", function(done) {
        pluginsManager.resolvePackage(__dirname, '../../mocks/plugin/package.json', function(err, pkg) {
            console.log("[31m%s[0m", 'pluginsManager internals 1 err, pkg', err, pkg);
            expect(err.__is_error).to.be(true);
            expect(err.name).to.be.a('string');
            expect(err.name).to.be('ENOENT');
            done();
        })
    });
    
    it("should resolve a plugin package", function(done) {
        var pkgPathExpected = path.resolve(__dirname, '../../mocks/plugin_ex/package.json');
        pluginsManager.resolvePackage(__dirname, '../../mocks/plugin_ex/package.json', function(err, pkgpath) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            expect(pkgpath).to.be.a('string');
            expect(pkgpath).to.be(pkgPathExpected);
            done();
        })
    });
});