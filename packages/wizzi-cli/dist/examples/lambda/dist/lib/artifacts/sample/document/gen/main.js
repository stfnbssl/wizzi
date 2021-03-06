/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\lambda\.wizzi\ittf\lib\artifacts\sample\document\gen\main.js.ittf
    utc time: Wed, 24 Feb 2021 09:08:37 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var errors = require('../../../../../errors');

var myname = '.artifacts.sample.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'sample') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "sample". Received: ' + model.wzElement, model))
    }
    try {
        md.sample(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            else {
                // generation OK
                return callback(null, ctx);
            }
        })
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
};

md.genItems = function(items, ctx, options, callback) {
    if (typeof callback == 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.mapItem(ctx), (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        process.nextTick(callback)
    })
};
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
};
md.genItem = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
    }
};

const noindent = {
    indent: false
};

md.sample = function(model, ctx, callback) {
    console.log("ctx.keys", Object.keys(ctx));
    console.log("ctx.values property", ctx.values);
    console.log('tag sample, nodes', model.nodes.length);
    ctx.values.docxStack = [];
    ctx.values.docxCounter = 0;
    ctx.values.docxMainObject = 'docx_MainObject';
    ctx.values.mainObjectCreated = false;
    var docxNode = "docx_doc_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.values.docxMainInternalObject = docxNode;
    ctx.w('const fs = require("fs");');
    ctx.w('const docx = require("docx");');
    ctx.w('');
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('');
        ctx.w('docx.Packer.toBuffer(' + ctx.values.docxMainObject + ').then((buffer) => {');
        ctx.w('    fs.writeFileSync("My Document.docx", buffer);');
        ctx.w('    console.log("DONE written")');
        ctx.w('});');
        return callback(null);
    })
};

md.section = function(model, ctx, callback) {
    console.log('tag section, value', model.wzName);
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_sect_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { properties: {}, children: [] };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (ctx.values.mainObjectCreated == false) {
            ctx.w('const ' + ctx.values.docxMainObject + ' = new docx.Document(' + ctx.values.docxMainInternalObject + ');');
            ctx.values.mainObjectCreated = true;
        }
        ctx.w(ctx.values.docxMainObject + '.addSection(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};

md.p = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_p_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    ctx.w(docxNode + '.tabStops = [];');
    if (!verify.isEmpty(model.wzName)) {
        ctx.w(docxNode + '.text = "' + model.wzName + '";');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};

md.h1 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.text = "' + model.wzName + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_1;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};

md.h2 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.text = "' + model.wzName + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_2;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.text = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_txt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.text = "' + model.wzName + '";');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TextRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.bold = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_txt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.text = "' + model.wzName + '";');
    ctx.w(docxParent + '.bold = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TextRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.italic = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_txt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.text = "' + model.wzName + '";');
    ctx.w(docxParent + '.italic = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TextRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.boldProp = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.bold = ' + true + ';');
    return callback(null);
};
md.italicProp = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.italic = ' + true + ';');
    return callback(null);
};
md.emphasisMark = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.emphasisMark = ' + true + ';');
    return callback(null);
};
md.strike = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.strike = ' + true + ';');
    return callback(null);
};
md.doubleStrike = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.doubleStrike = ' + true + ';');
    return callback(null);
};
md.superScript = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.superScript = ' + true + ';');
    return callback(null);
};
md.subScript = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.subScript = ' + true + ';');
    return callback(null);
};
md.smallCaps = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.smallCaps = ' + true + ';');
    return callback(null);
};
md.allCaps = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.allCaps = ' + true + ';');
    return callback(null);
};
md.xbreak = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.break = ' + true + ';');
    return callback(null);
};
md.size = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.size = ' + model.wzName + ';');
    return callback(null);
};
md.color = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.color = "' + model.wzName + '";');
    return callback(null);
};
md.fill = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.fill = "' + model.wzName + '";');
    return callback(null);
};
md.xname = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.name = "' + model.wzName + '";');
    return callback(null);
};
md.highlight = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.highlight = "' + model.wzName + '";');
    return callback(null);
};
md.style = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.style = "' + model.wzName + '";');
    return callback(null);
};
md.next = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.next = "' + model.wzName + '";');
    return callback(null);
};
md.basedOn = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.basedOn = "' + model.wzName + '";');
    return callback(null);
};
md.xtype = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    if (model.wzParent.wzElement == 'shading') {
        ctx.w(docxParent + '.type = docx.ShadingType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'width') {
        ctx.w(docxParent + '.type = docx.WidthType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'tabStop') {
        ctx.w(docxParent + '.type = docx.TabStopType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'underline') {
        ctx.w(docxParent + '.type = docx.UnderlineType.' + model.wzName + ';');
    }
    else {
        ctx.w(docxParent + '.type = "' + model.wzName + '";');
    }
    return callback(null);
};
md.position = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    if (model.wzParent.wzElement == 'tabStop') {
        if (verify.isNumber(model.wzName)) {
            ctx.w(docxParent + '.position = ' + model.wzName + ';');
        }
        else {
            ctx.w(docxParent + '.position = docx.TabStopPosition.' + model.wzName + ';');
        }
    }
    else {
        ctx.w(docxParent + '.position = ' + model.wzName + ';');
    }
    return callback(null);
};

md.font = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_fnt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.font = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};

md.shading = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_shd_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.shading = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.table = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_table_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.rows = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Table(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.tr = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_tr_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    ctx.w(docxNode + '.layout = docx.TableLayoutType.FIXED;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TableRow(' + docxNode + ');');
        ctx.w(docxParent + '.rows.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.td = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_td_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TableCell(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.width = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_width_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.width = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.underline = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_underline_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.underline = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.styles = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_styles_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.styles = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.xdefault = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_xdefault_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.default = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.run = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_run_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.run = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.tabStop = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_tabStop_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.tabStops.push(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.styleDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_styleDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    if (model.wzParent.wzElement == 'paragraphStyles') {
        ctx.w(docxNode + '.id = "' + model.wzName + '";');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'xdefault') {
            ctx.w(docxParent + '.' + model.wzName + ' = ' + docxNode + ';');
        }
        else {
            ctx.w(docxParent + '.push(' + docxNode + ');');
        }
        ctx.values.docxStack.pop();
        return callback(null);
    })
};
md.paragraphStyles = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_paragraphStyles_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.paragraphStyles = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    })
};

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: '/lib/artifacts/sample/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
        });
}
