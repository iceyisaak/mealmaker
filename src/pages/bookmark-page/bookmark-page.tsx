import { useQueries } from "@tanstack/react-query";
import { useBookmarkRecipe } from "../../features/store/useBookmarkRecipe";
import { RecipeCard } from "../recipe-card";
import type { Meal } from "../../types";
import { getMealByIdQuery } from "../../apis/recipe-api";

export const BookmarkPage = () => {
  const { bookmarks, removeRecipe } = useBookmarkRecipe();

  const getMeal = useQueries({
    queries: bookmarks.map((id) => getMealByIdQuery(id)),
  });

  const isLoading = getMeal.some((q) => q.isLoading);
  const isError = getMeal.some((q) => q.isError);
  const meals = getMeal
    .map((q) => q.data)
    .filter((meal): meal is Meal => meal !== undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-amber-brand border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-barlow text-stone-faint tracking-widest text-xs uppercase">
            Loading your collection
          </p>
        </div>
      </div>
    );
  }

  if (isError && meals.length === 0) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="font-playfair text-3xl text-white mb-3">
            Something went wrong
          </p>
          <p className="font-barlow font-light text-stone-muted mb-8">
            We couldn't load your saved recipes.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="font-barlow text-xs tracking-widest uppercase px-8 py-3 border border-amber-brand text-amber-brand hover:bg-amber-brand hover:text-white transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center px-4">
        <div className="text-center max-w-sm animate-fade-up">
          <p className="font-playfair italic text-5xl text-stone-faint mb-6">
            Empty
          </p>
          <p className="font-playfair text-2xl text-white mb-3">
            No saved recipes yet
          </p>
          <p className="font-barlow font-light text-stone-muted mb-10">
            Start exploring and bookmark the recipes you love.
          </p>

          <a
            href="/"
            className="font-barlow text-xs tracking-widest uppercase px-8 py-3 bg-amber-brand text-white hover:bg-amber-light transition-colors duration-300"
          >
            Explore Recipes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Header */}
      <div className="border-b border-stone-warm/10 px-6 py-10 md:px-12">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-barlow text-xs tracking-widest uppercase text-stone-faint mb-2">
              Your Collection
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl text-white">
              Saved Recipes
            </h1>
            <p className="font-barlow font-light text-stone-muted mt-2">
              {meals.length} recipe{meals.length !== 1 ? "s" : ""} saved
            </p>
          </div>

          {/* Clear all button */}
          <button
            onClick={() => {
              if (window.confirm("Remove all bookmarks?")) {
                meals.forEach((meal) => removeRecipe(meal.idMeal));
              }
            }}
            className="font-barlow text-xs tracking-widest uppercase text-stone-faint hover:text-amber-brand transition-colors duration-200"
          >
            Clear all bookmarks
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-10 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal, i) => (
            <div
              key={meal.idMeal}
              className="relative group animate-fade-up"
              style={{
                animationDelay: `${i * 60}ms`,
                animationFillMode: "both",
              }}
            >
              <RecipeCard recipe={meal} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeRecipe(meal.idMeal);
                }}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                           bg-surface-card/90 backdrop-blur-sm rounded-full
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200
                           hover:bg-amber-brand hover:text-white text-stone-faint"
                aria-label="Remove bookmark"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
