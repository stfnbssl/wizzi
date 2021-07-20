/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\packiItem.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import {IPackiItem} from '../types';
import {PackiItemModelType, GetPackiItemModel} from '../mongo/packiItem';

export class PackiItemController implements ControllerType {
    
    public path = '/api/v1/packi/item';
    
    public router = Router();
    
    public PackiItemModel: PackiItemModelType;
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering PackiItemController.initialize');
        this.PackiItemModel = GetPackiItemModel();
        ;
        this.router.get('/', this.get);
        this.router.post('/', this.addNewPackiItem);
        this.router.get('/:id', this.getPackiItemById);
        this.router.get('/owner/:owner', this.getPackiItemBy_owner);
        this.router.post('/dependency/:id/:dependency', this.add_dependency);
        this.router.delete('/dependency/:id/:dependency', this.remove_dependency);
        this.router.get(`/:owner/:name`, this.getPackiItemBy_owner_name)
        this.router.put('/:id', this.updatePackiItem);
        this.router.delete('/:id', this.deletePackiItem);
    };
    
    private addNewPackiItem = async (request: Request, response: Response) => {
    
        let newPackiItem = new this.PackiItemModel(request.body);
        newPackiItem.save((err, packiItem) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiItem
             })
        }
        )
    }
    ;
    
    private get = async (request: Request, response: Response) => 
    
        this.PackiItemModel.find({}, (err, packiItem) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiItem
             })
        }
        )
    
    ;
    
    private getPackiItemById = async (request: Request, response: Response) => 
    
        this.PackiItemModel.findById(request.params.id, (err: any, packiItem: IPackiItem) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiItem
             })
        }
        )
    
    ;
    
    private getPackiItemBy_owner = async (request: Request, response: Response) => 
    
        this.PackiItemModel.find({
            _id: request.params.id, 
            owner: request.params.owner
         }, (err, packiItem) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiItem
             })
        }
        )
    
    ;
    
    private add_dependency = async (request: Request, response: Response) => 
    
        this.PackiItemModel.updateOne({
            _id: request.params.id, 
            $push: {
                dependencies: {
                    _id: request.params.dependency
                 }
             }
         }, (err: any) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                message: 'Successfully added dependency to PackiItem!'
             })
        }
        )
    
    ;
    
    private remove_dependency = async (request: Request, response: Response) => 
    
        this.PackiItemModel.updateOne({
            _id: request.params.id, 
            $pull: {
                dependencies: {
                    _id: request.params.dependency
                 }
             }
         }, (err: any) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                message: 'Successfully deleted dependency from PackiItem!'
             })
        }
        )
    
    ;
    
    private getPackiItemBy_owner_name = async (request: Request, response: Response) => 
    
        this.PackiItemModel.find({
            owner: request.params.owner, 
            name: request.params.name
         }, (err, packiItem) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiItem
             })
        }
        )
    
    ;
    
    private updatePackiItem = 
    // Note that update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware.
    
    // If you need save middleware and full validation, first query for the document and then save() it.
    async (request: Request, response: Response) => 
    
        this.PackiItemModel.findOneAndUpdate({
            _id: request.params.id
         }, request.body, {
            new: true
         }, (err, packiItem) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                data: packiItem
             })
        }
        )
    
    ;
    
    private deletePackiItem = async (request: Request, response: Response) => 
    
        this.PackiItemModel.remove({
            _id: request.params.id
         }, (err) => {
        
            if (err) {
                sendFailure(response, err, 501)
            }
            sendSuccess(response, {
                message: 'Successfully deleted packiItem!'
             })
        }
        )
    
    ;
}
