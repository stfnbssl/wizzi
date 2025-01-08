const path = require('path');
module.exports = {
    wzjobName: "example-gen1-job", 
    wzjobPath: path.join(__dirname, '_wizzi', 'generate.wzjob.ittf'), 
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