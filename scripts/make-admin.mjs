// Gives an existing Firebase Auth user access to /admin.
//   npm run make-admin -- you@example.com
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { adminApp } from "./admin-app.mjs";

const email = process.argv[2];
if (!email) {
  console.error("Usage: npm run make-admin -- someone@example.com");
  process.exit(1);
}

const app = adminApp();
const user = await getAuth(app).getUserByEmail(email).catch(() => null);
if (!user) {
  console.error(`No user with email ${email}. Create them first in Firebase console → Authentication → Users.`);
  process.exit(1);
}
await getFirestore(app).doc(`admins/${user.uid}`).set({ email });
console.log(`${email} is now an admin.`);
process.exit(0);
