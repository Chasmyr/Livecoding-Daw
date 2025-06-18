import { useState } from "react";
import { CustomKnob } from "@/components/ui/CustomKnob";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DistortionCardProps {
  engine: SynthEngine;
}

export function DistortionCard({ engine }: DistortionCardProps) {
  const distortion = engine.effects.distortion;

  const [enabled, setEnabled] = useState(distortion.wet.value > 0);
  const [amount, setAmount] = useState(distortion.distortion);

  const handleEnableToggle = (checked: boolean) => {
    setEnabled(checked);
    distortion.wet.value = checked ? 1 : 0;
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
    distortion.distortion = value;
  };

  return (
    <div>
      <p className="text-sm font-medium text-zinc-200 text-start bg-zinc-800 border border-b-0 rounded rounded-bl-none rounded-br-none p-2 pb-0">Distorsion</p>
      <div className="flex items-center justify-between w-full bg-zinc-800 rounded shadow gap-4 border border-t-0 mb-2 rounded-tl-none rounded-tr-none pl-4 pr-8 pb-2">
        <div className="flex flex-col items-center gap-1 pr-2">
          <Checkbox
            id="distortion-enabled"
            checked={enabled}
            onCheckedChange={handleEnableToggle}
            className="mx-auto"
          />
        </div>

        <CustomKnob
          label="Amount"
          min={0}
          max={1}
          step={0.01}
          value={amount}
          onChange={handleAmountChange}
          size={40}
        />
      </div>
    </div>
  );
}
