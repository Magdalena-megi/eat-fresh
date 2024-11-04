type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strIngredients: string[];
};
interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
}
interface RecipeDetailProps {
  recipe: RecipeDetails;
}

interface RandomRecipes {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string;
}

interface FavoriteProps {
  recipeId: string;
  recipeName: string;
}
interface FavoriteProps {
  recipeId: string;
  recipeName: string;
  onFavoriteChange?: (isFavorite: boolean) => void;
}
interface RecipeSearchProps {
  onViewRecipe: (recipe: Recipe) => void;
}

interface RecipeSearchProps {
  onViewRecipe: (recipe: Recipe) => void;
  initialSearchTerm?: string;
}

interface HistoryProps {
  onSearch: (term: string) => void;
}
