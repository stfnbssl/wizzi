/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\apiv1meta.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:38:15 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {validateMetaProduction, getMetaProduction, updateMetaProduction} from '../api/meta';

const myname = 'features/production/controllers/apiv1metaproduction';

export class ApiV1MetaProductionController implements ControllerType {
    
    public path = '/api/v1/production/meta';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ApiV1MetaProductionController.initialize');
        this.router.get('/checkname/:name', this.getCheckMetaName);
        this.router.get('/:owner/:name', this.getMetaProduction);
        this.router.put('/:owner/:name', this.putMetaProduction);
    };
    
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
