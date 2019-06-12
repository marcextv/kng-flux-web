import {
    ResponseTypeEnum
} from 'fwk-node/server/enum';
import {
    Router,
    RouteMapping
} from 'fwk-node/server/http';
import FluxMailFactory from '../FluxMailFactory';
import ResponseObject from '../model/ResponseObject';
import FluxMailUtil from '../util/FluxMailUtil';

/**
 * Maps and routes for manage mail services.
 * 
 * @author mdtorres
 */
@Router('/mail')
class MailServiceRouter {

    @RouteMapping({
        path: '/send',
        method: 'post'
    })
    send(request, response) {
        FluxMailFactory.INSTANCE.mailService.send(request.body.mailId, request.body.token)
            .then(data => {
                let responseObject = new ResponseObject();
                if (data != null) {
                    responseObject.message = "Mail was send successfully";
                    responseObject.code = 200;
                    responseObject.type = 'Success';
                    response.json(responseObject, ResponseTypeEnum.SUCCESS, 'Success!!');
                } else {
                    responseObject.message = "Error while processing sending mail";
                    responseObject.code = 500;
                    responseObject.type = 'Error';
                    response.json(responseObject, ResponseTypeEnum.ERROR, 'Error!!');
                }
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Route service for access to create reply a mail.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/createReply',
        method: 'post'
    })
    createReply(request, response) {
        FluxMailFactory.INSTANCE.mailService.createReply(request.body.mailId, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Route service for access to update a mail.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/update',
        method: 'post'
    })
    update(request, response) {
        FluxMailFactory.INSTANCE.mailService.update(request.body.mailId, request.body.token, request.body.body)
            .then(data => {
                let responseObject = new ResponseObject();
                if (data != null) {
                    responseObject.message = "Mail was update";
                    responseObject.code = 200;
                    responseObject.type = 'Success';
                    response.json(responseObject, ResponseTypeEnum.SUCCESS, 'Success!!');
                } else {
                    responseObject.message = "Error while processing update";
                    responseObject.code = 500;
                    responseObject.type = 'Error';
                    response.json(responseObject, ResponseTypeEnum.ERROR, 'Error!!');
                }
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Route service for access to update mail status.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/updateReadStatus',
        method: 'post'
    })
    updateReadStatus(request, response) {

        FluxMailFactory.INSTANCE.mailService.updateReadStatus(request.body.isRead, request.body.mailId, request.body.token)
            .then(data => {
                let responseObject = new ResponseObject();
                if (data != null) {
                    responseObject.message = "Mail read status was update";
                    responseObject.code = 200;
                    responseObject.type = 'Success';
                    response.json(responseObject, ResponseTypeEnum.SUCCESS, 'Success!!');
                } else {
                    responseObject.message = "Error while processing update status";
                    responseObject.code = 500;
                    responseObject.type = 'Error';
                    response.json(responseObject, ResponseTypeEnum.ERROR, 'Error!!');
                }
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Route service for  move mail to deleted items.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/delete',
        method: 'post'
    })
    sendToDeletedItems(request, response) {
        FluxMailFactory.INSTANCE.mailService.sendToDeletedItems(request.body.mailId, request.body.token)
            .then(data => {
                let responseObject = new ResponseObject();
                if (data != null) {
                    responseObject.message = "Mail was moved to deleted items";
                    responseObject.code = 200;
                    responseObject.type = 'Success';
                    response.json(responseObject, ResponseTypeEnum.SUCCESS, 'Success!!');
                } else {
                    responseObject.message = "Error while processing move to deleted items";
                    responseObject.code = 500;
                    responseObject.type = 'Error';
                    response.json(responseObject, ResponseTypeEnum.ERROR, 'Error!!');
                }
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }
}

export default MailServiceRouter;