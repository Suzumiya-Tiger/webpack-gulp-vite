"use strict";
(self["webpackChunkbabel_core_demo"] = self["webpackChunkbabel_core_demo"] || []).push([["main"],{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _react_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./react/App */ "./src/react/App.jsx");
/* harmony import */ var _ts_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ts/math */ "./src/ts/math.ts");
// core-js的标准代码全部引入
// 防止第三方包需要新特性api，所以需要在入口文件进行标准引入操作

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// npx babel ./src --out-dir ./dist
// 转换文件=>输出到指定文件夹
// npx babel ./src --out-dir ./build --plugins=@babel/plugin-transform-block-scoping
// --plugins=@babel/plugin-transform-block-scoping可以将ES6+的语法进行转化

//  npm install @babel/preset-env
// 安装babel的预设






// 1.ES6以上的语法
var message = "hello babel world";
console.log(message);
var foo = function foo() {
  console.log("foo function exec~");
};
foo();
var obj = {
  name: "coder",
  age: 16
};
var name = obj.name,
  age = obj.age;
console.log(name, age);

// 4.使用一些特殊的API，以验证polyfill
// babel不会对新特性的API进行转换操作，它只能执行简单的转换语法操作
var nickInfo = "coderwhy";
console.log(nickInfo.includes("coder"));

// 编写react代码
var root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.querySelector("#root"));
root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));

// 6.使用typescript
console.log((0,_ts_math__WEBPACK_IMPORTED_MODULE_3__.sum)(20, 30));

// 7.发送网络请求获取数据
axios__WEBPACK_IMPORTED_MODULE_4__["default"].get("/api/users/list").then(function (res) {
  console.log(res.data);
});

/***/ }),

/***/ "./src/react/App.jsx":
/*!***************************!*\
  !*** ./src/react/App.jsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var App = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function () {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    count = _useState2[0],
    setCount = _useState2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "App Count:", count), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick(e) {
      return setCount(count + 1);
    }
  }, "+1"));
});
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/ts/math.ts":
/*!************************!*\
  !*** ./src/ts/math.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatPrice: function() { return /* binding */ formatPrice; },
/* harmony export */   sum: function() { return /* binding */ sum; }
/* harmony export */ });
function sum(num1, num2) {
  return num1 + num2;
}
function formatPrice(priceString) {
  if (priceString.includes("$")) {
    return "xxx";
  } else {
    return "yyy";
  }
}

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var m = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./src/main.js"));
/******/ }
]);