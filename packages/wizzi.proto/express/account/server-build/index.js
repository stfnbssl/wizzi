/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./express/account/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./express/account/server/config/env.js":
/*!**********************************************!*\
  !*** ./express/account/server/config/env.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return create; });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var envalid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! envalid */ \"envalid\");\n/* harmony import */ var envalid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(envalid__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction validateEnv() {\n  dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();\n  var checkedEnv = Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"cleanEnv\"])(process.env, {\n    PORT: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"port\"])(),\n    SESSION_SECRET: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    CORS_CLIENT_ORIGIN: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    MONGO_HOST: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    MONGO_USER: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    MONGO_PASSWORD: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    MONGO_PATH: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    GITHUB_CLIENT_ID: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    GITHUB_CLIENT_SECRET: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    GITHUB_CALLBACK_URL: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    GOOGLE_CLIENT_ID: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    GOOGLE_CLIENT_SECRET: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])(),\n    GOOGLE_CALLBACK_URL: Object(envalid__WEBPACK_IMPORTED_MODULE_1__[\"str\"])()\n  });\n  return checkedEnv;\n}\n\nvar config = null;\nfunction create() {\n  if (config == null) {\n    var checkedEnv = validateEnv();\n    config = {\n      port: checkedEnv.PORT,\n      sessionSecret: checkedEnv.SESSION_SECRET,\n      corsClientOrigin: checkedEnv.CORS_CLIENT_ORIGIN,\n      mongoHost: checkedEnv.MONGO_HOST,\n      mongoUser: checkedEnv.MONGO_USER,\n      mongoPassword: checkedEnv.MONGO_PASSWORD,\n      mongoPath: checkedEnv.MONGO_PATH,\n      githubClientId: checkedEnv.GITHUB_CLIENT_ID,\n      githubClientSecret: checkedEnv.GITHUB_CLIENT_SECRET,\n      githubCallbackURL: checkedEnv.GITHUB_CALLBACK_URL,\n      googleClientId: checkedEnv.GOOGLE_CLIENT_ID,\n      googleClientSecret: checkedEnv.GOOGLE_CLIENT_SECRET,\n      googleCallbackURL: checkedEnv.GOOGLE_CALLBACK_URL\n    };\n    Object.keys(config).forEach(function (element) {\n      if (element.indexOf(\"Pass\") < 0 && element.indexOf(\"Secr\") < 0) {\n        console.log('Created config', element, config[element]);\n      }\n    });\n  }\n\n  return config;\n}\n\n//# sourceURL=webpack:///./express/account/server/config/env.js?");

/***/ }),

/***/ "./express/account/server/config/index.js":
/*!************************************************!*\
  !*** ./express/account/server/config/index.js ***!
  \************************************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config; });\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ \"./express/account/server/config/env.js\");\n\nvar config = Object(_env__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n\n//# sourceURL=webpack:///./express/account/server/config/index.js?");

/***/ }),

