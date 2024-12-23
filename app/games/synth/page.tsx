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
  const [decay, setDecay] = useState<number>(500)
  const [sustain, setSustain] = useState<number>(0.5)
  const [release, setRelease] = useState<number>(500)

  const audioContext = useRef<AudioContext>(null)
  const oscillator = useRef<OscillatorNode>(null);
  const gainNode = useRef<GainNode>(null);

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext()
      oscillator.current = new OscillatorNode(audioContext.current)
      gainNode.current = new GainNode(audioContext.current, {
        gain: 0
      })
      oscillator.current.connect(gainNode.current);
      gainNode.current.connect(audioContext.current.destination);
    }
  }, [])

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (frequencies[e.key] && !pressed) {
      setPressed(e.key)
      oscillator.current.frequency.value = frequencies[e.key].frequency;
      gainNode.current.gain.linearRampToValueAtTime(gain, audioContext.current.currentTime + (attack / 1000));
      gainNode.current.gain.setTargetAtTime(sustain, audioContext.current.currentTime + (attack / 1000), (decay / 1000) / 3);
    }
    return;
  }, [gain, attack, sustain, decay, pressed]);

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    if (pressed === e.key) {
      gainNode.current.gain.setTargetAtTime(0, audioContext.current.currentTime, (release / 1000) / 3)
      setPressed("")
    }
  }, [release, pressed])

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => { 
      document.removeEventListener("keydown", handleKeydown)
     }
  }, [gain, attack, sustain, decay, pressed]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyup)
    return () => {
      document.removeEventListener("keyup", handleKeyup)
    }
  }, [release, pressed])

  return (
    <div className={styles.container}>
      <div className={styles.control}>
      {!started && (
        <div className={styles.startModal}>
        <button className={styles.start}
          onClick={() => {
            oscillator.current.start();
            setStarted(true);
          }}
        >
          start
        </button>
        </div>
      )}
      </div>
      <div className={styles.module}>
        <div className={styles.keyboard}>
          {Object.values(frequencies).map(({ key, frequency, note, type }) => (
            <div
              className={`${styles[type]} ${pressed === key && styles.pressed}`}
              key={frequency}
              onMouseDown={() => {
                if (!pressed) {
                  setPressed(key)
                  oscillator.current.frequency.value = frequency;
                  gainNode.current.gain.linearRampToValueAtTime(gain, audioContext.current.currentTime + (attack / 1000));
                  gainNode.current.gain.setTargetAtTime(sustain, audioContext.current.currentTime + (attack / 1000), (decay / 1000) / 3);
                }
                return;
              }}
              onMouseUp={() => {
                if (pressed) {
                  gainNode.current.gain.setTargetAtTime(0, audioContext.current.currentTime, (release / 1000) / 3)
                  setPressed("")
                }
              }}
            >
              {note}
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <select
            name="wave"
            className={styles.wave}
            value={synthType}
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
          </div>
          <div>
            <label htmlFor="attack">Attack</label>
            <input type="range" name="attack" min={0} max={2000} value={attack} onChange={(e) => setAttack(+e.target.value)} />
            <span>{attack}ms</span>
          </div>
          <div>
            <label htmlFor="decay">Decay</label>
            <input type="range" name="decay" min={0} max={2000} value={decay} onChange={(e) => setDecay(+e.target.value)} />
            <span>{decay}ms</span>
          </div>
          <div>
            <label htmlFor="sustain">Sustain</label>
            <input type="range" name="sustain" min={0} max={1} step={0.05} value={sustain} onChange={(e) => setSustain(+e.target.value)} />
            <span>{sustain * 100}%</span>
          </div>
          <div>
            <label htmlFor="release">Release</label>
            <input type="range" name="release" min={0} max={2000} value={release} onChange={(e) => setRelease(+e.target.value)} />
            <span>{release}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// this uses browser only APIs so it will error on prerender if ssr is not disabled
export default dynamic(() => Promise.resolve(Page), { ssr: false })
