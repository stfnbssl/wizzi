const path = require('path');
const factory = require('./factory');
const {createFsJsonAndFactory, ensurePackiFilePrefix} = factory;
const myname = 'wizzi.productions';

let md;
module.exports = md = {
    generateArtifact: async function generateArtifact(filePath, packiFiles, context, options) {
        return new Promise(async (resolve, reject) => {
            const generator = options && options.generator ? options.generator : generatorFor(filePath);
            console.log(myname + '.generateArtifact.using artifact generator', generator);
            if (generator) {
                let jsonwf = {};
                let generationContext = {};
                const ittfDocumentUri = ensurePackiFilePrefix(filePath);
                /*
                const wzCtxDocumentUri = Object.keys(packiFiles).find(k => 
                    k.endsWith('wzctx.json.ittf')
                );
                */
                try {
                    jsonwf = await createFsJsonAndFactory(packiFiles);
                    generationContext = Object.assign(context || {}, {
                        // wzCtx: wzCtxDocumentUri ? await loadModelInternal(jsonwf.wf, ensurePackiFilePrefix(wzCtxDocumentUri), {}) : null
                    });
                    console.log(myname + '.generateArtifact.context', Object.keys(generationContext));
                    jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
                        modelRequestContext: generationContext || {}, 
                        artifactRequestContext: generationContext || {}
                        }, generator, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            artifactContent: result, 
                            sourcePath: filePath, 
                            artifactGenerator: generator
                            })
                    })
                } 
                catch (ex) {
                    return reject(ex);
                } 
            } else {
                reject('No artifact generator available for document ' + filePath);
            }
        });
    },
    transformModel: async function (filePath, packiFiles, context, options) {
        return new Promise(async (resolve, reject) => {
            const transformer = options && options.transformer ? options.transformer : transformerFor(filePath);
            console.log('wizzi.productions.transformModel.using artifact transformer', transformer);
            if (transformer) {
                let jsonwf = {};
                let transformationContext = {};
                const ittfDocumentUri = ensurePackiFilePrefix(filePath);
                const siteDocumentUri = Object.keys(packiFiles).find(k => 
                    k.endsWith('site.json.ittf')
                );
                try {
                    jsonwf = await createFsJsonAndFactory(packiFiles);
                    transformationContext = {
                        site: siteDocumentUri ? await loadModelInternal(jsonwf.wf, ensurePackiFilePrefix(siteDocumentUri), {}) : null 
                    };
                    console.log('wizzi.productions.transformModel.transformationContext', Object.keys(transformationContext));
                    jsonwf.wf.loadAndTransformModel(ittfDocumentUri, {
                        modelRequestContext: transformationContext
                    }, transformer, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        // console.log('Transformed result', result);
                        resolve({
                            transformResult: result, 
                            sourcePath: filePath, 
                            modelTransformer: transformer
                            })
                    })
                } 
                catch (ex) {
                    return reject(ex);
                } 
            }
            else {
                reject('No model transformer available for document ' + filePath);
            }
        });
    },
    parseFilePath: function (filePath) {
        const nameParts = path.basename(filePath).split('.');
        if (nameParts[nameParts.length - 1] === 'ittf') {
            return {
                isIttfDocument: true, 
                schema: nameParts[nameParts.length - 2], 
                seedname: nameParts.slice(0, -2).join('.')
            };
        }
        else {
            return {
                isIttfDocument: false, 
                schema: nameParts[nameParts.length - 1], 
                seedname: nameParts.slice(0, -1).join('.')
            };
        }
    }
}

async function loadModelInternal(wf, filePath, context) {
    return new Promise(async (resolve, reject) => {
        const schemaName = schemaFromFilePath(filePath);
        if (!schemaName) {
            return reject('File is not a known ittf document: ' + filePath);
        }
        wf.loadModel(schemaName, filePath, {
                mTreeBuildUpContext: context
            }, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    });
}

const extSchemaMap = {
    '.js': 'js', 
    '.jsx': 'js', 
    '.ts': 'ts', 
    '.tsx': 'ts', 
    '.html': 'html', 
    '.css': 'css', 
    '.svg': 'svg', 
    '.md': 'md', 
    '.xml': 'xml', 
    '.json': 'json', 
    '.graphql': 'graphql'
 };

const schemaModuleMap = {
    css: 'css/document', 
    graphql: 'graphql/document', 
    ittf: 'ittf/document', 
    js: 'js/module', 
    json: 'json/document', 
    html: 'html/document', 
    md: 'md/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    text: 'text/document', 
    ts: 'ts/module', 
    vml: 'vml/document', 
    vue: 'vue/document', 
    xml: 'xml/document'
 };

function generatorFor(filePath) {
    const pf = md.parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return schemaModuleMap[pf.schema];
    }
    return undefined;
}

const schemaTransformerMap = { 
    meta: 'ittf/cheatsheet'
};

function transformerFor(filePath) {
    const pf = md.parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return schemaTransformerMap[pf.schema];
    }
    return undefined;
}

function schemaFromFilePath(filePath) {
    const pf = md.parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return pf.schema;
    }
    return undefined;
}