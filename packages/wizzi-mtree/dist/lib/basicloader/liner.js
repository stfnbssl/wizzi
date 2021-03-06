/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\basicloader\liner.js.ittf
*/
'use strict';
var util = require('util');
//
//
//
//
module.exports = function(textContent, ittfDocumentData) {
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
        // TODO ensure textContent is red as utf-8 and avoid this
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
                if (ch == '*') {
                    // could be start of end of comment
                    commentState = 3;
                }
                else {
                    // skip comment char
                    if (ch == '\n') {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == 21) {
                if (ch == '\n') {
                    // end of line comment
                    // delegate end of comment to processMacro
                    processMacro(ch);
                }
            }
            else if (commentState == 3) {
                if (ch == '$') {
                    // ok, really is end of comment
                    commentState = 0;
                }
                else {
                    // no, comments continue
                    commentState = 2;
                    // check if it is eol
                    if (ch == '\n') {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == 1 && ch == '*') {
                // ok, really is start of comment
                commentState = 2;
            }
            else if (commentState == 1 && ch == '$') {
                // ok, is a line comment
                commentState = 21;
            }
            else if (commentState == 1 && ch != '*') {
                // no, it was not a comment, reset
                commentState = 0;
                processMacro('$');
                processMacro(ch);
            }
            else if (commentState == 0 && ch == '"') {
                // start of literal
                quote = ch;
                processMacro(ch);
            }
            else if (commentState == 0 && ch == "'") {
                // start of literal
                quote = ch;
                processMacro(ch);
            }
            else if (commentState == 0 && ch == '$') {
                // could be start of comment
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
        if (macroState == 2) {
            // remove escape state
            macroState = 1;
            // log 'macroState', macroState, ch
        }
        else {
            if (chUni == 96) {
                if (macroState > 0) {
                    macroState = 0;
                    // log 'macroState', macroState, ch
                }
                else {
                    macroState = 1;
                    // log 'macroState', macroState, ch
                }
            }
            else {
                if (macroState == 1) {
                    if (ch == '$') {
                        ch = '#';
                        lineHasMacro = true;
                        // log 'macroState', macroState, ch
                    }
                    else if (ch == '\\') {
                        // could be an escape of a macro inside a macro
                        macroState = 2;
                        // log 'macroState', macroState, ch
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
            else {
                // Allow blank line. Do nothing
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
};
