export default
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "014b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("e53d");
var has = __webpack_require__("07e3");
var DESCRIPTORS = __webpack_require__("8e60");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var META = __webpack_require__("ebfd").KEY;
var $fails = __webpack_require__("294c");
var shared = __webpack_require__("dbdb");
var setToStringTag = __webpack_require__("45f2");
var uid = __webpack_require__("62a0");
var wks = __webpack_require__("5168");
var wksExt = __webpack_require__("ccb9");
var wksDefine = __webpack_require__("6718");
var enumKeys = __webpack_require__("47ee");
var isArray = __webpack_require__("9003");
var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var createDesc = __webpack_require__("aebd");
var _create = __webpack_require__("a159");
var gOPNExt = __webpack_require__("0395");
var $GOPD = __webpack_require__("bf0b");
var $DP = __webpack_require__("d9f6");
var $keys = __webpack_require__("c3a1");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("6abf").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("355d").f = $propertyIsEnumerable;
  __webpack_require__("9aa9").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("b8e3")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("35e8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "0293":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__("241e");
var $getPrototypeOf = __webpack_require__("53e2");

__webpack_require__("ce7e")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0395":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("36c3");
var gOPN = __webpack_require__("6abf").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "061b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("fa99");

/***/ }),

/***/ "06db":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__("23c6");
var test = {};
test[__webpack_require__("2b4c")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__("2aba")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "08e3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fde4b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("b833d2bc", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "0a0d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("e829");

/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0f2a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("76a6");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("8e93946c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "13e9":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-bezier-bounce-footer[data-v-23d50417]{width:100%;height:0;background:transparent}.er-bezier-bounce-footer .er-bbf-canvas[data-v-23d50417]{position:absolute;width:100%;height:100%;z-index:-1}.er-bezier-bounce-footer .er-bbf-background[data-v-23d50417]{position:absolute;width:100%;height:20px;bottom:0}.er-bezier-bounce-footer .ball-box[data-v-23d50417]{position:absolute;width:100%;height:80px;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-bezier-bounce-footer .ball-box .ball[data-v-23d50417]{height:15px;width:15px;display:inline-block;border-radius:50%}.er-bezier-bounce-footer .ball-pulse[data-v-23d50417]{position:absolute;width:100%;height:80px;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}", ""]);

// exports


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "17bd":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8d14");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("3d2760b3", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1d86":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ball-one-animation-data-v-b2353112{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(.5);transform:scale(.5)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-one-animation-data-v-b2353112{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(.5);transform:scale(.5)}to{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes ball-two-animation-data-v-b2353112{0%{-webkit-transform:scale(.75);transform:scale(.75)}25%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(.75);transform:scale(.75)}75%{-webkit-transform:scale(.5);transform:scale(.5)}to{-webkit-transform:scale(.75);transform:scale(.75)}}@keyframes ball-two-animation-data-v-b2353112{0%{-webkit-transform:scale(.75);transform:scale(.75)}25%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(.75);transform:scale(.75)}75%{-webkit-transform:scale(.5);transform:scale(.5)}to{-webkit-transform:scale(.75);transform:scale(.75)}}@-webkit-keyframes ball-three-animation-data-v-b2353112{0%{-webkit-transform:scale(.5);transform:scale(.5)}50%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(.5);transform:scale(.5)}}@keyframes ball-three-animation-data-v-b2353112{0%{-webkit-transform:scale(.5);transform:scale(.5)}50%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(.5);transform:scale(.5)}}.ball[data-v-b2353112]{display:inline-block;border-radius:50%}.ball-one[data-v-b2353112]{-webkit-animation-name:ball-one-animation-data-v-b2353112;animation-name:ball-one-animation-data-v-b2353112;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-duration:.8s;animation-duration:.8s}.ball-two[data-v-b2353112]{-webkit-animation-name:ball-two-animation-data-v-b2353112;animation-name:ball-two-animation-data-v-b2353112;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-duration:.8s;animation-duration:.8s}.ball-three[data-v-b2353112]{-webkit-animation-name:ball-three-animation-data-v-b2353112;animation-name:ball-three-animation-data-v-b2353112;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-duration:.8s;animation-duration:.8s}", ""]);

// exports


/***/ }),

/***/ "1df8":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__("63b6");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__("ead6").set });


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "21f7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyHeader_vue_vue_type_style_index_0_id_0bd9d38a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5589");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyHeader_vue_vue_type_style_index_0_id_0bd9d38a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyHeader_vue_vue_type_style_index_0_id_0bd9d38a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyHeader_vue_vue_type_style_index_0_id_0bd9d38a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "25b0":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1df8");
module.exports = __webpack_require__("584a").Object.setPrototypeOf;


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "268f":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("fde4");

/***/ }),

/***/ "2726":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-classics-footer{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-classics-footer .er-classics-footer-flex{-webkit-box-flex:1;-ms-flex:1;flex:1}.er-classics-footer .er-classics-footer-icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-classics-footer .er-classics-footer-icon .er-classics-footer-arrow-icon,.er-classics-footer .er-classics-footer-icon .er-classics-footer-done-icon{height:24px;width:24px;margin-right:15px;font-size:24px;-ms-flex-item-align:end;align-self:flex-end}.er-classics-footer .er-classics-footer-icon .er-classics-footer-progress{margin-right:10px}.er-classics-footer .er-classics-footer-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-classics-footer .er-classics-footer-content .er-classics-footer-content-text{font-size:14px}.er-classics-footer .er-classics-footer-content .er-classics-footer-content-more{font-size:12px}", ""]);

// exports


/***/ }),

/***/ "287e":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-bezier-bounce-header[data-v-357c3e00]{position:relative;width:100%;height:0;background:transparent}.er-bezier-bounce-header .er-bbh-canvas[data-v-357c3e00]{position:absolute;width:100%;height:100%;z-index:-1}.er-bezier-bounce-header .ball-box[data-v-357c3e00]{position:absolute;width:100%;height:80px;top:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-bezier-bounce-header .ball-box .ball[data-v-357c3e00]{height:15px;width:15px;display:inline-block;border-radius:50%}.er-bezier-bounce-header .ball-pulse[data-v-357c3e00]{position:absolute;width:100%;height:80px;top:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}", ""]);

// exports


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f37":
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__("63b6");

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "32a6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("241e");
var $keys = __webpack_require__("c3a1");

__webpack_require__("ce7e")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "355d":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3603":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-material-footer[data-v-435c6150]{width:100%;height:0;background:transparent}.er-material-footer .er-material-footer-circle-card[data-v-435c6150]{position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center;top:5px;left:0;right:0;margin:0 auto;height:40px;width:40px;border-radius:50%;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}", ""]);

// exports


/***/ }),

/***/ "36bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__("4bf8");
var toAbsoluteIndex = __webpack_require__("77f1");
var toLength = __webpack_require__("9def");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "3c35":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "4208":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyFooter_vue_vue_type_style_index_0_id_24557ef7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("55d4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyFooter_vue_vue_type_style_index_0_id_24557ef7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyFooter_vue_vue_type_style_index_0_id_24557ef7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmptyFooter_vue_vue_type_style_index_0_id_24557ef7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "469f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6c1c");
__webpack_require__("1654");
module.exports = __webpack_require__("7d7b");


/***/ }),

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "47ee":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("c3a1");
var gOPS = __webpack_require__("9aa9");
var pIE = __webpack_require__("355d");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
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


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4aa6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dc62");

/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4d16":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("25b0");

/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "5589":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fe23");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("039d1fe0", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "55d4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9056");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("36e4607e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5d58":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d8d6");

/***/ }),

/***/ "5d73":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("469f");

/***/ }),

/***/ "5d9c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseHeader_vue_vue_type_style_index_0_id_4aea244e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0f2a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseHeader_vue_vue_type_style_index_0_id_4aea244e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseHeader_vue_vue_type_style_index_0_id_4aea244e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseHeader_vue_vue_type_style_index_0_id_4aea244e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "65d9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
  * vue-class-component v6.3.2
  * (c) 2015-present Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__("8bbf"));

var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata;
function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}

var fakeArray = { __proto__: [] };
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function mixins() {
    var Ctors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Ctors[_i] = arguments[_i];
    }
    return Vue.extend({ mixins: Ctors });
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (false) {}
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured' // 2.5
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data: function () {
                        var _a;
                        return _a = {}, _a[key] = descriptor.value, _a;
                    }
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
        copyReflectionMetadata(Extended, Component);
    }
    return Extended;
}
var reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // `prototype` should not be overwritten
        if (key === 'prototype') {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if (false) {}
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, keys);
};

exports.default = Component;
exports.createDecorator = createDecorator;
exports.mixins = mixins;


/***/ }),

/***/ "6718":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var LIBRARY = __webpack_require__("b8e3");
var wksExt = __webpack_require__("ccb9");
var defineProperty = __webpack_require__("d9f6").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "67bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f921");

/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "69d3":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('asyncIterator');


/***/ }),

/***/ "6a85":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulse_vue_vue_type_style_index_0_id_b2353112_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e1f4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulse_vue_vue_type_style_index_0_id_b2353112_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulse_vue_vue_type_style_index_0_id_b2353112_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulse_vue_vue_type_style_index_0_id_b2353112_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6abf":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("e6f3");
var hiddenKeys = __webpack_require__("1691").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "6c7b":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__("5ca1");

$export($export.P, 'Array', { fill: __webpack_require__("36bd") });

__webpack_require__("9c6c")('fill');


/***/ }),

/***/ "7179":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2726");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("4628c0c8", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "765d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('observable');


/***/ }),

/***/ "76a6":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-ball-pulse-header[data-v-4aea244e]{width:100%;height:0;background:transparent;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}", ""]);

// exports


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7d7b":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var get = __webpack_require__("7cd6");
module.exports = __webpack_require__("584a").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "8345":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceHeader_vue_vue_type_style_index_0_id_357c3e00_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f499");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceHeader_vue_vue_type_style_index_0_id_357c3e00_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceHeader_vue_vue_type_style_index_0_id_357c3e00_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceHeader_vue_vue_type_style_index_0_id_357c3e00_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "835b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Arrow_vue_vue_type_style_index_0_id_436a3834_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17bd");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Arrow_vue_vue_type_style_index_0_id_436a3834_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Arrow_vue_vue_type_style_index_0_id_436a3834_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Arrow_vue_vue_type_style_index_0_id_436a3834_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "87cb":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ebbf");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("63e611b2", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "88fa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialFooter_vue_vue_type_style_index_0_id_435c6150_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ce8c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialFooter_vue_vue_type_style_index_0_id_435c6150_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialFooter_vue_vue_type_style_index_0_id_435c6150_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialFooter_vue_vue_type_style_index_0_id_435c6150_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8aae":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("32a6");
module.exports = __webpack_require__("584a").Object.keys;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "8cb4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("13e9");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("6ce6c0e1", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "8d14":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".arrow[data-v-436a3834]{transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear;-webkit-transition:-webkit-transform .2s linear;-moz-transition:-webkit-transform .2s linear;-o-transition:-webkit-transform .2s linear}.up[data-v-436a3834]{transform:rotate(180deg);-ms-transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg)}.down[data-v-436a3834]{transform:rotate(0deg);-ms-transform:rotate(0deg);-moz-transform:rotate(0deg);-webkit-transform:rotate(0deg);-o-transform:rotate(0deg)}", ""]);

// exports


/***/ }),

/***/ "8e31":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EasyRefresh_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("08e3");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EasyRefresh_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EasyRefresh_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EasyRefresh_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8f0e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ecb8");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("155e8a10", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9003":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6b4c");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "9056":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-empty-footer[data-v-24557ef7]{width:100%;height:0;background:transparent}", ""]);

// exports


/***/ }),

/***/ "90db":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".circular-progress[data-v-6460aee4]{width:40px;height:40px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.circleProgress_wrapper[data-v-6460aee4]{width:22px;height:22px;position:relative}.circleProgress_wrapper.small[data-v-6460aee4]{width:22px;height:22px}.circleProgress_wrapper.middle[data-v-6460aee4]{width:32px;height:32px}.circleProgress_wrapper.big[data-v-6460aee4]{width:40px;height:40px}.wrapper[data-v-6460aee4]{position:absolute;top:0;overflow:hidden}.wrapper[data-v-6460aee4],.wrapper.small[data-v-6460aee4]{width:11px;height:22px}.wrapper.middle[data-v-6460aee4]{width:16px;height:32px}.wrapper.big[data-v-6460aee4]{width:20px;height:40px}.right[data-v-6460aee4]{right:0}.left[data-v-6460aee4]{left:0}.circleProgress[data-v-6460aee4]{width:20px;height:20px;border:2px solid transparent;border-radius:50%;position:absolute;top:0}.circleProgress.small[data-v-6460aee4]{width:22px;height:22px}.circleProgress.middle[data-v-6460aee4]{width:32px;height:32px}.circleProgress.big[data-v-6460aee4]{width:40px;height:40px}.rightcircle[data-v-6460aee4]{border-top-width:2px;border-right-width:2px;border-top-style:solid;border-right-style:solid;right:0;-webkit-animation:circleProgressLoad_right 5s linear infinite;animation:circleProgressLoad_right 5s linear infinite;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.leftcircle[data-v-6460aee4]{border-bottom-width:2px;border-left-width:2px;border-bottom-style:solid;border-left-style:solid;left:0;-webkit-animation:circleProgressLoad_left 5s linear infinite;animation:circleProgressLoad_left 5s linear infinite;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.preloader-wrapper[data-v-6460aee4]{display:inline-block;position:relative;width:40px;height:40px}.preloader-wrapper.small[data-v-6460aee4]{width:22px;height:22px}.preloader-wrapper.middle[data-v-6460aee4]{width:32px;height:32px}.preloader-wrapper.big[data-v-6460aee4]{width:40px;height:40px}.preloader-wrapper.active[data-v-6460aee4]{-webkit-animation:container-rotate-data-v-6460aee4 1568ms linear infinite;animation:container-rotate-data-v-6460aee4 1568ms linear infinite}@-webkit-keyframes container-rotate-data-v-6460aee4{to{-webkit-transform:rotate(1turn)}}@keyframes container-rotate-data-v-6460aee4{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.spinner-layer[data-v-6460aee4]{position:absolute;width:100%;height:100%;opacity:0;border-color:#000}.active .spinner-layer[data-v-6460aee4]{opacity:1;-webkit-animation:fill-unfill-rotate-data-v-6460aee4 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate-data-v-6460aee4 5332ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes fill-unfill-rotate-data-v-6460aee4{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(3turn)}}@keyframes fill-unfill-rotate-data-v-6460aee4{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}to{-webkit-transform:rotate(3turn);transform:rotate(3turn)}}.gap-patch[data-v-6460aee4]{position:absolute;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.gap-patch .circle[data-v-6460aee4]{width:1000%;left:-450%}.circle-clipper[data-v-6460aee4]{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.circle-clipper .circle[data-v-6460aee4]{width:200%;height:100%;border-width:2px;border-style:solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.circle-clipper.left .circle[data-v-6460aee4]{left:0;border-right-color:transparent!important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.circle-clipper.right .circle[data-v-6460aee4]{left:-100%;border-left-color:transparent!important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}.active .circle-clipper.left .circle[data-v-6460aee4]{-webkit-animation:left-spin-data-v-6460aee4 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:left-spin-data-v-6460aee4 1333ms cubic-bezier(.4,0,.2,1) infinite both}.active .circle-clipper.right .circle[data-v-6460aee4]{-webkit-animation:right-spin-data-v-6460aee4 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:right-spin-data-v-6460aee4 1333ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes left-spin-data-v-6460aee4{0%{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin-data-v-6460aee4{0%{-webkit-transform:rotate(130deg);transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg);transform:rotate(130deg)}}@-webkit-keyframes right-spin-data-v-6460aee4{0%{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin-data-v-6460aee4{0%{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}}#spinnerContainer.cooldown[data-v-6460aee4]{-webkit-animation:container-rotate-data-v-6460aee4 1568ms linear infinite,fade-out-data-v-6460aee4 .4s cubic-bezier(.4,0,.2,1);animation:container-rotate-data-v-6460aee4 1568ms linear infinite,fade-out-data-v-6460aee4 .4s cubic-bezier(.4,0,.2,1)}@-webkit-keyframes fade-out-data-v-6460aee4{0%{opacity:1}to{opacity:0}}@keyframes fade-out-data-v-6460aee4{0%{opacity:1}to{opacity:0}}", ""]);

// exports


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "9275":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-ball-pulse-footer[data-v-7bcb570c]{width:100%;height:0;background:transparent;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}", ""]);

// exports


/***/ }),

/***/ "92a5":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("90db");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("dd9e5240", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "9315":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsFooter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7179");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsFooter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsFooter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsFooter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9427":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__("a159") });


/***/ }),

/***/ "9aa9":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a006":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9275");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("4c90d169", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a2ae":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d0ca");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("b56fca28", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
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

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
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
  }
});


/***/ }),

/***/ "a4bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8aae");

/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b4c6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("87cb");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MaterialHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bf0b":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("355d");
var createDesc = __webpack_require__("aebd");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var has = __webpack_require__("07e3");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("8e60") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "bf90":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__("36c3");
var $getOwnPropertyDescriptor = __webpack_require__("bf0b").f;

__webpack_require__("ce7e")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "c207":
/***/ (function(module, exports) {



/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ccb9":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("5168");


/***/ }),

/***/ "ce7e":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("63b6");
var core = __webpack_require__("584a");
var fails = __webpack_require__("294c");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "ce8c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3603");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("48d10f7a", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "d0ca":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-classics-header{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-classics-header .er-classics-header-flex{-webkit-box-flex:1;-ms-flex:1;flex:1}.er-classics-header .er-classics-header-icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-classics-header .er-classics-header-icon .er-classics-header-arrow-icon,.er-classics-header .er-classics-header-icon .er-classics-header-done-icon{height:24px;width:24px;margin-right:15px;font-size:24px;-ms-flex-item-align:end;align-self:flex-end}.er-classics-header .er-classics-header-icon .er-classics-header-progress{margin-right:10px}.er-classics-header .er-classics-header-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}.er-classics-header .er-classics-header-content .er-classics-header-content-text{font-size:14px}.er-classics-header .er-classics-header-content .er-classics-header-content-more{font-size:12px}", ""]);

// exports


/***/ }),

/***/ "d10f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierCircleHeader_vue_vue_type_style_index_0_id_5359ae7b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8f0e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierCircleHeader_vue_vue_type_style_index_0_id_5359ae7b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierCircleHeader_vue_vue_type_style_index_0_id_5359ae7b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierCircleHeader_vue_vue_type_style_index_0_id_5359ae7b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d7a8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6b54");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("06db");
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var F_Develop_Vue_vue_easyrefresh_node_modules_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("0a0d");
/* harmony import */ var F_Develop_Vue_vue_easyrefresh_node_modules_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(F_Develop_Vue_vue_easyrefresh_node_modules_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_2__);




