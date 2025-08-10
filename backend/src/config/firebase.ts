// src/config/firebase.ts

import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // storageBucket: "fitnessai-4a18d.appspot.com"
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
