const form = document.querySelector(".add-item-form");
window.onload = (event) => {
    // const pass = "anythingQubra123"
    // let inputPass = window.prompt("Password");
    // if (inputPass !== pass) {
    //     window.location.href = "/shop";
    // }
    document.getElementsByTagName("body")[0].style.display = "block";
};
async function updateItems() {
    const request = await fetch("./data/data.json"); //getting data
    const data = await request.json(); // converting requested data into JSON
    let html = '';
    data.map(item => {
        const template = `  <div class="item">
                                <div class="item-image">
                                    <img src="${item.image}" alt="">
                                </div>
                                <div class="item-info">
                                    <p>Name: <span class="item-name">${item.name}</span></p>
                                    <p>Type: <span class="item-type">${item.type}</span></p>
                                    <p>Price: <span class="item-price">${item.price}Rs</span></p>
                                    <p>Article: <span class="item-article">${item.article}</span></p>
                                    <p>Status: <span class="item-status">${item.status}</span></p>
                                    <p>Description: <span class="item-description">${item.description}</span></p>
                                    <button class="remove-btn uppercase" data-id="${item.id}" onclick='removeItem(this)'>Remove Item</button>
                                </div>
                            </div>`;    
        html = html + template;
    })
    document.querySelector(".total-items").innerHTML = html;
    return data;
};
const removeItem = async (item) => {
    const id = {
        id: item.dataset.id,
        operation: 'remove-item'
    }
    const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id), // body data type must match "Content-Type" header
  };
   
    const response = await fetch('/api', options);
    const responseData = await response.json();
    item.parentNode.parentNode.remove()
    // await window.location.reload()
}
updateItems()
