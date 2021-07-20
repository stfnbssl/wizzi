/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\apiv1tfolder.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:38:15 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {validateTFolder, getTFolder, updateTFolder, invalidateCache} from '../api/tfolder';

const myname = 'features/production/controllers/apiv1tfolder';

export class ApiV1TFolderController implements ControllerType {
    
    public path = '/api/v1/production/tfolder';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ApiV1TFolderController.initialize');
        this.router.get('/checkname/:name', this.getCheckTFolderName);
        this.router.get('/:owner/:name', this.getTFolder);
        this.router.put('/:owner/:name', this.putTFolder);
    };
    
    private getCheckTFolderName = async (request: Request, response: Response) => {
    
        console.log('getCheckTFolderName.request.params', request.params);
        console.log('getCheckTFolderName.request.session.user.username', (request.session as any).user.username);
        validateTFolder((request.session as any).user.username, request.params.name).then((result: any) => {
        
            console.log('getCheckTFolderName.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getCheckTFolderName.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getTFolder = async (request: Request, response: Response) => {
    
        console.log('getTFolder.request.params', request.params);
        getTFolder(request.params.owner, request.params.name).then((result: any) => {
        
            console.log('getTFolder.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getTFolder.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private putTFolder = async (request: Request, response: Response) => {
    
        console.log('putTFolder.request.params', request.params);
        console.log('putTFolder.request.body', request.body);
        updateTFolder(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result: any) => {
        
            console.log('putTFolder.result', result);
            invalidateCache(request.params.owner, request.params.name)
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('putTFolder.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
}
