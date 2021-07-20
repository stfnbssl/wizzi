/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\index.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {ModelBuilderType, ControllerType} from '../app/types';
import * as packiTypes from './types';
import {PackiModelBuilder, GetPackiModel} from './mongo/packi';
import {PackiEditingController} from './controllers/packiEditing';
import {PackiAdminController} from './controllers/packiAdmin';
import {PackiController} from './controllers/packi';
import {ProductionsController} from './controllers/productions';
import {ProxyController} from './controllers/proxy';

const packiModelGetters = {
    
    // GetUserModel
    GetPackiModel
 };

const packiModelBuilders: ModelBuilderType[] = [
    PackiModelBuilder
];

const packiControllers: ControllerType[] = [
    new PackiEditingController(), 
    new PackiAdminController(), 
    new PackiController(), 
    new ProductionsController(), 
    new ProxyController()
];

export {packiTypes, packiModelGetters, packiModelBuilders, packiControllers};
