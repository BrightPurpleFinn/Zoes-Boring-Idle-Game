import React, { useState, useEffect } from "react";
import { useGoldStore } from "../../../stores/goldStore";
import HoldButton from "../../button/holdButton";

export default function UpgradeMiner() {
  useEffect(() => {
    console.log("Component committed to the DOM");
  });

  const upgradeMiner = useGoldStore(state => state.upgradeMiner);
  const minerLevel = useGoldStore(state => state.minerLevel);
  const minerCost = useGoldStore(state => state.minerCost);
  
  return (
    <HoldButton onHold={() => upgradeMiner()}>Miner Lvl: {minerLevel} <br /> Cost: {minerCost}</HoldButton>
  );
}
