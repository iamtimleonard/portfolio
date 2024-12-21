"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import frequencies from "./frequencies";
import styles from "./synth.module.css";

export default function Page() {
  const [synthType, setSynthType] = useState<OscillatorType>("sine");
  const [started, setStarted] = useState<boolean>(false);
  const [pressed, setPressed] = useState<string>("");
  const [gain, setGain] = useState<number>(0.75)

  const timeout = useRef(null)
  const audioContext = useRef(new AudioContext())
  const oscillator = useRef(new OscillatorNode(audioContext.current));
  const gainNode = useRef(new GainNode(audioContext.current, {
    gain: 0,
  }));

  oscillator.current.connect(gainNode.current);
  gainNode.current.connect(audioContext.current.destination);

  const handleKeyboardInput = useCallback((e: KeyboardEvent) => {
    console.log(gain)
    if (frequencies[e.key]) {
      if (timeout.current) clearTimeout(timeout.current);
      oscillator.current.frequency.value = frequencies[e.key].frequency;
      gainNode.current.gain.linearRampToValueAtTime(gain, audioContext.current.currentTime + .5);
      timeout.current = setTimeout(() => {
        gainNode.current.gain.linearRampToValueAtTime(0, 0.75);
      }, 500);
      setPressed(e.key);
      setTimeout(() => setPressed(""), 1000);
    }
    return;
  }, [gain]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput);
    return () => document.removeEventListener("keydown", handleKeyboardInput)
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
            <input type="range" name="ramp" min={0} max={2000} />
          </div>
        </div>
      </div>
    </div>
  );
}
