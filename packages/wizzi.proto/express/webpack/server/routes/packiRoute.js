var express = require('express')
var React = require('react');
var router = express.Router()
var ReactDOMServer = require('react-dom/server');
var jsesc = require('jsesc')
var api = require('../../../packi/api');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', function (req, res) {
    render(req, res);
})

// define the about route
router.get('/:id', function (req, res) {
    renderBy_id(req, res);
})

router.get('/:username/:name', function (req, res) {
    console.log('req.path', req.path)
    renderBy_owner_name(req, res);
})

router.get('/:username/:name/*', function (req, res) {
    console.log('req.path', req.path)
    renderBy_owner_name(req, res);
})

function renderBy_id(req, res) {
    api.getPackiItem_Object_By_Id(req.params.id).then(result => {
        renderPackiEditor(req, res, result);
    }).catch(err => {
        console.log("renderBy_id.err", err)
        return res.json(err) 
    })
}

function renderBy_owner_name(req, res) {
    const parts = req.path.split('/');
    api.getPackiItem_Object_By_Owner_Name(parts[1], parts.slice(2).join('/')).then(result => {
        renderPackiEditor(req, res, result);
    }).catch(err => {
        console.log("renderBy_owner_name.err", err)
        return res.json(err) 
    })
}

function renderPackiEditor(req, res, packiItemObject) {
    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
        <Document 
            id={req.params.id} 
            username={req.params.username}
            name={req.params.name}
            data={packiItemObject}
        />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length);
    console.log("renderPackiEditor.before sending", index.length)
    res.send(index)
    console.log("renderPackiEditor.after sending")
}

function render(req, res) {
    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
        <Document 
            id={req.params.id} 
            username={req.params.username}
            name={req.params.name}
        />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length);
    res.send(index)
}

const Document = (props) => (
    <html>
        <head>
            <script dangerouslySetInnerHTML={{
                                __html: `
                window.__INITIAL_DATA__ = ${jsesc(
                    props.data 
                , {
                    quotes: 'double', 
                    isScriptContext: true
                })} `
            }} />
        </head>
        <body>
            <h1>{'Hello ' + props.id + '/' + props.username + '/' + props.name}</h1>
            <pre><code>{JSON.stringify(props.data, null, 2)}</code></pre>
            <section id="index"></section>
            <script src="/static/index.js"></script>
        </body>
    </html>
);

module.exports = router