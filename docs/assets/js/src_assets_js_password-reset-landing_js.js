(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_password-reset-landing_js"],{

/***/ "./src/assets/js/password-reset-landing.js":
/*!*************************************************!*\
  !*** ./src/assets/js/password-reset-landing.js ***!
  \*************************************************/
/***/ (function() {

$(document).ready(function () {
  var targetEmail = window.sessionStorage.getItem("targetEmail");
  if (targetEmail) $('#target-email').text(targetEmail);else window.location.href = '/';
});

/***/ })

}]);
//# sourceMappingURL=src_assets_js_password-reset-landing_js.js.map