import { ReactElement } from "react";

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strIngredients: string[];
  strMeasures: string[];
};

export interface RecipeDetails extends Recipe {
  strCategory?: string;
  strArea?: string;
  [key: string]: string | string[] | undefined;
}

export type RandomRecipes = RecipeDetails;

export interface Ingredient {
  ingredient: string;
  measure: string;
}

export type PageName = "home" | "search" | "favorites" | "history" | "random";

export interface FavoriteProps {
  recipeId: string;
  recipeName: string;
  onFavoriteChange?: (recipeId: string, isFavorite: boolean) => void;
}

export interface FavoriteButtonProps {
  isFavorite: boolean;
  recipeName: string;
  onClick: () => void;
}

export interface FavoritesSectionProps {
  onViewRecipe: (recipe: RecipeDetails) => void;
}

export interface HistoryProps {
  onSearch: (term: string) => void;
}

export interface HistoryHeaderProps {
  clearHistory: () => void;
  isHistoryEmpty: boolean;
}

export interface HistoryListProps {
  searchHistory: string[];
  retrySearch: (term: string) => void;
  removeFromHistory: (term: string) => void;
}

export interface HistoryItemProps {
  term: string;
  retrySearch: (term: string) => void;
  removeFromHistory: (term: string) => void;
}

export interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

export interface NavItemProps {
  icon: React.ElementType;
  label: string;
  page: PageName;
  isActive: boolean;
  onClick: () => void;
}

export interface RecipeDetailProps {
  recipe: RecipeDetails;
}

export interface InstructionsSectionProps {
  instructions: string;
}

export interface IngredientsListProps {
  recipe: RecipeDetails;
  ingredients: Ingredient[];
}

export interface RecipeImageProps {
  src: string;
  alt: string;
  recipeId: string;
  recipeName: string;
}

export interface RecipeSearchProps {
  onViewRecipe: (recipe: RecipeDetails) => void;
  initialSearchTerm?: string;
}

export interface RandomRecipeButtonProps {
  onClick: () => void;
}

export interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchRecipes: () => void;
  isLoading: boolean;
}

export interface FavoriteToastProps {
  message: string | null;
}

export interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (recipe: Recipe) => void;
  handleFavoriteChange: (recipeId: string, isFavorite: boolean) => void;
}
export interface RecipeImageProps {
  src: string;
  alt: string;
  recipeId: string;
  recipeName: string;
}

export interface Ingredient {
  ingredient: string;
  measure: string;
}

export interface IngredientsListProps {
  ingredients: Ingredient[];
}
export interface RecipeListProps {
  recipes: Recipe[];
  onViewRecipe: (recipe: Recipe) => void;
  handleFavoriteChange: (recipeId: string, isFavorite: boolean) => void;
}

export interface NavProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedRecipe: (recipe: null) => void;
  setSearchTerm: (term: string) => void;
}
