import { useEffect, useState } from "react";
import { SynthEngine } from "@/lib/audio/synthEngine";
import { CustomKnob } from "@/components/ui/CustomKnob";

interface AdsrCardProps {
  engine: SynthEngine;
}

export function AdsrCard({ engine }: AdsrCardProps) {
  const { adsr } = engine;

  // Initialise les states locaux avec les valeurs du moteur
  const [attack, setAttack] = useState(adsr.attack);
  const [decay, setDecay] = useState(adsr.decay);
  const [sustain, setSustain] = useState(adsr.sustain);
  const [release, setRelease] = useState(adsr.release);

  // Synchronise les changements avec l'engine à chaque update
  useEffect(() => {
    adsr.attack = attack;
    adsr.decay = decay;
    adsr.sustain = sustain;
    adsr.release = release;
  }, [attack, decay, sustain, release]);

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full bg-zinc-800 rounded shadow gap-4 border mb-2">
      <p className="text-xs text-zinc-300 font-medium w-16 text-center">ADSR</p>

      <CustomKnob
        label="Attack"
        min={0}
        max={2}
        step={0.01}
        value={attack}
        onChange={setAttack}
        size={40}
      />
      <CustomKnob
        label="Decay"
        min={0}
        max={2}
        step={0.01}
        value={decay}
        onChange={setDecay}
        size={40}
      />
      <CustomKnob
        label="Sustain"
        min={0}
        max={1}
        step={0.01}
        value={sustain}
        onChange={setSustain}
        size={40}
      />
      <CustomKnob
        label="Release"
        min={0}
        max={2}
        step={0.01}
        value={release}
        onChange={setRelease}
        size={40}
      />
    </div>
  );
}
