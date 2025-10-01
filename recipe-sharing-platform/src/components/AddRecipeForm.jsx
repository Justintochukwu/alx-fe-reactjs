import { useState } from "react";

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form Submitted:", formData);

    setFormData({ title: "", ingredients: "", steps: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Add New Recipe</h2>

      {/* Recipe Title */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Recipe Title"
        className="w-full border rounded p-2"
        required
      />

      {/* Ingredients */}
      <textarea
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        placeholder="Ingredients (one per line)"
        className="w-full border rounded p-2 h-24"
        required
      />

      {/* Steps */}
      <textarea
        name="steps"
        value={formData.steps}
        onChange={handleChange}
        placeholder="Preparation Steps"
        className="w-full border rounded p-2 h-32"
        required
      />

      {/* ✅ Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

export default AddRecipeForm;
