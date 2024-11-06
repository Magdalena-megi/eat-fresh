import Image from "next/image";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Favorite from "../favorites/favorite";
import { RecipeCardProps } from "@/types";

export default function RecipeCard({
  recipe,
  onViewRecipe,
  handleFavoriteChange,
}: RecipeCardProps) {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
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
  );
}
