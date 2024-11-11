import { Home, Search, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavProps } from "@/types";

const navItems = [
  { icon: Home, label: "Home", page: "home" },
  { icon: Search, label: "Search", page: "search" },
  { icon: Heart, label: "Favorites", page: "favorites" },
  { icon: Clock, label: "History", page: "history" },
];

export default function DesktopNav({
  currentPage,
  setCurrentPage,
  setSelectedRecipe,
  setSearchTerm,
}: NavProps) {
  return (
    <nav className="hidden md:block bg-white border-b">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center px-4 py-1">
          {navItems.map(({ icon: Icon, label, page }) => (
            <Button
              key={page}
              variant="ghost"
              className={`flex flex-col items-center gap-1 ${
                currentPage === page
                  ? "text-green-600 bg-white"
                  : "text-gray-600 hover:text-green-600"
              } px-8 py-1 rounded-lg transition-colors duration-200`}
              onClick={() => {
                setCurrentPage(page);
                if (page === "search") {
                  setSelectedRecipe(null);
                  setSearchTerm("");
                }
              }}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
