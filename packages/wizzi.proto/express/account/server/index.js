import path from 'path';
import express from 'express';
import * as queryString from "query-string";
import {SessionMiddleware} from './middlewares/session'
import axios from 'axios';
import {config} from './config/index';
import api from '../../packi/api';  

console.log('Config', JSON.stringify(config,null,2));
const defaultOwner = 'stfnbssl';

const app = express();
SessionMiddleware(app);
app.set('views', path.join(__dirname, './views')); 
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log('route /', 'req.session', req.session);
    res.render('index', { title: 'Express - account', message: 'Hello there!' })
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { title: 'Express - account - dashboard' })
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Express - account - login' })
});

app.get('/login/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.githubClientId}`);
});

let github_access_token = null;
app.get('/api/v1/authenticate/github/callback', (req, res) => {
    const body = {
        client_id: config.githubClientId,
        client_secret: config.githubClientSecret,
        code: req.query.code
    };
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
        then(res => {
            console.log('github/callback:', JSON.stringify(res.data,null,2));
            return res.data['access_token']
        }).
        then(_token => {
            console.log('My token:', _token);
            github_access_token = _token;
            // res.json({ ok: 1 });
            res.redirect('/profile/github');
        }).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/profile/github', function(req, res) {
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            Authorization: 'token ' + github_access_token
        }
    }).then((response) => {
        // res.json({ userData: response.data });
        req.session.user = response.data;
        res.send('<pre><code>' +  JSON.stringify({ userData: response.data }, null, 2) + '</code></pre>')
    })
});

app.get('/login/google', (req, res) => {
    const queryParams = queryString.stringify({
        client_id: config.googleClientId, // It must correspond to what we declared earlier in the backend
        scope: "email profile", // This is the user data you have access to, in our case its just the mail.
        redirect_uri: 'http://localhost:5000/api/v1/authenticate/google/callback', // This is the uri that will be redirected to if the user signs into his google account successfully
        nonce: "gartps", // 
        response_type: "code" // This tells Google to append code to the response which will be sent to the backend which exchange the code for a token
    });    
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
});

let google_access_token = null;
app.get('/api/v1/authenticate/google/callback', (req, res) => {
    const body = {
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        code: req.query.code,
        redirect_uri: 'http://localhost:5000/api/v1/authenticate/google/callback',
        grant_type: 'authorization_code'
    };
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://oauth2.googleapis.com/token`, body, opts).
        then(res => {
            console.log('google/callback:', JSON.stringify(res.data,null,2));
            return res.data['access_token']
        }).
        then(_token => {
            console.log('My token:', _token);
            google_access_token = _token;
            // res.json({ ok: 1 });
            res.redirect('/profile/google');
        }).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/profile/google', function(req, res) {
    axios({
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v2/userinfo`,
        headers: {
            Authorization: 'Bearer ' + google_access_token
        }
    }).then((response) => {
        // res.json({ userData: response.data });
        req.session.user = response.data;
        res.send('<pre><code>' +  JSON.stringify({ userData: response.data }, null, 2) + '</code></pre>')
    })
});

app.get('/logoff', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

app.get('/user/checkusername/:username', function(req, res) {
    api.validateUsername(req.params.username).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
}

api.start(defaultOwner, {}, function(err) {
    if (err) throw err;
    console.log('Packi api started');
    app.listen(config.port, () => {
        console.log(`Example app listening at http://localhost:${config.port}`)
    });
})
