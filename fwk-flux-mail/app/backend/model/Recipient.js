/**
 * Address data.
 * 
 * @author mdtorres
 */
class Recipient {
    constructor(options = {}){
        this.emailAddress = options.emailAddress || null;
    }
}

export default Recipient;