/***/ "./express/account/server/index.js":
/*!*****************************************!*\
  !*** ./express/account/server/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! query-string */ \"query-string\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _middlewares_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middlewares/session */ \"./express/account/server/middlewares/session.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/index */ \"./express/account/server/config/index.js\");\n/* harmony import */ var _packi_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../packi/api */ \"./express/packi/api.js\");\n/* harmony import */ var _packi_api__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_packi_api__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nconsole.log('Config', JSON.stringify(_config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"], null, 2));\nvar defaultOwner = 'stfnbssl';\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()();\nObject(_middlewares_session__WEBPACK_IMPORTED_MODULE_3__[\"SessionMiddleware\"])(app);\napp.set('views', path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, './views'));\napp.set('view engine', 'pug');\napp.get('/', function (req, res) {\n  console.log('route /', 'req.session', req.session);\n  res.render('index', {\n    title: 'Express - account',\n    message: 'Hello there!'\n  });\n});\napp.get('/dashboard', ensureAuthenticated, function (req, res) {\n  res.render('dashboard', {\n    title: 'Express - account - dashboard'\n  });\n});\napp.get('/login', function (req, res) {\n  res.render('login', {\n    title: 'Express - account - login'\n  });\n});\napp.get('/login/github', function (req, res) {\n  res.redirect(\"https://github.com/login/oauth/authorize?client_id=\".concat(_config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].githubClientId));\n});\nvar github_access_token = null;\napp.get('/api/v1/authenticate/github/callback', function (req, res) {\n  var body = {\n    client_id: _config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].githubClientId,\n    client_secret: _config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].githubClientSecret,\n    code: req.query.code\n  };\n  var opts = {\n    headers: {\n      accept: 'application/json'\n    }\n  };\n  axios__WEBPACK_IMPORTED_MODULE_4___default.a.post(\"https://github.com/login/oauth/access_token\", body, opts).then(function (res) {\n    console.log('github/callback:', JSON.stringify(res.data, null, 2));\n    return res.data['access_token'];\n  }).then(function (_token) {\n    console.log('My token:', _token);\n    github_access_token = _token; // res.json({ ok: 1 });\n\n    res.redirect('/profile/github');\n  })[\"catch\"](function (err) {\n    return res.status(500).json({\n      message: err.message\n    });\n  });\n});\napp.get('/profile/github', function (req, res) {\n  axios__WEBPACK_IMPORTED_MODULE_4___default()({\n    method: 'get',\n    url: \"https://api.github.com/user\",\n    headers: {\n      Authorization: 'token ' + github_access_token\n    }\n  }).then(function (response) {\n    // res.json({ userData: response.data });\n    req.session.user = response.data;\n    res.send('<pre><code>' + JSON.stringify({\n      userData: response.data\n    }, null, 2) + '</code></pre>');\n  });\n});\napp.get('/login/google', function (req, res) {\n  var queryParams = query_string__WEBPACK_IMPORTED_MODULE_2__[\"stringify\"]({\n    client_id: _config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].googleClientId,\n    // It must correspond to what we declared earlier in the backend\n    scope: \"email profile\",\n    // This is the user data you have access to, in our case its just the mail.\n    redirect_uri: 'http://localhost:5000/api/v1/authenticate/google/callback',\n    // This is the uri that will be redirected to if the user signs into his google account successfully\n    nonce: \"gartps\",\n    // \n    response_type: \"code\" // This tells Google to append code to the response which will be sent to the backend which exchange the code for a token\n\n  });\n  res.redirect(\"https://accounts.google.com/o/oauth2/v2/auth?\".concat(queryParams));\n});\nvar google_access_token = null;\napp.get('/api/v1/authenticate/google/callback', function (req, res) {\n  var body = {\n    client_id: _config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].googleClientId,\n    client_secret: _config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].googleClientSecret,\n    code: req.query.code,\n    redirect_uri: 'http://localhost:5000/api/v1/authenticate/google/callback',\n    grant_type: 'authorization_code'\n  };\n  var opts = {\n    headers: {\n      accept: 'application/json'\n    }\n  };\n  axios__WEBPACK_IMPORTED_MODULE_4___default.a.post(\"https://oauth2.googleapis.com/token\", body, opts).then(function (res) {\n    console.log('google/callback:', JSON.stringify(res.data, null, 2));\n    return res.data['access_token'];\n  }).then(function (_token) {\n    console.log('My token:', _token);\n    google_access_token = _token; // res.json({ ok: 1 });\n\n    res.redirect('/profile/google');\n  })[\"catch\"](function (err) {\n    return res.status(500).json({\n      message: err.message\n    });\n  });\n});\napp.get('/profile/google', function (req, res) {\n  axios__WEBPACK_IMPORTED_MODULE_4___default()({\n    method: 'get',\n    url: \"https://www.googleapis.com/oauth2/v2/userinfo\",\n    headers: {\n      Authorization: 'Bearer ' + google_access_token\n    }\n  }).then(function (response) {\n    // res.json({ userData: response.data });\n    req.session.user = response.data;\n    res.send('<pre><code>' + JSON.stringify({\n      userData: response.data\n    }, null, 2) + '</code></pre>');\n  });\n});\napp.get('/logoff', function (req, res) {\n  req.session.user = null;\n  res.redirect('/');\n});\napp.get('/user/checkusername/:username', function (req, res) {\n  _packi_api__WEBPACK_IMPORTED_MODULE_6___default.a.validateUsername(req.params.username).then(function (result) {\n    res.json(result);\n  })[\"catch\"](function (err) {\n    res.json(err);\n  });\n});\n\nfunction ensureAuthenticated(req, res, next) {\n  if (req.session.user) {\n    return next();\n  }\n\n  res.redirect('/login');\n}\n\n_packi_api__WEBPACK_IMPORTED_MODULE_6___default.a.start(defaultOwner, {}, function (err) {\n  if (err) throw err;\n  console.log('Packi api started');\n  app.listen(_config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].port, function () {\n    console.log(\"Example app listening at http://localhost:\".concat(_config_index__WEBPACK_IMPORTED_MODULE_5__[\"config\"].port));\n  });\n});\n\n//# sourceURL=webpack:///./express/account/server/index.js?");

/***/ }),

/***/ "./express/account/server/middlewares/session.js":
/*!*******************************************************!*\
  !*** ./express/account/server/middlewares/session.js ***!
  \*******************************************************/
/*! exports provided: SessionMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SessionMiddleware\", function() { return SessionMiddleware; });\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! connect-mongo */ \"connect-mongo\");\n/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(connect_mongo__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/index */ \"./express/account/server/config/index.js\");\n\n\n\n\nvar SessionMiddleware = function SessionMiddleware(app) {\n  console.log('SessionMiddleware', 'init');\n  var cookieOptions = {\n    // serve secure cookies, requires https\n    secure: app.get('env') === 'production' ? true : false,\n    httpOnly: true,\n    // expires in 14 days\n    maxAge: 14 * 24 * 60 * 60 * 1000\n  };\n\n  if (app.get('env') === 'production') {\n    server.set('trust proxy', 1); // trust first proxy\n  }\n\n  console.log('SessionMiddleware.config.sessionSecret', _config_index__WEBPACK_IMPORTED_MODULE_3__[\"config\"].sessionSecret);\n  var sessionOptions = {\n    name: 'express.account.sid',\n    secret: _config_index__WEBPACK_IMPORTED_MODULE_3__[\"config\"].sessionSecret,\n    store: connect_mongo__WEBPACK_IMPORTED_MODULE_1___default.a.create({\n      mongoUrl: 'mongodb://localhost/test',\n      ttl: 14 * 24 * 60 * 60\n    }),\n    cookie: cookieOptions,\n    resave: false,\n    saveUninitialized: false\n  };\n  app.use(express_session__WEBPACK_IMPORTED_MODULE_0___default()(sessionOptions));\n};\n\n//# sourceURL=webpack:///./express/account/server/middlewares/session.js?");

/***/ }),

