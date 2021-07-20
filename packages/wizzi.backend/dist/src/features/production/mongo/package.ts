/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\mongo\package.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IPackageProductionModel} from "../types";

const PackageProductionSchema: Schema<IPackageProductionModel> = new Schema({
    owner: String, 
    name: String, 
    description: String, 
    sdkVersion: String, 
    packiFiles: String, 
    created_at: Date, 
    updated_at: Date
 });

PackageProductionSchema.index({
    owner: 1, 
    name: 1
 }, {
    unique: true
 })

export type PackageProductionModelType = Model<IPackageProductionModel>;
    // mongoose models creation is centralized
    // the mongodb service calls buildModel() when starting, after connection has been established
    // controllers call PackageProductionModel() when initialized, after buildModel() has benn called
    

let PackageProductionModel: PackageProductionModelType;

export function GetPackageProductionModel():  PackageProductionModelType {

    return PackageProductionModel;
}

export const PackageProductionModelBuilder: ModelBuilderType = {
    buildModel: () => 
    
        PackageProductionModel = model<IPackageProductionModel>("PackageProduction", PackageProductionSchema)
    
    
 };
