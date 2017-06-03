webpackJsonp([1,2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, jQuery) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_pjax__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_pjax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_simple_pjax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_greetings__ = __webpack_require__(8);
// See webpack.config.js for third-party JS loading instructions.






// Timeout before calling the loading indicator function. Set to 0 to disable.
__WEBPACK_IMPORTED_MODULE_1_simple_pjax___default.a.indicateLoadAfter = 100;

// Called when loading takes a while. Use it to display a custom loading indicator.
__WEBPACK_IMPORTED_MODULE_1_simple_pjax___default.a.onIndicateLoadStart = function () {
  document.documentElement.style.opacity = 0.5;
};

// Called when loading ends. Use it to hide a custom loading indicator.
__WEBPACK_IMPORTED_MODULE_1_simple_pjax___default.a.onIndicateLoadEnd = function () {
  document.documentElement.style.opacity = null;
};

document.addEventListener('simple-pjax-before-transition', function () {
  // perform cleanup
});

document.addEventListener('simple-pjax-after-transition', function () {
  // perform DOM mutations
});

$(document).ready(function () {
  // Initialise modules here...
  console.log('jQuery version: ' + jQuery.fn.jquery);
  __WEBPACK_IMPORTED_MODULE_2__modules_greetings__["a" /* Greetings */].to('awesome developer');

  var socket = io.connect(window.location.hostname + ':3001');
  socket.on('greet', function (data) {
    console.log(data);
    socket.emit('respond', { message: 'Hey there, server!' });
  });
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Greetings; });
var Greetings = {
  to: function to() {
    var subject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'creator';

    console.log('Hi ' + subject + ' and welcome to Hackathon Starter Plus! :)');
  }
};

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ })
],[10]);
//# sourceMappingURL=main.js.map