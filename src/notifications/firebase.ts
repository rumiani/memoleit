// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "memoleit.firebaseapp.com",
  projectId: "memoleit",
  storageBucket: "memoleit.appspot.com",
  messagingSenderId: "1038679806776",
  appId: "1:1038679806776:web:b0335b5029ed1cb61ae7cd",
  measurementId: "G-9048Y80RY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // Replace with your Firebase project's VAPID key
    });
    console.log(currentToken);
  }
};
