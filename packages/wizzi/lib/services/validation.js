/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\validation.js.ittf
    utc time: Thu, 02 Jan 2025 12:51:28 GMT
*/

var verify = require('@wizzi/utils').verify;

const md = module.exports = {};

md.validatePlugin = function(options) {
    const vld = startValidation();
    // .... vld.error({})
    return vld.getValid();
}
;
md.validateMetaPlugin = function(options) {
    const vld = startValidation();
    // .... vld.error({})
    return vld.getValid();
}
;
md.validateInMemoryMetaPlugin = function(inMemoryMetaPluginOptions) {
    const obj = inMemoryMetaPluginOptions;
    const vld = startValidation();
    const method = "validateInMemoryMetaPlugin";
    const messageTail = "";
    if (verify.isNotEmpty(obj.name) == false) {
        vld.error({
            method, 
            message: 'Missing "name" property' + messageTail
         })
    }
    if (verify.isObject(obj.metaPackiFiles) == false) {
        vld.error({
            method, 
            message: 'Property "metaPackiFiles" must be an object of type PackiFiles' + messageTail
         })
    }
    if (verify.isArray(obj.pluginMetaProductions) == false) {
        vld.error({
            method, 
            message: 'Property "pluginMetaProductions" must be an array of type MetaProductionOptions' + messageTail
         })
    }
    return vld.getValid();
}
;
class Validator {
    constructor() {
        this.errors = [];
    }
    error(err) {
        this.errors.push(err)
    }
    getValid() {
        if (this.errors.length == 0) {
            return {
                    ok: true
                 };
        }
        else {
            return {
                    __is_error: true, 
                    message: "", 
                    error: this.errors
                 };
        }
    }
}
function startValidation() {
    return new Validator();
}