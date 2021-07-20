/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\apiv1package.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:38:15 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {validatePackageProduction, getPackageProduction, updatePackageProduction} from '../api/package';

const myname = 'features/production/controllers/apiv1packageproduction';

export class ApiV1PackageProductionController implements ControllerType {
    
    public path = '/api/v1/production/package';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ApiV1PackageProductionController.initialize');
        this.router.get('/checkname/:name', this.getCheckPackageName);
        this.router.get('/:owner/:name', this.getPackageProduction);
        this.router.put('/:owner/:name', this.putPackageProduction);
    };
    
    private getCheckPackageName = async (request: Request, response: Response) => {
    
        console.log('getCheckPackageName.request.params', request.params);
        console.log('getCheckPackageName.request.session.user.username', (request.session as any).user.username);
        validatePackageProduction((request.session as any).user.username, request.params.name).then((result: any) => {
        
            console.log('getCheckPackageName.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getCheckPackageName.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getPackageProduction = async (request: Request, response: Response) => {
    
        console.log('getPackageProduction.request.params', request.params);
        getPackageProduction(request.params.owner, request.params.name).then((result: any) => {
        
            console.log('getPackageProduction.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('getPackageProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private putPackageProduction = async (request: Request, response: Response) => {
    
        console.log('putPackageProduction.request.params', request.params);
        console.log('putPackageProduction.request.body', request.body);
        updatePackageProduction(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result: any) => {
        
            console.log('putPackageProduction.result', result);
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
        
            console.log('putPackageProduction.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
}
