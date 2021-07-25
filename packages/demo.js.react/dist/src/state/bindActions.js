/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\state\bindActions.js.ittf
    utc time: Fri, 23 Jul 2021 09:36:12 GMT
*/
'use strict';
export default function bindActions(actions, dispatch) {
        const bindAction = (action, dispatch) => {
        
            return function() {
                    return dispatch(action.apply(null, arguments));
                };
        }
        ;
        // if it's a single action
        if (typeof actions === 'function') {
            return bindAction(actions, dispatch);
        }
        if (typeof actions !== 'object' || actions === null) {
            throw new Error(`bindActions expected an object or a function, instead received${
                actions === null
                 ? 'null'
                 : typeof actions}
                .`);
        }
        const boundActions = {};
        for (var key in actions) {
            const action = actions[key];
            if (typeof action === 'function') {
                boundActions[key] = bindAction(action, dispatch);
            }
        }
        return boundActions;
    }
