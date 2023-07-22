/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@urbandevs/mario-core/dist/src/BrowserEnum.js":
/*!********************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/BrowserEnum.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var BrowserEnum;
(function (BrowserEnum) {
    BrowserEnum["CHROME_BROWSER"] = "CHROME_BROWSER";
    BrowserEnum["FIREFOX_BROWSER"] = "FIREFOX_BROWSER";
    BrowserEnum["EDGE_BROWSER"] = "EDGE_BROWSER";
    BrowserEnum["SAFARI_BROWSER"] = "SAFARI_BROWSER";
    BrowserEnum["OPERA_BROWSER"] = "OPERA_BROWSER";
    BrowserEnum["CHROMIUM_BROWSER"] = "CHROMIUM_BROWSER";
})(BrowserEnum = exports.BrowserEnum || (exports.BrowserEnum = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Core/Exceptions/CoreException.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Core/Exceptions/CoreException.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class CoreException extends Error {
}
exports.CoreException = CoreException;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Core/Exceptions/CoreServiceIsNotRegisteredException.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Core/Exceptions/CoreServiceIsNotRegisteredException.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const CoreException_1 = __webpack_require__(/*! ./CoreException */ "./node_modules/@urbandevs/mario-core/dist/src/Core/Exceptions/CoreException.js");
class CoreServiceIsNotRegisteredException extends CoreException_1.CoreException {
}
exports.CoreServiceIsNotRegisteredException = CoreServiceIsNotRegisteredException;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Core/Extension.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Core/Extension.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const BrowserEnum_1 = __webpack_require__(/*! ../BrowserEnum */ "./node_modules/@urbandevs/mario-core/dist/src/BrowserEnum.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
let Extension = class Extension {
    constructor(browserEnum) {
        this.browserEnum = browserEnum;
        this.isOnInstalledFired = false;
        this.listeners = [];
        chrome.runtime.onInstalled.addListener((details) => {
            this.isOnInstalledFired = true;
            this.installedDetails = details;
            this.handleOnInstall();
        });
    }
    onInstall(callback) {
        this.listeners.push({ callback });
        if (this.isOnInstalledFired) {
            this.handleOnInstall();
        }
    }
    setUninstallURL(url, callback) {
        chrome.runtime.setUninstallURL(url, callback);
    }
    manifest() {
        return chrome.runtime.getManifest();
    }
    browser() {
        return this.browserEnum;
    }
    handleOnInstall() {
        for (const listener of this.listeners) {
            listener.callback(this.installedDetails);
        }
        this.listeners = [];
    }
};
Extension = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.BROWSER)),
    __metadata("design:paramtypes", [String])
], Extension);
exports.Extension = Extension;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js":
/*!************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioModule.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Core/MarioModule.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class MarioModule {
    constructor(_core) {
        this._core = _core;
    }
    mario() {
        return this._core;
    }
}
exports.MarioModule = MarioModule;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js":
/*!********************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const MARIO_TYPES = {
    ALARM_SERVICE: Symbol.for('ALARM_SERVICE'),
    BROWSER: Symbol.for('BROWSER'),
    BROWSER_ACTION: Symbol.for('BROWSER_ACTION'),
    CACHE_SERVICE: Symbol.for('CACHE_SERVICE'),
    CONTAINER: Symbol.for('CONTAINER'),
    INTERNAL_DISPATCHER: Symbol.for('INTERNAL_DISPATCHER'),
    LOCAL_STORAGE_SERVICE: Symbol.for('LOCAL_STORAGE_SERVICE'),
    LOGGER_SERVICE: Symbol.for('LOGGER_SERVICE'),
    STORAGE_SERVICE: Symbol.for('STORAGE_SERVICE'),
    TAB_SERVICE: Symbol.for('TAB_SERVICE'),
    NAVIGATION_SERVICE: Symbol.for('NAVIGATION_SERVICE'),
    WEB_REQUEST_SERVICE: Symbol.for('WEB_REQUEST_SERVICE'),
    PROXY_SERVICE: Symbol.for('PROXY_SERVICE'),
    EXTENSION_SERVICE: Symbol.for('EXTENSION_SERVICE'),
    EXTERNAL_DISPATCHER: Symbol.for('EXTERNAL_DISPATCHER'),
    OMNIBOX_SERVICE: Symbol.for('OMNIBOX_SERVICE'),
    WINDOW_POST: Symbol.for('WINDOW_POST'),
    MANAGEMENT: Symbol.for('MANAGEMENT'),
    PORT_DISPATCHER: Symbol.for('PORT_DISPATCHER'),
};
exports.MARIO_TYPES = MARIO_TYPES;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Mario.js":
/*!**************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Mario.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const InternalDispatcher_1 = __webpack_require__(/*! ./Packages/InternalDispatcher/Bg/InternalDispatcher */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/InternalDispatcher.js");
const LoggerService_1 = __webpack_require__(/*! ./Packages/Logger/Bg/LoggerService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Logger/Bg/LoggerService.js");
const TabService_1 = __webpack_require__(/*! ./Packages/Tab/Bg/TabService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabService.js");
const CoreServiceIsNotRegisteredException_1 = __webpack_require__(/*! ./Core/Exceptions/CoreServiceIsNotRegisteredException */ "./node_modules/@urbandevs/mario-core/dist/src/Core/Exceptions/CoreServiceIsNotRegisteredException.js");
const Extension_1 = __webpack_require__(/*! ./Core/Extension */ "./node_modules/@urbandevs/mario-core/dist/src/Core/Extension.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ./MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const ExternalDispatcher_1 = __webpack_require__(/*! ./Packages/ExternalDispatcher/Bg/ExternalDispatcher */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcher.js");
const PortDispatcher_1 = __webpack_require__(/*! ./Packages/PortDispatcher/Bg/PortDispatcher */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/PortDispatcher/Bg/PortDispatcher.js");
class Mario {
    constructor(browser, options = {}) {
        this.isInitialized = false;
        this._container = options.container ? options.container : new inversify_1.Container();
        this._container.bind(MARIO_TYPES_1.MARIO_TYPES.BROWSER).toConstantValue(browser);
        this._container.bind(MARIO_TYPES_1.MARIO_TYPES.CONTAINER).toConstantValue(this._container);
        const loggerService = options.logger ? options.logger : LoggerService_1.LoggerService;
        const internalDispatcherService = options.internalDispatcher ? options.internalDispatcher : InternalDispatcher_1.InternalDispatcher;
        const externalDispatcherService = options.externalDispatcher ? options.externalDispatcher : ExternalDispatcher_1.ExternalDispatcher;
        const tabService = options.tab ? options.tab : TabService_1.TabService;
        this.registerService(MARIO_TYPES_1.MARIO_TYPES.LOGGER_SERVICE, loggerService);
        options.loggerEnabled ? this.logger().enable() : this.logger().disable();
        this.logger().log(`Core: this build is for "${browser.toString()}"`);
        this.registerService(MARIO_TYPES_1.MARIO_TYPES.EXTENSION_SERVICE, Extension_1.Extension);
        this.extension();
        this.registerService(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER, internalDispatcherService);
        this.registerService(MARIO_TYPES_1.MARIO_TYPES.EXTERNAL_DISPATCHER, externalDispatcherService);
        this.registerService(MARIO_TYPES_1.MARIO_TYPES.PORT_DISPATCHER, PortDispatcher_1.PortDispatcher);
        this.registerService(MARIO_TYPES_1.MARIO_TYPES.TAB_SERVICE, tabService);
        this.getService(MARIO_TYPES_1.MARIO_TYPES.PORT_DISPATCHER);
        const globalAny = __webpack_require__.g;
        globalAny.window.mario = this;
        this.coreInitialized();
    }
    registerModule(useClass, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = new useClass(this);
            this.logger().log(`Core: registering a module "${module.name()}"`);
            try {
                yield module.register(options);
                this.logger().log(`Core: the module "${module.name()}" is registered`);
            }
            catch (e) {
                this.logger().error(e);
            }
        });
    }
    registerService(name, useClass) {
        if (this.isCoreInitialized()) {
            this.logger().log(`Core: registered a service "${name.toString()}"`);
        }
        if (!this.hasService(name)) {
            this._container.bind(name).to(useClass).inSingletonScope();
        }
    }
    getService(name) {
        if (!this.hasService(name)) {
            const message = `Can't get service: service '${name.toString()}' is not registered`;
            if (this.isCoreInitialized()) {
                this.logger().warn(message);
            }
            throw new CoreServiceIsNotRegisteredException_1.CoreServiceIsNotRegisteredException(message);
        }
        return this._container.get(name);
    }
    hasService(name) {
        return this._container.isBound(name);
    }
    internalDispatcher() {
        return this.getService(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER);
    }
    externalDispatcher() {
        return this.getService(MARIO_TYPES_1.MARIO_TYPES.EXTERNAL_DISPATCHER);
    }
    portDispatcher() {
        return this.getService(MARIO_TYPES_1.MARIO_TYPES.PORT_DISPATCHER);
    }
    logger() {
        return this.getService(MARIO_TYPES_1.MARIO_TYPES.LOGGER_SERVICE);
    }
    container() {
        return this._container;
    }
    tabService() {
        return this.getService(MARIO_TYPES_1.MARIO_TYPES.TAB_SERVICE);
    }
    extension() {
        return this.getService(MARIO_TYPES_1.MARIO_TYPES.EXTENSION_SERVICE);
    }
    coreInitialized() {
        this.isInitialized = true;
    }
    isCoreInitialized() {
        return this.isInitialized;
    }
}
exports.Mario = Mario;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Cache/Bg/CacheEvents.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Cache/Bg/CacheEvents.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var CacheEvents;
(function (CacheEvents) {
    CacheEvents["BEFORE_CLEAR_CACHE"] = "BEFORE_CLEAR_CACHE";
    CacheEvents["AFTER_CLEAR_CACHE"] = "AFTER_CLEAR_CACHE";
})(CacheEvents = exports.CacheEvents || (exports.CacheEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Cache/Bg/CacheService.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Cache/Bg/CacheService.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const MarioEvent_1 = __webpack_require__(/*! ../../../Core/MarioEvent */ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const CacheEvents_1 = __webpack_require__(/*! ./CacheEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Cache/Bg/CacheEvents.js");
let CacheService = class CacheService {
    constructor(logger, dispatcher) {
        this.logger = logger;
        this.dispatcher = dispatcher;
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispatcher.emit(new MarioEvent_1.MarioEvent(CacheEvents_1.CacheEvents.BEFORE_CLEAR_CACHE));
            yield this.cacheRemoveAll();
            yield this.dispatcher.emit(new MarioEvent_1.MarioEvent(CacheEvents_1.CacheEvents.AFTER_CLEAR_CACHE));
        });
    }
    cacheRemoveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.browsingData.removeCache({}, () => {
                        resolve();
                    });
                }
                catch (e) {
                    this.logger.error(e);
                    reject();
                }
            });
        });
    }
};
CacheService.EVENT_BEFORE_CLEAR_CACHE = 'beforeClearCache';
CacheService.EVENT_AFTER_CLEAR_CACHE = 'afterClearCache';
CacheService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.LOGGER_SERVICE)),
    __param(1, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER)),
    __metadata("design:paramtypes", [Object, Object])
], CacheService);
exports.CacheService = CacheService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ContentDispatcher/Bg/ContentDispatcherService.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/ContentDispatcher/Bg/ContentDispatcherService.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/Exceptions/ExternalDispatcherException.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/Exceptions/ExternalDispatcherException.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class ExternalDispatcherException extends Error {
}
exports.ExternalDispatcherException = ExternalDispatcherException;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/Exceptions/ExternalDispatcherListenerIsNotFoundException.js":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/Exceptions/ExternalDispatcherListenerIsNotFoundException.js ***!
  \************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ExternalDispatcherException_1 = __webpack_require__(/*! ./ExternalDispatcherException */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/Exceptions/ExternalDispatcherException.js");
class ExternalDispatcherListenerIsNotFoundException extends ExternalDispatcherException_1.ExternalDispatcherException {
}
exports.ExternalDispatcherListenerIsNotFoundException = ExternalDispatcherListenerIsNotFoundException;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcher.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcher.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const ExternalDispatcherEvents_1 = __webpack_require__(/*! ./ExternalDispatcherEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcherEvents.js");
const ExternalDispatcherListenerIsNotFoundException_1 = __webpack_require__(/*! ./Exceptions/ExternalDispatcherListenerIsNotFoundException */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/Exceptions/ExternalDispatcherListenerIsNotFoundException.js");
let ExternalDispatcher = class ExternalDispatcher {
    constructor(container, loggerService, tabService) {
        this.container = container;
        this.loggerService = loggerService;
        this.tabService = tabService;
        this.listeners = {};
        this.listenersIndex = {};
        this.counter = 0;
        this.beforeEmitListeners = [];
        chrome.runtime.onMessage.addListener((message, sender, response) => {
            this.internalEmit(ExternalDispatcherEvents_1.ExternalDispatcherEvents.ON_ANY_MESSAGE, message, sender, response);
            if (this.isEventMessage(message)) {
                const scope = message.event;
                this.loggerService.event('ExternalDispatcher: got', message);
                this.internalEmit(scope, message, sender, response);
            }
            return true;
        });
    }
    emit(tabId, event) {
        this.loggerService.event('ExternalDispatcher: emit', event);
        try {
            this.beforeEmitListeners.forEach((listener) => listener(tabId, event));
        }
        catch (e) {
            this.loggerService.error(e);
        }
        this.tabService.sendMessage(tabId, event);
    }
    on(useClass) {
        const handler = this.bind(useClass);
        this.loggerService.log(`ExternalDispatcher: register an event listener "${handler.on()}"`);
        return this.addEventListener(handler.on(), handler);
    }
    onBeforeEmit(listener) {
        this.beforeEmitListeners.push(listener);
        return;
    }
    removeListener(listenerId) {
        if (!this.hasListeners(listenerId)) {
            throw new ExternalDispatcherListenerIsNotFoundException_1.ExternalDispatcherListenerIsNotFoundException(`Listener with id "${listenerId}" is not found`);
        }
        this.loggerService.log(`ExternalDispatcher: remove an event listener "${listenerId}"`);
        const scope = this.listenersIndex[listenerId];
        delete this.listeners[scope][listenerId];
        delete this.listenersIndex[listenerId];
    }
    getListener(listenerId) {
        if (!this.hasListeners(listenerId)) {
            throw new ExternalDispatcherListenerIsNotFoundException_1.ExternalDispatcherListenerIsNotFoundException(`Listener with id "${listenerId}" is not found`);
        }
        const scope = this.listenersIndex[listenerId];
        return this.listeners[scope][listenerId];
    }
    hasListeners(listenerId) {
        return typeof this.listenersIndex[listenerId] !== 'undefined';
    }
    getEventListeners(event) {
        return this.hasEventListeners(event) ? this.listeners[event] : [];
    }
    hasEventListeners(event) {
        return typeof this.listeners[event] !== 'undefined';
    }
    isEventMessage(message) {
        return (typeof message === 'object') && (typeof message.event === 'string');
    }
    internalEmit(scope, message, sender, sendResponse) {
        if (!this.hasEventListeners(scope)) {
            return;
        }
        const promises = [];
        const listeners = this.listeners[scope];
        for (const key of Object.keys(listeners)) {
            const listener = listeners[key];
            const promise = listener.handle.apply(listener, [message, sender, sendResponse]);
            promises.push(promise);
        }
        Promise.all(promises).then();
    }
    addEventListener(scope, handler) {
        if (typeof this.listeners[scope] === 'undefined') {
            this.listeners[scope] = {};
        }
        const id = ++this.counter;
        this.listeners[scope][id] = handler;
        this.listenersIndex[id] = scope;
        return id;
    }
    bind(useClass) {
        this.container.bind(useClass).toSelf().inSingletonScope();
        return this.container.get(useClass);
    }
};
ExternalDispatcher = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.CONTAINER)),
    __param(1, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.LOGGER_SERVICE)),
    __param(2, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.TAB_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ExternalDispatcher);
exports.ExternalDispatcher = ExternalDispatcher;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcherEvents.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcherEvents.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var ExternalDispatcherEvents;
(function (ExternalDispatcherEvents) {
    ExternalDispatcherEvents["ON_ANY_MESSAGE"] = "ON_ANY_MESSAGE";
})(ExternalDispatcherEvents = exports.ExternalDispatcherEvents || (exports.ExternalDispatcherEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/Exceptions/InternalDispatcherException.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/Exceptions/InternalDispatcherException.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class InternalDispatcherException extends Error {
}
exports.InternalDispatcherException = InternalDispatcherException;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/Exceptions/InternalDispatcherListenerIsNotRegisteredException.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/Exceptions/InternalDispatcherListenerIsNotRegisteredException.js ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const InternalDispatcherException_1 = __webpack_require__(/*! ./InternalDispatcherException */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/Exceptions/InternalDispatcherException.js");
class InternalDispatcherListenerIsNotRegisteredException extends InternalDispatcherException_1.InternalDispatcherException {
}
exports.InternalDispatcherListenerIsNotRegisteredException = InternalDispatcherListenerIsNotRegisteredException;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/InternalDispatcher.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/InternalDispatcher.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const InternalDispatcherListenerIsNotRegisteredException_1 = __webpack_require__(/*! ./Exceptions/InternalDispatcherListenerIsNotRegisteredException */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/Exceptions/InternalDispatcherListenerIsNotRegisteredException.js");
let InternalDispatcher = class InternalDispatcher {
    constructor(container, loggerService) {
        this.container = container;
        this.loggerService = loggerService;
        this.counter = 0;
        this.listeners = {};
        this.listenersIndex = {};
        this.onBeforeEmitListeners = [];
    }
    emit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.event(`InternalDispatcher`, event);
            try {
                this.onBeforeEmitListeners.forEach((listener) => listener(event));
            }
            catch (e) {
                this.loggerService.error(e);
            }
            const listeners = this.getEventListeners(event.event);
            const promises = [];
            for (const key in listeners) {
                const listener = listeners[key];
                const promise = listener.handle.apply(listener, [event]);
                promises.push(promise);
            }
            yield Promise.all(promises);
        });
    }
    on(useClass) {
        this.container.bind(useClass).toSelf().inSingletonScope();
        const handler = this.container.get(useClass);
        const eventName = handler.on();
        this.loggerService.log(`InternalDispatcher: register a listener on event "${eventName}"`);
        if (typeof this.listeners[eventName] === 'undefined') {
            this.listeners[eventName] = [];
        }
        const id = ++this.counter;
        this.listenersIndex[id] = eventName;
        this.listeners[eventName][id] = handler;
        return id;
    }
    onBeforeEmit(listener) {
        this.onBeforeEmitListeners.push(listener);
    }
    hasEventListeners(eventName) {
        return this.listeners.hasOwnProperty(eventName) && this.listeners[eventName].length > 0;
    }
    getEventListeners(eventName) {
        if (this.hasEventListeners(eventName)) {
            const listeners = this.listeners[eventName];
            return listeners.filter((value) => !!value.handle);
        }
        return [];
    }
    getListener(id) {
        if (!this.hasListener(id)) {
            throw new InternalDispatcherListenerIsNotRegisteredException_1.InternalDispatcherListenerIsNotRegisteredException(`a listener with id "${id}" is not registered`);
        }
        const eventName = this.listenersIndex[id];
        return this.listeners[eventName][id];
    }
    removeListener(id) {
        if (!this.hasListener(id)) {
            throw new InternalDispatcherListenerIsNotRegisteredException_1.InternalDispatcherListenerIsNotRegisteredException(`a listener with id "${id}" is not registered`);
        }
        const eventName = this.listenersIndex[id];
        delete this.listenersIndex[id];
        delete this.listeners[eventName][id];
    }
    hasListener(listenerId) {
        return this.listenersIndex.hasOwnProperty(listenerId);
    }
};
InternalDispatcher = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.CONTAINER)),
    __param(1, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.LOGGER_SERVICE)),
    __metadata("design:paramtypes", [Object, Object])
], InternalDispatcher);
exports.InternalDispatcher = InternalDispatcher;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Logger/Bg/LoggerService.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Logger/Bg/LoggerService.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const stringify = __webpack_require__(/*! json-stringify-safe */ "./node_modules/json-stringify-safe/stringify.js");
let LoggerService = LoggerService_1 = class LoggerService {
    constructor() {
        this.onLogListeners = [];
        this.onEventListeners = [];
        this.onErrorListeners = [];
        this.onWarnListeners = [];
        this.onFilterLogListeners = [];
        this.enabled = true;
    }
    log(message, args) {
        const output = this.time();
        output[0] += `%c[INFO] %c${message}`;
        output.push(this.color(LoggerService_1.LIGHT_BLUE_COLOR) + this.fontWeight(600));
        output.push(this.color(LoggerService_1.BLACK_COLOR));
        let argsOutput = '';
        if (typeof args !== 'undefined') {
            argsOutput = stringify(args, null, 2);
        }
        const cleanOutput = this.prepareOutput(output[0], argsOutput);
        const showOutput = !this.filterInfo(cleanOutput);
        if (showOutput) {
            if (this.enabled) {
                console.log.apply(console, output);
            }
            if (this.enabled && argsOutput) {
                console.log(argsOutput);
            }
        }
        this.handleOnLogListeners(message, args, cleanOutput);
    }
    event(message, event) {
        const output = this.time();
        output[0] += `%c[EVENT ${event.event}] %c${message}`;
        output.push(this.color(LoggerService_1.LIGHT_GREEN_COLOR) + this.fontWeight(600));
        output.push(this.color(LoggerService_1.BLACK_COLOR));
        if (this.enabled) {
            console.log.apply(console, output);
        }
        const argsOutput = stringify(event.data, null, 2);
        if (this.enabled) {
            console.log(argsOutput);
        }
        this.handleOnEventListeners(message, event, this.prepareOutput(output[0], argsOutput));
    }
    warn(message, args) {
        const output = this.time();
        output[0] += `%c[WARN] %c${message}`;
        output.push(this.color(LoggerService_1.RED_COLOR) + this.fontWeight(600));
        output.push(this.color(LoggerService_1.BLACK_COLOR));
        if (this.enabled) {
            console.log.apply(console, output);
        }
        let argsOutput = '';
        if (this.enabled && typeof args !== 'undefined') {
            console.log(args);
            argsOutput = stringify(args, null, 2);
        }
        this.handleOnWarnListeners(message, args, this.prepareOutput(output[0], argsOutput));
    }
    error(e) {
        const output = this.time();
        output[0] += `%c[ERROR] %c${e.message}`;
        output.push(this.color(LoggerService_1.RED_COLOR) + this.fontWeight(600));
        output.push(this.color(LoggerService_1.BLACK_COLOR));
        if (this.enabled) {
            console.log.apply(console, output);
            if (e.stack) {
                console.error(e.stack);
            }
        }
        this.handleOnErrorListeners(e);
    }
    onLog(callback) {
        this.onLogListeners.push(callback);
    }
    onEvent(callback) {
        this.onEventListeners.push(callback);
    }
    onWarn(callback) {
        this.onWarnListeners.push(callback);
    }
    onError(callback) {
        this.onErrorListeners.push(callback);
    }
    onFilterLog(callback) {
        this.onFilterLogListeners.push(callback);
    }
    disable() {
        this.enabled = false;
    }
    enable() {
        this.enabled = true;
    }
    handleOnLogListeners(message, args, output) {
        for (const listener of this.onLogListeners) {
            listener(message, args, output);
        }
    }
    handleOnWarnListeners(message, args, output) {
        for (const listener of this.onWarnListeners) {
            listener(message, args, output);
        }
    }
    handleOnEventListeners(message, event, output) {
        for (const listener of this.onEventListeners) {
            listener(message, event, output);
        }
    }
    handleOnErrorListeners(e, output) {
        for (const listener of this.onErrorListeners) {
            listener(e, output);
        }
    }
    filterInfo(cleanOutput) {
        for (const listener of this.onFilterLogListeners) {
            const filterMe = listener(cleanOutput);
            if (filterMe) {
                return true;
            }
        }
        return false;
    }
    time() {
        const date = new Date();
        let time = `%c[`;
        time += `tz:${date.getTimezoneOffset()} `;
        time += `${this.pad(date.getDate().toString(), 2)}/`;
        time += `${this.pad(date.getMonth().toString(), 2)}/`;
        time += `${date.getFullYear()} `;
        time += `${this.pad(date.getHours().toString(), 2)}:`;
        time += `${this.pad(date.getMinutes().toString(), 2)}:`;
        time += `${this.pad(date.getSeconds().toString(), 2)} `;
        time += `${this.pad(date.getMilliseconds().toString(), 4)}`;
        time += `]%c `;
        return [
            time,
            this.fontWeight(600),
            this.color(LoggerService_1.BLACK_COLOR),
        ];
    }
    color(color) {
        return `color: ${color};`;
    }
    fontWeight(value) {
        return `font-weight: ${value};`;
    }
    pad(str, width, z) {
        const char = z || '0';
        return str.length >= width ? str : new Array(width - str.length + 1).join(char) + str;
    }
    prepareOutput(output, args) {
        return `${output.replace(/%c/g, '')}\n${args}`;
    }
};
LoggerService.BLACK_COLOR = '#000';
LoggerService.RED_COLOR = '#f40f3f';
LoggerService.LIGHT_GREEN_COLOR = '#1e9f3e';
LoggerService.LIGHT_BLUE_COLOR = '#4285f4';
LoggerService = LoggerService_1 = __decorate([
    inversify_1.injectable()
], LoggerService);
exports.LoggerService = LoggerService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Navigation/Bg/NavigationService.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Navigation/Bg/NavigationService.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const index_1 = __webpack_require__(/*! ../../../index */ "./node_modules/@urbandevs/mario-core/dist/src/index.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const NavigationServiceEvents_1 = __webpack_require__(/*! ./NavigationServiceEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Navigation/Bg/NavigationServiceEvents.js");
let NavigationService = class NavigationService {
    constructor(dispatcherService) {
        this.dispatcherService = dispatcherService;
        this.isListenOnBeforeNavigate = false;
        this.isListenOnCommitted = false;
        this.isListenOnDOMContentLoaded = false;
        this.isListenOnCompleted = false;
        this.isListenOnErrorOccurred = false;
        this.isListenOnCreatedNavigationTarget = false;
        this.isListenOnReferenceFragmentUpdated = false;
        this.isListenOnTabReplaced = false;
        this.isListenOnHistoryStateUpdated = false;
    }
    listenOnBeforeNavigate() {
        if (!this.isListenOnBeforeNavigate) {
            this.isListenOnBeforeNavigate = true;
            chrome.webNavigation.onBeforeNavigate.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_BEFORE_NAVIGATE, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnCommitted() {
        if (!this.isListenOnCommitted) {
            this.isListenOnCommitted = true;
            chrome.webNavigation.onCommitted.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_COMMITTED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnDOMContentLoaded() {
        if (!this.isListenOnDOMContentLoaded) {
            this.isListenOnDOMContentLoaded = true;
            chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_DOM_CONTENT_LOADED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnCompleted() {
        if (!this.isListenOnCompleted) {
            this.isListenOnCompleted = true;
            chrome.webNavigation.onCompleted.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_COMPLETED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnErrorOccurred() {
        if (!this.isListenOnErrorOccurred) {
            this.isListenOnErrorOccurred = true;
            chrome.webNavigation.onErrorOccurred.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_ERROR_OCCURRED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnCreatedNavigationTarget() {
        if (!this.isListenOnCreatedNavigationTarget) {
            this.isListenOnCreatedNavigationTarget = true;
            chrome.webNavigation.onCreatedNavigationTarget.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_CREATED_NAVIGATION_TARGET, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnReferenceFragmentUpdated() {
        if (!this.isListenOnReferenceFragmentUpdated) {
            this.isListenOnReferenceFragmentUpdated = true;
            chrome.webNavigation.onReferenceFragmentUpdated.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_REFERENCE_FRAGMNENT_UPDATED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnTabReplaced() {
        if (!this.isListenOnTabReplaced) {
            this.isListenOnTabReplaced = true;
            chrome.webNavigation.onTabReplaced.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_TAB_REPLACED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnHistoryStateUpdated() {
        if (!this.isListenOnHistoryStateUpdated) {
            this.isListenOnHistoryStateUpdated = true;
            chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
                const event = new index_1.MarioEvent(NavigationServiceEvents_1.NavigationServiceEvents.NAVIGATION_ON_HISTORY_STATE_UPDATED, { details });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    /**
    * Retrieves information about the given frame
    * @param properties
    * @returns {Promise<Frame>}
    */
    getFrame(properties) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.webNavigation.getFrame(properties, (frame) => resolve(frame));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    /**
    * Retrieves information about all frames of a given tab.
    * @param properties
    * @returns {Promise<Frame>}
    */
    getAllFrames(properties) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.webNavigation.getAllFrames(properties, (frames) => resolve(frames));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
};
NavigationService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER)),
    __metadata("design:paramtypes", [Object])
], NavigationService);
exports.NavigationService = NavigationService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Navigation/Bg/NavigationServiceEvents.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Navigation/Bg/NavigationServiceEvents.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var NavigationServiceEvents;
(function (NavigationServiceEvents) {
    NavigationServiceEvents["NAVIGATION_ON_BEFORE_NAVIGATE"] = "NAVIGATION_ON_BEFORE_NAVIGATE";
    NavigationServiceEvents["NAVIGATION_ON_COMMITTED"] = "NAVIGATION_ON_COMMITTED";
    NavigationServiceEvents["NAVIGATION_ON_DOM_CONTENT_LOADED"] = "NAVIGATION_ON_DOM_CONTENT_LOADED";
    NavigationServiceEvents["NAVIGATION_ON_COMPLETED"] = "NAVIGATION_ON_COMPLETED";
    NavigationServiceEvents["NAVIGATION_ON_ERROR_OCCURRED"] = "NAVIGATION_ON_ERROR_OCCURRED";
    NavigationServiceEvents["NAVIGATION_ON_CREATED_NAVIGATION_TARGET"] = "NAVIGATION_ON_CREATED_NAVIGATION_TARGET";
    NavigationServiceEvents["NAVIGATION_ON_REFERENCE_FRAGMNENT_UPDATED"] = "NAVIGATION_ON_REFERENCE_FRAGMNENT_UPDATED";
    NavigationServiceEvents["NAVIGATION_ON_TAB_REPLACED"] = "NAVIGATION_ON_TAB_REMOVED";
    NavigationServiceEvents["NAVIGATION_ON_HISTORY_STATE_UPDATED"] = "NAVIGATION_ON_HISTORY_STATE_UPDATED";
})(NavigationServiceEvents = exports.NavigationServiceEvents || (exports.NavigationServiceEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/PortDispatcher/Bg/PortDispatcher.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/PortDispatcher/Bg/PortDispatcher.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const __1 = __webpack_require__(/*! ../../.. */ "./node_modules/@urbandevs/mario-core/dist/src/index.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const PortDispatcherEvents_1 = __webpack_require__(/*! ../PortDispatcherEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/PortDispatcher/PortDispatcherEvents.js");
let PortDispatcher = class PortDispatcher {
    constructor(container, logger, dispatcher) {
        this.container = container;
        this.logger = logger;
        this.dispatcher = dispatcher;
        this.ports = {};
        this.listeners = {};
        this.onBeforeEmitListeners = [];
        chrome.runtime.onConnect.addListener((port) => {
            this.ports[port.name] = port;
            this.logger.log(`Port "${port.name}" is created`);
            port.onMessage.addListener((message) => {
                message.port = port.name;
                this.internalEmit(PortDispatcherEvents_1.PortDispatcherEvents.ON_ANY_MESSAGE, message);
                if (this.isEventMessage(message)) {
                    const eventName = message.event;
                    this.internalEmit(eventName, message);
                }
            });
            port.onDisconnect.addListener(() => {
                this.logger.log(`Port "${port.name}" is disconnected`);
                delete this.ports[port.name];
                const portDisconnectedEvent = new __1.MarioEvent(PortDispatcherEvents_1.PortDispatcherEvents.PORT_DISCONNECTED, { name: port.name });
                this.dispatcher.emit(portDisconnectedEvent).then();
            });
            const portConnectedEvent = new __1.MarioEvent(PortDispatcherEvents_1.PortDispatcherEvents.PORT_CONNECTED, { name: port.name });
            this.dispatcher.emit(portConnectedEvent).then();
        });
    }
    on(useClass) {
        this.container.bind(useClass).toSelf().inSingletonScope();
        const handler = this.container.get(useClass);
        const eventName = handler.on();
        if (typeof this.listeners[eventName] === 'undefined') {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(handler);
        this.logger.log(`PortDispatcher: register a listener on event "${eventName}"`);
    }
    onBeforeEmit(listener) {
        this.onBeforeEmitListeners.push(listener);
    }
    emit(event, portNameOrBroadcast, skipInterception) {
        let targetPorts = [];
        if (portNameOrBroadcast) {
            const portName = portNameOrBroadcast;
            if (this.hasNotPort(portName)) {
                throw Error(`PortDispatcher: a named port "${portName}" is not found`);
            }
            const port = this.getPort(portName);
            targetPorts.push(port);
        }
        else {
            targetPorts = Object.keys(this.ports).map((v) => this.ports[v]);
        }
        const intercept = !skipInterception;
        if (intercept) {
            this.onBeforeEmitListeners.forEach((listener) => {
                try {
                    listener(event);
                }
                catch (e) {
                    this.logger.error(e);
                }
            });
        }
        targetPorts.forEach((port) => port.postMessage(event));
    }
    hasPort(portName) {
        return !!this.ports[portName];
    }
    hasNotPort(portName) {
        return !this.hasPort(portName);
    }
    disconnectPort(portName) {
        if (this.hasNotPort(portName)) {
            this.logger.log(`Port "${portName}" cannot be disconnected because it's not registered`);
        }
        const port = this.ports[portName];
        port.disconnect();
    }
    hasEventListeners(eventName) {
        return this.listeners[eventName] && this.listeners[eventName].length > 0;
    }
    isEventMessage(message) {
        return (typeof message === 'object') && (typeof message.event === 'string');
    }
    getPort(portName) {
        return this.ports[portName];
    }
    internalEmit(eventName, event) {
        if (!this.hasEventListeners(eventName)) {
            return;
        }
        this.listeners[eventName].forEach((listener) => {
            try {
                listener.handle(event).then();
            }
            catch (e) {
                this.logger.error(e);
            }
        });
    }
};
PortDispatcher = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.CONTAINER)),
    __param(1, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.LOGGER_SERVICE)),
    __param(2, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER)),
    __metadata("design:paramtypes", [Object, Object, Object])
], PortDispatcher);
exports.PortDispatcher = PortDispatcher;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/PortDispatcher/PortDispatcherEvents.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/PortDispatcher/PortDispatcherEvents.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var PortDispatcherEvents;
(function (PortDispatcherEvents) {
    PortDispatcherEvents["PORT_CONNECTED"] = "PORT_CONNECTED";
    PortDispatcherEvents["PORT_DISCONNECTED"] = "PORT_DISCONNECTED";
    PortDispatcherEvents["ON_ANY_MESSAGE"] = "ON_ANY_MESSAGE";
})(PortDispatcherEvents = exports.PortDispatcherEvents || (exports.PortDispatcherEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/StorageService/Bg/StorageService.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/StorageService/Bg/StorageService.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * StorageService
 */
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
let StorageService = class StorageService {
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                chrome.storage.local.get(key, (data) => {
                    const response = typeof data[key] !== 'undefined' ? data[key] : null;
                    resolve(response);
                });
            });
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const data = {};
                data[key] = value;
                chrome.storage.local.set(data, () => resolve());
            });
        });
    }
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.get(key);
            return value !== null;
        });
    }
    remove(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.storage.local.remove(keys, () => resolve());
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    clean() {
        chrome.storage.local.clear();
    }
};
StorageService = __decorate([
    inversify_1.injectable()
], StorageService);
exports.StorageService = StorageService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabService.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabService.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const index_1 = __webpack_require__(/*! ../../../index */ "./node_modules/@urbandevs/mario-core/dist/src/index.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const TabServiceEvents_1 = __webpack_require__(/*! ./TabServiceEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabServiceEvents.js");
let TabService = class TabService {
    constructor(dispatcherService) {
        this.dispatcherService = dispatcherService;
        this.isListenOnCreated = false;
        this.isListenOnUpdated = false;
        this.isListenOnMoved = false;
        this.isListenOnActivated = false;
        this.isListenOnHighlighted = false;
        this.isListenOnDetached = false;
        this.isListenOnAttached = false;
        this.isListenOnRemoved = false;
        this.isListenOnReplaced = false;
        this.isListenOnZoomChange = false;
    }
    listenOnCreated() {
        if (!this.isListenOnCreated) {
            this.isListenOnCreated = true;
            chrome.tabs.onCreated.addListener((tab) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_CREATED, { tab });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnUpdated() {
        if (!this.isListenOnUpdated) {
            this.isListenOnUpdated = true;
            chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_UPDATED, { tabId, changeInfo, tab });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnMoved() {
        if (!this.isListenOnMoved) {
            this.isListenOnMoved = true;
            chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_MOVED, { tabId, moveInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnActivated() {
        if (!this.isListenOnActivated) {
            this.isListenOnActivated = true;
            chrome.tabs.onActivated.addListener((activeInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_ACTIVATED, { activeInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnHighlighted() {
        if (!this.isListenOnHighlighted) {
            this.isListenOnHighlighted = true;
            chrome.tabs.onHighlighted.addListener((highlightInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_HIGHLIGHTED, { highlightInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnDetached() {
        if (!this.isListenOnDetached) {
            this.isListenOnDetached = true;
            chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_DETACHED, { tabId, detachInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnAttached() {
        if (!this.isListenOnAttached) {
            this.isListenOnAttached = true;
            chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_ATTACHED, { tabId, attachInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnRemoved() {
        if (!this.isListenOnRemoved) {
            this.isListenOnRemoved = true;
            chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_REMOVED, { tabId, removeInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnReplaced() {
        if (!this.isListenOnReplaced) {
            this.isListenOnReplaced = true;
            chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_REPLACED, { addedTabId, removedTabId });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    listenOnZoomChange() {
        if (!this.isListenOnZoomChange) {
            this.isListenOnZoomChange = true;
            chrome.tabs.onZoomChange.addListener((zoomChangeInfo) => {
                const event = new index_1.MarioEvent(TabServiceEvents_1.TabServiceEvents.ON_TAB_ZOOM_CHANGE, { zoomChangeInfo });
                this.dispatcherService.emit(event).then();
            });
        }
    }
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app
     * @param tabId
     * @param message
     */
    sendMessage(tabId, message) {
        chrome.tabs.sendMessage(tabId, message, result => {
            if (chrome.runtime.lastError) {
                // do nothing
            }
        });
    }
    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     */
    query(queryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.query(queryInfo, (tabs) => {
                        resolve(tabs);
                    });
                }
                catch (e) {
                    reject();
                }
            });
        });
    }
    /**
     * Reload a tab.
     *
     * @param tabId
     * @param reloadProperties
     * @returns {Promise<any>}
     */
    reload(tabId, reloadProperties = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.reload(tabId, reloadProperties, () => {
                        resolve();
                    });
                }
                catch (e) {
                    reject();
                }
            });
        });
    }
    create(properties) {
        chrome.tabs.create(properties);
    }
    get(tabId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.get(tabId, (tab) => resolve(tab));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    getCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.getCurrent((tab) => resolve(tab));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    duplicate(tabId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.duplicate(tabId, (tab) => resolve(tab));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    highlight(highlightInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.highlight(highlightInfo, () => resolve());
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    update(updateProperties, tabId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.update(tabId, updateProperties, (tab) => resolve(tab));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    move(tabs, moveProperties) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.move(tabs, moveProperties, (tabs) => resolve(tabs));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    remove(tabs) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.remove(tabs, (tabs) => resolve(tabs));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
};
TabService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER)),
    __metadata("design:paramtypes", [Object])
], TabService);
exports.TabService = TabService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabServiceEvents.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabServiceEvents.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var TabServiceEvents;
(function (TabServiceEvents) {
    TabServiceEvents["ON_TAB_CREATED"] = "ON_TAB_CREATED";
    TabServiceEvents["ON_TAB_UPDATED"] = "ON_TAB_UPDATED";
    TabServiceEvents["ON_TAB_MOVED"] = "ON_TAB_MOVED";
    TabServiceEvents["ON_TAB_ACTIVATED"] = "ON_TAB_ACTIVATED";
    TabServiceEvents["ON_TAB_HIGHLIGHTED"] = "ON_TAB_HIGHLIGHTED";
    TabServiceEvents["ON_TAB_DETACHED"] = "ON_TAB_DETACHED";
    TabServiceEvents["ON_TAB_ATTACHED"] = "ON_TAB_ATTACHED";
    TabServiceEvents["ON_TAB_REMOVED"] = "ON_TAB_REMOVED";
    TabServiceEvents["ON_TAB_REPLACED"] = "ON_TAB_REPLACED";
    TabServiceEvents["ON_TAB_ZOOM_CHANGE"] = "ON_TAB_ZOOM_CHANGE";
})(TabServiceEvents = exports.TabServiceEvents || (exports.TabServiceEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WebRequest/Bg/WebRequestService.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WebRequest/Bg/WebRequestService.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const index_1 = __webpack_require__(/*! ../../../index */ "./node_modules/@urbandevs/mario-core/dist/src/index.js");
const MARIO_TYPES_1 = __webpack_require__(/*! ../../../MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
const WebRequestServiceEvents_1 = __webpack_require__(/*! ./WebRequestServiceEvents */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WebRequest/Bg/WebRequestServiceEvents.js");
let WebRequestService = class WebRequestService {
    constructor(dispatcherService) {
        this.dispatcherService = dispatcherService;
        this.isListenOnBeforeRequest = false;
        this.isListenOnBeforeSendHeaders = false;
        this.isListenOnSendHeaders = false;
        this.isListenOnHeadersReceived = false;
        this.isListenOnAuthRequired = false;
        this.isListenOnResponseStarted = false;
        this.isListenOnBeforeRedirect = false;
        this.isListenOnCompleted = false;
        this.isListenOnErrorOccurred = false;
        this.isListenOnActionIgnored = false;
    }
    listenOnBeforeRequest(filter, opt_extraInfoSpec) {
        if (!this.isListenOnBeforeRequest) {
            this.isListenOnBeforeRequest = true;
            chrome.webRequest.onBeforeRequest.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_BEFORE_REQUEST, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnBeforeSendHeaders(filter, opt_extraInfoSpec) {
        if (!this.isListenOnBeforeSendHeaders) {
            this.isListenOnBeforeSendHeaders = true;
            chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_BEFORE_SEND_HEADERS, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnSendHeaders(filter, opt_extraInfoSpec) {
        if (!this.isListenOnSendHeaders) {
            this.isListenOnSendHeaders = true;
            chrome.webRequest.onSendHeaders.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_SEND_HEADERS, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnHeadersReceived(filter, opt_extraInfoSpec) {
        if (!this.isListenOnHeadersReceived) {
            this.isListenOnHeadersReceived = true;
            chrome.webRequest.onHeadersReceived.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_HEADERS_RECEIVED, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnAuthRequired(filter, opt_extraInfoSpec) {
        if (!this.isListenOnAuthRequired) {
            this.isListenOnAuthRequired = true;
            chrome.webRequest.onAuthRequired.addListener((details, callback) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_AUTH_REQUIRED, { details, callback });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnResponseStarted(filter, opt_extraInfoSpec) {
        if (!this.isListenOnResponseStarted) {
            this.isListenOnResponseStarted = true;
            chrome.webRequest.onResponseStarted.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_RESPONSE_STARTED, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnBeforeRedirect(filter, opt_extraInfoSpec) {
        if (!this.isListenOnBeforeRedirect) {
            this.isListenOnBeforeRedirect = true;
            chrome.webRequest.onBeforeRedirect.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_BEFORE_REDIRECT, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnCompleted(filter, opt_extraInfoSpec) {
        if (!this.isListenOnCompleted) {
            this.isListenOnCompleted = true;
            chrome.webRequest.onCompleted.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_COMPLETED, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    listenOnErrorOccurred(filter) {
        if (!this.isListenOnErrorOccurred) {
            this.isListenOnErrorOccurred = true;
            chrome.webRequest.onErrorOccurred.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_ERROR_OCCURRED, { details });
                this.dispatcherService.emit(event).then();
            }, filter);
        }
    }
    listenOnActionIgnored(filter, opt_extraInfoSpec) {
        if (!this.isListenOnActionIgnored) {
            this.isListenOnActionIgnored = true;
            chrome.webRequest.onActionIgnored.addListener((details) => {
                const event = new index_1.MarioEvent(WebRequestServiceEvents_1.WebRequestServiceEvents.WEB_REQUEST_ON_ACTION_IGNORED, { details });
                this.dispatcherService.emit(event).then();
            }, filter, opt_extraInfoSpec);
        }
    }
    /**
    * Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching.
    * This function call is expensive. Don't call it often.
    * @param handlerBehaviorChanged
    * @returns {Promise<void>}
    */
    handlerBehaviorChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    chrome.webRequest.handlerBehaviorChanged(() => resolve());
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
};
WebRequestService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(MARIO_TYPES_1.MARIO_TYPES.INTERNAL_DISPATCHER)),
    __metadata("design:paramtypes", [Object])
], WebRequestService);
exports.WebRequestService = WebRequestService;


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WebRequest/Bg/WebRequestServiceEvents.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/Packages/WebRequest/Bg/WebRequestServiceEvents.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var WebRequestServiceEvents;
(function (WebRequestServiceEvents) {
    WebRequestServiceEvents["WEB_REQUEST_ON_BEFORE_REQUEST"] = "WEB_REQUEST_ON_BEFORE_REQUEST";
    WebRequestServiceEvents["WEB_REQUEST_ON_BEFORE_SEND_HEADERS"] = "WEB_REQUEST_ON_BEFORE_SEND_HEADERS";
    WebRequestServiceEvents["WEB_REQUEST_ON_SEND_HEADERS"] = "WEB_REQUEST_ON_SEND_HEADERS";
    WebRequestServiceEvents["WEB_REQUEST_ON_HEADERS_RECEIVED"] = "WEB_REQUEST_ON_HEADERS_RECEIVED";
    WebRequestServiceEvents["WEB_REQUEST_ON_AUTH_REQUIRED"] = "WEB_REQUEST_ON_AUTH_REQUIRED";
    WebRequestServiceEvents["WEB_REQUEST_ON_RESPONSE_STARTED"] = "WEB_REQUEST_ON_RESPONSE_STARTED";
    WebRequestServiceEvents["WEB_REQUEST_ON_BEFORE_REDIRECT"] = "WEB_REQUEST_ON_BEFORE_REDIRECT";
    WebRequestServiceEvents["WEB_REQUEST_ON_COMPLETED"] = "WEB_REQUEST_ON_COMPLETED";
    WebRequestServiceEvents["WEB_REQUEST_ON_ERROR_OCCURRED"] = "WEB_REQUEST_ON_ERROR_OCCURRED";
    WebRequestServiceEvents["WEB_REQUEST_ON_ACTION_IGNORED"] = "WEB_REQUEST_ON_ACTION_IGNORED";
})(WebRequestServiceEvents = exports.WebRequestServiceEvents || (exports.WebRequestServiceEvents = {}));


/***/ }),

/***/ "./node_modules/@urbandevs/mario-core/dist/src/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-core/dist/src/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Mario_1 = __webpack_require__(/*! ./Mario */ "./node_modules/@urbandevs/mario-core/dist/src/Mario.js");
exports.Mario = Mario_1.Mario;
var MarioModule_1 = __webpack_require__(/*! ./Core/MarioModule */ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioModule.js");
exports.MarioModule = MarioModule_1.MarioModule;
var MarioEvent_1 = __webpack_require__(/*! ./Core/MarioEvent */ "./node_modules/@urbandevs/mario-core/dist/src/Core/MarioEvent.js");
exports.MarioEvent = MarioEvent_1.MarioEvent;
var MARIO_TYPES_1 = __webpack_require__(/*! ./MARIO_TYPES */ "./node_modules/@urbandevs/mario-core/dist/src/MARIO_TYPES.js");
exports.MARIO_TYPES = MARIO_TYPES_1.MARIO_TYPES;
var ExternalDispatcher_1 = __webpack_require__(/*! ./Packages/ExternalDispatcher/Bg/ExternalDispatcher */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ExternalDispatcher/Bg/ExternalDispatcher.js");
exports.ExternalDispatcher = ExternalDispatcher_1.ExternalDispatcher;
var CacheService_1 = __webpack_require__(/*! ./Packages/Cache/Bg/CacheService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Cache/Bg/CacheService.js");
exports.CacheService = CacheService_1.CacheService;
var ContentDispatcherService_1 = __webpack_require__(/*! ./Packages/ContentDispatcher/Bg/ContentDispatcherService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/ContentDispatcher/Bg/ContentDispatcherService.js");
exports.ContentDispatcherService = ContentDispatcherService_1.ContentDispatcherService;
var InternalDispatcher_1 = __webpack_require__(/*! ./Packages/InternalDispatcher/Bg/InternalDispatcher */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/InternalDispatcher/Bg/InternalDispatcher.js");
exports.InternalDispatcher = InternalDispatcher_1.InternalDispatcher;
var LoggerService_1 = __webpack_require__(/*! ./Packages/Logger/Bg/LoggerService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Logger/Bg/LoggerService.js");
exports.LoggerService = LoggerService_1.LoggerService;
var TabService_1 = __webpack_require__(/*! ./Packages/Tab/Bg/TabService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Tab/Bg/TabService.js");
exports.TabService = TabService_1.TabService;
var NavigationService_1 = __webpack_require__(/*! ./Packages/Navigation/Bg/NavigationService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/Navigation/Bg/NavigationService.js");
exports.NavigationService = NavigationService_1.NavigationService;
var WebRequestService_1 = __webpack_require__(/*! ./Packages/WebRequest/Bg/WebRequestService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WebRequest/Bg/WebRequestService.js");
exports.WebRequestService = WebRequestService_1.WebRequestService;
var StorageService_1 = __webpack_require__(/*! ./Packages/StorageService/Bg/StorageService */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/StorageService/Bg/StorageService.js");
exports.StorageService = StorageService_1.StorageService;


/***/ }),

/***/ "./node_modules/guid-typescript/dist/guid.js":
/*!***************************************************!*\
  !*** ./node_modules/guid-typescript/dist/guid.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/decorator_utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/decorator_utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagProperty = exports.tagParameter = exports.decorate = void 0;
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
    var metadataKey = METADATA_KEY.TAGGED;
    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
}
exports.tagParameter = tagParameter;
function tagProperty(annotationTarget, propertyName, metadata) {
    var metadataKey = METADATA_KEY.TAGGED_PROP;
    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
}
exports.tagProperty = tagProperty;
function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
    var paramsOrPropertiesMetadata = {};
    var isParameterDecorator = (typeof parameterIndex === "number");
    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
    if (isParameterDecorator && propertyName !== undefined) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (!Array.isArray(paramOrPropertyMetadata)) {
        paramOrPropertyMetadata = [];
    }
    else {
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            if (m.key === metadata.key) {
                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
        }
    }
    paramOrPropertyMetadata.push(metadata);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndex) {
    if (typeof parameterIndex === "number") {
        _decorate([_param(parameterIndex, decorator)], target);
    }
    else if (typeof parameterIndex === "string") {
        Reflect.decorate([decorator], target, parameterIndex);
    }
    else {
        _decorate([decorator], target);
    }
}
exports.decorate = decorate;
//# sourceMappingURL=decorator_utils.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/inject.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/inject.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inject = exports.LazyServiceIdentifer = void 0;
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
var LazyServiceIdentifer = (function () {
    function LazyServiceIdentifer(cb) {
        this._cb = cb;
    }
    LazyServiceIdentifer.prototype.unwrap = function () {
        return this._cb();
    };
    return LazyServiceIdentifer;
}());
exports.LazyServiceIdentifer = LazyServiceIdentifer;
function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
        if (serviceIdentifier === undefined) {
            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
        }
        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/injectable.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/injectable.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectable = void 0;
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
        }
        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
        return target;
    };
}
exports.injectable = injectable;
//# sourceMappingURL=injectable.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/multi_inject.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/multi_inject.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiInject = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function multiInject(serviceIdentifier) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.multiInject = multiInject;
//# sourceMappingURL=multi_inject.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/named.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/named.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.named = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function named(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.named = named;
//# sourceMappingURL=named.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/optional.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/optional.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.optional = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function optional() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.optional = optional;
//# sourceMappingURL=optional.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/post_construct.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/post_construct.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postConstruct = void 0;
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
function postConstruct() {
    return function (target, propertyKey, descriptor) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
        if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
        }
        Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
    };
}
exports.postConstruct = postConstruct;
//# sourceMappingURL=post_construct.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/tagged.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/tagged.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagged = void 0;
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.tagged = tagged;
//# sourceMappingURL=tagged.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/target_name.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/target_name.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.targetName = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function targetName(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.targetName = targetName;
//# sourceMappingURL=target_name.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/annotation/unmanaged.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/unmanaged.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unmanaged = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function unmanaged() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.unmanaged = unmanaged;
//# sourceMappingURL=unmanaged.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/bindings/binding.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/bindings/binding.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Binding = void 0;
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Binding = (function () {
    function Binding(serviceIdentifier, scope) {
        this.id = id_1.id();
        this.activated = false;
        this.serviceIdentifier = serviceIdentifier;
        this.scope = scope;
        this.type = literal_types_1.BindingTypeEnum.Invalid;
        this.constraint = function (request) { return true; };
        this.implementationType = null;
        this.cache = null;
        this.factory = null;
        this.provider = null;
        this.onActivation = null;
        this.dynamicValue = null;
    }
    Binding.prototype.clone = function () {
        var clone = new Binding(this.serviceIdentifier, this.scope);
        clone.activated = (clone.scope === literal_types_1.BindingScopeEnum.Singleton) ? this.activated : false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.cache = this.cache;
        return clone;
    };
    return Binding;
}());
exports.Binding = Binding;
//# sourceMappingURL=binding.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/bindings/binding_count.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/lib/bindings/binding_count.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingCount = void 0;
var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
};
exports.BindingCount = BindingCount;
//# sourceMappingURL=binding_count.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/constants/error_msgs.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/error_msgs.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STACK_OVERFLOW = exports.CIRCULAR_DEPENDENCY_IN_FACTORY = exports.POST_CONSTRUCT_ERROR = exports.MULTIPLE_POST_CONSTRUCT_METHODS = exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = exports.ARGUMENTS_LENGTH_MISMATCH = exports.INVALID_DECORATOR_OPERATION = exports.INVALID_TO_SELF_VALUE = exports.INVALID_FUNCTION_BINDING = exports.INVALID_MIDDLEWARE_RETURN = exports.NO_MORE_SNAPSHOTS_AVAILABLE = exports.INVALID_BINDING_TYPE = exports.NOT_IMPLEMENTED = exports.CIRCULAR_DEPENDENCY = exports.UNDEFINED_INJECT_ANNOTATION = exports.MISSING_INJECT_ANNOTATION = exports.MISSING_INJECTABLE_ANNOTATION = exports.NOT_REGISTERED = exports.CANNOT_UNBIND = exports.AMBIGUOUS_MATCH = exports.KEY_NOT_FOUND = exports.NULL_ARGUMENT = exports.DUPLICATED_METADATA = exports.DUPLICATED_INJECTABLE_DECORATOR = void 0;
exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
exports.NULL_ARGUMENT = "NULL argument";
exports.KEY_NOT_FOUND = "Key Not Found";
exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
var UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
exports.UNDEFINED_INJECT_ANNOTATION = UNDEFINED_INJECT_ANNOTATION;
exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
exports.INVALID_BINDING_TYPE = "Invalid binding type:";
exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
var ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
exports.ARGUMENTS_LENGTH_MISMATCH = ARGUMENTS_LENGTH_MISMATCH;
exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
var POST_CONSTRUCT_ERROR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "@postConstruct error in class " + values[0] + ": " + values[1];
};
exports.POST_CONSTRUCT_ERROR = POST_CONSTRUCT_ERROR;
var CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "It looks like there is a circular dependency " +
        ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
        ("service identifier '" + values[1] + "'.");
};
exports.CIRCULAR_DEPENDENCY_IN_FACTORY = CIRCULAR_DEPENDENCY_IN_FACTORY;
exports.STACK_OVERFLOW = "Maximum call stack size exceeded";
//# sourceMappingURL=error_msgs.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/constants/literal_types.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/literal_types.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = void 0;
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};
exports.BindingScopeEnum = BindingScopeEnum;
var BindingTypeEnum = {
    ConstantValue: "ConstantValue",
    Constructor: "Constructor",
    DynamicValue: "DynamicValue",
    Factory: "Factory",
    Function: "Function",
    Instance: "Instance",
    Invalid: "Invalid",
    Provider: "Provider"
};
exports.BindingTypeEnum = BindingTypeEnum;
var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
};
exports.TargetTypeEnum = TargetTypeEnum;
//# sourceMappingURL=literal_types.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/constants/metadata_keys.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/metadata_keys.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NON_CUSTOM_TAG_KEYS = exports.POST_CONSTRUCT = exports.DESIGN_PARAM_TYPES = exports.PARAM_TYPES = exports.TAGGED_PROP = exports.TAGGED = exports.MULTI_INJECT_TAG = exports.INJECT_TAG = exports.OPTIONAL_TAG = exports.UNMANAGED_TAG = exports.NAME_TAG = exports.NAMED_TAG = void 0;
exports.NAMED_TAG = "named";
exports.NAME_TAG = "name";
exports.UNMANAGED_TAG = "unmanaged";
exports.OPTIONAL_TAG = "optional";
exports.INJECT_TAG = "inject";
exports.MULTI_INJECT_TAG = "multi_inject";
exports.TAGGED = "inversify:tagged";
exports.TAGGED_PROP = "inversify:tagged_props";
exports.PARAM_TYPES = "inversify:paramtypes";
exports.DESIGN_PARAM_TYPES = "design:paramtypes";
exports.POST_CONSTRUCT = "post_construct";
function getNonCustomTagKeys() {
    return [
        exports.INJECT_TAG,
        exports.MULTI_INJECT_TAG,
        exports.NAME_TAG,
        exports.UNMANAGED_TAG,
        exports.NAMED_TAG,
        exports.OPTIONAL_TAG,
    ];
}
exports.NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
//# sourceMappingURL=metadata_keys.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/container/container.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/container/container.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Container = void 0;
var binding_1 = __webpack_require__(/*! ../bindings/binding */ "./node_modules/inversify/lib/bindings/binding.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_reader_1 = __webpack_require__(/*! ../planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
var planner_1 = __webpack_require__(/*! ../planning/planner */ "./node_modules/inversify/lib/planning/planner.js");
var resolver_1 = __webpack_require__(/*! ../resolution/resolver */ "./node_modules/inversify/lib/resolution/resolver.js");
var binding_to_syntax_1 = __webpack_require__(/*! ../syntax/binding_to_syntax */ "./node_modules/inversify/lib/syntax/binding_to_syntax.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var container_snapshot_1 = __webpack_require__(/*! ./container_snapshot */ "./node_modules/inversify/lib/container/container_snapshot.js");
var lookup_1 = __webpack_require__(/*! ./lookup */ "./node_modules/inversify/lib/container/lookup.js");
var Container = (function () {
    function Container(containerOptions) {
        this._appliedMiddleware = [];
        var options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = id_1.id();
        this._bindingDictionary = new lookup_1.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this.parent = null;
        this._metadataReader = new metadata_reader_1.MetadataReader();
    }
    Container.merge = function (container1, container2) {
        var container3 = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            container3[_i - 2] = arguments[_i];
        }
        var container = new Container();
        var targetContainers = __spreadArray([container1, container2], container3).map(function (targetContainer) { return planner_1.getBindingDictionary(targetContainer); });
        var bindingDictionary = planner_1.getBindingDictionary(container);
        function copyDictionary(origin, destination) {
            origin.traverse(function (key, value) {
                value.forEach(function (binding) {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        targetContainers.forEach(function (targetBindingDictionary) {
            copyDictionary(targetBindingDictionary, bindingDictionary);
        });
        return container;
    };
    Container.prototype.load = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var getHelpers = this._getContainerModuleHelpersFactory();
        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var currentModule = modules_1[_a];
            var containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
        }
    };
    Container.prototype.loadAsync = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getHelpers = this._getContainerModuleHelpersFactory();
                        _a = 0, modules_2 = modules;
                        _b.label = 1;
                    case 1:
                        if (!(_a < modules_2.length)) return [3, 4];
                        currentModule = modules_2[_a];
                        containerModuleHelpers = getHelpers(currentModule.id);
                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.unload = function () {
        var _this = this;
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var conditionFactory = function (expected) { return function (item) {
            return item.moduleId === expected;
        }; };
        modules.forEach(function (module) {
            var condition = conditionFactory(module.id);
            _this._bindingDictionary.removeByCondition(condition);
        });
    };
    Container.prototype.bind = function (serviceIdentifier) {
        var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
        var binding = new binding_1.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new binding_to_syntax_1.BindingToSyntax(binding);
    };
    Container.prototype.rebind = function (serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    };
    Container.prototype.unbind = function (serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
        }
    };
    Container.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Container.prototype.isBound = function (serviceIdentifier) {
        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    };
    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
        var bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
            bound = bindings.some(function (b) { return b.constraint(request_1); });
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    };
    Container.prototype.snapshot = function () {
        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
    };
    Container.prototype.restore = function () {
        var snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._middleware = snapshot.middleware;
    };
    Container.prototype.createChild = function (containerOptions) {
        var child = new Container(containerOptions || this.options);
        child.parent = this;
        return child;
    };
    Container.prototype.applyMiddleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        this._appliedMiddleware = this._appliedMiddleware.concat(middlewares);
        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
        this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
    };
    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
        this._metadataReader = metadataReader;
    };
    Container.prototype.get = function (serviceIdentifier) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getNamed = function (serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.getAll = function (serviceIdentifier) {
        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.resolve = function (constructorFunction) {
        var tempContainer = this.createChild();
        tempContainer.bind(constructorFunction).toSelf();
        this._appliedMiddleware.forEach(function (m) {
            tempContainer.applyMiddleware(m);
        });
        return tempContainer.get(constructorFunction);
    };
    Container.prototype._getContainerModuleHelpersFactory = function () {
        var _this = this;
        var setModuleId = function (bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        var getBindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _bind = _this.bind.bind(_this);
                var bindingToSyntax = _bind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getUnbindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _unbind = _this.unbind.bind(_this);
                _unbind(serviceIdentifier);
            };
        };
        var getIsboundFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _isBound = _this.isBound.bind(_this);
                return _isBound(serviceIdentifier);
            };
        };
        var getRebindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _rebind = _this.rebind.bind(_this);
                var bindingToSyntax = _rebind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        return function (mId) { return ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(mId)
        }); };
    };
    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
        var result = null;
        var defaultArgs = {
            avoidConstraints: avoidConstraints,
            contextInterceptor: function (context) { return context; },
            isMultiInject: isMultiInject,
            key: key,
            serviceIdentifier: serviceIdentifier,
            targetType: targetType,
            value: value
        };
        if (this._middleware) {
            result = this._middleware(defaultArgs);
            if (result === undefined || result === null) {
                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
        }
        else {
            result = this._planAndResolve()(defaultArgs);
        }
        return result;
    };
    Container.prototype._planAndResolve = function () {
        var _this = this;
        return function (args) {
            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = resolver_1.resolve(context);
            return result;
        };
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/container/container_module.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/container/container_module.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncContainerModule = exports.ContainerModule = void 0;
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;
var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());
exports.AsyncContainerModule = AsyncContainerModule;
//# sourceMappingURL=container_module.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/container/container_snapshot.js":
/*!********************************************************************!*\
  !*** ./node_modules/inversify/lib/container/container_snapshot.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContainerSnapshot = void 0;
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        return snapshot;
    };
    return ContainerSnapshot;
}());
exports.ContainerSnapshot = ContainerSnapshot;
//# sourceMappingURL=container_snapshot.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/container/lookup.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/container/lookup.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lookup = void 0;
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var Lookup = (function () {
    function Lookup() {
        this._map = new Map();
    }
    Lookup.prototype.getMap = function () {
        return this._map;
    };
    Lookup.prototype.add = function (serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
            this._map.set(serviceIdentifier, entry);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    };
    Lookup.prototype.get = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.remove = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.removeByCondition = function (condition) {
        var _this = this;
        this._map.forEach(function (entries, key) {
            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
            if (updatedEntries.length > 0) {
                _this._map.set(key, updatedEntries);
            }
            else {
                _this._map.delete(key);
            }
        });
    };
    Lookup.prototype.hasKey = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    };
    Lookup.prototype.clone = function () {
        var copy = new Lookup();
        this._map.forEach(function (value, key) {
            value.forEach(function (b) { return copy.add(key, b.clone()); });
        });
        return copy;
    };
    Lookup.prototype.traverse = function (func) {
        this._map.forEach(function (value, key) {
            func(key, value);
        });
    };
    return Lookup;
}());
exports.Lookup = Lookup;
//# sourceMappingURL=lookup.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/inversify.js":
/*!*************************************************!*\
  !*** ./node_modules/inversify/lib/inversify.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiBindToService = exports.getServiceIdentifierAsString = exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = exports.decorate = exports.id = exports.MetadataReader = exports.postConstruct = exports.targetName = exports.multiInject = exports.unmanaged = exports.optional = exports.LazyServiceIdentifer = exports.inject = exports.named = exports.tagged = exports.injectable = exports.ContainerModule = exports.AsyncContainerModule = exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = exports.Container = exports.METADATA_KEY = void 0;
var keys = __webpack_require__(/*! ./constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
exports.METADATA_KEY = keys;
var container_1 = __webpack_require__(/*! ./container/container */ "./node_modules/inversify/lib/container/container.js");
Object.defineProperty(exports, "Container", ({ enumerable: true, get: function () { return container_1.Container; } }));
var literal_types_1 = __webpack_require__(/*! ./constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
Object.defineProperty(exports, "BindingScopeEnum", ({ enumerable: true, get: function () { return literal_types_1.BindingScopeEnum; } }));
Object.defineProperty(exports, "BindingTypeEnum", ({ enumerable: true, get: function () { return literal_types_1.BindingTypeEnum; } }));
Object.defineProperty(exports, "TargetTypeEnum", ({ enumerable: true, get: function () { return literal_types_1.TargetTypeEnum; } }));
var container_module_1 = __webpack_require__(/*! ./container/container_module */ "./node_modules/inversify/lib/container/container_module.js");
Object.defineProperty(exports, "AsyncContainerModule", ({ enumerable: true, get: function () { return container_module_1.AsyncContainerModule; } }));
Object.defineProperty(exports, "ContainerModule", ({ enumerable: true, get: function () { return container_module_1.ContainerModule; } }));
var injectable_1 = __webpack_require__(/*! ./annotation/injectable */ "./node_modules/inversify/lib/annotation/injectable.js");
Object.defineProperty(exports, "injectable", ({ enumerable: true, get: function () { return injectable_1.injectable; } }));
var tagged_1 = __webpack_require__(/*! ./annotation/tagged */ "./node_modules/inversify/lib/annotation/tagged.js");
Object.defineProperty(exports, "tagged", ({ enumerable: true, get: function () { return tagged_1.tagged; } }));
var named_1 = __webpack_require__(/*! ./annotation/named */ "./node_modules/inversify/lib/annotation/named.js");
Object.defineProperty(exports, "named", ({ enumerable: true, get: function () { return named_1.named; } }));
var inject_1 = __webpack_require__(/*! ./annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
Object.defineProperty(exports, "inject", ({ enumerable: true, get: function () { return inject_1.inject; } }));
Object.defineProperty(exports, "LazyServiceIdentifer", ({ enumerable: true, get: function () { return inject_1.LazyServiceIdentifer; } }));
var optional_1 = __webpack_require__(/*! ./annotation/optional */ "./node_modules/inversify/lib/annotation/optional.js");
Object.defineProperty(exports, "optional", ({ enumerable: true, get: function () { return optional_1.optional; } }));
var unmanaged_1 = __webpack_require__(/*! ./annotation/unmanaged */ "./node_modules/inversify/lib/annotation/unmanaged.js");
Object.defineProperty(exports, "unmanaged", ({ enumerable: true, get: function () { return unmanaged_1.unmanaged; } }));
var multi_inject_1 = __webpack_require__(/*! ./annotation/multi_inject */ "./node_modules/inversify/lib/annotation/multi_inject.js");
Object.defineProperty(exports, "multiInject", ({ enumerable: true, get: function () { return multi_inject_1.multiInject; } }));
var target_name_1 = __webpack_require__(/*! ./annotation/target_name */ "./node_modules/inversify/lib/annotation/target_name.js");
Object.defineProperty(exports, "targetName", ({ enumerable: true, get: function () { return target_name_1.targetName; } }));
var post_construct_1 = __webpack_require__(/*! ./annotation/post_construct */ "./node_modules/inversify/lib/annotation/post_construct.js");
Object.defineProperty(exports, "postConstruct", ({ enumerable: true, get: function () { return post_construct_1.postConstruct; } }));
var metadata_reader_1 = __webpack_require__(/*! ./planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
Object.defineProperty(exports, "MetadataReader", ({ enumerable: true, get: function () { return metadata_reader_1.MetadataReader; } }));
var id_1 = __webpack_require__(/*! ./utils/id */ "./node_modules/inversify/lib/utils/id.js");
Object.defineProperty(exports, "id", ({ enumerable: true, get: function () { return id_1.id; } }));
var decorator_utils_1 = __webpack_require__(/*! ./annotation/decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
Object.defineProperty(exports, "decorate", ({ enumerable: true, get: function () { return decorator_utils_1.decorate; } }));
var constraint_helpers_1 = __webpack_require__(/*! ./syntax/constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
Object.defineProperty(exports, "traverseAncerstors", ({ enumerable: true, get: function () { return constraint_helpers_1.traverseAncerstors; } }));
Object.defineProperty(exports, "taggedConstraint", ({ enumerable: true, get: function () { return constraint_helpers_1.taggedConstraint; } }));
Object.defineProperty(exports, "namedConstraint", ({ enumerable: true, get: function () { return constraint_helpers_1.namedConstraint; } }));
Object.defineProperty(exports, "typeConstraint", ({ enumerable: true, get: function () { return constraint_helpers_1.typeConstraint; } }));
var serialization_1 = __webpack_require__(/*! ./utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
Object.defineProperty(exports, "getServiceIdentifierAsString", ({ enumerable: true, get: function () { return serialization_1.getServiceIdentifierAsString; } }));
var binding_utils_1 = __webpack_require__(/*! ./utils/binding_utils */ "./node_modules/inversify/lib/utils/binding_utils.js");
Object.defineProperty(exports, "multiBindToService", ({ enumerable: true, get: function () { return binding_utils_1.multiBindToService; } }));
//# sourceMappingURL=inversify.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/context.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/context.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Context = (function () {
    function Context(container) {
        this.id = id_1.id();
        this.container = container;
    }
    Context.prototype.addPlan = function (plan) {
        this.plan = plan;
    };
    Context.prototype.setCurrentRequest = function (currentRequest) {
        this.currentRequest = currentRequest;
    };
    return Context;
}());
exports.Context = Context;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/metadata.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/metadata.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Metadata = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    Metadata.prototype.toString = function () {
        if (this.key === METADATA_KEY.NAMED_TAG) {
            return "named: " + this.value.toString() + " ";
        }
        else {
            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
        }
    };
    return Metadata;
}());
exports.Metadata = Metadata;
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/metadata_reader.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/metadata_reader.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataReader = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var MetadataReader = (function () {
    function MetadataReader() {
    }
    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
        return {
            compilerGeneratedMetadata: compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
        };
    };
    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
        return userGeneratedMetadata;
    };
    return MetadataReader;
}());
exports.MetadataReader = MetadataReader;
//# sourceMappingURL=metadata_reader.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/plan.js":
/*!*****************************************************!*\
  !*** ./node_modules/inversify/lib/planning/plan.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Plan = void 0;
var Plan = (function () {
    function Plan(parentContext, rootRequest) {
        this.parentContext = parentContext;
        this.rootRequest = rootRequest;
    }
    return Plan;
}());
exports.Plan = Plan;
//# sourceMappingURL=plan.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/planner.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/planner.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBindingDictionary = exports.createMockRequest = exports.plan = void 0;
var binding_count_1 = __webpack_require__(/*! ../bindings/binding_count */ "./node_modules/inversify/lib/bindings/binding_count.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var context_1 = __webpack_require__(/*! ./context */ "./node_modules/inversify/lib/planning/context.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var plan_1 = __webpack_require__(/*! ./plan */ "./node_modules/inversify/lib/planning/plan.js");
var reflection_utils_1 = __webpack_require__(/*! ./reflection_utils */ "./node_modules/inversify/lib/planning/reflection_utils.js");
var request_1 = __webpack_require__(/*! ./request */ "./node_modules/inversify/lib/planning/request.js");
var target_1 = __webpack_require__(/*! ./target */ "./node_modules/inversify/lib/planning/target.js");
function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
}
exports.getBindingDictionary = getBindingDictionary;
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
    if (key !== undefined) {
        var tagMetadata = new metadata_1.Metadata(key, value);
        target.metadata.push(tagMetadata);
    }
    return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];
    if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable &&
        context.container.options.autoBindInjectable &&
        typeof target.serviceIdentifier === "function" &&
        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
        context.container.bind(target.serviceIdentifier).toSelf();
        bindings = getBindings(context.container, target.serviceIdentifier);
    }
    if (!avoidConstraints) {
        activeBindings = bindings.filter(function (binding) {
            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
            return binding.constraint(request);
        });
    }
    else {
        activeBindings = bindings;
    }
    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
    return activeBindings;
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
    switch (bindings.length) {
        case binding_count_1.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
                return bindings;
            }
            else {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.NOT_REGISTERED;
                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
            if (!target.isArray()) {
                return bindings;
            }
        case binding_count_1.BindingCount.MultipleBindingsAvailable:
        default:
            if (!target.isArray()) {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
            else {
                return bindings;
            }
    }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
    var activeBindings;
    var childRequest;
    if (parentRequest === null) {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
        childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
        var thePlan = new plan_1.Plan(context, childRequest);
        context.addPlan(thePlan);
    }
    else {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
        childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
    }
    activeBindings.forEach(function (binding) {
        var subChildRequest = null;
        if (target.isArray()) {
            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
        }
        else {
            if (binding.cache) {
                return;
            }
            subChildRequest = childRequest;
        }
        if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
                var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
                if (dependencies.length < baseClassDependencyCount) {
                    var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
                    throw new Error(error);
                }
            }
            dependencies.forEach(function (dependency) {
                _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
            });
        }
    });
}
function getBindings(container, serviceIdentifier) {
    var bindings = [];
    var bindingDictionary = getBindingDictionary(container);
    if (bindingDictionary.hasKey(serviceIdentifier)) {
        bindings = bindingDictionary.get(serviceIdentifier);
    }
    else if (container.parent !== null) {
        bindings = getBindings(container.parent, serviceIdentifier);
    }
    return bindings;
}
function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
    if (avoidConstraints === void 0) { avoidConstraints = false; }
    var context = new context_1.Context(container);
    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
    try {
        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
        return context;
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            if (context.plan) {
                serialization_1.circularDependencyToException(context.plan.rootRequest);
            }
        }
        throw error;
    }
}
exports.plan = plan;
function createMockRequest(container, serviceIdentifier, key, value) {
    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
    var context = new context_1.Context(container);
    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
    return request;
}
exports.createMockRequest = createMockRequest;
//# sourceMappingURL=planner.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/queryable_string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/queryable_string.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryableString = void 0;
var QueryableString = (function () {
    function QueryableString(str) {
        this.str = str;
    }
    QueryableString.prototype.startsWith = function (searchString) {
        return this.str.indexOf(searchString) === 0;
    };
    QueryableString.prototype.endsWith = function (searchString) {
        var reverseString = "";
        var reverseSearchString = searchString.split("").reverse().join("");
        reverseString = this.str.split("").reverse().join("");
        return this.startsWith.call({ str: reverseString }, reverseSearchString);
    };
    QueryableString.prototype.contains = function (searchString) {
        return (this.str.indexOf(searchString) !== -1);
    };
    QueryableString.prototype.equals = function (compareString) {
        return this.str === compareString;
    };
    QueryableString.prototype.value = function () {
        return this.str;
    };
    return QueryableString;
}());
exports.QueryableString = QueryableString;
//# sourceMappingURL=queryable_string.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/reflection_utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/reflection_utils.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFunctionName = exports.getBaseClassDependencyCount = exports.getDependencies = void 0;
var inject_1 = __webpack_require__(/*! ../annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
Object.defineProperty(exports, "getFunctionName", ({ enumerable: true, get: function () { return serialization_1.getFunctionName; } }));
var target_1 = __webpack_require__(/*! ./target */ "./node_modules/inversify/lib/planning/target.js");
function getDependencies(metadataReader, func) {
    var constructorName = serialization_1.getFunctionName(func);
    var targets = getTargets(metadataReader, constructorName, func, false);
    return targets;
}
exports.getDependencies = getDependencies;
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
        throw new Error(msg);
    }
    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    var hasOptionalParameters = keys.length > func.length;
    var iterations = (hasUserDeclaredUnknownInjections || hasOptionalParameters) ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
    var targets = __spreadArray(__spreadArray([], constructorTargets), propertyTargets);
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        var isObject = serviceIdentifier === Object;
        var isFunction = serviceIdentifier === Function;
        var isUndefined = serviceIdentifier === undefined;
        var isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
        }
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        return target;
    }
    return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    var targets = [];
    for (var i = 0; i < iterations; i++) {
        var index = i;
        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
        if (target !== null) {
            targets.push(target);
        }
    }
    return targets;
}
function getClassPropsAsTargets(metadataReader, constructorFunc) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var keys = Object.keys(classPropsMetadata);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var targetMetadata = classPropsMetadata[key];
        var metadata = formatTargetMetadata(classPropsMetadata[key]);
        var targetName = metadata.targetName || key;
        var serviceIdentifier = (metadata.inject || metadata.multiInject);
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
        targets = __spreadArray(__spreadArray([], targets), baseTargets);
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        var metadata = targets.map(function (t) {
            return t.metadata.filter(function (m) {
                return m.key === METADATA_KEY.UNMANAGED_TAG;
            });
        });
        var unmanagedCount = [].concat.apply([], metadata).length;
        var dependencyCount = targets.length - unmanagedCount;
        if (dependencyCount > 0) {
            return dependencyCount;
        }
        else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
        }
    }
    else {
        return 0;
    }
}
exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
    };
}
//# sourceMappingURL=reflection_utils.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/request.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/request.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Request = void 0;
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Request = (function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
        this.id = id_1.id();
        this.serviceIdentifier = serviceIdentifier;
        this.parentContext = parentContext;
        this.parentRequest = parentRequest;
        this.target = target;
        this.childRequests = [];
        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
        this.requestScope = parentRequest === null
            ? new Map()
            : null;
    }
    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
        this.childRequests.push(child);
        return child;
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=request.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/planning/target.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/lib/planning/target.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Target = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var queryable_string_1 = __webpack_require__(/*! ./queryable_string */ "./node_modules/inversify/lib/planning/queryable_string.js");
var Target = (function () {
    function Target(type, name, serviceIdentifier, namedOrTagged) {
        this.id = id_1.id();
        this.type = type;
        this.serviceIdentifier = serviceIdentifier;
        this.name = new queryable_string_1.QueryableString(name || "");
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
        }
        else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
        }
        if (metadataItem !== null) {
            this.metadata.push(metadataItem);
        }
    }
    Target.prototype.hasTag = function (key) {
        for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.key === key) {
                return true;
            }
        }
        return false;
    };
    Target.prototype.isArray = function () {
        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
    };
    Target.prototype.matchesArray = function (name) {
        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
    };
    Target.prototype.isNamed = function () {
        return this.hasTag(METADATA_KEY.NAMED_TAG);
    };
    Target.prototype.isTagged = function () {
        return this.metadata.some(function (metadata) { return METADATA_KEY.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
    };
    Target.prototype.isOptional = function () {
        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
    };
    Target.prototype.getNamedTag = function () {
        if (this.isNamed()) {
            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
        }
        return null;
    };
    Target.prototype.getCustomTags = function () {
        if (this.isTagged()) {
            return this.metadata.filter(function (metadata) { return METADATA_KEY.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
        }
        else {
            return null;
        }
    };
    Target.prototype.matchesNamedTag = function (name) {
        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
    };
    Target.prototype.matchesTag = function (key) {
        var _this = this;
        return function (value) {
            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key && m.value === value) {
                    return true;
                }
            }
            return false;
        };
    };
    return Target;
}());
exports.Target = Target;
//# sourceMappingURL=target.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/resolution/instantiation.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/resolution/instantiation.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveInstance = void 0;
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function _injectProperties(instance, childRequests, resolveRequest) {
    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
        return (childRequest.target !== null &&
            childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
    });
    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
    propertyInjectionsRequests.forEach(function (r, index) {
        var propertyName = "";
        propertyName = r.target.name.value();
        var injection = propertyInjections[index];
        instance[propertyName] = injection;
    });
    return instance;
}
function _createInstance(Func, injections) {
    return new (Func.bind.apply(Func, __spreadArray([void 0], injections)))();
}
function _postConstruct(constr, result) {
    if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
        var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
        try {
            result[data.value]();
        }
        catch (e) {
            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
        }
    }
}
function resolveInstance(constr, childRequests, resolveRequest) {
    var result = null;
    if (childRequests.length > 0) {
        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
        });
        var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
        result = _createInstance(constr, constructorInjections);
        result = _injectProperties(result, childRequests, resolveRequest);
    }
    else {
        result = new constr();
    }
    _postConstruct(constr, result);
    return result;
}
exports.resolveInstance = resolveInstance;
//# sourceMappingURL=instantiation.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/resolution/resolver.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/resolution/resolver.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var instantiation_1 = __webpack_require__(/*! ./instantiation */ "./node_modules/inversify/lib/resolution/instantiation.js");
var invokeFactory = function (factoryType, serviceIdentifier, fn) {
    try {
        return fn();
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
        }
        else {
            throw error;
        }
    }
};
var _resolveRequest = function (requestScope) {
    return function (request) {
        request.parentContext.setCurrentRequest(request);
        var bindings = request.bindings;
        var childRequests = request.childRequests;
        var targetIsAnArray = request.target && request.target.isArray();
        var targetParentIsNotAnArray = !request.parentRequest ||
            !request.parentRequest.target ||
            !request.target ||
            !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
        if (targetIsAnArray && targetParentIsNotAnArray) {
            return childRequests.map(function (childRequest) {
                var _f = _resolveRequest(requestScope);
                return _f(childRequest);
            });
        }
        else {
            var result = null;
            if (request.target.isOptional() && bindings.length === 0) {
                return undefined;
            }
            var binding_1 = bindings[0];
            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
            if (isSingleton && binding_1.activated) {
                return binding_1.cache;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                requestScope.has(binding_1.id)) {
                return requestScope.get(binding_1.id);
            }
            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
                result = binding_1.cache;
                binding_1.activated = true;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
                result = binding_1.cache;
                binding_1.activated = true;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
                result = binding_1.implementationType;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
                result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
                result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
                result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
                result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
            }
            else {
                var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
            }
            if (typeof binding_1.onActivation === "function") {
                result = binding_1.onActivation(request.parentContext, result);
            }
            if (isSingleton) {
                binding_1.cache = result;
                binding_1.activated = true;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                !requestScope.has(binding_1.id)) {
                requestScope.set(binding_1.id, result);
            }
            return result;
        }
    };
};
function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}
exports.resolve = resolve;
//# sourceMappingURL=resolver.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_in_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_in_syntax.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingInSyntax = void 0;
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingInSyntax = (function () {
    function BindingInSyntax(binding) {
        this._binding = binding;
    }
    BindingInSyntax.prototype.inRequestScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inSingletonScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inTransientScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    return BindingInSyntax;
}());
exports.BindingInSyntax = BindingInSyntax;
//# sourceMappingURL=binding_in_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js":
/*!************************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingInWhenOnSyntax = void 0;
var binding_in_syntax_1 = __webpack_require__(/*! ./binding_in_syntax */ "./node_modules/inversify/lib/syntax/binding_in_syntax.js");
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingInWhenOnSyntax = (function () {
    function BindingInWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
    }
    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
        return this._bindingInSyntax.inRequestScope();
    };
    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
        return this._bindingInSyntax.inSingletonScope();
    };
    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
        return this._bindingInSyntax.inTransientScope();
    };
    BindingInWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingInWhenOnSyntax;
}());
exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;
//# sourceMappingURL=binding_in_when_on_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_on_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_on_syntax.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingOnSyntax = void 0;
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingOnSyntax = (function () {
    function BindingOnSyntax(binding) {
        this._binding = binding;
    }
    BindingOnSyntax.prototype.onActivation = function (handler) {
        this._binding.onActivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    };
    return BindingOnSyntax;
}());
exports.BindingOnSyntax = BindingOnSyntax;
//# sourceMappingURL=binding_on_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_to_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_to_syntax.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingToSyntax = void 0;
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var binding_in_when_on_syntax_1 = __webpack_require__(/*! ./binding_in_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingToSyntax = (function () {
    function BindingToSyntax(binding) {
        this._binding = binding;
    }
    BindingToSyntax.prototype.to = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
        this._binding.implementationType = constructor;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toSelf = function () {
        if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
        }
        var self = this._binding.serviceIdentifier;
        return this.to(self);
    };
    BindingToSyntax.prototype.toConstantValue = function (value) {
        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        this._binding.dynamicValue = null;
        this._binding.implementationType = null;
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toDynamicValue = function (func) {
        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
        this._binding.cache = null;
        this._binding.dynamicValue = func;
        this._binding.implementationType = null;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toConstructor = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
        this._binding.implementationType = constructor;
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFactory = function (factory) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = factory;
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFunction = function (func) {
        if (typeof func !== "function") {
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
        }
        var bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = literal_types_1.BindingTypeEnum.Function;
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return bindingWhenOnSyntax;
    };
    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            var autofactory = function () { return context.container.get(serviceIdentifier); };
            return autofactory;
        };
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toProvider = function (provider) {
        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
        this._binding.provider = provider;
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toService = function (service) {
        this.toDynamicValue(function (context) { return context.container.get(service); });
    };
    return BindingToSyntax;
}());
exports.BindingToSyntax = BindingToSyntax;
//# sourceMappingURL=binding_to_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js":
/*!*********************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_when_on_syntax.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingWhenOnSyntax = void 0;
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingWhenOnSyntax = (function () {
    function BindingWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    BindingWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingWhenOnSyntax;
}());
exports.BindingWhenOnSyntax = BindingWhenOnSyntax;
//# sourceMappingURL=binding_when_on_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_when_syntax.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_when_syntax.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingWhenSyntax = void 0;
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var constraint_helpers_1 = __webpack_require__(/*! ./constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
var BindingWhenSyntax = (function () {
    function BindingWhenSyntax(binding) {
        this._binding = binding;
    }
    BindingWhenSyntax.prototype.when = function (constraint) {
        this._binding.constraint = constraint;
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
        this._binding.constraint = function (request) {
            var targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    return BindingWhenSyntax;
}());
exports.BindingWhenSyntax = BindingWhenSyntax;
//# sourceMappingURL=binding_when_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/syntax/constraint_helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/constraint_helpers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = void 0;
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var traverseAncerstors = function (request, constraint) {
    var parent = request.parentRequest;
    if (parent !== null) {
        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    }
    else {
        return false;
    }
};
exports.traverseAncerstors = traverseAncerstors;
var taggedConstraint = function (key) { return function (value) {
    var constraint = function (request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new metadata_1.Metadata(key, value);
    return constraint;
}; };
exports.taggedConstraint = taggedConstraint;
var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
exports.namedConstraint = namedConstraint;
var typeConstraint = function (type) { return function (request) {
    var binding = null;
    if (request !== null) {
        binding = request.bindings[0];
        if (typeof type === "string") {
            var serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        }
        else {
            var constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    }
    return false;
}; };
exports.typeConstraint = typeConstraint;
//# sourceMappingURL=constraint_helpers.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/utils/binding_utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/binding_utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiBindToService = void 0;
var multiBindToService = function (container) {
    return function (service) {
        return function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.forEach(function (t) { return container.bind(t).toService(service); });
        };
    };
};
exports.multiBindToService = multiBindToService;
//# sourceMappingURL=binding_utils.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/utils/exceptions.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/exceptions.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isStackOverflowExeption = void 0;
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === ERROR_MSGS.STACK_OVERFLOW);
}
exports.isStackOverflowExeption = isStackOverflowExeption;
//# sourceMappingURL=exceptions.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/utils/id.js":
/*!************************************************!*\
  !*** ./node_modules/inversify/lib/utils/id.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.id = void 0;
var idCounter = 0;
function id() {
    return idCounter++;
}
exports.id = id;
//# sourceMappingURL=id.js.map

/***/ }),

