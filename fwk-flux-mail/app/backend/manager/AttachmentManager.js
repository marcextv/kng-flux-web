import {
    Config,
    Application
} from 'fwk-node/core/';
import rp from 'request-promise';
import FluxMailUtil from '../util/FluxMailUtil';
import URLUtil from '../util/URLUtil';
import Bluebird from 'bluebird';

/**
 * Call Microsoft Graph attachment manager service.
 * 
 * @author mdtorres
 */
class AttachmentManager {


    constructor() {
        // get constant files
        let constantConfig = new Config(Application.getInstance().rootPath, 'constants');
        this.baseUrl = URLUtil.setBase(constantConfig.options.creds.resource, constantConfig.options.creds.version, constantConfig.options.urls.mailFolder, constantConfig.options.urls.inboxMessage);
        this.attachmentURL = constantConfig.options.urls.attachments;
        this.basicInfo = constantConfig.options.options.attachmentBasicInfo;
    }

    /**
     * List an attachment collection based on mail id.
     * 
     * @param {String} mailId mail identifier
     * @param {Boolean} onlyBasicInformation set if only shows attachment basic information
     * @param {String} token session identifier
     */
    listAttachment(mailId, onlyBasicInformation, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: URLUtil.setListAttachments(this.baseUrl, mailId, this.attachmentURL, onlyBasicInformation, this.basicInfo),
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
     * Find an attachment based on mail id and attachment id.
     * 
     * @param {String} mailId mail identifier
     * @param {String} attachmentId attachment identifier
     * @param {Boolean} onlyBasicInformation set if only shows attachment basic information
     * @param {String} token session indetifier
     */
    findAttachment(mailId, attachmentId, onlyBasicInformation, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: URLUtil.setFindAttachments(this.baseUrl, mailId, attachmentId, this.attachmentURL, onlyBasicInformation, this.basicInfo),
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

export default AttachmentManager;