import {
    Inject
} from 'fwk-node/ioc';
import LoginManager from '../manager/LoginManager';

/**
 * Allows access control to sessions of users.
 * 
 * @author mdtorres
 */
@Inject(LoginManager)
class LoginService {
    constructor(loginManager) {
        this._loginManager = loginManager;
    }

    /**
     * Service instance for login access to Office.
     * 
     * @param {String} email user name data identifier
     * @param {String} password secret value for access
     */
    loginOutlook(email, password) {
        return this._loginManager.loginUserToOutlook(email, password);
    }

    /**
     * Service instance for refreshing login access to Office.
     * 
     * @param {String} refreshToken 
     */
    refreshLoginOutlook(refreshToken) {
        return this._loginManager.refreshLoginUserToOutlook(refreshToken);
    }
}

export default LoginService;