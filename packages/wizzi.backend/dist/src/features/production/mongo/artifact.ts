/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\mongo\artifact.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IArtifactProductionModel} from "../types";

const ArtifactProductionSchema: Schema<IArtifactProductionModel> = new Schema({
    owner: String, 
    name: String, 
    description: String, 
    wizziSchema: String, 
    mainIttf: String, 
    sdkVersion: String, 
    packiFiles: String, 
    created_at: Date, 
    updated_at: Date
 });

ArtifactProductionSchema.index({
    owner: 1, 
    name: 1
 }, {
    unique: true
 })

export type ArtifactProductionModelType = Model<IArtifactProductionModel>;
    // mongoose models creation is centralized
    // the mongodb service calls buildModel() when starting, after connection has been established
    // controllers call ArtifactProductionModel() when initialized, after buildModel() has benn called
    

let ArtifactProductionModel: ArtifactProductionModelType;

export function GetArtifactProductionModel():  ArtifactProductionModelType {

    return ArtifactProductionModel;
}

export const ArtifactProductionModelBuilder: ModelBuilderType = {
    buildModel: () => 
    
        ArtifactProductionModel = model<IArtifactProductionModel>("ArtifactProduction", ArtifactProductionSchema)
    
    
 };
