/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\store\createStore.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {StoreState} from './types';
import {createRootReducer} from './reducers';
import {createRootSaga} from './sagas';

export default function createStoreWithPreloadedState(preloadedState: StoreState) {
    
        console.log('createStoreWithPreloadedState', 'preloadedState', preloadedState);
        let composeEnhancer: typeof compose;
        if (typeof window !== 'undefined') {
            composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        }
        else {
            composeEnhancer = compose;
        }
        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(createRootReducer(), preloadedState, composeEnhancer(applyMiddleware(sagaMiddleware)));
        let sagaTask = sagaMiddleware.run(createRootSaga());
        
        // Hot reloading
        if (module.hot) {
            const newCreateRootReducer = require('./reducers');
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers', () => 
            
                store.replaceReducer(newCreateRootReducer())
            )
            // Enable Webpack hot module replacement for sagas
            module.hot.accept('./sagas', () => {
            
                const newCreateRootSaga = require('./sagas');
                // FIXME https://github.com/GuillaumeCisco/redux-sagas-injector/blob/master/src/redux-sagas-injector.js
                sagaTask.cancel();
                
                // FIXME https://github.com/GuillaumeCisco/redux-sagas-injector/blob/master/src/redux-sagas-injector.js
                sagaTask = sagaMiddleware.run(newCreateRootSaga());
            }
            )
        }
        return store;
    }
