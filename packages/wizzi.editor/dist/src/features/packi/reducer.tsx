/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\reducer.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {Reducer} from 'redux';
import {ActionType, getType} from 'typesafe-actions';
import {Packi} from './types';
import * as packiActions from './actions';
import {mixPreviousAndGeneratedPackiFiles} from '../file/convertFileStructure';
export interface PackiState {
    loading: boolean;
    errors?: string;
    packiNames?: string[];
    packiTemplateNames?: string[];
    generatedArtifactContent?: string;
}
const initialState: PackiState = {
    loading: false, 
    errors: undefined, 
    packiNames: undefined, 
    packiTemplateNames: undefined, 
    generatedArtifactContent: undefined
 };
export type PackiAction = ActionType<typeof packiActions>;
const reducer: Reducer<PackiState, PackiAction> = (state = initialState, action) => {

    switch (action.type) {
        case getType(packiActions.fetchPackiListRequest): {
            console.log("packiActions.fetchPackiListRequest");
            return {
                    ...state, 
                    loading: true
                 };
        }
        case getType(packiActions.fetchPackiListSuccess): {
            console.log("packiActions.fetchPackiListSuccess", action);
            return {
                    ...state, 
                    loading: false, 
                    packiNames: action.payload.packiNames
                 };
        }
        case getType(packiActions.fetchPackiListError): {
            console.log("packiActions.fetchPackiListError", action);
            return {
                    ...state, 
                    loading: false, 
                    errors: action.payload
                 };
        }
        case getType(packiActions.initPackiRequest): {
            console.log("packiActions.initPackiRequest");
            return {
                    ...state, 
                    loading: true
                 };
        }
        case getType(packiActions.initPackiSuccess): {
            console.log("packiActions.initPackiSuccess");
            return {
                    ...state, 
                    loading: false
                 };
        }
        case getType(packiActions.initPackiError): {
            console.log("packiActions.initPackiRequest");
            return {
                    ...state, 
                    loading: false
                 };
        }
        case getType(packiActions.savePackiSuccess): {
            console.log("packiActions.savePackiSuccess", action);
            return {
                    ...state, 
                    currentPacki: {
                        id: action.payload.id, 
                        files: action.payload.packiEntryFiles
                     }
                 };
        }
        case getType(packiActions.fetchPackiTemplateListRequest): {
            console.log("packiActions.fetchPackiTemplateListRequest");
            return {
                    ...state, 
                    loading: true
                 };
        }
        case getType(packiActions.fetchPackiTemplateListSuccess): {
            console.log("packiActions.fetchPackiTemplateListSuccess", action);
            return {
                    ...state, 
                    loading: false, 
                    packiTemplateNames: action.payload.packiNames
                 };
        }
        case getType(packiActions.fetchPackiTemplateListError): {
            console.log("packiActions.fetchPackiTemplateListError", action);
            return {
                    ...state, 
                    loading: false, 
                    errors: action.payload
                 };
        }
        case getType(packiActions.executeJobSuccess): {
            console.log("packiActions.executeJobSuccess", action);
            const newPacki = {
                ...state.currentPacki, 
                files: mixPreviousAndGeneratedPackiFiles(action.payload.previousArtifacts, action.payload.generatedArtifacts)
             };
            console.log("packiActions.executeJobSuccess.newPacki", newPacki);
            if (!action.payload.error) {
                return {
                        ...state, 
                        currentPacki: {
                            ...state.currentPacki, 
                            files: mixPreviousAndGeneratedPackiFiles(action.payload.previousArtifacts, action.payload.generatedArtifacts)
                        } as Packi
                     };
            }
            else {
                return state;
            }
        }
        default: {
            return state;
        }
    }
}
;
export default reducer;
