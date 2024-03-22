const shopLinks = document.querySelectorAll(".shop-link");
const main = document.querySelector(".container");
const navCol = document.querySelector('nav');
const shop = document.querySelector("#shop");
const body = document.querySelector(".wrap");

// shopLinks.forEach(shopLink => {
//     shopLink.addEventListener("click", () => {
//         if(main.dataset.translateY == "false") {
//             main.dataset.translateY = "true";
//             shop.dataset.up = "true";
//             body.dataset.main = "false";
//         } else {
//             main.dataset.translateY = "false";
//             shop.dataset.up = "false";
//             body.dataset.main = "true";

//         }
//         if(navCol.dataset.navCollapsed == "true") {
//             navCol.dataset.navCollapsed = "false";
//         }
//     })
// })