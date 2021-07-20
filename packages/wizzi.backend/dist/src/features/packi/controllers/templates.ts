/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\templates.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Router, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import {ControllerType, AppInitializerType} from '../../app/types';
import {fsTypes} from '../../filesystem';
import {PackiFiles, TemplateList, Template} from '../types';
import {sendPromiseResult, sendSuccess, sendFailure} from '../../../utils/sendResponse';
var jsonParser = bodyParser.json();
export class TemplatesController implements ControllerType {
    public path = '/api/v1/templates';
    public router = Router();
    public fsDb: fsTypes.FsDb | undefined;
    initialize = (initValues: AppInitializerType) => {
        this.fsDb = initValues.fsDb;
        this.router.get(this.path, this.getAllTemplates);
        this.router.get(`${this.path}/:id`, this.getTemplateById)
        this.router.get(`${this.path}/__starter`, this.getStarterTemplate)
        this.router.post(`${this.path}/:uid/:id`, this.saveTemplate)
    };
    
    private getAllTemplates = async (request: Request, response: Response) => 
    
        sendPromiseResult<string[]>(response, (this.fsDb as fsTypes.FsDb).getPackiTemplatesList()
        )
    
    ;
    
    private getTemplateById = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const template = await (this.fsDb as fsTypes.FsDb).getPackiTemplate(id)
        ;
        sendSuccess(response, template);
    }
    ;
    
    private getStarterTemplate = async (request: Request, response: Response) => {
    
        const template = await (this.fsDb as fsTypes.FsDb).getStarterTemplate()
        ;
        sendSuccess(response, template);
    }
    ;
    
    private saveTemplate = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const files: PackiFiles = request.body.files;
        (this.fsDb as fsTypes.FsDb).savePackiTemplate(id, files).then(result => 
        
            sendSuccess(response, result)
        ).catch(err => 
        
            sendFailure(response, err, 501)
        )
    }
    ;
}
