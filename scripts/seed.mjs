// Loads the starting price list (scripts/seed-data/prices.json).
// Against the emulator it also creates the test admin login from .env.development.local.
//
//   npm run seed                    local emulator
//   npm run seed -- --replace       replace the existing price list
//   npm run seed:prod               live Firebase project (uses .env.production.local)
import { readFileSync } from "node:fs";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { adminApp, usingEmulator } from "./admin-app.mjs";

const app = adminApp();
const db = getFirestore(app);
const replace = process.argv.includes("--replace");
const { prices } = JSON.parse(readFileSync(new URL("./seed-data/prices.json", import.meta.url), "utf8"));

const existing = await db.collection("prices").get();
if (existing.empty || replace) {
  const batch = db.batch();
  if (replace) existing.docs.forEach((d) => batch.delete(d.ref));
  prices.forEach((p, i) => {
    batch.set(db.collection("prices").doc(), {
      name: p.name,
      description: p.description ?? "",
      price: Math.round(p.price * 100),
      autoAddFor: p.autoAddFor ?? [],
      order: i + 1,
      active: true,
    });
  });
  await batch.commit();
  console.log(`Loaded ${prices.length} price list items.`);
} else {
  console.log(`${existing.size} price list items already exist. Run with --replace to overwrite them.`);
}

if (usingEmulator) {
  const email = process.env.DEV_ADMIN_EMAIL;
  const password = process.env.DEV_ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("Set DEV_ADMIN_EMAIL and DEV_ADMIN_PASSWORD in .env.development.local.");
    process.exit(1);
  }
  const auth = getAuth(app);
  const user = await auth.getUserByEmail(email).catch(() => auth.createUser({ email, password }));
  await db.doc(`admins/${user.uid}`).set({ email });
  console.log(`Test admin ready: ${email} (password is in .env.development.local)`);
}
process.exit(0);
