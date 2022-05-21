// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJOrlG9Yl4yS-Ez2d1GEtevwTVIExt0Oo",
  authDomain: "ecommerce-2022-1.firebaseapp.com",
  projectId: "ecommerce-2022-1",
  storageBucket: "ecommerce-2022-1.appspot.com",
  messagingSenderId: "35771051693",
  appId: "1:35771051693:web:d64812d241e1e37ac56024"
};

const firebaseApp = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

// const auth = firebase.auth();
const auth = getAuth(firebaseApp);
console.log(auth);
// console.log(firebaseApp);

export { auth }