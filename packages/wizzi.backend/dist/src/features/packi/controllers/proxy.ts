/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\controllers\proxy.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Router, Request, Response} from 'express';
import {ControllerType, AppInitializerType} from '../../../features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure} from '../../../utils/sendResponse';
import axios from 'axios';
const myname = 'features/packi/controller/proxy';

export class ProxyController implements ControllerType {
    
    public path = '/api/v1/packi/proxy';
    
    public router = Router();
    
    
    initialize = (initValues: AppInitializerType) => {
        console.log('Entering ProxyController.initialize');
        this.router.post('/packiitem', this.packiItem);
    };
    
    private packiItem = async (request: Request, response: Response) => 
    
        axios.post('http://localhost:3000/api/v1/packiitem', request.body).then((res: any) => {
        
            console.log(myname + '.packiItem res', Object.keys(res), 'res.data', res.data);
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            sendSuccess(response, res.data)
        }
        ).catch((err: any) => {
        
            console.log(myname + '.packiItem.err', Object.keys(err));
            sendFailure(response, err, 501);
        }
        )
    
    ;
}
