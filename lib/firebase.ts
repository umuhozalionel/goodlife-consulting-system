// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)

// Connect to emulators when running locally and env flags are present
if (typeof window !== 'undefined') {
  const host = window.location.hostname
  const useEmulators = host === 'localhost' || host === '127.0.0.1'

  if (useEmulators) {
    try {
      // Auth emulator default port 9099
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    } catch (e) {
      // ignore if already connected
      // eslint-disable-next-line no-console
      console.warn('Auth emulator connection skipped', e)
    }

    try {
      // Firestore emulator default port 8080
      connectFirestoreEmulator(db, '127.0.0.1', 8080)
    } catch (e) {
      // ignore if already connected
      // eslint-disable-next-line no-console
      console.warn('Firestore emulator connection skipped', e)
    }
  }
}