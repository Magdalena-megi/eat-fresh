"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/localstorage";

export default function Favorite({ recipeId, recipeName }: FavoriteProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const isCurrentlyFavorite = favorites.includes(recipeId);

  const toggleFavorite = () => {
    if (isCurrentlyFavorite) {
      setFavorites(favorites.filter((id) => id !== recipeId));
    } else {
      setFavorites([...favorites, recipeId]);
    }
    console.log(recipeId, "RecipeID");
  };

  return (
    <Button
      variant="ghost"
      className="absolute top-2 right-2 p-2 bg-white rounded-full"
      onClick={toggleFavorite}
    >
      <Heart
        className={`h-6 w-6 ${
          isCurrentlyFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
      <span className="sr-only">
        {isCurrentlyFavorite
          ? `Remove ${recipeName} from favorites`
          : `Add ${recipeName} to favorites`}
      </span>
    </Button>
  );
}
