import { useState, useEffect } from "react";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { CustomKnob } from "@/components/ui/CustomKnob";
import { ToneOscillatorType } from "tone";

const waveforms: OscillatorType[] = ["sine", "square", "triangle", "sawtooth"];

interface WaveformSelectorProps {
  engine: SynthEngine;
}

export function WaveformSelector({ engine }: WaveformSelectorProps) {
  const [wave1, setWave1] = useState<ToneOscillatorType>(engine.osc1.type);
  const [wave2, setWave2] = useState<ToneOscillatorType>(engine.osc2.type);
  const [mix, setMix] = useState(engine.osc2Gain.gain.value); // 0.0 → 1.0
  const [volume, setVolume] = useState(engine.output.gain.value);

  const handleWaveformChange = (
    osc: "osc1" | "osc2",
    value: OscillatorType
  ) => {
    if (osc === "osc1") {
      engine.osc1.type = value;
      setWave1(value);
    } else {
      engine.osc2.type = value;
      setWave2(value);
    }
  };

  const handleMixChange = (value: number) => {
    setMix(value);
    engine.osc1Gain.gain.rampTo(1 - value, 0.1);
    engine.osc2Gain.gain.rampTo(value, 0.1);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    engine.output.gain.rampTo(value, 0.05);
  };

  // En cas de preset chargé : resynchroniser l’état local
  useEffect(() => {
    setWave1(engine.osc1.type);
    setWave2(engine.osc2.type);
    setMix(engine.osc2Gain.gain.value);
    setVolume(engine.output.gain.value);
  }, [engine]);

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full bg-zinc-800 rounded shadow gap-4 border mb-2">
      {/* Osc 1 */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-zinc-300">Osc 1</label>
        <select
          value={wave1}
          onChange={(e) =>
            handleWaveformChange("osc1", e.target.value as OscillatorType)
          }
          className="bg-zinc-800 text-white px-2 py-1 rounded"
        >
          {waveforms.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Osc 2 */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-zinc-300">Osc 2</label>
        <select
          value={wave2}
          onChange={(e) =>
            handleWaveformChange("osc2", e.target.value as OscillatorType)
          }
          className="bg-zinc-800 text-white px-2 py-1 rounded"
        >
          {waveforms.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Mix knob */}
      <div>
        <CustomKnob
          label="Mix"
          min={0}
          max={1}
          step={0.01}
          value={mix}
          onChange={handleMixChange}
          size={50}
        />
      </div>

      {/* Volume Knob */}
      <div>
        <CustomKnob
          label="Volume"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          size={50}
        />
      </div>
    </div>
  );
}
