import {
    Inject
} from 'fwk-node/ioc';
import AttachmentManager from '../manager/AttachmentManager';

/**
 * Mail attachments from logged user.
 * 
 * @author mdtorres
 */
@Inject(AttachmentManager)
class AttachmentService {
    constructor(attachmentManager) {
        this._attachmentManager = attachmentManager;
    }

    /**
     * Service instance for list attachment from mail.
     * 
     * @param {String} mailId mail identifier
     * @param {Boolean} onlyBasicInformation set if attachment shows only basic information
     * @param {String} token session identifier
     */
    listAttachment(mailId, onlyBasicInformation, token) {
        return this._attachmentManager.listAttachment(mailId, onlyBasicInformation, token);
    }

    /**
     * Service instance for find an attachment based on mail id and attachment id.
     * 
     * @param {String} mailId mail identifier
     * @param {String} attachmentId attachment identifier
     * @param {Boolean} onlyBasicInformation set if attachment shows only basic information
     * @param {String} token session identifier
     */
    findAttachment(mailId, attachmentId, onlyBasicInformation, token) {
        return this._attachmentManager.findAttachment(mailId, attachmentId, onlyBasicInformation, token);
    }
}

export default AttachmentService;