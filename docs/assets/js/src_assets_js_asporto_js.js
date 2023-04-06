"use strict";
(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_asporto_js"],{

/***/ "./src/assets/js/asporto.js":
/*!**********************************!*\
  !*** ./src/assets/js/asporto.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/assets/js/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

$(document).ready(function () {
  console.log('happen', _utils__WEBPACK_IMPORTED_MODULE_0__.bana);
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mkCall)('POST', {
    action: 'getItems',
    data: '--'
  }, function (res) {
    mkInterface(res);
  }, function (res) {
    showMessage(messageError);
  });
  // testeLambdaPOST();
});

function mkInterface(r) {
  window.rrr = r;
  var d = JSON.parse(r);
  var prods = d.items.results.filter(function (i) {
    return i.option1_value;
  });
  window.ppp = prods;
  mkMenu(prods);
}
function mkMenu(prods) {
  // const menu = $('#menupage-text').html('');
  // $('<div/>', { class: 'small-12 large-8 cell' })
  //   .appendTo(
  //     $('<div/>', { class: 'grid-x grid-margin-x' })
  //   ).appendTo(
  //     $('<div/>', { class: 'grid-container' })
  //   ).appendTo(menu);
  // const sections = ppp.map(i => i.option1_value)
  window.sss = [];
  prods.forEach(function (p) {
    var secDiv = $("h2:contains(\"".concat(p.option1_value, "\")")).parent().children('.grid-x');
    if (secDiv.length) {
      console.log('trovato!:', p.name);
      mkCell(p, secDiv);
      mkModal(p, secDiv);
    } else {
      console.log('non trovato:', p.name);
    }
    window.sss.push(secDiv);
  });
}
function getImgRoot() {
  var imgURL = 'https://www.beerstrot.it/cavecchia.github.io/assets/img/test/test-immagine1-1-1.jpg';
  var pieces = imgURL.split('/');
  var imgRoot = pieces.slice(0, pieces.length - 1).join('/');
  return imgRoot;
}
var IMG_ROOT = getImgRoot();
function mkCellSmall(p, cell) {
  var pid = p.name.replaceAll(' ', '');
  var pp = mkDiv('product-page', mkDiv('hide-for-medium', cell));
  // const imgName = p.name.replaceAll(' ', '') + '_quadrato.png';
  var imgName = 'test-immagine1-1-1.jpg';
  M('img', '', mkDiv('item-image', pp), {
    src: "".concat(IMG_ROOT, "/").concat(imgName),
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
  var pid = mkPid(p.name);
  var cs = mkDiv('card-section', mkDiv('card', mkDiv('show-for-medium', cell)));
  var imgName = 'test-immagine1-16-9.jpg';
  // const imgName = p.name.replaceAll(' ', '') + '_rettangolare.png';
  M('img', 'show-for-medium', cs, {
    src: "".concat(IMG_ROOT, "/").concat(imgName),
    alt: p.name
  });
  M('span', 'price', M('h3', '', cs).html(p.name)).html(p.price1);
  M('small', '', M('p', '', cs).html(p.description)).html(p.allergens.map(function (i) {
    return i.name;
  }).join(', '));
  M('button', 'button small', cs, {
    type: 'button',
    'data-open': pid
  }).html('Aggiungi al Carrello');
}
function mkModal(p, secDiv) {
  var pid = mkPid(p.name);
  var imgName = 'test-immagine1-16-9.jpg';
  // const imgName = pid + '_rettangolare.png';
  var modal = M('div', 'reveal reveal-ecommerce', secDiv, {
    id: pid
  });
  M('button', 'close-button close-button-sticky', modal, {
    type: 'button',
    'aria-label': 'Close reveal'
  }).append(M('span', '', null, {
    'aria-hidden': true
  }).html('&times;')).on('click', function () {
    modal.foundation('close');
  });
  M('img', '', modal, {
    src: "".concat(IMG_ROOT, "/").concat(imgName),
    alt: p.name
  });
  M('h1', 'h1-modal', M('header', 'main-header', modal)).html(p.name);
  var modalDiv = mkDiv('main-content', modal);
  M('small', 'allergeni', M('p', '', modalDiv).html(p.description)).html(p.allergens.map(function (i) {
    return i.name;
  }).join(', '));
  if (hasNote(p)) {
    M('textarea', '', M('label', '', modalDiv), {
      maxlength: '200',
      placeholder: '...',
      css: {
        'min-height': '0.5rem'
      }
    });
  }
  p.variations.forEach(function (v) {
    var name = v.name;
    if (name === 'note') return;
    var sel = M('select', '', M('label', '', modalDiv).html("<strong>".concat(name, "</strong>")));
    v.variation_values.forEach(function (vv) {
      M('option', '', sel, {
        value: vv.value
      });
    });
  });
  var footer = M('footer', 'main-footer-carrello-small', modal);
  var footerDiv = mkDiv('input-group input-number-group', footer);
  M('i', 'las la-minus-square la-2x', M('span', 'input-number-decrement', mkDiv('input-group-button group-margin', footerDiv)).click(function () {
    var $input = $(this).parents('.input-number-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    $input.val(val - 1);
  }));
  M('input', 'input-number group-margin', footerDiv, {
    css: {
      width: '3rem'
    },
    type: 'button',
    value: '2',
    min: '0',
    max: '30'
  });
  M('i', 'las la-plus-square la-2x', M('span', 'input-number-increment', mkDiv('input-group-button group-margin', footerDiv)).click(function () {
    var $input = $(this).parents('.input-number-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    $input.val(val + 1);
  }));
  M('span', 'price', M('button', 'button expanded-with-padding extra-space-button-modal', footer, {
    type: 'button'
  }).html('Aggiungi al carrello')).html(" \u20AC ".concat(p.price));
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
function mkPid(name) {
  return name.replaceAll(' ', '').replaceAll("'", '');
}
function hasNote(p) {
  return p.variations.map(function (p) {
    return p.name;
  }).includes('note');
}

/***/ }),

