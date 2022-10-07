/*!Don't remove this!
 * duDatepicker v2.0.3 plugin (Vanilla JS)
 * https://dmuy.github.io/duDatepicker/
 *
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.duDatepicker = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$I =
    // eslint-disable-next-line es-x/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$n = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$m = fails$n;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$m(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var fails$l = fails$n;

  var functionBindNative = !fails$l(function () {
    // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var call$k = Function.prototype.call;

  var functionCall = NATIVE_BIND$3 ? call$k.bind(call$k) : function () {
    return call$k.apply(call$k, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$2 = functionBindNative;

  var FunctionPrototype$2 = Function.prototype;
  var bind$4 = FunctionPrototype$2.bind;
  var call$j = FunctionPrototype$2.call;
  var uncurryThis$m = NATIVE_BIND$2 && bind$4.bind(call$j, call$j);

  var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
    return fn && uncurryThis$m(fn);
  } : function (fn) {
    return fn && function () {
      return call$j.apply(fn, arguments);
    };
  };

  var uncurryThis$l = functionUncurryThis;

  var toString$a = uncurryThis$l({}.toString);
  var stringSlice$5 = uncurryThis$l(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$5(toString$a(it), 8, -1);
  };

  var global$H = global$I;
  var uncurryThis$k = functionUncurryThis;
  var fails$k = fails$n;
  var classof$8 = classofRaw$1;

  var Object$5 = global$H.Object;
  var split = uncurryThis$k(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$k(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$8(it) == 'String' ? split(it, '') : Object$5(it);
  } : Object$5;

  var global$G = global$I;

  var TypeError$h = global$G.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$6 = function (it) {
    if (it == undefined) throw TypeError$h("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$5 = requireObjectCoercible$6;

  var toIndexedObject$6 = function (it) {
    return IndexedObject$2(requireObjectCoercible$5(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$j = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$i = isCallable$j;

  var isObject$9 = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$i(it);
  };

  var global$F = global$I;
  var isCallable$h = isCallable$j;

  var aFunction = function (argument) {
    return isCallable$h(argument) ? argument : undefined;
  };

  var getBuiltIn$8 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$F[namespace]) : global$F[namespace] && global$F[namespace][method];
  };

  var uncurryThis$j = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$j({}.isPrototypeOf);

  var getBuiltIn$7 = getBuiltIn$8;

  var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

  var global$E = global$I;
  var userAgent$2 = engineUserAgent;

  var process = global$E.process;
  var Deno = global$E.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$2) {
    match = userAgent$2.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$2.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es-x/no-symbol -- required for testing */

  var V8_VERSION$2 = engineV8Version;
  var fails$j = fails$n;

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$j(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es-x/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$D = global$I;
  var getBuiltIn$6 = getBuiltIn$8;
  var isCallable$g = isCallable$j;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var Object$4 = global$D.Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$6('Symbol');
    return isCallable$g($Symbol) && isPrototypeOf$3($Symbol.prototype, Object$4(it));
  };

  var global$C = global$I;

  var String$4 = global$C.String;

  var tryToString$4 = function (argument) {
    try {
      return String$4(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$B = global$I;
  var isCallable$f = isCallable$j;
  var tryToString$3 = tryToString$4;

  var TypeError$g = global$B.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$e = function (argument) {
    if (isCallable$f(argument)) return argument;
    throw TypeError$g(tryToString$3(argument) + ' is not a function');
  };

  var aCallable$d = aCallable$e;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$9 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$d(func);
  };

  var global$A = global$I;
  var call$i = functionCall;
  var isCallable$e = isCallable$j;
  var isObject$8 = isObject$9;

  var TypeError$f = global$A.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$8(val = call$i(fn, input))) return val;
    if (isCallable$e(fn = input.valueOf) && !isObject$8(val = call$i(fn, input))) return val;
    if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$8(val = call$i(fn, input))) return val;
    throw TypeError$f("Can't convert object to primitive value");
  };

  var shared$5 = {exports: {}};

  var global$z = global$I;

  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty$1 = Object.defineProperty;

  var setGlobal$3 = function (key, value) {
    try {
      defineProperty$1(global$z, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$z[key] = value;
    } return value;
  };

  var global$y = global$I;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$y[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$5.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.22.2',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var global$x = global$I;
  var requireObjectCoercible$4 = requireObjectCoercible$6;

  var Object$3 = global$x.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$8 = function (argument) {
    return Object$3(requireObjectCoercible$4(argument));
  };

  var uncurryThis$i = functionUncurryThis;
  var toObject$7 = toObject$8;

  var hasOwnProperty = uncurryThis$i({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es-x/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$7(it), key);
  };

  var uncurryThis$h = functionUncurryThis;

  var id = 0;
  var postfix = Math.random();
  var toString$9 = uncurryThis$h(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$9(++id + postfix, 36);
  };

  var global$w = global$I;
  var shared$4 = shared$5.exports;
  var hasOwn$a = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared$4('wks');
  var Symbol$1 = global$w.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$m = function (name) {
    if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };

  var global$v = global$I;
  var call$h = functionCall;
  var isObject$7 = isObject$9;
  var isSymbol$1 = isSymbol$2;
  var getMethod$8 = getMethod$9;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$l = wellKnownSymbol$m;

  var TypeError$e = global$v.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$l('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$7(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$8(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$h(exoticToPrim, input, pref);
      if (!isObject$7(result) || isSymbol$1(result)) return result;
      throw TypeError$e("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$u = global$I;
  var isObject$6 = isObject$9;

  var document$1 = global$u.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$6 = descriptors;
  var fails$i = fails$n;
  var createElement = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$6 && !fails$i(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$5 = descriptors;
  var call$g = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$5 = toIndexedObject$6;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$9 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$5(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$9(O, P)) return createPropertyDescriptor$3(!call$g(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$4 = descriptors;
  var fails$h = fails$n;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$h(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var global$t = global$I;
  var isObject$5 = isObject$9;

  var String$3 = global$t.String;
  var TypeError$d = global$t.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$r = function (argument) {
    if (isObject$5(argument)) return argument;
    throw TypeError$d(String$3(argument) + ' is not an object');
  };

  var global$s = global$I;
  var DESCRIPTORS$3 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$q = anObject$r;
  var toPropertyKey$1 = toPropertyKey$3;

  var TypeError$c = global$s.TypeError;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$q(O);
    P = toPropertyKey$1(P);
    anObject$q(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$q(O);
    P = toPropertyKey$1(P);
    anObject$q(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$c('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$9 = DESCRIPTORS$2 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$8 = {exports: {}};

  var uncurryThis$g = functionUncurryThis;
  var isCallable$d = isCallable$j;
  var store$1 = sharedStore;

  var functionToString = uncurryThis$g(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$d(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var global$r = global$I;
  var isCallable$c = isCallable$j;
  var inspectSource$2 = inspectSource$3;

  var WeakMap$1 = global$r.WeakMap;

  var nativeWeakMap = isCallable$c(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

  var shared$3 = shared$5.exports;
  var uid = uid$2;

  var keys = shared$3('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$q = global$I;
  var uncurryThis$f = functionUncurryThis;
  var isObject$4 = isObject$9;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;
  var hasOwn$8 = hasOwnProperty_1;
  var shared$2 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$b = global$q.TypeError;
  var WeakMap = global$q.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$b('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$2.state) {
    var store = shared$2.state || (shared$2.state = new WeakMap());
    var wmget = uncurryThis$f(store.get);
    var wmhas = uncurryThis$f(store.has);
    var wmset = uncurryThis$f(store.set);
    set = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$8(it, STATE)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$8(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$8(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$8(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS$1 = descriptors;
  var hasOwn$7 = hasOwnProperty_1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || (DESCRIPTORS$1 && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$p = global$I;
  var isCallable$b = isCallable$j;
  var hasOwn$6 = hasOwnProperty_1;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule$3 = internalState;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

  var getInternalState$4 = InternalStateModule$3.get;
  var enforceInternalState = InternalStateModule$3.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$8.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$b(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwn$6(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
        createNonEnumerableProperty$7(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$p) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$7(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$b(this) && getInternalState$4(this).source || inspectSource$1(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$2 = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$4 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor$2 : ceil)(number);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

  var max$3 = Math.max;
  var min$3 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$3 = function (index, length) {
    var integer = toIntegerOrInfinity$3(index);
    return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$4 = function (argument) {
    return argument > 0 ? min$2(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$3 = toLength$4;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$8 = function (obj) {
    return toLength$3(obj.length);
  };

  var toIndexedObject$4 = toIndexedObject$6;
  var toAbsoluteIndex$2 = toAbsoluteIndex$3;
  var lengthOfArrayLike$7 = lengthOfArrayLike$8;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$4($this);
      var length = lengthOfArrayLike$7(O);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var uncurryThis$e = functionUncurryThis;
  var hasOwn$5 = hasOwnProperty_1;
  var toIndexedObject$3 = toIndexedObject$6;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var push$4 = uncurryThis$e([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$3(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$4(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$5(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$4(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$5 = getBuiltIn$8;
  var uncurryThis$d = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$p = anObject$r;

  var concat$1 = uncurryThis$d([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$p(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$4 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$g = fails$n;
  var isCallable$a = isCallable$j;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$a(detection) ? fails$g(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$o = global$I;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var redefine$7 = redefine$8.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$o;
    } else if (STATIC) {
      target = global$o[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$o[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$6(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$7(target, key, sourceProperty, options);
    }
  };

  var wellKnownSymbol$k = wellKnownSymbol$m;

  var TO_STRING_TAG$5 = wellKnownSymbol$k('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$5] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

  var global$n = global$I;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$9 = isCallable$j;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$j = wellKnownSymbol$m;

  var TO_STRING_TAG$4 = wellKnownSymbol$j('toStringTag');
  var Object$2 = global$n.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$7 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object$2(it), TO_STRING_TAG$4)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$9(O.callee) ? 'Arguments' : result;
  };

  var global$m = global$I;
  var classof$6 = classof$7;

  var String$2 = global$m.String;

  var toString$8 = function (argument) {
    if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$2(argument);
  };

  var anObject$o = anObject$r;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$o(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$f = fails$n;
  var global$l = global$I;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$l.RegExp;

  var UNSUPPORTED_Y$2 = fails$f(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$f(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$f(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$2
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es-x/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$2 = objectDefineProperty;
  var anObject$n = anObject$r;
  var toIndexedObject$2 = toIndexedObject$6;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es-x/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$n(O);
    var props = toIndexedObject$2(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$4 = getBuiltIn$8;

  var html$1 = getBuiltIn$4('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$m = anObject$r;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es-x/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$m(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var fails$e = fails$n;
  var global$k = global$I;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$k.RegExp;

  var regexpUnsupportedDotAll = fails$e(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$d = fails$n;
  var global$j = global$I;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$j.RegExp;

  var regexpUnsupportedNcg = fails$d(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$f = functionCall;
  var uncurryThis$c = functionUncurryThis;
  var toString$7 = toString$8;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var shared$1 = shared$5.exports;
  var create$4 = objectCreate;
  var getInternalState$3 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared$1('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$4 = uncurryThis$c(''.charAt);
  var indexOf = uncurryThis$c(''.indexOf);
  var replace$1 = uncurryThis$c(''.replace);
  var stringSlice$4 = uncurryThis$c(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$f(nativeExec, re1, 'a');
    call$f(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$3(re);
      var str = toString$7(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$f(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = call$f(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$1(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$4(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call$f(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$4(match.input, charsAdded);
          match[0] = stringSlice$4(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        call$f(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$4(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$3 = patchedExec;

  var $$m = _export;
  var exec$2 = regexpExec$3;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$m({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
    exec: exec$2
  });

  var NATIVE_BIND$1 = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$6 = FunctionPrototype.apply;
  var call$e = FunctionPrototype.call;

  // eslint-disable-next-line es-x/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$e.bind(apply$6) : function () {
    return call$e.apply(apply$6, arguments);
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$b = functionUncurryThis;
  var redefine$6 = redefine$8.exports;
  var regexpExec$2 = regexpExec$3;
  var fails$c = fails$n;
  var wellKnownSymbol$i = wellKnownSymbol$m;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;

  var SPECIES$4 = wellKnownSymbol$i('species');
  var RegExpPrototype$2 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$i(KEY);

    var DELEGATES_TO_SYMBOL = !fails$c(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$c(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$4] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var uncurriedNativeRegExpMethod = uncurryThis$b(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$b(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      redefine$6(String.prototype, KEY, methods[0]);
      redefine$6(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$5(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  var isObject$3 = isObject$9;
  var classof$5 = classofRaw$1;
  var wellKnownSymbol$h = wellKnownSymbol$m;

  var MATCH = wellKnownSymbol$h('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$3(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
  };

  var uncurryThis$a = functionUncurryThis;
  var fails$b = fails$n;
  var isCallable$8 = isCallable$j;
  var classof$4 = classof$7;
  var getBuiltIn$3 = getBuiltIn$8;
  var inspectSource = inspectSource$3;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn$3('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$1 = uncurryThis$a(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$8(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$8(argument)) return false;
    switch (classof$4(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct || fails$b(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$i = global$I;
  var isConstructor$3 = isConstructor$4;
  var tryToString$2 = tryToString$4;

  var TypeError$a = global$i.TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$1 = function (argument) {
    if (isConstructor$3(argument)) return argument;
    throw TypeError$a(tryToString$2(argument) + ' is not a constructor');
  };

  var anObject$l = anObject$r;
  var aConstructor = aConstructor$1;
  var wellKnownSymbol$g = wellKnownSymbol$m;

  var SPECIES$3 = wellKnownSymbol$g('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$l(O).constructor;
    var S;
    return C === undefined || (S = anObject$l(C)[SPECIES$3]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var uncurryThis$9 = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
  var toString$6 = toString$8;
  var requireObjectCoercible$3 = requireObjectCoercible$6;

  var charAt$3 = uncurryThis$9(''.charAt);
  var charCodeAt = uncurryThis$9(''.charCodeAt);
  var stringSlice$3 = uncurryThis$9(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$6(requireObjectCoercible$3($this));
      var position = toIntegerOrInfinity$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$3(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$3(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$2 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt$2(S, index).length : 1);
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var createProperty$4 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

  var global$h = global$I;
  var toAbsoluteIndex$1 = toAbsoluteIndex$3;
  var lengthOfArrayLike$6 = lengthOfArrayLike$8;
  var createProperty$3 = createProperty$4;

  var Array$4 = global$h.Array;
  var max$2 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$6(O);
    var k = toAbsoluteIndex$1(start, length);
    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
    var result = Array$4(max$2(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty$3(result, n, O[k]);
    result.length = n;
    return result;
  };

  var global$g = global$I;
  var call$d = functionCall;
  var anObject$k = anObject$r;
  var isCallable$7 = isCallable$j;
  var classof$3 = classofRaw$1;
  var regexpExec$1 = regexpExec$3;

  var TypeError$9 = global$g.TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$7(exec)) {
      var result = call$d(exec, R, S);
      if (result !== null) anObject$k(result);
      return result;
    }
    if (classof$3(R) === 'RegExp') return call$d(regexpExec$1, R, S);
    throw TypeError$9('RegExp#exec called on incompatible receiver');
  };

  var apply$5 = functionApply;
  var call$c = functionCall;
  var uncurryThis$8 = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var isRegExp = isRegexp;
  var anObject$j = anObject$r;
  var requireObjectCoercible$2 = requireObjectCoercible$6;
  var speciesConstructor = speciesConstructor$1;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var toLength$2 = toLength$4;
  var toString$5 = toString$8;
  var getMethod$7 = getMethod$9;
  var arraySlice$2 = arraySliceSimple;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers = regexpStickyHelpers;
  var fails$a = fails$n;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$1 = Math.min;
  var $push = [].push;
  var exec = uncurryThis$8(/./.exec);
  var push$3 = uncurryThis$8($push);
  var stringSlice$2 = uncurryThis$8(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$a(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegExpWellKnownSymbolLogic$2('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString$5(requireObjectCoercible$2(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) {
          return call$c(nativeSplit, string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = call$c(regexpExec, separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            push$3(output, stringSlice$2(string, lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) apply$5($push, output, arraySlice$2(match, 1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !exec(separatorCopy, '')) push$3(output, '');
        } else push$3(output, stringSlice$2(string, lastLastIndex));
        return output.length > lim ? arraySlice$2(output, 0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : call$c(nativeSplit, this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible$2(this);
        var splitter = separator == undefined ? undefined : getMethod$7(separator, SPLIT);
        return splitter
          ? call$c(splitter, separator, O, limit)
          : call$c(internalSplit, toString$5(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject$j(this);
        var S = toString$5(string);
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

        if (res.done) return res.value;

        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$2(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$1(toLength$2(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex$2(S, q, unicodeMatching);
          } else {
            push$3(A, stringSlice$2(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$3(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$3(A, stringSlice$2(S, p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$2 = classof$7;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$2(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$5 = redefine$8.exports;
  var toString$4 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$5(Object.prototype, 'toString', toString$4, { unsafe: true });
  }

  // https://github.com/tc39/proposal-iterator-helpers
  // https://github.com/tc39/proposal-array-from-async
  var global$f = global$I;
  var call$b = functionCall;
  var aCallable$c = aCallable$e;
  var anObject$i = anObject$r;
  var getBuiltIn$2 = getBuiltIn$8;
  var getMethod$6 = getMethod$9;

  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var TypeError$8 = global$f.TypeError;

  var createMethod$1 = function (TYPE) {
    var IS_TO_ARRAY = TYPE == 0;
    var IS_FOR_EACH = TYPE == 1;
    var IS_EVERY = TYPE == 2;
    var IS_SOME = TYPE == 3;
    return function (iterator, fn, target) {
      anObject$i(iterator);
      var Promise = getBuiltIn$2('Promise');
      var next = aCallable$c(iterator.next);
      var index = 0;
      var MAPPING = fn !== undefined;
      if (MAPPING || !IS_TO_ARRAY) aCallable$c(fn);

      return new Promise(function (resolve, reject) {
        var closeIteration = function (method, argument) {
          try {
            var returnMethod = getMethod$6(iterator, 'return');
            if (returnMethod) {
              return Promise.resolve(call$b(returnMethod, iterator)).then(function () {
                method(argument);
              }, function (error) {
                reject(error);
              });
            }
          } catch (error2) {
            return reject(error2);
          } method(argument);
        };

        var onError = function (error) {
          closeIteration(reject, error);
        };

        var loop = function () {
          try {
            if (IS_TO_ARRAY && (index > MAX_SAFE_INTEGER$1) && MAPPING) {
              throw TypeError$8('The allowed number of iterations has been exceeded');
            }
            Promise.resolve(anObject$i(call$b(next, iterator))).then(function (step) {
              try {
                if (anObject$i(step).done) {
                  if (IS_TO_ARRAY) {
                    target.length = index;
                    resolve(target);
                  } else resolve(IS_SOME ? false : IS_EVERY || undefined);
                } else {
                  var value = step.value;
                  if (MAPPING) {
                    Promise.resolve(IS_TO_ARRAY ? fn(value, index) : fn(value)).then(function (result) {
                      if (IS_FOR_EACH) {
                        loop();
                      } else if (IS_EVERY) {
                        result ? loop() : closeIteration(resolve, false);
                      } else if (IS_TO_ARRAY) {
                        target[index++] = result;
                        loop();
                      } else {
                        result ? closeIteration(resolve, IS_SOME || value) : loop();
                      }
                    }, onError);
                  } else {
                    target[index++] = value;
                    loop();
                  }
                }
              } catch (error) { onError(error); }
            }, onError);
          } catch (error2) { onError(error2); }
        };

        loop();
      });
    };
  };

  var asyncIteratorIteration = {
    toArray: createMethod$1(0),
    forEach: createMethod$1(1),
    every: createMethod$1(2),
    some: createMethod$1(3),
    find: createMethod$1(4)
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $$l = _export;
  var $forEach$1 = asyncIteratorIteration.forEach;

  $$l({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
    forEach: function forEach(fn) {
      return $forEach$1(this, fn);
    }
  });

  var global$e = global$I;
  var isPrototypeOf$2 = objectIsPrototypeOf;

  var TypeError$7 = global$e.TypeError;

  var anInstance$1 = function (it, Prototype) {
    if (isPrototypeOf$2(Prototype, it)) return it;
    throw TypeError$7('Incorrect invocation');
  };

  var fails$9 = fails$n;

  var correctPrototypeGetter = !fails$9(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var global$d = global$I;
  var hasOwn$3 = hasOwnProperty_1;
  var isCallable$6 = isCallable$j;
  var toObject$6 = toObject$8;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$1 = global$d.Object;
  var ObjectPrototype = Object$1.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
    var object = toObject$6(O);
    if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$6(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object$1 ? ObjectPrototype : null;
  };

  var fails$8 = fails$n;
  var isCallable$5 = isCallable$j;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var redefine$4 = redefine$8.exports;
  var wellKnownSymbol$f = wellKnownSymbol$m;

  var ITERATOR$4 = wellKnownSymbol$f('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es-x/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$2(getPrototypeOf$2(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$4 == undefined || fails$8(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$4[ITERATOR$4].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$5(IteratorPrototype$4[ITERATOR$4])) {
    redefine$4(IteratorPrototype$4, ITERATOR$4, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$4,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $$k = _export;
  var global$c = global$I;
  var anInstance = anInstance$1;
  var isCallable$4 = isCallable$j;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
  var fails$7 = fails$n;
  var hasOwn$2 = hasOwnProperty_1;
  var wellKnownSymbol$e = wellKnownSymbol$m;
  var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;

  var TO_STRING_TAG$3 = wellKnownSymbol$e('toStringTag');

  var NativeIterator = global$c.Iterator;

  // FF56- have non-standard global helper `Iterator`
  var FORCED$2 = !isCallable$4(NativeIterator)
    || NativeIterator.prototype !== IteratorPrototype$3
    // FF44- non-standard `Iterator` passes previous tests
    || !fails$7(function () { NativeIterator({}); });

  var IteratorConstructor = function Iterator() {
    anInstance(this, IteratorPrototype$3);
  };

  if (!hasOwn$2(IteratorPrototype$3, TO_STRING_TAG$3)) {
    createNonEnumerableProperty$4(IteratorPrototype$3, TO_STRING_TAG$3, 'Iterator');
  }

  if (FORCED$2 || !hasOwn$2(IteratorPrototype$3, 'constructor') || IteratorPrototype$3.constructor === Object) {
    createNonEnumerableProperty$4(IteratorPrototype$3, 'constructor', IteratorConstructor);
  }

  IteratorConstructor.prototype = IteratorPrototype$3;

  $$k({ global: true, forced: FORCED$2 }, {
    Iterator: IteratorConstructor
  });

  var uncurryThis$7 = functionUncurryThis;
  var aCallable$b = aCallable$e;
  var NATIVE_BIND = functionBindNative;

  var bind$3 = uncurryThis$7(uncurryThis$7.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$b(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$3(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var iterators = {};

  var wellKnownSymbol$d = wellKnownSymbol$m;
  var Iterators$3 = iterators;

  var ITERATOR$3 = wellKnownSymbol$d('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype$1[ITERATOR$3] === it);
  };

  var classof$1 = classof$7;
  var getMethod$5 = getMethod$9;
  var Iterators$2 = iterators;
  var wellKnownSymbol$c = wellKnownSymbol$m;

  var ITERATOR$2 = wellKnownSymbol$c('iterator');

  var getIteratorMethod$3 = function (it) {
    if (it != undefined) return getMethod$5(it, ITERATOR$2)
      || getMethod$5(it, '@@iterator')
      || Iterators$2[classof$1(it)];
  };

  var global$b = global$I;
  var call$a = functionCall;
  var aCallable$a = aCallable$e;
  var anObject$h = anObject$r;
  var tryToString$1 = tryToString$4;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var TypeError$6 = global$b.TypeError;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$a(iteratorMethod)) return anObject$h(call$a(iteratorMethod, argument));
    throw TypeError$6(tryToString$1(argument) + ' is not iterable');
  };

  var call$9 = functionCall;
  var anObject$g = anObject$r;
  var getMethod$4 = getMethod$9;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$g(iterator);
    try {
      innerResult = getMethod$4(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$9(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$g(innerResult);
    return value;
  };

  var global$a = global$I;
  var bind$2 = functionBindContext;
  var call$8 = functionCall;
  var anObject$f = anObject$r;
  var tryToString = tryToString$4;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var lengthOfArrayLike$5 = lengthOfArrayLike$8;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var iteratorClose$1 = iteratorClose$2;

  var TypeError$5 = global$a.TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$3 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$2(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose$1(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$f(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (!iterFn) throw TypeError$5(tryToString(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$5(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$1(iterable, iterFn);
    }

    next = iterator.next;
    while (!(step = call$8(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $$j = _export;
  var iterate$2 = iterate$3;
  var anObject$e = anObject$r;

  $$j({ target: 'Iterator', proto: true, real: true, forced: true }, {
    forEach: function forEach(fn) {
      iterate$2(anObject$e(this), fn, { IS_ITERATOR: true });
    }
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var classof = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es-x/no-array-isarray -- safe
  var isArray$3 = Array.isArray || function isArray(argument) {
    return classof(argument) == 'Array';
  };

  var global$9 = global$I;
  var isArray$2 = isArray$3;
  var isConstructor$2 = isConstructor$4;
  var isObject$2 = isObject$9;
  var wellKnownSymbol$b = wellKnownSymbol$m;

  var SPECIES$2 = wellKnownSymbol$b('species');
  var Array$3 = global$9.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$2(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$2(C) && (C === Array$3 || isArray$2(C.prototype))) C = undefined;
      else if (isObject$2(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$3 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$1 = functionBindContext;
  var uncurryThis$6 = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toObject$5 = toObject$8;
  var lengthOfArrayLike$4 = lengthOfArrayLike$8;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;

  var push$2 = uncurryThis$6([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$5($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$1(callbackfn, that);
      var length = lengthOfArrayLike$4(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$2(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$2(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod(7)
  };

  var fails$6 = fails$n;

  var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$6(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

  var STRICT_METHOD$2 = arrayMethodIsStrict$2('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$8 = global$I;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$3(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$8[COLLECTION_NAME] && global$8[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  var arraySlice$1 = arraySliceSimple;

  var floor$1 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$1(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      array,
      mergeSort(arraySlice$1(array, 0, middle), comparefn),
      mergeSort(arraySlice$1(array, middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    } return array;
  };

  var arraySort = mergeSort;

  var userAgent$1 = engineUserAgent;

  var firefox = userAgent$1.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent;

  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent = engineUserAgent;

  var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var $$i = _export;
  var uncurryThis$5 = functionUncurryThis;
  var aCallable$9 = aCallable$e;
  var toObject$4 = toObject$8;
  var lengthOfArrayLike$3 = lengthOfArrayLike$8;
  var toString$3 = toString$8;
  var fails$5 = fails$n;
  var internalSort = arraySort;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;

  var test = [];
  var un$Sort = uncurryThis$5(test.sort);
  var push$1 = uncurryThis$5(test.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails$5(function () {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$5(function () {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('sort');

  var STABLE_SORT = !fails$5(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 70;
    if (FF && FF > 3) return;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test.push({ k: chr + index, v: value });
      }
    }

    test.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test.length; index++) {
      chr = test[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString$3(x) > toString$3(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$i({ target: 'Array', proto: true, forced: FORCED$1 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable$9(comparefn);

      var array = toObject$4(this);

      if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike$3(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push$1(items, array[index]);
      }

      internalSort(items, getSortCompare(comparefn));

      itemsLength = items.length;
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) delete array[index++];

      return array;
    }
  });

  // https://github.com/tc39/proposal-iterator-helpers
  var $$h = _export;
  var global$7 = global$I;
  var call$7 = functionCall;
  var aCallable$8 = aCallable$e;
  var anObject$d = anObject$r;
  var getBuiltIn$1 = getBuiltIn$8;

  var Promise$2 = getBuiltIn$1('Promise');
  var TypeError$4 = global$7.TypeError;

  $$h({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
    reduce: function reduce(reducer /* , initialValue */) {
      var iterator = anObject$d(this);
      var next = aCallable$8(iterator.next);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      aCallable$8(reducer);

      return new Promise$2(function (resolve, reject) {
        var loop = function () {
          try {
            Promise$2.resolve(anObject$d(call$7(next, iterator))).then(function (step) {
              try {
                if (anObject$d(step).done) {
                  noInitial ? reject(TypeError$4('Reduce of empty iterator with no initial value')) : resolve(accumulator);
                } else {
                  var value = step.value;
                  if (noInitial) {
                    noInitial = false;
                    accumulator = value;
                    loop();
                  } else {
                    Promise$2.resolve(reducer(accumulator, value)).then(function (result) {
                      accumulator = result;
                      loop();
                    }, reject);
                  }
                }
              } catch (err) { reject(err); }
            }, reject);
          } catch (error) { reject(error); }
        };

        loop();
      });
    }
  });

  // https://github.com/tc39/proposal-iterator-helpers
  var $$g = _export;
  var global$6 = global$I;
  var iterate$1 = iterate$3;
  var aCallable$7 = aCallable$e;
  var anObject$c = anObject$r;

  var TypeError$3 = global$6.TypeError;

  $$g({ target: 'Iterator', proto: true, real: true, forced: true }, {
    reduce: function reduce(reducer /* , initialValue */) {
      anObject$c(this);
      aCallable$7(reducer);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      iterate$1(this, function (value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = reducer(accumulator, value);
        }
      }, { IS_ITERATOR: true });
      if (noInitial) throw TypeError$3('Reduce of empty iterator with no initial value');
      return accumulator;
    }
  });

  var $$f = _export;
  var uncurryThis$4 = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toIndexedObject$1 = toIndexedObject$6;
  var arrayMethodIsStrict = arrayMethodIsStrict$3;

  var un$Join = uncurryThis$4([].join);

  var ES3_STRINGS = IndexedObject != Object;
  var STRICT_METHOD = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $$f({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
    join: function join(separator) {
      return un$Join(toIndexedObject$1(this), separator === undefined ? ',' : separator);
    }
  });

  var fails$4 = fails$n;
  var wellKnownSymbol$a = wellKnownSymbol$m;
  var V8_VERSION$1 = engineV8Version;

  var SPECIES$1 = wellKnownSymbol$a('species');

  var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$4(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$e = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$e({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var redefine$3 = redefine$8.exports;

  var redefineAll$2 = function (target, src, options) {
    for (var key in src) redefine$3(target, key, src[key], options);
    return target;
  };

  var global$5 = global$I;
  var shared = sharedStore;
  var isCallable$3 = isCallable$j;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var redefine$2 = redefine$8.exports;
  var wellKnownSymbol$9 = wellKnownSymbol$m;

  var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
  var ASYNC_ITERATOR = wellKnownSymbol$9('asyncIterator');
  var AsyncIterator = global$5.AsyncIterator;
  var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
  var AsyncIteratorPrototype$1, prototype;

  if (PassedAsyncIteratorPrototype) {
    AsyncIteratorPrototype$1 = PassedAsyncIteratorPrototype;
  } else if (isCallable$3(AsyncIterator)) {
    AsyncIteratorPrototype$1 = AsyncIterator.prototype;
  } else if (shared[USE_FUNCTION_CONSTRUCTOR] || global$5[USE_FUNCTION_CONSTRUCTOR]) {
    try {
      // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
      prototype = getPrototypeOf$1(getPrototypeOf$1(getPrototypeOf$1(Function('return async function*(){}()')())));
      if (getPrototypeOf$1(prototype) === Object.prototype) AsyncIteratorPrototype$1 = prototype;
    } catch (error) { /* empty */ }
  }

  if (!AsyncIteratorPrototype$1) AsyncIteratorPrototype$1 = {};

  if (!isCallable$3(AsyncIteratorPrototype$1[ASYNC_ITERATOR])) {
    redefine$2(AsyncIteratorPrototype$1, ASYNC_ITERATOR, function () {
      return this;
    });
  }

  var asyncIteratorPrototype = AsyncIteratorPrototype$1;

  var call$6 = functionCall;
  var aCallable$6 = aCallable$e;
  var anObject$b = anObject$r;
  var create$3 = objectCreate;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var redefineAll$1 = redefineAll$2;
  var wellKnownSymbol$8 = wellKnownSymbol$m;
  var InternalStateModule$2 = internalState;
  var getBuiltIn = getBuiltIn$8;
  var getMethod$3 = getMethod$9;
  var AsyncIteratorPrototype = asyncIteratorPrototype;

  var Promise$1 = getBuiltIn('Promise');

  var ASYNC_ITERATOR_PROXY = 'AsyncIteratorProxy';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$2 = InternalStateModule$2.getterFor(ASYNC_ITERATOR_PROXY);

  var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');

  var asyncIteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var AsyncIteratorProxy = function AsyncIterator(state) {
      state.type = ASYNC_ITERATOR_PROXY;
      state.next = aCallable$6(state.iterator.next);
      state.done = false;
      state.ignoreArgument = !IS_ITERATOR;
      setInternalState$2(this, state);
    };

    AsyncIteratorProxy.prototype = redefineAll$1(create$3(AsyncIteratorPrototype), {
      next: function next(arg) {
        var that = this;
        var hasArgument = !!arguments.length;
        return new Promise$1(function (resolve) {
          var state = getInternalState$2(that);
          var args = hasArgument ? [state.ignoreArgument ? undefined : arg] : IS_ITERATOR ? [] : [undefined];
          state.ignoreArgument = false;
          resolve(state.done ? { done: true, value: undefined } : anObject$b(call$6(nextHandler, state, Promise$1, args)));
        });
      },
      'return': function (value) {
        var that = this;
        return new Promise$1(function (resolve, reject) {
          var state = getInternalState$2(that);
          var iterator = state.iterator;
          state.done = true;
          var $$return = getMethod$3(iterator, 'return');
          if ($$return === undefined) return resolve({ done: true, value: value });
          Promise$1.resolve(call$6($$return, iterator, value)).then(function (result) {
            anObject$b(result);
            resolve({ done: true, value: value });
          }, reject);
        });
      },
      'throw': function (value) {
        var that = this;
        return new Promise$1(function (resolve, reject) {
          var state = getInternalState$2(that);
          var iterator = state.iterator;
          state.done = true;
          var $$throw = getMethod$3(iterator, 'throw');
          if ($$throw === undefined) return reject(value);
          resolve(call$6($$throw, iterator, value));
        });
      }
    });

    if (!IS_ITERATOR) {
      createNonEnumerableProperty$2(AsyncIteratorProxy.prototype, TO_STRING_TAG$2, 'Generator');
    }

    return AsyncIteratorProxy;
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $$d = _export;
  var apply$4 = functionApply;
  var aCallable$5 = aCallable$e;
  var anObject$a = anObject$r;
  var createAsyncIteratorProxy$1 = asyncIteratorCreateProxy;

  var AsyncIteratorProxy$1 = createAsyncIteratorProxy$1(function (Promise, args) {
    var state = this;
    var mapper = state.mapper;

    return Promise.resolve(anObject$a(apply$4(state.next, state.iterator, args))).then(function (step) {
      if (anObject$a(step).done) {
        state.done = true;
        return { done: true, value: undefined };
      }
      return Promise.resolve(mapper(step.value)).then(function (value) {
        return { done: false, value: value };
      });
    });
  });

  $$d({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
    map: function map(mapper) {
      return new AsyncIteratorProxy$1({
        iterator: anObject$a(this),
        mapper: aCallable$5(mapper)
      });
    }
  });

  var call$5 = functionCall;
  var aCallable$4 = aCallable$e;
  var anObject$9 = anObject$r;
  var create$2 = objectCreate;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  var redefineAll = redefineAll$2;
  var wellKnownSymbol$7 = wellKnownSymbol$m;
  var InternalStateModule$1 = internalState;
  var getMethod$2 = getMethod$9;
  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;

  var ITERATOR_PROXY = 'IteratorProxy';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(ITERATOR_PROXY);

  var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');

  var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var IteratorProxy = function Iterator(state) {
      state.type = ITERATOR_PROXY;
      state.next = aCallable$4(state.iterator.next);
      state.done = false;
      state.ignoreArg = !IS_ITERATOR;
      setInternalState$1(this, state);
    };

    IteratorProxy.prototype = redefineAll(create$2(IteratorPrototype$2), {
      next: function next(arg) {
        var state = getInternalState$1(this);
        var args = arguments.length ? [state.ignoreArg ? undefined : arg] : IS_ITERATOR ? [] : [undefined];
        state.ignoreArg = false;
        var result = state.done ? undefined : call$5(nextHandler, state, args);
        return { done: state.done, value: result };
      },
      'return': function (value) {
        var state = getInternalState$1(this);
        var iterator = state.iterator;
        state.done = true;
        var $$return = getMethod$2(iterator, 'return');
        return { done: true, value: $$return ? anObject$9(call$5($$return, iterator, value)).value : value };
      },
      'throw': function (value) {
        var state = getInternalState$1(this);
        var iterator = state.iterator;
        state.done = true;
        var $$throw = getMethod$2(iterator, 'throw');
        if ($$throw) return call$5($$throw, iterator, value);
        throw value;
      }
    });

    if (!IS_ITERATOR) {
      createNonEnumerableProperty$1(IteratorProxy.prototype, TO_STRING_TAG$1, 'Generator');
    }

    return IteratorProxy;
  };

  var anObject$8 = anObject$r;
  var iteratorClose = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$3 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$8(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $$c = _export;
  var apply$3 = functionApply;
  var aCallable$3 = aCallable$e;
  var anObject$7 = anObject$r;
  var createIteratorProxy$1 = iteratorCreateProxy;
  var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$3;

  var IteratorProxy$1 = createIteratorProxy$1(function (args) {
    var iterator = this.iterator;
    var result = anObject$7(apply$3(this.next, iterator, args));
    var done = this.done = !!result.done;
    if (!done) return callWithSafeIterationClosing$2(iterator, this.mapper, result.value);
  });

  $$c({ target: 'Iterator', proto: true, real: true, forced: true }, {
    map: function map(mapper) {
      return new IteratorProxy$1({
        iterator: anObject$7(this),
        mapper: aCallable$3(mapper)
      });
    }
  });

  var $$b = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://github.com/tc39/proposal-iterator-helpers
  var $$a = _export;
  var apply$2 = functionApply;
  var aCallable$2 = aCallable$e;
  var anObject$6 = anObject$r;
  var createAsyncIteratorProxy = asyncIteratorCreateProxy;

  var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
    var state = this;
    var filterer = state.filterer;

    return new Promise(function (resolve, reject) {
      var loop = function () {
        try {
          Promise.resolve(anObject$6(apply$2(state.next, state.iterator, args))).then(function (step) {
            try {
              if (anObject$6(step).done) {
                state.done = true;
                resolve({ done: true, value: undefined });
              } else {
                var value = step.value;
                Promise.resolve(filterer(value)).then(function (selected) {
                  selected ? resolve({ done: false, value: value }) : loop();
                }, reject);
              }
            } catch (err) { reject(err); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  });

  $$a({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
    filter: function filter(filterer) {
      return new AsyncIteratorProxy({
        iterator: anObject$6(this),
        filterer: aCallable$2(filterer)
      });
    }
  });

  // https://github.com/tc39/proposal-iterator-helpers
  var $$9 = _export;
  var apply$1 = functionApply;
  var aCallable$1 = aCallable$e;
  var anObject$5 = anObject$r;
  var createIteratorProxy = iteratorCreateProxy;
  var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$3;

  var IteratorProxy = createIteratorProxy(function (args) {
    var iterator = this.iterator;
    var filterer = this.filterer;
    var next = this.next;
    var result, done, value;
    while (true) {
      result = anObject$5(apply$1(next, iterator, args));
      done = this.done = !!result.done;
      if (done) return;
      value = result.value;
      if (callWithSafeIterationClosing$1(iterator, filterer, value)) return value;
    }
  });

  $$9({ target: 'Iterator', proto: true, real: true, forced: true }, {
    filter: function filter(filterer) {
      return new IteratorProxy({
        iterator: anObject$5(this),
        filterer: aCallable$1(filterer)
      });
    }
  });

  var wellKnownSymbol$6 = wellKnownSymbol$m;
  var create$1 = objectCreate;
  var definePropertyModule = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$6('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$1(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$2 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var $$8 = _export;
  var $find$1 = arrayIteration.find;
  var addToUnscopables$1 = addToUnscopables$2;

  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$8({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1(FIND);

  // https://github.com/tc39/proposal-iterator-helpers
  var $$7 = _export;
  var $find = asyncIteratorIteration.find;

  $$7({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
    find: function find(fn) {
      return $find(this, fn);
    }
  });

  // https://github.com/tc39/proposal-iterator-helpers
  var $$6 = _export;
  var iterate = iterate$3;
  var aCallable = aCallable$e;
  var anObject$4 = anObject$r;

  $$6({ target: 'Iterator', proto: true, real: true, forced: true }, {
    find: function find(fn) {
      anObject$4(this);
      aCallable(fn);
      return iterate(this, function (value, stop) {
        if (fn(value)) return stop(value);
      }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
    }
  });

  var global$4 = global$I;
  var bind = functionBindContext;
  var call$4 = functionCall;
  var toObject$3 = toObject$8;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$3;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var isConstructor$1 = isConstructor$4;
  var lengthOfArrayLike$2 = lengthOfArrayLike$8;
  var createProperty$2 = createProperty$4;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;

  var Array$2 = global$4.Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$3(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$1(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this == Array$2 && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = call$4(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$2(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$2(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array$2(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$2(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$5 = wellKnownSymbol$m;

  var ITERATOR$1 = wellKnownSymbol$5('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$1] = function () {
      return this;
    };
    // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$1] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var $$5 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es-x/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$5({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var defineProperty = objectDefineProperty.f;
  var hasOwn$1 = hasOwnProperty_1;
  var wellKnownSymbol$4 = wellKnownSymbol$m;

  var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');

  var setToStringTag$2 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$1(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$1 = setToStringTag$2;
  var Iterators$1 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$1[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var global$3 = global$I;
  var isCallable$2 = isCallable$j;

  var String$1 = global$3.String;
  var TypeError$2 = global$3.TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$2(argument)) return argument;
    throw TypeError$2("Can't set " + String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThis$3 = functionUncurryThis;
  var anObject$3 = anObject$r;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es-x/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$3(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$3(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$4 = _export;
  var call$3 = functionCall;
  var FunctionName = functionName;
  var isCallable$1 = isCallable$j;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$9;
  var redefine$1 = redefine$8.exports;
  var wellKnownSymbol$3 = wellKnownSymbol$m;
  var Iterators = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol$3('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$1(CurrentIteratorPrototype[ITERATOR])) {
            redefine$1(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$3(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$1(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$4({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR] !== defaultIterator) {
      redefine$1(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
    }
    Iterators[NAME] = defaultIterator;

    return methods;
  };

  var charAt$1 = stringMultibyte.charAt;
  var toString$2 = toString$8;
  var InternalStateModule = internalState;
  var defineIterator = defineIterator$1;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: toString$2(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt$1(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var uncurryThis$2 = functionUncurryThis;

  var arraySlice = uncurryThis$2([].slice);

  var $$3 = _export;
  var global$2 = global$I;
  var isArray$1 = isArray$3;
  var isConstructor = isConstructor$4;
  var isObject$1 = isObject$9;
  var toAbsoluteIndex = toAbsoluteIndex$3;
  var lengthOfArrayLike$1 = lengthOfArrayLike$8;
  var toIndexedObject = toIndexedObject$6;
  var createProperty$1 = createProperty$4;
  var wellKnownSymbol$2 = wellKnownSymbol$m;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
  var un$Slice = arraySlice;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');

  var SPECIES = wellKnownSymbol$2('species');
  var Array$1 = global$2.Array;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = lengthOfArrayLike$1(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$1(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$1(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$1(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array$1 : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var $$2 = _export;
  var toObject$2 = toObject$8;
  var nativeKeys = objectKeys$1;
  var fails$3 = fails$n;

  var FAILS_ON_PRIMITIVES = fails$3(function () { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$2({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return nativeKeys(toObject$2(it));
    }
  });

  var uncurryThis$1 = functionUncurryThis;
  var toObject$1 = toObject$8;

  var floor = Math.floor;
  var charAt = uncurryThis$1(''.charAt);
  var replace = uncurryThis$1(''.replace);
  var stringSlice$1 = uncurryThis$1(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$1(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$1(str, 0, position);
        case "'": return stringSlice$1(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$1(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var apply = functionApply;
  var call$2 = functionCall;
  var uncurryThis = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$2 = fails$n;
  var anObject$2 = anObject$r;
  var isCallable = isCallable$j;
  var toIntegerOrInfinity = toIntegerOrInfinity$4;
  var toLength$1 = toLength$4;
  var toString$1 = toString$8;
  var requireObjectCoercible$1 = requireObjectCoercible$6;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var getMethod$1 = getMethod$9;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol$1 = wellKnownSymbol$m;

  var REPLACE = wellKnownSymbol$1('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis([].concat);
  var push = uncurryThis([].push);
  var stringIndexOf = uncurryThis(''.indexOf);
  var stringSlice = uncurryThis(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$1(this);
        var replacer = searchValue == undefined ? undefined : getMethod$1(searchValue, REPLACE);
        return replacer
          ? call$2(replacer, searchValue, O, replaceValue)
          : call$2(nativeReplace, toString$1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$2(this);
        var S = toString$1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString$1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec$1(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString$1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$1(result[0]);
          var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var call$1 = functionCall;
  var hasOwn = hasOwnProperty_1;
  var isPrototypeOf = objectIsPrototypeOf;
  var regExpFlags = regexpFlags$1;

  var RegExpPrototype$1 = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype$1) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$1, R)
      ? call$1(regExpFlags, R) : flags;
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var redefine = redefine$8.exports;
  var anObject$1 = anObject$r;
  var $toString = toString$8;
  var fails$1 = fails$n;
  var getRegExpFlags = regexpGetFlags;

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var n$ToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails$1(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$1(this);
      var pattern = $toString(R.source);
      var flags = $toString(getRegExpFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
  }

  var call = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject = anObject$r;
  var toLength = toLength$4;
  var toString = toString$8;
  var requireObjectCoercible = requireObjectCoercible$6;
  var getMethod = getMethod$9;
  var advanceStringIndex = advanceStringIndex$3;
  var regExpExec = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
        return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this);
        var S = toString(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regExpExec(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = toString(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var $$1 = _export;
  var $findIndex = arrayIteration.findIndex;
  var addToUnscopables = addToUnscopables$2;

  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findindex
  $$1({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var $ = _export;
  var global$1 = global$I;
  var fails = fails$n;
  var isArray = isArray$3;
  var isObject = isObject$9;
  var toObject = toObject$8;
  var lengthOfArrayLike = lengthOfArrayLike$8;
  var createProperty = createProperty$4;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
  var wellKnownSymbol = wellKnownSymbol$m;
  var V8_VERSION = engineV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$1 = global$1.TypeError;

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $({ target: 'Array', proto: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike(E);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  /**
   * Helper functions
   */
  var hf = {
    /**
     * Appends element(s) to parent
     * @param {Element|Element[]} elem Element(s) to append to parent
     * @param {Element} to Parent element
     */
    appendTo: function appendTo(elem, to, idx) {
      if (Array.isArray(elem)) {
        elem.forEach(function (el) {
          if (idx === 0) to.insertBefore(el, to.childNodes[idx] || null);else to.appendChild(el);
        });
      } else {
        if (idx === 0) to.insertBefore(elem, to.childNodes[idx] || null);else to.appendChild(elem);
      }
    },

    /**
     * Adds event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to add event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    addEvent: function addEvent(elem, event, handler) {
      function listenEvent(el, evt, fn) {
        el.addEventListener(evt, fn, false);
      }

      if (Array.isArray(elem)) {
        elem.forEach(function (e) {
          return listenEvent(e, event, handler);
        });
      } else listenEvent(elem, event, handler);
    },

    /**
     * Removes event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to remove event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    removeEvent: function removeEvent(elem, event, handler) {
      function delEvent(el, evt, fn) {
        el.removeEventListener(evt, fn, false);
      }

      if (Array.isArray(elem)) {
        elem.forEach(function (e) {
          return delEvent(e, event, handler);
        });
      } else delEvent(elem, event, handler);
    },

    /**
     * Removes child nodes
     * @param {Element} elem Html element to empty
     */
    empty: function empty(elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    },

    /**
     * Creates an HTML element; `document.createElement` helper function
     * @see {@link http://jsfiddle.net/andr3ww/pvuzgfg6/13/}
     * @param {string} tag HTML tag name (i.e. `div`, `span`, `a`)
     * @param {Object} attributes Attribute object
     * @param {string|Element} content Element content: text or HTML element(s)
     * @param {Boolean} isHtml Determines if `content` specified should added as an html element
     */
    createElem: function createElem(tag, attributes, content, isHtml) {
      var el = document.createElement(tag);
      if (typeof content !== 'undefined') el[isHtml || false ? 'innerHTML' : 'innerText'] = content;
      if (typeof attributes !== 'undefined') hf.setAttributes(el, attributes);
      return el;
    },

    /**
     * Sets the attribute(s) of the element
     * @param {Element} el Html element
     * @param {Object} attrs Attribute object
     */
    setAttributes: function setAttributes(el, attrs) {
      for (var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
      }
    },

    /**
     * Sets the inline style(s) of the element
     * @param {Element} el HTML element
     * @param {Object} styles Styles object
     */
    setStyles: function setStyles(el, styles) {
      for (var style in styles) {
        el.style[style] = styles[style];
      }
    },

    /**
     * Adds class name(s) to the element
     * @param {Element} el HTML element
     * @param {string|string[]} className Class name to remove
     */
    addClass: function addClass(el, className) {
      if (Array.isArray(className)) {
        className.forEach(function (cn) {
          return el.classList.add(cn);
        });
      } else el.classList.add(className);
    },

    /**
     * Removes class name(s) of an element
     * @param {Element} el HTML element
     * @param {string|string[]} className Class name to remove
     */
    removeClass: function removeClass(el, className) {
      if (Array.isArray(className)) {
        className.forEach(function (cn) {
          return el.classList.remove(cn);
        });
      } else el.classList.remove(className);
    },

    /**
     * Gets the number of days based on the month of the given date
     * @param {Date} date Date object
     */
    getDaysCount: function getDaysCount(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },

    /**
     * Calculates date difference
     * @param {Date} from Date from
     * @param {Date} to Date to
     */
    dateDiff: function dateDiff(from, to) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((to - from) / (1000 * 60 * 60 * 24));
    },

    /**
     * Returns the document width and height
     */
    screenDim: function screenDim() {
      var doc = document.documentElement;
      return {
        height: Math.max(doc.offsetHeight, doc.clientHeight),
        width: Math.max(doc.offsetWidth, doc.clientWidth)
      };
    },

    /**
     * Calculates the offset of the given html element
     * @param {Element} el HTML element
     */
    calcOffset: function calcOffset(el) {
      var doc = document.documentElement || document.body,
          rect = el.getBoundingClientRect(),
          offset = {
        top: rect.top + doc.scrollTop,
        left: rect.left + doc.scrollLeft
      },
          dim = {
        height: el.offsetHeight,
        width: el.offsetWidth
      },
          screen = hf.screenDim();
      return {
        top: offset.top + dim.height,
        left: offset.left,
        right: screen.width - (offset.left + dim.width),
        bottom: screen.height - offset.top
      };
    },

    /**
    * Vanilla JavaScript version of jQuery.extend()
    * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/}
    */
    extend: function extend() {
      // Variables
      var extended = {};
      var deep = false;
      var i = 0;
      var length = arguments.length; // Check if a deep merge

      if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
      } // Merge the object into the extended object


      var merge = function merge(obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            // If deep merge and property is an object, merge properties
            if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
              extended[prop] = hf.extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      }; // Loop through each object and conduct a merge


      for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
      }

      return extended;
    },

    /**
     * Returns formatted string representation of specified date
     * @param {Date} date Date to format
     * @param {string} format Date format pattern
     */
    formatDate: function formatDate(date, format) {
      var d = new Date(date),
          day = d.getDate(),
          m = d.getMonth(),
          y = d.getFullYear(),
          i18n = this.config.i18n,
          mVal = m + 1;
      return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|DD|D|dd|d)/g, function (e) {
        switch (e) {
          case 'd':
            return day;

          case 'dd':
            return ('00' + day).slice(-2);

          case 'D':
            return i18n.shortDays[d.getDay()];

          case 'DD':
            return i18n.days[d.getDay()];

          case 'm':
            return mVal;

          case 'mm':
            return ('00' + mVal).slice(-2);

          case 'mmm':
            return i18n.shortMonths[m];

          case 'mmmm':
            return i18n.months[m];

          case 'yy':
            return y.toString().substring(2, 4);

          case 'yyyy':
            return y;
        }
      });
    },

    /**
     * Parses date string using default or specified format
     * @param {string} date Date string to parse
     * @param {string=} format Format of the date string; `config.format` will be used if not specified
     */
    parseDate: function parseDate(date, format) {
      var _ = this,
          _format = typeof format === 'undefined' ? _.config.format : format,
          dayLength = (_format.match(/d/g) || []).length,
          monthLength = (_format.match(/m/g) || []).length,
          yearLength = (_format.match(/y/g) || []).length,
          isFullMonth = monthLength == 4,
          isMonthNoPadding = monthLength == 1,
          isDayNoPadding = dayLength == 1,
          lastIndex = date.length,
          firstM = _format.indexOf('m'),
          firstD = _format.indexOf('d'),
          firstY = _format.indexOf('y'),
          month = '',
          day = '',
          year = '',
          before,
          after,
          monthIdx = -1;

      if (date === '') return {
        m: null,
        d: null,
        y: null,
        date: new Date('')
      }; // Get month on given date string using the format (default or specified)

      if (isFullMonth) {
        monthIdx = _.config.i18n.months.findIndex(function (m) {
          return date.indexOf(m) >= 0;
        });
        month = _.config.i18n.months[monthIdx];
        _format = _format.replace('mmmm', month);
        firstD = _format.indexOf('d');
        firstY = firstY < firstM ? _format.indexOf('y') : _format.indexOf('y', _format.indexOf(month) + month.length);
      } else if (!isDayNoPadding && !isMonthNoPadding || isDayNoPadding && !isMonthNoPadding && firstM < firstD) {
        month = date.substring(firstM, firstM + monthLength);
      } else {
        var lastIndexM = _format.lastIndexOf('m');

        before = _format.substring(firstM - 1, firstM);
        after = _format.substring(lastIndexM + 1, lastIndexM + 2);

        if (lastIndexM === _format.length - 1) {
          month = date.substring(date.indexOf(before, firstM - 1) + 1, lastIndex);
        } else if (firstM === 0) {
          month = date.substring(0, date.indexOf(after, firstM));
        } else {
          month = date.substring(date.indexOf(before, firstM - 1) + 1, date.indexOf(after, firstM + 1));
        }
      } // Get date on given date string using the format (default or specified)


      if (!isDayNoPadding && !isMonthNoPadding || !isDayNoPadding && isMonthNoPadding && firstD < firstM) {
        day = date.substring(firstD, firstD + dayLength);
      } else {
        var lastIndexD = _format.lastIndexOf('d');

        before = _format.substring(firstD - 1, firstD);
        after = _format.substring(lastIndexD + 1, lastIndexD + 2);

        if (lastIndexD === _format.length - 1) {
          day = date.substring(date.indexOf(before, firstD - 1) + 1, lastIndex);
        } else if (firstD === 0) {
          day = date.substring(0, date.indexOf(after, firstD));
        } else {
          day = date.substring(date.indexOf(before, firstD - 1) + 1, date.indexOf(after, firstD + 1));
        }
      } // Get year on given date string using the format (default or specified)


      if (!isMonthNoPadding && !isDayNoPadding || isMonthNoPadding && isDayNoPadding && firstY < firstM && firstY < firstD || !isMonthNoPadding && isDayNoPadding && firstY < firstD || isMonthNoPadding && !isDayNoPadding && firstY < firstM) {
        year = date.substring(firstY, firstY + yearLength);
      } else {
        before = _format.substring(firstY - 1, firstY);
        var yearStart = date.indexOf(before, firstY - 1) + 1;
        year = date.substring(yearStart, yearStart + yearLength);
      }

      return {
        m: month,
        d: day,
        y: year,
        date: isNaN(parseInt(month)) ? new Date("".concat(year, "-").concat(month, "-").concat(day)) : new Date(year, isNaN(parseInt(month)) ? monthIdx : month - 1, day)
      };
    },

    /**
     * Triggers the `change`, `onchange`, `datechanged` event on the specified input element
     * @param {HTMLInputElement} el HTML input element
     * @param {Object} data Event data
     */
    triggerChange: function triggerChange(el, data) {
      var change = new Event('change', {
        bubbles: true,
        cancelable: false
      });
      var onChange = new Event('onchange', {
        bubbles: true,
        cancelable: false
      });
      var dateChanged = new Event('datechanged', {
        bubbles: true,
        cancelable: false
      });
      dateChanged.data = data;
      el.dispatchEvent(change);
      el.dispatchEvent(onChange);
      el.dispatchEvent(dateChanged);
    },

    /**
     * Creates HTML for the days of the week
     */
    daysOfWeekDOM: function daysOfWeekDOM() {
      var config = this.config,
          locale = config.i18n,
          firstDay = config.firstDay || locale.firstDay;
      var weekDays = [];

      for (var i = 0, dow = firstDay; i < locale.shorterDays.length; i++, dow++) {
        weekDays.push(locale.shorterDays[dow % 7]);
      }

      return "<span>".concat(weekDays.join('</span><span>'), "</span>");
    },

    /**
     * Converts date JSON to Date object
     * @param {Object} o Date breakdown (year, month, date)
     * @param {number} o.year Year value
     * @param {number} o.month Month value
     * @param {number} o.date Date value
     */
    jsonToDate: function jsonToDate(o) {
      return new Date(o.year, o.month, o.date);
    },

    /**
     * Converts Date object to JSON
     * @param {Date} date Date object
     */
    dateToJson: function dateToJson(date) {
      return date ? {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate()
      } : null;
    },

    /**
     * Determines if object is an HTML element
     * @returns `true` if the object is an instance of an HTML element; `false` otherwise
     */
    isElement: function isElement(obj) {
      return obj instanceof Element;
    },

    /**
     * Swipe event handler
     * @param {Element} elem HTML element
     * @param {Object} callbacks Swipe event callbacks
     * @param {Function} callbacks.swipeRight Callback when swiping right
     * @param {Function} callbacks.swipeLeft Callback when swiping left
     */
    swipeEvent: function swipeEvent(elem, callbacks) {
      var clientX = 0,
          clientY = 0,
          lastX = 0,
          lastY = 0;
      this.addEvent(elem, 'touchstart', function (e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      });
      this.addEvent(elem, 'touchend', function (e) {
        lastX = e.changedTouches[0].clientX;
        lastY = e.changedTouches[0].clientY;
        var deltaX = clientX - lastX,
            deltaY = clientY - lastY,
            swipeRight = deltaX > 100 && Math.abs(deltaY) <= 50,
            swipeLeft = deltaX < -100 && Math.abs(deltaY) <= 50;
        if (swipeRight && callbacks !== null && callbacks !== void 0 && callbacks.swipeRight) callbacks.swipeRight();else if (swipeLeft && callbacks !== null && callbacks !== void 0 && callbacks.swipeLeft) callbacks.swipeLeft();
      });
    },

    /**
     * Click event handler for date elements
     * @param {Element} dateElem Date element
     */
    dateClickEvent: function dateClickEvent(dateElem) {
      var _ = this;

      hf.addEvent(dateElem, 'click', function () {
        var _this = this,
            _year = _this.dataset.year,
            _month = _this.dataset.month,
            _date = _this.dataset.date,
            _selected = new Date(_year, _month, _date),
            isFrom = false;

        if (_._dateDisabled(_selected)) return;

        if (_.config.range) {
          var rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
              rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

          if (!_.rangeFrom || _.rangeFrom && _selected < rangeFrom || _.rangeFrom && _.rangeTo && hf.dateDiff(rangeFrom, _selected) <= hf.dateDiff(_selected, rangeTo) && hf.dateDiff(rangeFrom, _selected) !== 0 || _.rangeFrom && _.rangeTo && rangeTo.getTime() === _selected.getTime()) {
            _.rangeFrom = {
              year: _year,
              month: _month,
              date: _date
            };
            isFrom = true;
          } else if (!_.rangeTo || _.rangeTo && _selected > rangeTo || _.rangeFrom && _.rangeTo && hf.dateDiff(_selected, rangeTo) < hf.dateDiff(rangeFrom, _selected) && hf.dateDiff(_selected, rangeTo) !== 0 || _.rangeFrom && _.rangeTo && rangeFrom.getTime() === _selected.getTime()) {
            _.rangeTo = {
              year: _year,
              month: _month,
              date: _date
            };
            isFrom = false;
          }

          _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
            var _delem$classList;

            var _deYear = delem.dataset.year,
                _deMonth = delem.dataset.month,
                _deDate = delem.dataset.date,
                _inRange = _._inRange(new Date(_deYear, _deMonth, _deDate));

            delem.classList[_year === _deYear && _month === _deMonth && _date === _deDate ? 'add' : 'remove'](isFrom ? 'range-from' : 'range-to');
            delem.classList[_inRange ? 'add' : 'remove']('in-range');

            (_delem$classList = delem.classList).remove.apply(_delem$classList, ['range-from-preview', 'range-to-preview', 'in-range-preview']);
          });
        } else {
          if (_.config.multiple) {
            var isSelected = _this.classList.contains('selected');

            _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll(".dudp__date[data-date=\"".concat(_date, "\"][data-month=\"").concat(_month, "\"][data-year=\"").concat(_year, "\"]")).forEach(function (delem) {
              delem.classList[isSelected ? 'remove' : 'add']('selected');
            });

            if (isSelected) _.selectedDates = _.selectedDates.filter(function (sd) {
              return sd.getTime() !== _selected.getTime();
            });else _.selectedDates.push(_selected);

            _._setSelection();
          } else {
            _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
              var _deYear = delem.dataset.year,
                  _deMonth = delem.dataset.month,
                  _deDate = delem.dataset.date;
              delem.classList[_year === _deYear && _month === _deMonth && _date === _deDate ? 'add' : 'remove']('selected');
            });

            _.selected = {
              year: _year,
              month: _month,
              date: _date
            };

            _._setSelection();

            if (_.config.auto) {
              _.date = _selected;

              _.setValue(_.date);

              _.hide();
            }
          }
        }

        _.datepicker.calendarHolder.wrapper.querySelectorAll('.dudp__month').forEach(function (melem) {
          var _meMonth = melem.dataset.month;
          melem.classList[_meMonth === _month ? 'add' : 'remove']('selected');
        });
      });
    },

    /**
     * Hover event handler for date elements
     * @param {Element} dateElem Date element
     */
    dateHoverEvent: function dateHoverEvent(dateElem) {
      var _ = this,
          inRange = function inRange(selected, isFrom, date) {
        var _from = isFrom ? selected : _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
            _to = !isFrom ? selected : _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

        return _from && date > _from && _to && date < _to;
      };

      hf.addEvent(dateElem, 'mouseover', function () {
        var _this = this,
            _year = _this.dataset.year,
            _month = _this.dataset.month,
            _date = _this.dataset.date,
            _selected = new Date(_year, _month, _date),
            isFrom = false;

        if (_._dateDisabled(_selected) || _this.classList.contains('range-from') || _this.classList.contains('range-to')) return;

        if (_.rangeFrom) {
          var rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
              rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

          if (!_.rangeFrom || _.rangeFrom && _selected < rangeFrom || _.rangeFrom && _.rangeTo && hf.dateDiff(rangeFrom, _selected) <= hf.dateDiff(_selected, rangeTo) && hf.dateDiff(rangeFrom, _selected) !== 0 || _.rangeFrom && _.rangeTo && rangeTo.getTime() === _selected.getTime()) {
            isFrom = true;
          } else if (!_.rangeTo || _.rangeTo && _selected > rangeTo || _.rangeFrom && _.rangeTo && hf.dateDiff(_selected, rangeTo) < hf.dateDiff(rangeFrom, _selected) && hf.dateDiff(_selected, rangeTo) !== 0 || _.rangeFrom && _.rangeTo && rangeFrom.getTime() === _selected.getTime()) {
            isFrom = false;
          }

          _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
            var _deYear = delem.dataset.year,
                _deMonth = delem.dataset.month,
                _deDate = delem.dataset.date,
                _inRange = inRange(_selected, isFrom, new Date(_deYear, _deMonth, _deDate));

            delem.classList[_year === _deYear && _month === _deMonth && _date === _deDate ? 'add' : 'remove'](isFrom ? 'range-from-preview' : 'range-to-preview');
            delem.classList[_inRange ? 'add' : 'remove']('in-range-preview');
          });
        }
      });
      hf.addEvent(dateElem, 'mouseout', function () {
        var _this = this,
            _year = _this.dataset.year,
            _month = _this.dataset.month,
            _date = _this.dataset.date,
            _selected = new Date(_year, _month, _date);

        if (_._dateDisabled(_selected)) return;

        _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date.range-from-preview, .dudp__date.range-to-preview, .dudp__date.in-range-preview').forEach(function (delem) {
          var _delem$classList2;

          (_delem$classList2 = delem.classList).remove.apply(_delem$classList2, ['range-from-preview', 'range-to-preview', 'in-range-preview']);
        });
      });
    }
  };

  /**
   * Dictionary defaults
   */

  var DICT_DEFAULTS = {
    btnOk: 'OK',
    btnCancel: 'CANCEL',
    btnClear: 'CLEAR'
  };

  var Locale = /*#__PURE__*/_createClass(
  /**
   * Creates i18n locale
   * @param {string[]} months List of month names
   * @param {string[]} shortMonths List of shortened month names
   * @param {string[]} days List of day names
   * @param {string[]} shortDays List of 3-letter day names
   * @param {string[]} shorterDays List of 2-letter day names
   * @param {number} firstDay First day of the week (1 - 7; Monday - Sunday)
   * @param {Object} dict Dictionary of words to be used on the UI
   * @param {string} dict.btnOk OK button text
   * @param {string} dict.btnCancel Cancel button text
   * @param {string} dict.btnClear Clear button text
   */
  function Locale(months, shortMonths, days, shortDays, shorterDays, firstDay, dict) {
    _classCallCheck(this, Locale);

    this.months = months;
    this.shortMonths = shortMonths || this.months.map(function (x) {
      return x.substring(0, 3);
    });
    this.days = days;
    this.shortDays = shortDays || this.days.map(function (x) {
      return x.substring(0, 3);
    });
    this.shorterDays = shorterDays || this.days.map(function (x) {
      return x.substring(0, 2);
    });
    this.firstDay = firstDay;
    this.dict = hf.extend(DICT_DEFAULTS, dict);
  });
  /**
   * Internationalization
   */


  var i18n = {
    // expose Locale class
    Locale: Locale,

    /**
     * English
     */
    en: new Locale('January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), null, 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'), null, null, 7),

    /**
     * Russian
     */
    ru: new Locale('январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'), 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'), 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'), 'вс_пн_вт_ср_чт_пт_сб'.split('_'), 'вс_пн_вт_ср_чт_пт_сб'.split('_'), 1, {
      btnCancel: 'Отменить',
      btnClear: 'Очистить'
    }),

    /**
     * Spanish
     */
    es: new Locale('enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'), null, 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'), 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'), null, 1, {
      btnCancel: 'Cancelar',
      btnClear: 'Vaciar'
    }),

    /**
     * Turkish
     */
    tr: new Locale('Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'), null, 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'), 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'), 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'), 1),

    /**
     * Persian
     */
    fa: new Locale('ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split('_'), "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split('_'), 'ی_د_س_چ_پ_ج_ش'.split('_'), 1),

    /**
     * French
     */
    fr: new Locale('janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'), 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'), 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'), 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'), 'di_lu_ma_me_je_ve_sa'.split('_'), 1, {
      btnCancel: 'Abandonner',
      btnClear: 'Effacer'
    }),

    /**
     * German
     */
    de: new Locale('Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'), 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'), 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'), 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'), 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'), 1, {
      btnCancel: 'Stornieren',
      btnClear: 'Löschen'
    }),

    /**
     * Japanese
     */
    ja: new Locale('一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'), '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'), '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'), '日曜_月曜_火曜_水曜_木曜_金曜_土曜'.split('_'), '日_月_火_水_木_金_土'.split('_'), 7),

    /**
     * Portuguese
     */
    pt: new Locale('janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'), null, 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'), 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'), 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'), 1, {
      btnCancel: 'Cancelar',
      btnClear: 'Clarear'
    }),

    /**
     * Vietnamese
     */
    vi: new Locale('tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'), 'Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12'.split('_'), 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'), 'CN_T2_T3_T4_T5_T6_T7'.split('_'), 'CN_T2_T3_T4_T5_T6_T7'.split('_'), 1),

    /**
     * Chinese
     */
    zh: new Locale('一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'), '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'), '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'), '周日_周一_周二_周三_周四_周五_周六'.split('_'), '日_一_二_三_四_五_六'.split('_'), 1)
  };

  /**
   * Keydown excluded key codes
   */

  var EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
  /**
   * Key name for the date picker data
   */

  var DATA_KEY = '_duDatepicker';
  /**
   * Default date picker query selector class
   */

  var DEFAULT_CLASS = '.duDatepicker-input';
  /**
   * Header selected date format
   */

  var SELECTED_FORMAT = 'D, mmm d';
  /**
   * Default date picker configurations
   */

  var DEFAULTS = {
    // Default input value (should be formatted as specified in the 'format' configuration)
    value: null,
    // Determines the date format
    format: 'mm/dd/yyyy',
    // Determines the date format of the 'datechanged' callback; 'format' config will be used by default
    outFormat: null,
    // Determines the color theme of the date picker
    theme: 'blue',
    // Determines if clicking the date will automatically select it; OK button will not be displayed if true
    auto: false,
    // Determines if date picker will be inline (popover) with the input (and not a dialog)
    inline: false,
    // Determines if Clear button is displayed
    clearBtn: false,
    // Determines if Cancel button is displayed
    cancelBtn: false,
    // Determines if clicking the overlay will close the date picker
    overlayClose: true,
    // Determines the minimum selectable date
    minDate: null,
    // Determines the maximum selectable date
    maxDate: null,
    // Determines the minimum year of selectable date
    minYear: null,
    // Determines the maximum year of selectable date
    maxYear: null,
    // Determines how many years (earlier than currently selected year) to display
    priorYears: 50,
    // Determines how many years (later than currently selected year) to display
    laterYears: 25,
    // Array of dates to be disabled (format should be the same as the specified format)
    disabledDates: [],
    // Array of days of the week to be disabled (i.e. Monday, Tuesday, Mon, Tue, Mo, Tu)
    disabledDays: [],
    // Determines if date picker range mode is on
    range: false,
    // Range string delimiter
    rangeDelim: '-',
    // Date from target input element (range mode)
    fromTarget: null,
    // Date to target input element (range mode)
    toTarget: null,
    // Determines if date picker can select multiple dates
    multiple: false,
    // callback functions
    events: {
      // Callback function on date selection
      dateChanged: null,
      // Function call to execute custom date range format (displayed on the input) upon selection
      onRangeFormat: null,
      // Callback function when date picker is initialized
      ready: null,
      // Callback function when date picker is shown
      shown: null,
      // Callback function when date picker is hidden
      hidden: null
    },
    // internationalization
    i18n: i18n.en,
    // first day of the week (1 - 7; Monday - Sunday); default will be fetched from i18n.firstDay
    firstDay: null,
    // parent element where the date picker DOM will be added
    root: 'body'
  };

  /**
   * Date picker class
   */

  var _duDatePicker = /*#__PURE__*/function () {
    /**
     * Default configurations
     */

    /**
     * Creates date picker
     * @param {HTMLInputElement} el Input element
     * @param {Object} options Date picker options
     */
    function _duDatePicker(el, options) {
      _classCallCheck(this, _duDatePicker);

      var _ = this,
          i18n = options.i18n;

      if (typeof i18n === 'string') options.i18n = duDatepicker.i18n[i18n];
      this.config = hf.extend(_duDatePicker.default_configs || DEFAULTS, options);
      if (this.config.multiple && this.config.format.indexOf(',') >= 0) throw new Error('For multiple dates mode, comma (,) should not be used in the format configuration.');
      var dp_root = this.config.root;
      if (typeof dp_root === 'string') this.config.root = document.querySelector(dp_root);else if (!hf.isElement(dp_root)) delete this.config.root;
      /**
       * Determines if date picker is animating
       */

      this.animating = false;
      /**
       * Determines if date picker is displayed/shown
       */

      this.visible = false;
      /**
       * Input element
       * @type {HTMLInputElement}
       */

      this.input = el;
      this.input.readOnly = true;
      this.fromEl = document.querySelector(this.config.fromTarget);
      this.toEl = document.querySelector(this.config.toTarget);
      this.input.hidden = this.config.range && (this.fromEl || this.toEl);
      this.viewMode = 'calendar';
      this.dict = hf.extend(DICT_DEFAULTS, this.config.i18n.dict);
      /**
       * Date picker elements holder
       * @type {Object}
       */

      this.datepicker = {
        container: hf.createElem('div', {
          class: 'dcalendarpicker'
        }),
        wrapper: hf.createElem('div', {
          class: 'dudp__wrapper',
          tabindex: 0
        }),
        header: {
          wrapper: hf.createElem('section', {
            class: 'dudp__calendar-header'
          }),
          selectedYear: hf.createElem('span', {
            class: 'dudp__sel-year'
          }),
          selectedDate: hf.createElem('span', {
            class: 'dcp_sel-date'
          })
        },
        calendarHolder: {
          wrapper: hf.createElem('section', {
            class: 'dudp__cal-container'
          }),
          btnPrev: hf.createElem('span', {
            class: 'dudp__btn-cal-prev',
            role: 'button'
          }, '&lsaquo;', true),
          btnNext: hf.createElem('span', {
            class: 'dudp__btn-cal-next',
            role: 'button'
          }, '&rsaquo;', true),
          calendarViews: {
            wrapper: hf.createElem('div', {
              class: 'dudp__calendar-views'
            }),
            calendars: []
          },
          yearsView: hf.createElem('div', {
            class: 'dudp__years-view dp__hidden'
          }),
          monthsView: hf.createElem('div', {
            class: 'dudp__months-view dp__hidden'
          }),
          buttons: {
            wrapper: hf.createElem('div', {
              class: 'dudp__buttons'
            }),
            btnClear: hf.createElem('span', {
              class: 'dudp__button clear',
              role: 'button'
            }, _.dict.btnClear),
            btnCancel: hf.createElem('span', {
              class: 'dudp__button cancel',
              role: 'button'
            }, _.dict.btnCancel),
            btnOk: hf.createElem('span', {
              class: 'dudp__button ok',
              role: 'button'
            }, _.dict.btnOk)
          }
        }
      }; // set default value

      if (_.config.value && !_.config.range && !_.config.multiple) {
        _.input.value = _.config.value;

        _.input.setAttribute('value', _.config.value);
      }

      this.minDate = _.input.dataset.mindate || _.config.minDate;
      this.maxDate = _.input.dataset.maxdate || _.config.maxDate; // current selected date, default is today if no value given

      var _date = new Date();

      if (_.config.range) {
        var value = _.input.value || _.config.value || '',
            _range = value ? value.split(_.config.rangeDelim) : [];

        if (value !== '' && _range.length < 2) throw new Error('Invalid date range value.');

        var _from = value === '' ? null : hf.parseDate.call(_, _range[0]).date,
            _to = value === '' ? null : hf.parseDate.call(_, _range[1]).date;

        var canSet = _._canSetValue('range', {
          from: _from,
          to: _to
        });

        if (!canSet.canSet) {
          throw new Error(canSet.remarks);
        }

        this.dateFrom = _from;
        this.dateTo = _to;
        this.rangeFrom = null;
        this.rangeTo = null;
        this.viewMonth = (_from ? _from : _date).getMonth();
        this.viewYear = (_from ? _from : _date).getFullYear(); // set default value

        if (value) {
          var valueDisp = _.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : value,
              formattedFrom = hf.formatDate.call(_, _from, _.config.format),
              outFrom = hf.formatDate.call(_, _from, _.config.outFormat || _.config.format),
              formattedTo = hf.formatDate.call(_, _to, _.config.format),
              outTo = hf.formatDate.call(_, _to, _.config.outFormat || _.config.format);
          _.input.value = valueDisp;
          _.rangeFrom = hf.dateToJson(_from);
          _.rangeTo = hf.dateToJson(_to);
          hf.setAttributes(_.input, {
            'value': valueDisp,
            'data-range-from': outFrom,
            'data-range-to': outTo
          });

          if (_.fromEl) {
            _.fromEl.value = formattedFrom;
            hf.setAttributes(_.fromEl, {
              'value': formattedFrom,
              'data-value': outFrom
            });
          }

          if (_.toEl) {
            _.toEl.value = formattedTo;
            hf.setAttributes(_.toEl, {
              'value': formattedFrom,
              'data-value': outTo
            });
          }
        }
      } else if (_.config.multiple) {
        var dates = [];

        if (_.input.value) {
          _.input.value.split(',').forEach(function (v) {
            dates.push(hf.parseDate.call(_, v).date);
          });
        } else if (_.config.value) {
          var isArray = Array.isArray(_.config.value),
              values = isArray ? _.config.value : _.config.value.split(',');
          values.forEach(function (v) {
            dates.push(hf.parseDate.call(_, v).date);
          });
        }

        dates = dates.sort(function (a, b) {
          return a > b ? 1 : a < b ? -1 : 0;
        });

        var _canSet = _._canSetValue('multiple', dates);

        if (!_canSet.canSet) {
          throw new Error(_canSet.remarks);
        }

        var starting = dates.length > 0 ? dates.reduce(function (a, b) {
          return a < b ? a : b;
        }) : new Date();
        this.dates = _toConsumableArray(dates);
        this.selectedDates = _toConsumableArray(dates);
        this.viewYear = starting.getFullYear();
        this.viewMonth = starting.getMonth();
        hf.setAttributes(_.input, {
          'value': dates.map(function (d) {
            return hf.formatDate.call(_, d, _.config.outFormat || _.config.format);
          }).join(',')
        });
      } else {
        var date = _.input.value === '' ? _date : hf.parseDate.call(_, _.input.value).date;

        var _canSet2 = _._canSetValue('default', date);

        if (!_canSet2.canSet) {
          throw new Error(_canSet2.remarks);
        }

        this.date = date;
        this.selected = hf.dateToJson(_.date);
        this.viewMonth = _.selected.month;
        this.viewYear = _.selected.year;
      }
      /* input event handlers */


      function _inputClick() {
        _.showInFromEl = _.config.inline && _.fromEl && this === _.fromEl;
        _.showInToEl = _.config.inline && _.toEl && this === _.toEl;

        _.show();
      }

      function _inputKeydown(e) {
        if (e.keyCode === 13) {
          _.showInFromEl = _.config.inline && _.fromEl && this === _.fromEl;
          _.showInToEl = _.config.inline && _.toEl && this === _.toEl;

          _.show();
        }

        return !(EX_KEYS.indexOf(e.which) < 0);
      }
      /**
       * Unbinds input `click` and `keydown` event handlers
       */


      this._unbindInput = function () {
        _.input.readOnly = false;

        _.input.removeEventListener('click', _inputClick);

        _.input.removeEventListener('keydown', _inputKeydown);

        if (_.fromEl) {
          _.fromEl.readOnly = false;

          _.fromEl.removeEventListener('click', _inputClick);

          _.fromEl.removeEventListener('keydown', _inputKeydown);
        }

        if (_.toEl) {
          _.toEl.readOnly = false;

          _.toEl.removeEventListener('click', _inputClick);

          _.toEl.removeEventListener('keydown', _inputKeydown);
        }
      };

      hf.addEvent(_.input, 'click', _inputClick);
      hf.addEvent(_.input, 'keydown', _inputKeydown);

      if (_.fromEl) {
        _.fromEl.readOnly = true;
        hf.addEvent(_.fromEl, 'click', _inputClick);
        hf.addEvent(_.fromEl, 'keydown', _inputKeydown);
      }

      if (_.toEl) {
        _.toEl.readOnly = true;
        hf.addEvent(_.toEl, 'click', _inputClick);
        hf.addEvent(_.toEl, 'keydown', _inputKeydown);
      } // initialize


      this._init();

      this._setSelection();
    }
    /**
     * Initializes the date picker
     */


    _createClass(_duDatePicker, [{
      key: "_init",
      value: function _init() {
        var _ = this,
            picker = _.datepicker,
            header = picker.header,
            calendarHolder = picker.calendarHolder,
            buttons = calendarHolder.buttons; // Setup header


        if (!_.config.inline) {
          hf.appendTo([header.selectedYear, header.selectedDate], header.wrapper);
          hf.appendTo(header.wrapper, picker.wrapper);
          hf.addEvent(header.selectedYear, 'click', function () {
            if (_.viewMode !== 'years') _._switchView('years');
          });
          hf.addEvent(header.selectedDate, 'click', function () {
            var now = new Date(),
                _month = _.config.range ? now.getMonth() : _.selected.month,
                _year = _.config.range ? now.getFullYear() : _.selected.year;

            if (_.viewMonth !== _month || _.viewYear !== _year || _.viewMode !== 'calendar') {
              _.viewMonth = _month;
              _.viewYear = _year;

              _._setupCalendar();

              _._switchView('calendar');
            }
          });
        } // Setup months view


        _._setupMonths(); // Setup years view


        hf.appendTo(_._getYears(), calendarHolder.yearsView);
        if (_.config.clearBtn) hf.appendTo(buttons.btnClear, buttons.wrapper);
        if (_.config.cancelBtn) hf.appendTo(buttons.btnCancel, buttons.wrapper);
        if (!_.config.auto || _.config.range || _.config.multiple) hf.appendTo(buttons.btnOk, buttons.wrapper);
        hf.appendTo([calendarHolder.btnPrev, calendarHolder.btnNext, calendarHolder.calendarViews.wrapper, calendarHolder.monthsView, calendarHolder.yearsView, buttons.wrapper], calendarHolder.wrapper);
        hf.appendTo(calendarHolder.wrapper, picker.wrapper);
        hf.appendTo(picker.wrapper, picker.container);
        hf.appendTo(picker.container, _.config.root);
        if (_.config.inline) picker.container.setAttribute('inline', true); // Setup theme

        picker.wrapper.dataset.theme = _.input.dataset.theme || _.config.theme;
        hf.addEvent(picker.wrapper, 'keydown', function (e) {
          if (e.keyCode === 27) _.hide(); // esc
          else if (e.keyCode === 37) _._move('prev'); // arrow left
          else if (e.keyCode === 39) _._move('next'); // arrow right
        });
        if (_.config.inline) hf.addEvent(picker.wrapper, 'blur', function () {
          _.hide();
        }); // arrows click event

        hf.addEvent(calendarHolder.btnPrev, 'click', function () {
          _._move('prev');
        });
        hf.addEvent(calendarHolder.btnNext, 'click', function () {
          _._move('next');
        }); // month & year click events

        hf.addEvent(calendarHolder.calendarViews.wrapper, 'click', function (e) {
          if (e.target.classList.contains('cal-year')) {
            _._switchView('years');
          } else if (e.target.classList.contains('cal-month')) {
            _._switchView('months');
          }
        }); // clear button event

        if (_.config.clearBtn) hf.addEvent(buttons.btnClear, 'click', function () {
          _.setValue('');

          _.hide();
        }); // overlay events

        if (_.config.overlayClose) {
          hf.addEvent(picker.container, 'click', function () {
            _.hide();
          });
          hf.addEvent(picker.wrapper, 'click', function (e) {
            e.stopPropagation();
          });
        } // cancel button event


        if (_.config.cancelBtn) {
          hf.addEvent(buttons.btnCancel, 'click', function () {
            _.hide();
          });
        } // ok button event


        hf.addEvent(buttons.btnOk, 'click', function () {
          if (_.config.range) {
            if (!_.rangeFrom || !_.rangeTo) return;

            var _from = hf.jsonToDate(_.rangeFrom),
                _to = hf.jsonToDate(_.rangeTo);

            if (_._rangeHasDisabled()) return;
            _.dateFrom = _from;
            _.dateTo = _to;

            _.setValue([hf.formatDate.call(_, _from, _.config.format), hf.formatDate.call(_, _to, _.config.format)].join(_.config.rangeDelim));
          } else if (_.config.multiple) {
            _.dates = _toConsumableArray(_.selectedDates);

            _.setValue(_.dates.map(function (d) {
              return hf.formatDate.call(_, d, _.config.format);
            }));
          } else {
            var _date = hf.jsonToDate(_.selected);

            if (_._dateDisabled(_date)) return;
            _.date = _date;

            _.setValue(_.date);
          }

          _.hide();
        }); // calendar swipe event

        hf.swipeEvent(this.datepicker.calendarHolder.wrapper, {
          swipeRight: function swipeRight() {
            _._move('next');
          },
          swipeLeft: function swipeLeft() {
            _._move('prev');
          }
        });
        if (_.config.events && _.config.events.ready) _.config.events.ready.call(_, _);
      }
      /**
       * Gets the current date
       */

    }, {
      key: "_getToday",
      value: function _getToday() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
      /**
       * Determines if date is in the selected date range
       * @param {Date} date Date object
       */

    }, {
      key: "_inRange",
      value: function _inRange(date) {
        if (!this.config.range) return false;

        var _ = this,
            _from = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
            _to = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

        return _from && date > _from && _to && date < _to;
      }
      /**
       * Determines if date is beyond the minDate, maxDate, minYear or maxYear configurations (if any)
       * @param {Date} date Date object
       */

    }, {
      key: "_beyondMinMax",
      value: function _beyondMinMax(date) {
        var _ = this,
            config = _.config,
            min = null,
            max = null,
            dateYear = date.getFullYear(),
            today = _._getToday(),
            minYearCap = config.minYear && dateYear < config.minYear,
            maxYearCap = config.maxYear && dateYear > config.maxYear;

        if (_.minDate) min = _.minDate === "today" ? today : new Date(_.minDate);
        if (_.maxDate) max = _.maxDate === "today" ? today : new Date(_.maxDate);
        return min && date < min || max && date > max || minYearCap || maxYearCap;
      }
      /**
       * Determines if date is disabled
       * @param {Date} date Date object
       * @returns {Boolean} `true` if specified date should be disabled, `false` otherwise
       */

    }, {
      key: "_dateDisabled",
      value: function _dateDisabled(date) {
        var _ = this,
            _dates = _.config.disabledDates,
            _days = _.config.disabledDays,
            _inDates = _dates.filter(function (x) {
          if (x.indexOf('-') >= 0) return date >= hf.parseDate.call(_, x.split('-')[0]).date && date <= hf.parseDate.call(_, x.split('-')[1]).date;else return hf.parseDate.call(_, x).date.getTime() === date.getTime();
        }).length > 0,
            day = date.getDay(),
            dayName = _.config.i18n.days[day],
            dayNameShort = _.config.i18n.shortDays[day],
            dayNameShorter = _.config.i18n.shorterDays[day],
            _inDays = _days.indexOf(dayName) >= 0 || _days.indexOf(dayNameShort) >= 0 || _days.indexOf(dayNameShorter) >= 0;

        return _inDates || _inDays || _._beyondMinMax(date);
      }
      /**
       * Determines if selected date range has a disabled date
       */

    }, {
      key: "_rangeHasDisabled",
      value: function _rangeHasDisabled() {
        var _ = this,
            _from = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
            _to = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

        if (_from == null || _to == null) return false;

        var _start = hf.jsonToDate(_.rangeFrom);

        while (_start <= _to) {
          if (_._dateDisabled(_start)) return true;

          _start.setDate(_start.getDate() + 1);
        }

        return false;
      }
      /**
       * @param {number} year Year
       * @param {number} month Month
       * @returns {HTMLSpanElement[]} Returns the dates of the specified month and year
       */

    }, {
      key: "_getDates",
      value: function _getDates(year, month) {
        var _ = this,
            day = 1,
            today = _._getToday(),
            selected = _.config.range || _.config.multiple ? null : hf.jsonToDate(_.selected),
            rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
            rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null,
            date = new Date(year, month, day),
            totalDays = hf.getDaysCount(date),
            nmStartDay = 1,
            weeks = [],
            firstDay = _.config.firstDay || _.config.i18n.firstDay,
            lastDay = (firstDay + 6) % 7,
            addClassToDayEl = function addClassToDayEl(dayEl, date) {
          if (_._dateDisabled(date)) dayEl.classList.add('disabled');
          if (_._inRange(date)) dayEl.classList.add('in-range');
          if (date.getTime() === today.getTime()) dayEl.classList.add('current');

          if (!_.config.range && !_.config.multiple && date.getTime() === selected.getTime() || _.config.multiple && _.dates.find(function (x) {
            return x.getTime() === date.getTime();
          })) {
            dayEl.classList.add('selected');
          }

          if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime()) dayEl.classList.add('range-from');
          if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime()) dayEl.classList.add('range-to');
        };

        for (var week = 1; week <= 6; week++) {
          var daysOfWeek = [];

          for (var idx = 0, dow = firstDay; idx < 7; idx++, dow++) {
            daysOfWeek.push(hf.createElem('span', {
              class: 'dudp__date',
              'data-dow': dow % 7
            }));
          }

          var _loop = function _loop() {
            date.setDate(day);
            var dayOfWeek = date.getDay(),
                dayEl = daysOfWeek.find(function (d) {
              return parseInt(d.dataset.dow) === dayOfWeek;
            });
            dayEl.dataset.date = day;
            dayEl.dataset.month = month;
            dayEl.dataset.year = year;

            if (week === 1 && dayOfWeek === firstDay % 7) {
              return "break";
            } else if (dayOfWeek !== lastDay) {
              addClassToDayEl(dayEl, date);
              dayEl.innerText = day++;
            } else {
              addClassToDayEl(dayEl, date);
              dayEl.innerText = day++;
              return "break";
            }
          };

          while (day <= totalDays) {
            var _ret = _loop();

            if (_ret === "break") break;
          }
          /* For days of previous and next month */


          if (week === 1 || week > 4) {
            // First week
            if (week === 1) {
              (function () {
                var pm = new Date(year, month - 1, 1),
                    pmDays = hf.getDaysCount(pm);

                for (var a = 1; a <= 7; a++) {
                  pm.setDate(pmDays);
                  var dayEl = daysOfWeek.find(function (d) {
                    return parseInt(d.dataset.dow) === pm.getDay();
                  });
                  if (dayEl.innerText !== '') continue;
                  pmDays--;
                  dayEl.dataset.date = pm.getDate();
                  dayEl.dataset.month = pm.getMonth();
                  dayEl.dataset.year = pm.getFullYear();
                  dayEl.innerText = pm.getDate();
                  dayEl.classList.add('dudp__pm');
                  addClassToDayEl(dayEl, pm);
                }
              })();
            } // Last week
            else if (week > 4) {
              (function () {
                var nm = new Date(year, month + 1, 1);

                for (var a = 1; a <= 7; a++) {
                  nm.setDate(nmStartDay);
                  var dayEl = daysOfWeek.find(function (d) {
                    return parseInt(d.dataset.dow) === nm.getDay();
                  });
                  if (dayEl.innerText !== '') continue;
                  nmStartDay++;
                  dayEl.dataset.date = nm.getDate();
                  dayEl.dataset.month = nm.getMonth();
                  dayEl.dataset.year = nm.getFullYear();
                  dayEl.innerText = nm.getDate();
                  dayEl.classList.add('dudp__nm');
                  addClassToDayEl(dayEl, nm);
                }
              })();
            }
          }

          weeks.push(daysOfWeek);
        }

        var datesDOM = [];
        weeks.forEach(function (datesEl) {
          var weekDOM = hf.createElem('div', {
            class: 'dudp__cal-week'
          });

          for (var i = 0; i < datesEl.length; i++) {
            var dateElem = datesEl[i]; // Attach click handler for dates

            hf.dateClickEvent.call(_, dateElem);
            if (_.config.range) hf.dateHoverEvent.call(_, dateElem);
            hf.appendTo(dateElem, weekDOM);
          }

          datesDOM.push(weekDOM);
        });
        return datesDOM;
      }
      /**
       * Gets the year limits (min and max)
       * @param {boolean} yearsView Determines limits will be used for years selection view
       */

    }, {
      key: "_getYearLimits",
      value: function _getYearLimits() {
        var yearsView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var _ = this,
            minDate = null,
            maxDate = null,
            today = _._getToday();

        if (_.minDate) minDate = _.minDate === "today" ? today : new Date(_.minDate);
        if (_.maxDate) maxDate = _.maxDate === "today" ? today : new Date(_.maxDate);

        var _minCandidates = [yearsView ? _.viewYear - _.config.priorYears : null, _.config.minYear, minDate ? minDate.getFullYear() : null].filter(function (x) {
          return x != null;
        }),
            _maxCandidates = [yearsView ? _.viewYear + _.config.laterYears : null, _.config.maxYear, maxDate ? maxDate.getFullYear() : null].filter(function (x) {
          return x != null;
        }),
            minYear = _minCandidates.length > 0 ? Math.max.apply(Math, _toConsumableArray(_minCandidates)) : null,
            maxYear = _maxCandidates.length > 0 ? Math.min.apply(Math, _toConsumableArray(_maxCandidates)) : null;

        return {
          minYear: minYear,
          maxYear: maxYear
        };
      }
      /**
       * @returns {HTMLSpanElement[]} Returns years range for the years view
       */

    }, {
      key: "_getYears",
      value: function _getYears() {
        var _ = this,
            limits = _._getYearLimits(true),
            _minYear = limits.minYear,
            _maxYear = limits.maxYear,
            _years = [];

        for (var y = _minYear; y <= _maxYear; y++) {
          var yearElem = hf.createElem('span', {
            class: 'dudp__year'
          });
          if (y === _.viewYear) yearElem.classList.add('selected');
          yearElem.innerText = y;
          yearElem.dataset.year = y;
          hf.addEvent(yearElem, 'click', function () {
            var _this = this,
                _data = parseInt(_this.dataset.year);

            _.viewYear = _data;
            if (!_.config.range && !_.config.multiple) _.selected.year = _data;

            _._setSelection();

            _._setupCalendar();

            _._switchView('calendar');
          });

          _years.push(yearElem);
        }

        return _years;
      }
      /**
       * Sets up the months DOM
       */

    }, {
      key: "_setupMonths",
      value: function _setupMonths() {
        var _ = this,
            calendarHolder = _.datepicker.calendarHolder,
            _month = 0,
            _selected = _.selected ? _.selected : new Date();

        hf.empty(calendarHolder.monthsView);

        for (var r = 1; r < 4; r++) {
          var monthRow = hf.createElem('div', {
            class: 'dudp__month-row'
          });

          for (var i = 0; i < 4; i++) {
            var monthElem = hf.createElem('span', {
              class: 'dudp__month'
            });
            if (_month === _selected.month) monthElem.classList.add('selected');
            monthElem.innerText = _.config.i18n.shortMonths[_month];
            monthElem.dataset.month = _month;
            hf.appendTo(monthElem, monthRow);
            hf.addEvent(monthElem, 'click', function (e) {
              var _this = this,
                  _data = parseInt(_this.dataset.month);

              _.viewMonth = _data;

              _._setupCalendar();

              _._switchView('calendar');
            });
            _month++;
          }

          hf.appendTo(monthRow, calendarHolder.monthsView);
        }
      }
      /**
       * Sets up the calendar views
       */

    }, {
      key: "_setupCalendar",
      value: function _setupCalendar() {
        var _ = this,
            viewsHolder = _.datepicker.calendarHolder.calendarViews,
            _year = +_.viewYear,
            _month = +_.viewMonth;

        viewsHolder.calendars.length = 0;
        var inView = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, hf.daysOfWeekDOM.call(_), true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        },
            prev = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, hf.daysOfWeekDOM.call(_), true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        },
            next = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, hf.daysOfWeekDOM.call(_), true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        },
            prevMonth = _month == 0 ? 11 : _month - 1,
            nextMonth = _month == 11 ? 0 : _month + 1,
            prevYear = _month == 0 ? _year - 1 : _year,
            nextYear = _month == 11 ? _year + 1 : _year;
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[prevMonth]), hf.createElem('span', {
          class: 'cal-year'
        }, prevYear)], prev.header);
        hf.appendTo(_._getDates(prevYear, prevMonth), prev.datesHolder);
        hf.appendTo([prev.header, prev.weekDays, prev.datesHolder], prev.wrapper);
        viewsHolder.calendars.push(prev);
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[_month]), hf.createElem('span', {
          class: 'cal-year'
        }, _year)], inView.header);
        hf.appendTo(_._getDates(_year, _month), inView.datesHolder);
        hf.appendTo([inView.header, inView.weekDays, inView.datesHolder], inView.wrapper);
        viewsHolder.calendars.push(inView);
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[nextMonth]), hf.createElem('span', {
          class: 'cal-year'
        }, nextYear)], next.header);
        hf.appendTo(_._getDates(nextYear, nextMonth), next.datesHolder);
        hf.appendTo([next.header, next.weekDays, next.datesHolder], next.wrapper);
        viewsHolder.calendars.push(next);
        hf.empty(viewsHolder.wrapper);
        hf.appendTo([prev.wrapper, inView.wrapper, next.wrapper], viewsHolder.wrapper);
      }
      /**
       * Switches view of date picker (calendar, months, years)
       * @param {string} view View name
       */

    }, {
      key: "_switchView",
      value: function _switchView(view) {
        if (view !== 'calendar' && view !== 'months' && view !== 'years') return;

        var _ = this,
            picker = _.datepicker,
            monthsView = picker.calendarHolder.monthsView,
            yearsView = picker.calendarHolder.yearsView,
            calViews = picker.calendarHolder.calendarViews.wrapper,
            buttons = picker.calendarHolder.buttons.wrapper,
            _animDuration = 250,
            _oldView = _.viewMode,
            hc = 'dp__hidden'; // hidden class


        _.viewMode = view;

        switch (_.viewMode) {
          case 'calendar':
            var _calendar = calViews.querySelector('.dudp__calendar:nth-child(2)'); // current month in view


            calViews.classList.add('dp__animate-out');
            calViews.classList.remove(hc);
            if (_oldView !== 'calendar') _calendar.classList.add('dp__zooming', 'dp__animate-zoom');
            picker.calendarHolder.btnPrev.classList.remove(hc);
            picker.calendarHolder.btnNext.classList.remove(hc);
            buttons.classList.remove(hc);
            setTimeout(function () {
              calViews.classList.remove('dp__animate-out');
              if (_oldView !== 'calendar') _calendar.classList.remove('dp__animate-zoom');
            }, 10);
            monthsView.classList.add('dp__animate-out');
            yearsView.classList.add(hc);
            setTimeout(function () {
              if (_oldView !== 'calendar') _calendar.classList.remove('dp__zooming');
              monthsView.classList.add(hc);
              monthsView.classList.remove('dp__animate-out');
            }, _animDuration);
            break;

          case 'months':
            picker.calendarHolder.btnPrev.classList.add(hc);
            picker.calendarHolder.btnNext.classList.add(hc);
            buttons.classList.add(hc);
            calViews.classList.add('dp__animate-out');
            monthsView.classList.add('dp__animate-out');
            monthsView.classList.remove(hc);
            setTimeout(function () {
              monthsView.classList.remove('dp__animate-out');
            }, 10);
            setTimeout(function () {
              calViews.classList.add(hc);
              calViews.classList.remove('dp__animate-out');
            }, _animDuration);
            break;

          case 'years':
            hf.empty(yearsView);
            hf.appendTo(_._getYears(), yearsView);

            var _selYear = yearsView.querySelector('.dudp__year.selected');

            yearsView.scrollTop = _selYear.offsetTop - 120;
            picker.calendarHolder.btnPrev.classList.add(hc);
            picker.calendarHolder.btnNext.classList.add(hc);
            buttons.classList.add(hc);
            monthsView.classList.add('dp__animate-out');
            calViews.classList.add('dp__animate-out');
            yearsView.classList.remove(hc);
            setTimeout(function () {
              calViews.classList.add(hc);
              calViews.classList.remove('dp__animate-out');
              monthsView.classList.add(hc);
              monthsView.classList.remove('dp__animate-out');
            }, _animDuration);
            break;
        }
      }
      /**
       * Moves the calendar to specified direction (previous or next)
       * @param {string} direction Movement direction
       */

    }, {
      key: "_move",
      value: function _move(direction) {
        if (direction !== 'next' && direction !== 'prev') return;

        var _ = this;

        if (_.animating) return;

        var picker = _.datepicker,
            viewsHolder = picker.calendarHolder.calendarViews,
            _animDuration = 250,
            _isNext = direction === 'next';

        var viewYear = parseInt(_.viewYear);
        var viewMonth = parseInt(_.viewMonth);
        if (_isNext ? viewMonth + 1 > 11 : viewMonth - 1 < 0) viewYear += _isNext ? 1 : -1;
        viewMonth = _isNext ? viewMonth + 1 > 11 ? 0 : viewMonth + 1 : viewMonth - 1 < 0 ? 11 : viewMonth - 1; // Check min/max year

        var yearLimits = _._getYearLimits();

        var minYear = yearLimits.minYear;
        var maxYear = yearLimits.maxYear;
        if (_isNext && maxYear && viewYear > maxYear) return;else if (!_isNext && minYear && viewYear < minYear) return;
        _.viewYear = viewYear;
        _.viewMonth = viewMonth;
        _.animating = true; //Start animation

        var animateClass = "dp__animate-".concat(_isNext ? 'left' : 'right');
        viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
          cal.classList.add(animateClass);
        }); //Setup new (previous or next) month calendar

        var _year = _.viewYear,
            _month = _isNext ? _.viewMonth + 1 : _.viewMonth - 1;

        if (_isNext ? _month > 11 : _month < 0) {
          _month = _isNext ? 0 : 11;
          _year += _isNext ? 1 : -1;
        }

        var newCalDates = _._getDates(_year, _month),
            newCalEl = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, hf.daysOfWeekDOM.call(_), true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        };

        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[_month]), hf.createElem('span', {
          class: 'cal-year'
        }, _year)], newCalEl.header);
        hf.appendTo(newCalDates, newCalEl.datesHolder);
        hf.appendTo([newCalEl.header, newCalEl.weekDays, newCalEl.datesHolder], newCalEl.wrapper);
        setTimeout(function () {
          hf.appendTo(newCalEl.wrapper, viewsHolder.wrapper, _isNext ? undefined : 0);
          viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
            cal.classList.remove(animateClass);
          });
          viewsHolder.wrapper.removeChild(viewsHolder.calendars[_isNext ? 0 : 2].wrapper);
          viewsHolder.calendars[_isNext ? 'shift' : 'pop']();
          viewsHolder.calendars[_isNext ? 'push' : 'unshift'](newCalEl);
          _.animating = false;
        }, _animDuration);
      }
      /**
       * Resets the selection to the date value of the input
       */

    }, {
      key: "_resetSelection",
      value: function _resetSelection() {
        var _ = this;

        if (_.config.range) {
          var _date = _.dateFrom ? _.dateFrom : new Date();

          _.rangeFrom = hf.dateToJson(_.dateFrom);
          _.rangeTo = hf.dateToJson(_.dateTo);
          _.viewYear = _date.getFullYear();
          _.viewMonth = _date.getMonth();
        } else if (_.config.multiple) {
          var starting = _.dates.length > 0 ? _.dates.reduce(function (a, b) {
            return a < b ? a : b;
          }) : new Date();
          _.selectedDates = _toConsumableArray(_.dates);
          _.viewYear = starting.getFullYear();
          _.viewMonth = starting.getMonth();
        } else {
          _.selected = hf.dateToJson(_.date);
          _.viewYear = _.selected.year;
          _.viewMonth = _.selected.month;
        }

        _.datepicker.calendarHolder.monthsView.querySelectorAll('.dudp__month').forEach(function (melem) {
          var _meMonth = parseInt(melem.dataset.month),
              _month = _.config.range ? _.dateFrom ? _.dateFrom.getMonth() : null : _.config.multiple ? _.dates.length > 0 ? _.dates.reduce(function (a, b) {
            return a < b ? a : b;
          }) : null : _.selected.month;

          melem.classList[_meMonth === _month ? 'add' : 'remove']('selected');
        });
      }
      /**
       * Sets the section display (datepicker header)
       */

    }, {
      key: "_setSelection",
      value: function _setSelection() {
        var _ = this,
            picker = _.datepicker,
            selected = _.config.range ? new Date() : _.config.multiple ? _.selectedDates.length > 0 ? _.selectedDates.reduce(function (a, b) {
          return a < b ? a : b;
        }) : new Date() : hf.jsonToDate(_.selected);

        picker.header.selectedYear.innerText = selected.getFullYear();
        picker.header.selectedDate.innerText = hf.formatDate.call(_, selected, SELECTED_FORMAT);
      }
      /**
       * Determines if the value(s) given can be set as the date picker's value (constraint check on minDate, maxDate, minYear, maxYear)
       * @param {string} mode Mode of the date picker (i.e. range, multiple)
       * @param {(Date|Date[]|Object)} value Value to be set
       * @param {Date} value.from Date from value (for range mode)
       * * @param {Date} value.to Date to value (for range mode)
       */

    }, {
      key: "_canSetValue",
      value: function _canSetValue(mode, value) {
        if (mode != 'range' && mode != 'multiple' && mode != 'default') return false;

        var _ = this,
            config = _.config,
            canSet = true,
            invalidDate = '';

        if (mode == 'range' && value.from && value.to) {
          if (_._beyondMinMax(value.from)) {
            canSet = false;
            invalidDate = hf.formatDate.call(_, value.from, config.format);
          } else if (_._beyondMinMax(value.to)) {
            canSet = false;
            invalidDate = hf.formatDate.call(_, value.to, config.format);
          }
        } else if (mode == 'multiple') {
          for (var i = 0; i < value.length; i++) {
            var date = value[i];

            if (_._beyondMinMax(date)) {
              canSet = false;
              invalidDate = hf.formatDate.call(_, date, config.format);
              break;
            }
          }
        } else if (mode == 'default' && _._beyondMinMax(value)) {
          canSet = false;
          invalidDate = hf.formatDate.call(_, value, config.format);
        }

        return {
          canSet: canSet,
          remarks: "\"".concat(invalidDate, "\" is beyond the selectable date(s). Kindly check minDate, maxDate, minYear or maxYear configurations.")
        };
      }
      /**
       * Sets the value of the input
       * @param {(string|Date|string[])} value The new input value. If the value specified is a string, it will be parsed using `config.format`.
       * @param {Boolean} triggerEvt Determines if change events should be triggered
       */

    }, {
      key: "setValue",
      value: function setValue(value) {
        var triggerEvt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (typeof value === 'undefined') throw new Error('Expecting a value.');

        var _ = this,
            _empty = typeof value === 'string' && value === '',
            changeData = null;

        if (_.config.range) {
          var _range = _empty ? [] : value.split(_.config.rangeDelim);

          if (value !== '' && _range.length < 2) throw new Error('Invalid date range value.');

          var now = new Date(),
              _from = _empty ? null : hf.parseDate.call(_, _range[0]).date,
              _to = _empty ? null : hf.parseDate.call(_, _range[1]).date,
              formattedFrom = _empty ? '' : hf.formatDate.call(_, _from, _.config.format),
              outFrom = _empty ? '' : hf.formatDate.call(_, _from, _.config.outFormat || _.config.format),
              formattedTo = _empty ? '' : hf.formatDate.call(_, _to, _.config.format),
              outTo = _empty ? '' : hf.formatDate.call(_, _to, _.config.outFormat || _.config.format),
              valueDisp = _empty ? '' : _.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : _range[0] === _range[1] ? _range[0] : value;

          var canSet = _._canSetValue('range', {
            from: _from,
            to: _to
          });

          if (!canSet.canSet) {
            throw new Error(canSet.remarks);
          }

          _.dateFrom = _from;
          _.dateTo = _to;
          _.viewYear = (_from ? _from : now).getFullYear();
          _.viewMonth = (_from ? _from : now).getMonth();
          _.input.value = valueDisp;
          hf.setAttributes(_.input, {
            'value': valueDisp,
            'data-range-from': outFrom,
            'data-range-to': outTo
          });

          if (_.fromEl) {
            _.fromEl.value = formattedFrom;
            hf.setAttributes(_.fromEl, {
              'value': formattedFrom,
              'data-value': outFrom
            });
          }

          if (_.toEl) {
            _.toEl.value = formattedTo;
            hf.setAttributes(_.toEl, {
              'value': formattedTo,
              'data-value': outTo
            });
          }

          changeData = {
            _dateFrom: _from,
            dateFrom: _empty ? null : formattedFrom,
            _dateTo: _to,
            dateTo: _empty ? null : formattedTo,
            value: valueDisp
          };
        } else if (_.config.multiple) {
          var dates = [],
              isArray = Array.isArray(value),
              values = isArray ? value : value.split(',');
          values.forEach(function (v) {
            return dates.push(hf.parseDate.call(_, v).date);
          });
          var starting = dates.length > 0 ? dates.reduce(function (a, b) {
            return a < b ? a : b;
          }) : new Date();
          if (dates.length > 0) dates = dates.sort(function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
          });

          var _canSet3 = _._canSetValue('multiple', dates);

          if (!_canSet3.canSet) {
            throw new Error(_canSet3.remarks);
          }

          _.dates = _toConsumableArray(dates);
          _.viewYear = starting.getFullYear();
          _.viewMonth = starting.getMonth();
          hf.setAttributes(_.input, {
            'value': dates.map(function (d) {
              return hf.formatDate.call(_, d, _.config.outFormat || _.config.format);
            }).join(',')
          });
          changeData = {
            _dates: _empty ? [] : _.dates,
            dates: _empty ? [] : _.dates.map(function (d) {
              return hf.formatDate.call(_, d, _.config.outFormat || _.config.format);
            })
          };
        } else {
          var date = typeof value === 'string' ? _empty ? new Date() : hf.parseDate.call(_, value, _.config.format).date : value,
              formatted = _empty ? '' : hf.formatDate.call(_, date, _.config.format);

          var _canSet4 = _._canSetValue('default', date);

          if (!_canSet4.canSet) {
            throw new Error(_canSet4.remarks);
          }

          _.date = date;
          _.viewYear = date.getFullYear();
          _.viewMonth = date.getMonth();
          _.input.value = formatted;

          _.input.setAttribute('value', formatted);

          changeData = {
            _date: _empty ? null : _.date,
            date: _empty ? null : hf.formatDate.call(_, _.date, _.config.outFormat || _.config.format)
          };
        }

        if (triggerEvt) {
          hf.triggerChange(_.input, changeData);
          if (_.config.events && _.config.events.dateChanged) _.config.events.dateChanged.call(_, changeData, _);
        }
      }
      /**
       * Returns formatted string representation of specified date
       * @param {Date} date Date object
       * @param {string} format Date format
       */

    }, {
      key: "formatDate",
      value: function formatDate(date, format) {
        return hf.formatDate.call(this, date, format);
      }
      /**
       * Formats specified date range to string (for display)
       * @param {Date} from Date from
       * @param {Date} to Date to
       * @returns {string} Formatted date range
       */

    }, {
      key: "formatRange",
      value: function formatRange(from, to) {
        return this.config.events.onRangeFormat.call(this, from, to, this);
      }
      /**
       * Sets the minimum date configuration
       * @param {string} date Minimum selectable date
       */

    }, {
      key: "setMinDate",
      value: function setMinDate(date) {
        this.config.minDate = date;
      }
      /**
       * Sets the maximum date configuration
       * @param {string} date Maximum selectable date
       */

    }, {
      key: "setMaxDate",
      value: function setMaxDate(date) {
        this.config.maxDate = date;
      }
      /**
       * Sets the minimum year configuration
       * @param {Number} year Minimum year
       */

    }, {
      key: "setMinYear",
      value: function setMinYear(year) {
        this.config.minYear = year;
      }
      /**
       * Sets the maximum year configuration
       * @param {Number} year Maximum year
       */

    }, {
      key: "setMaxYear",
      value: function setMaxYear(year) {
        this.config.maxYear = year;
      }
      /**
       * Sets the prior years configuration
       * @param {Number} years Number of years
       */

    }, {
      key: "setPriorYears",
      value: function setPriorYears(years) {
        this.config.priorYears = years;
      }
      /**
       * Sets the later years configuration
       * @param {Number} years Number of years
       */

    }, {
      key: "setLaterYears",
      value: function setLaterYears(years) {
        this.config.laterYears = years;
      }
      /**
       * Sets the date picker theme configuration
       * @param {string} theme Theme name
       */

    }, {
      key: "setTheme",
      value: function setTheme(theme) {
        this.config.theme = theme;
      }
      /**
       * Sets the disabled dates configuration
       * @param {string[]} dates List of disabled dates
       */

    }, {
      key: "setDisabled",
      value: function setDisabled(dates) {
        this.config.disabledDates = dates;
      }
      /**
       * Sets the disabled days configuration
       * @param {string[]} days List of disabled days
       */

    }, {
      key: "setDisabledDays",
      value: function setDisabledDays(days) {
        this.config.disabledDays = days;
      }
      /**
       * Sets the internationalization configuration
       * @param {(string|Object)} i18n Internationalization name or instance
       */

    }, {
      key: "setI18n",
      value: function setI18n(i18n) {
        var _ = this;

        if (typeof i18n === 'string') _.config.i18n = duDatepicker.i18n[i18n];else if (_typeof(i18n) == 'object') _.config.i18n = i18n; // refresh UI

        var i18nConfig = _.config.i18n,
            picker = _.datepicker;

        if (i18nConfig.dict) {
          _.dict = hf.extend(_.dict, i18nConfig.dict);
          picker.calendarHolder.buttons.btnClear.innerText = _.dict.btnClear;
          picker.calendarHolder.buttons.btnOk.innerText = _.dict.btnOk;
          picker.calendarHolder.buttons.btnCancel.innerText = _.dict.btnCancel;
        } // reset selected value


        var format = _.config.format;

        if (_.config.range && _.rangeFrom && _.input.value) {
          var rangeFrom = hf.jsonToDate(_.rangeFrom),
              rangeTo = hf.jsonToDate(_.rangeTo);

          _.setValue([hf.formatDate.call(_, rangeFrom, format), hf.formatDate.call(_, rangeTo, format)].join(_.config.rangeDelim), false);
        } else if (_.config.multiple && _.selectedDates.length > 0 && _.input.value) {
          _.setValue(_.selectedDates.map(function (sd) {
            return hf.formatDate.call(_, sd, format);
          }), false);
        } else if (_.selected && _.input.value) {
          var sd = _.selected;

          _.setValue(new Date(sd.year, sd.month, sd.date), false);
        }

        _._setupMonths();

        _._setupCalendar();
      }
      /**
       * Shows the date picker
       */

    }, {
      key: "show",
      value: function show() {
        var _ = this; // refresh config


        _.minDate = _.input.dataset.mindate || _.config.minDate;
        _.maxDate = _.input.dataset.maxdate || _.config.maxDate;
        _.datepicker.wrapper.dataset.theme = _.input.dataset.theme || _.config.theme;
        setTimeout(function () {
          document.body.setAttribute('datepicker-display', 'on');

          _._resetSelection();

          _._setSelection();

          _._setupCalendar();

          _.datepicker.container.classList.add('dp__open');

          if (_.config.inline) {
            var inputRef = _.showInFromEl ? _.fromEl : _.showInToEl ? _.toEl : _.input,
                offset = hf.calcOffset(inputRef),
                picker_dim = {
              height: _.datepicker.wrapper.offsetHeight,
              width: _.datepicker.wrapper.offsetWidth
            },
                screen_dim = hf.screenDim(),
                below = offset.top + picker_dim.height < screen_dim.height,
                left_side = offset.left + picker_dim.width < screen_dim.width,
                offsetCss = {},
                scroll = {
              y: window.scrollY,
              x: window.scrollX
            };
            offsetCss[below ? 'top' : 'bottom'] = "".concat(below ? offset.top - scroll.y : offset.bottom, "px");
            offsetCss[left_side ? 'left' : 'right'] = "".concat(left_side ? offset.left - scroll.x : offset.right, "px");

            _.datepicker.container.removeAttribute('style');

            hf.setStyles(_.datepicker.container, offsetCss);
          }

          _.datepicker.wrapper.focus();

          _.visible = true;

          _.input.blur();

          if (_.config.events && _.config.events.shown) _.config.events.shown.call(_, _);
        }, 0);
      }
      /**
       * Hides the date picker
       */

    }, {
      key: "hide",
      value: function hide() {
        var _ = this;

        _.datepicker.container.classList.add('dp__closing');

        _.visible = false;

        _.input.focus();

        document.body.removeAttribute('datepicker-display');
        setTimeout(function () {
          _._switchView('calendar'); // Reset view to calendar


          hf.removeClass(_.datepicker.container, ['dp__closing', 'dp__open']);
          if (_.config.events && _.config.events.hidden) _.config.events.hidden.call(_, _);
        }, 200);
      }
      /**
       * Destroys the date picker plugin
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._unbindInput();

        this.config.root.removeChild(this.datepicker.container);
        delete this.input[DATA_KEY];
      }
    }]);

    return _duDatePicker;
  }();
  /**
   * Creates date picker
   */


  _defineProperty(_duDatePicker, "default_configs", null);

  function duDatepicker() {
    var args = arguments,
        arg0 = args[0],
        arg0IsList = arg0 instanceof NodeList || Array.isArray(arg0),
        arg0IsElem = hf.isElement(arg0),
        inputs = typeof arg0 === 'string' ? document.querySelectorAll(arg0) : arg0IsList ? arg0 : arg0IsElem ? [arg0] : document.querySelectorAll(DEFAULT_CLASS),
        options = _typeof(arg0) === 'object' && !arg0IsList && !arg0IsElem ? arg0 : args[1] && _typeof(args[1]) === 'object' ? args[1] : {};
    Array.from(inputs).forEach(function (el) {
      var picker = el[DATA_KEY];
      if (!picker) el[DATA_KEY] = picker = new _duDatePicker(el, options);

      if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && args[1] && typeof args[1] === 'string' && args[1] != 'set') {
        var params = Array.prototype.slice.call(args).slice(2);
        picker[args[1]].apply(picker, params);
      } else if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && args[1] == 'set' && args[2] && _typeof(args[2]) === 'object' && !Array.isArray(args[2])) {
        Object.keys(args[2]).forEach(function (key) {
          var params = args[2][key];
          picker[key].apply(picker, [params]);
        });
      }
    });
  }

  Object.defineProperty(duDatepicker, 'i18n', {
    value: i18n
  });

  duDatepicker.defaults = function (configs) {
    _duDatePicker.default_configs = hf.extend(DEFAULTS, configs);
  };

  return duDatepicker;

}));
