/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\textIndentParser.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('./verify');
var md = module.exports = {};
var CP = {
    TAB: 9, 
    LF: 10, 
    CR: 13, 
    SPACE: 32
 };
md.parse = function(textContent) {
    var lines = [],
        leadingWhiteSpaces = 0,
        line = null,
        linepos = 1,
        chunk = textContent.toString('utf-8'),
        ch,
        cp,
        i,
        l = chunk.length,
        acc = [];
    for (i = 0; i < l; i++) {
        ch = chunk[i];
        if (i < l - 1) {
            cp = (chunk.charAt(i) + chunk.charAt(i + 1)).codePointAt(0);
        }
        else if (i < l) {
            cp = chunk.charAt(i).codePointAt(0);
        }
        else {
            throw new Error('@wizzi/utils.textIndentParser.parse index of chunk out of range: ' + chunk);
        }
        if (cp == CP.LF) {
            pushLine();
            leadingWhiteSpaces = 0;
        }
        else if (cp == CP.CR) {
        }
        else if ([CP.SPACE, CP.TAB].indexOf(cp) !== -1) {
            if (line) {
                acc.push(String.fromCodePoint(cp))
            }
            else {
                leadingWhiteSpaces += (cp == CP.SPACE ? 1 : 4);
            }
        }
        else {
            acc.push(String.fromCodePoint(cp))
            if (!line) {
                line = {
                    indent: leadingWhiteSpaces / 4
                 };
            }
        }
    }
    if (line != null) {
        pushLine();
    }
    // loog 'lines\n', JSON.stringify(lines)
    return lines;
    function pushLine() {
        if (line == null) {
            lines.push({
                indent: -1, 
                value: null
             })
        }
        else {
            line.value = acc.join('');
            lines.push(line);
            line = null;
            acc.length = 0;
        }
    }
}
;
md.nodifyParsedLines = function(lines, ret, options) {
    var nodes = ret ? ret.children : [],
        root = null,
        current = null,
        line,
        i,
        l = lines.length;
    for (var i = 0; i < l; i++) {
        line = lines[i];
        line[options.name] = '+';
        line[options.value] = line.value;
        // loog 'line.value', line.value
        if (line.indent <= 0) {
            line.parent = ret || null;
            
            // loog line.value, 'added to', ret[options.name], ret.name
            if (ret) {
            }
            nodes.push(line);
        }
        else if (!current) {
        }
        
        // loog line.value, 'added to', current.parent[options.name], current.parent.name
        else if (line.indent == current.indent) {
            line.parent = current.parent;
            current.parent.children.push(line);
        }
        
        // loog line.value, 'added to', current[options.name], current.name
        else if (line.indent > current.indent) {
            line.parent = current;
            current.children.push(line);
        }
        else if (line.indent < current.indent) {
            var parent = current.parent;
            while (parent != null && line.indent < parent.indent) {
                parent = parent.parent;
            }
            line.parent = parent.parent;
            
            // loog line.value, 'added to', parent.parent[options.name], parent.parent.name
            if (parent.parent) {
                parent.parent.children.push(line);
            }
            else {
                
                // loog line.value, 'added to', ret[options.name], ret.name
                if (ret) {
                }
                nodes.push(line);
            }
        }
        current = line;
        current.children = [];
    }
    return nodes;
}
;
md.nodify = function(textContent, ret, options) {
    var lines = md.parse(textContent);
    return md.nodifyParsedLines(lines, ret, options || { name: 'name', value: 'value' });
}
;