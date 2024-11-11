import { IngredientsListProps } from "@/types";

export default function IngredientsList({ recipe }: IngredientsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-[24px] font-bold mb-4">Ingredients:</h2>
      <ul className="space-y-2">
        {Array.from({ length: 20 })
          .map((_, i) => {
            const ingredient = recipe[`strIngredient${i + 1}`];
            const measure = recipe[`strMeasure${i + 1}`];
            if (ingredient && measure) {
              return (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-2xl leading-none relative top-1">
                    •
                  </span>
                  <span className="text-[18px]">
                    {measure} {ingredient}
                  </span>
                </li>
              );
            }
            return null;
          })
          .filter(Boolean)}
      </ul>
    </div>
  );
}
