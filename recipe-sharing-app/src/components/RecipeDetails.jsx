import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
        <span style={{ marginLeft: 8 }}>
          <DeleteRecipeButton id={recipeId} redirectTo="/" />
        </span>
      </div>

      <p style={{ marginTop: 12 }}><Link to="/">← Back</Link></p>
    </div>
  );
};

export default RecipeDetails;
