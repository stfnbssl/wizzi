/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\store\types.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {PackiState} from '../features/packi/reducer';
import {WizziState} from '../features/wizzi/reducer';
//
export type StoreState = { 
    packi: PackiState;
    wizzi: WizziState;
};
//
export interface ResponsePayload {
    message?: string;
    error?: { 
        [k: string]: any;
    };
}
