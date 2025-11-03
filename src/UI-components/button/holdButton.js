import React, { useRef } from 'react';

const interval = 333;

/**
 * @param {function} onHold - Function to execute when button is held
 * @param {string} className - Classname for Div of button
 * @returns {} HoldButton
 */
function HoldButton({ onHold, className, children, ...props }) {
    const intervalRef = useRef(null);

    const start = () => {
        onHold(); // trigger once immediately
        intervalRef.current = setInterval(onHold, interval);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
    };

    return (
        <div className={className}>
            <button className='HoldButton'
                onMouseDown={start}
                onMouseUp={stop}
                onMouseLeave={stop}
                onTouchStart={start}
                onTouchEnd={stop}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}

export default HoldButton;
