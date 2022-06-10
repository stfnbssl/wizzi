/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\gamma\.wizzi\src\state\hooks.js.ittf
    utc time: Mon, 15 Feb 2021 13:37:11 GMT
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
};
