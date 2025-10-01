import { useState } from "react";

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});

  // handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value; // ✅ now explicitly contains target.value
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // validate form inputs
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required.";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else {
      const items = formData.ingredients.split("\n").filter((i) => i.trim());
      if (items.length < 2) {
        newErrors.ingredients = "Please enter at least two ingredients.";
      }
    }

    if (!formData.steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Form Submitted:", formData);

    setFormData({ title: "", ingredients: "", steps: "" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add New Recipe
      </h2>

      {/* Recipe Title */}
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          className="w-full border rounded p-3 focus:ring focus:ring-blue-300"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Ingredients */}
      <div>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (one per line)"
          className="w-full border rounded p-3 h-28 focus:ring focus:ring-blue-300"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}
      </div>

      {/* Steps */}
      <div>
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          placeholder="Preparation Steps"
          className="w-full border rounded p-3 h-32 focus:ring focus:ring-blue-300"
        />
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