(function (window) {
  var NOOP = function NOOP() {};

  var core = function Animate(global) {
    var time = F_Develop_Vue_vue_easyrefresh_node_modules_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_2___default.a || function () {
      return +new Date();
    };

    var desiredFrames = 60;
    var millisecondsPerSecond = 1000;
    var running = {};
    var counter = 1;
    var core = {
      effect: {}
    };
    core.effect.Animate = {
      /**
       * A requestAnimationFrame wrapper / polyfill.
       *
       * @param callback {Function} The callback to be invoked before the next repaint.
       * @param root {HTMLElement} The root element for the repaint
       */
      requestAnimationFrame: function () {
        // Check for request animation Frame support
        var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
        var isNative = !!requestFrame;

        if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
          isNative = false;
        }

        if (isNative) {
          return function (callback, root) {
            requestFrame(callback, root);
          };
        }

        var TARGET_FPS = 60;
        var requests = {};
        var requestCount = 0;
        var rafHandle = 1;
        var intervalHandle = null;
        var lastActive = +new Date();
        return function (callback, root) {
          var callbackHandle = rafHandle++; // Store callback

          requests[callbackHandle] = callback;
          requestCount++; // Create timeout at first request

          if (intervalHandle === null) {
            intervalHandle = setInterval(function () {
              var time = +new Date();
              var currentRequests = requests; // Reset data structure before executing callbacks

              requests = {};
              requestCount = 0;

              for (var key in currentRequests) {
                if (currentRequests.hasOwnProperty(key)) {
                  currentRequests[key](time);
                  lastActive = time;
                }
              } // Disable the timeout when nothing happens for a certain
              // period of time


              if (time - lastActive > 2500) {
                clearInterval(intervalHandle);
                intervalHandle = null;
              }
            }, 1000 / TARGET_FPS);
          }

          return callbackHandle;
        };
      }(),

      /**
       * Stops the given animation.
       *
       * @param id {Integer} Unique animation ID
       * @return {Boolean} Whether the animation was stopped (aka, was running before)
       */
      stop: function stop(id) {
        var cleared = running[id] != null;

        if (cleared) {
          running[id] = null;
        }

        return cleared;
      },

      /**
       * Whether the given animation is still running.
       *
       * @param id {Integer} Unique animation ID
       * @return {Boolean} Whether the animation is still running
       */
      isRunning: function isRunning(id) {
        return running[id] != null;
      },

      /**
       * Start the animation.
       *
       * @param stepCallback {Function} Pointer to function which is executed on every step.
       *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
       * @param verifyCallback {Function} Executed before every animation step.
       *   Signature of the method should be `function() { return continueWithAnimation; }`
       * @param completedCallback {Function}
       *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
       * @param duration {Integer} Milliseconds to run the animation
       * @param easingMethod {Function} Pointer to easing function
       *   Signature of the method should be `function(percent) { return modifiedValue; }`
       * @param root {Element ? document.body} Render root, when available. Used for internal
       *   usage of requestAnimationFrame.
       * @return {Integer} Identifier of animation. Can be used to stop it any time.
       */
      start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
        var start = time();
        var lastFrame = start;
        var percent = 0;
        var dropCounter = 0;
        var id = counter++;

        if (!root) {
          root = document.body;
        } // Compacting running db automatically every few new animations


        if (id % 20 === 0) {
          var newRunning = {};

          for (var usedId in running) {
            newRunning[usedId] = true;
          }

          running = newRunning;
        } // This is the internal step method which is called every few milliseconds


        var step = function step(virtual) {
          // Normalize virtual value
          var render = virtual !== true; // Get current time

          var now = time(); // Verification is executed before next animation step

          if (!running[id] || verifyCallback && !verifyCallback(id)) {
            running[id] = null;
            completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
            return;
          } // For the current rendering to apply let's update omitted steps in memory.
          // This is important to bring internal state variables up-to-date with progress in time.


          if (render) {
            var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;

            for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
              step(true);
              dropCounter++;
            }
          } // Compute percent value


          if (duration) {
            percent = (now - start) / duration;

            if (percent > 1) {
              percent = 1;
            }
          } // Execute step callback, then...


          var value = easingMethod ? easingMethod(percent) : percent;

          if ((stepCallback(value, now, render) === false || percent === 1) && render) {
            running[id] = null;
            completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
          } else if (render) {
            lastFrame = now;
            core.effect.Animate.requestAnimationFrame(step, root);
          }
        }; // Mark as running


        running[id] = true; // Init first step

        core.effect.Animate.requestAnimationFrame(step, root); // Return unique animation ID

        return id;
      }
    };
    return core;
  }(window);
  /**
   * A pure logic 'component' for 'virtual' scrolling/zooming.
   */


  var Scroller = function Scroller(callback, options) {
    this.__callback = callback; // core = animate;

    this.options = {
      /** Enable scrolling on x-axis */
      scrollingX: true,

      /** Enable scrolling on y-axis */
      scrollingY: true,

      /** Enable animations for deceleration, snap back, zooming and scrolling */
      animating: true,

      /** duration for animations triggered by scrollTo/zoomTo */
      animationDuration: 250,

      /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
      bouncing: true,

      /** Enable locking to the main axis if user moves only slightly on one of them at start */
      locking: true,

      /** Enable pagination mode (switching between full page content panes) */
      paging: false,

      /** Enable snapping of content to a configured pixel grid */
      snapping: false,

      /** Enable zooming of content via API, fingers and mouse wheel */
      zooming: false,

      /** Minimum zoom level */
      minZoom: 0.5,

      /** Maximum zoom level */
      maxZoom: 3,

      /** Multiply or decrease scrolling speed **/
      speedMultiplier: 1,

      /** Callback that is fired on the later of touch end or deceleration end,
       provided that another scrolling action has not begun. Used to know
       when to fade out a scrollbar. */
      scrollingComplete: NOOP,

      /** This configures the amount of change applied to deceleration when reaching boundaries  **/
      penetrationDeceleration: 0.03,

      /** This configures the amount of change applied to acceleration when reaching boundaries  **/
      penetrationAcceleration: 0.08
    };

    for (var key in options) {
      this.options[key] = options[key];
    }
  }; // Easing Equations (c) 2003 Robert Penner, all rights reserved.
  // Open source under the BSD License.

  /**
   * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
   **/


  var easeOutCubic = function easeOutCubic(pos) {
    return Math.pow(pos - 1, 3) + 1;
  };
  /**
   * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
   **/


  var easeInOutCubic = function easeInOutCubic(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    }

    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  };

  var members = {
    /*
    ---------------------------------------------------------------------------
        INTERNAL FIELDS :: STATUS
    ---------------------------------------------------------------------------
    */

    /** {Boolean} Whether only a single finger is used in touch handling */
    __isSingleTouch: false,

    /** {Boolean} Whether a touch event sequence is in progress */
    __isTracking: false,

    /** {Boolean} Whether a deceleration animation went to completion. */
    __didDecelerationComplete: false,

    /**
     * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
     * a gesturestart event happens. This has higher priority than dragging.
     */
    __isGesturing: false,

    /**
     * {Boolean} Whether the user has moved by such a distance that we have enabled
     * dragging mode. Hint: It's only enabled after some pixels of movement to
     * not interrupt with clicks etc.
     */
    __isDragging: false,

    /**
     * {Boolean} Not touching and dragging anymore, and smoothly animating the
     * touch sequence using deceleration.
     */
    __isDecelerating: false,

    /**
     * {Boolean} Smoothly animating the currently configured change
     */
    __isAnimating: false,

    /*
    ---------------------------------------------------------------------------
        INTERNAL FIELDS :: DIMENSIONS
    ---------------------------------------------------------------------------
    */

    /** {Integer} Available outer left position (from document perspective) */
    __clientLeft: 0,

    /** {Integer} Available outer top position (from document perspective) */
    __clientTop: 0,

    /** {Integer} Available outer width */
    __clientWidth: 0,

    /** {Integer} Available outer height */
    __clientHeight: 0,

    /** {Integer} Outer width of content */
    __contentWidth: 0,

    /** {Integer} Outer height of content */
    __contentHeight: 0,

    /** {Integer} Snapping width for content */
    __snapWidth: 100,

    /** {Integer} Snapping height for content */
    __snapHeight: 100,

    /** {Integer} Height to assign to refresh area */
    __refreshHeight: null,

    /** {Boolean} Whether the refresh process is enabled when the event is released now */
    __refreshActive: false,

    /** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
    __refreshActivate: null,

    /** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
    __refreshDeactivate: null,

    /** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
    __refreshStart: null,

    /** {Number} Zoom level */
    __zoomLevel: 1,

    /** {Number} Scroll position on x-axis */
    __scrollLeft: 0,

    /** {Number} Scroll position on y-axis */
    __scrollTop: 0,

    /** {Integer} Maximum allowed scroll position on x-axis */
    __maxScrollLeft: 0,

    /** {Integer} Maximum allowed scroll position on y-axis */
    __maxScrollTop: 0,

    /* {Number} Scheduled left position (final position when animating) */
    __scheduledLeft: 0,

    /* {Number} Scheduled top position (final position when animating) */
    __scheduledTop: 0,

    /* {Number} Scheduled zoom level (final scale when animating) */
    __scheduledZoom: 0,

    /*
    ---------------------------------------------------------------------------
        INTERNAL FIELDS :: LAST POSITIONS
    ---------------------------------------------------------------------------
    */

    /** {Number} Left position of finger at start */
    __lastTouchLeft: null,

    /** {Number} Top position of finger at start */
    __lastTouchTop: null,

    /** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
    __lastTouchMove: null,

    /** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
    __positions: null,

    /*
    ---------------------------------------------------------------------------
        INTERNAL FIELDS :: DECELERATION SUPPORT
    ---------------------------------------------------------------------------
    */

    /** {Integer} Minimum left scroll position during deceleration */
    __minDecelerationScrollLeft: null,

    /** {Integer} Minimum top scroll position during deceleration */
    __minDecelerationScrollTop: null,

    /** {Integer} Maximum left scroll position during deceleration */
    __maxDecelerationScrollLeft: null,

    /** {Integer} Maximum top scroll position during deceleration */
    __maxDecelerationScrollTop: null,

    /** {Number} Current factor to modify horizontal scroll position with on every step */
    __decelerationVelocityX: null,

    /** {Number} Current factor to modify vertical scroll position with on every step */
    __decelerationVelocityY: null,

    /*
    ---------------------------------------------------------------------------
        PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Configures the dimensions of the client (outer) and content (inner) elements.
     * Requires the available space for the outer element and the outer size of the inner element.
     * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
     *
     * @param clientWidth {Integer ? null} Inner width of outer element
     * @param clientHeight {Integer ? null} Inner height of outer element
     * @param contentWidth {Integer ? null} Outer width of inner element
     * @param contentHeight {Integer ? null} Outer height of inner element
     */
    setDimensions: function setDimensions(clientWidth, clientHeight, contentWidth, contentHeight) {
      var self = this; // Only update values which are defined

      if (clientWidth === +clientWidth) {
        self.__clientWidth = clientWidth;
      }

      if (clientHeight === +clientHeight) {
        self.__clientHeight = clientHeight;
      }

      if (contentWidth === +contentWidth) {
        self.__contentWidth = contentWidth;
      }

      if (contentHeight === +contentHeight) {
        self.__contentHeight = contentHeight;
      } // Refresh maximums


      self.__computeScrollMax(); // Refresh scroll position


      self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
    },

    /**
     * Sets the client coordinates in relation to the document.
     *
     * @param left {Integer ? 0} Left position of outer element
     * @param top {Integer ? 0} Top position of outer element
     */
    setPosition: function setPosition(left, top) {
      var self = this;
      self.__clientLeft = left || 0;
      self.__clientTop = top || 0;
    },

    /**
     * Configures the snapping (when snapping is active)
     *
     * @param width {Integer} Snapping width
     * @param height {Integer} Snapping height
     */
    setSnapSize: function setSnapSize(width, height) {
      var self = this;
      self.__snapWidth = width;
      self.__snapHeight = height;
    },

    /**
     * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
     * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
     * the official Twitter client.
     *
     * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
     * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
     * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
     * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
     */
    activatePullToRefresh: function activatePullToRefresh(height, activateCallback, deactivateCallback, startCallback) {
      var self = this;
      self.__refreshHeight = height;
      self.__refreshActivate = activateCallback;
      self.__refreshDeactivate = deactivateCallback;
      self.__refreshStart = startCallback;
    },

    /**
     * Starts pull-to-refresh manually.
     */

    /*triggerPullToRefresh: function() {
        // Use publish instead of scrollTo to allow scrolling to out of boundary position
        // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
        this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);
          if (this.__refreshStart) {
            this.__refreshStart();
        }
    },*/

    /**
     * Signalizes that pull-to-refresh is finished.
     */

    /*finishPullToRefresh: function() {
          var self = this;
          self.__refreshActive = false;
        if (self.__refreshDeactivate) {
            self.__refreshDeactivate();
        }
          self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
      },*/

    /**
     * 触发上拉刷新
     */
    triggerPullToRefresh: function triggerPullToRefresh(height, callBack) {
      this.__publish(this.__scrollLeft, -height, this.__zoomLevel, true, callBack);
    },

    /**
     * 完成下拉刷新
     */
    finishPullToRefresh: function finishPullToRefresh() {
      this.scrollTo(this.__scrollLeft, this.__scrollTop, true);
    },

    /**
     * 触发上拉加载
     */
    triggerPushToLoad: function triggerPushToLoad(height, callBack, scroll) {
      if (scroll) {
        this.__publish(this.__scrollLeft, this.__maxScrollTop + height, this.__zoomLevel, true, callBack);
      } else {
        this.__publish(this.__scrollLeft, this.__scrollTop, this.__zoomLevel, true);

        callBack(false);
      }
    },

    /**
     * 完成上拉加载
     */
    finishPushToLoad: function finishPushToLoad() {
      this.scrollTo(this.__scrollLeft, this.__maxScrollTop, true);
    },

    /**
     * 计算列表大小
     */
    computeScrollMax: function computeScrollMax() {
      this.__computeScrollMax();
    },

    /**
     * Returns the scroll position and zooming values
     *
     * @return {Map} `left` and `top` scroll position and `zoom` level
     */
    getValues: function getValues() {
      var self = this;
      return {
        left: self.__scrollLeft,
        top: self.__scrollTop,
        zoom: self.__zoomLevel
      };
    },

    /**
     * Returns the maximum scroll values
     *
     * @return {Map} `left` and `top` maximum scroll values
     */
    getScrollMax: function getScrollMax() {
      var self = this;
      return {
        left: self.__maxScrollLeft,
        top: self.__maxScrollTop
      };
    },

    /**
     * Zooms to the given level. Supports optional animation. Zooms
     * the center when no coordinates are given.
     *
     * @param level {Number} Level to zoom to
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? null} Zoom in at given left coordinate
     * @param originTop {Number ? null} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */
    zoomTo: function zoomTo(level, animate, originLeft, originTop, callback) {
      var self = this;

      if (!self.options.zooming) {
        throw new Error("Zooming is not enabled!");
      } // Add callback if exists


      if (callback) {
        self.__zoomComplete = callback;
      } // Stop deceleration


      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
      }

      var oldLevel = self.__zoomLevel; // Normalize input origin to center of viewport if not defined

      if (originLeft == null) {
        originLeft = self.__clientWidth / 2;
      }

      if (originTop == null) {
        originTop = self.__clientHeight / 2;
      } // Limit level according to configuration


      level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom); // Recompute maximum values while temporary tweaking maximum scroll ranges

      self.__computeScrollMax(level); // Recompute left and top coordinates based on new zoom level


      var left = (originLeft + self.__scrollLeft) * level / oldLevel - originLeft;
      var top = (originTop + self.__scrollTop) * level / oldLevel - originTop; // Limit x-axis

      if (left > self.__maxScrollLeft) {
        left = self.__maxScrollLeft;
      } else if (left < 0) {
        left = 0;
      } // Limit y-axis


      if (top > self.__maxScrollTop) {
        top = self.__maxScrollTop;
      } else if (top < 0) {
        top = 0;
      } // Push values out


      self.__publish(left, top, level, animate);
    },

    /**
     * Zooms the content by the given factor.
     *
     * @param factor {Number} Zoom by given factor
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? 0} Zoom in at given left coordinate
     * @param originTop {Number ? 0} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */
    zoomBy: function zoomBy(factor, animate, originLeft, originTop, callback) {
      var self = this;
      self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);
    },

    /**
     * Scrolls to the given position. Respect limitations and snapping automatically.
     *
     * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
     * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
     * @param animate {Boolean?false} Whether the scrolling should happen using an animation
     * @param zoom {Number?null} Zoom level to go to
     */
    scrollTo: function scrollTo(left, top, animate, zoom) {
      var self = this; // Stop deceleration

      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
      } // Correct coordinates based on new zoom level


      if (zoom != null && zoom !== self.__zoomLevel) {
        if (!self.options.zooming) {
          throw new Error("Zooming is not enabled!");
        }

        left *= zoom;
        top *= zoom; // Recompute maximum values while temporary tweaking maximum scroll ranges

        self.__computeScrollMax(zoom);
      } else {
        // Keep zoom when not defined
        zoom = self.__zoomLevel;
      }

      if (!self.options.scrollingX) {
        left = self.__scrollLeft;
      } else {
        if (self.options.paging) {
          left = Math.round(left / self.__clientWidth) * self.__clientWidth;
        } else if (self.options.snapping) {
          left = Math.round(left / self.__snapWidth) * self.__snapWidth;
        }
      }

      if (!self.options.scrollingY) {
        top = self.__scrollTop;
      } else {
        if (self.options.paging) {
          top = Math.round(top / self.__clientHeight) * self.__clientHeight;
        } else if (self.options.snapping) {
          top = Math.round(top / self.__snapHeight) * self.__snapHeight;
        }
      } // Limit for allowed ranges


      left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
      top = Math.max(Math.min(self.__maxScrollTop, top), 0); // Don't animate when no change detected, still call publish to make sure
      // that rendered position is really in-sync with internal data

      if (left === self.__scrollLeft && top === self.__scrollTop) {
        animate = false;
      } // Publish new values


      if (!self.__isTracking) {
        self.__publish(left, top, zoom, animate);
      }
    },

    /**
     * Scroll by the given offset
     *
     * @param left {Number ? 0} Scroll x-axis by given offset
     * @param top {Number ? 0} Scroll x-axis by given offset
     * @param animate {Boolean ? false} Whether to animate the given change
     */
    scrollBy: function scrollBy(left, top, animate) {
      var self = this;
      var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
      var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;
      self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);
    },

    /*
    ---------------------------------------------------------------------------
        EVENT CALLBACKS
    ---------------------------------------------------------------------------
    */

    /**
     * Mouse wheel handler for zooming support
     */
    doMouseZoom: function doMouseZoom(wheelDelta, timeStamp, pageX, pageY) {
      var self = this;
      var change = wheelDelta > 0 ? 0.97 : 1.03;
      return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);
    },

    /**
     * Touch start handler for scrolling support
     */
    doTouchStart: function doTouchStart(touches, timeStamp) {
      // Array-like check is enough here
      if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }

      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this; // Reset interruptedAnimation flag

      self.__interruptedAnimation = true; // Stop deceleration

      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
        self.__interruptedAnimation = true;
      } // Stop animation


      if (self.__isAnimating) {
        core.effect.Animate.stop(self.__isAnimating);
        self.__isAnimating = false;
        self.__interruptedAnimation = true;
      } // Use center point when dealing with two fingers


      var currentTouchLeft, currentTouchTop;
      var isSingleTouch = touches.length === 1;

      if (isSingleTouch) {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      } else {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      } // Store initial positions


      self.__initialTouchLeft = currentTouchLeft;
      self.__initialTouchTop = currentTouchTop; // Store current zoom level

      self.__zoomLevelStart = self.__zoomLevel; // Store initial touch positions

      self.__lastTouchLeft = currentTouchLeft;
      self.__lastTouchTop = currentTouchTop; // Store initial move time stamp

      self.__lastTouchMove = timeStamp; // Reset initial scale

      self.__lastScale = 1; // Reset locking flags

      self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
      self.__enableScrollY = !isSingleTouch && self.options.scrollingY; // Reset tracking flag

      self.__isTracking = true; // Reset deceleration complete flag

      self.__didDecelerationComplete = false; // Dragging starts directly with two fingers, otherwise lazy with an offset

      self.__isDragging = !isSingleTouch; // Some features are disabled in multi touch scenarios

      self.__isSingleTouch = isSingleTouch; // Clearing data structure

      self.__positions = [];
    },

    /**
     * Touch move handler for scrolling support
     */
    doTouchMove: function doTouchMove(touches, timeStamp, scale) {
      // Array-like check is enough here
      if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }

      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this; // Ignore event when tracking is not enabled (event might be outside of element)

      if (!self.__isTracking) {
        return;
      }

      var currentTouchLeft, currentTouchTop; // Compute move based around of center of fingers

      if (touches.length === 2) {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      } else {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      }

      var positions = self.__positions; // Are we already is dragging mode?

      if (self.__isDragging) {
        // Compute move distance
        var moveX = currentTouchLeft - self.__lastTouchLeft;
        var moveY = currentTouchTop - self.__lastTouchTop; // Read previous scroll position and zooming

        var scrollLeft = self.__scrollLeft;
        var scrollTop = self.__scrollTop;
        var level = self.__zoomLevel; // Work with scaling

        if (scale != null && self.options.zooming) {
          var oldLevel = level; // Recompute level based on previous scale and new scale

          level = level / self.__lastScale * scale; // Limit level according to configuration

          level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom); // Only do further compution when change happened

          if (oldLevel !== level) {
            // Compute relative event position to container
            var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
            var currentTouchTopRel = currentTouchTop - self.__clientTop; // Recompute left and top coordinates based on new zoom level

            scrollLeft = (currentTouchLeftRel + scrollLeft) * level / oldLevel - currentTouchLeftRel;
            scrollTop = (currentTouchTopRel + scrollTop) * level / oldLevel - currentTouchTopRel; // Recompute max scroll values

            self.__computeScrollMax(level);
          }
        }

        if (self.__enableScrollX) {
          scrollLeft -= moveX * this.options.speedMultiplier;
          var maxScrollLeft = self.__maxScrollLeft;

          if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
            // Slow down on the edges
            if (self.options.bouncing) {
              scrollLeft += moveX / 2 * this.options.speedMultiplier;
            } else if (scrollLeft > maxScrollLeft) {
              scrollLeft = maxScrollLeft;
            } else {
              scrollLeft = 0;
            }
          }
        } // Compute new vertical scroll position


        if (self.__enableScrollY) {
          scrollTop -= moveY * this.options.speedMultiplier;
          var maxScrollTop = self.__maxScrollTop;

          if (scrollTop > maxScrollTop || scrollTop < 0) {
            // Slow down on the edges
            if (self.options.bouncing) {
              scrollTop += moveY / 2 * this.options.speedMultiplier; // Support pull-to-refresh (only when only y is scrollable)

              if (!self.__enableScrollX && self.__refreshHeight != null) {
                if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {
                  self.__refreshActive = true;

                  if (self.__refreshActivate) {
                    self.__refreshActivate();
                  }
                } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {
                  self.__refreshActive = false;

                  if (self.__refreshDeactivate) {
                    self.__refreshDeactivate();
                  }
                }
              }
            } else if (scrollTop > maxScrollTop) {
              scrollTop = maxScrollTop;
            } else {
              scrollTop = 0;
            }
          }
        } // Keep list from growing infinitely (holding min 10, max 20 measure points)


        if (positions.length > 60) {
          positions.splice(0, 30);
        } // Track scroll movement for decleration


        positions.push(scrollLeft, scrollTop, timeStamp); // Sync scroll position

        self.__publish(scrollLeft, scrollTop, level); // Otherwise figure out whether we are switching into dragging mode now.

      } else {
        var minimumTrackingForScroll = self.options.locking ? 3 : 0;
        var minimumTrackingForDrag = 5;
        var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
        var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
        self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
        self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;
        positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);
        self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);

        if (self.__isDragging) {
          self.__interruptedAnimation = false;
        }
      } // Update last touch positions and time stamp for next event


      self.__lastTouchLeft = currentTouchLeft;
      self.__lastTouchTop = currentTouchTop;
      self.__lastTouchMove = timeStamp;
      self.__lastScale = scale;
    },

    /**
     * Touch end handler for scrolling support
     */
    doTouchEnd: function doTouchEnd(timeStamp, refreshActivate) {
      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }

      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this; // Ignore event when tracking is not enabled (no touchstart event on element)
      // This is required as this listener ('touchmove') sits on the document and not on the element itself.

      if (!self.__isTracking) {
        return;
      } // Not touching anymore (when two finger hit the screen there are two touch end events)


      self.__isTracking = false; // Be sure to reset the dragging flag now. Here we also detect whether
      // the finger has moved fast enough to switch into a deceleration animation.

      if (self.__isDragging) {
        // Reset dragging flag
        self.__isDragging = false; // Start deceleration
        // Verify that the last move detected was in some relevant time frame

        if (self.__isSingleTouch && self.options.animating && timeStamp - self.__lastTouchMove <= 100) {
          // Then figure out what the scroll position was about 100ms ago
          var positions = self.__positions;
          var endPos = positions.length - 1;
          var startPos = endPos; // Move pointer to position measured 100ms ago

          for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 3) {
            startPos = i;
          } // If start and stop position is identical in a 100ms timeframe,
          // we cannot compute any useful deceleration.


          if (startPos !== endPos) {
            // Compute relative movement between these two points
            var timeOffset = positions[endPos] - positions[startPos];
            var movedLeft = self.__scrollLeft - positions[startPos - 2];
            var movedTop = self.__scrollTop - positions[startPos - 1]; // Based on 50ms compute the movement to apply for each render step

            self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
            self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60); // How much velocity is required to start the deceleration

            var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1; // Verify that we have enough velocity to start deceleration

            if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
              // Deactivate pull-to-refresh when decelerating
              if (!self.__refreshActive && !refreshActivate) {
                self.__startDeceleration(timeStamp);
              }
            } else {
              self.options.scrollingComplete();
            }
          } else {
            self.options.scrollingComplete();
          }
        } else if (timeStamp - self.__lastTouchMove > 100) {
          self.options.scrollingComplete();
        }
      } // If this was a slower move it is per default non decelerated, but this
      // still means that we want snap back to the bounds which is done here.
      // This is placed outside the condition above to improve edge case stability
      // e.g. touchend fired without enabled dragging. This should normally do not
      // have modified the scroll positions or even showed the scrollbars though.


      if (!self.__isDecelerating) {
        if (self.__refreshActive && self.__refreshStart) {
          // Use publish instead of scrollTo to allow scrolling to out of boundary position
          // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
          self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);

          if (self.__refreshStart) {
            self.__refreshStart();
          }
        } else {
          if (self.__interruptedAnimation || self.__isDragging) {
            self.options.scrollingComplete();
          }

          self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel); // Directly signalize deactivation (nothing todo on refresh?)

          if (self.__refreshActive) {
            self.__refreshActive = false;

            if (self.__refreshDeactivate) {
              self.__refreshDeactivate();
            }
          }
        }
      } // Fully cleanup list


      self.__positions.length = 0;
    },

    /*
    ---------------------------------------------------------------------------
        PRIVATE API
    ---------------------------------------------------------------------------
    */

    /**
     * Applies the scroll position to the content element
     *
     * @param left {Number} Left scroll position
     * @param top {Number} Top scroll position
     * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
     */
    __publish: function __publish(left, top, zoom, animate, callBack) {
      var self = this; // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation

      var wasAnimating = self.__isAnimating;

      if (wasAnimating) {
        core.effect.Animate.stop(wasAnimating);
        self.__isAnimating = false;
      }

      if (animate && self.options.animating) {
        // Keep scheduled positions for scrollBy/zoomBy functionality
        self.__scheduledLeft = left;
        self.__scheduledTop = top;
        self.__scheduledZoom = zoom;
        var oldLeft = self.__scrollLeft;
        var oldTop = self.__scrollTop;
        var oldZoom = self.__zoomLevel;
        var diffLeft = left - oldLeft;
        var diffTop = top - oldTop;
        var diffZoom = zoom - oldZoom;

        var step = function step(percent, now, render) {
          if (render) {
            self.__scrollLeft = oldLeft + diffLeft * percent;
            self.__scrollTop = oldTop + diffTop * percent;
            self.__zoomLevel = oldZoom + diffZoom * percent; // Push values out

            if (self.__callback) {
              self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
            }
          }
        };

        var verify = function verify(id) {
          return self.__isAnimating === id;
        };

        var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
          if (animationId === self.__isAnimating) {
            self.__isAnimating = false;
          }

          if (self.__didDecelerationComplete || wasFinished) {
            self.options.scrollingComplete();
          }

          if (self.options.zooming) {
            self.__computeScrollMax();

            if (self.__zoomComplete) {
              self.__zoomComplete();

              self.__zoomComplete = null;
            }
          }

          if (callBack) {
            callBack(true);
          }
        }; // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out


        self.__isAnimating = core.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
      } else {
        self.__scheduledLeft = self.__scrollLeft = left;
        self.__scheduledTop = self.__scrollTop = top;
        self.__scheduledZoom = self.__zoomLevel = zoom; // Push values out

        if (self.__callback) {
          self.__callback(left, top, zoom);
        } // Fix max scroll ranges


        if (self.options.zooming) {
          self.__computeScrollMax();

          if (self.__zoomComplete) {
            self.__zoomComplete();

            self.__zoomComplete = null;
          }
        }
      }
    },

    /**
     * Recomputes scroll minimum values based on client dimensions and content dimensions.
     */
    __computeScrollMax: function __computeScrollMax(zoomLevel) {
      var self = this;

      if (zoomLevel == null) {
        zoomLevel = self.__zoomLevel;
      }

      self.__maxScrollLeft = Math.max(self.__contentWidth * zoomLevel - self.__clientWidth, 0);
      self.__maxScrollTop = Math.max(self.__contentHeight * zoomLevel - self.__clientHeight, 0);
    },

    /*
    ---------------------------------------------------------------------------
        ANIMATION (DECELERATION) SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Called when a touch sequence end and the speed of the finger was high enough
     * to switch into deceleration mode.
     */
    __startDeceleration: function __startDeceleration(timeStamp) {
      var self = this;

      if (self.options.paging) {
        var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
        var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
        var clientWidth = self.__clientWidth;
        var clientHeight = self.__clientHeight; // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
        // Each page should have exactly the size of the client area.

        self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
        self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
        self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
        self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
      } else {
        self.__minDecelerationScrollLeft = 0;
        self.__minDecelerationScrollTop = 0;
        self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
        self.__maxDecelerationScrollTop = self.__maxScrollTop;
      } // Wrap class method


      var step = function step(percent, now, render) {
        self.__stepThroughDeceleration(render);
      }; // How much velocity is required to keep the deceleration running


      var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.001; // Detect whether it's still worth to continue animating steps
      // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.

      var verify = function verify() {
        var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;

        if (!shouldContinue) {
          self.__didDecelerationComplete = true;
        }

        return shouldContinue;
      };

      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
        self.__isDecelerating = false;

        if (self.__didDecelerationComplete) {
          self.options.scrollingComplete();
        } // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions


        self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
      }; // Start animation and switch on flag


      self.__isDecelerating = core.effect.Animate.start(step, verify, completed);
    },

    /**
     * Called on every step of the animation
     *
     * @param inMemory {Boolean?false} Whether to not render the current step, but keep it in memory only. Used internally only!
     */
    __stepThroughDeceleration: function __stepThroughDeceleration(render) {
      var self = this; //
      // COMPUTE NEXT SCROLL POSITION
      //
      // Add deceleration to scroll position

      var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
      var scrollTop = self.__scrollTop + self.__decelerationVelocityY; //
      // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
      //

      if (!self.options.bouncing) {
        var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);

        if (scrollLeftFixed !== scrollLeft) {
          scrollLeft = scrollLeftFixed;
          self.__decelerationVelocityX = 0;
        }

        var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);

        if (scrollTopFixed !== scrollTop) {
          scrollTop = scrollTopFixed;
          self.__decelerationVelocityY = 0;
        }
      } //
      // UPDATE SCROLL POSITION
      //


      if (render) {
        self.__publish(scrollLeft, scrollTop, self.__zoomLevel);
      } else {
        self.__scrollLeft = scrollLeft;
        self.__scrollTop = scrollTop;
      } //
      // SLOW DOWN
      //
      // Slow down velocity on every iteration


      if (!self.options.paging) {
        // This is the factor applied to every iteration of the animation
        // to slow down the process. This should emulate natural behavior where
        // objects slow down when the initiator of the movement is removed
        var frictionFactor = 0.95;
        self.__decelerationVelocityX *= frictionFactor;
        self.__decelerationVelocityY *= frictionFactor;
      } //
      // BOUNCING SUPPORT
      //


      if (self.options.bouncing) {
        var scrollOutsideX = 0;
        var scrollOutsideY = 0; // This configures the amount of change applied to deceleration/acceleration when reaching boundaries

        var penetrationDeceleration = self.options.penetrationDeceleration;
        var penetrationAcceleration = self.options.penetrationAcceleration; // Check limits

        if (scrollLeft < self.__minDecelerationScrollLeft) {
          scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
        } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
          scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
        }

        if (scrollTop < self.__minDecelerationScrollTop) {
          scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
        } else if (scrollTop > self.__maxDecelerationScrollTop) {
          scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
        } // Slow down until slow enough, then flip back to snap position


        if (scrollOutsideX !== 0) {
          if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
            self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
          } else {
            self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
          }
        }

        if (scrollOutsideY !== 0) {
          if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
            self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
          } else {
            self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
          }
        }
      }
    } // Copy over members to prototype

  };

  for (var key in members) {
    Scroller.prototype[key] = members[key];
  }

  if ( true && module.exports) {
    module.exports = Scroller;
  } else if (typeof define == 'function' && __webpack_require__("3c35")) {
    define(function () {
      return Scroller;
    });
  } else {
    window.Scroller = Scroller;
  }
})(window);

