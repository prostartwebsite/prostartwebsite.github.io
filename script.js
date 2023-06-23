const productsButton = document.querySelector(".about__buttons__products");
const createProductButton = document.querySelector(".header__items__menu__item__create");
const createButton = document.querySelector(".about__buttons__create");
const scrollButton= document.querySelector(".about__scroll");

productsButton.addEventListener("click", function(){
    window.location.href = '/products.html';
})

createProductButton.addEventListener("click", function(){
    window.location.href = '/create.html';
})

createButton.addEventListener("click",function(){
    window.location.href = '/create.html';
})

window.addEventListener("scroll", function(){
    this.window.location.href = '/about.html';
})

scrollButton.addEventListener("click", function(){
    window.location.href = '/about.html';
})