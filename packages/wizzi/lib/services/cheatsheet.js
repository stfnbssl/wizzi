/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\cheatsheet.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/

const stringify = require('json-stringify-safe');
const packi = require('@wizzi/utils').packi;
const verify = require('@wizzi/utils').verify;
const pretty = require('@wizzi/utils').pretty;

const md = module.exports = {};

//
// cheatsheet json structure
// {
// string name
// [ elements
// {
// string name
// [ items
// {
// string schema
// string render
// one-of 'artifact', 'script', 'ittf', 'ittf-show-blanks'
// [ fragments
// {
// string name
// string ittf
// string ittf
// string ittfWrapper
// string expected
// optional
//

md.buildCheatsheet = function(wizziFactory, name, packiFiles, callback) {
    
    wizziFactory.createJsonFactoryAndJsonFs(packiFiles, {}, (err, jsonFactoryAndJsonFs) => {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        var jsonFactory = jsonFactoryAndJsonFs.wf;
        jsonFactory.loadMTree(packi.ensurePackiFilePrefix('index.ittf.ittf'), {}, (err, mTree) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            // items are ittf fragments that will be ittf/prettified and generated
            var _all_items = [];
            // the resulting cheatsheet context object that will be returned when built
            var result = {
                name: name, 
                elements: [
                    
                ]
             };
            var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, itemTop;
            for (i=0; i<i_len; i++) {
                itemTop = mTree.nodes[0].children[i];
                
                // set properties of result
                if (itemTop.n !== 'element') {
                    result[itemTop.n] = itemTop.v;
                }
            }
            var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, itemTop;
            for (i=0; i<i_len; i++) {
                itemTop = mTree.nodes[0].children[i];
                if (itemTop.n === 'element') {
                    var elementResult = {
                        name: itemTop.v, 
                        items: [
                            
                        ]
                     };
                    var j, j_items=itemTop.children, j_len=itemTop.children.length, itemEl;
                    for (j=0; j<j_len; j++) {
                        itemEl = itemTop.children[j];
                        
                        // ittf fragment
                        if (itemEl.n === 'item') {
                            var itemResult = {
                                schema: result.schema, 
                                render: 'artifact', 
                                fragments: [
                                    
                                ]
                             };
                            var isError = false;
                            var k, k_items=itemEl.children, k_len=itemEl.children.length, item;
                            for (k=0; k<k_len; k++) {
                                item = itemEl.children[k];
                                if ((item.n === 'is-error' || item.n === 'isError') && item.v == 'true') {
                                    isError = true;
                                }
                                else if (item.n === 'fragment') {
                                    if (item.v && item.v.length > 0 && item.children.length == 1) {
                                        itemResult.fragments.push({
                                            name: item.v, 
                                            ittf: mTree.toIttf(item.children[0])
                                         })
                                    }
                                }
                                else if (item.n === 'ittf') {
                                    if (item.children.length == 1) {
                                        
                                        // is already ok, has the correct root
                                        if (((result.schema === 'json' || result.schema === 'yaml') && (item.children[0].n === '{' || item.children[0].n === '[')) || item.children[0].n === wizziFactory.mapSchemaToRootTag(result.schema) || wizziFactory.mapSchemaToRootTag(result.schema) === '@@any' || isError) {
                                            itemResult[item.n] = mTree.toIttf(item.children[0]);
                                            itemResult[item.n + 'Wrapped'] = itemResult[item.n];
                                        }
                                        // loog '++++++++++++++++++++ Wrap it', 'isError', isError
                                        // wrap it
                                        else {
                                            var ittfNode = wrapperForSchema(wizziFactory, result.schema);
                                            var l, l_items=item.children, l_len=item.children.length, node;
                                            for (l=0; l<l_len; l++) {
                                                node = item.children[l];
                                                ittfNode.children.push(node)
                                            }
                                            itemResult[item.n] = mTree.toIttf(item.children[0]);
                                            itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                                        }
                                    }
                                    // wrap them
                                    else {
                                        var ittfNode = wrapperForSchema(wizziFactory, result.schema);
                                        var l, l_items=item.children, l_len=item.children.length, node;
                                        for (l=0; l<l_len; l++) {
                                            node = item.children[l];
                                            ittfNode.children.push(node)
                                        }
                                        itemResult[item.n] = mTree.toIttf(item.children[0]);
                                        itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                                    }
                                }
                                else if (item.n === 'expected') {
                                    itemResult[item.n] = buildExpected(item).trim()
                                    ;
                                }
                                else {
                                    itemResult[item.n] = item.v;
                                }
                            }
                            elementResult.items.push(itemResult)
                            _all_items.push(itemResult)
                        }
                        else {
                            elementResult[itemEl.n] = itemEl.v;
                        }
                    }
                    result.elements.push(elementResult)
                }
            }
            prettifyItems(_all_items, function(err, notUsed) {
                if (err) {
                    console.log("[31m%s[0m", err);
                }
                var item_count = 0;
                // loog "Processing item", item.title
                (function next() {
                    var item = _all_items[item_count++];
                    if (!item) {
                        return callback(null, result);
                    }
                    if (item.render === 'script') {
                        var packiForGen = getPackiForGen(item);
                        jsonFactory.loadMTreeBuildUpScriptFromPacki(packiForGen.ittfDocumentUri, packiForGen.packiFiles, {}, function(err, result) {
                            if (err) {
                                console.log("[31m%s[0m", err);
                            }
                            if (err) {
                                try {
                                    item.generated = prettifyError(err)
                                    ;
                                } 
                                catch (ex) {
                                    item.generated = err.message || 'No result. Something went wrong!';
                                } 
                                return next();
                            }
                            else {
                                if (result.__is_error) {
                                    try {
                                        item.generated = verify.htmlEscape(JSON.stringify(result, null, 2));
                                    } 
                                    catch (ex) {
                                        item.generated = ex.message || 'No result. Something went wrong!';
                                    } 
                                }
                                else {
                                    item.generated = verify.htmlEscape(result.mTreeBuildUpScript);
                                }
                                item.generated = item.generated && item.generated.trim ? item.generated.trim() : 'No result. Something went wrong!';
                                return next();
                            }
                        })
                    }
                    else if (item.render === 'ittf' || item.render === 'ittf-show-blanks') {
                        var packiForGen = getPackiForGen(item);
                        jsonFactory.loadMTreeFromPacki(packiForGen.ittfDocumentUri, packiForGen.packiFiles, {}, function(err, mTree) {
                            if (err) {
                                console.log("[31m%s[0m", err);
                            }
                            if (err) {
                                try {
                                    item.generated = prettifyError(err)
                                    ;
                                } 
                                catch (ex) {
                                    item.generated = err.message || 'No result. Something went wrong!';
                                } 
                                return next();
                            }
                            else {
                                if (mTree.__is_error) {
                                    try {
                                        item.generated = verify.htmlEscape(JSON.stringify(result, null, 2));
                                    } 
                                    catch (ex) {
                                        item.generated = ex.message || 'No result. Something went wrong!';
                                    } 
                                }
                                else {
                                    item.generated = verify.htmlEscape(mTree.toIttf());
                                }
                                item.generated = item.generated && item.generated.trim ? (item.render === 'ittf-show-blanks' ? verify.replaceAll(item.generated, ' ', '.') : item.generated.trim()) : 'No result. Something went wrong!';
                                return next();
                            }
                        })
                    }
                    // loog 'cheatsheet.generating', mainIttf
                    else {
                        const mainIttf = 'index.' + item.schema + '.ittf';
                        var packiForGen = getPackiForGen(item);
                        jsonFactory.loadModelAndGenerateArtifactFromPacki(packiForGen.ittfDocumentUri, packiForGen.packiFiles, {
                            artifactContext: {
                                noUseStrict: true, 
                                noGeneratorComments: true
                             }
                         }, jsonFactory.mapSchemaToDefaultArtifact(item.schema), function(err, artifactContent) {
                            if (err) {
                                console.log("[31m%s[0m", err);
                            }
                            if (err) {
                                item.generated = prettifyError(err)
                                ;
                                return next();
                            }
                            else {
                                const artifactText = verify.htmlEscape(artifactContent);
                                item.generated = artifactText ? artifactText.trim() : 'No result. Something went wrong!';
                                return next();
                            }
                        })
                    }
                })();
            })
        }
        )
    }
    )
}
;

