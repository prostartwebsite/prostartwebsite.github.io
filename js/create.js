import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries
const cardTitle = document.getElementById("title");
const cardDescription = document.getElementById("description");
const cardMail = document.getElementById("mail");
const cardSubmitButton = document.querySelector(".create__contacts__button__go");
const createProductButton = document.querySelector(".header__items__menu__item__create");
const newDevButton = document.querySelector(".create__developers__button");
const newDevWindow = document.querySelector(".new-developer");
const newDevClose = document.querySelector(".new-developer__window__close");
const logoImg = document.querySelector(".create__main__logo__img__item");
const logoInput = document.querySelector(".create__main__logo__input-wrapper__file");
const devEx = '<li class="create__developers__ul__li"><img id="photo" src="" alt=""><div class="create__developers__ul__li__text"><span id="one"></span><span id="two"></span><span id="three"></span></div></li>';
const devName = document.getElementById("devName");
const devPosition = document.getElementById("devPosition");
const devDescription = document.getElementById("devDescription");
const devImg = document.getElementById("devImg");
const addDevBtn = document.querySelector(".new-developer__window__add");
const addDevImg = document.querySelector(".new-developer__window__main__item__btn");
const linkWindow = document.querySelector(".link");
const linkClose = document.querySelector(".link__window__close");
const linkOpen = document.querySelectorAll(".create__contacts__icons__item");
const linkAdd = document.querySelector(".link__window__add");
const linkInput = document.querySelector(".link__window__input");
const imgEx = '<li class="create__contacts__ul__li"><img id="media" src="" alt=""></li>';
const mediaInput = document.querySelector(".create__contacts__button__input-wrapper__file");
const mediaUl = document.querySelector(".create__contacts__ul");
let contacts = ['', '', '', '', ''];
let logoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTExIiBoZWlnaHQ9Ijk4IiB2aWV3Qm94PSIwIDAgMTExIDk4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMwLjM1NTggMTUuNzEzMkMyOC42MjE4IDE0LjE4MjQgMjUuODEwNiAxNC4xODI0IDI0LjA3NjcgMTUuNzEzMkMyMi4zNDI3IDE3LjI0NDEgMjIuMzQyNyAxOS43MjYxIDI0LjA3NjcgMjEuMjU2OUwzMS4xNDgxIDI3LjUwMDJDMTkuNjEwMiAzNS40OTg5IDEyLjA1NzEgNDUuOTI1MSAxMi4wNTcxIDQ1LjkyNTFDMTIuMDU3MSA0NS45MjUxIDMxLjkzNTcgNzMuMzY1MSA1Ni40NTcyIDczLjM2NTFDNjMuNjk2NiA3My4zNjUxIDcwLjUzMTYgNzAuOTczNSA3Ni41Njk1IDY3LjYwMTlMODYuODY3NyA3Ni42OTRDODguNjAxNSA3OC4yMjUxIDkxLjQxMjkgNzguMjI1MSA5My4xNDY3IDc2LjY5NEM5NC44ODEgNzUuMTYzMiA5NC44ODEgNzIuNjgxMSA5My4xNDY3IDcxLjE1MDNMMzAuMzU1OCAxNS43MTMyWk00MS44NzU1IDM2Ljk3MTJMNjYuNTk4NiA1OC43OTg4QzYzLjcyMzMgNjAuNTY3NSA2MC4yMjcyIDYxLjYwNDcgNTYuNDU3MiA2MS42MDQ3QzQ2LjY0ODQgNjEuNjA0NyAzOC42OTcxIDU0LjU4NDggMzguNjk3MSA0NS45MjQ3QzM4LjY5NzEgNDIuNTk2MiAzOS44NzIgMzkuNTA5NiA0MS44NzU1IDM2Ljk3MTJaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTAwLjg1NyA0NS45MjUxQzEwMC44NTcgNDUuOTI1MSA5Ni41Nzc1IDUxLjgzMyA4OS41Mzk2IDU4LjE2NTdMNDYuMzA2OSAxOS45OTYyQzQ5LjU2NjcgMTkuMDQxNyA1Mi45NjQ3IDE4LjQ4NTEgNTYuNDU3MiAxOC40ODUxQzgwLjk3ODQgMTguNDg1MSAxMDAuODU3IDQ1LjkyNTEgMTAwLjg1NyA0NS45MjUxWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==';
let photos = new Array();
let developers = new Array;
let devPhotos = new Array();
let choosenLink;

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

