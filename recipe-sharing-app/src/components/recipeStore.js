import { create } from 'zustand';

const loadFromLocalStorage = () => {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem('recipes');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load recipes from localStorage', e);
    return [];
  }
};

const saveToLocalStorage = (recipes) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('recipes', JSON.stringify(recipes));
  } catch (e) {
    console.error('Failed to save recipes to localStorage', e);
  }
};

export const useRecipeStore = create((set, get) => ({
  recipes: loadFromLocalStorage(),
  searchTerm: '',

  // CRUD
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      saveToLocalStorage(recipes);
      return { recipes };
    }),

  updateRecipe: (id, updatedFields) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedFields } : r
      );
      saveToLocalStorage(recipes);
      return { recipes };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      saveToLocalStorage(recipes);
      return { recipes };
    }),

  setRecipes: (recipes) => {
    saveToLocalStorage(recipes);
    set({ recipes });
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  filteredRecipes: () => {
    const { recipes, searchTerm } = get();
    if (!searchTerm.trim()) return recipes;
    return recipes.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
}));
