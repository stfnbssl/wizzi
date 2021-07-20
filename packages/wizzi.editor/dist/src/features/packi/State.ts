/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\State.ts.ittf
    utc time: Tue, 20 Jul 2021 18:56:25 GMT
*/
import isEqual from 'lodash/isEqual';
import {PackiState} from './types';
export type StateObject<T> = { 
    [key: string]: T;
};
export function addObjects<T>(state: StateObject<T>, content: { 
    [key: string]: T;
}, filter?: (a: T, b: T) => boolean):  StateObject<T> {

    let newState: StateObject<T> | null = null;
    for (const key in content) {
        if (filter ? filter(content[key], state[key]) : !isEqual(content[key], state[key])) {
            newState = newState ?? ({
                ...state
             });
            ;
            newState[key] = content[key];
        }
    }
    return newState ?? state;
}
export function addObject<T>(state: StateObject<T>, key: string, content: T, filter?: (a: T, b: T) => boolean):  StateObject<T> {

    return addObjects(state, {
            [key]: content
         }, filter);
}
export function removeObjects<T>(state: StateObject<T>, keys: string[]):  StateObject<T> {

    if (!keys.length) {
        return state;
    }
    let newState: StateObject<T> | null = null;
    keys.forEach((key) => {
    
        if (state[key]) {
            newState = newState ?? ({
                ...state
             });
            ;
            delete newState[key]
        }
    }
    )
    return newState ?? state;
}
export function removeObject<T>(state: StateObject<T>, key: string):  StateObject<T> {

    return removeObjects(state, [
            key
        ]);
}
export function updateObjects<T>(state: StateObject<T>, content: { 
    [key: string]: T | null;
}, compareFn: (a: T, b: T) => boolean = isEqual):  StateObject<T> {

    let newState: StateObject<T> | null = null;
    for (const key in content) {
        const val = content[key];
        if (val === null) {
            if (state[key]) {
                newState = newState ?? ({
                    ...state
                 });
                ;
                delete newState[key]
            }
        }
        else {
            if (!compareFn(val, state[key])) {
                newState = newState ?? ({
                    ...state
                 });
                ;
                newState[key] = val;
            }
        }
    }
    return newState ?? state;
}
export function isBusy(state: PackiState):  boolean {

    return (true || !!Object.values(state.files).find(file => 
        
            file.type === 'ASSET' && typeof file.contents !== 'string'
        ));
}
export function isCodeChanged(state: PackiState, prevState: PackiState) {

    return (state.files !== prevState.files);
}
export function isUnsaved(state: PackiState, prevState: PackiState) {

    return (state.files !== prevState.files || state.name !== prevState.name || state.description !== prevState.description);
}
