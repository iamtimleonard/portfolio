// import { useState, useEffect, useRef, useCallback } from "react";
// import styles from "./synth.module.css"

// function useAudioContext() {
//   const audioContext = useRef<AudioContext | null>(null);
  
//   useEffect(() => {
//     if (!audioContext.current) {
//       audioContext.current = new AudioContext();
//     }
//     return () => audioContext.current?.close();
//   }, []);
  
//   return audioContext.current;
// }

// function useOscillator(audioContext: AudioContext | null) {
//   const oscillator = useRef<OscillatorNode | null>(null);
//   const gainNode = useRef<GainNode | null>(null);

//   useEffect(() => {
//     if (audioContext) {
//       oscillator.current = audioContext.createOscillator();
//       gainNode.current = audioContext.createGain();
//       gainNode.current.gain.value = 0;
//       oscillator.current.connect(gainNode.current);
//       gainNode.current.connect(audioContext.destination);
//       oscillator.current.start();
//     }
//     return () => oscillator.current?.stop();
//   }, [audioContext]);

//   return { oscillator: oscillator.current, gainNode: gainNode.current };
// }

// function useKeyPress(callback: (key: string) => void) {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => callback(e.key);
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [callback]);
// }

// function useAudioRecorder(audioContext: AudioContext | null, gainNodes: GainNode[]) {
//   const recorder = useRef<ScriptProcessorNode | null>(null);
//   const recordedChunks = useRef<Float32Array[]>([]);
//   const buffer = useRef<AudioBuffer | null>(null);

//   const startRecording = () => {
//     if (!audioContext || recorder.current) return;

//     const bufferSize = 16384;
//     const processor = audioContext.createScriptProcessor(bufferSize, 2, 2);
//     recorder.current = processor;

//     processor.onaudioprocess = (event) => {
//       const inputBuffer = event.inputBuffer;
//       recordedChunks.current.push(new Float32Array(inputBuffer.getChannelData(0)));
//     };

//     gainNodes.forEach((node) => node.connect(processor));
//     processor.connect(audioContext.destination);
//   };

//   const stopRecording = () => {
//     if (!audioContext || !recorder.current) return;

//     recorder.current.disconnect();
//     recorder.current = null;

//     const totalSamples = recordedChunks.current.reduce((sum, chunk) => sum + chunk.length, 0);
//     buffer.current = audioContext.createBuffer(1, totalSamples, audioContext.sampleRate);

//     const output = buffer.current.getChannelData(0);
//     recordedChunks.current.reduce((offset, chunk) => {
//       output.set(chunk, offset);
//       return offset + chunk.length;
//     }, 0);

//     recordedChunks.current = [];
//   };

//   const playback = () => {
//     if (!audioContext || !buffer.current) return;

//     const source = audioContext.createBufferSource();
//     source.buffer = buffer.current;
//     source.connect(audioContext.destination);
//     source.start();
//   };

//   return { startRecording, stopRecording, playback, buffer };
// }

// function Keyboard({ frequencies, onKeyDown, onKeyUp, pressedKeys }) {
//   return (
//     <div className="keyboard">
//       {Object.entries(frequencies).map(([key, { frequency, type }]) => (
//         <div
//           key={frequency}
//           className={`key ${type} ${pressedKeys.includes(key) && "pressed"}`}
//           onMouseDown={() => onKeyDown(key)}
//           onMouseUp={() => onKeyUp(key)}
//         >
//           {key}
//         </div>
//       ))}
//     </div>
//   );
// }

// function SynthControls({ gain, attack, decay, sustain, release, setSynthType, synthType }) {
//   return (
//     <div className={styles.controls}>
//     <select
//       name="wave"
//       className={styles.wave}
//       value={synthType}
//       onChange={(e) => {
//         setSynthType(e.target.value as OscillatorType);
//       }}
//     >
//       <option value="sine">Sine</option>
//       <option value="square">Square</option>
//       <option value="sawtooth">Sawtooth</option>
//       <option value="triangle">Triangle</option>
//     </select>
//     <button onClick={() => setOctaveDown(true)}>bass</button>
//     <button onClick={() => setOctaveDown(false)}>treble</button>
//     <div>
//       <label htmlFor="gain">Volume</label>
//       <input className={styles.knob} type="range" name="gain" min={0} max={1} step={.05} value={gain} onChange={(e) => setGain(+e.target.value)} />
//       <span>{gain * 100}%</span>
//     </div>
//     <div>
//       <label htmlFor="attack">Attack</label>
//       <input type="range" name="attack" min={0} max={2000} value={attack} onChange={(e) => setAttack(+e.target.value)} />
//       <span>{attack}ms</span>
//     </div>
//     <div>
//       <label htmlFor="decay">Decay</label>
//       <input type="range" name="decay" min={0} max={2000} value={decay} onChange={(e) => setDecay(+e.target.value)} />
//       <span>{decay}ms</span>
//     </div>
//     <div>
//       <label htmlFor="sustain">Sustain</label>
//       <input type="range" name="sustain" min={0} max={1} step={0.05} value={sustain} onChange={(e) => setSustain(+e.target.value)} />
//       <span>{sustain * 100}%</span>
//     </div>
//     <div>
//       <label htmlFor="release">Release</label>
//       <input type="range" name="release" min={0} max={2000} value={release} onChange={(e) => setRelease(+e.target.value)} />
//       <span>{release}ms</span>
//     </div>
//     <div>
//       <button
//         onClick={() => {
//           if (!recorder.current) {
//             startRecording();
//           } else {
//             stopRecording();
//           }
//         }}
//       >
//         {recorder.current ? "Stop Recording" : "Record"}
//       </button>
//       {buffer.current && <button onClick={() => {
//         playback()
//       }}>Play</button>}
//     </div>
//   </div>
//   );
// }

// const Page = () => {
//   const audioContext = useAudioContext();
//   const [gain, setGain] = useState(0.75);
//   const oscillators = [useOscillator(audioContext), useOscillator(audioContext), useOscillator(audioContext)];
//   const { startRecording, stopRecording, playback, buffer } = useAudioRecorder(audioContext, oscillators.map((o) => o.gainNode));

//   const handleOscillatorChange = useCallback((type) => {
//     oscillators.forEach((osc) => {
//       if (osc.oscillator) osc.oscillator.type = type;
//     });
//   }, [oscillators]);

//   return (
//     <div className="container">
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       {buffer && <button onClick={playback}>Play</button>}
//       <Keyboard frequencies={frequencies} /* Pass required props */ />
//       <SynthControls
//         gain={gain}
//         attack={attack}
//         decay={decay}
//         sustain={sustain}
//         release={release}
//         onChange={(field, value) => setField(field, value)} // Create `setField` dynamically
//       />
//     </div>
//   );
// };
