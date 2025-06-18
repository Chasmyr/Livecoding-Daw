import { useState } from "react";
import { KeyboardOctave } from "./KeyboardOctave";

interface KeyboardWrapperProps {
  onPlayNote: (note: string) => void;
}

export function KeyboardWrapper({ onPlayNote }: KeyboardWrapperProps) {
  const [octave, setOctave] = useState(5); // 5 = octave de base (0)
  const min = 1;
  const max = 8;

  const relative = octave - 5;

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Contrôle de l’octave */}
      <div className="flex flex-col items-center justify-between gap-1 text-white">
        <button
          onClick={() => setOctave((o) => Math.min(o + 1, max))}
          className="text-xl hover:text-teal-400 transition"
        >
          ▲
        </button>
        {relative == 0 ?  (
          <span className="font-mono text-sm">{relative}</span>
        ) : (
          <span className="font-mono text-sm">{relative >= 0 ? `+${relative}` : relative}</span>
        )}
        <button
          onClick={() => setOctave((o) => Math.max(o - 1, min))}
          className="text-xl hover:text-teal-400 transition"
        >
          ▼
        </button>
      </div>

      {/* Clavier visuel */}
      <div className="flex items-center h-full">
        <KeyboardOctave baseOctave={octave} onPlayNote={onPlayNote} />
      </div>
    </div>
  );
}
