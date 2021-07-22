/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\account\controllers\apiv1user.tsx.ittf
    utc time: Thu, 22 Jul 2021 16:33:14 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {validateUsername} from '../api/user';

const myname = 'features/account/controllers/apiv1user';

export class ApiV1UserController implements ControllerType {
    
    public path = '/api/v1/user';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ApiV1UserController.initialize');
        this.router.get('/checkusername/:username', this.getCheckUsername);
    };
    
    private getCheckUsername = async (request: Request, response: Response) => {
    
        console.log('getCheckUsername.request.params', request.params);
        validateUsername(request.params.username).then((result: any) => {
        
            console.log('getCheckUsername.result', result);
            sendSuccess(response, result)
        }
        ).catch(err => 
        
            sendFailure(response, {
                err: err
             }, 501)
        )
    }
    ;
}
