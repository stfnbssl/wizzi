/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\components\App.js.ittf
    utc time: Fri, 23 Jul 2021 09:36:12 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
const compose = (...funcs) => 

    funcs.reduce((a, b) => (...args) => 
        
            a(b(...args))
    , arg => 
    
        arg
    )
;
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
