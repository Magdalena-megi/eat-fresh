import Image from "next/image";
import { RecipeImageProps } from "@/types";
import Favorite from "../favorites/favorite";

export default function RecipeImage({
  src,
  alt,
  recipeId,
  recipeName,
}: RecipeImageProps) {
  return (
    <div className="relative aspect-video w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-t-3xl"
        priority
      />
      <Favorite recipeId={recipeId} recipeName={recipeName} />
    </div>
  );
}
