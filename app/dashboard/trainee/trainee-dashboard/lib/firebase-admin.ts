import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

let adminApp: App

if (getApps().length === 0) {
  // Decode base64 service account key
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_B64
  if (!serviceAccountKey) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_B64 environment variable is required")
  }

  const serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, "base64").toString("utf-8"))

  adminApp = initializeApp({
    credential: cert(serviceAccount),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
} else {
  adminApp = getApps()[0]
}

export const adminAuth = getAuth(adminApp)
export const adminDb = getFirestore(adminApp)
export default adminApp
