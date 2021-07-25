/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\tfolder.tsx.ittf
    utc time: Sun, 25 Jul 2021 19:40:42 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import PageFormDocument from '../../../pages/PageFormDocument';
import {CRUDResult} from '../../types';
import {createTFolder} from '../api/tfolder';

const myname = 'features/production/controllers/tfolder';

function renderPageForm(req: Request, res: Response, data: object, queryParams: object) {

    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument
     data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
function getPackiFiles(mainIttf: string) {

    return {
            [mainIttf]: {
                type: 'CODE', 
                contents: ''
             }
         };
}

export class TFolderController implements ControllerType {
    
    public path = '/tfolder';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering TFolderController.initialize');
        this.router.get('/new', this.getNewTFolderForm);
        this.router.post('/new', this.postNewTFolder);
        this.router.get('/update', this.getUpdateTFolderForm);
        this.router.post('/update', this.postUpdateTFolder);
        this.router.get('/delete', this.getDeleteTFolderForm);
        this.router.delete('/delete', this.deleteTFolder);
    };
    
    private getNewTFolderForm = async (request: Request, response: Response) => {
    
        console.log(myname, 'getNewTFolderForm', JSON.stringify(request.query, null, 2));
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreateTFolder', 
            formData: {
                owner: request.query.owner, 
                name: request.query.name
             }
         }, {})
    }
    ;
    
    private postNewTFolder = async (request: Request, response: Response) => {
    
        console.log(myname + '.postNewTFolder.request.body', JSON.stringify(request.body, null, 2));
        console.log(myname + '.postNewTFolder.request.session.user', JSON.stringify((request.session as any).user, null, 2));
        createTFolder((request.session as any).user.username, request.body.ap_name, request.body.ap_description, JSON.stringify(getPackiFiles('readme.md.ittf'))).then((result: CRUDResult) => {
        
            console.log(myname + '.postNewTFolder.createTFolder.result', JSON.stringify(result, null, 2));
            if (result.ok) {
                response.redirect('/tfolders');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'creating a new tfolder', 
                    error: result
                 })
            }
        }
        ).catch((err: any) => 
        
            response.render('error.html.ittf', {
                message: 'creating a new tfolder', 
                error: err
             })
        )
    }
    ;
    
    private getUpdateTFolderForm = 
    // log myname + '.getUpdateTFolderForm',
    async (request: Request, response: Response) => 
    
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'UpdateTFolder', 
            formData: {
                website: 'http://dummy.com'
             }
         }, {})
    
    ;
    
    private postUpdateTFolder = 
    // log myname + '.postUpdateTFolder',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getDeleteTFolderForm = 
    // log myname + '.getDeleteTFolderForm',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private deleteTFolder = 
    // log myname + '.deleteTFolder',
    async (request: Request, response: Response) => {
    
    }
    ;
}
