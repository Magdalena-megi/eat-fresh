"use client";
import { useState } from "react";

export default function EatFreshRecipeFinder() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchRecipe = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const result = await response.json();
      setMeals(result.meals || []);
    } catch (error) {
      console.error("Fehler beim Abrufen der Rezepte:", error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        color: "black",
      }}
    >
      <h1>Rezept-Suche</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Rezeptnamen eingeben"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "200px",
            marginRight: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSearchRecipe}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Suchen
        </button>
      </div>

      {loading && <p>Laden...</p>}

      <div>
        {meals.length > 0
          ? meals.map((meal) => (
              <div key={meal.idMeal} style={{ marginBottom: "1rem" }}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: "100px", borderRadius: "4px" }}
                />
                <h2 style={{ margin: "0.5rem 0" }}>{meal.strMeal}</h2>
              </div>
            ))
          : !loading && query && <p>Keine Ergebnisse gefunden</p>}
      </div>
    </div>
  );
}
