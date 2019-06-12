import {
    Router,
    RouteMapping
} from 'fwk-node/server/http';
import FluxMailFactory from '../FluxMailFactory';
import FluxMailUtil from '../util/FluxMailUtil';

/**
 * Maps and routes for list mail services.
 * 
 * @author mdtorres
 */
@Router('/mail')
class ListMailServiceRouter {

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
    listMail(request, response) {

        FluxMailFactory.INSTANCE.listMailService.listMail(request.body.top, request.body.skip, request.body.orderby, request.body.showAttachments, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Find mail details.
     *
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/',
        method: 'post'
    })
    findMail(request, response) {

        FluxMailFactory.INSTANCE.listMailService.findMail(request.body.mailId, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }
}

export default ListMailServiceRouter;