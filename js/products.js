const createProductButton = document.querySelector(".header__items__menu__item__create");
const cardOpenButton = document.querySelectorAll(".cards__card");

createProductButton.addEventListener("click", function(){
    window.location.href = 'create.html';
})

cardOpenButton.forEach(el => {
    el.addEventListener("click", function(){
        window.location.href= "card.html";
    })
})