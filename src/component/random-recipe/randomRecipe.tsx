"use client";

import { useState, useEffect } from "react";
import InstructionsList from "./InstructionsList";
import { RecipeImage, RandomRecipeButton, IngredientsList } from ".";
import { RandomRecipes } from "@/types";

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState<RandomRecipes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomRecipe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setRecipe(data.meals[0]);
      } else {
        throw new Error("No recipe found");
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      setError("Failed to fetch recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>{error}</p>
        <RandomRecipeButton onClick={fetchRandomRecipe} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center">
        <p>No recipe found. Please try again.</p>
        <RandomRecipeButton onClick={fetchRandomRecipe} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm">
      <RecipeImage
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        recipeId={recipe.idMeal}
        recipeName={recipe.strMeal}
        recipe={undefined}
      />

      <div className="p-8">
        <h1 className="text-[32px] font-bold mb-8">{recipe.strMeal}</h1>

        <IngredientsList recipe={recipe} />
        <InstructionsList instructions={recipe.strInstructions} />

        <RandomRecipeButton onClick={fetchRandomRecipe} />
      </div>
    </div>
  );
}
