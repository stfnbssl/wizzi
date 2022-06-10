const path = require('path');
module.exports = {
    wfjobName: "example-gen1-job", 
    wfjobPath: path.join(__dirname, '_wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'dist'),
    plugins: [
        './wizzi-core/dist/index.js', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    pluginsBaseFolder: path.join(__dirname, '..', '..', '..', '..'),
    schemas: [
        "sample"
    ],
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};