import type { Meal } from "../../../types";

export const ResultCard = ({ meal }: { meal: Meal }) => {
  console.log("strArea:", meal.strArea, "| strCategory:", meal.strCategory);
  return (
    <article className="group flex flex-col overflow-hidden rounded bg-surface-card shadow-[0_2px_12px_rgba(0,0,0,0.3)] ring-1 ring-amber-brand/10 transition-[transform,box-shadow,ring] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:ring-amber-brand/30 cursor-pointer font-barlow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 [background:linear-gradient(180deg,transparent_50%,rgba(24,26,27,0.65)_100%)]" />
        {/* Category badge */}
        <span className="absolute right-3 top-3 rounded-sm border border-amber-brand/30 bg-[#181A1B]/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-amber-brand backdrop-blur-sm">
          {meal.strCategory}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="mb-1 font-playfair text-lg font-bold leading-tight tracking-tight text-stone-cream line-clamp-2">
          {meal.strMeal}
        </h3>
        <p className="mt-auto text-[11px] font-medium uppercase tracking-[0.18em] text-stone-faint">
          {meal.strArea ? `${meal.strArea} Cuisine` : "—"}
        </p>
      </div>
    </article>
  );
};
