"use strict";
(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_asporto_js"],{

/***/ "./src/assets/js/asporto.js":
/*!**********************************!*\
  !*** ./src/assets/js/asporto.js ***!
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


$(document).ready(function () {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
    action: 'getItems',
    data: '--'
  }, function (res) {
    mkInterface(res);
  }, function (res) {
    // TODO: add this show message modal
    showMessage(messageError);
  });
  // testeLambdaPOST();
});

function mkInterface(r) {
  var d = JSON.parse(r);
  var prods = d.items.results.filter(function (i) {
    return i.option1_value;
  }) // if has subcategory
  .filter(function (i) {
    return i.channels.map(function (j) {
      return j.channel_id;
    }).includes('sitoWebAsporto');
  }) // if has channel asporto
  .filter(function (i) {
    return i.on_sale;
  }); // if is on sale
  mkMenu(prods);
  $('#vai-checkout-large').off('click').on('click', function () {
    if (window.localStorage.currentClient) {
      window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/checkout.html';
    } else {
      $('#signup-login').foundation('open');
    }
  });
  $('#vai-checkout-small').off('click').on('click', function () {
    if (window.localStorage.currentClient) {
      window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/checkout.html';
    } else {
      $('#signup-login').foundation('open');
    }
  });
}
function mkMenu(prods) {
  window.allProducts = prods;
  $('h2').parent().children('.grid-x').html('');
  prods.forEach(function (p) {
    p.quantity = 0;
    var secDiv = $("h2:contains(\"".concat(p.option1_value, "\")")).parent().children('.grid-x');
    if (secDiv.length) {
      mkCell(p, secDiv);
      mkModal(p, secDiv);
    } else {
      console.log('sezione non trovata per il prodotto:', p.name);
    }
  });
  $('#carrelloPieno').hide();
  $('#carrelloPiccoloPieno').hide();
  checkStoredOrder();
  setRegister();
  getClosedTimeslots();
}
function getImgRoot() {
  // const imgURL = 'https://www.beerstrot.it/cavecchia.github.io/assets/img/test/test-immagine1-1-1.jpg';
  // const imgURL = window.location.origin + '/' + 'assets/img/prod/'
  // const pieces = imgURL.split('/');
  // const imgRoot = pieces.slice(0, pieces.length - 1).join('/');

  var imgRoot = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/assets/img/prod/';
  // const imgRoot = window.location.origin + '/' + 'assets/img/prod/';
  return imgRoot;
}
var IMG_ROOT = getImgRoot();
function mkCellSmall(p, cell) {
  var pid = mkPid(p);
  var pp = mkDiv('product-page', mkDiv('hide-for-medium', cell));
  var imgName = pid + '_quadrato.jpg';
  // const imgName = 'test-immagine1-1-1.jpg';
  M('img', '', mkDiv('item-image', pp), {
    src: "".concat(IMG_ROOT).concat(imgName),
    onerror: "this.style.display='none'",
    alt: p.name
  });
  var tDiv = mkDiv('item-text', pp);
  M('span', 'price', M('h3', '', tDiv).html(p.name)).html(p.price1);
  M('p', '', tDiv).html(p.description);
  M('button', 'button small', mkDiv('item-button', pp), {
    type: 'button',
    'data-open': pid,
    css: {
      'margin-bottom': 0
    }
  }).html('Aggiungi al Carrello');
}
function mkCellMedium(p, cell) {
  var pid = mkPid(p);
  var cs = mkDiv('card-section', mkDiv('card', mkDiv('show-for-medium', cell)));
  // const imgName = 'test-immagine1-16-9.jpg';
  var imgName = pid + '_rettangolare.jpg';
  M('img', 'show-for-medium', cs, {
    src: "".concat(IMG_ROOT).concat(imgName),
    onerror: "this.style.display='none'",
    alt: p.name
  });
  M('span', 'price', M('h3', '', cs).html(p.name)).html(p.price1);
  M('small', '', M('p', '', cs).html(p.description)).html('Allergeni: ' + p.allergens.map(function (i) {
    return i.name;
  }).join(', '));
  M('button', 'button small', cs, {
    type: 'button',
    'data-open': pid
  }).html('Aggiungi al Carrello');
}
function mkModal(p, secDiv) {
  var pid = mkPid(p);
  // const imgName = 'test-immagine1-16-9.jpg';
  var imgName = pid + '_rettangolare.jpg';
  var modal = M('div', 'reveal reveal-ecommerce', secDiv, {
    id: pid
  });
  var closeBtn = M('button', 'close-button close-button-sticky', modal, {
    type: 'button',
    'aria-label': 'Close reveal'
  }).append(M('span', '', null, {
    'aria-hidden': true
  }).html('&times;')).on('click', function () {
    modal.foundation('close');
  });
  M('img', '', modal, {
    src: "".concat(IMG_ROOT).concat(imgName),
    // onerror: "this.style.display='none'",
    alt: p.name
  });
  M('h1', 'h1-modal', M('header', 'main-header', modal)).html(p.name);
  var modalDiv = mkDiv('main-content', modal);
  M('p', 'allergeni', M('small', '', modalDiv).html(p.description)).html('Allergeni: ' + p.allergens.map(function (i) {
    return i.name;
  }).join(', '));
  var noteText = M('textarea', '', M('label', '', modalDiv, {
    id: pid + '_note'
  }), {
    maxlength: '200',
    placeholder: '...',
    css: {
      'min-height': '0.5rem'
    }
  });
  if (!hasNote(p)) {
    $('#' + pid + '_note').hide();
  }
  var cottura = M('select', '', M('label', '', modalDiv, {
    id: pid + '_cottura'
  }).html("<strong>Cottura</strong>"), {
    id: pid + 'cottura_',
    'data-variation_id': getCotturaId(p)
  });
  var v = hasCottura(p);
  v.forEach(function (vv) {
    M('option', '', cottura, {
      value: vv.id
    }).html(vv.value);
  });
  if (v.length === 0) {
    $('#' + pid + '_cottura').hide();
  }
  var footer = M('footer', 'main-footer-carrello-small', modal);
  var footerDiv = mkDiv('input-group input-number-group', footer);
  var quantity = 1;
  var price = quantity * p.price1;
  M('i', 'las la-minus-square la-2x', M('span', 'input-number-decrement', mkDiv('input-group-button group-margin', footerDiv)).click(function () {
    var $input = $(this).parents('.input-number-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    quantity = val - 1;
    if (quantity < 0) {
      quantity = 0;
    }
    $input.val(quantity);
    placePrice(quantity);
  }));
  M('input', 'input-number group-margin', footerDiv, {
    css: {
      width: '3rem'
    },
    type: 'button',
    value: '1',
    min: '0',
    max: '20'
  });
  M('i', 'las la-plus-square la-2x', M('span', 'input-number-increment', mkDiv('input-group-button group-margin', footerDiv)).click(function () {
    var $input = $(this).parents('.input-number-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    quantity = val + 1;
    $input.val(quantity);
    placePrice(quantity);
  }));
  var btnPrice = M('span', 'price', M('button', 'button expanded-with-padding extra-space-button-modal', footer, {
    type: 'button'
  }).html('Aggiungi al carrello').on('click', function () {
    $(".carrello-row-".concat(pid)).remove();
    p.quantity = quantity;
    p.noteText = noteText.val();
    if (quantity) {
      var cotturaV = $('#' + pid + 'cottura_ option:selected').text();
      var cotturaI = $('#' + pid + 'cottura_ option:selected').val();
      p.cotturaV = cotturaV;
      p.cotturaI = cotturaI;
      p.cotturaId = $('#' + pid + 'cottura_').data().variation_id;
      var template = (0,_htmlTemplates__WEBPACK_IMPORTED_MODULE_1__.itemsCarrelloTable)(p.name, p.noteText, p.cotturaV, p.quantity, price, pid);
      $('.itens-carrello-table').append(template);
    }
    updateTotal();
    $('.input-number-increment-' + pid).click(function () {
      var $input = $(this).parents('.input-number-group').find('.input-number');
      var val = parseInt($input.val(), 10);
      $input.val(val + 1);
      p.quantity = val + 1;
      $('.prezzo-item-' + pid).html((val + 1) * p.price1);
      updateTotal();
    });
    $('.input-number-decrement-' + pid).click(function () {
      var $input = $(this).parents('.input-number-group').find('.input-number');
      var val = parseInt($input.val(), 10);
      var v = val - 1;
      if (v < 0) {
        v = 0;
      }
      $input.val(v);
      p.quantity = v;
      $('.prezzo-item-' + pid).html(v * p.price1);
      updateTotal();
    });
    closeBtn.click();
  })).html(" \u20AC ".concat(price));
  function placePrice(quantity) {
    price = p.price1 * quantity;
    btnPrice.html(" \u20AC ".concat(price));
  }
  new Foundation.Reveal(modal.foundation());
}
function mkCell(p, secDiv) {
  var cell = mkDiv('cell cellmann', secDiv);
  mkCellSmall(p, cell);
  mkCellMedium(p, cell);
}
function mkDiv(class_, parent_) {
  return M('div', class_, parent_);
}
function M() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var class_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var parent_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var attrs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var e = $("<".concat(el, "/>"), _objectSpread({
    class: class_ || ''
  }, attrs || {}));
  if (parent_) {
    e.appendTo(parent_);
  }
  return e;
}
function mkPid(p) {
  return p.name.replaceAll(' ', '').replaceAll("'", '');
}
function hasNote(p) {
  return p.variations.map(function (p) {
    return p.name;
  }).includes('note');
}
function hasCottura(p) {
  var cot = p.variations.filter(function (i) {
    return i.name === 'Cottura';
  })[0];
  if (cot) {
    return cot.variation_values;
  }
  return [];
}
function updateTotal() {
  var prods = window.allProducts.filter(function (p) {
    return p.quantity;
  });
  window.localStorage.currentOrder = JSON.stringify(prods);
  var total = prods.reduce(function (a, p) {
    return a + p.quantity * p.price1;
  }, 0);
  if (total === 0) {
    $('#carrelloPieno').hide();
    $('#carrelloVuoto').show();
    $('#carrelloPiccoloPieno').hide();
    $('#carrelloPiccoloVuoto').show();
  } else {
    $('#carrelloPieno').show();
    $('#carrelloVuoto').hide();
    $('#carrelloPiccoloPieno').show();
    $('#carrelloPiccoloVuoto').hide();
  }
  $('.carrello-table-totale').text("\u20AC ".concat(total.toLocaleString()));
  var quantity = prods.reduce(function (a, p) {
    return a + p.quantity;
  }, 0);
  $('.prod-quantity').text("\u20AC ".concat(quantity));
}
function checkStoredOrder() {
  var storage = window.localStorage.currentOrder;
  if (!storage) return;
  var prods = JSON.parse(storage);
  if (prods) {
    prods.forEach(function (p) {
      var prod = window.allProducts.filter(function (pp) {
        return pp.id === p.id;
      });
      if (prod.length) {
        var p_ = prod[0];
        p_.quantity = p.quantity;
        p_.noteText = p.noteText;
        p_.cotturaV = p.cotturaV || '';
        var price = p.quantity * p.price1;
        var pid = mkPid(p);
        var template = (0,_htmlTemplates__WEBPACK_IMPORTED_MODULE_1__.itemsCarrelloTable)(p.name, p.noteText, p.cotturaV, p.quantity, price, pid);
        $('.itens-carrello-table').append(template);
        // $('#carrello-small-items').append(template);
        $('.input-number-increment-' + pid).click(function () {
          var $input = $(this).parents('.input-number-group').find('.input-number');
          var val = parseInt($input.val(), 10);
          $input.val(val + 1);
          p_.quantity = val + 1;
          $('.prezzo-item-' + pid).html((val + 1) * p.price1);
          updateTotal();
        });
        $('.input-number-decrement-' + pid).click(function () {
          var $input = $(this).parents('.input-number-group').find('.input-number');
          var val = parseInt($input.val(), 10);
          var v = val - 1;
          if (v < 0) {
            v = 0;
          }
          $input.val(v);
          p_.quantity = v;
          $('.prezzo-item-' + pid).html(v * p.price1);
          updateTotal();
        });
      }
    });
  }
  updateTotal();
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
    });
  });
  if (window.localStorage.timeSlot) {
    $("button:contains(\"".concat(window.localStorage.timeSlot, "\")")).click();
  }
}
function getCotturaId(p) {
  var cot = p.variations.filter(function (i) {
    return i.name === 'Cottura';
  })[0];
  if (cot) {
    return cot.id;
  }
  return undefined;
}
function setRegister() {
  $('#register-btn').off('click').on('click', function () {
    var data = {};
    var get = function get(id) {
      data[id] = $("#".concat(id)).val();
    };
    ['name', 'surname', 'telephone', 'email', 'password'].forEach(function (i) {
      return get(i);
    });
    data.newsletter = $('#newsletter').is(":checked");
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
      action: 'registerClient',
      data: data
    }, function (res) {
      window.alert('Il tuo registro è andato a buon fine.');
      window.localStorage.currentClient = JSON.stringify(data);
      window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/checkout.html';
    }, function (res) {
      // TODO: add this show message modal
      showMessage(messageError);
    });
  });
}
function setLogin() {
  $('#login-btn').off('click').on('click', function () {
    var data = {};
    var get = function get(id) {
      data[id] = $("#".concat(id, "-login")).val();
    };
    ['email', 'password'].forEach(function (i) {
      return get(i);
    });
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
      action: 'login',
      data: data
    }, function (res) {
      if (!res.result) return alert(res.details);
      window.localStorage.currentClient = JSON.stringify(res.details);
      window.location.href = _utils__WEBPACK_IMPORTED_MODULE_0__.ORIGIN + '/checkout.html';
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
//# sourceMappingURL=src_assets_js_asporto_js.js.map