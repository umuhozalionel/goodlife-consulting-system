// scripts/set-roles-admin.js
const admin = require("firebase-admin");

const SERVICE_ACCOUNT = require("../serviceAccountKey.json"); // production only
// For emulator, we won't use SERVICE_ACCOUNT; see instructions below.

const dbInit = (useEmulator) => {
  if (useEmulator) {
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
    admin.initializeApp({ projectId: "goodlife-consulting" });
  } else {
    admin.initializeApp({ credential: admin.credential.cert(SERVICE_ACCOUNT) });
  }
  return admin.firestore();
};

const MAP = {
  // paste uid: role pairs here
  // "SyACMZK2tFUNNsQDyJUFQ4VaRWk2": "admin",
  // "s7h79zuWgudn4a6cHrsBZ1uduuH2": "intern",
};

(async () => {
  const useEmulator = process.env.USE_EMULATOR === "1";
  const db = dbInit(useEmulator);

  const entries = Object.entries(MAP);
  if (!entries.length) {
    console.error("MAP is empty. Edit scripts/set-roles-admin.js and add uid: role pairs.");
    process.exit(1);
  }

  for (const [uid, role] of entries) {
    await db.collection("users").doc(uid).set(
      { role, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
    console.log(`set users/${uid} => ${role}`);
  }
  process.exit(0);
})();