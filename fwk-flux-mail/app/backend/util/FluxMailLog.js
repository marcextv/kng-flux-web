import {KLogFactory} from 'fwk-node/log';

let _singleton = Symbol();
let _private = new WeakMap();
/**
 * Log de la aplicacion chat
 */
class FluxMailLog {

    constructor(singletonToken) {
         if(_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        } else {
            _private.set(this, {
                log: KLogFactory.getLog('fluxMail')
            });
        }
    }

    static get INSTANCE() {
        if(!this[_singleton]) {
            this[_singleton] = new FluxMailLog(_singleton);
        }
        return this[_singleton];
    }

    get _log() {
        return _private.get(this).log;
    }

    static get LOG() {
        return FluxMailLog.INSTANCE._log;
    }
}

export default FluxMailLog;