// IdleGame.jsx
import GameLoop from "./gameLoop";
import { Toaster } from "react-hot-toast";
import GoldUI from "./UI-components/goldUi";
import UpgradesUI from "./UI-components/upgradesUi";
import React from "react";
import VersionBadge from "./UI-components/version";
import '../src/css/app.css';
import { useGoldStore } from "./stores/goldStore";
import { useUpgradeStore } from "./stores/upgradesStore";
import Changelog from "./UI-components/misc/changelog";

export default function App() {
  const { reset: resetGold } = useGoldStore();
  const { reset: resetUpgrades } = useUpgradeStore();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="game-container">
        <div className="main-game">
          <GoldUI />
        </div>
        <div className="upgrades">
          <UpgradesUI />
        </div>
      </div>
      <button className="reset" onClick={() => { resetGold(); resetUpgrades(); }}>RESET</button>
      <Toaster position="top-right" containerClassName="toasterDiv" />
      <GameLoop />
      <VersionBadge />
      <Changelog />
    </div>
  );
}
