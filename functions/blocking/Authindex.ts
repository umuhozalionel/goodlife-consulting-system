import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// Replace with your allowed emails source: Firestore collection, config, or other logic.
const USERS_COLLECTION = 'users'

/**
 * Blocking Cloud Function for sign-in.
 * - Rejects sign-in if the user's email is not present in users collection.
 * - Requires Firebase Auth with blocking functions enabled (Identity Platform).
 */
export const beforeSignIn = functions.auth.user().beforeSignIn(async (user, context) => {
  const email = (user.email || '').trim().toLowerCase()
  if (!email) {
    // Reject sign-in when no email provided
    return {
      status: 'DENY',
      error: {
        code: 'EMAIL_REQUIRED',
        message: 'Email required to sign in',
      },
    }
  }

  const db = admin.firestore()
  const q = await db.collection(USERS_COLLECTION).where('email', '==', email).limit(1).get()
  if (q.empty) {
    return {
      status: 'DENY',
      error: {
        code: 'USER_NOT_REGISTERED',
        message: 'This account is not registered with this application',
      },
    }
  }

  // Optionally enrich claims or ensure role
  const doc = q.docs[0].data()
  const role = doc.role || 'intern'
  await admin.auth().setCustomUserClaims(user.uid, { role })

  return { status: 'ALLOW' }
})