import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getStorage }   from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBJXEVOsKBAMvu4SBl0aLQnZGk4dDim1T0",
  authDomain: "instagram-clone-h.firebaseapp.com",
  projectId: "instagram-clone-h",
  storageBucket: "instagram-clone-h.appspot.com",
  messagingSenderId: "240658919166",
  appId: "1:240658919166:web:3908ae4d7161a829967faf"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
