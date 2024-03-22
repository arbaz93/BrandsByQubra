
const productSection = document.querySelector(".shop-items");
const links = document.querySelectorAll(".shop-link");
const sortBtns = document.querySelectorAll(".sort-btns > button");
const sidePane = document.querySelector(".selected-item");
let productsData = [];
async function getData() {
    const request = await fetch("./data/data.json"); //getting data
    const data = await request.json(); // converting requested data into JSON

    return data;
};

const appendData = () => {
    let html = '';
    getData().then(response => 
        {
        productsData = response;
        response.forEach(product => {
        const s = (product.status === "" || product.status === null) ? "none" : "block";             
        const template = `<div class="shop-item">
                    <p class="status" style="display:${s}">${product.status}</p>
                    <a href="/${product.id}"><img src="${product.image}" alt=""></a>
                    <div class="flex shop-item-data">
                        <div class="shop-item-info">
                                <p class="shop-item-name"><a href="/${product.id}">${product.name}</a></p>
                                <p class="shop-item-type">${product.type}</p>
                        </div>
                        <div class="shop-item-buy">
                            <p class="shop-item-price">${product.price}PKR</p>
                            <i class="fa-solid fa-cart-plus" onclick="addToCart(this)" data-id="${product.id}"></i>
                        </div>
                    </div>
                </div>`;
            html = html + template;
            })
            productSection.innerHTML = html;
    });
}
appendData()
const sortData = (type) => {
    let html = '';
    let sortedData = productsData.filter(d => {
        if(d.type == type) {
            return d;
        };
    })
    
sortedData.forEach(product => {
    const template = `<div class="shop-item">
                    <p class="status">${product.status}</p>
                    <a href="/${product.id}"><img src="${product.image}" alt=""></a>
                    <div class="flex shop-item-data">
                        <div class="shop-item-info">
                                <p class="shop-item-name"><a href="/${product.id}">${product.name}</a></p>
                                <p class="shop-item-type">${product.type}</p>
                        </div>
                        <div class="shop-item-buy">
                            <p class="shop-item-price">${product.price}PKR</p>
                            <i class="fa-solid fa-cart-plus" onclick="addToCart(this)" data-id="${product.id}"></i>
                        </div>
                    </div>
                </div>`;
        html = html + template;
        })
productSection.innerHTML = html;

}
links.forEach(link => {
    link.addEventListener("click", appendData);
});

document.querySelector("[data-option='All']").addEventListener('click', () => {
    appendData();
})
document.querySelector("[data-option='Bag']").addEventListener('click', () => {
    sortData("Bag");
})
document.querySelector("[data-option='Jewelery']").addEventListener('click', () => {
    sortData("Jewelery");
})
document.querySelector("[data-option='Accessory']").addEventListener('click', () => {
    sortData("Accessory");
})

