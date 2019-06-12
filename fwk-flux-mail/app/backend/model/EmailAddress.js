/**
 * Mail address recipient.
 * 
 * @author mdtorres
 */
class EmailAddress {
    constructor(options = {}) {
        this.name = options.name || null;
        this.address = options.address || null;
    }
}

export default EmailAddress;