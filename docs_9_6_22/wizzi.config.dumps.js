const path = require('path');
module.exports = {
    wfjobName: "wizzi/docs/dumps/job",
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.dumps.wfjob.ittf'),
    destPath: path.join(__dirname),
    plugins: [
        './wizzi-core/dist/index.js', 
        './wizzi-js/dist/index.js', 
        './wizzi-web/dist/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..', 'packages'),
    schemas: [
    ],
    globalContext: {
        wzConfigIsPackageDeploy: true,
        wzConfigIsDevelopment: false,
        wzConfigBaseUrl: 'http://127.0.0.1:5500/docs'
    },
};