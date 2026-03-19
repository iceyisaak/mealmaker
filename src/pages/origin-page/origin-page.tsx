import { useState } from "react";
import { useGetMealsByOrigin } from "../../apis/recipe-api";
import { Link } from "@tanstack/react-router";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strAreas?: string;
  strArea?: string;
}

// ─── Origin Data ──────────────────────────────────────────────────────────────
const ORIGINS = [
  { id: "American", label: "American", emoji: "🇺🇸", accent: "#C8102E" },
  { id: "British", label: "British", emoji: "🇬🇧", accent: "#012169" },
  { id: "Canadian", label: "Canadian", emoji: "🇨🇦", accent: "#FF0000" },
  { id: "Chinese", label: "Chinese", emoji: "🇨🇳", accent: "#DE2910" },
  { id: "Croatian", label: "Croatian", emoji: "🇭🇷", accent: "#FF0000" },
  { id: "Dutch", label: "Dutch", emoji: "🇳🇱", accent: "#AE1C28" },
  { id: "Egyptian", label: "Egyptian", emoji: "🇪🇬", accent: "#CE1126" },
  { id: "French", label: "French", emoji: "🇫🇷", accent: "#0055A4" },
  { id: "Greek", label: "Greek", emoji: "🇬🇷", accent: "#0D5EAF" },
  { id: "Indian", label: "Indian", emoji: "🇮🇳", accent: "#FF9933" },
  { id: "Irish", label: "Irish", emoji: "🇮🇪", accent: "#169B62" },
  { id: "Italian", label: "Italian", emoji: "🇮🇹", accent: "#009246" },
  { id: "Jamaican", label: "Jamaican", emoji: "🇯🇲", accent: "#009B3A" },
  { id: "Japanese", label: "Japanese", emoji: "🇯🇵", accent: "#BC002D" },
  { id: "Kenyan", label: "Kenyan", emoji: "🇰🇪", accent: "#006600" },
  { id: "Malaysian", label: "Malaysian", emoji: "🇲🇾", accent: "#CC0001" },
  { id: "Mexican", label: "Mexican", emoji: "🇲🇽", accent: "#006847" },
  { id: "Moroccan", label: "Moroccan", emoji: "🇲🇦", accent: "#C1272D" },
  { id: "Polish", label: "Polish", emoji: "🇵🇱", accent: "#DC143C" },
  { id: "Portuguese", label: "Portuguese", emoji: "🇵🇹", accent: "#006600" },
  { id: "Russian", label: "Russian", emoji: "🇷🇺", accent: "#D52B1E" },
  { id: "Spanish", label: "Spanish", emoji: "🇪🇸", accent: "#C60B1E" },
  { id: "Thai", label: "Thai", emoji: "🇹🇭", accent: "#A51931" },
  { id: "Tunisian", label: "Tunisian", emoji: "🇹🇳", accent: "#E70013" },
  { id: "Turkish", label: "Turkish", emoji: "🇹🇷", accent: "#E30A17" },
  { id: "Ukrainian", label: "Ukrainian", emoji: "🇺🇦", accent: "#005BBB" },
  { id: "Vietnamese", label: "Vietnamese", emoji: "🇻🇳", accent: "#DA251D" },
];

// ─── Meal Card ────────────────────────────────────────────────────────────────
const MealCard = ({ meal, index }: { meal: Meal; index: number }) => (
  <Link
    key={meal.idMeal}
    to="/meal/$id"
    params={{ id: meal.idMeal }}
    className="group bg-white rounded-xl overflow-hidden shadow-md cursor-pointer
               transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl
               animate-[fadeUp_0.4s_ease_both]"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-out
                   group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,18,9,0.35)] to-transparent" />
    </div>

    {/* Body */}
    <div className="px-4 pt-3 pb-4">
      <span className="block text-[10px] font-medium tracking-widest uppercase text-stone-400 mb-1">
        #{String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-serif text-[15px] font-bold leading-snug text-stone-900">
        {meal.strMeal}
      </h3>
    </div>
  </Link>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = ({ i }: { i: number }) => (
  <div
    className="bg-white rounded-xl overflow-hidden shadow-md animate-[fadeUp_0.4s_ease_both]"
    style={{ animationDelay: `${i * 80}ms` }}
  >
    <div
      className="aspect-[4/3] w-full animate-[shimmer_1.4s_infinite]
                    bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200
                    bg-[length:200%_100%]"
    />
    <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
      <div
        className="h-3 w-[30%] rounded-sm animate-[shimmer_1.4s_infinite]
                      bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200
                      bg-[length:200%_100%]"
      />
      <div
        className="h-3 w-[75%] rounded-sm animate-[shimmer_1.4s_infinite]
                      bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200
                      bg-[length:200%_100%]"
      />
    </div>
  </div>
);