/***/ "./node_modules/inversify/lib/utils/serialization.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/serialization.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.circularDependencyToException = exports.listMetadataForTarget = exports.listRegisteredBindingsForServiceIdentifier = exports.getServiceIdentifierAsString = exports.getFunctionName = void 0;
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier.name;
    }
    else if (typeof serviceIdentifier === "symbol") {
        return serviceIdentifier.toString();
    }
    else {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier;
    }
}
exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    var registeredBindingsList = "";
    var registeredBindings = getBindings(container, serviceIdentifier);
    if (registeredBindings.length !== 0) {
        registeredBindingsList = "\nRegistered bindings:";
        registeredBindings.forEach(function (binding) {
            var name = "Object";
            if (binding.implementationType !== null) {
                name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = registeredBindingsList + "\n " + name;
            if (binding.constraint.metaData) {
                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
            }
        });
    }
    return registeredBindingsList;
}
exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
function alreadyDependencyChain(request, serviceIdentifier) {
    if (request.parentRequest === null) {
        return false;
    }
    else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
        return true;
    }
    else {
        return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
    }
}
function dependencyChainToString(request) {
    function _createStringArr(req, result) {
        if (result === void 0) { result = []; }
        var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
        result.push(serviceIdentifier);
        if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
        }
        return result;
    }
    var stringArr = _createStringArr(request);
    return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
    request.childRequests.forEach(function (childRequest) {
        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            var services = dependencyChainToString(childRequest);
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
exports.circularDependencyToException = circularDependencyToException;
function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
        var m_1 = "";
        var namedTag = target.getNamedTag();
        var otherTags = target.getCustomTags();
        if (namedTag !== null) {
            m_1 += namedTag.toString() + "\n";
        }
        if (otherTags !== null) {
            otherTags.forEach(function (tag) {
                m_1 += tag.toString() + "\n";
            });
        }
        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
    }
    else {
        return " " + serviceIdentifierString;
    }
}
exports.listMetadataForTarget = listMetadataForTarget;
function getFunctionName(v) {
    if (v.name) {
        return v.name;
    }
    else {
        var name_1 = v.toString();
        var match = name_1.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : "Anonymous function: " + name_1;
    }
}
exports.getFunctionName = getFunctionName;
//# sourceMappingURL=serialization.js.map

