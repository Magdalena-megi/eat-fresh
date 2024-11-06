import { X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HistoryItemProps } from "@/types";

export default function HistoryItem({
  term,
  retrySearch,
  removeFromHistory,
}: HistoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <span className="text-lg">{term}</span>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => retrySearch(term)}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Search again for {term}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromHistory(term)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove {term} from history</span>
        </Button>
      </div>
    </div>
  );
}