function prettifyError(err) {
    var hint = err.hint;
    if (!hint && err.data && err.data.inner) {
        hint = err.data.inner.hint;
    }
    if (hint) {
        return verify.htmlEscape(stringify({
                errorName: err.errorName, 
                message: err.message, 
                hint: hint
             }, null, 2));
    }
    else {
        return verify.htmlEscape(stringify(err, null, 2));
    }
}

function prettifyItems(_all_items, callback) {
    var item_count = 0;
    (function nextItem() {
        var item = _all_items[item_count++];
        if (!item) {
            return callback(null);
        }
        pretty.prettifyIttfHtmlFromString(item.ittf, function(err, ittfpretty) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            if (err) {
                item.ittfPretty = JSON.stringify(err, null, 4);
            }
            else {
                item.ittfPretty = ittfpretty;
            }
            var fragment_count = 0;
            (function nextFragment() {
                var fragment = item.fragments[fragment_count++];
                if (!fragment) {
                    process.nextTick(() => 
                        nextItem()
                    )
                    return ;
                }
                pretty.prettifyIttfHtmlFromString(fragment.ittf, function(err, ittfpretty) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                    }
                    if (err) {
                        fragment.ittfPretty = JSON.stringify(err, null, 4);
                    }
                    else {
                        fragment.ittfPretty = ittfpretty;
                    }
                    return nextFragment();
                })
            })();
        })
    })();
}