/***/ }),

/***/ "./node_modules/json-stringify-safe/stringify.js":
/*!*******************************************************!*\
  !*** ./node_modules/json-stringify-safe/stringify.js ***!
  \*******************************************************/
/***/ ((module, exports) => {

exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}


/***/ }),

/***/ "./node_modules/reflect-metadata/Reflect.js":
/*!**************************************************!*\
  !*** ./node_modules/reflect-metadata/Reflect.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof __webpack_require__.g === "object" ? __webpack_require__.g :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));


/***/ }),

/***/ "./app/bg/modules/e-commerce-module/ECommerceModule.events.ts":
/*!********************************************************************!*\
  !*** ./app/bg/modules/e-commerce-module/ECommerceModule.events.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ECommerceModuleExternalEvents = exports.ECommerceModuleEvents = void 0;
var ECommerceModuleEvents;
(function (ECommerceModuleEvents) {
    ECommerceModuleEvents["PRICE_CHANGED"] = "E_COMMERCE_PRICE_CHANGED";
    ECommerceModuleEvents["MUTE_NOTIFICATION"] = "E_COMMERCE_MUTE_NOTIFICATION";
})(ECommerceModuleEvents = exports.ECommerceModuleEvents || (exports.ECommerceModuleEvents = {}));
var ECommerceModuleExternalEvents;
(function (ECommerceModuleExternalEvents) {
    ECommerceModuleExternalEvents["PRICE_CHANGED"] = "E_COMMERCE_PRICE_CHANGED";
})(ECommerceModuleExternalEvents = exports.ECommerceModuleExternalEvents || (exports.ECommerceModuleExternalEvents = {}));


/***/ }),

