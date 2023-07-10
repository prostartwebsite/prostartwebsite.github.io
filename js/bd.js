import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries
const cardTitle = document.getElementById("title");
const cardDescription = document.getElementById("description");
const cardMail = document.getElementById("mail");
const cardSubmitButton = document.querySelector(".create__contacts__button__go");


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
                mail: cardMail.value
            });
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


function getCardsData(cardId){
    get(child(ref(getDatabase()), 'cards/' + cardId)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
            console.error(error);
    });
}