import { Link } from "@tanstack/react-router";
import type { Meal } from "../../../types";
import { useBookmarkRecipe } from "../../../features/store/useBookmarkRecipe";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export const OriginCard = ({ meal, index }: { meal: Meal; index: number }) => {
  const { saveRecipe, removeRecipe, isBookmarked } = useBookmarkRecipe();
  const bookmarked = isBookmarked(meal.idMeal);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the bookmark button
    if (bookmarked) {
      removeRecipe(meal.idMeal);
    } else {
      saveRecipe(meal.idMeal);
    }
  };

  return (
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

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this recipe"}
          className="absolute bottom-3 right-3 flex items-center justify-center rounded-full w-8 h-8 bg-[#181A1B]/70 backdrop-blur-sm ring-1 ring-amber-brand/20 text-stone-faint transition-all duration-200 hover:bg-[#181A1B]/90 hover:ring-amber-brand/50 hover:text-amber-brand"
        >
          {bookmarked ? (
            <BsBookmarkFill className="text-amber-brand text-[13px]" />
          ) : (
            <BsBookmark className="text-[13px]" />
          )}
        </button>
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
};
