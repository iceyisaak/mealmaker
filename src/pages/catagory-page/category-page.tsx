import { useGetMealCategories } from "../../apis/recipe-api";

const SkeletonRow = ({ reverse }: { reverse: boolean }) => (
  <div
    className={`grid grid-cols-2 items-start gap-12 border-t border-stone-200/60 py-10 ${reverse ? "[direction:rtl] [&>*]:[direction:ltr]" : ""}`}
  >
    + <div className="aspect-square w-full rounded-lg shimmer" />
    <div className="flex flex-col justify-center gap-3 py-2">
      <div className={`h-3 w-10 rounded-sm shimmer`} />
      <div className={`h-7 w-2/5 rounded-sm shimmer`} />
      <div className="flex flex-col gap-2 pt-1">
        <div className={`h-3.5 w-full rounded-sm shimmer`} />
        <div className={`h-3.5 w-[95%] rounded-sm shimmer`} />
        <div className={`h-3.5 w-[88%] rounded-sm shimmer`} />
        <div className={`h-3.5 w-[80%] rounded-sm shimmer`} />
        <div className={`h-3.5 w-[70%] rounded-sm shimmer`} />
      </div>
    </div>
  </div>
);

export const CategoryPage = () => {
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
      <div className="relative mb-16 text-center">
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

      <div className="relative mx-auto max-w-[1100px]">
        {/* Loading skeletons */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} reverse={i % 2 === 1} />
          ))}

        {/* Category rows */}
        {!isLoading &&
          !error &&
          data &&
          sorted.map((category, index) => {
            const isReverse = index % 2 === 1;
            return (
              <article
                key={category.idCategory}
                className={`group grid cursor-pointer grid-cols-2 items-start gap-12 border-t border-stone-200/60 py-10 transition-colors duration-200 ${isReverse ? "[direction:rtl] [&>*]:[direction:ltr]" : ""}`}
              >
                {/* Image — full 700px natural size, contained in its column */}
                <div className="overflow-hidden rounded-lg bg-stone-warm">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center py-2">
                  <span className="mb-2 text-[11px] font-medium tracking-[0.15em] text-amber-brand opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-4 font-playfair text-[28px] font-bold leading-tight tracking-tight text-ink">
                    {category.strCategory}
                  </h3>
                  <p className="text-[14px] font-light leading-[1.75] text-stone-muted">
                    {category.strCategoryDescription}
                  </p>
                  <span className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Explore recipes →
                  </span>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
};
