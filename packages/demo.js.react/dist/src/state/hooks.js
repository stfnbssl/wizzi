/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\state\hooks.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:24 GMT
*/
'use strict';
import {useGlobalStore, itemsActions} from './store';
import bindActions from './bindActions';
//
// useItems Custom Hook
//
export const useItems = () => {

    const {
        state, 
        dispatch
     } = useGlobalStore();
    // List of Props
    const {
        items
     } = state;
    // List of Actions
    const {
        addItem, 
        resetItems, 
        completeItem
     } = itemsActions;
    // Bind Actions
    const boundItemsActions = bindActions({
        addItem, 
        resetItems, 
        completeItem
     }, dispatch);
    return {
            items, 
            ...boundItemsActions
         };
}
;
