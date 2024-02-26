const path = require('path');
module.exports = {
    wfjobName: "wizzi-utils/job", 
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
        isWizziUtilsPackage: true,
        isDevelopment: false,
        wzCtx_useScanner: true,
        wzCtx_useCrypto: true,
    },
    globalContext_default: {
        isPackageDeploy: true,
        isWizziUtilsPackage: true,
        isDevelopment: false,
    },
};