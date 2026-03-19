import { Link, useParams } from "@tanstack/react-router";
import { useGetMealsByCategory } from "../../apis/recipe-api";
import { ResultCard } from "../result-page/result-card";

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="overflow-hidden rounded bg-surface-card ring-1 ring-amber-brand/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
    <div className="aspect-square [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    <div className="px-5 pb-5 pt-4">
      <div className="mb-2 h-5 w-4/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
      <div className="h-4 w-2/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    </div>
  </div>
);

// ─── Decorative category badge ────────────────────────────────────────────────

const CategoryIcon = ({ category }: { category: string }) => {
  const icons: Record<string, string> = {
    Side: "🍞",
    Beef: "🥩",
    Chicken: "🍗",
    Dessert: "🍰",
    Lamb: "🫕",
    Pasta: "🍝",
    Pork: "🥓",
    Seafood: "🦞",
    Starter: "🥗",
    Vegan: "🥦",
    Vegetarian: "🫑",
    Breakfast: "🍳",
    Goat: "🐐",
    Miscellaneous: "🍴",
  };
  return <span>{icons[category] ?? "🍽️"}</span>;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export const CategoryBrowsePage = () => {
  // Expects a route like /category/$category
  const { categoryName } = useParams({ from: "/category/$categoryName" });

  const {
    data: meals,
    isLoading,
    isError,
  } = useGetMealsByCategory(categoryName);

  return (
    <div className="min-h-screen bg-[#181A1B] font-barlow">
      {/* ── Hero band ── */}
      <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
        {/* Ambient glow layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden [background-image:radial-gradient(circle_at_10%_20%,rgba(210,160,80,0.07)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(180,100,60,0.07)_0%,transparent_50%)]" />

        {/* Decorative horizontal rule */}
        <div className="relative mx-auto max-w-xs">
          <div className="mb-6 flex items-center gap-3">
            <hr className="h-px flex-1 border-none bg-amber-brand/20" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-brand/60">
              Browse Category
            </span>
            <hr className="h-px flex-1 border-none bg-amber-brand/20" />
          </div>
        </div>

        <div className="relative">
          {/* Large emoji icon */}
          <div className="mb-4 text-5xl leading-none">
            <CategoryIcon category={categoryName} />
          </div>

          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            Category
          </span>

          <h1 className="mb-2 font-playfair text-[clamp(32px,5vw,60px)] font-black leading-tight tracking-tight text-ink">
            {categoryName}
          </h1>

          {!isLoading && !isError && meals && (
            <p className="mt-3 text-[12px] font-light uppercase tracking-[0.2em] text-stone-muted">
              {meals.length} recipe{meals.length !== 1 ? "s" : ""} in this
              category
            </p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">⚠️</div>
            <p className="font-playfair text-xl italic text-red-400">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!meals || meals.length === 0) && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <p className="font-playfair text-xl italic text-stone-faint">
              No recipes found in{" "}
              <em className="text-amber-brand">"{categoryName}"</em>
            </p>
            <p className="mt-2 text-[12px] font-light uppercase tracking-[0.2em] text-stone-muted">
              Try browsing a different category
            </p>
          </div>
        )}

        {/* Results grid */}
        {meals && meals.length > 0 && (
          <>
            {/* Divider */}
            <div className="mb-8 flex items-center gap-4">
              <hr className="h-px flex-1 border-none bg-amber-brand/10" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-stone-faint">
                {meals.length} recipe{meals.length !== 1 ? "s" : ""} found
              </span>
              <hr className="h-px flex-1 border-none bg-amber-brand/10" />
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

export default CategoryBrowsePage;