/***/ "./express/packi/api.js":
/*!******************************!*\
  !*** ./express/packi/api.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst NodeCache = __webpack_require__(/*! node-cache */ \"node-cache\");\n\nconst wizziProds = __webpack_require__(/*! ../../wizzi/productions */ \"./wizzi/productions.js\");\n\nconst pDependency = __webpack_require__(/*! ../../mongoose/packi/packiDependency */ \"./mongoose/packi/packiDependency.js\");\n\nconst pItem = __webpack_require__(/*! ../../mongoose/packi/packiItem */ \"./mongoose/packi/packiItem.js\");\n\nconst pActivity = __webpack_require__(/*! ../../mongoose/packi/userActivity */ \"./mongoose/packi/userActivity.js\");\n\nconst pUser = __webpack_require__(/*! ../../mongoose/packi/user */ \"./mongoose/packi/user.js\");\n\nconst userApi = __webpack_require__(/*! ./userApi */ \"./express/packi/userApi.js\");\n\nconst apiCache = new NodeCache({\n  stdTTL: 120,\n  checkperiod: 60\n});\nlet PackiDependency;\nlet PackiItem;\nlet UserActivity;\nlet User;\nlet DefaultContext;\n\nfunction merge(a, b) {\n  var ret = {};\n\n  for (var k in a) {\n    ret[k] = a[k];\n  }\n\n  for (var k in b) {\n    ret[k] = b[k];\n  }\n\n  return ret;\n}\n\nlet started = false;\nlet db;\nlet md;\nmodule.exports = md = {\n  start: function (defaultOwner, defaultContext, callback) {\n    mongoose.connect('mongodb://localhost/test', {\n      useNewUrlParser: true,\n      useUnifiedTopology: true\n    });\n\n    if (started) {\n      // already started\n      return callback(null);\n    }\n\n    started = true;\n    mongoose.set('useFindAndModify', false);\n    db = mongoose.connection;\n    db.on('error', console.error.bind(console, 'connection error:'));\n    db.once('open', function () {\n      PackiDependency = pDependency.getPackiDependency();\n      PackiItem = pItem.getPackiItem();\n      UserActivity = pActivity.getUserActivity();\n      User = pUser.getUser();\n      userApi.start(pUser);\n\n      md._getPackiContextItem(defaultOwner, 'wzCtx;wzctx', {}).then(resultItemContext => {\n        DefaultContext = Object.assign({}, defaultContext, resultItemContext);\n        console.log('packi.api.start', 'got PackiContextItem wzCtx;wzctx');\n        callback(null);\n      }).catch(err => {\n        console.log('packi.api.start', 'error getting PackiContextItem wzCtx;wzctx', err);\n        callback(err);\n      });\n    });\n  },\n  getDefaultContext: function () {\n    return DefaultContext;\n  },\n  getUserByGithubLogin: userApi.getUserByGithubLogin,\n  saveUserFromGithubLogin: userApi.saveUserFromGithubLogin,\n  validateUsername: userApi.validateUsername,\n  validateUserNotUsed: userApi.validateUserNotUsed,\n  getPackiList: function (owner) {\n    var query = {\n      owner: owner\n    };\n    console.log('getPackiList', query);\n    return new Promise((resolve, reject) => {\n      PackiItem.find(query, function (err, result) {\n        if (err) return reject(err);\n        console.log('getPackiList.result.length', result.length);\n\n        if (result.length == 0) {\n          User.find(query, function (err, result) {\n            if (err) return reject(err);\n\n            if (result.length == 0) {}\n          });\n          return reject({\n            found: false,\n            message: 'User not found'\n          });\n        } else return resolve(result);\n      });\n    });\n  },\n  getPacki: function (owner, name) {\n    var query = {\n      owner: owner,\n      name: name\n    };\n    var cacheKey = owner + '|' + name;\n    console.log('getPacki', query);\n    return new Promise((resolve, reject) => {\n      let packiValue = apiCache.get(cacheKey);\n      if (packiValue) return resolve(packiValue);\n      PackiItem.find(query, function (err, result) {\n        if (err) return reject(err);\n        console.log('getPacki.result.length', result.length);\n\n        if (result.length == 1) {\n          const item = result[0]; // console.log('getPacki.item', item);\n\n          if (item.wizziSchema && item.wizziSchema.length > 0) {\n            var querydep = {\n              owner: owner,\n              name: item.wizziSchema\n            };\n            console.log('getPackiDependency', querydep);\n            PackiDependency.find(querydep, function (err, result) {\n              if (err) return reject(err);\n              console.log('PackiDependency.result.length', result.length);\n              let dep = {};\n\n              if (result.length == 1) {\n                dep = result[0]; // console.log('PackiDependency.dep', dep);\n\n                packiValue = {\n                  mainIttf: item.mainIttf,\n                  packiFiles: merge(dep.get('packiFiles', {}), item.get('packiFiles', {}))\n                };\n                apiCache.set(cacheKey, packiValue);\n                return resolve(packiValue);\n              } else {\n                packiValue = {\n                  mainIttf: item.mainIttf,\n                  packiFiles: item.packiFiles\n                };\n                apiCache.set(cacheKey, packiValue);\n                return resolve(packiValue);\n              }\n            });\n          } else {\n            packiValue = {\n              mainIttf: item.mainIttf,\n              packiFiles: item.packiFiles\n            };\n            apiCache.set(cacheKey, packiValue);\n            return resolve(packiValue);\n          }\n        } else {\n          return reject({\n            found: false,\n            message: 'Packi not found'\n          });\n        }\n      });\n    });\n  },\n  getPackiContext: function (owner, queryContext, defaultContext) {\n    return new Promise((resolve, reject) => {\n      if (queryContext && queryContext.length > 0) {\n        const contextItems = queryContext.split('|');\n        var j = 0;\n        let resultContext = defaultContext;\n\n        (function next() {\n          var contextItem = contextItems[j++];\n\n          if (!contextItem) {\n            console.log('done getPackiContext', Object.keys(resultContext));\n            return resolve(resultContext);\n          }\n\n          md._getPackiContextItem(owner, contextItem, defaultContext).then(resultItemContext => {\n            resultContext = Object.assign({}, resultContext, resultItemContext);\n            next();\n          }).catch(err => reject(err));\n        })();\n      } else {\n        resolve(defaultContext);\n      }\n    });\n  },\n  _getPackiContextItem: function (owner, queryContext, defaultContext) {\n    return new Promise((resolve, reject) => {\n      if (queryContext && queryContext.length > 0) {\n        const parts = queryContext.split(';');\n        const contextName = parts[0];\n        const contextPackiName = parts[1];\n        const contextTransformation = parts.length > 2 ? parts[2] : null;\n        console.log('packi.api._getPackiContextItem: contextName', contextName, 'contextPackiName', contextPackiName, 'contextTransformation', contextTransformation);\n\n        if (contextTransformation) {\n          md.getPackiTransformation(owner, contextPackiName, defaultContext, contextTransformation).then(result => {\n            console.log('packi.api._getPackiContextItem: typeof result', typeof result.transformResult); // const contextObject = JSON.parse(result.transformResult);\n\n            resolve(Object.assign({}, defaultContext, {\n              [contextName]: result.transformResult\n            }));\n          });\n        } else {\n          md.getPackiGeneration(owner, contextPackiName, defaultContext).then(result => {\n            console.log('packi.api._getPackiContextItem', result.content.length);\n            const contextObject = JSON.parse(result.content);\n            resolve(Object.assign({}, defaultContext, {\n              [contextName]: contextObject\n            }));\n          });\n        }\n      } else {\n        resolve(defaultContext);\n      }\n    });\n  },\n  getPackiGeneration: function (owner, name, context) {\n    return new Promise((resolve, reject) => {\n      md.getPacki(owner, name).then(packiItem => {\n        wizziProds.generateArtifact(packiItem.mainIttf, packiItem.packiFiles, context).then(result => {\n          console.log('getPackiGeneration', name, result.artifactContent.length);\n          console.log('getPackiGeneration', name, result.artifactContent.substring(0, 500) + '...');\n          const response = {\n            content: result.artifactContent,\n            contentLength: result.artifactContent.length,\n            contentType: contentTypeFor(packiItem.mainIttf)\n          };\n          return resolve(response);\n        }).catch(err => {\n          return reject(err);\n        });\n      });\n    }).catch(err => {\n      console.log('err', err);\n      reject(err);\n    });\n  },\n  getPackiTransformation: function (owner, name, context, transformerName) {\n    return new Promise((resolve, reject) => {\n      md.getPacki(owner, name).then(packiItem => {\n        wizziProds.transformModel(packiItem.mainIttf, packiItem.packiFiles, context, {\n          transformer: transformerName\n        }).then(result => {\n          console.log('getPackiTransformation', Object.keys(result));\n          return resolve(result);\n        }).catch(err => {\n          return reject(err);\n        });\n      });\n    }).catch(err => {\n      console.log('err', err);\n      reject(err);\n    });\n  },\n  getUserActivity: function (id) {\n    var query = {\n      _id: id\n    };\n    return new Promise((resolve, reject) => {\n      UserActivity.find(query, function (err, result) {\n        if (err) return reject(err);\n        if (result.length == 1) return resolve(result[0]._doc);\n        return reject(result);\n      });\n    });\n  },\n  saveUserActivity: function (id, items) {\n    var query = {\n      _id: id\n    };\n    return new Promise((resolve, reject) => {\n      UserActivity.find(query, function (err, result) {\n        if (err) return reject(err);\n        const saveItem = result.length == 1 ? result[0]._doc : {\n          _id: id,\n          openPackies: [],\n          openFiles: []\n        };\n\n        if (items.openPacki) {\n          saveItem.openPackies.unshift(items.openPacki);\n          if (saveItem.openPackies.length > 10) saveItem.openPackies.splice(10);\n        }\n\n        if (items.openFile) {\n          saveItem.openFiles.unshift(items.openFile);\n          if (saveItem.openFiles.length > 20) saveItem.openFiles.splice(20);\n        }\n\n        UserActivity.findOneAndUpdate(query, saveItem, {\n          upsert: true,\n          new: true\n        }, function (err, doc) {\n          if (err) {\n            console.log('saveUserActivity err', err);\n            return reject(err);\n          }\n\n          return resolve({\n            upserted: true,\n            message: 'useractivity',\n            doc: doc._doc\n          });\n        });\n      });\n    });\n  },\n  getLastPackiActivity: function (username) {\n    var query = {\n      _id: username\n    };\n    return new Promise((resolve, reject) => {\n      UserActivity.find(query, function (err, result) {\n        if (err) return reject(err);\n\n        if (result.length == 1) {\n          const activity = result[0]._doc;\n\n          if (activity.openPackies.length > 0) {\n            md.getPackiItem_Object_By_Owner_Name(username, activity.openPackies[0]).then(packiItem => {\n              resolve({\n                found: true,\n                _id: packiItem._id,\n                owner: packiItem.owner,\n                name: packiItem.name,\n                selectedFile: activity.openFiles[0],\n                packiFiles: packiItem.packiFiles,\n                mainIttf: packiItem.mainIttf,\n                wizziSchema: packiItem.wizziSchema\n              });\n            });\n          } else resolve({\n            found: false\n          });\n        } else resolve({\n          found: false\n        });\n      });\n    });\n  },\n  getPackiItem_Object_By_Owner_Name: function (owner, name) {\n    var query = {\n      owner: owner,\n      name: name\n    };\n    console.log('getPackiItem_Object_By_Owner_Name', query);\n    return new Promise((resolve, reject) => {\n      PackiItem.find(query, function (err, result) {\n        if (err) return reject(err);\n        console.log('getPackiItem_Object_By_Owner_Name.result.length', result.length);\n\n        if (result.length == 1) {\n          const obj = { ...result[0]._doc,\n            packiFiles: JSON.parse(result[0]._doc.packiFiles)\n          };\n          return resolve({ ...obj,\n            _id: obj._id.toString()\n          });\n        }\n\n        return reject({\n          message: \"packi item not found\",\n          query\n        });\n      });\n    });\n  },\n  getPackiItem_Object_By_Id: function (id) {\n    var query = {\n      _id: id\n    };\n    console.log('getPackiItem_Object_By_Id', query);\n    return new Promise((resolve, reject) => {\n      PackiItem.find(query, function (err, result) {\n        if (err) return reject(err);\n        console.log('getPackiItem_Object_By_Id.result.length', result.length);\n        if (result.length == 1) return resolve(result[0]._doc);\n        return reject({\n          message: \"packi item not found\",\n          query\n        });\n      });\n    });\n  },\n  savePacki: function (owner, name, mainIttf, wizziSchema, packiFiles) {\n    return new Promise((resolve, reject) => {\n      const item = {\n        owner,\n        name,\n        mainIttf,\n        wizziSchema,\n        packiFiles\n      };\n      item.userUpdated = true;\n      var cacheKey = owner + '|' + name;\n      var query = {\n        owner: item.owner,\n        name: item.name\n      }; // console.log('savePacki', item);\n\n      PackiItem.findOneAndUpdate(query, item, {\n        upsert: true,\n        new: true\n      }, function (err, doc) {\n        if (err) {\n          console.log('savePacki err', err);\n          return reject(err);\n        }\n\n        apiCache.del(cacheKey);\n        console.log('savePacki success doc', Object.keys(doc), 'doc._doc', doc._doc);\n        return resolve({\n          upserted: true,\n          message: 'packiitem updated',\n          doc: doc._doc\n        });\n      });\n    });\n  }\n};\nconst extContentTypeMap = {\n  '.css': 'text/css',\n  '.gif': 'image/gif',\n  '.html': 'text/html',\n  '.ittf': 'text/plain',\n  '.jpeg': 'image/jpeg',\n  '.jpg': 'image/jpg',\n  '.js': 'text/javascript',\n  '.json': 'application/json',\n  '.png': 'image/png',\n  '.scss': 'text/scss',\n  '.svg': 'image/svg+xml',\n  '.ttf': 'application/x-font-ttf',\n  '.txt': 'text/plain',\n  '.vtt': 'text/vtt',\n  '.woff': 'application/x-font-woff',\n  '.yaml': 'text/yanl',\n  '.yml': 'text/yanl',\n  '.xml': 'text/xml'\n};\n\nfunction ittfSchemaOf(file) {\n  const nameParts = path.basename(file).split('.');\n\n  if (nameParts[nameParts.length - 1] === 'ittf') {\n    return nameParts[nameParts.length - 2];\n  }\n\n  return undefined;\n}\n\nfunction contentTypeFor(file) {\n  const ittfSchema = ittfSchemaOf(file);\n  console.log('contentTypeFor', file, ittfSchema);\n\n  if (ittfSchema) {\n    return extContentTypeMap['.' + ittfSchema];\n  }\n\n  return undefined;\n}\n\n//# sourceURL=webpack:///./express/packi/api.js?");

