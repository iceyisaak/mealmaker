// src/components/navbar/search-recommendation-menu.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useGetMeals } from "../../../../apis/recipe-api";
import { type Meal } from "../../../../types";

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
    <div className="size-10 shrink-0 rounded bg-stone-warm/20" />
    <div className="flex flex-1 flex-col gap-1.5">
      <div className="h-3.5 w-3/4 rounded-sm bg-stone-warm/20" />
      <div className="h-3 w-1/3 rounded-sm bg-stone-warm/10" />
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
            className="rounded-sm bg-amber-brand/25 px-0.5 font-semibold text-amber-light"
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
      className="absolute top-full left-0 right-0 z-50 mt-1.5 font-barlow"
      role="listbox"
      aria-label="Search recommendations"
    >
      <div className="overflow-hidden rounded border border-amber-brand/20 bg-surface-dark/95 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(196,124,58,0.08)] backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-brand/10 px-4 pb-2 pt-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-brand">
            {showSkeleton
              ? "Searching…"
              : showEmpty
                ? "No results"
                : "Suggestions"}
          </span>
          <button
            onClick={onClose}
            aria-label="Close suggestions"
            className="rounded p-0.5 text-stone-faint transition-colors hover:text-amber-brand"
          >
            <svg
              width="13"
              height="13"
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

        {/* List */}
        <ul
          ref={menuRef}
          className="max-h-80 divide-y divide-amber-brand/5 overflow-y-auto py-1"
        >
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonItem key={i} />)
          ) : showEmpty ? (
            <li className="px-4 py-8 text-center">
              <div className="mb-2 text-3xl">🍽️</div>
              <p className="font-playfair text-sm italic text-stone-faint">
                No meals found for{" "}
                <em className="text-amber-brand">"{query}"</em>
              </p>
              <p className="mt-1 text-[11px] font-light tracking-wide text-stone-muted">
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
                className={`group flex cursor-pointer items-center gap-3 border-l-2 px-4 py-2.5 transition-all duration-100 ${
                  activeIndex === index
                    ? "border-amber-brand bg-amber-brand/8"
                    : "border-transparent hover:border-amber-brand/40 hover:bg-amber-brand/5"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative size-10 shrink-0 overflow-hidden rounded ring-1 ring-amber-brand/20">
                  <img
                    src={`${meal.strMealThumb}/preview`}
                    alt={meal.strMeal}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = meal.strMealThumb;
                    }}
                  />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium leading-tight text-stone-cream">
                    <HighlightMatch text={meal.strMeal} query={query} />
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-amber-brand/70">
                    {meal.strCategory}
                    {meal.strArea && (
                      <span className="text-stone-muted">
                        {" "}
                        · {meal.strArea}
                      </span>
                    )}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`shrink-0 transition-all duration-150 ${
                    activeIndex === index
                      ? "translate-x-0.5 text-amber-brand"
                      : "text-stone-muted"
                  }`}
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

        {/* Footer */}
        {!showSkeleton && !showEmpty && suggestions.length > 0 && (
          <div className="border-t border-amber-brand/10 bg-amber-brand/5 px-4 py-2.5">
            <button
              onClick={() => {
                navigate({ to: "/search", search: { q: query } });
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-faint transition-colors hover:text-amber-brand py-0.5"
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
