/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\containers\MuiThemeContainer.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:24 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import AppContainer from './AppContainer';
// A custom theme.  It's optional.
const theme = createMuiTheme({
    palette: {
        primary: {
            light: green[300], 
            main: green[500], 
            dark: green[700]
         }, 
        secondary: {
            light: orange[300], 
            main: orange[500], 
            dark: orange[700]
         }, 
        type: 'dark'
     }
 });
class MuiThemeContainer extends React.Component {
    render() {
        const dark = false;
        return  (
                <MuiThemeProvider theme={theme}>
                    <AppContainer />
                    </MuiThemeProvider>
                )
            ;
        }
    }
    export default MuiThemeContainer;
