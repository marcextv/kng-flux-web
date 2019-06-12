import {EventEmitter} from 'events';
import {ResponseTypeEnum} from 'fwk-node/server/enum';
import {ServerResponse} from 'http';
import {Socket} from 'fwk-node/server';

import FluxMailLog from '../util/FluxMailLog';
import ConnectionTypeEnum from '../enum/ConnectionTypeEnum';
import LongPullingConnection from './LongPullingConnection';

let _private = new WeakMap();
let _singleton = Symbol();

const PREFIX_CHANNEL = 'channel_';
EventEmitter.defaultMaxListeners = Infinity;

/**
 * Administra las conexiones
 * @author bcueva
 */
class ConnectionManager extends EventEmitter {

    /**
     * Constructor
     */
    constructor(singletonToken) {
        if(singletonToken !== _singleton) {
            throw new Error('No se puede instanciar esta clase');
        } else {
            super();
            _private.set(this, {
                longPulling: new LongPullingConnection()
            });
        }
    }

    /**
     * Deveulve la instancia de la clase
     * @return {ConnectionManager}
     */
    static get INSTANCE() {
        if(!this[_singleton]) {
            this[_singleton] = new ConnectionManager(_singleton);
        }
        return this[_singleton];
    }

    /**
     * Agrega una conexion
     * @author bcueva
     * @param {String} userId Id del usuario
     * @param {ServerResponse|Socket} connect 
     * @param {IncomingMessage} namespace Request de la solicitud en long pulling o namespace en websockets
     */
    add(userId, connect, namespace) {
        let typeConnection = this._getTypeConnection(connect);
        let channelName = this._getChannelName(userId);

        //Se registra un nuevo canal de comunicacion en el caso que no exista
        if(!this._hasChannel(channelName)) {
            this.setMaxListeners(this.getMaxListeners() + 1);
            let bindFunction = this._emitChannel.bind(this, userId);
            this.on(channelName, bindFunction);

             //Evento que se ejecuta cuando el evento fue llamado
            this.prependListener(channelName, (data) => {
                FluxMailLog.LOG.info(`Se emite al canal ${data.prop} con evento ${data.event}`);
            });
            FluxMailLog.LOG.info(`Se crea el canal: ${channelName}`);
        }

        //Si la conexion es long pulling
        if(typeConnection === ConnectionTypeEnum.LONG_PULLING) {
            _private.get(this).longPulling.add(userId, connect, namespace);
        }

        //Si la conexion a partir de websockets
        if(typeConnection === ConnectionTypeEnum.WEB_SOCKETS) {
            _private.get(this).webSocket.namespace = namespace;
            _private.get(this).webSocket.add(userId, connect);
        }
    }

    /**
     * Remueve una conexion del canal de comunicacion
     * @param {String} userId Id del usuario
     * @param {ServerResponse|Socket} connect 
     */
    remove(userId, connect, namespace) {
        let typeConnection = this._getTypeConnection(connect);
        let channelName = this._getChannelName(userId);

        if(this._hasChannel(channelName)) {
             //Si la conexion es long pulling
            if(typeConnection === ConnectionTypeEnum.LONG_PULLING) {
                _private.get(this).longPulling.remove(userId, namespace);
            }

            //Si la conexion a partir de websockets
            if(typeConnection === ConnectionTypeEnum.WEB_SOCKETS) {
                _private.get(this).webSocket.remove(userId, connect);
            }

            //Se valida si no existe ninguna conexion entonces se libera el canal de comunicacion
            if(!_private.get(this).longPulling.has(userId) && !_private.get(this).webSocket.has(userId)) {
                this.removeAllListeners(channelName);
                this.setMaxListeners(Math.max(this.getMaxListeners() - 1, 0));
                FluxMailLog.LOG.info(`Se remueve el canal: ${channelName}`);
            }
        }
    }

    /**
     * Determina si un usuario tiene un canal de comunicacion
     * @param {String} userId  Id del usuario
     */
    hasChannelUser(userId) {
        let channelName = this._getChannelName(userId);
        return this._hasChannel(channelName);
    }

    /**
     * Emite un evento a un canal de comunicacion
     * @author bcueva
     * @param {String} userId Nombre del canal a emitir
     * @param {Object} params Informacion a emitir
     */
    _emitChannel(userId, params) {
        _private.get(this).longPulling.emit(userId, params.data, ResponseTypeEnum.SUCCESS, params.message, params.event);
        _private.get(this).webSocket.emit(userId, params.data, params.event);
    }

    /**
     * Valida si existe listener registrados en el evento
     * @author bcueva
     * @param {String} channelName Nombre del evento
     */
    _hasChannel(channelName) {
        if(this.listenerCount(channelName) > 0) {
            return true;
        }
        return false;
    }

    _getChannelName(userId) {
        return `${PREFIX_CHANNEL}${userId}`;
    }

     /**
     * Devuelve el tipo de conexion
     * @author bcueva
     * @param {ServerResponse|Socket} connect 
     */
    _getTypeConnection(connect) {
        if(connect instanceof ServerResponse) {
            return ConnectionTypeEnum.LONG_PULLING;
        }
        if(connect instanceof Socket) {
            return ConnectionTypeEnum.WEB_SOCKETS;
        }
    }
}

export default ConnectionManager;