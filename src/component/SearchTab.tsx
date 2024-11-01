"use client";

import { useState } from "react";
import { Search, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import RecipeDetail from "./RecipeDetail";

export default function RecipeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

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
      );

      if (distinctRecipes.length > 0) {
        setFoundRecipes(distinctRecipes);
      } else {
        setErrorMsg("No recipes found. Try another search term.");
      }
    } catch (error) {
      setErrorMsg(
        "An error occurred while fetching recipes. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const viewRecipeDetails = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
  };

  if (currentRecipe) {
    return <RecipeDetail recipe={currentRecipe} />;
  }

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
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 p-2 bg-white rounded-full"
                >
                  <Heart className="h-6 w-6 text-gray-500" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{recipe.strMeal}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => viewRecipeDetails(recipe)}
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
