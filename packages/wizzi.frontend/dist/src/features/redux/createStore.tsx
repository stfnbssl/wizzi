/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.frontend\.wizzi\src\features\redux\createStore.tsx.ittf
    utc time: Sat, 01 May 2021 05:18:20 GMT
*/
import isEqual from 'lodash/isEqual';
import {createStore, combineReducers} from 'redux';

function viewer(state: any = null, action: any) {

    switch (action.type) {
        case 'UPDATE_VIEWER': {
            return isEqual(state, action.viewer) ? state : action.viewer;
        }
        default: {
            return state;
        }
    }
}

function splitTestSettings(state: any = {}, action: any) {

    switch (action.type) {
        default: {
            return state;
        }
    }
}

export default function createStoreWithPreloadedState(state: any) {
    
        return createStore(combineReducers({
                viewer, 
                splitTestSettings
             }), state);
    }