/***/ "./src/assets/js/utils.js":
/*!********************************!*\
  !*** ./src/assets/js/utils.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bana": function() { return /* binding */ bana; },
/* harmony export */   "mkCall": function() { return /* binding */ mkCall; },
/* harmony export */   "testeLambda": function() { return /* binding */ testeLambda; },
/* harmony export */   "testeLambdaGET": function() { return /* binding */ testeLambdaGET; },
/* harmony export */   "testeLambdaPOST": function() { return /* binding */ testeLambdaPOST; }
/* harmony export */ });
// beerstrot-prod:
// const url = 'https://6nw3zi6sbkph6dledhd4op3mvq0aaduw.lambda-url.eu-central-1.on.aws/';
var url = 'http://localhost:5002/entry';
var pCount = 0;
function mkCall(type, data, success, error) {
  if (!['POST', 'GET'].includes(type)) return console.log("this ajax method is not good: ".concat(type));
  var set = {
    crossDomain: true,
    url: url,
    type: type,
    data: data,
    success: success,
    error: error,
    beforeSend: function beforeSend() {
      pCount++;
      $('#loading').show();
    },
    complete: function complete() {
      if (--pCount === 0) $('#loading').hide();
    }
  };
  if (type === 'POST') {
    set.data = JSON.stringify(set.data);
    if (url.split('/').reverse()[0] === 'entry') {
      set.contentType = 'application/json; charset=utf-8';
    }
  }
  $.ajax(set);
}
function testeLambdaPOST() {
  mkCall('POST', {
    action: 'test',
    data: {
      hey: 'man',
      nums: [5, 6, 7],
      jac: {
        33: 44,
        l: ['asd', 'ewq', 66]
      }
    }
  }, function (res) {
    return console.log('POST success:', res);
  }, function (res) {
    return console.log('POST error:', res);
  });
}
function testeLambdaGET() {
  mkCall('GET', {
    action: 'test',
    data: 'a get arg'
  }, function (res) {
    return console.log('GET success:', res);
  }, function (res) {
    return console.log('GET error:', res);
  });
}
function testeLambda() {
  testeLambdaGET();
  testeLambdaPOST();
}
var bana = 55;


/***/ })

}]);
//# sourceMappingURL=src_assets_js_asporto_js.js.map