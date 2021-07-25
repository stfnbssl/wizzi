/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\state\middlewares.js.ittf
    utc time: Fri, 23 Jul 2021 09:36:12 GMT
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
