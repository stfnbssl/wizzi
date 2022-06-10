/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\gamma\.wizzi\src\state\store.js.ittf
    utc time: Mon, 15 Feb 2021 13:37:11 GMT
*/
'use strict';
import React, {createContext, useContext, useReducer, useCallback} from 'react';
import {asyncer, logger} from './middlewares';
import {ITEMS} from './types';
//
// Actions
//
export const itemsActions = {
    addItem: (text) => {
        return {
                type: ITEMS.ADD, 
                payload: text
            };
    }, 
    resetItems: () => {
        return {
                type: ITEMS.RESET
            };
    }, 
    completeItem: (id) => {
        return {
                type: ITEMS.COMPLETE, 
                payload: id
            };
    }
};
//
// Reducers
//
const itemsInitialState = [];
var initialState;
if (!!(window.localStorage.getItem('wr-state'))) {
    initialState = JSON.parse(window.localStorage.getItem('wr-state'));
}
else {
    initialState = {
        items: itemsInitialState
    };
}
export function itemsReducer(state = initialState, action) {
    console.log('store.itemsReducer.state,action', state, action);
    switch (action.type) {
        case ITEMS.RESET: {
            return [];
        }
        case ITEMS.ADD: {
            return [
                    ...state, 
                    {
                        id: Date.now(), 
                        text: action.payload, 
                        completed: false
                    }
                ];
        }
        case ITEMS.COMPLETE: {
            return state.map((item) => {
                    if (item.id === action.payload) {
                        return {
                                ...item, 
                                completed: !item.completed
                            };
                    }
                    return item;
                });
        }
        default: {
            return state;
        }
    }
}
function mainReducer(state, action) {
    // Receiving previous state here
    const {
        items
    } = state;
    // Receiving current state here
    const currentState = {
        items: itemsReducer(items, action)
    };
    // Storage
    window.localStorage.setItem('wr-state', JSON.stringify(currentState))
    // Middlewares
    logger(action, state, currentState);
    return currentState;
}
//
// Global store
//
const GlobalStore = createContext({});
export const useGlobalStore = () =>
    useContext(GlobalStore);
//
// Provider
//
export default function Provider({children}) {
        const [ state, dispatchBase ] = useReducer(mainReducer, initialState);
        console.log('store.Provider.state', state);
        const dispatch = useCallback(asyncer(dispatchBase, state), []);
        return  (
                <GlobalStore.Provider value={{ state, dispatch }}>
                {children}</GlobalStore.Provider>
            )
        ;
    }
