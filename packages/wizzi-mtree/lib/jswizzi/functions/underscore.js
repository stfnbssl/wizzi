/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\functions\underscore.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var util = require('util');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;
var file = require('@wizzi/utils').file;
var inflect = require('i')(true);
module.exports = {
    readFile: function(filePath, format) {
        try {
            const data = file.read(filePath);
            if (format == "for-json-string") {
                return verify.replaceAll(verify.replaceAll(verify.replaceAll(verify.replaceAll(data, '\n', ''), '\r', ''), '\\', '/'), '"', '\\"');
            }
            else {
                return text;
            }
        } 
        catch (ex) {
            return ex.message;
        } 
    }, 
    stringify: function(value, options, tabspaces) {
        if (tabspaces) {
            return stringify(value, options, tabspaces);
        }
        else {
            return stringify(value);
        }
    }, 
    pluralize: function(str) {
        return inflect.pluralize(str);
    }, 
    singularize: function(str) {
        return inflect.singularize(str);
    }, 
    capitalize: function(str) {
        return str.replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
            });
    }, 
    camelize: function(str) {
        return inflect.camelize(str, false);
    }, 
    camelCase: function(str) {
        return inflect.camelize(str, false);
    }, 
    dasherize: function(str) {
        return inflect.dasherize(str, false);
    }, 
    dashToCamelCase: function(str) {
        return verify.dashToCamelCase(str);
    }, 
    underscore: function(str) {
        return inflect.underscore(str, false);
    }, 
    titleize: function(str) {
        return inflect.titleize(str, false);
    }, 
    tableize: function(str) {
        return inflect.tableize(str, false);
    }, 
    ordinalize: function(str) {
        return inflect.ordinalize(str, false);
    }, 
    escape: function(value) {
        if (verify.isNotEmpty(value)) {
            return verify.replaceAll(verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"'), "'", "\\'");
        }
        else {
            return value;
        }
    }, 
    isEmpty: function(text) {
        return typeof text === 'string' && text.trim().length === 0;
    }, 
    isNotEmpty: function(text) {
        return typeof text === 'string' && text.trim().length > 0;
    }, 
    isObject: function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }, 
    isArray: function(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        else {
            return toString.call(obj) === '[object Array]';
        }
    }, 
    isString: function(obj) {
        return toString.call(obj) === '[object String]';
    }, 
    isNumber: function(obj) {
        return toString.call(obj) === '[object Number]';
    }, 
    isDate: function(obj) {
        return toString.call(obj) === '[object Date]';
    }, 
    isBoolean: function(obj) {
        return typeof obj === "boolean" || obj instanceof Boolean;
    }, 
    isFunction: function(obj) {
        return toString.call(obj) === '[object Function]';
    }, 
    isUndefined: function(obj) {
        return obj === void 0;
    }, 
    deinline: function(text) {
        if (this.isNotEmpty(text) == false) {
            return '';
        }
        var len = text.length,
            ch,
            i,
            ret = [];
        for (i=0; i<len; i++) {
            ch = text[i];
            if (ch === '¥') {
                ret.push('\n');
            }
            else if (ch === '┐') {
                ret.push('\r');
            }
            else if (ch === '└') {
                ret.push('$');
            }
            else if (ch === '\t') {
                ret.push('    ');
            }
            else {
                ret.push(ch);
            }
        }
        return ret.join('');
    }, 
    log: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(0, 0, "=== jsWizzi:log => ")
        console.log.apply(null, args)
    }, 
    inspect: function(obj) {
        return util.inspect(obj, { depth: null});
    }, 
    replace: function(text, from, to) {
        return verify.replaceAll(text, from, to);
    }, 
    abend: function(message) {
        throw new Error(message);
    }, 
    sort: function(items, prop) {
        return items.sort(function(a, b) {
                var xA = prop ? a[prop].toUpperCase() : a.toUpperCase();
                var xB = prop ? b[prop].toUpperCase() : b.toUpperCase();
                if (xA < xB) {
                    return -1;
                }
                if (xA > xB) {
                    return 1;
                }
                return 0;
            });
    }, 
    filter: function(items, prop, value) {
        return items.filter(function(a) {
                return a[prop] === value;
            });
    }, 
    unique: function(items) {
        var result = [];
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            if (result.indexOf(item) < 0) {
                result.push(item);
            }
        }
        return result;
    }, 
    now_GMYHMS: function() {
        var date = new Date();
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();
    }, 
    GMYHMS: function(date) {
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();
    }, 
    GMYHM: function(date) {
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes()
    }, 
    GMY: function(date) {
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear()
    }
 };