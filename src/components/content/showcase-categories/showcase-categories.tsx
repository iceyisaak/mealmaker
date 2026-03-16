import { useGetMealCategories } from "../../../apis/recipe-api";

const SHIMMER =
  "[background:linear-gradient(90deg,var(--color-stone-warm)_25%,#e8e0d0_50%,var(--color-stone-warm)_75%)] [background-size:200%_100%] animate-shimmer";

const SkeletonCard = () => (
  <div className="overflow-hidden rounded bg-white shadow-[0_2px_12px_rgba(30,15,0,0.07)]">
    <div className={`aspect-square ${SHIMMER}`} />
    <div className="p-5">
      <div className={`mb-3.5 h-[22px] w-3/5 rounded-sm ${SHIMMER}`} />
      <div className={`mb-2.5 h-3.5 w-full rounded-sm ${SHIMMER}`} />
      <div className={`mb-2.5 h-3.5 w-[88%] rounded-sm ${SHIMMER}`} />
      <div className={`h-3.5 w-[72%] rounded-sm ${SHIMMER}`} />
    </div>
  </div>
);

export const ShowcaseCategories = () => {
  const { data, error, isLoading } = useGetMealCategories();

  const sorted = data
    ? [...data].sort((a, b) =>
        a.strCategory === "Miscellaneous"
          ? 1
          : b.strCategory === "Miscellaneous"
            ? -1
            : 0,
      )
    : [];

  return (
    <section className="relative overflow-hidden bg-stone-cream px-12 py-24 font-barlow">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_10%_20%,rgba(210,160,80,0.07)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(180,100,60,0.07)_0%,transparent_50%)]" />

      {/* Header */}
      <div className="relative mb-18 text-center">
        <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
          Explore by Ingredient
        </span>
        <h2 className="mb-5 font-playfair text-[clamp(42px,6vw,80px)] font-black leading-[1.05] tracking-tight text-ink">
          Every <em className="italic text-amber-brand">Culinary</em>
          <br />
          Category
        </h2>
        <hr className="mx-auto h-0.5 w-15 border-none [background:linear-gradient(90deg,var(--color-amber-brand),var(--color-amber-light))]" />
      </div>

      {/* Error */}
      {error && (
        <p className="py-20 text-center font-playfair text-[22px] italic text-red-600">
          Something went wrong — {error.message}
        </p>
      )}

      {/* Loading skeletons */}
      {isLoading && (
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Category grid */}
      {!isLoading && !error && data && (
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {sorted.map((category) => (
            <article
              key={category.idCategory}
              className="group flex cursor-pointer flex-col overflow-hidden rounded bg-white shadow-[0_2px_12px_rgba(30,15,0,0.07)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(30,15,0,0.14)]"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-stone-warm">
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="h-full w-full object-contain p-7 transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:linear-gradient(180deg,transparent_40%,rgba(196,124,58,0.15)_100%)]" />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                <h3 className="mb-2.5 font-playfair text-[22px] font-bold leading-tight tracking-tight text-ink">
                  {category.strCategory}
                </h3>
                <p className="line-clamp-4 flex-1 text-[13.5px] font-light leading-[1.65] text-stone-muted">
                  {category.strCategoryDescription}
                </p>
                <span className="mt-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-brand">
                  Explore recipes →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
