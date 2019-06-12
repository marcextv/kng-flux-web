import {
    Config,
    Application
} from 'fwk-node/core/';
import rp from 'request-promise';
import FluxMailUtil from '../util/FluxMailUtil';
import URLUtil from '../util/URLUtil';
import Bluebird from 'bluebird';
import { isRegExp } from 'util';

/**
 * Call Microsoft Graph list mail manager service.
 * 
 * @author mdtorres
 */
class ListMailManager {


    constructor() {
        // get constant files
        let constantConfig = new Config(Application.getInstance().rootPath, 'constants');
        this.baseUrl = URLUtil.setBase(constantConfig.options.creds.resource, constantConfig.options.creds.version, constantConfig.options.urls.mailFolder, constantConfig.options.urls.inboxMessage);
        this.expandAttachments = constantConfig.options.options.expandAttachments;
        this.filterByTime = constantConfig.options.options.filterByTime;
    }

    /**
     * Get all e-mails from Exchange service.
     * 
     * @param {Number} top maximum number of mails on petition
     * @param {Number} skip index for pagination
     * @param {Boolean} orderby sort by create date data
     * @param {Boolean} showAttachments result must show attachments
     * @param {String} token session identifier
     */
    listMail(top, skip, orderby, showAttachments, token) {
        let now = new Date();
        now.setDate(now.getDate()-120);
        let filter = this.filterByTime + now.toISOString();
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: URLUtil.setListMail(this.baseUrl, top, skip, orderby, showAttachments, this.expandAttachments, filter),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': URLUtil.setAuthorizationHeader(token)
                }
            };
            rp(options)
                .then(function (parsedBody){
                    resolve(parsedBody);
                })
                .catch(function (err) {
                    FluxMailUtil.setErrorManager(reject, err, options.uri);
                });
        });
    }

    /**
     * Find mail details by mail identifier.
     *
     * @param mailId mail identifier
     * @param token session identifier
     */
    findMail(mailId, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: URLUtil.setMail(this.baseUrl, mailId),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': URLUtil.setAuthorizationHeader(token)
                }
            };
            rp(options)
                .then(function (parsedBody){
                    resolve(parsedBody);
                })
                .catch(function (err) {
                    FluxMailUtil.setErrorManager(reject, err, options.uri);
                });
        });
    }

}

export default ListMailManager;