import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  useGetMealCategories,
  useGetMealsByCategory,
} from "../../apis/recipe-api";
import { ResultCard } from "../result-page/result-card";

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
  Goat: {
    icon: "🐐",
    tagline: "A world apart",
    color: "from-stone-700/40 to-stone-900/0",
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

// ─── Skeleton card ────────────────────────────────────────────────────────────

const SkeletonCard = ({ tall }: { tall?: boolean }) => (
  <div className="overflow-hidden rounded-lg bg-surface-card ring-1 ring-amber-brand/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
    <div
      className={`w-full ${tall ? "aspect-[3/4]" : "aspect-square"} [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer`}
    />
    <div className="px-4 pb-4 pt-3">
      <div className="mb-2 h-4 w-3/4 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
      <div className="h-3 w-1/3 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    </div>
  </div>
);

// ─── Skeleton chip ────────────────────────────────────────────────────────────

const SkeletonChip = () => (
  <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
    <div className="h-5 w-5 rounded-full [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    <div className="h-3 w-12 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
  </div>
);

// ─── Stat pill ────────────────────────────────────────────────────────────────

const StatPill = ({ count }: { count: number }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-amber-brand/20 bg-[#181A1B]/80 px-4 py-1.5 backdrop-blur-sm">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-brand" />
    <span className="font-barlow text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-brand">
      {count} recipe{count !== 1 ? "s" : ""}
    </span>
  </div>
);

// ─── Category chip ────────────────────────────────────────────────────────────

const CategoryChip = ({
  name,
  thumb,
  isActive,
  onClick,
}: {
  name: string;
  thumb: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      group flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5
      font-barlow text-[11px] font-semibold uppercase tracking-[0.2em]
      transition-all duration-200
      ${
        isActive
          ? "border-amber-brand/60 bg-amber-brand/10 text-amber-brand shadow-[0_0_12px_rgba(210,160,80,0.15)]"
          : "border-white/10 bg-white/[0.04] text-stone-400 hover:border-white/20 hover:bg-white/[0.07] hover:text-stone-200"
      }
    `}
  >
    <img
      src={thumb}
      alt={name}
      className={`h-5 w-5 rounded-full object-cover transition-opacity duration-200 ${
        isActive ? "opacity-100" : "opacity-50 group-hover:opacity-75"
      }`}
    />
    {name}
  </button>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export const CategoryBrowsePage = () => {
  const { categoryName } = useParams({ from: "/category/$categoryName" });
  const navigate = useNavigate();

  const { data: categories, isLoading: categoriesLoading } =
    useGetMealCategories();
  const {
    data: meals,
    isLoading,
    isError,
  } = useGetMealsByCategory(categoryName);

  const meta = CATEGORY_META[categoryName] ?? getFallbackMeta(categoryName);

  const handleCategorySwitch = (name: string) => {
    navigate({ to: "/category/$categoryName", params: { categoryName: name } });
  };

  return (
    <div className="min-h-screen bg-[#181A1B] font-barlow">
      {/* ── Cinematic hero ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0e0f10]" />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${meta.color} via-transparent`}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(210,160,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(210,160,80,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ghost watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-playfair text-[20vw] font-black leading-none text-white/[0.02]"
        >
          {categoryName}
        </div>

        {/* Hero content */}
        <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-20 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-amber-brand/30" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-brand/70">
              Category
            </span>
            <div className="h-px w-12 bg-amber-brand/30" />
          </div>

          <div className="mb-5 text-6xl leading-none">{meta.icon}</div>

          <h1 className="mb-3 font-playfair text-[clamp(40px,6vw,80px)] font-black leading-[0.95] tracking-tight text-white">
            {categoryName}
          </h1>

          <p className="mb-8 font-playfair text-lg italic text-stone-400">
            {meta.tagline}
          </p>

          {!isLoading && !isError && meals && <StatPill count={meals.length} />}
        </div>

        {/* ── Category chips strip ──────────────────────────────────────── */}
        <div className="relative border-t border-white/5 bg-[#0e0f10]/60 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categoriesLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonChip key={i} />
                  ))
                : categories?.map((cat) => (
                    <CategoryChip
                      key={cat.idCategory}
                      name={cat.strCategory}
                      thumb={cat.strCategoryThumb}
                      isActive={cat.strCategory === categoryName}
                      onClick={() => handleCategorySwitch(cat.strCategory)}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Thin amber rule ─────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-brand/30 to-transparent" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {isLoading && (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="mb-5 break-inside-avoid">
                <SkeletonCard tall={i % 4 === 0} />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">⚠️</div>
            <p className="font-playfair text-xl italic text-red-400">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

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

        {meals && meals.length > 0 && (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {meals.map((meal, i) => (
              <div key={meal.idMeal} className="mb-5 break-inside-avoid">
                <div
                  className={
                    i % 5 === 0
                      ? "[&_img]:aspect-[4/5]"
                      : "[&_img]:aspect-square"
                  }
                >
                  <ResultCard meal={meal} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBrowsePage;
