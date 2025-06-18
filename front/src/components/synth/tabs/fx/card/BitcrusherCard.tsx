import { useState } from "react";
import { CustomKnob } from "@/components/ui/CustomKnob";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BitCrusherCardProps {
  engine: SynthEngine;
}

export function BitCrusherCard({ engine }: BitCrusherCardProps) {
  const bitcrusher = engine.effects.bitcrusher;

  const [enabled, setEnabled] = useState(bitcrusher.wet.value > 0);
  const [wet, setWet] = useState<number>(bitcrusher.wet.value);

  const handleEnableToggle = (checked: boolean) => {
    setEnabled(checked);
    bitcrusher.wet.value = checked ? wet : 0;
  };

  const handleWetChange = (value: number) => {
    setWet(value);
    if (enabled) bitcrusher.wet.rampTo(value, 0.1);
  };

  return (
    <div>
      <p className="text-sm font-medium text-zinc-200 text-start bg-zinc-800 border border-b-0 rounded rounded-bl-none rounded-br-none p-2 pb-0">BitCrusher</p>
      <div className="flex items-center justify-between w-full bg-zinc-800 rounded shadow gap-4 border border-t-0 mb-2 rounded-tl-none rounded-tr-none pl-4 pr-8 pb-2">
        <div className="flex flex-col items-center gap-1 pr-2">
          <Checkbox
            id="bitcrusher-enabled"
            checked={enabled}
            onCheckedChange={handleEnableToggle}
            className="mx-auto"
          />
        </div>

        <CustomKnob
          label="Wet"
          min={0}
          max={1}
          step={0.05}
          value={wet}
          onChange={handleWetChange}
          size={40}
        />
      </div>
    </div>
  );
}
