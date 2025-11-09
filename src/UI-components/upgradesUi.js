// src/components/GoldUI.js
import React from "react";
import { useUpgradeStore } from "../stores/upgradesStore";
import '../css/upgradesUi.css';

export default function UpgradesUI() {
  const { getAvailableUpgrades, buyUpgrade } = useUpgradeStore();
  const upgrades = getAvailableUpgrades();

  return (
    <div className="upgrades-container">
      <UpgradeButtons upgrades={upgrades} buyUpgrade={buyUpgrade} />
    </div>
  );
}

function UpgradeButtons({ upgrades, buyUpgrade, _className, _children, ..._props }) {
  return upgrades.map((x) => {
    return upgradeButton(x, buyUpgrade);
  });
}

function upgradeButton(upgrade, buyUpgrade) {
  if (!upgrade) { console.log("help"); return; }
  return (
    <div className="upgrade-button-container">
      <div className="upgrade-button-header">{upgrade.name}</div>
      <div className="upgrade-button-body">
        <div className="upgrade-button-info">
          {upgrade.cost.map((x) => {
            return (
              <div>{x[0]}: {x[1]}</div>
            );
          })}
          <div className="description">{upgrade.description}</div>
        </div>
        <button className="upgrade-button-button" onClick={() => buyUpgrade(upgrade.index)}></button>
      </div>
    </div >
  );
}
