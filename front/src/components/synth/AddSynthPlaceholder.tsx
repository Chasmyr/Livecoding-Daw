import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddSynthPlaceholderProps {
  onClick: () => void;
}

export function AddSynthPlaceholder({ onClick }: AddSynthPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-48 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer">
      <Button
        variant="ghost"
        onClick={onClick}
        className="flex flex-col items-center text-zinc-300 p-20"
      >
        <Plus className="w-6 h-6 mb-1" />
        <span className="text-sm font-medium">Ajouter un synthétiseur</span>
      </Button>
    </div>
  );
}
