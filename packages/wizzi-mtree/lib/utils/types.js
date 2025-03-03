/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\utils\types.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var errors = require('../errors');
var verify = require('@wizzi/utils').verify;
function objectify(value, type, node, unquote) {
    if (value === '@@null') {
        return null;
    }
    if (value === '@@empty') {
        return "";
    }
    if (value === '@@undefined') {
        return undefined;
    }
    var _isTemplate = isTemplate(value);
    if (_isTemplate) {
        return value;
    }
    if (type == null || typeof(type) === 'undefined' || type == 'string') {
        if (verify.isString(value)) {
            if (unquote) {
                return verify.unquote(value);
            }
            else {
                return value;
            }
        }
        else {
            return '';
        }
    }
    else if (type == 'integer') {
        if (isNaN(value) == false) {
            return parseInt(value, 10);
        }
        else {
            return error('Cannot convert ' + value + ' to integer', node, 'objectify');
        }
    }
    else if (type == 'float') {
        if (isNaN(value) == false) {
            return parseFloat(value);
        }
        else {
            return error('Cannot convert ' + value + ' to float', node, 'objectify');
        }
    }
    else if (type == 'boolean') {
        if (isBool(value)) {
            return parseBool(value);
        }
        else {
            return error('Cannot convert ' + value + ' to boolean', node, 'objectify');
        }
    }
    else if (type == 'date') {
        if (isDate(value)) {
            return parseDate(value);
        }
        else {
            return error('Cannot convert ' + value + ' to date', node, 'objectify');
        }
    }
    return error('Invalid type: "' + type + '", expected (string, integer, float, boolean, date)', node, 'objectify');
}
function isTemplate(obj) {
    if (isString(obj) === false) {
        return false;
    }
    return obj.substr(0, 2) === ' && obj.substr(-1, 1) === ';
}
function isDefined(obj) {
    return !(typeof(obj) === 'undefined');
}
function isObject(obj) {
    return obj !== null && typeof(obj) === 'object';
}
function isString(obj) {
    return obj !== null && typeof(obj) === 'string';
}
function isBool(obj) {
    if (isString(obj)) {
        return obj === 'true' || obj === 'false';
    }
    return typeof(obj) === "boolean";
}
function isDate(obj) {
    var parts = input.split('/');
    return parts.length == 3;
}
function parseBool(obj) {
    return obj === 'true' ? true : false;
}
function parseDate(obj) {
    var parts = input.split('/');
    return new Date(parts[0], parts[1] - 1, parts[2]);
}
function error(message, node, method) {
    return {
            __is_error: true, 
            message: message, 
            source: 'wizzi-mtree@0.8.32.utils.types.' + method
         };
}

module.exports = {
    objectify: objectify,
    isTemplate: isTemplate,
    isDefined: isDefined,
    isObject: isObject,
    isString: isString,
    isBool: isBool,
    isDate: isDate,
    parseBool: parseBool,
    parseDate: parseDate
};