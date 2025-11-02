// lib/user.ts
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from './firebase'

/**
 * Ensure a users/<uid> doc exists. If missing, create it with a minimal shape.
 * Call this once after sign-in completes (client side).
 */
export async function ensureUserDoc(
  uid: string,
  fallback: { email?: string; displayName?: string; role?: string } = {}
) {
  if (!uid) throw new Error('missing-uid')
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (snap.exists()) return { created: false, data: snap.data() }

  const payload = {
    email: fallback.email || null,
    displayName: fallback.displayName || null,
    role: fallback.role || 'intern',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(ref, payload)
  return { created: true, data: payload }
}

/**
 * Check if a user document exists in users collection by email.
 * Returns null if not found, or { id, ...data } if found.
 */
export async function getUserByEmail(email: string) {
  const trimmed = email.trim().toLowerCase()
  const q = query(collection(db, 'users'), where('email', '==', trimmed))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const docSnap = snap.docs[0]
  return { id: docSnap.id, ...docSnap.data() }
}