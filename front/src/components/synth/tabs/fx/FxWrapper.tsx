import { SynthEngine } from "@/lib/audio/synthEngine";
// Ajoute ici les futures cartes : DelayCard, ChorusCard, etc.

interface FxWrapperProps {
  engine: SynthEngine | null;
}

export function FxWrapper({ engine }: FxWrapperProps) {
  return (
    <div className="flex overflow-x-auto gap-4 py-2 px-1">
      {/* <VolumeCard engine={engine} />
      <ReverbCard engine={engine} />
      <DistortionCard engine={engine} />
      <NoiseCard engine={engine} /> */}
      {/* <DelayCard engine={engine} /> */}
      {/* <ChorusCard engine={engine} /> */}
      {/* <BitcrusherCard engine={engine} /> */}
    </div>
  );
}
