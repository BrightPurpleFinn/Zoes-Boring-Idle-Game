// IdleGame.jsx
import GameLoop from "./gameLoop";
import { Toaster } from "react-hot-toast";
import GoldUI from "./UI-components/goldUi";
import React from "react";

export default function App() {

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <Toaster position="top-right" containerClassName="toasterDiv" />
      <GoldUI />
      <GameLoop />
    </div>
  );
}
