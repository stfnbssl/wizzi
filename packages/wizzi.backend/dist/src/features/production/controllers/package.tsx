/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\controllers\package.tsx.ittf
    utc time: Thu, 22 Jul 2021 16:33:14 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import PageFormDocument from '../../../pages/PageFormDocument';
import {CRUDResult} from '../../types';
import {createPackageProduction} from '../api/package';

const myname = 'features/production/controllers/package';

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

export class PackageProductionController implements ControllerType {
    
    public path = '/package';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering PackageProductionController.initialize');
        this.router.get('/new', this.getNewPackageForm);
        this.router.post('/new', this.postNewPackage);
        this.router.get('/update', this.getUpdatePackageForm);
        this.router.post('/update', this.postUpdatePackage);
        this.router.get('/delete', this.getDeletePackageForm);
        this.router.delete('/delete', this.deletePackage);
        this.router.get('/props', this.getPackageProperties);
    };
    
    private getNewPackageForm = async (request: Request, response: Response) => {
    
        console.log(myname, 'getNewPackageForm', JSON.stringify(request.query, null, 2));
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreatePackageProduction', 
            formData: {
                owner: request.query.owner, 
                name: request.query.name
             }
         }, {})
    }
    ;
    
    private postNewPackage = async (request: Request, response: Response) => {
    
        console.log(myname + '.postNewPackage.request.body', JSON.stringify(request.body, null, 2));
        console.log(myname + '.postNewPackage.request.session.user', JSON.stringify((request.session as any).user, null, 2));
        createPackageProduction((request.session as any).user.username, request.body.pp_name, request.body.pp_description, JSON.stringify(getPackiFiles('.wizzi/generate.wfjob.ittf'))).then((result: CRUDResult) => {
        
            console.log(myname + '.postNewPackage.createPackageProduction.result', JSON.stringify(result, null, 2));
            if (result.ok) {
                response.redirect('/productions/packages');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'creating a new package production', 
                    error: result
                 })
            }
        }
        ).catch((err: any) => 
        
            response.render('error.html.ittf', {
                message: 'creating a new package production', 
                error: err
             })
        )
    }
    ;
    
    private getUpdatePackageForm = 
    // log myname + '.getUpdatePackageForm',
    async (request: Request, response: Response) => 
    
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'UpdatePackage', 
            formData: {
                website: 'http://dummy.com'
             }
         }, {})
    
    ;
    
    private postUpdatePackage = 
    // log myname + '.postUpdatePackage',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getDeletePackageForm = 
    // log myname + '.getDeletePackageForm',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private deletePackage = 
    // log myname + '.deletePackage',
    async (request: Request, response: Response) => {
    
    }
    ;
    
    private getPackageProperties = async (request: Request, response: Response) => {
    
        console.log(myname, 'getPackageProperties', JSON.stringify(request.query, null, 2));
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'PropertyEditor', 
            formData: {
                owner: request.query.owner, 
                name: request.query.name, 
                schema: {
                    properties: [
                        {
                            name: 'name', 
                            type: 'string'
                         }, 
                        {
                            name: 'age', 
                            type: 'number'
                         }, 
                        {
                            name: 'jobs', 
                            type: 'array', 
                            properties: [
                                {
                                    name: 'title', 
                                    type: 'string'
                                 }, 
                                {
                                    name: 'year', 
                                    type: 'number'
                                 }
                            ]
                         }, 
                        {
                            name: 'react', 
                            type: 'object', 
                            properties: [
                                {
                                    name: 'useReact', 
                                    type: 'boolean', 
                                    isCondition: true
                                 }, 
                                {
                                    name: 'useRouter', 
                                    type: 'boolean'
                                 }, 
                                {
                                    name: 'useRedux', 
                                    type: 'boolean'
                                 }
                            ]
                         }
                    ]
                 }
             }
         }, {})
    }
    ;
}
