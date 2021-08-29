/*!Don't remove this!
 * duDatePicker v2.0 plugin (Vanilla JS)
 * https://github.com/dmuy/duDatepicker
 *
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.duDatepicker = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
  var global$d =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$h = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$g = fails$h;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$g(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
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

  var toString$1 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  var fails$f = fails$h;
  var classof$6 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$f(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$6(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$6 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$5 = requireObjectCoercible$6;

  var toIndexedObject$5 = function (it) {
    return IndexedObject$2(requireObjectCoercible$5(it));
  };

  var isObject$8 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var isObject$7 = isObject$8;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$3 = function (input, PREFERRED_STRING) {
    if (!isObject$7(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$7(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var requireObjectCoercible$4 = requireObjectCoercible$6;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$6 = function (argument) {
    return Object(requireObjectCoercible$4(argument));
  };

  var toObject$5 = toObject$6;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$9 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$5(it), key);
  };

  var global$c = global$d;
  var isObject$6 = isObject$8;

  var document$1 = global$c.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$6(document$1) && isObject$6(document$1.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$4 = descriptors;
  var fails$e = fails$h;
  var createElement = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$4 && !fails$e(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$3 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$4 = toIndexedObject$5;
  var toPrimitive$2 = toPrimitive$3;
  var has$8 = has$9;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPrimitive$2(P, true);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has$8(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };

  var objectDefineProperty = {};

  var isObject$5 = isObject$8;

  var anObject$d = function (it) {
    if (!isObject$5(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var DESCRIPTORS$2 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$c = anObject$d;
  var toPrimitive$1 = toPrimitive$3;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$c(O);
    P = toPrimitive$1(P, true);
    anObject$c(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$1 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$8 = DESCRIPTORS$1 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$5 = {exports: {}};

  var global$b = global$d;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$7(global$b, key, value);
    } catch (error) {
      global$b[key] = value;
    } return value;
  };

  var global$a = global$d;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$a[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store$2.inspectSource != 'function') {
    store$2.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$2.inspectSource;

  var global$9 = global$d;
  var inspectSource$1 = inspectSource$2;

  var WeakMap$1 = global$9.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

  var shared$4 = {exports: {}};

  var store$1 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var shared$3 = shared$4.exports;
  var uid$1 = uid$2;

  var keys = shared$3('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid$1(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$8 = global$d;
  var isObject$4 = isObject$8;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
  var objectHas = has$9;
  var shared$2 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$8.WeakMap;
  var set, get, has$7;

  var enforce = function (it) {
    return has$7(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$2.state) {
    var store = shared$2.state || (shared$2.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$7 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$6(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$7 = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$7,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$7 = global$d;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
  var has$6 = has$9;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule$1 = internalState;

  var getInternalState$2 = InternalStateModule$1.get;
  var enforceInternalState = InternalStateModule$1.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$5.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$6(value, 'name')) {
        createNonEnumerableProperty$5(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$7) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$5(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$2(this).source || inspectSource(this);
  });

  var global$6 = global$d;

  var path$1 = global$6;

  var path = path$1;
  var global$5 = global$d;

  var aFunction$4 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$3 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$4(path[namespace]) || aFunction$4(global$5[namespace])
      : path[namespace] && path[namespace][method] || global$5[namespace] && global$5[namespace][method];
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$2 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$4 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$2 : ceil)(argument);
  };

  var toInteger$3 = toInteger$4;

  var min$3 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$8 = function (argument) {
    return argument > 0 ? min$3(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$2 = toInteger$4;

  var max$2 = Math.max;
  var min$2 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toInteger$2(index);
    return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
  };

  var toIndexedObject$3 = toIndexedObject$5;
  var toLength$7 = toLength$8;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$3($this);
      var length = toLength$7(O.length);
      var index = toAbsoluteIndex$1(fromIndex, length);
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
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var has$5 = has$9;
  var toIndexedObject$2 = toIndexedObject$5;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$5(hiddenKeys$2, key) && has$5(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$5(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
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
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$2 = getBuiltIn$3;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$b = anObject$d;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$b(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$4 = has$9;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$4(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$d = fails$h;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails$d(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$4 = global$d;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
  var redefine$4 = redefine$5.exports;
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
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$4;
    } else if (STATIC) {
      target = global$4[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$4[TARGET] || {}).prototype;
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
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$4(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$4(target, key, sourceProperty, options);
    }
  };

  var anObject$a = anObject$d;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$a(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpStickyHelpers = {};

  var fails$c = fails$h;

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  var RE = function (s, f) {
    return RegExp(s, f);
  };

  regexpStickyHelpers.UNSUPPORTED_Y = fails$c(function () {
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  regexpStickyHelpers.BROKEN_CARET = fails$c(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS = descriptors;
  var definePropertyModule$2 = objectDefineProperty;
  var anObject$9 = anObject$d;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$9(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var getBuiltIn$1 = getBuiltIn$3;

  var html$1 = getBuiltIn$1('document', 'documentElement');

  var anObject$8 = anObject$d;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
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
    var iframe = documentCreateElement('iframe');
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
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$8(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var fails$b = fails$h;

  var regexpUnsupportedDotAll = fails$b(function () {
    // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
    var re = RegExp('.', (typeof '').charAt(0));
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$a = fails$h;

  var regexpUnsupportedNcg = fails$a(function () {
    // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
    var re = RegExp('(?<a>b)', (typeof '').charAt(5));
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var shared$1 = shared$4.exports;
  var create$2 = objectCreate;
  var getInternalState$1 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared$1('native-string-replace', String.prototype.replace);

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(str) {
      var re = this;
      var state = getInternalState$1(re);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
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

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$2(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$3 = patchedExec;

  var $$9 = _export;
  var exec = regexpExec$3;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$9({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

  var getBuiltIn = getBuiltIn$3;

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var global$3 = global$d;
  var userAgent$2 = engineUserAgent;

  var process = global$3.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent$2) {
    match = userAgent$2.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$2.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$1 = engineV8Version;
  var fails$9 = fails$h;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$9(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$2 = global$d;
  var shared = shared$4.exports;
  var has$3 = has$9;
  var uid = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$2.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol$g = function (name) {
    if (!has$3(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (NATIVE_SYMBOL && has$3(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var redefine$3 = redefine$5.exports;
  var regexpExec$2 = regexpExec$3;
  var fails$8 = fails$h;
  var wellKnownSymbol$f = wellKnownSymbol$g;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;

  var SPECIES$4 = wellKnownSymbol$f('species');
  var RegExpPrototype$1 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$f(KEY);

    var DELEGATES_TO_SYMBOL = !fails$8(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$8(function () {
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
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec$2 || $exec === RegExpPrototype$1.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });

      redefine$3(String.prototype, KEY, methods[0]);
      redefine$3(RegExpPrototype$1, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$3(RegExpPrototype$1[SYMBOL], 'sham', true);
  };

  var isObject$3 = isObject$8;
  var classof$5 = classofRaw$1;
  var wellKnownSymbol$e = wellKnownSymbol$g;

  var MATCH = wellKnownSymbol$e('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$3(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
  };

  var aFunction$3 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var anObject$7 = anObject$d;
  var aFunction$2 = aFunction$3;
  var wellKnownSymbol$d = wellKnownSymbol$g;

  var SPECIES$3 = wellKnownSymbol$d('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$7(O).constructor;
    var S;
    return C === undefined || (S = anObject$7(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$2(S);
  };

  var toInteger$1 = toInteger$4;
  var requireObjectCoercible$3 = requireObjectCoercible$6;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$3($this));
      var position = toInteger$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  var classof$4 = classofRaw$1;
  var regexpExec$1 = regexpExec$3;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classof$4(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec$1.call(R, S);
  };

  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var isRegExp = isRegexp;
  var anObject$6 = anObject$d;
  var requireObjectCoercible$2 = requireObjectCoercible$6;
  var speciesConstructor = speciesConstructor$1;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var toLength$6 = toLength$8;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers = regexpStickyHelpers;
  var fails$7 = fails$h;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var arrayPush = [].push;
  var min$1 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$7(function () {
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
      // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible$2(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) {
          return nativeSplit.call(string, separator, lim);
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
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible$2(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject$6(this);
        var S = String(string);
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
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
          var e;
          if (
            z === null ||
            (e = min$1(toLength$6(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex$2(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

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

  var aFunction$1 = aFunction$3;

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$3 = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(arg) {
    return classof$3(arg) == 'Array';
  };

  var isObject$2 = isObject$8;
  var isArray$1 = isArray$2;
  var wellKnownSymbol$c = wellKnownSymbol$g;

  var SPECIES$2 = wellKnownSymbol$c('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
      else if (isObject$2(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind$1 = functionBindContext;
  var IndexedObject$1 = indexedObject;
  var toObject$4 = toObject$6;
  var toLength$5 = toLength$8;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$4($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$1(callbackfn, that, 3);
      var length = toLength$5(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
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
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterOut
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
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod(7)
  };

  var fails$6 = fails$h;

  var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$6(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

  var STRICT_METHOD$2 = arrayMethodIsStrict$2('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$1 = global$d;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  }

  // TODO: use something more complex like timsort?
  var floor$1 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$1(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      mergeSort(array.slice(0, middle), comparefn),
      mergeSort(array.slice(middle), comparefn),
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

  var merge = function (left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    var result = [];

    while (lindex < llength || rindex < rlength) {
      if (lindex < llength && rindex < rlength) {
        result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
      } else {
        result.push(lindex < llength ? left[lindex++] : right[rindex++]);
      }
    } return result;
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

  var $$8 = _export;
  var aFunction = aFunction$3;
  var toObject$3 = toObject$6;
  var toLength$4 = toLength$8;
  var fails$5 = fails$h;
  var internalSort = arraySort;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;

  var test$1 = [];
  var nativeSort = test$1.sort;

  // IE8-
  var FAILS_ON_UNDEFINED = fails$5(function () {
    test$1.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$5(function () {
    test$1.sort(null);
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
        test$1.push({ k: chr + index, v: value });
      }
    }

    test$1.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test$1.length; index++) {
      chr = test$1[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return String(x) > String(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$8({ target: 'Array', proto: true, forced: FORCED }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aFunction(comparefn);

      var array = toObject$3(this);

      if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);

      var items = [];
      var arrayLength = toLength$4(array.length);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) items.push(array[index]);
      }

      items = internalSort(items, getSortCompare(comparefn));
      itemsLength = items.length;
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) delete array[index++];

      return array;
    }
  });

  var $$7 = _export;
  var IndexedObject = indexedObject;
  var toIndexedObject$1 = toIndexedObject$5;
  var arrayMethodIsStrict = arrayMethodIsStrict$3;

  var nativeJoin = [].join;

  var ES3_STRINGS = IndexedObject != Object;
  var STRICT_METHOD = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $$7({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject$1(this), separator === undefined ? ',' : separator);
    }
  });

  var fails$4 = fails$h;
  var wellKnownSymbol$b = wellKnownSymbol$g;
  var V8_VERSION = engineV8Version;

  var SPECIES$1 = wellKnownSymbol$b('species');

  var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION >= 51 || !fails$4(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$6 = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$5 = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var wellKnownSymbol$a = wellKnownSymbol$g;
  var create$1 = objectCreate;
  var definePropertyModule$1 = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$a('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    definePropertyModule$1.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$1(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$2 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var $$4 = _export;
  var $find = arrayIteration.find;
  var addToUnscopables$1 = addToUnscopables$2;

  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$4({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1(FIND);

  var anObject$5 = anObject$d;

  var iteratorClose$1 = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject$5(returnMethod.call(iterator)).value;
    }
  };

  var anObject$4 = anObject$d;
  var iteratorClose = iteratorClose$1;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$4(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  };

  var iterators = {};

  var wellKnownSymbol$9 = wellKnownSymbol$g;
  var Iterators$3 = iterators;

  var ITERATOR$4 = wellKnownSymbol$9('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype[ITERATOR$4] === it);
  };

  var toPrimitive = toPrimitive$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

  var wellKnownSymbol$8 = wellKnownSymbol$g;

  var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$7 = wellKnownSymbol$g;

  var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var classof$1 = classof$2;
  var Iterators$2 = iterators;
  var wellKnownSymbol$6 = wellKnownSymbol$g;

  var ITERATOR$3 = wellKnownSymbol$6('iterator');

  var getIteratorMethod$1 = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || Iterators$2[classof$1(it)];
  };

  var bind = functionBindContext;
  var toObject$2 = toObject$6;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var toLength$3 = toLength$8;
  var createProperty$1 = createProperty$2;
  var getIteratorMethod = getIteratorMethod$1;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$2(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (;!(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$1(result, index, value);
      }
    } else {
      length = toLength$3(O.length);
      result = new C(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$5 = wellKnownSymbol$g;

  var ITERATOR$2 = wellKnownSymbol$5('iterator');
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
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
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

  var $$3 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$3({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var fails$3 = fails$h;

  var correctPrototypeGetter = !fails$3(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$2 = has$9;
  var toObject$1 = toObject$6;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$1(O);
    if (has$2(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var fails$2 = fails$h;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
  var has$1 = has$9;
  var wellKnownSymbol$4 = wellKnownSymbol$g;

  var ITERATOR$1 = wellKnownSymbol$4('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$2(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$1].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!has$1(IteratorPrototype$2, ITERATOR$1)) {
    createNonEnumerableProperty$1(IteratorPrototype$2, ITERATOR$1, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty = objectDefineProperty.f;
  var has = has$9;
  var wellKnownSymbol$3 = wellKnownSymbol$g;

  var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');

  var setToStringTag$2 = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$1 = setToStringTag$2;
  var Iterators$1 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$1[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isObject$1 = isObject$8;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$1(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  var anObject$3 = anObject$d;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$3(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$2 = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$8;
  var redefine$2 = redefine$5.exports;
  var wellKnownSymbol$2 = wellKnownSymbol$g;
  var Iterators = iterators;
  var IteratorsCore = iteratorsCore;

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol$2('iterator');
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
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if (IterablePrototype[ITERATOR] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
    }
    Iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$2({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var charAt = stringMultibyte.charAt;
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
      string: String(iterated),
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
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var $$1 = _export;
  var isObject = isObject$8;
  var isArray = isArray$2;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var toLength$2 = toLength$8;
  var toIndexedObject = toIndexedObject$5;
  var createProperty = createProperty$2;
  var wellKnownSymbol$1 = wellKnownSymbol$g;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES = wellKnownSymbol$1('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength$2(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof = classof$2;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$1 = redefine$5.exports;
  var toString = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$1(Object.prototype, 'toString', toString, { unsafe: true });
  }

  var toObject = toObject$6;

  var floor = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$1 = fails$h;
  var anObject$2 = anObject$d;
  var toLength$1 = toLength$8;
  var toInteger = toInteger$4;
  var requireObjectCoercible$1 = requireObjectCoercible$6;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol = wellKnownSymbol$g;

  var REPLACE = wellKnownSymbol('replace');
  var max = Math.max;
  var min = Math.min;

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

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$1(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
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
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        if (
          typeof replaceValue === 'string' &&
          replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
          replaceValue.indexOf('$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, this, string, replaceValue);
          if (res.done) return res.value;
        }

        var rx = anObject$2(this);
        var S = String(string);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec$1(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var redefine = redefine$5.exports;
  var anObject$1 = anObject$d;
  var fails = fails$h;
  var flags = regexpFlags$1;

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$1(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject = anObject$d;
  var toLength = toLength$8;
  var requireObjectCoercible = requireObjectCoercible$6;
  var advanceStringIndex = advanceStringIndex$3;
  var regExpExec = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var res = maybeCallNative(nativeMatch, this, string);
        if (res.done) return res.value;

        var rx = anObject(this);
        var S = String(string);

        if (!rx.global) return regExpExec(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var $ = _export;
  var $findIndex = arrayIteration.findIndex;
  var addToUnscopables = addToUnscopables$2;

  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findindex
  $({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

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
            return y.toString().substr(2, 2);

          case 'yyyy':
            return y;
        }
      });
    },

    /**
     * Parses date string using default or specified format
     * @param {string} date Date string to parse
     * @param {string=} dateFormat Format of the date string; `config.format` will be used if not specified
     */
    parseDate: function parseDate(date, format) {
      var _ = this,
          _format = typeof format === 'undefined' ? _.config.format : format,
          dayLength = (_format.match(/d/g) || []).length,
          monthLength = (_format.match(/m/g) || []).length,
          yearLength = (_format.match(/y/g) || []).length,
          isFullMonth = monthLength === 4,
          isMonthNoPadding = monthLength === 1,
          isDayNoPadding = dayLength === 1,
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
        month = date.substr(firstM, monthLength);
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
        day = date.substr(firstD, dayLength);
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
        year = date.substr(firstY, yearLength);
      } else {
        before = _format.substring(firstY - 1, firstY);
        year = date.substr(date.indexOf(before, firstY - 1) + 1, yearLength);
      }

      return {
        m: month,
        d: day,
        y: year,
        date: new Date(year, isNaN(parseInt(month)) ? monthIdx : month - 1, day)
      };
    },

    /**
     * Triggers the `change`, `onchange`, `datechanged` event on the specified input element
     * @param {HTMLInputElement} el HTML input element
     * @param {Object} data Event data
     */
    triggerChange: function triggerChange(el, data) {
      var change = document.createEvent('Event');
      var onChange = document.createEvent('Event');
      change.initEvent('change', false, false);
      onChange.initEvent('onchange', false, false);
      el.dispatchEvent(change);
      el.dispatchEvent(onChange);

      function CustomEvent(data) {
        var changeEvt = document.createEvent('CustomEvent');
        changeEvt.initCustomEvent('datechanged', false, false, null);
        changeEvt.data = data;
        return changeEvt;
      }

      el.dispatchEvent(new CustomEvent(data));
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

  var Locale =
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
      return x.substr(0, 3);
    });
    this.days = days;
    this.shortDays = shortDays || this.days.map(function (x) {
      return x.substr(0, 3);
    });
    this.shorterDays = shorterDays || this.days.map(function (x) {
      return x.substr(0, 2);
    });
    this.firstDay = firstDay;
    this.dict = hf.extend(DICT_DEFAULTS, dict);
  };
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
        var value = _.input.value,
            _range = value.split(_.config.rangeDelim);

        if (value !== '' && _range.length < 2) throw new Error('duDatePicker: Invalid date range value');

        var _from = value === '' ? null : hf.parseDate.call(_, _range[0]).date,
            _to = value === '' ? null : hf.parseDate.call(_, _range[1]).date;

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
        this.dates = _toConsumableArray(dates);
        this.selectedDates = _toConsumableArray(dates);
        hf.setAttributes(_.input, {
          'value': dates.map(function (d) {
            return hf.formatDate.call(_, d, _.config.outFormat || _.config.format);
          }).join(',')
        }); // _.input.value = dates.map(d => hf.formatDate.call(_, d, _.config.outFormat || _.config.format)).join(',')
      } else {
        this.date = _.input.value === '' ? _date : hf.parseDate.call(_, _.input.value).date;
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
            buttons = calendarHolder.buttons,
            _selected = _.selected ? _.selected : new Date(); // Setup header


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


        var _month = 0;

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
                  _data = _this.dataset.month;

              _.viewMonth = _data;

              _._setupCalendar();

              _._switchView('calendar');
            });
            _month++;
          }

          hf.appendTo(monthRow, calendarHolder.monthsView);
        } // Setup years view


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

            if (_._dateDisabled(_from) || _._dateDisabled(_to)) return;
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
        });
        if (_.config.events && _.config.events.ready) _.config.events.ready.call(_, _);
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
       * Determines if date is disabled
       * @param {Date} date Date object
       * @returns {Boolean} `true` if specified date should be disabled, `false` otherwise
       */

    }, {
      key: "_dateDisabled",
      value: function _dateDisabled(date) {
        var _ = this,
            min = null,
            max = null,
            now = new Date(),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            _dates = _.config.disabledDates,
            _days = _.config.disabledDays,
            _inDates = _dates.filter(function (x) {
          if (x.indexOf('-') >= 0) return date >= hf.parseDate.call(_, x.split('-')[0]).date && date <= hf.parseDate.call(_, x.split('-')[1]).date;else return hf.parseDate.call(_, x).date.getTime() === date.getTime();
        }).length > 0,
            _inDays = _days.indexOf(_.config.i18n.days[date.getDay()]) >= 0 || _days.indexOf(_.config.i18n.shortDays[date.getDay()]) >= 0 || _days.indexOf(_.config.i18n.shorterDays[date.getDay()]) >= 0;

        if (_.minDate) min = _.minDate === "today" ? today : new Date(_.minDate);
        if (_.maxDate) max = _.maxDate === "today" ? today : new Date(_.maxDate);
        return min && date < min || max && date > max || _inDates || _inDays;
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
            now = new Date(),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
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

            hf.addEvent(dateElem, 'click', function () {
              var _this = this,
                  _year = _this.dataset.year,
                  _month = _this.dataset.month,
                  _date = _this.dataset.date,
                  _selected = new Date(_year, _month, _date),
                  isFrom = false;

              if (_._dateDisabled(_selected)) return;

              if (_.config.range) {
                var _rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
                    _rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

                if (!_.rangeFrom || _.rangeFrom && _selected < _rangeFrom || _.rangeFrom && _.rangeTo && hf.dateDiff(_rangeFrom, _selected) <= hf.dateDiff(_selected, _rangeTo) && hf.dateDiff(_rangeFrom, _selected) !== 0 || _.rangeFrom && _.rangeTo && _rangeTo.getTime() === _selected.getTime()) {
                  _.rangeFrom = {
                    year: _year,
                    month: _month,
                    date: _date
                  };
                  isFrom = true;
                } else if (!_.rangeTo || _.rangeTo && _selected > _rangeTo || _.rangeFrom && _.rangeTo && hf.dateDiff(_selected, _rangeTo) < hf.dateDiff(_rangeFrom, _selected) && hf.dateDiff(_selected, _rangeTo) !== 0 || _.rangeFrom && _.rangeTo && _rangeFrom.getTime() === _selected.getTime()) {
                  _.rangeTo = {
                    year: _year,
                    month: _month,
                    date: _date
                  };
                  isFrom = false;
                }

                _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
                  var _deYear = delem.dataset.year,
                      _deMonth = delem.dataset.month,
                      _deDate = delem.dataset.date,
                      _inRange = _._inRange(new Date(_deYear, _deMonth, _deDate));

                  delem.classList[_year === _deYear && _month === _deMonth && _date === _deDate ? 'add' : 'remove'](isFrom ? 'range-from' : 'range-to');
                  delem.classList[_inRange ? 'add' : 'remove']('in-range');
                });
              } else {
                if (_.config.multiple) {
                  var isSelected = _this.classList.contains('selected');

                  _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date[data-date="' + _date + '"][data-month="' + _month + '"][data-year="' + _year + '"]').forEach(function (delem) {
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
            hf.appendTo(dateElem, weekDOM);
          }

          datesDOM.push(weekDOM);
        });
        return datesDOM;
      }
      /**
       * @returns {HTMLSpanElement[]} Returns years range for the years view
       */

    }, {
      key: "_getYears",
      value: function _getYears() {
        var _ = this,
            _minYear = _.viewYear - 50,
            _maxYear = _.viewYear + 25,
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
            if (!_.config.range) _.selected.year = _data;

            _._setSelection();

            _._setupCalendar();

            _._switchView('calendar');
          });

          _years.push(yearElem);
        }

        return _years;
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
            prevMonth = _month === 0 ? 11 : _month - 1,
            nextMonth = _month === 11 ? 0 : _month + 1,
            prevYear = _month === 0 ? _year - 1 : _year,
            nextYear = _month === 11 ? _year + 1 : _year;
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

        if (_isNext ? _.viewMonth + 1 > 11 : _.viewMonth - 1 < 0) _.viewYear += _isNext ? 1 : -1;
        _.viewMonth = _isNext ? _.viewMonth + 1 > 11 ? 0 : _.viewMonth + 1 : _.viewMonth - 1 < 0 ? 11 : _.viewMonth - 1;
        _.animating = true; //Start animation

        var animateClass = 'dp__animate-' + (_isNext ? 'left' : 'right');
        viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
          cal.classList.add(animateClass);
        }); //Setup new (previos or next) month calendar

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
          var _date2 = _.dates.length > 0 ? _.dates.reduce(function (a, b) {
            return a < b ? a : b;
          }) : new Date();

          _.viewYear = _date2.getFullYear();
          _.viewMonth = _date2.getMonth();
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
       * Sets the value of the input
       * @param {(string|Date|string[])} value The new input value. If the value specified is a string, it will be parsed using `config.format`.
       */

    }, {
      key: "setValue",
      value: function setValue(value) {
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
            dates.push(hf.parseDate.call(_, v).date);
          });
          var starting = dates.length > 0 ? dates.reduce(function (a, b) {
            return a < b ? a : b;
          }) : new Date();
          if (dates.length > 0) dates = dates.sort(function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
          });
          _.dates = _toConsumableArray(dates);
          _.viewYear = starting.getFullYear();
          _.viewMonth = starting.getMonth();
          hf.setAttributes(_.input, {
            'value': dates.map(function (d) {
              return hf.formatDate.call(_, d, _.config.outFormat || _.config.format);
            }).join(',')
          }); // _.input.value = dates.map(d => hf.formatDate.call(_, d, _.config.outFormat || _.config.format)).join(',')

          changeData = {
            _dates: _empty ? [] : _.dates,
            dates: _empty ? [] : _.dates.map(function (d) {
              return hf.formatDate.call(_, d, _.config.outFormat || _.config.format);
            })
          };
        } else {
          var date = typeof value === 'string' ? _empty ? new Date() : hf.parseDate.call(_, value, _.config.format).date : value,
              formatted = _empty ? '' : hf.formatDate.call(_, date, _.config.format);
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

        hf.triggerChange(_.input, changeData);
        if (_.config.events && _.config.events.dateChanged) _.config.events.dateChanged.call(_, changeData, _);
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
       * Shows the date picker
       */

    }, {
      key: "show",
      value: function show() {
        var _ = this;

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

      if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && args[1] && typeof args[1] === 'string') {
        picker[args[1]].apply(picker, Array.prototype.slice.call(args).slice(2));
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

})));
