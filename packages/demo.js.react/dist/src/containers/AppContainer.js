/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\containers\AppContainer.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:24 GMT
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
                        <AppRouter />
                            <App />
                            </div>
                        
                        </AppWrapper>
                    )
                ;
            }
            }
        export default AppContainer;
