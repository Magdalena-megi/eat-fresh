import { SearchInput } from "@/component/search-recipe";

export default function SearchPage() {
  return (
    <SearchInput
      searchTerm={""}
      setSearchTerm={function (term: string): void {
        throw new Error("Function not implemented.");
      }}
      searchRecipes={function (): void {
        throw new Error("Function not implemented.");
      }}
      isLoading={false}
    />
  );
}