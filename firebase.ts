import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyADvEFH9oGlRbDw4mTDS0SGHbAQJoq1SWU",
  authDomain: "memoleit.firebaseapp.com",
  projectId: "memoleit",
  storageBucket: "memoleit.appspot.com",
  messagingSenderId: "1038679806776",
  appId: "1:1038679806776:web:b0335b5029ed1cb61ae7cd",
  measurementId: "G-9048Y80RY9",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();
getToken(messaging, {
  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
}).then((token) => {
  console.log(token);
});

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}