/***/ "./app/content/price-check-notification/PriceCheckIframeEvents.ts":
/*!************************************************************************!*\
  !*** ./app/content/price-check-notification/PriceCheckIframeEvents.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PriceCheckIframeEvents = void 0;
var PriceCheckIframeEvents;
(function (PriceCheckIframeEvents) {
    PriceCheckIframeEvents["OK"] = "E_COMMERCE_PRICE_OK_EVENT";
})(PriceCheckIframeEvents = exports.PriceCheckIframeEvents || (exports.PriceCheckIframeEvents = {}));


/***/ }),

/***/ "./app/content/price-check-notification/notification.ts":
/*!**************************************************************!*\
  !*** ./app/content/price-check-notification/notification.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationService = void 0;
const PriceCheckIframeEvents_1 = __webpack_require__(/*! ./PriceCheckIframeEvents */ "./app/content/price-check-notification/PriceCheckIframeEvents.ts");
const ECommerceModule_events_1 = __webpack_require__(/*! ../../bg/modules/e-commerce-module/ECommerceModule.events */ "./app/bg/modules/e-commerce-module/ECommerceModule.events.ts");
class NotificationService {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
        const _this = this;
        window.addEventListener('message', event => {
            if (event && event.data && event.data.message) {
                _this.onIframeMessage(event.data);
            }
        }, false);
        this.dispatcher.on(ECommerceModule_events_1.ECommerceModuleExternalEvents.PRICE_CHANGED, message => {
            this.showPriceCheckPopup();
        });
    }
    onIframeMessage(data) {
        switch (data.message) {
            case PriceCheckIframeEvents_1.PriceCheckIframeEvents.OK:
                this.hideUnsafePopup();
                break;
        }
    }
    showPriceCheckPopup() {
        if (this.getIframeElement()) {
            return;
        }
        this.injectIframeDynamic();
    }
    hideUnsafePopup() {
        const element = this.getIframeElement();
        if (element) {
            element.remove();
        }
    }
    injectIframeDynamic() {
        const iFrame = document.createElement('iframe');
        iFrame.style.width = '570px';
        iFrame.style.height = '250px';
        iFrame.style.position = 'fixed';
        iFrame.style.top = '16px';
        iFrame.style.right = '16px';
        iFrame.style.zIndex = '9999999999';
        iFrame.style.borderRadius = '8px';
        iFrame.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.3)';
        iFrame.style.backgroundColor = '#ffffff';
        iFrame.style.border = 'solid 1px #d7d7d7';
        iFrame.src = chrome.extension.getURL('content/price-check-notification/notification-iframe/index.html');
        iFrame.id = 'price_check_notification_iframe';
        document.body.prepend(iFrame);
    }
    getIframeElement() {
        return document.getElementById('price_check_notification_iframe');
    }
}
exports.NotificationService = NotificationService;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*********************************************************!*\
  !*** ./app/content/price-check-notification/content.ts ***!
  \*********************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const notification_1 = __webpack_require__(/*! ./notification */ "./app/content/price-check-notification/notification.ts");
const src_1 = __webpack_require__(/*! @urbandevs/mario-core/dist/src */ "./node_modules/@urbandevs/mario-core/dist/src/index.js");
const dispatcherService = new src_1.ContentDispatcherService();
new notification_1.NotificationService(dispatcherService);

})();

/******/ })()
;
//# sourceMappingURL=content.js.map