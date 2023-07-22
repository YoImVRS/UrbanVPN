/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : 0);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./src/background/AdBlocker.js":
/*!*************************************!*\
  !*** ./src/background/AdBlocker.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdAdBlocker = /*#__PURE__*/function () {
  function PosdAdBlocker(id) {
    _classCallCheck(this, PosdAdBlocker);

    this.id = id;
    this.init = false;
    this.tabsCounters = [];
    this.totalCounter = 0;
    this.ConfigManager = null;
    this.TabsManager = null;
    this.status = PosdCommon.GetDefaultAdblockerStatus();
    this.GetStatusFromStorage();
  }

  _createClass(PosdAdBlocker, [{
    key: "Init",
    value: function Init(ConfigManager, TabsManager) {
      if (!this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && ConfigManager && TabsManager) {
        this.ConfigManager = ConfigManager;
        this.TabsManager = TabsManager;
        this.init = true;
      }

      return this.init;
    }
  }, {
    key: "GetStatusFromStorage",
    value: function GetStatusFromStorage() {
      if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE) {
        var posdAdBlockerStatus = localStorage.getItem('posdAdBlockerStatus');

        if (posdAdBlockerStatus && typeof posdAdBlockerStatus === "string") {
          if (posdAdBlockerStatus === PosdConst.ADBLOCKER_STATUS_ENABLED || posdAdBlockerStatus === PosdConst.ADBLOCKER_STATUS_DISABLED) {
            this.status[PosdConst.ADBLOCKER_FOR_DISPLAY] = posdAdBlockerStatus;
            this.SetStatusToStorage();
          } else {
            try {
              var userStatus = JSON.parse(PosdBase64.decode(posdAdBlockerStatus));

              for (var type in userStatus) {
                if (this.status.hasOwnProperty(type) && (userStatus[type] === PosdConst.ADBLOCKER_STATUS_ENABLED || userStatus[type] === PosdConst.ADBLOCKER_STATUS_DISABLED)) {
                  this.status[type] = userStatus[type];
                }
              }
            } catch (e) {}
          }
        }

        this.SendUpdatedStatusToAgents();
      }
    }
  }, {
    key: "SetStatusToStorage",
    value: function SetStatusToStorage() {
      var statusEncoded = PosdBase64.encode(JSON.stringify(this.status));
      localStorage.setItem('posdAdBlockerStatus', statusEncoded);
    }
  }, {
    key: "UpdateAdblockerStatus",
    value: function UpdateAdblockerStatus(adblockerTypes, adblockerStatus) {
      var _this = this;

      if (this.init) {
        var updated = false;
        adblockerTypes.forEach(function (adblockerType) {
          if (_this.status.hasOwnProperty(adblockerType)) {
            if (_this.status[adblockerType] !== adblockerStatus) {
              _this.status[adblockerType] = adblockerStatus;
              updated = true;
            }
          }
        });

        if (updated) {
          this.SendUpdatedStatusToAgents();
          this.SetStatusToStorage();
        }
      }
    }
  }, {
    key: "Enable",
    value: function Enable(adblockerTypes) {
      this.UpdateAdblockerStatus(adblockerTypes, PosdConst.ADBLOCKER_STATUS_ENABLED);
      return this.status;
    }
  }, {
    key: "Disable",
    value: function Disable(adblockerTypes) {
      this.UpdateAdblockerStatus(adblockerTypes, PosdConst.ADBLOCKER_STATUS_DISABLED);

      if (!this.IsAnyAdBlockerEnabled()) {
        this.totalCounter = 0;
        this.tabsCounters = [];
      }

      return this.status;
    }
  }, {
    key: "SetHiddenCandidatesAmount",
    value: function SetHiddenCandidatesAmount(tabId, amount) {
      var tabKey = PosdCommon.GetTabIdKey(tabId);

      if (typeof this.tabsCounters[tabKey] === "undefined") {
        this.tabsCounters[tabKey] = 0;
      }

      this.tabsCounters[tabKey] = this.tabsCounters[tabKey] + amount;
      this.totalCounter = this.totalCounter + amount;
    }
  }, {
    key: "onTabUpdated",
    value: function onTabUpdated(tabId) {
      var tabKey = PosdCommon.GetTabIdKey(tabId);

      if (typeof this.tabsCounters[tabKey] !== "undefined") {
        this.tabsCounters[tabKey] = 0;
      }
    }
  }, {
    key: "GetCounters",
    value: function GetCounters(activeTabId) {
      var counters = {
        currentPageTotal: 0,
        currentSessionTotal: this.totalCounter
      };
      var tabKey = PosdCommon.GetTabIdKey(activeTabId);

      if (typeof this.tabsCounters[tabKey] !== "undefined") {
        counters.currentPageTotal = this.tabsCounters[tabKey];
      }

      return counters;
    }
  }, {
    key: "GetStatus",
    value: function GetStatus() {
      return this.status;
    }
  }, {
    key: "SendUpdatedStatusToAgents",
    value: function SendUpdatedStatusToAgents() {
      var _this2 = this;

      if (this.init) {
        this.TabsManager.GetAllTabs(function (tabs) {
          if (tabs && tabs.length) {
            tabs.forEach(function (tab) {
              if (tab && tab.id) {
                var mes = PosdMessage.EmptyMessage;
                mes.type = PosdConst.MESSAGE_TYPE_TAB_ADBLOCKER_STATUS_CHANGED;
                mes.to = PosdCommon.GetMainPageId(tab.id);
                mes.content = _this2.status;
                chrome.tabs.sendMessage(tab.id, mes);
              }
            });
          }
        });
      }
    }
  }, {
    key: "IsAnyAdBlockerEnabled",
    value: function IsAnyAdBlockerEnabled() {
      var hasAnyEnabled = false;

      for (var type in this.status) {
        if (this.status[type] === PosdConst.ADBLOCKER_STATUS_ENABLED) {
          hasAnyEnabled = true;
        }
      }

      return hasAnyEnabled;
    }
  }, {
    key: "IsAdBlockerEnabled",
    value: function IsAdBlockerEnabled() {
      return this.init && PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.IsAnyAdBlockerEnabled();
    }
  }]);

  return PosdAdBlocker;
}();

module.exports = PosdAdBlocker;

/***/ }),

/***/ "./src/background/AdblockInspector.js":
/*!********************************************!*\
  !*** ./src/background/AdblockInspector.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdAdBlockInspector = /*#__PURE__*/function () {
  function PosdAdBlockInspector(id) {
    _classCallCheck(this, PosdAdBlockInspector);

    this.id = id;
    this.init = false;
    this.hasActiveAdblock = false;
    this.InspectorConfig = null;
    this.needsActiveAgentStatusLastRequestTime = PosdCommon.GetCurrentTimestamp() - 300;
  }

  _createClass(PosdAdBlockInspector, [{
    key: "Init",
    value: function Init(InspectorConfig) {
      this.InspectorConfig = InspectorConfig;

      if (!this.init && this.InspectorConfig) {
        this.init = true;
        return this.init;
      } else {}

      return this.init;
    }
  }, {
    key: "IsNeedActivateAgentForTab",
    value: function IsNeedActivateAgentForTab(url) {
      var currentTime = PosdCommon.GetCurrentTimestamp();

      if (this.IsActive() && currentTime - this.needsActiveAgentStatusLastRequestTime > this.GetActivationStatusUpdateInterval()) {
        //TODO: Some special logic for url - will be added in future releases
        this.needsActiveAgentStatusLastRequestTime = currentTime;
        return true;
      }

      return false;
    }
  }, {
    key: "onGotMessageFromAdBlockInspectorAgent",
    value: function onGotMessageFromAdBlockInspectorAgent(message) {
      if (this.IsActive()) {
        if (message) {
          this.hasActiveAdblock = message.hasActiveAdblock;
        }
      } else {}
    }
  }, {
    key: "IsInit",
    value: function IsInit() {
      return this.init;
    }
  }, {
    key: "IsActive",
    value: function IsActive() {
      return this.init && this.InspectorConfig && this.InspectorConfig.active;
    }
  }, {
    key: "GetActivationStatusUpdateInterval",
    value: function GetActivationStatusUpdateInterval() {
      return this.init && this.InspectorConfig && this.InspectorConfig.needsActiveAgentIntervalSec;
    }
  }, {
    key: "HasActiveAdblock",
    get: function get() {
      return this.hasActiveAdblock;
    }
  }]);

  return PosdAdBlockInspector;
}();

module.exports = PosdAdBlockInspector;

/***/ }),

/***/ "./src/background/AnalyticManager.js":
/*!*******************************************!*\
  !*** ./src/background/AnalyticManager.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdBackgendIOManager = __webpack_require__(/*! ./BackendIOManager */ "./src/background/BackendIOManager.js");

var PosdAnalyticManager = /*#__PURE__*/function () {
  function PosdAnalyticManager(id) {
    _classCallCheck(this, PosdAnalyticManager);

    this.id = id;
    this.init = false;
    this.panalyticsId = '';
    this.installEventTriggered = false;
    this.sentInstallEvent = false;
    this.BackgendIOManager = new PosdBackgendIOManager();
  }

  _createClass(PosdAnalyticManager, [{
    key: "Init",
    value: function Init() {
      if (!this.init && PosdCommon.IsOnChromeRuntime()) {
        if (PosdConfig.CONFIG_ANALYTIC_INSTALL_EVENTS_TRACING_AVAILABLE) {
          chrome.runtime.onInstalled.addListener(this.onExtensionInstalled.bind(this));
          this.init = true;
          return true;
        } else {}
      }

      return false;
    }
  }, {
    key: "onExtensionInstalled",
    value: function onExtensionInstalled(details) {
      this.installEventTriggered = true;

      if (this.panalyticsId.length && !this.sentInstallEvent) {
        if (details.reason === 'install') {
          this.SendInstallEventToBackend();
        }
      }
    }
  }, {
    key: "SetPanalyticsId",
    value: function SetPanalyticsId(panalyticsId) {
      this.panalyticsId = panalyticsId;

      if (this.panalyticsId.length && this.installEventTriggered && !this.sentInstallEvent) {
        this.SendInstallEventToBackend();
      }
    }
  }, {
    key: "SendInstallEventToBackend",
    value: function SendInstallEventToBackend() {
      if (PosdConfig.CONFIG_ANALYTIC_INSTALL_EVENTS_TRACING_AVAILABLE) {
        this.sentInstallEvent = true;
        var callUrl = PosdConfig.CONFIG_PANELBACKEND_ENDPOINT + PosdConfig.CONFIG_PANELBACKEND_ENDPOINT_ULR_INSTALL_EVENT;
        this.BackgendIOManager.SendInstallEvent(this.panalyticsId, callUrl, this.onSentInstallEvent.bind(this), this.onErrorSentInstallEvent.bind(this));
      }
    }
  }, {
    key: "onSentInstallEvent",
    value: function onSentInstallEvent() {}
  }, {
    key: "onErrorSentInstallEvent",
    value: function onErrorSentInstallEvent() {}
  }]);

  return PosdAnalyticManager;
}();

module.exports = PosdAnalyticManager;

/***/ }),

/***/ "./src/background/BackendIOManager.js":
/*!********************************************!*\
  !*** ./src/background/BackendIOManager.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdDataCollectionManager = __webpack_require__(/*! ./DataCollectionManager */ "./src/background/DataCollectionManager.js");

var PosdBackendIOManager = /*#__PURE__*/function () {
  function PosdBackendIOManager() {
    _classCallCheck(this, PosdBackendIOManager);

    this.init = false;
    this.dataCollectionManager = new PosdDataCollectionManager();
  }

  _createClass(PosdBackendIOManager, [{
    key: "SendSingleOutTicketToBackend",
    value: function SendSingleOutTicketToBackend(panalyticsId, ticket, onSentCallback, onErrorCallback) {
      if (this.dataCollectionManager.IsDisabled()) {
        onSentCallback();
      } else if (ticket && ticket.data && ticket.ticketId && ticket.ticketId.length && panalyticsId && panalyticsId.length) {
        this.SendDataToEndpoint(panalyticsId, ticket.data, PosdConfig.CONFIG_PANELBACKEND_ENDPOINT + PosdConfig.CONFIG_PANELBACKEND_ENDPOINT_ULR_OUTTICKET + '/' + ticket.ticketId, onSentCallback, onErrorCallback);
      } else {}
    }
  }, {
    key: "SendMultiOutTicketToBackend",
    value: function SendMultiOutTicketToBackend(panalyticsId, ticket, onSentCallback, onErrorCallback) {
      if (this.dataCollectionManager.IsDisabled()) {
        onSentCallback();
      } else if (ticket && ticket.data && panalyticsId && panalyticsId.length) {
        this.SendDataToEndpoint(panalyticsId, ticket.data, PosdConfig.CONFIG_PANELBACKEND_ENDPOINT + PosdConfig.CONFIG_PANELBACKEND_ENDPOINT_ULR_OUTTICKET, onSentCallback, onErrorCallback);
      } else {}
    }
  }, {
    key: "SendDataToEndpoint",
    value: function SendDataToEndpoint(panalyticsId, data, endpoint, onSentCallback, onErrorCallback) {
      if (data && endpoint) {
        fetch(endpoint, {
          method: "POST",
          cache: "no-cache",
          body: data,
          headers: {
            "Authorization": PosdBackendIOManager.GetBasicAuthorizationHeaderValue(panalyticsId),
            "Content-type": PosdConfig.CONFIG_USE_COMPRESSION ? "application/octet-stream" : "application/json"
          }
        }).then(function (response) {
          if (response.status === 200) {
            onSentCallback();
          } else {
            onErrorCallback();
          }
        })["catch"](function (err) {
          onErrorCallback();
        });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "SendInstallEvent",
    value: function SendInstallEvent(panalyticsId, callUrl, onSentCallback, onErrorCallback) {
      if (callUrl) {
        fetch(callUrl, {
          method: "POST",
          cache: "no-cache",
          body: "",
          headers: {
            "Authorization": PosdBackendIOManager.GetBasicAuthorizationHeaderValue(panalyticsId)
          }
        }).then(function (response) {
          if (response.status === 200) {
            onSentCallback();
          } else {
            onErrorCallback();
          }
        })["catch"](function () {
          onErrorCallback();
        });
        return true;
      } else {
        return false;
      }
    }
  }], [{
    key: "GetBasicAuthorizationHeaderValue",
    value: function GetBasicAuthorizationHeaderValue(panalyticsId) {
      return "Basic " + PosdBase64.encode("pnldsk:".concat(PosdConfig.CONFIG_PINSTANCE_ID, "-").concat(PosdConfig.CONFIG_PARTNER_ID, "-").concat(PosdConfig.CONFIG_DISTRIBUTOR_ID, "-").concat(panalyticsId));
    }
  }, {
    key: "GetConfig",
    value: function GetConfig(panalyticsId, callUrl, onGetDataCallback, onErrorCallback) {
      if (callUrl) {
        fetch(callUrl, {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Authorization": PosdBackendIOManager.GetBasicAuthorizationHeaderValue(panalyticsId)
          }
        }).then(function (response) {
          if (response.status === 200) {
            return response.text();
          } else {
            onErrorCallback();
          }
        }).then(function (data) {
          onGetDataCallback(data);
        })["catch"](function () {
          onErrorCallback();
        });
        return true;
      } else {
        onErrorCallback();
        return false;
      }
    }
  }]);

  return PosdBackendIOManager;
}();

module.exports = PosdBackendIOManager;

/***/ }),

/***/ "./src/background/BackgroundContent.js":
/*!*********************************************!*\
  !*** ./src/background/BackgroundContent.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdTicketSender = __webpack_require__(/*! ./TicketSender */ "./src/background/TicketSender.js");

var PosdTicketBuilder = __webpack_require__(/*! ./TicketBuilder */ "./src/background/TicketBuilder.js");

var PosdPanalyticsId = __webpack_require__(/*! ./PanalyticsId */ "./src/background/PanalyticsId.js");

var PosdContentStorage = __webpack_require__(/*! ./ContentStorage */ "./src/background/ContentStorage.js");

var PosdAnalyticManager = __webpack_require__(/*! ./AnalyticManager */ "./src/background/AnalyticManager.js");

var PosdAdBlockInspector = __webpack_require__(/*! ./AdblockInspector */ "./src/background/AdblockInspector.js");

var PosdAdBlocker = __webpack_require__(/*! ./AdBlocker */ "./src/background/AdBlocker.js");

var PosdTabsManager = __webpack_require__(/*! ./TabsManager */ "./src/background/TabsManager.js");

var PosdConfigManager = __webpack_require__(/*! ./ConfigManager */ "./src/background/ConfigManager.js");

var PosdFacebookLoader = __webpack_require__(/*! ./loaders/FacebookLoader */ "./src/background/loaders/FacebookLoader.js");

var PosdTwitterLoader = __webpack_require__(/*! ./loaders/TwitterLoader */ "./src/background/loaders/TwitterLoader.js");

var PosdDomainExcludeManager = __webpack_require__(/*! ./DomainExcludeManager */ "./src/background/DomainExcludeManager.js");

var PosdPageExcludeManager = __webpack_require__(/*! ./PageExcludeManager */ "./src/background/PageExcludeManager.js");

var PosdDataCollectionManager = __webpack_require__(/*! ./DataCollectionManager */ "./src/background/DataCollectionManager.js");

var PosdDataSharingManager = __webpack_require__(/*! ./DataSharingManager */ "./src/background/DataSharingManager.js");

