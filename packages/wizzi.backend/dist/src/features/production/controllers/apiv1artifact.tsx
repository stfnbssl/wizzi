/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\apiv1artifact.tsx.ittf
    utc time: Sun, 25 Jul 2021 19:40:42 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {validateArtifactProduction, getArtifactProduction, updateArtifactProduction, invalidateCache} from '../api/artifact';

const myname = 'features/production/controllers/apiv1artifactproduction';

export class ApiV1ArtifactProductionController implements ControllerType {
    
    public path = '/api/v1/production/artifact';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ApiV1ArtifactProductionController.initialize');
        this.router.get('/checkname/:name', this.getCheckArtifactName);
        this.router.get('/:owner/:name', this.getArtifactProduction);
        this.router.put('/:owner/:name', this.putArtifactProduction);
    };
    
    private getCheckArtifactName = async (request: Request, response: Response) => {
    
        console.log('getCheckArtifactName.request.params', request.params);
        console.log('getCheckArtifactName.request.session.user.username', (request.session as any).user.username);
        validateArtifactProduction((request.session as any).user.username, request.params.name).then((result: any) => {
        
            console.log('getCheckArtifactName.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getCheckArtifactName.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getArtifactProduction = async (request: Request, response: Response) => {
    
        console.log('getArtifactProduction.request.params', request.params);
        getArtifactProduction(request.params.owner, request.params.name).then((result: any) => {
        
            console.log('getArtifactProduction.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getArtifactProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private putArtifactProduction = async (request: Request, response: Response) => {
    
        console.log('putArtifactProduction.request.params', request.params);
        console.log('putArtifactProduction.request.body', request.body);
        updateArtifactProduction(request.params.owner, request.params.name, request.body.description, request.body.mainIttf, request.body.schema, JSON.stringify(request.body.packiFiles)).then((result: any) => {
        
            console.log('putArtifactProduction.result', result);
            invalidateCache(request.params.owner, request.params.name)
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('putArtifactProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
}
