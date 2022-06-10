import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
// const packiEditMiddleWare = require('./middlewares/packiEdit');
const packiRoute = require('./routes/packiRoute');
const wizziRoute = require('./routes/wizziRoute');
var api = require('../../packi/api');

const defaultOwner = 'stfnbssl';
const defaultContext = {
    wzConfigBaseUrl:  'http://127.0.0.1:5500/docs'
}

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();
console.log('__dirname', __dirname);
// console.log('$dirname', $dirname);
console.log('static folder', __dirname + '/../client-build');
app.use('/static', express.static(__dirname + '/../client-build'));

app.get('/', (req, res) => {
    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
        <App id={'Bye'} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length);
    res.send(index)

});
  
app.use('/~', packiRoute);
app.use('', wizziRoute);

api.start(defaultOwner, defaultContext, function(err) {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    });
})
