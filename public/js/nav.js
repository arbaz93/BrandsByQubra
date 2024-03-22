const navCollapse = document.querySelector('nav');
const navOpen = () => navCollapse.dataset.navCollapsed = "true"
const navClose = () => navCollapse.dataset.navCollapsed = "false"
document.querySelector(".nav-mobile .shop-link").addEventListener("click", () => {
    navClose();
})
document.querySelector("footer span").addEventListener("dblclick", () => {
    window.location.href = "/admin"
})