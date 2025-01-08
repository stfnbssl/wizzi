/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\ittfMacro.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('./verify');
var md = module.exports = {};
md.escape = function(value) {
    var parts = md.analize(value);
    var sb = [];
    var i, i_items=parts, i_len=parts.length, part;
    for (i=0; i<i_len; i++) {
        part = parts[i];
        if (part.t == 0) {
            sb.push(part.v);
        }
        else {
            sb.push("$" + "{'$'}{" + part.v + "}");
        }
    }
    return sb.join('');
}
;
md.analize = function(template) {
    var state_literal = 0;
    var state_tag = 1;
    var state_expr = 2;
    if (typeof template === 'undefined' || template === null) {
        return [];
    }
    var l = template.length,
        resultParts = [],
        literal = [],
        ch,
        chNext,
        expr = [],
        inside_tags = 0,
        state = state_literal,
        keyOrCode;
    for (var i=0; i<l; i++) {
        ch = template[i];
        chNext = template[i+1];
        
        // loog 'wizzi-mtree.loader.ittfInterpolate', template[i+1], template[i+2], template[i+3]
        if (ch == '\\') {
        }
        if (state == state_literal && ch == '\\' && i+3 < l && template[i+1] == '$' && template[i+2] == '\\' && template[i+3] == '{') {
            literal.push('${');
            i = i +3;
            continue;
        }
        if (ch == '$') {
            if (state == state_literal) {
                if (chNext == '{') {
                    state = state_tag;
                }
                else {
                    literal.push(ch);
                }
            }
            else if (state == state_expr) {
                expr.push(ch);
            }
            // state == state_tag
            // case double
            else {
                literal.push('$$');
                state = state_literal;
            }
        }
        else if (ch == '{') {
            if (state == state_literal) {
                literal.push(ch);
            }
            
            // case '{' inside $ { }
            else if (state == state_expr) {
                inside_tags++;
                expr.push(ch);
            }
            // state == state_tag
            // case ${
            else {
                state = state_expr;
                expr = [];
                inside_tags = 0;
            }
        }
        else if (ch == '}') {
            if (state == state_literal) {
                literal.push(ch);
            }
            else if (state == state_expr) {
                
                // case '{}' inside $ { }
                if (inside_tags > 0) {
                    inside_tags--;
                    expr.push(ch);
                }
                else {
                    keyOrCode = expr.join('');
                    
                    // case empty ${} - is ok do not replace
                    if (keyOrCode.replace(/\s/g).length == 0) {
                        literal.push('${}');
                    }
                    else {
                        if (literal.length > 0) {
                            resultParts.push({
                                t: 0, 
                                v: literal.join('')
                             })
                            literal.length = 0;
                        }
                        resultParts.push({
                            t: 1, 
                            v: keyOrCode
                         })
                        expr.length = 0;
                    }
                    state = state_literal;
                }
            }
            // state == state_tag
            // case strange sequence '$}' but ok
            else {
                literal.push('$}');
                state = state_literal;
            }
        }
        else {
            if (state == state_literal) {
                literal.push(ch);
            }
            else if (state == state_expr) {
                expr.push(ch);
            }
            // state == state_tag
            // case sequence '\$\*' is text
            else {
                literal.push('$');
                literal.push(ch);
                state = state_literal;
            }
        }
    }
    // check for unclosed macros
    if (state == state_expr) {
        literal.push('${' + expr.join(''));
    }
    else if (state == state_tag) {
        literal.push('$');
    }
    if (literal.length > 0) {
        resultParts.push({
            t: 0, 
            v: literal.join('')
         })
        literal.length = 0;
    }
    return resultParts;
}
;