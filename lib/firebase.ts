import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZzW9M5E8mQEPu7jyh3x113uSMEFd4BJc",
  authDomain: "goodlife-consulting.firebaseapp.com",
  projectId: "goodlife-consulting",
  storageBucket: "goodlife-consulting.appspot.com",
  messagingSenderId: "549935392152",
  appId: "1:549935392152:web:ca8e47cd04486d114977ed",
  measurementId: "G-N5FYF7GDGL",
}

// ✅ Initialize and export Firebase services
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)