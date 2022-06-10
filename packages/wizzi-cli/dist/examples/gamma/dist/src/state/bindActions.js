/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\gamma\.wizzi\src\state\bindActions.js.ittf
    utc time: Mon, 15 Feb 2021 13:37:11 GMT
*/
'use strict';
export default function bindActions(actions, dispatch) {
        const bindAction = (action, dispatch) => {
            return function() {
                    return dispatch(action.apply(null, arguments));
                };
        };
        // if it's a single action
        if (typeof actions === 'function') {
            return bindAction(actions, dispatch);
        }
        if (typeof actions !== 'object' || actions === null) {
            throw new Error(`bindActions expected an object or a function, instead receivedactions === null ? 'null' : typeof actions.`);
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