var PosdBackgroundContent = /*#__PURE__*/function () {
  function PosdBackgroundContent() {
    _classCallCheck(this, PosdBackgroundContent);

    this.id = 'bg_' + PosdCommon.GenerateQuickId();
    this.activeStatus = PosdConfig.CONFIG_GLOBAL_ACTIVE_STATUS;
    this.VideoRequestNumber = 0;
    this.ConfigManager = new PosdConfigManager(this.id);
    this.TabsManager = new PosdTabsManager(this.id);
    this.TicketBuilder = new PosdTicketBuilder(this.id);
    this.TicketSender = new PosdTicketSender(this.id);
    this.panalyticsId = new PosdPanalyticsId(this.id);
    this.ContentStorage = new PosdContentStorage(this.id);
    this.AnalyticManager = new PosdAnalyticManager(this.id);
    this.AdBlockInspector = new PosdAdBlockInspector(this.id);
    this.AdBlocker = new PosdAdBlocker(this.id);
    this.FacebookLoader = new PosdFacebookLoader(this.id);
    this.TwitterLoader = new PosdTwitterLoader(this.id);
    this.DataCollectionManager = new PosdDataCollectionManager();
    this.DataSharingManager = new PosdDataSharingManager();
    this.slaveTabs = [];
    this.excludeList = {
      domains: new PosdDomainExcludeManager(),
      pages: new PosdPageExcludeManager()
    };
  }

  _createClass(PosdBackgroundContent, [{
    key: "Init",
    value: function Init() {
      this.RestoreCurrentActiveStatus();
      this.AnalyticManager.Init();
      this.panalyticsId.GetId(this.onGetPanalyticsId.bind(this));

      if (PosdCommon.IsOnChromeRuntime()) {
        chrome.runtime.onMessage.addListener(this.MessageListener.bind(this));
      }

      this.TicketSender.Init();
      this.TicketBuilder.Init(this.ContentStorage, this.TicketSender, this.AdBlockInspector, this.TabsManager, this.ConfigManager);

      if (PosdConfig.CONFIG_ADBLOCK_INSPECTOR_AVAILABLE) {
        this.AdBlockInspector.Init(this.ConfigManager.GetAdBlockInspectorConfig());
      }

      if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE) {
        this.AdBlocker.Init(this.ConfigManager, this.TabsManager);
      }

      this.FacebookLoader.Init(this.ConfigManager, this.ContentStorage);
      this.TwitterLoader.Init(this.ConfigManager, this.ContentStorage);
    }
  }, {
    key: "MessageListener",
    value: function MessageListener(mes, sender, response) {
      var _this = this,
          _mes$content,
          _mes$content2,
          _mes$content3,
          _mes$content4,
          _mes$content5;

      if (PosdMessage.IsValid(mes)) {
        if (sender.tab) {
          if (PosdMessage.IsStrictValid(mes)) {
            switch (true) {
              case mes.type === PosdConst.MESSAGE_TYPE_TAB_INITIALIZATION:
                this.TabsManager.SetInitedTab(sender.tab.id, mes.content);

                if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker.IsAdBlockerEnabled()) {
                  this.AdBlocker.onTabUpdated(sender.tab.id);
                }

                response({
                  status: 'ok',
                  config: {
                    activeStatus: this.activeStatus,
                    activeAdBlockInspectorAgent: this.AdBlockInspector.IsNeedActivateAgentForTab(sender.tab.url),
                    adBlockerStatus: this.AdBlocker.GetStatus(),
                    panalyticsId: this.panalyticsId.ID,
                    tabId: sender.tab.id,
                    excludeList: Object.keys(this.excludeList).reduce(function (acc, key) {
                      acc[key] = _this.excludeList[key].GetList();
                      return acc;
                    }, {}),
                    configuration: this.ConfigManager.GetConfigEncoded()
                  }
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_TAB_SINGLE_PAGE_REINITIALIZATION:
                this.TabsManager.SetInitedTab(sender.tab.id, mes.content);

                if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker.IsAdBlockerEnabled()) {
                  this.AdBlocker.onTabUpdated(sender.tab.id);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_PANEL_REGULATOR_RESULT:
                this.UpdateSlaveTabs(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_IFRAME_INITIALIZATION:
                var responseMes = PosdMessage.EmptyMessage;
                responseMes.type = PosdConst.MESSAGE_TYPE_IFRAME_INITIALIZATION_RESPONSE;
                responseMes.from = this.id;
                responseMes.content = {
                  isMaster: this.isTabMaster(sender.tab.id),
                  activeStatus: this.activeStatus,
                  frameId: sender.frameId,
                  configuration: this.ConfigManager.GetConfigEncoded()
                };
                response({
                  status: 'ok',
                  mes: responseMes
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET:
                this.TicketBuilder.AddTicketToTabInfo(sender.tab.id, this.TicketBuilder.PrebuildTicket(mes.content));
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_OUT_TICKET:
                if (this.TicketBuilder.AddTicketForBuilding(sender.tab.id, this.TicketBuilder.PrebuildTicket(mes.content))) {
                  response({
                    status: 'ok'
                  });
                } else {
                  response({
                    status: 'error'
                  });
                }

                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_HTML5:
                this.ContentStorage.AddCandidatePlacementsHtml5(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_FACEBOOK:
                this.ContentStorage.AddCandidatePlacementsFacebook(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TWITTER:
                this.ContentStorage.AddCandidatePlacementsTwitter(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_REDDIT:
                this.ContentStorage.AddCandidatePlacementsReddit(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_SKINADS:
                this.ContentStorage.AddCandidatesDataSkinAds(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_BANNERS:
                this.ContentStorage.AddCandidatesDataBanners(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK:
                if (mes.content && mes.content.length) {
                  for (var i = 0; i < mes.content.length; i++) {
                    if (mes.content[i].designVersion === PosdConst.FACEBOOK_DESIGN_VERSION_NEW) {
                      this.ContentStorage.AddOneCandidateDataFacebook(sender.tab.id, mes.content[i]);
                    } else {
                      if (this.FacebookLoader.IsLoadAboutPageActivated() && mes.content[i].aboutPageLink && mes.content[i].aboutPageLink.length) {
                        this.FacebookLoader.AddOneCandidateForLoading(sender.tab.id, mes.content[i], mes.type);
                      } else {
                        this.ContentStorage.AddOneCandidateDataFacebook(sender.tab.id, mes.content[i]);
                      }
                    }
                  }
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_TWITTER:
                if (this.TwitterLoader.IsLoadUserDataActivated() && (mes.content[0].hasOwnProperty('videoData') && mes.content[0].videoData || !mes.content[0].hasOwnProperty('videoData'))) {
                  this.TwitterLoader.AddCandidatesForLoading(sender.tab.id, mes.content);
                  response({
                    status: 'ok'
                  });
                } else if (mes.content[0].hasOwnProperty('videoData') && mes.content[0].videoData || !mes.content[0].hasOwnProperty('videoData')) {
                  this.ContentStorage.AddCandidatesDataTwitter(sender.tab.id, mes.content);
                  response({
                    status: 'ok'
                  });
                }

                break;

              case mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_REDDIT:
                this.ContentStorage.AddCandidatesDataReddit(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA:
                if (mes.content) {
                  this.ContentStorage.AddCandidatesFacebookVideoData(sender.tab.id, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA:
                if (mes.content) {
                  var _har = mes.content;
                  _har.requestId = this.VideoRequestNumber++;

                  if (mes.content.encodedText.bisLinks && mes.content.encodedText.bisLinks.aboutPageLink) {
                    this.FacebookLoader.AddOneCandidateForLoading(sender.tab.id, mes.content, mes.type);
                  } else {
                    this.ContentStorage.AddVideoHar(sender.tab.id, _har);
                  }

                  response({
                    status: 'ok'
                  });
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_TWITTER_VIDEO_DATA:
                if (mes.content) {
                  this.ContentStorage.AddCandidatesTwitterVideoData(sender.tab.id, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_REDDIT_VIDEO_DATA:
                if (mes.content) {
                  this.ContentStorage.AddCandidatesRedditVideoData(sender.tab.id, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA:
                if (mes.content) {
                  this.ContentStorage.AddCandidatesRedditRightColumnData(sender.tab.id, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_IFRAME_CONTENT:
                mes.content.browserFrameId = sender.frameId;
                this.ContentStorage.AddChainSegmentContent(sender.tab.id, mes.content);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_IFRAME_INVALID_CHAIN_SEGMENT_CONTENT:
                if (mes.content.isChainCompleted) {
                  this.ContentStorage.AddInvalidChainCompletedContent(sender.tab.id, mes.content);
                } else {
                  this.ContentStorage.AddChainSegmentContent(sender.tab.id, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL_RESPOND:
                if (this.TicketBuilder.IsInit()) {
                  this.TicketBuilder.onGotTicketClickTargetUrlInfo(sender.tab.id, mes.from, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS:
                this.ContentStorage.AddFrameWithInputs(sender.tab.id, sender.frameId);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS:
                this.ContentStorage.AddFrameWithRedirects(sender.tab.id, sender.frameId);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT:
                if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE) {
                  this.AdBlocker.SetHiddenCandidatesAmount(sender.tab.id, mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_VIDEO_HAR:
                var har = mes.content;
                har.requestId = this.VideoRequestNumber++;
                har.frameId = sender.frameId;
                har.framesChain = [];
                this.ContentStorage.AddVideoHar(sender.tab.id, har);
                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT:
                if (this.AdBlockInspector && this.AdBlockInspector.onGotMessageFromAdBlockInspectorAgent) {
                  this.AdBlockInspector.onGotMessageFromAdBlockInspectorAgent(mes.content);
                }

                response({
                  status: 'ok'
                });
                break;

              case mes.type === PosdConst.MESSAGE_TYPE_TEST:
                response({
                  status: 'ok'
                });
                break;

              default:
                response({
                  status: 'error'
                });
                break;
            } // if (mes.type === PosdConst.MESSAGE_TYPE_TAB_INITIALIZATION) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : tabId ${sender.tab.id} initialisation, activeStatus ${this.activeStatus}`);
            //     // this.TabsManager.SetInitedTab(sender.tab.id, mes.content);                
            //     // if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker.IsAdBlockerEnabled()) {
            //     //     this.AdBlocker.onTabUpdated(sender.tab.id);
            //     // }
            //     // response({status: 'ok', config: {
            //     //     activeStatus: this.activeStatus,
            //     //     activeAdBlockInspectorAgent: this.AdBlockInspector.IsNeedActivateAgentForTab(sender.tab.url),
            //     //     adBlockerStatus: this.AdBlocker.GetStatus(),
            //     //     panalyticsId: this.panalyticsId.ID,
            //     //     tabId: sender.tab.id,
            //     //     excludeList: Object.keys(this.excludeList).reduce((acc, key) => {
            //     //       acc[key] = this.excludeList[key].GetList();
            //     //       return acc;
            //     //     }, {}),
            //     //     configuration: this.ConfigManager.GetConfigEncoded()}
            //     // });
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_TAB_SINGLE_PAGE_REINITIALIZATION) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : tabId ${sender.tab.id} single pager reinitialisation`);
            //     // this.TabsManager.SetInitedTab(sender.tab.id, mes.content);                
            //     // if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker.IsAdBlockerEnabled()) {
            //     //     this.AdBlocker.onTabUpdated(sender.tab.id);
            //     // }
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANEL_REGULATOR_RESULT) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : tabId ${sender.tab.id} PanelRegulator result, isMaster: ${mes.content}`);
            //     // this.UpdateSlaveTabs(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_IFRAME_INITIALIZATION) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : iframe init tabId: ${sender.tab.id} frameId: ${sender.frameId}, activeStatus ${this.activeStatus}, isMaster ${this.isTabMaster(sender.tab.id)}, location: ${mes.content.location}`);
            //     // let responseMes = PosdMessage.EmptyMessage;
            //     // responseMes.type = PosdConst.MESSAGE_TYPE_IFRAME_INITIALIZATION_RESPONSE;
            //     // responseMes.from = this.id;
            //     // responseMes.content = {
            //     //     isMaster: this.isTabMaster(sender.tab.id),
            //     //     activeStatus: this.activeStatus,
            //     //     frameId: sender.frameId,
            //     //     configuration: this.ConfigManager.GetConfigEncoded()
            //     // };
            //     // response({status: 'ok', mes: responseMes});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] :  tabId ${sender.tab.id} MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET`);
            //     // this.TicketBuilder.AddTicketToTabInfo(sender.tab.id, this.TicketBuilder.PrebuildTicket(mes.content));
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_OUT_TICKET) {
            //     // console.log("PosdConst.MESSAGE_TYPE_OUT_TICKET", PosdConst.MESSAGE_TYPE_OUT_TICKET)
            //     // if (this.TicketBuilder.AddTicketForBuilding(sender.tab.id, this.TicketBuilder.PrebuildTicket(mes.content))) {
            //     //     console.log("PosdConst.MESSAGE_TYPE_OUT_TICKET", PosdConst.MESSAGE_TYPE_OUT_TICKET, true)
            //     //     response({status: 'ok'});
            //     // } else {
            //     //     response({status: 'error'});
            //     // }
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_HTML5) {
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA) {
            //     if (mes.content) {   
            //         console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} got FACEBOOK_INSTREAM_DATA`, mes);
            //         let har = mes.content;
            //         har.requestId = this.VideoRequestNumber++;
            //         this.ContentStorage.AddVideoHar(sender.tab.id, har);
            //         response({status: 'ok'});
            //     }
            //     response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_TWITTER_VIDEO_DATA) {
            //     // this.ContentStorage.AddCandidatePlacementsHtml5(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_FACEBOOK) {
            //     // this.ContentStorage.AddCandidatePlacementsFacebook(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TWITTER) {
            //     // this.ContentStorage.AddCandidatePlacementsTwitter(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_SKINADS) {
            //     // this.ContentStorage.AddCandidatesDataSkinAds(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_BANNERS) {
            //     // this.ContentStorage.AddCandidatesDataBanners(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK) {
            //     // if (mes.content && mes.content.length) {
            //     //    for (let i = 0; i < mes.content.length; i++) {
            //     //       if (mes.content[i].designVersion === PosdConst.FACEBOOK_DESIGN_VERSION_NEW) {
            //     //          this.ContentStorage.AddOneCandidateDataFacebook(sender.tab.id, mes.content[i]);
            //     //       } else {
            //     //          if (this.FacebookLoader.IsLoadAboutPageActivated() && mes.content[i].aboutPageLink && mes.content[i].aboutPageLink.length) {
            //     //             this.FacebookLoader.AddOneCandidateForLoading(sender.tab.id, mes.content[i]);
            //     //          } else {
            //     //             this.ContentStorage.AddOneCandidateDataFacebook(sender.tab.id, mes.content[i]);
            //     //          }
            //     //       }
            //     //    }
            //     // }
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_TWITTER) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] :  tabId ${sender.tab.id}, AdData: `, mes.content);
            //     // if (
            //     //     this.TwitterLoader.IsLoadUserDataActivated() && 
            //     //     ((mes.content[0].hasOwnProperty('videoData') && 
            //     //     mes.content[0].videoData) || 
            //     //     !mes.content[0].hasOwnProperty('videoData'))
            //     // ) {
            //     //    this.TwitterLoader.AddCandidatesForLoading(sender.tab.id, mes.content);
            //     //    response({status: 'ok'});
            //     // } else if (
            //     //     (mes.content[0].hasOwnProperty('videoData') && 
            //     //     mes.content[0].videoData) || 
            //     //     !mes.content[0].hasOwnProperty('videoData')
            //     // ) {
            //     //    this.ContentStorage.AddCandidatesDataTwitter(sender.tab.id, mes.content);
            //     //    response({status: 'ok'}); 
            //     // }
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA) {
            // //     if (mes.content) {                   
            // //       this.ContentStorage.AddCandidatesFacebookVideoData(sender.tab.id, mes.content);
            // //     }
            // //     response({status: 'ok'});
            // // } else if (mes.type === PosdConst.MESSAGE_TYPE_TWITTER_VIDEO_DATA) {
            // //     if (mes.content) {
            // //         this.ContentStorage.AddCandidatesTwitterVideoData(sender.tab.id, mes.content);
            // //     }
            // //     response({status: 'ok'});   
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_IFRAME_CONTENT) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got chain segment content from: ${mes.from}`);
            //     // mes.content.browserFrameId = sender.frameId;
            //     // this.ContentStorage.AddChainSegmentContent(sender.tab.id, mes.content);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_IFRAME_INVALID_CHAIN_SEGMENT_CONTENT) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got invalid chain segment content from: ${mes.from}`);
            //     // if (mes.content.isChainCompleted) {
            //     //     this.ContentStorage.AddInvalidChainCompletedContent(sender.tab.id, mes.content);
            //     // } else {
            //     //     this.ContentStorage.AddChainSegmentContent(sender.tab.id, mes.content);
            //     // }
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL_RESPOND) {
            //     // if (this.TicketBuilder.IsInit()) {
            //     //     this.TicketBuilder.onGotTicketClickTargetUrlInfo(sender.tab.id, mes.from, mes.content);
            //     // }
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS`);
            //     // this.ContentStorage.AddFrameWithInputs(sender.tab.id, sender.frameId);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS`);
            //     // this.ContentStorage.AddFrameWithRedirects(sender.tab.id, sender.frameId);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT`);
            //     // if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE) {
            //     //    this.AdBlocker.SetHiddenCandidatesAmount(sender.tab.id, mes.content);
            //     // }
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_VIDEO_HAR) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got MESSAGE_TYPE_VIDEO_HAR`);
            //     // let har = mes.content;
            //     // har.requestId = this.VideoRequestNumber++;
            //     // har.frameId = sender.frameId;
            //     // har.framesChain = [];
            //     // this.ContentStorage.AddVideoHar(sender.tab.id, har);
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT`);
            //     // if (this.AdBlockInspector && this.AdBlockInspector.onGotMessageFromAdBlockInspectorAgent) {
            //     //    this.AdBlockInspector.onGotMessageFromAdBlockInspectorAgent(mes.content);
            //     // }
            //     // response({status: 'ok'});
            // } else if (mes.type === PosdConst.MESSAGE_TYPE_TEST) {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got MESSAGE_TYPE_TEST ${mes.content}`);
            //     // response({status: 'ok'});
            // } else {
            //     // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : [tabId: ${sender.tab.id} frameId: ${sender.frameId}] got unknown message type`);
            //     // response({status: 'error'});
            // }

          }
        } else {
          switch (true) {
            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANALYTICS_ID:
              response({
                status: 'ok',
                panalyticsId: this.panalyticsId.ID
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANELOS_VERSION:
              response({
                status: 'ok',
                version: PosdConfig.CONFIG_PANELOS_VERSION
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_STATUS:
              response({
                status: 'ok',
                adBlockerStatus: this.AdBlocker.GetStatus(mes.content)
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_COUNTERS:
              response({
                status: 'ok',
                counters: this.AdBlocker.GetCounters(mes.content)
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_ADBLOCKER:
              response({
                status: 'ok',
                adBlockerStatus: this.AdBlocker.Enable(mes.content)
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_ADBLOCKER:
              response({
                status: 'ok',
                adBlockerStatus: this.AdBlocker.Disable(mes.content)
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_GET_EXCLUDE_LIST:
              this.GetExcludeList(function (list) {
                return response({
                  status: 'ok',
                  excludeList: list
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }, (_mes$content = mes.content) === null || _mes$content === void 0 ? void 0 : _mes$content.listType);
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_ADD_INTO_EXCLUDE_LIST:
              this.AddIntoExcludeList(function () {
                return response({
                  status: 'ok'
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }, (_mes$content2 = mes.content) === null || _mes$content2 === void 0 ? void 0 : _mes$content2.listType, (_mes$content3 = mes.content) === null || _mes$content3 === void 0 ? void 0 : _mes$content3.item);
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_REMOVE_FROM_EXCLUDE_LIST:
              this.RemoveFromExcludeList(function () {
                return response({
                  status: 'ok'
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }, (_mes$content4 = mes.content) === null || _mes$content4 === void 0 ? void 0 : _mes$content4.listType, (_mes$content5 = mes.content) === null || _mes$content5 === void 0 ? void 0 : _mes$content5.item);
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST:
              this.AddCurrentDomainIntoExcludeList(function (domain) {
                return response({
                  status: 'ok',
                  domain: domain
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }); // tell browser to wait async callback

              return true;

            case mes.type === PosdConst.MESSAGE_TYPE_ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST:
              this.AddCurrentPageIntoExcludeList(function (page) {
                return response({
                  status: 'ok',
                  page: page
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }); // tell browser to wait async callback

              return true;

            case mes.type === PosdConst.MESSAGE_TYPE_GET_CURRENT_DOMAIN:
              this.GetCurrentDomain(function (domain) {
                return response({
                  status: 'ok',
                  domain: domain
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }); // tell browser to wait async callback

              return true;

            case mes.type === PosdConst.MESSAGE_TYPE_GET_CURRENT_PAGE_URL:
              this.GetCurrentPageUrl(function (page) {
                return response({
                  status: 'ok',
                  page: page
                });
              }, function (err) {
                return response({
                  status: 'error',
                  message: err.message
                });
              }); // tell browser to wait async callback

              return true;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_DATA_COLLECTION_STATUS:
              response({
                status: 'ok',
                dataCollectionStatus: this.DataCollectionManager.IsEnabled()
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_DATA_COLLECTION:
              response({
                status: 'ok',
                dataCollectionStatus: this.DataCollectionManager.Enable()
              });
              break;

            case mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_DATA_COLLECTION:
              response({
                status: 'ok',
                dataCollectionStatus: this.DataCollectionManager.Disable()
              });
              break;

            default:
              response({
                status: 'error'
              });
              break;
          } // if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANALYTICS_ID) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_GET_PANALYTICS_ID from popup `, mes);
          //   //  response({status: 'ok', panalyticsId: this.panalyticsId.ID});
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANELOS_VERSION) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_GET_PANELOS_VERSION from popup `, mes);
          //   //  response({status: 'ok', version: PosdConfig.CONFIG_PANELOS_VERSION});
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_STATUS) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_GET_ADBLOCKER_STATUS from popup `, mes);
          //   //  response({status: 'ok', adBlockerStatus: this.AdBlocker.GetStatus(mes.content)});
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_COUNTERS) {                
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_GET_ADBLOCKER_COUNTERS from popup `, mes);
          //   //  response({status: 'ok', counters: this.AdBlocker.GetCounters(mes.content)});
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_ADBLOCKER) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_ENABLE_ADBLOCKER from popup `, mes);
          //   //  response({status: 'ok', adBlockerStatus: this.AdBlocker.Enable(mes.content)});
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_ADBLOCKER) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_DISABLE_ADBLOCKER from popup `, mes);
          //   //  response({ status: 'ok', adBlockerStatus: this.AdBlocker.Disable(mes.content) });
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_GET_EXCLUDE_LIST) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get GET_EXCLUDE_LIST from popup `, mes);
          //   //  this.GetExcludeList(
          //   //     list => response({status: 'ok', excludeList: list}),
          //   //     err => response({status: 'error', message: err.message}),
          //   //     mes.content?.listType,
          //   //  );
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_ADD_INTO_EXCLUDE_LIST) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get ADD_INTO_EXCLUDE_LIST from popup `, mes);
          //   //  this.AddIntoExcludeList(
          //   //     () => response({status: 'ok'}),
          //   //     err => response({status: 'error', message: err.message}),
          //   //     mes.content?.listType,
          //   //     mes.content?.item,
          //   //  );
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_REMOVE_FROM_EXCLUDE_LIST) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REMOVE_FROM_EXCLUDE_LIST from popup `, mes);
          //   //  this.RemoveFromExcludeList(
          //   //     () => response({status: 'ok'}),
          //   //     err => response({status: 'error', message: err.message}),
          //   //     mes.content?.listType,
          //   //     mes.content?.item,
          //   //  );
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST from popup `, mes);
          //   //  this.AddCurrentDomainIntoExcludeList(
          //   //     domain => response({status: 'ok', domain }),
          //   //     err => response({status: 'error', message: err.message}),
          //   //   );
          //   //  // tell browser to wait async callback
          //   //  return true;
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST from popup `, mes);
          //   //  this.AddCurrentPageIntoExcludeList(
          //   //     page => response({status: 'ok', page }),
          //   //     err => response({status: 'error', message: err.message}),
          //   //  );
          //   //  // tell browser to wait async callback
          //   //  return true;
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_GET_CURRENT_DOMAIN) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get GET_CURRENT_DOMAIN from popup `, mes);
          //   //  this.GetCurrentDomain(
          //   //     domain => response(({status: 'ok', domain })),
          //   //     err => response({status: 'error', message: err.message}),
          //   //  );
          //   //  // tell browser to wait async callback
          //   //  return true;
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_GET_CURRENT_PAGE_URL) {
          //   // console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get GET_CURRENT_PAGE_URL from popup `, mes)
          //   // this.GetCurrentPageUrl(
          //   //   page => response(({status: 'ok', page })),
          //   //   err => response({status: 'error', message: err.message}),
          //   // );
          //   // // tell browser to wait async callback
          //   // return true;
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_DATA_COLLECTION_STATUS) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_GET_DATA_COLLECTION_STATUS from popup `, mes);
          //   //  response({status: 'ok', dataCollectionStatus: this.DataCollectionManager.IsEnabled()});
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_DATA_COLLECTION) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_ENABLE_DATA_COLLECTION from popup `, mes);
          //   //  response({ status: 'ok', dataCollectionStatus: this.DataCollectionManager.Enable() });
          // } else if (mes.type === PosdConst.MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_DATA_COLLECTION) {
          //   //  console.log(`posd_log: ${new Date().toLocaleString()} DEBUG [${this.id}] : get REQUESTS_DISABLE_DATA_COLLECTION from popup `, mes);
          //   //  response({ status: 'ok', dataCollectionStatus: this.DataCollectionManager.Disable() });
          // } else {
          //   //  response({status: 'error'});
          // }

        }
      }
    }
  }, {
    key: "onGetPanalyticsId",
    value: function onGetPanalyticsId(panalyticsId) {
      this.TicketSender.SetPanalyticsId(panalyticsId);
      this.AnalyticManager.SetPanalyticsId(panalyticsId);
      this.ConfigManager.SetPanalyticsId(panalyticsId);
      this.TicketBuilder.SetPanalyticsId(panalyticsId);
    }
  }, {
    key: "RestoreCurrentActiveStatus",
    value: function RestoreCurrentActiveStatus() {
      var activeStatus = localStorage.getItem('posdActiveStatus');

      if (activeStatus === "on" || activeStatus === "off") {
        if (activeStatus === "on") {
          this.activeStatus = true;
        } else {
          this.activeStatus = false;
        }
      } else {
        this.activeStatus = PosdConfig.CONFIG_GLOBAL_ACTIVE_STATUS;
        this.UpdateActiveStatus(this.activeStatus);
      }
    }
  }, {
    key: "UpdateActiveStatus",
    value: function UpdateActiveStatus(status) {
      this.activeStatus = status;

      if (this.activeStatus) {
        localStorage.setItem('posdActiveStatus', 'on');
      } else {
        localStorage.setItem('posdActiveStatus', 'off');
      }
    }
  }, {
    key: "UpdateConfig",
    value: function UpdateConfig() {
      if (this.ConfigManager) {
        this.ConfigManager.UpdateConfig(3000);
      }
    }
  }, {
    key: "GetAdBlockerStatus",
    value: function GetAdBlockerStatus(onGetStatus, onError) {
      if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker && onGetStatus) {
        onGetStatus(this.AdBlocker.GetStatus());
      } else if (onError) {
        onError('error: adblocker is not available');
      }
    }
  }, {
    key: "GetAdBlockerCounters",
    value: function GetAdBlockerCounters(onGetCounters, onError, tabId) {
      if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker && onGetCounters) {
        onGetCounters(this.AdBlocker.GetCounters(tabId));
      } else if (onError) {
        onError('error: adblocker is not available');
      }
    }
  }, {
    key: "EnableAdBlocker",
    value: function EnableAdBlocker(onEnabled, onError, options) {
      if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker && onEnabled) {
        onEnabled(this.AdBlocker.Enable(options));
      } else if (onError) {
        onError('error: adblocker is not available');
      }
    }
  }, {
    key: "DisableAdBlocker",
    value: function DisableAdBlocker(onDisabled, onError, options) {
      if (PosdConfig.CONFIG_ADBLOCKER_AVAILABLE && this.AdBlocker && onDisabled) {
        onDisabled(this.AdBlocker.Disable(options));
      } else if (onError) {
        onError('error: adblocker is not available');
      }
    }
  }, {
    key: "UpdateSlaveTabs",
    value: function UpdateSlaveTabs(tabId, isMaster) {
      if (isMaster) {
        if (this.slaveTabs.includes(tabId)) {
          var index = this.slaveTabs.indexOf(tabId);

          if (index !== -1) {
            this.slaveTabs.splice(index, 1);
          }
        }
      } else {
        if (!this.slaveTabs.includes(tabId)) {
          this.slaveTabs.push(tabId);
        }
      }
    }
  }, {
    key: "isTabMaster",
    value: function isTabMaster(tabId) {
      if (this.slaveTabs.includes(tabId)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "GetExcludeList",
    value: function GetExcludeList(onGetExcludeList, onError, listType) {
      try {
        this._validateExcludeListType(listType);

        onGetExcludeList(this.excludeList[listType].GetList());
      } catch (e) {
        onError(e);
      }
    }
  }, {
    key: "AddIntoExcludeList",
    value: function AddIntoExcludeList(onAddIntoExcludeList, onError, listType, item) {
      if (!this.excludeList[listType]) {
        onError();
      }

      try {
        onAddIntoExcludeList(this.excludeList[listType].AddItem(item));
      } catch (e) {
        onError(e);
      }
    }
  }, {
    key: "RemoveFromExcludeList",
    value: function RemoveFromExcludeList(onRemoveFromExcludeList, onError, listType, item) {
      try {
        this._validateExcludeListType(listType);

        onRemoveFromExcludeList(this.excludeList[listType].RemoveItem(item));
      } catch (e) {
        onError(e);
      }
    }
  }, {
    key: "HasItemInExcludeList",
    value: function HasItemInExcludeList(onHasItemInExcludeList, onError, listType, item) {
      try {
        this._validateExcludeListType(listType);

        onHasItemInExcludeList(this.excludeList[listType].HasItem(item));
      } catch (e) {
        onError(e);
      }
    }
  }, {
    key: "AddCurrentDomainIntoExcludeList",
    value: function AddCurrentDomainIntoExcludeList(onAddCurrentDomainIntoExcludeList, onError) {
      var _this2 = this;

      this.GetCurrentDomain(function (domain) {
        try {
          _this2.excludeList.domains.AddItem(domain);

          onAddCurrentDomainIntoExcludeList(domain);
        } catch (e) {
          onError(e);
        }
      }, function (err) {
        return onError(err);
      });
    }
  }, {
    key: "AddCurrentPageIntoExcludeList",
    value: function AddCurrentPageIntoExcludeList(onAddCurrentPageIntoExcludeList, onError) {
      var _this3 = this;

      this.GetCurrentPageUrl(function (page) {
        try {
          _this3.excludeList.pages.AddItem(page);

          onAddCurrentPageIntoExcludeList(page);
        } catch (e) {
          onError(e);
        }
      }, function (err) {
        return onError(err);
      });
    }
  }, {
    key: "GetCurrentDomain",
    value: function GetCurrentDomain(onGetCurrentDomain, onError) {
      this.GetCurrentPageUrl(function (url) {
        var obj = new URL(url);
        onGetCurrentDomain("".concat(obj.protocol, "//").concat(obj.hostname));
      }, function (err) {
        return onError(err);
      });
    }
  }, {
    key: "GetCurrentPageUrl",
    value: function GetCurrentPageUrl(onGetCurrentPageUrl, onError) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        if (tabs && tabs[0] && tabs[0].id) {
          onGetCurrentPageUrl(tabs[0].url);
        } else {
          onError(new Error('No Active Tab'));
        }
      });
    }
  }, {
    key: "_validateExcludeListType",
    value: function _validateExcludeListType(listType) {
      if (!this.excludeList[listType]) {
        throw new Error("List type \"".concat(listType, "\" is not available"));
      }
    }
  }, {
    key: "EnableDataCollection",
    value: function EnableDataCollection(onEnabled, onError) {
      try {
        this.DataCollectionManager.Enable();
        onEnabled();
      } catch (e) {
        onError();
      }
    }
  }, {
    key: "DisableDataCollection",
    value: function DisableDataCollection(onDisabled, onError) {
      try {
        this.DataCollectionManager.Disable();
        onDisabled();
      } catch (e) {
        onError();
      }
    }
  }, {
    key: "GetDataCollectionStatus",
    value: function GetDataCollectionStatus(onGetStatus, onError) {
      try {
        onGetStatus(this.DataCollectionManager.IsEnabled());
      } catch (e) {
        onError();
      }
    }
  }, {
    key: "EnableDataSharing",
    value: function EnableDataSharing(onEnabled, onError) {
      try {
        this.DataSharingManager.Enable();
        onEnabled();
      } catch (e) {
        onError();
      }
    }
  }, {
    key: "DisableDataSharing",
    value: function DisableDataSharing(onDisabled, onError) {
      try {
        this.DataSharingManager.Disable();
        onDisabled();
      } catch (e) {
        onError();
      }
    }
  }, {
    key: "GetDataSharingStatus",
    value: function GetDataSharingStatus(onGetStatus, onError) {
      try {
        onGetStatus(this.DataSharingManager.IsEnabled());
      } catch (e) {
        onError();
      }
    }
  }]);

  return PosdBackgroundContent;
}();

module.exports = PosdBackgroundContent;

/***/ }),

/***/ "./src/background/ConfigLocalExtender.js":
/*!***********************************************!*\
  !*** ./src/background/ConfigLocalExtender.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdConfigLocalExtender = /*#__PURE__*/function () {
  function PosdConfigLocalExtender(id) {
    _classCallCheck(this, PosdConfigLocalExtender);

    this.id = id;
    this.LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES = [];
  }

  _createClass(PosdConfigLocalExtender, [{
    key: "ExtendConfigJson",
    value: function ExtendConfigJson(config) {
      var extendedHtml5TargetUrlDetectionConfig = this.ExtendHtml5TargetUrlDetectionConfig(config.html5TargetUrlDetectionConfig);
      return Object.assign(config, {
        html5TargetUrlDetectionConfig: extendedHtml5TargetUrlDetectionConfig
      });
    }
  }, {
    key: "ExtendConfigEncoded",
    value: function ExtendConfigEncoded(configEncoded) {
      var configJson = JSON.parse(PosdBase64.decode(configEncoded));
      var extendedConfig = this.ExtendConfigJson(configJson);
      return PosdBase64.encode(JSON.stringify(extendedConfig));
    }
  }, {
    key: "ExtendHtml5TargetUrlDetectionConfig",
    value: function ExtendHtml5TargetUrlDetectionConfig(html5TargetUrlDetectionConfig) {
      this.SetDefaultWindowsObjectProperties();
      return Object.assign(html5TargetUrlDetectionConfig, {
        LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES: this.LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES
      });
    }
  }, {
    key: "SetDefaultWindowsObjectProperties",
    value: function SetDefaultWindowsObjectProperties() {
      if (this.LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES.length === 0) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        var defaultWindowsObjectProperties = Object.getOwnPropertyNames(iframe.contentWindow);
        document.body.removeChild(iframe);
        this.LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES = defaultWindowsObjectProperties;
      }
    }
  }]);

  return PosdConfigLocalExtender;
}();

module.exports = PosdConfigLocalExtender;

/***/ }),

/***/ "./src/background/ConfigManager.js":
/*!*****************************************!*\
  !*** ./src/background/ConfigManager.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdBackendIOManager = __webpack_require__(/*! ./BackendIOManager */ "./src/background/BackendIOManager.js");

var PosdConfigLocalExtender = __webpack_require__(/*! ./ConfigLocalExtender */ "./src/background/ConfigLocalExtender.js");

var ConfigEncoded = __webpack_require__(/*! ../libs/config.js */ "./src/libs/config.js");

var PosdConfigManager = /*#__PURE__*/function () {
  function PosdConfigManager(id) {
    _classCallCheck(this, PosdConfigManager);

    this.id = id;
    var configEncoded = ConfigEncoded;
    var config = JSON.parse(PosdBase64.decode(configEncoded));
    this.ConfigLocalExtender = new PosdConfigLocalExtender(id);
    this.configEncoded = this.ConfigLocalExtender.ExtendConfigEncoded(configEncoded);
    this.config = this.ConfigLocalExtender.ExtendConfigJson(config);
    this.panalyticsId = '';
  }

  _createClass(PosdConfigManager, [{
    key: "SetPanalyticsId",
    value: function SetPanalyticsId(panalyticsId) {
      if (this.panalyticsId !== panalyticsId) {
        this.panalyticsId = panalyticsId;
        this.LoadConfig();
        setInterval(this.LoadConfig.bind(this), 3600000);
      }
    }
  }, {
    key: "LoadConfig",
    value: function LoadConfig() {
      PosdBackendIOManager.GetConfig(this.panalyticsId, PosdConfig.CONFIG_PANELBACKEND_ENDPOINT + PosdConfig.CONFIG_PANELBACKEND_ENDPOINT_ULR_CONFIGURATION, this.onGetConfigData.bind(this), this.onGetConfigDataError.bind(this));
    }
  }, {
    key: "UpdateConfig",
    value: function UpdateConfig(updateDeleyMs) {
      setTimeout(this.LoadConfig.bind(this), updateDeleyMs);
    }
  }, {
    key: "onGetConfigDataError",
    value: function onGetConfigDataError() {}
  }, {
    key: "onGetConfigData",
    value: function onGetConfigData(data) {
      try {
        var config = JSON.parse(PosdBase64.decode(data));

        if (config && config.hasOwnProperty('blacklistBannerImgSrc') && config.hasOwnProperty('blacklistBannerHref') && config.hasOwnProperty('blacklistIframeSrc') && config.hasOwnProperty('blacklistIframeId') && config.hasOwnProperty('blacklistTargetUrl') && config.hasOwnProperty('whitelistCandidatesUrlKeyWords') && config.hasOwnProperty('videoValidatorsForHTML') && config.hasOwnProperty('videoValidatorsForJS') && config.hasOwnProperty('videoValidatorsForXHR') && config.hasOwnProperty('loadManagement') && config.hasOwnProperty('blacklistPublishers') && config.hasOwnProperty('facebookConfig') && config.hasOwnProperty('twitterConfig') && config.hasOwnProperty('adBlockInspectorConfig')) {
          this.configEncoded = this.ConfigLocalExtender.ExtendConfigEncoded(data);
          this.config = this.ConfigLocalExtender.ExtendConfigJson(config);
        } else {}
      } catch (e) {}
    }
  }, {
    key: "GetConfigFull",
    value: function GetConfigFull() {
      return this.config;
    }
  }, {
    key: "GetLoadManagementSettings",
    value: function GetLoadManagementSettings() {
      return this.config.loadManagement;
    }
  }, {
    key: "GetBlacklistPublishers",
    value: function GetBlacklistPublishers() {
      return this.config.blacklistPublishers;
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
    key: "GetBannerAdsConfig",
    value: function GetBannerAdsConfig() {
      return this.config.bannerAdsConfig;
    }
  }, {
    key: "GetHtml5AdsConfig",
    value: function GetHtml5AdsConfig() {
      return this.config.HTML5AdsConfig;
    }
  }, {
    key: "IsUseSensitiveDataFilter",
    value: function IsUseSensitiveDataFilter() {
      if (this.config.hasOwnProperty('useSensitiveDataFilter')) {
        return this.config.useSensitiveDataFilter;
      } else {
        return false;
      }
    }
  }, {
    key: "GetConfigEncoded",
    value: function GetConfigEncoded() {
      return this.configEncoded;
    }
  }]);

  return PosdConfigManager;
}();

module.exports = PosdConfigManager;

/***/ }),

/***/ "./src/background/ContentStorage.js":
/*!******************************************!*\
  !*** ./src/background/ContentStorage.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdContentStorage = /*#__PURE__*/function () {
  function PosdContentStorage(id) {
    _classCallCheck(this, PosdContentStorage);

    this.id = id;
    this.init = false;
    this.CandidatesDataSkinAds = new Array();
    this.CandidatesDataBanners = new Array();
    this.CandidatesDataFacebook = new Array();
    this.CandidatesFacebookVideoData = new Array();
    this.CandidatesDataTwitter = new Array();
    this.CandidatesDataReddit = new Array();
    this.CandidatesTwitterVideoData = new Array();
    this.CandidatesRedditVideoData = new Array();
    this.CandidatesRedditRightColumnData = new Array();
    this.Html5CandidatePlacements = new Array();
    this.FacebookCandidatePlacements = new Array();
    this.TwitterCandidatePlacements = new Array();
    this.RedditCandidatePlacements = new Array();
    this.FacebookAboutSectionContent = new Array();
    this.ChainSegmentContent = new Array();
    this.InvalidChainCompletedContent = new Array();
    this.FramesWithInputs = new Array();
    this.FramesWithRedirects = new Array();
    this.VideoHars = new Array();
    this.maxAmountTwitterCandidates = 3;
    this.maxAmountTwitterVideoDatas = 40;
  }

  _createClass(PosdContentStorage, [{
    key: "GetMpKey",
    value: function GetMpKey(tabId) {
      return 'mp_' + tabId;
    }
  }, {
    key: "AddCandidatesDataSkinAds",
    value: function AddCandidatesDataSkinAds(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesDataSkinAds[mpKey]) {
        this.CandidatesDataSkinAds[mpKey] = new Array();
      }

      for (var i = 0; i < content.length; i++) {
        this.CandidatesDataSkinAds[mpKey].push(content[i]);
      }
    }
  }, {
    key: "AddCandidatesDataBanners",
    value: function AddCandidatesDataBanners(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesDataBanners[mpKey]) {
        this.CandidatesDataBanners[mpKey] = new Array();
      }

      for (var i = 0; i < content.length; i++) {
        this.CandidatesDataBanners[mpKey].push(content[i]);
      }
    }
  }, {
    key: "AddOneCandidateDataFacebook",
    value: function AddOneCandidateDataFacebook(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesDataFacebook[mpKey]) {
        this.CandidatesDataFacebook[mpKey] = new Array();
      }

      this.CandidatesDataFacebook[mpKey].push(content);
    }
  }, {
    key: "AddCandidatesFacebookVideoData",
    value: function AddCandidatesFacebookVideoData(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesFacebookVideoData[mpKey]) {
        this.CandidatesFacebookVideoData[mpKey] = new Array();
      }

      this.CandidatesFacebookVideoData[mpKey].push(content);
    }
  }, {
    key: "AddCandidatesTwitterVideoData",
    value: function AddCandidatesTwitterVideoData(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesTwitterVideoData[mpKey]) {
        this.CandidatesTwitterVideoData[mpKey] = new Array();
      }

      this.CandidatesTwitterVideoData[mpKey].push(content);
    }
  }, {
    key: "AddCandidatesRedditVideoData",
    value: function AddCandidatesRedditVideoData(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesRedditVideoData[mpKey]) {
        this.CandidatesRedditVideoData[mpKey] = new Array();
      }

      this.CandidatesRedditVideoData[mpKey].push(content);
    }
  }, {
    key: "AddCandidatesRedditRightColumnData",
    value: function AddCandidatesRedditRightColumnData(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesRedditRightColumnData[mpKey]) {
        this.CandidatesRedditRightColumnData[mpKey] = new Array();
      }

      this.CandidatesRedditRightColumnData[mpKey].push(content);
    }
  }, {
    key: "AddCandidatesDataFacebook",
    value: function AddCandidatesDataFacebook(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesDataFacebook[mpKey]) {
        this.CandidatesDataFacebook[mpKey] = new Array();
      }

      for (var i = 0; i < content.length; i++) {
        this.CandidatesDataFacebook[mpKey].push(content[i]);
      }
    }
  }, {
    key: "AddCandidatesDataTwitter",
    value: function AddCandidatesDataTwitter(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesDataTwitter[mpKey]) {
        this.CandidatesDataTwitter[mpKey] = new Array();
      }

      for (var i = 0; i < content.length; i++) {
        this.CandidatesDataTwitter[mpKey].push(content[i]);
      }
    }
  }, {
    key: "AddCandidatesDataReddit",
    value: function AddCandidatesDataReddit(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.CandidatesDataReddit[mpKey]) {
        this.CandidatesDataReddit[mpKey] = new Array();
      }

      for (var i = 0; i < content.length; i++) {
        this.CandidatesDataReddit[mpKey].push(content[i]);
      }
    }
  }, {
    key: "AddFacebookAboutSectionContent",
    value: function AddFacebookAboutSectionContent(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.FacebookAboutSectionContent[mpKey]) {
        this.FacebookAboutSectionContent[mpKey] = new Array();
      }

      for (var i = 0; i < content.length; i++) {
        this.FacebookAboutSectionContent[mpKey].push(content[i]);
      }
    }
  }, {
    key: "AddCandidatePlacementsFacebook",
    value: function AddCandidatePlacementsFacebook(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.FacebookCandidatePlacements[mpKey]) {
        this.FacebookCandidatePlacements[mpKey] = 0;
      }

      this.FacebookCandidatePlacements[mpKey] = this.FacebookCandidatePlacements[mpKey] + content;
    }
  }, {
    key: "AddCandidatePlacementsTwitter",
    value: function AddCandidatePlacementsTwitter(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.TwitterCandidatePlacements[mpKey]) {
        this.TwitterCandidatePlacements[mpKey] = 0;
      }

      this.TwitterCandidatePlacements[mpKey] = this.TwitterCandidatePlacements[mpKey] + content;
    }
  }, {
    key: "AddCandidatePlacementsReddit",
    value: function AddCandidatePlacementsReddit(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.RedditCandidatePlacements[mpKey]) {
        this.RedditCandidatePlacements[mpKey] = 0;
      }

      this.RedditCandidatePlacements[mpKey] = this.RedditCandidatePlacements[mpKey] + content;
    }
  }, {
    key: "AddCandidatePlacementsHtml5",
    value: function AddCandidatePlacementsHtml5(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.Html5CandidatePlacements[mpKey]) {
        this.Html5CandidatePlacements[mpKey] = 0;
      }

      this.Html5CandidatePlacements[mpKey] = this.Html5CandidatePlacements[mpKey] + content;
    }
  }, {
    key: "AddInvalidChainCompletedContent",
    value: function AddInvalidChainCompletedContent(tabId, content) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.InvalidChainCompletedContent[mpKey]) {
        this.InvalidChainCompletedContent[mpKey] = new Array();
      }

      this.InvalidChainCompletedContent[mpKey].push(content);
    }
  }, {
    key: "AddChainSegmentContent",
    value: function AddChainSegmentContent(tabId, content) {
      if (content && content.headerInfo) {
        var mpKey = this.GetMpKey(tabId);

        if (!this.ChainSegmentContent[mpKey]) {
          this.ChainSegmentContent[mpKey] = new Array();
        }

        this.ChainSegmentContent[mpKey].push(content);
      } else {}
    }
  }, {
    key: "AddFrameWithInputs",
    value: function AddFrameWithInputs(tabId, frameId) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.FramesWithInputs[mpKey]) {
        this.FramesWithInputs[mpKey] = new Array();
      }

      this.FramesWithInputs[mpKey].push(frameId);
    }
  }, {
    key: "AddFrameWithRedirects",
    value: function AddFrameWithRedirects(tabId, frameId) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.FramesWithRedirects[mpKey]) {
        this.FramesWithRedirects[mpKey] = new Array();
      }

      this.FramesWithRedirects[mpKey].push(frameId);
    }
  }, {
    key: "AddVideoHar",
    value: function AddVideoHar(tabId, xar) {
      var mpKey = this.GetMpKey(tabId);

      if (!this.VideoHars[mpKey]) {
        this.VideoHars[mpKey] = new Array();
      }

      this.VideoHars[mpKey].push(xar);
    }
  }, {
    key: "GetCandidatePlacementsHtml5",
    value: function GetCandidatePlacementsHtml5(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.Html5CandidatePlacements[mpKey]) {
        return this.Html5CandidatePlacements[mpKey];
      } else {
        return 0;
      }
    }
  }, {
    key: "GetCandidatePlacementsFacebook",
    value: function GetCandidatePlacementsFacebook(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.FacebookCandidatePlacements[mpKey]) {
        return this.FacebookCandidatePlacements[mpKey];
      } else {
        return 0;
      }
    }
  }, {
    key: "GetCandidatePlacementsTwitter",
    value: function GetCandidatePlacementsTwitter(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.TwitterCandidatePlacements[mpKey]) {
        if (this.TwitterCandidatePlacements[mpKey] > this.maxAmountTwitterCandidates) {
          return this.maxAmountTwitterCandidates;
        }

        return this.TwitterCandidatePlacements[mpKey];
      } else {
        return 0;
      }
    }
  }, {
    key: "GetCandidatePlacementsReddit",
    value: function GetCandidatePlacementsReddit(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.RedditCandidatePlacements[mpKey]) {
        return this.RedditCandidatePlacements[mpKey];
      } else {
        return 0;
      }
    }
  }, {
    key: "GetVideoHars",
    value: function GetVideoHars(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.VideoHars[mpKey]) {
        return this.VideoHars[mpKey];
      } else {
        return [];
      }
    }
  }, {
    key: "GetInvalidChainCompletedContent",
    value: function GetInvalidChainCompletedContent(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.InvalidChainCompletedContent[mpKey]) {
        return this.InvalidChainCompletedContent[mpKey];
      } else {
        return [];
      }
    }
  }, {
    key: "GetCandidatesDataBanners",
    value: function GetCandidatesDataBanners(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.CandidatesDataBanners[mpKey]) {
        return this.CandidatesDataBanners[mpKey];
      } else {
        return [];
      }
    }
  }, {
    key: "GetCandidatesDataFacebook",
    value: function GetCandidatesDataFacebook(tabId) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesDataFacebook[mpKey]) {
          result = this.CandidatesDataFacebook[mpKey];
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetCandidatesDataTwitter",
    value: function GetCandidatesDataTwitter(tabId, isForced) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesDataTwitter[mpKey]) {
          if (this.CandidatesDataTwitter[mpKey].length <= this.maxAmountTwitterCandidates || isForced) {
            result = this.CandidatesDataTwitter[mpKey];
          } else {
            result = this.CandidatesDataTwitter[mpKey].slice(0, this.maxAmountTwitterCandidates);
          }
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetCandidatesDataReddit",
    value: function GetCandidatesDataReddit(tabId) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesDataReddit[mpKey]) {
          result = this.CandidatesDataReddit[mpKey];
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetCandidatesFacebookVideoData",
    value: function GetCandidatesFacebookVideoData(tabId) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesFacebookVideoData[mpKey]) {
          result = this.CandidatesFacebookVideoData[mpKey];
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetCandidatesTwitterVideoData",
    value: function GetCandidatesTwitterVideoData(tabId) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesTwitterVideoData[mpKey]) {
          result = this.CandidatesTwitterVideoData[mpKey];
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetCandidatesRedditVideoData",
    value: function GetCandidatesRedditVideoData(tabId) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesRedditVideoData[mpKey]) {
          result = this.CandidatesRedditVideoData[mpKey];
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetCandidatesRedditRightColumnData",
    value: function GetCandidatesRedditRightColumnData(tabId) {
      var result = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesRedditRightColumnData[mpKey]) {
          result = this.CandidatesRedditRightColumnData[mpKey];
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetFacebookAboutSectionContent",
    value: function GetFacebookAboutSectionContent(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.FacebookAboutSectionContent[mpKey]) {
        return this.FacebookAboutSectionContent[mpKey];
      } else {
        return [];
      }
    }
  }, {
    key: "GetCandidatesDataSkinAds",
    value: function GetCandidatesDataSkinAds(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.CandidatesDataSkinAds[mpKey]) {
        return this.CandidatesDataSkinAds[mpKey];
      } else {
        return [];
      }
    }
  }, {
    key: "IsChainFramesHaveInputs",
    value: function IsChainFramesHaveInputs(tabId, chainFramesList) {
      var find = false;
      var mpKey = this.GetMpKey(tabId);

      if (this.FramesWithInputs[mpKey] && this.FramesWithInputs[mpKey].length && chainFramesList && chainFramesList.length) {
        for (var i = 0; i < chainFramesList.length && !find; i++) {
          if (this.FramesWithInputs[mpKey].includes(chainFramesList[i])) {
            find = true;
          }
        }
      }

      return find;
    }
  }, {
    key: "IsChainFramesHaveRedirects",
    value: function IsChainFramesHaveRedirects(tabId, chainFramesList) {
      var find = false;
      var mpKey = this.GetMpKey(tabId);

      if (this.FramesWithRedirects[mpKey] && this.FramesWithRedirects[mpKey].length && chainFramesList && chainFramesList.length) {
        for (var i = 0; i < chainFramesList.length && !find; i++) {
          if (this.FramesWithRedirects[mpKey].includes(chainFramesList[i])) {
            find = true;
          }
        }
      }

      return find;
    }
  }, {
    key: "GetChainBuildingInitInfo",
    value: function GetChainBuildingInitInfo(tabId) {
      var mpKey = this.GetMpKey(tabId);
      var chainBuildingInfo = [];
      var chainsAmount = 0;

      if (this.ChainSegmentContent && this.ChainSegmentContent[mpKey] && this.ChainSegmentContent[mpKey].length) {
        for (var i = 0; i < this.ChainSegmentContent[mpKey].length; i++) {
          var chainIdKey = "chainId_".concat(this.ChainSegmentContent[mpKey][i].headerInfo.chainId);

          if (_typeof(chainBuildingInfo[chainIdKey]) !== "object") {
            chainsAmount = chainsAmount + 1;
            chainBuildingInfo[chainIdKey] = {
              chainId: this.ChainSegmentContent[mpKey][i].headerInfo.chainId,
              validSegmentsAmount: 0,
              validSegmentsId: [],
              invalidSegmentsAmount: 0
            };
          }

          if (this.ChainSegmentContent[mpKey][i].isValid) {
            chainBuildingInfo[chainIdKey].validSegmentsAmount = chainBuildingInfo[chainIdKey].validSegmentsAmount + 1;
            chainBuildingInfo[chainIdKey].validSegmentsId.push(this.ChainSegmentContent[mpKey][i].browserFrameId);
          } else {
            chainBuildingInfo[chainIdKey].invalidSegmentsAmount = chainBuildingInfo[chainIdKey].invalidSegmentsAmount + 1;
          }
        }
      }

      return {
        buildingInit: chainBuildingInfo,
        chainsAmount: chainsAmount
      };
    }
  }, {
    key: "GetAllSegmentsForChain",
    value: function GetAllSegmentsForChain(tabId, chainId) {
      var segments = [];

      try {
        var mpKey = this.GetMpKey(tabId);

        for (var i = 0; i < this.ChainSegmentContent[mpKey].length; i++) {
          if (this.ChainSegmentContent[mpKey][i].headerInfo.chainId === chainId) {
            segments.push(this.ChainSegmentContent[mpKey][i]);
          }
        }
      } catch (e) {}

      return segments;
    }
  }, {
    key: "HaveDataForTab",
    value: function HaveDataForTab(tabId) {
      var mpKey = this.GetMpKey(tabId);

      if (this.CandidatesDataSkinAds[mpKey] && this.CandidatesDataSkinAds[mpKey].length || this.CandidatesDataBanners[mpKey] && this.CandidatesDataBanners[mpKey].length || this.CandidatesDataFacebook[mpKey] && this.CandidatesDataFacebook[mpKey].length || this.CandidatesDataTwitter[mpKey] && this.CandidatesDataTwitter[mpKey].length || this.CandidatesDataReddit[mpKey] && this.CandidatesDataReddit[mpKey].length || this.VideoHars[mpKey] && this.VideoHars[mpKey].length || this.InvalidChainCompletedContent[mpKey] && this.InvalidChainCompletedContent[mpKey].length || this.ChainSegmentContent[mpKey] && this.ChainSegmentContent[mpKey].length || this.Html5CandidatePlacements[mpKey] && this.Html5CandidatePlacements[mpKey] > 0 || this.FacebookCandidatePlacements[mpKey] && this.FacebookCandidatePlacements[mpKey] > 0 || this.TwitterCandidatePlacements[mpKey] && this.TwitterCandidatePlacements[mpKey] > 0 || this.RedditCandidatePlacements[mpKey] && this.RedditCandidatePlacements[mpKey] > 0 || this.CandidatesFacebookVideoData[mpKey] && this.CandidatesFacebookVideoData[mpKey].length || this.CandidatesTwitterVideoData[mpKey] && this.CandidatesTwitterVideoData[mpKey].length) {
        return true;
      }

      return false;
    }
  }, {
    key: "RemoveOldFacebookVideoData",
    value: function RemoveOldFacebookVideoData(tabId, foundVideoDataIds) {
      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesFacebookVideoData[mpKey] && this.CandidatesFacebookVideoData[mpKey].length) {
          var currentTime = Date.now() / 1000 | 0;
          var actualVideoData = [];

          for (var i = 0; i < this.CandidatesFacebookVideoData[mpKey].length; i++) {
            if (foundVideoDataIds.includes(this.CandidatesFacebookVideoData[mpKey][i].videoId)) {} else if (currentTime - this.CandidatesFacebookVideoData[mpKey][i].detectionTime >= 300) {} else {
              actualVideoData.push(this.CandidatesFacebookVideoData[mpKey][i]);
            }
          }

          this.CandidatesFacebookVideoData[mpKey] = actualVideoData;
        } else {}
      } catch (e) {}
    }
  }, {
    key: "RemoveOldTwitterVideoData",
    value: function RemoveOldTwitterVideoData(tabId, foundVideoDataIds) {
      try {
        var mpKey = this.GetMpKey(tabId);

        if (this.CandidatesTwitterVideoData[mpKey] && this.CandidatesTwitterVideoData[mpKey].length) {
          var currentTime = Date.now() / 1000 | 0;
          var actualVideoData = [];

          for (var i = 0; i < this.CandidatesTwitterVideoData[mpKey].length; i++) {
            if (foundVideoDataIds.includes(this.CandidatesTwitterVideoData[mpKey][i].tweets.id)) {} else if (currentTime - this.CandidatesTwitterVideoData[mpKey][i].detectionTime >= 300) {} else {
              actualVideoData.push(this.CandidatesTwitterVideoData[mpKey][i]);
            }
          }

          this.CandidatesTwitterVideoData[mpKey] = actualVideoData;
        } else {}
      } catch (e) {}
    }
  }, {
    key: "RemoveIframeContentFromTabId",
    value: function RemoveIframeContentFromTabId(tabId, isForced) {
      var mpKey = this.GetMpKey(tabId);

      if (this.CandidatesDataSkinAds[mpKey]) {
        this.CandidatesDataSkinAds[mpKey] = null;
      }

      if (this.CandidatesDataBanners[mpKey]) {
        this.CandidatesDataBanners[mpKey] = null;
      }

      if (this.CandidatesDataFacebook[mpKey]) {
        this.CandidatesDataFacebook[mpKey] = null;
      }

      if (this.CandidatesDataTwitter[mpKey]) {
        if (this.CandidatesDataTwitter[mpKey].length > this.maxAmountTwitterCandidates && !isForced) {
          this.CandidatesDataTwitter[mpKey] = this.CandidatesDataTwitter[mpKey].slice(this.maxAmountTwitterCandidates, this.CandidatesDataTwitter[mpKey].length);
        } else {
          this.CandidatesDataTwitter[mpKey] = null;
        }
      }

      if (this.CandidatesDataReddit[mpKey]) {
        this.CandidatesDataReddit[mpKey] = null;
      }

      if (this.Html5CandidatePlacements[mpKey]) {
        this.Html5CandidatePlacements[mpKey] = 0;
      }

      if (this.FacebookCandidatePlacements[mpKey]) {
        this.FacebookCandidatePlacements[mpKey] = 0;
      }

      if (this.TwitterCandidatePlacements[mpKey]) {
        if (this.CandidatesDataTwitter[mpKey] && this.CandidatesDataTwitter[mpKey].length > this.maxAmountTwitterCandidates) {
          this.TwitterCandidatePlacements[mpKey] = this.TwitterCandidatePlacements[mpKey] - this.maxAmountTwitterCandidates;
        } else {
          this.TwitterCandidatePlacements[mpKey] = 0;
        }
      }

      if (this.RedditCandidatePlacements[mpKey]) {
        this.RedditCandidatePlacements[mpKey] = 0;
      }

      if (this.FacebookAboutSectionContent[mpKey]) {
        this.FacebookAboutSectionContent[mpKey] = null;
      }

      if (this.ChainSegmentContent[mpKey]) {
        this.ChainSegmentContent[mpKey] = null;
      }

      if (this.InvalidChainCompletedContent[mpKey]) {
        this.InvalidChainCompletedContent[mpKey] = null;
      }

      if (this.FramesWithInputs[mpKey]) {
        this.FramesWithInputs[mpKey] = null;
      }

      if (this.FramesWithRedirects[mpKey]) {
        this.FramesWithRedirects[mpKey] = null;
      }

      if (this.VideoHars[mpKey]) {
        this.VideoHars[mpKey] = null;
      }

      if (this.CandidatesFacebookVideoData[mpKey]) {
        if (isForced) {
          this.CandidatesFacebookVideoData[mpKey] = null;
        } else {
          this.RemoveOldFacebookVideoData(tabId, []);
        }
      }

      if (this.CandidatesTwitterVideoData[mpKey]) {
        if (isForced && this.CandidatesTwitterVideoData[mpKey].length > this.maxAmountTwitterVideoDatas) {
          this.CandidatesTwitterVideoData[mpKey] = null;
        } else {
          if (this.CandidatesTwitterVideoData[mpKey].length > this.maxAmountTwitterVideoDatas) {
            this.CandidatesTwitterVideoData[mpKey] = null;
          }
        }
      }
    }
  }, {
    key: "SetMaxAmountTwitterCandidates",
    value: function SetMaxAmountTwitterCandidates(config) {
      this.maxAmountTwitterCandidates = config.MAX_CANDIDATES_TO_SEND;
    }
  }, {
    key: "SetMaxAmountTwitterVideoDatas",
    value: function SetMaxAmountTwitterVideoDatas(config) {
      this.maxAmountTwitterVideoDatas = config.MAX_VIDEO_DATA_KEEP_IN_STORAGE;
    }
  }]);

  return PosdContentStorage;
}();

