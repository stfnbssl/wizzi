/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\productions.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import fs from 'fs';
import {fsTypes} from '../../filesystem';
import {wizziTypes, wizziProds, WizziFactory} from '../../wizzi';
import {artifactApi} from '../../production';
import {PackiFiles, TemplateList, Template} from '../types';
import {file} from 'wizzi';
const myname = 'features/packi/controllers/productions';

export class ProductionsController implements ControllerType {
    
    public path = '/api/v1/productions';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ProductionsController.initialize');
        this.router.post(`/mtree/:id`, this.mTree);
        this.router.post(`/mtreedebuginfo/:id`, this.mTreeDebugInfo);
        this.router.post(`/artifact/:id`, this.generateArtifact);
        this.router.post(`/transform/:id/:transformer`, this.transformModel);
        this.router.post(`/job`, this.executeJob);
        this.router.post(`/wizzify`, this.wizzify);
    };
    
    private mTree = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const req_files: PackiFiles = request.body;
        console.log(myname, 'mTree.received files', Object.keys(req_files));
        artifactApi.prepareGenerationFromWizziJson(req_files).then((result: any) => 
        
            wizziProds.mTree(id, result.packiFiles, result.context).then((value: any) => {
            
                console.log(myname, 'mTree.result', value);
                sendSuccess(response, {
                    mTreeIttf: value
                 })
            }
            ).catch((err: any) => {
            
                console.log('features.packi.controllers.productions.mTree.error', err);
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
        )
    }
    ;
    
    private mTreeDebugInfo = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const req_files: PackiFiles = request.body;
        console.log(myname, 'mTreeDebugInfo.received files', Object.keys(req_files));
        artifactApi.prepareGenerationFromWizziJson(req_files).then((result: any) => 
        
            wizziProds.mTreeDebugInfo(id, result.packiFiles, result.context).then((value) => {
            
                console.log(myname, 'mTreeDebugInfo.result', value);
                sendSuccess(response, {
                    mTreeBuildUpScript: value
                 })
            }
            ).catch((err: any) => {
            
                console.log('features.packi.controllers.productions.mTreeDebugInfo.error', err);
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
        )
    }
    ;
    
    private generateArtifact = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const req_files: PackiFiles = request.body;
        console.log(myname, 'generateArtifact.received files', Object.keys(req_files));
        artifactApi.prepareGenerationFromWizziJson(req_files).then((result: any) => 
        
            wizziProds.generateArtifact(id, result.packiFiles, result.context).then((value) => {
            
                console.log(myname, 'generateArtifact.result', value);
                sendSuccess(response, {
                    generatedArtifact: value
                 })
            }
            ).catch((err: any) => {
            
                console.log('features.packi.controllers.production.generateArtifact.error', err);
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
        ).catch((err: any) => {
        
            console.log('features.packi.controllers.production.prepareGenerationPackiFiles.error', err);
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private transformModel = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const transformer = request.params.transformer;
        const req_files: PackiFiles = request.body;
        console.log(myname, 'transformModel.received files', Object.keys(req_files));
        artifactApi.prepareGenerationFromWizziJson(req_files).then((result: any) => 
        
            wizziProds.transformModel(id, result.packiFiles, result.context, {
                transformer: transformer
             }).then((value) => {
            
                console.log('generateArtifact.result', value);
                sendSuccess(response, {
                    transformedModel: value.transformResult
                 })
            }
            ).catch((err: any) => {
            
                console.log('features.packi.controllers.production.transformModel.error', err);
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
        )
    }
    ;
    
    private executeJob = async (request: Request, response: Response) => {
    
        const req_files: PackiFiles = request.body;
        console.log('ProductionsController.executeJob.received files', Object.keys(req_files));
        artifactApi.prepareGenerationFromWizziJson(req_files).then((result: any) => 
        
            wizziProds.executeJobs(result.packiFiles, result.context).then(async (fsJson) => {
            
                const files = await WizziFactory.extractGeneratedFiles(fsJson);
                console.log('features.packi.controllers.production.executeJob.generatedArtifacts', Object.keys(files));
                sendSuccess(response, {
                    generatedArtifacts: files
                 })
            }
            ).catch((err: any) => {
            
                console.log('features.packi.controllers.production.executeJob.error', err);
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
        )
    }
    ;
    
    private wizzify = async (request: Request, response: Response) => {
    
        const id = request.params.id;
        const files: PackiFiles = request.body;
        console.log('wizzify.received files', Object.keys(files));
        wizziProds.wizzify(files).then(async (ittfResult: PackiFiles) => {
        
            console.log('features.packi.controllers.production.wizzify.ittfResult', ittfResult);
            sendSuccess(response, {
                packiResult: ittfResult
             })
        }
        ).catch((err) => {
        
            console.log('features.packi.controllers.production.wizzify.err', err);
            sendFailure(response, err, 501);
        }
        )
    }
    ;
}
