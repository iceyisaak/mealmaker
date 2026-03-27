import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecipeBookmark {
  bookmarks: string[];
  saveRecipe: (id: string) => void;
  removeRecipe: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkRecipe = create<RecipeBookmark>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      saveRecipe: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks
            : [...state.bookmarks, id],
        })),

      removeRecipe: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b !== id),
        })),

      isBookmarked: (id) => get().bookmarks.includes(id),
    }),
    {
      name: "recipe_bookmarks",
    },
  ),
);
