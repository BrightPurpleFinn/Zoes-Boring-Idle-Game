import React, { useEffect } from "react";
import { useGoldStore } from "../../stores/goldStore";
import { useUpgradeStore } from "../../stores/upgradesStore";

export default function ResetButton({ _children, ..._props }) {
  useEffect(() => {
    console.log("Component committed to the DOM");
  });

  const handleReset = () => {
    useGoldStore(state => state.reset)();
    useUpgradeStore(state => state.reset)();

  };

  return (
    <button className="reset" onClick={() => { handleReset(); }}>RESET</button>
  );
}
