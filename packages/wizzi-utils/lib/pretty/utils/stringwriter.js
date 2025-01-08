/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\pretty\utils\stringwriter.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var md = module.exports = {};
var StringWriter = (function () {
    function StringWriter(noLF) {
        _classCallCheck(this, StringWriter);
        this.noLF = noLF;
        this.texts = [];
        this.indentValue = 0;
        this.newLine = true;
    }
    StringWriter.prototype.w = function(text) {
        if (this.newLine == true && !this.noLF) {
            this.texts.push(spaces(this.indentValue * 4));
        }
        if (text) {
            this.texts.push(text);
        }
        if (!this.noLF) {
            this.texts.push('\n');
        }
        this.newLine = true;
    }
    StringWriter.prototype.write = function(text) {
        if (this.newLine == true && !this.noLF) {
            this.texts.push(spaces(this.indentValue * 4));
            this.newLine = false;
        }
        if (text) {
            this.texts.push(text);
        }
    }
    StringWriter.prototype.indent = function() {
        this.indentValue++;
    }
    StringWriter.prototype.deindent = function() {
        this.indentValue = Math.max(0, this.indentValue -1);
    }
    StringWriter.prototype.toString = function() {
        return this.texts.join('');
    }
    StringWriter.prototype.toLines = function() {
        if (this.noLF) {
            return [this.toString()];
        }
        else {
            return this.toString().split('\n');
        }
    }
    return StringWriter;
})();

function spaces(num) {
    if (num < 1) {
        return '';
    }
    return Array(num + 1).join(" ");
}
md.StringWriter = StringWriter;