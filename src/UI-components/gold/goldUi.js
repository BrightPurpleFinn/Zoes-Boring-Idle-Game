// src/components/GoldUI.js
import React, { useEffect } from "react";
import DisplayGold from "./components/displayGold";
import HoldToMine from "./components/holdToMine";
import UpgradePickaxe from "./components/upgradePickaxe";
import UpgradeMiner from "./components/upgradeMiner";

export default function GoldUI() {
  useEffect(() => {
    console.log("Component committed to the DOM");
  });

  return (
    <div className="goldUI" style={{ textAlign: "center", marginTop: "20px", fontFamily: "sans-serif" }}>
      <div className="goldUIInternal">
        <h1>💰 Simple Gold Counter</h1>
        <DisplayGold/>

        <div style={{ marginTop: "20px" }}>
          <HoldToMine />
          <UpgradePickaxe />
          <UpgradeMiner />
        </div>
      </div>
    </div>
  );
}
