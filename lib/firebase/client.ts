import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import { connectFirestoreEmulator, initializeFirestore, type Firestore } from "firebase/firestore";

interface FirebaseClient {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

const globalForFirebase = globalThis as { __firebaseClient?: FirebaseClient };

/** Browser-side Firebase, used only by the admin pages. Initialised lazily on first use. */
export function fb(): FirebaseClient {
  if (globalForFirebase.__firebaseClient) return globalForFirebase.__firebaseClient;

  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });

  const auth = getAuth(app);
  const db = initializeFirestore(app, { ignoreUndefinedProperties: true });

  if (process.env.NEXT_PUBLIC_USE_EMULATORS === "true") {
    // Ports match firebase.json (chosen so they don't clash with other local projects).
    connectAuthEmulator(auth, "http://127.0.0.1:9095", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8085);
  }

  globalForFirebase.__firebaseClient = { app, auth, db };
  return globalForFirebase.__firebaseClient;
}
