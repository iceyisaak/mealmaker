// src/pages/result-page.tsx
import { Link } from "@tanstack/react-router";
import { useGetMeals } from "../../apis/recipe-api";
import { Route } from "../../routes/search";
import { ResultCard } from "./result-card";
import { SearchBar } from "../../components/navbar/search-bar";

const SkeletonCard = () => (
  <div className="overflow-hidden rounded bg-surface-card ring-1 ring-amber-brand/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
    <div className="aspect-square [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    <div className="px-5 pb-5 pt-4">
      <div className="mb-2 h-5 w-4/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
      <div className="h-4 w-2/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    </div>
  </div>
);

export const ResultPage = () => {
  const { q } = Route.useSearch();
  const { data: meals, isLoading, isError } = useGetMeals(q);

  return (
    <div className="min-h-screen bg-[#181A1B] font-barlow">
      {/* Hero search band */}
      <div className="relative overflow-hidden border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_10%_20%,rgba(210,160,80,0.07)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(180,100,60,0.07)_0%,transparent_50%)]" />
        <div className="relative">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            Search Results
          </span>
          <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-tight text-ink">
            Results for <em className="italic text-amber-brand">"{q}"</em>
          </h1>
          <div className="flex justify-center">
            <SearchBar defaultValue={q} />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className="py-20 text-center font-playfair text-xl italic text-red-400">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Empty */}
        {!isLoading && !isError && (!meals || meals.length === 0) && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <p className="font-playfair text-xl italic text-stone-faint">
              No recipes found for <em className="text-amber-brand">"{q}"</em>
            </p>
            <p className="mt-2 text-[12px] font-light uppercase tracking-[0.2em] text-stone-muted">
              Try a different ingredient or dish name
            </p>
          </div>
        )}

        {/* Results */}
        {meals && meals.length > 0 && (
          <>
            <div className="mb-8 flex items-center gap-4">
              <hr className="flex-1 border-none h-px bg-amber-brand/10" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-stone-faint">
                {meals.length} recipe{meals.length !== 1 ? "s" : ""} found
              </span>
              <hr className="flex-1 border-none h-px bg-amber-brand/10" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to="/meal/$id"
                  params={{ id: meal.idMeal }}
                >
                  <ResultCard meal={meal} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
