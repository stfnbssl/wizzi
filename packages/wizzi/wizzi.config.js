const path = require('path');
module.exports = {
    wfjobName: "wizzi/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        "./wizzi.plugin.js/index.js", 
        "./wizzi.plugin.json/index.js", 
        "./wizzi.plugin.md/index.js", 
        "./wizzi.plugin.text/index.js", 
        "./wizzi.plugin.wzjob/index.js", 
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.lastsafe.plugins/packages", 
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
    },
    globalContext_default: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
    },
    globalContext_webpack: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isDevelopment: false,
    },
};