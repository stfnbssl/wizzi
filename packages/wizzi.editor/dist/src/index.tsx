/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\index.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import cookies from 'js-cookie';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from './components/App';
import NonExistent from './components/NonExistent';
import {PreferencesProvider} from './features/preferences';
import ThemeProvider from './components/ThemeProvider';
import createStore from './store/createStore';
import type {RouterData, QueryParams} from './features/packi';
declare const __INITIAL_DATA__: { 
    data: any;
    loggedUser: any;
    queryParams: any;
};

const store = createStore({
    packi: {
        loading: false
     }, 
    wizzi: {
        loading: false, 
        jobError: undefined, 
        generatedArtifact: undefined, 
        mTreeBuildUpScript: undefined, 
        mTreeIttf: undefined, 
        jobGeneratedArtifacts: {
            
         }, 
        timedServices: {
            
         }
     }
 });

function AppContainer(props: any) {

    const {
        data, 
        ...rest
     } = props;
    if (data && data.type === 'success') {
        const appProps = {
            ...props, 
            ...rest, 
            packi: data.packi, 
            defaults: data.defaults
         };
        console.log('index.data.loggedUser', data.loggedUser);
        return  (
            <App
             {...appProps} />
            )
        ;
    }
    else {
        return  (
            <NonExistent
             />
            )
        ;
    }
}
function PackiApp() {

    return  (
        <React.Fragment
        >
            <HelmetProvider
            >
                <Provider
                 store={store}>
                    <PreferencesProvider
                     cookies={cookies}>
                        <ThemeProvider
                        >
                            <AppContainer
                             data={window.__INITIAL_DATA__.data} loggedUser={window.__INITIAL_DATA__.loggedUser} queryParams={window.__INITIAL_DATA__.queryParams} />
                        </ThemeProvider>
                    </PreferencesProvider>
                </Provider>
            </HelmetProvider>
        </React.Fragment>
        )
    ;
}
ReactDOM.render(
<PackiApp
 />
, document.getElementById('root'))
