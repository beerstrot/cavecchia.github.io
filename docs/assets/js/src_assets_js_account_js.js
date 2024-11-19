"use strict";
(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_account_js"],{

/***/ "./src/assets/js/account.js":
/*!**********************************!*\
  !*** ./src/assets/js/account.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/assets/js/utils.js");
/* harmony import */ var _htmlTemplates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./htmlTemplates */ "./src/assets/js/htmlTemplates.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


var _require = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js"),
  uuidv4 = _require.v4;
$(document).ready(function () {
  if (window.localStorage.currentClient) window.user = JSON.parse(window.localStorage.currentClient);else window.location.href = '/#signup-login';
  $('#logout-btn').on('click', function () {
    delete window.localStorage.currentClient;
    window.location.href = '/';
  });
  setUserData();
  setUpdate();
  if (window.user['orders']) setPreviousOrders();
  $("#poppas-test").click(function (e) {
    var popup = new Foundation.Reveal($('#noProdotti'));
    popup.open();
  });
  $("#confirm-order-load").click(function (e) {
    var tempOrder = JSON.parse(window.localStorage.tempOrder);
    delete window.localStorage.tempOrder;
    confirmLoadPreviousOrder(tempOrder);
  });
});
function setUserData() {
  ['name', 'surname', 'email', 'telephone'].forEach(function (i) {
    return $("#".concat(i, "-m")).val(window.user[i]);
  });
  $('#newsletter-m').prop('checked', user.newsletter);
  $('#ttitle').html("Ciao ".concat(user.name));
}
function setUpdate() {
  $('#update-usr-btn').on('click', function () {
    var data = {};
    var get = function get(id) {
      data[id] = $("#".concat(id, "-m")).val();
    };
    ['name', 'surname', 'telephone', 'email'].forEach(function (i) {
      return get(i);
    });
    data.newsletter = $('#newsletter-m').is(":checked");
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
      action: 'updateClient',
      data: data
    }, function (res) {
      ['name', 'surname', 'telephone', 'newsletter'].forEach(function (i) {
        window.user[i] = res.Attributes[i];
      });
      setUserData();
      window.localStorage.currentClient = JSON.stringify(window.user);
    }, function (res) {
      // TODO: add this show message modal
      showMessage(messageError);
    });
  });
}
function setPreviousOrders() {
  var mesi = 'gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre'.split(', ');
  // const temp = carrelliCheckoutUser(user.orders);
  $('#carrelli-accordion').empty();
  user.orders.forEach(function (order, count) {
    var d = new Date(order.deliver_at);
    var title = "Ordine del ".concat(d.getDate(), " ").concat(mesi[d.getMonth()], " ").concat(d.getFullYear());
    var li = $('<li/>', {
      class: 'accordion-item',
      'data-accordion-item': true
    }).appendTo($('#carrelli-accordion'));
    $('<a/>', {
      class: 'accordion-title',
      href: '#order-' + count
    }).html(title).appendTo(li);
    var temp = (0,_htmlTemplates__WEBPACK_IMPORTED_MODULE_1__.carrelloCheckoutUser)(order.order_items, count);
    $('<div/>', {
      class: 'accordion-content ordine-salvato-content clearfix',
      'data-tab-content': true,
      id: 'order-' + count
    }).appendTo(li).html(temp);
    $('#load-' + count).show();
    $('#remove-' + count).show();
    $('#load-' + count).on('click', function () {
      return loadPreviousOrder(count);
    });
    $('#remove-' + count).on('click', function () {
      return deletePreviousOrder(count);
    });
  });
  // const li = $('<li/>', { class: 'accordion-item ordine-salvato-item', 'data-accordion-item': true }).appendTo($('#carrelli-accordion'));
  // $('<a/>', { class: 'accordion-title', href: '#dummy' }).html('ordine dummy').appendTo(li);
  // $('<div/>', { class: 'accordion-content ordine-salvato-content clearfix', 'data-tab-content': true, id: 'dummy' }).appendTo(li).html('AOSIDJASOISDJ');
}

function loadPreviousOrder(indexID) {
  var data = {
    "email": window.user.email,
    "order_index": indexID
  };
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
    action: 'loadPreviousOrder',
    data: data
  }, function (res) {
    if (res.result) {
      if (res.details.unavailable_items.length > 0) {
        $('#unavailable-items').empty();
        var _iterator = _createForOfIteratorHelper(res.details.unavailable_items),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var unavailableItem = _step.value;
            $('#unavailable-items').append("<li>" + unavailableItem + "</li>");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        window.localStorage.tempOrder = JSON.stringify(res.details.available_items);
        var popup = new Foundation.Reveal($('#noProdotti'));
        popup.open();
      } else confirmLoadPreviousOrder(res.details.available_items);
    } else alert(res.details);
  }, function (err) {
    // TODO: add this show message modal
    alert('Qualcosa è andato storto. Contattaci al numero  071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
  });
}
function confirmLoadPreviousOrder(orderToLoad) {
  var newOrderList = [];
  var _iterator2 = _createForOfIteratorHelper(orderToLoad),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var product = _step2.value;
      var productWithUuid = _objectSpread(_objectSpread({}, product), {}, {
        rowUuid: uuidv4()
      });
      newOrderList.push(productWithUuid);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  window.localStorage.currentOrder = JSON.stringify(newOrderList);
  window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/checkout.html';
}
function deletePreviousOrder(indexID) {
  var data = {
    "email": window.user.email,
    "order_index": indexID
  };
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
    action: 'deletePreviousOrder',
    data: data
  }, function (res) {
    var user = JSON.parse(window.localStorage.currentClient);
    delete user.orders;
    user.orders = JSON.parse(JSON.stringify(res));
    window.localStorage.currentClient = JSON.stringify(user);
    location.reload();
  }, function (err) {
    // TODO: add this show message modal
    alert('Qualcosa è andato storto. Contattaci al numero  071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
  });
}

/***/ })

}]);
//# sourceMappingURL=src_assets_js_account_js.js.map