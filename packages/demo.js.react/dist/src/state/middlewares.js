/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\state\middlewares.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:24 GMT
*/
'use strict';
export const asyncer = (dispatch, state) => action => 
    
        typeof action === 'function' ? action(dispatch, state) : dispatch(action)
;
export const logger = (action, prevState, currentState) => {

    console.groupCollapsed('Logger');
    console.log('%c Action:', 'color: blue', action);
    console.log('%c Previous State:', 'color: red', prevState);
    console.log('%c Current State:', 'color: green', currentState);
    console.groupEnd();
}
;
