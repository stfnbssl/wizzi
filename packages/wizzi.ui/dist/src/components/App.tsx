/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\src\components\App.tsx.ittf
    utc time: Fri, 24 Jun 2022 16:36:04 GMT
*/
import React, {FunctionComponent} from 'react';

import logo from './logo.svg';
import './App.css';
import {WidgetsDemo} from './widgets/demo';

export interface AppProps {
}

export const App: FunctionComponent<AppProps> = () => {

    return  (
        <div
         className="App">
            <header
             className="App-header">
                <img
                 src={logo.toString()} className="App-logo" alt="logo" />
                <p
                >
                    Edit
                    <code
                    >
                        src/App.tsx
                    </code>
                    and save to reload.
                </p>
                <a 
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <section
            >
                <WidgetsDemo
                 title="Some example widgets" />
            </section>
        </div>
        )
    ;
}
;
export default App;