/***/ }),

/***/ "./express/packi/userApi.js":
/*!**********************************!*\
  !*** ./express/packi/userApi.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let User;\nlet md;\nmodule.exports = md = {\n  start: function (pUser) {\n    User = pUser.getUser();\n  },\n  getUserByGithubLogin: function (profile) {\n    var query = {\n      email: profile.email\n    };\n    return new Promise((resolve, reject) => {\n      User.find(query, function (err, result) {\n        if (err) return reject(err);\n        if (result.length == 1) return resolve(result[0]._doc);\n        return reject({\n          message: 'user not found'\n        });\n      });\n    });\n  },\n  validateUsername: function (chosenUsername) {\n    return new Promise((resolve, reject) => {\n      let query = {\n        username: chosenUsername\n      };\n      User.find(query, function (err, result) {\n        if (err) return reject(err);\n        if (result.length == 1) return resolve({\n          isValid: false,\n          message: 'username already in use'\n        });\n        resolve({\n          isValid: true\n        });\n      });\n    });\n  },\n  validateUserNotUsed: function (chosenUsername, email) {\n    return new Promise((resolve, reject) => {\n      let query = {\n        username: chosenUsername\n      };\n      User.find(query, function (err, result) {\n        if (err) return reject(err);\n        if (result.length == 1) return reject({\n          message: 'username already in use'\n        });\n        let query = {\n          email: email\n        };\n        User.find(query, function (err, result) {\n          if (err) return reject(err);\n          if (result.length == 1) return reject({\n            message: 'email already in use'\n          });\n          resolve({\n            ok: true\n          });\n        });\n      });\n    });\n  },\n  saveUserFromGithubLogin: function (chosenUsername, profile) {\n    return new Promise((resolve, reject) => {\n      md.validateNotUsed(chosenUsername, profile.email).then(result => {\n        const newUser = new User({\n          username: chosenUsername,\n          email: profile.email,\n          provider: 'github',\n          name: profile.name,\n          avatar_url: profile.avatar_url,\n          developer_url: profile.html_url,\n          created_at: new Date(),\n          updated_at: new Date()\n        });\n        newUser.save(function (err, doc) {\n          if (err) {\n            console.log('save user error', err);\n            return reject(err);\n          }\n\n          return resolve({\n            created: true,\n            message: 'user created',\n            doc: doc._doc\n          });\n        });\n      }).catch(err => reject(err));\n    });\n  }\n};\n\n//# sourceURL=webpack:///./express/packi/userApi.js?");

/***/ }),

