import {
    Inject
} from 'fwk-node/ioc';
import FolderManager from '../manager/FolderManager';

@Inject(FolderManager)
class FolderService {
    constructor(folderManager) {
        this._folderManager = folderManager;
    }

    /**
     * Service instance for finding a folder by resource type.
     * 
     * @param {Number} folderName name of folder resource type
     * @param {String} token session identifier
     */
    findFolder(folderName, token) {
        return this._folderManager.findFolder(folderName, token);
    }

    /**
     * Service instance for finding deleted items folder.
     * 
     * @param {String} token session identifier
     */
    findDelete(token) {
        return this._folderManager.findDelete(token);
    }
}

export default FolderService;