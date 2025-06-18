import { SynthEngine } from "@/lib/audio/synthEngine";
import { WaveformSelector } from "./WaveformSelector";
import { VolumeOptions } from "./VolumeOptions";

export function SynthTab({ engine }: { engine: SynthEngine }) {
  return (
    <div className="space-y-4">
      <WaveformSelector engine={engine} />
    </div>
  );
}
