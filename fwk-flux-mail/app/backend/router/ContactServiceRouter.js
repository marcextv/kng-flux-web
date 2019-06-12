import {
    Router,
    RouteMapping
} from 'fwk-node/server/http';
import FluxMailFactory from '../FluxMailFactory';
import FluxMailUtil from '../util/FluxMailUtil';

/**
 * Maps and routes for list contacts services.
 * 
 * @author mdtorres
 */
@Router('/contact')
class ContactServiceRouter {

    /**
     * Route service for access to mail list.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/list',
        method: 'post'
    })
    listContacts(request, response) {

        FluxMailFactory.INSTANCE.contactService.listContacts(request.body.skipToken, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }
}

export default ContactServiceRouter;