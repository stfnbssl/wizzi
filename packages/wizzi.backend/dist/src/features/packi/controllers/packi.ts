/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\packi.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import path from 'path';
import {file} from 'wizzi';
import {config} from '../../config';
import {wizziProds} from '../../wizzi';
import {PackiFiles} from '../types';

export class PackiController implements ControllerType {
    
    public path = '/api/v1/packi';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering PackiController.initialize');
        
        this.router.post(`/save/:id`, this.savePacki)
        this.router.get(`/:id`, this.getPacki)
        this.router.get(`/render/:id/:entry`, this.renderPacki)
    };
    
    
    private savePacki = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const files: PackiFiles = request.body;
        try {
            var data = JSON.stringify(files);
            file.write(path.join(config.packiStoreFolder, id), data)
            sendSuccess(response, {
                message: 'Packi saved'
             })
        } 
        catch (err) {
            sendFailure(response, err, 501);
        } 
    }
    ;
    
    
    private getPacki = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        try {
            const data = file.read(path.join(config.packiStoreFolder, id));
            const packiObj = JSON.parse(data);
            sendSuccess(response, {
                packi: packiObj
             })
        } 
        catch (err) {
            sendFailure(response, err, 501);
        } 
    }
    ;
    
    
    private renderPacki = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const entry = request.params.entry;
        try {
            const data = file.read(path.join(config.packiStoreFolder, id));
            const files: PackiFiles = JSON.parse(data);
            wizziProds.generateArtifact(entry, files).then((generated) => {
            
                console.log('generateArtifact.result', generated);
                sendHtml(response, generated.artifactContent)
            }
            ).catch((err) => {
            
                console.log('features.packi.controllers.production.generateArtifact.err', err);
                sendFailure(response, err, 501);
            }
            )
        } 
        catch (err) {
            sendFailure(response, err, 501);
        } 
    }
    ;
}
