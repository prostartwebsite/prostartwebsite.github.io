import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries
const createProductButton = document.querySelector(".header__items__menu__item__create");
const cards = document.querySelector(".cards");
let currentDate = new Date();
const logo = "/img/gradient.png";
let tagsFindList = new Array();
let deleteButtons = document.querySelectorAll(".search__input__item__close"); 
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

const card = (id, title, description, developer, time, logo) =>{
    return `
                <div id="${id}" class="cards__card">
                    <div class="cards__card__image">
                        <img  src="${logo}" alt="image">
                    </div>
                    <div class="cards__card__text">
                        <h1>${title}</h1>
                        <h2>${description}</h2>
                        <div class="cards__card__text__information">
                            <span class="cards__card__text__information__item">${developer}</span>
                            <span class="cards__card__text__information__item">${time}</span>
                        </div>
                    </div>
                    <div id="tagsUl" class="cards__card__tags">
                        
                    </div>
                </div>
`
}

function getCardsData(){

    get(child(ref(database), 'cards/')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.val().forEach( (el, i) => {
                cards.insertAdjacentHTML("afterbegin", card(i, el.title, el.tagline, el.developers[0].name,  Math.floor(((currentDate - new Date(el.time))/3600000)/24).toString() + ' days ago', el.logo || logo));
                if(el.tags != null){
                    el.tags.forEach(tag => {
                    document.getElementById("tagsUl").insertAdjacentHTML("afterbegin", `<div class="cards__card__tags__item">${tag}</div>`);
                })
                }
            });
            document.querySelectorAll(".cards__card").forEach(el => {
                el.addEventListener("click", function(){
                    window.localStorage.setItem("id", el.id);
                    window.location.href = '/html/card.html';
                })
            }) 
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
            console.error(error);
    });
}

createProductButton.addEventListener("click", function(){
    window.location.href = 'create.html';
})

getCardsData();

document.querySelectorAll(".cards__card").forEach(el => {
    el.addEventListener("click", function(){
        window.localStorage.setItem("id", el.id);
        window.location.href = '/html/card.html';
    })
})

tagsList.forEach(el => {
    document.querySelector(".search__tags__items").insertAdjacentHTML("afterbegin", `<div class="search__tags__items__item">${el}</div>`);
})
document.querySelectorAll(".search__tags__items__item").forEach(el => {
    el.addEventListener("click", function(){
        tagsFindList.push(el.textContent);
        document.querySelectorAll(".cards__card").forEach(card => {
            let tagsString = "";
            card.childNodes[5].childNodes.forEach(tag => {
                tagsString += tag.textContent;
            });
            tagsFindList.forEach(ctag => {
                if(!tagsString.includes(ctag)){
                    card.style.display = 'none';
                }else{
                    card.style.display = 'flex';
                }
            })
            if(tagsFindList.length == 0){
                card.style.display = 'flex';
            }
        })
        document.querySelector(".search__input").insertAdjacentHTML("afterbegin", `<div class="search__input__item"><img class="search__input__item__close" src="/img/close.png" alt="close">${el.textContent}</div>`);
        el.style.display = "none";
        deleteButtons = document.querySelectorAll(".search__input__item__close"); 
        deleteButtons.forEach(el => {
            el.addEventListener("click", function(){
                document.querySelector(".search__tags__items").insertAdjacentHTML("afterbegin", `<div class="search__tags__items__item">${el.parentElement.textContent}</div>`); 
                tagsFindList.forEach((tag, i) => {
                    if(tag == el.parentElement.textContent){
                        tagsFindList.splice(i, 1);
                    }
                })
                document.querySelectorAll(".cards__card").forEach(card => {
                    let tagsString = "";
                    card.childNodes[5].childNodes.forEach(tag => {
                        tagsString += tag.textContent;
                    });
                    tagsFindList.forEach(ctag => {
                        if(!tagsString.includes(ctag)){
                            card.style.display = 'none';
                        }else{
                            card.style.display = 'flex';
                        }
                    })
                    if(tagsFindList.length == 0){
                        card.style.display = 'flex';
                    }
                })
                el.parentElement.style.display = 'none';
            })
        })
    })
})

        deleteButtons.forEach(el => {
            el.addEventListener("click", function(){
                document.querySelector(".search__tags__items").insertAdjacentHTML("afterbegin", `<div class="search__tags__items__item">${el.parentElement.textContent}</div>`); 
                tagsFindList.forEach((tag, i) => {
                    if(tag == el.parentElement.textContent){
                        tagsFindList.splice(i, 1);
                    }
                })
                document.querySelectorAll(".cards__card").forEach(card => {
                    let tagsString = "";
                    card.childNodes[5].childNodes.forEach(tag => {
                        tagsString += tag.textContent;
                    });
                    tagsFindList.forEach(ctag => {
                        if(!tagsString.includes(ctag)){
                            card.style.display = 'none';
                        }else{
                            card.style.display = 'flex';
                        }
                    })
                    if(tagsFindList.length == 0){
                        card.style.display = 'flex';
                    }
                })
                el.parentElement.style.display = 'none';
            })
        })