module.exports = PosdContentStorage;

/***/ }),

/***/ "./src/background/DataCollectionManager.js":
/*!*************************************************!*\
  !*** ./src/background/DataCollectionManager.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdDataCollectionManager = /*#__PURE__*/function () {
  function PosdDataCollectionManager() {
    _classCallCheck(this, PosdDataCollectionManager);

    if (!this._has('posdDataCollection')) {
      PosdConfig.CONFIG_DATA_COLLECTION_ENABLED ? this.Enable() : this.Disable();
    }
  }

  _createClass(PosdDataCollectionManager, [{
    key: "Enable",
    value: function Enable() {
      localStorage.setItem('posdDataCollection', 'on');
      return true;
    }
  }, {
    key: "Disable",
    value: function Disable() {
      localStorage.setItem('posdDataCollection', 'off');
      return false;
    }
  }, {
    key: "IsEnabled",
    value: function IsEnabled() {
      return this._get('posdDataCollection') === 'on';
    }
  }, {
    key: "IsDisabled",
    value: function IsDisabled() {
      return this._get('posdDataCollection') === 'off';
    }
  }, {
    key: "_has",
    value: function _has(key) {
      return !!localStorage.getItem(key);
    }
  }, {
    key: "_get",
    value: function _get(key) {
      return localStorage.getItem(key);
    }
  }]);

  return PosdDataCollectionManager;
}();

module.exports = PosdDataCollectionManager;

/***/ }),

/***/ "./src/background/DataSharingManager.js":
/*!**********************************************!*\
  !*** ./src/background/DataSharingManager.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdDataSharingManager = /*#__PURE__*/function () {
  function PosdDataSharingManager() {
    _classCallCheck(this, PosdDataSharingManager);

    if (!this._has('posdDataSharing')) {
      PosdConfig.CONFIG_DATA_SHARING ? this.Enable() : this.Disable();
    }
  }

  _createClass(PosdDataSharingManager, [{
    key: "Enable",
    value: function Enable() {
      localStorage.setItem('posdDataSharing', 'on');
      return true;
    }
  }, {
    key: "Disable",
    value: function Disable() {
      localStorage.setItem('posdDataSharing', 'off');
      return false;
    }
  }, {
    key: "IsEnabled",
    value: function IsEnabled() {
      return this._get('posdDataSharing') === 'on';
    }
  }, {
    key: "IsDisabled",
    value: function IsDisabled() {
      return this._get('posdDataSharing') === 'off';
    }
  }, {
    key: "_has",
    value: function _has(key) {
      return !!localStorage.getItem(key);
    }
  }, {
    key: "_get",
    value: function _get(key) {
      return localStorage.getItem(key);
    }
  }], [{
    key: "dataSharingStatus",
    get: function get() {
      if (!localStorage.getItem('posdDataSharing')) {
        return 'off';
      }

      return localStorage.getItem('posdDataSharing');
    }
  }]);

  return PosdDataSharingManager;
}();

module.exports = PosdDataSharingManager;

/***/ }),

/***/ "./src/background/DomainExcludeManager.js":
/*!************************************************!*\
  !*** ./src/background/DomainExcludeManager.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdStorageList = __webpack_require__(/*! ./StorageList.js */ "./src/background/StorageList.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdDomainExcludeManager = /*#__PURE__*/function (_PosdStorageList) {
  _inherits(PosdDomainExcludeManager, _PosdStorageList);

  function PosdDomainExcludeManager() {
    _classCallCheck(this, PosdDomainExcludeManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(PosdDomainExcludeManager).call(this, PosdConst.EXCLUDE_DOMAINS_LIST()));
  }

  _createClass(PosdDomainExcludeManager, [{
    key: "AddItem",
    value: function AddItem(item) {
      var regex = /^https?:\/\/(?=.{1,254}(?::|$))(?:(?!\d|-)(?![a-z0-9\-]{1,62}-(?:\.|:|$))[a-z0-9\-]{1,63}\b(?!\.$)\.?)+(:\d+)?$/i;
      /*
          /^                            // beginning
          https?:\/\/                   // starts with http:// or https://
          (?=.{1,254}(?::|$))           // the hostname chars must be within 1-254 bytes
          // match one or more parts of a hostname (<part>.<part>)
          (?:(?!\d|-)                   // cannot start with a digit or dash
            (?![a-z0-9\-]{1,62}-        // part cannot end with a dash
              (?:\.|:|$))               // (end of part will be '.', ':', or end of str)
            [a-z0-9\-]{1,63}\b          // part will be 1-63 letters, numbers, or dashes
              (?!\.$)                   // last part cannot end with a '.'
              \.?                       // part followed by '.' unless the last one
          )+                            // one or more hostname parts
          (:\d+)?                       // optional port
          $/i;    // end; case-insensitive
       */

      if (!regex.test(item)) {
        throw new Error('Domain is not valid');
      }

      return _get(_getPrototypeOf(PosdDomainExcludeManager.prototype), "AddItem", this).call(this, item);
    }
  }]);

  return PosdDomainExcludeManager;
}(PosdStorageList);

module.exports = PosdDomainExcludeManager;

/***/ }),

