import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries
const cardTitle = document.getElementById("title");
const cardDescription = document.getElementById("description");
const cardMail = document.getElementById("mail");
const cardTagline = document.getElementById("tagline");
const cardSubmitButton = document.querySelector(".create__contacts__button__go");
const createProductButton = document.querySelector(".header__items__menu__item__create");
const newDevButton = document.querySelector(".create__developers__button");
const newDevWindow = document.querySelector(".new-developer");
const newDevClose = document.querySelector(".new-developer__window__close");
const logoImg = document.querySelector(".create__main__logo__img__item");
const logoInput = document.querySelector(".create__main__logo__input-wrapper__file");
const devEx = '<li class="create__developers__ul__li"><img id="photo" class="developer__photo" src="" alt=""><div class="create__developers__ul__li__text"><span id="one"></span><span id="two"></span><span id="three"></span></div></li>';
const devName = document.getElementById("devName");
const devPosition = document.getElementById("devPosition");
const devDescription = document.getElementById("devDescription");
const devImg = document.getElementById("devImg");
const addDevBtn = document.querySelector(".new-developer__window__add");
const addDevImg = document.querySelector(".new-developer__window__main__item__btn");
const linkWindow = document.querySelector(".link");
const linkClose = document.querySelector(".link__window__close");
const linkOpen = document.querySelectorAll(".create__contacts__icons__item__btn");
const linkAdd = document.querySelector(".link__window__add");
const linkInput = document.querySelectorAll(".create__contacts__icons__item__input");
const imgEx = '<li class="create__contacts__ul__li"><img id="media" src="" alt=""></li>';
const mediaInput = document.querySelector(".create__contacts__button__input-wrapper__file");
const tagsUl = document.querySelector(".tags__window__all");
const choosenTagsUl = document.querySelector(".tags__window__ul");
const openTags = document.querySelector(".open-tags");
const tagsWindow = document.querySelector(".tags");
const tagsClose = document.querySelector(".tags__window__close");
const titleGenerateBtn = document.querySelector(".create__main__text__name__generate");
const taglineGenerateBtn = document.querySelector(".create__main__text__tagline__generate");
let tagsPostList = new Array();
let isLogo = false;
let isDev = false;
const tagsList = [
    ,"Analytics"
    ,"APIs"
    ,"Art"
    ,"Advertising"
    ,"Books"
    ,"Bots"
    ,"Calendar"
    ,"Climate"
    ,"Clothing"
    ,"AI"
    ,"Communication"
    ,"Community"
    ,"Content"
    ,"Beauty"
    ,"Cryptocurrency"
    ,"Design"
    ,"Devtools"
    ,"E-Commerce"
    ,"Education"
    ,"Email Marketing"
    ,"Events"
    ,"Fashion"
    ,"Finance"
    ,"Fitness"
    ,"Food & Drink"
    ,"Games"
    ,"Growth"
    ,"Hardware"
    ,"Healthcare"
    ,"Home Automation"
    ,"Investing"
    ,"Jobs & Hiring"
    ,"Kids"
    ,"Mailing Lists"
    ,"Marketing"
    ,"Marketplaces"
    ,"Medical"
    ,"Movies & Video"
    ,"Music & Audio"
    ,"News & Magazines"
    ,"Open Source"
    ,"Outdoors"
    ,"Payments"
    ,"Photography"
    ,"Podcasting"
    ,"Politics"
    ,"Productivity"
    ,"Programming"
    ,"Sales"
    ,"Shopping"
    ,"Social Media"
    ,"Sports"
    ,"Start-Up"
    ,"Task Management"
    ,"Transportation"
    ,"Travel"
    ,"Utilities"
    ,"Wearables"
    ,"Weather"
    ,"Writing"]

let contacts = ['', '', '', '', ''];
let logoUrl = '';
let photos = new Array();
let developers = new Array;
let devPhotos = new Array();
let choosenLink;
let deleteButtons = document.querySelectorAll(".tags__window__ul__item__close");

tagsList.forEach(el => {
    tagsUl.insertAdjacentHTML("afterbegin", `<div class="tags__window__all__item">${el}</div>`);
})

