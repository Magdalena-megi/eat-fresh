"use client";

import { useState } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HistoryPage from "../history/history";
import RecipeDetailPage from "../recipe-details/recipeDetail";
import RecipeSearchPage from "../search-recipe/recipeSearchPage";
import RandomRecipePage from "../random-recipe/randomRecipe";
import { RecipeDetails } from "@/types";
import { FavoritesSection } from "../favorites";
import { DesktopNav, Header, MobileNav } from ".";
export default function NavBar() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewRecipe = (recipe: RecipeDetails) => {
    setSelectedRecipe(recipe);
    setCurrentPage("search");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage("search");
  };

  const RecipeNavigator = () => {
    switch (currentPage) {
      case "search":
        return selectedRecipe ? (
          <RecipeDetailPage recipe={selectedRecipe} />
        ) : (
          <RecipeSearchPage
            onViewRecipe={handleViewRecipe}
            initialSearchTerm={searchTerm}
          />
        );
      case "random":
        return <RandomRecipePage />;
      case "favorites":
        return <FavoritesSection onViewRecipe={handleViewRecipe} />;
      case "history":
        return <HistoryPage onSearch={handleSearch} />;
      default:
        return (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold">Welcome to EatFresh!</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find your next meal with our recipe finder. You can search for
                recipes, generate random recipes, or check out your favorites.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button
                  onClick={() => setCurrentPage("search")}
                  className="bg-green-600 text-white hover:bg-green-700 text-lg px-8 py-6 transition-colors duration-200"
                >
                  Start Searching
                </Button>
                <Button
                  onClick={() => setCurrentPage("random")}
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  <Shuffle className="mr-2 h-5 w-5" />
                  Random Recipe
                </Button>
              </div>
            </div>
            <FavoritesSection onViewRecipe={handleViewRecipe} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setCurrentPage={setCurrentPage} />
      <DesktopNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedRecipe={setSelectedRecipe}
        setSearchTerm={setSearchTerm}
      />
      <main className="max-w-4xl mx-auto px-4 py-12 mb-16 md:mb-12">
        {RecipeNavigator()}
      </main>
      <MobileNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedRecipe={setSelectedRecipe}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
