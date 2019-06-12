/**
 * Body type of content.
 * 
 * @author mdtorres
 */
class Body {
    constructor(options = {}) {
        this.contentByte = options.contentByte || null;
        this.content = options.content || null;
    }
}

export default Body;