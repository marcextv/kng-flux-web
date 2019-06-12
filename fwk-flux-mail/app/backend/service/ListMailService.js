import {
    Inject
} from 'fwk-node/ioc';
import ListMailManager from '../manager/ListMailManager';

/**
 * List mails from logged user.
 * 
 * @author mdtorres
 */
@Inject(ListMailManager)
class ListMailService {
    constructor(listMailManager) {
        this._listMailManager = listMailManager;
    }

    /**
     * Service instance for list mail.
     * 
     * @param {Number} top set maximum result count for search
     * @param {Number} skip index of paginate result
     * @param {Boolean} orderby set sort orden of result
     * @param {Boolean} showAttachments set if result must had attachments
     * @param {String} token session identifier
     * @returns {Object} mails collection
     */
    listMail(top, skip, orderby, showAttachments, token) {
        return this._listMailManager.listMail(top, skip, orderby, showAttachments, token);
    }

    /**
     * Find mail details by mail identifier.
     *
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     * @returns {Object} mail details
     */
    findMail(mailId, token) {
        return this._listMailManager.findMail(mailId, token);
    }
}

export default ListMailService;