/***/ "./mongoose/packi/packiDependency.js":
/*!*******************************************!*\
  !*** ./mongoose/packi/packiDependency.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst packiDependencySchema = new mongoose.Schema({\n  owner: {\n    type: String\n  },\n  name: {\n    type: String\n  },\n  packiFiles: {\n    type: String,\n    get: function (data) {\n      return JSON.parse(data);\n    },\n    set: function (data) {\n      return JSON.stringify(data);\n    }\n  },\n  userUpdated: Boolean\n});\npackiDependencySchema.index({\n  owner: 1,\n  name: 1\n}, {\n  unique: true\n});\nlet PackiDependency = null;\nmodule.exports = {\n  getPackiDependency: function () {\n    if (!PackiDependency) {\n      PackiDependency = mongoose.model('PackiDependency', packiDependencySchema);\n    }\n\n    return PackiDependency;\n  }\n};\n\n//# sourceURL=webpack:///./mongoose/packi/packiDependency.js?");

/***/ }),

/***/ "./mongoose/packi/packiItem.js":
/*!*************************************!*\
  !*** ./mongoose/packi/packiItem.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst packiItemSchema = new mongoose.Schema({\n  owner: {\n    type: String\n  },\n  name: {\n    type: String\n  },\n  wizziSchema: {\n    type: String\n  },\n  mainIttf: {\n    type: String\n  },\n  packiFiles: {\n    type: String,\n    get: function (data) {\n      const json = JSON.parse(data);\n      return json;\n    },\n    set: function (data) {\n      return JSON.stringify(data);\n    }\n  },\n  userUpdated: Boolean\n});\npackiItemSchema.index({\n  owner: 1,\n  name: 1\n}, {\n  unique: true\n});\nlet PackiItem = null;\nmodule.exports = {\n  getPackiItem: function () {\n    if (!PackiItem) {\n      PackiItem = mongoose.model('PackiItem', packiItemSchema);\n    }\n\n    return PackiItem;\n  }\n};\n\n//# sourceURL=webpack:///./mongoose/packi/packiItem.js?");

/***/ }),

