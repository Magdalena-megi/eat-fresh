"use client";

import { X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/localstorage";
import { useToast } from "@/hooks/use-toast";

export default function History({ onSearch }: HistoryProps) {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    "searchHistory",
    []
  );

  const { toast } = useToast();

  const clearHistory = () => {
    setSearchHistory([]);
    toast({
      description: "Your search history has been successfully cleared.",
      duration: 3000,
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const removeFromHistory = (term: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== term));
    toast({
      description: `The search term "${term}" was successfully deleted.`,
      duration: 3000,
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const retrySearch = (term: string) => onSearch(term);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Search History</h1>
        <Button
          variant="outline"
          onClick={clearHistory}
          className="px-6"
          disabled={searchHistory.length === 0}
        >
          Clear History
        </Button>
      </header>

      {searchHistory.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          Your search history is empty
        </p>
      ) : (
        <div className="space-y-4">
          {searchHistory.map((term, index) => (
            <div
              key={`${term}-${index}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
