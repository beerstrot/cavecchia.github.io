"use strict";
(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_orari_js"],{

/***/ "./src/assets/js/orari.js":
/*!********************************!*\
  !*** ./src/assets/js/orari.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/assets/js/utils.js");
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

$(document).ready(function () {
  getClosedTimeslots();
});
function setOrari() {
  var cells = $('.orario-btn');
  var info = $('#last-time');
  cells.each(function () {
    var cell = $(this);
    cell.attr('disabled', false);
    var text = cell.text();
    var isEnabled = !window.closedTimeslots.has(text);
    if (isEnabled) {
      cell.attr('class', 'button orario-btn primary');
    } else {
      cell.attr('class', 'button orario-btn secondary');
    }
    cell.on('click', function () {
      isEnabled = !isEnabled;
      if (isEnabled) {
        cell.attr('class', 'button orario-btn primary');
        info.html("".concat(text, " aperto"));
        window.closedTimeslots.delete(text);
      } else {
        cell.attr('class', 'button orario-btn secondary');
        info.html("".concat(text, " chiuso"));
        window.closedTimeslots.add(text);
      }
    });
  });
  $('<button/>', {
    type: 'button',
    class: 'button warning'
  }).html('consolidare').appendTo($('#consolidate')).on('click', function () {
    console.log('send to server');
    info.html('orari chiusi sent to server: ' + _construct(Array, _toConsumableArray(window.closedTimeslots)).join(', '));
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
      action: 'consolidateTimeslots',
      data: _construct(Array, _toConsumableArray(window.closedTimeslots))
    }, function (res) {
      window.alert('orari disponibili aggiornati');
      console.log({
        res: res
      });
    }, function (res) {
      // TODO: add this show message modal
      showMessage(messageError);
    });
  });
}
function getClosedTimeslots() {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
    action: 'getClosedTimeslots',
    data: '--'
  }, function (res) {
    window.closedTimeslots = new Set(res);
    setOrari();
  }, function (res) {
    // TODO: add this show message modal
    showMessage(messageError);
  });
}

/***/ })

}]);
//# sourceMappingURL=src_assets_js_orari_js.js.map