/* harmony default export */ __webpack_exports__["a"] = (Scroller);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("dd40")(module)))

/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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


/***/ }),

/***/ "d8d6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("6c1c");
module.exports = __webpack_require__("ccb9").f('iterator');


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "dc62":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("9427");
var $Object = __webpack_require__("584a").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "dd40":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "e02b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircularProgress_vue_vue_type_style_index_0_id_6460aee4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("92a5");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircularProgress_vue_vue_type_style_index_0_id_6460aee4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircularProgress_vue_vue_type_style_index_0_id_6460aee4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircularProgress_vue_vue_type_style_index_0_id_6460aee4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e1f4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("1d86");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("1767fc34", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "e265":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ed33");

/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "e829":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("2f37");
module.exports = __webpack_require__("584a").Date.now;


/***/ }),

/***/ "ead6":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("f772");
var anObject = __webpack_require__("e4ae");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("d864")(Function.call, __webpack_require__("bf0b").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "ebbf":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-material-header{width:100%;height:0;background:transparent}.er-material-header .er-material-header-circle-card{position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center;bottom:5px;left:0;right:0;margin:0 auto;height:40px;width:40px;border-radius:50%;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}", ""]);

// exports


/***/ }),

/***/ "ebfd":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("62a0")('meta');
var isObject = __webpack_require__("f772");
var has = __webpack_require__("07e3");
var setDesc = __webpack_require__("d9f6").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("294c")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "ecb8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-bezier-circle-header[data-v-5359ae7b]{position:relative;width:100%;height:0;background:transparent}.er-bezier-circle-header .er-bch-canvas[data-v-5359ae7b]{position:absolute;width:100%;height:100%;z-index:-1}.er-bezier-circle-header .er-bch-progress[data-v-5359ae7b]{position:absolute;width:100%;height:80px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:Center;-ms-flex-align:Center;align-items:Center}", ""]);

// exports


/***/ }),

/***/ "ed33":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("014b");
module.exports = __webpack_require__("584a").Object.getOwnPropertySymbols;


/***/ }),

/***/ "ed9c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseFooter_vue_vue_type_style_index_0_id_7bcb570c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a006");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseFooter_vue_vue_type_style_index_0_id_7bcb570c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseFooter_vue_vue_type_style_index_0_id_7bcb570c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BallPulseFooter_vue_vue_type_style_index_0_id_7bcb570c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f499":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("287e");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("48a38b01", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "f49a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceFooter_vue_vue_type_style_index_0_id_23d50417_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8cb4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceFooter_vue_vue_type_style_index_0_id_23d50417_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceFooter_vue_vue_type_style_index_0_id_23d50417_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BezierBounceFooter_vue_vue_type_style_index_0_id_23d50417_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "f77a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a2ae");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClassicsHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f921":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("014b");
__webpack_require__("c207");
__webpack_require__("69d3");
__webpack_require__("765d");
module.exports = __webpack_require__("584a").Symbol;


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fa99":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("0293");
module.exports = __webpack_require__("584a").Object.getPrototypeOf;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js
var get_own_property_descriptor = __webpack_require__("268f");
var get_own_property_descriptor_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptor);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("e265");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("a4bb");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = keys_default()(source);

    if (typeof get_own_property_symbols_default.a === 'function') {
      ownKeys = ownKeys.concat(get_own_property_symbols_default()(source).filter(function (sym) {
        return get_own_property_descriptor_default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EasyRefresh/EasyRefresh.vue?vue&type=template&id=02672e60&
var EasyRefreshvue_type_template_id_02672e60_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-easy-refresh"},[_c('div',{staticClass:"v-easy-refresh-body",class:{'er_user_select_none': !_vm.userSelect},attrs:{"id":_vm.easyRefreshId},on:{"touchstart":function($event){return _vm.touchStart($event)},"touchmove":function($event){return _vm.touchMove($event)},"touchend":function($event){return _vm.touchEnd($event)},"mousedown":function($event){return _vm.mouseDown($event)},"mousemove":function($event){return _vm.mouseMove($event)},"mouseup":function($event){return _vm.mouseUp($event)},"wheel":function($event){return _vm.wheel($event)}}},[_c('div',{attrs:{"id":_vm.contentId}},[_c('div',{staticClass:"v-easy-refresh-float-offset",style:('margin-top: ' + _vm.floatTop + 'px;')}),_vm._t("default"),(_vm.autoLoad)?_c('div',{staticClass:"v-easy-auto-load-offset",style:('height: ' + _vm.footerOffset + 'px;')}):_vm._e()],2)]),_c('div',{staticClass:"v-easy-refresh-header",style:('bottom: ' + _vm.headerBottom + 'px;')},[_vm._t("header",[_c('ClassicsHeader',{ref:"header"})])],2),_c('div',{staticClass:"v-easy-refresh-footer",style:('top: ' + _vm.footerTop + 'px;')},[_vm._t("footer",[_c('ClassicsFooter',{ref:"footer"})])],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EasyRefresh/EasyRefresh.vue?vue&type=template&id=02672e60&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js
var get_iterator = __webpack_require__("5d73");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.to-string.js
var es6_object_to_string = __webpack_require__("06db");

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    define_property_default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js
var iterator = __webpack_require__("5d58");
var iterator_default = /*#__PURE__*/__webpack_require__.n(iterator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol.js
var symbol = __webpack_require__("67bb");
var symbol_default = /*#__PURE__*/__webpack_require__.n(symbol);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js



function typeof_typeof2(obj) { if (typeof symbol_default.a === "function" && typeof iterator_default.a === "symbol") { typeof_typeof2 = function _typeof2(obj) { return typeof obj; }; } else { typeof_typeof2 = function _typeof2(obj) { return obj && typeof symbol_default.a === "function" && obj.constructor === symbol_default.a && obj !== symbol_default.a.prototype ? "symbol" : typeof obj; }; } return typeof_typeof2(obj); }

function typeof_typeof(obj) {
  if (typeof symbol_default.a === "function" && typeof_typeof2(iterator_default.a) === "symbol") {
    typeof_typeof = function _typeof(obj) {
      return typeof_typeof2(obj);
    };
  } else {
    typeof_typeof = function _typeof(obj) {
      return obj && typeof symbol_default.a === "function" && obj.constructor === symbol_default.a && obj !== symbol_default.a.prototype ? "symbol" : typeof_typeof2(obj);
    };
  }

  return typeof_typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (typeof_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js
var get_prototype_of = __webpack_require__("061b");
var get_prototype_of_default = /*#__PURE__*/__webpack_require__.n(get_prototype_of);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js
var set_prototype_of = __webpack_require__("4d16");
var set_prototype_of_default = /*#__PURE__*/__webpack_require__.n(set_prototype_of);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js


function getPrototypeOf_getPrototypeOf(o) {
  getPrototypeOf_getPrototypeOf = set_prototype_of_default.a ? get_prototype_of_default.a : function _getPrototypeOf(o) {
    return o.__proto__ || get_prototype_of_default()(o);
  };
  return getPrototypeOf_getPrototypeOf(o);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/create.js
var create = __webpack_require__("4aa6");
var create_default = /*#__PURE__*/__webpack_require__.n(create);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js

function _setPrototypeOf(o, p) {
  _setPrototypeOf = set_prototype_of_default.a || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js


function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = create_default()(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.common.js
var vue_class_component_common = __webpack_require__("65d9");
var vue_class_component_common_default = /*#__PURE__*/__webpack_require__.n(vue_class_component_common);

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
/** vue-property-decorator verson 7.3.0 MIT LICENSE copyright 2018 kaorun343 */




/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return Object(vue_class_component_common["createDecorator"])(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return Object(vue_class_component_common["createDecorator"])(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return Object(vue_class_component_common["createDecorator"])(function (componentOptions, k) {
        (componentOptions.props || (componentOptions.props = {}))[k] = options;
        componentOptions.model = { prop: k, event: event || k };
    });
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return Object(vue_class_component_common["createDecorator"])(function (componentOptions, k) {
        (componentOptions.props || (componentOptions.props = {}))[k] = options;
    });
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return Object(vue_class_component_common["createDecorator"])(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var emit = function (returnValue) {
                if (returnValue !== undefined)
                    args.unshift(returnValue);
                _this.$emit.apply(_this, [event || key].concat(args));
            };
            var returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(function (returnValue) {
                    emit(returnValue);
                });
            }
            else {
                emit(returnValue);
            }
        };
    };
}
function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}

// EXTERNAL MODULE: ./src/module/core.js
var core = __webpack_require__("d7a8");

// CONCATENATED MODULE: ./src/module/render.js



function getContentRender(content, callBack) {
  var global = window;
  var docStyle = document.documentElement.style;
  var engine;

  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }

  var vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine];
  var helperElem = document.createElement("div");
  var undef;
  var perspectiveProperty = vendorPrefix + "Perspective";
  var transformProperty = vendorPrefix + "Transform";

  if (helperElem.style[perspectiveProperty] !== undef) {
    return function (left, top, zoom) {
      content.style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0) scale(' + zoom + ')';
      callBack(left, top, zoom);
    };
  } else if (helperElem.style[transformProperty] !== undef) {
    return function (left, top, zoom) {
      content.style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px) scale(' + zoom + ')';
      callBack(left, top, zoom);
    };
  } else {
    return function (left, top, zoom) {
      content.style.marginLeft = left ? -left / zoom + 'px' : '';
      content.style.marginTop = top ? -top / zoom + 'px' : '';
      content.style.zoom = zoom || '';
      callBack(left, top, zoom);
    };
  }
}

/* harmony default export */ var module_render = (getContentRender);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/ClassicsHeader/ClassicsHeader.vue?vue&type=template&id=17d4d9ea&
var ClassicsHeadervue_type_template_id_17d4d9ea_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"header",staticClass:"er-classics-header",style:('height: ' + _vm.headerHeight + 'px;' + 'background-color: ' + _vm.bgColor + ';')},[_c('span',{staticClass:"er-classics-header-flex er-classics-header-icon"},[(_vm.headerStatus === 4)?_c('CircularProgress',{staticClass:"er-classics-header-progress",attrs:{"color":_vm.textColor}}):(_vm.headerStatus === 5 || _vm.headerStatus === 6)?_c('Done',{staticClass:"er-classics-header-done-icon",attrs:{"color":_vm.textColor}}):_c('Arrow',{staticClass:"er-classics-header-arrow-icon",attrs:{"color":_vm.textColor,"rotate":_vm.rotateArrow}})],1),_c('span',{staticClass:"er-classics-header-flex er-classics-header-content"},[_c('div',{staticClass:"er-classics-header-content-text",style:('color: ' + _vm.textColor + ';')},[_vm._v(_vm._s(_vm.showText))]),(_vm.showMore)?_c('div',{staticClass:"er-classics-header-content-more",style:('color: ' + _vm.moreInfoColor + ';')},[_vm._v(_vm._s(_vm.showMoreInfo))]):_vm._e()]),_c('span',{staticClass:"er-classics-header-flex"})])}
var ClassicsHeadervue_type_template_id_17d4d9ea_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/header/ClassicsHeader/ClassicsHeader.vue?vue&type=template&id=17d4d9ea&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./src/components/header/header.ts
// Header状态
var RefreshHeaderStatus;

(function (RefreshHeaderStatus) {
  RefreshHeaderStatus[RefreshHeaderStatus["NO_REFRESH"] = 1] = "NO_REFRESH";
  RefreshHeaderStatus[RefreshHeaderStatus["REFRESH_START"] = 2] = "REFRESH_START";
  RefreshHeaderStatus[RefreshHeaderStatus["REFRESH_READY"] = 3] = "REFRESH_READY";
  RefreshHeaderStatus[RefreshHeaderStatus["REFRESHING"] = 4] = "REFRESHING";
  RefreshHeaderStatus[RefreshHeaderStatus["REFRESHED"] = 5] = "REFRESHED";
  RefreshHeaderStatus[RefreshHeaderStatus["REFRESH_END"] = 6] = "REFRESH_END";
})(RefreshHeaderStatus || (RefreshHeaderStatus = {}));


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/Arrow.vue?vue&type=template&id=436a3834&scoped=true&
var Arrowvue_type_template_id_436a3834_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"arrow",class:_vm.arrowClass,attrs:{"t":"1550565891853","viewBox":"0 0 1024 1024","version":"1.1","xmlns":"http://www.w3.org/2000/svg","p-id":"10970","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"100","height":"100"}},[_c('defs'),_c('path',{attrs:{"d":"M853.333333 512l-60.16-60.16L554.666667 689.92V170.666667h-85.333334v519.253333L231.253333 451.413333 170.666667 512l341.333333 341.333333 341.333333-341.333333z","fill":_vm.color,"p-id":"10971"}})])}
var Arrowvue_type_template_id_436a3834_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icon/Arrow.vue?vue&type=template&id=436a3834&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/Arrow.vue?vue&type=script&lang=ts&








var Arrowvue_type_script_lang_ts_Arrow =
/*#__PURE__*/
function (_Vue) {
  _inherits(Arrow, _Vue);

  function Arrow() {
    var _this;

    _classCallCheck(this, Arrow);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(Arrow).apply(this, arguments)); // Arrow的class

    _this.arrowClass = 'down';
    return _this;
  } // 初始化


  _createClass(Arrow, [{
    key: "mounted",
    value: function mounted() {
      // 初始化显示文字
      this.arrowClass = this.direction;
    } // 监听旋转

  }, {
    key: "onRotate",
    value: function onRotate(val, oldVal) {
      if (val) {
        if (this.direction === 'down') {
          this.arrowClass = 'up';
        } else {
          this.arrowClass = 'down';
        }
      } else {
        this.arrowClass = this.direction;
      }
    }
  }]);

  return Arrow;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 'down'
})], Arrowvue_type_script_lang_ts_Arrow.prototype, "direction", void 0);

__decorate([Prop({
  default: false
})], Arrowvue_type_script_lang_ts_Arrow.prototype, "rotate", void 0);

__decorate([Prop({
  default: '#000000'
})], Arrowvue_type_script_lang_ts_Arrow.prototype, "color", void 0);

__decorate([Watch('rotate')], Arrowvue_type_script_lang_ts_Arrow.prototype, "onRotate", null);

Arrowvue_type_script_lang_ts_Arrow = __decorate([vue_class_component_common_default.a], Arrowvue_type_script_lang_ts_Arrow);
/* harmony default export */ var Arrowvue_type_script_lang_ts_ = (Arrowvue_type_script_lang_ts_Arrow);
// CONCATENATED MODULE: ./src/components/icon/Arrow.vue?vue&type=script&lang=ts&
 /* harmony default export */ var icon_Arrowvue_type_script_lang_ts_ = (Arrowvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/icon/Arrow.vue?vue&type=style&index=0&id=436a3834&scoped=true&lang=scss&
var Arrowvue_type_style_index_0_id_436a3834_scoped_true_lang_scss_ = __webpack_require__("835b");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/icon/Arrow.vue






/* normalize component */

var component = normalizeComponent(
  icon_Arrowvue_type_script_lang_ts_,
  Arrowvue_type_template_id_436a3834_scoped_true_render,
  Arrowvue_type_template_id_436a3834_scoped_true_staticRenderFns,
  false,
  null,
  "436a3834",
  null
  
)

/* harmony default export */ var icon_Arrow = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/Done.vue?vue&type=template&id=48c5866e&scoped=true&
var Donevue_type_template_id_48c5866e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"icon",attrs:{"t":"1550718083010","viewBox":"0 0 1024 1024","version":"1.1","xmlns":"http://www.w3.org/2000/svg","p-id":"10970","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"100","height":"100"}},[_c('defs'),_c('path',{attrs:{"d":"M384 689.92L206.08 512l-60.373333 60.373333L384 810.666667l512-512-60.373333-60.373334z","fill":_vm.color,"p-id":"10971"}})])}
var Donevue_type_template_id_48c5866e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icon/Done.vue?vue&type=template&id=48c5866e&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/Done.vue?vue&type=script&lang=ts&







var Donevue_type_script_lang_ts_Done =
/*#__PURE__*/
function (_Vue) {
  _inherits(Done, _Vue);

  function Done() {
    _classCallCheck(this, Done);

    return _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(Done).apply(this, arguments));
  }

  return Done;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: '#000000'
})], Donevue_type_script_lang_ts_Done.prototype, "color", void 0);

