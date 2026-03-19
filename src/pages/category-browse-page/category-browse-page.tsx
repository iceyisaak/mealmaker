import { Link, useParams } from "@tanstack/react-router";
import { useGetMealsByCategory } from "../../apis/recipe-api";
import { ResultCard } from "../result-page/result-card";

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonCard = ({ tall }: { tall?: boolean }) => (
  <div
    className={`overflow-hidden rounded-lg bg-surface-card ring-1 ring-amber-brand/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)] ${
      tall ? "row-span-2" : ""
    }`}
  >
    <div
      className={`w-full ${tall ? "aspect-[3/4]" : "aspect-square"} [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer`}
    />
    <div className="px-4 pb-4 pt-3">
      <div className="mb-2 h-4 w-3/4 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
      <div className="h-3 w-1/3 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    </div>
  </div>
);

// ─── Category meta ────────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  string,
  { icon: string; tagline: string; color: string }
> = {
  Side: {
    icon: "🍞",
    tagline: "The perfect accompaniment",
    color: "from-amber-900/40 to-stone-900/0",
  },
  Beef: {
    icon: "🥩",
    tagline: "Bold, hearty, satisfying",
    color: "from-red-900/40 to-stone-900/0",
  },
  Chicken: {
    icon: "🍗",
    tagline: "Versatile and beloved",
    color: "from-yellow-900/40 to-stone-900/0",
  },
  Dessert: {
    icon: "🍰",
    tagline: "Sweet endings",
    color: "from-pink-900/40 to-stone-900/0",
  },
  Lamb: {
    icon: "🫕",
    tagline: "Rich and aromatic",
    color: "from-orange-900/40 to-stone-900/0",
  },
  Pasta: {
    icon: "🍝",
    tagline: "Comfort in every strand",
    color: "from-amber-900/40 to-stone-900/0",
  },
  Pork: {
    icon: "🥓",
    tagline: "Smoky, rich, irresistible",
    color: "from-rose-900/40 to-stone-900/0",
  },
  Seafood: {
    icon: "🦞",
    tagline: "Fresh from the ocean",
    color: "from-cyan-900/40 to-stone-900/0",
  },
  Starter: {
    icon: "🥗",
    tagline: "Begin the experience",
    color: "from-green-900/40 to-stone-900/0",
  },
  Vegan: {
    icon: "🥦",
    tagline: "Plant-powered goodness",
    color: "from-emerald-900/40 to-stone-900/0",
  },
  Vegetarian: {
    icon: "🫑",
    tagline: "Nature on the plate",
    color: "from-lime-900/40 to-stone-900/0",
  },
  Breakfast: {
    icon: "🍳",
    tagline: "Start the day right",
    color: "from-yellow-900/40 to-stone-900/0",
  },
  Miscellaneous: {
    icon: "🍴",
    tagline: "Something for everyone",
    color: "from-stone-900/40 to-stone-900/0",
  },
};

const getFallbackMeta = (category: string) => ({
  icon: "🍽️",
  tagline: `Explore ${category} recipes`,
  color: "from-stone-900/40 to-stone-900/0",
});

// ─── Stat pill ────────────────────────────────────────────────────────────────

const StatPill = ({ count }: { count: number }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-amber-brand/20 bg-[#181A1B]/80 px-4 py-1.5 backdrop-blur-sm">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-brand" />
    <span className="font-barlow text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-brand">
      {count} recipe{count !== 1 ? "s" : ""}
    </span>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export const CategoryBrowsePage = () => {
  const { categoryName } = useParams({ from: "/category/$categoryName" });

  const {
    data: meals,
    isLoading,
    isError,
  } = useGetMealsByCategory(categoryName);

  const meta = CATEGORY_META[categoryName] ?? getFallbackMeta(categoryName);

  return (
    <div className="min-h-screen bg-[#181A1B] font-barlow">
      {/* ── Cinematic hero ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Dark base + gradient overlay */}
        <div className="absolute inset-0 bg-[#0e0f10]" />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${meta.color} via-transparent`}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(210,160,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(210,160,80,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Large ghost letter behind title */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none font-playfair text-[20vw] font-black leading-none text-white/[0.02] whitespace-nowrap"
        >
          {categoryName}
        </div>

        {/* Hero content */}
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-20 text-center">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-amber-brand/30" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-brand/70">
              Category
            </span>
            <div className="h-px w-12 bg-amber-brand/30" />
          </div>

          {/* Icon */}
          <div className="mb-5 text-6xl leading-none">{meta.icon}</div>

          {/* Title */}
          <h1 className="mb-3 font-playfair text-[clamp(40px,6vw,80px)] font-black leading-[0.95] tracking-tight text-white">
            {categoryName}
          </h1>

          {/* Tagline */}
          <p className="mb-8 font-playfair text-lg italic text-stone-400">
            {meta.tagline}
          </p>

          {/* Count pill — only when loaded */}
          {!isLoading && !isError && meals && <StatPill count={meals.length} />}
        </div>
      </div>

      {/* ── Thin amber rule ─────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-brand/30 to-transparent" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Loading */}
        {isLoading && (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="mb-5 break-inside-avoid">
                <SkeletonCard tall={i % 4 === 0} />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">⚠️</div>
            <p className="font-playfair text-xl italic text-red-400">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && (!meals || meals.length === 0) && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <p className="font-playfair text-xl italic text-stone-500">
              No recipes found in{" "}
              <em className="text-amber-brand">"{categoryName}"</em>
            </p>
            <p className="mt-2 text-[11px] font-light uppercase tracking-[0.2em] text-stone-600">
              Try browsing a different category
            </p>
          </div>
        )}

        {/* Grid */}
        {meals && meals.length > 0 && (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {meals.map((meal, i) => (
              <div key={meal.idMeal} className="mb-5 break-inside-avoid">
                <Link to="/meal/$id" params={{ id: meal.idMeal }}>
                  {/* Taller card every 5th item for visual rhythm */}
                  <div
                    className={
                      i % 5 === 0
                        ? "[&_img]:aspect-[4/5]"
                        : "[&_img]:aspect-square"
                    }
                  >
                    <ResultCard meal={meal} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBrowsePage;
