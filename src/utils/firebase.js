// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
