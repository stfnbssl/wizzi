const path = require('path');
module.exports = {
    wfjobName: "wizzi-cli/metaproductions/js",
    wfjobPath: path.join(__dirname, '.wizzi', 'metaprods', 'js', 'generate.wfjob.ittf'), 
    plugins: [
        './wizzi-core/dist/index.js', 
        './wizzi-js/dist/index.js', 
        './wizzi-web/dist/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    globalContext: {
        isPackageDeploy: false,
        wzConfigIsDevelopment: true,
    },
};