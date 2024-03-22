const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const currentRoute = window.location.pathname.replace("/", "");
let product;


const getProductData = async () => {
    const request = await fetch('./data/data.json');
    const data = await request.json();
    
    let currentPageProduct = data.filter(el => currentRoute == el.id)[0]
    
    const fullImage = document.querySelector(".full-image-src").src = `${currentPageProduct.image}`;
    const image = document.querySelector(".product-route-image").style.backgroundImage = `url("${currentPageProduct.image}")`;
    const description = document.querySelector(".product-route-description > p").innerText = currentPageProduct.description;
    const status = document.querySelector(".price > .status").innerText = currentPageProduct.status;
    const name = document.querySelector(".product-route-name").innerText = currentPageProduct.name;
    const id = document.querySelector("#order").dataset.id = currentPageProduct.id;
}
// function orderPlaced() {
//     let btn = document.querySelector("a#order");
//     btn.dataset.OrderPlaced = "true";
// }
document.querySelector(".product-route-image").addEventListener("click", () => {
    document.querySelector(".full-image").dataset.full = true;
})
document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".full-image").dataset.full = false;
})
getProductData()