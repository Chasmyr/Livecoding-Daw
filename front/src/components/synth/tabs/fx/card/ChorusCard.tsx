import { useState } from "react";
import { CustomKnob } from "@/components/ui/CustomKnob";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChorusCardProps {
engine: SynthEngine;
}

export function ChorusCard({ engine }: ChorusCardProps) {
const chorus = engine.effects.chorus;

const [enabled, setEnabled] = useState(chorus.wet.value > 0);
const [wet, setWet] = useState(chorus.wet.value);
const [frequency, setFrequency] = useState<number>(Number(chorus.frequency.value));
const [depth, setDepth] = useState(chorus.depth);

const handleEnableToggle = (checked: boolean) => {
    setEnabled(checked);
    chorus.wet.value = checked ? wet : 0;
};

const handleWetChange = (value: number) => {
    setWet(value);
    if (enabled) chorus.wet.rampTo(value, 0.1);
};

const handleFrequencyChange = (value: number) => {
    setFrequency(value);
    chorus.frequency.value = value;
};

const handleDepthChange = (value: number) => {
    setDepth(value);
    chorus.depth = value;
};

return (
    <div>
        <p className="text-sm font-medium text-zinc-200 text-start bg-zinc-800 border border-b-0 rounded rounded-bl-none rounded-br-none p-2 pb-0">Chorus</p>
        <div className="flex items-center justify-between w-full bg-zinc-800 rounded shadow gap-4 border border-t-0 mb-2 rounded-tl-none rounded-tr-none pl-4 pr-8 pb-2">
            <div className="flex flex-col items-center gap-1 pr-2">
                <Checkbox
                id="chorus-enabled"
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
                label="Freq"
                min={0.1}
                max={10}
                step={0.1}
                value={frequency}
                onChange={handleFrequencyChange}
                size={40}
            />
            <CustomKnob
                label="Depth"
                min={0}
                max={1}
                step={0.05}
                value={depth}
                onChange={handleDepthChange}
                size={40}
            />
        </div>
    </div>
);
}
