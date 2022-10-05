const path = require('path');
module.exports = {
    wfjobName: "wizzi-tools/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
        isDocumentation: true,
    },
    globalContext_default: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};