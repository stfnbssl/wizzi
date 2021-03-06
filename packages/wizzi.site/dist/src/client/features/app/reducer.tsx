/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.site\.wizzi\client\src\features\app\reducer.tsx.ittf
    utc time: Tue, 11 May 2021 04:47:43 GMT
*/
import {Reducer} from 'redux';
import {ActionType, getType} from 'typesafe-actions';
import {LoggedUser} from './types';
import * as appActions from './actions';
export interface AppState {
    loggedUser?: LoggedUser;
}
const initialState: AppState = {
    loggedUser: undefined
 };
export type AppAction = ActionType<typeof appActions>;
const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {

    switch (action.type) {
        case getType(appActions.updateLoggedUser): {
            console.log("appActions.updateLoggedUser");
            return {
                    ...state, 
                    loggedUser: action.payload
                 };
        }
        case getType(appActions.loginUserByStoredUidSuccess): {
            console.log("appActions.loginUserByStoredUidSuccess");
            return {
                    ...state, 
                    loggedUser: action.payload
                 };
        }
        default: {
            return state;
        }
    }
}
;
export default reducer;
