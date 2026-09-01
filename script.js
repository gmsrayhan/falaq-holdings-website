// Falaq Holdings Ltd.
// Corporate Website JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // Mobile Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (nav) nav.classList.remove("active");
            if (menuToggle) menuToggle.classList.remove("active");
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
