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
const logoImg = document.querySelector(".card__image__item");
const tagsUl = document.querySelector(".card__tags");
const commentName = document.getElementById("commentName");
const commentItem = document.getElementById("commentItem");
const commentGo = document.querySelector(".comments__btn");
const commUl = document.querySelector(".com");

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
        <img class="developer__photo" src="${img}" alt="">
        <div class="about__dev__developers__item__text">
            <span>${name}</span> <br> <span>${position}</span><br><span>${description}</span> 
        </div>
    </div>
    `
}

const comment = (name, comment, time) => {
    return `
    <div class="com__item">
                    <span class="com__item__title">
                    ${name}<span class="com__item__title__date">${time}</span>
                    </span>
                    <p>${comment}</p> 
                </div>
    `
}

function writeComments() {
    return new Promise((resolve) => {
        get(child(ref(getDatabase()), 'cards/'+window.localStorage.getItem("id").toString())).then((snapshot) => {
        if (snapshot.exists()) {
            let commentId = snapshot.val().comments.length;
            set(ref(database,'cards/'+window.localStorage.getItem("id")+ "/comments/" + commentId), {
                name: commentName.value,
                body: commentItem.value, 
                time: new Date().toString()
            });
            resolve(document.location);
        } else {
            alert("No data available");
        }
    }).catch((error) => {
            console.log(error);
    });
    })
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
            logoImg.src = snapshot.val().logo;
            vk.href = snapshot.val().contacts.vk;
            github.href = snapshot.val().contacts.github;
            if(snapshot.val().tags != null){
                snapshot.val().tags.forEach(tag => {
                tagsUl.insertAdjacentHTML("afterbegin", `<div class="card__tags__item">${tag}</div>`)
            })
            }
            
            snapshot.val().developers.forEach((element, i) => {
                devUl.insertAdjacentHTML("afterbegin", devFull(element.name, element.position, element.description, snapshot.val().devphotos[i]));
            });
            if(snapshot.val().photos != null){
                snapshot.val().photos.forEach(el => {
                photos.insertAdjacentHTML("afterbegin", photo(el));
            })
            }
            if(snapshot.val().comments != ""){
                snapshot.val().comments.forEach(el => {
                commUl.insertAdjacentHTML("afterbegin", comment(el.name, el.body, Math.floor(((new Date() - new Date(snapshot.val().time))/3600000)/24).toString() + ' days ago'));
            })
            }
            
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
            console.error(error);
    });
}

commentGo.addEventListener("click", function(){
    if(commentName.value != "" && commentItem.value != ""){
        writeComments().then((resolve) => {
            resolve.reload();
        });

    }else{
            document.querySelectorAll(".valid").forEach(el => {
                if(el.value == ""){
                    el.classList.add("active");
                }else{
                    el.classList.remove("active");
                }
            })
    }
})


createProductButton.addEventListener("click", function(){
    window.location.href = 'create.html';
})

getCardsData(window.localStorage.getItem("id"));