import {
    AbstractFactory,
    ContextFactory
} from 'fwk-node/ioc';
import AttachmentService from './service/AttachmentService';
import ContactService from './service/ContactService';
import ListMailService from './service/ListMailService';
import LoginService from './service/LoginService';
import MailService from './service/MailService';
import FluxMailUtil from './util/FluxMailUtil';
import FolderService from './service/FolderService';

let singleton = Symbol();

/**
 * Factory for mail services.
 * @author mdtorres
 */
class FluxMailFactory {

    constructor(sigletonToken) {
        if (sigletonToken !== singleton) {
            throw new Error('No se puede crear una instancia de la clase');
        }
    }

    /**
     * Login services.
     * 
     * @returns {LoginService}
     */
    get loginService() {
        return AbstractFactory.getContext('FluxMail').getBean(LoginService);
    }

    /**
     * Mail services.
     * 
     * @returns {MailService}
     */
    get mailService() {
        return AbstractFactory.getContext('FluxMail').getBean(MailService);
    }

    /**
     * Attachment services.
     * 
     * @returns {AttachmentService}
     */
    get attachmentService() {
        return AbstractFactory.getContext('FluxMail').getBean(AttachmentService);
    }

    /**
     * List mail services.
     * 
     * @returns {ListMailService}
     */
    get listMailService() {
        return AbstractFactory.getContext('FluxMail').getBean(ListMailService);
    }

    /**
     * Contact services.
     * 
     * @returns {ContactService}
     */
    get contactService() {
        return AbstractFactory.getContext('FluxMail').getBean(ContactService);
    }

    /**
     * Folder service.
     * 
     * @returns {FolderService}
     */
    get folderService() {
        return AbstractFactory.getContext('FluxMail').getBean(FolderService);
    }

    /**
     * Utilitary of services.
     * 
     * @returns {FluxMailUtil}
     */
    get fluxMailUtil() {
        return AbstractFactory.getContext('FluxMail').getBean(FluxMailUtil);
    }

    /**
     * Return singleton instance of class.
     * 
     * @return {FluxMailFactory}
     */
    static get INSTANCE() {
        if (!this[singleton]) {
            this[singleton] = new FluxMailFactory(singleton);
        }
        return this[singleton];
    }

}

export default FluxMailFactory;