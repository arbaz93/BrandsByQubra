const cartBtn = document.querySelector(".cart-btn");
const cartMenuStatus = document.querySelector(".cart-icon");
const links = document.querySelectorAll(".shop-link");
const cartItems = document.querySelector(".cart-items");
const orderItems = document.querySelector(".order-items");
const totalPrice = document.querySelector(".total-price");
const orderMessage = document.querySelector("#message");

let allProducts;
let cart = [];
let order;
cartBtn.addEventListener("click", () => {
    if(cartMenuStatus.dataset.menuOpen == "false") {
        cartMenuStatus.dataset.menuOpen = "true";
    } else {
        cartMenuStatus.dataset.menuOpen = "false";
    }
    console.log("loaded")
});
const getData = async () => {
    const request = await fetch('./data/data.json');
    const data = await request.json();
    allProducts = data;
}
const checkWheatherCartIsEmpty = () => {
    if(window.sessionStorage.getItem("bbQubraCart") == null || window.sessionStorage.getItem("bbQubraCart") ==  '[]') {
        document.querySelector(".cart-icon").dataset.cartHidden = "true"
    } else {
        document.querySelector(".cart-icon").dataset.cartHidden = "false"
    }
}
const updateCart = () => {
    let data = JSON.parse(window.sessionStorage.getItem("bbQubraCart"));
    let html = '';
    let price = 0;
    if (data != null) {
    data.forEach(d => {
        cart.push(d)
        const template = `<div class="cart-item">
                        <img class="cart-item-image" src="${d.image}" alt="">
                        <div class="cart-item-info">
                            <div class="cart-item-name-s">
                                <p class="cart-item-name">${d.name}</p>
                            </div>
                            <p class="cart-item-price">${d.price}PKR x <span class="cart-item-qty">1</span></p>
                        </div>
                        <button class="cart-item-delete-icon">
                            <i class="fa-solid fa-trash" data-s-id=${d.id} onclick='removeFromCart(${d.id}, this)'></i>
                        </button>
                    </div>`;
        html = html + template;
        price = price + Number(d.price);
    })
        cart = data;
        cartItems.insertAdjacentHTML( 'beforeend', html);
        if (window.location.pathname == '/order' || window.location.pathname == '/order#') {
            orderItems.insertAdjacentHTML( 'beforeend', html);
            totalPrice.innerText = price;
            updatePrice();
        }
    }
    document.querySelector(".count").innerHTML = cart.length;
    checkWheatherCartIsEmpty();
    return data;
}
const addToCart = (link) => {
    let addToCartItemData = allProducts.filter(product => link.dataset.id == product.id)[0];
    cart.push(addToCartItemData);
    let dataToSetToSessionStorage = JSON.stringify(cart);
    window.sessionStorage.setItem("bbQubraCart", dataToSetToSessionStorage);
    const template = `<div class="cart-item">
                        <img class="cart-item-image" src="${addToCartItemData.image}" alt="">
                        <div class="cart-item-info">
                            <div class="cart-item-name-s">
                                <p class="cart-item-name">${addToCartItemData.name}</p>
                            </div>
                            <p class="cart-item-price">${addToCartItemData.price}PKR x <span class="cart-item-qty">1</span></p>
                        </div>
                        <button class="cart-item-delete-icon">
                            <i class="fa-solid fa-trash" data-s-id=${addToCartItemData.id} onclick='removeFromCart(${addToCartItemData.id}, this)'></i>
                        </button>
                    </div>`;
        cartItems.insertAdjacentHTML( 'beforeend', template );
        document.querySelector(".count").innerHTML = cart.length;
        checkWheatherCartIsEmpty();
}
const updatePrice = () => {
    let price = 0;
    order = '';
    cart.map(el => {
        price = price + Number(el.price); 
        order = 
        `${order} + 
        Name: ${el.name} \n
        Article: ${el.article} \n
        Type: ${el.type} \n
        Price: ${el.price}PKR \n\n\n`;
    })
        console.log(order)
    totalPrice.innerText = price;
    orderMessage.value = order + "Total Price: " + price + "PKR";
}
const removeFromCart = (itemId, item) => {
    const currentItem = item.parentNode.parentNode;
    for(let i=0; i<cart.length; i++) {
        
        if(cart[i]["id"] == itemId) {
            cart.splice(i, 1);
            currentItem.remove();
            console.log("removed")
            console.log(itemId)
        break;    
        }
    }
    let newCart = JSON.stringify(cart);
    window.sessionStorage.setItem("bbQubraCart", newCart);
    document.querySelector(".count").innerHTML = cart.length;
     if (window.location.pathname == '/order' || window.location.pathname == '/order#') {
        updatePrice();
    }
    checkWheatherCartIsEmpty()
}


getData();
updateCart();