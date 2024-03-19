const navCollapse = document.querySelector('nav');
const navOpen = () => navCollapse.dataset.navCollapsed = "true"
const navClose = () => navCollapse.dataset.navCollapsed = "false"

document.querySelector(".logo-section > .logo").addEventListener("dblclick", () => {
    window.location.href = "/admin"
})