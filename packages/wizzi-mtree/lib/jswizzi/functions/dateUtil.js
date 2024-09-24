/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\functions\dateUtil.js.ittf
    utc time: Sat, 21 Sep 2024 13:05:08 GMT
*/
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