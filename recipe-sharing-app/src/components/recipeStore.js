import { create } from 'zustand';

// --- Helpers for persistence ---
const loadFromLocalStorage = (key, fallback) => {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage`, e);
    return fallback;
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage`, e);
  }
};

// --- Zustand Store ---
export const useRecipeStore = create((set, get) => ({
  // State
  recipes: loadFromLocalStorage('recipes', []),
  favorites: loadFromLocalStorage('favorites', []),
  searchTerm: '',

  // CRUD
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      saveToLocalStorage('recipes', recipes);
      return { recipes };
    }),

  updateRecipe: (id, updatedFields) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedFields } : r
      );
      saveToLocalStorage('recipes', recipes);
      return { recipes };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      saveToLocalStorage('recipes', recipes);
      return { recipes };
    }),

  setRecipes: (recipes) => {
    saveToLocalStorage('recipes', recipes);
    set({ recipes });
  },

  // Search & Filtering
  setSearchTerm: (term) => set({ searchTerm: term }),

  filteredRecipes: () => {
    const { recipes, searchTerm } = get();
    if (!searchTerm.trim()) return recipes;
    return recipes.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  // Favorites
  addToFavorites: (id) =>
    set((state) => {
      if (state.favorites.includes(id)) return state; // prevent duplicates
      const favorites = [...state.favorites, id];
      saveToLocalStorage('favorites', favorites);
      return { favorites };
    }),

  removeFromFavorites: (id) =>
    set((state) => {
      const favorites = state.favorites.filter((fid) => fid !== id);
      saveToLocalStorage('favorites', favorites);
      return { favorites };
    }),

  isFavorite: (id) => {
    const { favorites } = get();
    return favorites.includes(id);
  },

  // === Recommendations (renamed from getRecommendations) ===
  recommendations: () => {
    const { favorites, recipes } = get();
    if (favorites.length === 0) return [];

    const favoriteTitles = favorites
      .map((fid) => recipes.find((r) => r.id === fid)?.title || "")
      .filter(Boolean);

    const keywords = favoriteTitles.map((title) =>
      title.split(" ")[0].toLowerCase()
    );

    return recipes.filter(
      (r) =>
        !favorites.includes(r.id) &&
        keywords.some((kw) => r.title.toLowerCase().includes(kw))
    );
  },
}));
