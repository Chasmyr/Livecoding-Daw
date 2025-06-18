import { useState, useRef } from "react";
import { KeyboardOctave } from "./KeyboardOctave";

interface KeyboardWrapperProps {
  onNoteDown: (note: string) => void;
  onNoteUp: () => void;
}

export function KeyboardWrapper({ onNoteDown, onNoteUp }: KeyboardWrapperProps) {
  const [octave, setOctave] = useState(5);
  const activeNote = useRef<string | null>(null);

  const min = 1;
  const max = 8;
  const relative = octave - 5;

  const handleNoteDown = (note: string) => {
    if (activeNote.current === note) return; // évite redéclenchement
    activeNote.current = note;
    onNoteDown(note);
  };

  const handleNoteUp = () => {
    if (activeNote.current !== null) {
      onNoteUp();
      activeNote.current = null;
    }
  };

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
        <span className="font-mono text-sm">
          {relative >= 0 ? `+${relative}` : relative}
        </span>
        <button
          onClick={() => setOctave((o) => Math.max(o - 1, min))}
          className="text-xl hover:text-teal-400 transition"
        >
          ▼
        </button>
      </div>

      {/* Clavier visuel */}
      <div className="flex items-center h-full">
        <KeyboardOctave
          baseOctave={octave}
          onNoteDown={handleNoteDown}
          onNoteUp={handleNoteUp}
        />
      </div>
    </div>
  );
}
