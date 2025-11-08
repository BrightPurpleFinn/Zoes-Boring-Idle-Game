import React, { useState } from "react";
import '../../css/misc/changelog.css';
import ReactDOM from "react-dom";

function ChangeLog({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="changelog-container">
      <div className="changelog-content">
        {children}
        <button style={{fontSize: "16px"}} onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

async function loadLogs() {
  const response = await fetch('./changelogs/log.json');
  return response.json();
}

const logs = loadLogs();

export default function Changelog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open Changelog</button>

      {open && (
        <ChangeLog onClose={() => setOpen(false)}>
          <div className="changelog-header">Change Log</div>
          <div className="changelog-updates-container">
            {
              logs.map((x) => {
                return (
                  <div className="changelog-update-container">
                    <div className="changelog-update-header">
                      <div className="changelog-update-name">{x.releaseName}</div>
                      <div className="changelog-update-date">({x.date}) - {x.version}</div>
                    </div>
                    <div className="changelog-update-body">
                      <div className="changelog-update-patches-major-container">
                        <div className="changelog-update-patches-header">Major updates:</div>
                        <div className="changelog-update-patches-major-body">
                          {
                            x.patches.major.map((x) => {
                              return <div>{x}</div>;
                            })
                          }
                        </div>
                      </div>
                      <div className="changelog-update-patches-minor-container">
                        <div className="changelog-update-patches-header">Minor updates:</div>
                        <div className="changelog-update-patches-minor-body">
                          {
                            x.patches.minor.map((x) => {
                              return <div>{x}</div>;
                            })
                          }
                        </div>
                      </div>
                      <div className="changelog-update-patches-fix-container">
                        <div className="changelog-update-patches-header">Fix updates:</div>
                        <div className="changelog-update-patches-fix-body">
                          {
                            x.patches.fix.map((x) => {
                              return <div>{x}</div>;
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </ChangeLog>
      )}
    </div>
  );
}
