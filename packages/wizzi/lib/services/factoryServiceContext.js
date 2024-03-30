/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\factoryServiceContext.js.ittf
    utc time: Fri, 29 Mar 2024 17:03:14 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
const path = require('path');
const file = require('@wizzi/utils').file;
class FactoryServiceContext {
    constructor() {
        this.__type = 'FactoryServiceContext';
        this.__version = '0.8.25';
        this.debugObjects = {};
    }
    addDebugObject(kind, key, value) {
        console.log('wizzi.factoryServiceContext.addDebugObject.kind+key', kind, key, __filename);
        var xvalue = value;
        if (kind == 'packi') {
            xvalue = clonePackifiles(value);
            console.log('wizzi.factoryServiceContext.addDebugObject cloned packi', key, __filename);
        }
        this.debugObjects[kind+"|"+key] = {
            kind: kind, 
            key: key, 
            value: xvalue
         };
    }
    dumpDebugObjects(options) {
        if (verify.isObject(options) === false) {
            return error(
                'InvalidArgument', 'dumpDebugObjects', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            );
        }
        if (options.kind == 'file') {
            this._dumpDebugFiles(options)
        }
        else if (options.kind == 'packi') {
            this._dumpDebugPackiFiles(options)
        }
        else {
            consol.error(error('InvalidParameter', 'dumpDebugObjects', 'Missing option: kind'))
            throw new Error("InvalidParameter");
        }
    }
    _dumpDebugFiles(options) {
        if (options.destFolder) {
            for (var k in this.debugObjects) {
                if (this.debugObjects[k].kind == 'file') {
                    file.write(path.join(options.destFolder, this.debugObjects[k].key), this.debugObjects[k].value)
                    console.log('wizzi@0.8.25.factoryServiceContext.dumpDebugObjects', 'dumped', this.debugObjects[k].key, 'file', __filename);
                }
            }
        }
        else {
            consol.error(error('InvalidParameter', '_dumpDebugPackiFiles', 'Missing option: destFolder'))
            throw new Error("InvalidParameter");
        }
    }
    _dumpDebugPackiFiles(options) {
        if (options.destFolder) {
            for (var k in this.debugObjects) {
                if (this.debugObjects[k].kind == 'packi') {
                    writePackifiles(path.join(options.destFolder, this.debugObjects[k].key), this.debugObjects[k].value)
                    console.log('wizzi@0.8.25.factoryServiceContext.dumpDebugObjects', 'dumped', this.debugObjects[k].key, 'packiFiles', __filename);
                }
            }
        }
        else {
            consol.error(error('InvalidParameter', '_dumpDebugPackiFiles', 'Missing option: destFolder'))
            throw new Error("InvalidParameter");
        }
    }
}
function clonePackifiles(packiFiles) {
    var ret = {};
    for (var k in packiFiles) {
        ret[k] = {
            type: packiFiles[k].type, 
            contents: packiFiles[k].contents
         };
    }
    return ret;
}
function writePackifiles(folderPath, packiFiles) {
    for (var k in packiFiles) {
        file.write(path.join(folderPath, k), packiFiles[k].contents)
    }
}
module.exports = FactoryServiceContext;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi@0.8.25.factoryServiceContext.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
