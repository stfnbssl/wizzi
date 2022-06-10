/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi/packages/wizzi-cli/dist/resources/create/templates/gatsby/__dot__wizzi/src/pages/404.js.ittf
    utc time: Mon, 15 Feb 2021 19:39:36 GMT
*/
'use strict';
import * as React from "react";
import {Link} from "gatsby";
// styles
const pageStyles = {
    color: "#232129", 
    padding: "96px", 
    fontFamily: "-apple-system, Roboto, sans-serif, serif"
};
const headingStyles = {
    marginTop: 0, 
    marginBottom: 64, 
    maxWidth: 320
};
const paragraphStyles = {
    marginBottom: 48
};
const codeStyles = {
    color: "#8A6534", 
    padding: 4, 
    backgroundColor: "#FFF4DB", 
    fontSize: "1.25rem", 
    borderRadius: 4
};
// markup
const NotFoundPage = () => {
    return  (
            <main style={pageStyles}>
                <title>
                Not found</title>
            
                <h1 style={headingStyles}>
                Page not found</h1>
            
                <p style={paragraphStyles}>
                Sorry{" "}<span role="img" aria-label="Pensive emoji">
                    😔</span>
                
                {" "}we couldn’t find what you were looking for.<br>
                    </br>
                
                {
                    process.env.NODE_ENV === "development" ?  (
                            <React.Fragment>
                                <br>
                                </br>
                            
                            Try creating a page in<code style={codeStyles}>
                                src/pages/</code>
                            
                            .<br>
                                </br>
                            
                            </React.Fragment>
                        )
                     : null
                }<br>
                    </br>
                
                    <Link to="/">
                    Go home</Link>
                
                .</p>
            
            </main>
        )
    ;
};
export default NotFoundPage;
