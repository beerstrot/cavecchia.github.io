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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


var _require = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js"),
  uuidv4 = _require.v4;
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
  /* Costruttore del menù */
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
  }).html('Seleziona');
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
  }).html('Seleziona');
}
function cleanCurrentOrder() {
  var productsOrdered = JSON.parse(window.localStorage.currentOrder || '[]');
  // Ciclo inverso per evitare problemi di indicizzazione dopo la rimozione
  for (var i = productsOrdered.length - 1; i >= 0; i--) {
    if (!productsOrdered[i].rowUuid) {
      productsOrdered.splice(i, 1);
    }
  }
  window.localStorage.currentOrder = JSON.stringify(productsOrdered);
}
function updateCartTotals() {
  var productsOrdered = JSON.parse(window.localStorage.currentOrder || '[]');
  var totalPrice = 0;
  productsOrdered.forEach(function (product) {
    totalPrice += product.quantity * product.price1;
  });
  if (totalPrice === 0) {
    $('#carrelloPieno').hide();
    $('#carrelloVuoto').show();
    $('#carrelloPiccoloPieno').hide();
    $('#carrelloPiccoloVuoto').show();
    $('#vai-checkout-large, #vai-checkout-small').prop('disabled', true);
  } else {
    $('#carrelloPieno').show();
    $('#carrelloVuoto').hide();
    $('#carrelloPiccoloPieno').show();
    $('#carrelloPiccoloVuoto').hide();
    $('#vai-checkout-large, #vai-checkout-small').prop('disabled', false);
  }
  //prezzo carrello e nr prodotti carrello
  $('.carrello-table-totale').html(" &nbsp;&nbsp;\u20AC&ensp;".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(totalPrice)));
  var totalQuantity = 0;
  productsOrdered.forEach(function (product) {
    totalQuantity += product.quantity;
  });
  $('.prod-quantity').html(" &nbsp;".concat(totalQuantity));
}
function addProductIntoCurrentOrder(product_id, product_cotturaV, product_quantity, row_uuid) {
  var product = {};
  window.allProducts.forEach(function (prod) {
    if (prod.id === product_id) {
      product = prod;
      return;
    }
  });
  product.cotturaV = product_cotturaV;
  product.quantity = product_quantity;
  product.rowUuid = row_uuid;
  var existingOrder = JSON.parse(window.localStorage.currentOrder || '[]');
  var newCurrentOrder = [];
  if (existingOrder.length === 0) {
    newCurrentOrder.push(product);
    window.localStorage.currentOrder = JSON.stringify(newCurrentOrder);
    return;
  }
  var isNewProductPresentIntoOrder = false;
  var _iterator = _createForOfIteratorHelper(existingOrder),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var productOrdered = _step.value;
      if (productOrdered.rowUuid == product.rowUuid) {
        isNewProductPresentIntoOrder = true;
        newCurrentOrder.push(product);
      } else {
        newCurrentOrder.push(productOrdered);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (!isNewProductPresentIntoOrder) {
    newCurrentOrder.push(product);
  }
  window.localStorage.currentOrder = JSON.stringify(newCurrentOrder);
}
function UpdateProductIntoCurrentOrder(nextQuantity, rowUuid) {
  var productsOrdered = JSON.parse(window.localStorage.currentOrder || '[]');

  // Ciclo inverso per evitare problemi di indicizzazione dopo la rimozione
  for (var i = productsOrdered.length - 1; i >= 0; i--) {
    var product = productsOrdered[i];
    if (!product.rowUuid) {
      productsOrdered.splice(i, 1);
    }
    if (product.rowUuid === rowUuid) {
      if (nextQuantity > 0) {
        product.quantity = nextQuantity;
      } else {
        productsOrdered.splice(i, 1);
      }
    }
  }
  window.localStorage.currentOrder = JSON.stringify(productsOrdered);
}
function resetModalsInput() {
  $('.modal-input-number').val(1);
  $('.modal-input-note').val('');
  $('.extra-space-button-modal').each(function () {
    var pid = $(this).closest('.reveal').attr('id');
    var p = window.allProducts.find(function (product) {
      return mkPid(product) === pid;
    });
    if (p) {
      $(this).find('.price').html("&nbsp;&nbsp;&nbsp;\u20AC&thinsp;".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(p.price1)));
    }
  });
}
var addToCart = function addToCart(p, quantity, noteText, pid, price, cotturaV, cotturaI) {
  p.quantity = quantity;
  p.noteText = noteText.val();
  p.rowUuid = uuidv4();
  if (quantity) {
    p.cotturaV = cotturaV;
    p.cotturaI = cotturaI;
    p.cotturaId = $('#' + pid + 'cottura_').data().variation_id;
    var template = (0,_htmlTemplates__WEBPACK_IMPORTED_MODULE_1__.itemsCarrelloTable)(p.name, p.noteText, p.cotturaV, p.quantity, price, p.id, p.rowUuid);
    $('.itens-carrello-table').append(template);
  }
  addProductIntoCurrentOrder(p.id, p.cotturaV, p.quantity, p.rowUuid);
  updateCartTotals();
  resetModalsInput();
  $(".input-number-increment-".concat(p.rowUuid)).click(function () {
    var rowUuid = $(this).data('row-uuid');
    var $input = $(".input-number-".concat(rowUuid));
    var currentQuantity = parseInt($input.val(), 10);
    $input.val(currentQuantity + 1);
    var nextQuantity = currentQuantity + 1;
    $(".prezzo-item-".concat(rowUuid)).html((0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(nextQuantity * p.price1));
    UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
    updateCartTotals();
  });
  $(".input-number-decrement-".concat(p.rowUuid)).click(function () {
    var rowUuid = $(this).data('row-uuid');
    var $input = $(".input-number-".concat(rowUuid));
    var currentQuantity = parseInt($input.val(), 10);
    var nextQuantity = currentQuantity - 1;
    if (nextQuantity < 0) {
      nextQuantity = 0;
    }
    $input.val(nextQuantity);
    $(".prezzo-item-".concat(rowUuid)).html((0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(nextQuantity * p.price1));
    if (nextQuantity === 0) {
      $(".carrello-row-".concat(rowUuid)).remove();
    }
    UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
    updateCartTotals();
  });
};
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
    style: 'margin-top:-3rem',
    onerror: "this.style.display='none'",
    alt: p.name
  });
  M('h1', 'h1-modal', M('header', 'main-header', modal)).html(p.name);
  var modalDiv = mkDiv('main-content', modal);
  M('p', 'allergeni', M('small', '', modalDiv).html(p.description)).html('Allergeni: ' + p.allergens.map(function (i) {
    return i.name;
  }).join(', '), {
    maxlength: '200',
    css: {
      'min-height': '0.5rem'
    }
  });
  var noteText = M('textarea', 'modal-input-note', M('label', '', modalDiv, {
    id: pid + '_note'
  }).html("<strong>Note</strong>"), {
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
  var footer = M('footer', 'main-footer-carrello-small border-shadow', modal);
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
  M('input', 'input-number group-margin modal-input-number', footerDiv, {
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
    var selectedQuantity = parseInt($("#".concat(pid, " .modal-input-number")).val(), 10);
    var currentPrice = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(p.price1 * selectedQuantity);
    var cotturaV = $('#' + pid + 'cottura_ option:selected').text();
    var cotturaI = $('#' + pid + 'cottura_ option:selected').val();
    var cottura_id = $('#' + pid + 'cottura_').data().variation_id;
    addToCart(p, selectedQuantity, noteText, pid, currentPrice, cotturaV, cotturaI);
    closeBtn.click();
  })
  //modal price
  ).html(" &nbsp;&nbsp;&nbsp;\u20AC&thinsp;".concat(price));
  function placePrice(quantity) {
    price = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(p.price1 * quantity);
    btnPrice.html(" &nbsp;&nbsp;&nbsp;\u20AC&thinsp;".concat(price));
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
function checkStoredOrder() {
  cleanCurrentOrder();
  var storage = window.localStorage.currentOrder;
  if (!storage) return;
  var prods = JSON.parse(storage);
  if (prods) {
    prods.forEach(function (p) {
      var prod = window.allProducts.filter(function (pp) {
        return pp.id === p.id;
      });
      if (p.rowUuid) {
        if (prod.length) {
          var p_ = prod[0];
          p_.quantity = p.quantity;
          p_.noteText = p.noteText;
          p_.rowUuid = p.rowUuid;
          p_.cotturaV = p.cotturaV || '';
          var price = p.quantity * p.price1;
          var pid = mkPid(p);
          var template = (0,_htmlTemplates__WEBPACK_IMPORTED_MODULE_1__.itemsCarrelloTable)(p.name, p.noteText, p.cotturaV, p.quantity, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(price), p.id, p_.rowUuid);
          $('.itens-carrello-table').append(template);
          //          $('#carrello-small-items').append(template);

          $(".input-number-increment-".concat(p_.rowUuid)).click(function () {
            var rowUuid = $(this).data('row-uuid');
            var $input = $(".input-number-".concat(rowUuid));
            var currentQuantity = parseInt($input.val(), 10);
            $input.val(currentQuantity + 1);
            var nextQuantity = currentQuantity + 1;
            p_.quantity = nextQuantity;
            $(".prezzo-item-".concat(rowUuid)).html((0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(nextQuantity * p.price1));
            UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
            updateCartTotals();
          });
          $(".input-number-decrement-".concat(p_.rowUuid)).click(function () {
            var rowUuid = $(this).data('row-uuid');
            var $input = $(".input-number-".concat(rowUuid));
            var currentQuantity = parseInt($input.val(), 10);
            var nextQuantity = currentQuantity - 1;
            if (nextQuantity < 0) {
              nextQuantity = 0;
            }
            $input.val(nextQuantity);
            $(".prezzo-item-".concat(rowUuid)).html((0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatNum)(nextQuantity * p.price1));
            if (nextQuantity === 0) {
              $(".carrello-row-".concat(rowUuid)).remove();
            }
            UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
            updateCartTotals();
          });
        }
      } else {
        cleanCurrentOrder();
      }
    });
  }
  updateCartTotals();
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
  /*
  const d_ = new Date();
  const diff = 15; // minutes
  const d = new Date(d_.getTime() + diff * 60000);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const o = d.getTimezoneOffset();
  const h_ = h - Math.round(o / 60);
  const t = `${h_}:${m}`;
  */
  var cells = $('.orario-btn');
  cells.each(function () {
    var cell = $(this);
    var text = cell.text();
    var isEnabled = !window.closedTimeslots.has(text); // && (text > t);
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

/***/ })

}]);
//# sourceMappingURL=src_assets_js_asporto_js.js.map