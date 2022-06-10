/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\site\webpacks\blog\src\post.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import {createForm} from '../../common/forms.js';
const blogFormData = {
    form: {
        id: "blogPost", 
        title: "Blog post", 
        controls: [
            {
                id: "author", 
                label: "author", 
                type: "text", 
                required: true
            }, 
            {
                id: "title", 
                label: "title", 
                type: "text", 
                required: true
            }
        ]
    }
};
export function mountPostForm(elementId) {
    createForm(blogFormData, elementId)
}