/***/ "./src/background/IframesChain.js":
/*!****************************************!*\
  !*** ./src/background/IframesChain.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdIframesChain = /*#__PURE__*/function () {
  function PosdIframesChain(id, tabId, chainInfo, ContentStorage, startBuildingTimeout, maxBuildingTimeout, onChainBuiltCallback) {
    _classCallCheck(this, PosdIframesChain);

    this.id = id;
    this.tabId = tabId;
    this.chainInfo = chainInfo;
    this.fullIdStr = "tabId:".concat(tabId, "-chainId:").concat(chainInfo.chainId);
    this.init = false;
    this.ContentStorage = ContentStorage;
    this.onChainBuilt = onChainBuiltCallback;
    this.html5Candidate = {};
    this.targetUrls = [];
    this.buildingTimeoutId = null;
    this.status = PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_NONE;
    this.extractionStatus = PosdIframesChain.GetEmptyExtractionStatus();

    if (this.chainInfo && this.ContentStorage) {
      this.init = true;
      this.status = PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_INITED;
      setTimeout(this.ActivateBuilding.bind(this), startBuildingTimeout);
      this.buildingTimeoutId = setTimeout(this.FinishBuilding.bind(this), maxBuildingTimeout);
    }
  }

  _createClass(PosdIframesChain, [{
    key: "ActivateBuilding",
    value: function ActivateBuilding() {
      if (this.init) {
        this.BuildChain();
      } else {}
    }
  }, {
    key: "BuildChain",
    value: function BuildChain() {
      this.status = PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_STARTED;
      this.html5Candidate = {
        chainId: this.chainInfo.chainId,
        topFrameHeader: '',
        frames: [],
        targetUrl: []
      };
      var segments = this.ContentStorage.GetAllSegmentsForChain(this.tabId, this.chainInfo.chainId);

      if (segments.length) {
        for (var i = 0; i < segments.length; i++) {
          if (segments[i].headerInfo.depth === 0 && segments[i].headerInfo.topHeaderContent) {
            this.html5Candidate.topFrameHeader = segments[i].headerInfo.topHeaderContent;
          }

          this.html5Candidate.frames.push({
            contentFinal: segments[i].contentFinal,
            depth: segments[i].headerInfo.depth,
            bisId: segments[i].headerInfo.bisId,
            childsBisId: [],
            parentBisId: "",
            id: segments[i].headerInfo.frameId,
            src: segments[i].headerInfo.src,
            size: segments[i].headerInfo.size
          });
          this.targetUrls = this.targetUrls.concat(segments[i].targetUrl);

          if (segments[i].browserFrameId && Number.isInteger(segments[i].browserFrameId) && !this.chainInfo.chainFramesList.includes(segments[i].browserFrameId)) {
            this.chainInfo.chainFramesList.push(segments[i].browserFrameId);
          }
        }
      }

      if (!this.ContentStorage.IsChainFramesHaveInputs(this.tabId, this.chainInfo.chainFramesList)) {
        if (this.targetUrls.length) {
          this.extractionStatus.targetUrlExtracted = true;
        }

        if (segments.length >= this.chainInfo.chainFramesList.length) {
          this.extractionStatus.fullContentExtracted = true;
        }

        if (this.extractionStatus.targetUrlExtracted) {
          this.FinishBuilding(false);
        } else {
          var finished = true;

          if (PosdConfig.CONFIG_TARGET_URL_BY_CLICK_AVAILABLE && this.html5Candidate.frames.length && this.chainInfo.chainFramesList.length) {
            if (!this.ContentStorage.IsChainFramesHaveRedirects(this.tabId, this.chainInfo.chainFramesList)) {
              finished = false;
              this.ActivateTargetUrlByClickDetection();
            } else {}
          } else {}

          if (finished) {
            this.FinishBuilding(false);
          }
        }
      } else {
        this.extractionStatus.filteredOut = true;
        this.FinishBuilding(false);
      }
    }
  }, {
    key: "ActivateTargetUrlByClickDetection",
    value: function ActivateTargetUrlByClickDetection() {
      this.status = PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_STARTED;
      var sendTo = [];

      for (var i = 0; i < this.html5Candidate.frames.length; i++) {
        sendTo.push(this.html5Candidate.frames[i].bisId);
      }

      var mes = PosdMessage.EmptyMessage;
      mes.type = PosdConst.MESSAGE_TYPE_TARGET_URL_DETECTION_BY_CLICK;
      mes.multiTo = sendTo;
      mes.content = {
        chainId: this.html5Candidate.chainId
      };
      chrome.tabs.sendMessage(this.tabId, mes);
    }
  }, {
    key: "AddDetectedTargetUrlByClick",
    value: function AddDetectedTargetUrlByClick(frameId, targetUrlInfo) {
      if (this.status === PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_STARTED) {
        if (targetUrlInfo && targetUrlInfo.length) {
          this.targetUrls = this.targetUrls.concat(targetUrlInfo);
          this.status = PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_FINISHED;
          this.FinishBuilding(false);
        }
      }
    }
  }, {
    key: "FinishBuilding",
    value: function FinishBuilding(isTerminated) {
      if (this.status !== PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_FINISHED) {
        this.status = PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_FINISHED;

        if (this.buildingTimeoutId) {
          clearTimeout(this.buildingTimeoutId);
          this.buildingTimeoutId = null;
        }

        this.html5Candidate.targetUrl = PosdIframesChain.GetSortedTargetUrls(this.targetUrls);

        if (this.html5Candidate.targetUrl.length) {
          this.extractionStatus.targetUrlExtracted = true;
        }

        if (!isTerminated && this.onChainBuilt) {
          this.onChainBuilt(this.chainInfo.chainId);
        }
      }
    }
  }, {
    key: "TerminateBuilding",
    value: function TerminateBuilding() {
      if (this.status !== PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_FINISHED) {
        this.FinishBuilding(true);
      }
    }
  }, {
    key: "GetExtractionStatus",
    value: function GetExtractionStatus() {
      return {
        chainId: this.chainInfo.chainId,
        extractionStatus: this.extractionStatus
      };
    }
  }, {
    key: "GetChainId",
    value: function GetChainId() {
      return this.chainInfo.chainId;
    }
  }, {
    key: "GetStatus",
    value: function GetStatus() {
      return this.status;
    }
  }, {
    key: "GetHTML5Candidate",
    value: function GetHTML5Candidate() {
      return this.html5Candidate;
    }
  }, {
    key: "ClearChain",
    value: function ClearChain() {
      this.initInfo = null;
      this.html5Candidate = null;
    }
  }], [{
    key: "GetEmptyExtractionStatus",
    value: function GetEmptyExtractionStatus() {
      return {
        filteredOut: false,
        fullContentExtracted: false,
        targetUrlExtracted: false,
        sentToBackend: false
      };
    }
  }, {
    key: "GetSortedTargetUrls",
    value: function GetSortedTargetUrls(targetUrl) {
      var result = [];

      try {
        if (targetUrl && targetUrl.length) {
          targetUrl.sort(function (a, b) {
            return b.square - a.square;
          });

          for (var j = 0; j < targetUrl.length; j++) {
            if (!result.includes(targetUrl[j].href)) {
              result.push(targetUrl[j].href);
            }
          }
        }
      } catch (e) {}

      return result;
    }
  }, {
    key: "GetHtml5CandidateFromComletedInvalidChain",
    value: function GetHtml5CandidateFromComletedInvalidChain(invalidChainCompleted) {
      var html5Candidate = {
        chainId: invalidChainCompleted.headerInfo.chainId,
        topFrameHeader: invalidChainCompleted.headerInfo.topHeaderContent,
        frames: [{
          contentFinal: invalidChainCompleted.contentFinal,
          depth: invalidChainCompleted.headerInfo.depth,
          bisId: invalidChainCompleted.headerInfo.bisId,
          childsBisId: [],
          parentBisId: "",
          id: invalidChainCompleted.headerInfo.frameId,
          src: invalidChainCompleted.headerInfo.src,
          size: invalidChainCompleted.headerInfo.size
        }],
        targetUrl: PosdIframesChain.GetSortedTargetUrls(invalidChainCompleted.targetUrl)
      };
      return html5Candidate;
    }
  }]);

  return PosdIframesChain;
}();

module.exports = PosdIframesChain;

/***/ }),

/***/ "./src/background/PageExcludeManager.js":
/*!**********************************************!*\
  !*** ./src/background/PageExcludeManager.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PosdStorageList = __webpack_require__(/*! ./StorageList */ "./src/background/StorageList.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdPageExcludeManager = /*#__PURE__*/function (_PosdStorageList) {
  _inherits(PosdPageExcludeManager, _PosdStorageList);

  function PosdPageExcludeManager() {
    _classCallCheck(this, PosdPageExcludeManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(PosdPageExcludeManager).call(this, PosdConst.EXCLUDE_PAGES_LIST()));
  }

  _createClass(PosdPageExcludeManager, [{
    key: "AddItem",
    value: function AddItem(item) {
      var regExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

      if (!regExp.test(item)) {
        throw new Error("Url is not valid");
      }

      return _get(_getPrototypeOf(PosdPageExcludeManager.prototype), "AddItem", this).call(this, item);
    }
  }]);

  return PosdPageExcludeManager;
}(PosdStorageList);

module.exports = PosdPageExcludeManager;

/***/ }),

/***/ "./src/background/PanalyticsId.js":
/*!****************************************!*\
  !*** ./src/background/PanalyticsId.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdPanalyticsUtility = __webpack_require__(/*! ../libs/panalytics-utility */ "./src/libs/panalytics-utility.js");

var PosdPanalyticsId = /*#__PURE__*/function () {
  function PosdPanalyticsId(id) {
    _classCallCheck(this, PosdPanalyticsId);

    this.id = id;
    this.panalyticsId = '';
    this.onGotId = null;
    this.PanalyticsUtility = new PosdPanalyticsUtility({
      host: PosdConfig.CONFIG_UTILITY_HOST,
      logging: true
    });
  }

  _createClass(PosdPanalyticsId, [{
    key: "GetId",
    value: function GetId(onGotIdCallback) {
      var _this = this;

      this.onGotId = onGotIdCallback;
      this.PanalyticsUtility.getKey(function (panalyticsId) {
        if (panalyticsId.length) {
          _this.panalyticsId = panalyticsId;

          if (_this.onGotId) {
            _this.onGotId(_this.panalyticsId);
          }
        }
      }, true);
    }
  }, {
    key: "ID",
    get: function get() {
      return this.panalyticsId;
    }
  }]);

  return PosdPanalyticsId;
}();

module.exports = PosdPanalyticsId;

/***/ }),

/***/ "./src/background/StorageList.js":
/*!***************************************!*\
  !*** ./src/background/StorageList.js ***!
  \***************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdStorageList = /*#__PURE__*/function () {
  function PosdStorageList(key) {
    _classCallCheck(this, PosdStorageList);

    this._key = key;
  }

  _createClass(PosdStorageList, [{
    key: "GetList",
    value: function GetList() {
      if (this.HasList()) {
        var json = localStorage.getItem(this._key);
        return JSON.parse(json);
      }

      return [];
    }
  }, {
    key: "RemoveList",
    value: function RemoveList() {
      localStorage.removeItem(this._key);
    }
  }, {
    key: "HasList",
    value: function HasList() {
      return !!localStorage.getItem(this._key);
    }
  }, {
    key: "SetItems",
    value: function SetItems(items) {
      localStorage.setItem(this._key, JSON.stringify(items));
    }
  }, {
    key: "AddItem",
    value: function AddItem(item) {
      if (item.trim() === '') {
        throw new Error("Item's name is empty");
      }

      var items = this.GetList();

      if (items.indexOf(item) !== -1) {
        throw new Error("Item \"".concat(item, "\" is already exist"));
      }

      items.push(item);
      this.SetItems(items);
    }
  }, {
    key: "RemoveItem",
    value: function RemoveItem(item) {
      var items = this.GetList();
      var index = items.indexOf(item);

      if (index === -1) {
        return;
      }

      items.splice(index, 1);
      this.SetItems(items);
    }
  }, {
    key: "HasItem",
    value: function HasItem(item) {
      var list = this.GetList();
      return list.indexOf(item) !== -1;
    }
  }]);

  return PosdStorageList;
}();

module.exports = PosdStorageList;

/***/ }),

/***/ "./src/background/TabsManager.js":
/*!***************************************!*\
  !*** ./src/background/TabsManager.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdTabsManager = /*#__PURE__*/function () {
  function PosdTabsManager(id) {
    var _this = this;

    _classCallCheck(this, PosdTabsManager);

    this.id = id;
    this.initedTabs = [];
    this.onActivatedHandlers = [];
    this.onRemovedHandlers = [];
    this.onUpdatedHandlers = [];
    this.onUpdated(this.PageUrlChangeWatcher.bind(this));
    chrome.tabs.onActivated.addListener(function (activeInfo) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.onActivatedHandlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var handler = _step.value;
          handler(activeInfo);
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
    });
    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this.onRemovedHandlers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var handler = _step2.value;
          handler(tabId, removeInfo);
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
    });
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _this.onUpdatedHandlers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var handler = _step3.value;
          handler(tabId, changeInfo, tab);
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
    });
  }

  _createClass(PosdTabsManager, [{
    key: "onActivated",
    value: function onActivated(callback) {
      this.onActivatedHandlers.push(callback);
    }
  }, {
    key: "onRemoved",
    value: function onRemoved(callback) {
      this.onRemovedHandlers.push(callback);
    }
  }, {
    key: "onUpdated",
    value: function onUpdated(callback) {
      this.onUpdatedHandlers.push(callback);
    }
  }, {
    key: "SetInitedTab",
    value: function SetInitedTab(tabId, tabInit) {
      tabInit.tabId = tabId;
      this.initedTabs[PosdCommon.GetTabIdKey(tabId)] = tabInit;
    }
  }, {
    key: "PageUrlChangeWatcher",
    value: function PageUrlChangeWatcher(tabId, changeInfo, tab) {
      if (changeInfo && changeInfo.url) {
        var tabKey = PosdCommon.GetTabIdKey(tabId);

        if (typeof this.initedTabs[tabKey] !== "undefined") {
          if (this.initedTabs[tabKey].url && this.initedTabs[tabKey].url !== changeInfo.url) {
            var mes = PosdMessage.EmptyMessage;
            mes.type = PosdConst.MESSAGE_TYPE_TAB_URL_CHANGED;
            mes.to = PosdCommon.GetMainPageId(tabId);
            mes.content = {
              newUrl: changeInfo.url,
              initedTicketId: this.initedTabs[tabKey].ticketId
            };
            chrome.tabs.sendMessage(tabId, mes);
          }
        }
      }
    }
  }, {
    key: "GetAllTabs",
    value: function GetAllTabs(callback) {
      chrome.tabs.query({
        currentWindow: true
      }, function (tabs) {
        if (callback) {
          callback(tabs);
        }
      });
    }
  }]);

  return PosdTabsManager;
}();

module.exports = PosdTabsManager;

/***/ }),

/***/ "./src/background/Ticket.js":
/*!**********************************!*\
  !*** ./src/background/Ticket.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdBase64 = __webpack_require__(/*! ../libs/base64 */ "./src/libs/base64.js");

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdMessage = __webpack_require__(/*! ../libs/Message */ "./src/libs/Message.js");

var PosdIframesChain = __webpack_require__(/*! ./IframesChain */ "./src/background/IframesChain.js");

var PosdWebNavigationIframes = __webpack_require__(/*! ./WebNavigationIframes */ "./src/background/WebNavigationIframes.js");

var PosdDataSharingManager = __webpack_require__(/*! ./DataSharingManager */ "./src/background/DataSharingManager.js");

