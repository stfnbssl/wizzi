/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\examples\jswizzi\step_2.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:37 GMT
*/
var JsWizziContext = require("../../lib/jswizzi/jsWizziContext");
var ContextData = require("../../lib/jswizzi/contextData");
var contextData = new ContextData(1, "f1");
contextData.setV09(true)
contextData.setFunctionScopesFromAst({
    functions: {
        Sum: [
            "Sum"
        ], 
        alpha: [
            "alpha"
        ], 
        beta: [
            "alpha", 
            "beta"
        ]
     }
 })
contextData.setValue('main', 110)
contextData.enterFunction('alpha')
contextData.setValue('alpha_1', 54)
console.log('get main value:', contextData.getValue('main'))
console.log('get alpha_1 value:', contextData.getValue('alpha_1'))
contextData.enterFunction('beta')
contextData.setValue('beta_1', 598)
console.log('get main value from beta:', contextData.getValue('main'))
console.log('get alpha_1 value from beta:', contextData.getValue('alpha_1'))
console.log('get beta_1 value from beta:', contextData.getValue('beta_1'))
contextData.enterFunction('alpha')
console.log('get beta_1 value from alpha:', contextData.getValue('beta_1'))
contextData.enterFunction(null)
console.log('get main value from main:', contextData.getValue('main'))
console.log('get alpha_1 value from mai:', contextData.getValue('alpha_1'))