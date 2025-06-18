import { useState, useEffect } from "react";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { CustomKnob } from "@/components/ui/CustomKnob";

interface FilterCardProps {
  engine: SynthEngine;
}

export function FilterCard({ engine }: FilterCardProps) {
  const { filters, effects } = engine;

  // Lowpass
  const [lowFreq, setLowFreq] = useState(filters.lowpass.frequency.value);
  const [lowQ, setLowQ] = useState(filters.lowpass.Q.value);

  // Highpass
  const [highFreq, setHighFreq] = useState(filters.highpass.frequency.value);
  const [highQ, setHighQ] = useState(filters.highpass.Q.value);

  // EQ3
  const [eqLow, setEqLow] = useState(effects.eq.low.low.value);
  const [eqMid, setEqMid] = useState(effects.eq.low.mid.value);
  const [eqHigh, setEqHigh] = useState(effects.eq.low.high.value);

  useEffect(() => {
    filters.lowpass.frequency.rampTo(lowFreq, 0.05);
    filters.lowpass.Q.rampTo(lowQ, 0.05);

    filters.highpass.frequency.rampTo(highFreq, 0.05);
    filters.highpass.Q.rampTo(highQ, 0.05);

    effects.eq.low.low.rampTo(eqLow, 0.05);
    effects.eq.low.mid.rampTo(eqMid, 0.05);
    effects.eq.low.high.rampTo(eqHigh, 0.05);
  }, [lowFreq, lowQ, highFreq, highQ, eqLow, eqMid, eqHigh]);

  return (
    <div>
      <p className="text-sm font-medium text-zinc-200 text-start bg-zinc-800 border border-b-0 rounded rounded-bl-none rounded-br-none p-2 pb-0">
        Filters & EQ
      </p>

      <div className="flex flex-wrap justify-between gap-4 p-4 bg-zinc-800 border rounded-tl-none rounded-tr-none border-t-0 mb-2">

        {/* Lowpass */}
        <div className="flex flex-col items-center">
          <CustomKnob
            label="Low Freq"
            min={200}
            max={20000}
            step={10}
            value={Number(lowFreq)}
            onChange={setLowFreq}
            size={50}
          />
          <CustomKnob
            label="Low Q"
            min={0.1}
            max={10}
            step={0.1}
            value={lowQ}
            onChange={setLowQ}
            size={50}
          />
        </div>

        {/* Highpass */}
        <div className="flex flex-col items-center">
          <CustomKnob
            label="High Freq"
            min={10}
            max={5000}
            step={10}
            value={Number(highFreq)}
            onChange={setHighFreq}
            size={50}
          />
          <CustomKnob
            label="High Q"
            min={0.1}
            max={10}
            step={0.1}
            value={highQ}
            onChange={setHighQ}
            size={50}
          />
        </div>

        {/* EQ */}
        <div className="flex flex-col items-center">
          <CustomKnob
            label="EQ Low"
            min={-24}
            max={24}
            step={1}
            value={eqLow}
            onChange={setEqLow}
            size={50}
          />
          <CustomKnob
            label="EQ Mid"
            min={-24}
            max={24}
            step={1}
            value={eqMid}
            onChange={setEqMid}
            size={50}
          />
          <CustomKnob
            label="EQ High"
            min={-24}
            max={24}
            step={1}
            value={eqHigh}
            onChange={setEqHigh}
            size={50}
          />
        </div>
      </div>
    </div>
  );
}
