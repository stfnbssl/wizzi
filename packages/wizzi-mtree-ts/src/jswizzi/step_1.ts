import path from 'path'
import {fSystem, verify} from '@wizzi/utils'
import {jsWizzi} from '@wizzi/mtree'

var sourcePath = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'sources', 'source_1.js');
var sourcePath2 = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_2.script.js');
var astPath = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'sources', 'source_1.ast.json');
var astPath2 = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_2.ast.json');

sourcePath = sourcePath2;
astPath = astPath2;

export function parse_1() {
    const file = fSystem.vfile();
    jsWizzi.JsWizziRunner.getParsed(
        file.read(sourcePath),
        (err: any, ast: any) => {
            console.log('parse_1', err);
            // console.log(JSON.stringify(ast, null, 4));
            file.write(astPath, JSON.stringify(ast, null, 4));
            const contexts: any = {
                currentUnitKey: 'f0',
                sourceUnits: {
                    f0: {
                        stackPath: [],
                        functions: {},
                    }
                }
            }
            contexts.currentUnit = contexts.sourceUnits[contexts.currentUnitKey];
            doAst(ast, contexts);
            console.log('contexts', JSON.stringify(contexts, null, 2));
        }
    );
} 

function doAst(ast: any, contexts: any) {
    // console.log(ast.type);
    Object.keys(ast).forEach(propName=>{
        if (propName == 'body') {
            console.log(ast.type, propName, (ast.id ? ast.id.name : ''));
            if (ast.id) {
                contexts.currentUnit.stackPath.push(ast.id.name)
                contexts.currentUnit.functions[ast.id.name] = contexts.currentUnit.stackPath.join(',');
            } else if (ast.type == 'Program') {
                contexts.currentUnit.stackPath.push(ast.type);
            }
            if (verify.isArray(ast[propName])) {
                const body:[] = ast[propName];
                body.forEach(item=> {
                    doAst(item, contexts)    
                })
            } else if (verify.isObject(ast[propName])) {
                doAst(ast[propName], contexts);
            }
            if (ast.id || ast.type == 'Program') {
                contexts.currentUnit.stackPath.pop();
            }
        } else if (ast.type == "ExpressionStatement" && ast.expression.type == "CallExpression" &&
            ast.expression.callee.type == "MemberExpression" && 
            ast.expression.callee.object.type == "Identifier" && ast.expression.callee.object.name == "$" && 
            ast.expression.callee.property.type == "Identifier" && ast.expression.callee.property.name == "s" &&
            ast.expression.arguments.length > 0) {
                const unitKey = ast.expression.arguments[0].value;
                console.log("select", unitKey)
                if (!contexts.sourceUnits[unitKey]) {
                    contexts.sourceUnits[unitKey] = {
                        stackPath: [],
                        functions: {},
                    }
                }
                contexts.currentUnitKey = unitKey;
                contexts.currentUnit = contexts.sourceUnits[unitKey];
        }
    })
}
