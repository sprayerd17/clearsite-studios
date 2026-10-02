// Uploads firestore.rules and storage.rules to Firebase using the service account
// key — no `firebase login` needed.
//
//   npm run deploy:rules           live project (.env.production.local)
import { readFileSync } from "node:fs";
import { getSecurityRules } from "firebase-admin/security-rules";
import { adminApp, usingEmulator } from "./admin-app.mjs";

if (usingEmulator) {
  console.log("The emulators read firestore.rules / storage.rules directly — nothing to deploy locally.");
  process.exit(0);
}

const app = adminApp();
const rules = getSecurityRules(app);

const firestore = await rules.releaseFirestoreRulesetFromSource(readFileSync("firestore.rules", "utf8"));
console.log(`Firestore rules deployed (${firestore.name.split("/").pop()}).`);

const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
if (bucket) {
  const storage = await rules.releaseStorageRulesetFromSource(readFileSync("storage.rules", "utf8"), bucket);
  console.log(`Storage rules deployed (${storage.name.split("/").pop()}).`);
}
process.exit(0);
