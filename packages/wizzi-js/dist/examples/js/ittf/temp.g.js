/*
    artifact generator: C:\My\wizzi\wizzi-mono\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\wizzi-mono\packages\wizzi-js\dist\examples\js\ittf\temp.js.ittf
    utc time: Tue, 07 May 2019 18:24:56 GMT
*/
'use strict';
var verify = require('wizzi-helpers').verify;
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
