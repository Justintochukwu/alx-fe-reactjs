import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

const RecommendationsList = () => {
  const getRecommendations = useRecipeStore((s) => s.getRecommendations);
  const recommendations = getRecommendations();

  return (
    <div>
      <h2>🍽 Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Add favorites to get suggestions!</p>
      ) : (
        recommendations.map((recipe) => (
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

export default RecommendationsList;
