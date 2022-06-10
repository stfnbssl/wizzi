const express = require('express');

const app = express();

const githubClientId = 'OMITTED';
const githubClientSecret = 'OMITTED';

app.get('/', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${githubClientId}`);
});

app.listen(3000);
console.log('App listening on port 3000');