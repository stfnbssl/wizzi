/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\wizzi\controllers\productions.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import fs from 'fs';
import path from 'path';
import {fsTypes} from '../../filesystem';
import {ArtifactRequest, MetaContext} from '../types';
import * as WizziFactory from '../factory';
import * as wizziProds from '../productions';
import {packiTypes} from '../../packi';
import {config} from '../../config';
import {file} from 'wizzi';
const myname = 'features/wizzi/controller/productions';
function resolveContexts(contextItems: MetaContext[]) {

    const promises: Promise<any>[] = [];
    contextItems.map(contextItem => 
    
        promises.push(new Promise((resolve, reject) => 
        
            resolveContext(contextItem).then((context) => {
            
                console.log(myname + 'resolveContext.resolved', contextItem.name, context);
                resolve({
                    name: contextItem.name, 
                    value: context
                 })
            }
            ).catch(err => 
            
                reject(err)
            )
        
        ))
    )
    console.log(myname + '.resolveContexts.promises', promises.length);
    return new Promise((resolve, reject) => 
        
            Promise.all(promises).then((items) => {
            
                console.log(myname + '.resolveContexts.all.items', items);
                const context: any = {};
                items.map((value: any) => 
                
                    context[value.name] = value.value
                )
                resolve(context)
            }
            ).catch((err) => {
            
                console.log(myname + '.resolveContexts.all.err', err);
                reject(err);
            }
            )
        
        );
}
function resolveContext(contextItem: MetaContext) {

    if (contextItem.type == 'json-packiFiles') {
        return new Promise((resolve, reject) => 
            
                wizziProds.generateArtifact(contextItem.sourcePath as string, contextItem.sourceFiles as packiTypes.PackiFiles).then((value: any) => {
                
                    console.log(myname + '.resolveContext', contextItem.type, 'sourcePath', contextItem.sourcePath, value);
                    resolve(value);
                }
                ).catch(err => 
                
                    reject(err)
                )
            
            );
    }
    else if (contextItem.type == 'json-fsIttf') {
        return new Promise((resolve, reject) => 
            
                wizziProds.generateArtifactFs(path.join(config.ittfPath, contextItem.sourcePath as string)).then((value: any) => {
                
                    console.log(myname + '.resolveContext', contextItem.type, 'sourcePath', contextItem.sourcePath, value);
                    resolve(value);
                }
                ).catch((err) => {
                
                    console.log(myname + '.resolveContext', contextItem.type, 'err', err);
                    reject(err);
                }
                )
            
            );
    }
    else if (contextItem.type == 'json-fsFile') {
        return new Promise((resolve, reject) => {
            
                const json = file.readJSON(contextItem.sourcePath as string);
                resolve(json);
            }
            );
    }
    else if (contextItem.type == 'json-value') {
        return new Promise(resolve => 
            
                resolve(contextItem.value)
            );
    }
    else if (contextItem.type == 'wizziModel-packiFiles') {
        return new Promise((resolve, reject) => 
            
                wizziProds.loadModel(contextItem.sourcePath as string, contextItem.sourceFiles as packiTypes.PackiFiles).then((value: any) => {
                
                    console.log(myname + '.resolveContext', 'sourcePath', contextItem.sourcePath, value);
                    resolve(value);
                }
                ).catch((err: any) => 
                
                    reject(err)
                )
            
            );
    }
    else if (contextItem.type == 'wizziModel-fsIttf') {
        return new Promise((resolve, reject) => 
            
                wizziProds.loadModelFs(path.join(config.ittfPath, contextItem.sourcePath as string), {}).then((value: any) => {
                
                    console.log(myname + '.resolveContext', contextItem.type, 'sourcePath', contextItem.sourcePath, value);
                    resolve(value);
                }
                ).catch((err: any) => 
                
                    reject(err)
                )
            
            );
    }
    else {
        throw new Error('Invalid contextItem type: ' + contextItem.type);
    }
}

export class ProductionsController implements ControllerType {
    
    public path = '/api/v1/wizzi/productions';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ProductionsController.initialize');
        this.router.post('/artifact', this.artifact);
    };
    
    private artifact = async (request: Request, response: Response) => {
    
        const artifactRequest: ArtifactRequest = request.body;
        console.log(myname + 'artifact.received request (keys)', Object.keys(artifactRequest));
        resolveContexts(artifactRequest.contextItems).then((context) => {
        
            console.log(myname + '.artifact.handler.resolvedContext', context);
            if (artifactRequest.mainIttf.sourceType == 'fsFiles') {
                wizziProds.generateArtifactFs(path.join(config.ittfPath, artifactRequest.mainIttf.sourcePath as string), context).then((value) => {
                
                    console.log('generateArtifact.result', value);
                    sendSuccess(response, {
                        generatedArtifact: value
                     })
                }
                ).catch((err) => {
                
                    console.log(myname + '.generateArtifact.err', err);
                    sendFailure(response, err, 501);
                }
                )
            }
            else if (artifactRequest.mainIttf.sourceType == 'packiFiles') {
                wizziProds.generateArtifact(artifactRequest.mainIttf.sourcePath as string, artifactRequest.mainIttf.sourceFiles as packiTypes.PackiFiles, context).then((value: any) => {
                
                    console.log('generateArtifact.result', value);
                    sendSuccess(response, {
                        generatedArtifact: value
                     })
                }
                ).catch((err: any) => {
                
                    console.log(myname + '.generateArtifact.err', err);
                    sendFailure(response, err, 501);
                }
                )
            }
        }
        ).catch((err: any) => 
        
            sendFailure(response, err, 501)
        )
    }
    ;
}
