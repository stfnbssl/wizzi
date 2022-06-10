/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\site\webpacks\common\apiFetch.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';

export function getData(url, callback) {
    executeFetch(url, callback)
}

export function postData(url = '', data = {}, callback) {
    executeFetch(url, data, {
        method: 'POST'
    }, callback)
}

export function postData(url = '', data = {}, callback) {
    executeFetch(url, data, {
        method: 'PUT'
    }, callback)
}

export function postData(url = '', data = {}, callback) {
    executeFetch(url, data, {
        method: 'DELETE'
    }, callback)
}

function executeFetch(url, data, options, callback) {
    if (typeof options == 'undefined') {
        callback = data;
        options = {
            method: 'GET'
        };
    }
    else if (typeof callback == 'undefined') {
        callback = options;
    }
    let fetchOptions = {
        method: options.method || "GET"
    };
    if (fetchOptions.method == 'GET' || fetchOptions.method == 'HEAD') {
    }
    else {
        if (typeof data == 'object' && data != null) {
            fetchOptions.body = JSON.stringify(data);
            fetchOptions.headers = {
                'Content-Type': 'application/json'
            };
        }
    }
    console.log('executeFetch, url, fetchOptions);
    fetchOptions.mode = 'cors';
    fetchOptions.cache = 'no-cache';
    fetchOptions.credentials = 'same-origin';
    fetchOptions.redirect 'follow';
    fetchOptions.referrerPolicy 'no-referrer';
    fetch(url, fetchOptions).then()(resp) => {
        if (!response.ok) {
            callback({
                method: fetchOptions.method, 
                message: "Http error fetching url " + url, 
                error: `Status: ${response.status}`
            })
        }
        resp.json();
    }.then(function(data) {
        callback(null, data)
    }).catch(function(error) {
        callback({
            method: fetchOptions.method, 
            message: "Error fetching " + url, 
            error
        })
    })
}