Donevue_type_script_lang_ts_Done = __decorate([vue_class_component_common_default.a], Donevue_type_script_lang_ts_Done);
/* harmony default export */ var Donevue_type_script_lang_ts_ = (Donevue_type_script_lang_ts_Done);
// CONCATENATED MODULE: ./src/components/icon/Done.vue?vue&type=script&lang=ts&
 /* harmony default export */ var icon_Donevue_type_script_lang_ts_ = (Donevue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/icon/Done.vue





/* normalize component */

var Done_component = normalizeComponent(
  icon_Donevue_type_script_lang_ts_,
  Donevue_type_template_id_48c5866e_scoped_true_render,
  Donevue_type_template_id_48c5866e_scoped_true_staticRenderFns,
  false,
  null,
  "48c5866e",
  null
  
)

/* harmony default export */ var icon_Done = (Done_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/CircularProgress.vue?vue&type=template&id=6460aee4&scoped=true&
var CircularProgressvue_type_template_id_6460aee4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"circular-progress"},[(_vm.value !== null)?_c('div',[_c('div',{staticClass:"circleProgress_wrapper",class:_vm.size},[_c('div',{staticClass:"wrapper right",class:_vm.size},[_c('div',{staticClass:"circleProgress rightcircle",class:_vm.size,style:('transform: rotate(' + _vm.rightRotate + 'deg);' + 'border-top-color: ' + _vm.color + ';' + 'border-right-color: ' + _vm.color + ';')})]),_c('div',{staticClass:"wrapper left",class:_vm.size},[_c('div',{staticClass:"circleProgress leftcircle",class:_vm.size,style:('transform: rotate(' + _vm.leftRotate + 'deg);' + 'border-bottom-color: ' + _vm.color + ';' + 'border-left-color: ' + _vm.color + ';')})])])]):_c('div',{staticClass:"preloader-wrapper active",class:_vm.size},[_c('div',{staticClass:"spinner-layer",style:('border-color: ' + _vm.color + ';')},[_vm._m(0),_vm._m(1),_vm._m(2)])])])}
var CircularProgressvue_type_template_id_6460aee4_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"circle-clipper left"},[_c('div',{staticClass:"circle"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gap-patch"},[_c('div',{staticClass:"circle"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"circle-clipper right"},[_c('div',{staticClass:"circle"})])}]


// CONCATENATED MODULE: ./src/components/icon/CircularProgress.vue?vue&type=template&id=6460aee4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/CircularProgress.vue?vue&type=script&lang=ts&








var CircularProgressvue_type_script_lang_ts_CircularProgress =
/*#__PURE__*/
function (_Vue) {
  _inherits(CircularProgress, _Vue);

  function CircularProgress() {
    _classCallCheck(this, CircularProgress);

    return _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(CircularProgress).apply(this, arguments));
  }

  _createClass(CircularProgress, [{
    key: "rightRotate",
    // 获取旋转度
    get: function get() {
      if (this.value <= 0) {
        return -135;
      } else if (this.value <= 0.5) {
        return -135 + 360 * this.value;
      } else {
        return 45;
      }
    }
  }, {
    key: "leftRotate",
    get: function get() {
      if (this.value <= 0.5) {
        return -135;
      } else if (this.value < 1) {
        return -135 + 360 * (this.value - 0.5);
      } else {
        return 45;
      }
    }
  }]);

  return CircularProgress;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: '#000000'
})], CircularProgressvue_type_script_lang_ts_CircularProgress.prototype, "color", void 0);

__decorate([Prop({
  default: null
})], CircularProgressvue_type_script_lang_ts_CircularProgress.prototype, "value", void 0);

__decorate([Prop({
  default: 'small'
})], CircularProgressvue_type_script_lang_ts_CircularProgress.prototype, "size", void 0);

