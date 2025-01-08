/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\basicloader\nodifier.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var util = require('util');
/**
     Nodify the lines of an IttfDocument and creates a
     tree structure object based on line indentation.
     . detects the $params command
     . implements line continuation
     . assigns an id to each node
     !!! A line object is transformed in place into a node object
     without recreation (no cloning) !!!
    
     Inputs
     - the lines produced by the liner
     Outputs
     nodes: Array of [
     line -> mTreeNode : {
     + parent: Object, // parent mTreeNode
     + model: Object, // the MTreeBrick to which the line belongs
     + children: Array, // the children mTreeNodes
     id: Number,
     indent: Number,
     name: String,
     value: String,
     row: Number,
     col: Number,
     sourceKey: String,
     tagSuffix: undefined || '('
     hasMacro: Boolean
     }
     ]
    
     Ittf commands:
     $params  // the param values are stored in the MTreeBrick
     \        // implements line continuation
     //   the value is appendend to the value of the parent line
     //   without separators
            // implements line continuation
     //   the value is appendend to the value of the parent line
     //   with a space separator:  prevLine,value += ' ' + currentLine.value
     \n       // implements line continuation
     //   the value is appendend to the value of the parent line
     //   with a line break separator:  prevLine,value += '\n' + currentLine.value
     \r       // implements line continuation
     //   the value is appendend to the value of the parent line
     //   with a soft break separator:  prevLine,value += '\r' + currentLine.value
    
*/
module.exports = function(lines, mTree) {
    var nodes = [],
        root = null,
        current = null,
        nameFirstChar = null,
        nameLength = 0,
        line,
        i,
        l = lines.length;
    for (var i = 0; i < l; i++) {
        line = lines[i];
        nameFirstChar = line.name[0];
        nameLength = line.name.length;
        line.id = mTree.getNewNodeId();
        line.model = mTree;
        if (line.indent == 0 && current == null) {
            line.parent = null;
            nodes.push(line);
        }
        else if (current == null) {
            return error('Malformed tree, root node cannot have an indent.', line, mTree);
        }
        else if (line.indent == current.indent) {
            if (typeof(current.parent) === 'undefined' || current.parent === null) {
                return error('Malformed tree, only one root note allowed.', line, mTree);
            }
            line.parent = current.parent;
            current.parent.children.push(line);
        }
        else if (line.indent > current.indent) {
            if (nameFirstChar == '$' && line.name === '$params') {
                if (current.indent > 0) {
                    return error('The $params node must be a child of the root node.', line, mTree);
                }
                current.model.$params = line.value;
                continue;
            }
            
            // value continuation on new line
            else if (nameFirstChar == '\\' && nameLength == 1) {
                current.value += line.value;
                continue;
            }
            
            // value continuation on new line with space
            else if (nameFirstChar == '\\' && line.name === '\\b') {
                current.value += (' ' + line.value);
                continue;
            }
            
            // value continuation on new line with line break
            else if (nameFirstChar == '\\' && line.name === '\\n') {
                current.value += ('\n' + line.value);
                continue;
            }
            
            // value continuation on new line with soft break
            else if (nameFirstChar == '\\' && line.name === '\\r') {
                current.value += ('\r' + line.value);
                continue;
            }
            else {
                line.parent = current;
                current.children.push(line);
            }
        }
        else if (line.indent < current.indent) {
            var parent = current.parent;
            while (parent != null && line.indent < parent.indent) {
                parent = parent.parent;
            }
            line.parent = parent.parent;
            if (parent.parent) {
                parent.parent.children.push(line);
            }
            else {
                return error('Malformed tree, only one root note allowed.', line, mTree);
            }
        }
        current = line;
        current.children = [];
    }
    return nodes;
}
;
function error(message, line, mTree) {
    message = message + '\nNode ' + line.name + ' ' + (line.value || '') + ' row: ' + line.row + ' col: ' + line.col + '.\n Filepath: ' + mTree.uri;
    return {
            __is_error: true, 
            message: message, 
            source: 'wizzi-mtree/lib/loader/nodifier'
         };
}