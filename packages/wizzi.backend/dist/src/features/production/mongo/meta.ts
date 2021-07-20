/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\mongo\meta.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IMetaProductionModel} from "../types";

const MetaProductionSchema: Schema<IMetaProductionModel> = new Schema({
    owner: String, 
    name: String, 
    description: String, 
    sdkVersion: String, 
    packiFiles: String, 
    created_at: Date, 
    updated_at: Date
 });

MetaProductionSchema.index({
    owner: 1, 
    name: 1
 }, {
    unique: true
 })

export type MetaProductionModelType = Model<IMetaProductionModel>;
    // mongoose models creation is centralized
    // the mongodb service calls buildModel() when starting, after connection has been established
    // controllers call MetaProductionModel() when initialized, after buildModel() has benn called
    

let MetaProductionModel: MetaProductionModelType;

export function GetMetaProductionModel():  MetaProductionModelType {

    return MetaProductionModel;
}

export const MetaProductionModelBuilder: ModelBuilderType = {
    buildModel: () => 
    
        MetaProductionModel = model<IMetaProductionModel>("MetaProduction", MetaProductionSchema)
    
    
 };
