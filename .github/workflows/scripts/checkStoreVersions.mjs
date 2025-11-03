#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

const baseBranch = process.env.GITHUB_BASE_REF || 'origin/main';

// Get changed files in the PR
const changedFiles = execSync(`git diff --name-only ${baseBranch}...HEAD -- src/stores/`, { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter(file => file !== 'src/stores/templateStore.js');

const versionRegex = /^\s*version\s*=\s*\d+,?$/m;
let failed = false;

for (const file of changedFiles) {
  try {
    const newContent = fs.readFileSync(file, 'utf8');
    const oldContent = execSync(`git show ${baseBranch}:${file}`, { encoding: 'utf8' });

    function extractVersion(x) {
      const string = x.match(versionRegex)?.[0];
      if (!string) return;
      return Number(string.substring(string.lastIndexOf("=") + 1, string.lastIndexOf(",")));
    }

    const newVersion = extractVersion(newContent)
    if (!newVersion) {
      console.error(`${file} changed but no version`);
      failed = true;
    }

    const oldVersion = extractVersion(oldContent)

    if (oldVersion !== undefined && newVersion <= oldVersion) {
      console.error(`${file} changed but version not incremented (${oldVersion} → ${newVersion})`);
      failed = true;
    }
  } catch (e) {
    // probably a new file; skip
    console.log(e)
  }
}

if (failed) {
  console.error('\n PR check failed: Please bump the store version(s).');
  process.exit(1);
}

console.log('Store version check passed.');
