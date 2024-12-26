"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import frequencies from "./frequencies";
import styles from "./synth.module.css";


const Page = () => {
  const [synthType, setSynthType] = useState<OscillatorType>("sine");
  const [started, setStarted] = useState<boolean>(false);
  const [pressed1, setPressed1] = useState<string>("");
  const [pressed2, setPressed2] = useState<string>("");
  const [pressed3, setPressed3] = useState<string>("");
  const [gain, setGain] = useState<number>(0.75)
  const [attack, setAttack] = useState<number>(500)
  const [decay, setDecay] = useState<number>(500)
  const [sustain, setSustain] = useState<number>(0.5)
  const [release, setRelease] = useState<number>(500)
  const [octaveDown, setOctaveDown] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const audioContext = useRef<AudioContext>(null)
  const buffer = useRef<AudioBuffer>(null)
  const oscillator1 = useRef<OscillatorNode>(null);
  const oscillator2 = useRef<OscillatorNode>(null)
  const oscillator3 = useRef<OscillatorNode>(null)
  const gainNode1 = useRef<GainNode>(null);
  const gainNode2 = useRef<GainNode>(null)
  const gainNode3 = useRef<GainNode>(null)
  const recorder = useRef<ScriptProcessorNode | null>(null);
  const recordedChunks = useRef<Float32Array[]>([]);


  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext()
      oscillator1.current = new OscillatorNode(audioContext.current)
      gainNode1.current = new GainNode(audioContext.current, {
        gain: 0
      })
      oscillator1.current.connect(gainNode1.current);
      gainNode1.current.connect(audioContext.current.destination);

      oscillator2.current = new OscillatorNode(audioContext.current)
      gainNode2.current = new GainNode(audioContext.current, {
        gain: 0
      })
      oscillator2.current.connect(gainNode2.current);
      gainNode2.current.connect(audioContext.current.destination);

      oscillator3.current = new OscillatorNode(audioContext.current)
      gainNode3.current = new GainNode(audioContext.current, {
        gain: 0
      })
      oscillator3.current.connect(gainNode3.current);
      gainNode3.current.connect(audioContext.current.destination);
    }
  }, [])

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    let oscillator: OscillatorNode
    let gainNode: GainNode
    if (!pressed1 && pressed1 !== e.key) {
      oscillator = oscillator1.current
      gainNode = gainNode1.current
      setPressed1(e.key)
    } else if (pressed1 !== e.key && !pressed2 && pressed2 !== e.key) {
      oscillator = oscillator2.current
      gainNode = gainNode2.current
      setPressed2(e.key)
    } else if (pressed1 !== e.key && pressed2 !== e.key && !pressed3 && pressed3 !== e.key) {
      oscillator = oscillator3.current
      gainNode = gainNode3.current
      setPressed3(e.key)
    }
    if (frequencies[e.key] && oscillator && gainNode) {
      oscillator.frequency.value = octaveDown ? frequencies[e.key].frequency / 2 : frequencies[e.key].frequency;
      gainNode.gain.cancelScheduledValues(audioContext.current.currentTime - 1)
      gainNode.gain.linearRampToValueAtTime(gain / 3, audioContext.current.currentTime + (attack / 1000));
      gainNode.gain.setTargetAtTime(sustain, audioContext.current.currentTime + (attack / 1000), (decay / 1000) / 3);
    }
    return;
  }, [gain, attack, sustain, decay, pressed1, pressed2, pressed3]);

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    if (pressed1 === e.key) {
      gainNode1.current.gain.cancelScheduledValues(audioContext.current.currentTime - 1)
      gainNode1.current.gain.setTargetAtTime(0, audioContext.current.currentTime, (release / 1000) / 3)
      setPressed1("")
    } else if (pressed2 === e.key) {
      gainNode2.current.gain.cancelScheduledValues(audioContext.current.currentTime - 1)
      gainNode2.current.gain.setTargetAtTime(0, audioContext.current.currentTime, (release / 1000) / 3)
      setPressed2("") 
    } else if (pressed3 === e.key) {
      gainNode3.current.gain.cancelScheduledValues(audioContext.current.currentTime - 1)
      gainNode3.current.gain.setTargetAtTime(0, audioContext.current.currentTime, (release / 1000) / 3)
      setPressed3("")
    }
  }, [release, pressed1, pressed2, pressed3])

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => { 
      document.removeEventListener("keydown", handleKeydown)
     }
  }, [gain, attack, sustain, decay, pressed1, pressed2, pressed3]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyup)
    return () => {
      document.removeEventListener("keyup", handleKeyup)
    }
  }, [release, pressed1, pressed2, pressed3])

  const recordedChunksLeft = useRef<Float32Array | null>(null);
  const recordedChunksRight = useRef<Float32Array | null>(null);
  const recordedLength = useRef<number>(0);
  
  const startRecording = () => {
    const context = audioContext.current;
    if (!context) return;
    setIsRecording(true)
  
    const bufferSize = 16384; // Choose an appropriate buffer size
    const scriptProcessor = context.createScriptProcessor(bufferSize, 2, 2);
  
    recordedLength.current = 0;
    recordedChunksLeft.current = new Float32Array();
    recordedChunksRight.current = new Float32Array();
  
    scriptProcessor.onaudioprocess = (event) => {
      const inputBuffer = event.inputBuffer;
      const leftChannel = inputBuffer.getChannelData(0);
      const rightChannel = inputBuffer.getChannelData(1);
  
      // Resize Float32Array dynamically for accumulation
      const newLength = recordedLength.current + leftChannel.length;
  
      const tempLeft = new Float32Array(newLength);
      const tempRight = new Float32Array(newLength);
  
      if (recordedChunksLeft.current) tempLeft.set(recordedChunksLeft.current);
      if (recordedChunksRight.current) tempRight.set(recordedChunksRight.current);
  
      tempLeft.set(leftChannel, recordedLength.current);
      tempRight.set(rightChannel, recordedLength.current);
  
      recordedChunksLeft.current = tempLeft;
      recordedChunksRight.current = tempRight;
  
      recordedLength.current = newLength;
    };
  
    gainNode1.current.connect(scriptProcessor);
    gainNode2.current.connect(scriptProcessor);
    gainNode3.current.connect(scriptProcessor);
    scriptProcessor.connect(context.destination);
  
    recorder.current = scriptProcessor;
  };
  
  const stopRecording = () => {
    if (recorder.current) {
      setIsRecording(false)
      recorder.current.disconnect();
      recorder.current = null;
  
      // Create the AudioBuffer once recording stops
      createAudioBuffer();
    }
  };
  
  const createAudioBuffer = () => {
    const context = audioContext.current;
    if (!context) return;
  
    const totalLength = recordedLength.current;
  
    // Combine recorded data into a single AudioBuffer
    const leftChannel = recordedChunksLeft.current || new Float32Array(0);
    const rightChannel = recordedChunksRight.current || new Float32Array(0);
  
    buffer.current = context.createBuffer(2, totalLength, context.sampleRate);
  
    // Set the data for each channel
    buffer.current.getChannelData(0).set(leftChannel);
    buffer.current.getChannelData(1).set(rightChannel);
  
    // Reset recorded data for next recording session
    recordedChunksLeft.current = null;
    recordedChunksRight.current = null;
    recordedLength.current = 0;
  };
  

  const playback = () => {
    if (!buffer.current) return;
    const source = audioContext.current.createBufferSource()
    source.buffer = buffer.current
    source.connect(audioContext.current.destination)
    source.start()
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.control}>
      {!started && (
        <div className={styles.startModal}>
        <button className={styles.start}
          onClick={() => {
            oscillator1.current.start();
            oscillator2.current.start();
            oscillator3.current.start();
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
              className={`${styles[type]} ${(pressed1 === key || pressed2 === key || pressed3 == key) && styles.pressed}`}
              key={frequency}
              onMouseDown={() => {
                if (!pressed1) {
                  setPressed1(key)
                  oscillator1.current.frequency.value = frequency;
                  gainNode1.current.gain.linearRampToValueAtTime(gain, audioContext.current.currentTime + (attack / 1000));
                  gainNode1.current.gain.setTargetAtTime(sustain, audioContext.current.currentTime + (attack / 1000), (decay / 1000) / 3);
                }
                return;
              }}
              onMouseUp={() => {
                if (pressed1) {
                  gainNode1.current.gain.cancelScheduledValues(audioContext.current.currentTime - 1)
                  gainNode1.current.gain.setTargetAtTime(0, audioContext.current.currentTime, (release / 1000) / 3)
                  setPressed1("")
                }
              }}
            >
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <select
            name="wave"
            className={styles.wave}
            value={synthType}
            onChange={(e) => {
              oscillator1.current.type = e.target.value as OscillatorType;
              oscillator2.current.type = e.target.value as OscillatorType;
              oscillator3.current.type = e.target.value as OscillatorType;
              setSynthType(e.target.value as OscillatorType);
            }}
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
          <div>
          <button className={`${styles.button} ${octaveDown && styles.pressed}`} onClick={() => setOctaveDown(true)}>bass</button>
          <button className={`${styles.button} ${!octaveDown && styles.pressed}`} onClick={() => setOctaveDown(false)}>treble</button>
          </div>
          <div>
            <label htmlFor="gain">Volume</label>
            <input className={styles.knob} type="range" name="gain" min={0} max={1} step={.05} value={gain} onChange={(e) => setGain(+e.target.value)} />
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
          <div>
            <button className={styles.button}
              onClick={() => {
                if (!recorder.current) {
                  startRecording();
                } else {
                  stopRecording();
                }
              }}
            >
              {isRecording ? "Stop Recording" : "Record"}
            </button>
            {buffer.current && <button className={styles.button} onClick={() => {
              playback()
            }}>Play</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// this uses browser only APIs so it will error on prerender if ssr is not disabled
export default dynamic(() => Promise.resolve(Page), { ssr: false })
