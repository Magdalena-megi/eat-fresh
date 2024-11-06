import { HistoryListProps } from "@/types";
import HistoryItem from "./historyItem";

export default function HistoryList({
  searchHistory,
  retrySearch,
  removeFromHistory,
}: HistoryListProps) {
  if (searchHistory.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        Your search history is empty
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {searchHistory.map((term, index) => (
        <HistoryItem
          key={`${term}-${index}`}
          term={term}
          retrySearch={retrySearch}
          removeFromHistory={removeFromHistory}
        />
      ))}
    </div>
  );
}
