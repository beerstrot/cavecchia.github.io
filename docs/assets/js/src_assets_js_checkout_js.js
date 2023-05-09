"use strict";
(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_checkout_js"],{

/***/ "./src/assets/js/checkout.js":
/*!***********************************!*\
  !*** ./src/assets/js/checkout.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/assets/js/utils.js");
/* harmony import */ var _htmlTemplates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./htmlTemplates */ "./src/assets/js/htmlTemplates.js");


$(document).ready(function () {
  checkStoredOrder();
  getClosedTimeslots();
  setSendOrder();
});
function checkStoredOrder() {
  var storage = window.localStorage.currentOrder;
  if (!storage) {
    window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/asporto.html';
    return;
  }
  var prods = JSON.parse(storage);
  window.prods = prods;
  if (prods) {
    prods.forEach(function (p) {
      var price = p.quantity * p.price1;
      var template = (0,_htmlTemplates__WEBPACK_IMPORTED_MODULE_1__.itemsCarrelloCheckout)(p.name, p.noteText, p.cotturaV, p.quantity, price);
      console.log({
        template: template
      });
      $('#itens-carrello-checkout').append(template);
    });
  }
  var total = prods.reduce(function (a, p) {
    return a + p.quantity * p.price1;
  }, 0);
  $('#checkout-total').text("\u20AC ".concat(total.toLocaleString()));
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
function setOrari() {
  var d_ = new Date();
  var diff = 15; // minutes
  var d = new Date(d_.getTime() + diff * 60000);
  var h = d.getUTCHours();
  var m = d.getUTCMinutes();
  var o = d.getTimezoneOffset();
  var h_ = h - Math.round(o / 60);
  var t = "".concat(h_, ":").concat(m);
  var cells = $('.orario-btn');
  cells.each(function () {
    var cell = $(this);
    var text = cell.text();
    var isEnabled = !window.closedTimeslots.has(text) && text > t;
    cell.attr('disabled', !isEnabled);
    cell.on('click', function () {
      cells.each(function () {
        $(this).attr('class', 'button orario-btn').attr('bselected', false);
      });
      cell.attr('class', 'button orario-btn success').attr('bselected', true);
      window.localStorage.timeSlot = text;
      $('#chosen-time').html(text);
    });
  });
  if (window.localStorage.timeSlot) {
    $("button:contains(\"".concat(window.localStorage.timeSlot, "\")")).click();
  } else {
    $('#chosen-time').html('--');
  }
}
function setSendOrder() {
  var client = JSON.parse(window.localStorage.currentClient);
  window.client = client;
  var ps = window.prods.map(function (p) {
    console.log({
      p: p
    });
    var data = {
      item_id: p.id,
      name: p.name,
      uuid: p.uuid,
      net_price: p.net_price,
      vat_perc: p.vat_perc || Math.round(100 * (p.price1 / p.net_price - 1)),
      final_price: p.price1 * p.quantity,
      final_net_price: p.net_price * p.quantity,
      notes: p.noteText,
      price: p.price1,
      quantity: p.quantity
    };
    if (p.cotturaId) {
      data.variations = [{
        name: 'Cottura',
        value: p.cotturaV,
        variation_id: p.cotturaId,
        variation_value_id: p.cotturaI
      }];
    }
    if (p.category) {
      data.category_id = p.category.id;
      data.category_name = p.category.name;
    }
    return data;
  });
  var data = {
    email: JSON.parse(window.localStorage.currentClient).email,
    order: {
      order_items: ps,
      order_customer: {
        email: client.email,
        first_name: client.name,
        last_name: client.surname,
        mobile: client.telephone
      }
    }
  };
  console.log({
    data: data
  });
  $('#send-order').on('click', function () {
    if (!window.localStorage.timeSlot) {
      return window.alert('selezioni un orario di ritiro');
    }
    data.takeout_time = window.localStorage.timeSlot;
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
      action: 'registerOrder',
      data: data
    }, function (res) {
      client.orders = JSON.parse(res).Attributes.orders;
      window.localStorage.currentClient = JSON.stringify(client);
      var order = client.orders[client.orders.length - 1];
      window.localStorage.lastOrder = JSON.stringify(order);
      delete window.localStorage.currentOrder;
      window.localStorage.timeSlot_ = window.localStorage.timeSlot;
      delete window.localStorage.timeSlot;
      window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/checkout-landing.html';
    }, function (res) {
      // TODO: add this show message modal
      showMessage(messageError);
    });
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
  return "\n            <tr class=\"carrello-row-".concat(pid, "\">\n                <td>\n                    <span class=\"titolo-item\">").concat(name, "</span>\n                    <span class=\"note-item\">").concat(note, "</span>\n                    <span class=\"cottura-item\">").concat(cottura, "</span>\n                </td>\n                <td>\n                    <div class=\"input-group input-number-group\">\n                        <div class=\"input-group-button\">\n                            <span id=\"input-number-decrement-").concat(pid, "\" class=\"input-number-decrement input-number-decrement-").concat(pid, "\"><i class=\"las la-minus-square la-lg\"></i></span>\n                        </div>\n                        <input class=\"input-number\" style=\"width:1.5rem; font-size: 0.8rem!important;\" type=\"button\" value=\"").concat(quantity, "\" min=\"0\" max=\"30\">\n                        <div class=\"input-group-button\">\n                            <span id=\"input-number-increment-").concat(pid, "\" class=\"input-number-increment input-number-increment-").concat(pid, "\"><i class=\"las la-plus-square la-lg\"></i></span>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class=\"prezzo-item\">\u20AC <span class=\"prezzo-item-").concat(pid, "\">").concat(price, "</span></span>\n                </td>\n            </tr>\n");
};
var itemsCarrelloCheckout = function itemsCarrelloCheckout(name, note, cottura, quantity, price) {
  return "\n  \t<div class=\"checkout-summary-item align-middle\">\n\t\t<div class=\"item-name\">\n\t  \t\t<h1 class=\"titolo-item\">".concat(name, "</h1>\n            <p class=\"note-item\">").concat(note, "</p>\n            <p class=\"cottura-item\">").concat(cottura, "</p>\n\t  \t\t<p class=\"note-item\">Quantit\xE0: ").concat(quantity, "</p>\n\t\t</div>\n        <div class=\"item-price\">\n            <p class=\"prezzo-item \">\u20AC ").concat(price, "</p>\n        </div>\n  \t</div>\n");
};
var carrelloCheckoutUser = function carrelloCheckoutUser(carrello, count) {
  var total = 0;
  var prods = [];
  carrello.forEach(function (prod) {
    total += parseFloat(prod.final_price);
    var cottura = prod.variations ? prod.variations[0].value : '';
    prods.push(carrelloProd(prod.name, prod.notes, cottura, prod.quantity, prod.final_net_price));
  });
  return "\n<div class=\"clearfix\">\n  <div id=\"itens-carrello-checkout\">\n    ".concat(prods.join('\n'), "\n  </div>\n  \t<div class=\"checkout-summary-details\">\n\t    <div>\n\t      \t<h1 class=\"titolo-item\">TOTALE:</h1>\n\t    </div>\n\t    <div class=\"item-price\">\n\t      \t<h1 class=\"titolo-item\" id=\"checkout-total\">\u20AC ").concat(total.toLocaleString(), "</h1>\n\t    </div>\n\t</div>\n    <button type=\"button\" id=\"remove-").concat(count, "\" class=\"clear button hollow alert float-left\">Elimina</button>\n    <button type=\"button\" id=\"load-").concat(count, "\" class=\"button submit float-right\" hidden>Metti nel carrello e modifica</button>\n</div>\n");
};
var carrelloProd = function carrelloProd(name, notes, cottura, quantity, price) {
  return "\n<div class=\"checkout-summary-item align-middle\">\n  <div class=\"item-name\">\n    <h1 class=\"titolo-item\">".concat(name, "</h1>\n    <p class=\"note-item\">").concat(notes, "</p>\n    <p class=\"cottura-item\">").concat(cottura, "</p>\n    <p class=\"note-item\">Quantit\xE0: ").concat(quantity, "</p>\n  </div>\n  <div class=\"item-price\">\n    <p class=\"prezzo-item \">\u20AC ").concat(price, "</p>\n  </div>\n</div>\n");
};


/***/ })

}]);
//# sourceMappingURL=src_assets_js_checkout_js.js.map