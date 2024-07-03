// firestore.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const saveUserData = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });
  }
};
