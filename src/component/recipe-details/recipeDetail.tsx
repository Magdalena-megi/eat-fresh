import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RecipeDetailProps } from "@/types";
import { IngredientsList, InstructionsSection, RecipeImage } from ".";

export default function RecipeDetailPage({ recipe }: RecipeDetailProps) {
  const ingredients = Object.keys(recipe)
    .filter(
      (key) =>
        key.startsWith("strIngredient") &&
        recipe[key] &&
        recipe[`strMeasure${key.replace("strIngredient", "")}`]
    )
    .map((key) => {
      const index = key.replace("strIngredient", "");
      return {
        ingredient: recipe[key] as string,
        measure: recipe[`strMeasure${index}`] as string,
      };
    });

  return (
    <Card className="bg-white shadow-md rounded overflow-hidden">
      <RecipeImage
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        recipeId={recipe.idMeal}
        recipeName={recipe.strMeal}
      />
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center mt-4">
          {recipe.strMeal}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <IngredientsList ingredients={ingredients} recipe={recipe} />
        <InstructionsSection instructions={recipe.strInstructions} />
      </CardContent>
    </Card>
  );
}
