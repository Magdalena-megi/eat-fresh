import { Button } from "@/components/ui/button";
import { HistoryHeaderProps } from "@/types";

export default function HistoryHeader({
  clearHistory,
  isHistoryEmpty,
}: HistoryHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">Your Search History</h1>
      <Button
        onClick={clearHistory}
        className="px-6 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
        disabled={isHistoryEmpty}
      >
        Clear History
      </Button>
    </header>
  );
}
