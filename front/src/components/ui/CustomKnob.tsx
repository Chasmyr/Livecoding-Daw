import { Knob, KnobChangeEvent } from "primereact/knob";

interface CustomKnobProps {
label: string;
value: number;
min: number;
max: number;
step?: number;
size?: number;
onChange: (value: number) => void;
}

export function CustomKnob({
label,
value,
min,
max,
step = 1,
size = 80,
onChange,
}: CustomKnobProps) {
return (
    <div className="flex flex-col items-center space-y-1 text-white">
    <Knob
        value={value}
        min={min}
        max={max}
        step={step}
        size={size}
        valueTemplate=""
        onChange={(e: KnobChangeEvent) => onChange(e.value)}
        rangeColor="#444"
        valueColor="#0ff"
    />
    <span className="text-sm text-zinc-400">{label}</span>
    </div>
);
}
