"use client";

import useLocalStorage from "@/hooks/localstorage";
import { useToast } from "@/hooks/use-toast";
import { HistoryHeader, HistoryList } from ".";
import { HistoryProps } from "@/types";

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
      <HistoryHeader
        clearHistory={clearHistory}
        isHistoryEmpty={searchHistory.length === 0}
      />
      <HistoryList
        searchHistory={searchHistory}
        retrySearch={retrySearch}
        removeFromHistory={removeFromHistory}
      />
    </div>
  );
}
