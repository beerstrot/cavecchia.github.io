(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_accordion_js"],{

/***/ "./src/assets/js/accordion.js":
/*!************************************!*\
  !*** ./src/assets/js/accordion.js ***!
  \************************************/
/***/ (function() {

var headers = document.getElementsByClassName("header-accordion"),
    contents = document.getElementsByClassName("content-accordion"),
    icons = document.getElementsByClassName("icon-accordion");

var _loop = function _loop(i) {
  headers[i].addEventListener("click", function () {
    for (var j = 0; j < contents.length; j++) {
      if (i == j) {
        contents[j].style.display = contents[j].style.display == "block" ? "none" : "block";
        icons[j].innerHTML = contents[j].style.display == "block" ? "&minus;" : "&plus;";
      } else {
        contents[j].style.display = "none";
        icons[j].innerHTML = "&plus;";
      }
    }
  });
};

for (var i = 0; i < headers.length; i++) {
  _loop(i);
}

/***/ })

}]);
//# sourceMappingURL=src_assets_js_accordion_js.js.map