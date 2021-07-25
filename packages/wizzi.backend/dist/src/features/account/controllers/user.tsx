/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\account\controllers\user.tsx.ittf
    utc time: Sun, 25 Jul 2021 19:40:42 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import PageFormDocument from '../../../pages/PageFormDocument';
import {CreateUserResult} from '../types';
import {validateUsername, createUserFromSignup} from '../api/user';

const myname = 'features/account/controllers/user';

function renderPackiPageForm(req: Request, res: Response, data: object, queryParams: object) {

    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument
     data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}

export class UserController implements ControllerType {
    
    public path = '/user';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering UserController.initialize');
        this.router.get('/new', this.getNewUserForm);
        this.router.post('/new', this.postNewUser);
        this.router.get('/update', this.getUpdateUserForm);
        this.router.post('/update', this.postUpdateUser);
        this.router.get('/delete', this.getDeleteUserForm);
        this.router.delete('/delete', this.deleteUser);
    };
    
    private getNewUserForm = async (request: Request, response: Response) => {
    
        console.log(myname, 'getNewUserForm', JSON.stringify(request.query, null, 2));
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'CreateUser', 
            formData: {
                name: request.query.name, 
                email: request.query.email, 
                avatar_url: request.query.avatar_url, 
                openid_provider: request.query.openid_provider
             }
         }, {})
    }
    ;
    
    private postNewUser = async (request: Request, response: Response) => {
    
        console.log(myname + '.postNewUser.request.body', JSON.stringify(request.body, null, 2));
        createUserFromSignup({
            name: request.body.u_name, 
            email: request.body.u_email, 
            avatarUrl: request.body.u_avatar_url, 
            openidProvider: request.body.u_openid_provider, 
            wizziUserName: request.body.u_username
         }).then((result: CreateUserResult) => {
        
            console.log(myname + '.postNewUser.createUserFromSignup.result', JSON.stringify(result, null, 2));
            if (result.created) {
                (request.session as any).user = result.user;
                response.redirect('/profile');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'creating a new wizzi user', 
                    error: result
                 })
            }
        }
        ).catch((err: any) => 
        
            response.render('error.html.ittf', {
                message: 'creating a new wizzi user', 
                error: err
             })
        )
    }
    ;
    
    private getUpdateUserForm = 
    // log myname + '.getUpdateUserForm',
    async (request: Request, response: Response) => 
    
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'UpdateUser', 
            formData: {
                website: 'http://dummy.com'
             }
         }, {})
    
    ;
    
    private postUpdateUser = 
    // log myname + '.postUpdateUser',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getDeleteUserForm = 
    // log myname + '.getDeleteUserForm',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private deleteUser = 
    // log myname + '.deleteUser',
    async (request: Request, response: Response) => {
    
    }
    ;
}
