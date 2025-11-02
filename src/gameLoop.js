import { useEffect, useRef } from "react";
import { useGoldStore } from "./stores/goldStore";

export default function GameLoop({ fps = 60 }) { // allow adjustable FPS
  const goldStoreTick = useGoldStore((s) => s.tick);
  const lastTimeRef = useRef(performance.now());
  const accumulatorRef = useRef(0);
  const frameDuration = 1000 / fps; // desired ms per tick

  useEffect(() => {
    let frameId;

    const loop = (time) => {
      const lastTime = lastTimeRef.current;
      const delta = time - lastTime;
      lastTimeRef.current = time;

      accumulatorRef.current += delta;

      // Run tick logic at a fixed rate
      while (accumulatorRef.current >= frameDuration) {
        goldStoreTick(frameDuration); // pass fixed timestep
        accumulatorRef.current -= frameDuration;
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [goldStoreTick, frameDuration]);

  return null; // nothing visual here
}
