import { History } from "@/component/history";

export default function HistroyPage() {
  return (
    <History
      onSearch={function (term: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