var PosdTicket = /*#__PURE__*/function () {
  function PosdTicket(panalyticsId, tabId, outTicket, lastTicketDataSendTimestamp, ContentStorage, ConfigManager) {
    _classCallCheck(this, PosdTicket);

    this.panalyticsId = panalyticsId;
    this.tabId = tabId;
    this.lastTicketDataSendTimestamp = lastTicketDataSendTimestamp;
    this.ConfigManager = ConfigManager;
    this.ContentStorage = ContentStorage;
    this.rawTicket = JSON.parse(outTicket);
    this.html5AdsPrebuildInfo = [];
    this.webNavigationIframes = [];
    this.webNavigationChainsList = [];
    this.fullIframesList = [];
    this.onTicketBuiltCallback = null;
    this.timeoutMaxBuilding = null;
    this.timeoutDeepTargetUrlDetection = null;
    this.status = PosdConst.TICKET_BUILDING_STATUS_INIT;
    this.chainBuildingInitInfo = [];
    this.chains = [];
    this.successfullyBuidChainIds = [];
    this.chainsWithoutTargetUrl = [];
    this.finalOutTicket = {
      ticketId: '',
      data: ''
    };
    this.GetHtml5AdsPrebuildInfo();
    this.textStorage = [];
    this.isFacebookTicketReady = false;
    this.isTwitterTicketReady = false;
    this.isRedditTicketReady = false;
    this.ContentStorage.SetMaxAmountTwitterVideoDatas(this.ConfigManager.GetTwitterConfig());
    this.ContentStorage.SetMaxAmountTwitterCandidates(this.ConfigManager.GetTwitterConfig());
  }

  _createClass(PosdTicket, [{
    key: "GetHtml5AdsPrebuildInfo",
    value: function GetHtml5AdsPrebuildInfo() {
      if (this.rawTicket && this.rawTicket.adCandidatesHtml5 && this.rawTicket.adCandidatesHtml5.length) {
        for (var i = 0; i < this.rawTicket.adCandidatesHtml5.length; i++) {
          this.html5AdsPrebuildInfo.push(this.rawTicket.adCandidatesHtml5[i]);
        }

        this.rawTicket.adCandidatesHtml5 = [];
      }
    }
  }, {
    key: "IsValid",
    value: function IsValid() {
      var valid = false;

      try {
        if (this.rawTicket && this.rawTicket.ticketId && this.rawTicket.ticketId.length && this.rawTicket.url && this.rawTicket.url.length) {
          valid = true;
        }
      } catch (e) {}

      return valid;
    }
  }, {
    key: "ActivateBuilding",
    value: function ActivateBuilding(onTicketBuiltCallback) {
      this.onTicketBuiltCallback = onTicketBuiltCallback;
      this.finalOutTicket.ticketId = this.rawTicket.ticketId;

      if (this.ActivateHTML5CandidatesBuilding()) {
        this.status = PosdConst.TICKET_BUILDING_STATUS_STARTED;
        this.timeoutMaxBuilding = setTimeout(this.onMaxBuildingTimeout.bind(this), 7000);
      } else {
        this.GetWebNavigationIframes(this.TicketBuildingFinished.bind(this, false));
      }
    }
  }, {
    key: "ActivateHTML5CandidatesBuilding",
    value: function ActivateHTML5CandidatesBuilding() {
      var chainBuildingInitInfo = this.ContentStorage.GetChainBuildingInitInfo(this.tabId);
      this.chainBuildingInitInfo = chainBuildingInitInfo.buildingInit;

      if (chainBuildingInitInfo.chainsAmount) {
        this.GetWebNavigationIframes(this.AcivateIframeChainsBuilding.bind(this));
        return true;
      }

      return false;
    }
  }, {
    key: "GetWebNavigationIframes",
    value: function GetWebNavigationIframes(onGetWebNavigationIframesCallback) {
      var _this = this;

      this.status = PosdConst.TICKET_BUILDING_STATUS_GETTING_WEBNAVIGATION_IFRAMES;
      chrome.webNavigation.getAllFrames({
        tabId: this.tabId
      }, function (frames) {
        if (frames) {
          _this.webNavigationIframes = frames;
          _this.webNavigationChainsList = PosdWebNavigationIframes.GetWebNavigationChainsList(_this.webNavigationIframes);
          _this.status = PosdConst.TICKET_BUILDING_STATUS_GOT_WEBNAVIGATION_IFRAMES;
        }

        if (onGetWebNavigationIframesCallback) {
          onGetWebNavigationIframesCallback();
        }
      });
    }
  }, {
    key: "AcivateIframeChainsBuilding",
    value: function AcivateIframeChainsBuilding() {
      this.successfullyBuidChainIds = [];

      for (var i in this.chainBuildingInitInfo) {
        var initInfo = this.chainBuildingInitInfo[i];
        initInfo.chainFramesList = this.FindChainFramesListForSegment(initInfo.validSegmentsId);
        this.chains.push(new PosdIframesChain(this.id, this.tabId, initInfo, this.ContentStorage, this.GetChainStartBuildingTimeout(this.chainBuildingInitInfo[i].chainId), 6000, this.onIframeChainBuilt.bind(this)));
      }
    }
  }, {
    key: "GetChainStartBuildingTimeout",
    value: function GetChainStartBuildingTimeout(chainId) {
      var timeout = PosdCommon.GetRandomIntInRange(500, 1000);
      var find = false;

      if (this.html5AdsPrebuildInfo) {
        for (var i = 0; i < this.html5AdsPrebuildInfo.length && !find; i++) {
          if (this.html5AdsPrebuildInfo[i].chainId === chainId) {
            if (this.html5AdsPrebuildInfo[i].timeAfterProcessingStart < 3000) {
              timeout = 3000 - this.html5AdsPrebuildInfo[i].timeAfterProcessingStart;
            }

            find = true;
          }
        }
      }

      return timeout;
    }
  }, {
    key: "onIframeChainBuilt",
    value: function onIframeChainBuilt(chainId) {
      if (!this.successfullyBuidChainIds.includes(chainId)) {
        this.successfullyBuidChainIds.push(chainId);

        if (this.successfullyBuidChainIds.length === this.chains.length) {
          this.TicketBuildingFinished(false);
        }
      }
    }
  }, {
    key: "FindChainFramesListForSegment",
    value: function FindChainFramesListForSegment(validSegmentsId) {
      var chainFramesList = [];

      if (validSegmentsId && validSegmentsId.length && this.webNavigationChainsList && this.webNavigationChainsList.length) {
        var find = false;

        for (var i = 0; i < this.webNavigationChainsList.length && !find; i++) {
          if (this.webNavigationChainsList[i].includes(validSegmentsId[0])) {
            chainFramesList = this.webNavigationChainsList[i];
            find = true;
          }
        }
      }

      if (validSegmentsId && chainFramesList.length === 0 && validSegmentsId.length > 0) {
        chainFramesList = validSegmentsId;
      }

      return chainFramesList;
    }
  }, {
    key: "GetVideoHars",
    value: function GetVideoHars(isYouTube) {
      var mediaTypeHTMLIndex = -1;
      var hasAliasNextPage = false;
      var videoHars = this.ContentStorage.GetVideoHars(this.tabId);

      if (videoHars.length && this.webNavigationIframes && this.webNavigationIframes.length) {
        for (var i = 0; i < videoHars.length; i++) {
          if (videoHars[i].frameId) {
            videoHars[i].framesChain = PosdWebNavigationIframes.GetVideoHarFramesChainFullInfo(videoHars[i].frameId, this.webNavigationIframes);
          }

          if (isYouTube) {
            if (videoHars[i].mediaType && videoHars[i].mediaType === PosdConst.VIDEO_TRAFFIC_MEDIA_TYPE_HTML) {
              mediaTypeHTMLIndex = i;
            }

            if (videoHars[i].alias && videoHars[i].alias === PosdConst.VIDEO_TRAFFIC_ALIAS_YT_JSON_NEXTPAGE) {
              hasAliasNextPage = true;
            }
          }
        }

        if (isYouTube && hasAliasNextPage && mediaTypeHTMLIndex !== -1) {
          videoHars.splice(mediaTypeHTMLIndex, 1);
        }
      }

      return videoHars;
    }
  }, {
    key: "onGotTicketClickTargetUrl",
    value: function onGotTicketClickTargetUrl(frameId, chainId, targetUrlInfo) {
      if (this.chains && this.chains.length) {
        var find = false;

        for (var i = 0; i < this.chains.length && !find; i++) {
          if (this.chains[i].GetChainId() === chainId) {
            find = true;
            this.chains[i].AddDetectedTargetUrlByClick(frameId, targetUrlInfo);
          }
        }
      }
    }
  }, {
    key: "onMaxBuildingTimeout",
    value: function onMaxBuildingTimeout() {
      if (this.chains.length) {
        for (var i = 0; i < this.chains.length; i++) {
          this.chains[i].TerminateBuilding();
        }
      }

      this.TicketBuildingFinished(false);
    }
  }, {
    key: "GetVideoDataForTwitterVideoAd",
    value: function GetVideoDataForTwitterVideoAd(twCandidatesVideoData, adContent) {
      var _this2 = this;

      var twVideoData = {};

      try {
        (function () {
          var minWordsAmount = _this2.ConfigManager.GetTwitterConfig().MIN_AMOUNT_OF_WORDS_FOR_MATCHING;

          var minMatchingWordLength = _this2.ConfigManager.GetTwitterConfig().MIN_MATCHING_WORD_LENGTH;

          if (twCandidatesVideoData && twCandidatesVideoData.length && adContent && adContent.length) {
            var find = false;

            for (var i = 0; i < twCandidatesVideoData.length && !find; i++) {
              var fullText = twCandidatesVideoData[i].tweets.full_text;

              if (!_this2.textStorage.includes(fullText)) {
                _this2.textStorage.push(fullText);
              }

              var matchWords = fullText.replace(/[\n\r]/g, ' ').split(/\s/).filter(function (word) {
                return word.length >= minMatchingWordLength && !word.startsWith('http') && !word.startsWith('#') && !word.startsWith('@') && !(/(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])/g.test(word) || /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])/g.test(word));
              });
              var valid = 0;
              var matched = 0;

              if (matchWords.length) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = matchWords[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var word = _step2.value;
                    valid++;

                    if (adContent.includes(word)) {
                      matched++;
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

                if (valid >= minWordsAmount && matched == valid) {
                  find = true;
                  twVideoData = twCandidatesVideoData[i];
                } else {}
              } else if (!matchWords.length && _this2.textStorage.includes(fullText)) {}
            }

            if (!find) {}
          }
        })();
      } catch (e) {}

      return twVideoData;
    }
  }, {
    key: "GetVideoDataForRedditVideoAd",
    value: function GetVideoDataForRedditVideoAd(candidates, adContent) {
      var updVideoData = {};

      try {
        if (candidates && candidates.length && adContent && adContent.length) {
          var isMatched = false;

          for (var i = 0; i < candidates.length && !isMatched; i++) {
            var candidate = candidates[i];

            if (adContent.includes(candidate.videoId)) {
              isMatched = true;
              updVideoData = candidate;
            }
          }
        }
      } catch (err) {}

      return updVideoData;
    }
  }, {
    key: "GetRightColumnDataForReddit",
    value: function GetRightColumnDataForReddit(candidates, adContent) {
      var targetUrl = '';

      try {
        if (adContent && adContent.length) {
          var isMatched = false;

          for (var i = 0; i < candidates.length && !isMatched; i++) {
            var candidate = candidates[i];

            if (candidate.length) {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = candidate[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var el = _step3.value;

                  if (adContent.includes(el.elementId)) {
                    isMatched = true;
                    targetUrl = el.targetUrl;
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
          }
        }
      } catch (err) {}

      return targetUrl;
    }
  }, {
    key: "TicketBuildingFinished",
    value: function () {
      var _TicketBuildingFinished = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isForced) {
        var payload, chainsExtractionStatuses, invalidChainsCompleted, i, candidate, status, _i, buildStatus, _status, isYouTube, loadManagementSettings, _i2, mes;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = false;
                this.rawTicket.sharingEnabled = PosdDataSharingManager.dataSharingStatus === 'on';

                if (this.rawTicket[PosdConst.TICKET_ALIAS_PANALYTICSID].length === 0) {
                  this.rawTicket[PosdConst.TICKET_ALIAS_PANALYTICSID] = this.panalyticsId;
                }

                _context.next = 5;
                return this.LookingForFacebookAds();

              case 5:
                this.LookingForTwitterAds(isForced);
                this.LookingForRedditAds();
                this.LookingForSkinAds();
                this.LookingForBannerAds();
                chainsExtractionStatuses = [];
                invalidChainsCompleted = this.ContentStorage ? this.ContentStorage.GetInvalidChainCompletedContent(this.tabId) : [];

                if (invalidChainsCompleted.length) {
                  for (i = 0; i < invalidChainsCompleted.length; i++) {
                    candidate = PosdIframesChain.GetHtml5CandidateFromComletedInvalidChain(invalidChainsCompleted[i]);
                    status = {
                      chainId: invalidChainsCompleted[i].headerInfo.chainId,
                      extractionStatus: PosdIframesChain.GetEmptyExtractionStatus()
                    };

                    if (candidate.frames.length) {
                      status.extractionStatus.fullContentExtracted = true;
                    }

                    if (candidate.targetUrl.length) {
                      status.extractionStatus.targetUrlExtracted = true;
                    }

                    if (status.extractionStatus.fullContentExtracted && status.extractionStatus.targetUrlExtracted) {
                      this.rawTicket.adCandidatesHtml5.push(candidate);
                      status.extractionStatus.sentToBackend = true;
                    }

                    chainsExtractionStatuses.push(status);
                  }
                }

                if (this.chains.length) {
                  for (_i = 0; _i < this.chains.length; _i++) {
                    buildStatus = this.chains[_i].GetStatus();

                    if (buildStatus === PosdConst.IFRAMES_CHAIN_BUILDING_STATUS_FINISHED) {
                      _status = this.chains[_i].GetExtractionStatus();

                      if (!_status.extractionStatus.filteredOut && _status.extractionStatus.targetUrlExtracted) {
                        this.rawTicket.adCandidatesHtml5.push(this.chains[_i].GetHTML5Candidate());
                        _status.extractionStatus.sentToBackend = true;
                      }

                      chainsExtractionStatuses.push(_status);
                    } else {}
                  }
                }

                isYouTube = PosdCommon.IsYouTubeUrl(this.rawTicket.url);
                this.rawTicket.videoTraffics = this.GetVideoHars(isYouTube);
                this.rawTicket.adCandidatePlacements.skinAd = this.rawTicket.adCandidatesSkinAd.length;
                this.rawTicket.adCandidatePlacements.banner = this.rawTicket.adCandidatesBanner.length;
                this.rawTicket.adCandidatePlacements.html5 = this.ContentStorage.GetCandidatePlacementsHtml5(this.tabId);
                this.rawTicket.adCandidatePlacements.facebook = this.ContentStorage.GetCandidatePlacementsFacebook(this.tabId);
                this.rawTicket.adCandidatePlacements.twitter = this.ContentStorage.GetCandidatePlacementsTwitter(this.tabId);
                this.rawTicket.adCandidatePlacements.reddit = this.ContentStorage.GetCandidatePlacementsReddit(this.tabId);
                loadManagementSettings = this.ConfigManager.GetLoadManagementSettings();

                if (loadManagementSettings) {
                  if (this.rawTicket.adCandidatesSkinAd.length && !loadManagementSettings.sendCandidatesSkinAd) {
                    this.rawTicket.adCandidatesSkinAd = [];
                  }

                  if (this.rawTicket.adCandidatesBanner.length && !loadManagementSettings.sendCandidatesBanner) {
                    this.rawTicket.adCandidatesBanner = [];
                  }

                  if (this.rawTicket.adCandidatesHtml5.length && !loadManagementSettings.sendCandidatesHtml5) {
                    this.rawTicket.adCandidatesHtml5 = [];
                  }

                  if (this.rawTicket.videoTraffics.length) {
                    if (isYouTube) {
                      if (!loadManagementSettings.sendYoutubeVideoTraffics) {
                        this.rawTicket.videoTraffics = [];
                      }
                    } else {
                      if (!loadManagementSettings.sendNonYoutubeVideoTraffics) {
                        this.rawTicket.videoTraffics = [];
                      }
                    }
                  }

                  if (this.rawTicket.adsFacebook.length && !loadManagementSettings.sendFacebookAds) {
                    this.rawTicket.adsFacebook = [];
                  }

                  if (this.rawTicket.adsTwitter.length && !loadManagementSettings.sendTwitterAds) {
                    this.rawTicket.adsTwitter = [];
                  }

                  if (this.rawTicket.adsReddit.length && !loadManagementSettings.sendRedditAds) {
                    this.rawTicket.adsReddit = [];
                  }
                }

                if (PosdCommon.IsPublisherInBlacklist(this.rawTicket.url, this.ConfigManager.GetBlacklistPublishers())) {
                  this.rawTicket.adCandidatesSkinAd = [];
                  this.rawTicket.adCandidatesBanner = [];
                  this.rawTicket.adCandidatesHtml5 = [];
                  this.rawTicket.videoTraffics = [];
                  this.rawTicket.adsFacebook = [];
                  this.rawTicket.adsTwitter = [];
                  this.rawTicket.adsReddit = [];
                }

                if (this.rawTicket.adCandidatesSkinAd.length || this.rawTicket.adCandidatesBanner.length || this.rawTicket.adCandidatesHtml5.length || this.rawTicket.videoTraffics.length || this.rawTicket.adsFacebook.length || this.rawTicket.adsTwitter.length || this.rawTicket.adsReddit.length || this.rawTicket.firstVisit) {
                  payload = true;
                }

                this.rawTicket.timeOnPage = PosdCommon.GetCurrentTimestamp() - this.lastTicketDataSendTimestamp;
                this.finalOutTicket.type = PosdConst.OUT_TICKET_TYPE_SINGLE;
                this.finalOutTicket.data = JSON.stringify(this.rawTicket);
                this.status = PosdConst.TICKET_BUILDING_STATUS_DONE;

                if (this.chains.length) {
                  for (_i2 = 0; _i2 < this.chains.length; _i2++) {
                    this.chains[_i2].ClearChain();
                  }
                }

                this.chains = [];

                if (this.timeoutMaxBuilding) {
                  clearTimeout(this.timeoutMaxBuilding);
                  this.timeoutMaxBuilding = null;
                }

                if (this.timeoutDeepTargetUrlDetection) {
                  clearTimeout(this.timeoutDeepTargetUrlDetection);
                  this.timeoutDeepTargetUrlDetection = null;
                }

                if (payload || isForced) {
                  this.ContentStorage.RemoveIframeContentFromTabId(this.tabId, isForced);
                } else {}

                if (!isForced) {
                  if (chainsExtractionStatuses.length && PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
                    mes = PosdMessage.EmptyMessage;
                    mes.type = PosdConst.MESSAGE_TYPE_HTML5_CANDIDATES_EXTRACTION_STATUSES;
                    mes.to = 'mp_' + this.tabId;
                    mes.content = chainsExtractionStatuses;
                    chrome.tabs.sendMessage(this.tabId, mes);
                  }

                  if (this.onTicketBuiltCallback) {
                    this.onTicketBuiltCallback(this.tabId, this.finalOutTicket, payload);
                  }

                  this.ClearTicket();
                }

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function TicketBuildingFinished(_x) {
        return _TicketBuildingFinished.apply(this, arguments);
      }

      return TicketBuildingFinished;
    }()
  }, {
    key: "LookingForBannerAds",
    value: function LookingForBannerAds() {
      if (!this.ContentStorage) {
        return;
      }

      this.rawTicket.adCandidatesBanner = this.ContentStorage.GetCandidatesDataBanners(this.tabId);

      if (this.rawTicket.adCandidatesBanner.length && PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
        var bannersExtractionStatuses = [];

        for (var i = 0; i < this.rawTicket.adCandidatesBanner.length; i++) {
          bannersExtractionStatuses.push({
            bannerId: this.rawTicket.adCandidatesBanner[i].bisId,
            extractionStatus: {
              sentToBackend: true,
              fullContentExtracted: true,
              targetUrlExtracted: true
            }
          });
        }

        var mes = PosdMessage.EmptyMessage;
        mes.type = PosdConst.MESSAGE_TYPE_BANNER_CANDIDATES_EXTRACTION_STATUSES;
        mes.to = 'mp_' + this.tabId;
        mes.content = bannersExtractionStatuses;
        chrome.tabs.sendMessage(this.tabId, mes);
      }
    }
  }, {
    key: "LookingForSkinAds",
    value: function LookingForSkinAds() {
      if (!this.ContentStorage) {
        return;
      }

      this.rawTicket.adCandidatesSkinAd = this.ContentStorage.GetCandidatesDataSkinAds(this.tabId);

      if (this.rawTicket.adCandidatesSkinAd.length && PosdConfig.CONFIG_MARK_AD_CANDIDATES && PosdConfig.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
        var skinAdExtractionStatuses = [];

        for (var i = 0; i < this.rawTicket.adCandidatesSkinAd.length; i++) {
          skinAdExtractionStatuses.push({
            query: '*[bis_skin_element="1"]',
            extractionStatus: {
              sentToBackend: true,
              fullContentExtracted: true,
              targetUrlExtracted: true
            }
          });
        }

        var mes = PosdMessage.EmptyMessage;
        mes.type = PosdConst.MESSAGE_TYPE_SKIN_AD_CANDIDATES_EXTRACTION_STATUSES;
        mes.to = 'mp_' + this.tabId;
        mes.content = skinAdExtractionStatuses;
        chrome.tabs.sendMessage(this.tabId, mes);
      }
    }
  }, {
    key: "LookingForTwitterAds",
    value: function LookingForTwitterAds(isForced) {
      if (!this.ContentStorage) {
        return;
      }

      this.rawTicket.adsTwitter = this.ContentStorage.GetCandidatesDataTwitter(this.tabId, isForced);
      var twCandidatesVideoData = this.ContentStorage.GetCandidatesTwitterVideoData(this.tabId);
      var foundTwitterVideoDataIds = [];

      if (twCandidatesVideoData && twCandidatesVideoData.length && this.rawTicket.adsTwitter && this.rawTicket.adsTwitter.length) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.rawTicket.adsTwitter[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var ad = _step4.value;

            if (ad.adPlacementType === PosdConst.TWITTER_AD_PLACEMENT_TYPE_FEED && ad.hasOwnProperty('videoData')) {
              var adVideoData = this.GetVideoDataForTwitterVideoAd(twCandidatesVideoData, PosdBase64.decode(ad.content));

              if (adVideoData && adVideoData.tweets && adVideoData.tweets.id) {
                ad.videoData = adVideoData;
                foundTwitterVideoDataIds.push(adVideoData.tweets.id);
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
      }

      this.isTwitterTicketReady = true;
    }
  }, {
    key: "LookingForRedditAds",
    value: function LookingForRedditAds() {
      if (!this.ContentStorage) {
        return;
      }

      this.rawTicket.adsReddit = this.ContentStorage.GetCandidatesDataReddit(this.tabId);
      var redditCandidatesVideoData = this.ContentStorage.GetCandidatesRedditVideoData(this.tabId);
      var redditCandidatesRightColumnData = this.ContentStorage.GetCandidatesRedditRightColumnData(this.tabId);

      if (this.rawTicket.adsReddit && this.rawTicket.adsReddit.length) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.rawTicket.adsReddit[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var ad = _step5.value;

            if (redditCandidatesVideoData && redditCandidatesVideoData.length && ad.adPlacementType === PosdConst.REDDIT_AD_PLACEMENT_TYPE_FEED && ad.hasOwnProperty('videoData')) {
              var adVideoData = this.GetVideoDataForRedditVideoAd(redditCandidatesVideoData, PosdBase64.decode(ad.content));

              if (adVideoData && adVideoData.videoId) {
                ad.videoData = adVideoData;
              }
            }

            if (redditCandidatesRightColumnData && redditCandidatesRightColumnData.length && ad.adPlacementType === PosdConst.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN) {
              var targetUrl = this.GetRightColumnDataForReddit(redditCandidatesRightColumnData, PosdBase64.decode(ad.content));

              if (targetUrl && targetUrl.length) {
                ad.targetUrl = targetUrl;
              }
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
      }

      this.isRedditTicketReady = true;
    }
  }, {
    key: "LookingForFacebookAds",
    value: function () {
      var _LookingForFacebookAds = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var fbVideoData, newDesign, foundVideoDataIds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, raw, findVideoData, content, j, videoData, videoUrlConfig;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.rawTicket.adsFacebook = this.ContentStorage.GetCandidatesDataFacebook(this.tabId);

                if (!this.rawTicket.adsFacebook.length) {
                  _context2.next = 41;
                  break;
                }

                fbVideoData = this.ContentStorage.GetCandidatesFacebookVideoData(this.tabId);
                newDesign = 0;
                foundVideoDataIds = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _context2.prev = 7;
                _iterator = _asyncIterator(this.rawTicket.adsFacebook);

              case 9:
                _context2.next = 11;
                return _iterator.next();

              case 11:
                _step = _context2.sent;
                _iteratorNormalCompletion = _step.done;
                _context2.next = 15;
                return _step.value;

              case 15:
                _value = _context2.sent;

                if (_iteratorNormalCompletion) {
                  _context2.next = 23;
                  break;
                }

                raw = _value;

                if (raw.designVersion && raw.designVersion === PosdConst.FACEBOOK_DESIGN_VERSION_NEW) {
                  newDesign = newDesign + 1;
                }

                if (raw.videoData) {
                  if (fbVideoData && fbVideoData.length) {
                    findVideoData = false;
                    content = PosdBase64.decode(raw.content);

                    for (j = 0; j < fbVideoData.length && !findVideoData; j++) {
                      videoData = fbVideoData[j];

                      if (this.isVideoDataMatch(content, videoData)) {
                        videoUrlConfig = this.ConfigManager.GetFacebookConfig().VIDEO_URL_BY_PATTERN;
                        findVideoData = true;
                        raw.videoData.videoId = videoData.videoId;
                        raw.videoData.videoUrl = this.decodeURL(videoData.videoUrl, videoUrlConfig);
                        raw.videoData.audioUrl = videoData.audioUrl;
                        foundVideoDataIds.push(videoData.videoId);
                      }
                    }

                    if (!findVideoData) {
                      if (raw.aboutPageLink) {
                        findVideoData = this.buildFBVideoUrl(raw, content);
                      }
                    }
                  }
                }

              case 20:
                _iteratorNormalCompletion = true;
                _context2.next = 9;
                break;

              case 23:
                _context2.next = 29;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2["catch"](7);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 29:
                _context2.prev = 29;
                _context2.prev = 30;

                if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                  _context2.next = 34;
                  break;
                }

                _context2.next = 34;
                return _iterator["return"]();

              case 34:
                _context2.prev = 34;

                if (!_didIteratorError) {
                  _context2.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context2.finish(34);

              case 38:
                return _context2.finish(29);

              case 39:
                if (newDesign > 0 && this.rawTicket && newDesign === this.rawTicket.adsFacebook.length) {
                  this.rawTicket.facebookDesignVersion = PosdConst.FACEBOOK_DESIGN_VERSION_NEW;
                }

                if (this.ContentStorage && fbVideoData && fbVideoData.length) {
                  this.ContentStorage.RemoveOldFacebookVideoData(this.tabId, foundVideoDataIds);
                }

              case 41:
                this.isFacebookTicketReady = true;

              case 42:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 25, 29, 39], [30,, 34, 38]]);
      }));

      function LookingForFacebookAds() {
        return _LookingForFacebookAds.apply(this, arguments);
      }

      return LookingForFacebookAds;
    }()
  }, {
    key: "isVideoDataMatch",
    value: function isVideoDataMatch(content, videoData) {
      var isMatch = false;
      var thumbnailValue = videoData.previewImageUrl;
      var thumbnailReg = thumbnailValue ? new RegExp(thumbnailValue.substring(thumbnailValue.length - 8), 'i') : false;
      var videoIdReg = new RegExp(videoData.videoId, 'i');
      var linkDisplayReg = videoData.linkDisplay && videoData.linkDisplay.length ? new RegExp(videoData.linkDisplay, 'i') : false;
      var userNameReg = videoData.userName && videoData.userName.length ? new RegExp(videoData.userName, 'i') : false;
      var adNameReg = videoData.adName && videoData.adName.length ? new RegExp(videoData.adName, 'i') : false;
      var adLogoReg = videoData.adLogo && videoData.adLogo.length ? new RegExp(videoData.adLogo, 'i') : false;

      if (thumbnailReg && thumbnailReg.test(content)) {
        isMatch = true;
      } else if (videoIdReg.test(content)) {
        isMatch = true;
      } else if (linkDisplayReg && linkDisplayReg.test(content)) {
        isMatch = true;
      } else if (userNameReg && userNameReg.test(content)) {
        isMatch = true;
      } else if (adNameReg && adNameReg.test(content)) {
        isMatch = true;
      } else if (adLogoReg && adLogoReg.test(content)) {
        isMatch = true;
      }

      return isMatch;
    }
  }, {
    key: "buildFBVideoUrl",
    value: function () {
      var _buildFBVideoUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(raw, content) {
        var _this3 = this;

        var config, regName, regVideoId, regVideoSrc, videoUrl, advertiserName, videoId, isVideoUrlExist, videoSrc;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                config = this.ConfigManager.GetFacebookConfig().VIDEO_URL_BY_PATTERN;
                regName = new RegExp(config.REGEX_ADVERTISER_NAME);
                regVideoId = new RegExp(config.REGEX_VIDEO_ID);
                regVideoSrc = new RegExp(config.REGEX_VIDEO_SRC);
                videoUrl = config.PATTERN;
                advertiserName = raw.aboutPageLink.match(regName) ? raw.aboutPageLink.match(regName)[1] : null;
                videoId = this.getVideoId(content, regVideoId);
                isVideoUrlExist = false;

                if (!(!videoId || !advertiserName)) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", isVideoUrlExist);

              case 10:
                videoUrl = videoUrl.replace(PosdConst.FACEBOOK_AD_VIDEO_URL_REPLACE_NAME, advertiserName).replace(PosdConst.FACEBOOK_AD_VIDEO_URL_REPLACE_VIDEO_ID, videoId);
                _context3.next = 13;
                return fetch(videoUrl).then(function (resp) {
                  if (!resp.ok) {
                    return isVideoUrlExist;
                  }

                  return resp.text();
                }).then(function (data) {
                  if (!data) {
                    return isVideoUrlExist;
                  }

                  var matchedStrings = data.match(regVideoSrc);

                  if (matchedStrings && matchedStrings.length) {
                    var result = matchedStrings.filter(function (str) {
                      return str && str.search(/^https?/) !== -1;
                    })[0];
                    result = _this3.decodeURL(result, config);
                    return result;
                  }

                  return isVideoUrlExist;
                });

              case 13:
                videoSrc = _context3.sent;

                if (videoSrc) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", isVideoUrlExist);

              case 16:
                isVideoUrlExist = true;
                raw.videoData.videoUrl = videoSrc;
                raw.videoData.videoId = videoId;
                return _context3.abrupt("return", isVideoUrlExist);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function buildFBVideoUrl(_x2, _x3) {
        return _buildFBVideoUrl.apply(this, arguments);
      }

      return buildFBVideoUrl;
    }()
  }, {
    key: "decodeURL",
    value: function decodeURL(url, config) {
      var arrayToReplaceUnicodes = config.MAP_REPLACE_UNICODE;

      if (url.search(/https:\\\/\\\//) !== -1) {
        url = url.replace(/\\/g, '');
      }
      /* Replace unicode's parts if exists */


      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = arrayToReplaceUnicodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var pare = _step6.value;

          var _pare = _slicedToArray(pare, 2),
              uni = _pare[0],
              replacer = _pare[1];

          var regUnicode = new RegExp(uni, 'g');
          url = url.replace(regUnicode, replacer);
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

      return url;
    }
  }, {
    key: "getVideoId",
    value: function getVideoId(content, regex) {
      var videoId = null;
      var matchedId = content.match(regex);

      if (matchedId && matchedId.length > 0) {
        videoId = matchedId[1];
      }

      return videoId;
    }
  }, {
    key: "GetForcedBuildTicket",
    value: function () {
      var _GetForcedBuildTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.IsValid()) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 3;
                return this.TicketBuildingFinished(true);

              case 3:
                return _context4.abrupt("return", this.finalOutTicket.data ? this.finalOutTicket.data : '{}');

              case 4:
                return _context4.abrupt("return", "{}");

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function GetForcedBuildTicket() {
        return _GetForcedBuildTicket.apply(this, arguments);
      }

      return GetForcedBuildTicket;
    }()
  }, {
    key: "ClearTicket",
    value: function ClearTicket() {
      if (this.isReadyToClearTicket) {
        this.ConfigManager = null;
        this.ContentStorage = null;
        this.rawTicket = null;
        this.webNavigationIframes = [];
        this.webNavigationChainsList = [];
        this.fullIframesList = [];
        this.onTicketBuiltCallback = null;
        this.timeoutMaxBuilding = null;
        this.timeoutDeepTargetUrlDetection = null;
        this.chainBuildingInitInfo = [];
        this.chains = [];
        this.successfullyBuidChainIds = [];
        this.chainsWithoutTargetUrl = [];
        this.finalOutTicket = {
          ticketId: '',
          data: ''
        };
        this.html5AdsPrebuildInfo = [];
        this.isFacebookTicketReady = false;
        this.isTwitterTicketReady = false;
        this.isRedditTicketReady = false;
      }
    }
  }, {
    key: "TabId",
    get: function get() {
      return this.tabId;
    }
  }, {
    key: "isReadyToClearTicket",
    get: function get() {
      var result = false;

      if (this.isFacebookTicketReady && this.isTwitterTicketReady && this.isRedditTicketReady) {
        result = true;
      }

      return result;
    }
  }], [{
    key: "GetForcedOutTicketFromTabTicketInfo",
    value: function GetForcedOutTicketFromTabTicketInfo(tabTicketInfo) {
      tabTicketInfo.rawOutTicket.adCandidatesHtml5 = [];
      tabTicketInfo.rawOutTicket.timeOnPage = PosdCommon.GetCurrentTimestamp() - tabTicketInfo.lastTicketDataSendTimestamp;
      tabTicketInfo.rawOutTicket.sharingEnabled = PosdDataSharingManager.dataSharingStatus === 'on';
      return tabTicketInfo.rawOutTicket;
    }
  }]);

  return PosdTicket;
}();

module.exports = PosdTicket;

/***/ }),

/***/ "./src/background/TicketBuilder.js":
/*!*****************************************!*\
  !*** ./src/background/TicketBuilder.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdTicket = __webpack_require__(/*! ./Ticket */ "./src/background/Ticket.js");

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdCommon = __webpack_require__(/*! ../libs/Common */ "./src/libs/Common.js");

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdSensitiveDataFilter = (__webpack_require__(/*! ../libs/sensitive-data-filter */ "./src/libs/sensitive-data-filter.js")["default"]);

var PosdTicketBuilder = /*#__PURE__*/function () {
  function PosdTicketBuilder(id) {
    _classCallCheck(this, PosdTicketBuilder);

    this.id = id;
    this.init = false;
    this.ConfigManager = null;
    this.ContentStorage = null;
    this.TicketSender = null;
    this.TabsManager = null;
    this.SensitiveDataFilter = null;
    this.SensitiveDataFilterInited = false;
    this.tickets = [];
    this.tabsInBuilding = [];
    this.tabTicketInfo = [];
    this.tabTicketInfoCheckerTimeout = null;
    this.panalyticsId = '';
  }

  _createClass(PosdTicketBuilder, [{
    key: "IsInit",
    value: function IsInit() {
      return this.init;
    }
  }, {
    key: "SetPanalyticsId",
    value: function SetPanalyticsId(panalyticsId) {
      this.panalyticsId = panalyticsId;
    }
  }, {
    key: "Init",
    value: function Init(ContentStorage, TicketSender, AdBlockInspector, TabsManager, ConfigManager) {
      var _this = this;

      if (!this.init && ContentStorage && TicketSender && TabsManager) {
        this.init = true;
        this.ConfigManager = ConfigManager;
        this.ContentStorage = ContentStorage;
        this.TicketSender = TicketSender;
        this.AdBlockInspector = AdBlockInspector;
        this.TabsManager = TabsManager;
        this.TabsManager.onRemoved(this.onTabClosed.bind(this));

        if (this.ConfigManager && this.ConfigManager.IsUseSensitiveDataFilter()) {
          this.SensitiveDataFilter = new PosdSensitiveDataFilter({
            host: PosdConfig.CONFIG_UTILITY_HOST,
            logging: true
          });
          this.SensitiveDataFilter.init().then(function () {
            _this.SensitiveDataFilterInited = true;
          }, function () {});
        } else {}
      }
    }
  }, {
    key: "PrebuildTicket",
    value: function PrebuildTicket(outTicket) {
      var ticket = JSON.parse(outTicket);

      if (this.AdBlockInspector && this.AdBlockInspector.IsInit()) {
        ticket.activeAdBlocker = this.AdBlockInspector.HasActiveAdblock;
      } else {
        ticket.activeAdBlocker = false;
      }

      if (this.SensitiveDataFilter && this.SensitiveDataFilterInited) {
        ticket.url = this.SensitiveDataFilter.transformUrl(ticket.url);
      } else {}

      if (ticket[PosdConst.TICKET_ALIAS_PANALYTICSID].length === 0) {
        ticket[PosdConst.TICKET_ALIAS_PANALYTICSID] = this.panalyticsId;
      }

      return JSON.stringify(ticket);
    }
  }, {
    key: "AddTicketForBuilding",
    value: function AddTicketForBuilding(webTabId, outTicket) {
      if (this.init) {
        var tabTicketInfo = this.AddTicketToTabInfo(webTabId, outTicket);

        if (!this.tabsInBuilding.includes(webTabId)) {
          tabTicketInfo.addTicketToBuildingTimestamp = PosdCommon.GetCurrentTimestamp();
          var ticket = new PosdTicket(this.panalyticsId, webTabId, outTicket, tabTicketInfo.lastTicketDataSendTimestamp, this.ContentStorage, this.ConfigManager);

          if (ticket.IsValid()) {
            this.tickets.push(ticket);
            this.tabsInBuilding.push(webTabId);
            ticket.ActivateBuilding(this.onTicketBuilt.bind(this));
            return true;
          } else {}
        } else {}
      }

      return false;
    }
  }, {
    key: "onGotTicketClickTargetUrlInfo",
    value: function onGotTicketClickTargetUrlInfo(tabId, frameId, tgInfo) {
      if (this.init) {
        var find = false;

        for (var i = 0; i < this.tickets.length && !find; i++) {
          if (this.tickets[i].TabId === tabId) {
            find = true;
            this.tickets[i].onGotTicketClickTargetUrl(frameId, tgInfo.chainId, tgInfo.clickTargetUrl);
          }
        }
      }
    }
  }, {
    key: "onTicketBuilt",
    value: function onTicketBuilt(tabId, finalOutTicket, payload) {
      if (this.tabsInBuilding.includes(tabId)) {
        if (payload) {
          this.TicketSender.PushTicket(finalOutTicket);
          var tabKey = "tab_".concat(tabId);

          if (this.tabTicketInfo[tabKey]) {
            this.tabTicketInfo[tabKey].lastTicketDataSendTimestamp = this.tabTicketInfo[tabKey].addTicketToBuildingTimestamp;
          }
        }

        var tabIndex = this.tabsInBuilding.indexOf(tabId);

        if (tabIndex > -1) {
          this.tabsInBuilding.splice(tabIndex, 1);
        }

        var find = false;

        for (var i = 0; i < this.tickets.length && !find; i++) {
          if (this.tickets[i].TabId === tabId) {
            find = true;
            this.tickets.splice(i, 1);
          }
        }
      } else {}
    }
  }, {
    key: "AddTicketToTabInfo",
    value: function AddTicketToTabInfo(tabId, outTicket) {
      var _this2 = this;

      var tabKey = "tab_".concat(tabId);
      var rawOutTicket = JSON.parse(outTicket);
      var newTicketForTab = false;

      if (this.tabTicketInfo[tabKey]) {
        if (rawOutTicket.ticketId === this.tabTicketInfo[tabKey].rawOutTicket.ticketId) {
          this.tabTicketInfo[tabKey].rawOutTicket = rawOutTicket;
        } else {
          this.tabTicketInfo[tabKey].rawOutTicket.finalTicket = true;

          if (this.ContentStorage.HaveDataForTab(tabId)) {
            var ticket = new PosdTicket(this.panalyticsId, tabId, JSON.stringify(this.tabTicketInfo[tabKey].rawOutTicket), this.tabTicketInfo[tabKey].lastTicketDataSendTimestamp, this.ContentStorage, this.ConfigManager);
            ticket.GetForcedBuildTicket().then(function (outTicketContent) {
              _this2.TicketSender.PushTicket({
                type: PosdConst.OUT_TICKET_TYPE_SINGLE,
                ticketId: _this2.tabTicketInfo[tabKey].rawOutTicket.ticketId,
                data: outTicketContent
              });

              ticket.ClearTicket();
            });
          } else {
            var outTicketContent = JSON.stringify(PosdTicket.GetForcedOutTicketFromTabTicketInfo(this.tabTicketInfo[tabKey]));
            this.TicketSender.PushTicket({
              type: PosdConst.OUT_TICKET_TYPE_SINGLE,
              ticketId: this.tabTicketInfo[tabKey].rawOutTicket.ticketId,
              data: outTicketContent
            });
          }

          newTicketForTab = true;
        }
      } else {
        newTicketForTab = true;
      }

      if (newTicketForTab) {
        this.tabTicketInfo[tabKey] = {
          tabId: tabId,
          addTicketToBuildingTimestamp: PosdCommon.GetCurrentTimestamp(),
          lastTicketDataSendTimestamp: PosdCommon.GetCurrentTimestamp(),
          rawOutTicket: rawOutTicket
        };
      }

      return this.tabTicketInfo[tabKey];
    }
  }, {
    key: "onTabClosed",
    value: function onTabClosed(tabId, removeInfo) {
      var tabKey = "tab_".concat(tabId);

      if (this.tabTicketInfo[tabKey]) {
        this.tabTicketInfo[tabKey].rawOutTicket.finalTicket = true;

        if (!this.tabTicketInfoCheckerTimeout) {
          this.tabTicketInfoCheckerTimeout = setTimeout(this.CheckForFinalTickets.bind(this, tabId), 1000);
        } else {}
      } else {}
    }
  }, {
    key: "CheckForFinalTickets",
    value: function CheckForFinalTickets(tabId) {
      var _this3 = this;

      this.tabTicketInfoCheckerTimeout = null;
      var multiOutTicket = [];

      for (var tabKey in this.tabTicketInfo) {
        if (this.tabTicketInfo[tabKey] && this.tabTicketInfo[tabKey].rawOutTicket.finalTicket) {
          if (this.tabsInBuilding.includes(tabId)) {
            this.onTicketBuilt(tabId, "", false);
          }

          if (this.ContentStorage.HaveDataForTab(tabId)) {
            (function () {
              var ticket = new PosdTicket(_this3.panalyticsId, tabId, JSON.stringify(_this3.tabTicketInfo[tabKey].rawOutTicket), _this3.tabTicketInfo[tabKey].lastTicketDataSendTimestamp, _this3.ContentStorage, _this3.ConfigManager);
              ticket.GetForcedBuildTicket().then(function (forcedTicket) {
                multiOutTicket.push(JSON.parse(forcedTicket));
                ticket.ClearTicket();

                if (multiOutTicket.length) {
                  _this3.TicketSender.PushTicket({
                    type: PosdConst.OUT_TICKET_TYPE_MULTI,
                    data: JSON.stringify(multiOutTicket)
                  });
                }
              });
            })();
          } else {
            multiOutTicket.push(PosdTicket.GetForcedOutTicketFromTabTicketInfo(this.tabTicketInfo[tabKey]));
          }

          this.tabTicketInfo[tabKey] = null;
          delete this.tabTicketInfo[tabKey];
        }
      }

      if (multiOutTicket.length) {
        this.TicketSender.PushTicket({
          type: PosdConst.OUT_TICKET_TYPE_MULTI,
          data: JSON.stringify(multiOutTicket)
        });
      }
    }
  }]);

  return PosdTicketBuilder;
}();

module.exports = PosdTicketBuilder;

/***/ }),

/***/ "./src/background/TicketSender.js":
/*!****************************************!*\
  !*** ./src/background/TicketSender.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdConst = __webpack_require__(/*! ../libs/Constants */ "./src/libs/Constants.js");

var PosdConfig = __webpack_require__(/*! ../config */ "./src/config.js");

var PosdLZString = __webpack_require__(/*! ../libs/lz-string */ "./src/libs/lz-string.js");

var PosdBackgendIOManager = __webpack_require__(/*! ./BackendIOManager */ "./src/background/BackendIOManager.js");

