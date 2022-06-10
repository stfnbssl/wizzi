const express = require('express');
const parseUrl = require('parseurl');
const packiRoute = require('./routes/packiRoute');
const api = require('./api');

const app = express();
const port = 3000;
const packiPath = '/packi/';
const defaultOwner = 'stfnbssl';
const defaultContext = {
    wzConfigBaseUrl: 'http://127.0.0.1:5500/docs'
}

app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));
app.use('/~', packiRoute);

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.get('/', nocache, (req, res) => {
    // console.log(req);
    return res.redirect('/static/webpack/packi/index.html');
    api.getPackiGeneration(defaultOwner, 'html.starter', api.getDefaultContext()).then(result => {
        res.writeHead(200, {
            'Content-Type': result.contentType, 
            'Content-Length': result.contentLength
        })
        res.end(result.content);
    }).catch(err => {
        console.log('err', err.toString());
        return res.send(err.toString()) 
    })
})

app.use(function (req, res, next) {
    /*
    console.log('baseUrl:', req.baseUrl);
    console.log('originalUrl:', req.originalUrl);
    console.log('params:', req.params);
    console.log('query:', req.query);
    */
    const parsedUrl = parseUrl(req);
    const pathname = parsedUrl.pathname;
    console.log('request: pathname', pathname);
    if (pathname.startsWith(packiPath)) {
        const packiName = pathname.substring(packiPath.length);
        console.log('request: packiName', packiName, 'context', req.query.context);
        api.getPackiContext(defaultOwner, req.query.context, api.getDefaultContext()).then(resultContext => {
            console.log('resultContext:', Object.keys(resultContext));
            api.getPackiGeneration(defaultOwner, packiName, resultContext).then(result => {
                console.log('before send:', result.contentType, result.contentLength);
                res.status(200);
                res.set('Content-Type', result.contentType);
                res.set('Content-Length', result.contentLength);
                res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.set('Expires', '-1');
                res.set('Pragma', 'no-cache');
                console.log('after writeHead:');
                res.send(result.content);
                console.log('after send:');
            }).catch(err => {
                console.log('err', err);
                return res.send(err.toString()) 
            })
        }).catch(err => {
            console.log('err', err);
            return res.send(err.toString()) 
        })
    }
    else
        next();
});

app.get('/api/v1/packies/:owner/:search', nocache, (req, res) => {
    console.log('Requesting packi list for owner', req.params.owner);
    const search = req.params.search;
    api.getPackiList(req.params.owner).then(result => {
        const packiList = result.map(item => {
            if (search == '*' || item.name.indexOf(search) > -1) {
                return {
                    _id: item._id,
                    name: item.name,
                    wizziSchema: item.wizziSchema,
                }
            }
        });
        return res.json(packiList);
    }).catch(err => {
        console.log('err', err.toString());
        return res.send(err.toString()) 
    })
})

app.get('/api/v1/packy/:owner/:name', nocache, (req, res) => {
    console.log('Requesting packi by owner/name', req.params.owner + '/' + req.params.name);
    api.getPackiItem_Object_By_Owner_Name(req.params.owner, req.params.name).then(result => {
        return res.json(result);
    }).catch(err => {
        console.log('err', err.toString());
        return res.send(err.toString()) 
    })
})

app.get('/api/v1/packy/:id', nocache, (req, res) => {
    console.log('Requesting packi by id', req.params.id);
    api.getPackiItem_Object_By_Id(req.params.id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.log('err', err.toString());
        return res.send(err.toString()) 
    })
})

app.post('/api/v1/packiitem', (req, res) => {
    const item = req.body;
    console.log('/api/v1/packiitem', item);
    api.savePacki(item.owner, item.name, item.mainIttf, item.schema, item.packiFiles).then(result => {
        return res.json(result);
    }).catch(err=> {
        return res.send(err);
    });
});

app.post('/api/v1/activity/:owner', (req, res) => {
    const items = req.body;
    console.log('post /api/v1/activity', items);
    api.saveUserActivity(req.params.owner, items).then(result => {
        return res.json(result);
    }).catch(err=> {
        return res.send(err);
    });
});

app.get('/api/v1/activity/:id', nocache, (req, res) => {
    console.log('Requesting user activity by id', req.params.id);
    api.getUserActivity(req.params.id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.log('err', err.toString());
        return res.send(err.toString()) 
    })
})

app.get('/api/v1/activity/lastpacki/:id', nocache, (req, res) => {
    console.log('Requesting last packi activity by id', req.params.id);
    api.getLastPackiActivity(req.params.id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.log('err', err.toString());
        return res.send(err.toString()) 
    })
})

api.start(defaultOwner, defaultContext, function(err) {
    if (err) throw err;
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})