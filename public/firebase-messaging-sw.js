importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging.js");
// import { onBackgroundMessage } from "firebase/messaging/sw";
const { onBackgroundMessage } = require('firebase/messaging/sw');
firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "memoleit.firebaseapp.com",
  projectId: "memoleit",
  storageBucket: "memoleit.appspot.com",
  messagingSenderId: "1038679806776",
  appId: "1:1038679806776:web:b0335b5029ed1cb61ae7cd",
  measurementId: "G-9048Y80RY9",
});

const messaging = firebase.messaging();

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  console.log(payload.notification);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
