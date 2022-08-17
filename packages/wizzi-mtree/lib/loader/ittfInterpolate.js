/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\ittfInterpolate.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var jsWizziRunner = require('../jswizzi/jsWizziRunner');
//
var state_text = 0;
var state_tag = 1;
var state_key = 2;
function interpolate(template, jsWizziContext, options) {
    if (typeof template === 'undefined' || template === null) {
        return '';
    }
    if (typeof options === 'undefined' || options === null) {
        options = {};
    }
    var isCompile = options.isCompile;
    var l = template.length,
        result = [],
        ch,
        key,
        inside_tags = 0,
        state = state_text,
        replacer = null,
        keyOrCode;
    if (isCompile) {
        result.push("'");
    }
    for (var i=0; i<l; i++) {
        ch = template[i];
        
        // loog 'wizzi-mtree.loader.ittfInterpolate', template[i+1], template[i+2], template[i+3]
        if (ch == '\\') {
        }
        if (state == state_text && ch == '\\' && i+3 < l && template[i+1] == '$' && template[i+2] == '\\' && template[i+3] == '{') {
            result.push('${');
            i = i +3;
            continue;
        }
        if (ch == '$') {
            if (state == state_text) {
                state = state_tag;
            }
            else if (state == state_key) {
                key.push(ch);
            }
            // state == state_tag
            // case double
            else {
                result.push('$$');
                state = state_text;
            }
        }
        else if (ch == '{') {
            if (state == state_text) {
                if (isCompile && ch === "'") {
                    result.push('\\');
                }
                result.push(ch);
            }
            
            // case '{' inside $ { }
            else if (state == state_key) {
                inside_tags++;
                key.push(ch);
            }
            // state == state_tag
            // case ${
            else {
                state = state_key;
                key = [];
                inside_tags = 0;
            }
        }
        else if (ch == '}') {
            if (state == state_text) {
                if (isCompile && ch === "'") {
                    result.push('\\');
                }
                result.push(ch);
            }
            else if (state == state_key) {
                
                // case '{}' inside $ { }
                if (inside_tags > 0) {
                    inside_tags--;
                    key.push(ch);
                }
                else {
                    keyOrCode = key.join('');
                    
                    // case empty ${} - is ok do not replace
                    if (keyOrCode.replace(/\s/g,'').length == 0) {
                        result.push('${}');
                    }
                    else {
                        if (isCompile) {
                            result.push("' + " + keyOrCode + " + '");
                        }
                        else {
                            var replacer = evalKeyOrCode(keyOrCode, jsWizziContext);
                            if (replacer && replacer.__is_error) {
                                return replacer;
                            }
                            result.push(replacer);
                        }
                    }
                    state = state_text;
                }
            }
            // state == state_tag
            // case strange sequence '$}' but ok
            else {
                result.push('$}');
                state = state_text;
            }
        }
        else {
            if (state == state_text) {
                if (isCompile && ch === "'") {
                    result.push('\\');
                }
                result.push(ch);
            }
            else if (state == state_key) {
                key.push(ch);
            }
            // state == state_tag
            // case sequence '\$\*' is text
            else {
                result.push('$');
                if (isCompile && ch === "'") {
                    result.push('\\');
                }
                result.push(ch);
                state = state_text;
            }
        }
    }
    // check for unclosed macros
    
    // 16/11/17 _ result.push('${' + verify.replaceAll(key.join(''), "'", "\\'"))
    if (state == state_key) {
        result.push('${' + key.join(''));
    }
    else if (state == state_tag) {
        result.push('$');
    }
    if (isCompile) {
        result.push("'");
    }
    return result.join('');
}
function evalKeyOrCode(keyOrCode, jsWizziContext) {
    // loog 'wizzi-mtree.loader.ittfInterpolate.evalKeyOrCode: ', keyOrCode
    // TODO Is this a week assumption ???
    var stm = keyOrCode.indexOf('return ') > -1 ? 'var _____result = function dummy() { ' + keyOrCode + ' }();' : 'var _____result = ' + keyOrCode + ';';
    // loog 'wizzi-mtree.loader.ittfInterpolate.evalKeyOrCode.previous._____result: ', keyOrCode, jsWizziContext.isDeclared('_____result')
    var notUsed = jsWizziRunner.run(stm, jsWizziContext);
    
    // TODO verify.logError does not exist any more 25/02/21
    
    // _ verify.logError( 'checked_call_return.error.method',  'wizzi-mtree@0.7.13.loader.ittfInterpolate.evalKeyOrCode' )
    
    // _ verify.logError( 'checked_call_return.error.forTest',  'stm',  stm )
    
    // _ verify.logError( 'checked_call_return.error.notUsed', notUsed )
    if (notUsed && notUsed.__is_error) {
        return notUsed;
    }
    var result = jsWizziContext.getValue('_____result');
    // loog 'wizzi-mtree.loader.ittfInterpolate.evalKeyOrCode: ', keyOrCode, result
    jsWizziContext.setValue('_____result', undefined);
    return result;
}
module.exports = interpolate;