CircularProgressvue_type_script_lang_ts_CircularProgress = __decorate([vue_class_component_common_default.a], CircularProgressvue_type_script_lang_ts_CircularProgress);
/* harmony default export */ var CircularProgressvue_type_script_lang_ts_ = (CircularProgressvue_type_script_lang_ts_CircularProgress);
// CONCATENATED MODULE: ./src/components/icon/CircularProgress.vue?vue&type=script&lang=ts&
 /* harmony default export */ var icon_CircularProgressvue_type_script_lang_ts_ = (CircularProgressvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/icon/CircularProgress.vue?vue&type=style&index=0&id=6460aee4&scoped=true&lang=scss&
var CircularProgressvue_type_style_index_0_id_6460aee4_scoped_true_lang_scss_ = __webpack_require__("e02b");

// CONCATENATED MODULE: ./src/components/icon/CircularProgress.vue






/* normalize component */

var CircularProgress_component = normalizeComponent(
  icon_CircularProgressvue_type_script_lang_ts_,
  CircularProgressvue_type_template_id_6460aee4_scoped_true_render,
  CircularProgressvue_type_template_id_6460aee4_scoped_true_staticRenderFns,
  false,
  null,
  "6460aee4",
  null
  
)

/* harmony default export */ var icon_CircularProgress = (CircularProgress_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/ClassicsHeader/ClassicsHeader.vue?vue&type=script&lang=ts&













var ClassicsHeadervue_type_script_lang_ts_ClassicsHeader =
/*#__PURE__*/
function (_Vue) {
  _inherits(ClassicsHeader, _Vue);

  function ClassicsHeader() {
    var _this;

    _classCallCheck(this, ClassicsHeader);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(ClassicsHeader).apply(this, arguments)); // 显示文字

    _this.showText = _this.refreshText; // 显示更多信息

    _this.showMoreInfo = ''; // Header的高度

    _this.headerHeight = 70.0; // 旋转箭头

    _this.rotateArrow = false; // Header状态

    _this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
    return _this;
  } // 初始化


  _createClass(ClassicsHeader, [{
    key: "mounted",
    value: function mounted() {
      // 初始化显示文字
      this.showText = this.refreshText; // 初始化更多信息

      this.showMoreInfo = this.getMoreInfo(); // 初始化高度

      this.headerHeight = this.height;
    } // 刷新高度

  }, {
    key: "refreshHeight",
    value: function refreshHeight() {
      return this.height;
    } // 完成延时

  }, {
    key: "headerFinishDuration",
    value: function headerFinishDuration() {
      return this.finishDuration;
    } // 是否浮动

  }, {
    key: "isHeaderFloat",
    value: function isHeaderFloat() {
      return this.isFloat;
    }
  }, {
    key: "onRefreshClose",
    value: function onRefreshClose() {
      this.showText = this.refreshText;
      this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
    }
  }, {
    key: "onRefreshEnd",
    value: function onRefreshEnd() {
      this.showText = this.refreshedText;
      this.headerStatus = RefreshHeaderStatus.REFRESH_END;
    }
  }, {
    key: "onRefreshReady",
    value: function onRefreshReady() {
      this.rotateArrow = true;
      this.showText = this.refreshReadyText;
      this.headerStatus = RefreshHeaderStatus.REFRESH_READY;
    }
  }, {
    key: "onRefreshRestore",
    value: function onRefreshRestore() {
      this.rotateArrow = false;
      this.showText = this.refreshText;
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshStart",
    value: function onRefreshStart() {
      this.rotateArrow = false;
      this.showText = this.refreshText;
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshed",
    value: function onRefreshed() {
      this.rotateArrow = false;
      this.showText = this.refreshedText;
      this.headerStatus = RefreshHeaderStatus.REFRESHED; // 更新更多信息

      this.showMoreInfo = this.getMoreInfo();
    }
  }, {
    key: "onRefreshing",
    value: function onRefreshing() {
      this.showText = this.refreshingText;
      this.headerStatus = RefreshHeaderStatus.REFRESHING;
    }
  }, {
    key: "updateHeaderHeight",
    value: function updateHeaderHeight(height) {
      if (height > this.height) {
        this.headerHeight = height;
      } else {
        this.headerHeight = this.height;
      }
    } // 获取更新信息

  }, {
    key: "getMoreInfo",
    value: function getMoreInfo() {
      var date = new Date();
      var fillChar = date.getMinutes() < 10 ? '0' : '';
      var moreInfo = this.moreInfo;
      return moreInfo.replace('%T', '' + date.getHours() + ':' + fillChar + date.getMinutes());
    }
  }]);

  return ClassicsHeader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 'Pull to refresh'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "refreshText", void 0);

__decorate([Prop({
  default: 'Release to refresh'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "refreshReadyText", void 0);

__decorate([Prop({
  default: 'Refreshing...'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "refreshingText", void 0);

__decorate([Prop({
  default: 'Refresh finished'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "refreshedText", void 0);

__decorate([Prop({
  default: 'transparent'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "bgColor", void 0);

__decorate([Prop({
  default: '#616161'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "textColor", void 0);

__decorate([Prop({
  default: false
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "showMore", void 0);

__decorate([Prop({
  default: 'Updated at %T'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "moreInfo", void 0);

__decorate([Prop({
  default: '#aaaaaa'
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "moreInfoColor", void 0);

__decorate([Prop({
  default: 70
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "height", void 0);

__decorate([Prop({
  default: 1000
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: false
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader.prototype, "isFloat", void 0);

ClassicsHeadervue_type_script_lang_ts_ClassicsHeader = __decorate([vue_class_component_common_default()({
  components: {
    Arrow: icon_Arrow,
    Done: icon_Done,
    CircularProgress: icon_CircularProgress
  }
})], ClassicsHeadervue_type_script_lang_ts_ClassicsHeader);
/* harmony default export */ var ClassicsHeadervue_type_script_lang_ts_ = (ClassicsHeadervue_type_script_lang_ts_ClassicsHeader);
// CONCATENATED MODULE: ./src/components/header/ClassicsHeader/ClassicsHeader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var ClassicsHeader_ClassicsHeadervue_type_script_lang_ts_ = (ClassicsHeadervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/header/ClassicsHeader/ClassicsHeader.vue?vue&type=style&index=0&lang=scss&
var ClassicsHeadervue_type_style_index_0_lang_scss_ = __webpack_require__("f77a");

// CONCATENATED MODULE: ./src/components/header/ClassicsHeader/ClassicsHeader.vue






/* normalize component */

var ClassicsHeader_component = normalizeComponent(
  ClassicsHeader_ClassicsHeadervue_type_script_lang_ts_,
  ClassicsHeadervue_type_template_id_17d4d9ea_render,
  ClassicsHeadervue_type_template_id_17d4d9ea_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ClassicsHeader_ClassicsHeader = (ClassicsHeader_component.exports);
// CONCATENATED MODULE: ./src/components/header/ClassicsHeader/index.ts
 // @ts-ignore

ClassicsHeader_ClassicsHeader.install = function (Vue) {
  Vue.component('ClassicsHeader', ClassicsHeader_ClassicsHeader);
};

/* harmony default export */ var header_ClassicsHeader = (ClassicsHeader_ClassicsHeader);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/ClassicsFooter/ClassicsFooter.vue?vue&type=template&id=6af6029e&
var ClassicsFootervue_type_template_id_6af6029e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"footer",staticClass:"er-classics-footer",style:('height: ' + _vm.footerHeight + 'px;' + 'background-color: ' + _vm.bgColor + ';')},[_c('span',{staticClass:"er-classics-footer-flex er-classics-footer-icon"},[(_vm.footerStatus === 4)?_c('CircularProgress',{staticClass:"er-classics-footer-progress",attrs:{"color":_vm.textColor}}):(_vm.footerStatus === 5 || _vm.footerStatus === 6)?_c('Done',{staticClass:"er-classics-footer-done-icon",attrs:{"color":_vm.textColor}}):_c('Arrow',{staticClass:"er-classics-footer-arrow-icon",attrs:{"direction":"up","color":_vm.textColor,"rotate":_vm.rotateArrow}})],1),_c('span',{staticClass:"er-classics-footer-flex er-classics-footer-content",style:('color: ' + _vm.textColor + ';')},[_c('div',{staticClass:"er-classics-footer-content-text",style:('color: ' + _vm.textColor + ';')},[_vm._v(_vm._s(_vm.showText))]),(_vm.showMore)?_c('div',{staticClass:"er-classics-footer-content-more",style:('color: ' + _vm.moreInfoColor + ';')},[_vm._v(_vm._s(_vm.showMoreInfo))]):_vm._e()]),_c('span',{staticClass:"er-classics-footer-flex"})])}
var ClassicsFootervue_type_template_id_6af6029e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/footer/ClassicsFooter/ClassicsFooter.vue?vue&type=template&id=6af6029e&

// CONCATENATED MODULE: ./src/components/footer/footer.ts
// Footer状态
var RefreshFooterStatus;

(function (RefreshFooterStatus) {
  RefreshFooterStatus[RefreshFooterStatus["NO_LOAD"] = 1] = "NO_LOAD";
  RefreshFooterStatus[RefreshFooterStatus["LOAD_START"] = 2] = "LOAD_START";
  RefreshFooterStatus[RefreshFooterStatus["LOAD_READY"] = 3] = "LOAD_READY";
  RefreshFooterStatus[RefreshFooterStatus["LOADING"] = 4] = "LOADING";
  RefreshFooterStatus[RefreshFooterStatus["LOADED"] = 5] = "LOADED";
  RefreshFooterStatus[RefreshFooterStatus["LOAD_END"] = 6] = "LOAD_END";
})(RefreshFooterStatus || (RefreshFooterStatus = {}));


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/ClassicsFooter/ClassicsFooter.vue?vue&type=script&lang=ts&













var ClassicsFootervue_type_script_lang_ts_ClassicsFooter =
/*#__PURE__*/
function (_Vue) {
  _inherits(ClassicsFooter, _Vue);

  function ClassicsFooter() {
    var _this;

    _classCallCheck(this, ClassicsFooter);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(ClassicsFooter).apply(this, arguments)); // 显示文字

    _this.showText = _this.loadText; // 显示更多信息

    _this.showMoreInfo = ''; // Footer的高度

    _this.footerHeight = 70; // 旋转箭头

    _this.rotateArrow = false; // Header状态

    _this.footerStatus = RefreshFooterStatus.NO_LOAD;
    return _this;
  } // 初始化


  _createClass(ClassicsFooter, [{
    key: "mounted",
    value: function mounted() {
      // 初始化显示文字
      this.showText = this.loadText; // 初始化更多信息

      this.showMoreInfo = this.getMoreInfo(); // 初始化高度

      this.footerHeight = this.height;
    } // 加载高度

  }, {
    key: "loadHeight",
    value: function loadHeight() {
      return this.height;
    } // 加载完成延时

  }, {
    key: "footerFinishDuration",
    value: function footerFinishDuration() {
      return this.finishDuration;
    } // 是否浮动

  }, {
    key: "isFooterFloat",
    value: function isFooterFloat() {
      return this.isFloat;
    }
  }, {
    key: "onLoadClose",
    value: function onLoadClose() {
      this.showText = this.loadText;
      this.footerStatus = RefreshFooterStatus.NO_LOAD;
    }
  }, {
    key: "onLoadEnd",
    value: function onLoadEnd() {
      this.showText = this.loadedText;
      this.footerStatus = RefreshFooterStatus.LOAD_END;
    }
  }, {
    key: "onLoadReady",
    value: function onLoadReady() {
      this.rotateArrow = true;
      this.showText = this.loadReadyText;
      this.footerStatus = RefreshFooterStatus.LOAD_READY;
    }
  }, {
    key: "onLoadRestore",
    value: function onLoadRestore() {
      this.rotateArrow = false;
      this.showText = this.loadText;
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoadStart",
    value: function onLoadStart() {
      this.rotateArrow = false;
      this.showText = this.loadText;
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoaded",
    value: function onLoaded() {
      this.rotateArrow = false;
      this.showText = this.loadedText;
      this.footerStatus = RefreshFooterStatus.LOADED; // 更新更多信息

      this.showMoreInfo = this.getMoreInfo();
    }
  }, {
    key: "onLoading",
    value: function onLoading() {
      this.showText = this.loadingText;
      this.footerStatus = RefreshFooterStatus.LOADING;
    }
  }, {
    key: "onNoMore",
    value: function onNoMore() {
      this.showText = this.noMoreText;
      this.footerStatus = RefreshFooterStatus.LOADED;
    }
  }, {
    key: "updateFooterHeight",
    value: function updateFooterHeight(height) {
      if (height > this.height) {
        this.footerHeight = height;
      } else {
        this.footerHeight = this.height;
      }
    } // 获取更新信息

  }, {
    key: "getMoreInfo",
    value: function getMoreInfo() {
      var date = new Date();
      var fillChar = date.getMinutes() < 10 ? '0' : '';
      var moreInfo = this.moreInfo;
      return moreInfo.replace('%T', '' + date.getHours() + ':' + fillChar + date.getMinutes());
    }
  }]);

  return ClassicsFooter;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 'Push to load'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "loadText", void 0);

__decorate([Prop({
  default: 'Release to load'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "loadReadyText", void 0);

__decorate([Prop({
  default: 'Loading...'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "loadingText", void 0);

__decorate([Prop({
  default: 'No more'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "noMoreText", void 0);

__decorate([Prop({
  default: 'Load finished'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "loadedText", void 0);

__decorate([Prop({
  default: 'transparent'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "bgColor", void 0);

__decorate([Prop({
  default: '#616161'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "textColor", void 0);

__decorate([Prop({
  default: false
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "showMore", void 0);

__decorate([Prop({
  default: 'Updated at %T'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "moreInfo", void 0);

__decorate([Prop({
  default: '#aaaaaa'
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "moreInfoColor", void 0);

__decorate([Prop({
  default: 70
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "height", void 0);

__decorate([Prop({
  default: 1000
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: false
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter.prototype, "isFloat", void 0);

ClassicsFootervue_type_script_lang_ts_ClassicsFooter = __decorate([vue_class_component_common_default()({
  components: {
    Arrow: icon_Arrow,
    Done: icon_Done,
    CircularProgress: icon_CircularProgress
  }
})], ClassicsFootervue_type_script_lang_ts_ClassicsFooter);
/* harmony default export */ var ClassicsFootervue_type_script_lang_ts_ = (ClassicsFootervue_type_script_lang_ts_ClassicsFooter);
// CONCATENATED MODULE: ./src/components/footer/ClassicsFooter/ClassicsFooter.vue?vue&type=script&lang=ts&
 /* harmony default export */ var ClassicsFooter_ClassicsFootervue_type_script_lang_ts_ = (ClassicsFootervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/footer/ClassicsFooter/ClassicsFooter.vue?vue&type=style&index=0&lang=scss&
var ClassicsFootervue_type_style_index_0_lang_scss_ = __webpack_require__("9315");

// CONCATENATED MODULE: ./src/components/footer/ClassicsFooter/ClassicsFooter.vue






/* normalize component */

var ClassicsFooter_component = normalizeComponent(
  ClassicsFooter_ClassicsFootervue_type_script_lang_ts_,
  ClassicsFootervue_type_template_id_6af6029e_render,
  ClassicsFootervue_type_template_id_6af6029e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ClassicsFooter_ClassicsFooter = (ClassicsFooter_component.exports);
// CONCATENATED MODULE: ./src/components/footer/ClassicsFooter/index.ts
 // @ts-ignore

ClassicsFooter_ClassicsFooter.install = function (Vue) {
  Vue.component('ClassicsFooter', ClassicsFooter_ClassicsFooter);
};

/* harmony default export */ var footer_ClassicsFooter = (ClassicsFooter_ClassicsFooter);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EasyRefresh/EasyRefresh.vue?vue&type=script&lang=ts&
















 // Header回调状态

var HeaderCallBackStatus;

(function (HeaderCallBackStatus) {
  HeaderCallBackStatus[HeaderCallBackStatus["START"] = 1] = "START";
  HeaderCallBackStatus[HeaderCallBackStatus["READY"] = 2] = "READY";
  HeaderCallBackStatus[HeaderCallBackStatus["REFRESHING"] = 3] = "REFRESHING";
  HeaderCallBackStatus[HeaderCallBackStatus["REFRESHED"] = 4] = "REFRESHED";
  HeaderCallBackStatus[HeaderCallBackStatus["RESTORE"] = 5] = "RESTORE";
  HeaderCallBackStatus[HeaderCallBackStatus["END"] = 6] = "END";
  HeaderCallBackStatus[HeaderCallBackStatus["CLOSE"] = 7] = "CLOSE";
})(HeaderCallBackStatus || (HeaderCallBackStatus = {})); // Footer回调状态


var FooterCallBackStatus;

(function (FooterCallBackStatus) {
  FooterCallBackStatus[FooterCallBackStatus["START"] = 1] = "START";
  FooterCallBackStatus[FooterCallBackStatus["READY"] = 2] = "READY";
  FooterCallBackStatus[FooterCallBackStatus["LOADING"] = 3] = "LOADING";
  FooterCallBackStatus[FooterCallBackStatus["LOADED"] = 4] = "LOADED";
  FooterCallBackStatus[FooterCallBackStatus["NO_MORE"] = 5] = "NO_MORE";
  FooterCallBackStatus[FooterCallBackStatus["RESTORE"] = 6] = "RESTORE";
  FooterCallBackStatus[FooterCallBackStatus["END"] = 7] = "END";
  FooterCallBackStatus[FooterCallBackStatus["CLOSE"] = 8] = "CLOSE";
})(FooterCallBackStatus || (FooterCallBackStatus = {}));

var EasyRefreshvue_type_script_lang_ts_EasyRefresh =
/*#__PURE__*/
function (_Vue) {
  _inherits(EasyRefresh, _Vue);

  function EasyRefresh() {
    var _this;

    _classCallCheck(this, EasyRefresh);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(EasyRefresh).apply(this, arguments)); // EasyRefresh id

    _this.easyRefreshId = 'easy-refresh-' + Math.random().toString(36).substring(3, 8); // Content id

    _this.contentId = 'easy-refresh-content' + Math.random().toString(36).substring(3, 8); // Header状态

    _this.headerStatus = RefreshHeaderStatus.NO_REFRESH; // Footer状态

    _this.footerStatus = RefreshFooterStatus.NO_LOAD; // 鼠标是否按下

    _this.mousedown = false; // 用户是否滚动

    _this.userScrolling = false; // 滚轮滚动

    _this.wheelScrolling = false; // 滚轮位置记录

    _this.wheelPageX = 0;
    _this.wheelPageY = 0; // Header和Footer的位置

    _this.headerBottom = 0;
    _this.footerTop = 0; // 浮动布局的偏移

    _this.floatTop = 0; // 底部偏移量

    _this.footerOffset = 0; // 是否正在刷新/加载

    _this.isRefresh = false; // 没有更多数据

    _this.noMore = false;
    return _this;
  } // Header和Footer


  _createClass(EasyRefresh, [{
    key: "setHeader",
    value: function setHeader(header) {
      this.header = header;
    }
  }, {
    key: "setFooter",
    value: function setFooter(footer) {
      this.footer = footer;
      this.footerOffset = footer.loadHeight();
    } // 触发刷新

  }, {
    key: "callRefresh",
    value: function callRefresh() {
      var _this2 = this;

      if (this.isRefresh) {
        return;
      }

      this.header.onRefreshStart();
      this.header.onRefreshReady();
      this.scroller.triggerPullToRefresh(this.header.refreshHeight() + 30, function () {
        _this2.scroller.triggerPullToRefresh(_this2.header.refreshHeight(), function () {
          _this2.header.onRefreshing();

          if (_this2.headerStatusChanged) {
            _this2.headerStatusChanged(HeaderCallBackStatus.REFRESHING);
          }

          if (_this2.noMore) {
            _this2.noMore = false;

            _this2.footer.onLoadClose();
          }

          _this2.headerStatus = RefreshHeaderStatus.REFRESHING;

          _this2.onRefresh(_this2.callRefreshFinish);
        });
      });
      this.isRefresh = true;
    } // 触发加载

  }, {
    key: "callLoadMore",
    value: function callLoadMore() {
      var _this3 = this;

      if (this.isRefresh || this.noMore) {
        return;
      }

      this.footer.onLoadStart();
      this.footer.onLoadReady();
      this.scroller.triggerPushToLoad(this.footer.loadHeight() + 30, function () {
        _this3.scroller.triggerPushToLoad(_this3.footer.loadHeight(), function () {
          _this3.footer.onLoading();

          if (_this3.footerStatusChanged) {
            _this3.footerStatusChanged(FooterCallBackStatus.LOADING);
          }

          _this3.footerStatus = RefreshFooterStatus.LOADING;

          _this3.loadMore(_this3.callLoadMoreFinish);
        }, true);
      }, true);
      this.isRefresh = true;
    } // 获取container

  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    } // 获取content

  }, {
    key: "getContent",
    value: function getContent() {
      return this.content;
    } // 初始化

  }, {
    key: "mounted",
    value: function mounted() {
      // 获取Footer和Header
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = get_iterator_default()(this.$children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          if (node.hasOwnProperty('refreshHeight') && !this.header) {
            this.setHeader(node);
          } else if (node.hasOwnProperty('loadHeight') && !this.footer) {
            this.setFooter(node);
          }
        } // 初始化EasyRefresh以及滚动组件

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.container = document.getElementById(this.easyRefreshId);
      this.content = document.getElementById(this.contentId);
      var render = module_render(this.content, this.scrollerCallBack);
      this.scroller = new core["a" /* default */](render, {
        scrollingX: false,
        snapping: this.snapping,
        animating: this.animating,
        animationDuration: this.animationDuration,
        bouncing: this.bouncing
      }); // setup scroller

      var rect = this.container.getBoundingClientRect();
      this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop); // snapping

      if (this.snapping) {
        this.scroller.setSnapSize(this.snapWidth, this.snapHeight);
      } // 监听大小变化


      this.onResize(); // 初始化Header和Footer的top值

      this.headerBottom = -this.container.clientHeight;
      this.footerTop = this.container.clientHeight;
      window.addEventListener('resize', this.onResize);
    } // 大小改变

  }, {
    key: "onResize",
    value: function onResize() {
      var container = this.container;
      var content = this.content;
      this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
    } // 监听是否正在刷新

  }, {
    key: "onRefreshChange",
    value: function onRefreshChange() {
      // 如果刷新结束,则重新计算列表大小
      if (!this.isRefresh) {
        var container = this.container;
        var content = this.content;
        this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
        this.scroller.computeScrollMax();
      }
    } // 滚动回调

  }, {
    key: "scrollerCallBack",
    value: function scrollerCallBack(left, top, zoom) {
      // 调用滚动回调
      if (this.onScroll) {
        this.onScroll(top);
      }

      if (!this.header || !this.footer) {
        return;
      } // 设置Header和Footer的位置


      if (this.onRefresh) {
        this.headerBottom = this.container.clientHeight + top;
      }

      if (this.loadMore) {
        // 如果没有超过底部则显示在底部
        if (this.content.clientHeight < this.container.clientHeight) {
          this.footerTop = this.container.clientHeight - top;
        } else {
          // 判断是否自动加载
          if (this.autoLoad && this.footer) {
            this.footerTop = -top + this.content.offsetHeight - this.footer.loadHeight();
          } else {
            this.footerTop = -top + this.content.offsetHeight;
          }
        }
      } // 列表可滚动的距离


      var scrollableDistance;

      if (this.autoLoad && this.footer) {
        scrollableDistance = this.content.offsetHeight - this.container.clientHeight - this.footer.loadHeight();
      } else {
        scrollableDistance = this.content.offsetHeight - this.container.clientHeight;
      }

      if (top < 0) {
        if (!this.onRefresh) {
          return;
        } // if (this.headerStatus === HeaderStatus.REFRESHING ||
        //     this.headerStatus === HeaderStatus.REFRESHED) { return }
        // 更新Header高度


        this.header.updateHeaderHeight(-top);

        if (this.updateHeaderHeight) {
          this.updateHeaderHeight(-top);
        } // 判断是否为浮动布局


        if (this.header.isHeaderFloat()) {
          this.floatTop = top;
        }

        if (this.headerStatus === RefreshHeaderStatus.NO_REFRESH && this.userScrolling) {
          // 刷新开始
          this.header.onRefreshStart();

          if (this.headerStatusChanged) {
            this.headerStatusChanged(HeaderCallBackStatus.START);
          }

          this.headerStatus = RefreshHeaderStatus.REFRESH_START;
        } else if (this.headerStatus === RefreshHeaderStatus.REFRESH_START && -top > this.header.refreshHeight() && this.userScrolling && !this.isRefresh) {
          // 准备刷新
          this.header.onRefreshReady();

          if (this.headerStatusChanged) {
            this.headerStatusChanged(HeaderCallBackStatus.READY);
          }

          this.headerStatus = RefreshHeaderStatus.REFRESH_READY;
        } else if (this.headerStatus === RefreshHeaderStatus.REFRESH_READY && -top < this.header.refreshHeight() && this.userScrolling) {
          // 刷新恢复
          this.header.onRefreshRestore();

          if (this.headerStatusChanged) {
            this.headerStatusChanged(HeaderCallBackStatus.RESTORE);
          }

          this.headerStatus = RefreshHeaderStatus.REFRESH_START;
        }
      } else if (top > scrollableDistance) {
        if (!this.loadMore) {
          return;
        } // if (this.footerStatus === FooterStatus.LOADING ||
        //     this.footerStatus === FooterStatus.LOADED) { return }


        if (top === 0) {
          return;
        }

        var footerHeight = 0; // 更新Footer高度，判断是否超过屏幕底部

        if (this.content.clientHeight < this.container.clientHeight) {
          footerHeight = top;
        } else {
          footerHeight = top - scrollableDistance;
        } // 判断是否为浮动布局


        if (this.footer.isFooterFloat() && !this.autoLoad) {
          this.floatTop = footerHeight;
        } // 判断是否自动加载


        if (this.autoLoad && footerHeight > 0 && !this.noMore && this.content.clientHeight >= this.container.clientHeight) {
          this.footer.updateFooterHeight(this.footer.loadHeight());

          if (this.updateFooterHeight) {
            this.updateFooterHeight(this.footer.loadHeight());
          }

          this.footer.onLoading();

          if (this.footerStatusChanged) {
            this.footerStatusChanged(FooterCallBackStatus.LOADING);
          }

          this.footerStatus = RefreshFooterStatus.LOADING;

          if (!this.isRefresh) {
            this.loadMore(this.callLoadMoreFinish);
            this.isRefresh = true;
          }

          return;
        }

        this.footer.updateFooterHeight(footerHeight);

        if (this.updateFooterHeight) {
          this.updateFooterHeight(footerHeight);
        }

        if (this.noMore) {
          return;
        }

        if (this.footerStatus === RefreshFooterStatus.NO_LOAD && this.userScrolling) {
          // 开始加载
          this.footer.onLoadStart();

          if (this.footerStatusChanged) {
            this.footerStatusChanged(FooterCallBackStatus.START);
          }

          this.footerStatus = RefreshFooterStatus.LOAD_START;
        } else if (this.footerStatus === RefreshFooterStatus.LOAD_START && footerHeight > this.footer.loadHeight() && this.userScrolling && !this.isRefresh) {
          // 准备加载
          this.footer.onLoadReady();

          if (this.footerStatusChanged) {
            this.footerStatusChanged(FooterCallBackStatus.READY);
          }

          this.footerStatus = RefreshFooterStatus.LOAD_READY;
        } else if (this.footerStatus === RefreshFooterStatus.LOAD_READY && footerHeight < this.footer.loadHeight() && this.userScrolling) {
          // 恢复加载
          this.footer.onLoadRestore();

          if (this.footerStatusChanged) {
            this.footerStatusChanged(FooterCallBackStatus.RESTORE);
          }

          this.footerStatus = RefreshFooterStatus.LOAD_START;
        }
      } else {
        // 刷新关闭
        if ((this.headerStatus === RefreshHeaderStatus.REFRESH_START || this.headerStatus === RefreshHeaderStatus.REFRESH_READY || this.headerStatus === RefreshHeaderStatus.REFRESHED || this.headerStatus === RefreshHeaderStatus.REFRESH_END) && this.onRefresh) {
          this.header.onRefreshClose();

          if (this.headerStatusChanged) {
            this.headerStatusChanged(HeaderCallBackStatus.CLOSE);
          }

          this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
        } // 加载关闭


        if ((this.footerStatus === RefreshFooterStatus.LOAD_START || this.footerStatus === RefreshFooterStatus.LOAD_READY || this.footerStatus === RefreshFooterStatus.LOADED || this.footerStatus === RefreshFooterStatus.LOAD_END) && this.loadMore) {
          if (!this.noMore && this.isRefresh) {
            this.isRefresh = false; // 判断Footer是否浮动

            if (this.footer.isFooterFloat()) {
              this.floatTop = 0;
              this.scroller.scrollBy(0, top, false);
            }

            this.footer.onLoadClose();

            if (this.footerStatusChanged) {
              this.footerStatusChanged(FooterCallBackStatus.CLOSE);
            }
          }

          this.footerStatus = RefreshFooterStatus.NO_LOAD;
        }
      }
    } // 刷新完成回调

  }, {
    key: "callRefreshFinish",
    value: function callRefreshFinish() {
      var _this4 = this;

      this.scroller.triggerPullToRefresh(this.header.refreshHeight(), function () {
        _this4.userScrolling = false;
        _this4.mousedown = false;
        _this4.wheelScrolling = false;
        _this4.headerStatus = RefreshHeaderStatus.REFRESHED;

        _this4.header.onRefreshed();

        if (_this4.headerStatusChanged) {
          _this4.headerStatusChanged(HeaderCallBackStatus.REFRESHED);
        }

        setTimeout(function () {
          _this4.header.onRefreshEnd();

          if (_this4.headerStatusChanged) {
            _this4.headerStatusChanged(HeaderCallBackStatus.END);
          }

          _this4.isRefresh = false;
          _this4.headerStatus = RefreshHeaderStatus.REFRESH_END; // 判断刷新过程中是否滑动到其他位置

          var _this4$scroller$getVa = _this4.scroller.getValues(),
              left = _this4$scroller$getVa.left,
              top = _this4$scroller$getVa.top,
              zoom = _this4$scroller$getVa.zoom;

          if (-top !== _this4.header.refreshHeight()) {
            _this4.header.onRefreshClose();

            if (_this4.headerStatusChanged) {
              _this4.headerStatusChanged(HeaderCallBackStatus.CLOSE);
            }

            _this4.headerStatus = RefreshHeaderStatus.NO_REFRESH;

            _this4.header.updateHeaderHeight(0);

            if (_this4.updateHeaderHeight) {
              _this4.updateHeaderHeight(0);
            }
          }

          _this4.scroller.finishPullToRefresh();
        }, _this4.header.headerFinishDuration());
      });
    } // 加载完成回调

  }, {
    key: "callLoadMoreFinish",
    value: function callLoadMoreFinish() {
      var _this5 = this;

      var noMore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.noMore = noMore; // 判断刷新过程中是否滑动到其他位置

      this.scroller.triggerPushToLoad(this.footer.loadHeight(), function (scroll) {
        _this5.userScrolling = false;
        _this5.mousedown = false;
        _this5.wheelScrolling = false;
        _this5.footerStatus = RefreshFooterStatus.LOADED;

        if (noMore) {
          _this5.footer.onNoMore();

          if (_this5.footerStatusChanged) {
            _this5.footerStatusChanged(FooterCallBackStatus.NO_MORE);
          }
        } else {
          _this5.footer.onLoaded();

          if (_this5.footerStatusChanged) {
            _this5.footerStatusChanged(FooterCallBackStatus.LOADED);
          }
        }

        setTimeout(function () {
          if (!_this5.noMore) {
            _this5.footer.onLoadEnd();

            if (_this5.footerStatusChanged) {
              _this5.footerStatusChanged(FooterCallBackStatus.END);
            }
          }

          _this5.isRefresh = false;
          _this5.footerStatus = RefreshFooterStatus.LOAD_END;

          if (scroll) {
            _this5.scroller.finishPushToLoad();
          } else {
            if (!_this5.noMore) {
              _this5.floatTop = 0;

              _this5.footer.onLoadClose();

              if (_this5.footerStatusChanged) {
                _this5.footerStatusChanged(FooterCallBackStatus.CLOSE);
              }
            }

            _this5.footerStatus = RefreshFooterStatus.NO_LOAD;
            _this5.footerTop = _this5.container.clientHeight;

            if (_this5.updateFooterHeight) {
              _this5.updateFooterHeight(0);
            }
          }
        }, _this5.footer.footerFinishDuration());
      }, noMore);
    } // 滚动动作结束(例如手指离开屏幕)

  }, {
    key: "scrollActionEnd",
    value: function scrollActionEnd(e) {
      var _this6 = this;

      this.userScrolling = false;

      if (this.isRefresh) {
        this.scroller.doTouchEnd(e.timeStamp, false);
        return;
      } // 判断是否需要刷新


      if (this.onRefresh) {
        // 列表可滚动的距离
        var _this$scroller$getVal = this.scroller.getValues(),
            left = _this$scroller$getVal.left,
            top = _this$scroller$getVal.top,
            zoom = _this$scroller$getVal.zoom; // 触发刷新


        if (this.headerStatus === RefreshHeaderStatus.REFRESH_READY && -top > this.header.refreshHeight()) {
          this.scroller.doTouchEnd(e.timeStamp, true);
          this.scroller.triggerPullToRefresh(this.header.refreshHeight(), function () {
            _this6.header.onRefreshing();

            if (_this6.headerStatusChanged) {
              _this6.headerStatusChanged(HeaderCallBackStatus.REFRESHING);
            }

            if (_this6.noMore) {
              _this6.noMore = false;

              _this6.footer.onLoadClose();
            }

            _this6.headerStatus = RefreshHeaderStatus.REFRESHING;

            _this6.onRefresh(_this6.callRefreshFinish);
          });
          this.isRefresh = true;
          return;
        }
      } // 判断是否需要加载更多


      if (this.loadMore && !this.noMore) {
        // 列表可滚动的距离
        var scrollableDistance = this.content.offsetHeight - this.container.clientHeight;

        var _this$scroller$getVal2 = this.scroller.getValues(),
            _left = _this$scroller$getVal2.left,
            _top = _this$scroller$getVal2.top,
            _zoom = _this$scroller$getVal2.zoom; // 触发加载


        if (this.footerStatus === RefreshFooterStatus.LOAD_READY && (this.content.clientHeight >= this.container.clientHeight && _top - scrollableDistance >= this.footer.loadHeight() || this.content.clientHeight < this.container.clientHeight && _top >= this.footer.loadHeight())) {
          this.scroller.doTouchEnd(e.timeStamp, true);
          this.scroller.triggerPushToLoad(this.footer.loadHeight(), function () {
            _this6.footer.onLoading();

            if (_this6.footerStatusChanged) {
              _this6.footerStatusChanged(FooterCallBackStatus.LOADING);
            }

            _this6.footerStatus = RefreshFooterStatus.LOADING;

            _this6.loadMore(_this6.callLoadMoreFinish);
          }, true);
          this.isRefresh = true;
          return;
        }
      }

      this.scroller.doTouchEnd(e.timeStamp, false);
    } // 触摸开始事件

  }, {
    key: "touchStart",
    value: function touchStart(e) {
      // Don't react if initial down happens on a form element
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      this.scroller.doTouchStart(e.touches, e.timeStamp);
      this.userScrolling = true;
      this.onResize();
    } // 滑动事件

  }, {
    key: "touchMove",
    value: function touchMove(e) {
      if (!this.userScrolling) {
        return;
      }

      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp);
    } // 触摸结束事件

  }, {
    key: "touchEnd",
    value: function touchEnd(e) {
      this.scrollActionEnd(e);
    } // 鼠标按下事件

  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      if (this.userSelect) {
        return;
      } // 如果为刷新(加载)完成则不触发事件
      // if (this.headerStatus === HeaderStatus.REFRESHED ||
      //     this.footerStatus === FooterStatus.LOADED) { return }
      // Don't react if initial down happens on a form element


      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      this.scroller.doTouchStart([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);
      this.mousedown = true;
      this.userScrolling = true;
      this.onResize();
    } // 鼠标移动事件

  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      if (this.userSelect) {
        return;
      }

      if (!this.mousedown) {
        return;
      }

      this.scroller.doTouchMove([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);
    } // 鼠标释放事件

  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      if (this.userSelect) {
        return;
      }

      if (!this.mousedown) {
        return;
      }

      this.mousedown = false;
      this.scrollActionEnd(e);
    } // 滚轮事件

  }, {
    key: "wheel",
    value: function wheel(e) {
      var _this7 = this;

      if (this.wheelScrolling) {
        // 清除上一次计时
        clearTimeout(this.wheelTimer);
      } else {
        // 开始滚动
        this.scroller.doTouchStart([{
          pageX: e.pageX,
          pageY: e.pageY
        }], e.timeStamp);
        this.wheelPageX = e.pageX;
        this.wheelPageY = e.pageY;
        this.wheelScrolling = true;
        this.userScrolling = true;
        this.onResize();
      } // 判断是否到达最大高度


      var scrollerValue = this.scroller.getValues();

      if (scrollerValue.top > -60 - 50 && scrollerValue.top < this.content.offsetHeight - this.container.clientHeight + 60 + 50) {
        // 计算偏移
        this.wheelPageX -= e.deltaX;
        this.wheelPageY -= e.deltaY;
        this.scroller.doTouchMove([{
          pageX: this.wheelPageX,
          pageY: this.wheelPageY
        }], e.timeStamp);
      } // 设置计时器,结束滚动


      this.wheelTimer = setTimeout(function () {
        _this7.wheelScrolling = false;
        _this7.wheelPageX = 0;
        _this7.wheelPageY = 0;

        _this7.scrollActionEnd(e);
      }, 200);
    }
  }]);

  return EasyRefresh;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop() // 刷新回调
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "onRefresh", void 0);

__decorate([Prop() // 加载回调
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "loadMore", void 0);

__decorate([Prop() // 滚动回调
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "onScroll", void 0);

__decorate([Prop({
  default: true
}) // 是否复制选择
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "userSelect", void 0);

__decorate([Prop({
  default: false
}) // 是否自动触发加载
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "autoLoad", void 0);

__decorate([Prop({
  default: true
}) // 动画
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "animating", void 0);

__decorate([Prop({
  default: 250
}) // 动画时长
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "animationDuration", void 0);

__decorate([Prop({
  default: true
}) // 回弹效果
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "bouncing", void 0);

__decorate([Prop({
  default: false
}) // 捕捉(条目大小,需设置)
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "snapping", void 0);

__decorate([Prop({
  default: 100
}) // 捕捉宽度
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "snapWidth", void 0);

__decorate([Prop({
  default: 100
}) // 捕捉高度
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "snapHeight", void 0);

__decorate([Prop({
  default: null
}) // Header高度更新
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "updateHeaderHeight", void 0);

__decorate([Prop({
  default: null
}) // Header状态改变
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "headerStatusChanged", void 0);

__decorate([Prop({
  default: null
}) // Footer高度更新
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "updateFooterHeight", void 0);

__decorate([Prop({
  default: null
}) // Footer状态改变
], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "footerStatusChanged", void 0);

__decorate([Watch('isRefresh')], EasyRefreshvue_type_script_lang_ts_EasyRefresh.prototype, "onRefreshChange", null);

EasyRefreshvue_type_script_lang_ts_EasyRefresh = __decorate([vue_class_component_common_default()({
  components: {
    ClassicsHeader: header_ClassicsHeader,
    ClassicsFooter: footer_ClassicsFooter
  }
})], EasyRefreshvue_type_script_lang_ts_EasyRefresh);
/* harmony default export */ var EasyRefreshvue_type_script_lang_ts_ = (EasyRefreshvue_type_script_lang_ts_EasyRefresh);
// CONCATENATED MODULE: ./src/components/EasyRefresh/EasyRefresh.vue?vue&type=script&lang=ts&
 /* harmony default export */ var EasyRefresh_EasyRefreshvue_type_script_lang_ts_ = (EasyRefreshvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/EasyRefresh/EasyRefresh.vue?vue&type=style&index=0&lang=scss&
var EasyRefreshvue_type_style_index_0_lang_scss_ = __webpack_require__("8e31");

// CONCATENATED MODULE: ./src/components/EasyRefresh/EasyRefresh.vue






/* normalize component */

var EasyRefresh_component = normalizeComponent(
  EasyRefresh_EasyRefreshvue_type_script_lang_ts_,
  EasyRefreshvue_type_template_id_02672e60_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EasyRefresh_EasyRefresh = (EasyRefresh_component.exports);
// CONCATENATED MODULE: ./src/components/EasyRefresh/index.ts
 // @ts-ignore

EasyRefresh_EasyRefresh.install = function (Vue) {
  Vue.component('EasyRefresh', EasyRefresh_EasyRefresh);
};

/* harmony default export */ var components_EasyRefresh = (EasyRefresh_EasyRefresh);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/BallPulseHeader/BallPulseHeader.vue?vue&type=template&id=4aea244e&scoped=true&
var BallPulseHeadervue_type_template_id_4aea244e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-ball-pulse-header",style:('height: ' + _vm.headerHeight + 'px;')},[_c('BallPulse',{attrs:{"color":_vm.color}})],1)}
var BallPulseHeadervue_type_template_id_4aea244e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/header/BallPulseHeader/BallPulseHeader.vue?vue&type=template&id=4aea244e&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/BallPulse.vue?vue&type=template&id=b2353112&scoped=true&
var BallPulsevue_type_template_id_b2353112_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"ball ball-one",style:(_vm.ballStyle)}),_c('div',{staticClass:"ball ball-two",style:(_vm.ballStyle)}),_c('div',{staticClass:"ball ball-three",style:(_vm.ballStyle)})])}
var BallPulsevue_type_template_id_b2353112_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icon/BallPulse.vue?vue&type=template&id=b2353112&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/BallPulse.vue?vue&type=script&lang=ts&








var BallPulsevue_type_script_lang_ts_BallPulse =
/*#__PURE__*/
function (_Vue) {
  _inherits(BallPulse, _Vue);

  function BallPulse() {
    _classCallCheck(this, BallPulse);

    return _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(BallPulse).apply(this, arguments));
  }

  _createClass(BallPulse, [{
    key: "ballStyle",
    // 计算样式
    get: function get() {
      return "background: ".concat(this.color, ";height: ").concat(this.size, "px;width: ").concat(this.size, "px;margin: ").concat(this.size / 8, "px;");
    }
  }]);

  return BallPulse;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: '#000000'
})], BallPulsevue_type_script_lang_ts_BallPulse.prototype, "color", void 0);

__decorate([Prop({
  default: 18.0
})], BallPulsevue_type_script_lang_ts_BallPulse.prototype, "size", void 0);

BallPulsevue_type_script_lang_ts_BallPulse = __decorate([vue_class_component_common_default.a], BallPulsevue_type_script_lang_ts_BallPulse);
/* harmony default export */ var BallPulsevue_type_script_lang_ts_ = (BallPulsevue_type_script_lang_ts_BallPulse);
// CONCATENATED MODULE: ./src/components/icon/BallPulse.vue?vue&type=script&lang=ts&
 /* harmony default export */ var icon_BallPulsevue_type_script_lang_ts_ = (BallPulsevue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/icon/BallPulse.vue?vue&type=style&index=0&id=b2353112&scoped=true&lang=scss&
var BallPulsevue_type_style_index_0_id_b2353112_scoped_true_lang_scss_ = __webpack_require__("6a85");

// CONCATENATED MODULE: ./src/components/icon/BallPulse.vue






/* normalize component */

var BallPulse_component = normalizeComponent(
  icon_BallPulsevue_type_script_lang_ts_,
  BallPulsevue_type_template_id_b2353112_scoped_true_render,
  BallPulsevue_type_template_id_b2353112_scoped_true_staticRenderFns,
  false,
  null,
  "b2353112",
  null
  
)

/* harmony default export */ var icon_BallPulse = (BallPulse_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/BallPulseHeader/BallPulseHeader.vue?vue&type=script&lang=ts&









var BallPulseHeadervue_type_script_lang_ts_BallPulseHeader =
/*#__PURE__*/
function (_Vue) {
  _inherits(BallPulseHeader, _Vue);

  function BallPulseHeader() {
    var _this;

    _classCallCheck(this, BallPulseHeader);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(BallPulseHeader).apply(this, arguments)); // Header的高度

    _this.headerHeight = 70.0;
    return _this;
  } // 初始化


  _createClass(BallPulseHeader, [{
    key: "mounted",
    value: function mounted() {
      // 初始化高度
      this.headerHeight = this.height;
    }
  }, {
    key: "headerFinishDuration",
    value: function headerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isHeaderFloat",
    value: function isHeaderFloat() {
      return false;
    }
  }, {
    key: "onRefreshClose",
    value: function onRefreshClose() {// todo nothing
    }
  }, {
    key: "onRefreshEnd",
    value: function onRefreshEnd() {// todo nothing
    }
  }, {
    key: "onRefreshReady",
    value: function onRefreshReady() {// todo nothing
    }
  }, {
    key: "onRefreshRestore",
    value: function onRefreshRestore() {// todo nothing
    }
  }, {
    key: "onRefreshStart",
    value: function onRefreshStart() {// todo nothing
    }
  }, {
    key: "onRefreshed",
    value: function onRefreshed() {// todo nothing
    }
  }, {
    key: "onRefreshing",
    value: function onRefreshing() {// todo nothing
    }
  }, {
    key: "refreshHeight",
    value: function refreshHeight() {
      return this.height;
    }
  }, {
    key: "updateHeaderHeight",
    value: function updateHeaderHeight(height) {
      if (height > this.height) {
        this.headerHeight = height;
      } else {
        this.headerHeight = this.height;
      }
    }
  }]);

  return BallPulseHeader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 70
})], BallPulseHeadervue_type_script_lang_ts_BallPulseHeader.prototype, "height", void 0);

__decorate([Prop({
  default: 1000
})], BallPulseHeadervue_type_script_lang_ts_BallPulseHeader.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#2196f3'
})], BallPulseHeadervue_type_script_lang_ts_BallPulseHeader.prototype, "color", void 0);

BallPulseHeadervue_type_script_lang_ts_BallPulseHeader = __decorate([vue_class_component_common_default()({
  components: {
    BallPulse: icon_BallPulse
  }
})], BallPulseHeadervue_type_script_lang_ts_BallPulseHeader);
/* harmony default export */ var BallPulseHeadervue_type_script_lang_ts_ = (BallPulseHeadervue_type_script_lang_ts_BallPulseHeader);
// CONCATENATED MODULE: ./src/components/header/BallPulseHeader/BallPulseHeader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var BallPulseHeader_BallPulseHeadervue_type_script_lang_ts_ = (BallPulseHeadervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/header/BallPulseHeader/BallPulseHeader.vue?vue&type=style&index=0&id=4aea244e&scoped=true&lang=css&
var BallPulseHeadervue_type_style_index_0_id_4aea244e_scoped_true_lang_css_ = __webpack_require__("5d9c");

// CONCATENATED MODULE: ./src/components/header/BallPulseHeader/BallPulseHeader.vue






/* normalize component */

var BallPulseHeader_component = normalizeComponent(
  BallPulseHeader_BallPulseHeadervue_type_script_lang_ts_,
  BallPulseHeadervue_type_template_id_4aea244e_scoped_true_render,
  BallPulseHeadervue_type_template_id_4aea244e_scoped_true_staticRenderFns,
  false,
  null,
  "4aea244e",
  null
  
)

/* harmony default export */ var BallPulseHeader_BallPulseHeader = (BallPulseHeader_component.exports);
// CONCATENATED MODULE: ./src/components/header/BallPulseHeader/index.ts
 // @ts-ignore

BallPulseHeader_BallPulseHeader.install = function (Vue) {
  Vue.component('BallPulseHeader', BallPulseHeader_BallPulseHeader);
};

/* harmony default export */ var header_BallPulseHeader = (BallPulseHeader_BallPulseHeader);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/BezierBounceHeader/BezierBounceHeader.vue?vue&type=template&id=357c3e00&scoped=true&
var BezierBounceHeadervue_type_template_id_357c3e00_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-bezier-bounce-header",style:('height: ' + _vm.headerHeight + 'px;')},[_c('div',{ref:"er-bbh-canvas",staticClass:"er-bbh-canvas"}),_c('div',{staticClass:"ball-box"},[_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.5) + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.75) + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + _vm.ballOpacity + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.75) + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.5) + ";"))})]),_c('div',{staticClass:"ball-pulse"},[(_vm.showBallPulse)?_c('BallPulse',{attrs:{"color":_vm.color,"size":15}}):_vm._e()],1)])}
var BezierBounceHeadervue_type_template_id_357c3e00_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/header/BezierBounceHeader/BezierBounceHeader.vue?vue&type=template&id=357c3e00&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.fill.js
var es6_array_fill = __webpack_require__("6c7b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/BezierBounceHeader/BezierBounceHeader.vue?vue&type=script&lang=ts&












var BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader =
/*#__PURE__*/
function (_Vue) {
  _inherits(BezierBounceHeader, _Vue);

  function BezierBounceHeader() {
    var _this;

    _classCallCheck(this, BezierBounceHeader);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(BezierBounceHeader).apply(this, arguments)); // Header的高度

    _this.defaultHeight = 80;
    _this.headerHeight = _this.defaultHeight; // Header状态

    _this.headerStatus = RefreshHeaderStatus.NO_REFRESH; // 回弹值

    _this.reboundValue = 0; // 小球边距

    _this.ballMargin = 10; // 小球透明度

    _this.ballOpacity = 0; // 显示小球脉冲

    _this.showBallPulse = false;
    return _this;
  } // 初始化


  _createClass(BezierBounceHeader, [{
    key: "mounted",
    value: function mounted() {
      this.canvasBox = this.$refs['er-bbh-canvas'];
      this.drawCanvas();
    } // 销毁之前

  }, {
    key: "beforeDestory",
    value: function beforeDestory() {
      this.startRebound();
    }
  }, {
    key: "headerFinishDuration",
    value: function headerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isHeaderFloat",
    value: function isHeaderFloat() {
      return false;
    }
  }, {
    key: "onRefreshClose",
    value: function onRefreshClose() {
      this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
      this.drawCanvas();
      this.showBallPulse = false;
    }
  }, {
    key: "onRefreshEnd",
    value: function onRefreshEnd() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_END;
    }
  }, {
    key: "onRefreshReady",
    value: function onRefreshReady() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_READY;
    }
  }, {
    key: "onRefreshRestore",
    value: function onRefreshRestore() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshStart",
    value: function onRefreshStart() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshed",
    value: function onRefreshed() {
      this.headerStatus = RefreshHeaderStatus.REFRESHED;
    }
  }, {
    key: "onRefreshing",
    value: function onRefreshing() {
      this.headerStatus = RefreshHeaderStatus.REFRESHING; // 开始回弹

      this.startRebound();
      this.ballMargin = 10;
      this.showBallPulse = true;
    }
  }, {
    key: "refreshHeight",
    value: function refreshHeight() {
      return this.defaultHeight;
    }
  }, {
    key: "updateHeaderHeight",
    value: function updateHeaderHeight(height) {
      if (height > this.defaultHeight) {
        this.headerHeight = height;
      } else {
        this.headerHeight = this.defaultHeight;
      }
    } // 下拉Canvas绘制

  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      this.createCanvas();
      this.drawBackground();

      if ((this.headerStatus === RefreshHeaderStatus.NO_REFRESH || this.headerStatus === RefreshHeaderStatus.REFRESH_READY) && this.headerHeight >= this.defaultHeight) {
        this.drawBackground();
        this.drawPullRadian();
        this.ballMargin = 10 + (this.headerHeight - this.defaultHeight) / 10;
        this.ballMargin = this.ballMargin < 20 ? this.ballMargin : 20;
        this.ballOpacity = (this.ballMargin - 10) / 10;
      }

      if (this.reboundValue !== 0) {
        this.drawRebound();
      }

      this.canvasBox.appendChild(this.canvasDom);
    } // 创建Canvas

  }, {
    key: "createCanvas",
    value: function createCanvas() {
      // 删除之前的Canvas
      if (this.canvasDom && this.canvasBox.children.length > 0) {
        this.canvasBox.removeChild(this.canvasDom);
      }

      this.canvasDom = document.createElement('canvas');
      this.canvasDom.width = this.canvasBox.clientWidth;
      this.canvasDom.height = this.canvasBox.clientHeight;
      this.canvas = this.canvasDom.getContext('2d');
    } // 绘制背景

  }, {
    key: "drawBackground",
    value: function drawBackground() {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.fillRect(0, 0, this.canvasDom.width, this.defaultHeight);
    } // 绘制下拉弧度

  }, {
    key: "drawPullRadian",
    value: function drawPullRadian() {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.beginPath();
      this.canvas.moveTo(0, this.defaultHeight);
      this.canvas.quadraticCurveTo(this.canvasDom.width / 2, (this.canvasDom.height * 2 - this.defaultHeight) * 0.95, this.canvasDom.width, this.defaultHeight);
      this.canvas.fill();
    } // 绘制回弹弧度

  }, {
    key: "drawRebound",
    value: function drawRebound() {
      // 曲线高度值
      var curveHeight = 0;

      if (this.reboundValue <= this.defaultHeight) {
        curveHeight = this.reboundValue;
      } else if (this.reboundValue <= this.defaultHeight * 2) {
        curveHeight = this.defaultHeight * 2 - this.reboundValue;
      } else if (this.reboundValue <= this.defaultHeight * 2.5) {
        curveHeight = this.reboundValue - this.defaultHeight * 2;
      } else if (this.reboundValue <= this.defaultHeight * 3) {
        curveHeight = this.defaultHeight * 3 - this.reboundValue;
      }

      this.canvas.fillStyle = this.color;
      this.canvas.beginPath();
      this.canvas.moveTo(0, this.defaultHeight);
      this.canvas.quadraticCurveTo(this.canvasDom.width / 2, this.canvasDom.height - curveHeight / 1.5, this.canvasDom.width, this.defaultHeight);
      this.canvas.fill();
    } // 开始回弹

  }, {
    key: "startRebound",
    value: function startRebound() {
      var _this2 = this;

      this.reboundInterval = setInterval(function () {
        if (_this2.reboundValue >= _this2.defaultHeight * 3) {
          _this2.stopRebound();

          _this2.reboundValue = 0;
        } else {
          _this2.reboundValue += 10;
        }

        _this2.drawCanvas();
      }, 20);
    } // 结束回弹

  }, {
    key: "stopRebound",
    value: function stopRebound() {
      clearInterval(this.reboundInterval);
      this.reboundInterval = undefined;
    }
  }]);

  return BezierBounceHeader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 1000
})], BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#ffffff'
})], BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader.prototype, "color", void 0);

__decorate([Prop({
  default: '#2196f3'
})], BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader.prototype, "bgColor", void 0);

__decorate([Watch('headerHeight')], BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader.prototype, "drawCanvas", null);

BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader = __decorate([vue_class_component_common_default()({
  components: {
    CircularProgress: icon_CircularProgress,
    BallPulse: icon_BallPulse
  }
})], BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader);
/* harmony default export */ var BezierBounceHeadervue_type_script_lang_ts_ = (BezierBounceHeadervue_type_script_lang_ts_BezierBounceHeader);
// CONCATENATED MODULE: ./src/components/header/BezierBounceHeader/BezierBounceHeader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var BezierBounceHeader_BezierBounceHeadervue_type_script_lang_ts_ = (BezierBounceHeadervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/header/BezierBounceHeader/BezierBounceHeader.vue?vue&type=style&index=0&id=357c3e00&scoped=true&lang=scss&
var BezierBounceHeadervue_type_style_index_0_id_357c3e00_scoped_true_lang_scss_ = __webpack_require__("8345");

// CONCATENATED MODULE: ./src/components/header/BezierBounceHeader/BezierBounceHeader.vue






/* normalize component */

var BezierBounceHeader_component = normalizeComponent(
  BezierBounceHeader_BezierBounceHeadervue_type_script_lang_ts_,
  BezierBounceHeadervue_type_template_id_357c3e00_scoped_true_render,
  BezierBounceHeadervue_type_template_id_357c3e00_scoped_true_staticRenderFns,
  false,
  null,
  "357c3e00",
  null
  
)

/* harmony default export */ var BezierBounceHeader_BezierBounceHeader = (BezierBounceHeader_component.exports);
// CONCATENATED MODULE: ./src/components/header/BezierBounceHeader/index.ts
 // @ts-ignore

BezierBounceHeader_BezierBounceHeader.install = function (Vue) {
  Vue.component('BezierBounceHeader', BezierBounceHeader_BezierBounceHeader);
};

/* harmony default export */ var header_BezierBounceHeader = (BezierBounceHeader_BezierBounceHeader);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/BezierCircleHeader/BezierCircleHeader.vue?vue&type=template&id=5359ae7b&scoped=true&
var BezierCircleHeadervue_type_template_id_5359ae7b_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-bezier-circle-header",style:('height: ' + _vm.headerHeight + 'px;')},[_c('div',{ref:"er-bch-canvas",staticClass:"er-bch-canvas"}),_c('div',{staticClass:"er-bch-progress"},[(_vm.showProgress)?_c('CircularProgress',{attrs:{"color":_vm.color,"value":_vm.progressValue,"size":"middle"}}):_vm._e()],1)])}
var BezierCircleHeadervue_type_template_id_5359ae7b_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/header/BezierCircleHeader/BezierCircleHeader.vue?vue&type=template&id=5359ae7b&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/BezierCircleHeader/BezierCircleHeader.vue?vue&type=script&lang=ts&











var BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader =
/*#__PURE__*/
function (_Vue) {
  _inherits(BezierCircleHeader, _Vue);

  function BezierCircleHeader() {
    var _this;

    _classCallCheck(this, BezierCircleHeader);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(BezierCircleHeader).apply(this, arguments)); // Header的高度

    _this.defaultHeight = 80;
    _this.headerHeight = _this.defaultHeight; // Header状态

    _this.headerStatus = RefreshHeaderStatus.NO_REFRESH; // 进度值

    _this.progressValue = 0;
    _this.showProgress = false; // 回弹值

    _this.reboundValue = 0; // 弹出圆圈值

    _this.reboundCircleValue = 0; // 弹出水滴值

    _this.reboundWaterValue = 0; // 圆圈的半径

    _this.circleR = 13; // 下落值

    _this.dropValue = 0;
    return _this;
  } // 初始化


  _createClass(BezierCircleHeader, [{
    key: "mounted",
    value: function mounted() {
      this.canvasBox = this.$refs['er-bch-canvas'];
      this.drawCanvas();
    } // 销毁之前

  }, {
    key: "beforeDestory",
    value: function beforeDestory() {
      this.startRebound();
      this.stopDrop();
    }
  }, {
    key: "headerFinishDuration",
    value: function headerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isHeaderFloat",
    value: function isHeaderFloat() {
      return false;
    }
  }, {
    key: "onRefreshClose",
    value: function onRefreshClose() {
      this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
      this.reboundCircleValue = 0;
      this.progressValue = 0;
      this.showProgress = false;
      this.drawCanvas();
    }
  }, {
    key: "onRefreshEnd",
    value: function onRefreshEnd() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_END;
    }
  }, {
    key: "onRefreshReady",
    value: function onRefreshReady() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_READY;
    }
  }, {
    key: "onRefreshRestore",
    value: function onRefreshRestore() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshStart",
    value: function onRefreshStart() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshed",
    value: function onRefreshed() {
      var _this2 = this;

      this.headerStatus = RefreshHeaderStatus.REFRESHED;
      this.progressValue = 1;
      this.showProgress = true; // 开始下落

      setTimeout(function () {
        _this2.startDrop();

        _this2.reboundCircleValue = 0;
        _this2.reboundWaterValue = 0;
        _this2.progressValue = 0;
        _this2.showProgress = false;
      }, 200);
    }
  }, {
    key: "onRefreshing",
    value: function onRefreshing() {
      this.headerStatus = RefreshHeaderStatus.REFRESHING; // 开始回弹

      this.startRebound();
    }
  }, {
    key: "refreshHeight",
    value: function refreshHeight() {
      return this.defaultHeight;
    }
  }, {
    key: "updateHeaderHeight",
    value: function updateHeaderHeight(height) {
      if (height > this.defaultHeight) {
        this.headerHeight = height;
      } else {
        this.headerHeight = this.defaultHeight;
      }
    } // 下拉Canvas绘制

  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      this.createCanvas();
      this.drawBackground();

      if ((this.headerStatus === RefreshHeaderStatus.NO_REFRESH || this.headerStatus === RefreshHeaderStatus.REFRESH_READY) && this.headerHeight >= this.defaultHeight) {
        this.drawBackground();
        this.drawPullRadian();
      }

      if (this.reboundValue !== 0) {
        this.drawRebound();
      }

      if (this.reboundCircleValue !== 0) {
        this.drawCircle();
      }

      if (this.reboundWaterValue !== 0) {
        this.drawWater();
      }

      if (this.dropValue !== 0) {
        this.drawDrop();
      }

      this.canvasBox.appendChild(this.canvasDom);
    } // 创建Canvas

  }, {
    key: "createCanvas",
    value: function createCanvas() {
      // 删除之前的Canvas
      if (this.canvasDom && this.canvasBox.children.length > 0) {
        this.canvasBox.removeChild(this.canvasDom);
      }

      this.canvasDom = document.createElement('canvas');
      this.canvasDom.width = this.canvasBox.clientWidth;
      this.canvasDom.height = this.canvasBox.clientHeight;
      this.canvas = this.canvasDom.getContext('2d');
    } // 绘制背景

  }, {
    key: "drawBackground",
    value: function drawBackground() {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.fillRect(0, 0, this.canvasDom.width, this.defaultHeight);
    } // 绘制下拉弧度

  }, {
    key: "drawPullRadian",
    value: function drawPullRadian() {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.beginPath();
      this.canvas.moveTo(0, this.defaultHeight);
      this.canvas.quadraticCurveTo(this.canvasDom.width / 2, (this.canvasDom.height * 2 - this.defaultHeight) * 0.95, this.canvasDom.width, this.defaultHeight);
      this.canvas.fill();
    } // 绘制回弹弧度

  }, {
    key: "drawRebound",
    value: function drawRebound() {
      // 曲线高度值
      var curveHeight = 0;

      if (this.reboundValue <= this.defaultHeight) {
        curveHeight = this.reboundValue;
      } else if (this.reboundValue <= this.defaultHeight * 2) {
        curveHeight = this.defaultHeight * 2 - this.reboundValue;
      } else if (this.reboundValue <= this.defaultHeight * 2.5) {
        curveHeight = this.reboundValue - this.defaultHeight * 2;
      } else if (this.reboundValue <= this.defaultHeight * 3) {
        curveHeight = this.defaultHeight * 3 - this.reboundValue;
      }

      this.canvas.fillStyle = this.color;
      this.canvas.beginPath();
      this.canvas.moveTo(0, this.defaultHeight);
      this.canvas.quadraticCurveTo(this.canvasDom.width / 2, this.canvasDom.height - curveHeight / 1.5, this.canvasDom.width, this.defaultHeight);
      this.canvas.fill(); // 判断是否弹出圆圈

      if (this.reboundValue >= this.defaultHeight) {
        this.drawCircleRebound();
      }
    } // 绘制圆圈弹出

  }, {
    key: "drawCircleRebound",
    value: function drawCircleRebound() {
      // 计算圆圈的值
      this.reboundCircleValue = this.reboundValue <= this.defaultHeight * 2 ? this.defaultHeight - (this.reboundValue - this.defaultHeight) / 2 : this.defaultHeight / 2; // 计算弹出水滴值

      this.reboundWaterValue = this.defaultHeight - this.reboundCircleValue;
    } // 绘制弹出的圆圈

  }, {
    key: "drawCircle",
    value: function drawCircle() {
      this.canvas.fillStyle = this.color;
      var circleX = this.canvasDom.width / 2 + 0.5;
      var circleY = this.reboundCircleValue;
      this.canvas.beginPath();
      this.canvas.arc(circleX, circleY, this.circleR, 0, 2 * Math.PI);
      this.canvas.fill();
    } // 绘制弹出de水滴

  }, {
    key: "drawWater",
    value: function drawWater() {
      this.canvas.fillStyle = this.color;

      if (this.reboundWaterValue < this.circleR) {
        // 计算宽度和高度
        var width = this.circleR * 4 - (this.defaultHeight - this.reboundWaterValue) * 3;
        var height = this.reboundWaterValue + this.circleR; // 计算x和y

        var curveX = (this.canvasDom.width - width) / 2;
        var curveY = this.canvasDom.height - height * 2;
        this.canvas.beginPath();
        this.canvas.moveTo(curveX, this.defaultHeight);
        this.canvas.quadraticCurveTo(this.canvasDom.width / 2, curveY, curveX + width, this.defaultHeight);
        this.canvas.fill();
      } else if (this.reboundWaterValue < this.circleR * 2) {
        // 计算高度和宽度
        var _width = this.circleR * 2 - this.reboundWaterValue;

        var _height = this.reboundWaterValue; // 计算x和y

        var _curveX = (this.canvasDom.width - _width) / 2;

        var _curveY = this.canvasDom.height - _height / 2;

        this.canvas.beginPath();
        this.canvas.moveTo(this.canvasDom.width / 2 - this.circleR, this.defaultHeight - this.reboundWaterValue);
        this.canvas.quadraticCurveTo(_curveX + this.circleR - _width / 2, _curveY, this.canvasDom.width / 2 - this.circleR, this.defaultHeight);
        this.canvas.lineTo(this.canvasDom.width / 2 + this.circleR, this.defaultHeight);
        this.canvas.quadraticCurveTo(_curveX + _width - (this.circleR - _width / 2), _curveY, this.canvasDom.width / 2 + this.circleR, this.defaultHeight - this.reboundWaterValue);
        this.canvas.fill();
      } else if (this.reboundWaterValue < this.circleR * 3) {
        // 计算高度和宽度
        var _width2 = this.circleR + this.reboundWaterValue - this.circleR * 2;

        var _height2 = this.reboundWaterValue - this.circleR * 2; // 计算x和y


        var _curveX2 = (this.canvasDom.width - _width2) / 2;

        var _curveY2 = this.canvasDom.height - _height2;

        this.canvas.beginPath();
        this.canvas.moveTo(_curveX2, this.defaultHeight);
        this.canvas.quadraticCurveTo(this.canvasDom.width / 2, _curveY2, _curveX2 + _width2, this.defaultHeight);
        this.canvas.fill();
      }
    } // 绘制下落

  }, {
    key: "drawDrop",
    value: function drawDrop() {
      this.canvas.fillStyle = this.color;
      var circleX = this.canvasDom.width / 2;
      var circleY = this.canvasDom.height / 2 + this.dropValue;
      this.canvas.beginPath();
      this.canvas.arc(circleX, circleY, this.circleR, 0, 2 * Math.PI);
      this.canvas.fill();
    } // 开始回弹

  }, {
    key: "startRebound",
    value: function startRebound() {
      var _this3 = this;

      this.reboundInterval = setInterval(function () {
        if (_this3.reboundValue >= _this3.defaultHeight * 3) {
          _this3.stopRebound();

          _this3.reboundValue = 0;
          _this3.progressValue = null;
          _this3.showProgress = true;
        } else {
          _this3.reboundValue += 10;
        }

        _this3.drawCanvas();
      }, 20);
    } // 结束回弹

  }, {
    key: "stopRebound",
    value: function stopRebound() {
      clearInterval(this.reboundInterval);
      this.reboundInterval = undefined;
    } // 开始下落

  }, {
    key: "startDrop",
    value: function startDrop() {
      var _this4 = this;

      this.dropInterval = setInterval(function () {
        if (_this4.dropValue >= _this4.defaultHeight / 2 + _this4.circleR) {
          _this4.stopDrop();

          _this4.dropValue = 0;
          _this4.reboundWaterValue = 0;
        } else {
          _this4.dropValue += 5; // this.reboundWaterValue = this.defaultHeight / 2 + this.circleR - this.dropValue
          // if (this.reboundWaterValue < 0) {
          //     this.reboundWaterValue = 0
          // }
        }

        _this4.drawCanvas();
      }, 20);
    } // 结束下落

  }, {
    key: "stopDrop",
    value: function stopDrop() {
      clearInterval(this.dropInterval);
      this.dropInterval = undefined;
    }
  }]);

  return BezierCircleHeader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 1000
})], BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#ffffff'
})], BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader.prototype, "color", void 0);

__decorate([Prop({
  default: '#2196f3'
})], BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader.prototype, "bgColor", void 0);

__decorate([Watch('headerHeight')], BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader.prototype, "drawCanvas", null);

BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader = __decorate([vue_class_component_common_default()({
  components: {
    CircularProgress: icon_CircularProgress
  }
})], BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader);
/* harmony default export */ var BezierCircleHeadervue_type_script_lang_ts_ = (BezierCircleHeadervue_type_script_lang_ts_BezierCircleHeader);
// CONCATENATED MODULE: ./src/components/header/BezierCircleHeader/BezierCircleHeader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var BezierCircleHeader_BezierCircleHeadervue_type_script_lang_ts_ = (BezierCircleHeadervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/header/BezierCircleHeader/BezierCircleHeader.vue?vue&type=style&index=0&id=5359ae7b&scoped=true&lang=scss&
var BezierCircleHeadervue_type_style_index_0_id_5359ae7b_scoped_true_lang_scss_ = __webpack_require__("d10f");

// CONCATENATED MODULE: ./src/components/header/BezierCircleHeader/BezierCircleHeader.vue






/* normalize component */

var BezierCircleHeader_component = normalizeComponent(
  BezierCircleHeader_BezierCircleHeadervue_type_script_lang_ts_,
  BezierCircleHeadervue_type_template_id_5359ae7b_scoped_true_render,
  BezierCircleHeadervue_type_template_id_5359ae7b_scoped_true_staticRenderFns,
  false,
  null,
  "5359ae7b",
  null
  
)

/* harmony default export */ var BezierCircleHeader_BezierCircleHeader = (BezierCircleHeader_component.exports);
// CONCATENATED MODULE: ./src/components/header/BezierCircleHeader/index.ts
 // @ts-ignore

BezierCircleHeader_BezierCircleHeader.install = function (Vue) {
  Vue.component('BezierCircleHeader', BezierCircleHeader_BezierCircleHeader);
};

/* harmony default export */ var header_BezierCircleHeader = (BezierCircleHeader_BezierCircleHeader);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/MaterialHeader/MaterialHeader.vue?vue&type=template&id=7f476f7c&
var MaterialHeadervue_type_template_id_7f476f7c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-material-header",style:('height: ' + _vm.headerHeight + 'px;')},[_c('div',{staticClass:"er-material-header-circle-card",style:('transform: rotate(' + _vm.rotateValue + 'deg);' + 'background: ' + _vm.bgColor + ';')},[_c('CircularProgress',{attrs:{"color":_vm.color,"value":_vm.progressValue}})],1)])}
var MaterialHeadervue_type_template_id_7f476f7c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/header/MaterialHeader/MaterialHeader.vue?vue&type=template&id=7f476f7c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/MaterialHeader/MaterialHeader.vue?vue&type=script&lang=ts&










var MaterialHeadervue_type_script_lang_ts_MaterialHeader =
/*#__PURE__*/
function (_Vue) {
  _inherits(MaterialHeader, _Vue);

  function MaterialHeader() {
    var _this;

    _classCallCheck(this, MaterialHeader);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(MaterialHeader).apply(this, arguments)); // Header的高度

    _this.defaultHeight = 100;
    _this.headerHeight = _this.defaultHeight; // 进度值

    _this.progressValue = 0; // 旋转度

    _this.rotateValue = 0; // Header状态

    _this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
    return _this;
  }

  _createClass(MaterialHeader, [{
    key: "headerFinishDuration",
    value: function headerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isHeaderFloat",
    value: function isHeaderFloat() {
      return true;
    }
  }, {
    key: "onRefreshClose",
    value: function onRefreshClose() {
      this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
    }
  }, {
    key: "onRefreshEnd",
    value: function onRefreshEnd() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_END;
      this.progressValue = 1;
    }
  }, {
    key: "onRefreshReady",
    value: function onRefreshReady() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_READY;
    }
  }, {
    key: "onRefreshRestore",
    value: function onRefreshRestore() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshStart",
    value: function onRefreshStart() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshed",
    value: function onRefreshed() {
      this.headerStatus = RefreshHeaderStatus.REFRESHED;
      this.progressValue = 1;
    }
  }, {
    key: "onRefreshing",
    value: function onRefreshing() {
      this.headerStatus = RefreshHeaderStatus.REFRESHING;
      this.progressValue = null;
      this.rotateValue = 0;
    }
  }, {
    key: "refreshHeight",
    value: function refreshHeight() {
      return this.defaultHeight;
    }
  }, {
    key: "updateHeaderHeight",
    value: function updateHeaderHeight(height) {
      if (height > this.defaultHeight) {
        this.headerHeight = height;

        if (this.headerStatus === RefreshHeaderStatus.REFRESH_START || this.headerStatus === RefreshHeaderStatus.NO_REFRESH || this.headerStatus === RefreshHeaderStatus.REFRESH_READY) {
          this.progressValue = 0.75;
          this.rotateValue = 90;
        }
      } else {
        this.headerHeight = this.defaultHeight;

        if (this.headerStatus === RefreshHeaderStatus.REFRESH_START || this.headerStatus === RefreshHeaderStatus.NO_REFRESH || this.headerStatus === RefreshHeaderStatus.REFRESH_READY) {
          this.progressValue = height / this.defaultHeight * 0.75;
          this.rotateValue = 90 * height / this.defaultHeight;
        }
      }
    }
  }]);

  return MaterialHeader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 1000
})], MaterialHeadervue_type_script_lang_ts_MaterialHeader.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#2196f3'
})], MaterialHeadervue_type_script_lang_ts_MaterialHeader.prototype, "color", void 0);

__decorate([Prop({
  default: '#ffffff'
})], MaterialHeadervue_type_script_lang_ts_MaterialHeader.prototype, "bgColor", void 0);

MaterialHeadervue_type_script_lang_ts_MaterialHeader = __decorate([vue_class_component_common_default()({
  components: {
    CircularProgress: icon_CircularProgress
  }
})], MaterialHeadervue_type_script_lang_ts_MaterialHeader);
/* harmony default export */ var MaterialHeadervue_type_script_lang_ts_ = (MaterialHeadervue_type_script_lang_ts_MaterialHeader);
// CONCATENATED MODULE: ./src/components/header/MaterialHeader/MaterialHeader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var MaterialHeader_MaterialHeadervue_type_script_lang_ts_ = (MaterialHeadervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/header/MaterialHeader/MaterialHeader.vue?vue&type=style&index=0&lang=scss&
var MaterialHeadervue_type_style_index_0_lang_scss_ = __webpack_require__("b4c6");

// CONCATENATED MODULE: ./src/components/header/MaterialHeader/MaterialHeader.vue






/* normalize component */

var MaterialHeader_component = normalizeComponent(
  MaterialHeader_MaterialHeadervue_type_script_lang_ts_,
  MaterialHeadervue_type_template_id_7f476f7c_render,
  MaterialHeadervue_type_template_id_7f476f7c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MaterialHeader_MaterialHeader = (MaterialHeader_component.exports);
// CONCATENATED MODULE: ./src/components/header/MaterialHeader/index.ts
 // @ts-ignore

MaterialHeader_MaterialHeader.install = function (Vue) {
  Vue.component('MaterialHeader', MaterialHeader_MaterialHeader);
};

/* harmony default export */ var header_MaterialHeader = (MaterialHeader_MaterialHeader);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/EmptyHeader/EmptyHeader.vue?vue&type=template&id=0bd9d38a&scoped=true&
var EmptyHeadervue_type_template_id_0bd9d38a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-empty-header",style:('height: ' + _vm.headerHeight + 'px;')})}
var EmptyHeadervue_type_template_id_0bd9d38a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/header/EmptyHeader/EmptyHeader.vue?vue&type=template&id=0bd9d38a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header/EmptyHeader/EmptyHeader.vue?vue&type=script&lang=ts&









var EmptyHeadervue_type_script_lang_ts_EmptyHeader =
/*#__PURE__*/
function (_Vue) {
  _inherits(EmptyHeader, _Vue);

  function EmptyHeader() {
    var _this;

    _classCallCheck(this, EmptyHeader);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(EmptyHeader).apply(this, arguments)); // Header的高度

    _this.headerHeight = 70.0; // Header状态

    _this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
    return _this;
  } // 初始化


  _createClass(EmptyHeader, [{
    key: "mounted",
    value: function mounted() {
      // 初始化高度
      this.headerHeight = this.height;
    }
  }, {
    key: "headerFinishDuration",
    value: function headerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isHeaderFloat",
    value: function isHeaderFloat() {
      return this.isFloat;
    }
  }, {
    key: "onRefreshClose",
    value: function onRefreshClose() {
      this.headerStatus = RefreshHeaderStatus.NO_REFRESH;
    }
  }, {
    key: "onRefreshEnd",
    value: function onRefreshEnd() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_END;
    }
  }, {
    key: "onRefreshReady",
    value: function onRefreshReady() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_READY;
    }
  }, {
    key: "onRefreshRestore",
    value: function onRefreshRestore() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshStart",
    value: function onRefreshStart() {
      this.headerStatus = RefreshHeaderStatus.REFRESH_START;
    }
  }, {
    key: "onRefreshed",
    value: function onRefreshed() {
      this.headerStatus = RefreshHeaderStatus.REFRESHED;
    }
  }, {
    key: "onRefreshing",
    value: function onRefreshing() {
      this.headerStatus = RefreshHeaderStatus.REFRESHING;
    }
  }, {
    key: "refreshHeight",
    value: function refreshHeight() {
      return this.height;
    }
  }, {
    key: "updateHeaderHeight",
    value: function updateHeaderHeight(height) {
      if (height > this.height) {
        this.headerHeight = height;
      } else {
        this.headerHeight = this.height;
      }
    }
  }]);

  return EmptyHeader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 70
})], EmptyHeadervue_type_script_lang_ts_EmptyHeader.prototype, "height", void 0);

__decorate([Prop({
  default: 1000
})], EmptyHeadervue_type_script_lang_ts_EmptyHeader.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: false
})], EmptyHeadervue_type_script_lang_ts_EmptyHeader.prototype, "isFloat", void 0);

EmptyHeadervue_type_script_lang_ts_EmptyHeader = __decorate([vue_class_component_common_default.a], EmptyHeadervue_type_script_lang_ts_EmptyHeader);
/* harmony default export */ var EmptyHeadervue_type_script_lang_ts_ = (EmptyHeadervue_type_script_lang_ts_EmptyHeader);
// CONCATENATED MODULE: ./src/components/header/EmptyHeader/EmptyHeader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var EmptyHeader_EmptyHeadervue_type_script_lang_ts_ = (EmptyHeadervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/header/EmptyHeader/EmptyHeader.vue?vue&type=style&index=0&id=0bd9d38a&scoped=true&lang=css&
var EmptyHeadervue_type_style_index_0_id_0bd9d38a_scoped_true_lang_css_ = __webpack_require__("21f7");

// CONCATENATED MODULE: ./src/components/header/EmptyHeader/EmptyHeader.vue






/* normalize component */

var EmptyHeader_component = normalizeComponent(
  EmptyHeader_EmptyHeadervue_type_script_lang_ts_,
  EmptyHeadervue_type_template_id_0bd9d38a_scoped_true_render,
  EmptyHeadervue_type_template_id_0bd9d38a_scoped_true_staticRenderFns,
  false,
  null,
  "0bd9d38a",
  null
  
)

/* harmony default export */ var EmptyHeader_EmptyHeader = (EmptyHeader_component.exports);
// CONCATENATED MODULE: ./src/components/header/EmptyHeader/index.ts
 // @ts-ignore

EmptyHeader_EmptyHeader.install = function (Vue) {
  Vue.component('EmptyHeader', EmptyHeader_EmptyHeader);
};

/* harmony default export */ var header_EmptyHeader = (EmptyHeader_EmptyHeader);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/BallPulseFooter/BallPulseFooter.vue?vue&type=template&id=7bcb570c&scoped=true&
var BallPulseFootervue_type_template_id_7bcb570c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-ball-pulse-footer",style:('height: ' + _vm.footerHeight + 'px;')},[(_vm.showBallPulse)?_c('BallPulse',{attrs:{"color":_vm.color}}):_vm._e()],1)}
var BallPulseFootervue_type_template_id_7bcb570c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/footer/BallPulseFooter/BallPulseFooter.vue?vue&type=template&id=7bcb570c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/BallPulseFooter/BallPulseFooter.vue?vue&type=script&lang=ts&









var BallPulseFootervue_type_script_lang_ts_BallPulseFooter =
/*#__PURE__*/
function (_Vue) {
  _inherits(BallPulseFooter, _Vue);

  function BallPulseFooter() {
    var _this;

    _classCallCheck(this, BallPulseFooter);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(BallPulseFooter).apply(this, arguments)); // Footer的高度

    _this.footerHeight = 70; // 没有更多

    _this.noMore = false; // 显示球脉冲

    _this.showBallPulse = true;
    return _this;
  } // 初始化


  _createClass(BallPulseFooter, [{
    key: "mounted",
    value: function mounted() {
      // 初始化高度
      this.footerHeight = this.height;
    }
  }, {
    key: "footerFinishDuration",
    value: function footerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isFooterFloat",
    value: function isFooterFloat() {
      return false;
    }
  }, {
    key: "loadHeight",
    value: function loadHeight() {
      return this.height;
    }
  }, {
    key: "onLoadClose",
    value: function onLoadClose() {
      this.noMore = false;
    }
  }, {
    key: "onLoadEnd",
    value: function onLoadEnd() {// todo nothing
    }
  }, {
    key: "onLoadReady",
    value: function onLoadReady() {// todo nothing
    }
  }, {
    key: "onLoadRestore",
    value: function onLoadRestore() {// todo nothing
    }
  }, {
    key: "onLoadStart",
    value: function onLoadStart() {
      this.noMore = false;
      this.showBallPulse = true;
    }
  }, {
    key: "onLoaded",
    value: function onLoaded() {// todo nothing
    }
  }, {
    key: "onLoading",
    value: function onLoading() {// todo nothing
    }
  }, {
    key: "onNoMore",
    value: function onNoMore() {
      this.noMore = true;
    }
  }, {
    key: "updateFooterHeight",
    value: function updateFooterHeight(height) {
      if (height < 1 && this.noMore) {
        this.showBallPulse = false;
      }

      if (height > this.height) {
        this.footerHeight = height;
      } else {
        this.footerHeight = this.height;
      }
    }
  }]);

  return BallPulseFooter;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 70
})], BallPulseFootervue_type_script_lang_ts_BallPulseFooter.prototype, "height", void 0);

__decorate([Prop({
  default: 1000
})], BallPulseFootervue_type_script_lang_ts_BallPulseFooter.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#2196f3'
})], BallPulseFootervue_type_script_lang_ts_BallPulseFooter.prototype, "color", void 0);

BallPulseFootervue_type_script_lang_ts_BallPulseFooter = __decorate([vue_class_component_common_default()({
  components: {
    BallPulse: icon_BallPulse
  }
})], BallPulseFootervue_type_script_lang_ts_BallPulseFooter);
/* harmony default export */ var BallPulseFootervue_type_script_lang_ts_ = (BallPulseFootervue_type_script_lang_ts_BallPulseFooter);
// CONCATENATED MODULE: ./src/components/footer/BallPulseFooter/BallPulseFooter.vue?vue&type=script&lang=ts&
 /* harmony default export */ var BallPulseFooter_BallPulseFootervue_type_script_lang_ts_ = (BallPulseFootervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/footer/BallPulseFooter/BallPulseFooter.vue?vue&type=style&index=0&id=7bcb570c&scoped=true&lang=css&
var BallPulseFootervue_type_style_index_0_id_7bcb570c_scoped_true_lang_css_ = __webpack_require__("ed9c");

// CONCATENATED MODULE: ./src/components/footer/BallPulseFooter/BallPulseFooter.vue






/* normalize component */

var BallPulseFooter_component = normalizeComponent(
  BallPulseFooter_BallPulseFootervue_type_script_lang_ts_,
  BallPulseFootervue_type_template_id_7bcb570c_scoped_true_render,
  BallPulseFootervue_type_template_id_7bcb570c_scoped_true_staticRenderFns,
  false,
  null,
  "7bcb570c",
  null
  
)

/* harmony default export */ var BallPulseFooter_BallPulseFooter = (BallPulseFooter_component.exports);
// CONCATENATED MODULE: ./src/components/footer/BallPulseFooter/index.ts
 // @ts-ignore

BallPulseFooter_BallPulseFooter.install = function (Vue) {
  Vue.component('BallPulseFooter', BallPulseFooter_BallPulseFooter);
};

/* harmony default export */ var footer_BallPulseFooter = (BallPulseFooter_BallPulseFooter);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/BezierBounceFooter/BezierBounceFooter.vue?vue&type=template&id=23d50417&scoped=true&
var BezierBounceFootervue_type_template_id_23d50417_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-bezier-bounce-footer",style:('height: ' + _vm.footerHeight + 'px;')},[_c('div',{ref:"er-bbf-canvas",staticClass:"er-bbf-canvas"}),(!_vm.noMore)?_c('div',{staticClass:"er-bbf-background",style:('background: ' + _vm.bgColor + ';')}):_vm._e(),_c('div',{staticClass:"ball-box"},[_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.5) + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.75) + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + _vm.ballOpacity + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.75) + ";"))}),_c('div',{staticClass:"ball",style:(("background: " + _vm.color + ";margin-left: " + _vm.ballMargin + "px;margin-right: " + _vm.ballMargin + "px;opacity: " + (_vm.ballOpacity * 0.5) + ";"))})]),_c('div',{staticClass:"ball-pulse"},[(_vm.showBallPulse)?_c('BallPulse',{attrs:{"color":_vm.color,"size":15}}):_vm._e()],1)])}
var BezierBounceFootervue_type_template_id_23d50417_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/footer/BezierBounceFooter/BezierBounceFooter.vue?vue&type=template&id=23d50417&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/BezierBounceFooter/BezierBounceFooter.vue?vue&type=script&lang=ts&











var BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter =
/*#__PURE__*/
function (_Vue) {
  _inherits(BezierBounceFooter, _Vue);

  function BezierBounceFooter() {
    var _this;

    _classCallCheck(this, BezierBounceFooter);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(BezierBounceFooter).apply(this, arguments)); // Footer的高度

    _this.defaultHeight = 80;
    _this.footerHeight = _this.defaultHeight; // Footer状态

    _this.footerStatus = RefreshFooterStatus.NO_LOAD; // 回弹值

    _this.reboundValue = 0; // 小球边距

    _this.ballMargin = 10; // 小球透明度

    _this.ballOpacity = 0; // 显示小球脉冲

    _this.showBallPulse = false; // 没有更多

    _this.noMore = false;
    return _this;
  } // 初始化


  _createClass(BezierBounceFooter, [{
    key: "mounted",
    value: function mounted() {
      this.canvasBox = this.$refs['er-bbf-canvas'];
      this.drawCanvas();
    } // 销毁之前

  }, {
    key: "beforeDestory",
    value: function beforeDestory() {
      this.startRebound();
    }
  }, {
    key: "footerFinishDuration",
    value: function footerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isFooterFloat",
    value: function isFooterFloat() {
      return false;
    }
  }, {
    key: "loadHeight",
    value: function loadHeight() {
      return this.defaultHeight;
    }
  }, {
    key: "onLoadClose",
    value: function onLoadClose() {
      this.footerStatus = RefreshFooterStatus.NO_LOAD;
      this.drawCanvas();
      this.showBallPulse = false;
      this.noMore = false;
    }
  }, {
    key: "onLoadEnd",
    value: function onLoadEnd() {
      this.footerStatus = RefreshFooterStatus.LOAD_END;
    }
  }, {
    key: "onLoadReady",
    value: function onLoadReady() {
      this.footerStatus = RefreshFooterStatus.LOAD_READY;
    }
  }, {
    key: "onLoadRestore",
    value: function onLoadRestore() {
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoadStart",
    value: function onLoadStart() {
      this.footerStatus = RefreshFooterStatus.LOAD_START;
      this.noMore = false;
    }
  }, {
    key: "onLoaded",
    value: function onLoaded() {
      this.footerStatus = RefreshFooterStatus.LOADED;
    }
  }, {
    key: "onLoading",
    value: function onLoading() {
      this.footerStatus = RefreshFooterStatus.LOADING; // 开始回弹

      this.startRebound();
      this.ballMargin = 10;
      this.showBallPulse = true;
    }
  }, {
    key: "onNoMore",
    value: function onNoMore() {
      this.footerStatus = RefreshFooterStatus.LOADED;
      this.noMore = true;
    }
  }, {
    key: "updateFooterHeight",
    value: function updateFooterHeight(height) {
      if (height < 1 && this.noMore) {
        this.createCanvas();
        this.showBallPulse = false;
      }

      if (height > this.defaultHeight) {
        this.footerHeight = height;
      } else {
        this.footerHeight = this.defaultHeight;
      }
    } // 上拉Canvas绘制

  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      if (this.noMore) {
        return;
      }

      this.createCanvas();
      this.drawBackground();

      if ((this.footerStatus === RefreshFooterStatus.NO_LOAD || this.footerStatus === RefreshFooterStatus.LOAD_READY) && this.footerHeight >= this.defaultHeight) {
        this.drawBackground();
        this.drawPullRadian();
        this.ballMargin = 10 + (this.footerHeight - this.defaultHeight) / 10;
        this.ballMargin = this.ballMargin < 20 ? this.ballMargin : 20;
        this.ballOpacity = (this.ballMargin - 10) / 10;
      }

      if (this.reboundValue !== 0) {
        this.drawRebound();
      }

      this.canvasBox.appendChild(this.canvasDom);
    } // 创建Canvas

  }, {
    key: "createCanvas",
    value: function createCanvas() {
      // 删除之前的Canvas
      if (this.canvasDom && this.canvasBox.children.length > 0) {
        this.canvasBox.removeChild(this.canvasDom);
      }

      this.canvasDom = document.createElement('canvas');
      this.canvasDom.width = this.canvasBox.clientWidth;
      this.canvasDom.height = this.canvasBox.clientHeight;
      this.canvas = this.canvasDom.getContext('2d');
    } // 绘制背景

  }, {
    key: "drawBackground",
    value: function drawBackground() {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.fillRect(0, this.canvasDom.height - this.defaultHeight, this.canvasDom.width, this.canvasDom.height);
    } // 绘制上拉弧度

  }, {
    key: "drawPullRadian",
    value: function drawPullRadian() {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.beginPath();
      this.canvas.moveTo(0, this.canvasDom.height - this.defaultHeight);
      this.canvas.quadraticCurveTo(this.canvasDom.width / 2, (this.defaultHeight - this.canvasDom.height) * 0.95, this.canvasDom.width, this.canvasDom.height - this.defaultHeight);
      this.canvas.fill();
    } // 绘制回弹弧度

  }, {
    key: "drawRebound",
    value: function drawRebound() {
      // 曲线高度值
      var curveHeight = 0;

      if (this.reboundValue <= this.defaultHeight) {
        curveHeight = this.reboundValue;
      } else if (this.reboundValue <= this.defaultHeight * 2) {
        curveHeight = this.defaultHeight * 2 - this.reboundValue;
      } else if (this.reboundValue <= this.defaultHeight * 2.5) {
        curveHeight = this.reboundValue - this.defaultHeight * 2;
      } else if (this.reboundValue <= this.defaultHeight * 3) {
        curveHeight = this.defaultHeight * 3 - this.reboundValue;
      }

      this.canvas.fillStyle = this.color;
      this.canvas.beginPath();
      this.canvas.moveTo(0, 0);
      this.canvas.quadraticCurveTo(this.canvasDom.width / 2, curveHeight / 1.5, this.canvasDom.width, 0);
      this.canvas.fill();
    } // 开始回弹

  }, {
    key: "startRebound",
    value: function startRebound() {
      var _this2 = this;

      this.reboundInterval = setInterval(function () {
        if (_this2.reboundValue >= _this2.defaultHeight * 3) {
          _this2.stopRebound();

          _this2.reboundValue = 0;
        } else {
          _this2.reboundValue += 10;
        }

        _this2.drawCanvas();
      }, 20);
    } // 结束回弹

  }, {
    key: "stopRebound",
    value: function stopRebound() {
      clearInterval(this.reboundInterval);
      this.reboundInterval = undefined;
    }
  }]);

  return BezierBounceFooter;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 1000
})], BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#ffffff'
})], BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter.prototype, "color", void 0);

__decorate([Prop({
  default: '#2196f3'
})], BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter.prototype, "bgColor", void 0);

__decorate([Watch('footerHeight')], BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter.prototype, "drawCanvas", null);

BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter = __decorate([vue_class_component_common_default()({
  components: {
    BallPulse: icon_BallPulse
  }
})], BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter);
/* harmony default export */ var BezierBounceFootervue_type_script_lang_ts_ = (BezierBounceFootervue_type_script_lang_ts_BezierBounceFooter);
// CONCATENATED MODULE: ./src/components/footer/BezierBounceFooter/BezierBounceFooter.vue?vue&type=script&lang=ts&
 /* harmony default export */ var BezierBounceFooter_BezierBounceFootervue_type_script_lang_ts_ = (BezierBounceFootervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/footer/BezierBounceFooter/BezierBounceFooter.vue?vue&type=style&index=0&id=23d50417&scoped=true&lang=scss&
var BezierBounceFootervue_type_style_index_0_id_23d50417_scoped_true_lang_scss_ = __webpack_require__("f49a");

// CONCATENATED MODULE: ./src/components/footer/BezierBounceFooter/BezierBounceFooter.vue






/* normalize component */

var BezierBounceFooter_component = normalizeComponent(
  BezierBounceFooter_BezierBounceFootervue_type_script_lang_ts_,
  BezierBounceFootervue_type_template_id_23d50417_scoped_true_render,
  BezierBounceFootervue_type_template_id_23d50417_scoped_true_staticRenderFns,
  false,
  null,
  "23d50417",
  null
  
)

/* harmony default export */ var BezierBounceFooter_BezierBounceFooter = (BezierBounceFooter_component.exports);
// CONCATENATED MODULE: ./src/components/footer/BezierBounceFooter/index.ts
 // @ts-ignore

BezierBounceFooter_BezierBounceFooter.install = function (Vue) {
  Vue.component('BezierBounceFooter', BezierBounceFooter_BezierBounceFooter);
};

/* harmony default export */ var footer_BezierBounceFooter = (BezierBounceFooter_BezierBounceFooter);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/EmptyFooter/EmptyFooter.vue?vue&type=template&id=24557ef7&scoped=true&
var EmptyFootervue_type_template_id_24557ef7_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-empty-footer",style:('height: ' + _vm.footerHeight + 'px;')})}
var EmptyFootervue_type_template_id_24557ef7_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/footer/EmptyFooter/EmptyFooter.vue?vue&type=template&id=24557ef7&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/EmptyFooter/EmptyFooter.vue?vue&type=script&lang=ts&









var EmptyFootervue_type_script_lang_ts_EmptyFooter =
/*#__PURE__*/
function (_Vue) {
  _inherits(EmptyFooter, _Vue);

  function EmptyFooter() {
    var _this;

    _classCallCheck(this, EmptyFooter);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(EmptyFooter).apply(this, arguments)); // Footer的高度

    _this.footerHeight = 70; // Footer状态

    _this.footerStatus = RefreshFooterStatus.NO_LOAD;
    return _this;
  } // 初始化


  _createClass(EmptyFooter, [{
    key: "mounted",
    value: function mounted() {
      // 初始化高度
      this.footerHeight = this.height;
    }
  }, {
    key: "footerFinishDuration",
    value: function footerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isFooterFloat",
    value: function isFooterFloat() {
      return this.isFloat;
    }
  }, {
    key: "loadHeight",
    value: function loadHeight() {
      return this.height;
    }
  }, {
    key: "onLoadClose",
    value: function onLoadClose() {
      this.footerStatus = RefreshFooterStatus.NO_LOAD;
    }
  }, {
    key: "onLoadEnd",
    value: function onLoadEnd() {
      this.footerStatus = RefreshFooterStatus.LOAD_END;
    }
  }, {
    key: "onLoadReady",
    value: function onLoadReady() {
      this.footerStatus = RefreshFooterStatus.LOAD_READY;
    }
  }, {
    key: "onLoadRestore",
    value: function onLoadRestore() {
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoadStart",
    value: function onLoadStart() {
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoaded",
    value: function onLoaded() {
      this.footerStatus = RefreshFooterStatus.LOADED;
    }
  }, {
    key: "onLoading",
    value: function onLoading() {
      this.footerStatus = RefreshFooterStatus.LOADING;
    }
  }, {
    key: "onNoMore",
    value: function onNoMore() {
      this.footerStatus = RefreshFooterStatus.LOADED;
    }
  }, {
    key: "updateFooterHeight",
    value: function updateFooterHeight(height) {
      if (height > this.height) {
        this.footerHeight = height;
      } else {
        this.footerHeight = this.height;
      }
    }
  }]);

  return EmptyFooter;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 70
})], EmptyFootervue_type_script_lang_ts_EmptyFooter.prototype, "height", void 0);

__decorate([Prop({
  default: 1000
})], EmptyFootervue_type_script_lang_ts_EmptyFooter.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: false
})], EmptyFootervue_type_script_lang_ts_EmptyFooter.prototype, "isFloat", void 0);

EmptyFootervue_type_script_lang_ts_EmptyFooter = __decorate([vue_class_component_common_default.a], EmptyFootervue_type_script_lang_ts_EmptyFooter);
/* harmony default export */ var EmptyFootervue_type_script_lang_ts_ = (EmptyFootervue_type_script_lang_ts_EmptyFooter);
// CONCATENATED MODULE: ./src/components/footer/EmptyFooter/EmptyFooter.vue?vue&type=script&lang=ts&
 /* harmony default export */ var EmptyFooter_EmptyFootervue_type_script_lang_ts_ = (EmptyFootervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/footer/EmptyFooter/EmptyFooter.vue?vue&type=style&index=0&id=24557ef7&scoped=true&lang=css&
var EmptyFootervue_type_style_index_0_id_24557ef7_scoped_true_lang_css_ = __webpack_require__("4208");

// CONCATENATED MODULE: ./src/components/footer/EmptyFooter/EmptyFooter.vue






/* normalize component */

var EmptyFooter_component = normalizeComponent(
  EmptyFooter_EmptyFootervue_type_script_lang_ts_,
  EmptyFootervue_type_template_id_24557ef7_scoped_true_render,
  EmptyFootervue_type_template_id_24557ef7_scoped_true_staticRenderFns,
  false,
  null,
  "24557ef7",
  null
  
)

/* harmony default export */ var EmptyFooter_EmptyFooter = (EmptyFooter_component.exports);
// CONCATENATED MODULE: ./src/components/footer/EmptyFooter/index.ts
 // @ts-ignore

EmptyFooter_EmptyFooter.install = function (Vue) {
  Vue.component('EmptyFooter', EmptyFooter_EmptyFooter);
};

/* harmony default export */ var footer_EmptyFooter = (EmptyFooter_EmptyFooter);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b9aaebc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/MaterialFooter/MaterialFooter.vue?vue&type=template&id=435c6150&scoped=true&
var MaterialFootervue_type_template_id_435c6150_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"er-material-footer",style:('height: ' + _vm.footerHeight + 'px;')},[_c('div',{staticClass:"er-material-footer-circle-card",style:('transform: rotate(' + _vm.rotateValue + 'deg);' + 'background: ' + _vm.bgColor + ';')},[_c('CircularProgress',{attrs:{"color":_vm.color,"value":_vm.progressValue}})],1)])}
var MaterialFootervue_type_template_id_435c6150_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/footer/MaterialFooter/MaterialFooter.vue?vue&type=template&id=435c6150&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/footer/MaterialFooter/MaterialFooter.vue?vue&type=script&lang=ts&










var MaterialFootervue_type_script_lang_ts_MaterialFooter =
/*#__PURE__*/
function (_Vue) {
  _inherits(MaterialFooter, _Vue);

  function MaterialFooter() {
    var _this;

    _classCallCheck(this, MaterialFooter);

    _this = _possibleConstructorReturn(this, getPrototypeOf_getPrototypeOf(MaterialFooter).apply(this, arguments)); // Header的高度

    _this.defaultHeight = 100;
    _this.footerHeight = _this.defaultHeight; // 进度值

    _this.progressValue = 0; // 旋转度

    _this.rotateValue = 0; // Footer状态

    _this.footerStatus = RefreshFooterStatus.NO_LOAD;
    return _this;
  }

  _createClass(MaterialFooter, [{
    key: "footerFinishDuration",
    value: function footerFinishDuration() {
      return this.finishDuration;
    }
  }, {
    key: "isFooterFloat",
    value: function isFooterFloat() {
      return true;
    }
  }, {
    key: "loadHeight",
    value: function loadHeight() {
      return this.defaultHeight;
    }
  }, {
    key: "onLoadClose",
    value: function onLoadClose() {
      this.footerStatus = RefreshFooterStatus.NO_LOAD;
    }
  }, {
    key: "onLoadEnd",
    value: function onLoadEnd() {
      this.footerStatus = RefreshFooterStatus.LOAD_END;
      this.progressValue = 1;
    }
  }, {
    key: "onLoadReady",
    value: function onLoadReady() {
      this.footerStatus = RefreshFooterStatus.LOAD_READY;
    }
  }, {
    key: "onLoadRestore",
    value: function onLoadRestore() {
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoadStart",
    value: function onLoadStart() {
      this.footerStatus = RefreshFooterStatus.LOAD_START;
    }
  }, {
    key: "onLoaded",
    value: function onLoaded() {
      this.footerStatus = RefreshFooterStatus.LOADED;
      this.progressValue = 1;
    }
  }, {
    key: "onLoading",
    value: function onLoading() {
      this.footerStatus = RefreshFooterStatus.LOADING;
      this.progressValue = null;
      this.rotateValue = 0;
    }
  }, {
    key: "onNoMore",
    value: function onNoMore() {
      this.footerStatus = RefreshFooterStatus.LOADED;
      this.progressValue = 1;
    }
  }, {
    key: "updateFooterHeight",
    value: function updateFooterHeight(height) {
      if (height > this.defaultHeight) {
        this.footerHeight = height;

        if (this.footerStatus === RefreshFooterStatus.LOAD_START || this.footerStatus === RefreshFooterStatus.NO_LOAD || this.footerStatus === RefreshFooterStatus.LOAD_READY) {
          this.progressValue = 0.75;
          this.rotateValue = 90;
        }
      } else {
        this.footerHeight = this.defaultHeight;

        if (this.footerStatus === RefreshFooterStatus.LOAD_START || this.footerStatus === RefreshFooterStatus.NO_LOAD || this.footerStatus === RefreshFooterStatus.LOAD_READY) {
          this.progressValue = height / this.defaultHeight * 0.75;
          this.rotateValue = 90 * height / this.defaultHeight;
        }
      }
    }
  }]);

  return MaterialFooter;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: 1000
})], MaterialFootervue_type_script_lang_ts_MaterialFooter.prototype, "finishDuration", void 0);

__decorate([Prop({
  default: '#2196f3'
})], MaterialFootervue_type_script_lang_ts_MaterialFooter.prototype, "color", void 0);

__decorate([Prop({
  default: '#ffffff'
})], MaterialFootervue_type_script_lang_ts_MaterialFooter.prototype, "bgColor", void 0);

MaterialFootervue_type_script_lang_ts_MaterialFooter = __decorate([vue_class_component_common_default()({
  components: {
    CircularProgress: icon_CircularProgress
  }
})], MaterialFootervue_type_script_lang_ts_MaterialFooter);
/* harmony default export */ var MaterialFootervue_type_script_lang_ts_ = (MaterialFootervue_type_script_lang_ts_MaterialFooter);
// CONCATENATED MODULE: ./src/components/footer/MaterialFooter/MaterialFooter.vue?vue&type=script&lang=ts&
 /* harmony default export */ var MaterialFooter_MaterialFootervue_type_script_lang_ts_ = (MaterialFootervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/footer/MaterialFooter/MaterialFooter.vue?vue&type=style&index=0&id=435c6150&scoped=true&lang=scss&
var MaterialFootervue_type_style_index_0_id_435c6150_scoped_true_lang_scss_ = __webpack_require__("88fa");

// CONCATENATED MODULE: ./src/components/footer/MaterialFooter/MaterialFooter.vue






/* normalize component */

var MaterialFooter_component = normalizeComponent(
  MaterialFooter_MaterialFootervue_type_script_lang_ts_,
  MaterialFootervue_type_template_id_435c6150_scoped_true_render,
  MaterialFootervue_type_template_id_435c6150_scoped_true_staticRenderFns,
  false,
  null,
  "435c6150",
  null
  
)

/* harmony default export */ var MaterialFooter_MaterialFooter = (MaterialFooter_component.exports);
// CONCATENATED MODULE: ./src/components/footer/MaterialFooter/index.ts
 // @ts-ignore

MaterialFooter_MaterialFooter.install = function (Vue) {
  Vue.component('MaterialFooter', MaterialFooter_MaterialFooter);
};

/* harmony default export */ var footer_MaterialFooter = (MaterialFooter_MaterialFooter);
// CONCATENATED MODULE: ./src/index.ts














var components = {
  EasyRefresh: components_EasyRefresh,
  BallPulseHeader: header_BallPulseHeader,
  BezierBounceHeader: header_BezierBounceHeader,
  BezierCircleHeader: header_BezierCircleHeader,
  ClassicsHeader: header_ClassicsHeader,
  MaterialHeader: header_MaterialHeader,
  EmptyHeader: header_EmptyHeader,
  BallPulseFooter: footer_BallPulseFooter,
  BezierBounceFooter: footer_BezierBounceFooter,
  ClassicsFooter: footer_ClassicsFooter,
  EmptyFooter: footer_EmptyFooter,
  MaterialFooter: footer_MaterialFooter
}; // 安装插件
// @ts-ignore

var src_install = function install(Vue) {
  keys_default()(components).forEach(function (key) {
    // @ts-ignore
    // Vue.component(components[key].name, components[key])
    // @ts-ignore
    Vue.use(components[key]);
  });
}; // @ts-ignore


if (typeof window !== 'undefined' && window.Vue) {
  src_install(window.Vue);
}


/* harmony default export */ var src = (_objectSpread({
  install: src_install
}, components));
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport EasyRefresh */__webpack_require__.d(__webpack_exports__, "EasyRefresh", function() { return components_EasyRefresh; });
/* concated harmony reexport BallPulseHeader */__webpack_require__.d(__webpack_exports__, "BallPulseHeader", function() { return header_BallPulseHeader; });
/* concated harmony reexport BezierBounceHeader */__webpack_require__.d(__webpack_exports__, "BezierBounceHeader", function() { return header_BezierBounceHeader; });
/* concated harmony reexport BezierCircleHeader */__webpack_require__.d(__webpack_exports__, "BezierCircleHeader", function() { return header_BezierCircleHeader; });
/* concated harmony reexport ClassicsHeader */__webpack_require__.d(__webpack_exports__, "ClassicsHeader", function() { return header_ClassicsHeader; });
/* concated harmony reexport MaterialHeader */__webpack_require__.d(__webpack_exports__, "MaterialHeader", function() { return header_MaterialHeader; });
/* concated harmony reexport EmptyHeader */__webpack_require__.d(__webpack_exports__, "EmptyHeader", function() { return header_EmptyHeader; });
/* concated harmony reexport BallPulseFooter */__webpack_require__.d(__webpack_exports__, "BallPulseFooter", function() { return footer_BallPulseFooter; });
/* concated harmony reexport BezierBounceFooter */__webpack_require__.d(__webpack_exports__, "BezierBounceFooter", function() { return footer_BezierBounceFooter; });
/* concated harmony reexport ClassicsFooter */__webpack_require__.d(__webpack_exports__, "ClassicsFooter", function() { return footer_ClassicsFooter; });
/* concated harmony reexport EmptyFooter */__webpack_require__.d(__webpack_exports__, "EmptyFooter", function() { return footer_EmptyFooter; });
/* concated harmony reexport MaterialFooter */__webpack_require__.d(__webpack_exports__, "MaterialFooter", function() { return footer_MaterialFooter; });
/* concated harmony reexport install */__webpack_require__.d(__webpack_exports__, "install", function() { return src_install; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fde4":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("bf90");
var $Object = __webpack_require__("584a").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "fde4b":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".v-easy-refresh{width:100%;height:100%;position:relative;overflow:hidden}.v-easy-refresh .v-easy-refresh-body{width:100%;height:100%;position:absolute;top:0;left:0;overflow:hidden}.v-easy-refresh .v-easy-refresh-body .v-easy-refresh-float-footer-offset,.v-easy-refresh .v-easy-refresh-body .v-easy-refresh-float-header-offset{width:100%}.v-easy-refresh .v-easy-refresh-footer,.v-easy-refresh .v-easy-refresh-header{width:100%;position:absolute}.er_user_select_none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}", ""]);

// exports


/***/ }),

/***/ "fe23":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".er-empty-header[data-v-0bd9d38a]{width:100%;height:0;background:transparent}", ""]);

// exports


/***/ })

/******/ });
//# sourceMappingURL=easyrefresh.common.js.map