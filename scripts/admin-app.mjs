// Shared Firebase Admin setup for the command-line scripts.
import { cert, initializeApp } from "firebase-admin/app";

export const usingEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;

export function adminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) {
    console.error("FIREBASE_PROJECT_ID is not set. Did you create the env file? See QUOTES.md.");
    process.exit(1);
  }
  if (usingEmulator) return initializeApp({ projectId });
  return initializeApp({
    credential: cert({
      projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Tolerates the key with or without surrounding quotes, and with \n escapes.
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.trim().replace(/^"|"$/g, "").replace(/\\n/g, "\n"),
    }),
  });
}
