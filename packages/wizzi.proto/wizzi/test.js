const wizziProds = require('./productions');

wizziProds.generateArtifact('index.html.ittf', {
    ['index.html.ittf']: {
        type: 'CODE',
        contents: 'html\n    body\n        p Hello'
    }
}).then(result => {
    console.log(result);
});