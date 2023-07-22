/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/bg/message-managers/message.types.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/bg/message-managers/message.types.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalMessageBgType = exports.MessageBgType = void 0;
var MessageBgType;
(function (MessageBgType) {
    MessageBgType["INIT"] = "INIT";
    MessageBgType["REQUEST_HANDLE"] = "REQUEST_HANDLE";
    MessageBgType["IFRAME_LOADED"] = "IFRAME_LOADED";
})(MessageBgType = exports.MessageBgType || (exports.MessageBgType = {}));
var InternalMessageBgType;
(function (InternalMessageBgType) {
    InternalMessageBgType["TRACK"] = "ECOMMERCE_INTERNAL_TRACK";
})(InternalMessageBgType = exports.InternalMessageBgType || (exports.InternalMessageBgType = {}));


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounce = exports.DEFAULT_DEBOUNCE_TIME = exports.pipe = exports.uuid = exports.isIframe = void 0;
function isIframe() {
    try {
        return window.self !== window.top;
    }
    catch {
        return true;
    }
}
exports.isIframe = isIframe;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.uuid = uuid;
const pipe = (...composition) => (initialValue) => composition.reduce((value, composer) => composer(value), initialValue);
exports.pipe = pipe;
exports.DEFAULT_DEBOUNCE_TIME = 150;
const debounce = (callback, wait = exports.DEFAULT_DEBOUNCE_TIME) => {
    let timerId = 0;
    const callable = (...args) => {
        clearTimeout(timerId);
        // @ts-expect-error
        timerId = setTimeout(() => callback(...args), wait);
    };
    return callable;
};
exports.debounce = debounce;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/common/observer/Observer.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/common/observer/Observer.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Observer = void 0;
class Observer {
    constructor() {
        this.listeners = {};
    }
    emit(event, payload) {
        if (!this.listeners[event]) {
            return;
        }
        const subscribers = this.listeners[event];
        subscribers.forEach((sub) => sub(payload));
    }
    subscribe(event, subscriber) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(subscriber);
    }
}
exports.Observer = Observer;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/extractor/ExtractorManager.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/extractor/ExtractorManager.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtractorManager = void 0;
const extract_1 = __webpack_require__(/*! @sugardev/json-extractor/dist/extract */ "./node_modules/@sugardev/json-extractor/dist/extract.js");
var ExtractorEvents;
(function (ExtractorEvents) {
    ExtractorEvents["RUNTIME_STORAGE_SAVE"] = "@runtime.storage.save";
})(ExtractorEvents || (ExtractorEvents = {}));
class ExtractorManager {
    constructor(templateVersion, outMessageManager, logging, storage, sharedMethods) {
        this.templateVersion = templateVersion;
        this.outMessageManager = outMessageManager;
        this.logging = logging;
        this.storage = storage;
        this.sharedMethods = sharedMethods;
    }
    run(config, scope = {}) {
        const extractor = this.makeExtractor(config.operations, document, scope);
        setTimeout(() => {
            void extractor
                .run()
                .then(data => {
                if (data) {
                    this.outMessageManager.trackMessage(config.event, this.templateVersion, data, config.customEvent);
                }
            });
        }, config.waitMs ?? 0);
    }
    get config() {
        return {
            log: this.logging
        };
    }
    makeExtractor(operations, elScope, varScope) {
        const clonedVars = { ...this.storage.getStorage(), ...varScope };
        const extractor = new extract_1.Extractor(this.config, operations, elScope, clonedVars, this.sharedMethods);
        extractor.on(ExtractorEvents.RUNTIME_STORAGE_SAVE, this.onRuntimeStorageSaveExtractorEvent.bind(this));
        return extractor;
    }
    onRuntimeStorageSaveExtractorEvent([name, value]) {
        this.storage.save(name, value);
        this.outMessageManager.runtimeStorageSaveMessage(name, value);
    }
}
exports.ExtractorManager = ExtractorManager;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/history/HistoryManager.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/history/HistoryManager.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HistoryManager = void 0;
var Events;
(function (Events) {
    Events["URL_CHANGED"] = "URL_CHANGED";
})(Events || (Events = {}));
class HistoryManager {
    constructor(observer) {
        this.observer = observer;
        this.scriptAttribute = 'extend-native-history-api';
        this.scriptPath = 'libs/extend-native-history-api.js';
        window.addEventListener('message', (event) => {
            if (event.data._custom_type_ === 'CUSTOM_ON_URL_CHANGED') {
                this.observer.emit(Events.URL_CHANGED, location.href);
            }
        });
    }
    replaceNativeApi() {
        this.waitDomReady();
    }
    onUrlChanged(func) {
        this.observer.subscribe(Events.URL_CHANGED, func);
    }
    waitDomReady() {
        setTimeout(() => {
            this.injectScript();
        }, 0);
    }
    injectScript() {
        if (this.isHistoryScriptInjected()) {
            return;
        }
        const script = document.createElement('script');
        script.setAttribute('ecommerce-type', this.scriptAttribute);
        const inject = () => {
            const nativePushState = history.pushState;
            const nativeReplaceState = history.replaceState;
            const nativeBack = history.back;
            const nativeForward = history.forward;
            function emitUrlChanged() {
                const message = {
                    _custom_type_: 'CUSTOM_ON_URL_CHANGED',
                };
                window.postMessage(message);
            }
            history.pushState = function () {
                nativePushState.apply(history, arguments);
                emitUrlChanged();
            };
            history.replaceState = function () {
                nativeReplaceState.apply(history, arguments);
                emitUrlChanged();
            };
            history.back = function () {
                nativeBack.apply(history, arguments);
                emitUrlChanged();
            };
            history.forward = function () {
                nativeForward.apply(history, arguments);
                emitUrlChanged();
            };
        };
        script.innerHTML = `(${inject.toString()})()`;
        if (document.contentType === 'text/html') {
            (document.head || document.documentElement).append(script);
        }
    }
    isHistoryScriptInjected() {
        const v2Injected = Boolean(document.querySelector(`script[ecommerce-type="${this.scriptAttribute}"]`));
        const v3Injected = Boolean(document.querySelector(`script[src*="${this.scriptPath}"]`));
        return v2Injected || v3Injected;
    }
}
exports.HistoryManager = HistoryManager;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/InContentMessageManager.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/InContentMessageManager.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InContentMessageManager = void 0;
const message_types_1 = __webpack_require__(/*! ../../bg/message-managers/message.types */ "./node_modules/@sugardev/ecommerce-streams/dist/bg/message-managers/message.types.js");
const helpers_1 = __webpack_require__(/*! ../../common/libs/helpers */ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js");
const ExtractorManager_1 = __webpack_require__(/*! ../extractor/ExtractorManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/extractor/ExtractorManager.js");
const ContentStorage_1 = __webpack_require__(/*! ../storage/ContentStorage */ "./node_modules/@sugardev/ecommerce-streams/dist/content/storage/ContentStorage.js");
class InContentMessageManager {
    constructor(id, outMessageManager, history, requestsManager) {
        this.id = id;
        this.outMessageManager = outMessageManager;
        this.history = history;
        this.requestsManager = requestsManager;
        chrome.runtime.onMessage.addListener(this.bindListeners.bind(this));
        this.history.onUrlChanged(this.onUrlChanged.bind(this));
        this.requestsManager.onHttpDataSave(this.onHttpDataSave.bind(this));
    }
    onInit(message) {
        const { payload } = message;
        const { logging, templateVersion, config, varScope } = payload;
        this.config = config;
        this.logging = logging;
        this.storage = new ContentStorage_1.ContentStorage(this.logging);
        this.extractor = new ExtractorManager_1.ExtractorManager(templateVersion, this.outMessageManager, this.logging, this.storage, this.config.func);
        try {
            if (document.body.getAttribute(this.processedFlagAttribute)) {
                // already initialized
                return;
            }
        }
        catch (e) {
            // probably it's iframe that temporally does not have body
            setTimeout(() => this.onInit(message), 100);
            return;
        }
        document.body.setAttribute(this.processedFlagAttribute, 'true');
        this.storage.initStorage(varScope);
        this.initClickHandlers();
        this.initLoadHandlers();
    }
    onRequestHandle({ payload }) {
        const { onHttpRequest = [], onHttpResponse = [] } = payload.config;
        if ((onHttpRequest.length > 0) || (onHttpResponse.length > 0)) {
            this.requestsManager.injectInterceptors(onHttpRequest, onHttpResponse);
        }
    }
    onIframeLoaded({ payload }) {
        if ((0, helpers_1.isIframe)()) {
            return;
        }
        const { url } = payload;
        this.config?.onIframeLoaded?.forEach((config) => {
            if (InContentMessageManager.isConfigMatchesUrl(config, url)) {
                this.extractor?.run?.(config);
            }
        });
    }
    initLoadHandlers() {
        if ((0, helpers_1.isIframe)()) {
            return;
        }
        this.config?.onLoad?.forEach((config) => this.extractor?.run?.(config));
    }
    initClickHandlers() {
        const clickHandler = (event) => {
            const $eventId = (0, helpers_1.uuid)();
            this.config?.onClick?.forEach((config) => {
                if (event.target.matches(config.selector)) {
                    const scope = {
                        $element: event.target,
                        $event: event,
                        $eventId
                    };
                    this.extractor?.run?.(config, scope);
                }
            });
        };
        const options = {
            capture: true
        };
        document.addEventListener('click', clickHandler, options);
    }
    onHttpDataSave(data) {
        this.storage.upsert(data.variable, data.payload);
    }
    onUrlChanged(url) {
        this.config?.onUrlChanged?.forEach((config) => {
            if (InContentMessageManager.isConfigMatchesUrl(config, url)) {
                this.extractor?.run?.(config);
            }
        });
    }
    bindListeners(message) {
        const handler = {
            [message_types_1.MessageBgType.INIT]: this.onInit.bind(this),
            [message_types_1.MessageBgType.REQUEST_HANDLE]: this.onRequestHandle.bind(this),
            [message_types_1.MessageBgType.IFRAME_LOADED]: this.onIframeLoaded.bind(this)
        };
        if (!handler[message.type]) {
            if (this.logging) {
                console.log('Ignored message', message);
            }
            return;
        }
        handler[message.type](message);
    }
    static isConfigMatchesUrl({ regex }, url) {
        return (new RegExp(regex, 'i')).test(url);
    }
    get processedFlagAttribute() {
        return `__processed_${this.id}__`;
    }
}
exports.InContentMessageManager = InContentMessageManager;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/OutContentMessageManager.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/OutContentMessageManager.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutContentMessageManager = void 0;
const message_types_1 = __webpack_require__(/*! ./message.types */ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/message.types.js");
const helpers_1 = __webpack_require__(/*! ../../common/libs/helpers */ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js");
class OutContentMessageManager {
    constructor(id) {
        this.id = id;
    }
    trackMessage(eventType, templateVersion, data = {}, customEvent = false) {
        const message = {
            id: this.id,
            type: message_types_1.MessageContentType.ECOMMERCE_TRACK,
            customEvent,
            payload: {
                templateVersion,
                event: eventType,
                clientTs: Date.now(),
                url: location.href,
                title: document.title,
                lang: document.documentElement.lang,
                data,
            },
        };
        this.sendMessage(message);
    }
    initMessage() {
        const message = {
            id: this.id,
            type: message_types_1.MessageContentType.ECOMMERCE_INIT,
            payload: {
                url: document.location.href,
                isIframe: (0, helpers_1.isIframe)()
            }
        };
        this.sendMessage(message);
    }
    sendMessage(message) {
        void chrome.runtime.sendMessage(message);
    }
    runtimeStorageSaveMessage(name, data) {
        const message = {
            id: this.id,
            type: message_types_1.MessageContentType.ECOMMERCE_RUNTIME_STORAGE_SAVE,
            payload: {
                name,
                data
            }
        };
        this.sendMessage(message);
    }
}
exports.OutContentMessageManager = OutContentMessageManager;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/message.types.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/message.types.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageContentType = void 0;
var MessageContentType;
(function (MessageContentType) {
    MessageContentType["ECOMMERCE_INIT"] = "ECOMMERCE_INIT";
    MessageContentType["ECOMMERCE_TRACK"] = "ECOMMERCE_TRACK";
    MessageContentType["ECOMMERCE_RUNTIME_STORAGE_SAVE"] = "ECOMMERCE_RUNTIME_STORAGE_SAVE";
})(MessageContentType = exports.MessageContentType || (exports.MessageContentType = {}));


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/requests/RequestsManager.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/requests/RequestsManager.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestsManager = void 0;
var Events;
(function (Events) {
    Events["SAVE_HTTP_DATA"] = "SAVE_HTTP_DATA";
    Events["INIT_HTTP_SCRIPT"] = "INIT_HTTP_SCRIPT";
})(Events || (Events = {}));
class RequestsManager {
    constructor(observer) {
        this.observer = observer;
        this.scriptAttribute = 'requests';
        this.scriptPath = 'requests.js';
        this.isInitiated = false;
        window.addEventListener('message', (event) => {
            if (event.data._custom_type_ === 'SAVE_HTTP_DATA') {
                this.observer.emit(Events.SAVE_HTTP_DATA, JSON.parse(JSON.stringify(event.data.payload)));
            }
            if (event.data._custom_type_ === 'HTTP_SCRIPT_INITIATED') {
                this.observer.emit(Events.INIT_HTTP_SCRIPT);
            }
        });
    }
    injectInterceptors(onHttpRequest, onHttpResponse = []) {
        if (this.isInitiated) {
            return;
        }
        this.injectScript();
        const callback = () => {
            const message = {
                _custom_type_: 'INIT_HTTP_CONFIG',
                payload: { onHttpRequest, onHttpResponse }
            };
            window.postMessage(message);
        };
        this.sendHttpConfig(callback);
    }
    onHttpDataSave(callback) {
        this.observer.subscribe(Events.SAVE_HTTP_DATA, callback);
    }
    sendHttpConfig(callback) {
        this.observer.subscribe(Events.INIT_HTTP_SCRIPT, callback);
    }
    injectScript() {
        if (this.isRequestsScriptInjected()) {
            return;
        }
        const script = document.createElement('script');
        script.setAttribute('ecommerce-type', this.scriptAttribute);
        const inject = () => {
            class RequestValidator {
            }
            class InterceptorAdapter {
            }
            class InterceptorCommunicator {
                constructor() {
                    this.dispatchInitEvent();
                }
                dispatchEvent(messageEvent) {
                    const message = {
                        _custom_type_: 'SAVE_HTTP_DATA',
                        payload: messageEvent
                    };
                    window.postMessage(message);
                }
                dispatchInitEvent() {
                    const message = {
                        _custom_type_: 'HTTP_SCRIPT_INITIATED'
                    };
                    window.postMessage(message);
                }
            }
            class InterceptorValidator extends RequestValidator {
                validateRequest(url, method = 'GET') {
                    if (!this.onHttpRequest?.length) {
                        return false;
                    }
                    return this.onHttpRequest.find(this.httpMatherPredicate(url, method)) ?? false;
                }
                validateResponse(url, method = 'GET') {
                    if (!this.onHttpResponse?.length) {
                        return false;
                    }
                    return this.onHttpResponse.find(this.httpMatherPredicate(url, method)) ?? false;
                }
                setConfig(onHttpRequest, onHttpResponse) {
                    this.onHttpRequest = onHttpRequest;
                    this.onHttpResponse = onHttpResponse;
                }
                httpMatherPredicate(url, method) {
                    return ({ regex, methods }) => {
                        const regexMather = new RegExp(regex, 'i');
                        return methods.includes(method) && regexMather.test(url);
                    };
                }
            }
            class FetchInterceptorAdapter extends InterceptorAdapter {
                constructor(validator, communicator) {
                    super();
                    this.validator = validator;
                    this.communicator = communicator;
                    this.initInterceptor();
                }
                static init(validator, communicator) {
                    if (this.instance) {
                        return;
                    }
                    this.instance = new FetchInterceptorAdapter(validator, communicator);
                }
                async interceptRequest(url, params) {
                    const method = params?.method;
                    const body = params?.body;
                    const requestMatches = this.validator.validateRequest(url, method);
                    if (requestMatches) {
                        this.communicator.dispatchEvent({ variable: requestMatches.var, payload: body });
                    }
                }
                async interceptResponse(response, [url, params]) {
                    const method = params?.method;
                    const responseMatches = this.validator.validateResponse(url, method);
                    if (responseMatches) {
                        await this.proceedResponse(response, responseMatches.var);
                    }
                }
                async proceedResponse(response, variable) {
                    const clonedResponse = await response.clone();
                    const type = response.headers.get('content-type');
                    if (!type) {
                        return;
                    }
                    if (type.includes('json')) {
                        this.communicator.dispatchEvent({ variable, payload: await clonedResponse.json() });
                    }
                    else if (type.includes('text')) {
                        this.communicator.dispatchEvent({ variable, payload: await clonedResponse.text() });
                    }
                }
                initInterceptor() {
                    const originalFetch = window.fetch;
                    window.fetch = async (...params) => {
                        // @ts-expect-error
                        void this.interceptRequest(...params);
                        const response = await originalFetch(...params);
                        // @ts-expect-error
                        void this.interceptResponse(response, params);
                        return response;
                    };
                }
            }
            class HHRInterceptorAdapter extends InterceptorAdapter {
                constructor(validator, communicator) {
                    super();
                    this.validator = validator;
                    this.communicator = communicator;
                    this.initInterceptor();
                }
                static init(validator, communicator) {
                    if (this.instance) {
                        return;
                    }
                    this.instance = new HHRInterceptorAdapter(validator, communicator);
                }
                async interceptRequest({ method, url, body }) {
                    const requestMatches = this.validator.validateRequest(url, method);
                    if (requestMatches) {
                        this.communicator.dispatchEvent({ variable: requestMatches.var, payload: body });
                    }
                }
                async interceptResponse({ status, response, responseType, method, url }) {
                    const responseMatches = this.validator.validateResponse(url, method);
                    if (`${status}`.startsWith('20') && responseMatches) {
                        this.proceedResponse(response, responseType, responseMatches.var);
                    }
                }
                proceedResponse(response, responseType, variable) {
                    if (responseType === 'json') {
                        this.communicator.dispatchEvent({ variable, payload: response });
                    }
                    else if (responseType === 'text' || responseType === '') {
                        try {
                            this.communicator.dispatchEvent({ variable, payload: JSON.parse(response) });
                        }
                        catch {
                            this.communicator.dispatchEvent({ variable, payload: response });
                        }
                    }
                }
                initInterceptor() {
                    const open = XMLHttpRequest.prototype.open;
                    const send = XMLHttpRequest.prototype.send;
                    const $this = this;
                    window.XMLHttpRequest.prototype.open = function (...params) {
                        this.__METHOD__ = params[0];
                        this.__URL__ = params[1];
                        this.addEventListener('load', function ({ target }) {
                            void $this.interceptResponse({
                                status: target.status,
                                response: target.response,
                                responseType: target.responseType,
                                method: params[0],
                                url: params[1]
                            });
                        });
                        return open.apply(this, params);
                    };
                    window.XMLHttpRequest.prototype.send = function (...params) {
                        void $this.interceptRequest({
                            method: this.__METHOD__,
                            url: this.__URL__,
                            body: params[0]
                        });
                        return send.apply(this, params);
                    };
                }
            }
            const communicator = new InterceptorCommunicator();
            const validator = new InterceptorValidator();
            FetchInterceptorAdapter.init(validator, communicator);
            HHRInterceptorAdapter.init(validator, communicator);
            window.addEventListener('message', (event) => {
                if (event.data?._custom_type_ !== 'INIT_HTTP_CONFIG') {
                    return;
                }
                const { onHttpRequest, onHttpResponse } = event.data.payload;
                validator.setConfig(onHttpRequest, onHttpResponse);
            });
        };
        script.innerHTML = `(${inject.toString()})()`;
        if (document.contentType === 'text/html') {
            (document.head || document.documentElement).append(script);
        }
        this.isInitiated = true;
    }
    isRequestsScriptInjected() {
        const v2Injected = Boolean(document.querySelector(`script[ecommerce-type="${this.scriptAttribute}"]`));
        const v3Injected = Boolean(document.querySelector(`script[src*="${this.scriptPath}"]`));
        return v2Injected || v3Injected;
    }
}
exports.RequestsManager = RequestsManager;


/***/ }),

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/storage/ContentStorage.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/storage/ContentStorage.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentStorage = void 0;
class ContentStorage {
    constructor(logging) {
        this.logging = logging;
        this.runtimeStorage = new Map();
    }
    initStorage(varScope) {
        this.runtimeStorage = new Map(Object.entries(varScope));
    }
    save(name, data) {
        if (this.logging) {
            console.log(`Runtime storage save: key=${name}, value=`, data);
        }
        this.runtimeStorage.set(name, data);
    }
    getStorage() {
        return Object.fromEntries(this.runtimeStorage);
    }
    getItem(name) {
        return this.runtimeStorage.get(name);
    }
    upsert(name, data) {
        const savedData = this.runtimeStorage.has(name) ? [...this.getItem(name), data] : [data];
        if (this.logging) {
            console.log('Runtime storage save intercepted data: ', [name, savedData]);
        }
        this.runtimeStorage.set(name, savedData);
    }
}
exports.ContentStorage = ContentStorage;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/extract.js":
/*!***************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/extract.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Extractor = void 0;
const observer_1 = __webpack_require__(/*! ./observer */ "./node_modules/@sugardev/json-extractor/dist/observer.js");
const program_factory_1 = __webpack_require__(/*! ./program.factory */ "./node_modules/@sugardev/json-extractor/dist/program.factory.js");
const utils_1 = __webpack_require__(/*! ./utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Extractor {
    constructor(config, program, elScope, varScope, funcs) {
        this.config = config;
        this.program = program;
        this.elScope = elScope;
        this.varScope = varScope;
        this.funcs = funcs;
        this.observer = new observer_1.Observer();
    }
    async run() {
        const factory = new program_factory_1.ProgramFactory();
        const main = factory.create(this.config, this.observer, this.elScope, this.varScope, this.funcs);
        for (const operation of this.program) {
            const result = await main.handle(operation);
            if ((0, utils_1.isFailed)(result, operation)) {
                return false;
            }
            if (result.return) {
                return result.value.value;
            }
        }
        return {};
    }
    on(event, subscriber) {
        this.observer.subscribe(event, subscriber);
    }
}
exports.Extractor = Extractor;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/extract.types.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/extract.types.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowList = exports.SINGLE_GET_TYPE = exports.OperationType = void 0;
var OperationType;
(function (OperationType) {
    OperationType["SINGLE"] = "single";
    OperationType["PLURAL"] = "plural";
    OperationType["SPLIT_SCOPE"] = "splitScope";
    OperationType["OR"] = "or";
    OperationType["AND"] = "and";
    OperationType["COMPUTED"] = "computed";
    OperationType["EXIST"] = "exist";
    OperationType["LOG"] = "log";
    OperationType["IS_NOT_HIDDEN_ELEMENT"] = "isNotHiddenElement";
    OperationType["MARK_PROCESSED_ELEMENT"] = "markProcessedElement";
    OperationType["WAIT_FOR_NOT_PROCESSED_ELEMENT"] = "waitForNotProcessedElement";
    OperationType["WAIT_FOR_URL_CHANGED"] = "waitForUrlChanged";
    OperationType["FUNC"] = "func";
    OperationType["SELECT"] = "select";
    OperationType["CALL_METHOD"] = "callMethod";
    OperationType["GET_PROPERTY"] = "property";
    OperationType["LITERAL"] = "literal";
    OperationType["VAR"] = "var";
    OperationType["FOR_EACH"] = "forEach";
    OperationType["RETURN"] = "return";
    OperationType["MAP"] = "map";
    OperationType["MERGE"] = "merge";
    OperationType["CLOSEST"] = "closest";
    OperationType["PRICE_PARSER"] = "priceParser";
    OperationType["JSON_PARSER"] = "jsonParser";
    OperationType["HTML_COLLECTOR"] = "htmlCollector";
    OperationType["EMIT"] = "emit";
    OperationType["FLOW"] = "flow";
    OperationType["CONDITION"] = "condition";
    OperationType["REPLACE"] = "replace";
    OperationType["REPLACE_BETWEEN"] = "replaceBetween";
    OperationType["MATH"] = "math";
    OperationType["GLOBAL_VAR"] = "globalVar";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
var SINGLE_GET_TYPE;
(function (SINGLE_GET_TYPE) {
    SINGLE_GET_TYPE["TEXT"] = "text";
    SINGLE_GET_TYPE["VALUE"] = "value";
    SINGLE_GET_TYPE["ATTRIBUTE"] = "attribute";
})(SINGLE_GET_TYPE = exports.SINGLE_GET_TYPE || (exports.SINGLE_GET_TYPE = {}));
var FlowList;
(function (FlowList) {
    FlowList["NONE"] = "none";
    FlowList["THEN"] = "then";
    FlowList["ELSE"] = "else";
})(FlowList = exports.FlowList || (exports.FlowList = {}));


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/observer.js":
/*!****************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/observer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Observer = void 0;
class Observer {
    constructor() {
        this.listeners = {};
    }
    emit(event, payload) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach((sub) => sub(payload));
    }
    subscribe(event, subscriber) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(subscriber);
    }
}
exports.Observer = Observer;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/baseHandler.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/baseHandler.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseHandler = void 0;
class BaseHandler {
    constructor(main, observer, factory, logger) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
    }
}
exports.BaseHandler = BaseHandler;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/collector/htmlCollector.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/collector/htmlCollector.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlCollector = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class HtmlCollector {
    constructor(main, observer, factory, logger) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
    }
    type() {
        return extract_types_1.OperationType.HTML_COLLECTOR;
    }
    async handle({ selector }) {
        const elScope = this.main.getElScopeRef();
        try {
            const targetElement = elScope.querySelector(selector);
            if (!targetElement) {
                return await (0, utils_1.failed)();
            }
            const result = JSON.stringify(targetElement.outerHTML);
            return await (0, utils_1.succeeded)(result);
        }
        catch (error) {
            this.logger.error('HtmlCollector: ', error);
            return await (0, utils_1.failed)();
        }
    }
}
exports.HtmlCollector = HtmlCollector;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/computed.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/computed.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Computed = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Computed {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.COMPUTED;
    }
    async handle(operation) {
        const path = [];
        for (const subject of operation.subjects) {
            const varName = (await this.main.handle(subject)).value.value;
            path.push(varName);
        }
        let value;
        if (Array.isArray(operation.value)) {
            value = [];
            for (const v of operation.value) {
                value.push((await this.main.handle(v)).value.value);
            }
        }
        else {
            value = (await this.main.handle(operation.value)).value.value;
        }
        const setVarOperation = {
            var: path.join('.'),
            type: extract_types_1.OperationType.LITERAL,
            value,
            accumulate: operation.accumulate
        };
        await this.main.handle(setVarOperation);
        return await (0, utils_1.succeeded)(value);
    }
}
exports.Computed = Computed;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/closest.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/closest.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Closest = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Closest {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.CLOSEST;
    }
    async handle(operation) {
        const res = await this.main.handle(operation.subject);
        if (!res.success) {
            return await (0, utils_1.failed)();
        }
        const subject = res.value.value;
        const selector = await this.main.handle(operation.selector);
        if (!selector.success) {
            return await (0, utils_1.failed)();
        }
        const el = subject.closest(selector.value.value);
        return await (0, utils_1.succeeded)(el);
    }
}
exports.Closest = Closest;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/existElement.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/existElement.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExistElement = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class ExistElement {
    constructor(main, observer, factory, logger) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
    }
    type() {
        return extract_types_1.OperationType.EXIST;
    }
    async handle(operation) {
        const elScope = this.main.getElScopeRef();
        try {
            for (const selector of operation.selectors) {
                const target = elScope.querySelector(selector);
                if (target) {
                    return await (0, utils_1.succeeded)(true);
                }
            }
        }
        catch (e) {
            this.logger.error(e);
            return await (0, utils_1.failed)();
        }
        return await (0, utils_1.failed)(false);
    }
}
exports.ExistElement = ExistElement;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/globalVar.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/globalVar.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalVar = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class GlobalVar {
    type() {
        return extract_types_1.OperationType.GLOBAL_VAR;
    }
    async handle(operation) {
        const globalWindow = window || globalThis;
        if (!globalWindow || globalWindow[operation.value] == null) {
            return await (0, utils_1.failed)();
        }
        return await (0, utils_1.succeeded)(globalWindow[operation.value]);
    }
}
exports.GlobalVar = GlobalVar;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/isNotHiddenElement.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/isNotHiddenElement.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsNotHiddenElement = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class IsNotHiddenElement {
    constructor(main, observer, factory, logger) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
    }
    type() {
        return extract_types_1.OperationType.IS_NOT_HIDDEN_ELEMENT;
    }
    async handle(operation) {
        const elScope = this.main.getElScopeRef();
        for (const selector of operation.selectors) {
            let target;
            try {
                target = elScope.querySelector(selector);
            }
            catch (error) {
                this.logger.error('IsNotHiddenElement:', error);
                // probably not a valid selector is used
                continue;
            }
            if (!target) {
                continue;
            }
            const isVisible = !!(target.offsetWidth || target.offsetHeight || target.getClientRects().length);
            if (!isVisible) {
                continue;
            }
            return await (0, utils_1.succeeded)(true);
        }
        return await (0, utils_1.failed)(false);
    }
}
exports.IsNotHiddenElement = IsNotHiddenElement;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/select.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/select.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Select = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Select {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.SELECT;
    }
    async handle(operation) {
        const elScope = this.main.getElScopeRef();
        const res = await this.main.handle(operation.selector);
        if (!res.success) {
            return await (0, utils_1.failed)();
        }
        const target = elScope.querySelector(res.value.value);
        return await (0, utils_1.succeeded)(target);
    }
}
exports.Select = Select;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/emit.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/emit.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Emit = void 0;
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class Emit {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.EMIT;
    }
    async handle(operation) {
        const event = await this.main.handle(operation.event);
        if ((0, utils_1.isFailed)(event, operation.event)) {
            return await (0, utils_1.failed)();
        }
        if (typeof event.value.value !== 'string') {
            return await (0, utils_1.failed)();
        }
        const result = await (0, utils_1.succeeded)([]);
        if ((operation.args != null) && Array.isArray(operation.args)) {
            const program = this.factory.prototype(this.main);
            for (const arg of operation.args) {
                const payload = await this.main.handle(arg);
                if ((0, utils_1.isFailed)(payload, arg)) {
                    return await (0, utils_1.failed)();
                }
                const value = typeof payload.value.value === 'object'
                    ? (0, utils_1.clone)(payload.value.value)
                    : payload.value.value;
                result.value.value.push(value);
            }
            this.main.mergeVarScope(program.getVarScopeRef());
        }
        this.observer.emit(event.value.value, result ? result.value.value : undefined);
        return await (0, utils_1.succeeded)(true);
    }
}
exports.Emit = Emit;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/func.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/func.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Func = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Func {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.FUNC;
    }
    async handle(operation) {
        const res = await this.main.handle(operation.name);
        if (!res.success) {
            return await (0, utils_1.failed)();
        }
        const name = res.value.value;
        if (typeof name !== 'string') {
            return await (0, utils_1.failed)();
        }
        const funcs = this.main.getFuncsRef();
        if (!funcs[name]) {
            return await (0, utils_1.failed)();
        }
        const func = funcs[name];
        const localVarScope = {};
        const args = (operation.args != null) ? operation.args : [];
        for (let i = 0; i < args.length; i++) {
            const result = await this.main.handle(args[i]);
            if (!result.success) {
                return await (0, utils_1.failed)();
            }
            if (func.params[i]) {
                const varName = func.params[i];
                localVarScope[varName] = result.value.value;
            }
        }
        const program = this.factory.create(this.main.getConfig(), this.main.getObserver(), this.main.getElScopeRef(), localVarScope, funcs);
        for (const operation of func.operations) {
            const result = await program.handle(operation);
            if ((0, utils_1.isFailed)(result, operation)) {
                return await (0, utils_1.failed)(undefined);
            }
            if (operation.type === extract_types_1.OperationType.RETURN) {
                return await (0, utils_1.succeeded)(result.value.value);
            }
        }
        return await (0, utils_1.succeeded)(undefined);
    }
}
exports.Func = Func;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/literal.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/literal.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Literal = void 0;
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class Literal {
    type() {
        return extract_types_1.OperationType.LITERAL;
    }
    async handle(operation) {
        return await (0, utils_1.succeeded)(operation.value);
    }
}
exports.Literal = Literal;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/log.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/log.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Log = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Log {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.LOG;
    }
    async handle(operation) {
        const config = this.main.getConfig();
        if (!config.log) {
            return await (0, utils_1.succeeded)(true);
        }
        let msg = operation.msg;
        const varScope = this.main.getVarScopeRef();
        Object.keys(varScope).forEach((key) => {
            msg = msg.replace(`$${key}`, varScope[key]);
        });
        if (operation.args) {
            if (Array.isArray(operation.args)) {
                const args = {};
                Object.values(operation.args).forEach((key) => {
                    args[key] = varScope[key];
                });
                console.log(msg, args);
            }
            else {
                console.log(msg, varScope[operation.args]);
            }
        }
        else {
            console.log(msg);
        }
        return await (0, utils_1.succeeded)(true);
    }
}
exports.Log = Log;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/and.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/and.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.And = void 0;
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class And {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.AND;
    }
    async handle(and) {
        const program = this.factory.prototype(this.main);
        for (const operation of and.operations) {
            const result = await program.handle(operation);
            if (!result.success || !result.value.value) {
                return await (0, utils_1.failed)(false);
            }
        }
        this.main.mergeVarScope(program.getVarScopeRef());
        return await (0, utils_1.succeeded)(true);
    }
}
exports.And = And;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/condition.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/condition.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Condition = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Condition {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.CONDITION;
    }
    async handle(condition) {
        const program = this.factory.prototype(this.main);
        const left = await program.handle(condition.left);
        if (!left.success) {
            return await (0, utils_1.failed)(false);
        }
        const right = await program.handle(condition.right);
        if (!right.success) {
            return await (0, utils_1.failed)(false);
        }
        const handlers = {
            '!=': () => left.value.value != right.value.value,
            '!==': () => left.value.value !== right.value.value,
            '>': () => left.value.value > right.value.value,
            '<': () => left.value.value < right.value.value,
            '<=': () => left.value.value <= right.value.value,
            '>=': () => left.value.value >= right.value.value,
            '==': () => left.value.value == right.value.value,
            '===': () => left.value.value === right.value.value
        };
        if (!handlers[condition.operator]) {
            throw new Error('Unsupportable "cond operator"');
        }
        const result = handlers[condition.operator]();
        if (result) {
            this.main.mergeVarScope(program.getVarScopeRef());
            return await (0, utils_1.succeeded)(true);
        }
        return await (0, utils_1.failed)(false);
    }
}
exports.Condition = Condition;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/flow.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/flow.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Flow = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Flow {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.FLOW;
    }
    async handle(flow) {
        const conditionResult = {
            condition: true,
            flow: {
                name: extract_types_1.FlowList.NONE,
                result: true
            }
        };
        const program = this.factory.prototype(this.main);
        const conditionProgram = this.factory.prototype(this.main);
        for (const operation of flow.condition) {
            const result = await conditionProgram.handle(operation);
            if (!result.success || !result.value.value) {
                conditionResult.condition = false;
                break;
            }
        }
        if (conditionResult.condition) {
            program.mergeVarScope(conditionProgram.getVarScopeRef());
        }
        const currFlowName = conditionResult.condition ? extract_types_1.FlowList.THEN : extract_types_1.FlowList.ELSE;
        if (currFlowName === extract_types_1.FlowList.ELSE && typeof flow[currFlowName] === 'undefined') {
            return await (0, utils_1.failed)(conditionResult);
        }
        if (typeof flow[currFlowName] !== 'undefined') {
            conditionResult.flow.name = currFlowName;
            // @ts-expect-error
            const block = this.mapFlowBlockToFullFormat(flow[currFlowName]);
            const subProgram = this.factory.prototype(program);
            for (const operation of block.operations) {
                let failStatus = false;
                try {
                    const result = await subProgram.handle(operation);
                    failStatus = (0, utils_1.isFailed)(result, operation);
                }
                catch (e) {
                    failStatus = true;
                }
                if (failStatus) {
                    conditionResult.flow.result = false;
                    return block.optional ? await (0, utils_1.succeeded)(conditionResult) : await (0, utils_1.failed)(conditionResult);
                }
            }
            program.mergeVarScope(subProgram.getVarScopeRef());
        }
        this.main.mergeVarScope(program.getVarScopeRef());
        return await (0, utils_1.succeeded)(conditionResult);
    }
    mapFlowBlockToFullFormat(block) {
        if (Array.isArray(block)) {
            return {
                optional: false,
                operations: block
            };
        }
        if (typeof block === 'object') {
            return block;
        }
        throw new Error('Could not map a block to FlowBlockToFullFormat');
    }
}
exports.Flow = Flow;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/or.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/or.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Or = void 0;
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class Or {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.OR;
    }
    async handle(or) {
        for (const operation of or.operations) {
            const program = this.factory.prototype(this.main);
            const result = await program.handle(operation);
            if (result.success && result.value.value) {
                this.main.mergeVarScope(program.getVarScopeRef());
                return await (0, utils_1.succeeded)(true);
            }
        }
        return await (0, utils_1.failed)(false);
    }
}
exports.Or = Or;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/loop/forEach.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/loop/forEach.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForEach = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class ForEach {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.FOR_EACH;
    }
    async handle(operation) {
        const res = await this.main.handle(operation.subject);
        if (!res.success) {
            return await (0, utils_1.failed)(false);
        }
        const subject = res.value.value;
        const subProgram = this.factory.prototype(this.main);
        for (let i = 0; i < subject.length; i++) {
            const setIndex = {
                type: extract_types_1.OperationType.LITERAL,
                var: operation.index ?? '$index',
                value: i
            };
            const setItem = {
                type: extract_types_1.OperationType.LITERAL,
                var: operation.item ?? '$item',
                value: subject[i]
            };
            await subProgram.handle(setIndex);
            await subProgram.handle(setItem);
            for (const command of operation.forEach) {
                const res = await subProgram.handle(command);
                if ((0, utils_1.isFailed)(res, command)) {
                    return await (0, utils_1.failed)();
                }
            }
        }
        this.main.mergeVarScope(subProgram.getVarScopeRef());
        return await (0, utils_1.succeeded)(true);
    }
}
exports.ForEach = ForEach;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/map.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/map.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Map = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Map {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.MAP;
    }
    async handle(operation) {
        const subject = (await this.main.handle(operation.subject)).value.value;
        const dictionaries = (await this.main.handle(operation.dictionary)).value.value;
        let search = operation.trim === false ? subject : subject.trim();
        const caseSensitiveDisabled = operation.caseSensitive === undefined ? true : !operation.caseSensitive;
        search = caseSensitiveDisabled ? search.toLowerCase() : search;
        for (const dictionary of dictionaries) {
            const keys = caseSensitiveDisabled ? dictionary.key.map((k) => k.toLowerCase()) : dictionary.key;
            if (keys.includes(search)) {
                return await (0, utils_1.succeeded)(dictionary.value);
            }
        }
        return await (0, utils_1.failed)();
    }
}
exports.Map = Map;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/math/math-action.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/math/math-action.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathAction = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class MathAction {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.MATH;
    }
    async handle(operation) {
        const program = this.factory.prototype(this.main);
        const left = await program.handle(operation.left);
        const right = await program.handle(operation.right);
        if (!left.success || !right.success) {
            return await (0, utils_1.failed)();
        }
        const leftValue = Number(left.value.value);
        const rightValue = Number(right.value.value);
        if (Number.isNaN(leftValue) || Number.isNaN(rightValue)) {
            return await (0, utils_1.failed)();
        }
        const handler = this.mathHandlers[operation.sign];
        if (!handler) {
            throw new Error('Unsupportable "math sign"');
        }
        const result = handler(leftValue, rightValue);
        if (Number.isNaN(result)) {
            return await (0, utils_1.failed)();
        }
        return await (0, utils_1.succeeded)(result);
    }
    get mathHandlers() {
        return {
            '+': (left, right) => left + right,
            '-': (left, right) => left - right,
            '*': (left, right) => left * right,
            '/': (left, right) => left / right,
            '%': (left, right) => left % right
        };
    }
}
exports.MathAction = MathAction;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/object/callMethod.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/object/callMethod.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallMethod = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class CallMethod {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.CALL_METHOD;
    }
    ;
    async handle(operation) {
        const subject = (await this.main.handle(operation.subject)).value.value;
        const args = [];
        // @ts-expect-error
        for (const argument of operation.args) {
            const result = await this.main.handle(argument);
            args.push(result.value.value);
        }
        const result = subject[operation.method].apply(subject, args);
        return await (0, utils_1.succeeded)(result);
    }
}
exports.CallMethod = CallMethod;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/object/getProperty.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/object/getProperty.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetProperty = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class GetProperty {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.GET_PROPERTY;
    }
    async handle(operation) {
        const subject = (await this.main.handle(operation.subject)).value.value;
        if (typeof subject !== 'object' || subject === null) {
            return {
                success: false,
                value: {
                    type: extract_types_1.OperationType.LITERAL,
                    value: undefined
                }
            };
        }
        const prop = (await this.main.handle(operation.prop)).value.value;
        const result = subject[prop];
        return await (0, utils_1.succeeded)(result);
    }
}
exports.GetProperty = GetProperty;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/object/merge.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/object/merge.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Merge = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class Merge {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.MERGE;
    }
    async handle(operation) {
        const subject = await this.main.handle(operation.subject);
        const value = await this.main.handle(operation.value);
        return {
            success: true,
            value: {
                type: extract_types_1.OperationType.LITERAL,
                value: Object.assign(subject.value, value.value)
            }
        };
    }
}
exports.Merge = Merge;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/parser/jsonParser.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/parser/jsonParser.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonParser = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class JsonParser {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.JSON_PARSER;
    }
    async handle(operation) {
        const value = (await this.main.handle(operation.value)).value.value;
        const result = JSON.parse(value);
        return await (0, utils_1.succeeded)(result);
    }
}
exports.JsonParser = JsonParser;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/parser/priceParser.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/parser/priceParser.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PriceParser = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const CURRENCY = {
    $: {
        name: 'U.S. Dollar',
        currency: 'USD'
    },
    US$: {
        name: 'U.S. Dollar',
        currency: 'USD'
    },
    USD: {
        name: 'U.S. Dollar',
        currency: 'USD'
    },
    AED: {
        name: 'Arab Emirates Dirham',
        currency: 'AED'
    },
    ARS: {
        name: 'Argentine Peso',
        currency: 'ARS'
    },
    AMD: {
        name: 'Armenian Dram',
        currency: 'AMD'
    },
    AWG: {
        name: 'Aruban Florin',
        currency: 'AWG'
    },
    A$: {
        name: 'Australian Dollar',
        currency: 'AUD'
    },
    AU$: {
        name: 'Australian Dollar',
        currency: 'AUD'
    },
    AUD: {
        name: 'Australian Dollar',
        currency: 'AUD'
    },
    AZN: {
        name: 'Azerbaijan New Manat',
        currency: 'AZN'
    },
    BSD: {
        name: 'Bahamas Dollar',
        currency: 'BSD'
    },
    BZD: {
        name: 'Belize Dollar',
        currency: 'BZD'
    },
    BOB: {
        name: 'Bolivian Boliviano',
        currency: 'BOB'
    },
    R$: {
        name: 'Brazilian Real',
        currency: 'BRL'
    },
    BRL: {
        name: 'Brazilian Real',
        currency: 'BRL'
    },
    BND: {
        name: 'Bruneian Dollar',
        currency: 'BND'
    },
    BGN: {
        name: 'Bulgaria Lev',
        currency: 'BGN'
    },
    KHR: {
        name: 'Cambodian Riel',
        currency: 'KHR'
    },
    KYD: {
        name: 'Caymanian Dollar',
        currency: 'KYD'
    },
    KYD$: {
        name: 'Caymanian Dollar',
        currency: 'KYD'
    },
    CI$: {
        name: 'Caymanian Dollar',
        currency: 'KYD'
    },
    CLP: {
        name: 'Chilean Peso',
        currency: 'CLP'
    },
    'CN¥': {
        name: 'Chinese Yuan Renminbi',
        currency: 'CNY'
    },
    CNY: {
        name: 'Chinese Yuan Renminbi',
        currency: 'CNY'
    },
    COP: {
        name: ' Colombian Peso',
        currency: 'COP'
    },
    CRC: {
        name: 'Costa Rican Colon',
        currency: 'CRC'
    },
    DOP: {
        name: 'Dominican Republic Peso',
        currency: 'DOP'
    },
    EC$: {
        name: 'East Caribbean Dollar',
        currency: 'XCD'
    },
    XCD: {
        name: 'East Caribbean Dollar',
        currency: 'XCD'
    },
    EGP: {
        name: 'Egyptian Pound',
        currency: 'EGP'
    },
    '€': {
        name: 'Euro',
        currency: 'EUR'
    },
    EUR: {
        name: 'Euro',
        currency: 'EUR'
    },
    GHS: {
        name: 'Ghanaian Cedi',
        currency: 'GHS'
    },
    GTQ: {
        name: 'Guatemalan Quetzal',
        currency: 'GTQ'
    },
    HNL: {
        name: 'Honduran Lempira',
        currency: 'HNL'
    },
    HK$: {
        name: 'Honduran Lempira',
        currency: 'HKD'
    },
    HKD: {
        name: 'Honduran Lempira',
        currency: 'HKD'
    },
    HUF: {
        name: 'Hungarian Forint',
        currency: 'HUF'
    },
    '₹': {
        name: 'Indian Rupee',
        currency: 'INR'
    },
    INR: {
        name: 'Indian Rupee',
        currency: 'INR'
    },
    IDR: {
        name: 'Indonesian Rupiah',
        currency: 'IDR'
    },
    '₪': {
        name: 'Israeli Shekel',
        currency: 'ILS'
    },
    ILS: {
        name: 'Israeli Shekel',
        currency: 'ILS'
    },
    JMD: {
        name: 'Jamaican Dollar',
        currency: 'JMD'
    },
    '¥': {
        name: 'Japanese Yen',
        currency: 'JPY'
    },
    JPY: {
        name: 'Japanese Yen',
        currency: 'JPY'
    },
    'JP¥': {
        name: 'Japanese Yen',
        currency: 'JPY'
    },
    '￥': {
        name: 'Japanese Yen',
        currency: 'JPY'
    },
    KZT: {
        name: 'Kazakhstan Tenge',
        currency: 'KZT'
    },
    KES: {
        name: 'Kenyan Shilling',
        currency: 'KES'
    },
    LBP: {
        name: 'Lebanese Pound',
        currency: 'LBP'
    },
    MOP: {
        name: 'Macanese Pataca',
        currency: 'MOP'
    },
    MOP$: {
        name: 'Macanese Pataca',
        currency: 'MOP'
    },
    MYR: {
        name: 'Malaysian Ringgit',
        currency: 'MYR'
    },
    MUR: {
        name: 'Mauritian Rupee',
        currency: 'MUR'
    },
    MX$: {
        name: 'Mexico Peso',
        currency: 'MXN'
    },
    MXN: {
        name: 'Mexico Peso',
        currency: 'MXN'
    },
    MNT: {
        name: 'Mongolian Tugrik',
        currency: 'MNT'
    },
    MAD: {
        name: 'Moroccan Dirham',
        currency: 'MAD'
    },
    NAD: {
        name: 'Namibia Dollar',
        currency: 'NAD'
    },
    NZ$: {
        name: 'New Zealand Dollar',
        currency: 'NZD'
    },
    NZD: {
        name: 'New Zealand Dollar',
        currency: 'NZD'
    },
    NGN: {
        name: 'Nigerian Naira',
        currency: 'NGN'
    },
    NOK: {
        name: 'Norwegian Krone',
        currency: 'NOK'
    },
    PAB: {
        name: 'Panamanian Balboa',
        currency: 'PAB'
    },
    PYG: {
        name: 'Paraguayan Guarani',
        currency: 'PYG'
    },
    PEN: {
        name: 'Peruvian Sol',
        currency: 'PEN'
    },
    PHP: {
        name: 'Philippine Peso',
        currency: 'PHP'
    },
    '£': {
        name: 'Pounds',
        currency: 'GBP'
    },
    GBP: {
        name: 'Pounds',
        currency: 'GBP'
    },
    QAR: {
        name: 'Qatari Riyal',
        currency: 'QAR'
    },
    RUB: {
        name: 'Russian Ruble',
        currency: 'RUB'
    },
    SAR: {
        name: 'Saudi Arabian Riyal',
        currency: 'SAR'
    },
    SGD: {
        name: 'Singapore Dollar',
        currency: 'SGD'
    },
    ZAR: {
        name: 'South African Rand',
        currency: 'ZAR'
    },
    '₩': {
        name: 'South Korean Won',
        currency: 'KRW'
    },
    KRW: {
        name: 'South Korean Won',
        currency: 'KRW'
    },
    NT$: {
        name: 'Taiwan New Dollar',
        currency: 'TWD'
    },
    TWD: {
        name: 'Taiwan New Dollar',
        currency: 'TWD'
    },
    TZS: {
        name: 'Tanzania Shilling',
        currency: 'TZS'
    },
    THB: {
        name: 'Thai Baht',
        currency: 'THB'
    },
    TTD: {
        name: 'Trinidadian Dollar',
        currency: 'TTD'
    },
    TRY: {
        name: 'Turkish Lira',
        currency: 'TRY'
    },
    UYU: {
        name: 'Uruguayan Peso',
        currency: 'TRY'
    },
    '֏': {
        name: 'Armenian Dram',
        currency: 'AMD'
    },
    '₼': {
        name: 'Azerbaijani Manat',
        currency: 'AZN'
    },
    BAM: {
        name: 'Bosnia and Herzegovina Convertible Mark',
        currency: 'BAM'
    },
    KM: {
        name: 'Bosnia and Herzegovina Convertible Mark',
        currency: 'BAM'
    },
    лв: {
        name: 'Bulgarian lev',
        currency: 'BGN'
    },
    BHD: {
        name: 'Bahraini Dinar',
        currency: 'BHD'
    },
    'ب.د': {
        name: 'Bahraini Dinar',
        currency: 'BHD'
    },
    BD: {
        name: 'Bahraini Dinar',
        currency: 'BHD'
    },
    B$: {
        name: 'Brunei Dollar',
        currency: 'BND'
    },
    BYN: {
        name: 'Belarusian Ruble',
        currency: 'BYN'
    },
    Br: {
        name: 'Belarusian Ruble',
        currency: 'BYN'
    },
    CAD: {
        name: 'Canadian Dollar',
        currency: 'CAD'
    },
    C$: {
        name: 'Canadian Dollar',
        currency: 'CAD'
    },
    CA$: {
        name: 'Canadian Dollar',
        currency: 'CAD'
    },
    CHF: {
        name: 'Swiss Franc',
        currency: 'CHF'
    },
    Fr: {
        name: 'Swiss Franc',
        currency: 'CHF'
    },
    Col$: {
        name: ' Colombian Peso',
        currency: 'COP'
    },
    CZK: {
        name: 'Czech Koruna',
        currency: 'CZK'
    },
    Kč: {
        name: 'Czech Koruna',
        currency: 'CZK'
    },
    DJF: {
        name: 'Djiboutian Franc',
        currency: 'DJF'
    },
    Fdj: {
        name: 'Djiboutian Franc',
        currency: 'DJF'
    },
    DKK: {
        name: 'Danish Krone',
        currency: 'DKK'
    },
    kr: {
        name: 'Swedish Krona',
        currency: 'SEK'
    },
    DZD: {
        name: 'Algerian Dinar ',
        currency: 'DZD'
    },
    دج: {
        name: 'Algerian Dinar ',
        currency: 'DZD'
    },
    DA: {
        name: 'Algerian Dinar ',
        currency: 'DZD'
    },
    GEL: {
        name: 'Georgian Lari',
        currency: 'GEL'
    },
    ლ: {
        name: 'Georgian Lari',
        currency: 'GEL'
    },
    'GH₵': {
        name: 'Ghanaian Cedi ',
        currency: 'GHS'
    },
    GNF: {
        name: 'Guinean Franc',
        currency: 'GNF'
    },
    FG: {
        name: 'Guinean Franc',
        currency: 'GNF'
    },
    Ft: {
        name: 'Hungarian Forint',
        currency: 'HUF'
    },
    Rp: {
        name: 'Indonesian Rupiah',
        currency: 'IDR'
    },
    ISK: {
        name: 'Icelandic Króna',
        currency: 'ISK'
    },
    Íkr: {
        name: 'Icelandic Króna',
        currency: 'ISK'
    },
    JOD: {
        name: 'Jordanian Dinar ',
        currency: 'JOD'
    },
    JD: {
        name: 'Jordanian Dinar ',
        currency: 'JOD'
    },
    KGS: {
        name: 'Kyrgyzstani Som',
        currency: 'KGS'
    },
    с: {
        name: 'Kyrgyzstani Som',
        currency: 'KGS'
    },
    '៛': {
        name: 'Cambodian Riel',
        currency: 'KHR'
    },
    KWD: {
        name: 'Kuwaiti Dinar',
        currency: 'KWD'
    },
    'K.D.': {
        name: 'Kuwaiti Dinar',
        currency: 'KWD'
    },
    '₸': {
        name: 'Kazakhstani Tenge',
        currency: 'KZT'
    },
    LVL: {
        name: 'Latvian Lats',
        currency: 'LVL'
    },
    Ls: {
        name: 'Latvian Lats',
        currency: 'LVL'
    },
    DH: {
        name: 'Moroccan Dirham',
        currency: 'MAD'
    },
    MDL: {
        name: 'Moldovan Leu ',
        currency: 'MDL'
    },
    L: {
        name: 'Romanian Leu',
        currency: 'RON'
    },
    MKD: {
        name: 'Macedonian Denar',
        currency: 'MKD'
    },
    ден: {
        name: 'Macedonian Denar',
        currency: 'MKD'
    },
    MVR: {
        name: 'Maldivian Rufiyaa',
        currency: 'MVR'
    },
    ރ: {
        name: 'Maldivian Rufiyaa',
        currency: 'MVR'
    },
    MWK: {
        name: 'Malawian Kwacha',
        currency: 'MWK'
    },
    MK: {
        name: 'Malawian Kwacha',
        currency: 'MWK'
    },
    Mex$: {
        name: 'Mexican Peso',
        currency: 'MXN'
    },
    RM: {
        name: 'Malaysian Ringgit',
        currency: 'MYR'
    },
    N: {
        name: 'Nigerian Naira',
        currency: 'NGN'
    },
    '₦': {
        name: 'Nigerian Naira',
        currency: 'NGN'
    },
    NPR: {
        name: 'Nepalese Rupee ',
        currency: 'NPR'
    },
    रू: {
        name: 'Nepalese Rupee ',
        currency: 'NPR'
    },
    OMR: {
        name: 'Omani Rial',
        currency: 'OMR'
    },
    'S/': {
        name: 'Peruvian Nuevo Sol',
        currency: 'PEN'
    },
    '₱': {
        name: 'Philippine Peso',
        currency: 'PHP'
    },
    PKR: {
        name: 'Pakistani Rupee',
        currency: 'PKR'
    },
    '₨': {
        name: 'Pakistani Rupee',
        currency: 'PKR'
    },
    PLN: {
        name: 'Polish Zloty',
        currency: 'PLN'
    },
    zł: {
        name: 'Polish Zloty',
        currency: 'PLN'
    },
    QR: {
        name: 'Qatari Riyal',
        currency: 'QAR'
    },
    RON: {
        name: 'Romanian Leu',
        currency: 'RON'
    },
    lei: {
        name: 'Romanian Leu',
        currency: 'RON'
    },
    RSD: {
        name: 'Serbian Dinar ',
        currency: 'RSD'
    },
    РСД: {
        name: 'Serbian Dinar ',
        currency: 'RSD'
    },
    '₽': {
        name: 'Russian Ruble',
        currency: 'RUB'
    },
    RWF: {
        name: 'Rwandan Franc',
        currency: 'RWF'
    },
    FRw: {
        name: 'Rwandan Franc',
        currency: 'RWF'
    },
    'ر.س': {
        name: 'Saudi Riyal',
        currency: 'SAR'
    },
    SEK: {
        name: 'Swedish Krona',
        currency: 'SEK'
    },
    SG$: {
        name: 'Singapore Dollar',
        currency: 'SGD'
    },
    STN: {
        name: 'Sao Tome and Principe Dobra',
        currency: 'STN'
    },
    Db: {
        name: 'Sao Tome and Principe Dobra',
        currency: 'STN'
    },
    SZL: {
        name: 'Swazi Lilangeni',
        currency: 'SZL'
    },
    E: {
        name: 'Swazi Lilangeni',
        currency: 'SZL'
    },
    '฿': {
        name: 'Thai Baht',
        currency: 'THB'
    },
    TOP: {
        name: 'Tongan Paʻanga',
        currency: 'TOP'
    },
    T$: {
        name: 'Tongan Paʻanga',
        currency: 'TOP'
    },
    TL: {
        name: 'Turkish Lira',
        currency: 'TRY'
    },
    '₺': {
        name: 'Turkish Lira',
        currency: 'TRY'
    },
    UAH: {
        name: 'Ukrainian Hryvnia',
        currency: 'UAH'
    },
    '₴': {
        name: 'Ukrainian Hryvnia',
        currency: 'UAH'
    },
    UGX: {
        name: 'Ugandan Shilling',
        currency: 'UGX'
    },
    USh: {
        name: 'Ugandan Shilling',
        currency: 'UGX'
    },
    UZS: {
        name: 'Uzbekistan Som',
        currency: 'UZS'
    },
    soʻm: {
        name: 'Uzbekistan Som',
        currency: 'UZS'
    },
    VEF: {
        name: 'Venezuelan Bolívar Fuerte',
        currency: 'VEF'
    },
    'Bs.F.': {
        name: 'Venezuelan Bolívar Fuerte',
        currency: 'VEF'
    },
    vef: {
        name: 'Venezuelan Bolívar Fuerte',
        currency: 'VEF'
    },
    VND: {
        name: 'Vietnamese Dong',
        currency: 'VND'
    },
    '₫': {
        name: 'Vietnamese Dong',
        currency: 'VND'
    },
    XAF: {
        name: 'Central African CFA Franc',
        currency: 'XAF'
    },
    'F.CFA': {
        name: 'Central African CFA Franc',
        currency: 'XAF'
    },
    CFA: {
        name: 'Central African CFA Franc',
        currency: 'XAF'
    },
    YER: {
        name: 'Yemeni Rial',
        currency: 'YER'
    },
    '﷼': {
        name: 'Yemeni Rial',
        currency: 'YER'
    },
    R: {
        name: 'South African Rand',
        currency: 'ZAR'
    }
};
Object.freeze(CURRENCY);
class PriceParser {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.PRICE_PARSER;
    }
    async handle(operation) {
        const separators = [',', '.'];
        let price = '';
        let currPos;
        let currencyLength = 0;
        const inputString = (await this.main.handle(operation.price)).value.value;
        if (typeof inputString !== 'string') {
            return await (0, utils_1.failed)();
        }
        const trimmedStr = inputString.trim().split(' ').join('');
        const isNegative = inputString.includes('-');
        const isSubdivided = inputString.includes('.');
        const str = isNegative ? trimmedStr.replace('-', '') : trimmedStr;
        if (str.length === 0) {
            return await (0, utils_1.failed)();
        }
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (separators.includes(char)) {
                price += '.';
            }
            else if (!Number.isNaN(+char)) {
                price += char;
            }
            else {
                if (currPos === undefined) {
                    currPos = i;
                }
                currencyLength += 1;
            }
        }
        const currencyKey = str.substring(currPos, currPos + currencyLength).trim();
        const currency = CURRENCY.hasOwnProperty(currencyKey) ? CURRENCY[currencyKey].currency : null;
        const parts = price.split('.');
        if (parts.length > 1) {
            if (isSubdivided) {
                const lastNumber = parts.pop();
                price = `${parts.join('')}.${lastNumber}`;
            }
            else {
                price = `${parts.join('')}`;
            }
        }
        const finalPrice = parseFloat(price);
        if (Number.isNaN(finalPrice)) {
            return await (0, utils_1.failed)();
        }
        const result = {
            price: operation.modulus ? Math.abs(finalPrice) : (isNegative ? -finalPrice : finalPrice),
            currency
        };
        return await (0, utils_1.succeeded)(result);
    }
}
exports.PriceParser = PriceParser;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/program.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/program.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const logger_1 = __webpack_require__(/*! ../utils/logger */ "./node_modules/@sugardev/json-extractor/dist/utils/logger.js");
class Program {
    constructor(config, observer, elScope, varScope, funcs, factory, operationHandlers) {
        this.config = config;
        this.observer = observer;
        this.elScope = elScope;
        this.varScope = varScope;
        this.funcs = funcs;
        this.operations = {};
        const logger = new logger_1.MyLogger(this.config);
        Object
            .values(operationHandlers)
            .forEach((HandlerClass) => {
            const handler = new HandlerClass(this, observer, factory, logger);
            this.operations[handler.type()] = handler;
        });
    }
    async handle(operation) {
        if (!this.operations[operation?.type]) {
            throw new Error(`Unsupportable operation type "${operation?.type}"`);
        }
        const varScope = this.getVarScopeRef();
        try {
            if (operation.debug) {
                debugger;
            }
            const handler = this.operations[operation.type];
            const result = await handler.handle(operation);
            let accumulate = false;
            if (operation.accumulate) {
                const accumulateHandler = this.operations[operation.accumulate.type];
                const accumulationResult = await accumulateHandler.handle(operation.accumulate);
                accumulate = accumulationResult.value.value;
            }
            if (operation.var) {
                const parts = operation.var.split('.');
                let ref = varScope;
                for (let i = 0; i < parts.length - 1; i++) {
                    if (ref.hasOwnProperty(parts[i])) {
                        ref = ref[parts[i]];
                    }
                    else {
                        ref[parts[i]] = {};
                        ref = ref[parts[i]];
                    }
                }
                const prop = parts[parts.length - 1];
                if (!accumulate) {
                    ref[prop] = result.value.value;
                }
                else {
                    const valueExists = ref[prop] != null;
                    const filteredValue = [ref[prop], result.value.value];
                    const onlyValue = [result.value.value];
                    ref[prop] = Array.isArray(ref[prop]) ? [...ref[prop], result.value.value] : (valueExists ? filteredValue : onlyValue);
                }
            }
            return result;
        }
        catch (e) {
            return {
                success: false,
                value: {
                    type: extract_types_1.OperationType.LITERAL,
                    // @ts-expect-error
                    value: undefined
                }
            };
        }
    }
    getConfig() {
        return this.config;
    }
    getElScopeRef() {
        return this.elScope;
    }
    getVarScopeRef() {
        return this.varScope;
    }
    cloneVarScope() {
        return (0, utils_1.clone)(this.getVarScopeRef());
    }
    mergeVarScope(varScope) {
        Object.assign(this.getVarScopeRef(), varScope);
        return this.getVarScopeRef();
    }
    getFuncsRef() {
        return this.funcs;
    }
    getObserver() {
        return this.observer;
    }
}
exports.Program = Program;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/returnOperation.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/returnOperation.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReturnOperationHandler = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class ReturnOperationHandler {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.RETURN;
    }
    async handle(operation) {
        const result = await this.main.handle(operation.value);
        return {
            success: true,
            return: true,
            value: {
                type: extract_types_1.OperationType.LITERAL,
                value: result.value.value
            }
        };
    }
}
exports.ReturnOperationHandler = ReturnOperationHandler;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/getter.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/getter.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getter = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
function getter(operation, element) {
    const handler = {
        [extract_types_1.SINGLE_GET_TYPE.TEXT]: () => {
            const el = element;
            // textContent is used in tests because innerText is not implemented in jsdom
            const text = (el.innerText || el.textContent);
            return text.trim();
        },
        [extract_types_1.SINGLE_GET_TYPE.VALUE]: () => {
            const el = element;
            return el.value;
        },
        [extract_types_1.SINGLE_GET_TYPE.ATTRIBUTE]: () => {
            const el = element;
            return el.getAttribute(operation.attr);
        }
    };
    return handler[operation.get]
        ? handler[operation.get]()
        : handler[extract_types_1.SINGLE_GET_TYPE.TEXT]();
}
exports.getter = getter;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/plural.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/plural.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Plural = void 0;
const baseHandler_1 = __webpack_require__(/*! ../baseHandler */ "./node_modules/@sugardev/json-extractor/dist/operations/baseHandler.js");
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const htmlElementSolver_1 = __webpack_require__(/*! ../../resolvers/htmlElementSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js");
const selectorsSolver_1 = __webpack_require__(/*! ../../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const getter_1 = __webpack_require__(/*! ./getter */ "./node_modules/@sugardev/json-extractor/dist/operations/select/getter.js");
class Plural extends baseHandler_1.BaseHandler {
    constructor(main, observer, factory, logger) {
        super(main, observer, factory, logger);
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
        this.elementSolver = new htmlElementSolver_1.HtmlElementSolver(main, logger);
        this.selectorsSolver = new selectorsSolver_1.SelectorsSolver(main, logger);
    }
    type() {
        return extract_types_1.OperationType.PLURAL;
    }
    async handle(operation) {
        let elScope = this.main.getElScopeRef();
        if (operation.scope != null) {
            const res = await this.elementSolver.solve(operation.scope);
            if (!res.success) {
                return await (0, utils_1.failed)();
            }
            elScope = res.value.value;
        }
        const selectorsRes = await this.selectorsSolver.solve(operation.selectors);
        if (!selectorsRes.success) {
            return await (0, utils_1.failed)();
        }
        const selectors = selectorsRes.value.value;
        for (const selector of selectors) {
            let targets;
            try {
                targets = elScope.querySelectorAll(selector);
                if (targets.length === 0) {
                    continue;
                }
            }
            catch (e) {
                this.logger.error(e);
                return await (0, utils_1.failed)();
            }
            const result = [];
            targets.forEach((target) => result.push((0, getter_1.getter)(operation, target)));
            return await (0, utils_1.succeeded)(result);
        }
        return await (0, utils_1.failed)();
    }
}
exports.Plural = Plural;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/single.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/single.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Single = void 0;
const baseHandler_1 = __webpack_require__(/*! ../baseHandler */ "./node_modules/@sugardev/json-extractor/dist/operations/baseHandler.js");
const htmlElementSolver_1 = __webpack_require__(/*! ../../resolvers/htmlElementSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js");
const selectorsSolver_1 = __webpack_require__(/*! ../../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
const getter_1 = __webpack_require__(/*! ./getter */ "./node_modules/@sugardev/json-extractor/dist/operations/select/getter.js");
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class Single extends baseHandler_1.BaseHandler {
    constructor(main, observer, factory, logger) {
        super(main, observer, factory, logger);
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
        this.elementSolver = new htmlElementSolver_1.HtmlElementSolver(main, logger);
        this.selectorsSolver = new selectorsSolver_1.SelectorsSolver(main, logger);
    }
    type() {
        return extract_types_1.OperationType.SINGLE;
    }
    async handle(operation) {
        let elementScope = this.main.getElScopeRef();
        if (operation.scope != null) {
            const res = await this.elementSolver.solve(operation.scope);
            if (!res.success) {
                return await (0, utils_1.failed)();
            }
            elementScope = res.value.value;
        }
        const selectorsRes = await this.selectorsSolver.solve(operation.selectors);
        if (!selectorsRes.success) {
            return await (0, utils_1.failed)();
        }
        const selectors = selectorsRes.value.value;
        try {
            for (const selector of selectors) {
                const target = elementScope.querySelector(selector);
                if (!target) {
                    continue;
                }
                const result = (0, getter_1.getter)(operation, target);
                return await (0, utils_1.succeeded)(result);
            }
        }
        catch (e) {
            this.logger.error(e);
            return await (0, utils_1.failed)();
        }
        return await (0, utils_1.failed)();
    }
}
exports.Single = Single;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/splitScope.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/splitScope.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SplitScope = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const selectorsSolver_1 = __webpack_require__(/*! ../../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class SplitScope {
    constructor(main, observer, factory, logger) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
        this.logger = logger;
        this.selectorsSolver = new selectorsSolver_1.SelectorsSolver(main, logger);
    }
    type() {
        return extract_types_1.OperationType.SPLIT_SCOPE;
    }
    async handle(operation) {
        const elScope = this.main.getElScopeRef();
        const selectorsRes = await this.selectorsSolver.solve(operation.selectors);
        if (!selectorsRes.success) {
            return await (0, utils_1.failed)();
        }
        const selectors = selectorsRes.value.value;
        for (const selector of selectors) {
            const scopes = elScope.querySelectorAll(selector);
            if (scopes.length === 0) {
                continue;
            }
            const result = [];
            for (const scope of scopes) {
                const tempVarScope = {};
                let success = true;
                const subProgram = this.factory.create(this.main.getConfig(), this.main.getObserver(), scope, tempVarScope, this.main.getFuncsRef());
                for (const subOperation of operation.operations) {
                    const setScopeVar = {
                        var: '$scope',
                        type: extract_types_1.OperationType.LITERAL,
                        value: scope
                    };
                    await subProgram.handle(setScopeVar);
                    try {
                        const res = await subProgram.handle(subOperation);
                        if (!res.success && !subOperation.optional) {
                            success = false;
                            break;
                        }
                    }
                    catch (e) {
                        if (!subOperation.optional) {
                            success = false;
                            break;
                        }
                    }
                    // @ts-expect-error
                    delete tempVarScope.$scope;
                }
                if (success) {
                    result.push(tempVarScope);
                }
            }
            return await (0, utils_1.succeeded)(result);
        }
        return await (0, utils_1.failed)();
    }
}
exports.SplitScope = SplitScope;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/string/replace.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/string/replace.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Replace = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class Replace {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.REPLACE;
    }
    async handle(replace) {
        const program = this.factory.prototype(this.main);
        const subject = await program.handle(replace.subject);
        const needle = await program.handle(replace.needle);
        const replacement = await program.handle(replace.replacement);
        const mode = replace.mode ? replace.mode : 'first';
        const handlers = {
            first: (subject, needle) => subject.replace(needle, replacement.value.value),
            all: (subject, needle) => subject.replace(new RegExp(needle, 'g'), replacement.value.value)
        };
        if (!handlers[mode]) {
            throw new Error('Unsupportable replacement mode');
        }
        let result = subject.value.value;
        const keys = Array.isArray(needle.value.value) ? needle.value.value : [needle.value.value];
        keys.forEach((key) => {
            result = handlers[mode](result, key);
        });
        this.main.mergeVarScope(program.getVarScopeRef());
        return await (0, utils_1.succeeded)(result);
    }
}
exports.Replace = Replace;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/string/replaceBetween.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/string/replaceBetween.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReplaceBetween = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class ReplaceBetween {
    constructor(main, observer, factory) {
        this.main = main;
        this.observer = observer;
        this.factory = factory;
    }
    type() {
        return extract_types_1.OperationType.REPLACE_BETWEEN;
    }
    async handle(replace) {
        const program = this.factory.prototype(this.main);
        const subject = await program.handle(replace.subject);
        const start = await program.handle(replace.start);
        const end = await program.handle(replace.end);
        const replacement = await program.handle(replace.replacement);
        const replaceBetween = (str, replacement, start, end) => {
            const startPos = str.indexOf(start);
            if (startPos === -1) {
                return str;
            }
            const endPos = str.lastIndexOf(end);
            if (endPos === -1) {
                return str;
            }
            const left = str.substring(0, startPos);
            const right = str.substring(endPos + end.length);
            return left + replacement + right;
        };
        const result = replaceBetween(subject.value.value, replacement.value.value, start.value.value, end.value.value);
        this.main.mergeVarScope(program.getVarScopeRef());
        return await (0, utils_1.succeeded)(result);
    }
}
exports.ReplaceBetween = ReplaceBetween;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/variable.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/variable.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Variable = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
class Variable {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.VAR;
    }
    async handle(operation) {
        const varScope = this.main.getVarScopeRef();
        const parts = operation.value.split('.');
        let ref = varScope;
        for (let i = 0; i < parts.length - 1; i++) {
            if (typeof ref[parts[i]] === 'object') {
                ref = ref[parts[i]];
                continue;
            }
            // should throw an error?
        }
        const prop = parts[parts.length - 1];
        return {
            success: true,
            value: {
                type: extract_types_1.OperationType.LITERAL,
                value: ref[prop]
            }
        };
    }
}
exports.Variable = Variable;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/wait/markProcessedElement.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/wait/markProcessedElement.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarkProcessedElement = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class MarkProcessedElement {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.MARK_PROCESSED_ELEMENT;
    }
    async handle(operation) {
        const elScope = this.main.getElScopeRef();
        for (const selector of operation.selectors) {
            let target;
            try {
                target = elScope.querySelector(selector);
            }
            catch (e) {
                // probably not a valid selector is used
                continue;
            }
            if (!target) {
                continue;
            }
            target.setAttribute('data-lib-processed', 'true');
            return await (0, utils_1.succeeded)(true);
        }
        return await (0, utils_1.failed)(false);
    }
}
exports.MarkProcessedElement = MarkProcessedElement;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForNotProcessedElementHandler.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForNotProcessedElementHandler.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WaitForNotProcessedElementHandler = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class WaitForNotProcessedElementHandler {
    constructor(main) {
        this.main = main;
    }
    type() {
        return extract_types_1.OperationType.WAIT_FOR_NOT_PROCESSED_ELEMENT;
    }
    async handle(operation) {
        return await new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const elScope = this.main.getElScopeRef();
                for (const selector of operation.selectors) {
                    let target;
                    try {
                        target = elScope.querySelector(selector);
                    }
                    catch (e) {
                        // probably not a valid selector is used
                        continue;
                    }
                    if (!target) {
                        continue;
                    }
                    if (!target.hasAttribute('data-lib-processed')) {
                        clearInterval(intervalId);
                        clearTimeout(timeoutId);
                        resolve((0, utils_1.succeeded)(true));
                    }
                }
            }, 500);
            const timeoutId = setTimeout(() => {
                clearInterval(intervalId);
                resolve((0, utils_1.failed)(false));
            }, operation.timeout);
        });
    }
}
exports.WaitForNotProcessedElementHandler = WaitForNotProcessedElementHandler;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForUrlChanged.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForUrlChanged.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WaitForUrlChanged = void 0;
const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class WaitForUrlChanged {
    type() {
        return extract_types_1.OperationType.WAIT_FOR_URL_CHANGED;
    }
    async handle() {
        return await new Promise((resolve) => {
            const curr = location.href;
            const intervalId = setInterval(() => {
                if (curr !== location.href) {
                    clearInterval(intervalId);
                    clearInterval(timeoutId);
                    resolve((0, utils_1.succeeded)(true));
                }
            }, 500);
            const timeoutId = setTimeout(() => {
                clearInterval(intervalId);
                resolve((0, utils_1.failed)(false));
            }, 5000);
        });
    }
}
exports.WaitForUrlChanged = WaitForUrlChanged;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/program.factory.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/program.factory.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFactory = void 0;
const program_1 = __webpack_require__(/*! ./operations/program */ "./node_modules/@sugardev/json-extractor/dist/operations/program.js");
const and_1 = __webpack_require__(/*! ./operations/logical/and */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/and.js");
const callMethod_1 = __webpack_require__(/*! ./operations/object/callMethod */ "./node_modules/@sugardev/json-extractor/dist/operations/object/callMethod.js");
const closest_1 = __webpack_require__(/*! ./operations/element/closest */ "./node_modules/@sugardev/json-extractor/dist/operations/element/closest.js");
const computed_1 = __webpack_require__(/*! ./operations/computed */ "./node_modules/@sugardev/json-extractor/dist/operations/computed.js");
const existElement_1 = __webpack_require__(/*! ./operations/element/existElement */ "./node_modules/@sugardev/json-extractor/dist/operations/element/existElement.js");
const forEach_1 = __webpack_require__(/*! ./operations/loop/forEach */ "./node_modules/@sugardev/json-extractor/dist/operations/loop/forEach.js");
const func_1 = __webpack_require__(/*! ./operations/func */ "./node_modules/@sugardev/json-extractor/dist/operations/func.js");
const isNotHiddenElement_1 = __webpack_require__(/*! ./operations/element/isNotHiddenElement */ "./node_modules/@sugardev/json-extractor/dist/operations/element/isNotHiddenElement.js");
const jsonParser_1 = __webpack_require__(/*! ./operations/parser/jsonParser */ "./node_modules/@sugardev/json-extractor/dist/operations/parser/jsonParser.js");
const literal_1 = __webpack_require__(/*! ./operations/literal */ "./node_modules/@sugardev/json-extractor/dist/operations/literal.js");
const log_1 = __webpack_require__(/*! ./operations/log */ "./node_modules/@sugardev/json-extractor/dist/operations/log.js");
const map_1 = __webpack_require__(/*! ./operations/map */ "./node_modules/@sugardev/json-extractor/dist/operations/map.js");
const markProcessedElement_1 = __webpack_require__(/*! ./operations/wait/markProcessedElement */ "./node_modules/@sugardev/json-extractor/dist/operations/wait/markProcessedElement.js");
const merge_1 = __webpack_require__(/*! ./operations/object/merge */ "./node_modules/@sugardev/json-extractor/dist/operations/object/merge.js");
const or_1 = __webpack_require__(/*! ./operations/logical/or */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/or.js");
const plural_1 = __webpack_require__(/*! ./operations/select/plural */ "./node_modules/@sugardev/json-extractor/dist/operations/select/plural.js");
const priceParser_1 = __webpack_require__(/*! ./operations/parser/priceParser */ "./node_modules/@sugardev/json-extractor/dist/operations/parser/priceParser.js");
const returnOperation_1 = __webpack_require__(/*! ./operations/returnOperation */ "./node_modules/@sugardev/json-extractor/dist/operations/returnOperation.js");
const select_1 = __webpack_require__(/*! ./operations/element/select */ "./node_modules/@sugardev/json-extractor/dist/operations/element/select.js");
const single_1 = __webpack_require__(/*! ./operations/select/single */ "./node_modules/@sugardev/json-extractor/dist/operations/select/single.js");
const splitScope_1 = __webpack_require__(/*! ./operations/select/splitScope */ "./node_modules/@sugardev/json-extractor/dist/operations/select/splitScope.js");
const variable_1 = __webpack_require__(/*! ./operations/variable */ "./node_modules/@sugardev/json-extractor/dist/operations/variable.js");
const waitForNotProcessedElementHandler_1 = __webpack_require__(/*! ./operations/wait/waitForNotProcessedElementHandler */ "./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForNotProcessedElementHandler.js");
const waitForUrlChanged_1 = __webpack_require__(/*! ./operations/wait/waitForUrlChanged */ "./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForUrlChanged.js");
const getProperty_1 = __webpack_require__(/*! ./operations/object/getProperty */ "./node_modules/@sugardev/json-extractor/dist/operations/object/getProperty.js");
const emit_1 = __webpack_require__(/*! ./operations/emit */ "./node_modules/@sugardev/json-extractor/dist/operations/emit.js");
const flow_1 = __webpack_require__(/*! ./operations/logical/flow */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/flow.js");
const condition_1 = __webpack_require__(/*! ./operations/logical/condition */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/condition.js");
const replace_1 = __webpack_require__(/*! ./operations/string/replace */ "./node_modules/@sugardev/json-extractor/dist/operations/string/replace.js");
const replaceBetween_1 = __webpack_require__(/*! ./operations/string/replaceBetween */ "./node_modules/@sugardev/json-extractor/dist/operations/string/replaceBetween.js");
const htmlCollector_1 = __webpack_require__(/*! ./operations/collector/htmlCollector */ "./node_modules/@sugardev/json-extractor/dist/operations/collector/htmlCollector.js");
const math_action_1 = __webpack_require__(/*! ./operations/math/math-action */ "./node_modules/@sugardev/json-extractor/dist/operations/math/math-action.js");
const globalVar_1 = __webpack_require__(/*! ./operations/element/globalVar */ "./node_modules/@sugardev/json-extractor/dist/operations/element/globalVar.js");
class ProgramFactory {
    create(config, observer, elScope, varScope, funcs) {
        return new program_1.Program(config, observer, elScope, varScope, funcs, this, {
            AND: and_1.And,
            CALL_METHOD: callMethod_1.CallMethod,
            CLOSEST: closest_1.Closest,
            COMPUTED: computed_1.Computed,
            CONDITION: condition_1.Condition,
            EXIST: existElement_1.ExistElement,
            FOR_EACH: forEach_1.ForEach,
            FUNC: func_1.Func,
            IS_NOT_HIDDEN_ELEMENT: isNotHiddenElement_1.IsNotHiddenElement,
            JSON_PARSER: jsonParser_1.JsonParser,
            LITERAL: literal_1.Literal,
            LOG: log_1.Log,
            MAP: map_1.Map,
            MARK_PROCESSED_ELEMENT: markProcessedElement_1.MarkProcessedElement,
            MERGE: merge_1.Merge,
            OR: or_1.Or,
            PLURAL: plural_1.Plural,
            PRICE_PARSER: priceParser_1.PriceParser,
            RETURN: returnOperation_1.ReturnOperationHandler,
            SELECT: select_1.Select,
            SINGLE: single_1.Single,
            SPLIT_SCOPE: splitScope_1.SplitScope,
            VAR: variable_1.Variable,
            WAIT_FOR_NOT_PROCESSED_ELEMENT: waitForNotProcessedElementHandler_1.WaitForNotProcessedElementHandler,
            WAIT_FOR_URL_CHANGED: waitForUrlChanged_1.WaitForUrlChanged,
            GET_PROPERTY: getProperty_1.GetProperty,
            EMIT: emit_1.Emit,
            FLOW: flow_1.Flow,
            REPLACE: replace_1.Replace,
            REPLACE_BETWEEN: replaceBetween_1.ReplaceBetween,
            HTML_COLLECTOR: htmlCollector_1.HtmlCollector,
            MATH: math_action_1.MathAction,
            GLOBAL_VAR: globalVar_1.GlobalVar
        });
    }
    prototype(program) {
        return this.create(program.getConfig(), program.getObserver(), program.getElScopeRef(), program.cloneVarScope(), program.getFuncsRef());
    }
}
exports.ProgramFactory = ProgramFactory;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlElementSolver = void 0;
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class HtmlElementSolver {
    constructor(main, logger) {
        this.main = main;
        this.logger = logger;
    }
    async solve(operation) {
        try {
            const res = await this.main.handle(operation);
            if (!res.success) {
                this.logger.log('error handling argument operation for "scope"');
                return await (0, utils_1.failed)();
            }
            if (!(res.value.value instanceof HTMLElement)) {
                this.logger.log('argument for "scope" must be an instance of "HTMLElement"');
                return await (0, utils_1.failed)();
            }
            return await (0, utils_1.succeeded)(res.value.value);
        }
        catch (e) {
            this.logger.log(e);
            return await (0, utils_1.failed)();
        }
    }
}
exports.HtmlElementSolver = HtmlElementSolver;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectorsSolver = void 0;
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
class SelectorsSolver {
    constructor(main, logger) {
        this.main = main;
        this.logger = logger;
    }
    async solve(selectors) {
        if (typeof selectors === 'undefined') {
            this.logger.log('argument for "selectors" are missed');
            return await (0, utils_1.failed)();
        }
        if (!Array.isArray(selectors)) {
            this.logger.log('argument for "selectors" must be an array');
            return await (0, utils_1.failed)();
        }
        const resultList = [];
        for (const selector of selectors) {
            const result = await this.main.handle(selector);
            if ((0, utils_1.isFailed)(result, selector)) {
                this.logger.log('error handling an argument for "selectors"');
                return await (0, utils_1.failed)();
            }
            resultList.push(result.value.value);
        }
        if (selectors.length === 0) {
            this.logger.log('argument for "selectors" are empty');
            return await (0, utils_1.failed)();
        }
        return await (0, utils_1.succeeded)(resultList);
    }
}
exports.SelectorsSolver = SelectorsSolver;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/utils/logger.js":
/*!********************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/utils/logger.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MyLogger = void 0;
class MyLogger {
    constructor(config) {
        this.config = config;
    }
    log(msg, ...rest) {
        if (this.config.log) {
            console.log(msg, ...rest);
        }
    }
    error(msg, ...rest) {
        if (this.config.log) {
            console.error(msg, ...rest);
        }
    }
}
exports.MyLogger = MyLogger;


/***/ }),

/***/ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@sugardev/json-extractor/dist/utils/utils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFailed = exports.clone = exports.succeeded = exports.failed = void 0;
const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
// @ts-expect-error
async function failed(value = undefined) {
    return {
        success: false,
        value: {
            type: extract_types_1.OperationType.LITERAL,
            value
        }
    };
}
exports.failed = failed;
async function succeeded(value) {
    return {
        success: true,
        value: {
            type: extract_types_1.OperationType.LITERAL,
            value
        }
    };
}
exports.succeeded = succeeded;
function clone(source) {
    const target = {};
    const keys = Object.keys(source);
    const valueGetter = (val) => {
        if (Array.isArray(val)) {
            const arr = [];
            for (let i = 0; i < val.length; i++) {
                // @ts-expect-error
                arr.push(valueGetter(val[i]));
            }
            return arr;
        }
        else if (typeof val === 'object' && val) {
            if (val instanceof Element || val instanceof Document) {
                return val;
            }
            const keys = Object.keys(val);
            const obj = {};
            for (const key of keys) {
                obj[key] = valueGetter(val[key]);
            }
            return obj;
        }
        else {
            return val;
        }
    };
    for (const key of keys) {
        target[key] = valueGetter(source[key]);
    }
    return target;
}
exports.clone = clone;
function isFailed(res, operation) {
    return !res.success && !operation.optional;
}
exports.isFailed = isFailed;


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
/*!**************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/content.js ***!
  \**************************************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const helpers_1 = __webpack_require__(/*! ../common/libs/helpers */ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js");
const OutContentMessageManager_1 = __webpack_require__(/*! ./message-managers/OutContentMessageManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/OutContentMessageManager.js");
const InContentMessageManager_1 = __webpack_require__(/*! ./message-managers/InContentMessageManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/InContentMessageManager.js");
const HistoryManager_1 = __webpack_require__(/*! ./history/HistoryManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/history/HistoryManager.js");
const Observer_1 = __webpack_require__(/*! ../common/observer/Observer */ "./node_modules/@sugardev/ecommerce-streams/dist/common/observer/Observer.js");
const RequestsManager_1 = __webpack_require__(/*! ./requests/RequestsManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/requests/RequestsManager.js");
const ID = (0, helpers_1.uuid)();
const observer = new Observer_1.Observer();
const history = new HistoryManager_1.HistoryManager(observer);
const requestManager = new RequestsManager_1.RequestsManager(observer);
history.replaceNativeApi();
const outManager = new OutContentMessageManager_1.OutContentMessageManager(ID);
const inManager = new InContentMessageManager_1.InContentMessageManager(ID, outManager, history, requestManager);
outManager.initMessage();

})();

/******/ })()
;
//# sourceMappingURL=processor.js.map