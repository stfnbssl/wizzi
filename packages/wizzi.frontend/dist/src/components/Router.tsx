/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.frontend\.wizzi\src\components\Router.tsx.ittf
    utc time: Sat, 01 May 2021 05:18:20 GMT
*/
import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import type {RouterData, QueryParams} from '../features/packi';
import App from './App';
import NonExistent from './NonExistent';
type Props = { 
    data: RouterData;
    queryParams: QueryParams;
    userAgent: string;
};
export default class Router extends React.Component<Props> {
        _renderRoute = (props: any) => {
            const {
                data, 
                ...rest
             } = this.props;
            if (data && data.type === 'success') {
                const appProps = {
                    ...props, 
                    ...rest, 
                    query: this.props.queryParams, 
                    packi: data.packi, 
                    defaults: data.defaults
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
        };
        render() {
            return  (
                <Switch
                >
                    <Route
                     exact path="/@:username/:projectName+" render={this._renderRoute} />
                    <Route
                     exact path="/:id" render={this._renderRoute} />
                    <Route
                     exact path="/" render={this._renderRoute} />
                    <Route
                     component={NonExistent} />
                </Switch>
                )
            ;
        }
    }
