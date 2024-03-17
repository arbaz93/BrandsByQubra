const navCollapse = document.querySelector('nav');
const navOpen = () => navCollapse.dataset.navCollapsed = "true"
const navClose = () => navCollapse.dataset.navCollapsed = "false"