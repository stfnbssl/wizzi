var express = require('express')
var router = express.Router()

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
    render(req, res);
})

router.get('/:username/:name', function (req, res) {
    render(req, res);
})

function render(req, res) {
    let index = '<html><h1>Hello ' + req.params.id + '/' + req.params.username + '/' + req.params.name + '</h1></html>'
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length);
    res.send(index)

}
module.exports = router