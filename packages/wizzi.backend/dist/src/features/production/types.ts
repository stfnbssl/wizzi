/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\types.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/

import {Document} from "mongoose";

export type IArtifactProduction = { 
    owner: string;
    name: string;
    description: string;
    mainIttf: string;
    wizziSchema: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};


type IArtifactProduction_doc = { 
    _doc: IArtifactProduction;
};

export interface IArtifactProductionModel extends IArtifactProduction, IArtifactProduction_doc, Document {
}

export type IPackageProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};


type IPackageProduction_doc = { 
    _doc: IPackageProduction;
};

export interface IPackageProductionModel extends IPackageProduction, IPackageProduction_doc, Document {
}

export type IMetaProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};


type IMetaProduction_doc = { 
    _doc: IMetaProduction;
};

export interface IMetaProductionModel extends IMetaProduction, IMetaProduction_doc, Document {
}

export type ITFolder = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};


type ITFolder_doc = { 
    _doc: ITFolder;
};

export interface ITFolderModel extends ITFolder, ITFolder_doc, Document {
}
