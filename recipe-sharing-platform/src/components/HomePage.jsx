import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json"; 

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  // Load recipes on mount
  useEffect(() => {
    setRecipes(data); // directly use imported JSON
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recipe Collection</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition block"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
              <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
              <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-block">
                View Recipe
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
