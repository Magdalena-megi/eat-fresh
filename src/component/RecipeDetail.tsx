"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const ingredients = [
    { ingredient: recipe.strIngredient1, measure: recipe.strMeasure1 },
    { ingredient: recipe.strIngredient2, measure: recipe.strMeasure2 },
    { ingredient: recipe.strIngredient3, measure: recipe.strMeasure3 },
    { ingredient: recipe.strIngredient4, measure: recipe.strMeasure4 },
    { ingredient: recipe.strIngredient5, measure: recipe.strMeasure5 },
  ].filter((item) => item.ingredient && item.measure);

  return (
    <Card className="bg-white shadow-md rounded overflow-hidden">
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={600}
        height={400}
        className="object-cover w-full h-80"
      />
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center mt-4">
          {recipe.strMeal}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <section className="mt-4">
          <h2 className="text-lg font-medium mb-2">Instructions</h2>
          <p className="text-base leading-relaxed">
            {recipe.strInstructions || "No instructions available."}
          </p>
        </section>

        {ingredients.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-medium mb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1">
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.measure}
                </li>
              ))}
            </ul>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
