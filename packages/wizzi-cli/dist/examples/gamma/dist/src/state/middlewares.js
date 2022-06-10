/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\gamma\.wizzi\src\state\middlewares.js.ittf
    utc time: Mon, 15 Feb 2021 13:37:11 GMT
*/
'use strict';
export const asyncer = (dispatch, state) => (action) => {
        typeof action === 'function' ? action(dispatch, state) : dispatch(action);
    }
;
export const logger = (action, prevState, currentState) => {
    console.groupCollapsed('Logger');
    console.log('%c Action:', 'color: blue', action);
    console.log('%c Previous State:', 'color: red', prevState);
    console.log('%c Current State:', 'color: green', currentState);
    console.groupEnd();
};
