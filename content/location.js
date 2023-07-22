/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./node_modules/@urbandevs/mario-hide-my-geo-location/dist/HideMyLocation.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-hide-my-geo-location/dist/HideMyLocation.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HideMyLocation = void 0;
class HideMyLocation {
    constructor(clientKey) {
        this.clientKey = clientKey;
        this.watchIDs = {};
        this.client = window[Symbol.for(clientKey)];
        const getCurrentPosition = navigator.geolocation.getCurrentPosition;
        const watchPosition = navigator.geolocation.watchPosition;
        const clearWatch = navigator.geolocation.clearWatch;
        const self = this;
        navigator.geolocation.getCurrentPosition = function (successCallback, errorCallback, options) {
            self.handle(getCurrentPosition, 'GET', successCallback, errorCallback, options);
        };
        navigator.geolocation.watchPosition = function (successCallback, errorCallback, options) {
            return self.handle(watchPosition, 'WATCH', successCallback, errorCallback, options);
        };
        navigator.geolocation.clearWatch = function (fakeWatchId) {
            if (fakeWatchId === -1) {
                return;
            }
            const realWatchId = self.watchIDs[fakeWatchId];
            delete self.watchIDs[fakeWatchId];
            return clearWatch.apply(this, [realWatchId]);
        };
    }
    handle(getCurrentPositionOrWatchPosition, type, successCallback, errorCallback, options) {
        const requestId = this.client.emitToBg('HIDE_MY_LOCATION__GET_LOCATION');
        let fakeWatchId = this.getRandomInt(0, 100000);
        this.client.fromBgResponse(requestId, (response) => {
            if (response.enabled) {
                if (response.status === 'SUCCESS') {
                    const position = this.map(response);
                    successCallback(position);
                }
                else {
                    const error = this.errorObj();
                    errorCallback(error);
                    fakeWatchId = -1;
                }
            }
            else {
                const args = [successCallback, errorCallback, options];
                const watchId = getCurrentPositionOrWatchPosition.apply(navigator.geolocation, args);
                if (type === 'WATCH') {
                    this.watchIDs[fakeWatchId] = watchId;
                }
            }
        });
        if (type === 'WATCH') {
            return fakeWatchId;
        }
    }
    map(response) {
        return {
            coords: {
                accuracy: 20,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: response.latitude,
                longitude: response.longitude,
                speed: null,
            },
            timestamp: Date.now(),
        };
    }
    errorObj() {
        return {
            code: 1,
            message: 'User denied Geolocation',
        };
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.HideMyLocation = HideMyLocation;


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
/*!************************************************************************!*\
  !*** ./node_modules/@urbandevs/mario-hide-my-geo-location/dist/Use.js ***!
  \************************************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostHelper_1 = __webpack_require__(/*! @urbandevs/mario-core/dist/src/Packages/WindowPost/PostHelper */ "./node_modules/@urbandevs/mario-core/dist/src/Packages/WindowPost/PostHelper.js");
const HideMyLocation_1 = __webpack_require__(/*! ./HideMyLocation */ "./node_modules/@urbandevs/mario-hide-my-geo-location/dist/HideMyLocation.js");
if (document.contentType === 'text/html') {
    const script = document.createElement('script');
    const clientName = PostHelper_1.PostHelper.clientName();
    script.innerHTML = `
    const hideMyLocation = new (${HideMyLocation_1.HideMyLocation.toString()})('${clientName}')
  `;
    script.async = false;
    document.documentElement.appendChild(script);
}

})();

/******/ })()
;
//# sourceMappingURL=location.js.map