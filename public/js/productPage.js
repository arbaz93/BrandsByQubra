const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const currentRoute = window.location.pathname.replace("/", "");
let product;


const getProductData = async () => {
    const request = await fetch('./data/data.json');
    const data = await request.json();
    
    let currentPageProduct = data.filter(el => currentRoute == el.id)[0]
    
    const description = document.querySelector(".product-route-description > p").innerText = currentPageProduct.description;
    const status = document.querySelector(".price > .status").innerText = currentPageProduct.status;
    const name = document.querySelector(".product-route-name").innerText = currentPageProduct.name;
    const id = document.querySelector("#order").dataset.id = currentPageProduct.id;
}
function orderPlaced() {
    let btn = document.querySelector("a#order");
    btn.dataset.OrderPlaced = "true";
    console.log("loaded")
}
getProductData()
console.log(currentRoute)