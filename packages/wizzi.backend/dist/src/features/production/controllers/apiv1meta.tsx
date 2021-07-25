/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\apiv1meta.tsx.ittf
    utc time: Sun, 25 Jul 2021 19:40:42 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {validateMetaProduction, getListMetaProduction, getMetaProduction, updateMetaProduction} from '../api/meta';

import {wizziTypes, wizziProds, WizziFactory} from '../../wizzi';
import {artifactApi} from '../../production';
const myname = 'features/production/controllers/apiv1metaproduction';

export class ApiV1MetaProductionController implements ControllerType {
    
    public path = '/api/v1/production/meta';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ApiV1MetaProductionController.initialize');
        this.router.get('/list', this.getMetaProductionList);
        this.router.get('/props/:owner/:name', this.getMetaProperties);
        this.router.get('/checkname/:name', this.getCheckMetaName);
        this.router.get('/:owner/:name', this.getMetaProduction);
        this.router.put('/:owner/:name', this.putMetaProduction);
    };
    
    private getMetaProductionList = async (request: Request, response: Response) => {
    
        console.log('getMetaProductionList.request.params', request.params);
        console.log('getMetaProductionList.request.session.user.username', (request.session as any).user.username);
        getListMetaProduction((request.session as any).user.username).then((result: any) => {
        
            console.log('getMetaProductionList.result', result);
            if (result.ok) {
                const items = [];
                var i, i_items=result.item, i_len=result.item.length, meta;
                for (i=0; i<i_len; i++) {
                    meta = result.item[i];
                    items.push({
                        owner: meta.owner, 
                        name: meta.name, 
                        description: meta.description
                     })
                }
                sendSuccess(response, items)
            }
            else {
                console.log('getMetaProductionList.error', result);
                sendFailure(response, {
                    err: result
                 }, 501)
            }
        }
        ).catch((err: any) => {
        
            console.log('getMetaProductionList.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getMetaProperties = async (request: Request, response: Response) => {
    
        console.log('getMetaProperties.request.params', request.params);
        console.log('getMetaProperties.request.session.user.username', (request.session as any).user.username);
        getMetaProduction(request.params.owner, request.params.name).then((result: any) => {
        
            console.log('getMetaProperties.getMetaProduction.result', result);
            if (result.ok) {
                const meta = result.item;
                const req_files = JSON.parse(meta.packiFiles);
                artifactApi.prepareGenerationFromWizziJson(req_files).then((result: any) => 
                
                    wizziProds.generateArtifact('properties/index.json.ittf', result.packiFiles, result.context).then((value) => {
                    
                        console.log(myname, 'getMetaProperties.generateArtifact.result', value);
                        sendSuccess(response, {
                            meta: JSON.parse(value.artifactContent)
                         })
                    }
                    ).catch((err: any) => {
                    
                        console.log('features.packi.controllers.production.generateArtifact.error', err);
                        sendFailure(response, {
                            err: err
                         }, 501)
                    }
                    )
                
                ).catch((err: any) => {
                
                    console.log('getMetaProperties.prepareGenerationFromWizziJson.error', err);
                    sendFailure(response, {
                        err: err
                     }, 501)
                }
                )
            }
            else {
                console.log('getMetaProperties.getMetaProduction.error', result);
                sendFailure(response, {
                    err: result
                 }, 501)
            }
        }
        ).catch((err: any) => {
        
            console.log('getMetaProperties.getMetaProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getCheckMetaName = async (request: Request, response: Response) => {
    
        console.log('getCheckMetaName.request.params', request.params);
        console.log('getCheckMetaName.request.session.user.username', (request.session as any).user.username);
        validateMetaProduction((request.session as any).user.username, request.params.name).then((result: any) => {
        
            console.log('getCheckMetaName.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getCheckMetaName.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getMetaProduction = async (request: Request, response: Response) => {
    
        console.log('getMetaProduction.request.params', request.params);
        getMetaProduction(request.params.owner, request.params.name).then((result: any) => {
        
            console.log('getMetaProduction.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getMetaProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private putMetaProduction = async (request: Request, response: Response) => {
    
        console.log('putMetaProduction.request.params', request.params);
        console.log('putMetaProduction.request.body', request.body);
        updateMetaProduction(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result: any) => {
        
            console.log('putMetaProduction.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('putMetaProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
}
