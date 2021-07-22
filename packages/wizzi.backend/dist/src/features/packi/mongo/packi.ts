/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\packi\mongo\packi.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IPackiModel} from "../types";

// mongoose models creation is centralized

// mongodb calls buildModel() when starting, after connection has been established

// controllers call PackiModel() when initialized, after buildModel() has benn called
const PackiSchema: Schema<IPackiModel> = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
     }, 
    repoOwner: String, 
    repoName: String, 
    clonedAt: Date, 
    lastCommitWhenCloned: String
 });
export type PackiModelType = Model<IPackiModel>;
    // mongoose models creation is centralized
    // mongodb calls buildModel() when starting, after connection has been established
    // controllers call PackiModel() when initialized, after buildModel() has benn called
    
let packiModel: PackiModelType;
export function GetPackiModel():  PackiModelType {

    return packiModel;
}
export const PackiModelBuilder: ModelBuilderType = {
    buildModel: () => 
    
        packiModel = model<IPackiModel>("Packi", PackiSchema)
    
    
 };
