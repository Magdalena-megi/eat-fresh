"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Favorite from "./Favorite";
import useLocalStorage from "@/hooks/localstorage";
import { toast } from "@/hooks/use-toast";

export default function RecipeSearch({
  onViewRecipe,
  initialSearchTerm = "",
}: RecipeSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    "searchHistory",
    []
  );

  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setErrorMsg("");
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
            <Button onClick={searchRecipes} disabled={isLoading}>
              {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
              <span className="sr-only">Search recipes</span>
            </Button>
          </div>
          {errorMsg && (
            <p className="text-red-500 text-center mt-2" role="alert">
              {errorMsg}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foundRecipes.map((recipe) => (
            <Card
              key={recipe.idMeal}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Favorite
                  recipeId={recipe.idMeal}
                  recipeName={recipe.strMeal}
                  onFavoriteChange={handleFavoriteChange}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{recipe.strMeal}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onViewRecipe(recipe)}
                >
                  View More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
