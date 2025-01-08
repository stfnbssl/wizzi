/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\liner.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var util = require('util');
/**
     TODO Error management
     The liner should detect invalid node names? Probably NO.
     Node values are always valid and are always trimmed.
     Spacing can be controlled using \b escapes. See nodifier.
*/
/**
     Reads an IttfDocument and extract an array of node line descriptions
*/
/**
     params
     string textContent
     # The text content of the IttfDocument
     { ittfDocumentData
     string sourceKey
     # The IttfDocument key generated by the loadHistory
*/
/**
     Output
     lines:Array of
     line : {
     indent: Number,
     name: String,
     value: String, // always trimmed
     row: Number,
     col: Number,
     sourceKey: String,
     tagSuffix: undefined || '(',
     hasMacro: Boolean
     }
*/
/**
     tagSuffix - open paren `(` is marker for `mix call`
     if an hyphen or doublehyphen is encountered in `name` a tagSuffix is not detected.
     TODO Any invalid char for a relative file path in `name` should deactivate tagSuffix.
     Ittf commands for comments
     $ and $ ... singleline comment
     $ and * ... * and $ multiline comment
     Comment states
     0 = no comment seen
     1 = seen char $ could be first char of comment
     2 = seen chars $ and * we are inside multiline comments
     3 = seen chars $ and * ... and *  could be first char of end of multiline comments
     21 = seen chars $ and $ we are inside singleline comment
     Es6 macro states
     0 = no macro seen
     1 = seen char ` we are inside template
     2 = seen escape char inside a template, the next ` char does not close the macro string
     10 = seen char $ inside a template could be start of macro
*/
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
    MACRO_REPLACE: 198, 
    HYPHEN: 39, 
    DOUBLEHYPHEN: 34
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
        l = chunk.length,
        waitValue = false,
        noTagSuffix = false,
        nameAcc = [],
        valueAcc = [];
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
        
        // loog 'wizzi-mtree.loader.liner.cp > 0xffff'
        if (cp > 0xffff) {
            i += 1;
        }
        colpos++;
        
        // loog '+++++ wizzi-mtree.liner', chunk[i+1], chunk[i+2], chunk[i+3]
        if (cp == CP.SLASH) {
        }
        // loog 'liner', ch, cp, commentState, quote
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
    if (line) {
        pushLine();
    }
    // loog 'lines -------------->\n', lines
    return lines;
    function processMacro(cp) {
        
        // remove escape state
        
        // loog 'macroState', macroState, String.fromCodePoint(cp)
        if (macroState == MACRO.INSIDE_TEMPLATE_SEEN_ESCAPE) {
            macroState = MACRO.INSIDE_TEMPLATE;
            processChar(cp);
        }
        
        // loog 'macroState', macroState, String.fromCodePoint(cp)
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
                
                // loog 'macroState', macroState, String.fromCodePoint(cp)
                if (macroState > MACRO.NONE) {
                    macroState = MACRO.NONE;
                    processChar(cp);
                }
                // loog 'macroState', macroState, String.fromCodePoint(cp)
                else {
                    macroState = MACRO.INSIDE_TEMPLATE;
                    processChar(cp);
                }
            }
            else {
                if (macroState == MACRO.INSIDE_TEMPLATE) {
                    
                    // could be start of macro
                    
                    // loog 'macroState', macroState, String.fromCodePoint(cp)
                    if (cp == CP.DOLLAR) {
                        macroState = MACRO.INSIDE_TEMPLATE_SEEN_DOLLAR;
                    }
                    
                    // could be an escape of a template start inside a template
                    
                    // loog 'macroState', macroState, String.fromCodePoint(cp)
                    else if (cp == CP.SLASH) {
                        macroState = MACRO.INSIDE_TEMPLATE_SEEN_ESCAPE;
                        processChar(cp);
                    }
                    // loog 'process char macroState', macroState, String.fromCodePoint(cp)
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
                pushLine();
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
                if (waitValue == false) {
                    waitValue = true;
                }
                else {
                    valueAcc.push(String.fromCodePoint(cp))
                }
            }
            else {
                leadingWhiteSpaces += (cp == CP.SPACE ? 1 : 4);
            }
        }
        else {
            if (line) {
                if (waitValue == false) {
                    if (cp == CP.OPEN_PAREN && noTagSuffix == false) {
                        line.tagSuffix = String.fromCodePoint(cp);
                        waitValue = true;
                    }
                    // set line.name += String.fromCodePoint(cp)
                    else {
                        if (cp == CP.HYPHEN || cp == CP.DOUBLEHYPHEN) {
                            noTagSuffix = true;
                        }
                        nameAcc.push(String.fromCodePoint(cp))
                    }
                }
                else {
                    valueAcc.push(String.fromCodePoint(cp))
                }
            }
            else {
                nameAcc.push(String.fromCodePoint(cp))
                line = {
                    indent: leadingWhiteSpaces / 4, 
                    row: linepos, 
                    col: colpos, 
                    sourceKey: sourceKey
                 };
            }
        }
        
        // loog 'line.name, value', nameAcc.join(''), valueAcc.join('')
        if (line) {
        }
    }
    function pushLine() {
        line.name = nameAcc.join('');
        
        // calc trimmed start, end, len of value
        
        // loog "v_start, v_end", v_start, v_end
        
        // loog "v_start, v_end", v_start, v_end
        if (waitValue == true) {
            var v_start = -1,
                v_end,
                v_ch;
            for (var i=0; i<valueAcc.length; i++) {
                v_ch = valueAcc[i];
                
                // skip
                if (v_ch === ' ' || v_ch === '\t') {
                }
                else {
                    if (v_start < 0) {
                        v_start = i;
                    }
                    v_end = i;
                }
            }
            if (valueAcc.length > v_start + 1 && valueAcc[v_start] === '\\' && valueAcc[v_start+1] === 'b') {
                v_start += 2;
            }
            if (v_end > v_start + 1 && valueAcc[v_end] === 'b' && valueAcc[v_end-1] === '\\') {
                v_end -= 2;
            }
            line.value = valueAcc.slice(v_start, v_end + 1).join('');
        }
        line.hasMacro = lineHasMacro;
        // loog 'last push line', line
        lines.push(line);
        line = null;
        waitValue = false;
        nameAcc.length = 0;
        valueAcc.length = 0;
        lineHasMacro = false;
        noTagSuffix = false;
    }
}
;