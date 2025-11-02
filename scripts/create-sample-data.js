// scripts/create-sample-data.js
const admin = require('firebase-admin');
const svc = require('./serviceAccountKey.json'); // production only; for emulator set USE_EMULATOR=1
const useEmulator = process.env.USE_EMULATOR === '1';

if (!useEmulator) {
  admin.initializeApp({ credential: admin.credential.cert(svc) });
} else {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  admin.initializeApp({ projectId: 'goodlife-consulting' });
}

const db = admin.firestore();

(async () => {
  // users
  await db.collection('users').doc('uid_jane').set({
    displayName: 'Jane Doe',
    email: 'jane@example.com',
    role: 'intern',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await db.collection('users').doc('uid_john').set({
    displayName: 'John Trainer',
    email: 'john.trainer@example.com',
    role: 'trainer',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // trainees
  await db.collection('trainees').add({
    userRef: db.doc('users/uid_jane'),
    enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'active',
    cohort: '2025-Q4',
  });

  // trainings
  await db.collection('trainings').add({
    title: 'Onboarding Foundations',
    description: 'Intro to company and workflows',
    startsAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 7*24*60*60*1000)),
    capacity: 25,
  });

  console.log('sample data created');
  process.exit(0);
})();
