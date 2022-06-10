var express = require('express')
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var jsesc = require('jsesc')
var api = require('../../../packi/api');
var {PackiItemList} = require('../components/PackiItemList');

var router = express.Router()
router.get('/:username', function (req, res) {
    api.getPackiList(req.params.username).then(list=>{
        const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
            <body><PackiItemList items={list} /></body>
        ));
        res.set('Content-Type', 'text/html');
        res.set('Content-Length', index.length);
        res.send(index)
    }).catch(err =>{
        console.log('err', err);
        return res.json(err) 
    })
})

module.exports = router