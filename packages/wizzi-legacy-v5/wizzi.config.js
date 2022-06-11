const path = require('path');
module.exports = {
    wfjobName: "wizzi-legacy-v5 job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};