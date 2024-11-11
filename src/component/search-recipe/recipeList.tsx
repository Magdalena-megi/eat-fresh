import { RecipeListProps } from "@/types";
import RecipeCard from "./recipeCard";

export default function RecipeList({
  recipes,
  onViewRecipe,
  handleFavoriteChange,
}: RecipeListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onViewRecipe={onViewRecipe}
          handleFavoriteChange={handleFavoriteChange}
        />
      ))}
    </div>
  );
}
