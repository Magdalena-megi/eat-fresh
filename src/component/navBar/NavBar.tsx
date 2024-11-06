"use client";

import { useState } from "react";
import { Home, Search, Heart, Clock, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import History from "../history/history";
import RecipeDetail from "../recipe-details/recipeDetail";
import RecipeSearch from "../search-tab/searchTab";
import RandomRecipe from "../random-recipe/randomRecipe";
import { FavoritesSection, Header } from ".";
import { RecipeDetails } from "@/types";

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const navItems = [
    { icon: Home, label: "Home", page: "home" },
    { icon: Search, label: "Search", page: "search" },
    { icon: Heart, label: "Favorites", page: "favorites" },
    { icon: Clock, label: "History", page: "history" },
  ];

  const handleViewRecipe = (recipe: RecipeDetails) => {
    setSelectedRecipe(recipe);
    setCurrentPage("search");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage("search");
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "search":
        return selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} />
        ) : (
          <RecipeSearch
            onViewRecipe={handleViewRecipe}
            initialSearchTerm={searchTerm}
          />
        );
      case "random":
        return <RandomRecipe />;
      case "favorites":
        return <FavoritesSection onViewRecipe={handleViewRecipe} />;
      case "history":
        return <History onSearch={handleSearch} />;
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
      <nav className="flex justify-between items-center max-w-4xl mx-auto px-4 py-4">
        {navItems.map(({ icon: Icon, label, page }) => (
          <Button
            key={page}
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${
              currentPage === page
                ? "text-green-600 bg-white"
                : "text-gray-600 hover:text-green-600"
            } px-8 py-2 rounded-lg transition-colors duration-200`}
            onClick={() => {
              setCurrentPage(page);
              if (page === "search") {
                setSelectedRecipe(null);
                setSearchTerm("");
              }
            }}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </Button>
        ))}
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {renderPageContent()}
      </main>
    </div>
  );
}
