import { readFileSync, writeFileSync, unlinkSync } from "fs"
import inquirer from "inquirer";

const logReleasePath = "public/changelogs/logRelease.json"
const logRelease = JSON.parse(readFileSync(logReleasePath, "utf8"));
const logPath = "public/changelogs/log.json"
const log = JSON.parse(readFileSync(logPath, "utf8"));

const {releaseName} = await inquirer.prompt([{
    type: "input",
    name: "releaseName",
    message: "What is the release name:",
    }
]);

const newRecord = JSON.parse("{}")

newRecord.releaseName = releaseName
newRecord.version = JSON.parse(readFileSync("package.json", "utf8")).version;

newRecord.date = new Date();
newRecord.patches = {fix: [], minor: [], major: []}

for (let x of logRelease) {
    const patchRecord = {patchTitle: x.patchTitle, changes: x.changes}
    newRecord.patches[x.patchType].push(patchRecord)
}

log.push(newRecord)
console.log(log);

writeFileSync(logPath, JSON.stringify(log, null, 2))
unlinkSync(logReleasePath);