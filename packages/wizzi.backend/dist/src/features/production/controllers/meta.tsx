/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\meta.tsx.ittf
    utc time: Sun, 25 Jul 2021 19:40:42 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import PageFormDocument from '../../../pages/PageFormDocument';
import {CRUDResult} from '../../types';
import {createMetaProduction} from '../api/meta';

const myname = 'features/production/controllers/meta';

function renderPageForm(req: Request, res: Response, data: object, queryParams: object) {

    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument
     data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
function getPackiFiles() {

    return {
            ['properties/index.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    [ properties', 
                    '        {', 
                    '            name "name"', 
                    '            type "string"'
                ].join('\n')
             }, 
            ['template/index.html.ittf.ittf']: {
                type: 'CODE', 
                contents: [
                    'html', 
                    '    body', 
                    '        div', 
                    '            h1', 
                    '                + Hello ${cliCtx.name}'
                ].join('\n')
             }
         };
}

export class MetaProductionController implements ControllerType {
    
    public path = '/meta';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering MetaProductionController.initialize');
        this.router.get('/new', this.getNewMetaForm);
        this.router.post('/new', this.postNewMeta);
        this.router.get('/update', this.getUpdateMetaForm);
        this.router.post('/update', this.postUpdateMeta);
        this.router.get('/delete', this.getDeleteMetaForm);
        this.router.delete('/delete', this.deleteMeta);
    };
    
    private getNewMetaForm = async (request: Request, response: Response) => {
    
        console.log(myname, 'getNewMetaForm', JSON.stringify(request.query, null, 2));
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreateMetaProduction', 
            formData: {
                owner: request.query.owner, 
                name: request.query.name
             }
         }, {})
    }
    ;
    
    private postNewMeta = async (request: Request, response: Response) => {
    
        console.log(myname + '.postNewMeta.request.body', JSON.stringify(request.body, null, 2));
        console.log(myname + '.postNewMeta.request.session.user', JSON.stringify((request.session as any).user, null, 2));
        createMetaProduction((request.session as any).user.username, request.body.mp_name, request.body.mp_description, JSON.stringify(getPackiFiles())).then((result: CRUDResult) => {
        
            console.log(myname + '.postNewMeta.createMetaProduction.result', JSON.stringify(result, null, 2));
            if (result.ok) {
                response.redirect('/productions/metas');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'creating a new meta production', 
                    error: result
                 })
            }
        }
        ).catch((err: any) => 
        
            response.render('error.html.ittf', {
                message: 'creating a new meta production', 
                error: err
             })
        )
    }
    ;
    
    private getUpdateMetaForm = 
    // log myname + '.getUpdateMetaForm',
    async (request: Request, response: Response) => 
    
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'UpdateMeta', 
            formData: {
                website: 'http://dummy.com'
             }
         }, {})
    
    ;
    
    private postUpdateMeta = 
    // log myname + '.postUpdateMeta',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getDeleteMetaForm = 
    // log myname + '.getDeleteMetaForm',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private deleteMeta = 
    // log myname + '.deleteMeta',
    async (request: Request, response: Response) => {
    
    }
    ;
}
