/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\factoryServiceContext.js.ittf
    utc time: Tue, 03 Sep 2024 18:51:44 GMT
*/
var verify = require('@wizzi/utils').verify;
const path = require('path');
const file = require('@wizzi/utils').file;
class FactoryServiceContext {
    constructor() {
        this.__type = 'FactoryServiceContext';
        this.__version = '0.8.43';
        this.debugObjects = {};
    }
    addDebugObject(kind, key, value) {
        // loog 'wizzi.factoryServiceContext.addDebugObject.kind+key', kind, key
        var xvalue = value;
        
        // loog 'wizzi.factoryServiceContext.addDebugObject cloned packi', key
        if (kind == 'packi') {
            xvalue = clonePackifiles(value);
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
                
                // loog 'wizzi@0.8.43.factoryServiceContext.dumpDebugObjects', 'dumped', this.debugObjects[k].key, 'file'
                if (this.debugObjects[k].kind == 'file') {
                    file.write(path.join(options.destFolder, this.debugObjects[k].key), this.debugObjects[k].value)
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
                
                // loog 'wizzi@0.8.43.factoryServiceContext.dumpDebugObjects', 'dumped', this.debugObjects[k].key, 'packiFiles'
                if (this.debugObjects[k].kind == 'packi') {
                    writePackifiles(path.join(options.destFolder, this.debugObjects[k].key), this.debugObjects[k].value)
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
        method: 'wizzi@0.8.43.factoryServiceContext.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}