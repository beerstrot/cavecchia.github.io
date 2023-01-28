//hamburger menu
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu-hamburger");
const items = document.querySelectorAll(".item");

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
