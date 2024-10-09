"use client";

import { useCallback, useEffect, useState } from "react";
import frequencies from "./frequencies";
import styles from "./synth.module.css";

const audioContext = new AudioContext();
const oscillator = new OscillatorNode(audioContext);
const gain = new GainNode(audioContext, {
  gain: 0,
});
oscillator.connect(gain);
gain.connect(audioContext.destination);

let timeout = setTimeout(() => {}, 0);

export default function Page() {
  const [synthType, setSynthType] = useState<OscillatorType>("sine");
  const [started, setStarted] = useState<boolean>(false);
  const [pressed, setPressed] = useState<string>("");
  const handleKeyboardInput = useCallback((e: KeyboardEvent) => {
    if (frequencies[e.key]) {
      if (timeout) clearTimeout(timeout);
      oscillator.frequency.value = frequencies[e.key].frequency;
      gain.gain.linearRampToValueAtTime(0.75, 0.5);
      timeout = setTimeout(() => {
        gain.gain.linearRampToValueAtTime(0, 1);
      }, 1000);
      setPressed(e.key);
      setTimeout(() => setPressed(""), 1000);
    }
    return;
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => handleKeyboardInput(e), false);
  }, []);
  return (
    <div className={styles.container}>
      <h1>SYTHESIZER!!!</h1>
      {!started && (
        <button
          onClick={() => {
            oscillator.start();
            setStarted(true);
          }}
        >
          start
        </button>
      )}
      <select
        name="wave"
        onChange={(e) => {
          oscillator.type = e.target.value as OscillatorType;
          setSynthType(e.target.value as OscillatorType);
        }}
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
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
    </div>
  );
}
