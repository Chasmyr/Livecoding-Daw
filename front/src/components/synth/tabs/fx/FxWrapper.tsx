import { SynthEngine } from "@/lib/audio/synthEngine";
import { ReverbCard } from "./card/ReverbCard";
import { DistortionCard } from "./card/DistorsionCard";
import { DelayCard } from "./card/DelayCard";
import { ChorusCard } from "./card/ChorusCard";
import { BitCrusherCard } from "./card/BitcrusherCard";
import { NoiseCard } from "./card/NoiseCard";
// Ajoute ici les futures cartes : DelayCard, ChorusCard, etc.

interface FxWrapperProps {
  engine: SynthEngine | null;
}

export function FxWrapper({ engine }: FxWrapperProps) {
  return (
    <div className="w-full max-h-60 flex-col overflow-y-auto gap-4 py-2 px-1 custom-scrollbar">
      <ReverbCard engine={engine} />
      <DistortionCard engine={engine} />
      <DelayCard engine={engine} />
      <ChorusCard engine={engine} />
      <BitCrusherCard engine={engine} />
      <NoiseCard engine={engine} />
    </div>
  );
}
