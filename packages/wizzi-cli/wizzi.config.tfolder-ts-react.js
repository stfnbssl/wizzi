const path = require('path');
module.exports = {
    wfjobName: "wizzi-cli/metaproductions/tfolder-ts-react",
    wfjobPath: path.join(__dirname, '.wizzi', 'metaprods', 'tfolder-ts-react', 'generate.wfjob.ittf'), 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    globalContext: {
        isPackageDeploy: false,
        wzConfigIsDevelopment: true,
    },
};