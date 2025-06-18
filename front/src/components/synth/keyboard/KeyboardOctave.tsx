import React, { useEffect, useState } from "react";

interface KeyboardOctaveProps {
  onNoteDown: (note: string) => void;
  onNoteUp: () => void;
  baseOctave?: number;
}

const WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_KEYS = [
  { note: "C#", position: 0.5 },
  { note: "D#", position: 1.5 },
  { note: "F#", position: 3.5 },
  { note: "G#", position: 4.5 },
  { note: "A#", position: 5.5 },
];

export const KeyboardOctave: React.FC<KeyboardOctaveProps> = ({
  onNoteDown,
  onNoteUp,
  baseOctave = 5,
}) => {
  const [octaves, setOctaves] = useState(2);

  useEffect(() => {
    const updateOctaves = () => {
      const width = window.innerWidth;
      if (width >= 765 && width <= 1400) {
        setOctaves(1);
      } else {
        setOctaves(2);
      }
    };

    updateOctaves();
    window.addEventListener("resize", updateOctaves);
    return () => window.removeEventListener("resize", updateOctaves);
  }, []);

  const totalWhiteKeys = WHITE_KEYS.length * octaves;
  const keyWidth = 100 / totalWhiteKeys;

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative h-24 bg-zinc-300 border border-zinc-500 rounded-md shadow-inner select-none"
        style={{ width: `${totalWhiteKeys * 40}px` }}
      >
        {/* Touches blanches */}
        <div className="flex h-full z-0">
          {Array.from({ length: octaves }).flatMap((_, octaveOffset) =>
            WHITE_KEYS.map((note) => {
              const currentOctave = baseOctave + octaveOffset;
              const fullNote = `${note}${currentOctave}`;
              return (
                <button
                  key={fullNote}
                  className="flex-1 border-r border-zinc-400 active:bg-blue-200 last:border-none"
                  onMouseDown={() => onNoteDown(fullNote)}
                  onMouseUp={onNoteUp}
                  onMouseLeave={onNoteUp}
                >
                  &nbsp;
                </button>
              );
            })
          )}
        </div>

        {/* Touches noires */}
        {Array.from({ length: octaves }).flatMap((_, octaveOffset) =>
          BLACK_KEYS.map(({ note, position }) => {
            const currentOctave = baseOctave + octaveOffset;
            const fullNote = `${note}${currentOctave}`;
            const indexOffset = octaveOffset * WHITE_KEYS.length;
            return (
              <button
                key={fullNote}
                className="absolute top-0 w-8 h-[65%] bg-black active:bg-zinc-700 rounded-sm shadow z-10"
                style={{
                  left: `${(position + indexOffset + 1) * keyWidth - keyWidth / 2}%`,
                  transform: "translateX(-50%)",
                }}
                onMouseDown={() => onNoteDown(fullNote)}
                onMouseUp={onNoteUp}
                onMouseLeave={onNoteUp}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
