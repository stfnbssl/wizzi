/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\site\webpacks\blog\src\api.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import {getData, postData, putData, deleteData} from '../../common/apiFetch';
const apiUrl = 'http://localhost:5000/api/v1';

export function getPostList() {
    return getData(`${apiUrl}/posts`);
}

export function createPost(post) {
    return postData(`${apiUrl}/posts`, {
            data: post
        });
}

export function getPost(id) {
    return getData(`${apiUrl}/posts/${id}`);
}

export function updatePost(id, post) {
    return putData(`${apiUrl}/posts/${id}`, {
            data: post
        });
}

export function deletePost(id) {
    return deleteData(`${apiUrl}/posts/${id}`);
}
