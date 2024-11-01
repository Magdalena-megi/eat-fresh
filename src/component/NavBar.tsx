"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Search, Heart, Clock, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RandomRecipe from "./RandomRecipe";
import SearchTab from "./SearchTab";
import Favorite from "./Favorite";
import useLocalStorage from "@/hooks/localstorage";

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState("home");
  const [favorites] = useLocalStorage<string[]>("favorites", []);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (currentPage === "favorites") {
        setIsLoading(true);
        try {
          const recipes = await Promise.all(
            favorites.map(async (id) => {
              const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
              );
              const data = await response.json();
              return data.meals?.[0];
            })
          );
          setFavoriteRecipes(recipes.filter(Boolean));
        } catch (error) {
          console.error("Error fetching favorite recipes:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFavoriteRecipes();
  }, [currentPage, favorites]);

  const renderPage = () => {
    switch (currentPage) {
      case "search":
        return <SearchTab />;
      case "random":
        return <RandomRecipe />;
      case "favorites":
        return renderFavorites();
      case "history":
        return <div>History page (not implemented yet)</div>;
      default:
        return (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Welcome to EatFresh!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your next meal with our recipe finder. You can search for
              recipes, generate random recipes, or check out your favorites.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button
                onClick={() => setCurrentPage("search")}
                className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
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
        );
    }
  };

  const renderFavorites = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">Loading your favorite recipes...</div>
      );
    }

    if (favoriteRecipes.length === 0) {
      return (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
          <p>You haven't added any favorite recipes yet.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Your Favorite Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Favorite
                  recipeId={recipe.idMeal}
                  recipeName={recipe.strMeal}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{recipe.strMeal}</h3>
                <Button variant="outline" className="w-full">
                  View Recipe
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="w-[150px]"></div>
          <h1 className="text-xl font-bold text-center flex-grow">
            Eat<span className="text-green-800">Fresh</span> Recipe Finder
          </h1>
          <div className="w-[150px] flex justify-end">
            <Image
              src="/EatFreshLogo.png"
              alt="EatFresh Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <nav className="flex justify-between items-center max-w-4xl mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${
            currentPage === "home" ? "text-gray-900 bg-white" : "text-gray-600"
          } px-8 py-2 rounded-lg`}
          onClick={() => setCurrentPage("home")}
        >
          <Home className="h-6 w-6" />
          <span>Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${
            currentPage === "search"
              ? "text-gray-900 bg-white"
              : "text-gray-600"
          } hover:text-gray-900`}
          onClick={() => setCurrentPage("search")}
        >
          <Search className="h-6 w-6" />
          <span>Search</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${
            currentPage === "favorites"
              ? "text-gray-900 bg-white"
              : "text-gray-600"
          } hover:text-gray-900`}
          onClick={() => setCurrentPage("favorites")}
        >
          <Heart className="h-6 w-6" />
          <span>Favorites</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${
            currentPage === "history"
              ? "text-gray-900 bg-white"
              : "text-gray-600"
          } hover:text-gray-900`}
          onClick={() => setCurrentPage("history")}
        >
          <Clock className="h-6 w-6" />
          <span>History</span>
        </Button>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">{renderPage()}</main>
    </div>
  );
}
