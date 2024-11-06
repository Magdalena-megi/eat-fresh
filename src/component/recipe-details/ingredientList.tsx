import { IngredientsListProps } from "@/types";

export default function IngredientsList({ ingredients }: IngredientsListProps) {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      <h2 className="text-lg font-medium mb-2">Ingredients</h2>
      <ul className="list-disc list-inside space-y-1">
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>
    </section>
  );
}
