/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\tfolder.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:54:54 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import PageFormDocument from '../../../pages/PageFormDocument';

const myname = 'features/packi/controller/tfolder';

function renderPackiPageForm(req: Request, res: Response, data: object, queryParams: object) {

    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument
     data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
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
    
    private getNewTFolderForm = 
    // log myname + '.getNewTFolderForm',
    async (request: Request, response: Response) => 
    
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'CreateTFolder', 
            formData: {
                
             }
         }, {})
    
    ;
    
    private postNewTFolder = 
    // log myname + '.postNewTFolder',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getUpdateTFolderForm = 
    // log myname + '.getUpdateTFolderForm',
    async (request: Request, response: Response) => 
    
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'UpdateTFolder', 
            formData: {
                name: 'base.html', 
                description: 'Base html tfolder', 
                wizziSchema: 'html'
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
