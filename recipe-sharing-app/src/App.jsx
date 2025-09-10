import './App.css'
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>🍲 My Recipe App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
