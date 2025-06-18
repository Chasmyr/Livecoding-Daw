import { useState } from "react";
import { CustomKnob } from "@/components/ui/CustomKnob";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import * as Tone from "tone";

interface NoiseCardProps {
  engine: SynthEngine;
}

export function NoiseCard({ engine }: NoiseCardProps) {
  const noiseGain = engine.noise.gain;

  // Convertir en dB pour l'état initial
  const rawGain = noiseGain.gain.value;
  const initialDb = Tone.gainToDb(rawGain);
  const initialVolume = Number.isFinite(initialDb)
    ? Math.round(((initialDb + 60) / 60) * 100)
    : 0; // fallback sécurisé


  const [enabled, setEnabled] = useState(noiseGain.gain.value > 0);
  const [volume, setVolume] = useState(initialVolume);

  const handleEnableToggle = (checked: boolean) => {
    setEnabled(checked);
    if (!checked) {
      noiseGain.gain.rampTo(0, 0.1);
    } else {
      const db = (volume / 100) * 60 - 60;
      const gain = Tone.dbToGain(db);
      noiseGain.gain.rampTo(gain, 0.1);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (enabled) {
      const db = (value / 100) * 60 - 60;
      const gain = Tone.dbToGain(db);
      noiseGain.gain.rampTo(gain, 0.1);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-zinc-200 text-start bg-zinc-800 border border-b-0 rounded rounded-bl-none rounded-br-none p-2 pb-0">Noise</p>
      <div className="flex items-center justify-between pl-4 pr-8 pb-2 w-full bg-zinc-800 rounded shadow gap-4 border border-t-0 mb-2 rounded-tl-none rounded-tr-none">
        <div className="flex flex-col items-center gap-1 pr-2">
          <Checkbox
            id="noise-enabled"
            checked={enabled}
            onCheckedChange={handleEnableToggle}
            className="mx-auto"
          />
        </div>

        <CustomKnob
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={Number.isFinite(volume) ? volume : 0}
          onChange={handleVolumeChange}
          size={40}
        />
      </div>
    </div>
  );
}
