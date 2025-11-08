import { promisify } from "util";
import { exec } from "child_process";
import { writeFileSync, watchFile, readFile, unwatchFile, unlinkSync, readFileSync, existsSync  } from "fs";
import inquirer from "inquirer";
import { updateVersion } from "./updateVersion.mjs";
const execAsync = promisify(exec);

const { patchType } = await inquirer.prompt([{
    type: "list",
    name: "patchType",
    message: "Pick an option:",
    choices: [
      {name: "basic", value: -1},
      {name: "fix", value: 2},
      {name: "minor", value: 1},
      {name: "major", value: 0}
    ]}
]);

let conversion = {
  "-1": "basic",
  "0": "major",
  "1": "minor",
  "2": "fix"
}

const newVersion = updateVersion(patchType)

if (patchType == -1) { process.exit() };

await execAsync("git pull")

const file = "changeLogs/temp.json";

const initialFile = `{
  "finished": false,
  "patchTitle": "",
  "changes": [
  ]
}`;

writeFileSync(file, initialFile, "utf8");

exec(`code ${file}`);

function validateLog(log) {
  return log.patchTitle.length >= 5 && log.changes.length >= 1;
}

let logReleasePath = 'changeLogs/logRelease.json';
if (!existsSync(logReleasePath)) {
  writeFileSync(logReleasePath, `[]`, "utf8");
}

let logReleaseJSON = JSON.parse(readFileSync(logReleasePath));

const watcher = watchFile(file, { interval: 300 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    readFile(file, 'utf8', (err, data) => {
      try {
        let tempLog = JSON.parse(data);
        validateLog(tempLog)
        if (tempLog.finished && validateLog(tempLog)) {
          delete tempLog["finished"];
          tempLog.patchType = conversion[patchType];
          tempLog.version = newVersion;
          logReleaseJSON.push(tempLog);
          writeFileSync(logReleasePath, JSON.stringify(logReleaseJSON, null, 2), "utf8");
          exec(`code ${logReleasePath}`);
          unlinkSync(file);
          unwatchFile(file);
        }
      } catch (e) {
        console.log(e.message)
      }
    });
  }
});