import { useState, useEffect } from "react";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { CustomKnob } from "@/components/ui/CustomKnob";

interface VolumeOptionsProps {
  engine: SynthEngine;
}

export function VolumeOptions({ engine }: VolumeOptionsProps) {

  const [volume, setVolume] = useState(engine.output.gain.value)

  const handleChangeVolume = (value: number) => {
    setVolume(value);
    engine.output.gain.rampTo(value, 0.05);
  }

  useEffect(() => {
    // Sync du state si engine change (ex: preset chargé)
    setVolume(engine.output.gain.value);
  }, [engine]);

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full bg-zinc-800 rounded shadow gap-4 border mb-2">
        <div className="flex items-center gap-4">
            {/* Volume principal */}
            <CustomKnob
            label="Volume"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleChangeVolume}
            />
        </div>
    </div>
  );
}
