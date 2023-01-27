(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_navbar_js"],{

/***/ "./src/assets/js/navbar.js":
/*!*********************************!*\
  !*** ./src/assets/js/navbar.js ***!
  \*********************************/
/***/ (function() {

//hamburger menu
var toggle = document.querySelector(".toggle");
var menu = document.querySelector(".menu1");
var items = document.querySelectorAll(".item");
/* Toggle mobile menu */

function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='las la-bars la-2x'></i>";
  } else {
    menu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='las la-times la-2x'></i>";
  }
}
/* Event Listeners */


toggle.addEventListener("click", toggleMenu, false);

/***/ })

}]);
//# sourceMappingURL=src_assets_js_navbar_js.js.map