import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.filteredRecipes()); // ✅ call the function
  const addToFavorites = useRecipeStore((s) => s.addToFavorites);
  const removeFromFavorites = useRecipeStore((s) => s.removeFromFavorites);
  const isFavorite = useRecipeStore((s) => s.isFavorite);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet — add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}
          >
            <h3>{recipe.title}</h3>
            <p>
              {recipe.description.length > 150
                ? `${recipe.description.slice(0, 150)}…`
                : recipe.description}
            </p>
            <div>
              <Link to={`/recipes/${recipe.id}`}>View</Link>
              <Link to={`/recipes/${recipe.id}/edit`} style={{ marginLeft: 8 }}>
                Edit
              </Link>
              <button
                onClick={() =>
                  isFavorite(recipe.id)
                    ? removeFromFavorites(recipe.id)
                    : addToFavorites(recipe.id)
                }
                style={{
                  marginLeft: 12,
                  background: isFavorite(recipe.id) ? "#f87171" : "#34d399",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {isFavorite(recipe.id) ? "Remove Favorite" : "Add Favorite"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
