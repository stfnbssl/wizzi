/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\functions\dateUtil.js.ittf
    utc time: Thu, 11 Jan 2024 15:48:37 GMT
*/
'use strict';
// legacy function container
// these now merged into underscore container
module.exports = {
    now_GMYHMS: function() {
        var date = new Date();
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();
    }, 
    GMYHMS: function(date) {
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();
    }, 
    GMYHM: function(date) {
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes()
    }, 
    GMY: function(date) {
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear()
    }
 };
