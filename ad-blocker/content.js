/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = /*#__PURE__*/function () {
  function PosdConfig() {
    _classCallCheck(this, PosdConfig);
  }

  _createClass(PosdConfig, null, [{
    key: "CONFIG_PANELOS_VERSION",
    get: function get() {
      return '1.9.10';
    }
  }, {
    key: "CONFIG_PINSTANCE_ID",
    get: function get() {
      return 1;
    }
  }, {
    key: "CONFIG_PARTNER_ID",
    get: function get() {
      return 5;
    }
  }, {
    key: "CONFIG_DISTRIBUTOR_ID",
    get: function get() {
      return 5;
    }
  }, {
    key: "CONFIG_PANELBACKEND_ENDPOINT",
    get: function get() {
      return 'https://analytics-toolbar.urban-vpn.com:40443';
    }
  }, {
    key: "CONFIG_PANELBACKEND_ENDPOINT_ULR_OUTTICKET",
    get: function get() {
      return '/tickets';
    }
  }, {
    key: "CONFIG_PANELBACKEND_ENDPOINT_ULR_INSTALL_EVENT",
    get: function get() {
      return '/install';
    }
  }, {
    key: "CONFIG_PANELBACKEND_ENDPOINT_ULR_CONFIGURATION",
    get: function get() {
      return "/configuration?pv=".concat(this.CONFIG_PANELOS_VERSION);
    }
  }, {
    key: "CONFIG_GLOBAL_ACTIVE_STATUS",
    get: function get() {
      return false;
    }
  }, {
    key: "CONFIG_USE_COMPRESSION",
    get: function get() {
      return true;
    }
  }, {
    key: "CONFIG_MARK_AD_CANDIDATES",
    get: function get() {
      return false;
    }
  }, {
    key: "CONFIG_MARK_PROCESSED_AD_CANDIDATES",
    get: function get() {
      return false;
    }
  }, {
    key: "CONFIG_ADBLOCKER_AVAILABLE",
    get: function get() {
      return true;
    }
  }, {
    key: "CONFIG_TARGET_URL_BY_CLICK_AVAILABLE",
    get: function get() {
      return true;
    }
  }, {
    key: "CONFIG_ANALYTIC_INSTALL_EVENTS_TRACING_AVAILABLE",
    get: function get() {
      return true;
    }
  }, {
    key: "CONFIG_ADBLOCK_INSPECTOR_AVAILABLE",
    get: function get() {
      return true;
    }
  }, {
    key: "CONFIG_UTILITY_HOST",
    get: function get() {
      return 'https://authentication.urban-vpn.com';
    }
  }]);

  return PosdConfig;
}();

module.exports = PosdConfig;

/***/ }),

/***/ "./src/content/AdBlockInspectorAgent.js":
/*!**********************************************!*\
  !*** ./src/content/AdBlockInspectorAgent.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdAdBlockInspectorAgent = /*#__PURE__*/function () {
  function PosdAdBlockInspectorAgent(id) {
    _classCallCheck(this, PosdAdBlockInspectorAgent);

    this.id = id;
    this.init = false;
    this.InspectorConfig = null;
  }

  _createClass(PosdAdBlockInspectorAgent, [{
    key: "Init",
    value: function Init(InspectorConfig) {
      this.InspectorConfig = InspectorConfig;

      if (!this.init && this.InspectorConfig && this.InspectorConfig.active) {
        this.init = true;
        setTimeout(this.CheckForActiveAdblocker.bind(this), this.GetAgentActivationTimeout() * 1000);
      }

      return this.init;
    }
  }, {
    key: "CheckForActiveAdblocker",
    value: function CheckForActiveAdblocker() {
      if (document.readyState === PosdConst.DOCUMENT_READYSTATE_LOADING) {
        document.addEventListener('DOMContentLoaded', this.CheckAdblockerActivityStatus.bind(this));
      } else if (document.readyState === PosdConst.DOCUMENT_READYSTATE_INTERACTIVE || document.readyState === PosdConst.DOCUMENT_READYSTATE_COMPLETE) {
        this.CheckAdblockerActivityStatus();
      }
    }
  }, {
    key: "CheckAdblockerActivityStatus",
    value: function CheckAdblockerActivityStatus() {
      var _this = this;

      var testAd = this.CreateDumpAdElement();
      setTimeout(function () {
        var report = {};
        report.hasActiveAdblock = _this.IsElementHidden(testAd);
        testAd.remove();
        PosdContentIOManager.SendAdBlockInspectorAgentReport(_this.id, report, null);
      }, this.GetAdblockerAdRemovingTimeout() * 1000);
    }
  }, {
    key: "IsElementHidden",
    value: function IsElementHidden(testAd) {
      return testAd.offsetHeight === 0;
    }
  }, {
    key: "CreateDumpAdElement",
    value: function CreateDumpAdElement() {
      var testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = this.GetAdblockerDetectionClassName();
      document.body.appendChild(testAd);
      return testAd;
    }
  }, {
    key: "GetAdblockerDetectionClassName",
    value: function GetAdblockerDetectionClassName() {
      return this.init && this.InspectorConfig && this.InspectorConfig.detectionClassName;
    }
  }, {
    key: "GetAgentActivationTimeout",
    value: function GetAgentActivationTimeout() {
      return this.init && this.InspectorConfig && this.InspectorConfig.agentActivationTimeoutSec;
    }
  }, {
    key: "GetAdblockerAdRemovingTimeout",
    value: function GetAdblockerAdRemovingTimeout() {
      return this.init && this.InspectorConfig && this.InspectorConfig.adRemovingTimeoutSec;
    }
  }]);

  return PosdAdBlockInspectorAgent;
}();

module.exports = PosdAdBlockInspectorAgent;

/***/ }),

/***/ "./src/content/AdBlockerAgent.js":
/*!***************************************!*\
  !*** ./src/content/AdBlockerAgent.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdAdBlockerAgent = /*#__PURE__*/function () {
  function PosdAdBlockerAgent(id, IOManager) {
    _classCallCheck(this, PosdAdBlockerAgent);

    this.id = id;
    this.IOManager = IOManager;
    this.init = false;
    this.tabId = null;
    this.status = PosdCommon.GetDefaultAdblockerStatus();
    this.excludeList = {
      domains: [],
      pages: []
    };

    if (this.IOManager) {
      this.IOManager.onAdBlockerStatusChanged = this.onAdBlockerStatusChanged.bind(this);
    }
  }

  _createClass(PosdAdBlockerAgent, [{
    key: "GetStatus",
    value: function GetStatus() {
      return this.status;
    }
  }, {
    key: "Init",
    value: function Init(abBlockerStatus, excludeList, tabId) {
      if (!this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE) {
        this.tabId = tabId;
        this.status = abBlockerStatus;
        this.excludeList = excludeList;
        this.init = true;
      }

      return this.init;
    }
  }, {
    key: "onAdBlockerStatusChanged",
    value: function onAdBlockerStatusChanged(status) {
      this.status = status;
    }
  }, {
    key: "SetHiddenAmount",
    value: function SetHiddenAmount(hiddenAmount) {
      if (hiddenAmount > 0) {
        PosdContentIOManager.SendHiddenAdCandidatesAmount(this.id, hiddenAmount);
      }
    }
  }, {
    key: "IsEnabled",
    value: function IsEnabled() {
      return this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.status[PosdConst.ADBLOCKER_FOR_DISPLAY] === PosdConst.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded();
    }
  }, {
    key: "IsEnabledForFacebook",
    value: function IsEnabledForFacebook() {
      return this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.status[PosdConst.ADBLOCKER_FOR_FACEBOOK] === PosdConst.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded();
    }
  }, {
    key: "IsEnabledForTwitter",
    value: function IsEnabledForTwitter() {
      return this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.status[PosdConst.ADBLOCKER_FOR_TWITTER] === PosdConst.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded();
    }
  }, {
    key: "IsEnabledForReddit",
    value: function IsEnabledForReddit() {
      return this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.status[PosdConst.ADBLOCKER_FOR_REDDIT] === PosdConst.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded();
    }
  }, {
    key: "GetCurrentDomain",
    value: function GetCurrentDomain() {
      return window.location.origin;
    }
  }, {
    key: "GetCurrentPageUrl",
    value: function GetCurrentPageUrl() {
      return window.location.href;
    }
  }, {
    key: "IsExcluded",
    value: function IsExcluded() {
      return this.IsExcludedByDomainRule() || this.IsExcludedByPageRule();
    }
  }, {
    key: "IsNotExcluded",
    value: function IsNotExcluded() {
      return !this.IsExcluded();
    }
  }, {
    key: "IsExcludedByDomainRule",
    value: function IsExcludedByDomainRule() {
      return this.excludeList.domains.indexOf(this.GetCurrentDomain()) !== -1;
    }
  }, {
    key: "IsExcludedByPageRule",
    value: function IsExcludedByPageRule() {
      return this.excludeList.pages.indexOf(this.GetCurrentPageUrl()) !== -1;
    }
  }]);

  return PosdAdBlockerAgent;
}();

module.exports = PosdAdBlockerAgent;

/***/ }),

/***/ "./src/content/AdsCandidates.js":
/*!**************************************!*\
  !*** ./src/content/AdsCandidates.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var StylesMinimizer = __webpack_require__(/*! ../libs/StylesMinimizer */ "./src/libs/StylesMinimizer.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdAdsCandidates = /*#__PURE__*/function (_StylesMinimizer) {
  _inherits(PosdAdsCandidates, _StylesMinimizer);

  function PosdAdsCandidates(id) {
    var _this;

    _classCallCheck(this, PosdAdsCandidates);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdAdsCandidates).call(this));
    _this.id = id;
    _this.active = false;
    _this.candidates = [];
    _this.hiddenAmount = 0;
    _this.pageUrl = "";
    _this.ticketId = "";
    _this.onPageRefreshed = null;
    return _this;
  }

  _createClass(PosdAdsCandidates, [{
    key: "Activated",
    value: function Activated() {
      this.active = true;
    }
  }, {
    key: "CandidateHidden",
    value: function CandidateHidden() {
      this.hiddenAmount = this.hiddenAmount + 1;
    }
  }, {
    key: "ClearHiddenCounter",
    value: function ClearHiddenCounter() {
      this.hiddenAmount = 0;
    }
  }, {
    key: "ClearCandidates",
    value: function ClearCandidates() {
      this.candidates = [];
    }
  }, {
    key: "AddCandidate",
    value: function AddCandidate(candidat) {
      this.candidates.push(candidat);
    }
  }, {
    key: "PageRefreshed",
    value: function PageRefreshed(pageUrl, ticketId) {
      this.pageUrl = pageUrl;
      this.ticketId = ticketId;

      if (this.onPageRefreshed) {
        this.onPageRefreshed(pageUrl, ticketId);
      }
    }
  }, {
    key: "getSponsorTwitterScreenName",
    value: function getSponsorTwitterScreenName(ad) {
      var sponsorPageRelativeUrl = this.getSponsorPageRelativeUrl(ad);
      var startIndex = sponsorPageRelativeUrl.lastIndexOf("/") + 1;
      var screenName = sponsorPageRelativeUrl.substring(startIndex);
      return screenName;
    }
  }, {
    key: "getSponsorRedditScreenName",
    value: function getSponsorRedditScreenName(ad) {
      var sponsorPageRelativeUrl = this.getSponsorScreenNameReddit(ad);
      var screenName = sponsorPageRelativeUrl ? sponsorPageRelativeUrl.replace(/^.*\/user\//gi, '').replace(/\/.*/gi, '') : '';
      return screenName;
    }
  }, {
    key: "getSponsorPageRelativeUrl",
    value: function getSponsorPageRelativeUrl(ad) {
      var href = "";
      var elms = ad.querySelectorAll('a');

      if (elms.length) {
        href = elms[0].getAttribute("href");
        var hrefX = elms[0].getBoundingClientRect().x;
        elms.forEach(function (el) {
          if (el.getBoundingClientRect().x < hrefX) {
            href = el.getAttribute("href");
            hrefX = el.getBoundingClientRect().x;
          }
        });
      }

      return href;
    }
  }, {
    key: "getSponsorScreenNameReddit",
    value: function getSponsorScreenNameReddit(cell) {
      var result;
      var els = Array.from(cell.querySelectorAll('a[href]'));

      for (var _i = 0, _els = els; _i < _els.length; _i++) {
        var el = _els[_i];
        var reg = new RegExp(/^\/user\/.*\//),
            href = el.getAttribute('href');

        if (href && reg.test(href)) {
          result = href.replace(/\/user\//, '').replace(/\/.*/, '');
          break;
        }
      }

      return result;
    }
  }, {
    key: "getStylesFromHeadTags",
    value: function getStylesFromHeadTags() {
      return Array.from(document.querySelector('head').querySelectorAll('style'));
    }
  }, {
    key: "getAdTwitterObject",
    value: function getAdTwitterObject(cell, adPlacementType) {
      var size = PosdCommon.SetFullSizeToElement(cell);
      return {
        content: PosdBase64.encode(cell.outerHTML),
        screenName: this.getSponsorTwitterScreenName(cell),
        stylesByElementBisId: this.getStylesByElementsBisId(cell),
        adPlacementType: adPlacementType,
        size: size,
        userDataByScreenName: ""
      };
    }
  }, {
    key: "getAdRedditObject",
    value: function getAdRedditObject(cell, dom, adPlacementType) {
      var size = PosdCommon.SetFullSizeToElement(cell);
      return {
        content: PosdBase64.encode(dom.outerHTML),
        screenName: this.getSponsorRedditScreenName(cell),
        adPlacementType: adPlacementType,
        targetUrl: '',
        size: size
      };
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(adCells) {
      return typeof adCells == 'undefined' || adCells.length === 0;
    }
  }, {
    key: "getElementId",
    value: function getElementId() {
      return this.elementId++;
    }
  }, {
    key: "CandidatesCount",
    get: function get() {
      return this.candidates.length;
    }
  }, {
    key: "Candidates",
    get: function get() {
      return this.candidates;
    }
  }, {
    key: "HiddenAmount",
    get: function get() {
      return this.hiddenAmount;
    }
  }, {
    key: "PageUrl",
    get: function get() {
      return this.pageUrl;
    }
  }, {
    key: "TicketId",
    get: function get() {
      return this.ticketId;
    }
  }, {
    key: "IsActive",
    get: function get() {
      return this.active;
    }
  }, {
    key: "Context",
    get: function get() {
      return this;
    }
  }]);

  return PosdAdsCandidates;
}(StylesMinimizer);

module.exports = PosdAdsCandidates;

/***/ }),

/***/ "./src/content/AdsManager.js":
/*!***********************************!*\
  !*** ./src/content/AdsManager.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdSkinAds = __webpack_require__(/*! ./SkinAds */ "./src/content/SkinAds.js");

var PosdBannerAds = __webpack_require__(/*! ./BannerAds */ "./src/content/BannerAds.js");

var PosdHTML5Ads = __webpack_require__(/*! ./HTML5Ads */ "./src/content/HTML5Ads.js");

var PosdVideoAds = __webpack_require__(/*! ./VideoAds */ "./src/content/VideoAds.js");

var PosdFacebookAds = __webpack_require__(/*! ./detectors/Facebook/FacebookAds */ "./src/content/detectors/Facebook/FacebookAds.js");

var PosdTwitterAds = __webpack_require__(/*! ./detectors/Twitter/TwitterAds */ "./src/content/detectors/Twitter/TwitterAds.js");

var PosdRedditAds = __webpack_require__(/*! ./detectors/Reddit/RedditAds */ "./src/content/detectors/Reddit/RedditAds.js");

var PosdAdsManager = /*#__PURE__*/function () {
  function PosdAdsManager(id, Config, IOManager, AdBlockerAgent) {
    _classCallCheck(this, PosdAdsManager);

    this.id = id;
    this.Config = Config;
    this.AdBlockerAgent = AdBlockerAgent;
    this.IOManager = IOManager;
    this.PageUrl = document.location.href;
    this.FacebookAds = null;
    this.TwitterAds = null;
    this.RedditAds = null;
    this.SkinAds = null;
    this.HTML5Ads = null;
    this.VideoAds = null; // global black list

    this.IsBlacklistedPublisher = PosdCommon.IsPublisherInBlacklist(this.PageUrl, this.Config.GetBlacklistPublishers());

    switch (true) {
      case PosdCommon.IsFacebookUrl(this.PageUrl):
        this.FacebookAds = new PosdFacebookAds(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
        break;

      case PosdCommon.IsTwitterUrl(this.PageUrl):
        this.TwitterAds = new PosdTwitterAds(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
        break;

      case PosdCommon.IsRedditUrl(this.PageUrl):
        this.RedditAds = new PosdRedditAds(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
        break;

      case PosdCommon.IsTiktokUrl(this.PageUrl):
        this.VideoAds = new PosdVideoAds(this.id, this.Config, this.IOManager, !this.IsBlacklistedPublisher);
        break;

      default:
        this.SkinAds = new PosdSkinAds(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
        this.BannerAds = new PosdBannerAds(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
        this.HTML5Ads = new PosdHTML5Ads(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
        this.VideoAds = new PosdVideoAds(this.id, this.Config, this.IOManager, !this.IsBlacklistedPublisher);
    } // if (PosdCommon.IsFacebookUrl(this.PageUrl)) {
    //     console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] (AdsManager): activating facebook detector`);
    //     this.FacebookAds = new PosdFacebookAds(id, this.Config, this.IOManager, this.AdBlockerAgent);
    // } else if (PosdCommon.IsTwitterUrl(this.PageUrl)) {
    //     console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] (AdsManager): activating twitter detector`);
    //     this.TwitterAds = new PosdTwitterAds(id, this.Config, this.IOManager, this.AdBlockerAgent);             
    // } else {
    //     this.SkinAds = new PosdSkinAds(id, this.Config, this.IOManager, this.AdBlockerAgent);
    //     this.BannerAds = new PosdBannerAds(id, this.Config, this.IOManager, this.AdBlockerAgent);
    //     this.HTML5Ads = new PosdHTML5Ads(id, this.Config, this.IOManager, this.AdBlockerAgent);
    //     this.VideoAds = new PosdVideoAds(id, this.Config, this.IOManager, !this.IsBlacklistedPublisher);
    // }            

  }

  _createClass(PosdAdsManager, [{
    key: "ActivateAdsdetectors",
    value: function ActivateAdsdetectors() {
      if (this.TwitterAds) {
        this.TwitterAds.ActivateVideoTrafficDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
      }

      if (this.RedditAds) {
        this.RedditAds.ActivateTrafficDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
      }

      if (document.readyState === PosdConst.DOCUMENT_READYSTATE_LOADING) {
        document.addEventListener('DOMContentLoaded', this.StartAdsdetectors.bind(this));
      } else if (document.readyState === PosdConst.DOCUMENT_READYSTATE_INTERACTIVE || document.readyState === PosdConst.DOCUMENT_READYSTATE_COMPLETE) {
        this.StartAdsdetectors();
      }
    }
  }, {
    key: "StartAdsdetectors",
    value: function StartAdsdetectors() {
      if (!this.IsBlacklistedPublisher) {
        // here add my logic
        if (this.SkinAds) {
          this.SkinAds.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }

        if (this.BannerAds) {
          this.BannerAds.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }

        if (this.HTML5Ads) {
          this.HTML5Ads.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }

        if (this.VideoAds) {
          this.VideoAds.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }

        if (this.FacebookAds) {
          this.FacebookAds.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }

        if (this.TwitterAds) {
          this.TwitterAds.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }

        if (this.RedditAds) {
          this.RedditAds.ActivateDetector(PosdConst.ACTIVATION_BY_ADS_MANAGER);
        }
      } else {}
    }
  }, {
    key: "PageRefreshed",
    value: function PageRefreshed(pageUrl, ticketId) {
      if (this.SkinAds) {
        this.SkinAds.PageRefreshed(pageUrl, ticketId);
      }

      if (this.BannerAds) {
        this.BannerAds.PageRefreshed(pageUrl, ticketId);
      }

      if (this.HTML5Ads) {
        this.HTML5Ads.PageRefreshed(pageUrl, ticketId);
      }

      if (this.VideoAds) {
        this.VideoAds.PageRefreshed(pageUrl, ticketId);
      }

      if (this.FacebookAds) {
        this.FacebookAds.PageRefreshed(pageUrl, ticketId);
      }

      if (this.TwitterAds) {
        this.TwitterAds.PageRefreshed(pageUrl, ticketId);
      }

      if (this.RedditAds) {
        this.RedditAds.PageRefreshed(pageUrl, ticketId);
      }
    }
  }, {
    key: "GetHtml5CandidatesPrebildInfo",
    value: function GetHtml5CandidatesPrebildInfo() {
      if (this.HTML5Ads && this.HTML5Ads.IsActive) {
        return this.HTML5Ads.GetPrebuildInfo();
      }

      return [];
    }
  }]);

  return PosdAdsManager;
}();

module.exports = PosdAdsManager;

/***/ }),

/***/ "./src/content/AtrMessageListener.js":
/*!*******************************************!*\
  !*** ./src/content/AtrMessageListener.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdAtrMessageListener = /*#__PURE__*/function () {
  function PosdAtrMessageListener(id, onGotWindowMessageCallback) {
    _classCallCheck(this, PosdAtrMessageListener);

    this.id = id;
    this.onGotWindowMessageCallback = onGotWindowMessageCallback;
    this.mesToFrameDeactivationIntervalId = null;
  }

  _createClass(PosdAtrMessageListener, [{
    key: "SetId",
    value: function SetId(id) {
      this.id = id;
    }
  }, {
    key: "ActivateMesToFrameContentListener",
    value: function ActivateMesToFrameContentListener(expectedMesTypeRespond) {
      if (!this.mesToFrameDeactivationIntervalId) {
        this.mesToFrameDeactivationIntervalId = setInterval(this.CheckMesToFrameContent.bind(this), 300);
        setTimeout(this.DeactivateMesToFrameContentListener.bind(this), 3000);
      } else {}
    }
  }, {
    key: "CheckMesToFrameContent",
    value: function CheckMesToFrameContent() {
      try {
        var mesToFrameContent = document.body.getAttribute('bis_mes_to_fr');

        if (mesToFrameContent && mesToFrameContent) {
          var mes = JSON.parse(mesToFrameContent);
          document.body.setAttribute('bis_mes_to_fr', '');

          if (PosdMessage.IsValid(mes) && this.onGotWindowMessageCallback) {
            this.onGotWindowMessageCallback(mes);
          }

          this.DeactivateMesToFrameContentListener();
        }
      } catch (e) {}
    }
  }, {
    key: "DeactivateMesToFrameContentListener",
    value: function DeactivateMesToFrameContentListener() {
      if (this.mesToFrameDeactivationIntervalId) {
        clearInterval(this.mesToFrameDeactivationIntervalId);
        this.mesToFrameDeactivationIntervalId = null;
      }
    }
  }]);

  return PosdAtrMessageListener;
}();

module.exports = PosdAtrMessageListener;

/***/ }),

/***/ "./src/content/BannerAds.js":
/*!**********************************!*\
  !*** ./src/content/BannerAds.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdAdsCandidates = __webpack_require__(/*! ./AdsCandidates */ "./src/content/AdsCandidates.js");

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdBannerAds = /*#__PURE__*/function (_PosdAdsCandidates) {
  _inherits(PosdBannerAds, _PosdAdsCandidates);

  function PosdBannerAds(id, Config, IOManager, AdBlockerAgent) {
    var _this;

    _classCallCheck(this, PosdBannerAds);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdBannerAds).call(this, id));
    _this.Config = Config;
    _this.bannerAdsConfig = _this.Config.BannerAdsConfig;
    _this.IOManager = IOManager;
    _this.IOManager.onGotBannerCandidatesExtractionStatusesCallback = _this.onGoBannerCandidatesExtractionStatuses.bind(_assertThisInitialized(_this));
    _this.AdBlockerAgent = AdBlockerAgent;
    return _this;
  }

  _createClass(PosdBannerAds, [{
    key: "ActivateDetector",
    value: function ActivateDetector() {
      var _this2 = this;

      this.DetectCandidates();
      setTimeout(function () {
        _this2.DetectCandidates();
      }, 350);
      setInterval(function () {
        _this2.DetectCandidates();
      }, 700);
    }
  }, {
    key: "PushCandidate",
    value: function PushCandidate(candidatHtml, bisId) {
      var candidate = {
        bisId: bisId,
        content: PosdBase64.encode(candidatHtml)
      };
      this.AddCandidate(candidate);
    }
  }, {
    key: "IsValidCandidateSize",
    value: function IsValidCandidateSize(rectData) {
      if (rectData && rectData.width > 70 && rectData.height > 40 && rectData.height < 1100) {
        return true;
      }

      return false;
    }
  }, {
    key: "HideCandidate",
    value: function HideCandidate(el) {
      if (el && this.AdBlockerAgent.IsEnabled()) {
        PosdCommon.HideElement(el);
        this.CandidateHidden();
      }
    }
  }, {
    key: "SetBorderToCandidate",
    value: function SetBorderToCandidate(el) {
      if (el && PosdConfig.CONFIG_MARK_AD_CANDIDATES && !this.AdBlockerAgent.IsEnabled()) {
        if (PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
          el.style.cssText += 'border: 6px solid blueviolet !important;';
        } else {
          el.style.cssText += 'border: 6px solid red !important;';
        }
      }
    }
  }, {
    key: "SendCandidatesToBackground",
    value: function SendCandidatesToBackground() {
      if (this.Candidates.length) {
        if (this.AdBlockerAgent.IsEnabled()) {
          this.AdBlockerAgent.SetHiddenAmount(this.HiddenAmount);
        }

        PosdContentIOManager.SendBannersCandidates(this.id, this.Candidates, null);
      }
    }
  }, {
    key: "DetectCandidates",
    value: function DetectCandidates() {
      if (this.AdBlockerAgent.IsEnabled()) {
        this.ClearHiddenCounter();
      }

      this.ClearCandidates();
      var fullImgCollection = PosdCommon.QuerySelectorAll(document, this.bannerAdsConfig.QUERIES.FULL_IMG_COLLECTION);

      for (var i = 0; i < fullImgCollection.length; i++) {
        var img = fullImgCollection[i];

        if (!img) {
          continue;
        }

        var imgSrc = img.src.toLowerCase();
        var a = this.getTagWithHref(img);

        if (!a) {
          continue;
        }

        var aHref = a.href.toLowerCase();
        var isCandidate = false;

        if (this.filterNonAdBanner(img)) {
          continue;
        }

        if (!PosdCommon.IsInFilterList(this.Config.GetBlacklistBannerHref(), aHref) && !PosdCommon.IsInFilterList(this.Config.GetBlacklistBannerImgSrc(), imgSrc) && !img.hasAttribute('bis_skin_element')) {
          if (PosdCommon.isValidUrl(imgSrc) && PosdCommon.isValidUrl(aHref) && !PosdCommon.IsUrlFromHost(document.location.host, aHref)) {
            isCandidate = true;
          } else if (PosdCommon.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), imgSrc) || PosdCommon.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), aHref)) {
            isCandidate = true;
          }
        }

        if (isCandidate) {
          var rectData = img.getBoundingClientRect();

          if (this.IsValidCandidateSize(rectData)) {
            this.SetBorderToCandidate(img);
            PosdCommon.SetFullSizeToElement(img);
            PosdCommon.SetFullSizeToElement(a);
            var bisId = PosdCommon.GenerateAndSetBisIdToBanner(img);
            this.PushCandidate(a.outerHTML, bisId);
            this.HideCandidate(img);
          }
        }
      }

      var imgCollection = PosdCommon.QuerySelectorAll(document, this.bannerAdsConfig.QUERIES.ON_EVENT_IMG_COLLECTION);

      for (var _i = 0; _i < imgCollection.length; _i++) {
        var _img = imgCollection[_i];

        var _imgSrc = _img.src.toLowerCase();

        if (!PosdCommon.IsInFilterList(this.Config.GetBlacklistBannerImgSrc(), _imgSrc)) {
          if (PosdCommon.isValidUrl(_imgSrc) && !PosdCommon.IsUrlFromHost(document.location.host, _imgSrc) || PosdCommon.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), _imgSrc)) {
            var _rectData = _img.getBoundingClientRect();

            if (this.IsValidCandidateSize(_rectData)) {
              this.SetBorderToCandidate(_img);
              PosdCommon.SetFullSizeToElement(_img);

              var _bisId = PosdCommon.GenerateAndSetBisIdToBanner(_img);

              this.PushCandidate(_img.outerHTML, _bisId);
              this.HideCandidate(_img);
            }
          }
        }
      }

      this.SendCandidatesToBackground();
    }
  }, {
    key: "filterNonAdBanner",
    value: function filterNonAdBanner(banner) {
      var host = window.location.host || '__NULL__',
          bannerSrc = banner.src.toLowerCase(),
          bannerSrcHost = bannerSrc.match(/\/\/(www\.)?[A-Za-z0-9.]+/),
          parentA = this.getTagWithHref(banner),
          parentHref = parentA ? parentA.href.match(/\/\/(www\.)?[A-Za-z0-9.]+/) : '';
      headOuterHTML = document.querySelector('head').outerHTML;
      parentHref = parentHref ? parentHref[0].replace('//', '') : '';
      bannerSrcHost = bannerSrcHost ? bannerSrcHost[0].replace('//', '') : '__NULL__';
      host = host.indexOf('www') === 0 ? host.replace('www', '') : host;
      return parentHref.includes(host) || headOuterHTML.includes(parentHref) || bannerSrc.includes(host) && parentHref.includes(host) || bannerSrc.search(/^data/) !== -1;
    }
  }, {
    key: "onGoBannerCandidatesExtractionStatuses",
    value: function onGoBannerCandidatesExtractionStatuses(statuses) {
      if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES && statuses && statuses.length && !this.AdBlockerAgent.IsEnabled()) {
        for (var i = 0; i < statuses.length; i++) {
          var banner = PosdCommon.QuerySelector(document, "*[bis_id=\"".concat(statuses[i].bannerId, "\"]"));

          if (banner) {
            PosdCommon.UpdateCandidateStatusBorderColor(banner, statuses[i].extractionStatus);
          }
        }
      }
    }
  }, {
    key: "getTagWithHref",
    value: function getTagWithHref(banner) {
      var deepLevel = 5;
      var parent = banner.parentElement;

      for (var i = 0; i < deepLevel; i++) {
        if (parent.tagName === 'A') {
          break;
        }

        parent = parent.parentElement;
      }

      if (parent.tagName !== 'A') {
        parent = null;
      }

      return parent;
    }
  }]);

  return PosdBannerAds;
}(PosdAdsCandidates);

module.exports = PosdBannerAds;

/***/ }),

/***/ "./src/content/ConfigAgent.js":
/*!************************************!*\
  !*** ./src/content/ConfigAgent.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdConfigAgent = /*#__PURE__*/function () {
  function PosdConfigAgent(id, configEncoded) {
    _classCallCheck(this, PosdConfigAgent);

    this.id = id;
    this.configEncoded = configEncoded;
    this.config = JSON.parse(PosdBase64.decode(configEncoded));
  }

  _createClass(PosdConfigAgent, [{
    key: "GetConfigEncoded",
    value: function GetConfigEncoded() {
      return this.configEncoded;
    }
  }, {
    key: "GetBlacklistPublishers",
    value: function GetBlacklistPublishers() {
      return this.config.blacklistPublishers;
    }
  }, {
    key: "GetBlacklistBannerImgSrc",
    value: function GetBlacklistBannerImgSrc() {
      return this.config.blacklistBannerImgSrc;
    }
  }, {
    key: "GetBlacklistBannerHref",
    value: function GetBlacklistBannerHref() {
      return this.config.blacklistBannerHref;
    }
  }, {
    key: "GetBlacklistIframeSrc",
    value: function GetBlacklistIframeSrc() {
      return this.config.blacklistIframeSrc;
    }
  }, {
    key: "GetBlacklistIframeId",
    value: function GetBlacklistIframeId() {
      return this.config.blacklistIframeId;
    }
  }, {
    key: "GetWhitelistCandidatesUrlKeyWords",
    value: function GetWhitelistCandidatesUrlKeyWords() {
      return this.config.whitelistCandidatesUrlKeyWords;
    }
  }, {
    key: "GetWhitelistRedirectionCode",
    value: function GetWhitelistRedirectionCode() {
      return this.config.whitelistRedirectionCode;
    }
  }, {
    key: "GetVideoValidatorsForHTML",
    value: function GetVideoValidatorsForHTML() {
      return this.config.videoValidatorsForHTML;
    }
  }, {
    key: "GetVideoValidatorsForJS",
    value: function GetVideoValidatorsForJS() {
      return this.config.videoValidatorsForJS;
    }
  }, {
    key: "GetVideoValidatorsForXHR",
    value: function GetVideoValidatorsForXHR() {
      return this.config.videoValidatorsForXHR;
    }
  }, {
    key: "GetFacebookConfig",
    value: function GetFacebookConfig() {
      return this.config.facebookConfig;
    }
  }, {
    key: "GetTwitterConfig",
    value: function GetTwitterConfig() {
      return this.config.twitterConfig;
    }
  }, {
    key: "GetRedditConfig",
    value: function GetRedditConfig() {
      return this.config.redditConfig;
    }
  }, {
    key: "GetAdBlockInspectorConfig",
    value: function GetAdBlockInspectorConfig() {
      return this.config.adBlockInspectorConfig;
    }
  }, {
    key: "GetBlacklistTargetUrl",
    value: function GetBlacklistTargetUrl() {
      return this.config.blacklistTargetUrl;
    }
  }, {
    key: "GetHtml5TargetUrlDetectionConfig",
    value: function GetHtml5TargetUrlDetectionConfig() {
      return this.config.html5TargetUrlDetectionConfig;
    }
  }, {
    key: "BannerAdsConfig",
    get: function get() {
      return this.config.bannerAdsConfig;
    }
  }, {
    key: "Html5AdsConfig",
    get: function get() {
      return this.config.HTML5AdsConfig;
    }
  }]);

  return PosdConfigAgent;
}();

module.exports = PosdConfigAgent;

/***/ }),

/***/ "./src/content/ContentIOManager.js":
/*!*****************************************!*\
  !*** ./src/content/ContentIOManager.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdContentIOManager = /*#__PURE__*/function () {
  function PosdContentIOManager(id) {
    _classCallCheck(this, PosdContentIOManager);

    this.id = id;
    this.init = false;
    this.onGotHTML5CandidatesExtractionStatusesCallback = null;
    this.onGotSkinAdCandidatesExtractionStatusesCallback = null;
    this.onGotBannerCandidatesExtractionStatusesCallback = null;
    this.onGotVideoXHRTrafficCallback = null;
    this.onAdBlockerStatusChanged = null;
    this.onTabUrlChanged = null;
    this.twitterVideoInfoCandidates = [];
    this.twitterAdCandidate = [];
  }

  _createClass(PosdContentIOManager, [{
    key: "IsInit",
    value: function IsInit() {
      return this.init;
    }
  }, {
    key: "Init",
    value: function Init() {
      var _this = this;

      if (!this.init) {
        this.init = true;
        window.addEventListener("message", function (event) {
          try {
            var mes = event.data;

            if (PosdMessage.IsValid(mes)) {
              switch (true) {
                case mes.type === PosdConst.MESSAGE_TYPE_VIDEO_XHR_CANDIDATE:
                  if (_this.onGotVideoXHRTrafficCallback) {
                    _this.onGotVideoXHRTrafficCallback(mes.content);
                  }

                  break;

                case mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA:
                  PosdContentIOManager.SendFBInStreamData(_this.id, mes.content);
                  break;

                case mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA:
                  if (PosdCommon.IsFBVideoDataValid(mes.content)) {
                    PosdContentIOManager.SendFBVideoData(_this.id, mes.content);
                  } else {}

                  break;

                case mes.type === PosdConst.MESSAGE_TYPE_TWITTER_VIDEO_DATA:
                  PosdContentIOManager.SendTWVideoData(_this.id, mes.content);
                  break;

                case mes.type === PosdConst.MESSAGE_TYPE_REDDIT_VIDEO_DATA:
                  PosdContentIOManager.SendRedditVideoData(_this.id, mes.content);
                  break;

                case mes.type === PosdConst.MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA:
                  PosdContentIOManager.SendRedditRightColumnData(_this.id, mes.content);
                  break;

                default:
                  break;
              } // if (mes.type === PosdConst.MESSAGE_TYPE_VIDEO_XHR_CANDIDATE) {
              //   console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] (ContentIOManager) got mes MESSAGE_TYPE_VIDEO_XHR_CANDIDATE`);
              //   if (this.onGotVideoXHRTrafficCallback) {
              //     this.onGotVideoXHRTrafficCallback(mes.content);
              //   }
              // } else if (mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA) {
              //   console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] (ContentIOManager) got mes MESSAGE_TYPE_FACEBOOK_VIDEO_DATA from PosdFacebookVideoDetector: `, mes);
              //   if (PosdCommon.IsFBVideoDataValid(mes.content)) {
              //     PosdContentIOManager.SendFBVideoData(this.id, mes.content);
              //   } else {
              //     console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] (ContentIOManager) got not valid Facebook video data `, mes.content);
              //   }
              // } else if (mes.type === PosdConst.MESSAGE_TYPE_TWITTER_VIDEO_DATA) {
              //   console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] (ContentIOManager) got mes MESSAGE_TYPE_TWITTER_VIDEO_DATA from PosdTwitterVideoDetector: `, mes);
              //   PosdContentIOManager.SendTWVideoData(this.id, mes.content);
              // }

            }
          } catch (e) {}
        }, false);

        if (PosdCommon.IsOnChromeRuntime()) {
          chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            var mes = request;

            if (PosdMessage.IsValid(mes) && mes.to === _this.id) {
              if (mes.type === PosdConst.MESSAGE_TYPE_HTML5_CANDIDATES_EXTRACTION_STATUSES) {
                if (_this.onGotHTML5CandidatesExtractionStatusesCallback) {
                  _this.onGotHTML5CandidatesExtractionStatusesCallback(mes.content);
                }
              } else if (mes.type === PosdConst.MESSAGE_TYPE_BANNER_CANDIDATES_EXTRACTION_STATUSES) {
                if (_this.onGotBannerCandidatesExtractionStatusesCallback) {
                  _this.onGotBannerCandidatesExtractionStatusesCallback(mes.content);
                }
              } else if (mes.type === PosdConst.MESSAGE_TYPE_SKIN_AD_CANDIDATES_EXTRACTION_STATUSES) {
                if (_this.onGotSkinAdCandidatesExtractionStatusesCallback) {
                  _this.onGotSkinAdCandidatesExtractionStatusesCallback(mes.content);
                }
              } else if (mes.type === PosdConst.MESSAGE_TYPE_TAB_URL_CHANGED) {
                if (_this.onTabUrlChanged) {
                  _this.onTabUrlChanged(mes.content);
                }
              } else if (mes.type === PosdConst.MESSAGE_TYPE_TAB_ADBLOCKER_STATUS_CHANGED) {
                if (_this.onAdBlockerStatusChanged) {
                  _this.onAdBlockerStatusChanged(mes.content);
                }
              }
            } else {}
          });
        }
      }
    }
  }, {
    key: "SendTicket",
    value: function SendTicket(ticket) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_OUT_TICKET;
      mes.from = this.id;
      mes.to = 'bg';
      mes.content = ticket;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes, this.onTicketSend.bind(this));
      }
    }
  }, {
    key: "onTicketSend",
    value: function onTicketSend(response) {
      if (response && response.status) {}
    }
  }], [{
    key: "SendHiddenAdCandidatesAmount",
    value: function SendHiddenAdCandidatesAmount(id, amount) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT;
      mes.from = id;
      mes.to = 'bg';
      mes.content = amount;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendInitMes",
    value: function SendInitMes(initData, onGetInitConfig) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_TAB_INITIALIZATION;
      mes.to = 'bg';
      mes.content = initData;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes, function (response) {
          if (response && response.config && onGetInitConfig) {
            onGetInitConfig(response.config);
          }
        });
      }
    }
  }, {
    key: "SendSinglePageReinitMes",
    value: function SendSinglePageReinitMes(reInitData) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_TAB_SINGLE_PAGE_REINITIALIZATION;
      mes.to = 'bg';
      mes.content = reInitData;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendNewPageCreatedTicket",
    value: function SendNewPageCreatedTicket(ticket) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET;
      mes.to = 'bg';
      mes.content = ticket;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendPanelRegulatorResult",
    value: function SendPanelRegulatorResult(isMaster) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_PANEL_REGULATOR_RESULT;
      mes.to = 'bg';
      mes.content = isMaster;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendMesToBackground",
    value: function SendMesToBackground(id, mesType, mesContent, onSentCallBack) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = mesType;
      mes.from = id;
      mes.to = 'bg';
      mes.content = mesContent;

      if (PosdCommon.IsOnChromeRuntime()) {
        if (onSentCallBack) {
          // console.log('message to BG with callback', mes)
          chrome.runtime.sendMessage(mes, onSentCallBack);
        } else {
          // console.log('message to BG ', mes);
          chrome.runtime.sendMessage(mes);
        }
      }
    }
  }, {
    key: "SendSkinAdsCandidates",
    value: function SendSkinAdsCandidates(id, skinAdsCandidates, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_SKINADS, skinAdsCandidates, onSentCallBack);
    }
  }, {
    key: "SendBannersCandidates",
    value: function SendBannersCandidates(id, bannerCandidates, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_BANNERS, bannerCandidates, onSentCallBack);
    }
  }, {
    key: "SendFacebookCandidates",
    value: function SendFacebookCandidates(id, facebookCandidates, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK, facebookCandidates, onSentCallBack);
    }
  }, {
    key: "SendTwitterCandidates",
    value: function SendTwitterCandidates(id, candidates, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_TWITTER, candidates, onSentCallBack);
    }
  }, {
    key: "SendRedditCandidates",
    value: function SendRedditCandidates(id, candidates, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_REDDIT, candidates, onSentCallBack);
    }
  }, {
    key: "SendFacebookCandidatePlacements",
    value: function SendFacebookCandidatePlacements(id, facebookCandidatePlacements, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_FACEBOOK, facebookCandidatePlacements, onSentCallBack);
    }
  }, {
    key: "SendTwitterCandidatePlacements",
    value: function SendTwitterCandidatePlacements(id, twitterCandidatePlacements, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TWITTER, twitterCandidatePlacements, onSentCallBack);
    }
  }, {
    key: "SendRedditCandidatePlacements",
    value: function SendRedditCandidatePlacements(id, redditCandidatePlacements, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_REDDIT, redditCandidatePlacements, onSentCallBack);
    }
  }, {
    key: "SendHtml5CandidatePlacements",
    value: function SendHtml5CandidatePlacements(id, html5CandidatePlacements, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_HTML5, html5CandidatePlacements, onSentCallBack);
    }
  }, {
    key: "SendTestMes",
    value: function SendTestMes(id, test, onSentCallBack) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_TEST, test, onSentCallBack);
    }
  }, {
    key: "SendAdBlockInspectorAgentReport",
    value: function SendAdBlockInspectorAgentReport(id, mes) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT, mes, null);
    }
  }, {
    key: "SendTWVideoData",
    value: function SendTWVideoData(id, mes) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_TWITTER_VIDEO_DATA, mes, null);
    }
  }, {
    key: "SendRedditVideoData",
    value: function SendRedditVideoData(id, mes) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_REDDIT_VIDEO_DATA, mes, null);
    }
  }, {
    key: "SendRedditRightColumnData",
    value: function SendRedditRightColumnData(id, mes) {
      PosdContentIOManager.SendMesToBackground(id, PosdConst.MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA, mes, null);
    }
  }, {
    key: "SendVideoHar",
    value: function SendVideoHar(id, videoTraffic) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_VIDEO_HAR;
      mes.from = id;
      mes.to = 'bg';
      mes.content = videoTraffic;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendFBVideoData",
    value: function SendFBVideoData(id, fbVidoeData) {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA;
      mes.from = id;
      mes.to = 'bg';
      mes.content = fbVidoeData;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendFBInStreamData",
    value: function SendFBInStreamData(id, inStreamData) {
      var mes = PosdMessage.EmptyMessage;
      inStreamData.encodedText = inStreamData.content;
      inStreamData.alias = PosdConst.VIDEO_TRAFFIC_FACEBOOK_MEDIA_ALIAS_JSON;
      inStreamData.mediaType = PosdConst.VIDEO_TRAFFIC_FACEBOOK_MEDIA_TYPE_JSON;
      inStreamData.frameId = 0;
      inStreamData.framesChain = [];
      inStreamData.contentType = 'json';
      delete inStreamData.content;
      mes.type = PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA;
      mes.from = id;
      mes.to = 'bg';
      mes.content = inStreamData;

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }]);

  return PosdContentIOManager;
}();

module.exports = PosdContentIOManager;

/***/ }),

/***/ "./src/content/ContentValidator.js":
/*!*****************************************!*\
  !*** ./src/content/ContentValidator.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdContentValidator = /*#__PURE__*/function () {
  function PosdContentValidator(chainId, frameId, bisId, Config) {
    _classCallCheck(this, PosdContentValidator);

    this.init = false;
    this.Config = Config;
    this.chainId = chainId;
    this.frameId = frameId;
    this.bisId = bisId;
    this.documentObj = null;
    this.onInputsDetectedCallback = null, this.onRedirectsDetectedCallback = null, this.detectedValidationInfo = {
      inputs: false,
      redirect: false
    };
  }

  _createClass(PosdContentValidator, [{
    key: "Init",
    value: function Init(documentObj, onInputsDetectedCallback, onRedirectsDetectedCallback) {
      if (!this.init && documentObj) {
        this.init = true;
        this.fullIdStr = PosdCommon.GetFullIdStr(this.chainId, this.frameId, this.bisId);
        this.documentObj = documentObj;
        this.onInputsDetectedCallback = onInputsDetectedCallback, this.onRedirectsDetectedCallback = onRedirectsDetectedCallback, void 0;
        this.ValidateContent();
      }

      return this.init;
    }
  }, {
    key: "ValidateContent",
    value: function ValidateContent() {
      if (!this.detectedValidationInfo.inputs) {
        var inputsAmount = this.GetInputsAmount();

        if (inputsAmount > 0) {
          this.detectedValidationInfo.inputs = true;

          if (this.onInputsDetectedCallback) {
            this.onInputsDetectedCallback();
          }
        }
      }

      if (!this.detectedValidationInfo.redirect) {
        if (this.HasRedirect()) {
          this.detectedValidationInfo.redirect = true;

          if (this.onRedirectsDetectedCallback) {
            this.onRedirectsDetectedCallback();
          }
        }
      }
    }
  }, {
    key: "GetInputsAmount",
    value: function GetInputsAmount() {
      var amount = 0;

      try {
        var inputs = PosdCommon.QuerySelectorAll(this.documentObj, 'input');

        if (inputs && inputs.length) {
          inputs.forEach(function (el) {
            var size = el.getBoundingClientRect();

            if (size.width > 0 && size.height > 0) {
              amount = amount + 1;
            }
          });
        }
      } catch (e) {}

      return amount;
    }
  }, {
    key: "IsWhiteListedRedirectionCode",
    value: function IsWhiteListedRedirectionCode(content) {
      var isWhiteListed = false;

      try {
        if (content && content.length && this.Config && this.Config.GetWhitelistRedirectionCode) {
          var whitelistRedirectionCode = this.Config.GetWhitelistRedirectionCode();

          for (var i = 0; i < whitelistRedirectionCode.length && !isWhiteListed; i++) {
            if (content.includes(whitelistRedirectionCode[i])) {
              isWhiteListed = true;
            }
          }
        } else {}
      } catch (e) {}

      return isWhiteListed;
    }
  }, {
    key: "HasRedirect",
    value: function HasRedirect() {
      var result = false;
      var scripts = PosdCommon.QuerySelectorAll(this.documentObj, 'script');

      for (var i = 0; i < scripts.length && !result; i++) {
        var content = scripts[i].innerHTML;

        if (content.length && content.includes('location.replace')) {
          if (this.IsWhiteListedRedirectionCode(content)) {
            result = false;
          } else {
            result = true;
          }
        }
      }

      return result;
    }
  }]);

  return PosdContentValidator;
}();

module.exports = PosdContentValidator;

/***/ }),

/***/ "./src/content/FrameContent.js":
/*!*************************************!*\
  !*** ./src/content/FrameContent.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdIframesIO = __webpack_require__(/*! ./IframesIO */ "./src/content/IframesIO.js");

var PosdContentValidator = __webpack_require__(/*! ./ContentValidator */ "./src/content/ContentValidator.js");

var PosdTargetUrlDetector = __webpack_require__(/*! ./detectors/Html5/TargetUrlDetector */ "./src/content/detectors/Html5/TargetUrlDetector.js");

var PosdWindowTargetUrlDetector = __webpack_require__(/*! ./detectors/Html5/WindowTargetUrlDetector */ "./src/content/detectors/Html5/WindowTargetUrlDetector.js");

var PosdVideoAds = __webpack_require__(/*! ./VideoAds */ "./src/content/VideoAds.js");

var PosdConfigAgent = __webpack_require__(/*! ./ConfigAgent */ "./src/content/ConfigAgent.js");

var PosdFrameContent = /*#__PURE__*/function () {
  function PosdFrameContent() {
    _classCallCheck(this, PosdFrameContent);

    this.id = null;
    this.frameId = null;
    this.chainId = null;
    this.fullIdStr = '';
    this.init = false;
    this.chainActivated = false;
    this.finalFrame = false;
    this.activated = false;
    this.contentSenderTimer = null;
    this.activationInfo = null;
    this.IframesIO = null;
    this.TargetUrlDetector = null;
    this.ContentValidator = null;
    this.VideoAds = null;
    this.Config = null;
    this.recheckerInterval = null;
    this.PageUrl = document.location.href;
  }

  _createClass(PosdFrameContent, [{
    key: "Init",
    value: function Init() {
      if (!this.init) {
        this.init = true;
        setTimeout(this.SendInitMessage.bind(this), 800);
      }
    }
  }, {
    key: "SetBisStatus",
    value: function SetBisStatus() {
      if (document && document.body && document.body.setAttribute) {
        document.body.setAttribute("bis_status", "ok");
      } else {}
    }
  }, {
    key: "RecheckBisStatus",
    value: function RecheckBisStatus() {
      if (document && document.body && document.body.getAttribute) {
        if (document.body.getAttribute("bis_status") !== "ok") {
          this.SetBisStatus();
        }
      }
    }
  }, {
    key: "StopRechecker",
    value: function StopRechecker() {
      if (this.recheckerInterval) {
        clearInterval(this.recheckerInterval);
        this.recheckerInterval = null;
      }
    }
  }, {
    key: "SendInitMessage",
    value: function SendInitMessage() {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_IFRAME_INITIALIZATION;
      mes.from = this.id;
      mes.to = 'bg';
      mes.content = {
        location: document.location.href
      };

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes, this.onGotInitMesResponse.bind(this));
      }
    }
  }, {
    key: "onGotInitMesResponse",
    value: function onGotInitMesResponse(response) {
      if (response.status && response.status === 'ok' && PosdMessage.IsValid(response.mes)) {
        if (response.mes.content.activeStatus) {
          this.frameId = response.mes.content.frameId;
          this.fullIdStr = PosdCommon.GetFullIdStr(this.chainId, this.frameId, this.id);

          if (response.mes.content.isMaster) {
            this.SetBisStatus();
            setTimeout(this.StopRechecker.bind(this), 7000);
            this.recheckerInterval = setInterval(this.RecheckBisStatus.bind(this), 300);
            this.IframesIO = new PosdIframesIO(this.id);
            this.IframesIO.Init();
            this.IframesIO.onGotChainActivationCallback = this.onGotChainActivation.bind(this);
            this.IframesIO.onGotContentMesCallback = this.onGotContentMes.bind(this);
            this.Config = new PosdConfigAgent(this.id, response.mes.content.configuration);
            var IsBlacklistedPublisher = PosdCommon.IsPublisherInBlacklist(this.PageUrl, this.Config.GetBlacklistPublishers());
            this.VideoAds = new PosdVideoAds(this.id, this.Config, this.IframesIO, !IsBlacklistedPublisher);

            if (document && document.body && document.body.setAttribute) {
              document.body.setAttribute("bis_frame_id", this.frameId);
            } else {}
          } else {}
        } else {}
      } else {}
    }
  }, {
    key: "onGotChainActivation",
    value: function onGotChainActivation(activationInfo) {
      if (activationInfo && activationInfo.headerInfo && activationInfo.headerInfo.bisId) {
        if (!this.chainActivated) {
          this.id = activationInfo.headerInfo.bisId;
          this.IframesIO.SetId(this.id);
          this.chainId = activationInfo.chainId;
          this.fullIdStr = PosdCommon.GetFullIdStr(this.chainId, this.frameId, this.id);
          this.StopRechecker();
          this.chainActivated = true;
          this.activationInfo = activationInfo;

          if (!this.Config) {
            if (activationInfo.configEncoded && activationInfo.configEncoded.length) {
              this.Config = new PosdConfigAgent(this.id, activationInfo.configEncoded);
            }
          }

          this.ContentValidator = new PosdContentValidator(this.chainId, this.frameId, this.id, this.Config);
          this.ContentValidator.Init(document, this.onContentInputsDetected.bind(this), this.onContentRedirectsDetected.bind(this));
          this.TargetUrlDetector = new PosdTargetUrlDetector(this.chainId, this.frameId, this.id, this.activationInfo.targetUrlCandidates, this.Config);
          this.TargetUrlDetector.Init(this.IframesIO);
          PosdFrameContent.SetBisId(document, window, this.id);
          PosdCommon.SetBisDepth(document.body, activationInfo.depth);
          PosdCommon.SetBisChainId(document.body, activationInfo.chainId);
          this.InjectJs();
          this.onGotActivationMes();
        } else {}
      } else {}
    }
  }, {
    key: "onGotActivationMes",
    value: function onGotActivationMes() {
      if (!this.activated) {
        this.activated = true;
        var frames = PosdCommon.QuerySelectorAll(document, 'iframe, frame');

        if (frames.length) {
          for (var i = 0; i < frames.length; i++) {
            PosdCommon.SetFullSizeToElement(frames[i], PosdFrameContent.GetAbsoluteCoordinates(this.activationInfo));
            PosdCommon.GenerateAndSetBisIdToFrame(frames[i]);
            PosdCommon.SetBisDepth(frames[i], this.activationInfo.depth + 1);
            PosdCommon.SetBisChainId(frames[i], this.activationInfo.chainId);

            if (PosdCommon.IsIframeHasContentScript(frames[i])) {
              PosdFrameContent.SendActivationMesToFrame(this.id, this.activationInfo.chainId, frames[i], this.activationInfo.depth + 1, this.Config);
            } else {
              var invalidChainSegmentContent = PosdFrameContent.GetInvalidChainSegmentContent(this.id, this.activationInfo.chainId, frames[i], this.activationInfo.depth + 1, this.Config);
              PosdFrameContent.SendInvalidChainSegmentContent(this.id, invalidChainSegmentContent);
            }
          }
        }

        this.TargetUrlDetector.DetectTargetUrl(1000, this.onTargerUrlDetected.bind(this));
      } else {}
    }
  }, {
    key: "onTargerUrlDetected",
    value: function onTargerUrlDetected() {
      if (!this.contentSenderTimer) {
        var sendWaitTime = PosdCommon.GetRandomIntInRange(0, 200);
        this.contentSenderTimer = setTimeout(this.SendContent.bind(this), sendWaitTime);
      } else {}
    }
  }, {
    key: "SendContent",
    value: function SendContent() {
      var _this = this;

      PosdFrameContent.PrepareContent(this.fullIdStr, document, PosdFrameContent.GetAbsoluteCoordinates(this.activationInfo));
      PosdFrameContent.RemoveInjectedJs(this.fullIdStr, document);
      var iframeContent = document.querySelector('html').outerHTML;

      if (iframeContent.length) {
        var mes = PosdMessage.EmptyMessage;
        mes.type = PosdConst.MESSAGE_TYPE_IFRAME_CONTENT;
        mes.from = this.id;
        mes.to = 'bg';
        mes.content = {
          isValid: true,
          headerInfo: this.activationInfo.headerInfo,
          contentFinal: PosdBase64.encode(iframeContent),
          targetUrl: this.TargetUrlDetector.FrameTargetUrl
        };

        if (PosdCommon.IsOnChromeRuntime()) {
          chrome.runtime.sendMessage(mes, function () {});
        }
      } else {}
    }
  }, {
    key: "onGotChainActivationResponse",
    value: function onGotChainActivationResponse() {}
  }, {
    key: "onGotContentMes",
    value: function onGotContentMes() {}
  }, {
    key: "onContentInputsDetected",
    value: function onContentInputsDetected() {
      this.IframesIO.SendInputsDetected();
    }
  }, {
    key: "onContentRedirectsDetected",
    value: function onContentRedirectsDetected() {
      this.IframesIO.SendRedirectDetected();
    }
  }, {
    key: "InjectJs",
    value: function InjectJs() {
      var script = document.createElement("script");

      if (script && script.setAttribute) {
        script.setAttribute("bis_script", "display");
      }

      var bisData = {
        id: this.id + "_w",
        html5TargetUrlDetectionConfig: this.Config.GetHtml5TargetUrlDetectionConfig()
      };

      script.innerHTML = "window.bisData = " + JSON.stringify(bisData) + ";" + PosdWindowTargetUrlDetector.GetWindowEmbeddedTargetUrlDataList.toString() + "(" + function () {
        function GenerateQuickId() {
          var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          return randomStrId.substring(0, 22);
        }

        window.addEventListener('message', function (event) {
          function IsValid(mes) {
            if (typeof mes !== 'undefined') {
              if (typeof mes.posdMessageId !== 'undefined' && typeof mes.from !== 'undefined' && typeof mes.to !== 'undefined' && typeof mes.type !== 'undefined' && typeof mes.content !== 'undefined') {
                return mes.posdMessageId && mes.posdMessageId === 'PANELOS_MESSAGE';
              }
            }

            return false;
          }

          try {
            var id = window.bisData.id;
            var mes = event.data;

            if (IsValid(mes) && mes.to === window.bisData.id) {
              if (mes.type === 'GET_WINDOW_TARGET_URL') {
                var targetUrl = GetWindowEmbeddedTargetUrlDataList(window.bisData.id, window, window.bisData.html5TargetUrlDetectionConfig);

                if (targetUrl.length) {
                  var response = {
                    posdMessageId: 'PANELOS_MESSAGE',
                    posdHash: GenerateQuickId(),
                    type: 'GET_WINDOW_TARGET_URL_RESPOND',
                    from: id,
                    to: id.substring(0, id.length - 2),
                    content: targetUrl
                  };

                  if (document.body && document.body.setAttribute) {
                    document.body.setAttribute('bis_mes_to_fr', JSON.stringify(response));
                  }

                  if (event.source.postMessage) {
                    event.source.postMessage(response, event.origin);
                  } else {}
                } else {}
              } else if (mes.type === 'GET_WINDOW_CLICK_TARGET_URL') {
                if (!!window.bisData.clickTargetUrlProcessed) {
                  return;
                }

                GetWindowClickTargetUrl();

                if (window.bisData && window.bisData.clickTargetUrl && window.bisData.clickTargetUrl.length) {
                  var _response = {
                    posdMessageId: 'PANELOS_MESSAGE',
                    posdHash: GenerateQuickId(),
                    type: 'GET_WINDOW_CLICK_TARGET_URL_RESPOND',
                    from: id,
                    to: id.substring(0, id.length - 2),
                    content: {
                      chainId: mes.content.chainId,
                      clickTargetUrl: window.bisData.clickTargetUrl
                    }
                  };

                  if (document.body && document.body.setAttribute) {
                    document.body.setAttribute('bis_mes_to_fr', JSON.stringify(_response));
                  }

                  if (event.source.postMessage) {
                    event.source.postMessage(_response, event.origin);
                  } else {}
                }
              }
            }
          } catch (e) {}
        }, false); //TODO: move to PosdWindowTargetUrlDetector

        function GetWindowClickTargetUrl() {
          if (window.bisData) {
            var clickElementsSelector = window.bisData.html5TargetUrlDetectionConfig.TARGET_URL_CLICK_ELEMENTS_SELECTOR; //to config

            var clickElements = document.querySelectorAll(clickElementsSelector);

            if (clickElements.length) {
              //resolve by closure
              window.bisData.origWindowOpen = window.open; //resolve by closure

              window.bisData.elementSquare = 0;
              window.bisData.clickTargetUrl = [];
              window.bisData.clickTargetUrlProcessed = false;

              var openCustom = function openCustom(url, name, params) {
                window.bisData.clickTargetUrl.push({
                  href: url,
                  square: window.bisData.elementSquare
                });
                return null;
              };

              window.open = openCustom;

              for (var i = 0; i < clickElements.length && window.bisData.clickTargetUrl.length === 0; i++) {
                try {
                  if (clickElements[i] && clickElements[i].click && clickElements[i].getBoundingClientRect) {
                    var rect = clickElements[i].getBoundingClientRect();

                    if (rect.width > 40 && rect.height > 40) {
                      window.bisData.elementSquare = rect.width * rect.height;

                      if (window.open == openCustom) {
                        clickElements[i].click();
                      } else {}
                    }
                  }
                } catch (e) {}
              }

              setTimeout(function () {
                window.open = window.bisData.origWindowOpen;
              }, 1000);
              window.bisData.clickTargetUrlProcessed = true;
            }
          }
        }
      }.toString() + "())";

      document.head.appendChild(script);
    }
  }], [{
    key: "SetBisId",
    value: function SetBisId(document, window, bisId) {
      if (window) {
        window.bis_id = bisId;
      }

      if (document) {
        document.bis_id = bisId;
      }

      if (document.body && document.body.setAttribute) {
        document.body.setAttribute("bis_body_id", bisId);
      }
    }
  }, {
    key: "RemoveInjectedJs",
    value: function RemoveInjectedJs(id, documentObj) {
      try {
        var scripts = documentObj.head.querySelectorAll("script[bis_script]");

        if (scripts && scripts.length) {
          for (var i = 0; i < scripts.length; i++) {
            scripts[i].remove();
          }
        } else {}
      } catch (e) {}
    }
  }, {
    key: "GetAbsoluteCoordinates",
    value: function GetAbsoluteCoordinates(activationInfo) {
      return {
        x: activationInfo.headerInfo.size.abs_x,
        y: activationInfo.headerInfo.size.abs_y
      };
    }
  }, {
    key: "PrepareContent",
    value: function PrepareContent(id, document, absoluteCoordinates) {
      var elementsCollection = PosdCommon.QuerySelectorAll(document, "*:not(html):not(script):not(head):not(meta):not(link):not(title):not(style):not(param)");

      for (var i = 0; i < elementsCollection.length; i++) {
        var element = elementsCollection[i];

        if (element) {
          try {
            var hasBackgroundImg = false;
            var backgroundImg = window.getComputedStyle(element).backgroundImage;

            if (backgroundImg && backgroundImg.length && backgroundImg != 'none' && backgroundImg.includes('url')) {
              backgroundImg = backgroundImg.replace(/"/g, "'");
              hasBackgroundImg = true;
            }

            if (element.hasAttribute("style")) {
              var styles = element.getAttribute("style");

              if (styles && element.setAttribute) {
                styles = styles.replace(/"/g, "'");
                element.setAttribute("style", styles);

                if (hasBackgroundImg) {
                  element.style.cssText += "background-image: " + backgroundImg + ";";
                  element.setAttribute("bis_label", "style");
                }
              }
            } else {
              if (hasBackgroundImg && element.setAttribute) {
                element.setAttribute("style", "background-image: " + backgroundImg + ";");
                element.setAttribute("bis_label", "style");
              }
            }

            try {
              if (element.attributes && element.attributes.length) {
                for (var j = 0; j < element.attributes.length; j++) {
                  if (element.attributes[j] && element.attributes[j].value && element.attributes[j].value.length && element.attributes[j].name !== "src") {
                    if (element.attributes[j].value.includes("\"")) {
                      element.attributes[j].value = element.attributes[j].value.replace(/"/g, "'");
                    }
                  }
                }
              }
            } catch (err) {}

            PosdCommon.SetFullSizeToElement(element, absoluteCoordinates);
          } catch (err) {}
        }
      }
    }
  }, {
    key: "ExtractContent",
    value: function ExtractContent(id, windowObj) {
      return windowObj.document.querySelector('html').outerHTML;
    }
  }, {
    key: "GetFrameHeaderInfo",
    value: function GetFrameHeaderInfo(chainId, frame, depth) {
      var frameHeaderInfo = {
        depth: depth,
        chainId: chainId,
        frameId: frame.id,
        src: frame.src,
        size: JSON.parse(frame.getAttribute('bis_size')),
        bisId: frame.getAttribute("bis_id")
      };

      if (depth === 0) {
        frameHeaderInfo.topHeaderContent = PosdBase64.encode(frame.outerHTML);
      }

      return frameHeaderInfo;
    }
  }, {
    key: "SendActivationMesToFrame",
    value: function SendActivationMesToFrame(id, chainId, frame, depth, config) {
      var result = false;

      try {
        var configEncoded = '';

        if (config && config.GetConfigEncoded) {
          configEncoded = config.GetConfigEncoded();
        }

        if (frame) {
          var mes = PosdMessage.EmptyMessage;
          var originUrl;

          try {
            originUrl = frame.contentWindow.origin;
          } catch (err) {
            originUrl = frame.src;
          }

          mes.type = PosdConst.MESSAGE_TYPE_CHAIN_ACTIVATION;
          mes.from = id;
          mes.to = 'fr';
          mes.content = {
            chainId: chainId,
            depth: depth,
            headerInfo: PosdFrameContent.GetFrameHeaderInfo(chainId, frame, depth),
            configEncoded: configEncoded,
            targetUrlCandidates: []
          };

          if (PosdCommon.IsIframeSecure(frame)) {
            if (frame.contentWindow && frame.contentWindow.postMessage) {
              frame.contentWindow.postMessage(mes, originUrl);
            } else {}
          } else {
            try {
              var targetUrlCandidates = PosdTargetUrlDetector.DetectTargetUrlFromWindowObj(id, frame.contentWindow, config);

              if (targetUrlCandidates.length) {
                mes.content.targetUrlCandidates = targetUrlCandidates;
              }
            } catch (e) {}

            if (frame.contentWindow.document.body.setAttribute) {
              frame.contentWindow.document.body.setAttribute('bis_activation', PosdBase64.encode(JSON.stringify(mes)));
            } else {}
          }

          result = true;
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetInvalidChainSegmentContent",
    value: function GetInvalidChainSegmentContent(id, chainId, frame, depth, config) {
      var segmentContent = {};
      var isChainCompleted = false;
      var headerInfo = PosdFrameContent.GetFrameHeaderInfo(chainId, frame, depth);
      var absoluteCoordinates = {
        x: headerInfo.size.x,
        y: headerInfo.size.y
      };

      try {
        var frames = PosdCommon.QuerySelectorAll(frame.contentWindow.document, 'iframe, frame');

        if (frames.length === 0) {
          isChainCompleted = true;
        } else {
          isChainCompleted = false;

          for (var i = 0; i < frames.length; i++) {
            PosdCommon.SetFullSizeToElement(frames[i], absoluteCoordinates);
            PosdCommon.GenerateAndSetBisIdToFrame(frames[i]);
            PosdCommon.SetBisDepth(frames[i], depth + 1);
            PosdFrameContent.SendActivationMesToFrame(id, chainId, frames[i], depth + 1, config);
          }
        }

        PosdFrameContent.PrepareContent(id, frame.contentWindow.document, absoluteCoordinates);
        segmentContent.isValid = false;
        segmentContent.isChainCompleted = isChainCompleted;
        segmentContent.headerInfo = headerInfo;
        segmentContent.contentFinal = PosdBase64.encode(PosdFrameContent.ExtractContent(id, frame.contentWindow));
        segmentContent.targetUrl = PosdTargetUrlDetector.DetectTargetUrlFromWindowObj(id, frame.contentWindow, config);
      } catch (e) {}

      return segmentContent;
    }
  }, {
    key: "SendInvalidChainSegmentContent",
    value: function SendInvalidChainSegmentContent(id, invalidChainSegmentContent) {
      if (invalidChainSegmentContent) {
        var mes = PosdMessage.EmptyMessage;
        mes.type = PosdConst.MESSAGE_TYPE_IFRAME_INVALID_CHAIN_SEGMENT_CONTENT;
        mes.from = id;
        mes.to = 'bg';
        mes.content = invalidChainSegmentContent;

        if (PosdCommon.IsOnChromeRuntime()) {
          chrome.runtime.sendMessage(mes);
        }
      } else {}
    }
  }]);

  return PosdFrameContent;
}();

module.exports = PosdFrameContent;

/***/ }),

/***/ "./src/content/HTML5Ads.js":
/*!*********************************!*\
  !*** ./src/content/HTML5Ads.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdAdsCandidates = __webpack_require__(/*! ./AdsCandidates */ "./src/content/AdsCandidates.js");

var PosdFrameContent = __webpack_require__(/*! ./FrameContent */ "./src/content/FrameContent.js");

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdHTML5Ads = /*#__PURE__*/function (_PosdAdsCandidates) {
  _inherits(PosdHTML5Ads, _PosdAdsCandidates);

  function PosdHTML5Ads(id, Config, IOManager, AdBlockerAgent) {
    var _this;

    _classCallCheck(this, PosdHTML5Ads);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdHTML5Ads).call(this, id));
    _this.Config = Config;
    _this.HTML5AdsConfig = _this.Config.Html5AdsConfig;
    _this.IOManager = IOManager;
    _this.IOManager.onGotHTML5CandidatesExtractionStatusesCallback = _this.onGotHTML5CandidatesExtractionStatuses.bind(_assertThisInitialized(_this));
    _this.AdBlockerAgent = AdBlockerAgent;
    _this.topFramesCandidates = [];
    _this.onDetectedCallback = null;
    _this.chainIdCounter = 0;
    return _this;
  }

  _createClass(PosdHTML5Ads, [{
    key: "ActivateDetector",
    value: function ActivateDetector() {
      var _this2 = this;

      this.Activated();
      this.DetectHTML5AdsCandidates();
      setTimeout(function () {
        _this2.DetectHTML5AdsCandidates();
      }, 350);
      setInterval(function () {
        _this2.DetectHTML5AdsCandidates();
      }, 700);
    }
  }, {
    key: "DetectHTML5AdsCandidates",
    value: function DetectHTML5AdsCandidates() {
      var _this3 = this;

      if (this.AdBlockerAgent.IsEnabled()) {
        this.ClearHiddenCounter();
      }

      var frames = PosdCommon.QuerySelectorAll(document, this.HTML5AdsConfig.QUERIES.IFRAMES_COLLECTION);
      var newCandidatesAmount = 0;

      if (frames.length) {
        for (var i = 0; i < frames.length; i++) {
          var frame = frames[i];

          if (!this.preCheckFrameContent(frame)) {
            continue;
          }

          var framesSrc = frame.src.toLowerCase();

          if (!PosdCommon.IsInFilterList(this.Config.GetBlacklistIframeSrc(), framesSrc) && !PosdCommon.IsInFilterList(this.Config.GetBlacklistIframeId(), frame.id)) {
            if (!this.IsFrameFromSite(framesSrc) || PosdCommon.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), framesSrc)) {
              var rectData = frame.getBoundingClientRect();

              if (rectData.width > 70 && rectData.height > 40 && rectData.height < 1100) {
                PosdCommon.SetFullSizeToElement(frame);
                var bisId = PosdCommon.GenerateAndSetBisIdToFrame(frame);
                this.chainIdCounter = this.chainIdCounter + 1;
                var candidate = {
                  ticketId: this.TicketId,
                  pageUrl: this.PageUrl,
                  bisId: bisId,
                  chainId: this.chainIdCounter,
                  detectionTime: new Date().getTime(),
                  processingStartTime: null,
                  frame: frame,
                  isSecure: PosdCommon.IsIframeSecure(frame),
                  hasContentScript: PosdCommon.IsIframeHasContentScript(frame),
                  status: PosdConst.CANDIDATE_PROCESS_STATUS_DETECED
                };
                this.topFramesCandidates.push(candidate);
                PosdCommon.SetBisDepth(frame, 0);
                PosdCommon.SetBisChainId(frame, this.chainIdCounter);
                newCandidatesAmount = newCandidatesAmount + 1;

                if (this.AdBlockerAgent.IsEnabled()) {
                  PosdCommon.HideElement(frame);
                  this.CandidateHidden();
                }

                if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && !this.AdBlockerAgent.IsEnabled()) {
                  frame.style.cssText += 'border: 6px solid red !important;';
                }
              }
            } else {
              PosdCommon.SetFullSizeToElement(frame);
            }
          } else {
            PosdCommon.SetFullSizeToElement(frame);
          }
        }
      }

      if (newCandidatesAmount > 0) {
        PosdContentIOManager.SendHtml5CandidatePlacements(this.id, newCandidatesAmount, null);

        var _loop = function _loop(_i) {
          if (_this3.topFramesCandidates[_i].status === PosdConst.CANDIDATE_PROCESS_STATUS_DETECED) {
            _this3.topFramesCandidates[_i].status = PosdConst.CANDIDATE_PROCESS_STATUS_START_PROCESSING;
            setTimeout(function () {
              _this3.ActivateCandidateProcessing(_this3.topFramesCandidates[_i]);
            }, 3000 + PosdCommon.GetRandomIntInRange(0, 500));
          }
        };

        for (var _i = 0; _i < this.topFramesCandidates.length; _i++) {
          _loop(_i);
        }

        if (this.AdBlockerAgent.IsEnabled()) {
          this.AdBlockerAgent.SetHiddenAmount(this.HiddenAmount);
        }
      }

      return this.topFramesCandidates.length;
    }
  }, {
    key: "preCheckFrameContent",
    value: function preCheckFrameContent(frame) {
      if (!frame.contentDocument) {
        return true;
      }

      var acceptableElements = frame.contentDocument.querySelectorAll(this.HTML5AdsConfig.QUERIES.ACCEPTABLE_NODES_IN_IFRAME);
      var unacceptableElements = frame.contentDocument.querySelectorAll(this.HTML5AdsConfig.QUERIES.UNACCEPTABLE_NODES_IN_IFRAME);
      var status = false;

      if (acceptableElements.length && !unacceptableElements.length) {
        status = true;
      }

      return status;
    }
  }, {
    key: "onGotHTML5CandidatesExtractionStatuses",
    value: function onGotHTML5CandidatesExtractionStatuses(statuses) {
      if (statuses && statuses.length) {
        for (var i = 0; i < statuses.length; i++) {
          if (this.AdBlockerAgent.IsEnabled() && statuses[i].extractionStatus.filteredOut) {
            PosdCommon.UnhideElement(PosdCommon.QuerySelector(document, "iframe[bis_chainid=\"".concat(statuses[i].chainId, "\"]")));
          } else if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
            var iframe = PosdCommon.QuerySelector(document, "iframe[bis_chainid=\"".concat(statuses[i].chainId, "\"]"));

            if (iframe) {
              PosdCommon.UpdateCandidateStatusBorderColor(iframe, statuses[i].extractionStatus);
            }
          }
        }
      }
    }
  }, {
    key: "ActivateCandidateProcessing",
    value: function ActivateCandidateProcessing(candidate) {
      if (candidate && candidate.status && candidate.status === PosdConst.CANDIDATE_PROCESS_STATUS_START_PROCESSING) {
        candidate.processingStartTime = new Date().getTime();
        candidate.status = PosdConst.CANDIDATE_PROCESS_STATUS_PROCESSING_ACTIVATED;
        var isSecure = PosdCommon.IsIframeSecure(candidate.frame);

        if (candidate.isSecure !== isSecure) {
          candidate.isSecure = isSecure;
        }

        var hasContentScript = PosdCommon.IsIframeHasContentScript(candidate.frame);

        if (candidate.hasContentScript !== hasContentScript) {
          candidate.hasContentScript = hasContentScript;
        }

        if (candidate.hasContentScript) {
          PosdFrameContent.SendActivationMesToFrame(this.id, candidate.chainId, candidate.frame, 0, this.Config);
        } else {
          var invalidChainSegmentContent = PosdFrameContent.GetInvalidChainSegmentContent(this.id, candidate.chainId, candidate.frame, 0, this.Config);

          if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES && invalidChainSegmentContent.isChainCompleted) {
            var extractionStatus = {
              fullContentExtracted: false,
              targetUrlExtracted: false,
              sentToBackend: false
            };

            if (invalidChainSegmentContent.contentFinal && invalidChainSegmentContent.contentFinal.length) {
              extractionStatus.fullContentExtracted = true;
            }

            if (invalidChainSegmentContent.targetUrl && invalidChainSegmentContent.targetUrl.length) {
              extractionStatus.targetUrlExtracted = true;
            }

            PosdCommon.UpdateCandidateStatusBorderColor(candidate.frame, extractionStatus);
          } else {}

          PosdFrameContent.SendInvalidChainSegmentContent(this.id, invalidChainSegmentContent);
        }
      } else {}
    }
  }, {
    key: "GetPrebuildInfo",
    value: function GetPrebuildInfo() {
      var preBuildInfo = [];
      var currentTime = new Date().getTime();

      for (var i = 0; i < this.topFramesCandidates.length; i++) {
        if (this.topFramesCandidates[i].status === PosdConst.CANDIDATE_PROCESS_STATUS_PROCESSING_ACTIVATED) {
          this.topFramesCandidates[i].status = PosdConst.CANDIDATE_PROCESS_STATUS_PREBUILD_INFO_SENT;
          preBuildInfo.push({
            ticketId: this.topFramesCandidates[i].ticketId,
            pageUrl: this.topFramesCandidates[i].pageUrl,
            bisId: this.topFramesCandidates[i].bisId,
            chainId: this.topFramesCandidates[i].chainId,
            timeAfterDetection: currentTime - this.topFramesCandidates[i].detectionTime,
            timeAfterProcessingStart: currentTime - this.topFramesCandidates[i].processingStartTime
          });
        }
      }

      return preBuildInfo;
    }
  }, {
    key: "IsFrameFromSite",
    value: function IsFrameFromSite(iframesSrc) {
      var result = false;
      var src = iframesSrc;

      if (src.length) {
        var urlEndIndex = src.indexOf('?');

        if (urlEndIndex > 0) {
          src = iframesSrc.substring(0, urlEndIndex);
        } else {
          urlEndIndex = src.indexOf('#');

          if (urlEndIndex > 0) {
            src = iframesSrc.substring(0, urlEndIndex);
          }
        }

        if (src.indexOf(window.location.host) != -1) {
          result = true;
        } else {
          if (!PosdCommon.isValidUrl(src) && src != 'about:blank') {
            result = true;
          }
        }
      }

      return result;
    }
  }]);

  return PosdHTML5Ads;
}(PosdAdsCandidates);

module.exports = PosdHTML5Ads;

/***/ }),

/***/ "./src/content/IframesIO.js":
/*!**********************************!*\
  !*** ./src/content/IframesIO.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdAtrMessageListener = __webpack_require__(/*! ./AtrMessageListener */ "./src/content/AtrMessageListener.js");

var PosdIframesIO = /*#__PURE__*/function () {
  function PosdIframesIO(id) {
    _classCallCheck(this, PosdIframesIO);

    this.id = id;
    this.init = false;
    this.AtrMessageListeners = [];
    this.webNavigationIframes = [];
    this.chainActivationListernerIntervalId = null;
    this.onWindowEmbeddedTargetUrlDetectionCallback = null;
    this.onGotContentMesCallback = null;
    this.onGotChainActivationCallback = null;
    this.onGotVideoXHRTrafficCallback = null;
    this.chainActivationEventProcessed = false;
    this.processedMessages = [];
  }

  _createClass(PosdIframesIO, [{
    key: "IsInit",
    value: function IsInit() {
      return this.init;
    }
  }, {
    key: "SetId",
    value: function SetId(id) {
      this.id = id;

      if (this.AtrMessageListener) {
        this.AtrMessageListener.SetId(id);
      }
    }
  }, {
    key: "Init",
    value: function Init() {
      var _this = this;

      if (!this.init) {
        this.init = true;
        window.addEventListener("message", function (event) {
          try {
            var mes = event.data;

            _this.ProcessWindowMessage(mes);
          } catch (e) {}
        }, false);

        if (PosdCommon.IsOnChromeRuntime()) {
          chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            var mes = request;

            if (PosdMessage.IsValid(mes)) {
              if (mes.type === PosdConst.MESSAGE_TYPE_GET_FRAME_CONTENT) {
                if (mes.multiTo.includes(_this.id)) {
                  _this.webNavigationIframes = mes.content;

                  if (_this.onGotContentMesCallback) {
                    _this.onGotContentMesCallback();
                  }
                }
              } else if (mes.type === PosdConst.MESSAGE_TYPE_TARGET_URL_DETECTION_BY_CLICK) {
                if (mes.multiTo.includes(_this.id)) {
                  _this.ActivateWindowClickTargetUrlDetection(mes.content);
                }
              }
            } else {}
          });
        }

        this.chainActivationListernerIntervalId = setInterval(function () {
          try {
            if (!_this.chainActivationEventProcessed && document && document.body) {
              var activAttr = document.body.getAttribute('bis_activation');

              if (activAttr && activAttr.length) {
                var mes = JSON.parse(PosdBase64.decode(activAttr));

                if (PosdMessage.IsValid(mes)) {
                  if (mes.type === PosdConst.MESSAGE_TYPE_CHAIN_ACTIVATION) {
                    _this.chainActivationEventProcessed = true;
                    clearInterval(_this.chainActivationListernerIntervalId);
                    _this.chainActivationListernerIntervalId = null;
                    document.body.setAttribute('bis_activation', 'done');

                    if (_this.onGotChainActivationCallback) {
                      _this.onGotChainActivationCallback(mes.content);
                    }
                  }
                }
              }
            }
          } catch (e) {}
        }, 500);
      }
    }
  }, {
    key: "ProcessWindowMessage",
    value: function ProcessWindowMessage(mes) {
      if (PosdMessage.IsValid(mes)) {
        if (mes.posdHash && !this.processedMessages.includes(mes.posdHash)) {
          if (mes.posdHash && mes.posdHash.length) {
            this.processedMessages.push(mes.posdHash);
          }

          if (mes.type === PosdConst.MESSAGE_TYPE_CHAIN_ACTIVATION) {
            if (this.chainActivationListernerIntervalId) {
              clearInterval(this.chainActivationListernerIntervalId);
              this.chainActivationListernerIntervalId = null;
            }

            if (this.onGotChainActivationCallback) {
              this.onGotChainActivationCallback(mes.content);
            }
          } else if (mes.type === PosdConst.MESSAGE_TYPE_GET_WINDOW_TARGET_URL_RESPOND) {
            if (this.onWindowEmbeddedTargetUrlDetectionCallback) {
              this.onWindowEmbeddedTargetUrlDetectionCallback(mes.content);
            } else {}
          } else if (mes.type === PosdConst.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL_RESPOND) {
            mes.to = 'bg';

            if (PosdCommon.IsOnChromeRuntime()) {
              chrome.runtime.sendMessage(mes);
            }
          } else if (mes.type === PosdConst.MESSAGE_TYPE_VIDEO_XHR_CANDIDATE) {
            if (this.onGotVideoXHRTrafficCallback) {
              this.onGotVideoXHRTrafficCallback(mes.content);
            } else {}
          }
        } else {}
      } else {}
    }
  }, {
    key: "ActivateWindowEmbeddedTargetUrlDetection",
    value: function ActivateWindowEmbeddedTargetUrlDetection(onWindowEmbeddedTargetUrlDetectionCallback) {
      try {
        this.onWindowEmbeddedTargetUrlDetectionCallback = onWindowEmbeddedTargetUrlDetectionCallback;
        var mes = PosdMessage.EmptyMessage;
        mes.type = PosdConst.MESSAGE_TYPE_GET_WINDOW_TARGET_URL;
        mes.from = this.id;
        mes.to = this.id + "_w";

        if (window.postMessage) {
          window.postMessage(mes, '*');
        } else {}

        var atrMessageListener = new PosdAtrMessageListener(this.id, this.ProcessWindowMessage.bind(this));
        atrMessageListener.ActivateMesToFrameContentListener(PosdConst.MESSAGE_TYPE_GET_WINDOW_TARGET_URL_RESPOND);
        this.AtrMessageListeners.push(atrMessageListener);
      } catch (e) {}
    }
  }, {
    key: "ActivateWindowClickTargetUrlDetection",
    value: function ActivateWindowClickTargetUrlDetection(inMesContent) {
      try {
        var mes = PosdMessage.EmptyMessage;
        mes.type = PosdConst.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL;
        mes.from = this.id;
        mes.to = this.id + "_w";
        mes.content = inMesContent;

        if (window.postMessage) {
          window.postMessage(mes, '*');
        } else {}

        var atrMessageListener = new PosdAtrMessageListener(this.id, this.ProcessWindowMessage.bind(this));
        atrMessageListener.ActivateMesToFrameContentListener(PosdConst.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL);
        this.AtrMessageListeners.push(atrMessageListener);
      } catch (e) {}
    }
  }, {
    key: "SendInputsDetected",
    value: function SendInputsDetected() {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS;
      mes.from = this.id;
      mes.to = 'bg';

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "SendRedirectDetected",
    value: function SendRedirectDetected() {
      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS;
      mes.from = this.id;
      mes.to = 'bg';

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.sendMessage(mes);
      }
    }
  }, {
    key: "Context",
    get: function get() {
      return this;
    }
  }]);

  return PosdIframesIO;
}();

module.exports = PosdIframesIO;

/***/ }),

/***/ "./src/content/MainPageContent.js":
/*!****************************************!*\
  !*** ./src/content/MainPageContent.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdTicket = __webpack_require__(/*! ./Ticket */ "./src/content/Ticket.js");

var PosdAdsManager = __webpack_require__(/*! ./AdsManager */ "./src/content/AdsManager.js");

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdAdBlockerAgent = __webpack_require__(/*! ./AdBlockerAgent */ "./src/content/AdBlockerAgent.js");

var PosdAdBlockInspectorAgent = __webpack_require__(/*! ./AdBlockInspectorAgent */ "./src/content/AdBlockInspectorAgent.js");

var PosdConfigAgent = __webpack_require__(/*! ./ConfigAgent */ "./src/content/ConfigAgent.js");

var PosdPanelsRegulator = __webpack_require__(/*! ./PanelsRegulator */ "./src/content/PanelsRegulator.js");

var PosdMainPageContent = /*#__PURE__*/function () {
  function PosdMainPageContent() {
    _classCallCheck(this, PosdMainPageContent);

    this.id = null;
    this.tabId = null;
    this.init = false;
    this.panalyticsId = '';
    this.adsCandidatesDetectionInterval = null;
    this.ticket = null;
    this.RefreshTicket();
    PosdContentIOManager.SendNewPageCreatedTicket(PosdCommon.ToJSON(this.ticket));
  }

  _createClass(PosdMainPageContent, [{
    key: "RefreshTicket",
    value: function RefreshTicket() {
      this.pageUrl = document.location.href;
      this.ticketId = PosdCommon.GenerateTicketId();
      this.cycleNumber = 0;
      this.ticket = PosdTicket.GetSingleOutTicket(this.panalyticsId, this.ticketId, this.tabId);

      if (this.init && this.AdsManager) {
        this.AdsManager.PageRefreshed(this.pageUrl, this.ticketId);
      }
    }
  }, {
    key: "Init",
    value: function Init() {
      if (!this.init) {
        PosdContentIOManager.SendInitMes({
          ticketId: this.ticketId,
          url: this.pageUrl
        }, this.onGetInitConfig.bind(this));
      }
    }
  }, {
    key: "onGetInitConfig",
    value: function onGetInitConfig(config) {
      if (config.activeStatus) {
        if (!this.init) {
          this.init = true;
          this.tabId = config.tabId;
          this.id = 'mp_' + config.tabId;
          this.panalyticsId = config.panalyticsId;
          this.ticket.tabId = this.tabId;
          this.ticket[PosdConst.TICKET_ALIAS_PANALYTICSID] = this.panalyticsId;
          this.Config = new PosdConfigAgent(this.id, config.configuration);
          this.IOManager = new PosdContentIOManager(this.id);
          this.IOManager.onTabUrlChanged = this.onTabUrlChanged.bind(this);
          this.IOManager.Init();
          this.AdBlockerAgent = new PosdAdBlockerAgent(this.id, this.IOManager);
          this.AdBlockerAgent.Init(config.adBlockerStatus, config.excludeList, config.tabId);
          this.AdsManager = new PosdAdsManager(this.id, this.Config, this.IOManager, this.AdBlockerAgent);
          this.PanelsRegulator = new PosdPanelsRegulator(this.id);
          this.PanelsRegulator.Init(this.AdBlockerAgent, this.onGotRegulatorRespond.bind(this));

          if (config.activeAdBlockInspectorAgent) {
            this.AdBlockInspectorAgent = new PosdAdBlockInspectorAgent(this.id);
            this.AdBlockInspectorAgent.Init(this.Config.GetAdBlockInspectorConfig());
          } else {}
        }
      } else {}
    }
  }, {
    key: "onGotRegulatorRespond",
    value: function onGotRegulatorRespond(isMaster) {
      if (this.init) {
        if (isMaster) {
          this.adsCandidatesDetectionInterval = setInterval(this.onAdsCandidatesDetected.bind(this), 10000);
          this.AdsManager.ActivateAdsdetectors();
          PosdContentIOManager.SendNewPageCreatedTicket(PosdCommon.ToJSON(this.ticket));
        } else {}

        PosdContentIOManager.SendPanelRegulatorResult(isMaster);
      }
    }
  }, {
    key: "onTabUrlChanged",
    value: function onTabUrlChanged(changeInfo) {
      if (changeInfo && changeInfo.newUrl && changeInfo.initedTicketId) {
        if (changeInfo.newUrl !== this.pageUrl && changeInfo.initedTicketId === this.ticketId) {
          this.RefreshTicket();
          PosdContentIOManager.SendSinglePageReinitMes({
            ticketId: this.ticketId,
            url: this.pageUrl
          });
          PosdContentIOManager.SendNewPageCreatedTicket(PosdCommon.ToJSON(this.ticket));
        }
      }
    }
  }, {
    key: "onAdsCandidatesDetected",
    value: function onAdsCandidatesDetected() {
      if (this.init) {
        if (PosdCommon.IsOnChromeRuntime()) {
          if (this.panalyticsId.length) {
            this.cycleNumber = this.cycleNumber + 1;
            this.ticket[PosdConst.TICKET_ALIAS_PANALYTICSID] = this.panalyticsId;
            this.ticket.windowSize = PosdCommon.GetWindowSize();

            if (this.cycleNumber > 1) {
              this.ticket.firstVisit = false;
            }

            this.ticket.adCandidatesHtml5 = this.AdsManager.GetHtml5CandidatesPrebildInfo();
            this.IOManager.SendTicket(PosdCommon.ToJSON(this.ticket));
          } else {}
        } else {
          if (this.adsCandidatesDetectionInterval) {
            clearInterval(this.adsCandidatesDetectionInterval);
          }
        }
      }
    }
  }]);

  return PosdMainPageContent;
}();

module.exports = PosdMainPageContent;

/***/ }),

/***/ "./src/content/PanelsRegulator.js":
/*!****************************************!*\
  !*** ./src/content/PanelsRegulator.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdPanelsRegulator = /*#__PURE__*/function () {
  function PosdPanelsRegulator(id) {
    _classCallCheck(this, PosdPanelsRegulator);

    this.id = id;
    this.init = false;
    this.extensionId = '' + chrome.runtime.id;
    this.AdBlockerAgent = null;
    this.onInitCallback = null;
  }

  _createClass(PosdPanelsRegulator, [{
    key: "Init",
    value: function Init(AdBlockerAgent, onInitCallback) {
      if (!this.init && AdBlockerAgent) {
        this.onInitCallback = onInitCallback;
        this.init = true;
        this.AdBlockerAgent = AdBlockerAgent;

        if (document.readyState === PosdConst.DOCUMENT_READYSTATE_LOADING) {
          document.addEventListener('DOMContentLoaded', this.ActivateRegulator.bind(this));
        } else if (document.readyState === PosdConst.DOCUMENT_READYSTATE_INTERACTIVE || document.readyState === PosdConst.DOCUMENT_READYSTATE_COMPLETE) {
          this.ActivateRegulator();
        }
      }
    }
  }, {
    key: "ActivateRegulator",
    value: function ActivateRegulator() {
      this.RegisterPanel();
      setTimeout(this.Regulate.bind(this), 500);
    }
  }, {
    key: "Regulate",
    value: function Regulate() {
      var isMaster = true;
      var masterExtensionId = '';
      var register = [];

      try {
        var registerStr = document.body.getAttribute('bis_register');

        if (registerStr && registerStr.length) {
          register = JSON.parse(PosdBase64.decode(registerStr));

          for (var i = 0; i < register.length && masterExtensionId.length === 0; i++) {
            if (register[i].master) {
              masterExtensionId = register[i].extensionId;
            }
          }

          if (masterExtensionId.length) {
            if (this.extensionId !== masterExtensionId) {
              isMaster = false;
            }
          }
        }
      } catch (e) {}

      if (this.onInitCallback) {
        this.onInitCallback(isMaster);
      }
    }
  }, {
    key: "GetPanelScore",
    value: function GetPanelScore() {
      var spliteVersion = PosdConfig.CONFIG_PANELOS_VERSION.split('.');
      var score = parseInt(spliteVersion[0]) * 10000 + parseInt(spliteVersion[1]) * 100 + parseInt(spliteVersion[2]);
      var adblockerStatus = this.AdBlockerAgent.GetStatus();

      if (PosdCommon.IsFacebookUrl(document.location.href)) {
        if (adblockerStatus[PosdConst.ADBLOCKER_FOR_FACEBOOK] === PosdConst.ADBLOCKER_STATUS_ENABLED) {
          score = score * 10;
        }
      } else if (PosdCommon.IsTwitterUrl(document.location.href)) {
        if (adblockerStatus[PosdConst.ADBLOCKER_FOR_TWITTER] === PosdConst.ADBLOCKER_STATUS_ENABLED) {
          score = score * 10;
        }
      } else if (PosdCommon.IsRedditUrl(document.location.href)) {
        if (adblockerStatus[PosdConst.ADBLOCKER_FOR_REDDIT] === PosdConst.ADBLOCKER_STATUS_ENABLED) {
          score = score * 10;
        }
      } else if (adblockerStatus[PosdConst.ADBLOCKER_FOR_DISPLAY] === PosdConst.ADBLOCKER_STATUS_ENABLED) {
        score = score * 10;
      }

      return score;
    }
  }, {
    key: "UpdateRegister",
    value: function UpdateRegister(register) {
      var registerRecord = {
        master: true,
        extensionId: this.extensionId,
        adblockerStatus: this.AdBlockerAgent.GetStatus(),
        version: PosdConfig.CONFIG_PANELOS_VERSION,
        score: this.GetPanelScore()
      };
      var isNew = true;

      for (var i = 0; i < register.length && isNew; i++) {
        if (register[i].extensionId === this.extensionId) {
          isNew = false;
          register[i] = registerRecord;
        }
      }

      if (isNew) {
        register.push(registerRecord);
      }
    }
  }, {
    key: "ChooseWinner",
    value: function ChooseWinner(register) {
      if (register && register.length) {
        if (register.length === 1) {} else {
          var masterIndex = 0;
          var masterScore = register[masterIndex].score;

          for (var i = 0; i < register.length; i++) {
            register[i].master = false;

            if (register[i].score > masterScore) {
              masterScore = register[i].score;
              masterIndex = i;
            }
          }

          register[masterIndex].master = true;
        }
      }
    }
  }, {
    key: "RegisterPanel",
    value: function RegisterPanel() {
      try {
        var register = [];
        var registerStr = document.body.getAttribute('bis_register');

        if (registerStr && registerStr.length) {
          register = JSON.parse(PosdBase64.decode(registerStr));
        }

        this.UpdateRegister(register);
        this.ChooseWinner(register);
        document.body.setAttribute('bis_register', PosdBase64.encode(JSON.stringify(register)));
      } catch (e) {}
    }
  }]);

  return PosdPanelsRegulator;
}();

module.exports = PosdPanelsRegulator;

/***/ }),

/***/ "./src/content/SkinAds.js":
/*!********************************!*\
  !*** ./src/content/SkinAds.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdAdsCandidates = __webpack_require__(/*! ./AdsCandidates */ "./src/content/AdsCandidates.js");

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdSkinAds = /*#__PURE__*/function (_PosdAdsCandidates) {
  _inherits(PosdSkinAds, _PosdAdsCandidates);

  function PosdSkinAds(id, Config, IOManager, AdBlockerAgent) {
    var _this;

    _classCallCheck(this, PosdSkinAds);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdSkinAds).call(this, id));
    _this.Config = Config;
    _this.skinAdsConfig = Config.config.skinAdsConfig;
    _this.IOManager = IOManager;
    _this.IOManager.onGotSkinAdCandidatesExtractionStatusesCallback = _this.onGotSkinAdCandidatesExtractionStatuses.bind(_assertThisInitialized(_this));
    _this.AdBlockerAgent = AdBlockerAgent;
    return _this;
  }

  _createClass(PosdSkinAds, [{
    key: "ActivateDetector",
    value: function ActivateDetector() {
      var _this2 = this;

      this.DetectCandidates();
      setTimeout(function () {
        _this2.DetectCandidates();
      }, 500);
      setInterval(function () {
        _this2.DetectCandidates();
      }, 1000);
    }
  }, {
    key: "SendCandidatesToBackground",
    value: function SendCandidatesToBackground() {
      if (this.Candidates.length) {
        if (this.AdBlockerAgent.IsEnabled()) {
          this.AdBlockerAgent.SetHiddenAmount(this.HiddenAmount);
        }

        PosdContentIOManager.SendSkinAdsCandidates(this.id, this.Candidates, null);
      }
    }
  }, {
    key: "DetectCandidates",
    value: function DetectCandidates() {
      if (this.AdBlockerAgent.IsEnabled()) {
        this.ClearHiddenCounter();
      }

      this.ClearCandidates();
      this.GetSkinAdFromBodyBackground();

      if (this.CandidatesCount == 0) {
        this.GetSkinAdFromDivBackground();
      }

      this.SendCandidatesToBackground();
    }
  }, {
    key: "GetSkinAdFromBodyBackground",
    value: function GetSkinAdFromBodyBackground() {
      var candidate = {
        source: [],
        targetUrl: []
      };
      var backgroundImageSrc;
      var body = document.body;

      if (body && !body.hasAttribute('bis_skin_checked')) {
        backgroundImageSrc = PosdCommon.GetUrlFromStyleStr(window.getComputedStyle(body).backgroundImage);
      }

      if (backgroundImageSrc && PosdCommon.isValidUrl(backgroundImageSrc)) {
        body.setAttribute("bis_skin_checked", "1");
        var skinAdsource = {
          type: "single",
          src: backgroundImageSrc,
          size: PosdCommon.GetFullElementSize(body)
        };
        candidate.source.push(skinAdsource);
        var fullHrefCollection = PosdCommon.QuerySelectorAll(document, this.skinAdsConfig.QUERIES.FULL_HREF_COLLECTION);

        for (var i = 0; i < fullHrefCollection.length; i++) {
          var element = fullHrefCollection[i];

          if (element.setAttribute) {
            element.setAttribute("bis_skin_checked", "1");
          }

          var rectData = element.getBoundingClientRect();
          var childRectData = element.firstElementChild ? element.firstElementChild.getBoundingClientRect() : null;

          if (element.href && (rectData.width > 50 && rectData.height >= 100 && rectData.left == 0 || childRectData && childRectData.width > 50 && childRectData.height >= 100 && childRectData.left == 0)) {
            // if (this.AdBlockerAgent.IsEnabled()) {
            //   element.style.visibility = 'hidden';
            // }
            if (PosdCommon.isValidUrl(element.href) && !candidate.targetUrl.includes(element.href)) {
              candidate.targetUrl.push(element.href);
            }
          }

          this.findElementsByHref(candidate.targetUrl, element);
        }
      }

      if (candidate.source.length && candidate.targetUrl.length) {
        this.hideElement(document); // if (this.AdBlockerAgent.IsEnabled()) {
        //   if (document.body && document.body.style) {
        //     document.body.style.backgroundImage = 'none';
        //     this.CandidateHidden();
        //   }
        // }

        this.AddCandidate(candidate);
      }
    }
  }, {
    key: "GetSkinAdFromDivBackground",
    value: function GetSkinAdFromDivBackground() {
      var candidate = {
        source: [],
        targetUrl: []
      };
      var findSkinAdDiv = false;
      var fullDivCollection = PosdCommon.QuerySelectorAll(document, this.skinAdsConfig.QUERIES.FULL_DIV_COLLECTION);

      for (var i = 0; i < fullDivCollection.length && !findSkinAdDiv; i++) {
        var element = fullDivCollection[i];

        if (element.setAttribute) {
          element.setAttribute("bis_skin_checked", "1");
        }

        var rectData = element.getBoundingClientRect();

        if (rectData.width > 50 && rectData.height > 500 && rectData.left == 0) {
          var backgroundImageSrc = PosdCommon.GetUrlFromStyleStr(window.getComputedStyle(element).backgroundImage);

          if (backgroundImageSrc && PosdCommon.isValidUrl(backgroundImageSrc)) {
            var skinAdsource = {
              type: "single",
              src: backgroundImageSrc,
              size: PosdCommon.GetFullElementSize(element)
            };
            candidate.source.push(skinAdsource);
            findSkinAdDiv = true;

            if (this.AdBlockerAgent.IsEnabled() && element.style) {
              element.style.backgroundImage = 'none';
              this.CandidateHidden();
            }
          }
        }
      }

      if (findSkinAdDiv) {
        var fullHrefCollection = PosdCommon.QuerySelectorAll(document, this.skinAdsConfig.QUERIES.FULL_HREF_COLLECTION);

        for (var j = 0; j < fullHrefCollection.length; j++) {
          var element = fullHrefCollection[j];

          if (element.setAttribute) {
            element.setAttribute("bis_skin_checked", "1");
          }

          var rectData = element.getBoundingClientRect();

          if (element.href && rectData.left == 0) {
            if (rectData.width > 50 && rectData.height > 500 || rectData.width > 500 && rectData.height > 50) {
              if (PosdCommon.isValidUrl(element.href) && !candidate.targetUrl.includes(element.href)) {
                candidate.targetUrl.push(element.href);
              }
            }
          }
        }
      }

      if (candidate.source.length && candidate.targetUrl.length) {
        this.AddCandidate(candidate);
      }
    }
  }, {
    key: "findElementsByHref",
    value: function findElementsByHref(urls, element) {
      var hrefEl = element.href;

      if (urls.includes(hrefEl)) {
        this.SetBorderToCandidate(element);
        this.hideElement(element);
        element.setAttribute("bis_skin_element", "1");
      }
    }
  }, {
    key: "hideElement",
    value: function hideElement(element) {
      if (this.AdBlockerAgent.IsEnabled()) {
        if (element.style) {
          element.style.visibility = 'hidden';
          element.style.backgroundImage = 'none';
        }

        if (element.body && element.body.style) {
          element.body.style.backgroundImage = 'none';
        }
      }
    }
  }, {
    key: "SetBorderToCandidate",
    value: function SetBorderToCandidate(el) {
      var rectData = el.getBoundingClientRect();

      if (this.AdBlockerAgent.IsEnabled() || !el) {
        return;
      }

      if (rectData.width > 1 && rectData.height > 1) {
        el.style.cssText += 'border: 6px solid red !important; display: block;';
      } else {
        el.firstElementChild.style.cssText += 'border: 6px solid red !important; display: block;';
      }
    }
  }, {
    key: "onGotSkinAdCandidatesExtractionStatuses",
    value: function onGotSkinAdCandidatesExtractionStatuses(statuses) {
      if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES && statuses && statuses.length && !this.AdBlockerAgent.IsEnabled()) {
        var _loop = function _loop(i) {
          var skinAds = PosdCommon.QuerySelectorAll(document, statuses[i].query);

          if (skinAds) {
            skinAds.forEach(function (el) {
              if (el) {
                PosdCommon.UpdateCandidateStatusBorderColor(el, statuses[i].extractionStatus);
              }
            });
          }
        };

        for (var i = 0; i < statuses.length; i++) {
          _loop(i);
        }
      }
    }
  }]);

  return PosdSkinAds;
}(PosdAdsCandidates);

module.exports = PosdSkinAds;

/***/ }),

/***/ "./src/content/Ticket.js":
/*!*******************************!*\
  !*** ./src/content/Ticket.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdTicket = /*#__PURE__*/function () {
  function PosdTicket() {
    _classCallCheck(this, PosdTicket);
  }

  _createClass(PosdTicket, null, [{
    key: "GetSingleOutTicket",
    value: function GetSingleOutTicket(panalyticsId, ticketId, tabId) {
      var ticket = {
        tabId: tabId,
        ticketFormatVersion: 3,
        partnerId: PosdConfig.CONFIG_PARTNER_ID,
        distributorId: PosdConfig.CONFIG_DISTRIBUTOR_ID,
        ticketId: ticketId,
        firstVisit: true,
        url: document.location.href,
        userAgent: navigator.userAgent,
        creationTime: PosdCommon.GetCurrentDataTimeStr(),
        windowSize: PosdCommon.GetWindowSize(),
        timeOnPage: 0,
        adCandidatesSkinAd: [],
        adCandidatesBanner: [],
        adCandidatesHtml5: [],
        adsFacebook: [],
        adsTwitter: [],
        adsReddit: [],
        adCandidatePlacements: {
          skinAd: 0,
          banner: 0,
          html5: 0,
          facebook: 0,
          twitter: 0
        },
        videoTraffics: [],
        activeAdBlocker: false
      };
      ticket[PosdConst.TICKET_ALIAS_PANALYTICSID] = panalyticsId;
      ticket[PosdConst.TICKET_ALIAS_PINSTANCEID] = PosdConfig.CONFIG_PINSTANCE_ID;
      var baseHref = PosdCommon.GetBaseHref();

      if (baseHref !== "") {
        ticket.base = baseHref;
      }

      var manifestData = chrome.runtime.getManifest();
      ticket.extensionVersion = manifestData.version;
      ticket.panelosVersion = PosdConfig.CONFIG_PANELOS_VERSION;
      return ticket;
    }
  }]);

  return PosdTicket;
}();

module.exports = PosdTicket;

/***/ }),

/***/ "./src/content/VideoAds.js":
/*!*********************************!*\
  !*** ./src/content/VideoAds.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdVideoTraffic = __webpack_require__(/*! ./VideoTraffic */ "./src/content/VideoTraffic.js");

var PosdVideoTrafficDetector = __webpack_require__(/*! ./VideoTrafficDetector */ "./src/content/VideoTrafficDetector.js");

var PosdVideoTrafficValidator = __webpack_require__(/*! ./VideoTrafficValidator */ "./src/content/VideoTrafficValidator.js");

var PosdContentIOManager = __webpack_require__(/*! ./ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdVideoAds = /*#__PURE__*/function () {
  function PosdVideoAds(id, Config, IOManager, injectXhrDetector) {
    _classCallCheck(this, PosdVideoAds);

    this.id = id;
    this.Config = Config;
    this.IOManager = IOManager;
    this.onDetectVideoHarCallback = null;
    this.VideoTrafficValidator = new PosdVideoTrafficValidator(this.id, this.Config);
    this.VideoTrafficDetector = new PosdVideoTrafficDetector(this.id);

    if (injectXhrDetector) {
      this.VideoTrafficDetector.InjectXhrDetector(this.Config);
      this.IOManager.onGotVideoXHRTrafficCallback = this.ProcessVideoXHRTraffic.bind(this);
    } else {}
  }

  _createClass(PosdVideoAds, [{
    key: "ActivateDetector",
    value: function ActivateDetector() {
      this.CheckVideoTrafficInHTML();
      this.CheckVideoTrafficInJS();
    }
  }, {
    key: "PageRefreshed",
    value: function PageRefreshed(pageUrl, ticketId) {
      this.CheckVideoTrafficInHTML();
      this.CheckVideoTrafficInJS();
    }
  }, {
    key: "CheckVideoTrafficInHTML",
    value: function CheckVideoTrafficInHTML() {
      var videoTraffic = new PosdVideoTraffic(PosdConst.VIDEO_TRAFFIC_SOURCE_HTML, "GET", window.location.href, "text/html", document.documentElement.outerHTML);
      var validatorOnSuccess = this.VideoTrafficValidator.Validate(videoTraffic);

      if (validatorOnSuccess) {
        this.SendVideoTraffic(videoTraffic, validatorOnSuccess);
      } else {}
    }
  }, {
    key: "CheckVideoTrafficInJS",
    value: function CheckVideoTrafficInJS() {
      var scripts = PosdCommon.QuerySelectorAll(document, 'script');

      for (var i = 0; i < scripts.length; i++) {
        var videoTraffic = new PosdVideoTraffic(PosdConst.VIDEO_TRAFFIC_SOURCE_JS, "GET", scripts[i].src, "text/javascript", scripts[i].innerHTML);
        var validatorOnSuccess = this.VideoTrafficValidator.Validate(videoTraffic);

        if (validatorOnSuccess) {
          if (validatorOnSuccess.alias === 'JSON_TIKTOK_FEED') {
            this.filterDataForTiktokJS(videoTraffic);

            if (!JSON.parse(videoTraffic.GetContent()).itemList.length) {
              return;
            }
          }

          this.SendVideoTraffic(videoTraffic, validatorOnSuccess);
        } else {}
      }
    }
  }, {
    key: "ProcessVideoXHRTraffic",
    value: function ProcessVideoXHRTraffic(xhr) {
      if (PosdVideoTraffic.IsXHRvalid(xhr)) {
        var videoTraffic = new PosdVideoTraffic(PosdConst.VIDEO_TRAFFIC_SOURCE_XHR, xhr.requestMethod, xhr.url, xhr.type, xhr.content, xhr.encodedPostBody);
        var validatorOnSuccess = this.VideoTrafficValidator.Validate(videoTraffic);

        if (validatorOnSuccess) {
          if (validatorOnSuccess.alias === 'JSON_TIKTOK_FEED') {
            this.filterDataForTiktokXHR(videoTraffic);

            if (!JSON.parse(videoTraffic.GetContent()).itemList.length) {
              return;
            }
          }

          this.SendVideoTraffic(videoTraffic, validatorOnSuccess);
        }
      } else {}
    }
  }, {
    key: "filterDataForTiktokJS",
    value: function filterDataForTiktokJS(videoTraffic) {
      var content = JSON.parse(videoTraffic.GetContent());
      var urlPattern = 'https://www.tiktok.com/api/recommend/item_list/?this=data&from=script&in=dom';
      videoTraffic.SetUrl(urlPattern);

      if (content.ItemModule && _typeof(content.ItemModule) === 'object') {
        var keys = Object.keys(content.ItemModule);
        var filteredContent = {
          itemList: []
        };

        for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
          var id = _keys[_i];
          var post = content.ItemModule[id];

          if (post.adLabelVersion && parseInt(post.adLabelVersion) === 2) {
            filteredContent.itemList.push(post);
          }
        }

        videoTraffic.SetContent(JSON.stringify(filteredContent));
      }
    }
  }, {
    key: "filterDataForTiktokXHR",
    value: function filterDataForTiktokXHR(videoTraffic) {
      var content = JSON.parse(videoTraffic.GetContent());

      if (content.itemList) {
        var filteredContent = {
          itemList: content.itemList.filter(function (el) {
            if (el.adLabelVersion && parseInt(el.adLabelVersion) === 2) {
              return el;
            }
          })
        };

        if (!filteredContent.itemList.length) {
          filteredContent.itemList = [];
        }

        videoTraffic.SetContent(JSON.stringify(filteredContent));
      }
    }
  }, {
    key: "SendVideoTraffic",
    value: function SendVideoTraffic(videoTraffic, validatorOnSuccess) {
      if (videoTraffic && validatorOnSuccess) {
        var videoHar = {
          requestMethod: videoTraffic.GetRequestMethod(),
          url: videoTraffic.GetUrl(),
          contentType: videoTraffic.GetType(),
          mediaType: validatorOnSuccess['name'],
          alias: validatorOnSuccess['alias']
        };

        if (videoTraffic.IsEncodedPostBodyExist() && validatorOnSuccess['alias'] === "YT_MIDROLL_INFO") {
          videoHar.encodedPostBody = PosdBase64.encode(videoTraffic.GetEncodedPostBody());
        }

        if (validatorOnSuccess.reduceSizeFilter && validatorOnSuccess.reduceSizeFilter.active) {
          var regexp = PosdVideoTrafficValidator.CreateRegExp(validatorOnSuccess.reduceSizeFilter.reducePattern);
          var res;

          if ((res = regexp.exec(videoTraffic.GetContent())) !== null) {
            if (res.length > 0 && Math.max.apply(Math, _toConsumableArray(validatorOnSuccess.reduceSizeFilter.regResIndexes)) < res.length) {
              var reduced = res.filter(function (groupContent, groupIndex) {
                return validatorOnSuccess.reduceSizeFilter.regResIndexes.includes(groupIndex);
              });
              videoHar.encodedText = PosdBase64.encode(reduced.join(' '));
            }
          }
        } else {
          videoHar.encodedText = PosdBase64.encode(videoTraffic.GetContent());
        }

        PosdContentIOManager.SendVideoHar(this.id, videoHar);
      } else {}
    }
  }]);

  return PosdVideoAds;
}();

module.exports = PosdVideoAds;

/***/ }),

/***/ "./src/content/VideoTraffic.js":
/*!*************************************!*\
  !*** ./src/content/VideoTraffic.js ***!
  \*************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdVideoTraffic = /*#__PURE__*/function () {
  function PosdVideoTraffic(trafficSource, requestMethod, url, type, content) {
    var encodedPostBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, PosdVideoTraffic);

    this.trafficSource = trafficSource;
    this.requestMethod = requestMethod;
    this.url = url;
    this.type = type;
    this.content = content;
    this.setEncodedPostBody(encodedPostBody);
  }

  _createClass(PosdVideoTraffic, [{
    key: "setEncodedPostBody",
    value: function setEncodedPostBody(value) {
      if (value && typeof value === 'string' && value.length > 0) {
        this.encodedPostBody = value;
      }
    }
  }, {
    key: "GetEncodedPostBody",
    value: function GetEncodedPostBody() {
      if (!this.encodedPostBody) {
        return null;
      }

      return this.encodedPostBody;
    }
  }, {
    key: "IsEncodedPostBodyExist",
    value: function IsEncodedPostBodyExist() {
      return !!this.encodedPostBody;
    }
  }, {
    key: "GetTrafficSource",
    value: function GetTrafficSource() {
      return this.trafficSource;
    }
  }, {
    key: "GetRequestMethod",
    value: function GetRequestMethod() {
      return this.requestMethod;
    }
  }, {
    key: "GetUrl",
    value: function GetUrl() {
      return this.url;
    }
  }, {
    key: "GetType",
    value: function GetType() {
      return this.type;
    }
  }, {
    key: "GetContent",
    value: function GetContent() {
      return this.content;
    }
  }, {
    key: "SetContent",
    value: function SetContent(content) {
      this.content = content;
    }
  }, {
    key: "SetUrl",
    value: function SetUrl(url) {
      this.url = url;
    }
  }], [{
    key: "IsXHRvalid",
    value: function IsXHRvalid(xhr) {
      return xhr && xhr.hasOwnProperty('requestMethod') && xhr.hasOwnProperty('url') && xhr.url !== '';
    }
  }]);

  return PosdVideoTraffic;
}();

module.exports = PosdVideoTraffic;

/***/ }),

/***/ "./src/content/VideoTrafficDetector.js":
/*!*********************************************!*\
  !*** ./src/content/VideoTrafficDetector.js ***!
  \*********************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdVideoTrafficDetector = /*#__PURE__*/function () {
  function PosdVideoTrafficDetector(id) {
    _classCallCheck(this, PosdVideoTrafficDetector);

    this.id = id;
  }

  _createClass(PosdVideoTrafficDetector, [{
    key: "InjectXhrDetector",
    value: function InjectXhrDetector(config) {
      var inject = function inject(config) {
        function GenerateQuickId() {
          var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          return randomStrId.substring(0, 22);
        }

        ;

        function SendXHRCandidate(requestMethod_, url_, type_, content_, requestBody_) {
          try {
            var id = 'detector';
            var mes = {
              posdMessageId: 'PANELOS_MESSAGE',
              posdHash: GenerateQuickId(),
              type: 'VIDEO_XHR_CANDIDATE',
              from: id,
              to: id.substring(0, id.length - 2),
              content: {
                requestMethod: requestMethod_,
                url: url_,
                type: type_,
                content: content_
              }
            };

            if (requestBody_ && requestBody_[0] && requestBody_[0].length) {
              mes.content.encodedPostBody = requestBody_[0];
            } // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : (PosdVideoTrafficDetector) sending`, mes);


            window.postMessage(mes);
          } catch (e) {}
        }

        ;
        var open = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function () {
          this.requestMethod = arguments[0];
          open.apply(this, arguments);
        };

        var send = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function () {
          var requestBody_ = Object.assign(arguments, {});
          var onreadystatechange = this.onreadystatechange;

          this.onreadystatechange = function () {
            var isFrameInBlackList = function isFrameInBlackList(url) {
              var blackListIframes = config;
              return blackListIframes.some(function (e) {
                return url.includes(e);
              });
            };

            if (this.readyState === 4 && !isFrameInBlackList(this.responseURL)) {
              setTimeout(SendXHRCandidate(this.requestMethod, this.responseURL, this.getResponseHeader('content-type'), this.response, requestBody_), 0);
            }

            if (onreadystatechange) {
              return onreadystatechange.apply(this, arguments);
            }
          };

          return send.apply(this, arguments);
        };

        var nativeFetch = fetch;

        fetch = function fetch() {
          var _this = this;

          var args = arguments;
          var fetchURL = arguments[0] instanceof Request ? arguments[0].url : arguments[0];
          var fetchMethod = arguments[0] instanceof Request ? arguments[0].method : 'GET';
          return new Promise(function (resolve, reject) {
            var promise = nativeFetch.apply(_this, args);
            promise.then(function (response) {
              if (response.body instanceof ReadableStream) {
                var nativeJson = response.json;

                response.json = function () {
                  var _arguments = arguments,
                      _this2 = this;

                  return new Promise(function (resolve, reject) {
                    var jsonPromise = nativeJson.apply(_this2, _arguments);
                    jsonPromise.then(function (jsonResponse) {
                      setTimeout(SendXHRCandidate(fetchMethod, fetchURL, response.headers.get('content-type'), JSON.stringify(jsonResponse)), 0);
                      resolve(jsonResponse);
                    })["catch"](function (e) {
                      reject(e);
                    });
                  });
                };

                var nativeText = response.text;

                response.text = function () {
                  var _arguments2 = arguments,
                      _this3 = this;

                  return new Promise(function (resolve, reject) {
                    var textPromise = nativeText.apply(_this3, _arguments2);
                    textPromise.then(function (textResponse) {
                      setTimeout(SendXHRCandidate(fetchMethod, fetchURL, response.headers.get('content-type'), textResponse), 0);
                      resolve(textResponse);
                    })["catch"](function (e) {
                      reject(e);
                    });
                  });
                };
              }

              resolve.apply(this, arguments);
            })["catch"](function () {
              reject.apply(this, arguments);
            });
          });
        };
      };

      var script = document.createElement("script");
      script.innerHTML = "(".concat(inject.toString(), ")(").concat(JSON.stringify(config.config.blacklistIframeSrc), ");");

      if (document.head) {
        document.head.appendChild(script);
      } else {}
    }
  }]);

  return PosdVideoTrafficDetector;
}();

module.exports = PosdVideoTrafficDetector;

/***/ }),

/***/ "./src/content/VideoTrafficValidator.js":
/*!**********************************************!*\
  !*** ./src/content/VideoTrafficValidator.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdVideoTrafficValidator = /*#__PURE__*/function () {
  function PosdVideoTrafficValidator(id, Config) {
    _classCallCheck(this, PosdVideoTrafficValidator);

    this.id = id;
    this.Config = Config;
  }

  _createClass(PosdVideoTrafficValidator, [{
    key: "Validate",
    value: function Validate(videoTraffic) {
      var validators = [];
      var getValidators = false;

      if (videoTraffic) {
        if (videoTraffic.GetTrafficSource() === PosdConst.VIDEO_TRAFFIC_SOURCE_HTML) {
          validators = this.Config.GetVideoValidatorsForHTML();
          getValidators = true;
        } else if (videoTraffic.GetTrafficSource() === PosdConst.VIDEO_TRAFFIC_SOURCE_XHR) {
          validators = this.Config.GetVideoValidatorsForXHR();
          getValidators = true;
        } else if (videoTraffic.GetTrafficSource() === PosdConst.VIDEO_TRAFFIC_SOURCE_JS) {
          validators = this.Config.GetVideoValidatorsForJS();
          getValidators = true;
        }

        if (getValidators) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var validator = _step.value;
              var isValid = this.ValidateUseConfiguration(videoTraffic, validator);

              if (isValid) {
                return validator;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }

      return false;
    }
  }, {
    key: "ValidateUseConfiguration",
    value: function ValidateUseConfiguration(response, configuration) {
      var keys = Object.keys(configuration);
      var validators = [];

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];

        if (key.indexOf('Pattern') !== -1) {
          validators.push(key);
        }
      }

      var passed = 0;
      var handlers = {
        'domainPattern': 'GetUrl',
        'mimePattern': 'GetType',
        'contentPattern': 'GetContent'
      };

      for (var _i2 = 0, _validators = validators; _i2 < _validators.length; _i2++) {
        var validator = _validators[_i2];

        try {
          var regex = PosdVideoTrafficValidator.CreateRegExp(configuration[validator]);
          var handler = handlers[validator];
          passed += regex.test(response[handler]()) ? 1 : 0;
        } catch (err) {}
      }

      return passed === validators.length;
    }
  }], [{
    key: "CreateRegExp",
    value: function CreateRegExp(str) {
      var flags = str.replace(/.*\/([gimy]*)$/, '$1');
      var pattern = str.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
      var regex = new RegExp(pattern, flags);
      return regex;
    }
  }]);

  return PosdVideoTrafficValidator;
}();

module.exports = PosdVideoTrafficValidator;

/***/ }),

/***/ "./src/content/detectors/AdDetector.js":
/*!*********************************************!*\
  !*** ./src/content/detectors/AdDetector.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../../libs/Constants */ "./src/libs/Constants.js");

var PosdAdDetector = /*#__PURE__*/function () {
  function PosdAdDetector(id, options, AdBlockerAgent) {
    _classCallCheck(this, PosdAdDetector);

    this.id = id;
    this.options = options;
    this.AdBlockerAgent = AdBlockerAgent;
    this.active = false;
    this.lastDetectTime = PosdCommon.GetCurrentTimestampMs() - 1000;
    this.activateDetectorTime = PosdCommon.GetCurrentTimestampMs();
    this.detectorInterval = null;
    this.observerNodesListenerInterval = null;
    this.observerNodesChecksAmount = 0;
  }

  _createClass(PosdAdDetector, [{
    key: "ActualizeDetector",
    value: function ActualizeDetector() {}
  }, {
    key: "ActivateMutationObserver",
    value: function ActivateMutationObserver() {}
  }, {
    key: "DeactivateMutationObserver",
    value: function DeactivateMutationObserver() {}
  }, {
    key: "Detector",
    value: function Detector() {}
  }, {
    key: "HideAd",
    value: function HideAd(ad, adSize, adId) {}
  }, {
    key: "CheckIfAd",
    value: function CheckIfAd(candidate) {}
  }, {
    key: "CheckIfAdRendered",
    value: function CheckIfAdRendered(ad) {}
  }, {
    key: "ExtractAd",
    value: function ExtractAd(adId) {}
  }, {
    key: "ActivateDetector",
    value: function ActivateDetector() {
      var _this = this;

      if (!this.active) {
        this.activateDetectorTime = PosdCommon.GetCurrentTimestampMs();
        this.active = true;

        if (this.options.firstDetectionAfterActivationTimeoutMs && this.options.firstDetectionAfterActivationTimeoutMs > 0) {
          setTimeout(function () {
            _this.DetectCandidates(PosdConst.AD_DETECTOR_INITIATOR_ACTIVATION);
          }, this.options.firstDetectionAfterActivationTimeoutMs);
        }

        if (this.options.secondDetectionAfterActivationTimeoutMs && this.options.secondDetectionAfterActivationTimeoutMs > 0) {
          setTimeout(function () {
            _this.DetectCandidates(PosdConst.AD_DETECTOR_INITIATOR_ACTIVATION);
          }, this.options.secondDetectionAfterActivationTimeoutMs);
        }

        this.detectorInterval = setInterval(function () {
          _this.DetectCandidates(PosdConst.AD_DETECTOR_INITIATOR_TIMER);
        }, this.options.detectionIntervalMs);

        if (this.options.useObserver) {
          this.observerNodesListenerInterval = setInterval(function () {
            _this.observerNodesChecksAmount = _this.observerNodesChecksAmount + 1;

            if (_this.ActivateMutationObserver() || _this.observerNodesChecksAmount > _this.options.observerNodesChecksMaxAmount) {
              clearInterval(_this.observerNodesListenerInterval);
              _this.observerNodesListenerInterval = null;
              _this.observerNodesChecksAmount = 0;
            }
          }, this.options.observerNodesCheckIntervalMs);
        }
      }
    }
  }, {
    key: "DeactivateDetector",
    value: function DeactivateDetector() {
      this.DeactivateMutationObserver();

      if (this.detectorInterval) {
        clearInterval(this.detectorInterval);
        this.detectorInterval = null;
      }

      if (this.observerNodesListenerInterval) {
        clearInterval(this.observerNodesListenerInterval);
        this.observerNodesListenerInterval = null;
        this.observerNodesChecksAmount = 0;
      }

      this.active = false;
    }
  }, {
    key: "DetectCandidates",
    value: function DetectCandidates(initiator) {
      if (this.IsActualByKeyWordInUrl && this.ActualizeDetector()) {
        var currentTime = PosdCommon.GetCurrentTimestampMs();

        if (currentTime - this.lastDetectTime > this.options.minTimeAfterLastDetectionMs) {
          this.lastDetectTime = currentTime;
          this.Detector();
        } else {}
      } else {
        if (this.options.maxActualizeDetectorWaitTimeMs) {
          if (PosdCommon.GetCurrentTimestampMs() - this.activateDetectorTime > this.options.maxActualizeDetectorWaitTimeMs) {
            this.DeactivateDetector();
          }
        }
      }
    }
  }, {
    key: "IsActualByKeyWordInUrl",
    get: function get() {
      if (this.options.urlValidationByKeyWord && this.options.urlValidationByKeyWord.length) {
        return window.location.href.includes(this.options.urlValidationByKeyWord);
      }

      return true;
    }
  }]);

  return PosdAdDetector;
}();

module.exports = PosdAdDetector;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookAds.js":
/*!*******************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookAds.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdConfig = __webpack_require__(/*! ../../../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdBase64 = __webpack_require__(/*! ../../../libs/base64 */ "./src/libs/base64.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdAdsCandidates = __webpack_require__(/*! ../../AdsCandidates */ "./src/content/AdsCandidates.js");

var PosdContentIOManager = __webpack_require__(/*! ../../ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdFacebookCommon = __webpack_require__(/*! ./FacebookCommon */ "./src/content/detectors/Facebook/FacebookCommon.js");

var PosdFacebookFeed = __webpack_require__(/*! ./FacebookFeed */ "./src/content/detectors/Facebook/FacebookFeed.js");

var PosdFacebookWatch = __webpack_require__(/*! ./FacebookWatch */ "./src/content/detectors/Facebook/FacebookWatch.js");

var PosdFacebookRightColumn = __webpack_require__(/*! ./FacebookRightColumn */ "./src/content/detectors/Facebook/FacebookRightColumn.js");

var PosdFacebookMarketplace = __webpack_require__(/*! ./FacebookMarketplace */ "./src/content/detectors/Facebook/FacebookMarketplace.js");

var PosdFacebookVideoDetector = __webpack_require__(/*! ./FacebookVideoDetector */ "./src/content/detectors/Facebook/FacebookVideoDetector.js");

var PosdFacebookAds = /*#__PURE__*/function (_PosdAdsCandidates) {
  _inherits(PosdFacebookAds, _PosdAdsCandidates);

  function PosdFacebookAds(id, Config, IOManager, AdBlockerAgent) {
    var _this;

    _classCallCheck(this, PosdFacebookAds);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookAds).call(this, id));
    _this.available = false;
    _this.onPageRefreshed = _this.onPageUrlChanged;
    _this.fbConfig = Config.GetFacebookConfig();
    _this.IOManager = IOManager;
    _this.AdBlockerAgent = AdBlockerAgent;
    _this.designVersion = null;
    return _this;
  }

  _createClass(PosdFacebookAds, [{
    key: "onPageUrlChanged",
    value: function onPageUrlChanged(pageUrl, ticketId) {
      var _this2 = this;

      if (this.available) {
        setTimeout(function () {
          _this2.DeactivateDetectors();

          _this2.ActivateDetectors();
        }, 50);
      }
    }
  }, {
    key: "ActivateDetector",
    value: function ActivateDetector(activator) {
      if (activator === PosdConst.ACTIVATION_BY_ADS_MANAGER) {
        this.available = true;
      }

      var versionDetected = false;
      this.fbContent = document.querySelector(this.fbConfig.FB_CONTENT);

      if (this.fbContent) {
        versionDetected = true;
        this.VideoTrafficDetector = new PosdFacebookVideoDetector(this.id);
        this.VideoTrafficDetector.InjectDetector(this.id + '_w', JSON.stringify(this.fbConfig.videoDetectorConfigNew));
      }

      if (versionDetected) {
        this.DetectorRightColumn = new PosdFacebookRightColumn(this.id, this.fbConfig.optionsForDetectorRightColumn, this.AdBlockerAgent, this.fbConfig);
        this.DetectorRightColumn.HideAd = this.HideAd.bind(this);
        this.DetectorRightColumn.CheckIfAdRendered = this.IsAdContentRendered.bind(this);
        this.DetectorRightColumn.ExtractAd = this.ProcessFbCreative.bind(this);
        this.DetectorFeed = new PosdFacebookFeed(this.id, this.fbConfig.optionsForDetectorFeed, this.AdBlockerAgent, this.fbConfig);
        this.DetectorFeed.HideAd = this.HideAd.bind(this);
        this.DetectorFeed.CheckIfAdRendered = this.IsAdContentRendered.bind(this);
        this.DetectorFeed.ExtractAd = this.ProcessFbCreative.bind(this);
        this.DetectorWatch = new PosdFacebookWatch(this.id, this.fbConfig.optionsForDetectorWatch, this.AdBlockerAgent, this.fbConfig);
        this.DetectorWatch.HideAd = this.HideAd.bind(this);
        this.DetectorWatch.CheckIfAdRendered = this.IsAdContentRendered.bind(this);
        this.DetectorWatch.ExtractAd = this.ProcessFbCreative.bind(this);
        this.DetectorMarketplace = new PosdFacebookMarketplace(this.id, this.fbConfig.optionsForDetectorMarketplace, this.AdBlockerAgent, this.fbConfig);
        this.DetectorMarketplace.HideAd = this.HideAd.bind(this);
        this.DetectorMarketplace.CheckIfAdRendered = this.IsAdContentRendered.bind(this);
        this.DetectorMarketplace.ExtractAd = this.ProcessFbCreative.bind(this);
        this.ActivateDetectors();
      }
    }
  }, {
    key: "ActivateDetectors",
    value: function ActivateDetectors() {
      this.DetectorRightColumn.ActivateDetector();
      this.DetectorFeed.ActivateDetector();
      this.DetectorWatch.ActivateDetector();
      this.DetectorMarketplace.ActivateDetector();
    }
  }, {
    key: "DeactivateDetectors",
    value: function DeactivateDetectors() {
      this.DetectorRightColumn.DeactivateDetector();
      this.DetectorFeed.DeactivateDetector();
      this.DetectorWatch.DeactivateDetector();
      this.DetectorMarketplace.DeactivateDetector();
    }
  }, {
    key: "ProcessFbCreative",
    value: function ProcessFbCreative(bisId, hideStyleStr, adPlacementType) {
      try {
        var detected = false;
        var rendered = false;
        var isVideoAd = false;

        if (bisId) {
          var fbAd = document.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_ID, "=").concat(bisId, "]"));

          if (fbAd) {
            detected = true;
            rendered = this.IsAdContentRendered(fbAd, PosdFacebookCommon.GetMinImgsSpacePercentag(this.fbConfig, adPlacementType));

            if (rendered) {
              isVideoAd = this.IsVideoCreative(fbAd);
              PosdContentIOManager.SendFacebookCandidatePlacements(this.id, 1, null);
              var offset = {
                x: 0,
                y: 0
              };

              if (PosdFacebookCommon.IsPostHidden(fbAd)) {
                fbAd.setAttribute(PosdConst.ATTRIBUTE_BIS_SIZE, PosdCommon.ToJSON(PosdFacebookCommon.GetPostContainerSize(fbAd)));
                var leftOffset = fbAd.getAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_LEFT_OFFSET);

                if (leftOffset) {
                  offset.x = parseInt(leftOffset);
                }
              } else {
                PosdCommon.SetFullSizeToElement(fbAd);
              }

              var elements = fbAd.querySelectorAll('*');

              for (var j = 0; j < elements.length; j++) {
                PosdCommon.SetFullSizeToElement(elements[j], null, offset);
              }

              var creatives = [];
              creatives.push(this.BuildCreative(fbAd, isVideoAd, hideStyleStr, adPlacementType));

              if (this.fbConfig.ABOUT_SECTION_CONFIG && this.fbConfig.ABOUT_SECTION_CONFIG.LOAD_ABOUT_PAGE) {
                this.LoadAboutPageAndSendCandidates(creatives);
              } else {
                this.SendFacebookCandidates(creatives);
              }

              if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
                if (this.IsVideoCreative(fbAd)) {
                  fbAd.style.cssText += PosdConst.STYLES_OUTLINE_VIDEO_BANNER;
                } else {
                  fbAd.style.cssText += PosdConst.STYLES_OUTLINE_SUCCESS_DETECT;
                }
              }
            } else {
              if (fbAd.removeAttribute) {
                fbAd.removeAttribute(PosdConst.ATTRIBUTE_BIS_ID);
              }
            }
          }
        }

        if (!detected) {}
      } catch (e) {}
    }
  }, {
    key: "BuildCreative",
    value: function BuildCreative(post, isVideoAd, hideStyleStr, adPlacementType) {
      var postSize = PosdFacebookCommon.GetPostContainerSize(post);
      var links = Array.from(document.querySelectorAll('link'));
      var stylesTags = Array.from(document.querySelector('head').querySelectorAll('style[nonce]'));
      var fullArrayStyles = links.concat(stylesTags);
      var creative = "<html><head><meta charset=\"utf-8\">";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fullArrayStyles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tag = _step.value;
          creative = creative + tag.outerHTML;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      creative = creative + "</head><body style='position:absolute; top:0px; left:0px; width:".concat(postSize.w, "px; height:").concat(postSize.h, "px;'>").concat(post.outerHTML, "</body></html>");

      if (this.AdBlockerAgent.IsEnabledForFacebook()) {
        if (hideStyleStr && hideStyleStr.length && creative.includes(hideStyleStr)) {
          var styleStr = '';
          creative = creative.replace(hideStyleStr, styleStr);
        }
      }

      var aboutPageLink = "";
      var loadAboutPage = false;

      if (this.fbConfig.ABOUT_SECTION_CONFIG && this.fbConfig.ABOUT_SECTION_CONFIG.LOAD_ABOUT_PAGE) {
        loadAboutPage = true;
      }

      if (this.fbConfig && loadAboutPage) {
        if (this.DetectorFeed && adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED) {
          aboutPageLink = this.DetectorFeed.GetAboutPageLink(post);
        } else if (this.DetectorMarketplace && adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE) {
          aboutPageLink = this.DetectorMarketplace.GetAboutPageLink(post);
        } else if (this.DetectorWatch && adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH) {
          aboutPageLink = this.DetectorWatch.GetAboutPageLink(post);
        }
      }

      var creativeObj = {
        content: PosdBase64.encode(creative),
        adPlacementType: adPlacementType,
        designVersion: PosdConst.FACEBOOK_DESIGN_VERSION_NEW,
        aboutPageLink: aboutPageLink,
        aboutSectionContent: "",
        size: postSize
      };

      if (isVideoAd) {
        creativeObj.videoData = {
          videoId: '',
          videoUrl: '',
          audioUrl: ''
        };
      }

      post.setAttribute(PosdConst.ATTRIBUTE_BIS_STATUS, "extracted");
      return creativeObj;
    }
  }, {
    key: "HideAd",
    value: function HideAd(post, postSize, adPlacementType) {
      var cssHideStr = '';

      if (post && postSize) {
        if (post && post.style) {
          if (this.designVersion === PosdConst.FACEBOOK_DESIGN_VERSION_OLD && adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN) {
            var leftOffset = 10000;
            cssHideStr = "position: absolute !important; width: ".concat(postSize.w, "px; overflow: hidden; height: 0px; left: -").concat(leftOffset, "px");
            post.setAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_LEFT_OFFSET, leftOffset);
          } else {
            cssHideStr = "position: absolute !important; width: ".concat(postSize.w, "px; overflow: hidden; height: 0px;");
          }

          if (!PosdFacebookCommon.IsPostHidden(post)) {
            post.style.cssText += cssHideStr;
            post.setAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_HEIGHT, postSize.h);
            post.setAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_WIDTH, postSize.w);
            post.setAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_STATUS, 'hidden');
          }
        }
      }

      return post.style.cssText;
    }
  }, {
    key: "IsAdContentRendered",
    value: function IsAdContentRendered(post, minImgsSpacePercentage) {
      var postSize = PosdFacebookCommon.GetPostContainerSize(post);
      var imgsPercentage = PosdCommon.GetImagesSpacePercentage(this.fbConfig.TAGS_FOR_LOADING_CHECK, post, postSize);

      if (imgsPercentage >= minImgsSpacePercentage) {
        return true;
      }

      var checkedSponsoredTag = post.querySelector("a[".concat(PosdConst.ATTRIBUTE_BIS_LABEL, "]"));

      if (checkedSponsoredTag) {
        checkedSponsoredTag.removeAttribute(PosdConst.ATTRIBUTE_BIS_LABEL);
      }

      return false;
    }
  }, {
    key: "IsVideoCreative",
    value: function IsVideoCreative(creative) {
      if (creative.querySelectorAll('video').length === 0) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "AddNeededStylesForElement",
    value: function AddNeededStylesForElement(element, elementSize) {
      try {
        if (elementSize.w <= 3 && elementSize.h <= 3 && (element.nodeName === 'SPAN' || element.nodeName === 'DIV')) {
          var classAtr = element.getAttribute('class');

          if (classAtr && classAtr.includes('accessible_elem')) {
            var computedStyle = getComputedStyle(element);
            element.setAttribute(PosdConst.ATTRIBUTE_BIS_STYLE, "clip:".concat(computedStyle.getPropertyValue('clip'), "; height:").concat(computedStyle.getPropertyValue('height'), "; overflow:").concat(computedStyle.getPropertyValue('overflow'), "; position:").concat(computedStyle.getPropertyValue('position'), "; white-space:").concat(computedStyle.getPropertyValue('white-space'), "; width:").concat(computedStyle.getPropertyValue('width'), ";"));
          }
        }
      } catch (e) {}
    }
  }, {
    key: "LoadAboutPageAndSendCandidates",
    value: function LoadAboutPageAndSendCandidates(creatives) {
      var _this3 = this;

      if (creatives && creatives.length) {
        var callUrl = creatives[0].aboutPageLink;

        if (callUrl && callUrl.length) {
          fetch(callUrl, {
            headers: this.fbConfig.ABOUT_SECTION_CONFIG.HEADERS,
            method: "GET"
          }).then(function (response) {
            try {
              if (response.status === 200) {
                return response.text();
              } else {
                _this3.SendFacebookCandidates(creatives);
              }
            } catch (error) {}
          }).then(function (data) {
            var aboutSectionContent = "";
            var strs = data.split(/\r?\n/);

            if (strs.length) {
              for (var i = 0; i < strs.length && !aboutSectionContent.length; i++) {
                var regContentCheck = new RegExp(_this3.fbConfig.ABOUT_SECTION_CONFIG.CONTENT_CHECK_STRING);

                if (regContentCheck.test(strs[i])) {
                  aboutSectionContent = strs[i];
                }
              }
            }

            creatives[0].aboutSectionContent = PosdBase64.encode(aboutSectionContent);

            _this3.SendFacebookCandidates(creatives);
          })["catch"](function (e) {
            _this3.SendFacebookCandidates(creatives);
          });
        } else {
          this.SendFacebookCandidates(creatives);
        }
      }
    }
  }, {
    key: "SendFacebookCandidates",
    value: function SendFacebookCandidates(creatives) {
      PosdContentIOManager.SendFacebookCandidates(this.id, creatives, null);

      if (this.AdBlockerAgent.IsEnabledForFacebook()) {
        this.AdBlockerAgent.SetHiddenAmount(creatives.length);
      }
    }
  }]);

  return PosdFacebookAds;
}(PosdAdsCandidates);

module.exports = PosdFacebookAds;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookCommon.js":
/*!**********************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookCommon.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdFacebookCommon = /*#__PURE__*/function () {
  function PosdFacebookCommon() {
    _classCallCheck(this, PosdFacebookCommon);
  }

  _createClass(PosdFacebookCommon, null, [{
    key: "GetVisibleText",
    value: function GetVisibleText(e) {
      var children = e.querySelectorAll(':scope > *');

      if (children.length !== 0) {
        return Array.prototype.slice.call(children).map(PosdFacebookCommon.GetVisibleText).flat();
      }

      if (getComputedStyle(e).display !== 'none') {
        var text = e.innerText;

        try {
          if (text.length === 0 && e.getAttribute) {
            var dataContentAttr = e.getAttribute('data-content');

            if (dataContentAttr && dataContentAttr.length) {
              text = dataContentAttr;
            }
          }
        } catch (e) {}

        return text;
      } else {
        return '';
      }
    }
  }, {
    key: "GetVisibleSpansText",
    value: function GetVisibleSpansText(a, selector) {
      var listAllies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var limit = 3;

      if (a.hasAttribute && a.hasAttribute('bis_sponsor_checked') && a.getAttribute('bis_sponsor_checked') == limit) {
        return '';
      }

      var elms = a.querySelectorAll(selector);
      var fullText = '';
      var currentTry = parseInt(a.getAttribute('bis_sponsor_checked')) || 0;
      elms.forEach(function (e) {
        var eStyles = getComputedStyle(e);

        if (eStyles.display !== 'none' && eStyles.position !== "absolute") {
          try {
            var text = Array.from(e.childNodes).filter(function (node) {
              return node.nodeType === 3;
            }).map(function (node) {
              return node.nodeValue.trim();
            }).reduce(function (acc, value) {
              return acc + value;
            }, '');

            if (text.length === 0 && e.getAttribute) {
              var dataContentAttr = e.getAttribute('data-content');

              if (dataContentAttr && dataContentAttr.length) {
                text = dataContentAttr;
              }
            }

            fullText = fullText + text;
          } catch (e) {}
        }
      });
      a.setAttribute('bis_sponsor_checked', parseInt(currentTry) + 1);

      if (fullText && listAllies.length && !listAllies.includes(fullText)) {
        fullText = this.checkLettersOfAlly(fullText, listAllies);
      }

      return fullText;
    }
  }, {
    key: "checkLettersOfAlly",
    value: function checkLettersOfAlly(text, listAllies) {
      var splitText = text.split('');
      var lastIndexText = splitText.length - 1;
      var maxTries = listAllies.length;
      var currentTry = 1;
      var foundAlly = false;
      var textIndex = 0;
      var ally = '';

      while (!foundAlly && currentTry <= maxTries) {
        var allyIndex = currentTry - 1;
        var currentAlly = listAllies[allyIndex];
        var letter = splitText[textIndex];
        var letterIndex = currentAlly.indexOf(letter);

        if (letterIndex === -1 || currentAlly.length !== splitText.length) {
          currentTry += 1;
          textIndex = 0;
          continue;
        }

        if (lastIndexText !== textIndex) {
          textIndex += 1;
        } else if (lastIndexText === textIndex && text.length === currentAlly.length) {
          foundAlly = true;
          ally = currentAlly;
        } else {
          currentTry += 1;
          textIndex = 0;
        }
      }

      return ally;
    }
  }, {
    key: "HideSateliteSponsoredString",
    value: function HideSateliteSponsoredString(fbConfig, hideCandidates) {
      try {
        if (hideCandidates) {
          hideCandidates.forEach(function (el) {
            if (el.innerText) {
              var visibleText = el.innerText;

              if (fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
                return visibleText.indexOf(sponsoredText) !== -1;
              })) {
                el.style = "display:none";
              }
            }
          });
        }
      } catch (e) {}
    }
  }, {
    key: "GetMinImgsSpacePercentag",
    value: function GetMinImgsSpacePercentag(fbConfig, adPlacementType) {
      if (adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED) {
        return fbConfig.FEED_PAGE.MIN_IMGS_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE) {
        return fbConfig.MARKETPLACE_ADS_CONFIG.MIN_IMGS_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN) {
        return fbConfig.RIGHT_COLUMN_ADS_CONFIG.MIN_IMGS_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH) {
        return fbConfig.FEED_WATCH_PAGE.MIN_IMGS_SPACE_PERCENTAGE;
      }

      return 0;
    }
  }, {
    key: "IsInitiallyRendered",
    value: function IsInitiallyRendered(post, postSize) {
      if (PosdFacebookCommon.IsPostHidden(post)) {
        return true;
      } else {
        if (postSize.w > 0 && postSize.h > 10) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "IsPostHidden",
    value: function IsPostHidden(post) {
      if (post.getAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_STATUS) === 'hidden') {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "GetPostContainerSize",
    value: function GetPostContainerSize(post) {
      var postSize = PosdCommon.GetFullElementSize(post);

      if (PosdFacebookCommon.IsPostHidden(post)) {
        var hideHeight = post.getAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_HEIGHT);

        if (hideHeight) {
          postSize.h = parseInt(hideHeight);
        }

        var hideWidth = post.getAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_WIDTH);

        if (hideWidth) {
          postSize.w = parseInt(hideWidth);
        }

        var leftOffset = post.getAttribute(PosdConst.ATTRIBUTE_BIS_HIDE_LEFT_OFFSET);

        if (leftOffset) {
          postSize.x = postSize.x + parseInt(leftOffset);
          postSize.abs_x = postSize.abs_x + parseInt(leftOffset);
        }
      }

      return postSize;
    }
  }]);

  return PosdFacebookCommon;
}();

module.exports = PosdFacebookCommon;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookFeed.js":
/*!********************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookFeed.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdAdDetector = __webpack_require__(/*! ../AdDetector */ "./src/content/detectors/AdDetector.js");

var PosdFacebookCommon = __webpack_require__(/*! ./FacebookCommon */ "./src/content/detectors/Facebook/FacebookCommon.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdFacebookFeed = /*#__PURE__*/function (_PosdAdDetector) {
  _inherits(PosdFacebookFeed, _PosdAdDetector);

  function PosdFacebookFeed(id, options, AdBlockerAgent, fbConfig, designVersion) {
    var _this;

    _classCallCheck(this, PosdFacebookFeed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookFeed).call(this, id, options, AdBlockerAgent));
    _this.fbConfig = fbConfig;
    _this.designVersion = designVersion;
    _this.fbFeed = null;
    _this.fbFeedObserver = null;
    return _this;
  }

  _createClass(PosdFacebookFeed, [{
    key: "ActualizeDetector",
    value: function ActualizeDetector() {
      if (!this.isValidUrl) {
        return;
      }

      var result = false;
      var feed = this.FeedContainer;

      if (feed && this.isValidUrl) {
        result = true;
      }

      return result;
    }
  }, {
    key: "ActivateMutationObserver",
    value: function ActivateMutationObserver() {
      var _this2 = this;

      if (!this.isValidUrl) {
        return;
      }

      this.fbFeed = this.FeedContainer;

      if (this.fbFeed) {
        if (!this.fbFeedObserver) {
          this.fbFeedObserver = new MutationObserver(this.DetectCandidates.bind(this, PosdConst.AD_DETECTOR_INITIATOR_MUTATION));
          this.fbFeedObserver.observe(this.fbFeed, {
            childList: true,
            subtree: true
          });
          window.addEventListener('beforeunload', function () {
            if (_this2.fbFeedObserver) {
              _this2.fbFeedObserver.disconnect();

              _this2.fbFeedObserver = null;
            }
          });
        }
      } else {}

      return this.fbFeedObserver;
    }
  }, {
    key: "DeactivateMutationObserver",
    value: function DeactivateMutationObserver() {
      if (this.fbFeedObserver) {
        this.fbFeedObserver.disconnect();
        this.fbFeedObserver = null;
      }
    }
  }, {
    key: "Detector",
    value: function Detector() {
      if (!this.isValidUrl) {
        return;
      }

      var fbFeed = this.FeedContainer;

      if (fbFeed) {
        var posts = Array.from(fbFeed.children);

        if (!posts.length || posts.length === 1) {
          posts = document.querySelectorAll(this.fbConfig.FEED_PAGE.POSTS_QUERY);
        }

        if (!posts) {
          return;
        }

        for (var i = 0; i < posts.length; i++) {
          var post = posts[i];
          var postSize = PosdCommon.GetElementSize(post);

          if (!post.hasAttribute(PosdConst.ATTRIBUTE_BIS_ID) && PosdFacebookCommon.IsInitiallyRendered(post, postSize)) {
            if (this.CheckIfAdRendered(post, PosdFacebookCommon.GetMinImgsSpacePercentag(this.fbConfig, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED))) {
              if (this.CheckIfAd(post)) {
                if (this.AdBlockerAgent.IsEnabledForFacebook()) {
                  var hideStyleStr = this.HideAd(posts[i], postSize, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED);
                }

                this.addCoverImageSrcAttribute(post);
                var bisId = PosdCommon.GenerateAndSetBisIdToFBAds(post);
                var timeout = this.options.extractAdStaticPartTimeoutMs + PosdCommon.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                this.AddHiddenTextTags(post);
                setTimeout(this.ReadyToExtractAd.bind(this, bisId, hideStyleStr), timeout);
              }
            }
          }
        }
      } else {}
    }
  }, {
    key: "ReadyToExtractAd",
    value: function ReadyToExtractAd(bisId, hideStyleStr) {
      try {
        if (bisId) {
          var fbAd = document.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_ID, "=").concat(bisId, "]"));
          var sponsoredBlock = fbAd.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_LABEL, "=\"fb_feed_ad\"]"));

          if (fbAd && sponsoredBlock) {
            this.ExtractAd(bisId, hideStyleStr, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED);
          } else {
            sponsoredBlock.removeAttribute(PosdConst.ATTRIBUTE_BIS_ID);
            fbAd.removeAttribute(PosdConst.ATTRIBUTE_BIS_ID);
          }
        }
      } catch (e) {}
    }
  }, {
    key: "CheckIfAd",
    value: function CheckIfAd(post) {
      var queries = this.fbConfig.POSSIBLE_SPONSORED_TEXT_QUERIES;
      var result = false;

      for (var i = 0; i < queries.length && !result; i++) {
        var query = queries[i];
        var links = post.querySelectorAll(query);

        for (var _i = 0; _i < links.length && !result; _i++) {
          var link = links[_i];
          var text = link.innerText;

          if (typeof text === 'undefined' && link.tagName === 'use' && link.hasAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)) {
            var attrValue = link.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG);
            var svgAdTitleElement = document.querySelector(attrValue);

            if (svgAdTitleElement) {
              text = svgAdTitleElement.textContent;
            } else {
              text = '';
            }
          }

          var attrText = link.getAttribute(this.options.attributeWithSponsorAlly);
          var argumentsToCheck = attrText ? [text, attrText] : text;

          if (typeof text === "string" && text.length && this.isTagSponsored(argumentsToCheck)) {
            link.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, 'fb_feed_ad');
            result = true;
          } else if (text.length >= 2 && !link.hasAttribute(PosdConst.ATTRIBUTE_BIS_LABEL)) {
            var deepText = PosdFacebookCommon.GetVisibleSpansText(link, this.fbConfig.VISIBLE_SPANS_TEXT, this.fbConfig.SPONSORED_TEXTS);

            if (deepText !== text && deepText !== attrText) {
              if (typeof deepText === "string" && deepText.length && this.isTagSponsored(deepText)) {
                link.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, 'fb_feed_ad');
                result = true;
              }
            }
          }
        }
      }

      return result;
    }
  }, {
    key: "AddHiddenTextTags",
    value: function AddHiddenTextTags(post) {
      var allUse = post.querySelectorAll('svg>use');

      if (!allUse) {
        return;
      }

      for (var i = 0; i < allUse.length; i++) {
        var useTag = allUse[i];
        var parentUse = useTag.parentElement;
        var attrValue = useTag.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG);
        var svgAdTitleElement = document.querySelector(attrValue);
        var cloneSvgText = svgAdTitleElement.cloneNode(true);
        cloneSvgText.style.display = 'none';
        cloneSvgText.id = cloneSvgText.id + '_bis';

        if (parentUse) {
          parentUse.appendChild(cloneSvgText);
        }
      }
    }
  }, {
    key: "isTagSponsored",
    value: function isTagSponsored(text) {
      var _this3 = this;

      var result = false;

      if (!text) {
        return result;
      }

      if (typeof text === 'string') {
        result = this.fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
          return text === sponsoredText;
        });
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var i = _step.value;
            result = _this3.fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
              return i === sponsoredText;
            });

            if (result) {
              return "break";
            }
          };

          for (var _iterator = text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = _loop();

            if (_ret === "break") break;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return result;
    }
  }, {
    key: "GetAboutPageLink",
    value: function GetAboutPageLink(post) {
      var aboutPageLink = '';
      var aboutSectionConfig = this.fbConfig.ABOUT_SECTION_CONFIG;
      var sponsEl = post.querySelector("*[".concat(PosdConst.ATTRIBUTE_BIS_LABEL, "='fb_feed_ad']"));
      var links = post.querySelectorAll(aboutSectionConfig.QUERY_ABOUT_PAGE_HREF);

      if (sponsEl && links && links.length) {
        var url = '';
        var sponsElTop = sponsEl.getBoundingClientRect().top;
        var minTopDif = sponsElTop - post.getBoundingClientRect().top;

        var _loop2 = function _loop2(i) {
          var checkForBadWords = aboutSectionConfig.ABOUT_PAGE_BAD_WORDS_MATCHES.some(function (word) {
            return links[i].href.indexOf(word) > -1;
          });

          if (checkForBadWords) {
            return "continue";
          }

          var linkSize = links[i].getBoundingClientRect();

          if (links[i].href && linkSize.top <= sponsElTop) {
            if (sponsElTop - linkSize.top < minTopDif) {
              minTopDif = sponsElTop - linkSize.top;
              url = links[i].href;
            }
          }
        };

        for (var i = 0; i < links.length; i++) {
          var _ret2 = _loop2(i);

          if (_ret2 === "continue") continue;
        }

        if (url.length) {
          var urlpath = url.substring(aboutSectionConfig.HREF_PREFIX.length, url.length);
          aboutPageLink = aboutSectionConfig.ABOUT_PAGE_TEMPLATE.replace('%1', urlpath.substring(0, urlpath.search(/(\/|\?)/)));
        }
      }

      return aboutPageLink;
    }
  }, {
    key: "addCoverImageSrcAttribute",
    value: function addCoverImageSrcAttribute(card) {
      var img = card.querySelector(this.fbConfig.FEED_PAGE.COVER_IMAGE_QUERY);

      if (img && img.hasAttribute('src')) {
        var imgSrc = img.getAttribute('src').replace(/amp;/g, '');
        card.setAttribute('data-cover-image-src', imgSrc);
      }
    }
  }, {
    key: "FeedContainer",
    get: function get() {
      var minHeight = this.fbConfig.FEED_PAGE.MIN_HEIGHT;
      var queries = this.fbConfig.FEED_PAGE.FEED_QUERIES;
      var queriesLength = queries.length;
      var isFound = false;
      var feed = null;

      for (var i = 0; i < queriesLength && !isFound; i++) {
        var query = queries[i];
        var queryBlock = document.querySelector(query);

        if (queryBlock) {
          var blockHeight = queryBlock.offsetHeight;

          if (queryBlock.children.length > 2 && blockHeight > minHeight) {
            feed = queryBlock;
            isFound = true;
          } else if (queryBlock.nodeName.search(/span/i) > -1) {
            var nextSiblingFbFeed = queryBlock.nextElementSibling;

            if (nextSiblingFbFeed && nextSiblingFbFeed.children) {
              var nextSiblingHeight = nextSiblingFbFeed.offsetHeight;

              if (nextSiblingFbFeed.children.length === 1 && !!nextSiblingFbFeed.querySelector('h3')) {
                feed = nextSiblingFbFeed.querySelector('h3').parentElement;
                isFound = true;
              } else if (nextSiblingFbFeed.children.length === 2) {
                queryBlock = nextSiblingFbFeed.querySelector('div:not([class])');

                if (queryBlock && queryBlock.offsetHeight > minHeight) {
                  feed = queryBlock;
                  isFound = true;
                }
              } else if (nextSiblingFbFeed.children.length > 1 && nextSiblingHeight > minHeight) {
                feed = nextSiblingFbFeed;
                isFound = true;
              }
            }
          }
        }
      }

      return feed;
    }
  }, {
    key: "isValidUrl",
    get: function get() {
      var invalidPaths = this.fbConfig.FEED_PAGE.INVALID_PATHS;
      return !invalidPaths.some(function (path) {
        return window.location.href.includes(path);
      });
    }
  }]);

  return PosdFacebookFeed;
}(PosdAdDetector);

module.exports = PosdFacebookFeed;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookMarketplace.js":
/*!***************************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookMarketplace.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdAdDetector = __webpack_require__(/*! ../AdDetector */ "./src/content/detectors/AdDetector.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdFacebookCommon = __webpack_require__(/*! ./FacebookCommon */ "./src/content/detectors/Facebook/FacebookCommon.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdFacebookMarketplace = /*#__PURE__*/function (_PosdAdDetector) {
  _inherits(PosdFacebookMarketplace, _PosdAdDetector);

  function PosdFacebookMarketplace(id, options, AdBlockerAgent, fbConfig) {
    var _this;

    _classCallCheck(this, PosdFacebookMarketplace);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookMarketplace).call(this, id, options, AdBlockerAgent));
    _this.fbConfig = fbConfig;
    _this.fbMarketplace = null;
    _this.fbMarketplaceObserver = null;
    return _this;
  }

  _createClass(PosdFacebookMarketplace, [{
    key: "ActualizeDetector",
    value: function ActualizeDetector() {
      var result = false;

      if (this.MainContainer) {
        result = true;
      }

      return result;
    }
  }, {
    key: "ActivateMutationObserver",
    value: function ActivateMutationObserver() {
      var _this2 = this;

      this.fbMarketplace = this.MainContainer;

      if (this.fbMarketplace) {
        if (!this.fbMarketplaceObserver) {
          this.fbMarketplaceObserver = new MutationObserver(this.DetectCandidates.bind(this, PosdConst.AD_DETECTOR_INITIATOR_MUTATION));
          this.fbMarketplaceObserver.observe(this.fbMarketplace, {
            childList: true,
            subtree: true
          });
          window.addEventListener('beforeunload', function () {
            if (_this2.fbMarketplaceObserver) {
              _this2.fbMarketplaceObserver.disconnect();

              _this2.fbMarketplaceObserver = null;
            }
          });
        }
      } else {}

      return this.fbMarketplaceObserver;
    }
  }, {
    key: "DeactivateMutationObserver",
    value: function DeactivateMutationObserver() {
      if (this.fbMarketplaceObserver) {
        this.fbMarketplaceObserver.disconnect();
        this.fbMarketplaceObserver = null;
      }
    }
  }, {
    key: "Detector",
    value: function Detector() {
      var cards = this.MainContainer.querySelectorAll(this.fbConfig.MARKETPLACE_ADS_CONFIG.CARDS);

      if (cards && cards.length) {
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var cardSize = PosdCommon.GetElementSize(card);

          if (!card.hasAttribute(PosdConst.ATTRIBUTE_BIS_ID) && PosdFacebookCommon.IsInitiallyRendered(card, cardSize)) {
            if (this.CheckIfAd(card)) {
              if (this.AdBlockerAgent.IsEnabledForFacebook()) {
                PosdFacebookCommon.HideSateliteSponsoredString(this.fbConfig, document.querySelectorAll(this.fbConfig.MARKETPLACE_ADS_CONFIG.SATELITE_SPONSORED_STRING));
                var hideStyleStr = this.HideAd(card, cardSize, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE);
              }

              if (this.CheckIfAdRendered(card, PosdFacebookCommon.GetMinImgsSpacePercentag(this.fbConfig, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE))) {
                this.addCoverImageSrcAttribute(card);
                var bisId = PosdCommon.GenerateAndSetBisIdToFBAds(card);
                var timeout = this.options.extractAdStaticPartTimeoutMs + PosdCommon.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                setTimeout(this.ExtractAd.bind(this, bisId, hideStyleStr, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE), timeout);
              }
            }
          }
        }
      }
    }
  }, {
    key: "addCoverImageSrcAttribute",
    value: function addCoverImageSrcAttribute(card) {
      var img = card.querySelector(this.fbConfig.MARKETPLACE_ADS_CONFIG.COVER_IMAGE_QUERY);

      if (img && img.hasAttribute('src')) {
        var imgSrc = img.getAttribute('src').replace(/amp;/g, '');
        card.setAttribute('data-cover-image-src', imgSrc);
      }
    }
  }, {
    key: "ReadyToExtractAd",
    value: function ReadyToExtractAd(bisId, hideStyleStr) {
      try {
        if (bisId) {
          var fbAd = document.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_ID, "=").concat(bisId, "]"));

          if (fbAd) {
            if (PosdFacebookCommon.IsPostHidden(fbAd)) {
              fbAd.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, "style");
            }

            this.ExtractAd(bisId, hideStyleStr, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE);
          }
        }
      } catch (e) {}
    }
  }, {
    key: "CheckIfAd",
    value: function CheckIfAd(candidate) {
      var _this3 = this;

      var isAd = false;

      if (candidate && this.MainContainer) {
        var candidateCoordinates = candidate.getBoundingClientRect();
        var sponsorBlocks = Array.from(this.MainContainer.querySelectorAll(this.fbConfig.MARKETPLACE_ADS_CONFIG.SPONSOR_BLOCKS));

        if (sponsorBlocks && sponsorBlocks.length) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = sponsorBlocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var sponsorBlock = _step.value;
              var sponsorCoordinates = sponsorBlock.getBoundingClientRect();

              if (sponsorCoordinates.x === candidateCoordinates.x) {
                var _ret = function () {
                  var deepText = PosdFacebookCommon.GetVisibleSpansText(sponsorBlock, _this3.fbConfig.VISIBLE_SPANS_TEXT, _this3.fbConfig.SPONSORED_TEXTS);

                  var checkDeepText = _this3.fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
                    return deepText.indexOf(sponsoredText) !== -1;
                  });

                  if (checkDeepText) {
                    candidate.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, 'fb_marketplace_ad');
                    isAd = true;
                    return "break";
                  }
                }();

                if (_ret === "break") break;
              } else if (this.fbConfig.MARKETPLACE_ADS_CONFIG.PREV_SIBLING_SPONSOR_BLOCK_QUERY_PATH) {
                var prevSiblingSponsorBlock = candidate;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = this.fbConfig.MARKETPLACE_ADS_CONFIG.PREV_SIBLING_SPONSOR_BLOCK_QUERY_PATH[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var path = _step2.value;

                    if (prevSiblingSponsorBlock[path]) {
                      prevSiblingSponsorBlock = prevSiblingSponsorBlock[path];
                    } else if (path.includes(',')) {
                      var funcParams = path.split(',');
                      prevSiblingSponsorBlock = prevSiblingSponsorBlock[funcParams[0]](funcParams[1]);
                    }
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }

                if (prevSiblingSponsorBlock) {
                  var _ret2 = function () {
                    var deepText = PosdFacebookCommon.GetVisibleSpansText(prevSiblingSponsorBlock, _this3.fbConfig.VISIBLE_SPANS_TEXT, _this3.fbConfig.SPONSORED_TEXTS);

                    var checkDeepText = _this3.fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
                      return deepText.indexOf(sponsoredText) !== -1;
                    });

                    if (checkDeepText) {
                      candidate.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, 'fb_marketplace_ad');
                      isAd = true;
                      return "break";
                    }
                  }();

                  if (_ret2 === "break") break;
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }

      return isAd;
    }
  }, {
    key: "GetAboutPageLink",
    value: function GetAboutPageLink(post) {
      var aboutPageLink = '';
      var aboutSectionConfig = this.fbConfig.ABOUT_SECTION_CONFIG;
      var sponsEl = post.querySelector("*[".concat(PosdConst.ATTRIBUTE_BIS_LABEL, "='fb_marketplace_ad']"));
      var links = post.querySelectorAll("a[href^='".concat(aboutSectionConfig.HREF_PREFIX, "'"));

      if (sponsEl && links && links.length) {
        var url = '';
        var sponsElTop = sponsEl.getBoundingClientRect().top;
        var minTopDif = sponsElTop - post.getBoundingClientRect().top;

        for (var i = 0; i < links.length; i++) {
          var linkSize = links[i].getBoundingClientRect();

          if (links[i].href && linkSize.top < sponsElTop) {
            if (sponsElTop - linkSize.top < minTopDif) {
              minTopDif = sponsElTop - linkSize.top;
              url = links[i].href;
            }
          }
        }

        if (url.length) {
          var urlpath = url.substring(aboutSectionConfig.HREF_PREFIX.length, url.length);
          aboutPageLink = aboutSectionConfig.ABOUT_PAGE_TEMPLATE.replace('%1', urlpath.substring(0, urlpath.search(/(\/|\?)/)));
        }
      }

      return aboutPageLink;
    }
  }, {
    key: "MainContainer",
    get: function get() {
      return document.querySelector(this.fbConfig.MARKETPLACE_ADS_CONFIG.CONTAINER);
    }
  }]);

  return PosdFacebookMarketplace;
}(PosdAdDetector);

module.exports = PosdFacebookMarketplace;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookRightColumn.js":
/*!***************************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookRightColumn.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdAdDetector = __webpack_require__(/*! ../AdDetector */ "./src/content/detectors/AdDetector.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdFacebookCommon = __webpack_require__(/*! ./FacebookCommon */ "./src/content/detectors/Facebook/FacebookCommon.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdConfig = __webpack_require__(/*! ../../../config */ "./src/config.js");

var PosdFacebookRightColumn = /*#__PURE__*/function (_PosdAdDetector) {
  _inherits(PosdFacebookRightColumn, _PosdAdDetector);

  function PosdFacebookRightColumn(id, options, AdBlockerAgent, fbConfig, designVersion) {
    var _this;

    _classCallCheck(this, PosdFacebookRightColumn);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookRightColumn).call(this, id, options, AdBlockerAgent));
    _this.fbConfig = fbConfig;
    _this.designVersion = designVersion;
    _this.fbRightColumn = null;
    _this.fbRightColumnObserver = null;
    return _this;
  }

  _createClass(PosdFacebookRightColumn, [{
    key: "ActualizeDetector",
    value: function ActualizeDetector() {
      var result = false;

      if (document.querySelector(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.CONTAINER)) {
        result = true;
      }

      return result;
    }
  }, {
    key: "ActivateMutationObserver",
    value: function ActivateMutationObserver() {
      var _this2 = this;

      this.fbRightColumn = document.querySelector(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.CONTAINER);

      if (this.fbRightColumn) {
        if (!this.fbRightColumnObserver) {
          this.fbRightColumnObserver = new MutationObserver(this.DetectCandidates.bind(this, PosdConst.AD_DETECTOR_INITIATOR_MUTATION));
          this.fbRightColumnObserver.observe(this.fbRightColumn, {
            childList: true,
            subtree: true
          });
          window.addEventListener('beforeunload', function () {
            if (_this2.fbRightColumnObserver) {
              _this2.fbRightColumnObserver.disconnect();

              _this2.fbRightColumnObserver = null;
            }
          });
        }
      } else {}

      return this.fbRightColumnObserver;
    }
  }, {
    key: "DeactivateMutationObserver",
    value: function DeactivateMutationObserver() {
      if (this.fbRightColumnObserver) {
        this.fbRightColumnObserver.disconnect();
        this.fbRightColumnObserver = null;
      }
    }
  }, {
    key: "Detector",
    value: function Detector() {
      var cards = document.querySelectorAll(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.CARDS);

      if (cards && cards.length) {
        for (var i = 0; i < cards.length; i++) {
          var cardSize = PosdCommon.GetElementSize(cards[i]);

          if (PosdFacebookCommon.IsInitiallyRendered(cards[i], cardSize)) {
            if (!cards[i].hasAttribute(PosdConst.ATTRIBUTE_BIS_ID)) {
              if (this.CheckIfAd(cards[i])) {
                if (this.AdBlockerAgent.IsEnabledForFacebook()) {
                  PosdFacebookCommon.HideSateliteSponsoredString(this.fbConfig, document.querySelectorAll(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.SATELITE_SPONSORED_STRING));
                  var hideStyleStr = this.HideAd(cards[i], cardSize, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN);
                }

                if (this.CheckIfAdRendered(cards[i], PosdFacebookCommon.GetMinImgsSpacePercentag(this.fbConfig, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN, this.designVersion))) {
                  var bisId = PosdCommon.GenerateAndSetBisIdToFBAds(cards[i]);
                  var timeout = this.options.extractAdStaticPartTimeoutMs + PosdCommon.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                  setTimeout(this.ExtractAd.bind(this, bisId, hideStyleStr, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN), timeout);
                }
              }
            } else {
              if (this.CheckIfAdRotated(cards[i]) && cards[i].removeAttribute) {
                cards[i].removeAttribute(PosdConst.ATTRIBUTE_BIS_ID);
                cards[i].removeAttribute(PosdConst.ATTRIBUTE_BIS_SIZE);
                cards[i].removeAttribute(PosdConst.ATTRIBUTE_BIS_STATUS);

                if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
                  if (cards[i].style.cssText === 'border: 6px solid green !important;') {
                    cards[i].style.cssText = '';
                  }
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "CheckIfAd",
    value: function CheckIfAd(candidate) {
      var _this3 = this;

      var isAd = false;
      var adTags = Array.from(candidate.querySelectorAll(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.IF_AD)).filter(function (tag) {
        var tagHref = tag.href;
        var badValue = _this3.fbConfig.RIGHT_COLUMN_ADS_CONFIG.IMPOSSIBLE_HREF_REG_FOR_AD;

        if (tagHref.indexOf(badValue) === -1) {
          return true;
        }
      });

      if (candidate && adTags.length) {
        isAd = true;
      }

      return isAd;
    }
  }, {
    key: "CheckIfAdRotated",
    value: function CheckIfAdRotated(card) {
      var rotated = false;

      if (card && card.getAttribute(PosdConst.ATTRIBUTE_BIS_STATUS) === "extracted") {
        var elementsWithBisSize = 0;
        var elementsWithoutBisSize = 0;
        var persentWithout = 0;
        var elements = card.querySelectorAll('*');

        if (elements && elements.length) {
          elements.forEach(function (el) {
            if (el.getAttribute(PosdConst.ATTRIBUTE_BIS_SIZE)) {
              elementsWithBisSize = elementsWithBisSize + 1;
            } else {
              elementsWithoutBisSize = elementsWithoutBisSize + 1;
            }
          });

          if (elementsWithBisSize === 0 && elementsWithoutBisSize > 0) {
            rotated = true;
          } else if (elementsWithBisSize > 0 && elementsWithoutBisSize > 0) {
            persentWithout = elementsWithoutBisSize / elements.length * 100 | 0;

            if (persentWithout > 50) {
              rotated = true;
            }
          }
        }
      }

      return rotated;
    }
  }]);

  return PosdFacebookRightColumn;
}(PosdAdDetector);

module.exports = PosdFacebookRightColumn;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookVideoDetector.js":
/*!*****************************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookVideoDetector.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdFacebookVideoDetector = /*#__PURE__*/function () {
  function PosdFacebookVideoDetector(id) {
    _classCallCheck(this, PosdFacebookVideoDetector);

    this.id = id;
  }

  _createClass(PosdFacebookVideoDetector, [{
    key: "InjectDetector",
    value: function InjectDetector(id, config) {
      var script = document.createElement('script');

      if (script && script.setAttribute) {
        script.setAttribute('bis_use', 'true');
      }

      script.innerHTML = PosdFacebookVideoDetector.SendVideoData.toString() + "(" + function (id, config) {
        var PARSER_TYPE = {
          SCRIPT: 'SCRIPT',
          IFRAME: 'IFRAME',
          STREAM: 'STREAM',
          XML_HTTP_REQUEST: 'XML_HTTP_REQUEST',
          INSTREAM_CONFIG: 'INSTREAM_CONFIG',
          MARKETPLACE_VIDEO_AD: 'MARKETPLACE_VIDEO_AD',
          FEED_VIDEO_AD: 'FEED_VIDEO_AD'
        };

        var buildVideoData = function buildVideoData(videoId, videoUrl) {
          var audioUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          var thumbnail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
          var linkDisplay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
          var userName = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
          var adName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
          var adLogo = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
          var videoData = {
            detectionTime: Date.now() / 1000 | 0,
            videoId: videoId,
            videoUrl: videoUrl,
            previewImageUrl: thumbnail,
            audioUrl: audioUrl,
            linkDisplay: linkDisplay,
            userName: userName,
            adName: adName,
            adLogo: adLogo
          };
          return videoData;
        };

        var cutTextBetween = function cutTextBetween(text, selector) {
          var selectorReg = new RegExp(selector, 'i');
          var matchValue = text.match(selectorReg);

          if (!matchValue) {
            return false;
          }

          var filtredValues = matchValue.filter(function (val) {
            return val;
          });
          var result = filtredValues[1] ? filtredValues[1] : false;
          return result;
        };

        var findParserAndParse = function findParserAndParse(text) {
          var parserType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var parsers = parserType ? config.PARSERS.filter(function (parser) {
            return parser.TYPE === parserType;
          }) : config.PARSERS;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var parser = _step.value;
              var needParse = parser.CHECKER.every(function (item) {
                return text.includes(item);
              });

              if (needParse) {
                if (parserType === PARSER_TYPE.INSTREAM_CONFIG) {
                  setTimeout(function () {
                    return parseInStream(parser, text, url);
                  }, 0);
                  return "break";
                } else if (parserType === PARSER_TYPE.MARKETPLACE_VIDEO_AD) {
                  setTimeout(function () {
                    return parseMarketplaceVideo(parser, text);
                  }, 0);
                  return "break";
                } else if (parserType === PARSER_TYPE.FEED_VIDEO_AD) {
                  setTimeout(function () {
                    return parseFeedVideoAd(parser, text);
                  }, 0);
                  return "break";
                } else {
                  setTimeout(function () {
                    return parseText(parser, text);
                  }, 0);
                  return "break";
                }
              }
            };

            for (var _iterator = parsers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _ret = _loop();

              if (_ret === "break") break;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        };

        var parseFeedVideoAd = function parseFeedVideoAd(parser, data) {
          try {
            var parsedData = "".concat(data).replace(/\}(\r\n| |)\{/g, '}BIS_SEPARATOR{').split(/BIS\_SEPARATOR/g);
            var checkers = parser.CHECKER;
            parsedData = parsedData.filter(function (chunk) {
              return checkers.every(function (el) {
                var reg = new RegExp(el, 'i');
                return reg.test(chunk);
              });
            });
            var queueArr = [];

            if (parsedData.length) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = parsedData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var chunk = _step2.value;
                  var chunkObject = chunk;

                  if (typeof chunk === 'string') {
                    chunkObject = JSON.parse(chunk);
                  } // const audioUrl = getAudioUrl(chunkObject, parser);


                  var videoUrl = getVideoUrl(chunkObject, parser);
                  var thumbnail = getThumbnail(chunkObject, parser);
                  var videoId = getVideoId(chunkObject, parser);
                  var userName = getValueByPath(chunkObject, parser.PATH_USER_NAME);
                  var videoData = buildVideoData(videoId, videoUrl, '', thumbnail, '', userName);

                  if (videoId && videoUrl) {
                    queueArr.push(videoData);
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              queueArr.forEach(function (el) {
                setTimeout(asyncSendVideoData(el, 'FACEBOOK_VIDEO_DATA'), 0);
              });
            }
          } catch (err) {}
        };

        var parseInStream = function parseInStream(parser, data, url) {
          var parsedData = [];
          var queueDatas = [];

          try {
            parsedData.push(JSON.parse(data));
            var videoData = {
              url: url,
              requestMethod: 'POST',
              content: parsedData
            };
            setTimeout(asyncSendVideoData(videoData, 'FACEBOOK_INSTREAM_DATA'), 0);
          } catch (err) {
            parsedData = "".concat(data).replace(/\}(\r\n| )\{/g, '}BIS_SEPARATOR{').split(/BIS\_SEPARATOR/g);
            parsedData.forEach(function (el, i) {
              if (el.length <= 3) {
                return;
              }

              var data = JSON.parse(el);
              var nodeData = data;
              var extData = data;
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = parser.PATH_NODES[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var prop = _step3.value;
                  var idx = parser.PATH_NODES.indexOf(prop);
                  var lastIndex = parser.PATH_NODES.length - 1;

                  if (idx !== lastIndex && nodeData[prop]) {
                    nodeData = nodeData[prop];
                  }

                  if (idx === lastIndex && nodeData[prop]) {
                    nodeData = nodeData[prop];

                    if (nodeData.length) {
                      nodeData.forEach(function (d) {
                        d.bisLinks = {
                          aboutPageLink: getUserAboutPage(d, parser.PATH_USER_ID)
                        };
                        d.video_id = getVideoIdInstream(d, parser.PATH_VIDEO_ID);
                        queueDatas.push(d);
                      });
                    } else {
                      nodeData.bisLinks = {
                        aboutPageLink: getUserAboutPage(nodeData, parser.PATH_USER_ID)
                      };
                      nodeData.video_id = getVideoIdInstream(nodeData, parser.PATH_VIDEO_ID);
                      queueDatas.push(nodeData);
                    }
                  }
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                    _iterator3["return"]();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = parser.PATH_ALL_VIDEO[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var _prop = _step4.value;

                  var _idx = parser.PATH_ALL_VIDEO.indexOf(_prop);

                  var _lastIndex = parser.PATH_ALL_VIDEO.length - 1;

                  if (_idx !== _lastIndex && extData[_prop]) {
                    extData = extData[_prop];
                  }

                  if (_idx === _lastIndex && extData[_prop]) {
                    extData = extData[_prop];

                    if (extData.length) {
                      extData.forEach(function (d, j) {
                        var qData = queueDatas[j];

                        if (qData.video_id === d.video_id) {
                          qData.video_dash_prefetch_representations = d;
                        }
                      });
                    } else if (queueDatas.length === 1) {
                      var qData = queueDatas[0];

                      if (qData.video_id === extData.video_id) {
                        qData.video_dash_prefetch_representations = extData;
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            });
          }

          queueDatas.forEach(function (el) {
            var videoData = {
              url: url,
              requestMethod: 'POST',
              content: el
            };
            setTimeout(asyncSendVideoData(videoData, 'FACEBOOK_INSTREAM_DATA'), 0);
          });
          return;
        };

        var getVideoIdInstream = function getVideoIdInstream(data, path) {
          var filteredData = data;
          var videoId = null;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = path[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var prop = _step5.value;
              var idx = path.indexOf(prop);
              var lastIndex = path.length - 1;

              if (idx !== lastIndex && filteredData[prop]) {
                filteredData = filteredData[prop];
              }

              if (idx === lastIndex && filteredData[prop]) {
                videoId = filteredData[prop];
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          return parseInt(videoId, 10);
        };

        var getUserAboutPage = function getUserAboutPage(data, path) {
          var filteredData = data;
          var aboutPageUrl = null;
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = path[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var prop = _step6.value;
              var idx = path.indexOf(prop);
              var lastIndex = path.length - 1;

              if (idx !== lastIndex && filteredData[prop]) {
                filteredData = filteredData[prop];
              }

              if (idx === lastIndex && filteredData[prop]) {
                aboutPageUrl = "https://www.facebook.com/".concat(filteredData[prop], "/about");
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          return aboutPageUrl;
        };

        var parseText = function parseText(parser, text) {
          var savedText = text;
          text = text.replace(/ /g, '');
          var videoId = cutTextBetween(text, parser.VIDEO_ID);

          if (!videoId) {
            return;
          }

          var hdSrc = null;
          var sdSrc = null;
          var audioUrl = '';
          var thumbnail = '';
          var linkDisplay = '';

          if (parser.VIDEO_HD_URL) {
            hdSrc = cutTextBetween(text, parser.VIDEO_HD_URL);
          }

          if (parser.VIDEO_SD_URL) {
            sdSrc = cutTextBetween(text, parser.VIDEO_SD_URL);
          }

          if (parser.LINK_DISPLAY) {
            linkDisplay = cutTextBetween(text, parser.LINK_DISPLAY);
          }

          if (config.VIDEO_AUDIO_URL) {
            audioUrl = cutTextBetween(text, parser.VIDEO_AUDIO_URL);
            audioUrl = audioUrl ? audioUrl.split('\\').join('') : audioUrl;
          }

          if (parser.THUMBNAIL) {
            thumbnail = cutTextBetween(text, parser.THUMBNAIL);
            thumbnail = thumbnail ? thumbnail.split('\\').join('') : thumbnail;
          }

          var videoUrl = sdSrc ? sdSrc : hdSrc;

          if (videoUrl) {
            videoUrl = videoUrl.split('\\').join('');
            var videoData = buildVideoData(videoId, videoUrl, audioUrl, thumbnail, linkDisplay);
            setTimeout(asyncSendVideoData(videoData, 'FACEBOOK_VIDEO_DATA'), 0);
          }
        };

        var parseMarketplaceVideo = function parseMarketplaceVideo(parser, data) {
          try {
            var parsedData = "".concat(data).replace(/\}(\r\n| |)\{/g, '}BIS_SEPARATOR{').split(/BIS\_SEPARATOR/g);
            var checkers = parser.CHECKER;
            parsedData = parsedData.filter(function (chunk) {
              return checkers.every(function (el) {
                var reg = new RegExp(el);
                return reg.test(chunk);
              });
            });
            var queueArr = [];

            if (parsedData.length) {
              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = parsedData[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var chunk = _step7.value;
                  var chunkObject = chunk;

                  if (typeof chunk === 'string') {
                    chunkObject = JSON.parse(chunk);
                  }

                  var audioUrl = getAudioUrl(chunkObject, parser);
                  var videoUrl = getVideoUrl(chunkObject, parser);
                  var thumbnail = getThumbnail(chunkObject, parser);
                  var videoId = getVideoId(chunkObject, parser);
                  var adName = getValueByPath(chunkObject, parser.PATH_NAME);
                  var adLogo = getValueByPath(chunkObject, parser.PATH_LOGO);
                  var videoData = buildVideoData(videoId, videoUrl, audioUrl, thumbnail, '', '', adName, adLogo);

                  if (videoId && videoUrl) {
                    queueArr.push(videoData);
                  }
                }
              } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                    _iterator7["return"]();
                  }
                } finally {
                  if (_didIteratorError7) {
                    throw _iteratorError7;
                  }
                }
              }

              queueArr.forEach(function (el) {
                setTimeout(asyncSendVideoData(el, 'FACEBOOK_VIDEO_DATA'), 0);
              });
            }
          } catch (err) {}
        };

        var getValueByPath = function getValueByPath(chunk, paths) {
          var value = null;
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = paths[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var path = _step8.value;
              var pathLenght = path.length;
              var transferVar = chunk;

              for (var i = 0; i < pathLenght; i++) {
                var key = path[i];
                var lastIndex = pathLenght - 1;

                if (!transferVar[key]) {
                  break;
                }

                if (i !== lastIndex && transferVar[key]) {
                  transferVar = transferVar[key];
                }

                if (i === lastIndex && transferVar[key]) {
                  value = transferVar[key];
                }
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                _iterator8["return"]();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }

          return value;
        };

        var getAudioUrl = function getAudioUrl(chunk, parser) {
          var audioUrl = null;
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = parser.PATH_AUDIO_URL[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var pathToAudio = _step9.value;
              var pathToAudioLenght = pathToAudio.length;
              var transferVar = chunk;

              for (var i = 0; i < pathToAudioLenght; i++) {
                var key = pathToAudio[i];
                var lastIndex = pathToAudioLenght - 1;

                if (!transferVar[key]) {
                  break;
                }

                if (i !== lastIndex && transferVar[key]) {
                  transferVar = transferVar[key];
                }

                if (i === lastIndex && transferVar[key]) {
                  audioUrl = transferVar[key];
                }
              }
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                _iterator9["return"]();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }

          return audioUrl;
        };

        var getVideoUrl = function getVideoUrl(chunk, parser) {
          var videoUrl = null;
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = parser.PATH_VIDEO_URL[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var pathToVideo = _step10.value;
              var pathToVideoLenght = pathToVideo.length;
              var transferVar = chunk;

              for (var i = 0; i < pathToVideoLenght; i++) {
                var key = pathToVideo[i];
                var lastIndex = pathToVideoLenght - 1;

                if (!transferVar[key]) {
                  break;
                }

                if (i !== lastIndex && transferVar[key]) {
                  transferVar = transferVar[key];
                }

                if (i === lastIndex && transferVar[key]) {
                  videoUrl = transferVar[key];
                }
              }
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                _iterator10["return"]();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }

          return videoUrl;
        };

        var getThumbnail = function getThumbnail(chunk, parser) {
          var thumbnailUrl = null;
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = parser.PATH_THUMBNAIL[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var pathToThumbnail = _step11.value;
              var pathToThumbnailLenght = pathToThumbnail.length;
              var transferVar = chunk;

              for (var i = 0; i < pathToThumbnailLenght; i++) {
                var key = pathToThumbnail[i];
                var lastIndex = pathToThumbnailLenght - 1;

                if (!transferVar[key]) {
                  break;
                }

                if (i !== lastIndex && transferVar[key]) {
                  transferVar = transferVar[key];
                }

                if (i === lastIndex && transferVar[key]) {
                  thumbnailUrl = transferVar[key];
                }
              }
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                _iterator11["return"]();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }

          return thumbnailUrl;
        };

        var getVideoId = function getVideoId(chunk, parser) {
          var videoId = null;
          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = parser.PATH_VIDEO_ID[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var pathToVideoId = _step12.value;
              var pathToVideoIdLenght = pathToVideoId.length;
              var transferVar = chunk;

              for (var i = 0; i < pathToVideoIdLenght; i++) {
                var key = pathToVideoId[i];
                var lastIndex = pathToVideoIdLenght - 1;

                if (!transferVar[key]) {
                  break;
                }

                if (i !== lastIndex && transferVar[key]) {
                  transferVar = transferVar[key];
                }

                if (i === lastIndex && transferVar[key]) {
                  videoId = transferVar[key];
                }
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }

          return videoId;
        };

        var splitIfNeed = function splitIfNeed(parserConfigName, text) {
          text = String(text);
          var parserConfig = config.PARSER_CONFIG[parserConfigName];
          return parserConfig.SEPARATOR ? text.split(parserConfig.SEPARATOR) : [text];
        };

        var parse = function parse(text, parserConfigName) {
          var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var texts = splitIfNeed(parserConfigName, text);
          texts.forEach(function (text) {
            setTimeout(function () {
              return findParserAndParse(text, parserConfigName, url);
            }, 0);
          });
        };

        var asyncSendVideoData = function asyncSendVideoData(videoData, type) {
          return function () {
            SendVideoData(id, videoData, type);
          };
        };

        if (config.PARSER_CONFIG.SCRIPT.USE) {
          var loadTextDataFromScripts = function loadTextDataFromScripts() {
            var scripts = document.querySelectorAll('script');
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
              for (var _iterator13 = scripts[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                var _script = _step13.value;

                if (_script.hasAttribute('bis_use')) {
                  continue;
                }

                _script.setAttribute('bis_use', 'true');

                parse(_script.innerHTML, PARSER_TYPE.SCRIPT);
              }
            } catch (err) {
              _didIteratorError13 = true;
              _iteratorError13 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                  _iterator13["return"]();
                }
              } finally {
                if (_didIteratorError13) {
                  throw _iteratorError13;
                }
              }
            }
          };

          setInterval(loadTextDataFromScripts, config.PARSER_CONFIG.SCRIPT.INTERVAL_MS || 5000);
        }

        if (config.PARSER_CONFIG.LISTEN_HTTP_REQUESTS) {
          var open = XMLHttpRequest.prototype.open;
          var setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

          XMLHttpRequest.prototype.setRequestHeader = function () {
            var header = arguments[0].toLowerCase();
            var value = arguments[1];

            if (!this.requestHeaders) {
              this.requestHeaders = {};
            }

            this.requestHeaders[header] = value;
            setRequestHeader.apply(this, arguments);
          };

          XMLHttpRequest.prototype.open = function () {
            this.requestMethod = arguments[0];
            open.apply(this, arguments);
          };

          var send = XMLHttpRequest.prototype.send;

          XMLHttpRequest.prototype.send = function () {
            var onreadystatechange = this.onreadystatechange;

            this.onreadystatechange = function () {
              var _this = this;

              var matchUrls = config.MATCH_URLS;
              var availableHeaders = config.MATCH_HEADERS;
              var requestHeaders = this.requestHeaders ? Object.keys(this.requestHeaders) : null;
              var instreamConfig = config.PARSER_CONFIG.INSTREAM_CONFIG;
              var marketplaceConfig = config.PARSER_CONFIG.MARKETPLACE_VIDEO_AD;
              var videoAdConfig = config.PARSER_CONFIG.FEED_VIDEO_AD;
              var validRequestByHeaders = false;
              var foundedHeaderKey = null;
              var foundedHeaderValue = null;

              if (requestHeaders) {
                validRequestByHeaders = requestHeaders.some(function (el) {
                  if (availableHeaders[el] && availableHeaders[el].includes(_this.requestHeaders[el])) {
                    foundedHeaderKey = el;
                    foundedHeaderValue = _this.requestHeaders[el];
                    return true;
                  }
                });
              }

              if (this.readyState === 4 && matchUrls.filter(function (url) {
                return url.indexOf(_this.responseURL);
              }).length > 0) {
                if (validRequestByHeaders) {
                  switch (true) {
                    case instreamConfig.USE && instreamConfig.HEADERS[foundedHeaderKey] === foundedHeaderValue:
                      setTimeout(function () {
                        return parse(_this.response, PARSER_TYPE.INSTREAM_CONFIG, _this.responseURL);
                      }, 0);
                      break;

                    case marketplaceConfig.USE && marketplaceConfig.HEADERS[foundedHeaderKey].includes(foundedHeaderValue):
                      setTimeout(function () {
                        return parse(_this.response, PARSER_TYPE.MARKETPLACE_VIDEO_AD, _this.responseURL);
                      }, 0);
                      break;

                    case videoAdConfig.USE && videoAdConfig.HEADERS[foundedHeaderKey].includes(foundedHeaderValue):
                      setTimeout(function () {
                        return parse(_this.response, PARSER_TYPE.FEED_VIDEO_AD, _this.responseURL);
                      }, 0);
                      break;

                    default:
                  }
                } else {
                  setTimeout(function () {
                    return parse(_this.response, PARSER_TYPE.XML_HTTP_REQUEST);
                  }, 0);
                }
              }

              if (onreadystatechange) {
                return onreadystatechange.apply(this, arguments);
              }
            };

            return send.apply(this, arguments);
          };
        }
      }.toString() + "(\"".concat(id, "\", ").concat(config, "))");

      if (document.head) {
        document.head.appendChild(script);
      } else {}
    }
  }], [{
    key: "SendVideoData",
    value: function SendVideoData(id, videoData, type) {
      function GenerateQuickId() {
        var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return randomStrId.substring(0, 22);
      }

      try {
        var _mes = {
          posdMessageId: 'PANELOS_MESSAGE',
          posdHash: GenerateQuickId(),
          type: type,
          from: id,
          to: id.substring(0, id.length - 2),
          content: videoData
        }; // console.log('(PosdFacebookVideoDetector) sending mes', mes);

        window.postMessage(_mes);
      } catch (e) {}
    }
  }]);

  return PosdFacebookVideoDetector;
}();

module.exports = PosdFacebookVideoDetector;

/***/ }),

/***/ "./src/content/detectors/Facebook/FacebookWatch.js":
/*!*********************************************************!*\
  !*** ./src/content/detectors/Facebook/FacebookWatch.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdAdDetector = __webpack_require__(/*! ../AdDetector */ "./src/content/detectors/AdDetector.js");

var PosdFacebookCommon = __webpack_require__(/*! ./FacebookCommon */ "./src/content/detectors/Facebook/FacebookCommon.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdFacebookWatch = /*#__PURE__*/function (_PosdAdDetector) {
  _inherits(PosdFacebookWatch, _PosdAdDetector);

  function PosdFacebookWatch(id, options, AdBlockerAgent, fbConfig) {
    var _this;

    _classCallCheck(this, PosdFacebookWatch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookWatch).call(this, id, options, AdBlockerAgent));
    _this.fbConfig = fbConfig;
    _this.fbWatch = null;
    _this.fbWatchObserver = null;
    return _this;
  }

  _createClass(PosdFacebookWatch, [{
    key: "ActualizeDetector",
    value: function ActualizeDetector() {
      var result = false;
      var feedWatch = this.FeedWatchContainer;

      if (feedWatch) {
        result = true;
      }

      return result;
    }
  }, {
    key: "ActivateMutationObserver",
    value: function ActivateMutationObserver() {
      var _this2 = this;

      this.fbWatch = this.FeedWatchContainer;

      if (this.fbWatch) {
        if (!this.fbWatchObserver) {
          this.fbWatchObserver = new MutationObserver(this.DetectCandidates.bind(this, PosdConst.AD_DETECTOR_INITIATOR_MUTATION));
          this.fbWatchObserver.observe(this.fbWatch, {
            childList: true,
            subtree: true
          });
          window.addEventListener('beforeunload', function () {
            if (_this2.fbWatchObserver) {
              _this2.fbWatchObserver.disconnect();

              _this2.fbWatchObserver = null;
            }
          });
        }
      } else {}

      return this.fbWatchObserver;
    }
  }, {
    key: "DeactivateMutationObserver",
    value: function DeactivateMutationObserver() {
      if (this.fbWatchObserver) {
        this.fbWatchObserver.disconnect();
        this.fbWatchObserver = null;
      }
    }
  }, {
    key: "Detector",
    value: function Detector() {
      var fbWatch = this.FeedWatchContainer;

      if (fbWatch) {
        var posts = Array.from(fbWatch.children);

        for (var i = 0; i < posts.length; i++) {
          var post = posts[i];
          var postSize = PosdCommon.GetElementSize(post);

          if (!post.hasAttribute(PosdConst.ATTRIBUTE_BIS_ID) && PosdFacebookCommon.IsInitiallyRendered(post, postSize)) {
            if (this.CheckIfAd(post)) {
              if (this.AdBlockerAgent.IsEnabledForFacebook()) {
                var hideStyleStr = this.HideAd(post, postSize, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH);
              }

              if (this.CheckIfAdRendered(post, PosdFacebookCommon.GetMinImgsSpacePercentag(this.fbConfig, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH))) {
                var bisId = PosdCommon.GenerateAndSetBisIdToFBAds(post);
                this.addCoverImageSrcAttribute(post);
                var timeout = this.options.extractAdStaticPartTimeoutMs + PosdCommon.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                this.AddHiddenTextTags(post);
                setTimeout(this.ReadyToExtractAd.bind(this, bisId, hideStyleStr), timeout);
              }
            }
          }
        }
      } else {}
    }
  }, {
    key: "ReadyToExtractAd",
    value: function ReadyToExtractAd(bisId, hideStyleStr) {
      try {
        if (bisId) {
          var fbAd = document.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_ID, "=").concat(bisId, "]"));
          var sponsoredBlock = fbAd.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_LABEL, "=\"fb_watch_ad\"]"));

          if (fbAd && sponsoredBlock) {
            this.ExtractAd(bisId, hideStyleStr, PosdConst.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH);
          } else {
            sponsoredBlock.removeAttribute(PosdConst.ATTRIBUTE_BIS_ID);
            fbAd.removeAttribute(PosdConst.ATTRIBUTE_BIS_ID);
          }
        }
      } catch (e) {}
    }
  }, {
    key: "CheckIfAd",
    value: function CheckIfAd(post) {
      var queries = this.fbConfig.POSSIBLE_SPONSORED_TEXT_QUERIES;
      var result = false;

      for (var i = 0; i < queries.length && !result; i++) {
        var query = queries[i];
        var links = post.querySelectorAll(query);

        for (var _i = 0; _i < links.length && !result; _i++) {
          var link = links[_i];
          var text = link.innerText;

          if (typeof text === 'undefined' && link.tagName === 'use' && link.hasAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)) {
            var attrValue = link.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG);
            var svgAdTitleElement = document.querySelector(attrValue);

            if (svgAdTitleElement) {
              text = svgAdTitleElement.textContent;
            } else {
              text = '';
            }
          }

          var attrText = link.getAttribute(this.options.attributeWithSponsorAlly);
          var argumentsToCheck = attrText ? [text, attrText] : text;

          if (typeof text === "string" && text.length && this.isTagSponsored(argumentsToCheck)) {
            link.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, 'fb_watch_ad');
            result = true;
          } else if (!link.hasAttribute(PosdConst.ATTRIBUTE_BIS_LABEL)) {
            var deepText = PosdFacebookCommon.GetVisibleSpansText(link, this.fbConfig.VISIBLE_SPANS_TEXT, this.fbConfig.SPONSORED_TEXTS);

            if (deepText && deepText !== text && deepText !== attrText) {
              if (typeof deepText === "string" && deepText.length && this.isTagSponsored(deepText)) {
                link.setAttribute(PosdConst.ATTRIBUTE_BIS_LABEL, 'fb_watch_ad');
                result = true;
              }
            }
          }
        }
      }

      return result;
    }
  }, {
    key: "AddHiddenTextTags",
    value: function AddHiddenTextTags(post) {
      var allUse = post.querySelectorAll('svg>use');

      if (!allUse) {
        return;
      }

      for (var i = 0; i < allUse.length; i++) {
        var useTag = allUse[i];
        var parentUse = useTag.parentElement;
        var attrValue = useTag.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG);
        var svgAdTitleElement = document.querySelector(attrValue);
        var cloneSvgText = svgAdTitleElement.cloneNode(true);
        cloneSvgText.style.display = 'none';

        if (parentUse) {
          parentUse.appendChild(cloneSvgText);
        }
      }
    }
  }, {
    key: "isTagSponsored",
    value: function isTagSponsored(text) {
      var _this3 = this;

      var result = false;

      if (!text) {
        return result;
      }

      if (typeof text === 'string') {
        result = this.fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
          return text === sponsoredText;
        });
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var i = _step.value;
            result = _this3.fbConfig.SPONSORED_TEXTS.some(function (sponsoredText) {
              return i === sponsoredText;
            });

            if (result) {
              return "break";
            }
          };

          for (var _iterator = text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = _loop();

            if (_ret === "break") break;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return result;
    }
  }, {
    key: "GetAboutPageLink",
    value: function GetAboutPageLink(post) {
      var aboutPageLink = '';
      var aboutSectionConfig = this.fbConfig.ABOUT_SECTION_CONFIG;
      var sponsEl = post.querySelector("*[".concat(PosdConst.ATTRIBUTE_BIS_LABEL, "='fb_watch_ad'"));
      var links = post.querySelectorAll(aboutSectionConfig.HREF_PREFIX_WATCH);

      if (sponsEl && links && links.length) {
        var url = '';
        var sponsElTop = sponsEl.getBoundingClientRect().top;
        var minTopDif = sponsElTop - post.getBoundingClientRect().top;

        for (var i = 0; i < links.length; i++) {
          var linkSize = links[i].getBoundingClientRect();

          if (links[i].href && linkSize.top < sponsElTop) {
            if (sponsElTop - linkSize.top < minTopDif) {
              minTopDif = sponsElTop - linkSize.top;
              url = links[i].href;
            }
          }
        }

        if (url.length) {
          var urlpath = url.substring(aboutSectionConfig.HREF_TEMPLATE_WATCH.length, url.length);
          aboutPageLink = aboutSectionConfig.ABOUT_PAGE_TEMPLATE.replace('%1', urlpath.substring(0, urlpath.indexOf('/')));
        }
      }

      return aboutPageLink;
    }
  }, {
    key: "addCoverImageSrcAttribute",
    value: function addCoverImageSrcAttribute(post) {
      var img = post.querySelector(this.fbConfig.FEED_WATCH_PAGE.COVER_IMAGE_QUERY);

      if (img && img.hasAttribute('src')) {
        var imgSrc = img.getAttribute('src');
        post.setAttribute('data-cover-image-src', imgSrc);
      }
    }
  }, {
    key: "FeedWatchContainer",
    get: function get() {
      var queries = this.fbConfig.FEED_WATCH_PAGE.FEED_WATCH_QUERIES;
      var queriesLength = queries.length;
      var isFound = false;
      var feedWatch = null;

      for (var i = 0; i < queriesLength && !isFound; i++) {
        var query = queries[i];
        var queryBlock = document.querySelector(query);

        if (queryBlock) {
          if (queryBlock.children.length > 2) {
            feedWatch = queryBlock;
            isFound = true;
          }
        }
      }

      return feedWatch;
    }
  }]);

  return PosdFacebookWatch;
}(PosdAdDetector);

module.exports = PosdFacebookWatch;

/***/ }),

/***/ "./src/content/detectors/Html5/DocumentTargetUrlDetector.js":
/*!******************************************************************!*\
  !*** ./src/content/detectors/Html5/DocumentTargetUrlDetector.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdDocumentTargetUrlDetector = /*#__PURE__*/function () {
  function PosdDocumentTargetUrlDetector() {
    _classCallCheck(this, PosdDocumentTargetUrlDetector);
  }

  _createClass(PosdDocumentTargetUrlDetector, null, [{
    key: "GetHyperlinkEmbeddedTargetUrlDataList",
    value: function GetHyperlinkEmbeddedTargetUrlDataList(id, documentObj, blacklistedTargetUrls) {
      var elements = PosdCommon.QuerySelectorAll(documentObj, "A[href]");
      var a, aSize, aSquare;
      var targetUrl = [];
      var minSquareLimit = 100;

      for (var i = 0; i < elements.length; i++) {
        a = elements[i];

        if (!PosdCommon.IsInFilterList(blacklistedTargetUrls, a.href)) {
          aSize = PosdCommon.GetElementSize(a);
          aSquare = aSize.w * aSize.h;
          var inEl = a.querySelectorAll('img, canvas');

          if (inEl.length) {
            var inElSize = void 0,
                inElSquare = void 0;

            for (var j = 0; j < inEl.length; j++) {
              inElSize = PosdCommon.GetElementSize(inEl[j]);
              inElSquare = inElSize.w * inElSize.h;

              if (inElSquare > aSquare) {
                aSquare = inElSquare;
                aSize.w = inElSize.w;
                aSize.h = inElSize.h;
              }
            }
          }

          if (aSquare >= minSquareLimit) {
            if (PosdCommon.isValidUrl(a.href)) {
              targetUrl.push({
                href: a.href,
                square: aSquare
              });
            }
          } else {}
        } else {}
      }

      if (!!targetUrl && targetUrl.length > 0) {}

      return targetUrl;
    }
  }, {
    key: "GetDocumentEmbeddedTargetUrlDataList",
    value: function GetDocumentEmbeddedTargetUrlDataList(id, documentObj, html5TargetUrlDetectionConfig) {
      var strategyList = [this.strategyStrictFinalUrl, this.strategyScriptClickTag, this.strategyAppnexus, this.strategyNoscriptAnchors, this.strategyScriptJsonKeyWords];
      var targetUrlDataList = this.processStrategyList(documentObj, strategyList, html5TargetUrlDetectionConfig);

      if (targetUrlDataList && targetUrlDataList.length > 0) {}

      return targetUrlDataList;
    }
  }, {
    key: "processStrategyList",
    value: function processStrategyList(documentObj, strategyList, html5TargetUrlDetectionConfig) {
      var targetUrlDataList = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = strategyList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var strategy = _step.value;

          try {
            var targetUrlData = strategy(documentObj, html5TargetUrlDetectionConfig);

            if (targetUrlData && targetUrlData.href) {
              targetUrlDataList.push(targetUrlData);
            }
          } catch (e) {}
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return targetUrlDataList;
    }
  }, {
    key: "strategyStrictFinalUrl",
    value: function strategyStrictFinalUrl(documentObj, html5TargetUrlDetectionConfig) {
      var scripts = PosdCommon.QuerySelectorAll(documentObj, 'script[type="application/json"]');

      for (var i = 0; i < scripts.length; i++) {
        var data = scripts[i].outerText;

        if (data.length > 1 && data[0] === '{' && data[data.length - 1] === '}' && data.indexOf("targets") != -1 && data.indexOf("redirectUrl") != -1 && data.indexOf("finalUrl") != -1) {
          var dataObj = JSON.parse(data);

          if (typeof dataObj.targets !== 'undefined' && typeof dataObj.targets.redirectUrl !== 'undefined' && typeof dataObj.targets.redirectUrl.finalUrl !== 'undefined') {
            var href = dataObj.targets.redirectUrl.finalUrl;

            if (PosdCommon.isValidUrl(href)) {
              return {
                href: href,
                square: 1000000
              };
            }
          }
        }
      }
    }
  }, {
    key: "strategyScriptClickTag",
    value: function strategyScriptClickTag(documentObj, html5TargetUrlDetectionConfig) {
      var scripts = PosdCommon.QuerySelectorAll(documentObj, 'script');

      for (var i = 0; i < scripts.length; i++) {
        var data = scripts[i].outerText;

        if (data.length > 1 && data.indexOf("clickTag") !== -1) {
          data = data.replace(/\s/g, '');

          if (data.startsWith('varclickTag="') && data.endsWith('";')) {
            var startIndex = data.indexOf('"');
            var endIndex = data.lastIndexOf('"');
            var href = data.substring(startIndex + 1, endIndex);

            if (PosdCommon.isValidUrl(href)) {
              return {
                href: href,
                square: 1000000
              };
            }
          }
        }
      }
    }
  }, {
    key: "strategyAppnexus",
    value: function strategyAppnexus(documentObj, html5TargetUrlDetectionConfig) {
      var googleScripts = PosdCommon.QuerySelectorAll(documentObj, ".GoogleActiveViewElement script");
      var adScriptsContents = Array.from(googleScripts).map(function (script) {
        return script.innerHTML;
      }).filter(function (textContent) {
        return textContent.indexOf("APPNEXUS.placement") >= 0;
      });

      for (var i = 0; i < adScriptsContents.length; i++) {
        var adScriptContent = adScriptsContents[i];
        var href = extractAppnexusUrl(adScriptContent);

        if (PosdCommon.isValidUrl(href)) {
          return {
            href: href,
            square: 1000000
          };
        }
      }

      function extractAppnexusUrl(adScriptContent) {
        adScriptContent = adScriptContent.replace(/(\r\n|\n|\r|\s)/gm, "");
        var regexp = /APPNEXUS.placement\(".+","(.+)",.+/;
        var result = adScriptContent.match(regexp);

        if (result && result.length > 1) {
          return result[1];
        }

        return null;
      }
    }
  }, {
    key: "strategyNoscriptAnchors",
    value: function strategyNoscriptAnchors(documentObj, html5TargetUrlDetectionConfig) {
      var noscriptElements = PosdCommon.QuerySelectorAll(documentObj, 'noscript');

      for (var i = 0; i < noscriptElements.length; i++) {
        var dumpElement = documentObj.createElement('div');
        dumpElement.innerHTML = noscriptElements[i].innerText;
        var anchor = dumpElement.querySelector("a[href]");

        if (anchor) {
          var href = anchor.getAttribute("href");

          if (PosdCommon.isValidUrl(href)) {
            return {
              href: href,
              square: 1
            };
          }
        }
      }
    }
  }, {
    key: "strategyScriptJsonKeyWords",
    value: function strategyScriptJsonKeyWords(documentObj, html5TargetUrlDetectionConfig) {
      var scripts = PosdCommon.QuerySelectorAll(documentObj, 'script[type="application/json"]');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = scripts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var script = _step2.value;
          var data = script.outerText;

          if (data.length > 1 && data[0] === '{' && data[data.length - 1] === '}') {
            var dataObj = JSON.parse(data);
            var href = GetMatchedTargetUrl(dataObj, html5TargetUrlDetectionConfig);

            if (PosdCommon.isValidUrl(href)) {
              return {
                href: href,
                square: 999999
              };
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      function GetMatchedTargetUrl(object, html5TargetUrlDetectionConfig) {
        var pathTrack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var searchDepthLevel = html5TargetUrlDetectionConfig.WINDOW_TARGET_URL_SEARCH_DEPTH_LEVEL;

        if (pathTrack.length > searchDepthLevel) {
          return null;
        }

        var propertyNames = Object.getOwnPropertyNames(object);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = propertyNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var propName = _step3.value;

            try {
              var propValue = object[propName];

              if (!propValue) {
                return null;
              }

              var newPathTrack = pathTrack.concat(propName);

              if (_typeof(propValue) === 'object') {
                var targetUrl = GetMatchedTargetUrl(propValue, html5TargetUrlDetectionConfig, newPathTrack);

                if (!!targetUrl) {
                  return targetUrl;
                }
              } else if (typeof propValue === 'string' && PropertyNameMatchesKeyWords(propName, html5TargetUrlDetectionConfig)) {
                if (PosdCommon.isValidUrl(propValue)) {
                  return propValue;
                }
              }
            } catch (error) {}
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return null;
      }

      function PropertyNameMatchesKeyWords(propName, html5TargetUrlDetectionConfig) {
        var preparedPropName = PreparePropName(propName);
        var targetUrlPropertyKeyWords = html5TargetUrlDetectionConfig.WINDOW_TARGET_URL_PROPERTY_KEY_WORDS;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = targetUrlPropertyKeyWords[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var keyWord = _step4.value;
            var matches = preparedPropName === keyWord;

            if (matches) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return false;
      }

      function PreparePropName(propName) {
        var propNameLowerCase = propName.toLowerCase();
        return propNameLowerCase.replace(/[^a-zA-Z]+/g, "");
      }
    }
  }]);

  return PosdDocumentTargetUrlDetector;
}();

module.exports = PosdDocumentTargetUrlDetector;

/***/ }),

/***/ "./src/content/detectors/Html5/TargetUrlDetector.js":
/*!**********************************************************!*\
  !*** ./src/content/detectors/Html5/TargetUrlDetector.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdWindowTargetUrlDetector = __webpack_require__(/*! ./WindowTargetUrlDetector */ "./src/content/detectors/Html5/WindowTargetUrlDetector.js");

var PosdDocumentTargetUrlDetector = __webpack_require__(/*! ./DocumentTargetUrlDetector */ "./src/content/detectors/Html5/DocumentTargetUrlDetector.js");

var PosdTargetUrlDetector = /*#__PURE__*/function () {
  function PosdTargetUrlDetector(chainId, frameId, id, activationTargetUrlCandidates, Config) {
    _classCallCheck(this, PosdTargetUrlDetector);

    this.id = id;
    this.fullIdStr = PosdCommon.GetFullIdStr(chainId, frameId, id);
    this.init = false;
    this.targetUrlDataList = [];
    this.targetUrlDetected = false;
    this.IframesIO = null;
    this.activationTargetUrlCandidates = activationTargetUrlCandidates;
    this.html5TargetUrlDetectionConfig = Config.GetHtml5TargetUrlDetectionConfig();
    this.blacklistedTargetUrls = Config.GetBlacklistTargetUrl();
    this.detectionTimerId = null;
    this.onDetectTargetUrlCallBack = null;
  }

  _createClass(PosdTargetUrlDetector, [{
    key: "Init",
    value: function Init(IO) {
      if (IO) {
        this.IframesIO = IO;
        this.init = true;
      }

      return this.init;
    }
  }, {
    key: "DetectTargetUrl",
    value: function DetectTargetUrl(detectionTimeoutMs, onDetectTargetUrlCallBack) {
      if (this.init && !this.targetUrlDetected && this.html5TargetUrlDetectionConfig) {
        this.onDetectTargetUrlCallBack = onDetectTargetUrlCallBack;
        this.detectionTimerId = setTimeout(this.onTargetUrlDetectionTimout.bind(this), detectionTimeoutMs);

        if (this.activationTargetUrlCandidates && this.activationTargetUrlCandidates.length) {
          this.targetUrlDataList = this.activationTargetUrlCandidates;
          this.TargetUrlDetected();
        } else {
          var hyperlinkTargetUrlDataList = PosdDocumentTargetUrlDetector.GetHyperlinkEmbeddedTargetUrlDataList(this.id, document, this.blacklistedTargetUrls);
          this.targetUrlDataList = this.targetUrlDataList.concat(hyperlinkTargetUrlDataList);
          var docTargetUrlDataList = PosdDocumentTargetUrlDetector.GetDocumentEmbeddedTargetUrlDataList(this.id, document, this.html5TargetUrlDetectionConfig);
          docTargetUrlDataList = PosdTargetUrlDetector.filterTargetUrlDataList(docTargetUrlDataList, this.blacklistedTargetUrls);
          this.targetUrlDataList = this.targetUrlDataList.concat(docTargetUrlDataList);

          if (this.targetUrlDataList && this.targetUrlDataList.length) {
            this.TargetUrlDetected();
          } else {
            this.IframesIO.ActivateWindowEmbeddedTargetUrlDetection(this.onGetWindowEmbeddedTargetUrlData.bind(this));
          }
        }
      }
    }
  }, {
    key: "onGetWindowEmbeddedTargetUrlData",
    value: function onGetWindowEmbeddedTargetUrlData(winTargetUrlDataList) {
      var filteredTargetUrlDataList = this.filterTargetUrlDataList(winTargetUrlDataList, this.blacklistedTargetUrls);
      this.targetUrlDataList.push(filteredTargetUrlDataList);

      if (!filteredTargetUrlDataList || filteredTargetUrlDataList.length === 0) {}

      this.TargetUrlDetected();
    }
  }, {
    key: "onTargetUrlDetectionTimout",
    value: function onTargetUrlDetectionTimout() {
      if (!this.targetUrlDetected) {
        this.TargetUrlDetected();
      }
    }
  }, {
    key: "TargetUrlDetected",
    value: function TargetUrlDetected() {
      this.targetUrlDetected = true;

      if (this.detectionTimerId) {
        clearTimeout(this.detectionTimerId);
        this.detectionTimerId = null;
      }

      if (this.onDetectTargetUrlCallBack) {
        this.onDetectTargetUrlCallBack();
      }
    } //Todo: pass fullIdStr instead of id

  }, {
    key: "FrameTargetUrl",
    get: function get() {
      return this.targetUrlDataList;
    }
  }], [{
    key: "filterTargetUrlDataList",
    value: function filterTargetUrlDataList(targetUrlDataList, blacklistTargetUrl) {
      if (!targetUrlDataList || targetUrlDataList.length === 0) {
        return [];
      }

      return targetUrlDataList.filter(function (targetUrlData) {
        return !PosdCommon.IsInFilterList(blacklistTargetUrl, targetUrlData.href);
      });
    }
  }, {
    key: "DetectTargetUrlFromWindowObj",
    value: function DetectTargetUrlFromWindowObj(id, windowObj, config) {
      var targetUrlDataList = [];
      var html5TargetUrlDetectionConfig = config.GetHtml5TargetUrlDetectionConfig();
      var blacklistedTargetUrls = config.GetBlacklistTargetUrl();

      try {
        var hyperlinkTargetUrlDataList = PosdDocumentTargetUrlDetector.GetHyperlinkEmbeddedTargetUrlDataList(id, windowObj.document, html5TargetUrlDetectionConfig);
        targetUrlDataList = targetUrlDataList.concat(hyperlinkTargetUrlDataList);
      } catch (e) {}

      try {
        var docTargetUrlDataList = PosdDocumentTargetUrlDetector.GetDocumentEmbeddedTargetUrlDataList(id, windowObj.document, html5TargetUrlDetectionConfig);
        docTargetUrlDataList = this.filterTargetUrlDataList(docTargetUrlDataList, blacklistedTargetUrls);
        targetUrlDataList = targetUrlDataList.concat(docTargetUrlDataList);
      } catch (e) {}

      try {
        var winTargetUrlDataList = PosdWindowTargetUrlDetector.GetWindowEmbeddedTargetUrlDataList(id, windowObj, html5TargetUrlDetectionConfig, this.defaultWindowProps);
        winTargetUrlDataList = this.filterTargetUrlDataList(winTargetUrlDataList, blacklistedTargetUrls);
        targetUrlDataList = targetUrlDataList.concat(winTargetUrlDataList);
      } catch (e) {}

      if (targetUrlDataList && targetUrlDataList.length > 0) {}

      return targetUrlDataList;
    }
  }]);

  return PosdTargetUrlDetector;
}();

module.exports = PosdTargetUrlDetector;

/***/ }),

/***/ "./src/content/detectors/Html5/WindowTargetUrlDetector.js":
/*!****************************************************************!*\
  !*** ./src/content/detectors/Html5/WindowTargetUrlDetector.js ***!
  \****************************************************************/
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*

All sub-methods must be included into the main method scope because it could be injected into the page using "toString" method.

*/
var PosdWindowTargetUrlDetector = /*#__PURE__*/function () {
  function PosdWindowTargetUrlDetector() {
    _classCallCheck(this, PosdWindowTargetUrlDetector);
  }

  _createClass(PosdWindowTargetUrlDetector, null, [{
    key: "GetWindowEmbeddedTargetUrlDataList",
    value: function GetWindowEmbeddedTargetUrlDataList(id, windowObj, html5TargetUrlDetectionConfig) {
      var strategyList = [strategy1, strategy2, strategy3, strategy4, strategy5, strategyKeyWords];
      var targetUrlDataList = processStrategyList(windowObj, strategyList, html5TargetUrlDetectionConfig);

      if (targetUrlDataList && targetUrlDataList.length > 0) {}

      return targetUrlDataList;

      function strategy1(windowObj, html5TargetUrlDetectionConfig) {
        if (typeof windowObj.clickTag !== 'undefined' && isValid(windowObj.clickTag)) {
          return {
            href: windowObj.clickTag,
            square: 1000001
          };
        }
      }

      function strategy2(windowObj, html5TargetUrlDetectionConfig) {
        if (typeof windowObj.adData !== 'undefined' && typeof windowObj.adData.destination_url !== 'undefined' && isValid(windowObj.adData.destination_url)) {
          return {
            href: windowObj.adData.destination_url,
            square: 1000001
          };
        }
      }

      function strategy3(windowObj, html5TargetUrlDetectionConfig) {
        if (typeof windowObj.BF !== 'undefined' && typeof windowObj.BF.Parameters !== 'undefined' && typeof windowObj.BF.Parameters.targeturl !== 'undefined' && isValid(windowObj.BF.Parameters.targeturl)) {
          return {
            href: windowObj.BF.Parameters.targeturl,
            square: 1000001
          };
        }
      }

      function strategy4(windowObj, html5TargetUrlDetectionConfig) {
        if (typeof windowObj.ADAPT !== 'undefined' && typeof windowObj.ADAPT.symbols !== 'undefined' && typeof windowObj.ADAPT.symbols.stage !== 'undefined' && typeof windowObj.ADAPT.symbols.stage.clickUrl !== 'undefined' && isValid(windowObj.ADAPT.symbols.stage.clickUrl)) {
          return {
            href: windowObj.ADAPT.symbols.stage.clickUrl,
            square: 1000001
          };
        }
      }

      function strategy5(windowObj, html5TargetUrlDetectionConfig) {
        if (typeof windowObj.admixAPI !== 'undefined' && typeof windowObj.admixAPI.ownerBanner !== 'undefined' && typeof windowObj.admixAPI.ownerBanner.clickUrl !== 'undefined' && isValid(windowObj.admixAPI.ownerBanner.clickUrl)) {
          return {
            href: windowObj.admixAPI.ownerBanner.clickUrl,
            square: 1000001
          };
        }
      }

      function strategyKeyWords(windowObj, html5TargetUrlDetectionConfig) {
        var href = GetTargetUrlFromWindowMatchingKeyWords(id, windowObj, html5TargetUrlDetectionConfig);

        if (isValid(href)) {
          return {
            href: href,
            square: 999999
          };
        }
      }

      function isValid(url) {
        return typeof url === 'string' && url.length > 0 && (url.indexOf('http') !== -1 || url.indexOf('//') !== -1);
      }

      function processStrategyList(windowObj, strategyList, html5TargetUrlDetectionConfig) {
        var targetUrlDataList = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = strategyList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var strategy = _step.value;

            try {
              var targetUrlData = strategy(windowObj, html5TargetUrlDetectionConfig);

              if (targetUrlData && targetUrlData.href) {
                targetUrlDataList.push(targetUrlData);
              }
            } catch (e) {}
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return targetUrlDataList;
      }

      function GetTargetUrlFromWindowMatchingKeyWords(id, windowObj, html5TargetUrlDetectionConfig) {
        var customWindowPropertyNames = GetCustomWindowPropertyNames(windowObj, html5TargetUrlDetectionConfig);

        if (!customWindowPropertyNames || customWindowPropertyNames.length === 0) {
          return null;
        }

        return GetMatchedTargetUrl(windowObj, customWindowPropertyNames, html5TargetUrlDetectionConfig);
      }

      function GetMatchedTargetUrl(object, propertyNames, html5TargetUrlDetectionConfig) {
        var pathTrack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        var searchDepthLevel = html5TargetUrlDetectionConfig.WINDOW_TARGET_URL_SEARCH_DEPTH_LEVEL;

        if (pathTrack.length > searchDepthLevel) {
          return null;
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = propertyNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var propName = _step2.value;

            try {
              var propValue = object[propName];

              if (!propValue) {
                return null;
              }

              var newPathTrack = pathTrack.concat(propName);

              if (_typeof(propValue) === 'object') {
                var objectPropNames = Object.getOwnPropertyNames(propValue);
                var targetUrl = GetMatchedTargetUrl(propValue, objectPropNames, html5TargetUrlDetectionConfig, newPathTrack);

                if (!!targetUrl) {
                  return targetUrl;
                }
              } else if (typeof propValue === 'string' && PropertyNameMatchesKeyWords(propName, html5TargetUrlDetectionConfig)) {
                if (isValid(propValue)) {
                  return propValue;
                }
              }
            } catch (error) {}
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return null;
      }

      function PropertyNameMatchesKeyWords(propName, html5TargetUrlDetectionConfig) {
        var preparedPropName = PreparePropName(propName);
        var targetUrlPropertyKeyWords = html5TargetUrlDetectionConfig.WINDOW_TARGET_URL_PROPERTY_KEY_WORDS;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = targetUrlPropertyKeyWords[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var keyWord = _step3.value;
            var matches = preparedPropName === keyWord;

            if (matches) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return false;
      }

      function PreparePropName(propName) {
        var propNameLowerCase = propName.toLowerCase();
        return propNameLowerCase.replace(/[^a-zA-Z]+/g, "");
      }

      function GetCustomWindowPropertyNames(windowObj, html5TargetUrlDetectionConfig) {
        var currentWindowPropNames = Object.getOwnPropertyNames(windowObj);
        return currentWindowPropNames.filter(function (propName) {
          return html5TargetUrlDetectionConfig.LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES.indexOf(propName) < 0;
        });
      }
    }
  }]);

  return PosdWindowTargetUrlDetector;
}();

module.exports = PosdWindowTargetUrlDetector;

/***/ }),

/***/ "./src/content/detectors/Reddit/RedditAds.js":
/*!***************************************************!*\
  !*** ./src/content/detectors/Reddit/RedditAds.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdAdsCandidates = __webpack_require__(/*! ../../AdsCandidates */ "./src/content/AdsCandidates.js");

var PosdRedditVideoAndRightColumnAdUrlDetector = __webpack_require__(/*! ./RedditVideoAndRightColumnDetector */ "./src/content/detectors/Reddit/RedditVideoAndRightColumnDetector.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdConfig = __webpack_require__(/*! ../../../config */ "./src/config.js");

var PosdContentIOManager = __webpack_require__(/*! ../../ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdRedditAds = /*#__PURE__*/function (_PosdAdsCandidates) {
  _inherits(PosdRedditAds, _PosdAdsCandidates);

  function PosdRedditAds(id, Config, IOManager, AdBlockerAgent) {
    var _this;

    _classCallCheck(this, PosdRedditAds);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdRedditAds).call(this, id));
    _this.id = id;
    _this.elementId = 0;
    _this.isActive = false;
    _this.VideoTrafficDetector = null;
    _this.available = false;
    _this.onPageRefreshed = _this.onPageUrlChanged;
    _this.AdBlockerAgent = AdBlockerAgent;
    _this.IOManager = IOManager;
    _this.feedContainer = null;
    _this.commentPageContainer = null;
    _this.rightColumnContainer = null;
    _this.feedObserver = null;
    _this.commentPageObserver = null;
    _this.rightColumnObserver = null;
    _this.processRedditAdsInterval = null;
    _this.observerNodesListenerInterval = null;
    _this.redditConfig = Config.GetRedditConfig();
    _this.reactivateDetectorTimeout = null;
    _this.lastTopPosition = null;

    _this.ActivateTrafficDetector(PosdConst.ACTIVATION_BY_ADS_SELF);

    return _this;
  }

  _createClass(PosdRedditAds, [{
    key: "ActivateDetector",
    value: function ActivateDetector(activator) {
      var _this2 = this;

      if (activator === PosdConst.ACTIVATION_BY_ADS_MANAGER) {
        this.setAvailable = true;
      }

      if (!this.isActive) {
        this.setActive = true;
        this.lastFeedAdsCheckTime = PosdCommon.GetCurrentTimestampMs() - 3000;
        this.lastRightColumnAdsCheckTime = PosdCommon.GetCurrentTimestampMs() - 3000;
        this.lastCommentPageAdsCheckTime = PosdCommon.GetCurrentTimestampMs() - 3000;
        var callbackProcessInterval = this.processRedditAds.bind(this);
        this.processRedditAdsInterval = setInterval(callbackProcessInterval, 1000);

        if (this.AdBlockerAgent.IsEnabledForReddit()) {
          this.processRedditAds();
          setTimeout(this.processRedditAds.bind(this), 350);
          setTimeout(this.processRedditAds.bind(this), 700);
        }

        var callbackInterval = function () {
          _this2.observerNodesChecksAmount = _this2.observerNodesChecksAmount + 1;

          if (_this2.isCommentPage) {
            _this2.commentPageContainer = _this2.doesElementExists(_this2.commentPageContainer) ? _this2.commentPageContainer : _this2.getCommentPageContainer;

            if (!_this2.commentPageObserver && _this2.commentPageContainer) {
              var callbackMutationFeed = _this2.processCommentPageAds.bind(_this2);

              _this2.commentPageObserver = new MutationObserver(callbackMutationFeed);

              _this2.commentPageObserver.observe(_this2.commentPageContainer, {
                childList: true,
                subtree: true
              });
            }
          }

          if (!_this2.isCommentPage && !_this2.isCommentPopup) {
            _this2.feedContainer = _this2.doesElementExists(_this2.feedContainer) ? _this2.feedContainer : _this2.getFeedContainer;

            if (!_this2.feedObserver && _this2.feedContainer) {
              var _callbackMutationFeed = _this2.processFeedAds.bind(_this2);

              _this2.feedObserver = new MutationObserver(_callbackMutationFeed);

              _this2.feedObserver.observe(_this2.feedContainer, {
                childList: true,
                subtree: true
              });
            }
          }

          _this2.rightColumnContainer = _this2.rightColumnContainer === null ? _this2.getRightColumnContainer : _this2.rightColumnContainer;

          if (!_this2.rightColumnObserver && _this2.rightColumnContainer) {
            var callbackMutationRightColumn = _this2.processRightColumnAds.bind(_this2, PosdConst.AD_DETECTOR_INITIATOR_MUTATION);

            _this2.rightColumnObserver = new MutationObserver(callbackMutationRightColumn);

            _this2.rightColumnObserver.observe(_this2.rightColumnContainer, {
              childList: true,
              subtree: true
            });
          }

          if (_this2.feedContainer && _this2.rightColumnContainer || _this2.observerNodesChecksAmount > 20) {
            clearInterval(_this2.observerNodesListenerInterval);
            _this2.observerNodesListenerInterval = null;
          }
        }.bind(this);

        this.observerNodesListenerInterval = setInterval(callbackInterval, 300);
      }
    }
  }, {
    key: "doesElementExists",
    value: function doesElementExists(element) {
      if (!element) {
        return false;
      }

      var elementOuterHTML = element.outerHTML;
      return !!document.querySelector('html').outerHTML.includes(elementOuterHTML);
    }
  }, {
    key: "ActivateTrafficDetector",
    value: function ActivateTrafficDetector(activator) {
      if (!this.TrafficDetector) {
        this.TrafficDetector = new PosdRedditVideoAndRightColumnAdUrlDetector(this.id);
        this.TrafficDetector.InjectDetector(this.id + '_r', JSON.stringify(this.redditConfig));
      }
    }
  }, {
    key: "DeactivateDetector",
    value: function DeactivateDetector() {
      this.reactivateDetectorTimeout = null;

      if (this.processRedditAdsInterval) {
        clearInterval(this.processRedditAdsInterval);
        this.processRedditAdsInterval = null;
      }

      if (this.observerNodesListenerInterval) {
        clearInterval(this.observerNodesListenerInterval);
        this.observerNodesListenerInterval = null;
      }

      if (this.feedObserver) {
        this.lastTopPosition = parseInt(this.feedContainer.getBoundingClientRect().top);
        this.feedObserver.disconnect();
        this.feedObserver = null;
        this.feedContainer = null;
      }

      if (this.commentPageObserver) {
        this.commentPageObserver.disconnect();
        this.commentPageObserver = null;
        this.commentPageContainer = null;
      }

      if (this.rightColumnObserver) {
        this.rightColumnObserver.disconnect();
        this.rightColumnObserver = null;
        this.rightColumnContainer = null;
      }

      this.observerNodesChecksAmount = 0;
      this.setAvailable = false;
      this.setActive = false;
    }
  }, {
    key: "ReActivateDetector",
    value: function ReActivateDetector() {
      this.DeactivateDetector();
      this.ActivateDetector("ACTIVATION_BY_ADS_MANAGER");
    }
  }, {
    key: "processRedditAds",
    value: function processRedditAds() {
      this.processRightColumnAds();
      this.processFeedAds();
      this.processCommentPageAds();
    }
  }, {
    key: "processFeedAds",
    value: function processFeedAds() {
      var currentTime = PosdCommon.GetCurrentTimestampMs();

      if (currentTime - this.lastFeedAdsCheckTime > 300) {
        this.extractOccurrences(PosdConst.REDDIT_AD_PLACEMENT_TYPE_FEED);
        this.lastFeedAdsCheckTime = currentTime;
      }
    }
  }, {
    key: "processCommentPageAds",
    value: function processCommentPageAds() {
      var currentTime = PosdCommon.GetCurrentTimestampMs();

      if (currentTime - this.lastCommentPageAdsCheckTime > 300) {
        this.extractOccurrences(PosdConst.REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE);
        this.lastCommentPageAdsCheckTime = currentTime;
      }
    }
  }, {
    key: "processRightColumnAds",
    value: function processRightColumnAds() {
      var currentTime = PosdCommon.GetCurrentTimestampMs();

      if (currentTime - this.lastRightColumnAdsCheckTime > 300) {
        this.extractOccurrences(PosdConst.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN);
        this.lastRightColumnAdsCheckTime = currentTime;
      }
    }
  }, {
    key: "allCellsAndMinImgSpace",
    value: function allCellsAndMinImgSpace(adPlacementType) {
      var _this3 = this;

      var allCells = [];
      var minImgSquerePercentage = 0;

      if (adPlacementType === PosdConst.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN && this.rightColumnContainer) {
        allCells = Array.from(this.rightColumnContainer.children).map(function (el) {
          var promotedElement = el.querySelector(_this3.redditConfig.RIGHT_COLUMN_CONTAINER.PROMOTED_SELECTOR);

          if (promotedElement) {
            return promotedElement.parentElement;
          }
        }).filter(function (el) {
          return el;
        });
        minImgSquerePercentage = this.redditConfig.RIGHT_COLUMN_CONTAINER.IMG_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.REDDIT_AD_PLACEMENT_TYPE_FEED && this.feedContainer) {
        allCells = Array.from(this.feedContainer.children);
        minImgSquerePercentage = this.redditConfig.FEED_CONTAINER.IMG_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE && this.commentPageContainer) {
        allCells = Array.from(this.commentPageContainer.children);
        minImgSquerePercentage = this.redditConfig.COMMENT_PAGE_CONTAINER.IMG_SPACE_PERCENTAGE;
      }

      allCells = allCells.filter(function (cell) {
        return _this3.isPromoted(cell);
      });
      return {
        allCells: allCells,
        minImgSquerePercentage: minImgSquerePercentage
      };
    }
  }, {
    key: "extractOccurrences",
    value: function extractOccurrences(adPlacementType) {
      var _this$allCellsAndMinI = this.allCellsAndMinImgSpace(adPlacementType),
          allCells = _this$allCellsAndMinI.allCells,
          minImgSquerePercentage = _this$allCellsAndMinI.minImgSquerePercentage;

      if (allCells.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = allCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cell = _step.value;

            if (!cell.hasAttribute(PosdConst.ATTRIBUTE_BIS_ID) && !cell.hasAttribute(PosdConst.ATTRIBUTE_BIS_SIZE)) {
              if (this.IsPostContentRendered(cell, minImgSquerePercentage) && cell.querySelector(this.redditConfig.QUERY_CHECK_READY_AD_CELLS)) {
                if (this.isCarousel(cell) && this.redditConfig.IS_ACTIVE_GET_SLIDES_SRC) {
                  this.getSlidesSrc(cell);
                }

                var bisId = PosdCommon.GenerateAndSetBisIdToRedditAds(cell);
                this.setSizesAndIdForAllElements(cell);
                var cloneCell = cell.cloneNode(true);
                var bannerHtml = this.buildBannerHtml(cloneCell, adPlacementType);
                var adReddit = this.getAdRedditObject(cell, bannerHtml, adPlacementType);

                if (adPlacementType === PosdConst.REDDIT_AD_PLACEMENT_TYPE_FEED && this.isVideo(cell)) {
                  adReddit.videoData = {};
                }

                if (this.AdBlockerAgent.IsEnabledForReddit()) {
                  PosdCommon.HideElement(cell);
                  this.AdBlockerAgent.SetHiddenAmount(1);
                }

                cloneCell.remove();
                setTimeout(this.processAndSendRedditAd.bind(this, bisId, adReddit), 100);
              } else {}
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "getSlidesSrc",
    value: function getSlidesSrc(cell) {
      var parent = cell.querySelector('ul').parentElement;
      var next = parent.querySelector('a[title="Next"]');
      var prev = parent.querySelector('a:not([title="Next"])');

      if (next && prev) {
        next.click();
        prev.click();
      }
    }
  }, {
    key: "buildBannerHtml",
    value: function buildBannerHtml(cloneCell, type) {
      var container;

      if (type === PosdConst.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN) {
        container = this.rightColumnContainer;
      } else if (type === PosdConst.REDDIT_AD_PLACEMENT_TYPE_FEED) {
        container = this.feedContainer;
      } else if (type === PosdConst.REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE) {
        container = this.commentPageContainer;
      }

      this.setWrapperClass(container);
      var head = this.headCopyWithStyles;
      var html = document.createElement('html'),
          body = this.bodyCopyWithStyles,
          wrapper = container.cloneNode();
      this.setWrapperStyles(container, wrapper);
      head.appendChild(this.getClassNameForStyles(cloneCell));
      html.appendChild(head);
      wrapper.appendChild(cloneCell);
      body.appendChild(wrapper);
      html.appendChild(body);
      return html;
    }
  }, {
    key: "isCarousel",
    value: function isCarousel(cell) {
      var ulElement = cell.querySelector('ul');
      return ulElement;
    }
  }, {
    key: "setWrapperClass",
    value: function setWrapperClass(cell) {
      var parent = cell.parentElement,
          isEnd = false;

      for (var i = 0; !isEnd; i++) {
        if (parent.nextSibling && parent.nextSibling.nodeName.search(/style/i) !== -1 && parent.previousSibling && parent.previousSibling.nodeName.search(/style/i) !== -1) {
          var parentClasses = parent.getAttribute('class');
          cell.className += cell.className.length ? ' ' + parentClasses : parentClasses;
          isEnd = true;
        } else {
          parent = parent.parentElement;
        }
      }
    }
  }, {
    key: "setWrapperStyles",
    value: function setWrapperStyles(container, wrapper) {
      wrapper.style.cssText = wrapper.style.cssText + "max-width: ".concat(this.maxWidthContainer(container));
    }
  }, {
    key: "getClassNameForStyles",
    value: function getClassNameForStyles(cloneCell) {
      var styleTag = document.createElement('style');
      this.redditConfig.NECESSARY_STYLES.BY_CLASS_NAME.forEach(function (el) {
        var child = cloneCell.querySelector(el.CLASS_NAME_CHILD);
        var goalParent = child && child.parentElement ? child.parentElement : null;
        var classNameForStyles = '';

        for (var i = 1; i < el.DEEP_LEVEL; i++) {
          if (goalParent) {
            goalParent = goalParent.parentElement;
          }
        }

        if (goalParent) {
          classNameForStyles = goalParent.classList[0];
          styleTag.innerHTML += '.' + classNameForStyles + el.STYLES;
        }
      });
      return styleTag;
    }
  }, {
    key: "getStylesByTagName",
    value: function getStylesByTagName(head) {
      var result = [];
      var tags = this.redditConfig.NECESSARY_STYLES.BY_TAG_NAME.map(function (tag) {
        var regex = new RegExp(tag.ATTRIBUTE_REGEX_VALUE);
        return Array.from(head.querySelectorAll(tag.TAG_NAME)).filter(function (el) {
          if (el && el[tag.ATTRIBUTE_NAME] && el[tag.ATTRIBUTE_NAME].search(regex) !== -1) {
            return el;
          }

          el.remove();
        });
      }).filter(function (tag) {
        return tag;
      });
      tags.forEach(function (tagArray) {
        result = result.concat(tagArray);
      });
      result.forEach(function (tag) {
        head.appendChild(tag);
      });
    }
  }, {
    key: "maxWidthContainer",
    value: function maxWidthContainer(wrapper) {
      return wrapper ? wrapper.offsetWidth + 'px' : 'auto';
    }
  }, {
    key: "isVideo",
    value: function isVideo(cell) {
      if (cell) {
        if (cell.querySelectorAll(this.redditConfig.TAGS_FOR_VIDEO_CHECK).length) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "isPromoted",
    value: function isPromoted(cell) {
      var _this4 = this;

      if (cell) {
        var promotedCandidateFeed = Array.from(cell.querySelectorAll(this.redditConfig.FEED_CONTAINER.PROMOTED_SELECTOR)),
            promotedCandidateCommentPage = Array.from(cell.querySelectorAll(this.redditConfig.COMMENT_PAGE_CONTAINER.PROMOTED_SELECTOR)),
            promotedCandidateRightColumn = Array.from(cell.querySelectorAll(this.redditConfig.RIGHT_COLUMN_CONTAINER.PROMOTED_SELECTOR)),
            concatCandidates = promotedCandidateFeed.concat(promotedCandidateRightColumn).concat(promotedCandidateCommentPage);

        if (concatCandidates.length) {
          return concatCandidates.some(function (el) {
            var promotedText = el.textContent;

            if (promotedText) {
              return _this4.redditConfig.FEED_CONTAINER.PROMOTED_ALIASES.some(function (promotedWord) {
                return promotedText.indexOf(promotedWord) >= 0;
              });
            } else if (el.dataset.beforeContent) {
              promotedText = el.dataset.beforeContent;
              return _this4.redditConfig.RIGHT_COLUMN_CONTAINER.PROMOTED_ALIASES.some(function (promotedWord) {
                return promotedText.indexOf(promotedWord) >= 0;
              });
            }
          });
        }
      }

      return false;
    }
  }, {
    key: "setSizesAndIdForAllElements",
    value: function setSizesAndIdForAllElements(element) {
      var _this5 = this;

      if (element) {
        var elementId = this.getElementId();
        element.setAttribute(PosdConst.ATTRIBUTE_BIS_ELEMENT_ID, elementId);
        element.querySelectorAll('*').forEach(function (node) {
          var elementId = _this5.getElementId();

          node.setAttribute(PosdConst.ATTRIBUTE_BIS_ELEMENT_ID, elementId);
          PosdCommon.SetFullSizeToElement(node);
        });
      }
    }
  }, {
    key: "IsPostContentRendered",
    value: function IsPostContentRendered(ad, minImgSquerePercentage) {
      var rendered = false;

      if (ad) {
        var progressbars = ad.querySelectorAll(this.redditConfig.PROGRESS_SELECTOR);

        if (progressbars && progressbars.length === 0) {
          var adSize = PosdCommon.GetFullElementSize(ad);

          if (adSize.w > 0) {
            var imagesSpace = PosdCommon.GetImagesSpacePercentage(this.redditConfig.TAGS_FOR_LOADING_CHECK, ad, adSize);

            if (imagesSpace >= minImgSquerePercentage) {
              rendered = true;
            }
          }
        }

        if (ad.querySelector(this.redditConfig.TAGS_FOR_TEXT_AD_CHECK)) {
          rendered = true;
        }
      }

      return rendered;
    }
  }, {
    key: "processAndSendRedditAd",
    value: function processAndSendRedditAd(bisId, adReddit) {
      var ad = document.querySelector("[bis_id=".concat(bisId, "]"));
      var checkOnVideoTag = ad ? !!ad.querySelector(this.redditConfig.TAGS_FOR_VIDEO_CHECK) : false;
      var checkOnTextAd = ad ? !!ad.querySelector(this.redditConfig.TAGS_FOR_TEXT_AD_CHECK) : false;

      if (ad) {
        PosdContentIOManager.SendRedditCandidatePlacements(this.id, 1, null);
        PosdContentIOManager.SendRedditCandidates(this.id, [adReddit], null);

        if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
          if (checkOnVideoTag) {
            ad.style.cssText += PosdConst.STYLES_OUTLINE_VIDEO_BANNER;
          } else if (checkOnTextAd) {
            ad.style.cssText += PosdConst.STYLES_OUTLINE_TEXT_BANNER;
          } else {
            ad.style.cssText += PosdConst.STYLES_OUTLINE_SUCCESS_DETECT;
          }
        }
      }
    }
  }, {
    key: "onPageUrlChanged",
    value: function onPageUrlChanged(pageUrl, ticketId) {
      if (this.available) {
        if (!this.reactivateDetectorTimeout) {
          this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100);
        } else {}
      }
    }
  }, {
    key: "setActive",
    set: function set(status) {
      if (typeof status === 'boolean') {
        this.isActive = status;
      }
    }
  }, {
    key: "setAvailable",
    set: function set(status) {
      if (typeof status === 'boolean') {
        this.available = status;
      }
    }
  }, {
    key: "getFeedContainer",
    get: function get() {
      var query = this.redditConfig.FEED_CONTAINER.QUERY,
          minHeight = 1000,
          maxWidth = window.innerWidth,
          topDistance = this.redditConfig.FEED_CONTAINER.TOP_DISTANCE,
          exclusionQuery = this.redditConfig.FEED_CONTAINER.QUERY_TO_EXCLUDE,
          result = null;
      var candidates = Array.from(document.querySelectorAll(query));

      for (var _i = 0, _candidates = candidates; _i < _candidates.length; _i++) {
        var candidate = _candidates[_i];
        var elementStyles = getComputedStyle(candidate);
        var elementCoordinates = candidate.getBoundingClientRect();
        var widthCheck = (maxWidth - parseInt(elementStyles.width)) / maxWidth * 100;

        if (parseInt(elementStyles.height) > minHeight && widthCheck > 2 && (parseInt(elementCoordinates.top) > topDistance || parseInt(elementCoordinates.top) === this.lastTopPosition || parseInt(elementCoordinates.top) - this.lastTopPosition < 51 && parseInt(elementCoordinates.top) - this.lastTopPosition > -51) && candidate.querySelector(exclusionQuery) === null && candidate.nextSibling) {
          result = candidate;
          break;
        }
      }

      return result;
    }
  }, {
    key: "getCommentPageContainer",
    get: function get() {
      var query = this.isCommentPopup ? this.redditConfig.COMMENT_PAGE_CONTAINER.QUERY_IF_POPUP : this.redditConfig.COMMENT_PAGE_CONTAINER.QUERY_IF_PAGE,
          minHeight = this.redditConfig.COMMENT_PAGE_CONTAINER.MIN_HEIGHT,
          maxWidth = window.innerWidth,
          topDistance = this.redditConfig.COMMENT_PAGE_CONTAINER.TOP_DISTANCE,
          result = null;
      var candidates = Array.from(document.querySelectorAll(query));

      for (var _i2 = 0, _candidates2 = candidates; _i2 < _candidates2.length; _i2++) {
        var candidate = _candidates2[_i2];
        var elementCoordinates = candidate.getBoundingClientRect();
        var widthCheck = (maxWidth - parseInt(candidate.offsetWidth)) / maxWidth * 100;
        var children = Array.from(candidate.children);
        var checkChildOnTabindex = children.some(function (c) {
          return c && c.getAttribute('tabindex') === '0';
        });

        if (children.length < 3 && checkChildOnTabindex) {
          continue;
        }

        if (parseInt(candidate.offsetHeight) > minHeight && widthCheck > 2 && (parseInt(elementCoordinates.top) > topDistance || parseInt(elementCoordinates.top) < 0) && candidate.previousSibling && candidate.previousSibling.getAttribute('tabindex') === '0') {
          result = candidate;
          break;
        }
      }

      return result;
    }
  }, {
    key: "headCopyWithStyles",
    get: function get() {
      var _this6 = this;

      var head = document.querySelector('head').cloneNode(true);
      this.redditConfig.NECESSARY_STYLES.BY_DATA_ATTRIBUTE.forEach(function (attributeData) {
        var key = attributeData.KEY;
        var dataValues = attributeData.ALL_STYLES_FROM;
        var dataValuesCommentPage = attributeData.COMMENT_PAGE;
        var dataValuesFeed = attributeData.FEED_PAGE;

        var _loop = function _loop() {
          var el = _Array$from[_i3];

          if (el.nodeName.search(/^(style|link)$/gi) === -1) {
            el.remove();
            return "continue";
          }

          if (el.dataset[key]) {
            var check = dataValues.some(function (str) {
              return el.dataset[key].includes(str);
            });

            if (!check && _this6.isCommentPage) {
              check = dataValuesCommentPage.some(function (str) {
                return el.dataset[key].includes(str);
              });
            }

            if (!check && !_this6.isCommentPage) {
              check = dataValuesFeed.some(function (str) {
                return el.dataset[key].includes(str);
              });
            }

            if (!check) {
              el.remove();
            }
          }

          ;
        };

        for (var _i3 = 0, _Array$from = Array.from(head.children); _i3 < _Array$from.length; _i3++) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }
      });

      if (this.neccesaryStyleRules) {
        var fontStylesTag = document.createElement('style');
        fontStylesTag.innerHTML = this.neccesaryStyleRules;
        head.appendChild(fontStylesTag);
      }

      this.getStylesByTagName(head);
      return head;
    }
  }, {
    key: "neccesaryStyleRules",
    get: function get() {
      var result = null;
      var allRules = this.redditConfig.NECESSARY_STYLES.BY_QUERIES_RULES.map(function (q) {
        var reg = new RegExp(q, 'gi');
        var allRulesByQuery = document.querySelector('head').outerHTML.match(reg);
        var str;

        if (allRulesByQuery && allRulesByQuery.length) {
          str = allRulesByQuery.join('');
        }

        return str;
      }).filter(function (el) {
        return el;
      });

      if (allRules && allRules.length) {
        result = allRules.join('');
      }

      return result;
    }
  }, {
    key: "bodyCopyWithStyles",
    get: function get() {
      var body = document.createElement('body');
      var copyStyles = document.querySelector('body style').cloneNode(true);
      body.appendChild(copyStyles);
      return body;
    }
  }, {
    key: "getRightColumnContainer",
    get: function get() {
      var query = this.redditConfig.RIGHT_COLUMN_CONTAINER.QUERY;
      var container = null;

      if (!this.isCommentPopup) {
        container = document.querySelector(query);
        return container;
      }

      if (this.commentPageContainer && this.commentPageContainer.parentElement && this.commentPageContainer.parentElement.nextSibling) {
        var candidate = this.commentPageContainer.parentElement.nextSibling.firstChild;

        if (candidate.children.length) {
          container = candidate;
        }
      }

      return container;
    }
  }, {
    key: "isCommentPage",
    get: function get() {
      return window.location.href.indexOf(this.redditConfig.COMMENT_PAGE_CONTAINER.TEXT_FROM_HREF) !== -1;
    }
  }, {
    key: "isCommentPopup",
    get: function get() {
      return !!document.querySelector(this.redditConfig.COMMENT_PAGE_CONTAINER.QUERY_IS_POPUP);
    }
  }]);

  return PosdRedditAds;
}(PosdAdsCandidates);

module.exports = PosdRedditAds;

/***/ }),

/***/ "./src/content/detectors/Reddit/RedditVideoAndRightColumnDetector.js":
/*!***************************************************************************!*\
  !*** ./src/content/detectors/Reddit/RedditVideoAndRightColumnDetector.js ***!
  \***************************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdRedditVideoAndRightColumnAdUrlDetector = /*#__PURE__*/function () {
  function PosdRedditVideoAndRightColumnAdUrlDetector(id) {
    _classCallCheck(this, PosdRedditVideoAndRightColumnAdUrlDetector);

    this.id = id;
  }

  _createClass(PosdRedditVideoAndRightColumnAdUrlDetector, [{
    key: "InjectDetector",
    value: function InjectDetector(id, config) {
      var script = document.createElement('script');

      if (script && script.setAttribute) {
        script.setAttribute('bis_use', 'true');
      }

      script.innerHTML = PosdRedditVideoAndRightColumnAdUrlDetector.SendVideoData.toString() + PosdRedditVideoAndRightColumnAdUrlDetector.SendRightColumnAdUrl.toString() + "(" + this.funcToInject() + "(\"".concat(id, "\", ").concat(config, "))");

      if (document.head) {
        document.head.appendChild(script);
      } else {}
    }
  }, {
    key: "funcToInject",
    value: function funcToInject() {
      return function (id, config) {
        var mpdUrl = '';

        function mpdUrlCheck(url) {
          var reg = new RegExp(config.VIDEO_TRAFFIC_DETECTOR.VIDEO_MPD_URL_CHECK);
          return reg.test(url);
        }

        function rightColumnUrlAdCheck(url) {
          var reg = new RegExp(config.RIGHT_COLUMN_CONTAINER.PATH_WITH_AD_URL);
          return reg.test(url);
        }

        function prepareVideoData(url) {
          var videoId = getVideoId(url);
          return {
            videoId: videoId,
            url: url
          };
        }

        function PreSendVideoData(url) {
          var videoData = prepareVideoData(url);
          SendVideoData(id, videoData);
        }

        function PreSendRightColumnData(data) {
          var fullData;

          try {
            fullData = JSON.parse(data.content);
          } catch (e) {
            fullData = null;
          }

          if (!fullData) {
            return;
          }

          var result = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = fullData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var i = _step.value;
              var obj = {};

              if (i.source && i.source.hasOwnProperty('outboundUrl')) {
                obj.elementId = i.id;
                obj.targetUrl = i.source.outboundUrl;
                result.push(obj);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          SendRightColumnAdUrl(id, result);
        }

        function getVideoId(url) {
          var reg = new RegExp(config.VIDEO_TRAFFIC_DETECTOR.VIDEO_ID_REGEX);
          var matchedIds = url.match(reg),
              result = null;

          if (matchedIds && matchedIds.length) {
            result = matchedIds[1];
          }

          return result;
        }

        var open = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function () {
          this.requestMethod = arguments[0];
          this.url = arguments[1];
          open.apply(this, arguments);
        };

        var send = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function () {
          var self = this;
          var needUrlVideo = mpdUrlCheck(self.url);
          var needUrlRighColumnAd = rightColumnUrlAdCheck(self.url);
          var handler;

          if (!needUrlVideo && !needUrlRighColumnAd) {
            return send.apply(this, arguments);
          }

          var getRightColumnAdUrl = function getRightColumnAdUrl() {
            var _arguments = arguments,
                _this = this;

            if (needUrlRighColumnAd && self.readyState === 4) {
              var data = {
                url: self.url,
                content: self.responseType === '' || self.responseType === 'text' ? self.responseText : ''
              };
              PreSendRightColumnData(data);
            } else if (needUrlRighColumnAd && self.readyState !== 4) {
              handler = setTimeout(function () {
                return getRightColumnAdUrl.apply(_this, _arguments);
              }, 100);
            } else if (handler) {
              clearTimeout(handler);
            }
          };

          getRightColumnAdUrl();
          mpdUrl = self.url;
          PreSendVideoData(mpdUrl);
          return send.apply(this, arguments);
        };
      }.toString();
    }
  }], [{
    key: "SendVideoData",
    value: function SendVideoData(id, videoData) {
      function GenerateQuickId() {
        var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return randomStrId.substring(0, 22);
      }

      try {
        videoData.detectionTime = Date.now() / 1000 | 0;
        var _mes = {
          posdMessageId: 'PANELOS_MESSAGE',
          posdHash: GenerateQuickId(),
          type: 'REDDIT_VIDEO_DATA',
          from: id,
          to: id.substring(0, id.length - 2),
          content: videoData
        };
        window.postMessage(_mes);
      } catch (e) {}
    }
  }, {
    key: "SendRightColumnAdUrl",
    value: function SendRightColumnAdUrl(id, data) {
      function GenerateQuickId() {
        var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return randomStrId.substring(0, 22);
      }

      try {
        var _mes2 = {
          posdMessageId: 'PANELOS_MESSAGE',
          posdHash: GenerateQuickId(),
          type: 'REDDIT_RIGHT_COLUMN_DATA',
          from: id,
          to: id.substring(0, id.length - 2),
          content: data
        };
        window.postMessage(_mes2);
      } catch (e) {}
    }
  }]);

  return PosdRedditVideoAndRightColumnAdUrlDetector;
}();

module.exports = PosdRedditVideoAndRightColumnAdUrlDetector;

/***/ }),

/***/ "./src/content/detectors/Twitter/TwitterAds.js":
/*!*****************************************************!*\
  !*** ./src/content/detectors/Twitter/TwitterAds.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdConfig = __webpack_require__(/*! ../../../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../../../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../../../libs/Constants */ "./src/libs/Constants.js");

var PosdAdsCandidates = __webpack_require__(/*! ../../AdsCandidates */ "./src/content/AdsCandidates.js");

var PosdContentIOManager = __webpack_require__(/*! ../../ContentIOManager */ "./src/content/ContentIOManager.js");

var PosdTwitterVideoDetector = __webpack_require__(/*! ./TwitterVideoDetector */ "./src/content/detectors/Twitter/TwitterVideoDetector.js");

var PosdTwitterAds = /*#__PURE__*/function (_PosdAdsCandidates) {
  _inherits(PosdTwitterAds, _PosdAdsCandidates);

  function PosdTwitterAds(id, Config, IOManager, AdBlockerAgent) {
    var _this;

    _classCallCheck(this, PosdTwitterAds);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosdTwitterAds).call(this, id));
    _this.available = false;
    _this.onPageRefreshed = _this.onPageUrlChanged;
    _this.twConfig = Config.GetTwitterConfig();
    _this.IOManager = IOManager;
    _this.AdBlockerAgent = AdBlockerAgent;
    _this.feedObserver = null;
    _this.rightColumnObserver = null;
    _this.elementId = 0;
    _this.activated = false;
    _this.processTwitterAdsInterval = null;
    _this.observerNodesListenerInterval = null;
    _this.reactivateDetectorTimeout = null;
    _this.observerNodesChecksAmount = 0;
    _this.lastFeedPostAdsCheckTime = PosdCommon.GetCurrentTimestampMs();
    _this.lastFeedWhoToFollowAdsCheckTime = PosdCommon.GetCurrentTimestampMs();
    _this.lastRightColumnWhoToFollowAdsCheckTime = PosdCommon.GetCurrentTimestampMs();
    _this.VideoTrafficDetector = null;

    _this.ActivateVideoTrafficDetector(PosdConst.ACTIVATION_BY_ADS_SELF);

    return _this;
  }

  _createClass(PosdTwitterAds, [{
    key: "onPageUrlChanged",
    value: function onPageUrlChanged(pageUrl, ticketId) {
      if (this.available) {
        if (!this.reactivateDetectorTimeout) {
          this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100);
        } else {}
      }
    }
  }, {
    key: "ActivateVideoTrafficDetector",
    value: function ActivateVideoTrafficDetector(activator) {
      if (!this.VideoTrafficDetector) {
        this.VideoTrafficDetector = new PosdTwitterVideoDetector(this.id);
        this.VideoTrafficDetector.InjectDetector(this.id + '_w', JSON.stringify(this.twConfig.VIDEO_TRAFFIC_DETECTOR));
      }
    }
  }, {
    key: "ActivateDetector",
    value: function ActivateDetector(activator) {
      var _this2 = this;

      if (activator === PosdConst.ACTIVATION_BY_ADS_MANAGER) {
        this.available = true;
      }

      if (this.twConfig && !this.activated) {
        this.activated = true;
        this.ActivateVideoTrafficDetector(activator);
        this.lastFeedPostAdsCheckTime = PosdCommon.GetCurrentTimestampMs() - 3000;
        this.lastFeedWhoToFollowAdsCheckTime = PosdCommon.GetCurrentTimestampMs() - 3000;
        this.lastRightColumnWhoToFollowAdsCheckTime = PosdCommon.GetCurrentTimestampMs() - 3000;
        this.processTwitterAdsInterval = setInterval(this.processTwitterAds.bind(this, PosdConst.AD_DETECTOR_INITIATOR_TIMER), 1000);

        if (this.AdBlockerAgent.IsEnabledForTwitter()) {
          this.processTwitterAds(PosdConst.AD_DETECTOR_INITIATOR_ACTIVATION);
          setTimeout(this.processTwitterAds.bind(this, PosdConst.AD_DETECTOR_INITIATOR_ACTIVATION), 350);
          setTimeout(this.processTwitterAds.bind(this, PosdConst.AD_DETECTOR_INITIATOR_ACTIVATION), 700);
        }

        this.observerNodesListenerInterval = setInterval(function () {
          _this2.observerNodesChecksAmount = _this2.observerNodesChecksAmount + 1;
          var feed = document.querySelector(_this2.twConfig.FEED_CONTAINER);

          if (!_this2.feedObserver && feed) {
            _this2.feedObserver = new MutationObserver(_this2.processFeedTwitterAds.bind(_this2, PosdConst.AD_DETECTOR_INITIATOR_MUTATION));

            _this2.feedObserver.observe(feed, {
              childList: true,
              subtree: true
            });
          }

          var rightColumn = document.querySelector(_this2.twConfig.RIGHT_COLUMN_CONTAINER);

          if (!_this2.rightColumnObserver && rightColumn) {
            _this2.rightColumnObserver = new MutationObserver(_this2.processRightColumnWhoToFollowAds.bind(_this2, PosdConst.AD_DETECTOR_INITIATOR_MUTATION));

            _this2.rightColumnObserver.observe(rightColumn, {
              childList: true,
              subtree: true
            });
          }

          if (feed && rightColumn || _this2.observerNodesChecksAmount > 20) {
            clearInterval(_this2.observerNodesListenerInterval);
            _this2.observerNodesListenerInterval = null;
          }
        }, 300);
      }
    }
  }, {
    key: "DeactivateDetector",
    value: function DeactivateDetector() {
      if (this.processTwitterAdsInterval) {
        clearInterval(this.processTwitterAdsInterval);
        this.processTwitterAdsInterval = null;
      }

      if (this.observerNodesListenerInterval) {
        clearInterval(this.observerNodesListenerInterval);
        this.observerNodesListenerInterval = null;
      }

      if (this.feedObserver) {
        this.feedObserver.disconnect();
        this.feedObserver = null;
      }

      if (this.rightColumnObserver) {
        this.rightColumnObserver.disconnect();
        this.rightColumnObserver = null;
      }

      this.observerNodesChecksAmount = 0;
      this.activated = false;
    }
  }, {
    key: "ReActivateDetector",
    value: function ReActivateDetector() {
      this.reactivateDetectorTimeout = null;
      this.DeactivateDetector();
      this.ActivateDetector();
    }
  }, {
    key: "processFeedTwitterAds",
    value: function processFeedTwitterAds(initiator) {
      this.processFeedPostAds(initiator);
      this.processFeedWhoToFollowAds(initiator);
    }
  }, {
    key: "processTwitterAds",
    value: function processTwitterAds(initiator) {
      this.processRightColumnWhoToFollowAds(initiator);
      this.processFeedTwitterAds(initiator);
    }
  }, {
    key: "processFeedPostAds",
    value: function processFeedPostAds(initiator) {
      var currentTime = PosdCommon.GetCurrentTimestampMs();

      if (currentTime - this.lastFeedPostAdsCheckTime > 300) {
        this.extractOccurrences(PosdConst.TWITTER_AD_PLACEMENT_TYPE_FEED);
        this.lastFeedPostAdsCheckTime = currentTime;
      }
    }
  }, {
    key: "processRightColumnWhoToFollowAds",
    value: function processRightColumnWhoToFollowAds(initiator) {
      var currentTime = PosdCommon.GetCurrentTimestampMs();

      if (currentTime - this.lastRightColumnWhoToFollowAdsCheckTime > 300) {
        this.extractOccurrences(PosdConst.TWITTER_AD_PLACEMENT_TYPE_RIGHT_COLUMN_WHO_TO_FOLLOW);
        this.lastRightColumnWhoToFollowAdsCheckTime = currentTime;
      }
    }
  }, {
    key: "processFeedWhoToFollowAds",
    value: function processFeedWhoToFollowAds(initiator) {
      var currentTime = PosdCommon.GetCurrentTimestampMs();

      if (currentTime - this.lastFeedWhoToFollowAdsCheckTime > 300) {
        this.extractOccurrences(PosdConst.TWITTER_AD_PLACEMENT_TYPE_FEED_WHO_TO_FOLLOW);
        this.lastFeedWhoToFollowAdsCheckTime = currentTime;
      }
    }
  }, {
    key: "allCellsAndMinImgSpace",
    value: function allCellsAndMinImgSpace(adPlacementType) {
      var _this3 = this;

      var allCells = [];
      var minImgSquerePercentage = 0;

      if (adPlacementType === PosdConst.TWITTER_AD_PLACEMENT_TYPE_RIGHT_COLUMN_WHO_TO_FOLLOW) {
        allCells = Array.from(document.querySelectorAll(this.twConfig.RIGHT_COLUMN_WHO_TO_FOLLOW_SELECTOR));
        minImgSquerePercentage = this.twConfig.RIGHT_COLUMN_MIN_IMGS_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.TWITTER_AD_PLACEMENT_TYPE_FEED) {
        allCells = Array.from(document.querySelectorAll(this.twConfig.FEED_TWEETS_SELECTOR));
        minImgSquerePercentage = this.twConfig.FEED_MIN_IMGS_SPACE_PERCENTAGE;
      } else if (adPlacementType === PosdConst.TWITTER_AD_PLACEMENT_TYPE_FEED_WHO_TO_FOLLOW) {
        allCells = Array.from(document.querySelectorAll(this.twConfig.FEED_WHO_TO_FOLLOW_SELECTOR));
        minImgSquerePercentage = this.twConfig.FEED_WHO_TO_FOLLOW_MIN_IMGS_SPACE_PERCENTAGE;
      }

      allCells = allCells.filter(function (cell) {
        return _this3.isPromoted(cell);
      });
      return {
        allCells: allCells,
        minImgSquerePercentage: minImgSquerePercentage
      };
    }
  }, {
    key: "extractOccurrences",
    value: function extractOccurrences(adPlacementType) {
      var _this$allCellsAndMinI = this.allCellsAndMinImgSpace(adPlacementType),
          allCells = _this$allCellsAndMinI.allCells,
          minImgSquerePercentage = _this$allCellsAndMinI.minImgSquerePercentage;

      if (allCells.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = allCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cell = _step.value;

            if (!cell.hasAttribute(PosdConst.ATTRIBUTE_BIS_ID) && !cell.hasAttribute(PosdConst.ATTRIBUTE_BIS_SIZE)) {
              if (this.IsPostContentRendered(cell, minImgSquerePercentage)) {
                var bisId = PosdCommon.GenerateAndSetBisIdToTwitterAds(cell);
                this.setSizesAndIdForAllElements(cell);
                var adTwitter = this.getAdTwitterObject(cell, adPlacementType);

                if (adPlacementType === PosdConst.TWITTER_AD_PLACEMENT_TYPE_FEED && this.isVideo(cell)) {
                  adTwitter.videoData = {};
                }

                if (this.AdBlockerAgent.IsEnabledForTwitter()) {
                  PosdCommon.HideElement(cell);
                  this.AdBlockerAgent.SetHiddenAmount(1);
                }

                setTimeout(this.processAndSendTwitterAd.bind(this, bisId, adTwitter), 100);
              } else {}
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "processAndSendTwitterAd",
    value: function processAndSendTwitterAd(bisId, adTwitter) {
      var ad = document.querySelector("[".concat(PosdConst.ATTRIBUTE_BIS_ID, "=").concat(bisId, "]"));
      var checkOnVideoTag = ad ? !!this.isVideo(ad) : false;

      if (ad) {
        PosdContentIOManager.SendTwitterCandidatePlacements(this.id, 1, null);
        PosdContentIOManager.SendTwitterCandidates(this.id, [adTwitter], null);

        if (PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
          ad.style.cssText += checkOnVideoTag ? PosdConst.STYLES_OUTLINE_VIDEO_BANNER : PosdConst.STYLES_OUTLINE_SUCCESS_DETECT;
        }
      }
    }
  }, {
    key: "setSizesAndIdForAllElements",
    value: function setSizesAndIdForAllElements(element) {
      var _this4 = this;

      if (element) {
        var elementId = this.getElementId();
        element.setAttribute(PosdConst.ATTRIBUTE_BIS_ELEMENT_ID, elementId);
        element.querySelectorAll('*').forEach(function (node) {
          var elementId = _this4.getElementId();

          node.setAttribute(PosdConst.ATTRIBUTE_BIS_ELEMENT_ID, elementId);
          PosdCommon.SetFullSizeToElement(node);
        });
      }
    }
  }, {
    key: "isPromoted",
    value: function isPromoted(cell) {
      var _this5 = this;

      if (cell) {
        var promotedCandidate = Array.from(cell.querySelectorAll(this.twConfig.PROMOTED_SELECTOR));

        if (promotedCandidate.length) {
          return promotedCandidate.some(function (el) {
            var promotedText = el.textContent;

            if (promotedText) {
              return _this5.twConfig.PROMOTED_ALIASES.some(function (promotedWord) {
                return promotedText.indexOf(promotedWord) >= 0;
              });
            } else {
              return false;
            }
          });
        }
      }

      return false;
    }
  }, {
    key: "isVideo",
    value: function isVideo(cell) {
      if (cell) {
        if (cell.querySelectorAll(this.twConfig.TAGS_FOR_VIDEO_TWEET_CHECK).length) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "isCarousel",
    value: function isCarousel(cell) {
      if (cell) {
        var listTag = cell.querySelector(this.twConfig.CHECK_IF_CAROUSEL_QUERY);

        if (listTag) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "IsPostContentRendered",
    value: function IsPostContentRendered(ad, minImgSquerePercentage) {
      var rendered = false;

      if (ad) {
        var progressbars = ad.querySelectorAll(this.twConfig.PROGRESS_SELECTOR);

        if (progressbars && progressbars.length === 0) {
          var adSize = PosdCommon.GetFullElementSize(ad);

          if (adSize.w > 0) {
            var imagesSpace = PosdCommon.GetImagesSpacePercentage(this.twConfig.TAGS_FOR_LOADING_CHECK, ad, adSize);

            if (imagesSpace >= minImgSquerePercentage) {
              rendered = true;
            }
          }
        }
      }

      return rendered;
    }
  }]);

  return PosdTwitterAds;
}(PosdAdsCandidates);

module.exports = PosdTwitterAds;

/***/ }),

/***/ "./src/content/detectors/Twitter/TwitterVideoDetector.js":
/*!***************************************************************!*\
  !*** ./src/content/detectors/Twitter/TwitterVideoDetector.js ***!
  \***************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdTwitterVideoDetector = /*#__PURE__*/function () {
  function PosdTwitterVideoDetector(id) {
    _classCallCheck(this, PosdTwitterVideoDetector);

    this.id = id;
  }

  _createClass(PosdTwitterVideoDetector, [{
    key: "InjectDetector",
    value: function InjectDetector(id, config) {
      var script = document.createElement('script');

      if (script && script.setAttribute) {
        script.setAttribute('bis_use', 'true');
      }

      script.innerHTML = PosdTwitterVideoDetector.SendVideoData.toString() + "(" + this.funcToInject() + "(\"".concat(id, "\", ").concat(config, "))");

      if (document.head) {
        document.head.appendChild(script);
      } else {}
    }
  }, {
    key: "funcToInject",
    value: function funcToInject() {
      return function (id, config) {
        var __extends = this && this.__extends || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }

          function __() {
            this.constructor = d;
          }

          __.prototype = b.prototype;
          d.prototype = new __();
        };

        var Helper = function () {
          function Helper() {}

          Helper.isWhiteSpace = function (s) {
            return /\s/g.test(s);
          };

          Helper.isLetter = function (letter) {
            return letter.match(/[a-z]/i);
          };

          Helper.isNumber = function (n) {
            return !isNaN(parseFloat(n)) && !isNaN(n - 0);
          };

          Helper.capitalizeFirst = function (s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
          };

          Helper.isLookLikeLogicalOperator = function (_char) {
            return ['>', '<', '=', '!'].includes(_char);
          };

          return Helper;
        }();

        var SelectorPropertyBuilder = function () {
          function SelectorPropertyBuilder() {
            this.reset();
          }

          SelectorPropertyBuilder.prototype.reset = function () {
            this._prop = '';
            this._alias = null;
          };

          SelectorPropertyBuilder.prototype.hasProp = function () {
            return this._prop.length > 0;
          };

          SelectorPropertyBuilder.prototype.build = function () {
            if (!this.hasProp()) {
              return [];
            }

            var property = {
              prop: this._prop,
              alias: this._alias
            };
            this.reset();
            return property;
          };

          SelectorPropertyBuilder.prototype.addCharToAlias = function (_char2) {
            this._alias = this._alias ? this._alias + _char2 : _char2;
          };

          SelectorPropertyBuilder.prototype.addCharToProp = function (_char3) {
            this._prop = this._prop ? this._prop + _char3 : _char3;
          };

          return SelectorPropertyBuilder;
        }();

        var CONDITION_TYPE = {
          OPERATOR: 'OPERATOR',
          OPERAND_CONST_STRING_VALUE: 'OPERAND_CONST_STRING_VALUE',
          OPERAND_CONST_NUMBER_VALUE: 'OPERAND_CONST_NUMBER_VALUE',
          OPERAND_PROPERTY: 'OPERAND_PROPERTY'
        };

        var FilterConditionBuilder = function () {
          function FilterConditionBuilder() {
            this.reset();
          }

          FilterConditionBuilder.prototype.reset = function () {
            this._value = null;
            this._type = null;
          };

          FilterConditionBuilder.prototype.build = function () {
            if (!this._type) {
              return [];
            }

            var value = this._type === CONDITION_TYPE.OPERAND_CONST_NUMBER_VALUE ? parseFloat(this._value) : this._value;
            var mapper = {
              OPERATOR: 'OPERATOR',
              OPERAND_CONST_STRING_VALUE: 'CONST_VALUE',
              OPERAND_CONST_NUMBER_VALUE: 'CONST_VALUE',
              OPERAND_PROPERTY: 'PROPERTY'
            };
            var type = mapper[this._type];
            var condition = {
              type: type,
              value: value
            };
            this.reset();
            return condition;
          };

          FilterConditionBuilder.prototype.markAsOperator = function () {
            this._type = CONDITION_TYPE.OPERATOR;
            return this;
          };

          FilterConditionBuilder.prototype.markAsConstStringValueOperand = function () {
            this._type = CONDITION_TYPE.OPERAND_CONST_STRING_VALUE;
            return this;
          };

          FilterConditionBuilder.prototype.markAsConstNumberValueOperand = function () {
            this._type = CONDITION_TYPE.OPERAND_CONST_NUMBER_VALUE;
            return this;
          };

          FilterConditionBuilder.prototype.markAsPropertyOperand = function () {
            this._type = CONDITION_TYPE.OPERAND_PROPERTY;
            return this;
          };

          FilterConditionBuilder.prototype.addCharToValue = function (_char4) {
            this._value = this._value ? this._value + _char4 : _char4;
            return this;
          };

          FilterConditionBuilder.prototype.withValue = function (value) {
            this._value = value;
            return this;
          };

          return FilterConditionBuilder;
        }();

        var RuleBuilder = function () {
          function RuleBuilder() {
            this._selectBuilder = new SelectorPropertyBuilder();
            this._filterBuilder = new FilterConditionBuilder();
            this.reset();
          }

          RuleBuilder.prototype.reset = function () {
            this.filterBuilder().reset();
            this.selectBuilder().reset();
            this._element = '';
            this._select = [];
            this._filter = [];
            this._limit = null;
            return this;
          };

          RuleBuilder.prototype.filterBuilder = function () {
            return this._filterBuilder;
          };

          RuleBuilder.prototype.selectBuilder = function () {
            return this._selectBuilder;
          };

          RuleBuilder.prototype.build = function () {
            var rule = {
              element: this._element,
              select: this._select,
              filter: this._filter,
              limit: this._limit
            };
            this.reset();
            return rule;
          };

          RuleBuilder.prototype.addCharToElementName = function (_char5) {
            this._element += _char5;
            return this;
          };

          RuleBuilder.prototype.hasElementName = function () {
            return this._element.length > 0;
          };

          RuleBuilder.prototype.addConditionToFilter = function (condition) {
            this._filter.push(condition);

            return this;
          };

          RuleBuilder.prototype.addPropertyToSelect = function (select) {
            this._select.push(select);

            return this;
          };

          RuleBuilder.prototype.hasPropertiesInSelect = function () {
            return this._select.length > 0;
          };

          return RuleBuilder;
        }();

        var ruleBuilder = new RuleBuilder();

        var JsonQuery = function () {
          function JsonQuery() {}

          JsonQuery.query = function (query, data) {
            var parser = new Parser(query);
            var rules = parser.parse(0);
            var obj = data;
            var items = [{
              data: obj,
              parents: []
            }];
            var parentCounter = 0;
            var parents = [];

            for (var i = 0; i < rules.length; i++) {
              var rule_1 = rules[i];
              var next = [];

              for (var _i = 0; _i < items.length; _i++) {
                var item = items[_i];

                if (!item.data.hasOwnProperty(rule_1.element)) {
                  continue;
                }

                var row = {
                  data: item.data[rule_1.element],
                  parents: item.parents.slice()
                };

                if (rule_1.limit === '*') {
                  var pre_data = row.data;

                  if (!row.data.length) {
                    pre_data = Object.keys(row.data);
                  }

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = pre_data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var key = _step.value;
                      var indexKey = typeof key === 'string' ? key : row.data.indexOf(key);
                      var data_1 = row.data[indexKey];
                      var newRow = {
                        data: data_1,
                        parents: item.parents.slice()
                      };

                      if (rule_1.select.length > 0) {
                        var parent = {
                          element: rule_1.element,
                          data: {}
                        };
                        rule_1.select.forEach(function (el) {
                          if (el.prop.includes('.')) {
                            var props = el.prop.split('.');
                            var tempObj;
                            var lastIndex = props.length - 1;
                            props.forEach(function (p, i) {
                              if (!tempObj) {
                                tempObj = data_1[p];
                              }

                              if (tempObj.hasOwnProperty(p) && i !== lastIndex && tempObj[p]) {
                                tempObj = tempObj[p];
                              }

                              if (tempObj.hasOwnProperty(p) && i === lastIndex && tempObj[p]) {
                                var column = el.alias ? el.alias : p;
                                parent.data[column] = tempObj[p];
                              }
                            });
                          }

                          if (data_1.hasOwnProperty(el.prop) && !parent.data[column]) {
                            var column = el.alias ? el.alias : el.prop;
                            parent.data[column] = data_1[el.prop];
                          }
                        });
                        parents.push(parent);
                        newRow.parents.push(parentCounter);
                        parentCounter = parentCounter + 1;
                      }

                      next.push(newRow);
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }
                } else {
                  next.push(row);
                }
              }

              items = next;

              if (rule_1.filter.length > 0) {
                var leftOperand = rule_1.filter[0];
                var operator = rule_1.filter[1];
                var rightOperand = rule_1.filter[2];

                var getValue = function getValue(item, operand) {
                  return operand.type === 'CONST_VALUE' ? operand.value : item.data[operand.value];
                };

                items = items.filter(function (item) {
                  var leftValue = getValue(item, leftOperand);
                  var rightValue = getValue(item, rightOperand);

                  if (operator.value === '==') {
                    return leftValue == rightValue;
                  } else if (operator.value === '===') {
                    return leftValue === rightValue;
                  } else if (operator.value === '!=') {
                    return leftValue != rightValue;
                  } else if (operator.value === '!==') {
                    return leftValue !== rightValue;
                  } else if (operator.value === '>=') {
                    return leftValue >= rightValue;
                  } else if (operator.value === '<=') {
                    return leftValue <= rightValue;
                  } else if (operator.value === '>') {
                    return leftValue > rightValue;
                  } else if (operator.value === '<') {
                    return leftValue < rightValue;
                  }
                });
              }
            }

            var rule = rules[rules.length - 1];
            var tweetsCollection = [];
            items.forEach(function (item) {
              if (item.parents.length) {
                item.parents.forEach(function (index) {
                  var parent = parents[index];

                  if (!tweetsCollection.hasOwnProperty(index)) {
                    tweetsCollection[index] = {};
                    tweetsCollection[index][parent.element] = parent.data;
                  }

                  tweetsCollection[index][rule.element] = tweetsCollection[index][rule.element] ? tweetsCollection[index][rule.element].concat(item.data) : [item.data];
                });
              }
            });
            var result = tweetsCollection.filter(function (i) {
              return i;
            });
            return result;
          };

          return JsonQuery;
        }();

        var OPERATIONS = {
          FILTER: 'filter',
          SELECT: 'select'
        };

        var AbstractParser = function () {
          function AbstractParser(query) {
            if (typeof query !== 'string') {
              throw new TypeError("Param \"query\" must be string type");
            } else if (query.trim().length === 0) {
              throw new TypeError("Param \"query\" must be not empty type");
            }

            this._query = query;
            this._process = null;
            this._pos = null;
          }

          AbstractParser.prototype.switchProcess = function (process) {
            this._process = process;
          };

          AbstractParser.prototype.isRunningProcess = function (process) {
            return this._process === process;
          };

          AbstractParser.prototype.parse = function (pos) {
            throw new Error("A child must implement this method");
          };

          AbstractParser.prototype.name = function () {
            throw new Error("A child must implement this method");
          };

          AbstractParser.prototype.throwSyntaxError = function (msg) {
            throw new SyntaxError("JsonQuery: " + msg);
          };

          AbstractParser.prototype.throwSyntaxErrorWithTrace = function (msg) {
            var sub = this._query.substr(0, this._pos + 1);

            this.throwSyntaxError(msg + " \"" + sub + "\"");
          };

          AbstractParser.prototype.throwSyntaxErrorUnexpectedChar = function () {
            var _char6 = this._query[this._pos];
            this.throwSyntaxErrorWithTrace("Unexpected symbol \"" + _char6 + "\" in");
          };

          return AbstractParser;
        }();

        var SELECT_OPERATION_PROCESS = {
          LOOKING_FOR_PROPERTY: 'LOOKING_FOR_PROPERTY',
          LOOKING_FOR_SEPARATOR_OR_ALIAS: 'LOOKING_FOR_SEPARATOR_OR_ALIAS',
          LOOKING_FOR_ALIAS_NAME: 'LOOKING_FOR_ALIAS_NAME',
          SELECT_OPERATION_SUCCESS: 'SELECT_OPERATION_SUCCESS',
          SELECT_OPERATION_BEFORE_FINISH: 'SELECT_OPERATION_BEFORE_FINISH',
          SELECT_RECORDING_PROPERTY_NAME: 'SELECT_RECORDING_PROPERTY_NAME',
          SELECT_PARSING_ALIAS_KEYWORD: 'SELECT_PARSING_ALIAS_KEYWORD',
          SELECT_RECORDING_ALIAS_NAME: 'SELECT_RECORDING_ALIAS_NAME'
        };

        var SelectOperationParser = function (_super) {
          __extends(SelectOperationParser, _super);

          function SelectOperationParser() {
            _super.apply(this, arguments);
          }

          SelectOperationParser.prototype.parse = function (pos) {
            var selectBuilder = ruleBuilder.selectBuilder();

            this._runLookingForPropertyProcess();

            for (this._pos = pos; this._pos < this._query.length; this._pos++) {
              var _char7 = this._query[this._pos];

              if (this._isLookingForProperty()) {
                if (_char7 === ' ') {
                  continue;
                } else if (_char7 === ')') {
                  this._pos = this._pos - 1;

                  this._finishParsing();
                } else {
                  this._pos = this._pos - 1;

                  this._runRecordingPropertyNameProcess();
                }
              } else if (this._isRecordingPropertyName()) {
                if (_char7 === ' ') {
                  this._runLookingForSeparatorOrAlias();
                } else if (_char7 === ',') {
                  var prop = selectBuilder.build();
                  ruleBuilder.addPropertyToSelect(prop);

                  this._runLookingForPropertyProcess();
                } else if (_char7 === ')') {
                  this._pos = this._pos - 1;

                  this._finishParsing();
                } else {
                  selectBuilder.addCharToProp(_char7);
                }
              } else if (this._isLookingForSeparatorOrAlias()) {
                if (_char7 === ' ') {
                  continue;
                }

                if (_char7 === ')') {
                  this._pos = this._pos - 1;

                  this._finishParsing();
                } else if (_char7 === ',') {
                  var prop = selectBuilder.build();
                  ruleBuilder.addPropertyToSelect(prop);

                  this._runLookingForPropertyProcess();
                } else if (_char7 === 'a') {
                  this._pos = this._pos - 1;

                  this._runParsingAlias();
                } else {
                  this.throwSyntaxErrorUnexpectedChar();
                }
              } else if (this._isParsingAliasKeyword()) {
                var substr = this._query.substr(this._pos).toLowerCase();

                var lookingFor = 'as ';

                if (substr.startsWith(lookingFor)) {
                  this._pos = this._pos + lookingFor.length - 1;

                  this._runLookingForAliasName();

                  continue;
                }

                this.throwSyntaxErrorUnexpectedChar();
              } else if (this._isLookingForAliasName()) {
                if (_char7 === ' ') {
                  continue;
                } else {
                  this._pos = this._pos - 1;

                  this._runRecordingAliasName();
                }
              } else if (this._isRecordingAliasName()) {
                if (_char7 === ' ') {
                  var prop = selectBuilder.build();
                  ruleBuilder.addPropertyToSelect(prop);

                  this._runLookingForPropertyProcess();
                } else if (_char7 === ',') {
                  var prop = selectBuilder.build();
                  ruleBuilder.addPropertyToSelect(prop);

                  this._runLookingForPropertyProcess();
                } else if (_char7 === ')') {
                  this._pos = this._pos - 1;

                  this._finishParsing();
                } else {
                  selectBuilder.addCharToAlias(_char7);
                }
              } else if (this._isFinishOperation()) {
                if (selectBuilder.hasProp()) {
                  var prop = selectBuilder.build();
                  ruleBuilder.addPropertyToSelect(prop);
                }

                this._markAsSuccessParsing();

                break;
              }
            }

            if (!this._isSuccessParsed()) {
              this.throwSyntaxErrorWithTrace("unexpected end of select operation");
            } else if (!ruleBuilder.hasPropertiesInSelect()) {
              this.throwSyntaxErrorWithTrace("select operation requires at least one property");
            }

            return this._pos;
          };

          SelectOperationParser.prototype.name = function () {
            return OPERATIONS.SELECT;
          };

          SelectOperationParser.prototype._runLookingForPropertyProcess = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.LOOKING_FOR_PROPERTY);
          };

          SelectOperationParser.prototype._runRecordingPropertyNameProcess = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.SELECT_RECORDING_PROPERTY_NAME);
          };

          SelectOperationParser.prototype._runLookingForSeparatorOrAlias = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.LOOKING_FOR_SEPARATOR_OR_ALIAS);
          };

          SelectOperationParser.prototype._runParsingAlias = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.SELECT_PARSING_ALIAS_KEYWORD);
          };

          SelectOperationParser.prototype._runLookingForAliasName = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.LOOKING_FOR_ALIAS_NAME);
          };

          SelectOperationParser.prototype._runRecordingAliasName = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.SELECT_RECORDING_ALIAS_NAME);
          };

          SelectOperationParser.prototype._finishParsing = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.SELECT_OPERATION_BEFORE_FINISH);
          };

          SelectOperationParser.prototype._markAsSuccessParsing = function () {
            this.switchProcess(SELECT_OPERATION_PROCESS.SELECT_OPERATION_SUCCESS);
          };

          SelectOperationParser.prototype._isLookingForProperty = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.LOOKING_FOR_PROPERTY);
          };

          SelectOperationParser.prototype._isLookingForAliasName = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.LOOKING_FOR_ALIAS_NAME);
          };

          SelectOperationParser.prototype._isRecordingPropertyName = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.SELECT_RECORDING_PROPERTY_NAME);
          };

          SelectOperationParser.prototype._isSuccessParsed = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.SELECT_OPERATION_SUCCESS);
          };

          SelectOperationParser.prototype._isLookingForSeparatorOrAlias = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.LOOKING_FOR_SEPARATOR_OR_ALIAS);
          };

          SelectOperationParser.prototype._isParsingAliasKeyword = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.SELECT_PARSING_ALIAS_KEYWORD);
          };

          SelectOperationParser.prototype._isRecordingAliasName = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.SELECT_RECORDING_ALIAS_NAME);
          };

          SelectOperationParser.prototype._isFinishOperation = function () {
            return this.isRunningProcess(SELECT_OPERATION_PROCESS.SELECT_OPERATION_BEFORE_FINISH);
          };

          return SelectOperationParser;
        }(AbstractParser);

        var FILTER_PROCESS = {
          FILTER_LOOKING_FOR_OPERAND: 'FILTER_LOOKING_FOR_OPERAND',
          FILTER_LOOKING_FOR_OPERATOR: 'FILTER_LOOKING_FOR_OPERATOR',
          FILTER_RECORDING_PROPERTY_NAME: 'FILTER_RECORDING_PROPERTY_NAME',
          FILTER_RECORDING_STRING_VALUE: 'FILTER_RECORDING_STRING_VALUE',
          FILTER_RECORDING_NUMBER_VALUE: 'FILTER_RECORDING_NUMBER_VALUE',
          FILTER_PARSING_OPERATOR: 'FILTER_PARSING_OPERATOR',
          FILTER_FINISH_PROCESS: 'FILTER_FINISH_PROCESS',
          FILTER_SUCCESS: 'FILTER_SUCCESS'
        };

        var FilterOperationParser = function (_super) {
          __extends(FilterOperationParser, _super);

          function FilterOperationParser() {
            _super.apply(this, arguments);
          }

          FilterOperationParser.prototype.parse = function (pos) {
            var filterBuilder = ruleBuilder.filterBuilder();
            this.switchProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERAND);

            for (this._pos = pos; this._pos < this._query.length; this._pos++) {
              var _char8 = this._query[this._pos];

              if (this.isRunningProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERAND)) {
                if (_char8 === ' ') {
                  continue;
                } else if (_char8 === '@') {
                  filterBuilder.markAsPropertyOperand();
                  this.switchProcess(FILTER_PROCESS.FILTER_RECORDING_PROPERTY_NAME);
                } else if (_char8 === "'") {
                  filterBuilder.markAsConstStringValueOperand();
                  this.switchProcess(FILTER_PROCESS.FILTER_RECORDING_STRING_VALUE);
                } else if (Helper.isNumber(_char8)) {
                  this._pos = this._pos - 1;
                  filterBuilder.markAsConstNumberValueOperand();
                  this.switchProcess(FILTER_PROCESS.FILTER_RECORDING_NUMBER_VALUE);
                } else if (_char8 === ')') {
                  this._pos = this._pos - 1;
                  this.switchProcess(FILTER_PROCESS.FILTER_FINISH_PROCESS);
                } else {
                  this.throwSyntaxErrorUnexpectedChar();
                }
              } else if (this.isRunningProcess(FILTER_PROCESS.FILTER_RECORDING_PROPERTY_NAME)) {
                if (_char8 === ' ') {
                  var condition = filterBuilder.build();
                  ruleBuilder.addConditionToFilter(condition);
                  this.switchProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERATOR);
                } else if (_char8 === ')') {
                  this._pos = this._pos - 1;
                  var condition = filterBuilder.build();
                  ruleBuilder.addConditionToFilter(condition);
                  this.switchProcess(FILTER_PROCESS.FILTER_FINISH_PROCESS);
                } else if (Helper.isLookLikeLogicalOperator(_char8)) {
                  this._pos = this._pos - 1;
                  var condition = filterBuilder.build();
                  ruleBuilder.addConditionToFilter(condition);
                  this.switchProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERATOR);
                } else {
                  filterBuilder.addCharToValue(_char8);
                }
              } else if (this.isRunningProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERATOR)) {
                if (_char8 === ' ') {
                  continue;
                } else if (_char8 === ')') {
                  this._pos = this._pos - 1;
                  this.switchProcess(FILTER_PROCESS.FILTER_FINISH_PROCESS);
                } else if (Helper.isLookLikeLogicalOperator(_char8)) {
                  this._pos = this._pos - 1;
                  this.switchProcess(FILTER_PROCESS.FILTER_PARSING_OPERATOR);
                }
              } else if (this.isRunningProcess(FILTER_PROCESS.FILTER_RECORDING_STRING_VALUE)) {
                if (_char8 === "'") {
                  var condition = filterBuilder.build();
                  ruleBuilder.addConditionToFilter(condition);
                  this.switchProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERATOR);
                } else {
                  filterBuilder.addCharToValue(_char8);
                }
              } else if (this.isRunningProcess(FILTER_PROCESS.FILTER_RECORDING_NUMBER_VALUE)) {
                if (_char8 === ' ') {
                  var condition = filterBuilder.build();
                  ruleBuilder.addConditionToFilter(condition);
                  this.switchProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERATOR);
                } else if (Helper.isLookLikeLogicalOperator(_char8)) {
                  this._pos = this._pos - 1;
                  this.switchProcess(FILTER_PROCESS.FILTER_PARSING_OPERATOR);
                } else if (_char8 === ')') {
                  this._pos = this._pos - 1;
                  var condition = filterBuilder.build();
                  ruleBuilder.addConditionToFilter(condition);
                  this.switchProcess(FILTER_PROCESS.FILTER_FINISH_PROCESS);
                } else if (Helper.isNumber(_char8) || _char8 === '.') {
                  filterBuilder.addCharToValue(_char8);
                } else {
                  this.throwSyntaxErrorUnexpectedChar();
                }
              } else if (this.isRunningProcess(FILTER_PROCESS.FILTER_PARSING_OPERATOR)) {
                var operator = this.parseLogicalOperation(this._query.substr(this._pos));
                filterBuilder.markAsOperator().withValue(operator);
                var condition = filterBuilder.build();
                ruleBuilder.addConditionToFilter(condition);
                this._pos = this._pos + operator.length - 1;
                this.switchProcess(FILTER_PROCESS.FILTER_LOOKING_FOR_OPERAND);
              } else if (this.isRunningProcess(FILTER_PROCESS.FILTER_FINISH_PROCESS)) {
                this.switchProcess(FILTER_PROCESS.FILTER_SUCCESS);
                break;
              }
            }

            if (!this.isRunningProcess(FILTER_PROCESS.FILTER_SUCCESS)) {
              this.throwSyntaxErrorWithTrace('unexpected end of filter operation');
            }

            return this._pos;
          };

          FilterOperationParser.prototype.name = function () {
            return OPERATIONS.FILTER;
          };

          FilterOperationParser.prototype.parseLogicalOperation = function (str) {
            var checkStr = str.substr(0, 3);
            var groups = [['!==', '==='], ['!=', '==', '<=', '>='], ['<', '>']];

            for (var _i = 0; _i < groups.length; _i++) {
              var group = groups[_i];
              var operator = group.find(function (operator) {
                return checkStr.startsWith(operator);
              });

              if (operator) {
                return operator;
              }
            }

            throw new Error("JsonQuery: could not find operator");
          };

          return FilterOperationParser;
        }(AbstractParser);

        var PARSER_PROCESSES = {
          LOOKING_FOR_ELEMENT_NAME: 'LOOKING_FOR_ELEMENT_NAME',
          RECORDING_ELEMENT_NAME: 'RECORDING_ELEMENT_NAME',
          BLOCK_PARSING: 'BLOCK_PARSING',
          LIMIT_PARSING: 'LIMIT_PARSING',
          LOOKING_FOR_OPERATION: 'LOOKING_FOR_OPERATION',
          RECORDING_OPERATION_NAME: 'RECORDING_OPERATION_NAME'
        };

        var Parser = function (_super) {
          __extends(Parser, _super);

          function Parser(query) {
            _super.call(this, query);

            this._operations = [new FilterOperationParser(query), new SelectOperationParser(query)];
          }

          Parser.prototype.parse = function (pos) {
            ruleBuilder.reset();
            var operationName = '';
            var rules = [];

            this._runLookingForElementNameProcess();

            for (this._pos = pos; this._pos < this._query.length; this._pos++) {
              var _char9 = this._query[this._pos];

              if (this._isLookingForElementNameProcess()) {
                if (_char9 === ' ') {
                  continue;
                } else if (_char9 === '.') {
                  this._runRecordingElementNameProcess();
                } else {
                  this._pos = this._pos - 1;

                  this._runRecordingElementNameProcess();
                }
              } else if (this.isRunningProcess(PARSER_PROCESSES.RECORDING_ELEMENT_NAME)) {
                if (this._isElementSeparator(_char9)) {
                  var rule = ruleBuilder.build();
                  rules.push(rule);
                } else if (this._needStartParseBlock(_char9)) {
                  this._runParsingBlockProcess();
                } else if (this._isNotAllowedCharForElementName(_char9)) {
                  this.throwSyntaxErrorWithTrace("symbol \"" + _char9 + "\" is not allowed as part of element name");
                } else {
                  ruleBuilder.addCharToElementName(_char9);
                }
              } else if (this._isRunningBlockParsingProcess()) {
                if (_char9 === ' ') {
                  continue;
                } else if (this._isLooksLikeLimitOperation(_char9)) {
                  // temp solution
                  ruleBuilder._limit = '*';

                  this._runLookingForOperation();
                } else if (_char9 === '#') {
                  this._runRecordingOperationName();
                } else {
                  this.throwSyntaxErrorUnexpectedChar();
                }
              } else if (this._isRunningLookingForOperation()) {
                if (_char9 === ' ') {
                  continue;
                } else if (_char9 === '#') {
                  this._runRecordingOperationName();
                } else if (_char9 === ']') {
                  var rule = ruleBuilder.build();
                  rules.push(rule);

                  this._runLookingForElementNameProcess();
                } else {
                  this.throwSyntaxErrorUnexpectedChar();
                }
              } else if (this._isRunningRecordingOperationName()) {
                if (_char9 === '(') {
                  var parser = this._findParserForOperatorOrThrowException(operationName);

                  operationName = '';
                  this._pos = this._pos + 1;
                  this._pos = parser.parse(this._pos);

                  this._runLookingForOperation();
                } else if (this._isNotAllowedCharForOperationName(_char9)) {
                  this.throwSyntaxErrorUnexpectedChar();
                } else {
                  operationName += _char9;
                }
              }
            }

            if (ruleBuilder.hasElementName()) {
              var rule = ruleBuilder.build();
              rules.push(rule);
            }

            return rules;
          };

          Parser.prototype._runLookingForElementNameProcess = function () {
            this.switchProcess(PARSER_PROCESSES.LOOKING_FOR_ELEMENT_NAME);
          };

          Parser.prototype._runRecordingElementNameProcess = function () {
            this.switchProcess(PARSER_PROCESSES.RECORDING_ELEMENT_NAME);
          };

          Parser.prototype._runParsingBlockProcess = function () {
            this.switchProcess(PARSER_PROCESSES.BLOCK_PARSING);
          };

          Parser.prototype._runLookingForOperation = function () {
            this.switchProcess(PARSER_PROCESSES.LOOKING_FOR_OPERATION);
          };

          Parser.prototype._runRecordingOperationName = function () {
            this.switchProcess(PARSER_PROCESSES.RECORDING_OPERATION_NAME);
          };

          Parser.prototype._isLookingForElementNameProcess = function () {
            return this.isRunningProcess(PARSER_PROCESSES.LOOKING_FOR_ELEMENT_NAME);
          };

          Parser.prototype._isRunningBlockParsingProcess = function () {
            return this.isRunningProcess(PARSER_PROCESSES.BLOCK_PARSING);
          };

          Parser.prototype._isRunningLookingForOperation = function () {
            return this.isRunningProcess(PARSER_PROCESSES.LOOKING_FOR_OPERATION);
          };

          Parser.prototype._isRunningRecordingOperationName = function () {
            return this.isRunningProcess(PARSER_PROCESSES.RECORDING_OPERATION_NAME);
          };

          Parser.prototype._isElementSeparator = function (_char10) {
            return _char10 === '.';
          };

          Parser.prototype._isNotAllowedCharForElementName = function (_char11) {
            return Helper.isWhiteSpace(_char11) || ['#', '@', '!', '[', ']', '%', '-', '+', '^', '*', '(', ')', '?', ':', '{', '}'].includes(_char11);
          };

          Parser.prototype._isNotAllowedCharForOperationName = function (_char12) {
            return Helper.isWhiteSpace(_char12) || ['#', '@', '!', '[', ']', '%', '-', '+', '^', '*', '(', ')', '?', ':', '{', '}'].includes(_char12);
          };

          Parser.prototype._isLooksLikeLimitOperation = function (_char13) {
            return _char13 === '*';
          };

          Parser.prototype._needStartParseBlock = function (_char14) {
            return _char14 === '[';
          };

          Parser.prototype._findParserForOperatorOrThrowException = function (name) {
            var parser = this._operations.find(function (item) {
              return item.name() === name;
            });

            if (!parser) {
              this.throwSyntaxErrorWithTrace("unknown operation \"" + name + "\"");
            }

            return parser;
          };

          return Parser;
        }(AbstractParser);

        var pipes = {
          parseJSON: function parseJSON(data) {
            return JSON.parse(data);
          },
          jsonQuery: function jsonQuery(data, args) {
            var independObj = [];
            var arrResults = args.queries.map(function (q, i) {
              var copyData = Object.assign({}, data);
              independObj.push(copyData);
              return JsonQuery.query(q, independObj[i]).map(function (el) {
                if (args.props) {
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    var _loop = function _loop() {
                      var props = _step2.value;
                      var prop = props[0],
                          keys = props[1];

                      if (el[prop]) {
                        el[prop] = el[prop][0].map(function (item) {
                          var returnValue = {};

                          if (item.key && keys.includes(item.key)) {
                            return item.value;
                          }

                          if (!item.key) {
                            keys.forEach(function (key) {
                              if (item[key] && !returnValue[key]) {
                                if (item[key].length && typeof item[key] !== 'string') {
                                  returnValue[key] = item[key][0];
                                } else {
                                  returnValue[key] = item[key];
                                }
                              }
                            });
                            return Object.keys(returnValue).length ? returnValue : undefined;
                          }
                        }).filter(function (item) {
                          return item;
                        });
                      }
                    };

                    for (var _iterator2 = args.props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      _loop();
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }
                } else if (!el.hasOwnProperty(args.prop) && el.media) {
                  el[args.prop] = [JSON.stringify(el.media[0])];
                  delete el.media;
                }

                return el;
              });
            });
            var result = [];
            arrResults.forEach(function (arr) {
              result = result.concat(arr);
            });
            return result;
          },
          forEach: function forEach(data, args) {
            var res = [];
            data.forEach(function (item) {
              var val = args.prop ? item[args.prop] : item;
              var tmp = pipes[args.pipe](val);
              res.push(tmp);
            });
            return res;
          },
          filterContains: function filterContains(data, args) {
            var result = data.filter(function (v) {
              var check = false;

              if (args.props && args.props.length) {
                check = args.props.some(function (el) {
                  return v.hasOwnProperty(el);
                });
              }

              if (!v.hasOwnProperty(args.prop) && !check) {
                return false;
              }

              var nextFilter = args.types.some(function (type) {
                var resultCheck = false;

                if (v[args.prop]) {
                  resultCheck = v[args.prop].includes("\"".concat(type, "\""));
                }

                if (check) {
                  var _iteratorNormalCompletion3 = true;
                  var _didIteratorError3 = false;
                  var _iteratorError3 = undefined;

                  try {
                    for (var _iterator3 = args.props[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var prop = _step3.value;

                      if (typeof v[prop] === 'string' && v[prop].includes("\"".concat(type, "\""))) {
                        resultCheck = true;
                        break;
                      }

                      if (v.hasOwnProperty('type') && v['type'] === type) {
                        resultCheck = true;
                        break;
                      }
                    }
                  } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                        _iterator3["return"]();
                      }
                    } finally {
                      if (_didIteratorError3) {
                        throw _iteratorError3;
                      }
                    }
                  }
                }

                return resultCheck;
              });
              return nextFilter;
            });
            return result;
          },
          arrToVal: function arrToVal(data, args) {
            return data.map(function (v) {
              var newObj = {};

              if (args.prop && v[args.prop] && !args.props) {
                v[args.prop] = v[args.prop][0];
                newObj = v;
              }

              if (args.props) {
                args.props.forEach(function (prop) {
                  var param = prop[0];
                  var keys = prop[1];
                  keys.forEach(function (key) {
                    if (v[param]) {
                      if (v[param].length) {
                        v[param] = v[param][0];
                      }

                      if (v[param][key]) {
                        newObj[key] = v[param][key];
                      }
                    }
                  });
                });
              }

              return newObj;
            });
          },
          sendVideoData: function sendVideoData(data) {
            SendVideoData(id, data);
          },
          mapParseJsonToObj: function mapParseJsonToObj(data, args) {
            return data.map(function (v) {
              if (v[args.prop] && typeof v[args.prop] === 'string') {
                v[args.prop] = JSON.parse(v[args.prop]);
              }

              if (v[args.prop] && v[args.prop].length === 1) {
                v[args.prop] = v[args.prop][0];
              }

              return v;
            });
          },
          mapVideoData: function mapVideoData(data, args) {
            return data.map(function (v) {
              var tweet = v.tweets ? v.tweets : {};

              if (args && args.props) {
                args.props.forEach(function (prop) {
                  if (v[prop]) {
                    tweet[prop] = v[prop];
                  }
                });
              }

              var item = {
                tweets: tweet
              };

              if (v.string_value) {
                if (v.string_value.media_entities) {
                  var keys = Object.keys(v.string_value.media_entities);
                  item.variants = v.string_value.media_entities[keys[0]].video_info.variants;
                  return item;
                } else if (v.string_value.video_info && v.string_value.video_info.variants) {
                  item.variants = v.string_value.video_info.variants;
                  return item;
                }
              } else if (v.video_info && v.video_info.variants) {
                item.variants = v.video_info.variants;
                return item;
              }
            }).filter(function (el) {
              return el !== undefined;
            });
          }
        };

        function runPipeLine(parser, data) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = parser.pipes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var pipe = _step4.value;
              var method = pipes[pipe.name];

              if (!method) {
                continue;
              }

              data = method(data, pipe.arguments);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }

        var WATCH_EVENT = 'WATCH_EVENT';

        var EventDispatcher = function () {
          function EventDispatcher() {
            this.listeners = {};
          }

          EventDispatcher.prototype.on = function (event, cb) {
            this.listeners[event] = cb;
          };

          EventDispatcher.prototype.emit = function (event, args) {
            var _this = this;

            setTimeout(function () {
              return _this.listeners[event](args);
            }, 0);
          };

          return EventDispatcher;
        }();

        var eventDispatcher = new EventDispatcher();
        eventDispatcher.on(WATCH_EVENT, function (data) {
          var parsers = findParsers(data.url);
          parsers.forEach(function (parser) {
            return setTimeout(function () {
              return runPipeLine(parser, data.content);
            }, 0);
          });
        });

        function needParse(url) {
          return findParsers(url).length > 0;
        }

        function findParsers(url) {
          var parsers = config.parsers || [];
          return parsers.filter(function (parser) {
            return new RegExp(parser.watch).test(url);
          });
        }

        var open = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function () {
          this.requestMethod = arguments[0];
          this.url = arguments[1];
          open.apply(this, arguments);
        };

        var send = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function () {
          var onreadystatechange = this.onreadystatechange;
          var self = this;
          var needUrl = false;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = config.parsers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var parser = _step5.value;
              var reg = new RegExp(parser.watch, 'i');
              needUrl = reg.test(self.url);

              if (needUrl) {
                break;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          if (!needUrl) {
            return send.apply(this, arguments);
          }

          this.onreadystatechange = function () {
            if (this.readyState === 4 && needParse(this.url)) {
              var data = {
                url: this.url,
                content: self.responseType === '' || self.responseType === 'text' ? self.responseText : ''
              };
              eventDispatcher.emit(WATCH_EVENT, data);
            }

            if (onreadystatechange) {
              return onreadystatechange.apply(this, arguments);
            }
          };

          return send.apply(this, arguments);
        };
      }.toString();
    }
  }], [{
    key: "SendVideoData",
    value: function SendVideoData(id, videoData) {
      function GenerateQuickId() {
        var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return randomStrId.substring(0, 22);
      }

      videoData.detectionTime = Date.now() / 1000 | 0;
      var mes = {
        posdMessageId: 'PANELOS_MESSAGE',
        posdHash: GenerateQuickId(),
        type: 'TWITTER_VIDEO_DATA',
        from: id,
        to: id.substring(0, id.length - 2),
        content: videoData
      };

      try {
        // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${id}] (PosdTwitterVideoDetector) sent video data: `, mes);
        window.postMessage(mes);
      } catch (e) {}
    }
  }]);

  return PosdTwitterVideoDetector;
}();

module.exports = PosdTwitterVideoDetector;

/***/ }),

/***/ "./src/libs/Common.js":
/*!****************************!*\
  !*** ./src/libs/Common.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ./Constants */ "./src/libs/Constants.js");

var PosdCommon = /*#__PURE__*/function () {
  function PosdCommon() {
    _classCallCheck(this, PosdCommon);
  }

  _createClass(PosdCommon, null, [{
    key: "QuerySelectorAll",
    value: function QuerySelectorAll(context, argument) {
      return document.__proto__.querySelectorAll.call(context, argument);
    }
  }, {
    key: "QuerySelector",
    value: function QuerySelector(context, argument) {
      return document.__proto__.querySelector.call(context, argument);
    }
  }, {
    key: "Escape",
    value: function Escape(str) {
      return str.replace(/\"/g, "&quot;");
    }
  }, {
    key: "ToJSON",
    value: function ToJSON(obj) {
      if (typeof obj.toJSON == 'function') {
        return obj.toJSON();
      } else {
        return JSON.stringify(obj);
      }
    }
  }, {
    key: "GetBaseHref",
    value: function GetBaseHref() {
      var base = PosdCommon.QuerySelector(document, "base");

      if (base && base.href) {
        return base.href;
      } else {
        return "";
      }
    }
  }, {
    key: "GetTabIdKey",
    value: function GetTabIdKey(tabId) {
      return 'tb_' + tabId;
    }
  }, {
    key: "GetMainPageId",
    value: function GetMainPageId(tabId) {
      return 'mp_' + tabId;
    }
  }, {
    key: "IsOnChromeRuntime",
    value: function IsOnChromeRuntime() {
      if (chrome.app && !!chrome.runtime) {
        return typeof chrome.app.isInstalled !== 'undefined';
      } else if (self.navigator.userAgent.toLowerCase().includes('firefox')) {
        return !!chrome.runtime;
      }

      return false;
    }
  }, {
    key: "GetElementSize",
    value: function GetElementSize(element) {
      var size = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };

      if (element && element.getBoundingClientRect) {
        var rect = element.getBoundingClientRect();
        size = {
          x: ~~(rect.left + window.pageXOffset),
          y: ~~(rect.top + window.pageYOffset),
          w: ~~rect.width,
          h: ~~rect.height
        };
      }

      return size;
    }
  }, {
    key: "IsCoordinatesValid",
    value: function IsCoordinatesValid(coordinates) {
      if (coordinates && coordinates.hasOwnProperty('x') && typeof coordinates.x === "number" && coordinates.hasOwnProperty('y') && typeof coordinates.y === "number") {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "GetFullElementSize",
    value: function GetFullElementSize(element, absoluteCoordinates, offsetCoordinates) {
      var size = PosdCommon.GetElementSize(element);

      if (PosdCommon.IsCoordinatesValid(offsetCoordinates)) {
        size.x = size.x + offsetCoordinates.x;
        size.y = size.y + offsetCoordinates.y;
      }

      if (PosdCommon.IsCoordinatesValid(absoluteCoordinates)) {
        size.abs_x = size.x + absoluteCoordinates.x;
        size.abs_y = size.y + absoluteCoordinates.y;
      } else {
        size.abs_x = size.x;
        size.abs_y = size.y;
      }

      return size;
    }
  }, {
    key: "SetFullSizeToElement",
    value: function SetFullSizeToElement(element, absoluteCoordinates, offsetCoordinates) {
      var size = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };

      if (PosdCommon.IsCoordinatesValid(offsetCoordinates)) {
        size.x = size.x + offsetCoordinates.x;
        size.y = size.y + offsetCoordinates.y;
      }

      if (element && element.setAttribute) {
        size = PosdCommon.GetFullElementSize(element, absoluteCoordinates, offsetCoordinates);
        element.setAttribute("bis_size", PosdCommon.ToJSON(size));
      }

      return size;
    }
  }, {
    key: "GenerateAndSetBisId",
    value: function GenerateAndSetBisId(element, prefix) {
      var bisId = prefix + PosdCommon.GenerateQuickId();

      if (element && element.setAttribute) {
        element.setAttribute(PosdConst.ATTRIBUTE_BIS_ID, bisId);
      }

      return bisId;
    }
  }, {
    key: "GenerateAndSetBisIdToFrame",
    value: function GenerateAndSetBisIdToFrame(element) {
      return PosdCommon.GenerateAndSetBisId(element, "fr_");
    }
  }, {
    key: "GenerateAndSetBisIdToBanner",
    value: function GenerateAndSetBisIdToBanner(element) {
      return PosdCommon.GenerateAndSetBisId(element, "bn_");
    }
  }, {
    key: "GenerateAndSetBisIdToFBAds",
    value: function GenerateAndSetBisIdToFBAds(element) {
      return PosdCommon.GenerateAndSetBisId(element, "fb_");
    }
  }, {
    key: "GenerateAndSetBisIdToTwitterAds",
    value: function GenerateAndSetBisIdToTwitterAds(element) {
      return PosdCommon.GenerateAndSetBisId(element, "tw_");
    }
  }, {
    key: "GenerateAndSetBisIdToRedditAds",
    value: function GenerateAndSetBisIdToRedditAds(element) {
      return PosdCommon.GenerateAndSetBisId(element, "rd_");
    }
  }, {
    key: "SetBisDepth",
    value: function SetBisDepth(element, depth) {
      if (element && element.setAttribute) {
        element.setAttribute("bis_depth", depth);
      }
    }
  }, {
    key: "SetBisChainId",
    value: function SetBisChainId(element, chainId) {
      if (element && element.setAttribute) {
        element.setAttribute("bis_chainid", chainId);
      }
    }
  }, {
    key: "SetBannerId",
    value: function SetBannerId(element, bannerId) {
      if (element && element.setAttribute) {
        element.setAttribute("bis_bannerid", bannerId);
      }
    }
  }, {
    key: "HideElement",
    value: function HideElement(element) {
      if (element && element.style) {
        element.style.cssText += 'left: -10000px !important; position: absolute !important;';
      }
    }
  }, {
    key: "UnhideElement",
    value: function UnhideElement(element) {
      if (element && element.style) {
        var style = element.style.cssText;

        if (style.includes('left: -10000px !important; position: absolute !important;')) {
          style = style.replace('left: -10000px !important; position: absolute !important;', '');
          element.style.cssText = style;
        }
      }
    }
  }, {
    key: "UpdateCandidateStatusBorderColor",
    value: function UpdateCandidateStatusBorderColor(candidate, extractionStatus) {
      if (candidate && candidate.style && candidate.style.cssText && extractionStatus) {
        var newBorder = '';

        if (extractionStatus.filteredOut) {
          newBorder = PosdConst.STYLES_BORDER_BANNER_FILTERED;
        } else if (extractionStatus.sentToBackend) {
          newBorder = PosdConst.STYLES_BORDER_BANNER_SENT;
        } else if (extractionStatus.targetUrlExtracted) {
          newBorder = PosdConst.STYLES_BORDER_BANNER_URL_EXTRACTED;
        } else if (extractionStatus.fullContentExtracted) {
          newBorder = PosdConst.STYLES_BORDER_BANNER_CONTENT_EXTRACTED;
        }

        var style = candidate.style.cssText;

        if (!style.includes(newBorder)) {
          style = style.replace(/(border: .{3,} solid 6px !important;)|(border: 6px solid .{3,} !important;)/, newBorder);
          candidate.style.cssText = style;
        }
      }
    }
  }, {
    key: "GetMainDomainFromHost",
    value: function GetMainDomainFromHost(host) {
      if (host && host.split) {
        var domainPath = host.split('.');

        if (domainPath.length >= 2) {
          return domainPath[domainPath.length - 2] + '.' + domainPath[domainPath.length - 1];
        }
      }

      return null;
    }
  }, {
    key: "GetMainDomainFromUrl",
    value: function GetMainDomainFromUrl(url) {
      return PosdCommon.GetMainDomainFromHost(PosdCommon.GetHostNameFromUrl(url));
    }
  }, {
    key: "GetHostNameFromUrl",
    value: function GetHostNameFromUrl(url) {
      var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
      } else {
        return null;
      }
    }
  }, {
    key: "IsUrlFromHost",
    value: function IsUrlFromHost(host, url) {
      return host.indexOf(PosdCommon.GetMainDomainFromUrl(url)) !== -1;
    }
  }, {
    key: "IsPublisherInBlacklist",
    value: function IsPublisherInBlacklist(url, blacklistPublishers) {
      var result = false;
      var hostName = PosdCommon.GetHostNameFromUrl(url);

      if (blacklistPublishers && blacklistPublishers.length) {
        if (hostName && blacklistPublishers.includes(hostName)) {
          result = true;
        }
      }

      return result;
    }
  }, {
    key: "GetUrlFromStyleStr",
    value: function GetUrlFromStyleStr(styleStr) {
      var str = styleStr.replace(/"/g, "'");
      var starIndex = str.indexOf("http");

      if (starIndex == -1) {
        starIndex = str.indexOf("//");
      }

      var endIndex = str.indexOf("'", starIndex);
      var url = "";

      if (starIndex > 0 && endIndex > 0 && starIndex < endIndex) {
        url = str.substr(starIndex, endIndex - starIndex);
      }

      return url;
    }
  }, {
    key: "GetCurrentDataTimeStr",
    value: function GetCurrentDataTimeStr() {
      function Normalize2(val) {
        if (val < 10) {
          return "0" + val;
        }

        return "" + val;
      }

      var now = new Date();
      return "".concat(now.getFullYear(), "-").concat(Normalize2(now.getMonth() + 1), "-").concat(Normalize2(now.getDate()), " ").concat(Normalize2(now.getHours()), ":").concat(Normalize2(now.getMinutes()), ":").concat(Normalize2(now.getSeconds()));
    }
  }, {
    key: "GetWindowSize",
    value: function GetWindowSize() {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      };
    }
  }, {
    key: "IsIframeHasContentScript",
    value: function IsIframeHasContentScript(iframe) {
      try {
        if (iframe) {
          if (!PosdCommon.IsIframeSecure(iframe)) {
            if (iframe.contentDocument.body.getAttribute("bis_status") !== "ok") {
              return false;
            }
          }
        }
      } catch (e) {}

      return true;
    }
  }, {
    key: "IsIframeSecure",
    value: function IsIframeSecure(iframe) {
      if (iframe) {
        if (iframe.src.length === 0 || iframe.src === "about:blank" || iframe.src === "about:srcdoc" || iframe.src.indexOf("javascript:") === 0) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isValidUrl",
    value: function isValidUrl(url) {
      return typeof url === 'string' && url.length > 0 && (url.indexOf('http') !== -1 || url.indexOf('//') !== -1);
    }
  }, {
    key: "IsValidBisId",
    value: function IsValidBisId(bisId) {
      if (bisId.startsWith('mp_') || bisId.startsWith('bg_') || bisId.startsWith('fr_')) {
        return true;
      }

      return false;
    }
  }, {
    key: "IsYouTubeUrl",
    value: function IsYouTubeUrl(url) {
      var host = PosdCommon.GetHostNameFromUrl(url);

      if (host) {
        return host.indexOf("youtube.com") !== -1;
      } else {
        return false;
      }
    }
  }, {
    key: "IsFacebookUrl",
    value: function IsFacebookUrl(url) {
      var host = PosdCommon.GetHostNameFromUrl(url);

      if (host) {
        return host.indexOf("facebook.com") !== -1;
      } else {
        return false;
      }
    }
  }, {
    key: "IsTwitterUrl",
    value: function IsTwitterUrl(url) {
      var host = PosdCommon.GetHostNameFromUrl(url);

      if (host) {
        return host.indexOf("twitter.com") !== -1;
      } else {
        return false;
      }
    }
  }, {
    key: "IsRedditUrl",
    value: function IsRedditUrl(url) {
      var host = PosdCommon.GetHostNameFromUrl(url);

      if (host) {
        return host.indexOf("reddit.com") !== -1;
      } else {
        return false;
      }
    }
  }, {
    key: "IsTiktokUrl",
    value: function IsTiktokUrl(url) {
      var host = PosdCommon.GetHostNameFromUrl(url);

      if (host) {
        return host.indexOf("tiktok.com") !== -1;
      } else {
        return false;
      }
    }
  }, {
    key: "GetFullIdStr",
    value: function GetFullIdStr(chainId, frameId, bisId) {
      return "ext:".concat(chrome.runtime.id, "-chainId:").concat(chainId, "-frameId:").concat(frameId, "-bisId:").concat(bisId);
    }
  }, {
    key: "GetRandomIntInRange",
    value: function GetRandomIntInRange(min, max) {
      return parseInt((Math.random() * (max - min) + min).toFixed(0));
    }
  }, {
    key: "GetCurrentTimestamp",
    value: function GetCurrentTimestamp() {
      return Date.now() / 1000 | 0;
    }
  }, {
    key: "GetCurrentTimestampMs",
    value: function GetCurrentTimestampMs() {
      return Date.now();
    }
  }, {
    key: "GenerateQuickId",
    value: function GenerateQuickId() {
      var randomStrId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      return randomStrId.substring(0, 22);
    }
  }, {
    key: "GenerateTicketId",
    value: function GenerateTicketId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }, {
    key: "IsInFilterList",
    value: function IsInFilterList(list, str) {
      var inList = false;

      if (list) {
        for (var i = 0; i < list.length && !inList; i++) {
          if (str.indexOf(list[i]) != -1) {
            inList = true;
          }
        }
      }

      return inList;
    }
  }, {
    key: "IsChrome",
    value: function IsChrome() {
      return navigator.userAgent.indexOf('Chrome') !== -1;
    }
  }, {
    key: "IsFirefox",
    value: function IsFirefox() {
      return navigator.userAgent.indexOf('Firefox') !== -1;
    }
  }, {
    key: "IsFBVideoDataValid",
    value: function IsFBVideoDataValid(videoData) {
      var valid = false;

      if (videoData) {
        try {
          if (typeof videoData.detectionTime === "number" && typeof videoData.videoId === "string" && typeof videoData.videoUrl === "string" && videoData.videoId.length && videoData.videoUrl.length) {
            valid = true;
          }
        } catch (e) {}
      }

      return valid;
    }
  }, {
    key: "GetDefaultAdblockerStatus",
    value: function GetDefaultAdblockerStatus() {
      var status = {};
      status[PosdConst.ADBLOCKER_FOR_DISPLAY] = PosdConst.ADBLOCKER_STATUS_DISABLED;
      status[PosdConst.ADBLOCKER_FOR_FACEBOOK] = PosdConst.ADBLOCKER_STATUS_DISABLED;
      status[PosdConst.ADBLOCKER_FOR_TWITTER] = PosdConst.ADBLOCKER_STATUS_DISABLED;
      status[PosdConst.ADBLOCKER_FOR_REDDIT] = PosdConst.ADBLOCKER_STATUS_DISABLED;
      return status;
    }
  }, {
    key: "GetImagesSpacePercentage",
    value: function GetImagesSpacePercentage(selector, container, containerSize) {
      var result = 0;

      if (container) {
        var imgs = container.querySelectorAll(selector);

        if (imgs && imgs.length >= 1 && containerSize.w * containerSize.h > 0) {
          var imgesSpace = 0;
          imgs.forEach(function (img) {
            var imgSize = PosdCommon.GetElementSize(img);
            imgesSpace = imgesSpace + imgSize.w * imgSize.h;
          });

          if (imgesSpace) {
            result = imgesSpace / (containerSize.w * containerSize.h) * 100;
          }
        }
      }

      return result;
    }
  }]);

  return PosdCommon;
}();

module.exports = PosdCommon;

/***/ }),

/***/ "./src/libs/Constants.js":
/*!*******************************!*\
  !*** ./src/libs/Constants.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdBase64 = __webpack_require__(/*! ./base64 */ "./src/libs/base64.js");

var PosdConst = /*#__PURE__*/function () {
  function PosdConst() {
    _classCallCheck(this, PosdConst);
  }

  _createClass(PosdConst, null, [{
    key: "EXCLUDE_DOMAINS_LIST",
    value: function EXCLUDE_DOMAINS_LIST() {
      return 'EXCLUDE_DOMAINS_LIST';
    }
  }, {
    key: "EXCLUDE_PAGES_LIST",
    value: function EXCLUDE_PAGES_LIST() {
      return 'EXCLUDE_PAGES_LIST';
    }
  }, {
    key: "DOCUMENT_READYSTATE_LOADING",
    get: function get() {
      return 'loading';
    }
  }, {
    key: "DOCUMENT_READYSTATE_INTERACTIVE",
    get: function get() {
      return 'interactive';
    }
  }, {
    key: "DOCUMENT_READYSTATE_COMPLETE",
    get: function get() {
      return 'complete';
    }
  }, {
    key: "ATTRIBUTE_BIS_ID",
    get: function get() {
      return "bis_id";
    }
  }, {
    key: "ATTRIBUTE_BIS_SIZE",
    get: function get() {
      return "bis_size";
    }
  }, {
    key: "ATTRIBUTE_BIS_STYLE",
    get: function get() {
      return "bis_style";
    }
  }, {
    key: "ATTRIBUTE_BIS_STATUS",
    get: function get() {
      return "bis_status";
    }
  }, {
    key: "ATTRIBUTE_BIS_LABEL",
    get: function get() {
      return "bis_label";
    }
  }, {
    key: "ATTRIBUTE_BIS_ELEMENT_ID",
    get: function get() {
      return "bis_element_id";
    }
  }, {
    key: "ATTRIBUTE_BIS_HIDE_HEIGHT",
    get: function get() {
      return "bis_hide_height";
    }
  }, {
    key: "ATTRIBUTE_BIS_HIDE_WIDTH",
    get: function get() {
      return "bis_hide_width";
    }
  }, {
    key: "ATTRIBUTE_BIS_HIDE_STATUS",
    get: function get() {
      return "bis_hide_status";
    }
  }, {
    key: "ATTRIBUTE_BIS_HIDE_LEFT_OFFSET",
    get: function get() {
      return "bis_hide_left_offset";
    }
  }, {
    key: "ACTIVATION_BY_ADS_MANAGER",
    get: function get() {
      return "ACTIVATION_BY_ADS_MANAGER";
    }
  }, {
    key: "ACTIVATION_BY_ADS_SELF",
    get: function get() {
      return "ACTIVATION_BY_ADS_SELF";
    }
  }, {
    key: "MESSAGE_ID",
    get: function get() {
      return 'PANELOS_MESSAGE';
    }
  }, {
    key: "MESSAGE_TYPE_TEST",
    get: function get() {
      return 'TEST';
    }
  }, {
    key: "MESSAGE_TYPE_IFRAME_CONTENT",
    get: function get() {
      return 'IFRAME_CONTENT';
    }
  }, {
    key: "MESSAGE_TYPE_IFRAME_INVALID_CHAIN_SEGMENT_CONTENT",
    get: function get() {
      return 'IFRAME_INVALID_CHAIN_SEGMENT_CONTENT';
    }
  }, {
    key: "MESSAGE_TYPE_TAB_INITIALIZATION",
    get: function get() {
      return 'TAB_INITIALIZATION';
    }
  }, {
    key: "MESSAGE_TYPE_TAB_SINGLE_PAGE_REINITIALIZATION",
    get: function get() {
      return 'TAB_SINGLE_PAGE_REINITIALIZATION';
    }
  }, {
    key: "MESSAGE_TYPE_TAB_URL_CHANGED",
    get: function get() {
      return 'TAB_URL_CHANGED';
    }
  }, {
    key: "MESSAGE_TYPE_TAB_ADBLOCKER_STATUS_CHANGED",
    get: function get() {
      return 'TAB_ADBLOCKER_STATUS_CHANGED';
    }
  }, {
    key: "MESSAGE_TYPE_IFRAME_INITIALIZATION",
    get: function get() {
      return 'IFRAME_INITIALIZATION';
    }
  }, {
    key: "MESSAGE_TYPE_IFRAME_INITIALIZATION_RESPONSE",
    get: function get() {
      return 'IFRAME_INITIALIZATION_RESPONSE';
    }
  }, {
    key: "MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS",
    get: function get() {
      return 'IFRAME_CONTENT_INFO_DETECTED_INPUTS';
    }
  }, {
    key: "MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS",
    get: function get() {
      return 'IFRAME_CONTENT_INFO_DETECTED_REDIRECTS';
    }
  }, {
    key: "MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT",
    get: function get() {
      return 'HIDDEN_AD_CANDIDATES_AMOUNT';
    }
  }, {
    key: "MESSAGE_TYPE_GET_WINDOW_TARGET_URL",
    get: function get() {
      return 'GET_WINDOW_TARGET_URL';
    }
  }, {
    key: "MESSAGE_TYPE_GET_WINDOW_TARGET_URL_RESPOND",
    get: function get() {
      return 'GET_WINDOW_TARGET_URL_RESPOND';
    }
  }, {
    key: "MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL",
    get: function get() {
      return 'GET_WINDOW_CLICK_TARGET_URL';
    }
  }, {
    key: "MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL_RESPOND",
    get: function get() {
      return 'GET_WINDOW_CLICK_TARGET_URL_RESPOND';
    }
  }, {
    key: "MESSAGE_TYPE_GET_FRAME_CONTENT",
    get: function get() {
      return 'GET_FRAME_CONTENT';
    }
  }, {
    key: "MESSAGE_TYPE_TARGET_URL_DETECTION_BY_CLICK",
    get: function get() {
      return 'TARGET_URL_DETECTION_BY_CLICK';
    }
  }, {
    key: "MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET",
    get: function get() {
      return 'NEW_PAGE_CREATED_TICKET';
    }
  }, {
    key: "MESSAGE_TYPE_PANEL_REGULATOR_RESULT",
    get: function get() {
      return 'PANEL_REGULATOR_RESULT';
    }
  }, {
    key: "MESSAGE_TYPE_OUT_TICKET",
    get: function get() {
      return 'OUT_TICKET';
    }
  }, {
    key: "MESSAGE_TYPE_CHAIN_ACTIVATION",
    get: function get() {
      return 'CHAIN_ACTIVATION';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATES_DATA_SKINADS",
    get: function get() {
      return 'CANDIDATES_DATA_SKINADS';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATES_DATA_BANNERS",
    get: function get() {
      return 'CANDIDATES_DATA_BANNERS';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK",
    get: function get() {
      return 'CANDIDATES_DATA_FACEBOOK';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATES_DATA_TWITTER",
    get: function get() {
      return 'CANDIDATES_DATA_TWITTER';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATES_DATA_REDDIT",
    get: function get() {
      return 'CANDIDATES_DATA_REDDIT';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_FACEBOOK",
    get: function get() {
      return 'CANDIDATE_PLACEMENTS_FACEBOOK';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TWITTER",
    get: function get() {
      return 'CANDIDATE_PLACEMENTS_TWITTER';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_REDDIT",
    get: function get() {
      return 'CANDIDATE_PLACEMENTS_REDDIT';
    }
  }, {
    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_HTML5",
    get: function get() {
      return 'CANDIDATE_PLACEMENTS_HTML5';
    }
  }, {
    key: "MESSAGE_TYPE_HTML5_CANDIDATES_EXTRACTION_STATUSES",
    get: function get() {
      return 'HTML5_CANDIDATES_EXTRACTION_STATUSES';
    }
  }, {
    key: "MESSAGE_TYPE_BANNER_CANDIDATES_EXTRACTION_STATUSES",
    get: function get() {
      return 'BANNER_CANDIDATES_EXTRACTION_STATUSES';
    }
  }, {
    key: "MESSAGE_TYPE_SKIN_AD_CANDIDATES_EXTRACTION_STATUSES",
    get: function get() {
      return 'SKIN_AD_CANDIDATES_EXTRACTION_STATUSES';
    }
  }, {
    key: "MESSAGE_TYPE_VIDEO_XHR_CANDIDATE",
    get: function get() {
      return 'VIDEO_XHR_CANDIDATE';
    }
  }, {
    key: "MESSAGE_TYPE_VIDEO_HAR",
    get: function get() {
      return 'VIDEO_HAR';
    }
  }, {
    key: "MESSAGE_TYPE_FACEBOOK_VIDEO_DATA",
    get: function get() {
      return 'FACEBOOK_VIDEO_DATA';
    }
  }, {
    key: "MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA",
    get: function get() {
      return 'FACEBOOK_INSTREAM_DATA';
    }
  }, {
    key: "MESSAGE_TYPE_FACEBOOK_MARKETPLACE_VIDEO_DATA",
    get: function get() {
      return 'FACEBOOK_MARKETPLACE_VIDEO_DATA';
    }
  }, {
    key: "MESSAGE_TYPE_TWITTER_VIDEO_DATA",
    get: function get() {
      return 'TWITTER_VIDEO_DATA';
    }
  }, {
    key: "MESSAGE_TYPE_REDDIT_VIDEO_DATA",
    get: function get() {
      return 'REDDIT_VIDEO_DATA';
    }
  }, {
    key: "MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA",
    get: function get() {
      return 'REDDIT_RIGHT_COLUMN_DATA';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANALYTICS_ID",
    get: function get() {
      return 'GET_PANALYTICS_ID';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANELOS_VERSION",
    get: function get() {
      return 'GET_PANELOS_VERSION';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_STATUS",
    get: function get() {
      return 'GET_ADBLOCKER_STATUS';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_COUNTERS",
    get: function get() {
      return 'GET_ADBLOCKER_COUNTERS';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_ADBLOCKER",
    get: function get() {
      return 'ENABLE_ADBLOCKER';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_ADBLOCKER",
    get: function get() {
      return 'DISABLE_ADBLOCKER';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_DATA_COLLECTION_STATUS",
    get: function get() {
      return 'GET_DATA_COLLECTION_STATUS';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_DATA_COLLECTION",
    get: function get() {
      return 'ENABLE_DATA_COLLECTION';
    }
  }, {
    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_DATA_COLLECTION",
    get: function get() {
      return 'DISABLE_DATA_COLLECTION';
    }
  }, {
    key: "MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT",
    get: function get() {
      return 'ADBLOCK_INSPECTOR_AGENT_REPORT';
    }
  }, {
    key: "MESSAGE_TYPE_GET_EXCLUDE_LIST",
    get: function get() {
      return 'GET_EXCLUDE_LIST';
    }
  }, {
    key: "MESSAGE_TYPE_ADD_INTO_EXCLUDE_LIST",
    get: function get() {
      return 'ADD_INTO_EXCLUDE_LIST';
    }
  }, {
    key: "MESSAGE_TYPE_REMOVE_FROM_EXCLUDE_LIST",
    get: function get() {
      return 'REMOVE_FROM_EXCLUDE_LIST';
    }
  }, {
    key: "MESSAGE_TYPE_ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST",
    get: function get() {
      return 'ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST';
    }
  }, {
    key: "MESSAGE_TYPE_ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST",
    get: function get() {
      return 'ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST';
    }
  }, {
    key: "MESSAGE_TYPE_GET_CURRENT_DOMAIN",
    get: function get() {
      return 'GET_CURRENT_DOMAIN';
    }
  }, {
    key: "MESSAGE_TYPE_GET_CURRENT_PAGE_URL",
    get: function get() {
      return 'GET_CURRENT_PAGE_URL';
    }
  }, {
    key: "ADBLOCKER_STATUS_ENABLED",
    get: function get() {
      return 'enabled';
    }
  }, {
    key: "ADBLOCKER_STATUS_DISABLED",
    get: function get() {
      return 'disabled';
    }
  }, {
    key: "VIDEO_TRAFFIC_SOURCE_HTML",
    get: function get() {
      return 'HTML';
    }
  }, {
    key: "VIDEO_TRAFFIC_SOURCE_JS",
    get: function get() {
      return 'JS';
    }
  }, {
    key: "VIDEO_TRAFFIC_SOURCE_XHR",
    get: function get() {
      return 'XHR';
    }
  }, {
    key: "VIDEO_TRAFFIC_MEDIA_TYPE_HTML",
    get: function get() {
      return 'HTML';
    }
  }, {
    key: "VIDEO_TRAFFIC_FACEBOOK_MEDIA_TYPE_JSON",
    get: function get() {
      return 'JSON';
    }
  }, {
    key: "VIDEO_TRAFFIC_FACEBOOK_MEDIA_ALIAS_JSON",
    get: function get() {
      return 'JSON_FB';
    }
  }, {
    key: "VIDEO_TRAFFIC_ALIAS_YT_JSON_NEXTPAGE",
    get: function get() {
      return 'YT_JSON_NEXTPAGE';
    }
  }, {
    key: "VIDEO_TRAFFIC_ALIAS_YT_HTML_DESKTOP_INSCRIPT_PLAYER_RESPONSE",
    get: function get() {
      return 'YT_HTML_DESKTOP_INSCRIPT_PLAYER_RESPONSE';
    }
  }, {
    key: "FACEBOOK_AD_PLACEMENT_TYPE_FEED",
    get: function get() {
      return 'feed';
    }
  }, {
    key: "FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH",
    get: function get() {
      return 'feedWatch';
    }
  }, {
    key: "FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE",
    get: function get() {
      return 'marketplace';
    }
  }, {
    key: "FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN",
    get: function get() {
      return 'rightColumn';
    }
  }, {
    key: "FACEBOOK_AD_PLACEMENT_TYPE_STORIES",
    get: function get() {
      return 'stories';
    }
  }, {
    key: "FACEBOOK_AD_PLACEMENT_TYPE_VIDEO_PAGE",
    get: function get() {
      return 'videoPage';
    }
  }, {
    key: "FACEBOOK_AD_VIDEO_URL_REPLACE_NAME",
    get: function get() {
      return '[ADVERTISER_NAME]';
    }
  }, {
    key: "FACEBOOK_AD_VIDEO_URL_REPLACE_VIDEO_ID",
    get: function get() {
      return '[VIDEO_ID]';
    }
  }, {
    key: "TWITTER_AD_PLACEMENT_TYPE_FEED",
    get: function get() {
      return 'feedPost';
    }
  }, {
    key: "TWITTER_AD_PLACEMENT_TYPE_FEED_WHO_TO_FOLLOW",
    get: function get() {
      return 'feedWhoToFollow';
    }
  }, {
    key: "TWITTER_AD_PLACEMENT_TYPE_RIGHT_COLUMN_WHO_TO_FOLLOW",
    get: function get() {
      return 'rightColumnWhoToFollow';
    }
  }, {
    key: "REDDIT_AD_PLACEMENT_TYPE_FEED",
    get: function get() {
      return 'feed';
    }
  }, {
    key: "REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE",
    get: function get() {
      return 'commentPage';
    }
  }, {
    key: "REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN",
    get: function get() {
      return 'rightColumn';
    }
  }, {
    key: "KNOWN_CSS_NAMES",
    get: function get() {
      return ["align-content", "align-items", "align-self", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "block-size", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-end-end-radius", "border-end-start-radius", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "color-adjust", "color-interpolation", "color-interpolation-filters", "column-count", "column-fill", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-width", "contain", "content", "counter-increment", "counter-reset", "counter-set", "cursor", "cx", "cy", "direction", "display", "dominant-baseline", "empty-cells", "fill", "fill-opacity", "fill-rule", "filter", "flex-basis", "flex-direction", "flex-grow", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column-end", "grid-column-start", "grid-row-end", "grid-row-start", "grid-template-areas", "grid-template-columns", "grid-template-rows", "height", "hyphens", "image-orientation", "image-rendering", "ime-mode", "inline-size", "inset-block-end", "inset-block-start", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "lighting-color", "line-break", "line-height", "list-style-image", "list-style-position", "list-style-type", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marker-end", "marker-mid", "marker-start", "mask", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-position-x", "mask-position-y", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "object-fit", "object-position", "opacity", "order", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior-x", "overscroll-behavior-y", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "paint-order", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "r", "resize", "right", "row-gap", "ruby-align", "ruby-position", "rx", "ry", "scroll-behavior", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-type", "scrollbar-color", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "table-layout", "text-align", "text-align-last", "text-anchor", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-offset", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "user-select", "vector-effect", "vertical-align", "visibility", "white-space", "width", "will-change", "word-break", "word-spacing", "writing-mode", "x", "y", "z-index", "-moz-appearance", "-moz-box-align", "-moz-box-direction", "-moz-box-flex", "-moz-box-ordinal-group", "-moz-box-orient", "-moz-box-pack", "-moz-float-edge", "-moz-force-broken-image-icon", "-moz-image-region", "-moz-orient", "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-stack-sizing", "-moz-tab-size", "-moz-text-size-adjust", "-moz-user-focus", "-moz-user-input", "-moz-user-modify", "-moz-window-dragging", "-webkit-line-clamp", "-webkit-text-fill-color", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "offset-distance", "offset-path", "offset-rotate", "orphans", "speak", "tab-size", "text-underline-position", "text-size-adjust", "widows", "zoom", "-webkit-appearance", "-webkit-border-horizontal-spacing", "-webkit-border-image", "-webkit-border-vertical-spacing", "-webkit-box-align", "-webkit-box-decoration-break", "-webkit-box-direction", "-webkit-box-flex", "-webkit-box-ordinal-group", "-webkit-box-orient", "-webkit-box-pack", "-webkit-box-reflect", "column-span", "backdrop-filter", "-webkit-font-smoothing", "-webkit-highlight", "-webkit-hyphenate-character", "-webkit-line-break", "-webkit-locale", "-webkit-margin-before-collapse", "-webkit-margin-after-collapse", "-webkit-mask-box-image", "-webkit-mask-box-image-outset", "-webkit-mask-box-image-repeat", "-webkit-mask-box-image-slice", "-webkit-mask-box-image-source", "-webkit-mask-box-image-width", "-webkit-mask-clip", "-webkit-mask-composite", "-webkit-mask-image", "-webkit-mask-origin", "-webkit-mask-position", "-webkit-mask-repeat", "-webkit-mask-size", "-webkit-print-color-adjust", "-webkit-rtl-ordering", "-webkit-tap-highlight-color", "-webkit-text-combine", "-webkit-text-decorations-in-effect", "-webkit-text-emphasis-color", "-webkit-text-emphasis-position", "-webkit-text-emphasis-style", "-webkit-text-orientation", "-webkit-text-security", "-webkit-user-drag", "-webkit-user-modify", "-webkit-writing-mode", "-webkit-app-region", "buffered-rendering", "color-rendering", "alignment-baseline", "baseline-shift", "d"];
    }
  }, {
    key: "FACEBOOK_DESIGN_VERSION_OLD",
    get: function get() {
      return 1;
    }
  }, {
    key: "FACEBOOK_DESIGN_VERSION_NEW",
    get: function get() {
      return 2;
    }
  }, {
    key: "OUT_TICKET_TYPE_SINGLE",
    get: function get() {
      return 'SINGLE';
    }
  }, {
    key: "OUT_TICKET_TYPE_MULTI",
    get: function get() {
      return 'MULTI';
    }
  }, {
    key: "ADBLOCKER_FOR_DISPLAY",
    get: function get() {
      return 'DISPLAY';
    }
  }, {
    key: "ADBLOCKER_FOR_FACEBOOK",
    get: function get() {
      return 'FACEBOOK';
    }
  }, {
    key: "ADBLOCKER_FOR_TWITTER",
    get: function get() {
      return 'TWITTER';
    }
  }, {
    key: "ADBLOCKER_FOR_REDDIT",
    get: function get() {
      return 'REDDIT';
    }
  }, {
    key: "AD_DETECTOR_INITIATOR_TIMER",
    get: function get() {
      return 'timer';
    }
  }, {
    key: "AD_DETECTOR_INITIATOR_MUTATION",
    get: function get() {
      return 'mutation';
    }
  }, {
    key: "AD_DETECTOR_INITIATOR_PAGECHANGE",
    get: function get() {
      return 'pagechange';
    }
  }, {
    key: "AD_DETECTOR_INITIATOR_ACTIVATION",
    get: function get() {
      return 'activation';
    }
  }, {
    key: "IFRAMES_CHAIN_BUILDING_STATUS_NONE",
    get: function get() {
      return 0;
    }
  }, {
    key: "IFRAMES_CHAIN_BUILDING_STATUS_INITED",
    get: function get() {
      return 1;
    }
  }, {
    key: "IFRAMES_CHAIN_BUILDING_STATUS_STARTED",
    get: function get() {
      return 2;
    }
  }, {
    key: "IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_STARTED",
    get: function get() {
      return 3;
    }
  }, {
    key: "IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_FINISHED",
    get: function get() {
      return 4;
    }
  }, {
    key: "IFRAMES_CHAIN_BUILDING_STATUS_FINISHED",
    get: function get() {
      return 5;
    }
  }, {
    key: "CANDIDATE_PROCESS_STATUS_DETECED",
    get: function get() {
      return 1;
    }
  }, {
    key: "CANDIDATE_PROCESS_STATUS_START_PROCESSING",
    get: function get() {
      return 2;
    }
  }, {
    key: "CANDIDATE_PROCESS_STATUS_PROCESSING_ACTIVATED",
    get: function get() {
      return 3;
    }
  }, {
    key: "CANDIDATE_PROCESS_STATUS_PREBUILD_INFO_SENT",
    get: function get() {
      return 4;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_INIT",
    get: function get() {
      return 0;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_STARTED",
    get: function get() {
      return 1;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_GETTING_WEBNAVIGATION_IFRAMES",
    get: function get() {
      return 2;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_GOT_WEBNAVIGATION_IFRAMES",
    get: function get() {
      return 3;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_CONSTRUCT_IFRAME_CHAINS_ACTIVE",
    get: function get() {
      return 4;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_CONSTRUCT_IFRAME_CHAINS_DONE",
    get: function get() {
      return 5;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_DEEP_TARGET_URL_DETECTION_ACTIVE",
    get: function get() {
      return 6;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_DEEP_TARGET_URL_DETECTION_DONE",
    get: function get() {
      return 7;
    }
  }, {
    key: "TICKET_BUILDING_STATUS_DONE",
    get: function get() {
      return 8;
    }
  }, {
    key: "TICKET_ALIAS_PANALYTICSID",
    get: function get() {
      return PosdBase64.decode('cGFuZWxpc3RJZA==');
    }
  }, {
    key: "TICKET_ALIAS_PINSTANCEID",
    get: function get() {
      return PosdBase64.decode('cGFuZWxJZA==');
    }
  }, {
    key: "MAX_OUT_TICKETS_QUEUE_LENGTH",
    get: function get() {
      return 20;
    }
  }, {
    key: "STYLES_BORDER_BANNER_CONTENT_EXTRACTED",
    get: function get() {
      return 'border: 6px solid blue !important;';
    }
  }, {
    key: "STYLES_BORDER_BANNER_URL_EXTRACTED",
    get: function get() {
      return 'border: 6px solid blueviolet !important;';
    }
  }, {
    key: "STYLES_BORDER_BANNER_FILTERED",
    get: function get() {
      return 'border: 6px solid orange !important;';
    }
  }, {
    key: "STYLES_BORDER_BANNER_SENT",
    get: function get() {
      return 'border: green solid 6px !important;';
    }
  }, {
    key: "STYLES_OUTLINE_SUCCESS_DETECT",
    get: function get() {
      return 'outline: green solid 6px !important;';
    }
  }, {
    key: "STYLES_OUTLINE_VIDEO_BANNER",
    get: function get() {
      return 'outline: rgba(42, 213, 255, 1) solid 6px !important;';
    }
  }, {
    key: "STYLES_OUTLINE_TEXT_BANNER",
    get: function get() {
      return 'outline: rgba(243, 143, 20, 1) solid 6px !important;';
    }
  }]);

  return PosdConst;
}();

module.exports = PosdConst;

/***/ }),

/***/ "./src/libs/Message.js":
/*!*****************************!*\
  !*** ./src/libs/Message.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ./Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ./Common */ "./src/libs/Common.js");

var PosdMessage = /*#__PURE__*/function () {
  function PosdMessage() {
    _classCallCheck(this, PosdMessage);
  }

  _createClass(PosdMessage, null, [{
    key: "IsValid",
    value: function IsValid(mes) {
      try {
        if (typeof mes !== 'undefined') {
          if (typeof mes.posdMessageId !== 'undefined' && typeof mes.type !== 'undefined' && typeof mes.content !== 'undefined') {
            return mes.posdMessageId && mes.posdMessageId === PosdConst.MESSAGE_ID;
          }
        }
      } catch (e) {}

      return false;
    }
  }, {
    key: "IsStrictValid",
    value: function IsStrictValid(mes) {
      try {
        if (typeof mes !== 'undefined') {
          if (typeof mes.posdMessageId !== 'undefined' && typeof mes.from !== 'undefined' && typeof mes.to !== 'undefined' && typeof mes.type !== 'undefined' && typeof mes.content !== 'undefined') {
            return mes.posdMessageId && mes.posdMessageId === PosdConst.MESSAGE_ID;
          }
        }
      } catch (e) {}

      return false;
    }
  }, {
    key: "EmptyMessage",
    get: function get() {
      return {
        posdMessageId: PosdConst.MESSAGE_ID,
        posdHash: PosdCommon.GenerateQuickId(),
        from: '',
        to: '',
        multiTo: [],
        type: '',
        content: ''
      };
    }
  }]);

  return PosdMessage;
}();

module.exports = PosdMessage;

/***/ }),

/***/ "./src/libs/StylesMinimizer.js":
/*!*************************************!*\
  !*** ./src/libs/StylesMinimizer.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ./Constants */ "./src/libs/Constants.js");
/**
 * @namespace StylesMinimizer
 */


var StylesMinimizer = /*#__PURE__*/function () {
  function StylesMinimizer() {
    _classCallCheck(this, StylesMinimizer);
  }
  /**
   * @public
   * @param {*} tweetNode 
   * @returns {Object}
   */


  _createClass(StylesMinimizer, [{
    key: "getStylesByElementsBisId",
    value: function getStylesByElementsBisId(tweetNode) {
      var _this = this;

      var stylesByElementsBisId = {};
      this.addStylesForNode(tweetNode, stylesByElementsBisId);
      tweetNode.querySelectorAll('*').forEach(function (node) {
        _this.addStylesForNode(node, stylesByElementsBisId);
      });
      return stylesByElementsBisId;
    }
    /**
     * @private
     * @param {*} node 
     * @param {*} stylesByElementBisId 
     */

  }, {
    key: "addStylesForNode",
    value: function addStylesForNode(node, stylesByElementBisId) {
      var styles = this.getStyles(node);
      var bisElementId = node.getAttribute(PosdConst.ATTRIBUTE_BIS_ELEMENT_ID);
      stylesByElementBisId[bisElementId] = styles;
    }
    /**
     * @private
     * @param {*} node 
     * @returns 
     */

  }, {
    key: "getStyles",
    value: function getStyles(node) {
      var computedStyles = window.getComputedStyle(node, null);
      return this.minimiseComputedStyles(computedStyles);
    }
    /**
     * @private
     * @param {*} computedStyles 
     * @returns {Object}
     */

  }, {
    key: "minimiseComputedStyles",
    value: function minimiseComputedStyles(computedStyles) {
      var minimisedComputedStyles = {};

      for (var i = 0; i < computedStyles.length; i++) {
        var propertyName = computedStyles.item(i);
        var propertyValue = computedStyles.getPropertyValue(propertyName);

        if (!minimisedComputedStyles[propertyValue]) {
          minimisedComputedStyles[propertyValue] = [];
        }

        var propertyIndex = PosdConst.KNOWN_CSS_NAMES.indexOf(propertyName);

        if (propertyIndex >= 0) {
          minimisedComputedStyles[propertyValue].push(propertyIndex);
        } else {
          minimisedComputedStyles[propertyValue].push(propertyName);
        }
      }

      return minimisedComputedStyles;
    }
  }]);

  return StylesMinimizer;
}();

module.exports = StylesMinimizer;

/***/ }),

/***/ "./src/libs/base64.js":
/*!****************************!*\
  !*** ./src/libs/base64.js ***!
  \****************************/
/***/ ((module) => {

var PosdBase64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function encode(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = PosdBase64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }

    return output;
  },
  decode: function decode(input) {
    if (input[0] === '{') {
      return input;
    }

    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = PosdBase64._utf8_decode(output);
    return output;
  },
  _utf8_encode: function _utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }

    return utftext;
  },
  _utf8_decode: function _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = 0;
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode((c & 31) << 6 | c2 & 63);
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        i += 3;
      }
    }

    return string;
  }
};
module.exports = PosdBase64;

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
/*!*****************************!*\
  !*** ./src/content/main.js ***!
  \*****************************/
var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdMainPageContent = __webpack_require__(/*! ./MainPageContent */ "./src/content/MainPageContent.js");

var PosdFrameContent = __webpack_require__(/*! ./FrameContent */ "./src/content/FrameContent.js");

if (self == top) {
  var posdMainPageContent = new PosdMainPageContent();
  posdMainPageContent.Init();
} else {
  if (document.readyState === PosdConst.DOCUMENT_READYSTATE_LOADING) {
    document.addEventListener('DOMContentLoaded', function () {
      var posdFrameContent = new PosdFrameContent();
      posdFrameContent.Init();
    });
  } else if (document.readyState === PosdConst.DOCUMENT_READYSTATE_INTERACTIVE || document.readyState === PosdConst.DOCUMENT_READYSTATE_COMPLETE) {
    var posdFrameContent = new PosdFrameContent();
    posdFrameContent.Init();
  }
}
})();

/******/ })()
;
//# sourceMappingURL=panelos-content.js.map