const firebaseConfig = {
    apiKey: "AIzaSyDdSADOjwg0v6ZiM3NueT9lPEQVpZZXZpo",
    authDomain: "prostart-2b6b8.firebaseapp.com",
    databaseURL: "https://prostart-2b6b8-default-rtdb.firebaseio.com",
    projectId: "prostart-2b6b8",
    storageBucket: "prostart-2b6b8.appspot.com",
    messagingSenderId: "803609318970",
    appId: "1:803609318970:web:aab686986a7fcaae608703"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function writeCardsData() {
    get(child(ref(getDatabase()), 'cards')).then((snapshot) => {
        if (snapshot.exists()) {
            let cardId = snapshot.val().length;
            set(ref(database, 'cards/' + cardId), {
                title: cardTitle.value,
                description: cardDescription.value,
                mail: cardMail.value,
                contacts: {
                    telegram: contacts[0],
                    messenger: contacts[1],
                    vk: contacts[2],
                    instagram: contacts[3],
                    github: contacts[4]
                },
                logo: logoUrl,
                photos: photos,
                developers: developers,
                devphotos: devPhotos,
                time: new Date().toString()
            });
            
            window.location.href = '/html/products.html';
        } else {
            alert("No data available");
        }
    }).catch((error) => {
            console.log(error);
    });
    
}
cardSubmitButton.addEventListener("click", function(){
    if(!(cardTitle.value == '' || cardDescription.value == '' || cardMail.value == '')){
        writeCardsData();
    }else{
        console.log("validation...");
    }
})


newDevButton.addEventListener("click",function(){
    fadeIn(newDevWindow,1000);

})

newDevClose.addEventListener("click", function(){
    fadeOut(newDevWindow,1000);
})



createProductButton.addEventListener("click", function(){
    window.location.href = 'create.html';
})

logoInput.addEventListener("change", function(){
    let file = logoInput.files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
        logoImg.src = reader.result;
        logoUrl = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        logoImg.src = "";
    }
})

devImg.addEventListener("change", function(){
    addDevImg.textContent = 'фото добавлено';
    let file = devImg.files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
        devPhotos.push(reader.result);
    }
    if (file) {
        reader.readAsDataURL(file);
    } 
})

addDevBtn.addEventListener("click", function(){
    document.querySelector(".create__developers__ul").insertAdjacentHTML("afterbegin", devEx);
    document.getElementById("one").textContent = devName.value;
    document.getElementById("two").textContent = devPosition.value; 
    document.getElementById("three").textContent = devDescription.value;
    let file = devImg.files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
        document.getElementById("photo").src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        document.getElementById("photo").src = "";
    }
    let developer = {
        name: devName.value,
        position: devPosition.value,
        description: devDescription.value
    }
    developers.push(developer);
    devName.value = '';
    devDescription.value = '';
    devPosition.value = '';
    devImg.value = '';
    addDevImg.textContent = 'загрузить фото';
    fadeOut(newDevWindow,1000);
})

linkOpen.forEach((el, i) => {
    el.addEventListener("click", function(){
        linkInput.value = contacts[i];
        fadeIn(linkWindow, 1000);
        choosenLink = i;
    })
})
linkClose.addEventListener("click", function(){
    fadeOut(linkWindow, 1000);
})

linkAdd.addEventListener("click", function(){
    contacts[choosenLink] = linkInput.value;
    fadeOut(linkWindow,1000);
})

mediaInput.addEventListener("change", function(){
    document.querySelector(".create__contacts__ul").insertAdjacentHTML("afterbegin", imgEx);
    let file = mediaInput.files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
        document.getElementById("media").src = reader.result;
        photos.push(reader.result);
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        document.getElementById("media").src = "";
    }
})

