const lodash = require('lodash');
const webpush = require('web-push');
const jsonparser = require ('json-parser');
const https = require('https');
const rp = require('request-promise');
const HttpsProxyAgent = require('https-proxy-agent');  
const HttpProxyAgent = require('http-proxy-agent');  
const btoa = require('btoa');
const urlBase64 = require('urlsafe-base64');
const url = require('url');

let configServer = {
    http: {
        routers: 'router',
        context: 'fluxOfficeWS',
        port: 3000,
        jwt: {
            secret: 'push',
            strategy: 'jwt'
        },
        session: {
            secret: 'push',
            maxAge: null,
            store: {
                prefix:'chases:'
            }
        }
    },
    websocket: {
        events: 'websocket',
        context: 'fluxOfficeWS',
        adapter: {
            key: 'pushsoc'
        }
    }
};

module.exports = configServer;