var PosdTicketSender = /*#__PURE__*/function () {
  function PosdTicketSender(id) {
    _classCallCheck(this, PosdTicketSender);

    this.id = id;
    this.BackgendIOManager = new PosdBackgendIOManager();
    this.OutTicketQueue = [];
    this.ticketToOut = {};
    this.panalyticsId = '';
  }

  _createClass(PosdTicketSender, [{
    key: "Init",
    value: function Init() {
      setInterval(this.SendTicket.bind(this), 500);
    }
  }, {
    key: "SetPanalyticsId",
    value: function SetPanalyticsId(panalyticsId) {
      this.panalyticsId = panalyticsId;
    }
  }, {
    key: "isTicketDataEmpty",
    value: function isTicketDataEmpty(ticketData) {
      var decodedTicketData = JSON.parse(ticketData);

      if (!decodedTicketData) {
        return true;
      }

      if (decodedTicketData.length && decodedTicketData.length === 1) {
        var insideTicket = decodedTicketData[0];
        var insideTicketKeys = Object.keys(insideTicket);

        if (!insideTicketKeys.length) {
          return true;
        }
      }

      if (decodedTicketData.finalTicket) {
        return false;
      }

      var keys = Object.keys(decodedTicketData);

      if (!keys.length) {
        return true;
      }

      return false;
    }
  }, {
    key: "PushTicket",
    value: function PushTicket(ticket) {
      if (this.OutTicketQueue.length < PosdConst.MAX_OUT_TICKETS_QUEUE_LENGTH) {
        this.OutTicketQueue.push(ticket);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "SendTicket",
    value: function SendTicket() {
      if (this.panalyticsId.length && this.OutTicketQueue.length) {
        this.ticketToOut = this.OutTicketQueue.shift();

        if (this.isTicketDataEmpty(this.ticketToOut.data)) {
          return;
        }

        var outTicketLength = this.ticketToOut.data.length;
        var decodedData = JSON.parse(this.ticketToOut.data);

        if (PosdConfig.CONFIG_USE_COMPRESSION && this.ticketToOut.data) {
          this.ticketToOut.data = PosdLZString.compressToUTF16(this.ticketToOut.data);
          var compressedOutTicketLength = this.ticketToOut.data.length;
        }

        if (this.ticketToOut.type === PosdConst.OUT_TICKET_TYPE_SINGLE) {
          this.BackgendIOManager.SendSingleOutTicketToBackend(this.panalyticsId, this.ticketToOut, this.onTicketSend.bind(this), this.onTicketSendError.bind(this));
        } else if (this.ticketToOut.type === PosdConst.OUT_TICKET_TYPE_MULTI) {
          this.BackgendIOManager.SendMultiOutTicketToBackend(this.panalyticsId, this.ticketToOut, this.onTicketSend.bind(this), this.onTicketSendError.bind(this));
        } else {}
      }
    }
  }, {
    key: "onTicketSend",
    value: function onTicketSend() {
      this.ticketToOut.ticketId = '';
      this.ticketToOut.data = '';
    }
  }, {
    key: "onTicketSendError",
    value: function onTicketSendError() {
      this.ticketToOut.ticketId = '';
      this.ticketToOut.data = '';
    }
  }]);

  return PosdTicketSender;
}();

module.exports = PosdTicketSender;

/***/ }),

/***/ "./src/background/WebNavigationIframes.js":
/*!************************************************!*\
  !*** ./src/background/WebNavigationIframes.js ***!
  \************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdWebNavigationIframes = /*#__PURE__*/function () {
  function PosdWebNavigationIframes() {
    _classCallCheck(this, PosdWebNavigationIframes);
  }

  _createClass(PosdWebNavigationIframes, null, [{
    key: "GetWebNavigationChainsList",
    value: function GetWebNavigationChainsList(webNavigationIframes) {
      var waitProcess = [];
      var chains = [];

      for (var i = 0; i < webNavigationIframes.length; i++) {
        if (webNavigationIframes[i].parentFrameId === 0) {
          chains.push([webNavigationIframes[i].frameId]);
        } else if (webNavigationIframes[i].parentFrameId > 0) {
          waitProcess.push({
            frameId: webNavigationIframes[i].frameId,
            parentFrameId: webNavigationIframes[i].parentFrameId,
            processed: false
          });
        }
      }

      var processedAmount = 0;
      var dept = 0;

      while (dept < 100 && waitProcess.length > processedAmount) {
        dept = dept + 1;
        processedAmount = 0;

        for (var _i = 0; _i < waitProcess.length; _i++) {
          if (!waitProcess[_i].processed) {
            var findChain = false;

            for (var j = 0; j < chains.length && !findChain; j++) {
              if (chains[j].includes(waitProcess[_i].parentFrameId)) {
                chains[j].push(waitProcess[_i].frameId);
                waitProcess[_i].processed = true;
                findChain = true;
              }
            }
          } else {
            processedAmount = processedAmount + 1;
          }
        }
      }

      return chains;
    }
  }, {
    key: "GetVideoHarFramesChainFullInfo",
    value: function GetVideoHarFramesChainFullInfo(frameId, webNavigationIframes) {
      var frameChainInfo = [];
      var dept = 0;
      var frame = frameId;

      while (dept < 100 && frame >= 0) {
        dept = dept + 1;
        var find = false;

        for (var i = 0; i < webNavigationIframes.length && !find; i++) {
          if (webNavigationIframes[i].frameId === frame) {
            frameChainInfo.push({
              frameId: webNavigationIframes[i].frameId,
              parentFrameId: webNavigationIframes[i].parentFrameId,
              url: webNavigationIframes[i].url
            });
            frame = webNavigationIframes[i].parentFrameId;
            find = true;
          }
        }
      }

      return frameChainInfo;
    }
  }]);

  return PosdWebNavigationIframes;
}();

module.exports = PosdWebNavigationIframes;

/***/ }),

/***/ "./src/background/loaders/FacebookLoader.js":
/*!**************************************************!*\
  !*** ./src/background/loaders/FacebookLoader.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdBase64 = __webpack_require__(/*! ../../libs/base64 */ "./src/libs/base64.js");

var PosdCommon = __webpack_require__(/*! ../../libs/Common */ "./src/libs/Common.js");

var PosdConst = __webpack_require__(/*! ../../libs/Constants */ "./src/libs/Constants.js");

var PosdFacebookLoader = /*#__PURE__*/function () {
  function PosdFacebookLoader(id) {
    _classCallCheck(this, PosdFacebookLoader);

    this.id = id;
    this.ContentStorage = null;
    this.ConfigManager = null;
    this.aboutSectionConfig = null;
    this.clenupTimer = null;
    this.candidates = [];
  }

  _createClass(PosdFacebookLoader, [{
    key: "Init",
    value: function Init(ConfigManager, ContentStorage) {
      this.ConfigManager = ConfigManager;
      this.ContentStorage = ContentStorage;
      this.clenupTimer = setInterval(this.CleanupCandidates.bind(this), 60000);
    }
  }, {
    key: "IsLoadAboutPageActivated",
    value: function IsLoadAboutPageActivated() {
      var facebookConfig = this.facebookConfig;

      if (facebookConfig && facebookConfig.ABOUT_SECTION_CONFIG) {
        return facebookConfig.ABOUT_SECTION_CONFIG.LOAD_ABOUT_PAGE;
      }

      return false;
    }
  }, {
    key: "AddOneCandidateForLoading",
    value: function AddOneCandidateForLoading(tabId, candidate, type) {
      this.mesType = type;
      this.candidates.push({
        tabId: tabId,
        active: true,
        addTimestamp: PosdCommon.GetCurrentTimestamp(),
        content: candidate
      });

      if (this.mesType === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK) {
        this.AddToLoading(candidate.aboutPageLink);
      } else if (this.mesType === PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA) {
        this.AddToLoading(candidate.encodedText.bisLinks.aboutPageLink);
      }
    }
  }, {
    key: "AddToLoading",
    value: function AddToLoading(link) {
      if (this.ConfigManager) {
        var facebookConfig = this.ConfigManager.GetFacebookConfig();

        if (facebookConfig && facebookConfig.ABOUT_SECTION_CONFIG && facebookConfig.ABOUT_SECTION_CONFIG.LOAD_ABOUT_PAGE) {
          this.aboutSectionConfig = facebookConfig.ABOUT_SECTION_CONFIG;

          if (this.mesType === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK) {
            this.LoadFBAboutContent(facebookConfig, link, this.onAboutPageLoaded.bind(this));
          } else if (this.mesType === PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA) {
            this.LoadFBAboutContent(facebookConfig, link, this.onInstreamAboutPageLoaded.bind(this));
          }
        }
      }
    }
  }, {
    key: "LoadFBAboutContent",
    value: function LoadFBAboutContent(facebookConfig, callUrl, onGetDataCallback) {
      var _this = this;

      if (callUrl) {
        var _responseUrl = null;
        fetch(callUrl, {
          headers: facebookConfig.ABOUT_SECTION_CONFIG.HEADERS,
          method: "GET"
        }).then(function (response) {
          if (response.status === 200) {
            _responseUrl = response.url;
            return response.text();
          } else {
            onGetDataCallback(false, callUrl, "");
          }
        }).then(function (data) {
          _this.workWithDataFromLoadPage(facebookConfig, callUrl, onGetDataCallback, data);
        })["catch"](function () {
          onGetDataCallback(false, callUrl, "");
        });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "workWithDataFromLoadPage",
    value: function workWithDataFromLoadPage(facebookConfig, callUrl, onGetDataCallback, data, responseUrl) {
      if (this.mesType === PosdConst.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK) {
        this.getAboutPageContent(callUrl, onGetDataCallback, data);
      }

      if (this.mesType === PosdConst.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA) {
        this.getAdvertiserUrlFromAboutPage(facebookConfig, callUrl, onGetDataCallback, data, responseUrl);
      }
    }
  }, {
    key: "getAdvertiserUrlFromAboutPage",
    value: function getAdvertiserUrlFromAboutPage(facebookConfig, callUrl, onGetDataCallback, data) {
      if (!data) {
        onGetDataCallback(false, callUrl, null);
        return;
      }

      var stringedData = "".concat(data);
      var urls = {
        pageLink: responseUrl.replace(/about/, ''),
        advertiserLink: null
      };
      var isFind = false;

      for (var i = 0; i < facebookConfig.ABOUT_SECTION_CONFIG.ADVERTISER_LINK_INSTREAM_QUERIES.length && !isFind; i++) {
        var query = facebookConfig.ABOUT_SECTION_CONFIG.ADVERTISER_LINK_INSTREAM_QUERIES[i];
        var reqQuery = new RegExp(query);
        var advertiserLink = stringedData.match(reqQuery);

        if (advertiserLink && advertiserLink.length && advertiserLink[0].search(/http/) > -1) {
          urls.advertiserLink = JSON.parse("\"".concat(advertiserLink[0].match(/https?:((\/\/)|(\\\/\\\/)).[^"]+/)[0], "\""));
          isFind = true;
        }
      }

      onGetDataCallback(isFind, callUrl, urls);
    }
  }, {
    key: "getAboutPageContent",
    value: function getAboutPageContent(callUrl, onGetDataCallback, data) {
      var body = data.body;
      var about = "";

      if (PosdCommon.IsChrome()) {
        var sectionZoneDetectorIndex = body.indexOf(this.aboutSectionConfig.CHROME_SECTIONS.SECTION_ZONE_DETECTOR);

        if (sectionZoneDetectorIndex > 0) {
          var content = body.substring(0, sectionZoneDetectorIndex);
          var sectionStartIndex = content.lastIndexOf(this.aboutSectionConfig.CHROME_SECTIONS.SECTION_START);
          var sectionEndIndex = content.lastIndexOf(this.aboutSectionConfig.CHROME_SECTIONS.SECTION_END);

          if (sectionStartIndex > 0 && sectionEndIndex > 0 && sectionStartIndex < sectionEndIndex) {
            about = PosdBase64.encode(content.substring(sectionStartIndex + this.aboutSectionConfig.CHROME_SECTIONS.SECTION_START.length, sectionEndIndex));
          }
        }
      } else if (PosdCommon.IsFirefox()) {
        var _sectionStartIndex = body.indexOf(this.aboutSectionConfig.FIREFOX_SECTIONS.SECTION_START);

        if (_sectionStartIndex > 0) {
          var _content = body.substring(_sectionStartIndex, body.length - 1);

          var _sectionEndIndex = _content.indexOf(this.aboutSectionConfig.FIREFOX_SECTIONS.SECTION_END);

          if (_sectionEndIndex > 0) {
            about = PosdBase64.encode(_content.substring(0, _sectionEndIndex));
          }
        }
      } else {}

      onGetDataCallback(true, callUrl, about);
    }
  }, {
    key: "onAboutPageLoaded",
    value: function onAboutPageLoaded(loaded, aboutPageUrl, aboutSectionContent) {
      if (loaded) {} else {}

      var find = false;

      for (var i = 0; i < this.candidates.length; i++) {
        if (this.candidates[i].content.aboutPageLink === aboutPageUrl) {
          this.candidates[i].content.aboutSectionContent = aboutSectionContent;
          this.candidates[i].active = false;
          this.ContentStorage.AddCandidatesDataFacebook(this.candidates[i].tabId, [this.candidates[i].content]);
          find = true;
        }
      }

      if (find) {
        this.CleanupCandidates();
      }
    }
  }, {
    key: "onInstreamAboutPageLoaded",
    value: function onInstreamAboutPageLoaded(loaded, aboutPageUrl, urls) {
      if (loaded) {} else {}

      var find = false;

      for (var i = 0; i < this.candidates.length; i++) {
        var candidate = this.candidates[i];

        if (candidate.content.encodedText.bisLinks.aboutPageLink === aboutPageUrl) {
          var ticketData = Object.assign({}, candidate.content);
          ticketData.encodedText.bisLinks.advertiserLink = urls.advertiserLink;
          ticketData.encodedText.bisLinks.pageLink = urls.pageLink;
          delete ticketData.encodedText.bisLinks.aboutPageLink;
          ticketData.encodedText = PosdBase64.encode(JSON.stringify(ticketData.encodedText));
          this.ContentStorage.AddVideoHar(candidate.tabId, ticketData);
          find = true;
        }
      }

      if (find) {
        this.CleanupCandidates();
      }
    }
  }, {
    key: "CleanupCandidates",
    value: function CleanupCandidates() {
      var freshCandidates = [];
      var currentTimestamp = PosdCommon.GetCurrentTimestamp();

      if (this.candidates && this.candidates.length) {
        for (var i = 0; i < this.candidates.length; i++) {
          if (this.candidates[i].active) {
            if (currentTimestamp - this.candidates[i].addTimestamp < 60) {
              freshCandidates.push(this.candidates[i]);
            } else {}
          }
        }

        this.candidates = freshCandidates;
      }
    }
  }, {
    key: "facebookConfig",
    get: function get() {
      return this.ConfigManager ? this.ConfigManager.GetFacebookConfig() : null;
    }
  }]);

  return PosdFacebookLoader;
}();

module.exports = PosdFacebookLoader;

/***/ }),

/***/ "./src/background/loaders/TwitterLoader.js":
/*!*************************************************!*\
  !*** ./src/background/loaders/TwitterLoader.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosdBase64 = __webpack_require__(/*! ../../libs/base64 */ "./src/libs/base64.js");

var PosdCommon = __webpack_require__(/*! ../../libs/Common */ "./src/libs/Common.js");

var PosdTwitterLoader = /*#__PURE__*/function () {
  function PosdTwitterLoader(id) {
    _classCallCheck(this, PosdTwitterLoader);

    this.id = id;
    this.ContentStorage = null;
    this.twitterConfig = null;
    this.clenupTimer = null;
    this.candidates = [];
    this.guestToken = null;
    this.loaderCache = [];
    this.guestTokenLastUpdateTime = PosdCommon.GetCurrentTimestamp() - 300;
  }

  _createClass(PosdTwitterLoader, [{
    key: "Init",
    value: function Init(ConfigManager, ContentStorage) {
      this.twitterConfig = ConfigManager.GetTwitterConfig();
      this.ContentStorage = ContentStorage;

      if (this.ContentStorage && this.twitterConfig) {
        this.clenupTimer = setInterval(this.Cleanup.bind(this), 60000);
      }
    }
  }, {
    key: "UpdateGuestToken",
    value: function UpdateGuestToken(onUpdatedCallback) {
      var _this = this;

      var currentTime = PosdCommon.GetCurrentTimestamp();

      if (this.guestToken === null || currentTime - this.guestTokenLastUpdateTime > 60) {
        this.guestTokenLastUpdateTime = currentTime;
        fetch(this.twitterConfig.API_CALL_GUEST, {
          method: 'POST',
          headers: {
            'authorization': this.twitterConfig.AUTH_BEARER
          },
          credentials: 'omit'
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          return json["guest_token"];
        }).then(function (token) {
          _this.guestToken = token;

          if (onUpdatedCallback) {
            onUpdatedCallback();
          }
        });
      } else {}
    }
  }, {
    key: "AddOneCandidateForLoading",
    value: function AddOneCandidateForLoading(tabId, candidate) {
      if (this.twitterConfig.LOAD_USER_DATA) {
        this.candidates.push({
          tabId: tabId,
          active: true,
          addTimestamp: PosdCommon.GetCurrentTimestamp(),
          content: candidate
        });

        if (this.guestToken) {
          this.LoadTwAboutContent(candidate.screenName, this.onUserDataLoaded.bind(this));
        } else {
          this.UpdateGuestToken(this.LoadTwAboutContent.bind(this, candidate.screenName, this.onUserDataLoaded.bind(this)));
        }
      }
    }
  }, {
    key: "AddCandidatesForLoading",
    value: function AddCandidatesForLoading(tabId, candidates) {
      for (var i = 0; i < candidates.length; i++) {
        this.AddOneCandidateForLoading(tabId, candidates[i]);
      }
    }
  }, {
    key: "IsLoadUserDataActivated",
    value: function IsLoadUserDataActivated() {
      if (this.twitterConfig) {
        return this.twitterConfig.LOAD_USER_DATA;
      } else {
        return false;
      }
    }
  }, {
    key: "LoadTwAboutContent",
    value: function LoadTwAboutContent(screenName, onGetDataCallback) {
      var _this2 = this;

      if (screenName) {
        if (this.IsInCache(screenName)) {
          onGetDataCallback(true, screenName, this.GetDataFromCache(screenName));
        } else {
          if (this.twitterConfig.AUTH_BEARER && this.guestToken) {
            fetch(this.twitterConfig.API_CALL_SCREEN_NAME.replace('${%1}', screenName), {
              method: 'GET',
              headers: {
                'authorization': this.twitterConfig.AUTH_BEARER,
                'x-guest-token': this.guestToken
              },
              credentials: 'omit'
            }).then(function (response) {
              if (response.status === 200) {
                return response.text();
              } else {
                onGetDataCallback(false, screenName, "");
              }
            }).then(function (data) {
              _this2.AddToCache(screenName, PosdBase64.encode(data));

              onGetDataCallback(true, screenName, PosdBase64.encode(data));
            })["catch"](function () {
              onGetDataCallback(false, screenName, "");
              _this2.guestToken = "";
            });
          } else {
            onGetDataCallback(false, screenName, "");
          }
        }
      }
    }
  }, {
    key: "onUserDataLoaded",
    value: function onUserDataLoaded(loaded, screenName, userDataByScreenName) {
      if (loaded) {} else {}

      var find = false;

      for (var i = 0; i < this.candidates.length; i++) {
        if (this.candidates[i].content.screenName === screenName) {
          this.candidates[i].content.userDataByScreenName = userDataByScreenName;
          this.candidates[i].active = false;
          this.ContentStorage.AddCandidatesDataTwitter(this.candidates[i].tabId, [this.candidates[i].content]);
          find = true;
        }
      }

      if (find) {
        this.CleanupCandidates();
      }
    }
  }, {
    key: "CleanupCandidates",
    value: function CleanupCandidates() {
      var freshCandidates = [];
      var currentTimestamp = PosdCommon.GetCurrentTimestamp();

      if (this.candidates && this.candidates.length) {
        for (var i = 0; i < this.candidates.length; i++) {
          if (this.candidates[i].active) {
            if (currentTimestamp - this.candidates[i].addTimestamp < 60) {
              freshCandidates.push(this.candidates[i]);
            } else {}
          }
        }

        this.candidates = freshCandidates;
      }
    }
  }, {
    key: "Cleanup",
    value: function Cleanup() {
      this.CleanupCandidates();
      this.CleanupCache();
    }
  }, {
    key: "AddToCache",
    value: function AddToCache(screenName, data) {
      if (screenName && data) {
        this.cacheUsed = true;
        var currentTime = PosdCommon.GetCurrentTimestamp();

        if (this.IsInCache(screenName)) {
          this.loaderCache[screenName].addTimestamp = currentTime;
        } else {
          this.loaderCache[screenName] = {
            addTimestamp: currentTime,
            data: data
          };
        }
      }
    }
  }, {
    key: "IsInCache",
    value: function IsInCache(screenName) {
      return screenName && _typeof(this.loaderCache[screenName]) === "object";
    }
  }, {
    key: "GetDataFromCache",
    value: function GetDataFromCache(screenName) {
      if (this.IsInCache(screenName)) {
        return this.loaderCache[screenName].data;
      }

      return "";
    }
  }, {
    key: "CleanupCache",
    value: function CleanupCache() {
      if (Object.keys(this.loaderCache).length) {
        var currentTime = PosdCommon.GetCurrentTimestamp();

        for (screenName in this.loaderCache) {
          if (currentTime - this.loaderCache[screenName].addTimestamp > 600) {
            delete this.loaderCache[screenName];
          }
        }
      }
    }
  }]);

  return PosdTwitterLoader;
}();

module.exports = PosdTwitterLoader;

/***/ }),

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

/***/ }),

/***/ "./src/libs/config.js":
/*!****************************!*\
  !*** ./src/libs/config.js ***!
  \****************************/
