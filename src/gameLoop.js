import { useEffect, useRef } from "react";
import { useGoldStore } from "./stores/goldStore";

export default function GameLoop() { // allow adjustable FPS
  const goldStoreTick = useGoldStore((s) => s.tick);
  const lastTimeRef = useRef(performance.now());
  const accumulatorRef = useRef(0);
  const second = 1000;
  const frameDuration = second / fps; // desired ms per tick
  const fps = 60;

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
