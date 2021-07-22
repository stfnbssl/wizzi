/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\packiAdmin.tsx.ittf
    utc time: Thu, 22 Jul 2021 16:33:14 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import ReactDOMServer from 'react-dom/server';
import wizziProto from 'wizzi.proto';
import PageFormDocument from '../../../pages/PageFormDocument';
const myname = 'features/packi/controller/packiAdmin';

function renderPackiPageForm(req: Request, res: Response, data: object, queryParams: object) {

    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument
     data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}

export class PackiAdminController implements ControllerType {
    
    public path = '/packi/admin';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering PackiAdminController.initialize');
        wizziProto.start('stfnbssl', {}, () => {
        
        }
        )
        this.router.get('/theme', this.getThemesDemo);
    };
    
    private getThemesDemo = 
    // TODO
    
    // log myname + '.getThemesDemo',
    async (request: Request, response: Response) => 
    
        renderPackiPageForm(request, response, {
            type: 'success', 
            formName: 'ThemeDemo', 
            formData: {
                
             }
         }, {})
    
    ;
}
