import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

const FavoritesList = () => {
  const favorites = useRecipeStore((s) => s.favorites);
  const recipes = useRecipeStore((s) => s.recipes);

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div>
      <h2>⭐ My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet. Add some!</p>
      ) : (
        favoriteRecipes.map((recipe) => (
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
            <Link to={`/recipes/${recipe.id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
