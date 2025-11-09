import React, { useState, useEffect } from "react";
import '../../css/misc/changelog.css';
import ReactDOM from "react-dom";

function ChangeLog({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="changelog-container">
      <div className="changelog-content">
        {children}
        <button style={{ fontSize: "16px" }} onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default function Changelog() {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null);


  useEffect(() => {
    // Define an async function inside useEffect
    async function fetchLogs() {
      try {
        const response = await fetch('./changelogs/log.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setLogs(data); // update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs(); // call the async function
  }, []);

  
  if (loading) return <p>Loading changelog...</p>;
  if (error) return <p>Error: {error}</p>;

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
                      <div className="changelog-update-date">( {(new Date(x.date)).toLocaleDateString()} ) - v{x.version}</div>
                    </div>
                    <div className="changelog-update-body">
                      {x.patches.major.length != 0 && <div className="changelog-update-patches-major-container">
                        <div className="changelog-update-patches-header">Major updates:</div>
                        <div className="changelog-update-patches-major-body">
                          {
                            x.patches.major.map((y) => {
                              return <div>{y}</div>;
                            })
                          }
                        </div>
                      </div>}
                      {x.patches.minor.length != 0 && <div className="changelog-update-patches-minor-container">
                        <div className="changelog-update-patches-header">Minor updates:</div>
                        <div className="changelog-update-patches-minor-body">
                          {
                            x.patches.minor.map((y) => {
                              return <div>{y}</div>;
                            })
                          }
                        </div>
                      </div>}
                      {x.patches.fix.length != 0 && <div className="changelog-update-patches-fix-container">
                        <div className="changelog-update-patches-header">Fixes:</div>
                        <div className="changelog-update-patches-fix-body">
                          {
                            x.patches.fix.map((y) => {
                              return <div>{y}</div>;
                            })
                          }
                        </div>
                      </div>}
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
