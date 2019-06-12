import {
    Router,
    RouteMapping
} from 'fwk-node/server/http';
import FluxMailFactory from '../FluxMailFactory';
import FluxMailUtil from '../util/FluxMailUtil';

/**
 * Maps and routes for attachment services.
 * 
 * @author mdtorres
 */
@Router('/attachment')
class AttachmentServiceRouter {

    /**
     * Route service for access to attachments from mail.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/list',
        method: 'post'
    })
    listAttachment(request, response) {
        FluxMailFactory.INSTANCE.attachmentService.listAttachment(request.body.mailId, request.body.onlyBasicInformation, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    @RouteMapping({
        path: '/find',
        method: 'post'
    })
    findAttachment(request, response) {
        FluxMailFactory.INSTANCE.attachmentService.findAttachment(request.body.mailId, request.body.attachmentId, request.body.onlyBasicInformation, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }
}

export default AttachmentServiceRouter;