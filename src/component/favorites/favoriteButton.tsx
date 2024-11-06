import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoriteButtonProps } from "@/types";

export default function FavoriteButton({
  isFavorite,
  recipeName,
  onClick,
}: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      className="absolute top-2 right-2 p-2 bg-white rounded-full"
      onClick={onClick}
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
