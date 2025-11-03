import React from "react";
import packageJson from "../../package.json";

export default function VersionBadge() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        background: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        fontSize: "0.8rem",
        fontFamily: "monospace",
        padding: "0.3rem 0.6rem",
        borderRadius: "0.5rem",
        zIndex: 9999,
        pointerEvents: "none", 
      }}
    >
      v{packageJson.version}
    </div>
  );
}
