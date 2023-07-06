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


$(document).ready(function () {
  window.user = JSON.parse(window.localStorage.currentClient);
  $('#logout-btn').on('click', function () {
    delete window.localStorage.currentClient;
    window.location.href = '/index.html';
  });
  setUserData();
  setUpdate();
  setPreviousOrders();
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
    console.log('click make me');
    ['name', 'surname', 'telephone', 'email'].forEach(function (i) {
      return get(i);
    });
    data.newsletter = $('#newsletter').is(":checked");
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
      action: 'updateClient',
      data: data
    }, function (res) {
      console.log({
        res: res
      });
      ['name', 'surname', 'telephone', 'email'].forEach(function (i) {
        window.user[i] = $("#".concat(i, "-m")).val();
      });
      window.localStorage.currentClient = JSON.stringify(window.user);
      window.location.href = '/account.html';
    }, function (res) {
      // TODO: add this show message modal
      showMessage(messageError);
    });
  });
}
function setPreviousOrders() {
  var mesi = 'gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre'.split(', ');
  // const temp = carrelliCheckoutUser(user.orders);
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
    $('#remove-' + count).show();
    $('#load-' + count).show();
  });
  // const li = $('<li/>', { class: 'accordion-item ordine-salvato-item', 'data-accordion-item': true }).appendTo($('#carrelli-accordion'));
  // $('<a/>', { class: 'accordion-title', href: '#dummy' }).html('ordine dummy').appendTo(li);
  // $('<div/>', { class: 'accordion-content ordine-salvato-content clearfix', 'data-tab-content': true, id: 'dummy' }).appendTo(li).html('AOSIDJASOISDJ');
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
    prods.push(carrelloProd(prod.name, prod.notes, cottura, prod.quantity, prod.final_net_price));
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