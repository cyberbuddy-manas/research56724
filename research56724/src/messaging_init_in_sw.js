import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBYw1lxmdGUTPrx3-06vhVDNarJMHQaWZI",
    authDomain: "research-19ba1.firebaseapp.com",
    projectId: "research-19ba1",
    storageBucket: "research-19ba1.appspot.com",
    messagingSenderId: "584624090944",
    appId: "1:584624090944:web:6718bf2613c464d35d94a5",
    measurementId: "G-TBQDZD8XJV"
};

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const app = initializeApp(firebaseConfig);

            const messaging = getMessaging(app);
            getToken(messaging, { vapidKey: 'BC0Muqnhcerb_Si8RYXFOTpxTfANQNcG3K2SGiqkANXGy2RfHnY7kjAWj3NuZ5lHkBNuZvhrV9oXepFW-mX20TM' })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log(currentToken);
                        setTimeout(() => {document.getElementById('noti').innerHTML = "APP ID: " + currentToken;}, 3000)
                    } else {
                        console.log('Can not get token');
                    }
                })
        } else {
            console.log('dont have permission');
        }
    });
}

requestPermission()