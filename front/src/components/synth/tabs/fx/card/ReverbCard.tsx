import { useState } from "react";
import { CustomKnob } from "@/components/ui/CustomKnob";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ReverbCardProps {
engine: SynthEngine;
}

export function ReverbCard({ engine }: ReverbCardProps) {
const reverb = engine.effects.reverb;

const [enabled, setEnabled] = useState(engine.effects.reverb.wet.value > 0);
const [wet, setWet] = useState(reverb.wet.value);
const [decay, setDecay] = useState((reverb as any).decay);
const [preDelay, setPreDelay] = useState((reverb as any).preDelay);

const handleEnableToggle = (checked: boolean) => {
    setEnabled(checked);
    reverb.wet.value = checked ? wet : 0;
};

const handleWetChange = (value: number) => {
    setWet(value);
    if (enabled) reverb.wet.rampTo(value, 0.1);
};

const handleDecayChange = (value: number) => {
    setDecay(value);
    (reverb as any).decay = value;
    reverb.generate();
};

const handlePreDelayChange = (value: number) => {
    setPreDelay(value);
    (reverb as any).preDelay = value;
    reverb.generate();
};

return (
    <div>
        <p className="text-sm font-medium text-zinc-200 text-start bg-zinc-800 border border-b-0 rounded rounded-bl-none rounded-br-none p-2 pb-0">Reverb</p>
        <div className="flex items-center justify-between pl-4 pr-8 pb-2 w-full bg-zinc-800 rounded shadow gap-4 border border-t-0 mb-2 rounded-tl-none rounded-tr-none">
            <div className="flex flex-col items-center gap-1 pr-2">
                <Checkbox
                    id="reverb-enabled"
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
            <CustomKnob
                label="Decay"
                min={0.1}
                max={10}
                step={0.1}
                value={decay}
                onChange={handleDecayChange}
                size={40}
            />
            <CustomKnob
                label="PreDelay"
                min={0}
                max={1}
                step={0.01}
                value={preDelay}
                onChange={handlePreDelayChange}
                size={40}
            />
        </div>
    </div>
);
}
