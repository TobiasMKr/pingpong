// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIUrb_3HXA20w_-jucHnLhHz-Jgvkdhc8",
  authDomain: "pingpong-82765.firebaseapp.com",
  projectId: "pingpong-82765",
  storageBucket: "pingpong-82765.firebasestorage.app",
  messagingSenderId: "873667295650",
  appId: "1:873667295650:web:c49aceb92775eed32e5afb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {auth, db};