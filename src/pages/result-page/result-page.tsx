import { Link, useNavigate } from "@tanstack/react-router";
import { useGetMeals } from "../../apis/recipe-api";
import { useGetMealCategories } from "../../apis/recipe-api";
import { useGetMealOrigin } from "../../apis/recipe-api";
import { ResultCard } from "./result-card";
import { SearchBar } from "../../components/navbar/search-bar";
import { useSearch } from "@tanstack/react-router";
import type { MealSearchParams } from "../../types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SkeletonCard = () => (
  <div className="overflow-hidden rounded bg-surface-card ring-1 ring-amber-brand/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
    <div className="aspect-square [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    <div className="px-5 pb-5 pt-4">
      <div className="mb-2 h-5 w-4/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
      <div className="h-4 w-2/5 rounded-sm [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
    </div>
  </div>
);

const FilterDropdown = ({
  label,
  active,
  options,
  onSelect,
  onClear,
}: {
  label: string;
  active: string;
  options: { value: string; thumb?: string }[];
  onSelect: (value: string) => void;
  onClear: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-150 ${
          active
            ? "border-amber-brand bg-amber-brand/15 text-amber-brand"
            : "border-white/10 bg-white/5 text-stone-faint hover:border-amber-brand/40 hover:text-stone-cream"
        }`}
      >
        {active ? active : label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#1e2022] shadow-2xl shadow-black/50">
          {/* Clear option */}
          {active && (
            <button
              onClick={() => {
                onClear();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 border-b border-white/5 px-4 py-2.5 text-left text-xs text-stone-faint transition-colors hover:bg-white/5 hover:text-stone-cream"
            >
              <span className="text-amber-brand">✕</span> Clear filter
            </button>
          )}

          <div className="max-h-64 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onSelect(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-100 ${
                  active === opt.value
                    ? "bg-amber-brand/15 text-amber-brand"
                    : "text-stone-300 hover:bg-amber-brand/10 hover:text-stone-cream"
                }`}
              >
                {opt.thumb && (
                  <img
                    src={opt.thumb}
                    alt={opt.value}
                    className="h-6 w-6 rounded-full object-cover opacity-70"
                  />
                )}
                {opt.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ResultPage = () => {
  const { q = "", a = "", c = "" } = useSearch({ from: "/search" });
  const navigate = useNavigate();

  const { data: categories } = useGetMealCategories();
  const { data: origins } = useGetMealOrigin();

  const params: MealSearchParams = a
    ? { type: "area", a }
    : c
      ? { type: "category", c }
      : { type: "search", q };

  const { data: meals, isLoading, isError } = useGetMeals(params);

  const activeLabel = a ? `Origin: ${a}` : c ? `Category: ${c}` : null;

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.strCategory,
      thumb: cat.strCategoryThumb,
    })) ?? [];

  const originOptions =
    origins?.map((o) => ({
      value: o.strArea,
    })) ?? [];

  return (
    <div className="min-h-screen bg-[#181A1B] font-barlow">
      {/* Hero search band */}
      <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden [background-image:radial-gradient(circle_at_10%_20%,rgba(210,160,80,0.07)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(180,100,60,0.07)_0%,transparent_50%)]" />
        <div className="relative">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            Search Results
          </span>
          <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-tight text-ink">
            Results for <em className="italic text-amber-brand">"{q}"</em>
          </h1>
          <div className="flex justify-center">
            <SearchBar defaultValue={q} />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-b border-amber-brand/10 bg-[#1a1c1d]">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-muted">
            Filter by
          </span>

          <FilterDropdown
            label="Category"
            active={c}
            options={categoryOptions}
            onSelect={(val) =>
              navigate({
                to: "/search",
                search: (prev) => ({ ...prev, c: val }),
              })
            }
            onClear={() =>
              navigate({
                to: "/search",
                search: q ? { q } : a ? { a } : {},
              })
            }
          />

          <FilterDropdown
            label="Origin"
            active={a}
            options={originOptions}
            onSelect={(val) =>
              navigate({
                to: "/search",
                search: (prev) => ({ ...prev, a: val }),
              })
            }
            onClear={() =>
              navigate({
                to: "/search",
                search: q ? { q } : c ? { c } : {},
              })
            }
          />

          {/* Active filter pill */}
          {(a || c) && (
            <button
              onClick={() =>
                navigate({
                  to: "/search",
                  search: (prev) => {
                    const { a: _, c: __, ...rest } = prev;
                    return rest;
                  },
                })
              }
              className="ml-auto flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-red-400 transition-colors hover:bg-red-500/20"
            >
              <span>✕</span> Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {isError && (
          <p className="py-20 text-center font-playfair text-xl italic text-red-400">
            Something went wrong. Please try again.
          </p>
        )}

        {!isLoading && !isError && (!meals || meals.length === 0) && (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <p className="font-playfair text-xl italic text-stone-faint">
              No recipes found for{" "}
              <em className="text-amber-brand">"{q || a || c}"</em>
            </p>
            <p className="mt-2 text-[12px] font-light uppercase tracking-[0.2em] text-stone-muted">
              Try a different ingredient or dish name
            </p>
          </div>
        )}

        {meals && meals.length > 0 && (
          <>
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

export default ResultPage;
