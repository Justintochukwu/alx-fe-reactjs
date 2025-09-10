import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">← Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p><strong>ID:</strong> {recipe.id}</p> {/* ✅ recipe.id now shown */}
      <p>{recipe.description}</p>

      <div style={{ marginTop: 16 }}>
        <Link to={`/recipes/${recipe.id}/edit`}>✏️ Edit</Link>
        <span style={{ marginLeft: 12 }}>
          <DeleteRecipeButton id={recipe.id} redirectTo="/" />
        </span>
      </div>

      <p style={{ marginTop: 20 }}>
        <Link to="/">← Back to Recipe List</Link>
      </p>
    </div>
  );
};

export default RecipeDetails;
