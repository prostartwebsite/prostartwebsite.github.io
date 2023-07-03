const createProductButton = document.querySelector(".header__items__menu__item__create");
const uploadButton = document.querySelector(".create__contacts__button__btn");
const newDevButton = document.querySelector(".create__developers__button");
const newDevWindow = document.querySelector(".new-developer");
const newDevClose = document.querySelector(".new-developer__window__close");

const fadeIn = (el, timeout, display) =>{
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) =>{
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    },timeout);
};

newDevButton.addEventListener("click",function(){
    fadeIn(newDevWindow,1000);
})

newDevClose.addEventListener("click", function(){
    fadeOut(newDevWindow,1000);
})


uploadButton.addEventListener("click", function(){
    console.log(1);
})

createProductButton.addEventListener("click", function(){
    window.location.href = 'create.html';
})