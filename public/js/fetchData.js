
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

        let span = Math.floor(Math.random() * 10);
        let url = product.image;
        const template = `<div class="shop-item span-${span}" style="background-image: url('${url}')">
                    <p class="status">${product.status}</p>
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
const sortData = (type) => {
    let html = '';
    let sortedData = productsData.filter(d => {
        if(d.type == type) {
            return d;
        };
    })
    
sortedData.forEach(product => {
    let span = Math.floor(Math.random() * 10);
    const template = `<div class="shop-item span-${span}" style="background-image: url('${product.image}')">
                    <p class="status">${product.status}</p>
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

