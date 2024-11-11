import { Home, Search, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavProps } from "@/types";

export const navItems = [
  { icon: Home, label: "Home", page: "home" },
  { icon: Search, label: "Search", page: "search" },
  { icon: Heart, label: "Favorites", page: "favorites" },
  { icon: Clock, label: "History", page: "history" },
];

export default function MobileNav({
  currentPage,
  setCurrentPage,
  setSelectedRecipe,
  setSearchTerm,
}: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-50">
      <div className="flex justify-between items-center px-2 py-1">
        {navItems.map(({ icon: Icon, label, page }) => (
          <Button
            key={page}
            variant="ghost"
            className={`flex flex-col items-center gap-0.5 ${
              currentPage === page
                ? "text-green-600 bg-white"
                : "text-gray-600 hover:text-green-600"
            } px-1 py-0.5 rounded-lg transition-colors duration-200 w-full max-w-[60px]`}
            onClick={() => {
              setCurrentPage(page);
              if (page === "search") {
                setSelectedRecipe(null);
                setSearchTerm("");
              }
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-[10px]">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
