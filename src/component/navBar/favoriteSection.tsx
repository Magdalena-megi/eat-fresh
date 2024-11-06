import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FavoritesSectionProps, RecipeDetails } from "@/types";
import useLocalStorage from "@/hooks/localstorage";
import Favorite from "../favorites/favorite";

export default function FavoritesSection({
  onViewRecipe,
}: FavoritesSectionProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setIsLoading(true);
      try {
        const recipes = await Promise.all(
          favorites.map(async (id) => {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data.meals?.[0] as RecipeDetails;
          })
        );
        setFavoriteRecipes(recipes.filter(Boolean));
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        alert("Failed to fetch favorite recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteRecipes();
    }
  }, [favorites]);

  const handleFavoriteChange = (recipeId: string, isFavorite: boolean) => {
    if (isFavorite) {
      setFavorites([...favorites, recipeId]);
    } else {
      setFavorites(favorites.filter((id) => id !== recipeId));
      setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.idMeal !== recipeId)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">Loading your favorite recipes...</div>
    );
  }

  if (favoriteRecipes.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
        <p>You haven't added any favorite recipes yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Favorite Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteRecipes.map((recipe) => (
          <div
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
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{recipe.strMeal}</h3>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onViewRecipe(recipe)}
              >
                View Recipe
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
