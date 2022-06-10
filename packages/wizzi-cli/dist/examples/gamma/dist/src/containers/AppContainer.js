/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\gamma\.wizzi\src\containers\AppContainer.js.ittf
    utc time: Mon, 15 Feb 2021 13:37:11 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import AppRouter from './AppRouter';
import App from '../components/app';
import Provider from '../state/store';
const AppWrapper = Provider;


class AppContainer extends React.Component {
    handleChangeUserState = (name, value) => {
    }
    render() {
        return  (
                <AppWrapper>
                    <div id="main">
                        <AppRouter>
                        </AppRouter>
                    
                        <App>
                        </App>
                    
                    </div>
                
                </AppWrapper>
            )
        ;
    }
    }
export default AppContainer;
