// src/components/GoldUI.js
import React, { useState } from "react";
import { useGoldStore } from "../stores/goldStore";

export default function GoldUI() {
  const [visible, setVisible] = useState(true);
  const {
    gold,
    goldPerSecond,
    addGold,
    pickaxeLevel,
    pickaxeCost,
    upgradePickaxe,
    minerLevel,
    minerCost,
    upgradeMiner,
    reset,
  } = useGoldStore();

  return (
    <div className="goldUI" style={{ textAlign: "center", marginTop: "20px", fontFamily: "sans-serif" }}>
      <button
        onClick={() => setVisible((v) => !v)}
        style={{
          marginBottom: "15px",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {visible ? "Hide UI" : "Show UI"}
      </button>

      {visible && (
        <div className="goldUIInternal">
          <h1>💰 Simple Gold Counter</h1>
          <h2>
                        Gold: {gold.toFixed(2)} | Gold/s: {goldPerSecond.toFixed(2)}
          </h2>

          <div style={{ marginTop: "20px" }}>
            <button onClick={addGold}>Mine Gold</button>
            <br />
            <button onClick={upgradePickaxe}>
                            Pickaxe Lvl: {pickaxeLevel} <br /> Cost: {pickaxeCost}
            </button>
            <br />
            <button onClick={upgradeMiner}>
                            Miner Lvl: {minerLevel} <br /> Cost: {minerCost}
            </button>
            <br />
            <button onClick={reset}>RESET</button>
          </div>
        </div>
      )}
    </div>
  );
}
