/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\index.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {ModelBuilderType, ControllerType} from '../app/types';
import * as productionTypes from './types';
import {ArtifactProductionModelBuilder, GetArtifactProductionModel} from './mongo/artifact';
import {PackageProductionModelBuilder, GetPackageProductionModel} from './mongo/package';
import {MetaProductionModelBuilder, GetMetaProductionModel} from './mongo/meta';
import {TFolderModelBuilder, GetTFolderModel} from './mongo/tfolder';
import {ArtifactProductionController} from './controllers/artifact';
import {ApiV1ArtifactProductionController} from './controllers/apiv1artifact';
import {PackageProductionController} from './controllers/package';
import {ApiV1PackageProductionController} from './controllers/apiv1package';
import {MetaProductionController} from './controllers/meta';
import {ApiV1MetaProductionController} from './controllers/apiv1meta';
import {TFolderController} from './controllers/tfolder';
import {ApiV1TFolderController} from './controllers/apiv1tfolder';
import * as artifactApi from './api/artifact';
import * as packageApi from './api/package';
import * as metaApi from './api/meta';
import * as tFolderApi from './api/tfolder';

const productionModelGetters = {
    GetArtifactProductionModel, 
    GetPackageProductionModel, 
    GetMetaProductionModel, 
    GetTFolderModel
 };

const productionModelBuilders: ModelBuilderType[] = [
    ArtifactProductionModelBuilder, 
    PackageProductionModelBuilder, 
    MetaProductionModelBuilder, 
    TFolderModelBuilder
];

const productionControllers: ControllerType[] = [
    new ArtifactProductionController(), 
    new ApiV1ArtifactProductionController(), 
    new PackageProductionController(), 
    new ApiV1PackageProductionController(), 
    new MetaProductionController(), 
    new ApiV1MetaProductionController(), 
    new TFolderController(), 
    new ApiV1TFolderController()
];
export {productionTypes, productionModelGetters, productionModelBuilders, productionControllers, artifactApi, packageApi, metaApi, tFolderApi};
