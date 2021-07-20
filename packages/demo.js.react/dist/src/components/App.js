/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\components\App.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:24 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import compose from 'recompose/compose';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
const styles = theme => (
    {
        root: {
            backgroundColor: "#222", 
            color: "#ddd", 
            margin: "50px", 
            padding: "30px"
         }, 
        form: {
            backgroundColor: "#444", 
            padding: "10px"
         }, 
        formControl: {
            
         }
     });

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChangeUserState = (event) => {
    }
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={ classes.root }>
                    <div className={ classes.form }>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="themeName">
                            Theme
                            </InputLabel>
                        
                            <Select onChange={this.handleChangeUserState} inputProps={{
                                name: 'themeName', 
                                id: 'themeName'
                             }}>
                                <MenuItem value="dark">
                                    <em>
                                    Dark
                                    </em>
                                
                                </MenuItem>
                            
                                <MenuItem value="light">
                                    <em>
                                    Light
                                    </em>
                                
                                </MenuItem>
                            
                            </Select>
                        
                        </FormControl>
                    
                    </div>
                
                </div>
            )
        ;
    }
}
App = compose(withStyles(styles))(App)
;
export default App;
