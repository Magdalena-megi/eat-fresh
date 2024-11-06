import { Button } from "@/components/ui/button";
import { RandomRecipeButtonProps } from "@/types";
import { Shuffle } from "lucide-react";

export default function RandomRecipeButton({
  onClick,
}: RandomRecipeButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-green-600 w-full hover:bg-green-700 text-white py-6 transition-colors duration-200"
    >
      <Shuffle className="mr-2 h-5 w-5" />
      Get Another Random Recipe
    </Button>
  );
}
