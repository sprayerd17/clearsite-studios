// Starts the Firebase emulators, keeping test data between runs in .emulator-data/.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const dir = ".emulator-data";
const args = ["firebase", "emulators:start", "--project", "demo-clearsite", `--export-on-exit=${dir}`];
if (existsSync(dir)) args.push(`--import=${dir}`);

const child = spawn(`npx ${args.join(" ")}`, { stdio: "inherit", shell: true });
child.on("exit", (code) => process.exit(code ?? 0));
