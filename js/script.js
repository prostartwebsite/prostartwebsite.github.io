const productsButton = document.querySelector(".about__buttons__products");
const createButton = document.querySelector(".about__buttons__create");

productsButton.addEventListener("click", function(){
    window.location.href = '/html/products.html';
})

createButton.addEventListener("click",function(){
    window.location.href = '/html/create.html';
})