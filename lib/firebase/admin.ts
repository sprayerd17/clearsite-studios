import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Same setup as the RAD Cricket app. firebase-admin/auth is deliberately not used
// at runtime (its jwks-rsa dependency doesn't load on some serverless runtimes).

const globalForAdmin = globalThis as { __adminDb?: Firestore };

/**
 * True when the server can reach Firebase — either the local emulators or a real
 * project with a service account. Until then the quote form falls back to email.
 */
export function isFirebaseConfigured(): boolean {
  if (process.env.FIRESTORE_EMULATOR_HOST) return true;
  return Boolean(
    process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY,
  );
}

function adminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  // Against the local emulator no credentials are needed.
  if (process.env.FIRESTORE_EMULATOR_HOST) return initializeApp({ projectId, storageBucket });

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Tolerates the key pasted with or without surrounding quotes (e.g. into Vercel), with \n escapes.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim().replace(/^"|"$/g, "").replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY environment variables.",
    );
  }
  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
}

/** Server-side Firestore with full access. Used by the public quote form and client pages. */
export function adminDb(): Firestore {
  if (!globalForAdmin.__adminDb) {
    const db = getFirestore(adminApp());
    db.settings({ ignoreUndefinedProperties: true });
    globalForAdmin.__adminDb = db;
  }
  return globalForAdmin.__adminDb;
}

/**
 * Saves a file to Storage and returns a Firebase download URL for it.
 * The URL carries its own unguessable token, so it works without signing in.
 */
export async function uploadToStorage(path: string, data: Buffer, contentType: string): Promise<string> {
  const { getStorage } = await import("firebase-admin/storage");
  const bucket = getStorage(adminApp()).bucket();
  const token = crypto.randomUUID();
  await bucket.file(path).save(data, {
    contentType,
    resumable: false,
    metadata: { metadata: { firebaseStorageDownloadTokens: token } },
  });
  const emulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  const base = emulator ? `http://${emulator}` : "https://firebasestorage.googleapis.com";
  return `${base}/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
}

/**
 * Checks a Firebase ID token belongs to an admin and returns their uid, or null.
 * Firebase Auth's REST API validates the token (signature and expiry).
 */
export async function verifyAdmin(idToken: string): Promise<string | null> {
  try {
    const emulator = process.env.FIREBASE_AUTH_EMULATOR_HOST;
    const base = emulator ? `http://${emulator}/identitytoolkit.googleapis.com` : "https://identitytoolkit.googleapis.com";
    const res = await fetch(`${base}/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) return null;
    const uid = ((await res.json()) as { users?: { localId?: string }[] }).users?.[0]?.localId;
    if (!uid) return null;
    const admin = await adminDb().doc(`admins/${uid}`).get();
    return admin.exists ? uid : null;
  } catch {
    return null;
  }
}

export async function deleteFromStorage(path: string): Promise<void> {
  const { getStorage } = await import("firebase-admin/storage");
  await getStorage(adminApp()).bucket().file(path).delete({ ignoreNotFound: true });
}
