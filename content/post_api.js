/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js":
/*!************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const guid_typescript_1 = __webpack_require__(/*! guid-typescript */ "./node_modules/guid-typescript/dist/guid.js");
class MarioEvent {
    constructor(event, data, id) {
        this.event = event;
        this.data = data;
        this.id = id ? id : guid_typescript_1.Guid.create().toString();
    }
}
exports.MarioEvent = MarioEvent;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ContentDispatcher/Bg/ContentDispatcherService.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/ContentDispatcher/Bg/ContentDispatcherService.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ContentDispatcherService {
    constructor() {
        this.listeners = {};
        this.listenersIndex = {};
        this.counter = 0;
        chrome.runtime.onMessage.addListener((message) => {
            if (!this.isEventMessage(message)) {
                return;
            }
            if (!this.hasEventListeners(message.event)) {
                console.log(`ContentDispatcherService: no listeners for an event ${message.event}`);
                return;
            }
            const promises = [];
            const listeners = this.listeners[message.event];
            for (const key of Object.keys(listeners)) {
                const listener = listeners[key];
                const promise = listener(message);
                promises.push(promise);
            }
            Promise.all(promises).then();
            return false;
        });
    }
    emit(event, callback) {
        chrome.runtime.sendMessage(event, callback);
    }
    on(event, handler) {
        const id = ++this.counter;
        if (!this.hasEventListeners(event)) {
            this.listeners[event] = {};
        }
        this.listeners[event][id] = handler;
        this.listenersIndex[id] = event;
        return id;
    }
    hasEventListeners(event) {
        return typeof this.listeners[event] !== 'undefined';
    }
    removeListener(listenerId) {
        if (this.hasListener(listenerId)) {
            const event = this.listenersIndex[listenerId];
            delete this.listeners[event][listenerId];
            delete this.listenersIndex[listenerId];
        }
    }
    hasListener(listenerId) {
        return this.listenersIndex.hasOwnProperty(listenerId);
    }
    getListener(listenerId) {
        if (!this.hasListener(listenerId)) {
            // todo
            throw new Error('boom');
        }
        const event = this.listenersIndex[listenerId];
        return this.listeners[event][listenerId];
    }
    isEventMessage(message) {
        return (typeof message === 'object') && (typeof message.event === 'string');
    }
}
exports.ContentDispatcherService = ContentDispatcherService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Bg/PostBgEvents.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Bg/PostBgEvents.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var PostBgEvents;
(function (PostBgEvents) {
    PostBgEvents["RESPONSE"] = "WINDOW_POST_MESSAGE_RESPONSE";
    PostBgEvents["EVENT"] = "WINDOW_POST_MESSAGE_EVENT";
})(PostBgEvents = exports.PostBgEvents || (exports.PostBgEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Client/PostClient.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Client/PostClient.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class PostClient {
    constructor(name, destination) {
        this.name = name;
        this.destination = destination;
        this.serverListeners = {};
        this.bgRequestsListeners = {};
        this.bgEventsListeners = {};
        window.addEventListener('message', (message) => {
            const data = message.data;
            const isNotForMe = !(data.destination && data.destination === this.name);
            const hasNotEventProp = !data.event;
            if (isNotForMe || hasNotEventProp) {
                return;
            }
            if (data.event === 'MARIO_POST_SERVER__BG_RESPONSE') {
                const response = data.args;
                if (this.hasBgRequestListener(response.requestId)) {
                    try {
                        this.bgRequestsListeners[response.requestId](response.response);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    delete this.bgRequestsListeners[response.requestId];
                }
            }
            else if (data.event === 'MARIO_POST_SERVER__BG_EVENT') {
                const response = data.args;
                if (this.hasBgEventListener(response.event)) {
                    try {
                        this.bgEventsListeners[data.id](response.payload);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            else if (this.hasServerListener(data.event)) {
                try {
                    this.serverListeners[data.event](data.args);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                console.log(`event not handled: ${data.event}`);
            }
        });
    }
    emitToServer(event, args) {
        const id = this.generateUIID();
        const message = {
            args,
            destination: this.destination,
            event,
            id,
        };
        window.postMessage(message, location.origin);
        return id;
    }
    emitToBg(bgEventName, args) {
        const requestId = this.generateUIID();
        const request = { bgEventName, requestId, args };
        this.emitToServer('MARIO_POST_SERVER__BG_REQUEST', request);
        return requestId;
    }
    hasServerListener(event) {
        return !!this.serverListeners[event];
    }
    hasBgRequestListener(requestId) {
        return !!this.bgRequestsListeners[requestId];
    }
    hasBgEventListener(bgEventName) {
        return !!this.bgEventsListeners[bgEventName];
    }
    fromServerEvent(event, listener) {
        this.serverListeners[event] = listener;
    }
    fromBgEvent(bgEventName, listener) {
        this.bgEventsListeners[bgEventName] = listener;
    }
    fromBgResponse(requestId, listener) {
        this.bgRequestsListeners[requestId] = listener;
    }
    generateUIID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.PostClient = PostClient;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Client/PostClientEvents.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Client/PostClientEvents.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var PostClientEvents;
(function (PostClientEvents) {
    PostClientEvents["BG_REQUEST"] = "MARIO_POST_SERVER__BG_REQUEST";
})(PostClientEvents = exports.PostClientEvents || (exports.PostClientEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/PostHelper.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/PostHelper.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class PostHelper {
    static serverName() {
        return `MARIO_POST_SERVER_${chrome.runtime.id}`;
    }
    static clientName() {
        return `MARIO_POST_CLIENT_${chrome.runtime.id}`;
    }
}
exports.PostHelper = PostHelper;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Server/PostServer.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Server/PostServer.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostBgEvents_1 = __webpack_require__(/*! ../Bg/PostBgEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Bg/PostBgEvents.js");
const MarioEvent_1 = __webpack_require__(/*! ./../../../Core/MarioEvent */ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js");
const PostServerEvents_1 = __webpack_require__(/*! ./PostServerEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Server/PostServerEvents.js");
const guid_typescript_1 = __webpack_require__(/*! guid-typescript */ "./node_modules/guid-typescript/dist/guid.js");
const PostClientEvents_1 = __webpack_require__(/*! ../Client/PostClientEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Client/PostClientEvents.js");
class PostServer {
    constructor(name, destination, dispatcher) {
        this.name = name;
        this.destination = destination;
        this.dispatcher = dispatcher;
        this.listeners = {};
        window.addEventListener('message', (message) => {
            const data = message.data;
            const isNotForMe = !(data.destination && data.destination === this.name);
            const hasNotEventProp = !data.event;
            if (isNotForMe || hasNotEventProp) {
                return;
            }
            if (data.event === PostClientEvents_1.PostClientEvents.BG_REQUEST) {
                const request = data.args;
                this.dispatcher.emit(new MarioEvent_1.MarioEvent(request.bgEventName, request.args, request.requestId));
            }
            else if (this.hasClientListener(data.event)) {
                this.listeners[data.event](data.args);
            }
        });
        this.dispatcher.on(PostBgEvents_1.PostBgEvents.RESPONSE, (marioEvent) => {
            const response = marioEvent.data;
            const args = {
                requestId: marioEvent.id,
                response: response.response,
            };
            this.emitToClient(PostServerEvents_1.PostServerEvents.BG_RESPONSE, args);
        });
        this.dispatcher.on(PostBgEvents_1.PostBgEvents.EVENT, (marioEvent) => {
            const payload = marioEvent.data;
            const args = {
                event: payload.event,
                payload: payload.payload,
            };
            this.emitToClient(PostServerEvents_1.PostServerEvents.BG_EVENT, args);
        });
    }
    emitToClient(event, args) {
        const message = {
            args,
            destination: this.destination,
            event,
            id: guid_typescript_1.Guid.create().toString(),
        };
        window.postMessage(message, location.origin);
    }
    fromClient(event, listener) {
        this.listeners[event] = listener;
    }
    hasClientListener(event) {
        return !!this.listeners[event];
    }
}
exports.PostServer = PostServer;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Server/PostServerEvents.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Server/PostServerEvents.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var PostServerEvents;
(function (PostServerEvents) {
    PostServerEvents["BG_RESPONSE"] = "MARIO_POST_SERVER__BG_RESPONSE";
    PostServerEvents["BG_EVENT"] = "MARIO_POST_SERVER__BG_EVENT";
})(PostServerEvents = exports.PostServerEvents || (exports.PostServerEvents = {}));


/***/ }),

/***/ "./node_modules/guid-typescript/dist/guid.js":
/*!***************************************************!*\
  !*** ./node_modules/guid-typescript/dist/guid.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
var Guid = /** @class */ (function () {
    function Guid(guid) {
        if (!guid) {
            throw new TypeError("Invalid argument; `value` has no value.");
        }
        this.value = Guid.EMPTY;
        if (guid && Guid.isGuid(guid)) {
            this.value = guid;
        }
    }
    Guid.isGuid = function (guid) {
        var value = guid.toString();
        return guid && (guid instanceof Guid || Guid.validator.test(value));
    };
    Guid.create = function () {
        return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-"));
    };
    Guid.createEmpty = function () {
        return new Guid("emptyguid");
    };
    Guid.parse = function (guid) {
        return new Guid(guid);
    };
    Guid.raw = function () {
        return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-");
    };
    Guid.gen = function (count) {
        var out = "";
        for (var i = 0; i < count; i++) {
            // tslint:disable-next-line:no-bitwise
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    };
    Guid.prototype.equals = function (other) {
        // Comparing string `value` against provided `guid` will auto-call
        // toString on `guid` for comparison
        return Guid.isGuid(other) && this.value === other.toString();
    };
    Guid.prototype.isEmpty = function () {
        return this.value === Guid.EMPTY;
    };
    Guid.prototype.toString = function () {
        return this.value;
    };
    Guid.prototype.toJSON = function () {
        return {
            value: this.value
        };
    };
    Guid.validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");
    Guid.EMPTY = "00000000-0000-0000-0000-000000000000";
    return Guid;
}());
exports.Guid = Guid;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Use.js ***!
  \********************************************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ContentDispatcherService_1 = __webpack_require__(/*! ../ContentDispatcher/Bg/ContentDispatcherService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ContentDispatcher/Bg/ContentDispatcherService.js");
const PostClient_1 = __webpack_require__(/*! ./Client/PostClient */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Client/PostClient.js");
const PostServer_1 = __webpack_require__(/*! ./Server/PostServer */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/Server/PostServer.js");
const PostHelper_1 = __webpack_require__(/*! ./PostHelper */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/PostHelper.js");
if (document.contentType === 'text/html') {
    const dispatcher = new ContentDispatcherService_1.ContentDispatcherService();
    const serverName = PostHelper_1.PostHelper.serverName();
    const clientName = PostHelper_1.PostHelper.clientName();
    const server = new PostServer_1.PostServer(serverName, clientName, dispatcher);
    window[Symbol.for(serverName)] = server;
    const script = document.createElement('script');
    script.innerHTML = `
    window[Symbol.for('${clientName}')] = new (${PostClient_1.PostClient.toString()})('${clientName}', '${serverName}')`;
    script.async = false;
    document.documentElement.appendChild(script);
}

})();

/******/ })()
;
//# sourceMappingURL=post_api.js.map