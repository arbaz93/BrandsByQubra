
const productSection = document.querySelector(".products");
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
        
        const template = `<article class="product flex">
                            <div id="product-img">
                            <div class="overlay ${product.status}"></div>
                                <a href="#">
                                    <img src="${product.image}">
                                </a>
                            </div>
                            <div class="flex product-data">
                                <div class="flex">
                                    <a href="#">
                                        <h4 id="product-heading" data-id=${product.id}>${product.name}</h4>
                                    </a>
                                    <p id="product-type">${product.type}</p>
                                </div>
                                <div class="flex">
                                    <p id="product-prize" class="uppercase">PKR${product.price}</p>
                                    <button class="cart"><i class=" fa-solid fa-cart-plus"></i></button>
                                </div>
                            </div>
                        </article>`;
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
    
    const template = `<article class="product flex">
                        <div id="product-img">
                        <div class="overlay ${product.status}"></div>
                            <a href="#">
                                <img src="${product.image}">
                            </a>
                        </div>
                        <div class="flex product-data">
                            <div class="flex">
                                <a href="#">
                                    <h4 id="product-heading">${product.name}</h4>
                                </a>
                                <p id="product-type">${product.type}</p>
                            </div>
                            <div class="flex">
                                <p id="product-prize" class="uppercase">PKR${product.price}</p>
                                <button class="cart"><i class=" fa-solid fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </article>`;
        html = html + template;
    });
    console.log(sortedData)
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

