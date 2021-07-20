/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\artifactProduction.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:54:54 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import wizziProto from 'wizzi.proto';
import PageFormDocument from '../../../pages/PageFormDocument';

const myname = 'features/packi/controller/artifactProduction';

function renderPackiPageForm(req: Request, res: Response, data: object, queryParams: object) {

    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument
     data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}

export class ArtifactProductionController implements ControllerType {
    
    public path = '/artifact';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ArtifactProductionController.initialize');
        wizziProto.start('stfnbssl', {}, () => {
        
        }
        )
        this.router.get('/new', this.getNewArtifactForm);
        this.router.post('/new', this.postNewArtifact);
        this.router.get('/update', this.getUpdateArtifactForm);
        this.router.post('/update', this.postUpdateArtifact);
        this.router.get('/delete', this.getDeleteArtifactForm);
        this.router.delete('/delete', this.deleteArtifact);
    };
    
    private getNewArtifactForm = 
    // log myname + '.getNewArtifactForm',
    async (request: Request, response: Response) => 
    
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'CreateArtifactProduction', 
            formData: {
                
             }
         }, {})
    
    ;
    
    private postNewArtifact = 
    // log myname + '.postNewArtifact',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getUpdateArtifactForm = 
    // log myname + '.getUpdateArtifactForm',
    async (request: Request, response: Response) => 
    
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'UpdateArtifactProduction', 
            formData: {
                name: 'home.html', 
                description: 'Site home page', 
                wizziSchema: 'html', 
                mainIttf: 'index.html.ittf'
             }
         }, {})
    
    ;
    
    private postUpdateArtifact = 
    // log myname + '.postUpdateArtifact',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getDeleteArtifactForm = 
    // log myname + '.getDeleteArtifactForm',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private deleteArtifact = 
    // log myname + '.deleteArtifact',
    async (request: Request, response: Response) => {
    
    }
    ;
}