// ─── Meal Grid ────────────────────────────────────────────────────────────────
const MealGrid = ({ origin }: { origin: string }) => {
  const {
    data: meals,
    isLoading,
    isFetching,
    isError,
  } = useGetMealsByOrigin(origin);

  console.log("[MealGrid]", { origin, isLoading, isFetching, isError, meals });

  if (isLoading || isFetching)
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} i={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-[15px] text-red-600">
        <span className="text-2xl">⚠</span>
        Failed to load meals. Please try again.
      </div>
    );

  if (!meals?.length)
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-[15px] text-stone-400">
        <span className="text-2xl">🍽</span>
        No meals found for this origin.
      </div>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
      {meals.map((meal, i) => (
        <MealCard key={meal.idMeal} meal={meal} index={i} />
      ))}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export const OriginPage = () => {
  const [selected, setSelected] = useState<string>("Italian");
  const currentOrigin = ORIGINS.find((o) => o.id === selected)!;

  return (
    <div className="min-h-screen bg-[#f7f3ed] text-stone-900">
      {/* Keyframes + font — only what Tailwind can't handle */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <header className="relative bg-[#1a1209] overflow-hidden px-10 pt-16 pb-14 md:px-12 md:pt-20 md:pb-16">
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8a899] mb-4">
            World Kitchen
          </p>
          <h1 className="font-serif text-[clamp(3rem,6vw,5.25rem)] leading-[1.05] font-bold text-[#f7f3ed]">
            Browse by
            <br />
            <em className="not-italic text-[#e8c88a]">Origin</em>
          </h1>
          <p className="mt-5 text-[15px] font-light text-[#a89b8c] leading-relaxed">
            Explore authentic recipes from {ORIGINS.length} cuisines around the
            globe.
          </p>
        </div>

        {/* Dynamic accent bar */}
        <div
          className="absolute left-0 bottom-0 w-full h-1 transition-colors duration-500"
          style={{ backgroundColor: currentOrigin.accent }}
        />
      </header>

      {/* ── Origin Nav ───────────────────────────────────────────────────────── */}
      <nav
        aria-label="Filter by cuisine origin"
        className="sticky top-0 z-50 bg-[#f0ebe3] border-b border-[#e8ddd0]
                   overflow-x-auto no-scrollbar"
      >
        <div className="flex gap-1.5 px-10 py-3.5 w-max">
          {ORIGINS.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              aria-pressed={selected === o.id}
              className={[
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border",
                "text-[13px] whitespace-nowrap transition-all duration-150 cursor-pointer",
                selected === o.id
                  ? "bg-[#1a1209] text-[#f7f3ed] border-[#1a1209] font-medium shadow-md"
                  : "bg-transparent text-stone-500 border-transparent hover:bg-[#e8ddd0] hover:text-stone-800",
              ].join(" ")}
            >
              <span className="text-[15px] leading-none">{o.emoji}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-10 pt-12 pb-20">
        {/* Section header */}
        <header className="flex items-center gap-5 mb-10">
          <span
            className="text-[44px] leading-none flex-shrink-0 transition-[color] duration-500"
            style={{ color: currentOrigin.accent }}
          >
            {currentOrigin.emoji}
          </span>

          <div>
            <h2 className="font-serif text-[32px] font-bold tracking-tight text-stone-900">
              {currentOrigin.label} Cuisine
            </h2>
            <p className="text-[13px] text-stone-400 font-light mt-0.5">
              Handpicked traditional recipes
            </p>
          </div>

          <div
            className="flex-1 h-0.5 rounded-full opacity-30 transition-colors duration-500"
            style={{ backgroundColor: currentOrigin.accent }}
          />
        </header>

        <MealGrid origin={selected} />
      </section>
    </div>
  );
};

export default OriginPage;
