/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\errors.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var util = require('util');
var wizziUtils = require('@wizzi/utils');
var f_verify = require('./functions/verify');

var pkgVersioned = ' (@wizzi/mtree.0.8.32)';

var md = module.exports = {};

function JsWizziRunnerError(message, node) {
    this.name = 'JsWizziRunnerError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    this.message = message + util.inspect(node.loc, {depth: null});
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziRunnerError.prototype.toString = function() {
    return this.message;
}
;
JsWizziRunnerError.prototype = Object.create(Error.prototype);
JsWizziRunnerError.prototype.constructor = JsWizziRunnerError;
md.JsWizziRunnerError = JsWizziRunnerError;

function InvalidVariableNameError(message) {
    this.name = 'InvalidVariableNameError';
    this.message = message;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    this.message = message;
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
InvalidVariableNameError.prototype.toString = function() {
    return this.message;
}
;
InvalidVariableNameError.prototype = Object.create(Error.prototype);
InvalidVariableNameError.prototype.constructor = InvalidVariableNameError;
md.InvalidVariableNameError = InvalidVariableNameError;

function JsWizziSynthaxError(message, node) {
    this.name = 'JsWizziSynthaxError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    // loog 'JsWizziSynthax.message', message
    
    // In this case node = WizziJS source
    if (f_verify.isObject(message) && message.lineNumber) {
        this.message = "Synthax error. " + message.description +' at line ' + message.lineNumber +' column ' + message.column +'\n' +getEsprimaErrorLines(message, node) +'\n';
        this.errorLines = getEsprimaErrorLines(message, node, true);
    }
    else {
        this.message = message;
    }
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziSynthaxError.prototype.toString = function() {
    return this.message;
}
;
JsWizziSynthaxError.prototype = Object.create(Error.prototype);
JsWizziSynthaxError.prototype.constructor = JsWizziSynthaxError;
md.JsWizziSynthaxError = JsWizziSynthaxError;

/**
    For
     vars or functions undeclared
     invalid values
*/
function JsWizziTypeError(message, node) {
    this.name = 'JsWizziTypeError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    this.message = message;
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziTypeError.prototype.toString = function() {
    return this.message;
}
;
JsWizziTypeError.prototype = Object.create(Error.prototype);
JsWizziTypeError.prototype.constructor = JsWizziTypeError;
md.JsWizziTypeError = JsWizziTypeError;

/**
     params
     { errorData
     @ row
     @ col
     @ description
     string source
     boolean json
    
*/
md.getErrorLines = function(errorData, source, json) {
    // loog 'jswizzi.errors.getErrorLines.loc', 'calling getErrorLines', errorData
    var statements = source.split('\n');
    var start = Math.max(0, (errorData.row - 4));
    var end = Math.min(statements.length, (errorData.row + 4));
    var ret = [];
    var parsedErrorLine = {};
    for (var i = start; i < end; i++) {
        ret.push(formatLineNumber(i + 1) + ' ' + statements[i]);
        
        // loog 'jswizzi.errors.getErrorLines.statements[i])', statements[i]
        if (i == errorData.row - 1) {
            var col = errorData.pos || errorData.col;
            ret.push(spaces(col + 4) + '^ ' + (errorData.description + '  <--- --- --- --- --- ERROR' || ''));
            parsedErrorLine = parseScriptLine(statements[i]);
        }
    }
    return json ? { lines: ret, parsedErrorLine: parsedErrorLine } : ret.join('\n');
}
;
md.esprimaNodeErrorLines = function(description, node, source, json) {
    
    // loog 'jswizzi.errors.esprimaNodeErrorLines.source', source
    
    // loog 'jswizzi.errors.esprimaNodeErrorLines.node.loc', node.loc, 'calling getErrorLines'
    if (node && node.loc) {
        return md.getErrorLines({
                row: node.loc.start.line, 
                col: node.loc.start.column, 
                description: description
             }, source, json);
    }
    // loog 'jswizzi.errors.esprimaNodeErrorLines', 'node has no loc property', node
    else {
        return ['No data available'];
    }
}
;
function getEsprimaErrorLines(esprimaException, source, json) {
    var statements = source.split('\n');
    var start = Math.max(0, (esprimaException.lineNumber - 4));
    var end = Math.min(statements.length, (esprimaException.lineNumber + 4));
    var ret = [];
    for (var i = start; i < end; i++) {
        ret.push(formatLineNumber(i + 1) + ' ' + statements[i]);
        if (i == esprimaException.lineNumber - 1) {
            var col = Math.max(0, esprimaException.column);
            ret.push(spaces(col + 4) + '^ ' + esprimaException.description);
        }
    }
    return json ? ret : ret.join('\n');
}
function parseScriptLine(line) {
    var ndx = line.indexOf('//node:');
    // loog 'parseScriptLine', line, ndx, line[ndx+7], line[ndx+8]
    var state = 1;
    var ret = {
        nodeId: ''
     };
    for (var i=ndx+7; i<line.length; i++) {
        var ch = line[i];
        if (state == 1) {
            if (ch >= '0' && ch <= '9') {
                ret.nodeId = ret.nodeId + ch;
            }
            // loog 'parseInt(ret.nodeId)', parseInt(ret.nodeId)
            else {
                ret.nodeId = parseInt(ret.nodeId);
                state = 2;
            }
        }
    }
    if (state == 1) {
        ret.nodeId = parseInt(ret.nodeId);
    }
    return ret;
}
function spaces(num) {
    if (num > 0) {
        return Array(num + 1).join(" ");
    }
    else {
        return '';
    }
}
function formatLineNumber(num) {
    if (num > 999) {
        return num;
    }
    if (num > 99) {
        return ('0' + num);
    }
    if (num > 9) {
        return ('00' + num);
    }
    return ('000' + num);
}