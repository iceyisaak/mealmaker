import type { Meal } from "../../../types";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useBookmarkRecipe } from "../../../features/store/useBookmarkRecipe";
import { Link } from "@tanstack/react-router";

export const ResultCard = ({ meal }: { meal: Meal }) => {
  const saveRecipe = useBookmarkRecipe((s) => s.saveRecipe);
  const removeRecipe = useBookmarkRecipe((s) => s.removeRecipe);
  const isBookmarked = useBookmarkRecipe((s) => s.isBookmarked(meal.idMeal));

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    isBookmarked ? removeRecipe(meal.idMeal) : saveRecipe(meal.idMeal);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded bg-surface-card shadow-[0_2px_12px_rgba(0,0,0,0.3)] ring-1 ring-amber-brand/10 transition-[transform,box-shadow,ring] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:ring-amber-brand/30 cursor-pointer font-barlow">
      {/* Image */}
      <Link
        className="relative block h-56 overflow-hidden"
        to="/meal/$id"
        params={{ id: meal.idMeal }}
      >
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
        {/* Bookmark button — always visible */}
        <button
          onClick={handleBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this recipe"}
          className="absolute bottom-3 right-3 flex items-center justify-center rounded-full w-8 h-8 bg-[#181A1B]/70 backdrop-blur-sm ring-1 ring-amber-brand/20 text-stone-faint transition-all duration-200 hover:bg-[#181A1B]/90 hover:ring-amber-brand/50 hover:text-amber-brand"
        >
          {isBookmarked ? (
            <BsBookmarkFill className="text-amber-brand text-[13px]" />
          ) : (
            <BsBookmark className="text-[13px]" />
          )}
        </button>
      </Link>

      {/* Body */}
      <div className="flex h-[88px] flex-col justify-between px-5 pb-4 pt-3">
        <h3 className="font-playfair text-lg font-bold leading-tight tracking-tight text-stone-cream line-clamp-2 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
          {meal.strMeal}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-faint truncate">
          {meal.strArea ? `${meal.strArea} Cuisine` : "\u00A0"}
        </p>
      </div>
    </article>
  );
};
