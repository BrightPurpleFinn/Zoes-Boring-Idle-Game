import React, { useState, useEffect } from "react";
import { useGoldStore } from "../../../stores/goldStore";
import HoldButton from "../../button/holdButton";

export default function HoldToMine() {
  //avoid re-rendering of this component by making a specific "mine gold" function that auto adds goldPerClick

  const goldPerClick = useGoldStore(state => state.goldPerClick);
  const updateGold = useGoldStore(state => state.updateGold);
  
  return (
    <HoldButton onHold={() => updateGold(goldPerClick)}>Hold to Mine Gold</HoldButton>
  );
}
