import React from "react";
import { useGoldStore } from "../../../stores/goldStore";
import HoldButton from "../../button/holdButton";

export default function UpgradePickaxe() {

  const upgradePickaxe = useGoldStore(state => state.upgradePickaxe);
  const pickaxeLevel = useGoldStore(state => state.pickaxeLevel);
  const pickaxeCost = useGoldStore(state => state.pickaxeCost);
  
  return (
    <HoldButton onHold={() => upgradePickaxe()}> Pickaxe Lvl: {pickaxeLevel} <br /> Cost: {pickaxeCost}</HoldButton>
  );
}
