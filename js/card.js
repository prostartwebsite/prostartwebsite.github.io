import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries
const createProductButton = document.querySelector(".header__items__menu__item__create");
const title = document.getElementById("title");
const developer = document.getElementById("developer");
const time = document.getElementById("time");
const mail = document.getElementById("mail");
const description = document.getElementById("description");
const telegram = document.getElementById("telegram");
const messenger = document.getElementById("messenger");
const instagram = document.getElementById("instagram");
const vk = document.getElementById("vk");
const github = document.getElementById("github");
const devUl = document.querySelector(".about__dev__developers__ul");
const photos = document.querySelector(".about__dev__galery__img");

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

const devFull = (name, position, description, img) => {
    return `
    <div class="about__dev__developers__item">
        <img src="${img}" alt="">
        <div class="about__dev__developers__item__text">
            <span>${name}</span> <br> <span>${position}</span><br><span>${description}</span> 
        </div>
    </div>
    `
}

const photo = (src) => {
    return `
        <img src="${src}" alt="">
    `
}

function getCardsData(cardId){
    get(child(ref(getDatabase()), 'cards/' + cardId)).then((snapshot) => {
        if (snapshot.exists()) {
            title.textContent = snapshot.val().title;
            developer.textContent = snapshot.val().developers[0].name;
            time.textContent =  Math.floor(((new Date() - new Date(snapshot.val().time))/3600000)/24).toString() + ' days ago';
            mail.textContent = snapshot.val().mail;
            description.textContent = snapshot.val().description;
            telegram.href = snapshot.val().contacts.telegram;
            messenger.href = snapshot.val().contacts.messenger;
            instagram.href = snapshot.val().contacts.instagram;
            vk.href = snapshot.val().contacts.vk;
            github.href = snapshot.val().contacts.github;
            snapshot.val().developers.forEach((element, i) => {
                devUl.insertAdjacentHTML("afterbegin", devFull(element.name, element.position, element.description, snapshot.val().devphotos[i]));
            });
            snapshot.val().photos.forEach(el => {
                photos.insertAdjacentHTML("afterbegin", photo(el));
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

getCardsData(window.localStorage.getItem("id"));