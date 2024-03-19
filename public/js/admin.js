const form = document.querySelector(".add-item-form");

form.addEventListener("submit", function(event) {
    console.log(event);
    event.preventDefault();
});