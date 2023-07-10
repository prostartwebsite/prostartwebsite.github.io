import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries
const createProductButton = document.querySelector(".header__items__menu__item__create");
const cards = document.querySelector(".cards");
let cardOpen = document.querySelectorAll(".cards__card");
let currentDate = new Date();


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

const card = (id, title, description, developer, time) =>{
    return `
                <div id="${id}" class="cards__card">
                    <div class="cards__card__image">
                        <img src="/img/gradient.png" alt="image">
                    </div>
                    <div class="cards__card__text">
                        <h1>${title}</h1>
                        <h2>${description}</h2>
                        <div class="cards__card__text__information">
                            <span class="cards__card__text__information__item">${developer}</span>
                            <span class="cards__card__text__information__item">${time}</span>
                        </div>
                    </div>
                    <div class="cards__card__tags">
                        <div class="cards__card__tags__item">
                            tag
                        </div>
                        <div class="cards__card__tags__item">
                            tag
                        </div>
                        <div class="cards__card__tags__item">
                            tag
                        </div>
                    </div>
                </div>
`
}

function getCardsData(){
    return new Promise( ( resolve, reject ) => {
    get(child(ref(database), 'cards/')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.val().forEach( (el, i) => {
                cards.insertAdjacentHTML("afterbegin", card(i, el.title, el.description, el.developers[0].name,  Math.floor(((currentDate - new Date(el.time))/3600000)/24).toString() + ' days ago'));
            });
            resolve( document.querySelectorAll(".cards__card") );
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
            console.error(error);
    });
    } )
}

createProductButton.addEventListener("click", function(){
    window.location.href = 'create.html';
})

getCardsData().then( ( resMessage ) => {
    resMessage.forEach(el => {
        el.addEventListener("click", function(){
            window.localStorage.setItem("id", el.id);
            window.location.href = '/html/card.html';
        })
    })
} );



