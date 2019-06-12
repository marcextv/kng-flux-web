import {
    Config,
    Application
} from 'fwk-node/core/';
import rp from 'request-promise';
import FluxMailUtil from '../util/FluxMailUtil';
import URLUtil from '../util/URLUtil';
import Bluebird from 'bluebird';

/**
 * Call Microsoft Graph mail manager services.
 * 
 * @author mdtorres
 */
class MailManager {


    constructor() {
        // get constant files
        let constantConfig = new Config(Application.getInstance().rootPath, 'constants');
        this.baseURL = URLUtil.setBase(constantConfig.options.creds.resource, constantConfig.options.creds.version, constantConfig.options.urls.mailFolder, constantConfig.options.urls.inboxMessage);
        this.baseMessagesURL = URLUtil.setMailFolder(constantConfig.options.creds.resource, constantConfig.options.creds.version, constantConfig.options.urls.messages);
        this.deletedItems = constantConfig.options.resources.deletedItems;
        this.createReplyURL = constantConfig.options.urls.createReply;
        this.sendURL = constantConfig.options.urls.send;
        this.moveURL = constantConfig.options.urls.move;
    }

    send(mailId, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'POST',
                uri: URLUtil.addPart(this.baseMessagesURL, mailId, this.sendURL),
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

    /**
     * Create a reply for given mail.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     */
    createReply(mailId, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'POST',
                uri: URLUtil.addPart(this.baseURL, mailId, this.createReplyURL),
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

    /**
     * Update data for given mail.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     * @param {Object} body mail body
     */
    update(mailId, token, body){
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'PATCH',
                uri: URLUtil.setMail(this.baseURL, mailId),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': URLUtil.setAuthorizationHeader(token)
                },
                body: body,
                json: true
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
     * Mark as read or not read a mail.
     * 
     * @param {Boolean} isReadValue boolean that set if mail was readed or not
     * @param {String} mailId mail identifier
     * @param {String} token token of session
     */
    updateReadStatus(isReadValue, mailId, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'PATCH',
                uri: URLUtil.setMail(this.baseURL, mailId),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': URLUtil.setAuthorizationHeader(token)
                },
                body: { isRead: isReadValue },
                json: true
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
     * Send a mail to deleted items folder.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     */
    moveDeletedItems(mailId, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'POST',
                uri: URLUtil.setMoveItem(this.baseURL, mailId, this.moveURL),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': URLUtil.setAuthorizationHeader(token)
                },
                body: { destinationId: this.deletedItems },
                json: true
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

export default MailManager;