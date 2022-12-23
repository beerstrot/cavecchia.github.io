(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_input-number_js"],{

/***/ "./src/assets/js/input-number.js":
/*!***************************************!*\
  !*** ./src/assets/js/input-number.js ***!
  \***************************************/
/***/ (function() {

$('.input-number-increment').click(function () {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val + 1);
});
$('.input-number-decrement').click(function () {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val - 1);
});

/***/ })

}]);
//# sourceMappingURL=src_assets_js_input-number_js.js.map