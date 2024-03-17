
const productSection = document.querySelector(".products");
const links = document.querySelectorAll(".shop-link");
const sortBtns = document.querySelectorAll(".sort-btns > button");
let productsData = [];
let pHeading = [];
async function getData() {
    const request = await fetch("/data/data.json"); //getting data
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
            pHeading = document.querySelectorAll("#product-heading");
            addingEventListenerToProductHeadings();
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

const putDataInSidePane = target => {
    const targetId = target.dataset.id;
    productsData.map(data => {
        if (data.id == targetId) {
            const image = document.querySelector(".selected-item-image > img").src = data.image;
            const heading = document.querySelector(".selected-item-heading > h4").innerHTML = data.name;
            const description = document.querySelector(".selected-item-description > p").innerHTML = data.description;
            console.log(data)

        }
    })
}
let addingEventListenerToProductHeadings = () => {
    pHeading.forEach(heading => {
        heading.addEventListener("click", () => {
            putDataInSidePane(heading);
        })
    })
}
let qty = document.querySelector("#qty");
document.querySelector(".minus").addEventListener('click', () => {
    if(qty.value > 1) {
        qty.value = Number(qty.value) - 1;
    }
})
document.querySelector(".plus").addEventListener('click', () => {
    if(qty.value < 99) {
        qty.value = Number(qty.value) + 1;
    }
})