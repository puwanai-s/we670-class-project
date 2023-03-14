// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNVyS49prBDAOltmX0NhVQVVwWYjhpk8c",
  authDomain: "we670-487e6.firebaseapp.com",
  projectId: "we670-487e6",
  storageBucket: "we670-487e6.appspot.com",
  messagingSenderId: "344232992656",
  appId: "1:344232992656:web:45b377307699fe87e11d15",
  measurementId: "G-7F4LHJDF64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();