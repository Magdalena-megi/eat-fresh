"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/localstorage";

interface FavoriteProps {
  recipeId: string;
  recipeName: string;
  onFavoriteChange?: (recipeId: string, isFavorite: boolean) => void;
}

export default function Favorite({
  recipeId,
  recipeName,
  onFavoriteChange,
}: FavoriteProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const isFavorite = favorites.includes(recipeId);

  const updateFavoriteStatus = () => {
    const newIsFavorite = !isFavorite;
    const updatedFavorites = newIsFavorite
      ? [...favorites, recipeId]
      : favorites.filter((id) => id !== recipeId);

    setFavorites(updatedFavorites);

    if (onFavoriteChange) {
      onFavoriteChange(recipeId, newIsFavorite);
    }

    window.location.reload();
  };

  return (
    <Button
      variant="ghost"
      className="absolute top-2 right-2 p-2 bg-white rounded-full"
      onClick={updateFavoriteStatus}
      aria-label={
        isFavorite
          ? `Remove ${recipeName} from favorites`
          : `Add ${recipeName} to favorites`
      }
    >
      <Heart
        className={`h-6 w-6 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </Button>
  );
}
