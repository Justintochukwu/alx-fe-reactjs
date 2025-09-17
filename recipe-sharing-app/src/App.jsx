import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import SearchBar from ".component/SearchBar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="max-w-3xl mx-auto mt-4">
          <SearchBar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addrecipeform" element={<AddRecipeForm />} />
          <Route path="/recipelist" element={<RecipeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
