"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState<RandomRecipes | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const formatInstructions = (instructions: string) => {
    return instructions
      .split(".")
      .filter((step) => step.trim() !== "")
      .map((step) => step.trim());
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!recipe) {
    return (
      <div className="text-center">No recipe found. Please try again.</div>
    );
  }

  const instructionSteps = formatInstructions(recipe.strInstructions);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm">
      <div className="relative aspect-video w-full">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          fill
          className="object-cover rounded-t-3xl"
          priority
        />
      </div>

      <div className="p-8">
        <h1 className="text-[32px] font-bold mb-8">{recipe.strMeal}</h1>

        <div className="mb-8">
          <h2 className="text-[24px] font-bold mb-4">Ingredients:</h2>
          <ul className="space-y-2">
            {Array.from({ length: 20 })
              .map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                if (ingredient && measure) {
                  return (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-2xl leading-none relative top-1">
                        •
                      </span>
                      <span className="text-[18px]">
                        {measure} {ingredient}
                      </span>
                    </li>
                  );
                }
                return null;
              })
              .filter(Boolean)}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-[24px] font-bold mb-4">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-4">
            {instructionSteps.map((step, index) => (
              <li key={index} className="text-[18px] leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <Button
          onClick={fetchRandomRecipe}
          className="w-full bg-[#14162c] hover:bg-[#1a1d3c] text-white py-6"
        >
          <Shuffle className="mr-2 h-5 w-5" />
          Get Another Random Recipe
        </Button>
      </div>
    </div>
  );
}
