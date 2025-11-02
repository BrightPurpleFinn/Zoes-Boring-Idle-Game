// IdleGame.jsx
import React from "react";
import { useGoldStore } from "./stores/goldStore";
import GameLoop from "./gameLoop";
import { Toaster } from "react-hot-toast";

export default function IdleGame() {
  const { gold, addGold, pickaxeLevel, pickaxeCost, upgradePickaxe, minerLevel, minerCost, 
    upgradeMiner, goldPerSecond, reset} = useGoldStore(); 

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <Toaster position="top-right" />
      <h1>💰 Simple Gold Counter</h1>
      <h2>Gold: {gold.toFixed(2)} Gold/s: {goldPerSecond}</h2>
      <button onClick={addGold}>Mine Gold</button>
      <h>THIS IS A FAKE PR TO TEST THE YAML SCRIPT TO AUTO-TEST</h>
      <br/>
      <button onClick={upgradePickaxe}>Level: {pickaxeLevel}<br/>Cost: {pickaxeCost}</button>
      <br/>
      <button onClick={upgradeMiner}>Level: {minerLevel}<br/>Cost: {minerCost}</button>
      <br/>
      <button onClick={reset}>RESET</button>
      <GameLoop />
    </div>
  );
}
