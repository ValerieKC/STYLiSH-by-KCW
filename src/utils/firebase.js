import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMYHuVBep2vgv7LX-fql88htTmss5zqTs",
  authDomain: "stylish-by-kcw.firebaseapp.com",
  projectId: "stylish-by-kcw",
  storageBucket: "stylish-by-kcw.appspot.com",
  messagingSenderId: "578014994534",
  appId: "1:578014994534:web:067498dc688a6e4ee58da7",
  measurementId: "G-4JPXCYWP9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };