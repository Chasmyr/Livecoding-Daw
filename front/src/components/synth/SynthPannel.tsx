import { useEffect, useRef, useState } from "react";

// audio import
import { createSynthEngine, SynthEngine } from "@/lib/audio/synthEngine";

import { KeyboardWrapper } from "./keyboard/KeyboardWrapper";
import { FxWrapper } from "./tabs/fx/FxWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SynthPanelProps {
  name: string;
}

export function SynthPanel({ name }: SynthPanelProps)  {
  const engineRef = useRef<SynthEngine | null>(null);
  const [tab, setTab] = useState("synth");

  useEffect(() => {
    engineRef.current = createSynthEngine();

    return () => {
      engineRef.current?.synth.dispose();
      engineRef.current?.noise.generator.dispose();
    };
  }, []);

  const handlePlayNote = (note: string) => {
    engineRef.current?.synth.triggerAttackRelease(note, "8n");
  };

  return (
    <div className="p-4 rounded-lg bg-zinc-900 text-white space-y-4">
      <h2 className="text-lg font-semibold text-teal-400">🎛 {name}</h2>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full justify-around mb-4">
          <TabsTrigger value="synth">Synth</TabsTrigger>
          <TabsTrigger value="filter">Filter</TabsTrigger>
          <TabsTrigger value="fx">FX</TabsTrigger>
        </TabsList>

        <TabsContent value="synth">
          <div className="text-zinc-300 text-sm">🔧 Synth settings (preset, waveform selector) – coming soon...</div>
        </TabsContent>

        <TabsContent value="filter">
          <div className="text-zinc-300 text-sm">🎚️ Filter controls (HP, LP, EQ 3 bandes) – coming soon...</div>
        </TabsContent>

        <TabsContent value="fx">
          <FxWrapper engine={engineRef.current} />
        </TabsContent>
      </Tabs>

      <KeyboardWrapper onPlayNote={handlePlayNote} />
    </div>
  );
}