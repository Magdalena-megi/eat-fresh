import { RecipeDetail } from "@/component/recipe-details";
import { RecipeDetailProps } from "@/types";

export default function RecipePage({ recipe }: RecipeDetailProps) {
  return <RecipeDetail recipe={recipe} />;
}
