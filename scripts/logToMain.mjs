import { readFileSync, writeFileSync, unlinkSync } from "fs"

const logReleasePath = "logs/logRelease.json"
const logRelease = JSON.parse(readFileSync(logReleasePath, "utf8"));
const logPath = "logs/log.json"
const log = JSON.parse(readFileSync(logPath, "utf8"));

log.push(logRelease)
console.log(log);

writeFileSync(logPath, JSON.stringify(log, null, 2))
unlinkSync(logReleasePath);