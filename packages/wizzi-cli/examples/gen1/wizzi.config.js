const path = require('path');
module.exports = {
    wzjobName: "example-gen1-job", 
    wzjobPath: path.join(__dirname, '_wizzi', 'generate.wzjob.ittf'), 
    destPath: path.join(__dirname, 'dist'),
    plugins: [
        "./wizzi.plugin.html/index.js", 
        "./wizzi.plugin.wzjob/index.js", 
        "./wizzi.plugin.wzschema/index.js", 
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
    schemas: [
    ],
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};
