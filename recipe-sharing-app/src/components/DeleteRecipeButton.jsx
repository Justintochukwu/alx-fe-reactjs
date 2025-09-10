import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const DeleteRecipeButton = ({ id, redirectTo = '/', children = 'Delete', ...props }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    // simple confirmation
    if (!window.confirm('Delete this recipe?')) return;
    deleteRecipe(Number(id));
    navigate(redirectTo);
  };

  return (
    <button onClick={handleDelete} {...props}>{children}</button>
  );
};

export default DeleteRecipeButton;
