/*
    artifact generator: C:\My\wizzi\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi\packages\wizzi-js\dist\examples\ittf\jss\temp.js.ittf
    utc time: Fri, 07 Jun 2019 11:08:15 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
function sayHello(name) {
    if (verify.isNotEmpty(name) === false) {
        return error(
            'InvalidArgument', 'sayHello', { parameter: 'name', message: 'The name parameter must be a string. Received: ' + name }
        );
    }
    console.log('Hello', name);
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