/***/ "./mongoose/packi/user.js":
/*!********************************!*\
  !*** ./mongoose/packi/user.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst userSchema = new mongoose.Schema({\n  username: {\n    type: String,\n    unique: true\n  },\n  email: {\n    type: String,\n    unique: true\n  },\n  name: String,\n  location: String,\n  avatar_url: String,\n  provider: String,\n  created_at: Date,\n  updated_at: Date\n});\nlet User;\nmodule.exports = {\n  getUser: function () {\n    if (!User) {\n      User = mongoose.model('User', userSchema);\n    }\n\n    return User;\n  }\n};\n\n//# sourceURL=webpack:///./mongoose/packi/user.js?");

/***/ }),

/***/ "./mongoose/packi/userActivity.js":
/*!****************************************!*\
  !*** ./mongoose/packi/userActivity.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst userActivitySchema = new mongoose.Schema({\n  username: {\n    type: String,\n    unique: true\n  },\n  openPackies: {\n    type: Array\n  },\n  openFiles: {\n    type: Array\n  }\n});\nlet UserActivity = null;\nmodule.exports = {\n  getUserActivity: function () {\n    if (!UserActivity) {\n      UserActivity = mongoose.model('UserActivity', userActivitySchema);\n    }\n\n    return UserActivity;\n  }\n};\n\n//# sourceURL=webpack:///./mongoose/packi/userActivity.js?");

/***/ }),

