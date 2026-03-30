import { useQueries } from "@tanstack/react-query";
import { useBookmarkRecipe } from "../../features/store/useBookmarkRecipe";
import { RecipeCard } from "../recipe-card";
import type { Meal } from "../../types";
import { getMealByIdQuery } from "../../apis/recipe-api";

const heroBg =
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1400&q=80";

const SkeletonCard = () => (
  <div className="overflow-hidden rounded bg-surface-card ring-1 ring-amber-brand/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
    <div className="aspect-square [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    <div className="px-5 pb-5 pt-4">
      <div className="mb-2 h-5 w-4/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
      <div className="h-4 w-2/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    </div>
  </div>
);

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
      <div className="min-h-screen bg-surface-dark font-barlow">
        {/* Hero search band */}
        <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-cream/70" />
          </div>
          <div className="relative">
            <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
              Your Collection
            </span>
            <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-tight text-ink">
              Saved Recipes
            </h1>
          </div>
        </div>

        {/* Content area */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError && meals.length === 0) {
    return (
      <div className="min-h-screen bg-surface-dark font-barlow">
        {/* Hero search band */}
        <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-cream/70" />
          </div>
          <div className="relative">
            <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
              Your Collection
            </span>
            <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-tight text-ink">
              Saved Recipes
            </h1>
          </div>
        </div>

        {/* Content area */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="py-20 text-center font-playfair text-xl italic text-red-400">
            Something went wrong. Please try again.
          </p>
          <div className="text-center">
            <button
              onClick={() => window.location.reload()}
              className="font-barlow text-xs tracking-widest uppercase px-8 py-3 border border-amber-brand text-amber-brand hover:bg-amber-brand hover:text-white transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen bg-surface-dark font-barlow">
        {/* Hero search band */}
        <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-cream/70" />
          </div>
          <div className="relative">
            <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
              Your Collection
            </span>
            <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-tight text-ink">
              Saved Recipes
            </h1>
          </div>
        </div>

        {/* Content area */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">📚</div>
            <p className="font-playfair text-xl italic text-stone-faint">
              No saved recipes yet
            </p>
            <p className="mt-2 text-[12px] font-light uppercase tracking-[0.2em] text-stone-muted">
              Start exploring and bookmark the recipes you love
            </p>
            <div className="mt-8">
              <a
                href="/"
                className="inline-block font-barlow text-xs tracking-widest uppercase px-8 py-3 bg-amber-brand text-white hover:bg-amber-light transition-colors duration-300"
              >
                Explore Recipes
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-dark font-barlow">
      {/* Hero search band */}
      <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-cream/70" />
        </div>

        <div className="relative">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            Your Collection
          </span>
          <h1 className="mb-4 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-tight text-ink">
            Saved Recipes
          </h1>
          <div className="flex items-center justify-center gap-4">
            <hr className="h-px w-12 flex-1 border-none bg-amber-brand/20" />
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-stone-muted">
              {meals.length} recipe{meals.length !== 1 ? "s" : ""} saved
            </span>
            <hr className="h-px w-12 flex-1 border-none bg-amber-brand/20" />
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                if (window.confirm("Remove all bookmarks?")) {
                  meals.forEach((meal) => removeRecipe(meal.idMeal));
                }
              }}
              className="font-barlow text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 border border-stone-muted/30 rounded-sm text-stone-muted hover:border-amber-brand hover:text-amber-brand transition-all duration-200"
            >
              Clear all bookmarks
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
