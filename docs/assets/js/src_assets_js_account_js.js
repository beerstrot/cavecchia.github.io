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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


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
      class: 'accordion-item ordine-salvato-item',
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
  window.localStorage.currentOrder = JSON.stringify(orderToLoad);
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

/***/ }),

/***/ "./src/assets/js/htmlTemplates.js":
/*!****************************************!*\
  !*** ./src/assets/js/htmlTemplates.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "carrelloCheckoutUser": function() { return /* binding */ carrelloCheckoutUser; },
/* harmony export */   "itemsCarrelloCheckout": function() { return /* binding */ itemsCarrelloCheckout; },
/* harmony export */   "itemsCarrelloTable": function() { return /* binding */ itemsCarrelloTable; }
/* harmony export */ });
var itemsCarrelloTable = function itemsCarrelloTable(name, note, cottura, quantity, price, pid) {
  return "\n            <tr class=\"carrello-row-".concat(pid, "\">\n                <td>\n                    <span class=\"titolo-item\">").concat(name, "</span>\n                    <span class=\"note-item\">").concat(note, "</span>\n                    <span class=\"cottura-item\">").concat(cottura, "</span>\n                </td>\n                <td>\n                    <div class=\"input-group input-number-group\">\n                        <div class=\"input-group-button\">\n                            <span id=\"input-number-decrement-").concat(pid, "\" class=\"input-number-decrement input-number-decrement-").concat(pid, "\"><i class=\"las la-minus-square la-lg\"></i></span>\n                        </div>\n                        <input class=\"input-number\" style=\"width:1.5rem; font-size: 0.8rem!important;\" type=\"button\" value=\"").concat(quantity, "\" min=\"0\" max=\"30\">\n                        <div class=\"input-group-button\">\n                            <span id=\"input-number-increment-").concat(pid, "\" class=\"input-number-increment input-number-increment-").concat(pid, "\"><i class=\"las la-plus-square la-lg\"></i></span>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class=\"prezzo-item\">\u20AC&thinsp;<span class=\"prezzo-item-").concat(pid, "\">").concat(price, "</span></span>\n                </td>\n            </tr>\n");
};
var itemsCarrelloCheckout = function itemsCarrelloCheckout(name, note, cottura, quantity, price) {
  return "\n  \t<div class=\"checkout-summary-item align-middle\">\n\t\t<div class=\"item-name\">\n\t  \t\t<h1 class=\"titolo-item\">".concat(name, "</h1>\n            <p class=\"note-item\">").concat(note, "</p>\n            <p class=\"cottura-item\">").concat(cottura, "</p>\n\t  \t\t<p class=\"note-item\">Quantit\xE0: ").concat(quantity, "</p>\n\t\t</div>\n        <div class=\"item-price\">\n            <p class=\"prezzo-item\">\u20AC&thinsp;").concat(price, "</p>\n        </div>\n  \t</div>\n");
};
var carrelloCheckoutUser = function carrelloCheckoutUser(carrello, count) {
  var total = 0;
  var prods = [];
  carrello.forEach(function (prod) {
    total += parseFloat(prod.final_price);
    var cottura = prod.variations ? prod.variations[0].value : '';
    prods.push(carrelloProd(prod.name, prod.notes, cottura, prod.quantity, prod.final_price));
  });
  return "\n<div class=\"clearfix\">\n  <div id=\"itens-carrello-checkout\">\n    ".concat(prods.join('\n'), "\n  </div>\n  \t<div class=\"checkout-summary-details\">\n\t    <div>\n\t      \t<h1 class=\"titolo-item\">TOTALE:</h1>\n\t    </div>\n\t    <div class=\"item-price\">\n\t      \t<h1 class=\"titolo-item\" id=\"checkout-total\">\u20AC&ensp;").concat(total.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }), "</h1>\n\t    </div>\n\t</div>\n    <button type=\"button\" id=\"remove-").concat(count, "\" class=\"clear button hollow alert float-left\">Elimina</button>\n    <button type=\"button\" id=\"load-").concat(count, "\" class=\"button submit float-right\" hidden>Metti nel carrello e modifica</button>\n</div>\n");
};
var carrelloProd = function carrelloProd(name, notes, cottura, quantity, price) {
  return "\n<div class=\"checkout-summary-item align-middle\">\n  <div class=\"item-name\">\n    <h1 class=\"titolo-item\">".concat(name, "</h1>\n    <p class=\"note-item\">").concat(notes, "</p>\n    <p class=\"cottura-item\">").concat(cottura, "</p>\n    <p class=\"note-item\">Quantit\xE0: ").concat(quantity, "</p>\n  </div>\n  <div class=\"item-price\">\n    <p class=\"prezzo-item \">\u20AC&thinsp;").concat(price, "</p>\n  </div>\n</div>\n");
};


/***/ })

}]);
//# sourceMappingURL=src_assets_js_account_js.js.map