import fs from "fs";
import path from "path";
import { execSync } from 'child_process';

let failed = false;
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const baseBranch = process.env.GITHUB_BASE_REF || 'origin/main';

const newVersion = packageJson.version

const changedFiles = execSync(`git diff --name-only ${baseBranch}...HEAD -- package.json`, { encoding: 'utf8' })
  .split('\n')


if (!changedFiles.includes("package.json")) {
  failed = true;
} else {
  try {
    const oldVersion = JSON.parse(execSync(`git show ${baseBranch}:package.json`, { encoding: 'utf8' })).version;
    if (oldVersion == newVersion) {
      failed = true;
    }
  } catch (e) {
    throw e;
  }
}

if (failed) {
  console.error(`PR check failed: Please bump the package version from ${newVersion}.`);
  process.exit(1);
} else {
  console.log(`Version is bumped. Check passes.`)
}