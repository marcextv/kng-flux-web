import {
    ResponseTypeEnum
} from 'fwk-node/server/enum';
import {
    Router,
    RouteMapping
} from 'fwk-node/server/http';
import FluxMailFactory from '../FluxMailFactory';
import TokenResponse from '../model/TokenResponse';
import FluxMailUtil from '../util/FluxMailUtil';

/**
 * Maps and routes login services.
 * 
 * @author mdtorres
 */
@Router('/authorize')
class LoginServiceRouter {

    /**
     * Route service for access to login for Office services.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/exchange',
        method: 'post'
    })
    loginOutlook(request, response) {
        FluxMailFactory.INSTANCE.loginService.loginOutlook(request.body.email, request.body.password)
            .then(data => {
                let tokenResponse = new TokenResponse();
                var parsed = JSON.parse(data);
                tokenResponse.accessToken = parsed.access_token;
                tokenResponse.tokenType = parsed.token_type;
                tokenResponse.refreshToken = parsed.refresh_token;
                response.json(tokenResponse, ResponseTypeEnum.SUCCESS, 'Success!!');
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Route service for refreshing acces to login for Office services.
     * 
     * @param {Object} request request data
     * @param {Object} response response data
     */
    @RouteMapping({
        path: '/refresh',
        method: 'post'
    })
    refreshLoginOutlook(request, response) {
        FluxMailFactory.INSTANCE.loginService.refreshLoginOutlook(request.body.refreshToken)
            .then(data => {
                let tokenResponse = new TokenResponse();
                var parsed = JSON.parse(data);
                tokenResponse.accessToken = parsed.access_token;
                tokenResponse.tokenType = parsed.token_type;
                tokenResponse.refreshToken = parsed.refresh_token;
                response.json(tokenResponse, ResponseTypeEnum.SUCCESS, 'Success!!');
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }
}

export default LoginServiceRouter;