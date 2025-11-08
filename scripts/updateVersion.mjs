import fs from "fs";


export function updateVersion(patchType) {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const currentVersion = packageJson.version.split(".").map((x) => Number(x));
  console.log(packageJson)

  console.log(packageJson.version)
  console.log(currentVersion)
  currentVersion[patchType]++;
  switch (patchType) {
    case 0: //major
      currentVersion[1] = 0;
    case 1: //minor
      currentVersion[2] = 0;
      break;
  }

  packageJson.version = `${currentVersion.join(".")}`

  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

  return packageJson.version;
}