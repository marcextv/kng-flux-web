/**
 * Message content of mail.
 * 
 * @author mdtorres
 */
class Message {
    constructor(options = {}) {
        this.subject = options.subject || null;
        this.body = options.body || null;
        this.importance = options.importance || null;
        this.toRecipients = options.toRecipients || null;
        this.ccRecipients = options.ccRecipients || null;
        this.bccRecipients = options.bccRecipients || null;
        this.replyTo = options.replyTo || null;
        this.conversationId = options.conversationId || null;
        this.attachments = options.attachments || null;
    }
}

export default Message;