document.querySelectorAll(".tags__window__all__item").forEach(el => {
    el.addEventListener("click", function(){
        choosenTagsUl.insertAdjacentHTML("afterbegin", `<div class="tags__window__ul__item">${el.textContent}<img class="tags__window__ul__item__close" src="/img/close.png" alt="close"></div>`);
        tagsPostList.push(el.textContent);
        el.style.display = "none";
        deleteButtons = document.querySelectorAll(".tags__window__ul__item__close"); 
        deleteButtons.forEach(el => {
            el.addEventListener("click", function(){
                tagsUl.insertAdjacentHTML("afterbegin", `<div class="tags__window__all__item">${el.parentElement.textContent}</div>`); 
                
                tagsPostList.forEach((tag, i) => {
                    if(tag == el.parentElement.textContent){
                        tagsPostList.splice(i, 1);
                    }
                })
                el.parentElement.style.display = 'none';
            })
        })
    })
})

deleteButtons.forEach(el => {
    el.addEventListener("click", function(){
        tagsUl.insertAdjacentHTML("afterbegin", `<div class="tags__window__all__item">${el.parentElement.textContent}</div>`); 
        tagsPostList.forEach((tag, i) => {
            if(tag == el.parentElement.textContent){
                tagsPostList.splice(i, 1);
            }
        })
        el.parentElement.style.display = 'none';
    })
})



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
    appId: "1:803609318970:web:aab686986a7fcaae608703",
    storageBucket: 'gs://prostart-2b6b8.appspot.com'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function generateTitle(description){
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        let url = "https://swpprostartapi.pythonanywhere.com/generate-title";
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                let json = JSON.parse(xhr.responseText);
                resolve(json.title);
            }
        }
        let data = JSON.stringify({"description": description});
        xhr.send(data);
    })
    
}

async function generateTagline(description){
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        let url = "https://swpprostartapi.pythonanywhere.com/generate-tagline";
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                let json = JSON.parse(xhr.responseText);
                resolve(json.tagline);
            }
        }
        let data = JSON.stringify({"description": description});
        xhr.send(data);
    })
    
}

function writeCardsData() {
    return new Promise(resolve => {
        get(child(ref(getDatabase()), 'cards')).then((snapshot) => {
        if (snapshot.exists()) {
            let cardId = snapshot.val().length;
            set(ref(database, 'cards/' + cardId), {
                title: cardTitle.value,
                description: cardDescription.value,
                tagline: cardTagline.value,
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
                time: new Date().toString(),
                tags: tagsPostList, 
                comments: ""
            }).then(() => {
                window.location.href = '/html/products.html'
            });
        } else {
            alert("No data available");
        }
    }).catch((error) => {
            console.log(error);
    });
    } )
    
}
cardSubmitButton.addEventListener("click", function(){
    if(!(cardTitle.value == '' || cardDescription.value == '' || cardTagline.value == '' || cardMail.value == '' || !isLogo || !isDev)){
        writeCardsData();
    }else{
        document.querySelectorAll(".valid").forEach(el => {
            if(el.value == ""){
                el.classList.add("active");
            }else{
                el.classList.remove("active");
            }
        })
        if(!isLogo){
            document.querySelector(".logoValid").style.border = '1px solid red';
        }else{
            document.querySelector(".logoValid").style.border = 'none'; 
        }
        if(!isDev){
            document.querySelector(".devValid").style.border = '1px solid red';
        }else{
            document.querySelector(".devValid").style.border = 'none'; 
        }
    }
})

openTags.addEventListener("click", function(){
    fadeIn(tagsWindow, 1000);
})

tagsClose.addEventListener("click", function(){
    fadeOut(tagsWindow, 1000);
})

newDevButton.addEventListener("click",function(){
    fadeIn(newDevWindow,1000);

})

titleGenerateBtn.addEventListener("click", function(){
    if(cardDescription.value != ""){
        generateTitle(cardDescription.value.toString()).then((resolve) => {
            cardTitle.value = resolve;
        })
    }else{
        console.log("write decription");
    }
})

taglineGenerateBtn.addEventListener("click", function(){
    if(cardDescription.value != ""){
        generateTagline(cardDescription.value.toString()).then((resolve) => {
            cardTagline.value = resolve;
        })
    }else{
        console.log("write decription");
    }
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
    isLogo = true;
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
    isDev = true;
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
        contacts[i] = linkInput[i].value;
    })
})
linkClose.addEventListener("click", function(){
    fadeOut(linkWindow, 1000);
})

linkAdd.addEventListener("click", function(){
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

