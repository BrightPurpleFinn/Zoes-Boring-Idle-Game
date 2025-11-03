#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

const baseBranch = process.env.GITHUB_BASE_REF || 'origin/main';

// Get changed files in the PR
const changedFiles = execSync(`git diff --name-only ${baseBranch}...HEAD -- src/stores/`, { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

console.log(changedFiles)

const versionRegex = /^version\s*=\s*\d+,?$/;
let failed = false;

for (const file of changedFiles) {
  try {
    const newContent = fs.readFileSync(file, 'utf8');
    const oldContent = execSync(`git show ${baseBranch}:${file}`, { encoding: 'utf8' });

    const newMatch = newContent.match(versionRegex);
    const oldMatch = oldContent.match(versionRegex);
    console.log("help")
    console.log(newMatch)
    if (!newMatch) continue;
console.log("help")
    const newVersion = parseInt(newMatch[1]);
    const oldVersion = oldMatch ? parseInt(oldMatch[1]) : undefined;

    if (oldVersion !== undefined && newVersion <= oldVersion) {
      console.error(`${file} changed but version not incremented (${oldVersion} → ${newVersion})`);
      failed = true;
    }
  } catch (e) {
    // probably a new file; skip
    console.log('e')
  }
}

if (failed) {
  console.error('\n PR check failed: Please bump the store version(s).');
  process.exit(1);
}

console.log('Store version check passed.');
