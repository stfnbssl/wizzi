/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\mocks\loader\liner.js.ittf
*/
'use strict';
var util = require('util');
//
//
//
//
var COMMENT = {
    NONE: 0, 
    NONE_SEEN_DOLLAR: 1, 
    MULTI_LINE: 2, 
    MULTI_LINE_SEEN_ASTER: 3, 
    SINGLE_LINE: 21
 };
// https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/
var MACRO = {
    NONE: 0, 
    INSIDE_TEMPLATE: 1, 
    INSIDE_TEMPLATE_SEEN_ESCAPE: 2, 
    INSIDE_TEMPLATE_SEEN_DOLLAR: 10
 };
var CP = {
    TAB: 9, 
    LF: 10, 
    CR: 13, 
    SPACE: 32, 
    DOLLAR: 36, 
    ASTER: 42, 
    SLASH: 92, 
    OPEN_PAREN: 40, 
    OPEN_GRAPH: 123, 
    CLOSE_GRAPH: 125, 
    SINGLE_QUOTE: 39, 
    DOUBLE_QUOTE: 34, 
    BACKTICK: 96, 
    MACRO_REPLACE: 198
 };
module.exports = function(textContent, ittfDocumentData) {
    // TODO ensure textContent is red as utf-8 and avoid this
    var sourceKey = ittfDocumentData.sourceKey,
        lines = [],
        leadingWhiteSpaces = 0,
        line = null,
        linepos = 1,
        lineHasMacro = false,
        colpos = 0,
        commentState = COMMENT.NONE,
        macroState = MACRO.NONE,
        quote = null,
        chunk = textContent.toString('utf-8'),
        ch,
        cp,
        chUni,
        i,
        l = chunk.length;
    // TODO replace ch with chUni
    for (i = 0; i < l; i++) {
        ch = chunk[i];
        chUni = chunk.charCodeAt(i);
        if (i < l - 1) {
            cp = (chunk.charAt(i) + chunk.charAt(i + 1)).codePointAt(0);
        }
        else if (i < l) {
            cp = chunk.charAt(i).codePointAt(0);
        }
        else {
            throw new Error('wizzi-mtree.loader.liner index of chunk out of range: ' + chunk);
        }
        if (cp > 0xffff) {
            console.log('wizzi-mtree.loader.liner.cp > 0xffff');
            i += 1;
        }
        colpos++;
        
        // log '+++++ wizzi-mtree.liner', chunk[i+1], chunk[i+2], chunk[i+3]
        if (cp == CP.SLASH) {
        }
        if (quote != null) {
            if (quote == cp) {
                quote = null;
            }
            processMacro(cp);
        }
        else {
            if (commentState == COMMENT.MULTI_LINE) {
                
                // could be start of end of comment
                if (cp == CP.ASTER) {
                    commentState = COMMENT.MULTI_LINE_SEEN_ASTER;
                }
                // skip comment char
                else {
                    if (cp == CP.LF) {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == COMMENT.SINGLE_LINE) {
                
                // end of line comment
                
                // delegate end of comment to processChar
                if (cp == CP.LF) {
                    processMacro(cp);
                }
            }
            else if (commentState == COMMENT.MULTI_LINE_SEEN_ASTER) {
                
                // ok, really is end of comment
                if (cp == CP.DOLLAR) {
                    commentState = COMMENT.NONE;
                }
                // no, multi line comments continue
                // check if it is eol
                else {
                    commentState = COMMENT.MULTI_LINE;
                    if (cp == CP.LF) {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == COMMENT.NONE_SEEN_DOLLAR) {
                
                // ok, is start of multi line comment
                if (cp == CP.ASTER) {
                    commentState = COMMENT.MULTI_LINE;
                }
                
                // ok, is a single line comment
                else if (cp == CP.DOLLAR) {
                    commentState = COMMENT.SINGLE_LINE;
                }
                // no, it was not a comment, reset
                else {
                    commentState = COMMENT.NONE;
                    processMacro(CP.DOLLAR);
                    processMacro(cp);
                }
            }
            
            // start of literal
            
            // a literal suspend comments strip
            
            // comment delimiters inside quotes are normal characters.
            else if (commentState == COMMENT.NONE && ( cp == CP.SINGLE_QUOTE || cp == CP.DOUBLE_QUOTE )) {
                quote = cp;
                processMacro(cp);
            }
            
            // could be start of comment
            else if (commentState == COMMENT.NONE && cp == CP.DOLLAR) {
                commentState = COMMENT.NONE_SEEN_DOLLAR;
            }
            else if (cp == CP.SLASH && i+3 < l && chunk[i+1] == '$' && chunk[i+2] == '\\' && chunk[i+3] == '{') {
                processMacro(CP.DOLLAR);
                processMacro(CP.OPEN_GRAPH);
                i = i +3;
            }
            else {
                processMacro(cp);
            }
        }
    }
    
    // log 'last push line', line
    if (line) {
        if (typeof (line.value) !== 'undefined') {
            line.value = line.value.trim();
        }
        line.hasMacro = lineHasMacro;
        lines.push(line);
        lineHasMacro = false;
    }
    return lines;
    function processMacro(cp) {
        
        // remove escape state
        
        // log 'macroState', macroState, String.fromCodePoint(cp)
        if (macroState == MACRO.INSIDE_TEMPLATE_SEEN_ESCAPE) {
            macroState = MACRO.INSIDE_TEMPLATE;
            processChar(cp);
        }
        
        // log 'macroState', macroState, String.fromCodePoint(cp)
        else if (macroState == MACRO.INSIDE_TEMPLATE_SEEN_DOLLAR) {
            
            // ok - really it was a start of macro
            
            // Alt+146 = Æ
            if (cp == CP.OPEN_GRAPH) {
                processChar(CP.MACRO_REPLACE);
                processChar(CP.OPEN_GRAPH);
                lineHasMacro = true;
            }
            // no - it was not a start of macro
            else {
                processChar(CP.DOLLAR);
                processChar(cp);
            }
            macroState = MACRO.INSIDE_TEMPLATE;
        }
        else {
            if (cp == CP.BACKTICK) {
                
                // log 'macroState', macroState, String.fromCodePoint(cp)
                if (macroState > MACRO.NONE) {
                    macroState = MACRO.NONE;
                    processChar(cp);
                }
                // log 'macroState', macroState, String.fromCodePoint(cp)
                else {
                    macroState = MACRO.INSIDE_TEMPLATE;
                    processChar(cp);
                }
            }
            else {
                if (macroState == MACRO.INSIDE_TEMPLATE) {
                    
                    // could be start of macro
                    
                    // log 'macroState', macroState, String.fromCodePoint(cp)
                    if (cp == CP.DOLLAR) {
                        macroState = MACRO.INSIDE_TEMPLATE_SEEN_DOLLAR;
                    }
                    
                    // could be an escape of a template start inside a template
                    
                    // log 'macroState', macroState, String.fromCodePoint(cp)
                    else if (cp == CP.SLASH) {
                        macroState = MACRO.INSIDE_TEMPLATE_SEEN_ESCAPE;
                        processChar(cp);
                    }
                    // log 'process char macroState', macroState, String.fromCodePoint(cp)
                    else {
                        processChar(cp);
                    }
                }
                else {
                    processChar(cp);
                }
            }
        }
    }
    function processChar(cp) {
        if (cp == CP.LF) {
            if (line) {
                if (typeof (line.value) !== 'undefined') {
                    line.value = line.value.trim();
                }
                line.hasMacro = lineHasMacro;
                lines.push(line);
                line = null;
                lineHasMacro = false;
            }
            // Allow blank line. Do nothing
            else {
            }
            leadingWhiteSpaces = 0;
            colpos = 0;
            linepos++;
            macroState = MACRO.NONE;
            quote = null;
            if (commentState != COMMENT.MULTI_LINE) {
                commentState = COMMENT.NONE;
            }
        }
        else if (cp == CP.CR) {
        }
        else if ([CP.SPACE, CP.TAB].indexOf(cp) !== -1) {
            if (cp == CP.TAB) {
                colpos += 3;
            }
            if (line) {
                if (typeof (line.value) == 'undefined') {
                    line.value = '';
                }
                else {
                    line.value += String.fromCodePoint(cp);
                }
            }
            else {
                leadingWhiteSpaces += (cp == CP.SPACE ? 1 : 4);
            }
        }
        else {
            if (line) {
                if (typeof(line.value) == 'undefined') {
                    if (cp == CP.OPEN_PAREN) {
                        line.tagSuffix = String.fromCodePoint(cp);
                        line.value = '';
                    }
                    else {
                        line.name += String.fromCodePoint(cp);
                    }
                }
                else {
                    line.value += String.fromCodePoint(cp);
                }
            }
            else {
                line = {
                    indent: leadingWhiteSpaces / 4, 
                    name: String.fromCodePoint(cp), 
                    row: linepos, 
                    col: colpos, 
                    sourceKey: sourceKey
                 };
            }
        }
        
        // log 'line.name, value', line.name, line.value
        if (line) {
        }
    }
}
;
