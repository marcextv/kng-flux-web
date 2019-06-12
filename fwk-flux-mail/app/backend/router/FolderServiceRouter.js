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
@Router('/folder')
class FolderServiceRouter {

    /**
     * Route service for acfess to find folder by name resource.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/find',
        method: 'post'
    })
    findFolder(request, response) {

        FluxMailFactory.INSTANCE.folderService.findFolder(request.body.folderName, request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }

    /**
     * Route service for access to find deleted item folder.
     * 
     * @param {Object} request request data
     * @param {Object} response response from service
     */
    @RouteMapping({
        path: '/deletedItem',
        method: 'post'
    })
    findDelete(request, response) {

        FluxMailFactory.INSTANCE.folderService.findDelete(request.body.token)
            .then(data => {
                var parsed = JSON.parse(data);
                response.json(parsed);
            })
            .catch(error => {
                FluxMailUtil.setErrorResponse(request, response, error);
            });
    }
}

export default FolderServiceRouter;