import FluxMailLog from './FluxMailLog';

/**
 * General utility class.
 * 
 * @author mdtorres
 */
class FluxMailUtil {

    /**
     * Set information of error in response.
     * 
     * @param {Object} request request for calling service
     * @param {Object} response response of service
     * @param {Object} error error data
     */
    static setErrorResponse(request, response, error) {
        if (request.app.get('env') !== 'development') {
            delete error.stack;
        }
        FluxMailLog.LOG.error(error);
        delete error.options;
        delete error.response;
        response.status(error.statusCode || 500).json(error);
        return response;
    }

    /**
     * Set information of error into calling external services.
     * 
     * @param {Object} reject function that returns error
     * @param {Object} err error data
     * @param {String} uri direction that gives error
     */
    static setErrorManager(reject, err, uri) {
        FluxMailLog.LOG.error('Error catch manager **** ');
        FluxMailLog.LOG.error('Error at url: ' + uri);
        FluxMailLog.LOG.error(err);
        reject(err);
    }
}

export default FluxMailUtil;