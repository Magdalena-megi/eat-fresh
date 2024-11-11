"use client";

import useLocalStorage from "@/hooks/localstorage";
import { useToast } from "@/hooks/use-toast";
import { HistoryHeader, HistoryList } from ".";
import { HistoryProps } from "@/types";

export default function HistoryPage({ onSearch }: HistoryProps) {
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

  const removeFromHistory = (searchTerm: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== searchTerm));
    toast({
      description: `"${searchTerm}" was successfully deleted.`,
      duration: 3000,
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const retrySearch = (searchTerm: string) => onSearch(searchTerm);

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