/***/ ((module) => {

module.exports = '{"configInfo":{"panelVersion":"1.9.10","version":"1.49"},"loadManagement":{"sendCandidatesSkinAd":true,"sendCandidatesBanner":true,"sendCandidatesHtml5":true,"sendYoutubeVideoTraffics":true,"sendNonYoutubeVideoTraffics":true,"sendFacebookAds":true,"sendTwitterAds":true,"sendRedditAds":true},"blacklistPublishers":["mail.google.com","mail.yahoo.com","mail.aol.com","outlook.live.com","outlook.office365.com","google.com","docs.google.com","drive.google.com","calendar.google.com","translate.google.com","classroom.google.com","accounts.google.com","meet.google.com","photos.google.com","myaccount.google.com","contacts.google.com","duo.google.com","hangouts.google.com","keep.google.com","jamboard.google.com","classroom.google.com","earth.google.com","artsandculture.google.com","podcasts.google.com","one.google.com","developers.google.com","fi.google.com","files.google.com","groups.google.com","health.google","pay.google.com","workspace.google.com","shopping.google.com","store.google.com","sites.google.com","stadia.google.com","translate.google.com","voice.google.com","steamcommunity.com","store.steampowered.com","fredericksburg-inn.com","truspaceaspire.com","picturecreator9.in","iek-akmi.edu.gr","sbie.edu.gr","mitropolitiko.edu.gr","servergarden.hu","shoemart.gr","mitropolitiko.edu.gr","biscience.atlassian.net","amazonaws.com","adviewer.adcint.net","github.com"],"blacklistBannerImgSrc":[".files.wordpress.com/",".outlook.office.net/",".wikimedia.org/",".azureedge.net",".yimg.com/","image.winudf.com/"],"blacklistBannerHref":["//play.google.com/store/apps/","//itunes.apple.com/app/","//www.youtube.com/watch","//zoom.us/","rozetka."],"blacklistIframeSrc":["facebook.com/","twitter.com/","youtube-nocookie.com/embed/","//vk.com/","//www.vk.com/","//linkedin.com/","//www.linkedin.com/","//instagram.com/","//www.instagram.com/","//www.google.com/recaptcha/api2/","//hangouts.google.com/webchat/","//www.google.com/calendar/","//www.google.com/maps/embed","spotify.com/","soundcloud.com/","//player.vimeo.com/","//disqus.com/","//tgwidget.com/","//js.driftt.com/","friends2follow.com","/widget","login","//video.bigmir.net/","blogger.com","//smartlock.google.com/","//keep.google.com/","/web.tolstoycomments.com/","moz-extension://","chrome-extension://","/auth/","//analytics.google.com/","adclarity.com","paddle.com/checkout","hcaptcha.com","recaptcha.net","2captcha.com","accounts.google.com","www.google.com/shopping/customerreviews","buy.tinypass.com","gstatic.com","secureir.ebaystatic.com","docs.google.com","contacts.google.com","github.com"],"blacklistIframeId":["twitter-widget-","cello__trello-board__"],"blacklistTargetUrl":["adssettings.google.com/whythisad?reasons=","mediamath.com/privacy-policy","info.yahoo.com/privacy","boostbox.com.br"],"whitelistCandidatesUrlKeyWords":["/lynad/","banner","/ad","/webads/","ad-sys.","/?gfe_rd=cr","/a.asp","/about/privacy","/aclk?sa=","/ag/","/clicktracker","/connect","/econda","/go","/javascripts/blogger.js","/js/plusone.js","/linkout","/offers","/pagead/","/plugins","/privacy-policy","/scripts/l.php","/servlet/click/zone?zid=","/simpleads/","/site/catsearch","/tncms/tracking","/tsn","/www/delivery/","/xgde.html","/xiti.asp?s=","/webtracking","javascript:window.parent"],"whitelistRedirectionCode":[".location.replace(\\"javascript:window.goog_content\\")"],"videoValidatorsForHTML":[{"name":"HTML","alias":"YT_HTML_DESKTOP_MASTHEAD_AD","mimePattern":"/html/i","domainPattern":"/^https?:\\\\/\\\\/www\\\\.youtube\\\\.com\\\\/?$/","contentPattern":"/videoMastheadAdV3Renderer/m","reduceSizeFilter":{"reducePattern":"/(\\\\\x3Cscript.{0,200}\\\\>\\\\s*var\\\\s*ytInitialData\\\\s*=.*\\\\s*\\\\<\\\\/\\\\s*script\\\\>)/m","active":true,"regResIndexes":[0]}},{"name":"HTML","alias":"YT_HTML_DESKTOP_IFRAME_MASTHEAD_AD","mimePattern":"/html/i","domainPattern":"/^https:\\\\/\\\\/pubads\\\\.g\\\\.doubleclick\\\\.net\\\\/gampad\\\\/ads\\\\?.*?com\\\\.ythome.*?kmyd\\\\%3Dvideo-masthead/","contentPattern":"/yt.method/m"},{"name":"HTML","alias":"YT_HTML_MOBILE_AD_PLACEMENTS","mimePattern":"/html/i","domainPattern":"/https?:\\\\/\\\\/m\\\\.youtube\\\\.com/","contentPattern":"/adPlacements/"},{"name":"HTML","alias":"YT_HTML_MOBILE_INSCRIPT_AD_PLACEMENTS","mimePattern":"/html/i","domainPattern":"/https?:\\\\/\\\\/m\\\\.youtube\\\\.com/watch\\\\?.+$/","contentPattern":"/\\\\\x3Cscript.*?\\\\>\\\\s*var\\\\s*ytInitialPlayerResponse\\\\s*=\\\\s*(.*adPlacements.*).*[;]\\\\<\\\\/script\\\\>/m"},{"name":"HTML","alias":"YT_HTML_DESKTOP_INSCRIPT_PLAYER_RESPONSE","mimePattern":"/html/i","domainPattern":"/^https?:\\\\/\\\\/www\\\\.youtube\\\\.com/watch\\\\?.+$/","contentPattern":"/\\\\\x3Cscript.{0,200}\\\\>\\\\s*var\\\\s*ytInitialPlayerResponse\\\\s*=\\\\W*\\\\\\"responseContext\\\\\\".*adPlacements.*var\\\\s*meta\\\\s*=\\\\s*document\\\\.createElement\\\\(\'meta\'\\\\)/m","reduceSizeFilter":{"reducePattern":"/({window\\\\.ytplayer\\\\s*=\\\\s*{\\\\s*}\\\\s*;\\\\s*ytcfg\\\\.set\\\\(.*}\\\\);)(?:[\\\\s\\\\S]*)(\\\\\x3Cscript.{0,200}\\\\>\\\\s*var\\\\s*ytInitialPlayerResponse\\\\s*=.*\\\\s*\\\\<\\\\/\\\\s*script\\\\>)/mg","active":true,"regResIndexes":[1,2]}},{"name":"HTML","alias":"HTML_NHL","mimePattern":"/html/i","contentPattern":"/(\\\\&quot\\\\;ad\\\\&quot\\\\;)\\\\W*?(\\\\&quot\\\\;adTagUrl\\\\&quot\\\\;)/m"},{"name":"HTML","alias":"IAB_HTML","mimePattern":"/html/i","contentPattern":"/VAST|VMAP/m"}],"videoValidatorsForJS":[{"name":"JAVASCRIPT","alias":"JS_DAILYMOTION","mimePattern":"/javascript/i","domainPattern":"/https?:\\\\/\\\\/.{0,30}?(dailymotion\\\\.com).*?callback=.*/i","contentPattern":"/VAST|VMAP/m"},{"name":"JAVASCRIPT","alias":"JS_FREEWHEEL","mimePattern":"/javascript/i","contentPattern":"/^tv\\\\.freewheel\\\\.SDK\\\\.\\\\_instanceQueue.{0,100}requestComplete\\\\(\\\\{/"},{"name":"JAVASCRIPT","alias":"JS_INNOVID","mimePattern":"/javascript/i","domainPattern":"/https?:\\\\/\\\\/[^\\\\/]*innovid\\\\.com/","contentPattern":"/SCOPE.baseData.app_data/"},{"name":"JAVASCRIPT","alias":"JS_VIDIBLE","mimePattern":"/javascript/i","domainPattern":"/https?:\\\\/\\\\/[^\\\\/]*vidible\\\\.tv/","contentPattern":"/vpaidAd.initAd = function/"},{"name":"JSON","alias":"JSON_TIKTOK_FEED","mimePattern":"/javascript/i","contentPattern":"/ItemModule.*[^adLabelVersion]adLabelVersion/"}],"videoValidatorsForXHR":[{"name":"XML_URLENCODED","alias":"YT_XML_EMBED","mimePattern":"/urlencoded/i","domainPattern":"/https:\\\\/\\\\/www\\\\.youtube\\\\.com\\\\/get_video_info/","contentPattern":"/vast|vmap/m","transform":"content => window.atob(content)"},{"name":"XML","alias":"XML_FREEWHEEL","mimePattern":"/xml/i","contentPattern":"/adResponse/m"},{"name":"XML","alias":"IAB_XML","mimePattern":"/xml/i","contentPattern":"/VAST|VMAP/m"},{"name":"XML","alias":"XML_INNOVID","mimePattern":"/xml/i","domainPattern":"/https?:\\\\/\\\\/[^\\\\/]*innovid\\\\.com/","contentPattern":"/extension-config-url|placement-config/"},{"name":"JSON","alias":"JSON_UPLYNK","mimePattern":"/json/i","contentPattern":"/(\\"is_ad\\"\\\\W*?1)((.|\\\\n|\\\\t|\\\\r)*?)(\\"ad_data\\")/m","domainPattern":"/https?://.{0,30}?(uplynk\\\\.com)\\\\/.*/i"},{"name":"JSON","alias":"YT_JSON_NEXTPAGE","mimePattern":"/json/i","domainPattern":"/^https?:\\\\/\\\\/www\\\\.youtube\\\\.com\\\\/watch\\\\?v=.+$/"},{"name":"JSON","alias":"YT_JSON_NEXTPAGE_PLAYER","mimePattern":"/json/i","domainPattern":"/^https?:\\\\/\\\\/www\\\\.youtube\\\\.com\\\\/youtubei\\\\/v1\\\\/player\\\\?key=/","contentPattern":"/adPlacements/"},{"name":"JSON","alias":"YT_MIDROLL_INFO","mimePattern":"/xml|json/i","domainPattern":"/(https?:\\\\/\\\\/((www|m)\\\\.){0,1}(youtube|youtube-nocookie)\\\\.com\\\\/get_midroll_info)|(https?:\\\\/\\\\/((www|m)\\\\.){0,1}youtube\\\\.com\\\\/youtubei\\\\/v1\\\\/player\\\\/ad_break[?]key=)/"},{"name":"JSON","alias":"JSON_NHL","mimePattern":"/json/i","contentPattern":"/flashAdTag|html5AdTag/m"},{"name":"JSON","alias":"JSON_TIKTOK_FEED","mimePattern":"/application\\\\/json/i","domainPattern":"/(tiktok\\\\.com\\\\/api\\\\/recommend\\\\/)|(tiktok\\\\.com\\\\/api\\\\/topic\\\\/)item_list\\\\/\\\\?/","contentPattern":"/itemList/i"},{"name":"JSON","alias":"IAB_JSON","mimePattern":"/json/i","domainPattern":"/^((?!tiktok).)*$/","contentPattern":"/VAST|VMAP/m"}],"facebookConfig":{"FB_CONTENT":"div[id^=\\"mount_\\"]","VIDEO_URL_BY_PATTERN":{"PATTERN":"https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/[ADVERTISER_NAME]/videos/[VIDEO_ID]/&show_text=false&t=0","REGEX_ADVERTISER_NAME":"pg/([^&/]+)","REGEX_VIDEO_ID":"[?&]v=([^&]+).*$","REGEX_VIDEO_SRC":"(?:(\\"hd\\\\_src\\\\_no\\\\_ratelimit\\"\\\\:( |)\\"|\\"hd\\\\_src\\"\\\\:( |)\\"|\\"sd\\\\_src\\\\_no\\\\_ratelimit\\"\\\\:( |)\\"))(.[^,\\"]+)","MAP_REPLACE_UNICODE":[["u0025","%"]]},"TAGS_FOR_LOADING_CHECK":"img, video, svg","FEED_PAGE":{"MIN_IMGS_SPACE_PERCENTAGE":6,"INVALID_PATHS":["/marketplace","/watch"],"FEED_QUERIES":["div[role=\\"feed\\"] > div:not([class])","div[role=\\"main\\"] div>span>span>span>span","div[role=\\"main\\"] span[id=\\"ssrb_feed_start\\"]"],"POSTS_QUERY":"div[role=\\"feed\\"] > div, div[role=\\"feed\\"] > span > div","MIN_HEIGHT":1400,"COVER_IMAGE_QUERY":"div[data-instancekey] img"},"FEED_WATCH_PAGE":{"MIN_IMGS_SPACE_PERCENTAGE":6,"FEED_WATCH_QUERIES":["div[role=\\"main\\"] div[class] > div[class] > div:not([class]) > div:not([class]) > div[class] > div[class] > div:not([class])"],"COVER_IMAGE_QUERY":"div > img[referrerpolicy]"},"SPONSORED_TEXTS":["Sponsored","مُموَّل","赞助内容","贊助","Sponzorováno","May Sponsor","Sponsorisé","Gesponsert","प्रायोजित","Bersponsor","Patrocinado","Publicidad","ได้รับการสนับสนุน","Sponsorlu","Được tài trợ","Реклама","La maalgeliyey","Geborg","Sponsor dəstəkli","Ditaja","Disponsori","Sponzorirano","Paeroniet","Patrocinat","Spunsurizatu","Noddwyd","Sponsoreret","Sponsitud","pəɹosuodS","Reklamo","Babestua","Commandité","Sponsore","Yoɓanaama","Stuðlað","Urraithe","Oñepatrosinapyre","Daukar Nauyi","Plaćeni oglas","Icyamamaza ndasukirwaho","Sponsorizzato","Imedhaminiwa","Peye","Sponsorkirî","Apmaksāta reklāma","Remiama","Hirdetés","Misy Mpiantoka","Sponsorjat","Gesponsord","Sponset","Sponsa","Reklama","Sponsorowane","Sponsorizat","Patronadu de:","Zvabhadharirwa","Sponsorizuar","Sponzorované","Sponzorirano","Sponsoroitu","Sponsrad","Sponsorıdû","Kostað","Szpōnzorowane","Χορηγούμενη","Рэклама","Спонсорирано","Спонзорирано","Ивээн тэтгэсэн","Хәйрияче","Демөөрчүлөнгөн","Демеушілік көрсеткен","Գովազդային","ממומן","سپانسرڈ","دارای پشتیبانی مالی","تمويل شوي","پاڵپشتیکراو","ܒܘܕܩܐ ܡܡܘܘܢܐ","পৃষ্ঠপোষকতা কৰা","সৌজন্যে","ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ","પ્રાયોજિત","ପ୍ରଯୋଜିତ","விளம்பரம்","ప్రాయోజితం చేయబడింది","ಪ್ರಾಯೋಜಿತ","സ്പോൺസർ ചെയ്തത്","අනුග්‍රාහක","ได้รับการสนับสนุน","ຜູ້ສະໜັບສະໜູນ","အခပေးကြော်ငြာ","რეკლამა","የተከፈለበት ማስታወቂያ","បានឧបត្ថម្ភ","ⵉⴷⵍ","贊助","広告","Paid for by","Paid Partnership"],"POSSIBLE_SPONSORED_TEXT_QUERIES":["svg>use[*|href]:not([href])","a[role=\\"link\\"]","a[href^=\\"/ads/about\\"]","div[role=\\"button\\"]:not([aria-haspopup=\\"menu\\"])"],"XLING_HREF_ATTRIBUTE_FOR_SVG":"xlink:href","VISIBLE_SPANS_TEXT":"span,div","ABOUT_SECTION_CONFIG":{"LOAD_ABOUT_PAGE":true,"QUERY_ABOUT_PAGE_HREF":"object[type=\'nested/pressable\'] a[href], h4 a[href]","HREF_PREFIX":"https://www.facebook.com/","HREF_PREFIX_WATCH":"a[href^=\\"/watch/\\"]","HREF_TEMPLATE_WATCH":"https://www.facebook.com/watch/","ABOUT_PAGE_TEMPLATE":"https://www.facebook.com/pg/%1/about/","ABOUT_PAGE_BAD_WORDS_MATCHES":["facebook.com/stories/","//l.facebook.com/l.php?"],"CONTENT_CHECK_STRING":"((page_about_fields)|(about_app_sections))","HEADERS":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"},"ADVERTISER_LINK_INSTREAM_QUERIES":["\\"website\\":\\".[^\\"]*\\"","\\"text\\":\\".[^}]*\\\\}\\\\,\\"field\\\\_type\\"\\\\:\\"website\\"",",\\"text\\":\\"Website\\".[^\\"]*\\"link_url\\":\\".[^\\"]*"],"CHROME_SECTIONS":{"SECTION_ZONE_DETECTOR":"</body></html>","CONTENT_CHECK_STRING":">About</div>","SECTION_START":"bigPipe.beforePageletArrive(\\"PagesProfileAboutInfoPagelet_","SECTION_END":"function(bigPipe){bigPipe.beforePageletArrive"},"FIREFOX_SECTIONS":{"CONTENT_CHECK_STRING":">About</div>","SECTION_START sectionStart":"bigPipe.beforePageletArrive(\\"PagesProfileAboutInfoPagelet_","SECTION_END sectionEnd":"function(bigPipe){bigPipe.beforePageletArrive"}},"MARKETPLACE_ADS_CONFIG":{"CONTAINER":"div[role=\\"main\\"]","CARDS":"div[class] > span:not([class]):not([id]):not([aria-hidden])","SPONSOR_BLOCKS":"a[href^=\\"/ads/about\\"]","SATELITE_SPONSORED_STRING":"a[role=link] > span","MIN_IMGS_SPACE_PERCENTAGE":15,"PREV_SIBLING_SPONSOR_BLOCK_QUERY_PATH":["parentElement","parentElement","previousSibling","querySelector,a[href^=\\"/ads/about\\"]"],"COVER_IMAGE_QUERY":"div[data-instancekey] img"},"RIGHT_COLUMN_ADS_CONFIG":{"CONTAINER":"div[role=\\"complementary\\"]","CARDS":"*[role=\\"complementary\\"] div[class] > div:not([class]) > div:not([class])","SATELITE_SPONSORED_STRING":"h3[dir=\\"auto\\"] > div","IF_AD":"a","MIN_IMGS_SPACE_PERCENTAGE":15,"IMPOSSIBLE_HREF_REG_FOR_AD":"friends/requests"},"optionsForDetectorRightColumn":{"detectorName":"FacebookAds:RightColumn","firstDetectionAfterActivationTimeoutMs":300,"secondDetectionAfterActivationTimeoutMs":900,"detectionIntervalMs":1000,"minTimeAfterLastDetectionMs":500,"useObserver":true,"observerNodesChecksMaxAmount":20,"observerNodesCheckIntervalMs":300,"maxActualizeDetectorWaitTimeMs":60000,"extractAdStaticPartTimeoutMs":1500,"extractAdRandomPartTimeoutMs":500},"optionsForDetectorFeed":{"detectorName":"FacebookAds:Feed","firstDetectionAfterActivationTimeoutMs":300,"secondDetectionAfterActivationTimeoutMs":900,"detectionIntervalMs":1000,"minTimeAfterLastDetectionMs":500,"useObserver":true,"observerNodesChecksMaxAmount":20,"observerNodesCheckIntervalMs":300,"maxActualizeDetectorWaitTimeMs":60000,"extractAdStaticPartTimeoutMs":1500,"extractAdRandomPartTimeoutMs":500,"attributeWithSponsorAlly":"aria-label"},"optionsForDetectorWatch":{"detectionIntervalMs":1000,"detectorName":"FacebookAds:FeedWatch","extractAdRandomPartTimeoutMs":500,"extractAdStaticPartTimeoutMs":1500,"firstDetectionAfterActivationTimeoutMs":300,"maxActualizeDetectorWaitTimeMs":60000,"minTimeAfterLastDetectionMs":500,"observerNodesCheckIntervalMs":300,"observerNodesChecksMaxAmount":20,"secondDetectionAfterActivationTimeoutMs":900,"useObserver":true,"attributeWithSponsorAlly":"aria-label"},"optionsForDetectorMarketplace":{"detectorName":"FacebookAds:Marketplace","firstDetectionAfterActivationTimeoutMs":300,"secondDetectionAfterActivationTimeoutMs":900,"detectionIntervalMs":1000,"minTimeAfterLastDetectionMs":500,"useObserver":true,"observerNodesChecksMaxAmount":20,"observerNodesCheckIntervalMs":300,"maxActualizeDetectorWaitTimeMs":60000,"extractAdStaticPartTimeoutMs":1500,"extractAdRandomPartTimeoutMs":500,"urlValidationByKeyWord":"/marketplace"},"videoDetectorConfigNew":{"PARSERS":[{"TYPE":"XML_HTTP_REQUEST","VIDEO_ID":"\\"videoId\\":(\\\\s|)\\"(.[^\\"]*)","VIDEO_HD_URL":"\\"playable_url\\":(\\\\s|)\\"(.[^\\"]*)","VIDEO_SD_URL":null,"VIDEO_AUDIO_URL":"\\"audio\\":(\\\\s|)\\\\[\\\\{\\"url\\":(\\\\s|)\\"(.[^\\"]*)","THUMBNAIL":"\\"thumbnailImage\\":(\\\\s|){\\"uri\\":(\\\\s|)\\"(.[^\\"]*)","LINK_DISPLAY":"\\"link_display\\":(\\\\s|)\\"(.[^\\"]*)","CHECKER":[]},{"TYPE":"INSTREAM_CONFIG","PATH_NODES":["data","viewer","instream_video_ads","edges"],"PATH_ALL_VIDEO":["extensions","all_video_dash_prefetch_representations"],"PATH_VIDEO_ID":["node","attachments",0,"target","id"],"PATH_TARGET_URL":["node","attachments",0,"action_links"],"PATH_USER_ID":["node","actors",0,"id"],"ALIAS":"JSON_FB","CHECKER":["playable_url"]},{"TYPE":"SCRIPT","VIDEO_ID":"\\"videoId\\":(\\\\s|)\\"(.[^\\"]*)","VIDEO_HD_URL":"\\"playable_url\\":(\\\\s|)\\"(.[^\\"]*)","VIDEO_SD_URL":null,"VIDEO_AUDIO_URL":"\\"audio\\":(\\\\s|)\\\\[\\\\{\\"url\\":(\\\\s|)\\"(.[^\\"]*)","THUMBNAIL":"\\"preferred_thumbnail\\":(\\\\s|)\\\\{\\"image\\":(\\\\s|)\\\\{\\"uri\\":(\\\\s|)\\"(.[^\\"]*)","LINK_DISPLAY":"\\"link_display\\":(\\\\s|)\\"(.[^\\"]*)","CHECKER":[]},{"TYPE":"MARKETPLACE_VIDEO_AD","PATH_AUDIO_URL":[["extensions","prefetch_dash_segments",0,"audio",0,"url"],["extensions","prefetch_dash_segments",0,"audio",0,"url"]],"PATH_VIDEO_URL":[["data","node","story","attachments",0,"media","playable_url"],["data","marketplace_home_feed","edges",0,"node","story","attachments",0,"media","playable_url"]],"PATH_VIDEO_ID":[["data","node","story","attachments",0,"media","id"],["data","marketplace_home_feed","edges",0,"node","story","attachments",0,"media","id"]],"PATH_THUMBNAIL":[["data","node","story","actors",0,"logo","uri"],["data","marketplace_home_feed","edges",0,"node","story","attachments",0,"media","thumbnailImage","uri"]],"PATH_LOGO":[["data","marketplace_home_feed","edges",0,"node","story","actors",0,"logo","uri"]],"PATH_NAME":[["data","marketplace_home_feed","edges",0,"node","story","actors",0,"name"]],"CHECKER":["playable_url","MarketplaceFeedAdStory"]},{"TYPE":"FEED_VIDEO_AD","PATH_VIDEO_URL":[["data","node","comet_sections","content","story","attachments",0,"styles","attachment","media","playable_url"],["data","viewer","news_feed","edges",0,"node","comet_sections","content","story","attachments",0,"styles","attachment","media","playable_url"],["data","node","feed_unit","attachments",0,"media","playable_url"],["data","node","section_components","edges",0,"node","feed_unit","attachments",0,"media","playable_url"]],"PATH_VIDEO_ID":[["data","node","comet_sections","content","story","attachments",0,"styles","attachment","media","videoId"],["data","viewer","news_feed","edges",0,"node","comet_sections","content","story","attachments",0,"styles","attachment","media","videoId"],["data","node","feed_unit","attachments",0,"media","videoId"],["data","node","section_components","edges",0,"node","feed_unit","attachments",0,"media","videoId"]],"PATH_THUMBNAIL":[["data","node","comet_sections","content","story","attachments",0,"styles","attachment","media","preferred_thumbnail","image","uri"],["data","viewer","news_feed","edges",0,"node","comet_sections","content","story","attachments",0,"styles","attachment","media","preferred_thumbnail","image","uri"],["data","node","feed_unit","attachments",0,"media","preferred_thumbnail","image","uri"],["data","node","section_components","edges",0,"node","feed_unit","attachments",0,"media","preferred_thumbnail","image","uri"]],"PATH_USER_NAME":[["data","node","comet_sections","content","story","actors",0,"name"],["data","viewer","news_feed","edges",0,"node","comet_sections","content","story","actors",0,"name"],["data","node","feed_unit","actors",0,"name"],["data","node","section_components","edges",0,"node","feed_unit","actors",0,"name"]],"CHECKER":["playable_url"]}],"PARSER_CONFIG":{"LISTEN_HTTP_REQUESTS":true,"SCRIPT":{"USE":true,"SEPARATOR":"\\"category\\"","INTERVAL_MS":5000},"XML_HTTP_REQUEST":{"USE":true,"SEPARATOR":"\\"category\\"","MATCH_URLS":["/api/graphql/"]},"FEED_VIDEO_AD":{"USE":true,"SEPARATOR":null,"HEADERS":{"x-fb-friendly-name":["CometVideoHomeFeedSectionPaginationQuery","CometNewsFeedPaginationQuery"]}},"INSTREAM_CONFIG":{"USE":true,"SEPARATOR":null,"HEADERS":{"x-fb-friendly-name":"useInstreamAdsFetcherQuery"},"FILTER_DATA":false},"MARKETPLACE_VIDEO_AD":{"USE":true,"SEPARATOR":null,"HEADERS":{"x-fb-friendly-name":["MarketplaceCometBrowseFeedLightPaginationQuery","MarketplaceCometBrowseFeedLightContainerQuery"]}}},"MATCH_URLS":["/api/graphql/"],"MATCH_HEADERS":{"x-fb-friendly-name":["useInstreamAdsFetcherQuery","MarketplaceCometBrowseFeedLightPaginationQuery","MarketplaceCometBrowseFeedLightContainerQuery","CometNewsFeedPaginationQuery","CometVideoHomeFeedSectionPaginationQuery"]}},"statistic":{"sendNotFullFeedVideoAds":false,"sendFakeAdFromNewDesign":false}},"twitterConfig":{"PROMOTED_ALIASES":["Реклама","Promoted","מקודם","مُروَّج","বিজ্ঞাপিত","Sustatua","Спонсорирано","Được quảng bá","Patrocinat","Promoveret","Uitgelicht","Mainostettu","Sponsorisé","Patrocinado","Gesponsert","Προωθημένο","પ્રચાર કરાયેલું","प्रचारित","Ajánlott","Dipromosikan","Urraithe","Sponsorizzato","プロモーション","ಪ್ರಾಯೋಜಿತ","프로모션 중","Dipromosikan","प्रमोटेड","Promotert","تبلیغی","Promowane","Promovido","Promovat","Промовисано","推廣","Sponzorovaný","Promocionado","Sponsrad","விளம்பரப்படுத்தப்பட்டது","ประชาสัมพันธ์","Sponsorlu","تشہیر شدہ","Được quảng bá"],"PROMOTED_SELECTOR":"div > svg ~ div > span","PROGRESS_SELECTOR":"div[role=\\"progressbar\\"]","FEED_CONTAINER":"section[role=\\"region\\"]","RIGHT_COLUMN_CONTAINER":"aside[role=\\"complementary\\"]","FEED_TWEETS_SELECTOR":"*[data-testid=\\"tweet\\"]:not([bis_size])","RIGHT_COLUMN_WHO_TO_FOLLOW_SELECTOR":"*[data-testid=\\"sidebarColumn\\"]:not([bis_size]) *[role=\\"complementary\\"]:not([bis_size]) *[data-testid=\\"UserCell\\"]:not([bis_size])","FEED_WHO_TO_FOLLOW_SELECTOR":"*[data-testid=\\"primaryColumn\\"]:not([bis_size]) *[data-testid=\\"UserCell\\"]:not([bis_size])","LOAD_USER_DATA":true,"API_CALL_GUEST":"https://api.twitter.com/1.1/guest/activate.json","API_CALL_SCREEN_NAME":"https://api.twitter.com/graphql/E4iSsd6gypGFWx2eUhSC1g/UserByScreenName?variables=%7B%22screen_name%22%3A%22${%1}%22%2C%22withHighlightedLabel%22%3Atrue%7D","AUTH_BEARER":"Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA","FEED_MIN_IMGS_SPACE_PERCENTAGE":7,"FEED_WHO_TO_FOLLOW_MIN_IMGS_SPACE_PERCENTAGE":1,"RIGHT_COLUMN_MIN_IMGS_SPACE_PERCENTAGE":6,"TAGS_FOR_LOADING_CHECK":"img, video","TAGS_FOR_VIDEO_TWEET_CHECK":"div[role=\\"button\\"][aria-label=\\"Play\\"]>div>svg, video[aria-label]","CHECK_IF_CAROUSEL_QUERY":"ul[role=\\"list\\"] > li[role=\\"listitem\\"]","MIN_AMOUNT_OF_WORDS_FOR_MATCHING":3,"MIN_MATCHING_WORD_LENGTH":3,"MAX_CANDIDATES_TO_SEND":3,"MAX_VIDEO_DATA_KEEP_IN_STORAGE":200,"VIDEO_TRAFFIC_DETECTOR":{"parsers":[{"watch":"https://(api\\\\.|)twitter.com/(i/api/|)2/timeline/home.json","pipes":[{"name":"parseJSON","arguments":null},{"name":"jsonQuery","arguments":{"query":"globalObjects.tweets[* #select(id_str as id, full_text)].card.binding_values.unified_card.string_value","queries":["globalObjects.tweets[* #select(id_str as id, full_text)].card.binding_values.unified_card.string_value","globalObjects.tweets[* #select(id_str as id, full_text)].extended_entities.media"],"prop":"string_value"}},{"name":"arrToVal","arguments":{"prop":"string_value"}},{"name":"filterContains","arguments":{"prop":"string_value","text":"video_website","types":["video_website","video","animated_gif"]}},{"name":"mapParseJsonToObj","arguments":{"prop":"string_value"}},{"name":"mapVideoData","arguments":null},{"name":"forEach","arguments":{"pipe":"sendVideoData"}}]},{"watch":"https?://twitter\\\\.com/i/api/graphql/.[^/]*/HomeLatestTimeline","pipes":[{"name":"parseJSON","arguments":null},{"name":"jsonQuery","arguments":{"queries":["data.home.home_timeline_urt.instructions[*].entries[* #select(content.itemContent.tweet_results.result.rest_id as id, content.itemContent.tweet_results.result.legacy.full_text as full_text)].content.itemContent.tweet_results.result.card.legacy.binding_values","data.home.home_timeline_urt.instructions[*].entries[* #select(content.itemContent.tweet_results.result.rest_id as id, content.itemContent.tweet_results.result.legacy.full_text as full_text)].content.itemContent.tweet_results.result.legacy.extended_entities.media"],"prop":"binding_values","props":[["binding_values",["unified_card"]],["media",["video_info","type"]]]}},{"name":"arrToVal","arguments":{"prop":"string_value","total_prop":"string_value","props":[["binding_values",["string_value"]],["entries",["full_text","id"]],["media",["video_info","type"]]]}},{"name":"filterContains","arguments":{"prop":"string_value","text":"video_website","types":["video_website","video","animated_gif"],"props":["string_value","video_info"]}},{"name":"mapParseJsonToObj","arguments":{"prop":"string_value"}},{"name":"mapVideoData","arguments":{"props":["full_text","id"]}},{"name":"forEach","arguments":{"pipe":"sendVideoData"}}]},{"watch":"https?://twitter\\\\.com/i/api/graphql/.[^/]*/HomeTimeline","pipes":[{"name":"parseJSON","arguments":null},{"name":"jsonQuery","arguments":{"queries":["data.home.home_timeline_urt.instructions[*].entries[* #select(content.itemContent.tweet_results.result.rest_id as id, content.itemContent.tweet_results.result.legacy.full_text as full_text)].content.itemContent.tweet_results.result.card.legacy.binding_values","data.home.home_timeline_urt.instructions[*].entries[* #select(content.itemContent.tweet_results.result.rest_id as id, content.itemContent.tweet_results.result.legacy.full_text as full_text)].content.itemContent.tweet_results.result.legacy.extended_entities.media"],"prop":"binding_values","props":[["binding_values",["unified_card"]],["media",["video_info","type"]]]}},{"name":"arrToVal","arguments":{"prop":"string_value","props":[["binding_values",["string_value"]],["entries",["full_text","id"]],["media",["video_info","type"]]]}},{"name":"filterContains","arguments":{"prop":"string_value","text":"video_website","types":["video_website","video","animated_gif"],"props":["string_value","video_info"]}},{"name":"mapParseJsonToObj","arguments":{"prop":"string_value"}},{"name":"mapVideoData","arguments":{"props":["full_text","id"]}},{"name":"forEach","arguments":{"pipe":"sendVideoData"}}]},{"watch":"https?://api\\\\.twitter\\\\.com/graphql/.[^/]*/HomeTimeline","pipes":[{"name":"parseJSON","arguments":null},{"name":"jsonQuery","arguments":{"queries":["data.home.home_timeline_urt.instructions[*].entries[* #select(content.itemContent.tweet_results.result.rest_id as id, content.itemContent.tweet_results.result.legacy.full_text as full_text)].content.itemContent.tweet_results.result.legacy.extended_entities.media","data.home.home_timeline_urt.instructions[*].entries[* #select(content.itemContent.tweet_results.result.rest_id as id, content.itemContent.tweet_results.result.legacy.full_text as full_text)].content.itemContent.tweet_results.result.card.legacy.binding_values"],"props":[["media",["type","video_info"]],["binding_values",["unified_card"]]]}},{"name":"arrToVal","arguments":{"props":[["media",["type","video_info"]],["entries",["full_text","id"]],["binding_values",["string_value"]]]}},{"name":"filterContains","arguments":{"prop":"string_value","text":"video_website","types":["video_website","video","animated_gif"],"props":["string_value","video_info"]}},{"name":"mapParseJsonToObj","arguments":{"prop":"string_value"}},{"name":"mapVideoData","arguments":{"props":["full_text","id"]}},{"name":"forEach","arguments":{"pipe":"sendVideoData"}}]}]}},"redditConfig":{"FEED_CONTAINER":{"IMG_SPACE_PERCENTAGE":7,"PROMOTED_ALIASES":["patrocinado","promoted","gesponsort","patrocinado","promocionado","promue","promozione","sponsorisé"],"PROMOTED_SELECTOR":"span:not([class]):not([id])","QUERY":"div:not([id=\\"2x-container\\"]):not([data-testid=\\"frontpage-sidebar\\"]):not([data-testid=\\"subreddit-sidebar\\"])","QUERY_TO_EXCLUDE":"input[name=\\"createPost\\"],button[role=\\"menuitem\\"]","TOP_DISTANCE":150},"COMMENT_PAGE_CONTAINER":{"IMG_SPACE_PERCENTAGE":0.17,"MIN_HEIGHT":500,"PROMOTED_ALIASES":["patrocinado","promoted","gesponsort","patrocinado","promocionado","promue","promozione","sponsorisé"],"PROMOTED_SELECTOR":"span:not([class]):not([id])","QUERY_IF_PAGE":"div[class]:not([id]):not([data-testid=\\"frontpage-sidebar\\"]):not([data-testid=\\"subreddit-sidebar\\"])","QUERY_IF_POPUP":"div[id=\\"overlayScrollContainer\\"] div[class]:not([id]):not([data-testid=\\"frontpage-sidebar\\"]):not([data-testid=\\"subreddit-sidebar\\"])","TOP_DISTANCE":120,"TEXT_FROM_HREF":"/comments/","QUERY_IS_POPUP":"div[id=\\"overlayScrollContainer\\"]"},"NECESSARY_STYLES":{"BY_DATA_ATTRIBUTE":[{"KEY":"href","ALL_STYLES_FROM":["chunkCSS/reddit-components-LargePost.","chunkCSS/Reddit~reddit-components-ClassicPost~reddit-components-CompactPost~reddit-components-LargePost~reddi~","chunkCSS/Reddit~StandalonePostPage~reddit-components-ClassicPost~reddit-components-CompactPost~reddit-compone~","chunkCSS/ChatPost~CollectionCommentsPage~CommentsPage~EconTopAwardersModal~ModQueuePages~ModerationPages~","chunkCSS/CollectionCommentsPage~CommentsPage~ModerationPages~ProfileComments~ProfileOverview~ProfilePrivate~","chunkCSS/CollectionCommentsPage~CommentsPage~CountryPage~FramedGild~GildModal~GovernanceReleaseNotesModal~","chunkCSS/CollectionCommentsPage~CommentsPage~ProfileComments~ProfileOverview~ProfilePrivate~StandalonePostPag~"],"FEED_PAGE":["chunkCSS/Governance~Reddit~Subreddit~reddit-components-ClassicPost~reddit-components-CompactPost~reddit-compo~","chunkCSS/CollectionCommentsPage~CommentsPage~ModerationPages~PostCreation~ProfileComments~ProfileOverview~","chunkCSS/CollectionCommentsPage~CommentsPage~ProfileComments~ProfileOverview~ProfilePrivate~RpanListingUnit","chunkCSS/CollectionCommentsPage~CommentsPage~CountryPage~Frontpage~GovernanceReleaseNotesModal~ModListing~","chunkCSS/CollectionCommentsPage~CommentsPage~ModQueuePages~ModerationPages~PostCreation~ProfileComments~Profi~","chunkCSS/CollectionCommentsPage~CommentsPage~CountryPage~GovernanceReleaseNotesModal~ModerationPages~","chunkCSS/CollectionCommentsPage~CommentsPage~EconTopAwardersModal~ModQueuePages~ModerationPages~PostCreation~~"],"COMMENT_PAGE":["chunkCSS/Governance~Reddit~Subreddit","chunkCSS/CommentsPage"]}],"BY_QUERIES_RULES":["\\\\@font-face( |)\\\\{.[^\\\\}]*\\\\}","\\\\.icon\\\\-(upvote|downvote|comment|award|share|save)\\\\:before( |)\\\\{.[^}]*\\\\}","\\\\.icon\\\\:before( |)\\\\{.[^}]*\\\\}","\\\\.icon\\\\..[^{]*( |)\\\\{.[^}]*\\\\}"],"BY_CLASS_NAME":[{"CLASS_NAME_CHILD":".icon-save","STYLES":"{-ms-flex-align: center;align-items: center;display: -ms-flexbox;display: flex;-ms-flex-direction: row;flex-direction: row;text-align: left;width: 100%}","DEEP_LEVEL":"2","INDEX_OF_CLASS":0},{"CLASS_NAME_CHILD":".icon-save","STYLES":"{margin-right: 6px;}","DEEP_LEVEL":"1","INDEX_OF_CLASS":0}],"BY_TAG_NAME":[{"TAG_NAME":"link","ATTRIBUTE_NAME":"href","ATTRIBUTE_REGEX_VALUE":["^https?\\\\://.*\\\\.css$"]}]},"IS_ACTIVE_GET_SLIDES_SRC":true,"PROGRESS_SELECTOR":"img[src=\\"https://www.redditstatic.com/desktop2x/img/loading.gif\\"]","QUERY_CHECK_READY_AD_CELLS":"a[data-testid=\\"post_author_link\\"], div[data-before-content], div[data-adclicklocation=\\"top_bar\\"] img","RIGHT_COLUMN_CONTAINER":{"IMG_SPACE_PERCENTAGE":7,"PATH_WITH_AD_URL":"^https?\\\\://gateway\\\\.reddit\\\\.com/desktopapi/v1/sidebar_insertion","PROMOTED_ALIASES":["anuncio","advertisement","werbung","publicité","pubblicità","anúncio","publicidade","patrocinado","promoted","gesponsort","patrocinado","promocionado","promue","promozione","sponsorisé"],"PROMOTED_SELECTOR":"div[data-before-content], span:not([class]):not([id])","QUERY":"div[data-testid=\\"frontpage-sidebar\\"], div[data-testid=\\"subreddit-sidebar\\"]"},"TAGS_FOR_LOADING_CHECK":"img, video, img[alt=\\"User avatar\\"], div[data-testid=\\"comments-page-ad-thumbnail\\"] a[data-testid] > div[data-adclicklocation=\\"media\\"][role=\\"img\\"]","TAGS_FOR_TEXT_AD_CHECK":"div[data-click-id=\\"text\\"]","TAGS_FOR_VIDEO_CHECK":"div[data-click-id=\\"media\\"] video","VIDEO_TRAFFIC_DETECTOR":{"VIDEO_ID_REGEX":"(?<=v\\\\.redd\\\\.it/)(.*)(?=/DASHPlaylist.*)","VIDEO_MPD_URL_CHECK":"^https?\\\\://v\\\\.redd\\\\.it/.*/DASHPlaylist\\\\.mpd\\\\?"}},"bannerAdsConfig":{"QUERIES":{"FULL_IMG_COLLECTION":"A[href]:not([bis_size]) > img[src]:not([bis_size])","ON_EVENT_IMG_COLLECTION":"img[onclick][onload][src]:not([bis_size])"}},"HTML5AdsConfig":{"QUERIES":{"IFRAMES_COLLECTION":"iframe[src]:not([bis_size]):not([allowfullscreen]), iframe[srcdoc]:not([bis_size]):not([allowfullscreen]), iframe[aria-label=\\"Advertisement\\"]:not([bis_size]):not([allowfullscreen]), frame[src]:not([bis_size]):not([allowfullscreen]), frame[srcdoc]:not([bis_size]):not([allowfullscreen])","ACCEPTABLE_NODES_IN_IFRAME":"a[href], iframe, frame","UNACCEPTABLE_NODES_IN_IFRAME":"textarea, input[type=\\"email\\"]"}},"skinAdsConfig":{"QUERIES":{"FULL_HREF_COLLECTION":"A[href]:not([bis_skin_checked]):not([href=\\"#\\"]):not([href=\\"\\"]):not([href=\\"/\\"])","FULL_DIV_COLLECTION":"div:not([bis_skin_checked])"}},"adBlockInspectorConfig":{"active":true,"needsActiveAgentIntervalSec":50,"agentActivationTimeoutSec":5,"adRemovingTimeoutSec":2,"detectionClassName":"adsbox ads ad adsbox doubleclick ad-placement carbon-ads"},"useSensitiveDataFilter":true,"html5TargetUrlDetectionConfig":{"WINDOW_TARGET_URL_PROPERTY_KEY_WORDS":["targeturl","clickurl","clicktag","destinationurl","trackingurl","finalurl","redirect_url"],"WINDOW_TARGET_URL_SEARCH_DEPTH_LEVEL":10,"TARGET_URL_CLICK_ELEMENTS_SELECTOR":"*[onclick]:not(a), div, button, gwd-taparea"}}';

/***/ }),