/***/ "./wizzi/factory.js":
/*!**************************!*\
  !*** ./wizzi/factory.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\n\nconst wizzi = __webpack_require__(/*! wizzi */ \"wizzi\");\n\nconst wizziRepo = __webpack_require__(/*! wizzi-repo */ \"wizzi-repo\");\n\nconst packiFilePrefix = 'json://';\nlet md;\nmodule.exports = md = {\n  packiFilesToJsonDocuments: function packiFilesToJsonDocuments(files) {\n    const jsonDocuments = [];\n    Object.keys(files).map(value => {\n      if (files[value].type === 'CODE') {\n        const filePath = md.ensurePackiFilePrefix(value);\n        jsonDocuments.push({\n          path: filePath,\n          content: files[value].contents\n        });\n      }\n    });\n    return jsonDocuments;\n  },\n  createFsJsonAndFactory: async function (files) {\n    const plugins = [];\n    const jsonDocuments = [];\n    Object.keys(files).map(value => {\n      if (files[value].type === 'CODE' && files[value].contents && files[value].contents.length > 0) {\n        const filePath = md.ensurePackiFilePrefix(value);\n        jsonDocuments.push({\n          path: filePath,\n          content: files[value].contents\n        });\n        const pluginList = pluginsFor(filePath);\n        pluginList.forEach(item => {\n          if (plugins.indexOf(item) < 0) {\n            plugins.push(item);\n          }\n        });\n      }\n    });\n    console.log('createFactory', plugins, 'jsonDocuments.length', jsonDocuments.length);\n    return new Promise((resolve, reject) => wizziRepo.JsonComponents.createFsJson(jsonDocuments, (err, fsJson) => {\n      if (err) {\n        return reject(err);\n      }\n\n      wizzi.jsonFactory({\n        fsJson,\n        plugins: {\n          items: ['wizzi-core', 'wizzi-js', 'wizzi-web'\n          /*\r\n          './wizzi-core/dist/index.js', \r\n          './wizzi-js/dist/index.js', \r\n          './wizzi-web/dist/index.js', \r\n          './wizzi-meta/dist/index.js'\r\n          */\n          ] // pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi/packages'\n\n        }\n      }, function (err, wf) {\n        if (err) {\n          return reject(err);\n        }\n\n        resolve({\n          wf,\n          fsJson\n        });\n      });\n    }));\n  },\n  createFsJson: async function createFsJson(files) {\n    const jsonDocuments = [];\n    Object.keys(files).map(value => {\n      if (files[value].type === 'CODE') {\n        const filePath = md.ensurePackiFilePrefix(value);\n        jsonDocuments.push({\n          path: filePath,\n          content: files[value].contents\n        });\n      }\n    });\n    console.log('createFsJson', 'jsonDocuments.length', jsonDocuments.length);\n    return new Promise((resolve, reject) => wizziRepo.JsonComponents.createFsJson(jsonDocuments, (err, result) => {\n      if (err) {\n        return reject(err);\n      }\n\n      resolve(result);\n    }));\n  },\n  extractGeneratedFiles: async function extractGeneratedFiles(fsJson) {\n    const files = {};\n    return new Promise((resolve, reject) => fsJson.toFiles({\n      removeRoot: packiFilePrefix\n    }, (err, result) => {\n      if (err) {\n        reject(err);\n      }\n\n      result.forEach(value => {\n        if (value.relPath.endsWith('.ittf') == false) {\n          files[value.relPath] = {\n            type: 'CODE',\n            contents: value.content,\n            generated: true\n          };\n        }\n      });\n      resolve(files);\n    }));\n  },\n  ensurePackiFilePrefix: function (filePath) {\n    return filePath.startsWith(packiFilePrefix) ? filePath : packiFilePrefix + filePath;\n  }\n};\nconst schemaPluginMap = {\n  json: ['wizzi-core'],\n  text: ['wizzi-core'],\n  xml: ['wizzi-core'],\n  ittf: ['wizzi-core'],\n  wfjob: ['wizzi-core'],\n  wfschema: ['wizzi-core'],\n  js: ['wizzi-js'],\n  ts: ['wizzi-js'],\n  html: ['wizzi-web', 'wizzi-js', 'wizzi-core'],\n  css: ['wizzi-web'],\n  scss: ['wizzi-web'],\n  graphql: ['wizzi-web'],\n  vml: ['wizzi-web'],\n  vue: ['wizzi-web']\n};\n\nfunction pluginsFor(file) {\n  const nameParts = path.basename(file).split('.');\n\n  if (nameParts[nameParts.length - 1] === 'ittf') {\n    return schemaPluginMap[nameParts[nameParts.length - 2]] || [];\n  }\n\n  return [];\n}\n\n//# sourceURL=webpack:///./wizzi/factory.js?");

/***/ }),

