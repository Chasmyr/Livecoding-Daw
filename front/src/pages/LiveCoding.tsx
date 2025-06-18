import { useState } from "react";
import * as Tone from "tone";
import { AppBar } from "@/components/layout/AppBar";
import { GridArea } from "@/components/layout/GridArea";
import { SynthPanel } from "@/components/synth/SynthPannel";
import { Button } from "@/components/ui/button";
import { createSynthEngine, SynthEngine } from "@/lib/audio/synthEngine";
import { AddSynthPlaceholder } from "@/components/synth/AddSynthPlaceholder";

export function LiveCoding() {
const [audioStarted, setAudioStarted] = useState(false);
const [synths, setSynths] = useState<
  { name: string; engine: SynthEngine }[]
>([]);


const handleStart = async () => {
    await Tone.start();
    console.log("✅ AudioContext démarré");
    addSynth()
    setAudioStarted(true);
};

const addSynth = () => {
  const name = `Synth ${synths.length + 1}`;
  const newEngine = createSynthEngine();
  setSynths((prev) => [...prev, { name, engine: newEngine }]);
};

return (
    <>
    <AppBar />
    {!audioStarted ? (
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
        <p className="mb-4 text-lg">Clique sur le bouton pour activer l’audio 🎧</p>
        <Button onClick={handleStart}>🎵 Activer le son</Button>
        </div>
    ) : (
        <GridArea>
            {[...synths.map((synth) => (
                <SynthPanel key={synth.name} name={synth.name} engine={synth.engine} />
            )),
            <AddSynthPlaceholder key="add-synth" onClick={addSynth} />]}
        </GridArea>
    )}
    </>
);
}
