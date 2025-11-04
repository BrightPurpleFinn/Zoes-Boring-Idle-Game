const properties = [
  ["name", "string"], 
  ["description", "string"],
  ["cost", {type: "array", size: 2}],
  ["stores", {type: "array"}],
  ["index", "number"]
];

function checkType(value, type) {
  if (type.type == "array") {
    return Array.isArray(value) && type.size ? value[0].length == type.size : true;
  }
  return (typeof value) == type;
}

function validateUpgrade(obj) {
  properties.forEach(prop => {
    const path = prop[0];
    const expectedType = prop[1];

    const value = path.split('.').reduce((o, key) => {
      if (o === undefined) {
        throw new Error(`Error: ${obj.name} has no ${path}`);
      }
      return o[key];
    }, obj);

    if (value === undefined) {
      throw new Error(`Error: ${obj.name} has no ${path}`);
    }
    if (!checkType(value, expectedType)) {
      throw new Error(`Error: ${obj.name}'s ${path} is ${typeof value} and not ${expectedType}`);
    }
  });

  return true;
}

function newUpgrade(x) {
  const upgrade = {
    name: x[0],
    description: x[1],
    cost: x[2],
    stores: x[3],
    index: x[4]
  };
  try {
    validateUpgrade(upgrade);
  } catch (e) {
    console.log(e);
    return;
  }
  return upgrade;
}

export function newUpgrades(upgrades) {
  return upgrades.map((x) => {
    return newUpgrade(x);
  }).filter((x) => x !== undefined);
}
