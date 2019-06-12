import {
    Config,
    Application
} from 'fwk-node/core/';
import rp from 'request-promise';
import FluxMailUtil from '../util/FluxMailUtil';
import URLUtil from '../util/URLUtil';
import Bluebird from 'bluebird';

/**
 * Call Microsoft Graph folder manager services.
 * 
 * @author mdtorres
 */
class FolderManager {


    constructor() {
        // get constant files
        let constantConfig = new Config(Application.getInstance().rootPath, 'constants');
        this.mailFolder = URLUtil.setMailFolder(constantConfig.options.creds.resource, constantConfig.options.creds.version, constantConfig.options.urls.mailFolder);
        this.deletedItems = constantConfig.options.urls.deletedItems;
    }

    /**
     * Find folder by folder resource type.
     * 
     * @param {Boolean} isReadValue boolean that set if mail was readed or not
     * @param {String} mailId mail identifier
     * @param {String} token token of session
     */
    findFolder(folderName, token) {
        return new Bluebird((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: URLUtil.setFindFolder(this.mailFolder, folderName),
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
     * Find deleted items folder of logged user.
     * 
     * @param {String} token session identifier
     */
    findDelete(token) {
        return this.findFolder(this.deletedItems, token);
    }
}

export default FolderManager;