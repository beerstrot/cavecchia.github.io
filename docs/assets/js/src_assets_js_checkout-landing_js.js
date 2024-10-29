(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_checkout-landing_js"],{

/***/ "./src/assets/js/checkout-landing.js":
/*!*******************************************!*\
  !*** ./src/assets/js/checkout-landing.js ***!
  \*******************************************/
/***/ (function() {

var mesi = 'gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre'.split(', ');
var weekdays = 'Domenica - Lunedì - Martedì - Mercoledì - Giovedì - Venerdì - Sabato'.split(' - ');
$(document).ready(function () {
  var _window$localStorage = window.localStorage,
    lastOrder = _window$localStorage.lastOrder,
    timeSlot_ = _window$localStorage.timeSlot_,
    currentClient = _window$localStorage.currentClient;
  $('#time1').html(timeSlot_);
  var client = JSON.parse(currentClient);
  var name = client.name + ' ' + client.surname;
  $('#name').html(name);
  $('#email').html(client.email);
  $('#telephone').html(client.telephone);
  var order = JSON.parse(lastOrder);
  window.order = order;
  var d = new Date(order.deliver_at);
  var wd = weekdays[d.getDay()];
  var day = d.getDate();
  var month = mesi[d.getMonth()];
  var year = d.getFullYear();
  $('#day').html("".concat(wd, ", ").concat(day, " ").concat(month, " ").concat(year));
  var lastOrderTitle = "Ordine del ".concat(d.getDate(), " ").concat(mesi[d.getMonth()], " ").concat(d.getFullYear());
  $('#order-title').html(lastOrderTitle);
});

/***/ })

}]);
//# sourceMappingURL=src_assets_js_checkout-landing_js.js.map