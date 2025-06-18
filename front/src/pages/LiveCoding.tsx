import { useState } from "react";
import * as Tone from "tone";
import { AppBar } from "@/components/layout/AppBar";
import { GridArea } from "@/components/layout/GridArea";
import { SynthPanel } from "@/components/synth/SynthPannel";
import { Button } from "@/components/ui/button";

export function LiveCoding() {
const [audioStarted, setAudioStarted] = useState(false);

const handleStart = async () => {
    await Tone.start();
    console.log("✅ AudioContext démarré");
    setAudioStarted(true);
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
            <SynthPanel name="Lead Synth"/>
        </GridArea>
    )}
    </>
);
}