/***/ "./wizzi/productions.js":
/*!******************************!*\
  !*** ./wizzi/productions.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\n\nconst factory = __webpack_require__(/*! ./factory */ \"./wizzi/factory.js\");\n\nconst {\n  createFsJsonAndFactory,\n  ensurePackiFilePrefix\n} = factory;\nconst myname = 'wizzi.productions';\nlet md;\nmodule.exports = md = {\n  generateArtifact: async function generateArtifact(filePath, packiFiles, context, options) {\n    return new Promise(async (resolve, reject) => {\n      const generator = options && options.generator ? options.generator : generatorFor(filePath);\n      console.log(myname + '.generateArtifact.using artifact generator', generator);\n\n      if (generator) {\n        let jsonwf = {};\n        let generationContext = {};\n        const ittfDocumentUri = ensurePackiFilePrefix(filePath);\n        /*\r\n        const wzCtxDocumentUri = Object.keys(packiFiles).find(k => \r\n            k.endsWith('wzctx.json.ittf')\r\n        );\r\n        */\n\n        try {\n          jsonwf = await createFsJsonAndFactory(packiFiles);\n          generationContext = Object.assign(context || {}, {// wzCtx: wzCtxDocumentUri ? await loadModelInternal(jsonwf.wf, ensurePackiFilePrefix(wzCtxDocumentUri), {}) : null\n          });\n          console.log(myname + '.generateArtifact.context', Object.keys(generationContext));\n          jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {\n            modelRequestContext: generationContext || {},\n            artifactRequestContext: generationContext || {}\n          }, generator, (err, result) => {\n            if (err) {\n              return reject(err);\n            }\n\n            resolve({\n              artifactContent: result,\n              sourcePath: filePath,\n              artifactGenerator: generator\n            });\n          });\n        } catch (ex) {\n          return reject(ex);\n        }\n      } else {\n        reject('No artifact generator available for document ' + filePath);\n      }\n    });\n  },\n  transformModel: async function (filePath, packiFiles, context, options) {\n    return new Promise(async (resolve, reject) => {\n      const transformer = options && options.transformer ? options.transformer : transformerFor(filePath);\n      console.log('wizzi.productions.transformModel.using artifact transformer', transformer);\n\n      if (transformer) {\n        let jsonwf = {};\n        let transformationContext = {};\n        const ittfDocumentUri = ensurePackiFilePrefix(filePath);\n        const siteDocumentUri = Object.keys(packiFiles).find(k => k.endsWith('site.json.ittf'));\n\n        try {\n          jsonwf = await createFsJsonAndFactory(packiFiles);\n          transformationContext = {\n            site: siteDocumentUri ? await loadModelInternal(jsonwf.wf, ensurePackiFilePrefix(siteDocumentUri), {}) : null\n          };\n          console.log('wizzi.productions.transformModel.transformationContext', Object.keys(transformationContext));\n          jsonwf.wf.loadAndTransformModel(ittfDocumentUri, {\n            modelRequestContext: transformationContext\n          }, transformer, (err, result) => {\n            if (err) {\n              return reject(err);\n            } // console.log('Transformed result', result);\n\n\n            resolve({\n              transformResult: result,\n              sourcePath: filePath,\n              modelTransformer: transformer\n            });\n          });\n        } catch (ex) {\n          return reject(ex);\n        }\n      } else {\n        reject('No model transformer available for document ' + filePath);\n      }\n    });\n  },\n  parseFilePath: function (filePath) {\n    const nameParts = path.basename(filePath).split('.');\n\n    if (nameParts[nameParts.length - 1] === 'ittf') {\n      return {\n        isIttfDocument: true,\n        schema: nameParts[nameParts.length - 2],\n        seedname: nameParts.slice(0, -2).join('.')\n      };\n    } else {\n      return {\n        isIttfDocument: false,\n        schema: nameParts[nameParts.length - 1],\n        seedname: nameParts.slice(0, -1).join('.')\n      };\n    }\n  }\n};\n\nasync function loadModelInternal(wf, filePath, context) {\n  return new Promise(async (resolve, reject) => {\n    const schemaName = schemaFromFilePath(filePath);\n\n    if (!schemaName) {\n      return reject('File is not a known ittf document: ' + filePath);\n    }\n\n    wf.loadModel(schemaName, filePath, {\n      mTreeBuildUpContext: context\n    }, (err, result) => {\n      if (err) {\n        return reject(err);\n      }\n\n      resolve(result);\n    });\n  });\n}\n\nconst extSchemaMap = {\n  '.js': 'js',\n  '.jsx': 'js',\n  '.ts': 'ts',\n  '.tsx': 'ts',\n  '.html': 'html',\n  '.css': 'css',\n  '.svg': 'svg',\n  '.md': 'md',\n  '.xml': 'xml',\n  '.json': 'json',\n  '.graphql': 'graphql'\n};\nconst schemaModuleMap = {\n  css: 'css/document',\n  graphql: 'graphql/document',\n  ittf: 'ittf/document',\n  js: 'js/module',\n  json: 'json/document',\n  html: 'html/document',\n  md: 'md/document',\n  scss: 'scss/document',\n  svg: 'svg/document',\n  text: 'text/document',\n  ts: 'ts/module',\n  vml: 'vml/document',\n  vue: 'vue/document',\n  xml: 'xml/document'\n};\n\nfunction generatorFor(filePath) {\n  const pf = md.parseFilePath(filePath);\n\n  if (pf.isIttfDocument) {\n    return schemaModuleMap[pf.schema];\n  }\n\n  return undefined;\n}\n\nconst schemaTransformerMap = {\n  meta: 'ittf/cheatsheet'\n};\n\nfunction transformerFor(filePath) {\n  const pf = md.parseFilePath(filePath);\n\n  if (pf.isIttfDocument) {\n    return schemaTransformerMap[pf.schema];\n  }\n\n  return undefined;\n}\n\nfunction schemaFromFilePath(filePath) {\n  const pf = md.parseFilePath(filePath);\n\n  if (pf.isIttfDocument) {\n    return pf.schema;\n  }\n\n  return undefined;\n}\n\n//# sourceURL=webpack:///./wizzi/productions.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-mongo\");\n\n//# sourceURL=webpack:///external_%22connect-mongo%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "envalid":
/*!**************************!*\
  !*** external "envalid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"envalid\");\n\n//# sourceURL=webpack:///external_%22envalid%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "node-cache":
/*!*****************************!*\
  !*** external "node-cache" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-cache\");\n\n//# sourceURL=webpack:///external_%22node-cache%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"query-string\");\n\n//# sourceURL=webpack:///external_%22query-string%22?");

/***/ }),

/***/ "wizzi":
/*!************************!*\
  !*** external "wizzi" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"wizzi\");\n\n//# sourceURL=webpack:///external_%22wizzi%22?");

/***/ }),

/***/ "wizzi-repo":
/*!*****************************!*\
  !*** external "wizzi-repo" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"wizzi-repo\");\n\n//# sourceURL=webpack:///external_%22wizzi-repo%22?");

/***/ })

/******/ });