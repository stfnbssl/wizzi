/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\basicloader\liner.js.ittf
*/
'use strict';
var util = require('util');
//
//
//
//
module.exports = function(textContent, ittfDocumentData) {
    // TODO ensure textContent is red as utf-8 and avoid this
    var sourceKey = ittfDocumentData.sourceKey,
        lines = [],
        leadingWhiteSpaces = 0,
        line = null,
        linepos = 1,
        lineHasMacro = false,
        colpos = 0,
        commentState = 0,
        macroState = 0,
        quote = null,
        chunk = textContent.toString('utf-8'),
        ch,
        chUni,
        i,
        l = chunk.length;
    // TODO replace ch with chUni
    for (i = 0; i < l; i++) {
        ch = chunk[i];
        chUni = chunk.charCodeAt(i);
        colpos++;
        if (quote != null) {
            if (quote == ch) {
                quote = null;
            }
            processMacro(ch);
        }
        else {
            if (commentState == 2) {
                
                // could be start of end of comment
                if (ch == '*') {
                    commentState = 3;
                }
                // skip comment char
                else {
                    if (ch == '\n') {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == 21) {
                
                // end of line comment
                
                // delegate end of comment to processMacro
                if (ch == '\n') {
                    processMacro(ch);
                }
            }
            else if (commentState == 3) {
                
                // ok, really is end of comment
                if (ch == '$') {
                    commentState = 0;
                }
                // no, comments continue
                // check if it is eol
                else {
                    commentState = 2;
                    if (ch == '\n') {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            
            // ok, really is start of comment
            else if (commentState == 1 && ch == '*') {
                commentState = 2;
            }
            
            // ok, is a line comment
            else if (commentState == 1 && ch == '$') {
                commentState = 21;
            }
            
            // no, it was not a comment, reset
            else if (commentState == 1 && ch != '*') {
                commentState = 0;
                processMacro('$');
                processMacro(ch);
            }
            
            // start of literal
            else if (commentState == 0 && ch == '"') {
                quote = ch;
                processMacro(ch);
            }
            
            // start of literal
            else if (commentState == 0 && ch == "'") {
                quote = ch;
                processMacro(ch);
            }
            
            // could be start of comment
            else if (commentState == 0 && ch == '$') {
                commentState = 1;
            }
            else {
                processMacro(ch);
            }
        }
    }
    if (line) {
        if (typeof (line.value) !== 'undefined') {
            line.value = line.value.trim();
        }
        line.hasMacro = lineHasMacro;
        lines.push(line);
        lineHasMacro = false;
    }
    return lines;
    function processMacro(ch) {
        
        // remove escape state
        
        // loog 'macroState', macroState, ch
        if (macroState == 2) {
            macroState = 1;
        }
        else {
            if (chUni == 96) {
                
                // loog 'macroState', macroState, ch
                if (macroState > 0) {
                    macroState = 0;
                }
                // loog 'macroState', macroState, ch
                else {
                    macroState = 1;
                }
            }
            else {
                if (macroState == 1) {
                    
                    // loog 'macroState', macroState, ch
                    if (ch == '$') {
                        ch = '#';
                        lineHasMacro = true;
                    }
                    
                    // could be an escape of a macro inside a macro
                    
                    // loog 'macroState', macroState, ch
                    else if (ch == '\\') {
                        macroState = 2;
                    }
                }
            }
        }
        processChar(ch);
    }
    function processChar(ch) {
        if (ch == '\n') {
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
            if (commentState != 2) {
                commentState = 0;
            }
        }
        else if (ch == '\r') {
        }
        else if ([' ', '\t'].indexOf(ch) !== -1) {
            if (ch == '\t') {
                colpos += 3;
            }
            if (line) {
                if (typeof (line.value) == 'undefined') {
                    line.value = '';
                }
                else {
                    line.value += ch;
                }
            }
            else {
                leadingWhiteSpaces += ch == ' ' ? 1 : 4;
            }
        }
        else if (['('].indexOf(ch) !== -1) {
            if (line) {
                if (typeof (line.value) == 'undefined') {
                    line.tagSuffix = ch;
                    line.value = '';
                }
                else {
                    line.value += ch;
                }
            }
            else {
                line = {
                    indent: leadingWhiteSpaces / 4, 
                    name: ch, 
                    row: linepos, 
                    col: colpos, 
                    sourceKey: sourceKey
                 };
            }
        }
        else {
            if (line) {
                if (typeof(line.value) == 'undefined') {
                    line.name += ch;
                }
                else {
                    line.value += ch;
                }
            }
            else {
                line = {
                    indent: leadingWhiteSpaces / 4, 
                    name: ch, 
                    row: linepos, 
                    col: colpos, 
                    sourceKey: sourceKey
                 };
            }
        }
    }
}
;