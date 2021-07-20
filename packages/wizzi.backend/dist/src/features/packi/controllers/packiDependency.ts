/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\packiDependency.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {IPackiDependency} from '../types';
import {PackiDependencyModelType, GetPackiDependencyModel} from '../mongo/packiDependency';

export class Controller implements ControllerType {
    
    public path = '';
    
    public router = Router();
    
    public PackiDependencyModel: PackiDependencyModelType;
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering Controller.initialize');
        this.PackiDependencyModel = GetPackiDependencyModel();
        ;
        this.router.get('/', this.get);
        this.router.post('/', this.addNewPackiDependency);
        this.router.get('/:id', this.getPackiDependencyById);
        this.router.get('/owner/:owner', this.getPackiDependencyBy_owner);
        this.router.get(`/:owner/:name`, this.getPackiDependencyBy_owner_name)
        this.router.put('/:id', this.updatePackiDependency);
        this.router.delete('/:id', this.deletePackiDependency);
    };
    
    private addNewPackiDependency = async (request: Request, response: Response) => {
    
        let newPackiDependency = new this.PackiDependencyModel(request.body);
        newPackiDependency.save((err, packiDependency) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiDependency
             })
        }
        )
    }
    ;
    
    private get = async (request: Request, response: Response) => 
    
        this.PackiDependencyModel.find({}, (err, packiDependency) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiDependency
             })
        }
        )
    
    ;
    
    private getPackiDependencyById = async (request: Request, response: Response) => 
    
        this.PackiDependencyModel.findById(request.params.id, (err: any, packiDependency: IPackiDependency) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiDependency
             })
        }
        )
    
    ;
    
    private getPackiDependencyBy_owner = async (request: Request, response: Response) => 
    
        this.PackiDependencyModel.find({
            _id: request.params.id, 
            owner: request.params.owner
         }, (err, packiDependency) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiDependency
             })
        }
        )
    
    ;
    
    private getPackiDependencyBy_owner_name = async (request: Request, response: Response) => 
    
        this.PackiDependencyModel.find({
            owner: request.params.owner, 
            name: request.params.name
         }, (err, packiDependency) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiDependency
             })
        }
        )
    
    ;
    
    private updatePackiDependency = 
    // Note that update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware.
    
    // If you need save middleware and full validation, first query for the document and then save() it.
    async (request: Request, response: Response) => 
    
        this.PackiDependencyModel.findOneAndUpdate({
            _id: request.params.id
         }, request.body, {
            new: true
         }, (err, packiDependency) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiDependency
             })
        }
        )
    
    ;
    
    private deletePackiDependency = async (request: Request, response: Response) => 
    
        this.PackiDependencyModel.remove({
            _id: request.params.id
         }, (err) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                message: 'Successfully deleted packiDependency!'
             })
        }
        )
    
    ;
}
