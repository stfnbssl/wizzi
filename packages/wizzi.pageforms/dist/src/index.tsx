/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\index.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import cookies from 'js-cookie';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from './components/App';
import NonExistent from './components/NonExistent';
import ThemeProvider from './components/ThemeProvider';
declare const __INITIAL_DATA__: { 
    data: any;
    queryParams: any;
};

function AppContainer(props: any) {

    const {
        data, 
        ...rest
     } = props;
    if (data && data.type === 'success') {
        const appProps = {
            ...props, 
            ...rest, 
            query: props.queryParams, 
            formName: data.formName, 
            formData: data.formData
         };
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
function PageFormsApp() {

    return  (
        <React.Fragment
        >
            <HelmetProvider
            >
                <ThemeProvider
                >
                    <AppContainer
                     data={__INITIAL_DATA__.data} queryParams={__INITIAL_DATA__.queryParams} />
                </ThemeProvider>
            </HelmetProvider>
        </React.Fragment>
        )
    ;
}
ReactDOM.render(
<PageFormsApp
 />
, document.getElementById('root'))
