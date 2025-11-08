import fs from "fs";
import path from "path";
import { execSync } from 'child_process';


const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const baseBranch = process.env.GITHUB_BASE_REF || 'origin/main';

// filter packageJson looking for version, check if version is different to previous version.

console.log(packageJson.version)


const changedFiles = execSync(`git diff --name-only ${baseBranch}...HEAD -- package.json`, { encoding: 'utf8' })

console.log(changedFiles)