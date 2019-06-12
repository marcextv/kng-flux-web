import {
    Config,
    Application
} from 'fwk-node/core/';
import querystring from 'querystring';
import rp from 'request-promise';
import FluxMailUtil from '../util/FluxMailUtil';
import Bluebird from 'bluebird';

/**
 * Call Microsoft Graph Login Service.
 * 
 * @author mdtorres
 */
class LoginManager {

    constructor() {
        // get constant files
        let constantConfig = new Config(Application.getInstance().rootPath, 'constants');
        this.clientId = constantConfig.options.creds.clientID;
        this.clientSecret = constantConfig.options.creds.clientSecret;
        this.endPointURL = constantConfig.options.creds.endPointURL;
        this.resource = constantConfig.options.creds.resource;
        this.grantTypePassword = constantConfig.options.creds.grantTypePassword;
        this.grantTypeRefresh = constantConfig.options.creds.grantTypeRefresh;
    }

    /**
     * Get token from Exchange service.
     * 
     * @param {String} email email identifier data
     * @param {String} password sercret word for access
     */
    loginUserToOutlook(email, password) {
        var postData = querystring.stringify({
            username: email,
            password: password,
            grant_type: this.grantTypePassword,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            resource: this.resource
        });
        return new Bluebird((resolve, reject) => {
        let options = {
            method: 'POST',
            uri: this.endPointURL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: postData,
        };
        rp(options)
            .then(function (parsedBody) {
                resolve(parsedBody);
            })
            .catch(function (err) {
                FluxMailUtil.setErrorManager(reject, err, options.uri);
            });
        });
    }

    /**
     * Call refresh of session by refresh token.
     * 
     * @param {String} refreshToken session refresh identifier
     */
    refreshLoginUserToOutlook(refreshToken) {
        var postData = querystring.stringify({
            refresh_token: refreshToken,
            grant_type: this.grantTypeRefresh,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            resource: this.resource
        });
        return new Bluebird((resolve, reject) => {
        let options = {
            method: 'POST',
            uri: this.endPointURL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: postData,
        };
        rp(options)
            .then(function (parsedBody) {
                resolve(parsedBody);
            })
            .catch(function (err) {
                FluxMailUtil.setErrorManager(reject, err, options.uri);
            });
        });
    }
}

export default LoginManager;