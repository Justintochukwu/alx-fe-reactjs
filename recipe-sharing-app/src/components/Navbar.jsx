import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "12px", background: "#f3f4f6" }}>
      <Link to="/" style={{ marginRight: 12 }}>Home</Link>
      <Link to="/recipelist" style={{ marginRight: 12 }}>Recipes</Link>
      <Link to="/addrecipeform" style={{ marginRight: 12 }}>Add Recipe</Link>
      <Link to="/favorites" style={{ marginRight: 12 }}>Favorites</Link>
      <Link to="/recommendations">Recommendations</Link>
    </nav>
  );
};

export default Navbar;
