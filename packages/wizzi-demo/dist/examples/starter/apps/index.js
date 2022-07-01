/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-demo\.wizzi\examples\starter\apps\index.js.ittf
*/
'use strict';
function exec(callback) {
    console.log('The starter/apps demo is not implemented yet');
    if (callback) {
        callback(null, 'Starter-apps examples not executed')
    }
}
module.exports = function(callback) {
    exec(callback);
}
;
if (require.main === module) {
    exec();
}
