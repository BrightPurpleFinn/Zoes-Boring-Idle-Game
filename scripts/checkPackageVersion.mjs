import { existsSync, readFileSync, readdirSync } from "fs";

let failed = false;

const eventPath = process.env.GITHUB_EVENT_PATH;
const targetBranch = JSON.parse(readFileSync(eventPath, 'utf-8')).pull_request.base.ref;
const logReleasePath = "changelogs/logRelease.json";
const logPath = "changelogs/log.json"

switch(targetBranch) {
  case "main":
    mainChecks();
    break;
  case "release":
    releaseChecks();
    break;
}

if (failed) {
  process.exit(1);
} else {
  console.log(`Check passes.`)
}

function releaseChecks() {
  if (!existsSync(logReleasePath)) {
    console.log(readdirSync(__dirname))
    console.error("No Realease change log file");
    failed = true;
  } 
}

function mainChecks() {
  if (existsSync(logReleasePath)) {
    console.error("Change log file has not been merged");
    failed = true;
  } 
}