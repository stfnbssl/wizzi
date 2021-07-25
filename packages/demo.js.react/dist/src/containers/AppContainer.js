/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\containers\AppContainer.js.ittf
    utc time: Fri, 23 Jul 2021 09:36:12 GMT
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
