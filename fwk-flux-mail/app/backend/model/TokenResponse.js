/**
 * Set session entity data.
 * 
 * @author mdtorres
 */
class TokenResponse {
    constructor(options = {}) {
        this.tokenType = options.tokenType || null;
        this.accessToken = options.accessToken || null;
        this.refreshToken = options.refreshToken || null;
    }
}

export default TokenResponse;