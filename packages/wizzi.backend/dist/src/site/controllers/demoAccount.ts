/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\site\controllers\demoAccount.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../utils/sendResponse';

export class DemoAccountController implements ControllerType {
    
    public path = '/demo/account';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering DemoAccountController.initialize');
        this.router.get(`/login`, this.login)
        this.router.get(`/profile`, this.profile)
        this.router.get(`/logout`, this.logout)
    };
    
    private login = async (request: Request, response: Response) => 
    
        response.render('demoAccount/login.html.ittf', {
            title: 'Login page'
         })
    
    ;
    
    private profile = async (request: Request, response: Response) => {
    
        const { _raw, _json, ...user } = (request as any).user as any;
        response.render('demoAccount/profile.html.ittf', {
            user: user, 
            rawProfile: JSON.stringify(_raw, null, 2), 
            jsonProfile: JSON.stringify(_json, null, 2), 
            userProfile: JSON.stringify(user, null, 2), 
            title: 'Profile page'
         })
    }
    ;
    
    private logout = async (request: Request, response: Response) => {
    
        (request as any).logout();
        response.redirect('/');
    }
    ;
}
