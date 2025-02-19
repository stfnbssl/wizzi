/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\examples\meta1\wizzi.meta.config.plugin.app.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/
const path = require('path');
// const minimist = require('minimist')
// const config = require('../src/utils/config')
// const error = require('../src/utils/error')

// const args = minimist(process.argv.slice(2))

module.exports = {
    meta: "meta-plugin-app", 
    metaCtxPath: path.join(__dirname, "ittf", "app.json.ittf"), 
    destPath: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages/wizzi.plugin.app", 
    plugins: [
        "./wizzi.plugin.html/index", 
        "./wizzi.plugin.js/index", 
        "./wizzi.plugin.css/index", 
        "./wizzi.plugin.ittf/index", 
        "./wizzi.plugin.json/index"
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
    metaPlugins: [
        "./wizzi.meta.cloud/index", 
        "./wizzi.meta.commons/index", 
        "./wizzi.meta.docs/index", 
        "./wizzi.meta.documents/index", 
        "./wizzi.meta.js/index", 
        "./wizzi.meta.js.vanilla/index", 
        "./wizzi.meta.js.react/index", 
        "./wizzi.meta.ts/index", 
        "./wizzi.meta.ts.express/index", 
        "./wizzi.meta.ts.react/index", 
        "./wizzi.meta.ts.db/index", 
        "./wizzi.meta.web/index", 
        "./wizzi.meta.wizzi/index"
    ], 
    metaPluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.metas/packages", 
    globalContext: {
        isPackageDeploy: true, 
        isDevelopment: false
     }
 };