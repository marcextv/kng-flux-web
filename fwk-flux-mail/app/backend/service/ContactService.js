import {
    Inject
} from 'fwk-node/ioc';
import ContactManager from '../manager/ContactManager';

/**
 * List mails from logged user.
 * 
 * @author mdtorres
 */
@Inject(ContactManager)
class ContactService {
    constructor(contactManager) {
        this._contactManager = contactManager;
    }

    /**
     * Service instance for listing contacts.
     * 
     * @param {Number} skipToken index for listing
     * @param {String} token session identifier
     */
    listContacts(skipToken, token) {
        return this._contactManager.listContacts(skipToken, token);
    }
}

export default ContactService;