import { useState } from "react";

// audio import
import { SynthEngine } from "@/lib/audio/synthEngine";

import { KeyboardWrapper } from "./keyboard/KeyboardWrapper";
import { FxWrapper } from "./tabs/fx/FxTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SynthTab } from "./tabs/synth/SynthTab";
import { AdsrCard } from "./tabs/settings/AdsrCard";
import { FilterCard } from "./tabs/filters/FilterCard";

interface SynthPanelProps {
  name: string;
  engine: SynthEngine;
}

export function SynthPanel({ name, engine }: SynthPanelProps)  {
  const [tab, setTab] = useState("synth");

  return (
    <div className="p-4 rounded-lg bg-zinc-900 text-white space-y-4">
      <h2 className="text-lg font-semibold text-teal-400">🎛 {name}</h2>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full justify-around mb-0">
          <TabsTrigger value="synth">Synth</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="filter">Filter</TabsTrigger>
          <TabsTrigger value="fx">FX</TabsTrigger>
          <TabsTrigger value="Preset">Preset</TabsTrigger>
        </TabsList>

        <TabsContent value="synth">
          <div className="min-h-50">
            <SynthTab engine={engine} />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="min-h-50"> 
            {engine && <AdsrCard engine={engine} />}
          </div>
        </TabsContent>

        <TabsContent value="filter">
          <div className="min-h-50">
            <FilterCard engine={engine} />
          </div>
        </TabsContent>

        <TabsContent value="fx">
          <div className="w-full px-2">
            <FxWrapper engine={engine} />
          </div>
        </TabsContent>

        <TabsContent value="preset">
          <div className="text-zinc-300 text-sm">🎚️ Preset controls – coming soon...</div>
        </TabsContent>
      </Tabs>

      <div className="border-t border-zinc-700 mb-4 mt-6" />

      <KeyboardWrapper
        onNoteDown={(note) => engine?.triggerNote(note)}
        onNoteUp={() => engine?.triggerRelease()}
      />
    </div>
  );
}