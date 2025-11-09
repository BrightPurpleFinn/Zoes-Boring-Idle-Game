import React from "react";
import { useGoldStore } from "../../../stores/goldStore";
import HoldButton from "../../button/holdButton";

export default function UpgradeMiner() {

  const upgradeMiner = useGoldStore(state => state.upgradeMiner);
  const minerLevel = useGoldStore(state => state.minerLevel);
  const minerCost = useGoldStore(state => state.minerCost);
  
  return (
    <HoldButton onHold={() => upgradeMiner()}>Miner Lvl: {minerLevel} <br /> Cost: {minerCost}</HoldButton>
  );
}
