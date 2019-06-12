/**
 * Object request for send mail.
 * 
 * @author mdtorres
 */
class SendMail {
    constructor (options = {}){
        this.message = options.message || null;
        this.notSaveToSentItems = options.notSaveToSentItems || null;
    }
}

export default SendMail;