import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore"; // Include getDoc here


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJxGEJlm8Wf4cFBSDblE7xLxOm_3nZcHo",
  authDomain: "bookmycook-93d2f.firebaseapp.com",
  projectId: "bookmycook-93d2f",
  storageBucket: "bookmycook-93d2f.appspot.com",
  messagingSenderId: "782694467119",
  appId: "1:782694467119:web:b40006e1ee1f31d2e7e8da"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, firestore, doc, setDoc, getDoc, collection, getDocs, query, where, updateDoc, deleteDoc};
setPersistence(auth, browserLocalPersistence);