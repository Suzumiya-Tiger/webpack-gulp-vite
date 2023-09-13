(self["webpackChunkbabel_core_demo"] = self["webpackChunkbabel_core_demo"] || []).push([[179],{

/***/ "./src/abc.js":
/*!********************!*\
  !*** ./src/abc.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var axios = __webpack_require__(/*! axios */ "./node_modules/.pnpm/axios@1.5.0/node_modules/axios/index.js")["default"];
/* provided dependency */ var dayjs = __webpack_require__(/*! dayjs */ "./node_modules/.pnpm/dayjs@1.11.9/node_modules/dayjs/dayjs.min.js");
// import axios from "axios";
// import dayjs from "dayjs";
/* 在开发环境下，假设这里是第三方库，没有import内部引入，我们可以通过在
   webpack配置中添加ProvidePlugin(webpack内置)来全局引入，这个设置一般是不用的
    */
console.log(axios);
axios.get("http://139.199.212.233:80/moment/list").then(function (res) {
  console.log(res);
});
console.log(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/.pnpm/axios@1.5.0/node_modules/axios/lib/axios.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/.pnpm/vue@3.3.4/node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _abc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abc */ "./src/abc.js");
/* harmony import */ var _abc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_abc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/math */ "./src/utils/math.js");
/* harmony import */ var _utils_foo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/foo */ "./src/utils/foo.js");
/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/index.less */ "./src/css/index.less");
// 如果配置了CDN资源并且在webpack配置中设置了externals，那么真实调用将采用CDN的资源，
// 而非本地的引入






// 使用axios
axios__WEBPACK_IMPORTED_MODULE_5__["default"].get("http://139.199.212.233:80/moment/list").then(function (res) {
  console.log(res);
});
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
btn1.textContent = "about";
btn2.textContent = "category";
document.body.append(btn1);
document.body.append(btn2);
btn1.onclick = function () {
  // 按需导入，不加入主分包文件，作为一个单独的分包文件
  // 为分包名称加入魔法注释，要结合chunkFilename的占位插槽使用

  /* 第二个魔法注释，用于prefetch 
    预获取和按需加载的逻辑不一样，按需加载是触发相关动作时才加载，预获取会先加载，触发工作
    后再进行渲染，两者的区别在于预获取会在空闲时加载，但是按需加载是在触发时加载
  */

  __webpack_require__.e(/*! import() | about */ 443).then(__webpack_require__.bind(__webpack_require__, /*! ./router/about */ "./src/router/about.js")).then(function (res) {
    res.about();
    console.log(res.default);
  });
};
btn2.onclick = function () {
  __webpack_require__.e(/*! import() | category */ 34).then(__webpack_require__.bind(__webpack_require__, /*! ./router/category */ "./src/router/category.js"));
};
(0,_utils_math__WEBPACK_IMPORTED_MODULE_2__.testMath)();
(0,_utils_foo__WEBPACK_IMPORTED_MODULE_3__.foo)();

/***/ }),

/***/ "./src/css/index.less":
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/startup prefetch */
/******/ !function() {
/******/ 	__webpack_require__.O(0, [179], function() {
/******/ 		__webpack_require__.E(443);
/******/ 		__webpack_require__.E(34);
/******/ 	}, 5);
/******/ }();
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [765,421], function() { return __webpack_exec__("./src/main.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);