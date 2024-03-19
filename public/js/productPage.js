const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const qty = document.querySelector("#qty");
const currentRoute = window.location.pathname.replace("/", "");
let product;
minusBtn.addEventListener('click', () => {
    if(qty.value > 1) {
        qty.value = Number(qty.value) - 1;
    }
})
plusBtn.addEventListener('click', () => {
    if(qty.value < 10) {
        qty.value = Number(qty.value) + 1;
    }
})

const getData = async () => {
    const request = await fetch('./data/data.json');
    const data = await request.json();
    
    let currentPageProduct = data.filter(el => currentRoute == el.id)[0]
    
    const description = document.querySelector(".product-route-description > p").innerText = currentPageProduct.description;
    const status = document.querySelector(".price > .status").innerText = currentPageProduct.status;
    const name = document.querySelector(".product-route-name").innerText = currentPageProduct.name;
    console.log(currentPageProduct)
}
getData()
console.log(currentRoute)