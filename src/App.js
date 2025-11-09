// IdleGame.jsx
import GameLoop from "./gameLoop";
import { Toaster } from "react-hot-toast";
import GoldUI from "./UI-components/gold/goldUi.js";
import UpgradesUI from "./UI-components/upgradesUi";
import React, { useEffect } from "react";
import VersionBadge from "./UI-components/version";
import '../src/css/app.css';
import Changelog from "./UI-components/misc/changelog.js";
import ResetButton from './UI-components/button/resetButton.js';

export default function App() {
  useEffect(() => {
    console.log("Component committed to the DOM");
  });

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
      <ResetButton />
      <Toaster position="top-right" containerClassName="toasterDiv" />
      <GameLoop />
      <VersionBadge />
      <Changelog />
    </div>
  );
}
