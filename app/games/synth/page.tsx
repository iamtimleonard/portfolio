"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import frequencies from "./frequencies";
import styles from "./synth.module.css";

const Page = () => {
  const [synthType, setSynthType] = useState<OscillatorType>("sine");
  const [started, setStarted] = useState<boolean>(false);
  const [pressed, setPressed] = useState<string>("");
  const [gain, setGain] = useState<number>(0.75)
  const [attack, setAttack] = useState<number>(500)

  const audioContext = useRef(new AudioContext())
  const oscillator = useRef(new OscillatorNode(audioContext.current));
  const gainNode = useRef(new GainNode(audioContext.current, {
    gain: 0,
  }));

  oscillator.current.connect(gainNode.current);
  gainNode.current.connect(audioContext.current.destination);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (frequencies[e.key]) {
      oscillator.current.frequency.value = frequencies[e.key].frequency;
      gainNode.current.gain.linearRampToValueAtTime(gain, audioContext.current.currentTime + (attack / 1000));
    }
    return;
  }, [gain]);

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    gainNode.current.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.75); 
  }, [gain])

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup)
    return () => { 
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("keyup", handleKeyup)
     }
  }, [gain]);

  return (
    <div className={styles.container}>
      <div className={styles.control}>
      {!started && (
        <button className={styles.start}
          onClick={() => {
            oscillator.current.start();
            setStarted(true);
          }}
        >
          start
        </button>
      )}
      </div>
      <div className={styles.module}>
        <div className={styles.keyboard}>
          {Object.values(frequencies).map(({ key, frequency, note, type }) => (
            <div
              className={`${styles[type]} ${pressed === key && styles.pressed}`}
              key={frequency}
            >
              {note}
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <select
            name="wave"
            className={styles.wave}
            onChange={(e) => {
              oscillator.current.type = e.target.value as OscillatorType;
              setSynthType(e.target.value as OscillatorType);
            }}
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
          <div>
            <label htmlFor="gain">Volume</label>
            <input type="range" name="gain" min={0} max={1} step={.05} value={gain} onChange={(e) => setGain(+e.target.value)} />
            <span>{gain * 100}%</span>
          </div><div>
            <label htmlFor="attack">Attack</label>
            <input type="range" name="ramp" min={0} max={2000} value={attack} onChange={(e) => setAttack(+e.target.value)} />
            <span>{attack}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// this uses browser only APIs so it will error on prerender if ssr is not disabled
export default dynamic(() => Promise.resolve(Page), { ssr: false })
