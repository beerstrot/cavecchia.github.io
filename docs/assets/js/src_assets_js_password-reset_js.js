"use strict";
(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_password-reset_js"],{

/***/ "./src/assets/js/password-reset.js":
/*!*****************************************!*\
  !*** ./src/assets/js/password-reset.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/assets/js/utils.js");

$(document).ready(function () {
  var currentPageParameters = new URL(window.location.href).searchParams;
  var data = {
    'email': currentPageParameters.get('email'),
    'key': currentPageParameters.get('key')
  };
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
    action: 'checkPasswordResetToken',
    data: data
  }, function (res) {
    if (!res.result) {
      alert(res.details);
      window.location.href = window.location.origin;
    }
  }, function (res) {
    // TODO: add this show message modal
    alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
  });
});

/***/ })

}]);
//# sourceMappingURL=src_assets_js_password-reset_js.js.map