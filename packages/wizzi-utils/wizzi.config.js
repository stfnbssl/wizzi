const path = require('path');
module.exports = {
    wfjobName: "wizzi-utils/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isBrowserTarget: false,
        isWizziUtilsPackage: true,
        isDevelopment: false,
    },
    globalContext_default: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isBrowserTarget: false,
        isWizziUtilsPackage: true,
        isDevelopment: false,
    },
    globalContext_browser: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isBrowserTarget: true,
        isWizziUtilsPackage: true,
        isDevelopment: false,
    }
};