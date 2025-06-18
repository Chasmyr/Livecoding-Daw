// src/components/layout/AppBar.tsx
import { Music2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppBar() {
  return (
    <header className="w-full bg-gradient-to-r from-zinc-900 to-zinc-800 shadow-md px-6 py-4 flex items-center justify-between border-b border-zinc-700">
      <div className="flex items-center gap-3">
        <div className="bg-teal-500/20 p-2 rounded-full">
          <Music2Icon className="w-6 h-6 text-teal-300" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          LiveCoding<span className="text-teal-400"> DAW</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Tu peux ajouter ici des boutons ou infos */}
        <Button variant="ghost" className="text-sm text-zinc-300 hover:text-white">
          Docs
        </Button>
        <Button variant="outline" className="text-sm border-teal-400 text-teal-300 hover:bg-teal-500/10">
          Github
        </Button>
      </div>
    </header>
  );
}