/***/ "./src/libs/lz-string.js":
/*!*******************************!*\
  !*** ./src/libs/lz-string.js ***!
  \*******************************/
/***/ ((module) => {

var LZString = function () {
  var f = String.fromCharCode;
  var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var baseReverseDic = {};

  function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
      baseReverseDic[alphabet] = {};

      for (var i = 0; i < alphabet.length; i++) {
        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
    }

    return baseReverseDic[alphabet][character];
  }

  var LZString = {
    compressToBase64: function compressToBase64(input) {
      if (input == null) return "";

      var res = LZString._compress(input, 6, function (a) {
        return keyStrBase64.charAt(a);
      });

      switch (res.length % 4) {
        default:
        case 0:
          return res;

        case 1:
          return res + "===";

        case 2:
          return res + "==";

        case 3:
          return res + "=";
      }
    },
    decompressFromBase64: function decompressFromBase64(input) {
      if (input == null) return "";
      if (input == "") return null;
      return LZString._decompress(input.length, 32, function (index) {
        return getBaseValue(keyStrBase64, input.charAt(index));
      });
    },
    compressToUTF16: function compressToUTF16(input) {
      if (input == null) return "";
      return LZString._compress(input, 15, function (a) {
        return f(a + 32);
      }) + " ";
    },
    decompressFromUTF16: function decompressFromUTF16(compressed) {
      if (compressed == null) return "";
      if (compressed == "") return null;
      return LZString._decompress(compressed.length, 16384, function (index) {
        return compressed.charCodeAt(index) - 32;
      });
    },
    compressToUint8Array: function compressToUint8Array(uncompressed) {
      var compressed = LZString.compress(uncompressed);
      var buf = new Uint8Array(compressed.length * 2);

      for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
        var current_value = compressed.charCodeAt(i);
        buf[i * 2] = current_value >>> 8;
        buf[i * 2 + 1] = current_value % 256;
      }

      return buf;
    },
    decompressFromUint8Array: function decompressFromUint8Array(compressed) {
      if (compressed === null || compressed === undefined) {
        return LZString.decompress(compressed);
      } else {
        var buf = new Array(compressed.length / 2);

        for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
          buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));
      }
    },
    compressToEncodedURIComponent: function compressToEncodedURIComponent(input) {
      if (input == null) return "";
      return LZString._compress(input, 6, function (a) {
        return keyStrUriSafe.charAt(a);
      });
    },
    decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(input) {
      if (input == null) return "";
      if (input == "") return null;
      input = input.replace(/ /g, "+");
      return LZString._decompress(input.length, 32, function (index) {
        return getBaseValue(keyStrUriSafe, input.charAt(index));
      });
    },
    compress: function compress(uncompressed) {
      return LZString._compress(uncompressed, 16, function (a) {
        return f(a);
      });
    },
    _compress: function _compress(uncompressed, bitsPerChar, getCharFromInt) {
      if (uncompressed == null) return "";
      var i,
          value,
          context_dictionary = {},
          context_dictionaryToCreate = {},
          context_c = "",
          context_wc = "",
          context_w = "",
          context_enlargeIn = 2,
          context_dictSize = 3,
          context_numBits = 2,
          context_data = [],
          context_data_val = 0,
          context_data_position = 0,
          ii;

      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);

        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;

        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }

              value = context_w.charCodeAt(0);

              for (i = 0; i < 8; i++) {
                context_data_val = context_data_val << 1 | value & 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = value >> 1;
              }
            } else {
              value = 1;

              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = 0;
              }

              value = context_w.charCodeAt(0);

              for (i = 0; i < 16; i++) {
                context_data_val = context_data_val << 1 | value & 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = value >> 1;
              }
            }

            context_enlargeIn--;

            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }

            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];

            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = value >> 1;
            }
          }

          context_enlargeIn--;

          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }

          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      }

      if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }

            value = context_w.charCodeAt(0);

            for (i = 0; i < 8; i++) {
              context_data_val = context_data_val << 1 | value & 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = value >> 1;
            }
          } else {
            value = 1;

            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = 0;
            }

            value = context_w.charCodeAt(0);

            for (i = 0; i < 16; i++) {
              context_data_val = context_data_val << 1 | value & 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = value >> 1;
            }
          }

          context_enlargeIn--;

          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }

          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];

          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;

            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }

            value = value >> 1;
          }
        }

        context_enlargeIn--;

        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
      }

      value = 2;

      for (i = 0; i < context_numBits; i++) {
        context_data_val = context_data_val << 1 | value & 1;

        if (context_data_position == bitsPerChar - 1) {
          context_data_position = 0;
          context_data.push(getCharFromInt(context_data_val));
          context_data_val = 0;
        } else {
          context_data_position++;
        }

        value = value >> 1;
      }

      while (true) {
        context_data_val = context_data_val << 1;

        if (context_data_position == bitsPerChar - 1) {
          context_data.push(getCharFromInt(context_data_val));
          break;
        } else context_data_position++;
      }

      return context_data.join('');
    },
    decompress: function decompress(compressed) {
      if (compressed == null) return "";
      if (compressed == "") return null;
      return LZString._decompress(compressed.length, 32768, function (index) {
        return compressed.charCodeAt(index);
      });
    },
    _decompress: function _decompress(length, resetValue, getNextValue) {
      var dictionary = [],
          next,
          enlargeIn = 4,
          dictSize = 4,
          numBits = 3,
          entry = "",
          result = [],
          i,
          w,
          bits,
          resb,
          maxpower,
          power,
          c,
          data = {
        val: getNextValue(0),
        position: resetValue,
        index: 1
      };

      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i;
      }

      bits = 0;
      maxpower = Math.pow(2, 2);
      power = 1;

      while (power != maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;

        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }

        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (next = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;

          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          c = f(bits);
          break;

        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;

          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          c = f(bits);
          break;

        case 2:
          return "";
      }

      dictionary[3] = c;
      w = c;
      result.push(c);

      while (true) {
        if (data.index > length) {
          return "";
        }

        bits = 0;
        maxpower = Math.pow(2, numBits);
        power = 1;

        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;

          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }

          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        switch (c = bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;

            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;

              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }

              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;

          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;

            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;

              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }

              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;

          case 2:
            return result.join('');
        }

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }

        if (dictionary[c]) {
          entry = dictionary[c];
        } else {
          if (c === dictSize) {
            entry = w + w.charAt(0);
          } else {
            return null;
          }
        }

        result.push(entry);
        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;
        w = entry;

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }
      }
    }
  };
  return LZString;
}();

module.exports = LZString;

/***/ }),

/***/ "./src/libs/panalytics-utility.js":
/*!****************************************!*\
  !*** ./src/libs/panalytics-utility.js ***!
  \****************************************/
/***/ (function(module, exports) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var PanalyticsUtility = function () {
  function PanalyticsUtility(config) {
    if (config === void 0) {
      config = {};
    }

    this.storageSyncKey = 'panalyticsid';
    this.userKeyCacheHeader = 'X-PANEL-USER-KEY';
    this.userKeySymbolsCount = 22;

    if (typeof config.host !== 'string') {
      throw 'Server host is undefined';
    }

    if (config.storageKey) {
      this.storageSyncKey = config.storageKey;
    }

    this.host = config.host;
    this.logging = !!config.logging;
    this.cacheResourceUrl = this.host + '/api/identity/cache';
    this.cookieResourceUrl = this.host + '/api/identity/cookie';
  }

  PanalyticsUtility.prototype.generateKey = function () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < this.userKeySymbolsCount; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.log('key generated locally: ' + result);
    return result;
  };

  PanalyticsUtility.prototype.setKey = function (value) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.globalSetter(value)];

          case 1:
            _a.sent();

            return [2];
        }
      });
    });
  };

  PanalyticsUtility.prototype.synchronize = function () {
    return __awaiter(this, void 0, void 0, function () {
      var key;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.loadKey()];

          case 1:
            key = _a.sent();
            return [4, this.globalSetter(key)];

          case 2:
            _a.sent();

            return [2];
        }
      });
    });
  };

  PanalyticsUtility.prototype.loadKey = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this_1 = this;

      return __generator(this, function (_a) {
        return [2, new Promise(function (resolve) {
          return __awaiter(_this_1, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!!key) return [3, 2];
                  return [4, this.cacheGetter()];

                case 1:
                  key = _a.sent();
                  _a.label = 2;

                case 2:
                  if (!!key) return [3, 4];
                  return [4, this.cookieGetter()];

                case 3:
                  key = _a.sent();
                  _a.label = 4;

                case 4:
                  if (!key) {
                    key = this.localStorageGetter();
                  }

                  resolve(key);
                  return [2];
              }
            });
          });
        })];
      });
    });
  };

  PanalyticsUtility.prototype.getKey = function (callback, sync) {
    this.getKeyAsync(sync).then(callback);
  };

  PanalyticsUtility.prototype.getKeyAsync = function (sync) {
    if (sync === void 0) {
      sync = true;
    }

    return __awaiter(this, void 0, void 0, function () {
      var key;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.loadKey()];

          case 1:
            key = _a.sent() || this.generateKey();
            if (!sync) return [3, 3];
            return [4, this.setKey(key)];

          case 2:
            _a.sent();

            _a.label = 3;

          case 3:
            return [2, key];
        }
      });
    });
  };

  PanalyticsUtility.prototype.localStorageGetter = function () {
    this.log('localStorageGetter: try to get ' + this.storageSyncKey + ' from localStorage.');
    var key = localStorage.getItem(this.storageSyncKey);

    if (key) {
      this.log('localStorageGetter: ' + this.storageSyncKey + ' has been found in localStorage. Value: ' + key);
    } else {
      this.log('localStorageGetter: ' + this.storageSyncKey + ' has not been found in localStorage.');
    }

    return key;
  };

  PanalyticsUtility.prototype.localStorageSetter = function (value) {
    this.log('localStorageSetter: ' + this.storageSyncKey + ' are going to be stored in localStorage.');
    localStorage.setItem(this.storageSyncKey, value);
  };

  PanalyticsUtility.prototype.cacheGetter = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this;

      var _this_1 = this;

      return __generator(this, function (_a) {
        this.log('CacheGetter: try to get ' + this.storageSyncKey + ' from cache.');
        _this = this;
        return [2, new Promise(function (resolve) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', _this_1.cacheResourceUrl);
          xhr.timeout = 1000;

          xhr.ontimeout = function () {
            _this.log('CacheGetter: Caching request is timed out.');

            resolve();
          };

          xhr.onload = function () {
            if (xhr.status === 200) {
              try {
                var responseValue = JSON.parse(xhr.response);
                var key = responseValue.userKey;

                if (key) {
                  _this.log('CacheGetter: ' + _this.storageSyncKey + ' has been found in cache. Value: ' + key);

                  resolve(key);
                } else {
                  resolve();
                }
              } catch (e) {
                _this.log('CacheGetter: Error occurred while retrieving ' + _this.storageSyncKey + ' from cache.');

                resolve();
              }
            } else {
              _this.log('CacheGetter: Caching request has been failed.');

              resolve();
            }
          };

          xhr.onerror = function () {
            resolve();
          };

          xhr.send();
        })];
      });
    });
  };

  PanalyticsUtility.prototype.cacheSetter = function (value) {
    var _this_1 = this;

    this.log('CacheSetter: ' + this.storageSyncKey + ' are going to be stored in cache.');

    var _this = this;

    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', _this_1.cacheResourceUrl);
      xhr.setRequestHeader(_this_1.userKeyCacheHeader, value);
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.responseType = 'json';
      xhr.send();

      xhr.onload = function () {
        if (xhr.status === 200) {
          _this.log('CacheSetter: Caching request to server has been succeeded.');

          resolve(value);
        } else {
          _this.log('CacheSetter: Caching request has been failed.');

          resolve();
        }
      };

      xhr.onerror = function () {
        resolve();
      };
    });
  };

  PanalyticsUtility.prototype.cookieGetter = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this;

      var _this_1 = this;

      return __generator(this, function (_a) {
        this.log('CookieGetter: try to get ' + this.storageSyncKey + ' from cookie.');
        _this = this;
        return [2, new Promise(function (resolve) {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("GET", _this_1.cookieResourceUrl);
          xhr.timeout = 5000;

          xhr.ontimeout = function () {
            _this.log('CookieGetter: Request is timed out.');

            resolve();
          };

          xhr.onload = function () {
            var key;

            if (xhr.status === 200) {
              try {
                var responseValue = JSON.parse(xhr.response);
                key = responseValue.userKey;

                if (key) {
                  _this.log('CookieGetter: ' + _this.storageSyncKey + ' has been found in cookie. Value:' + key);

                  resolve(key);
                } else {
                  _this.log('CookieGetter: ' + _this.storageSyncKey + ' has not been found in cookie. ');

                  resolve();
                }
              } catch (e) {
                _this.log('CookieGetter: Error occurred while retrieving ' + _this.storageSyncKey + ' from cookie.');

                resolve();
              }
            } else {
              _this.log('CookieGetter: Cookie request has been failed.');

              resolve();
            }
          };

          xhr.onerror = function () {
            resolve();
          };

          xhr.send();
        })];
      });
    });
  };

  PanalyticsUtility.prototype.cookieSetter = function (value) {
    var _this_1 = this;

    this.log('CookieSetter: ' + this.storageSyncKey + ' are going to be stored in cookie.');

    var _this = this;

    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('POST', _this_1.cookieResourceUrl + '?userKey=' + value);
      xhr.send();

      xhr.onload = function () {
        if (xhr.status === 200) {
          _this.log('CookieSetter: cookie request has been succeeded.');

          resolve(value);
        } else {
          _this.log('CookieSetter: cookie request has been failed.');

          resolve();
        }
      };

      xhr.onerror = function () {
        resolve();
      };
    });
  };

  PanalyticsUtility.prototype.cookieClear = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this;

      var _this_1 = this;

      return __generator(this, function (_a) {
        this.log('CookieClearer: ' + this.storageSyncKey + ' are going to be deleted.');
        _this = this;
        return [2, new Promise(function (resolve) {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open('DELETE', _this_1.cookieResourceUrl);
          xhr.send();

          xhr.onload = function () {
            if (xhr.status === 200) {
              _this.log('CookieClearer: cookie request has been succeeded.');

              resolve();
            } else {
              _this.log('CookieClearer: cookie request has been failed.');

              resolve();
            }
          };

          xhr.onerror = function () {
            resolve();
          };
        })];
      });
    });
  };

  PanalyticsUtility.prototype.globalSetter = function (value) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!value) {
              this.log('Value provided to global setter is invalid.');
              return [2];
            }

            this.localStorageSetter(value);
            return [4, this.cacheSetter(value)];

          case 1:
            _a.sent();

            return [4, this.cookieClear()];

          case 2:
            _a.sent();

            return [4, this.cookieSetter(value)];

          case 3:
            _a.sent();

            return [2];
        }
      });
    });
  };

  PanalyticsUtility.prototype.log = function (text) {
    if (this.logging) {}
  };

  return PanalyticsUtility;
}();

module.exports = PanalyticsUtility;

/***/ }),

/***/ "./src/libs/sensitive-data-filter.js":
/*!*******************************************!*\
  !*** ./src/libs/sensitive-data-filter.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
var rulesListEndpoint = '/api/privacy/data/rules/exclusions';
var valueReplacePattern = '*****';
var logPrefix = 'SensitiveDataFilter:';

var SensitiveDataFilter = function () {
  function SensitiveDataFilter(config) {
    if (typeof config.host !== 'string') {
      throw 'Server host is undefined';
    }

    this.host = config.host;
    this.logging = !!config.logging;
  }

  SensitiveDataFilter.prototype.init = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.updateRules()];

          case 1:
            _a.sent();

            return [2];
        }
      });
    });
  };

  SensitiveDataFilter.prototype.transformUrl = function (value) {
    var _this = this;

    if (!value || !this.rules || !this.rules.filters) {
      return value;
    }

    var tempUrl = new URL(value);
    var domain = tempUrl.host;

    if (tempUrl.password.length) {
      tempUrl.password = valueReplacePattern;
    }

    if (tempUrl.username.length) {
      tempUrl.username = valueReplacePattern;
    }

    var urlRules = this.rules.filters;
    urlRules.forEach(function (item) {
      if (!domain.match(item.domain)) {
        return;
      }

      tempUrl.pathname = _this.processFilterRules(item.rules, tempUrl.pathname);
      tempUrl.search = _this.processFilterRules(item.rules, tempUrl.search);
      tempUrl.hash = _this.processFilterRules(item.rules, tempUrl.hash);
    });
    var result = tempUrl.toString();

    if (this.logging) {
      this.log(logPrefix + " Transformed url: " + value + " -> " + result);
    }

    return result;
  };

  SensitiveDataFilter.prototype.transformTitle = function (domain, value) {
    var _this = this;

    if (!this.rules || !this.rules.titles) {
      return value;
    }

    var titleRules = this.rules.titles;
    var resultTitle = value;
    titleRules.forEach(function (item) {
      if (!domain.match(item.domain)) {
        return;
      }

      item.rules.forEach(function (rule) {
        if (rule.value) {
          resultTitle = _this.applyRegexp(rule.value, resultTitle, valueReplacePattern);
        }
      });
    });

    if (this.logging) {
      this.log(logPrefix + " Transformed title: " + value + " -> " + resultTitle);
    }

    return resultTitle;
  };

  SensitiveDataFilter.prototype.updateRules = function () {
    return __awaiter(this, void 0, void 0, function () {
      var rulesListUrl, response, _a, e_1;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            rulesListUrl = this.host + rulesListEndpoint;
            _b.label = 1;

          case 1:
            _b.trys.push([1, 4,, 5]);

            return [4, fetch(rulesListUrl, {
              headers: {
                'Content-type': 'application/json;charset=utf-8'
              }
            })];

          case 2:
            response = _b.sent();
            _a = this;
            return [4, response.json()];

          case 3:
            _a.rules = _b.sent();
            return [3, 5];

          case 4:
            e_1 = _b.sent();
            throw new Error(e_1);

          case 5:
            return [2];
        }
      });
    });
  };

  SensitiveDataFilter.prototype.processFilterRules = function (rules, value) {
    var _this = this;

    var result = value;
    rules.forEach(function (rule) {
      if (rule.value && rule.type) {
        switch (rule.type) {
          case 'parameter':
            result = _this.applyRegexp('([?&]' + rule.value + '=)([^&]+)', result, '$1' + valueReplacePattern);
            break;

          case 'path':
            result = _this.applyPathFilter(rule.value, result, valueReplacePattern);
            break;

          default:
            if (_this.logging) {
              _this.log(logPrefix + " Unknown rule type: " + rule.type);
            }

        }
      }
    });
    return result;
  };

  SensitiveDataFilter.prototype.applyPathFilter = function (rule, value, newValue) {
    var regExp = new RegExp(rule, 'i');
    var replaceValue;
    var m = value.match(regExp);

    if (!m) {
      return value;
    }

    var fullStr = m[0],
        matchStr = m[1];
    replaceValue = newValue + matchStr + newValue;

    if (fullStr.indexOf(matchStr) === 0) {
      replaceValue = matchStr + newValue;
    }

    if (fullStr.indexOf(matchStr) === fullStr.length - matchStr.length) {
      replaceValue = newValue + matchStr;
    }

    return value.replace(fullStr, replaceValue);
  };

  SensitiveDataFilter.prototype.applyRegexp = function (r, value, newValue) {
    var regExp = new RegExp(r, 'ig');
    return value.replace(regExp, newValue);
  };

  SensitiveDataFilter.prototype.log = function (value) {};

  return SensitiveDataFilter;
}();

exports["default"] = SensitiveDataFilter;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/background/main.js ***!
  \********************************/
__webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");

var PosdBackgroundContent = __webpack_require__(/*! ./BackgroundContent */ "./src/background/BackgroundContent.js");

var posdBackgroundContent = new PosdBackgroundContent();

window.ActivatePanelOS = function () {
  posdBackgroundContent.UpdateActiveStatus(true);
};

window.DeactivatePanelOS = function () {
  posdBackgroundContent.UpdateActiveStatus(false);
};

window.UpdatePanelOSConfig = function () {
  posdBackgroundContent.UpdateConfig();
};

window.GetAdBlockerStatus = function (onGetStatus, onError) {
  posdBackgroundContent.GetAdBlockerStatus(onGetStatus, onError);
};

window.GetAdBlockerCounters = function (onGetCounters, onError, tabId) {
  posdBackgroundContent.GetAdBlockerCounters(onGetCounters, onError, tabId);
};

window.EnableAdBlocker = function (onEnabled, onError, options) {
  posdBackgroundContent.EnableAdBlocker(onEnabled, onError, options);
};

window.DisableAdBlocker = function (onDisabled, onError, options) {
  posdBackgroundContent.DisableAdBlocker(onDisabled, onError, options);
};

window.GetExcludeList = function (onGetExcludeList, onError, listType) {
  posdBackgroundContent.GetExcludeList(onGetExcludeList, onError, listType);
};

window.AddIntoExcludeList = function (onAddIntoExcludeList, onError, listType, item) {
  posdBackgroundContent.AddIntoExcludeList(onAddIntoExcludeList, onError, listType, item);
};

window.RemoveFromExcludeList = function (onRemoveFromExcludeList, onError, listType, item) {
  posdBackgroundContent.RemoveFromExcludeList(onRemoveFromExcludeList, onError, listType, item);
};

window.HasItemInExcludeList = function (onHasItemInExcludeList, onError, listType, item) {
  posdBackgroundContent.HasItemInExcludeList(onHasItemInExcludeList, onError, listType, item);
};

window.AddCurrentDomainIntoExcludeList = function (onAddCurrentDomainIntoExcludeList, onError) {
  posdBackgroundContent.AddCurrentDomainIntoExcludeList(onAddCurrentDomainIntoExcludeList, onError);
};

window.AddCurrentPageIntoExcludeList = function (onAddCurrentPageIntoExcludeList, onError) {
  posdBackgroundContent.AddCurrentPageIntoExcludeList(onAddCurrentPageIntoExcludeList, onError);
};

window.GetCurrentDomain = function (onGetCurrentDomain, onError) {
  posdBackgroundContent.GetCurrentDomain(onGetCurrentDomain, onError);
};

window.GetCurrentPageUrl = function (onGetCurrentPageUrl, onError) {
  posdBackgroundContent.GetCurrentPageUrl(onGetCurrentPageUrl, onError);
};

window.EnableDataCollection = function (onEnabled, onError) {
  posdBackgroundContent.EnableDataCollection(onEnabled, onError);
};

window.DisableDataCollection = function (onDisabled, onError) {
  posdBackgroundContent.DisableDataCollection(onDisabled, onError);
};

window.GetDataCollectionStatus = function (onGetStatus, onError) {
  posdBackgroundContent.GetDataCollectionStatus(onGetStatus, onError);
};

window.EnableDataSharing = function (onEnabled, onError) {
  posdBackgroundContent.EnableDataSharing(onEnabled, onError);
};

window.DisableDataSharing = function (onDisabled, onError) {
  posdBackgroundContent.DisableDataSharing(onDisabled, onError);
};

window.GetDataSharingStatus = function (onGetStatus, onError) {
  posdBackgroundContent.GetDataSharingStatus(onGetStatus, onError);
};

posdBackgroundContent.Init();
})();

/******/ })()
;
//# sourceMappingURL=panelos-background.js.map