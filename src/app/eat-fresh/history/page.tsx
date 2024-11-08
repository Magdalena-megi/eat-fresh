import { History } from "@/component/history";

export default function HistoryPage() {
  const onSearch = (term: string) => {
    console.log(`Searching for: ${term}`);
  };

  return <History onSearch={onSearch} />;
}
