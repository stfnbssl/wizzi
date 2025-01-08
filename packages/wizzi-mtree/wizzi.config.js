const path = require('path');
module.exports = {
    wzjobName: "wizzi-mtree-job", 
    wzjobPath: path.join(__dirname, '.wizzi', 'generate.wzjob.ittf'), 
    plugins: [
        "@wizzi/plugin.css", 
        "@wizzi/plugin.html", 
        "@wizzi/plugin.ittf", 
        "@wizzi/plugin.js", 
        "@wizzi/plugin.json", 
        "@wizzi/plugin.md", 
        "@wizzi/plugin.text", 
        "@wizzi/plugin.wzjob", 
        "@wizzi/plugin.wzschema", 
    ], 
    /*
    plugins: [
        "./wizzi.plugin.js/index.js", 
        "./wizzi.plugin.json/index.js", 
        "./wizzi.plugin.md/index.js", 
        "./wizzi.plugin.text/index.js", 
        "./wizzi.plugin.wzjob/index.js", 
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.lastsafe.plugins/packages", 
    */
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: true
    },
    globalContext_default: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};