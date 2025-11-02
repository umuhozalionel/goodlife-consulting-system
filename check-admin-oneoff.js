const admin = require('firebase-admin');
const svc = require('./serviceaccountkey.json');
admin.initializeApp({ credential: admin.credential.cert(svc) });
admin.firestore().doc('users/SyACMZK2tFUNNsQDyJUFQ4VaRWk2').get()
  .then(d => console.log(d.exists ? JSON.stringify(d.data()) : 'MISSING'))
  .catch(e => { console.error(e.message); process.exit(1); });
