import {
    Inject
} from 'fwk-node/ioc';
import MailManager from '../manager/MailManager';

/**
 * Manage mail information and alters if need it.
 * 
 * @author mdtorres
 */
@Inject(MailManager)
class MailService {
    
    constructor(mailManager) {
        this._mailManager = mailManager;
    }

    /**
     * Service instance for send mail.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     */
    send(mailId, token) {
        return this._mailManager.send(mailId, token);
    }

    /**
     * Service instance for create a reply for mail.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     */
    createReply(mailId, token) {
        return this._mailManager.createReply(mailId, token);
    }

    /**
     * Service instance for update a mail.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     * @param {Object} body mail body for update
     */
    update(mailId, token, body) {
        return this._mailManager.update(mailId, token, body);
    }

    /**
     * Service instance for update read status.
     * 
     * @param {Boolean} isRead set mail read status
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     */
    updateReadStatus(isRead, mailId, token) {
        return this._mailManager.updateReadStatus(isRead, mailId, token);
    }

    /**
     * Service instance for move a mail into deleted items folder.
     * 
     * @param {String} mailId mail identifier
     * @param {String} token session identifier
     */
    sendToDeletedItems(mailId, token) {
        return this._mailManager.moveDeletedItems(mailId, token);
    }
}

export default MailService;