/**
 * Set basic response entity of services.
 * 
 * @author mdtorres
 */
class ResponseObject {
    constructor(options = {}) {
        this.message = options.message || null;
        this.type = options.type || null;
        this.code = options.code || null;
    }
}

export default ResponseObject;