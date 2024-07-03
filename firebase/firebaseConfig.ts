// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "memoleit.firebaseapp.com",
  projectId: "memoleit",
  storageBucket: "memoleit.appspot.com",
  messagingSenderId: "1038679806776",
  appId: "1:1038679806776:web:b0335b5029ed1cb61ae7cd",
  measurementId: "G-9048Y80RY9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
