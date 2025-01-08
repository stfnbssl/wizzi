/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\mTreeBuildUpScripter.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
/**
     From the nodes of a composedMTree
     writes the jsWizziScript that will
     buildup an evaluated mTree.
    
     The script will be executed
     by the JsWizziRunner.
    
     Static methods only
*/
var verify = require('@wizzi/utils').verify;
var interpolate = require('./ittfInterpolate');
function codify(node, nparent, jsScriptCoder, ctx) {
    var nnode = ++ctx.counter,
        closeBlock = null;
    var tag = node.name;
    if (tag == '$' || tag == '$+') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        codeBlock(node, jsScriptCoder, ctx);
    }
    else if (tag == '$global') {
        setJsWizziContext(ctx, 'global', jsScriptCoder, node.model.brickKey)
        codeBlock(node, jsScriptCoder, ctx);
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
    }
    else if (tag == '$.') {
        setJsWizziContext(ctx, null, jsScriptCoder);
        var vparent = ('$' + nparent);
        var value = codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx);
        jsScriptCoder.w(vparent + ".v = " + vparent + ".v ? " + vparent + ".v : ''" + nodeMapComment(node), node)
        jsScriptCoder.w(vparent + '.v += ($.textSep + ' + value + ');' + nodeMapComment(node), node)
    }
    else if (tag == '$if') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        jsScriptCoder.if(node.value, node)
        closeBlock = '}';
    }
    else if (tag == '$else') {
        jsScriptCoder.else(node);
        ctx.brickKey = -1;
        closeBlock = '}';
    }
    else if (tag == '$elif') {
        jsScriptCoder.elif(node.value, node)
        ctx.brickKey = - (1);
        closeBlock = '}';
    }
    else if (tag == '$while') {
        jsScriptCoder.while(node.value, node)
        ctx.brickKey = - (1);
        closeBlock = '}';
    }
    else if (tag == '$for') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        jsScriptCoder.for(node.value, node)
        closeBlock = '}';
    }
    else if (tag == '$for_stop') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        var items = node.value.split(' ');
        var namevalue = items[0].split(',');
        var name = namevalue[0];
        var value = namevalue[1];
        jsScriptCoder.w('var ' + name + ', ' + value + ';' + nodeMapComment(node), node)
        jsScriptCoder.for(name + ' in ' + items[2] + nodeMapComment(node), node)
        jsScriptCoder.w(value + ' = ' + items[2] + '[' + name + '];' + nodeMapComment(node), node)
        closeBlock = '}';
    }
    
    // items = [item, in, coll]
    
    // TODO if items.length != 3 -> malformed
    
    // TODO if items[1] !== 'in' -> malformed
    else if (tag == '$foreach') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        var items = node.value.split(' ');
        jsScriptCoder.w('var ' + items[0] + '_count' + nnode + ' = ' + items[2] + '.length;' + nodeMapComment(node), node)
        jsScriptCoder.w('var ' + items[0] + '_count = ' + items[2] + '.length;' + nodeMapComment(node), node)
        jsScriptCoder.for('var i' + nnode + '=0; i' + nnode + '<' + items[0] + '_count' + nnode + '; i' + nnode + '++', node)
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + nodeMapComment(node), node)
        jsScriptCoder.w('var ' + items[0] + '_index = i' + nnode + ';' + nodeMapComment(node), node)
        closeBlock = '}';
    }
    else if (tag == '$backeach') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        var items = node.value.split(' ');
        jsScriptCoder.w('var ' + items[0] + '_count' + nnode + ' = ' + items[2] + '.length;' + nodeMapComment(node), node)
        jsScriptCoder.w('var ' + items[0] + '_count = ' + items[2] + '.length;' + nodeMapComment(node), node)
        jsScriptCoder.for('var i' + nnode + '=' + items[0] + '_count' + nnode + '-1; i' + nnode + '>-1; i' + nnode + '--', node)
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + nodeMapComment(node), node)
        jsScriptCoder.w('var ' + items[0] + '_index = i' + nnode + ';' + nodeMapComment(node), node)
        closeBlock = '}';
    }
    else if (tag == '$virtual') {
        ;
    }
    else if (tag == '$function') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        var params = '$parent';
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name === '$param') {
                params += ',' + item.value;
            }
        }
        jsScriptCoder.w('function ' + node.value + '(' + params + ') {' + nodeMapComment(node), node)
        jsScriptCoder.indent();
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name !== '$param') {
                codify(item, 'parent', jsScriptCoder, ctx);
            }
        }
        jsScriptCoder.deindent();
        jsScriptCoder.w('}');
        ctx.brickKey = -1;
        return ;
    }
    else if (tag == '$_') {
        ctx.brickKey = null;
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        var vparent = '$' + nparent;
        var args = vparent;
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name === '$@') {
                args += ',' + item.value;
            }
        }
        jsScriptCoder.w(node.value + '(' + args + ');' + nodeMapComment(node), node)
        ctx.brickKey = null;
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder)
        return ;
    }
    
    // no interpolation
    else if (tag == '$raw') {
        setJsWizziContext(ctx, null, jsScriptCoder);
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            rawBlock(item, nparent, jsScriptCoder, ctx);
        }
    }
    else if (tag == '$throw') {
        jsScriptCoder.throw(codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx))
    }
    else {
        if (ctx.isCompile && node.__firstOfMixedNodes) {
            jsScriptCoder.w('// firstOfMixed ' + node.model.$args + '/' + node.model.$params, node)
            isCompilePassedParameters(jsScriptCoder, node.model.parseFragmentParamsValues(node.model.$args))
        }
        setJsWizziContext(ctx, null, jsScriptCoder);
        jsScriptCoder.w('var $' + nnode + ' = { ' + 'n: ' + codifyValue(node.model.brickKey, tag, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx) + ', ' + (node.source ? 'source: ' + escapename(node.source) + ', ' : '') + 'v: ' + codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx) + ', ' + 'i: ' + node.id + ', ' + 'r: ' + node.row + ', ' + 'c: ' + node.col + ', ' + 's: "' + node.model.brickKey + '", ' + 'u: "' + node.sourceKey + '", ' + ' };' + nodeMapComment(node), node)
        var vparent = ('$' + nparent);
        jsScriptCoder.w('$.a(' + vparent + ', $' + nnode + ', ' + (jsScriptCoder.length + 1) + ');', node)
        nparent = nnode;
    }
    if (['$', '$global', '$+', '$raw'].indexOf(tag) == -1) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            codify(item, nparent, jsScriptCoder, ctx);
        }
        if (closeBlock) {
            jsScriptCoder.end();
            ctx.brickKey = -1;
        }
    }
    // children of node have already been written
    else {
    }
}
function setJsWizziContext(ctx, brickKey, jsScriptCoder, brickKeyInGlobal) {
    if (ctx.brickKey === brickKey) {
        return ;
    }
    if (brickKey === null) {
        jsScriptCoder.w('$.n();');
    }
    else if (brickKey === 'global') {
        jsScriptCoder.w('$.g("' + brickKeyInGlobal + '");');
    }
    else {
        jsScriptCoder.w('$.s("' + brickKey + '");');
    }
    ctx.brickKey = brickKey;
}
function codifyValue(brickKey, value, type, line, hasMacro, ctx) {
    if (typeof(value) === 'undefined' || value == null) {
        return '""';
    }
    
    // 23/5/18 return escape(hasMacro ? remacro(value) : value)
    if (type === 'string') {
        if (value.indexOf('${') > -1) {
            var sHasMacro = hasMacro ? 'true' : 'false';
            
            // return '"' + newValue + '"'
            if (ctx.isCompile) {
                var newValue = interpolate(value, {}, {
                    isCompile: true
                 });
                return newValue;
            }
            else {
                return '$.ip("' + brickKey + '", ' + escape(value) + ', "' + type + '", ' + line + ', ' + sHasMacro + ')';
            }
        }
        return escape(remacro(value));
    }
    return value;
}
function codeBlock(node, jsScriptCoder, ctx) {
    if (node.name == '$' || node.name == '$global' || node.name == '$+') {
        if (node.value && node.value.trim().length > 0) {
            jsScriptCoder.w(node.value, node)
        }
    }
    else {
        if (node.name && (node.name.trim().length > 0)) {
            
            // loog '=========', node.model.parseFragmentParamsValues(node.model.$args)
            if (ctx.isCompile && node.__firstOfMixedNodes) {
                jsScriptCoder.w('// firstOfMixed ' + node.model.$args + '/' + node.model.$params, node)
                isCompilePassedParameters(jsScriptCoder, node.model.parseFragmentParamsValues(node.model.$args))
            }
            jsScriptCoder.w(node.name + ' ' + (node.value || '') + nodeMapComment(node), node)
        }
    }
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        codeBlock(item, jsScriptCoder, ctx);
    }
}
function rawBlock(node, nparent, jsScriptCoder, ctx) {
    // no interpolation
    var nnode = ++ctx.counter;
    jsScriptCoder.w('var $' + nnode + ' = { ' + 'n: "' + node.name + '", ' + 'v: "' + node.value + '", ' + 'i: ' + node.id + ', ' + 'r: ' + node.row + ', ' + 'c: ' + node.col + ', ' + 's: "' + node.model.brickKey + '", ' + 'u: "' + node.sourceKey + '", ' + ' };' + nodeMapComment(node), node)
    var vparent = ('$' + nparent);
    jsScriptCoder.w('$.a(' + vparent + ', $' + nnode + ', ' + (jsScriptCoder.length + 1) + ');', node)
    nparent = nnode;
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        rawBlock(item, nparent, jsScriptCoder, ctx);
    }
}
function isCompilePassedParameters(jsScriptCoder, parameters) {
    var i, i_items=parameters, i_len=parameters.length, p;
    for (i=0; i<i_len; i++) {
        p = parameters[i];
        if (p.type = 'string') {
            jsScriptCoder.w(p.name + ' = "' + p.value + '";', p)
        }
        else {
            jsScriptCoder.w(p.name + ' = ' + p.value + ';', p)
        }
    }
}
function nodeMapComment(node) {
    return ' //node:' + node.id;
}
function escape(value) {
    if (typeof (value) === 'undefined') {
        return "null";
    }
    else if (typeof (value) === 'string') {
        return "\"" + escapevalue(value) + "\"";
    }
    else {
        return value;
    }
}
function escapename(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"');
    }
    else {
        return value;
    }
}
function escapevalue(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(escapename(value), "\n", "\\n");
    }
    else {
        return value;
    }
}
function remacro(value) {
    // Alt+146: Æ
    return verify.replaceAll(value, "Æ" + "{", "${");
}

module.exports = {
    codify: codify
};