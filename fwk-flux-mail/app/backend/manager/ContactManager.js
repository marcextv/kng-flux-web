import {
    Config,
    Application
} from 'fwk-node/core/';
import rp from 'request-promise';
import FluxMailUtil from '../util/FluxMailUtil';
import URLUtil from '../util/URLUtil';
import Bluebird from 'bluebird';

/**
 * Call Microsoft Graph contact services.
 * 
 * @author mdtorres
 */
class ContactManager {

    constructor() {
        // get constant files
        let constantConfig = new Config(Application.getInstance().rootPath, 'constants');
        this.baseUrl = URLUtil.setMailFolder(constantConfig.options.creds.resource, constantConfig.options.creds.version, constantConfig.options.urls.contacts);
    }

    /**
     * Get all contacts of user logged from Exchange service.
     * 
     * @param {Number} skipToken set index for list
     * @param {String} token sesion identifer
     */
    listContacts(skipToken, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: URLUtil.setListContact(this.baseUrl, skipToken),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': URLUtil.setAuthorizationHeader(token)
                }
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

export default ContactManager;