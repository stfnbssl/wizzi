/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\artifact.tsx.ittf
    utc time: Sun, 25 Jul 2021 19:40:42 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import PageFormDocument from '../../../pages/PageFormDocument';
import {CRUDResult} from '../../types';
import {createArtifactProduction} from '../api/artifact';

const myname = 'features/production/controllers/artifact';

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

export class ArtifactProductionController implements ControllerType {
    
    public path = '/artifact';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ArtifactProductionController.initialize');
        this.router.get('/new', this.getNewArtifactForm);
        this.router.post('/new', this.postNewArtifact);
        this.router.get('/update', this.getUpdateArtifactForm);
        this.router.post('/update', this.postUpdateArtifact);
        this.router.get('/delete', this.getDeleteArtifactForm);
        this.router.delete('/delete', this.deleteArtifact);
    };
    
    private getNewArtifactForm = async (request: Request, response: Response) => {
    
        console.log(myname, 'getNewArtifactForm', JSON.stringify(request.query, null, 2));
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreateArtifactProduction', 
            formData: {
                owner: request.query.owner, 
                name: request.query.name, 
                mainIttf: request.query.mainIttf, 
                schema: request.query.schema
             }
         }, {})
    }
    ;
    
    private postNewArtifact = async (request: Request, response: Response) => {
    
        console.log(myname + '.postNewArtifact.request.body', JSON.stringify(request.body, null, 2));
        console.log(myname + '.postNewArtifact.request.session.user', JSON.stringify((request.session as any).user, null, 2));
        createArtifactProduction((request.session as any).user.username, request.body.ap_name, request.body.ap_description, request.body.ap_main_ittf, request.body.ap_wizzi_schema, JSON.stringify(getPackiFiles(request.body.ap_main_ittf))).then((result: CRUDResult) => {
        
            console.log(myname + '.postNewArtifact.createArtifactProduction.result', JSON.stringify(result, null, 2));
            if (result.ok) {
                response.redirect('/productions/artifacts');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'creating a new artifact production', 
                    error: result
                 })
            }
        }
        ).catch((err: any) => 
        
            response.render('error.html.ittf', {
                message: 'creating a new artifact production', 
                error: err
             })
        )
    }
    ;
    
    private getUpdateArtifactForm = 
    // log myname + '.getUpdateArtifactForm',
    async (request: Request, response: Response) => 
    
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'UpdateArtifact', 
            formData: {
                website: 'http://dummy.com'
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
