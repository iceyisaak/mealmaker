// src/components/navbar/search-recommendation-menu.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useGetMeals } from "../../../../apis/recipe-api"; // adjust import path as needed/useGetMeals"; // adjust import path as needed
import { type Meal } from "../../../../types"; // adjust import path as needed

interface SearchRecommendationMenuProps {
  query: string;
  isVisible: boolean;
  onSelect: (meal: Meal) => void;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const SkeletonItem = () => (
  <li className="flex items-center gap-3 px-4 py-2.5 animate-pulse">
    <div className="w-10 h-10 rounded-md bg-amber-100 shrink-0" />
    <div className="flex flex-col gap-1.5 flex-1">
      <div className="h-3.5 bg-amber-100 rounded w-3/4" />
      <div className="h-3 bg-amber-50 rounded w-1/3" />
    </div>
  </li>
);

const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-200 text-amber-900 font-semibold rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

export const SearchRecommendationMenu = ({
  query,
  isVisible,
  onSelect,
  onClose,
  activeIndex,
  setActiveIndex,
}: SearchRecommendationMenuProps) => {
  const { data: meals, isLoading, isFetching } = useGetMeals(query);
  const menuRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const suggestions = meals?.slice(0, 6) ?? [];
  const showSkeleton = (isLoading || isFetching) && query.trim().length > 0;
  const showEmpty =
    !isLoading &&
    !isFetching &&
    query.trim().length > 0 &&
    suggestions.length === 0;

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && menuRef.current) {
      const items = menuRef.current.querySelectorAll(
        "[data-recommendation-item]",
      );
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 z-50 mt-1"
      role="listbox"
      aria-label="Search recommendations"
    >
      {/* Backdrop blur card */}
      <div
        className="
          rounded-xl border border-amber-200 bg-white/95 backdrop-blur-sm
          shadow-[0_8px_32px_rgba(180,83,9,0.12),0_2px_8px_rgba(0,0,0,0.06)]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-1.5 flex items-center justify-between border-b border-amber-50">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            {showSkeleton
              ? "Searching…"
              : showEmpty
                ? "No results"
                : "Suggestions"}
          </span>
          <button
            onClick={onClose}
            aria-label="Close suggestions"
            className="text-gray-400 hover:text-amber-600 transition-colors p-0.5 rounded"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        <ul
          ref={menuRef}
          className="max-h-80 overflow-y-auto py-1.5 divide-y divide-amber-50/60"
        >
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonItem key={i} />)
          ) : showEmpty ? (
            <li className="px-4 py-6 text-center">
              <div className="text-3xl mb-2">🍽️</div>
              <p className="text-sm text-gray-500">
                No meals found for{" "}
                <span className="font-semibold text-amber-700">"{query}"</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try a different ingredient or dish name
              </p>
            </li>
          ) : (
            suggestions.map((meal, index) => (
              <li
                key={meal.idMeal}
                data-recommendation-item
                role="option"
                aria-selected={activeIndex === index}
                onClick={() => onSelect(meal)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 cursor-pointer
                  transition-all duration-100 group
                  ${
                    activeIndex === index
                      ? "bg-amber-50 border-l-2 border-amber-500"
                      : "border-l-2 border-transparent hover:bg-amber-50/60"
                  }
                `}
              >
                {/* Thumbnail */}
                <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 ring-1 ring-amber-100">
                  <img
                    src={`${meal.strMealThumb}/preview`}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = meal.strMealThumb;
                    }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate leading-tight">
                    <HighlightMatch text={meal.strMeal} query={query} />
                  </p>
                  <p className="text-xs text-amber-600/80 mt-0.5 truncate">
                    {meal.strCategory}
                    {meal.strArea ? (
                      <span className="text-gray-400"> · {meal.strArea}</span>
                    ) : null}
                  </p>
                </div>

                {/* Arrow indicator */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`
                    shrink-0 transition-all duration-150
                    ${activeIndex === index ? "text-amber-500 translate-x-0.5" : "text-gray-300"}
                  `}
                >
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))
          )}
        </ul>

        {/* Footer — show all results */}
        {!showSkeleton && !showEmpty && suggestions.length > 0 && (
          <div className="px-4 py-2.5 border-t border-amber-100 bg-amber-50/40">
            <button
              onClick={() => {
                navigate({ to: "/search", search: { q: query } });
                onClose();
              }}
              className="
                w-full text-xs text-amber-700 font-semibold hover:text-amber-900
                flex items-center justify-center gap-1.5 transition-colors py-0.5
              "
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="5" cy="5" r="4" />
                <path d="M9 9l2 2" />
              </svg>
              View all results for "{query}"
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
