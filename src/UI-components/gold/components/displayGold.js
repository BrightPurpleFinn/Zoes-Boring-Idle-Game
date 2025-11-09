import React from "react";
import { useGoldStore } from "../../../stores/goldStore";

export default function DisplayGold() {

  const gold = useGoldStore(state => state.gold);
  const goldPerSecond = useGoldStore(state => state.goldPerSecond) || 1 ;

  return (
    <div className="goldUI" style={{ textAlign: "center", marginTop: "20px", fontFamily: "sans-serif" }}>
      <h2>
        Gold: {gold.toFixed(2)} | Gold/s: {goldPerSecond.toFixed(2)}
      </h2>
    </div>
  );
}
