/**
 * Request for file attachment on mail.
 * 
 * @author mdtorres
 */
class FileAttachment {
    constructor(options = {}) {
        this.contentLocation = options.contentLocation || null;
        this.contentBytes =  options.contentBytes || null;
        this.name = options.name || null;
        this.contentType = options.contentType || null;
        this.size = options.size || null;
        this.isInLine = options.isInLine || null;
    }
}
export default FileAttachment;