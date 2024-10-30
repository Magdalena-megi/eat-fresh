"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function EatFreshRecipeFinder() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const [recipeResponse, ingredientResponse] = await Promise.all([
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`),
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`),
      ]);

      const [recipeData, ingredientData] = await Promise.all([
        recipeResponse.json(),
        ingredientResponse.json(),
      ]);

      const combinedMeals = [
        ...(recipeData.meals || []),
        ...(ingredientData.meals || []),
      ];
      const uniqueMeals = Array.from(
        new Map(combinedMeals.map((meal) => [meal.idMeal, meal])).values()
      );

      if (uniqueMeals.length > 0) {
        setRecipes(uniqueMeals);
      } else {
        setError("No recipes found. Try another search term.");
      }
    } catch (err) {
      setError("An error occurred while fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center flex-grow">
            EatFresh Recipe Finder
          </h1>
        </div>
        <div className="mb-8">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter a recipe name or ingredient..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : <Search className="h-4 w-4" />}
              <span className="sr-only">Search recipes</span>
            </Button>
          </div>
          {error && (
            <p className="text-red-500 text-center mt-2" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <Card
              key={recipe.idMeal}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">{recipe.strMeal}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        {recipes.length > 0 && (
          <p className="text-center mt-4" role="status">
            Found {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
          </p>
        )}
      </div>
    </div>
  );
}
