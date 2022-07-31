const path = require('path');
module.exports = {
    wfjobName: "wizzi-lab-job",
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname),
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    schemas: [
        // 'temp',
        // 'raml',
        // 'rdbms',
        // 'regexp',
        'py',
    ],
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
    },
};