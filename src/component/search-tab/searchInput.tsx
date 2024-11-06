import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchInputProps } from "@/types";

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  searchRecipes,
  isLoading,
}: SearchInputProps) {
  return (
    <div className="mb-8">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter a recipe name or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchRecipes();
            }
          }}
          className="flex-grow"
        />
        <Button
          onClick={searchRecipes}
          disabled={searchTerm.trim().length === 0 || isLoading}
        >
          {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
          <span className="sr-only">Search recipes</span>
        </Button>
      </div>
    </div>
  );
}
