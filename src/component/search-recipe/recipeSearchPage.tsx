"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/localstorage";
import { toast } from "@/hooks/use-toast";
import { Recipe, RecipeSearchProps } from "@/types";
import { RecipeList, SearchInput } from ".";

export default function RecipeSearchPage({
  onViewRecipe,
  initialSearchTerm = "",
}: RecipeSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    "searchHistory",
    []
  );

  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setFoundRecipes([]);

    try {
      const [searchResponse, filterResponse] = await Promise.all([
        fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        ),
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`
        ),
      ]);

      const [searchData, filterData] = await Promise.all([
        searchResponse.json(),
        filterResponse.json(),
      ]);

      const combinedResults = [
        ...(searchData.meals || []),
        ...(filterData.meals || []),
      ];
      const distinctRecipes = Array.from(
        new Map(combinedResults.map((meal) => [meal.idMeal, meal])).values()
      ) as Recipe[];

      if (distinctRecipes.length > 0) {
        setFoundRecipes(distinctRecipes);
        if (!searchHistory.includes(searchTerm)) {
          setSearchHistory((prev) => [searchTerm, ...prev.slice(0, 9)]);
        }
      } else {
        toast({
          title: "Uh oh! No recipes found.",
          description: "Try another search term.",
          duration: 3000,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("failed")) {
        toast({
          title: "Network Error",
          description:
            "It seems you are not connected to the internet. Please check your Wi-Fi connection.",
          duration: 3000,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        toast({
          title: "An error occurred while fetching recipes",
          description: "Please try again.",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteChange = (recipeId: string, isFavorite: boolean) => {
    setFavorites((prev) => {
      if (isFavorite) {
        return [...prev, recipeId];
      } else {
        return prev.filter((id) => id !== recipeId);
      }
    });
  };

  useEffect(() => {
    if (initialSearchTerm) {
      searchRecipes();
    }
  }, [initialSearchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Recipe Finder</h1>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchRecipes={searchRecipes}
          isLoading={isLoading}
        />
        <RecipeList
          recipes={foundRecipes}
          onViewRecipe={onViewRecipe}
          handleFavoriteChange={handleFavoriteChange}
        />
      </div>
    </div>
  );
}
