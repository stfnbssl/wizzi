/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\wizzi\models\css-mtree-preprocessor.g.js.ittf
*/
'use strict';
module.exports = function(mTree, context) {
    // log 'wizzi-web.css.preprocess.mTree', mTree
    var state = {
        actions: [
            
        ]
    };
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, item;
    for (i=0; i<i_len; i++) {
        item = mTree.nodes[0].children[i];
        traverse(item, state);
    }
    var i, i_items=state.actions, i_len=state.actions.length, item;
    for (i=0; i<i_len; i++) {
        item = state.actions[i];
        if (item.code === 'add-attr') {
            var children = item.to.children;
            item.to.children = [
                {
                    n: item.n, 
                    v: item.v, 
                    r: item.to.r, 
                    c: item.to.c, 
                    s: item.to.s, 
                    u: item.to.u, 
                    children: [
                        
                    ]
                }
            ];
            var j, j_items=children, j_len=children.length, c;
            for (j=0; j<j_len; j++) {
                c = children[j];
                item.to.children.push(c)
            }
        }
    }
    return mTree;
};
function traverse(node, state) {
    if (preprocessNode(node, state)) {
        return ;
    }
    var saveParent = state.parent;
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        state.parent = node;
        traverse(item, state);
    }
    state.parent = saveParent;
}
function preprocessNode(node, state) {
    // log 'css-mtree-processor preprocessNode', node.n, node.v
    if (node.n === 'styled') {
        if (node.children.length == 1 && node.children[0].n == "css") {
            return false;
        }
        var arrow;
        var savedchildren = [];
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            if (child.n == '=>') {
                arrow = child;
            }
            else {
                savedchildren.push(child)
            }
        }
        var cssnode = {
            n: "css", 
            v: "", 
            r: node.r, 
            c: node.c, 
            s: node.s, 
            u: node.u, 
            children: [
                {
                    n: "<", 
                    v: "--styled--", 
                    r: node.r, 
                    c: node.c, 
                    s: node.s, 
                    u: node.u, 
                    children: savedchildren
                }
            ]
        };
        node.children = arrow ? [arrow, cssnode] : [cssnode];
        var i, i_items=savedchildren, i_len=savedchildren.length, child;
        for (i=0; i<i_len; i++) {
            child = savedchildren[i];
            traverse(child, state)
        }
        return true;
    }
    return false;
}
function addAttr(state, node, attr) {
    state.actions.push({
        code: 'add-attr', 
        to: node, 
        n: attr, 
        v: ''
    })
}
