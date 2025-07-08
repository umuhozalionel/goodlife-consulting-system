// lib/firebase.ts

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// ✅ Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZzW9M5E8mQEPu7jyh3x113uSMEFd4BJc",
  authDomain: "goodlife-consulting.firebaseapp.com",
  projectId: "goodlife-consulting",
  storageBucket: "goodlife-consulting.appspot.com", // NOTE: Corrected `.app` to `.appspot`
  messagingSenderId: "549935392152",
  appId: "1:549935392152:web:ca8e47cd04486d114977ed",
  measurementId: "G-N5FYF7GDGL",
}

// ✅ Initialize Firebase app and export services
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)