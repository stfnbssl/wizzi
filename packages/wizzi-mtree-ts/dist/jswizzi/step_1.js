"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse_1 = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("@wizzi/utils");
const mtree_1 = require("@wizzi/mtree");
var sourcePath = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'sources', 'source_1.js');
var sourcePath2 = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_2.script.js');
var astPath = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'sources', 'source_1.ast.json');
var astPath2 = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_2.ast.json');
sourcePath = sourcePath2;
astPath = astPath2;
function parse_1() {
    const file = utils_1.fSystem.vfile();
    mtree_1.jsWizzi.JsWizziRunner.getParsed(file.read(sourcePath), (err, ast) => {
        console.log('parse_1', err);
        // console.log(JSON.stringify(ast, null, 4));
        file.write(astPath, JSON.stringify(ast, null, 4));
        const contexts = {
            currentUnitKey: 'f0',
            sourceUnits: {
                f0: {
                    stackPath: [],
                    functions: {},
                }
            }
        };
        contexts.currentUnit = contexts.sourceUnits[contexts.currentUnitKey];
        doAst(ast, contexts);
        console.log('contexts', JSON.stringify(contexts, null, 2));
    });
}
exports.parse_1 = parse_1;
function doAst(ast, contexts) {
    // console.log(ast.type);
    Object.keys(ast).forEach(propName => {
        if (propName == 'body') {
            console.log(ast.type, propName, (ast.id ? ast.id.name : ''));
            if (ast.id) {
                contexts.currentUnit.stackPath.push(ast.id.name);
                contexts.currentUnit.functions[ast.id.name] = contexts.currentUnit.stackPath.join(',');
            }
            else if (ast.type == 'Program') {
                contexts.currentUnit.stackPath.push(ast.type);
            }
            if (utils_1.verify.isArray(ast[propName])) {
                const body = ast[propName];
                body.forEach(item => {
                    doAst(item, contexts);
                });
            }
            else if (utils_1.verify.isObject(ast[propName])) {
                doAst(ast[propName], contexts);
            }
            if (ast.id || ast.type == 'Program') {
                contexts.currentUnit.stackPath.pop();
            }
        }
        else if (ast.type == "ExpressionStatement" && ast.expression.type == "CallExpression" &&
            ast.expression.callee.type == "MemberExpression" &&
            ast.expression.callee.object.type == "Identifier" && ast.expression.callee.object.name == "$" &&
            ast.expression.callee.property.type == "Identifier" && ast.expression.callee.property.name == "s" &&
            ast.expression.arguments.length > 0) {
            const unitKey = ast.expression.arguments[0].value;
            console.log("select", unitKey);
            if (!contexts.sourceUnits[unitKey]) {
                contexts.sourceUnits[unitKey] = {
                    stackPath: [],
                    functions: {},
                };
            }
            contexts.currentUnitKey = unitKey;
            contexts.currentUnit = contexts.sourceUnits[unitKey];
        }
    });
}
//# sourceMappingURL=step_1.js.map