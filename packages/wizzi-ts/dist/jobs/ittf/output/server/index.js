"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-ts\src\jobs\ittf\ittf\epic\lib\server\index.ts.ittf
    utc time: Thu, 25 Apr 2024 15:00:59 GMT
*/
const crypto_1 = __importDefault(require("crypto"));
const express_1 = require("@remix-run/express");
const node_1 = require("@remix-run/node");
const Sentry = __importStar(require("@sentry/remix"));
const address_1 = require("address");
const chalk_1 = __importDefault(require("chalk"));
const close_with_grace_1 = __importDefault(require("close-with-grace"));
const compression_1 = __importDefault(require("compression"));
const express_2 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const get_port_1 = __importStar(require("get-port"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
(0, node_1.installGlobals)();
const MODE = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
const IS_PROD = MODE === 'production';
const IS_DEV = MODE === 'development';
const ALLOW_INDEXING = process.env.ALLOW_INDEXING !== 'false';
const createRequestHandler = IS_PROD ? Sentry.wrapExpressCreateRequestHandler(express_1.createRequestHandler) : express_1.createRequestHandler;
const viteDevServer = IS_PROD ? undefined : await Promise.resolve().then(() => __importStar(require('vite'))).then(vite => vite.createServer({
    server: {
        middlewareMode: true
    }
}));
;
const app = (0, express_2.default)();
// fly is our proxy
const getHost = (req) => { var _a, _b; return (_b = (_a = req.get('X-Forwarded-Host')) !== null && _a !== void 0 ? _a : req.get('host')) !== null && _b !== void 0 ? _b : ''; };
// fly is our proxy
// ensure HTTPS only (X-Forwarded-Proto comes from Fly)
app.set('trust proxy', true);
// ensure HTTPS only (X-Forwarded-Proto comes from Fly)
// no ending slashes for SEO reasons
// https://github.com/epicweb-dev/epic-stack/discussions/108
app.use((req, res, next) => {
    const proto = req.get('X-Forwarded-Proto');
    const host = getHost(req);
    if (proto === 'http') {
        res.set('X-Forwarded-Proto', 'https');
        res.redirect(`https://${host}${req.originalUrl}`);
        return;
    }
    next();
});
// no ending slashes for SEO reasons
// https://github.com/epicweb-dev/epic-stack/discussions/108
app.get('*', (req, res, next) => {
    if (req.path.endsWith('/') && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
        res.redirect(302, safepath + query);
    }
    else {
        next();
    }
});
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.use((0, compression_1.default)());
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
if (viteDevServer) {
    app.use(viteDevServer.middlewares);
}
else {
    // Remix fingerprints its assets so we can cache forever.
    // Everything else (like favicon.ico) is cached for an hour. You may want to be
    // more aggressive with this caching.
    app.use('/assets', express_2.default.static('build/client/assets', {
        immutable: true,
        maxAge: '1y'
    }));
    // Everything else (like favicon.ico) is cached for an hour. You may want to be
    // more aggressive with this caching.
    app.use(express_2.default.static('build/client', {
        maxAge: '1h'
    }));
}
app.get([
    '/img/*',
    '/favicons/*'
], (_req, res) => {
    // if we made it past the express.static for these, then we're missing something.
    // So we'll just send a 404 and won't bother calling other middleware.
    return res.status(404).send('Not found');
});
morgan_1.default.token('url', req => { var _a; return decodeURIComponent((_a = req.url) !== null && _a !== void 0 ? _a : ''); });
app.use((0, morgan_1.default)('tiny', {
    skip: (req, res) => { var _a, _b, _c, _d, _e, _f; return res.statusCode === 200 && (((_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith) === null || _b === void 0 ? void 0 : _b.call(_a, '/resources/note-images')) || ((_d = (_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith) === null || _d === void 0 ? void 0 : _d.call(_c, '/resources/user-images')) || ((_f = (_e = req.url) === null || _e === void 0 ? void 0 : _e.startsWith) === null || _f === void 0 ? void 0 : _f.call(_e, '/resources/healthcheck'))); }
}));
app.use((_, res, next) => {
    res.locals.cspNonce = crypto_1.default.randomBytes(16).toString('hex');
    next();
});
// When running tests or running in development, we want to effectively disable
// rate limiting because playwright tests are very fast and we don't want to
// have to wait for the rate limit to reset between tests.
app.use((0, helmet_1.default)({
    xPoweredBy: false,
    referrerPolicy: {
        policy: 'same-origin'
    },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        // NOTE: Remove reportOnly when you're ready to enforce this CSP
        reportOnly: true,
        directives: {
            'connect-src': [
                MODE === 'development' ? 'ws:' : null,
                process.env.SENTRY_DSN ? '*.sentry.io' : null,
                "'self'"
            ].filter(Boolean),
            'font-src': [
                "'self'"
            ],
            'frame-src': [
                "'self'"
            ],
            'img-src': [
                "'self'",
                'data:'
            ],
            'script-src': [
                "'strict-dynamic'",
                "'self'",
                // @ts-expect-error
                (_, res) => `'nonce-${res.locals.cspNonce}'`
            ],
            'script-src-attr': [
                // @ts-expect-error
                (_, res) => `'nonce-${res.locals.cspNonce}'`
            ],
            'upgrade-insecure-requests': null
        }
    }
}));
// When running tests or running in development, we want to effectively disable
// rate limiting because playwright tests are very fast and we don't want to
// have to wait for the rate limit to reset between tests.
const maxMultiple = !IS_PROD || process.env.PLAYWRIGHT_TEST_BASE_URL ? 10000 : 1;
const rateLimitDefault = {
    windowMs: 60 * 1000,
    max: 1000 * maxMultiple,
    standardHeaders: true,
    legacyHeaders: false,
    // Fly.io prevents spoofing of X-Forwarded-For
    // so no need to validate the trustProxy config
    validate: {
        trustProxy: false
    }
};
const strongestRateLimit = (0, express_rate_limit_1.default)(Object.assign(Object.assign({}, rateLimitDefault), { windowMs: 60 * 1000, max: 10 * maxMultiple }));
const strongRateLimit = (0, express_rate_limit_1.default)(Object.assign(Object.assign({}, rateLimitDefault), { windowMs: 60 * 1000, max: 100 * maxMultiple }));
const generalRateLimit = (0, express_rate_limit_1.default)(rateLimitDefault);
app.use((req, res, next) => {
    const strongPaths = [
        '/login',
        '/signup',
        '/verify',
        '/admin',
        '/onboarding',
        '/reset-password',
        '/settings/profile',
        '/resources/login',
        '/resources/verify'
    ];
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        if (strongPaths.some(p => req.path.includes(p))) {
            return strongestRateLimit(req, res, next);
        }
        return strongRateLimit(req, res, next);
    }
    if (req.path.includes('/verify')) {
        return strongestRateLimit(req, res, next);
    }
    return generalRateLimit(req, res, next);
});
function getBuild() {
    return __awaiter(this, void 0, void 0, function* () {
        // not sure how to make this happy 🤷‍♂️
        const build = viteDevServer ? viteDevServer.ssrLoadModule('virtual:remix/server-build') :
            // @ts-ignore this should exist before running the server
            // but it may not exist just yet.
            yield Promise.resolve().then(() => __importStar(require('#build/server/index.js')));
        ;
        // not sure how to make this happy 🤷‍♂️
        return build;
    });
}
if (!ALLOW_INDEXING) {
    app.use((_, res, next) => {
        res.set('X-Robots-Tag', 'noindex, nofollow');
        next();
    });
}
app.all('*', createRequestHandler({
    getLoadContext: (_, res) => ({
        cspNonce: res.locals.cspNonce,
        serverBuild: getBuild()
    }),
    mode: MODE,
    build: getBuild
}));
const desiredPort = Number(process.env.PORT || 3000);
const portToUse = await (0, get_port_1.default)({
    port: (0, get_port_1.portNumbers)(desiredPort, desiredPort + 100)
});
const portAvailable = desiredPort === portToUse;
if (!portAvailable && !IS_DEV) {
    console.log(`⚠️ Port ${desiredPort} is not available.`);
    process.exit(1);
}
const server = app.listen(portToUse, () => {
    var _a;
    if (!portAvailable) {
        console.warn(chalk_1.default.yellow(`⚠️  Port ${desiredPort} is not available, using ${portToUse} instead.`));
    }
    console.log(`🚀  We have liftoff!`);
    const localUrl = `http://localhost:${portToUse}`;
    let lanUrl = null;
    // Check if the address is a private ip
    // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
    // https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-dev-utils/WebpackDevServerUtils.js#LL48C9-L54C10
    const localIp = (_a = (0, address_1.ip)()) !== null && _a !== void 0 ? _a : 'Unknown';
    if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
        lanUrl = `http://${localIp}:${portToUse}`;
    }
    console.log(`
${chalk_1.default.bold('Local:')}            ${chalk_1.default.cyan(localUrl)}
${lanUrl
        ? `${chalk_1.default.bold('On Your Network:')}  ${chalk_1.default.cyan(lanUrl)}`
        : ''}
    
${chalk_1.default.bold('Press Ctrl+C to stop')}
`.trim());
});
(0, close_with_grace_1.default)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve, reject) => server.close((e) => (e ? reject(e) : resolve('ok'))));
}));
//# sourceMappingURL=index.js.map