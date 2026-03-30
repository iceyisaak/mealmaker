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

  const isLoading = getMeal.some((query) => query.isLoading);
  const isError = getMeal.some((query) => query.isError);
  const meals = getMeal
    .map((query) => query.data)
    .filter((meal): meal is Meal => meal !== undefined);

  const handleRemoveBookmark = (recipeId: string) => {
    removeRecipe(recipeId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">
            Loading your bookmarked recipes...
          </p>
        </div>
      </div>
    );
  }

  if (isError && meals.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            Failed to load your bookmarked recipes. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Bookmarks Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start saving your favorite recipes to see them here!
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Explore Recipes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Bookmarked Recipes
        </h1>
        <p className="text-gray-600">
          You have {meals.length} saved recipe{meals.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="relative group">
            <RecipeCard recipe={meal} />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveBookmark(meal.idMeal);
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md 
                       opacity-0 group-hover:opacity-100 transition-opacity
                       hover:bg-red-50 focus:outline-none z-10"
              aria-label="Remove bookmark"
            >
              <svg
                className="w-5 h-5 text-red-500"
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

      {meals.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to remove all bookmarks?")
              ) {
                meals.forEach((meal) => removeRecipe(meal.idMeal));
              }
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 
                     border border-red-300 rounded-lg hover:bg-red-50 
                     transition-colors"
          >
            Clear All Bookmarks
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
