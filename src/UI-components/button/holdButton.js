import React, { useRef } from 'react';

const interval = 333;

function HoldButton({ onHold, children, ...props }) {
  const intervalRef = useRef(null);

  const start = () => {
    onHold(); // trigger once immediately
    intervalRef.current = setInterval(onHold, interval);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <button
      onMouseDown={start}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      {...props}
    >
      {children}
    </button>
  );
}

export default HoldButton;
