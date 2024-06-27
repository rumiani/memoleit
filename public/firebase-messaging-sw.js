importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyADvEFH9oGlRbDw4mTDS0SGHbAQJoq1SWU",
  authDomain: "memoleit.firebaseapp.com",
  projectId: "memoleit",
  storageBucket: "memoleit.appspot.com",
  messagingSenderId: "1038679806776",
  appId: "1:1038679806776:web:b0335b5029ed1cb61ae7cd",
  measurementId: "G-9048Y80RY9",
});

const messaging = firebase.messaging();