function getPackiForGen(item) {
    var ittfDocumentUri = 'index.' + item.schema + '.ittf';
    var retval = {
        ittfDocumentUri: ittfDocumentUri, 
        packiFiles: {
            
         }
     };
    retval.packiFiles[ittfDocumentUri] = {
        type: "CODE", 
        contents: item.ittfWrapped
     };
    var i, i_items=item.fragments, i_len=item.fragments.length, f;
    for (i=0; i<i_len; i++) {
        f = item.fragments[i];
        retval.packiFiles['t/' + f.name + '.' + item.schema + '.ittf'] = {
            type: "CODE", 
            contents: f.ittf
         };
    }
    // loog 'getPackiForGen.retval', retval
    return retval;
}

function wrapperForSchema(wizziFactory, schema) {
    var rootTag = wizziFactory.mapSchemaToRootTag(schema) || schema;
    /**
         `js` and `jsx` should remain the only exception, that requires an attribute
         do not implement `wrapperForSchema` in plugins
    */
    if (schema === 'js' || schema === 'jsx') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                     }
                ]
             };
    }
    else {
        return {
                n: rootTag, 
                children: [
                    
                ]
             };
    }
}

function buildExpected(ittf, sb, indent) {
    if (typeof sb === 'undefined') {
        sb = [];
        var i, i_items=ittf.children, i_len=ittf.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ittf.children[i];
            buildExpected(item, sb, 0)
        }
        return verify.htmlEscape(sb.join(''));
    }
    // to avoid ts error
    else {
        sb.push(new Array(indent+1).join(' '))
        sb.push(ittf.v + '\n')
        var i, i_items=ittf.children, i_len=ittf.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ittf.children[i];
            buildExpected(item, sb, (indent || 0) + 4)
        }
        return '';
    }
}