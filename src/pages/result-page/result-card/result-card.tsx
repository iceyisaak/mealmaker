import type { Meal } from "../../../types";

export const ResultCard = ({ meal }: { meal: Meal }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded bg-surface-card shadow-[0_2px_12px_rgba(0,0,0,0.3)] ring-1 ring-amber-brand/10 transition-[transform,box-shadow,ring] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:ring-amber-brand/30 cursor-pointer font-barlow">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 [background:linear-gradient(180deg,transparent_50%,rgba(24,26,27,0.65)_100%)]" />
        {/* Category badge */}
        {meal.strCategory && (
          <span className="absolute right-3 top-3 rounded-sm border border-amber-brand/30 bg-[#181A1B]/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-amber-brand backdrop-blur-sm">
            {meal.strCategory}
          </span>
        )}
      </div>

      {/* Body: fixed height so all cards are uniform regardless of title length */}
      <div className="flex h-[88px] flex-col justify-between px-5 pb-4 pt-3">
        {/* Title: clamps to 2 lines max */}
        <h3 className="font-playfair text-lg font-bold leading-tight tracking-tight text-stone-cream line-clamp-2 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
          {meal.strMeal}
        </h3>
        {/* Area: always rendered so the bottom of the card stays put */}
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-faint truncate">
          {meal.strArea ? `${meal.strArea} Cuisine` : "\u00A0"}
        </p>
      </div>
    </article>
  );
};
